# aurora

**Aurora** is a customizable theme for [Marp](https://marp.app/), designed to create visually appealing presentations.

## Features

- **Customizable Colors and Fonts**: Built with Gaia-compatible variables for easy customization.
- **Code Blocks**: Styled for readability with a highlight stripe.
- **Tables and Blockquotes**: Clean and professional formatting.
- **Slide Variants**: Improved `lead` and `invert` styles for emphasis.
- **Images and Emoji**: A lone image is centered on its slide, and emoji stay inline at text size.
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

## Extensions

To enhance your Markdown editing experience, install the following extensions:

- [Markdown Emoji](https://marketplace.visualstudio.com/items?itemName=bierner.markdown-emoji)
- [markdownlint](https://marketplace.visualstudio.com/items?itemName=davidanson.vscode-markdownlint)

## License

This project is licensed under the [MIT License](./LICENSE).
