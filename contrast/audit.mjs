/**
 * WCAG contrast audit for the Aurora theme.
 *
 * Renders each deck with Marp, reads every text run's colour, size and weight,
 * then hides the text and measures each run against the pixels that were behind
 * it, so gradients, stripes and chips count. A run's ratio is taken at its 1st
 * percentile worst pixel. The page number is measured; blockquote quote marks
 * are decoration and are not.
 *
 *   npx -p @marp-team/marp-cli node contrast/audit.mjs [options] [deck.md ...]
 *
 * With no decks it audits demo.md and contrast/*.md. Options:
 *   --theme <css>    theme to audit (default: marp-aurora-theme.css)
 *   --size 16:9|4:3  render at the theme's size preset (the 4K slides)
 *   --scale <n>      judge text at n times its size, e.g. 0.5 for a 4K deck on a
 *                    1080p screen, where less text counts as large
 *   --level aa|aaa   list the runs failing this level and exit with 1 if there
 *                    are any (default: aa)
 *
 * Needs Chrome; set CHROME_PATH if it is not at the macOS default.
 */
import { spawnSync } from "node:child_process";
import { mkdtempSync, readdirSync, readFileSync, realpathSync, writeFileSync } from "node:fs";
import { createRequire } from "node:module";
import { tmpdir } from "node:os";
import { basename, dirname, join, resolve } from "node:path";
import { parseArgs } from "node:util";

const root = resolve(import.meta.dirname, "..");
const { values: opts, positionals } = parseArgs({
  allowPositionals: true,
  options: {
    theme: { type: "string", default: join(root, "marp-aurora-theme.css") },
    size: { type: "string" },
    scale: { type: "string", default: "1" },
    level: { type: "string", default: "aa" },
  },
});
const decks = positionals.length
  ? positionals.map((d) => resolve(d))
  : [
      join(root, "demo.md"),
      ...readdirSync(import.meta.dirname)
        .filter((f) => f.endsWith(".md"))
        .map((f) => join(import.meta.dirname, f)),
    ];

// npx -p puts marp on the PATH; puppeteer-core is one of its dependencies.
const marp = spawnSync("sh", ["-c", "command -v marp"], { encoding: "utf8" }).stdout.trim();
if (!marp) {
  console.error("marp not found: run with npx -p @marp-team/marp-cli node contrast/audit.mjs");
  process.exit(2);
}
const puppeteer = createRequire(realpathSync(marp))("puppeteer-core");

const tmp = mkdtempSync(join(tmpdir(), "aurora-contrast-"));
const browser = await puppeteer.launch({
  executablePath:
    process.env.CHROME_PATH ?? "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
});
const runs = [];

