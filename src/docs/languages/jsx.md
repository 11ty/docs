---
eleventyNavigation:
  parent: JavaScript
  key: JSX
addedInVersion: 3.0.0-alpha.11
relatedTitle: Template Language—JSX
layout: layouts/langs.njk
---

<!-- {% tableofcontents "open" %} -->

| Eleventy Short Name                       | File Extension | npm Package                       |
| ----------------------------------------- | -------------- | --------------------------------- |
| `11ty.jsx`                                | `.11ty.jsx`    | [`tsx`]({{ externalLinks.tsxNodeUse }})  |
| [`11ty.tsx`](/docs/languages/typescript/) | `.11ty.tsx`    | [`tsx`]({{ externalLinks.tsxNodeUse }})  |

- Related languages: [TypeScript](/docs/languages/typescript/), [JavaScript](/docs/languages/javascript/), [MDX](/docs/languages/mdx/), [Custom](/docs/languages/custom/)
- _[Front matter](/docs/data-frontmatter/) is not supported in JSX files. Use a `data` export instead._

{% callout "info", "md" %}JSX requires ESM (when used with Eleventy, read more at [Issue #3304](https://github.com/11ty/eleventy/issues/3304)). This means your project `package.json` must contain `"type": "module"` or your configuration file must use the `.mjs` file extension, e.g. `eleventy.config.mjs`.{% endcallout %}

## Configuration

{% addedin "3.0.0-alpha.11" %}Here we use [`tsx`]({{ externalLinks.tsxNodeUse }}) to process JSX files. If you’re looking for TypeScript only, there are [simpler methods in Node.js](/docs/languages/typescript/).

<div class="codetitle">buildawesome.config.js</div>
{%- set codeBlock %}
import "tsx/esm";
import { renderToStaticMarkup } from "react-dom/server";

export default function ($config) {
	// We can add support for TypeScript too, at the same time:
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

## Community Contributions <span id="alternative-approaches"></span>

* {% indieweblink "eleventy-hast-jsx", "https://github.com/j-f1/eleventy-hast-jsx" %}
* {% indieweblink "eleventy-plugin-react-ssr", "https://github.com/scinos/eleventy-plugin-react-ssr" %}
* {% indieweblink "JetBrains: Better 11ty Development with Tooling", "https://www.jetbrains.com/guide/javascript/tutorials/eleventy-tsx/" %}

### Using `esbuild-register`

If you’d like an approach that works with CommonJS and Eleventy 2.0, you can use [`esbuild-register`](https://github.com/egoist/esbuild-register) with Eleventy (using the same conventions as [`11ty.js` templates](/docs/languages/javascript/)). Check out [this gist from `@pspeter3` on GitHub](https://gist.github.com/zachleat/b274ee939759b032bc320be1a03704a2) or [this GitHub comment from `@danielrob`](https://github.com/11ty/eleventy/issues/577#issuecomment-1464868585).

Your config file might look like this:

{% codetitle "buildawesome.config.js (CommonJS)" %}
{%- set codeBlock %}
const { register } = require("esbuild-register/dist/node");

register();

module.exports = function($config) {
	// We can add support for TypeScript too, at the same time:
	$config.addExtension(["11ty.jsx", "11ty.ts", "11ty.tsx"], {
		key: "11ty.js",
	});
};
{%- endset %}
{{ codeBlock | highlight("js") | safe }}

Now run Eleventy and tell it to process `11ty.jsx` and `11ty.tsx` files:

{%- set codeBlock %}
npx @11ty/eleventy --formats=11ty.jsx,11ty.tsx
{%- endset %}
{{ codeBlock | highlight("bash") | safe }}