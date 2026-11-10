---
marp: true
theme: aurora
paginate: true
---

```js
/** Greets. @param {string} name */
const re = /a+b/g, n = 0x2a, t = `x ${n + 1} y`
async function greet(name = null) { return console.log("hi\n" + name, true) }
class Greeter extends Base { static #id = 1 }
```

```python
@dataclass
class Point(Base):
    def norm(self, k=None):  # comment
        return f"{self.x!r} is {k}" + r'\d+' + str(3.14)
```

---

```bash
# comment
export PATH="$HOME/bin:$PATH"; echo "today $(date +%F) ${USER}"
if [ -f ~/.rc ]; then source ~/.rc; fi
```

```css
@import url("x.css");
.card #main a[type="x"]:hover::before { color: rgb(0 0 0 / 50%) !important; }
@media (min-width: 40em) { :root { --gap: 1.5rem } }
```

```php
<?php $total = $price * 2; echo "Sum: {$total}"; ?>
```

---

```html
<!doctype html>
<!-- comment -->
<a href="#x" class="btn" disabled>Go &amp; see</a>
<script>let a = 1</script><style>p { margin: 0 }</style>
```

```diff
--- a/file.txt
+++ b/file.txt
@@ -1,3 +1,3 @@
 context line
-old line removed
+new line added
```

```markdown
# Heading
- item with [link](https://x.y) and **bold**, *em*, `code`
> quote
```

---

```yaml
# comment
key: "value"
list: [1, 2.5, true, null]
anchor: &base { a: 1 }
ref: *base
```

```json
{ "name": "aurora", "n": 42, "ok": false, "x": null }
```

```sql
SELECT id, 'text' AS s FROM users WHERE age > 21; -- comment
```

---

```c
#include <stdio.h>
int main(void) { printf("%d\n", 42); return 0; } /* block */
```

```ruby
def hi(name) = puts "hi #{name}", :sym, 3, nil
```

```
code block with no language: plain <text> 123 "quoted"
```

```text
plaintext language block
```

    indented code block line

<pre><code><span class="hljs-formula">raw formula span</span> <span class="hljs-template-variable">{{tpl}}</span> <span class="hljs-quote">quote</span> <span class="hljs-section">section</span> <span class="hljs-type">int</span></code></pre>

---

<!-- _header: Header `code`
_footer: Footer `code` -->

### Inline `code` in an h3