for (const deck of decks) {
  let src = deck;
  if (opts.size) {
    src = join(tmp, basename(deck));
    writeFileSync(src, readFileSync(deck, "utf8").replace(/^---\n/, `---\nsize: ${opts.size}\n`));
  }
  const html = join(tmp, `${basename(deck, ".md")}.html`);
  const r = spawnSync(
    marp,
    ["--no-config-file", "--html", "--allow-local-files", "--theme-set", resolve(opts.theme),
      "--template", "bare", "-o", html, src],
    { cwd: dirname(deck), stdio: ["ignore", "ignore", "pipe"] },
  );
  if (r.status !== 0) throw new Error(r.stderr.toString());

  const page = await browser.newPage();
  await page.goto(`file://${html}`, { waitUntil: "networkidle0" });
  // The bare template sizes every slide to the viewport; give each its own size instead.
  const sizes = await page.evaluate(() =>
    [...document.querySelectorAll("svg[data-marpit-svg]")].map((svg) => {
      const [, , w, h] = svg.getAttribute("viewBox").split(" ").map(Number);
      svg.style.cssText = `width:${w}px!important;height:${h}px!important;display:block`;
      return [w, h];
    }),
  );
  await page.addStyleTag({ content: "html,body{overflow:visible!important;margin:0}" });
  await page.setViewport({ width: Math.max(...sizes.map(([w]) => w)), height: 720 });
  await page.evaluate(() => document.fonts.ready);

  const found = await page.evaluate(() => {
    const parse = (s) => {
      const m = s.match(/^rgba?\(([^)]+)\)$/);
      if (m) return m[1].split(/[ ,/]+/).filter(Boolean).map(Number).slice(0, 3);
      const c = s.match(/^color\(srgb ([^)]+)\)$/);
      if (c) return c[1].split(/[ /]+/).filter(Boolean).map(Number).slice(0, 3).map((v) => v * 255);
      return s;
    };
    const out = [];
    document.querySelectorAll("svg[data-marpit-svg] > foreignObject > section").forEach((sec, i) => {
      const box = sec.getBoundingClientRect();
      const kind = sec.classList.contains("lead") ? "lead" : sec.classList.contains("invert") ? "invert" : "light";
      const at = (r) => [r.left, r.top - box.top, r.right, r.bottom - box.top];
      const walker = document.createTreeWalker(sec, NodeFilter.SHOW_TEXT);
      for (let n; (n = walker.nextNode()); ) {
        if (!n.textContent.trim()) continue;
        const el = n.parentElement;
        const cs = getComputedStyle(el);
        if (cs.visibility === "hidden") continue;
        const range = document.createRange();
        range.selectNodeContents(n);
        const rects = [...range.getClientRects()]
          .filter((r) => r.width > 1 && r.height > 1 && r.bottom > box.top && r.top < box.bottom)
          .map(at);
        if (!rects.length) continue;
        const path = [];
        for (let e = el; e !== sec; e = e.parentElement)
          path.unshift(e.tagName.toLowerCase() + (e.classList[0] ? `.${e.classList[0]}` : ""));
        out.push({ slide: i, kind, text: n.textContent.trim().slice(0, 40), path: path.join(">"),
          color: parse(cs.color), size: parseFloat(cs.fontSize), weight: Number(cs.fontWeight), rects });
      }
      // The page number is generated content, so measure the box Gaia puts it in.
      const after = getComputedStyle(sec, "::after");
      if (!["none", "normal"].includes(after.content))
        out.push({ slide: i, kind, text: "page number", path: "section::after",
          color: parse(after.color), size: parseFloat(after.fontSize), weight: Number(after.fontWeight),
          rects: [[box.right - 115, box.height - 55, box.right - 25, box.height - 15]] });
    });
    return out;
  });

  // Hide the text, then read what was behind it, one slide at a time.
  await page.addStyleTag({
    content: `section, section *, section::after, section *::before, section *::after {
      color: transparent !important; -webkit-text-fill-color: transparent !important;
      text-shadow: none !important; text-decoration-color: transparent !important; }`,
  });
  const tops = await page.evaluate(() =>
    [...document.querySelectorAll("svg[data-marpit-svg]")].map((s) => s.getBoundingClientRect().top + scrollY),
  );
  for (const [i, [w, h]] of sizes.entries()) {
    const slideRuns = found.filter((run) => run.slide === i);
    const png = await page.screenshot({
      clip: { x: 0, y: tops[i], width: w, height: h }, captureBeyondViewport: true, encoding: "base64",
    });
    const worst = await page.evaluate(async (png, slideRuns) => {
      const lin = (c) => ((c /= 255) <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
      const lum = (r, g, b) => 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
      const bmp = await createImageBitmap(await (await fetch(`data:image/png;base64,${png}`)).blob());
      const ctx = new OffscreenCanvas(bmp.width, bmp.height).getContext("2d");
      ctx.drawImage(bmp, 0, 0);
      const { data, width, height } = ctx.getImageData(0, 0, bmp.width, bmp.height);
      return slideRuns.map(({ color, rects }) => {
        if (typeof color === "string") return null;
        const fg = lum(...color);
        const px = [];
        for (const [x0, y0, x1, y1] of rects)
          for (let y = Math.max(0, Math.ceil(y0)); y < Math.min(height, Math.floor(y1)); y++)
            for (let x = Math.max(0, Math.ceil(x0)); x < Math.min(width, Math.floor(x1)); x++) {
              const o = (y * width + x) * 4;
              const bg = lum(data[o], data[o + 1], data[o + 2]);
              px.push([(Math.max(fg, bg) + 0.05) / (Math.min(fg, bg) + 0.05), o]);
            }
        if (!px.length) return null;
        px.sort((a, b) => a[0] - b[0]);
        const [ratio, o] = px[Math.floor(px.length * 0.01)];
        return { ratio, bg: [data[o], data[o + 1], data[o + 2]] };
      });
    }, png, slideRuns);
    slideRuns.forEach((run, j) => runs.push({ deck: basename(deck), ...run, ...worst[j] }));
  }
  await page.close();
}
await browser.close();

const hex = (rgb) => `#${rgb.map((v) => Math.round(v).toString(16).padStart(2, "0")).join("")}`;
for (const run of runs) {
  // WCAG large text: 18pt (24px), or 14pt (18.66px) bold.
  const size = run.size * Number(opts.scale);
  run.large = size >= 24 || (size >= 18.66 && run.weight >= 700);
  run.aa = run.ratio >= (run.large ? 3 : 4.5);
  run.aaa = run.ratio >= (run.large ? 4.5 : 7);
  run.label = `${run.kind}|${run.path.replace(/^.*>span\.(hljs-[\w-]+)$/, "$1")}|${
    typeof run.color === "string" ? run.color : hex(run.color)}`;
}
const unmeasured = runs.filter((run) => run.ratio === undefined);
const measured = runs.filter((run) => run.ratio !== undefined);
const failing = measured.filter((run) => !run[opts.level]);
console.log(`${measured.length} text runs, ${measured.filter((run) => !run.aa).length} fail AA, ${
  measured.filter((run) => !run.aaa).length} fail AAA`);
for (const run of unmeasured)
  console.log(`not measured: "${run.text}" (${run.deck} #${run.slide + 1}), ${
    typeof run.color === "string" ? `unknown colour ${run.color}` : "no pixels on the slide"}`);

const groups = Map.groupBy(failing, (run) => run.label);
for (const [label, group] of [...groups].sort((a, b) =>
  Math.min(...a[1].map((r) => r.ratio)) - Math.min(...b[1].map((r) => r.ratio)))) {
  const w = group.reduce((a, b) => (a.ratio < b.ratio ? a : b));
  const need = opts.level === "aa" ? (w.large ? 3 : 4.5) : w.large ? 4.5 : 7;
  console.log(`${w.ratio.toFixed(2)} need ${need} ${label} on ${hex(w.bg)} ${
    +(w.size * Number(opts.scale)).toFixed(1)}px/${w.weight} x${group.length} e.g. "${w.text}" (${w.deck} #${w.slide + 1})`);
}
process.exit(failing.length || unmeasured.some((run) => typeof run.color === "string") ? 1 : 0);
