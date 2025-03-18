# ⚠️ PostCSS Split (Deprecated)

🚨 **This project is no longer maintained.**  
For a modern alternative that works with **PostCSS 8**, use:  
👉 **[`postcss-critical-split`](https://github.com/mrnocreativity/postcss-critical-split)**.

---

[PostCSS] plugin to split annotated CSS into two: a small set of important rules that will be embedded in the HTML, and a large set of rules that will be loaded asynchronously.

[PostCSS]: https://github.com/postcss/postcss

```css
/* Input example */
a {
    /*!CRITICAL*/
    color:blue
}
b {
    font-weight:bold
}
@media only screen and (max-width: 500px){
    a {
        /*!CRITICAL*/
        color:black
    }
    b {
        /*!CRITICAL*/
        color:blue
    }
    c {
        color: orange
    }
}
```

```css
  /* Output example */
a {
    color:blue
}
@media only screen and (max-width: 500px){
    a {
        color:black
    }
    b {
        color:blue
    }
}
```

## Usage

```js
postcss([ require('postcss-split') ])
```
