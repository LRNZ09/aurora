---
marp: true
theme: aurora
paginate: true
---

# Aurora Theme Demo

This presentation tests the customizable **Aurora Marp theme**.

---

## Typography and Links

This slide demonstrates:

- List formatting
  - Nested item
    - Deeply nested item
- **Bold**, *Italic*, and ~~Strikethrough~~
- Link to [somewhere](https://lorenzopieri.dev)

---

## Table

| ID    | Description                         | Status      |
|-------|-------------------------------------|-------------|
| # 101 | Login button unresponsive on mobile | Open        |
| # 102 | Incorrect total in shopping cart    | In Progress |
| # 103 | Profile picture upload fails         | Resolved    |
| # 104 | 404 error on FAQ page               | Won't Fix   |
| # 105 | Search results not paginated        | In Review   |

---

## Code

Inline code: `CONSTANT`

Block code:

```tsx
interface GreetProps {
  name: string
}

const Greet = ({ name }: GreetProps) => {
  return <span>Hello, {name}!</span>
}
```

---

## Blockquote

> Design is not just what it looks like and feels like. Design is how it works.
> — Steve Jobs

---

<!-- _header: Header
_footer: Footer -->

## Header & Footer

This slide shows the header and the footer in action.

---

<!-- _class: lead -->

## Lead Slide

This slide uses the `lead` style with a vibrant background and white highlights.

> Make a bold first impression <mark>about something significant</mark>.

---

<!-- _class: invert -->

## Invert Slide

This slide uses the `invert` style with a dark background and bright highlights.

- Highlight color is used for [links](https://example.com)
- Also applies to <mark>highlighted text</mark> and block borders

> It brings contrast and clarity — <mark>perfect for emphasis</mark>.