| `th code` | Value |
|-----|-------|
| a   | `one` |
| b   | a [`link code`](https://x.y) |

> Quote with `inline code` and a [link](https://x.y)

Text <mark>mark with `code`</mark> and **bold `code`**.

---

<!-- _class: invert -->

```js
/** Greets. @param {string} name */
const re = /a+b/g, n = 0x2a, t = `x ${n + 1} y`
async function greet(name = null) { return console.log("hi\n" + name, true) }
class Greeter extends Base { static #id = 1 }
```

```python
@dataclass
class Point(Base):
    def norm(self, k=None):  # comment
        return f"{self.x!r} is {k}" + r'\d+' + str(3.14)
```

---

<!-- _class: invert -->

```bash
# comment
export PATH="$HOME/bin:$PATH"; echo "today $(date +%F) ${USER}"
if [ -f ~/.rc ]; then source ~/.rc; fi
```

```css
@import url("x.css");
.card #main a[type="x"]:hover::before { color: rgb(0 0 0 / 50%) !important; }
@media (min-width: 40em) { :root { --gap: 1.5rem } }
```

```php
<?php $total = $price * 2; echo "Sum: {$total}"; ?>
```

---

<!-- _class: invert -->

```html
<!doctype html>
<!-- comment -->
<a href="#x" class="btn" disabled>Go &amp; see</a>
<script>let a = 1</script><style>p { margin: 0 }</style>
```

```diff
--- a/file.txt
+++ b/file.txt
@@ -1,3 +1,3 @@
 context line
-old line removed
+new line added
```

```markdown
# Heading
- item with [link](https://x.y) and **bold**, *em*, `code`
> quote
```

---

<!-- _class: invert -->

```yaml
# comment
key: "value"
list: [1, 2.5, true, null]
anchor: &base { a: 1 }
ref: *base
```

```json
{ "name": "aurora", "n": 42, "ok": false, "x": null }
```

```sql
SELECT id, 'text' AS s FROM users WHERE age > 21; -- comment
```

---

<!-- _class: invert -->

```c
#include <stdio.h>
int main(void) { printf("%d\n", 42); return 0; } /* block */
```

```ruby
def hi(name) = puts "hi #{name}", :sym, 3, nil
```

```
code block with no language: plain <text> 123 "quoted"
```

```text
plaintext language block
```

    indented code block line

<pre><code><span class="hljs-formula">raw formula span</span> <span class="hljs-template-variable">{{tpl}}</span> <span class="hljs-quote">quote</span> <span class="hljs-section">section</span> <span class="hljs-type">int</span></code></pre>

---

<!-- _class: invert
_header: Header `code`
_footer: Footer `code` -->

### Inline `code` in an h3

| `th code` | Value |
|-----|-------|
| a   | `one` |
| b   | a [`link code`](https://x.y) |

> Quote with `inline code` and a [link](https://x.y)

Text <mark>mark with `code`</mark> and **bold `code`**.

---

<!-- _class: lead -->

```js
/** Greets. @param {string} name */
const re = /a+b/g, n = 0x2a, t = `x ${n + 1} y`
async function greet(name = null) { return console.log("hi\n" + name, true) }
class Greeter extends Base { static #id = 1 }
```

```python
@dataclass
class Point(Base):
    def norm(self, k=None):  # comment
        return f"{self.x!r} is {k}" + r'\d+' + str(3.14)
```

---

<!-- _class: lead -->

```bash
# comment
export PATH="$HOME/bin:$PATH"; echo "today $(date +%F) ${USER}"
if [ -f ~/.rc ]; then source ~/.rc; fi
```

```css
@import url("x.css");
.card #main a[type="x"]:hover::before { color: rgb(0 0 0 / 50%) !important; }
@media (min-width: 40em) { :root { --gap: 1.5rem } }
```

```php
<?php $total = $price * 2; echo "Sum: {$total}"; ?>
```

---

<!-- _class: lead -->

```html
<!doctype html>
<!-- comment -->
<a href="#x" class="btn" disabled>Go &amp; see</a>
<script>let a = 1</script><style>p { margin: 0 }</style>
```

```diff
--- a/file.txt
+++ b/file.txt
@@ -1,3 +1,3 @@
 context line
-old line removed
+new line added
```

```markdown
# Heading
- item with [link](https://x.y) and **bold**, *em*, `code`
> quote
```

---

<!-- _class: lead -->

```yaml
# comment
key: "value"
list: [1, 2.5, true, null]
anchor: &base { a: 1 }
ref: *base
```

```json
{ "name": "aurora", "n": 42, "ok": false, "x": null }
```

```sql
SELECT id, 'text' AS s FROM users WHERE age > 21; -- comment
```

---

<!-- _class: lead -->

```c
#include <stdio.h>
int main(void) { printf("%d\n", 42); return 0; } /* block */
```

```ruby
def hi(name) = puts "hi #{name}", :sym, 3, nil
```

```
code block with no language: plain <text> 123 "quoted"
```

```text
plaintext language block
```

    indented code block line

<pre><code><span class="hljs-formula">raw formula span</span> <span class="hljs-template-variable">{{tpl}}</span> <span class="hljs-quote">quote</span> <span class="hljs-section">section</span> <span class="hljs-type">int</span></code></pre>

---

<!-- _class: lead
_header: Header `code`
_footer: Footer `code` -->

### Inline `code` in an h3

| `th code` | Value |
|-----|-------|
| a   | `one` |
| b   | a [`link code`](https://x.y) |

> Quote with `inline code` and a [link](https://x.y)

Text <mark>mark with `code`</mark> and **bold `code`**.

---

<!-- _class: lead invert -->

## Lead invert `code`

```js
const s = `a ${b}` // c
```
