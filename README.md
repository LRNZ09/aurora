# aurora

**Aurora** is a customizable theme for [Marp](https://marp.app/), designed to create visually appealing presentations.

## Features

- **Customizable Colors and Fonts**: Built with Gaia-compatible variables for easy customization.
- **Code Blocks**: Styled for readability with a highlight stripe.
- **Tables and Blockquotes**: Clean and professional formatting.
- **Slide Variants**: Improved `lead` and `invert` styles for emphasis.
- **Images and Emoji**: A lone image is centered on its slide, and emoji stay inline at text size.
- **Slide Videos**: With Marp CLI, a video can autoplay on its slide, and a click opens it full-window.
- **Pagination**: Displays current and total slide numbers.

## Demo

Check out the [demo.md](demo.md) file for an example presentation using the Aurora theme.

## Usage

1. Install the [Marp for VS Code](https://marketplace.visualstudio.com/items?itemName=marp-team.marp-vscode) extension.

2. Add the `marp-aurora-theme.css` theme to your Marp configuration:

    ```json
    {
        "markdown.marp.themes": [
            "https://raw.githubusercontent.com/LRNZ09/aurora/refs/heads/main/marp-aurora-theme.css"
        ]
    }
    ```

3. Create a Markdown file with the following front matter:

    ```yaml
    ---
    marp: true
    theme: aurora
    paginate: true
    ---
    ```

4. Write your slides in Markdown and preview them in VS Code.

## Marp CLI

[Marp CLI](https://github.com/marp-team/marp-cli) reads the `.marprc.yml` in the folder you run it from. The one
here registers the theme and allows local files, so from this folder:

```sh
npx @marp-team/marp-cli demo.md        # demo.html
npx @marp-team/marp-cli --pdf demo.md  # demo.pdf
```

From another folder, pass it with `--config-file path/to/.marprc.yml`.

## Slide Videos

The `.marprc.yml` also loads `marp-engine.mjs`, which handles videos on slides:

```html
<video data-autoplay src="./clip.mp4" poster="./clip.png"></video>
```

- **Autoplay** (opt-in with `data-autoplay`): the video plays muted from the start when its slide comes up, and pauses
  when the deck moves on. Only in the audience window, not in the presenter view.
- **Full-window player**: a click on any slide video opens it full-window with working controls, at the same position.
  Esc or a click on the backdrop closes it, and the slide video moves to where the full-window one stopped.
- **No inline controls**: inside Marp's scaled slides, Safari draws native controls at the wrong scale and Chromium
  shows them only while the pointer moves, so the theme and the engine hide them.

## Extensions

To enhance your Markdown editing experience, install the following extensions:

- [Markdown Emoji](https://marketplace.visualstudio.com/items?itemName=bierner.markdown-emoji)
- [markdownlint](https://marketplace.visualstudio.com/items?itemName=davidanson.vscode-markdownlint)

## License

This project is licensed under the [MIT License](./LICENSE).
