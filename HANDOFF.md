# Handoff: two open contrast decisions

Branch `feat/tint-and-aa-contrast` (PR #2) makes the theme pass WCAG AA contrast at the default
1280×720 size. Its commits and PR description cover what changed and why. Two decisions are left
for the owner, and this note gives the next session what it needs to carry out either one.

1. **AA at the 4K presets** (`size: 16:9` / `4:3`, shown on a 1080p screen).
2. **AAA** (SC 1.4.6, 7:1 / 4.5:1).

Both cost the lead slide its bright orange, which is why they were left as decisions. Ask the
owner which one, if either, before changing the theme.

## Measuring

```sh
npx -p @marp-team/marp-cli node contrast/audit.mjs                            # AA, 1280×720
npx -p @marp-team/marp-cli node contrast/audit.mjs --size 16:9 --scale 0.5   # AA, 4K on 1080p
npx -p @marp-team/marp-cli node contrast/audit.mjs --level aaa               # AAA
```

`--scale 0.5` matters. A 4K slide keeps the 1280 text sizes, so on a 1080p screen 33px body text
shows at 16.5px and needs 4.5:1 for AA, not 3:1. Header, footer and page number show at 9px.
State of the branch: 0 AA failures at 1280×720, 108 at 4K (all on lead slides), and 145 AAA
failures at 1280×720.

## The constraint behind both

White text needs a background luminance of at most 0.30 for 3:1, 0.183 for 4.5:1 and 0.10 for
7:1. The primary `#cc0033` is 0.13 (white 5.8:1) and `#ff9900` is 0.44 (white 2.1:1). The lead
currently ends on `color-mix(in srgb, var(--color-secondary) 60%, var(--color-primary))`, which
is `#eb5c14`, 0.25. That gives white 3.5:1, enough only for large text. No vivid orange gets
below 0.18. Darker text doesn't help either: ink on the crimson top is only 3.5:1. So any
stricter target means a darker gradient, or text on a darker surface.

## 1. AA at the 4K presets

The failures are white body text in the lower half of the lead, at 3.2 to 4.1:1 against 4.5.
The bottom stop needs luminance of about 0.15 or less, because the lavender dimmed text
(`#f0ebff`) and the 5% white blockquote stripe have less headroom than plain white.

A version already checked to give 0 AA failures at both 4K presets, from a scratch variant
named "tone":

```css
section.lead {
  --color-background: color-mix(in srgb, var(--color-primary) 70%, var(--color-dark)); /* #8f0024 */
  background: linear-gradient(
    180deg,
    var(--color-primary),
    color-mix(in srgb, var(--color-secondary) 35%, var(--color-background)) /* ≈ #b63617 */
  );
}
```

- **Look:** crimson to a deep rust, with the orange gone.
- **Delete the ink footer rule.** `section.lead footer` and `section.lead::after` set
  `color: var(--color-ink)`, and ink fails 4.5:1 on a dark bottom stop. The default footer and
  page number colours pass there.
- **Lead table header text** becomes `--color-background` on white (about 9.5:1), which is fine.
- **Single-mix alternative:** `color-mix(in srgb, var(--color-secondary) 30%, var(--color-primary))`
  (`#db2e24`) gives white 4.7:1, but the lavender footer only 4.1:1, so the lead footer would
  have to turn plain white.

## 2. AAA

At 1280×720, AAA lets the 33px body text and the headings pass at 4.5:1. The failures are:

- **Lead text**, 34 groups. The "tone" stop above fixes the body text. The 18px header, footer
  and page number still need 7:1 and reach only 4.9 to 5.9. The "tone" variant made them WCAG
  large text instead: `font-size: 19px` on `header, footer`, and `font-size: 19px;
  font-weight: bold` on `section::after`. 19px bold is just over the 18.66px threshold, so this
  holds only at 1280×720, not at 4K.
- **Links in a quote inside a quote, or in a table inside a quote** (4.43 to 4.48), where two
  stripes stack. The fix is
  `blockquote :is(blockquote, table) { --color-background-stripe: transparent; }`.
- **Links and marks in the header and footer** (18px bold, so 7:1 applies; 5.5 to 5.6). The fix
  is `section :is(header, footer) :is(a, mark) { color: inherit; }`. Links keep their underline.

For AAA that also holds on the 4K presets (`--level aaa --size 16:9 --scale 0.5`), all text needs
7:1:

- **Lead:** both stops dark, about 0.07, as in the scratch variant "tone-strict": top
  `color-mix(in srgb, var(--color-primary) 75%, var(--color-dark))` (`#990026`), bottom
  `color-mix(in srgb, var(--color-secondary) 25%, var(--color-background))` with
  `--color-background: color-mix(in srgb, var(--color-primary) 50%, var(--color-dark))`
  (`#8c2613`). This turns the lead into an oxblood slide.
- **Light-slide links:** need a darker crimson for text, such as
  `color-mix(in srgb, var(--color-primary) 75%, var(--color-ink))` (`#9b012b`, 8.4:1). Keep the
  pure highlight for the top stripe, borders and dashes.

**Don't break SC 1.4.1 (Level A) on the way.** A word set apart by colour alone needs 3:1 against
the text around it. `#9b012b` is only 2.3:1 against the ink, while `#cc0033` is 3.5:1. So:

- Give the darker crimson to **links** only, since their underline carries the difference.
- **Marks** are boxes now (`section mark`), so the darker crimson can be the box background
  instead. White on `#9b012b` is 8.4:1.
- **Strong words in h1 to h3** stay large text even at 4K on 1080p, so 4.5:1 is enough and they
  can keep `#cc0033`. h4 to h6 drop below large size there; that's a judgement call.

**A layout alternative that keeps the exact gradient:** lead text on a deep crimson surface
(`color-mix(in srgb, var(--color-primary) 75%, var(--color-ink))`), with the gradient as a 14px
frame:

```css
background:
  linear-gradient(var(--color-background), var(--color-background)) center /
    calc(100% - 28px) calc(100% - 28px) no-repeat,
  linear-gradient(180deg, var(--color-primary), var(--color-secondary));
```

It passes 7:1 on the lead, but at 4K the frame shrinks to a 5px hairline, and the top stripe
(`section.lead::before`) has to go.

**Beyond contrast:** a full AAA claim also includes SC 1.4.8. That asks for line-height 1.5 (the
theme uses 1.25), paragraph spacing of at least 1.5 times the line spacing, and lines of at most
80 characters (72 to 82 at 1280×720). Changing the line height would cut how much fits on a
slide, so it's a separate decision.

## Caveats

- Every pass is proven for the default palette only. The mixes are fixed percentages of
  `--color-primary`, `--color-secondary` and `--color-tint`, so a custom palette can drop below
  the target. Rerun the audit after any palette change.
- The audit doesn't measure decoration: the blockquote quote marks, the top stripe and borders.
- PR #3 (`fix/lead-code-block-border`) is stacked on this branch. If you change the lead's
  colours, check that its crimson code-block stripe still shows against the white block.

## Suggested skills

- `frontend-design` for tuning the gradient by eye.
- `council` if the owner wants the orange-versus-contrast trade-off pressure-tested.
- `superpowers:verification-before-completion`: run the audit before claiming a level.
- `commit` and `pr-writer` to ship it.
