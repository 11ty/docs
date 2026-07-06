---
eleventyNavigation:
  parent: JavaScript
  key: TypeScript
addedInVersion: 3.0.0-alpha.11
relatedTitle: Template Language—TypeScript
layout: layouts/langs.njk
---

<!-- {% tableofcontents "open" %} -->

| Eleventy Short Name                       | File Extension | npm Package                       |
| ----------------------------------------- | -------------- | --------------------------------- |
| `11ty.ts`                                 | `.11ty.ts`     | [`tsx`]({{ externalLinks.tsxNodeUse }})  |
| [`11ty.tsx`](/docs/languages/typescript/) | `.11ty.tsx`    | [`tsx`]({{ externalLinks.tsxNodeUse }})  |

* Related languages: [JSX](/docs/languages/jsx/), [JavaScript](/docs/languages/javascript/), [Custom](/docs/languages/custom/)
* _[Front matter](/docs/data-frontmatter/) is not supported in TypeScript files. Use a `data` export instead._

## Configuration

{% addedin "3.0.0-alpha.11" %}Here we use [Node.js’ type stripping feature](https://nodejs.org/api/typescript.html) (available in Node 22.6+) to process `*.11ty.ts` TypeScript files.

<div class="codetitle">buildawesome.config.js</div>
{%- set codeBlock %}

export default function ($config) {
	$config.addExtension("11ty.ts", {
		key: "11ty.js",
	});

	// Add to --formats via Configuration
	// or via CLI: --formats=11ty.ts
	$config.addTemplateFormats("11ty.ts");
}
{%- endset %}
{{ codeBlock | highlight("js") | safe }}

You can optionally use an Array `["11ty.ts", "11ty.cts", "11ty.mts"]` instead of `"11ty.ts"` above (in both places) to add additional file extensions supported in Node.js.

### Or use `tsx` (Node.js)

{% addedin "3.0.0-alpha.11" %}Alternatively, you can use [`tsx`]({{ externalLinks.tsxNodeUse }}) to process `.11ty.jsx`, `.11ty.ts`, and `.11ty.tsx` files.

{% callout "info", "md" %}This approach requires ESM (read more at [Issue #3304](https://github.com/11ty/eleventy/issues/3304)). This means your project `package.json` must contain `"type": "module"` or your configuration file must use the `.mjs` file extension, e.g. `eleventy.config.mjs`. Read more about [CommonJS versus ESM](../cjs-esm.md).{% endcallout %}

<div class="codetitle">buildawesome.config.js</div>
{%- set codeBlock %}
import "tsx/esm";
import { renderToStaticMarkup } from "react-dom/server";

export default function ($config) {
	// We can add support for JSX too, at the same time:
	$config.addExtension(["11ty.jsx", "11ty.ts", "11ty.tsx"], {
		key: "11ty.js",
		compile: function () {
			return async function (data) {
				let content = await this.defaultRenderer(data);
				return renderToStaticMarkup(content);
			};
		},
	});

	// Add to --formats via Configuration
	// or via CLI: --formats=11ty.jsx,11ty.ts,11ty.tsx
	$config.addTemplateFormats(["11ty.jsx", "11ty.ts", "11ty.tsx"]);
}
{%- endset %}
{{ codeBlock | highlight("js") | safe }}

Now Eleventy will find and process `**/*.11ty.{jsx,ts,tsx}` files.

## Using a TypeScript Configuration File

{% addedin "3.0.0-alpha.11" %}Here we use [Node.js’ type stripping feature](https://nodejs.org/api/typescript.html) (available in Node 22.6+) to use a TypeScript configuration file.

{%- set codeBlock %}
npx @11ty/eleventy --config=eleventy.config.ts
{%- endset %}
{{ codeBlock | highlight("bash") | safe }}

### Or use `tsx` (Node.js)

You can use `tsx` to process your configuration file too, just run it directly like so:

{%- set codeBlock %}
npx tsx ./node_modules/.bin/eleventy --config=eleventy.config.ts
{%- endset %}
{{ codeBlock | highlight("bash") | safe }}

## Community Contributions <span id="alternative-approaches"></span>

* {% indieweblink "JetBrains: Better 11ty Development with Tooling", "https://www.jetbrains.com/guide/javascript/tutorials/eleventy-tsx/" %}

### Using `esbuild-register`

If you’d like an approach that works with CommonJS and Eleventy 2.0, you can use [`esbuild-register`](https://github.com/egoist/esbuild-register) with Eleventy (using the same conventions as [`11ty.js` templates](/docs/languages/javascript/)). Check out [this gist from `@pspeter3` on GitHub](https://gist.github.com/zachleat/b274ee939759b032bc320be1a03704a2) or [this GitHub comment from `@danielrob`](https://github.com/11ty/eleventy/issues/577#issuecomment-1464868585).

Your config file might look like this:

{% codetitle "buildawesome.config.js (CommonJS)" %}
{%- set codeBlock %}
const { register } = require("esbuild-register/dist/node");

register();

module.exports = function($config) {
	// We can add support for JSX too, at the same time:
	$config.addExtension(["11ty.jsx", "11ty.ts", "11ty.tsx"], {
		key: "11ty.js",
	});
};
{%- endset %}
{{ codeBlock | highlight("js") | safe }}

Now run Eleventy and tell it to process `11ty.ts` and `11ty.tsx` files:

{%- set codeBlock %}
npx @11ty/eleventy --formats=11ty.ts,11ty.tsx
{%- endset %}
{{ codeBlock | highlight("bash") | safe }}