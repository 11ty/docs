---
tiptitle: "Inline Minified JavaScript"
date: 2018-06-08
tags: ["related-filters"]
---

_Originally posted on [The Simplest Web Site That Could Possible Work Well on zachleat.com](https://www.zachleat.com/web/that-could-possibly-work/)_

This tip works great if you have small JS utilities that you’d like to have in your `<head>`. For example, this works great with the Filament Group [`loadJS`](https://github.com/filamentgroup/loadJS) or [`loadCSS`](https://github.com/filamentgroup/loadCSS) utilities.

## Installation

`npm install terser` to make the terser minifier available in your project.

## Configuration

Add the following `jsmin` filter to your Eleventy Config file:

{% set codeContent %}
import { minify } from "terser";

export default function (eleventyConfig) {
	eleventyConfig.addFilter("jsmin", async function (code) {
		try {
			const minified = await minify(code);
			return minified.code;
		} catch (err) {
			console.error("Terser error: ", err);
			// Fail gracefully.
			return code;
		}
	});
};
{% endset %}
{% include "snippets/configDefinition.njk" %}

## Create your JavaScript File

Add a sample JavaScript file to your `_includes` directory. Let’s call it `sample.js`.

```js
// Hi
console.log("Hi");
```

## Capture and Minify

Capture the JavaScript into a variable and run it through the filter (this sample is using Nunjucks syntax)

{% raw -%}

```html
<!-- capture the JS content as a Nunjucks variable -->
{% set js %} {% include "sample.js" %} {% endset %}
<!-- feed it through our jsmin filter to minify -->
<script>
{{ js | jsmin | safe }}
</script>
```

{% endraw %}

### Warning about Content Security Policy

{% callout "warn" %}
If you are using a Content Security Policy on your website, make sure the <code>script-src</code> directive allows <code>'unsafe-inline'</code>. Otherwise, your inline Javascript will not load.
{% endcallout %}
