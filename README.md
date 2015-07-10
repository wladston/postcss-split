# PostCSS Split

[PostCSS] plugin to split annotated CSS into two: a small set of important rules that will be embedded in the HTML, and a large set of rules that will be loaded asynchronously.

[PostCSS]: https://github.com/postcss/postcss

```css
/* Input example */
a /*FOLD*/ { 
    color:blue
}
b {
    font-weight:bold
}
@media only screen and (max-width: 500px){
    a /*FOLD*/ {
        color:black
    }
    b /*FOLD*/ {
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
