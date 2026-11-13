---
tiptitle: "Inline Minified CSS"
date: 2018-06-07
tags: ["related-filters"]
---

_Originally posted on [The Simplest Web Site That Could Possibly Work Well on zachleat.com](https://www.zachleat.com/web/that-could-possibly-work/)_

This tip works well on small sites that don’t have a lot of CSS. Inlining your CSS removes an external request from your critical path and speeds up page rendering times! If your CSS file is small enough, this is a simplification/end-around for [Critical CSS approaches](https://www.smashingmagazine.com/2015/08/understanding-critical-css/).

## Installation

`npm install lightningcss --save-dev` to make the CSS minifier available in your project.

## Configuration

Add the following `cssmin` filter to your Eleventy Config file:

{% set codeContent %}
import { transform } from "lightningcss";

export default function ($config$) {
	$config.addFilter("cssmin", function (inputCode) {
		if (process.env.ELEVENTY_RUN_MODE === "build") {
			let { code } = transform({
				// filename: undefined,
				code: Buffer.from(inputCode),
				minify: true,
				sourceMap: false
			});
			return code;
		}

		return `/* [buildawesome] cssmin skipped during --watch and --serve */\n${inputCode}`;
	});
};
{% endset %}
{% include "snippets/configDefinition.njk" %}

## Create your CSS File

Add a sample CSS file to your `_includes` directory. Let’s call it `sample.css`.

```css
body {
	font-family: fantasy;
}
```

## Capture and Minify

Capture the CSS into a variable and run it through the filter (this sample is using Nunjucks syntax)

{% raw -%}

```html
<!-- capture the CSS content as a Nunjucks variable -->
{% set css %} {% include "sample.css" %} {% endset %}
<!-- feed it through our cssmin filter to minify -->
<style>
	{{ css | cssmin | safe }}
</style>
```

{% endraw %}

## Warning about Content Security Policy

{% callout "warn" %}
If you are using a Content Security Policy on your website, make sure the <code>style-src</code> directive allows <code>'unsafe-inline'</code>. Otherwise, your inline CSS will not load.
{% endcallout %}

## Or: use an `11ty.js` Template

_Contributed by [Zach Green](https://github.com/zgreen)_

You can also inline minified CSS in a [JavaScript template](/docs/languages/javascript/). This technique does not use filters, and instead uses `async` functions:

{% set codeContent %}
import fs from "node:fs/promises";
import path from "node:path";
import { transform } from "lightningcss";

export default async function (data) {
	return `<style>
	  ${await fs
			.readFile(path.resolve(__dirname, "./sample.css"))
			.then(inputCode => {
				let { code } = transform({
					// filename: undefined,
					code: Buffer.from(inputCode),
					minify: true,
					sourceMap: false
				});

				return code;
			})}
	</style>`;
};
{% endset %}
{% include "snippets/configDefinition.njk" %}

