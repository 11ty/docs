---
eleventyNavigation:
  parent: Markdown
  key: MDX
addedInVersion: 3.0.0-alpha.11
relatedTitle: Template Language—MDX
layout: layouts/langs.njk
---

[MDX](https://mdxjs.com/) is an extension of [Markdown](/docs/languages/markdown/) that adds JavaScript support and embedded components using [JSX syntax](/docs/languages/jsx/). It can be a powerful language for writing content if you intend to include interactive components or intermix text with elements.

<!-- {% tableofcontents "open" %} -->

| Eleventy Short Name | File Extension | npm Package |
| ------------------- | -------------- | ----------- |
| `mdx`          | `.mdx`         | [`@mdx-js/mdx`](https://mdxjs.com/packages/mdx/) |

* Related languages: [Markdown](/docs/languages/markdown/), [JSX](/docs/languages/jsx/), [Custom](/docs/languages/custom/)
* While [Markdown files](/docs/languages/markdown/) are preprocessed as Liquid, MDX files are not preprocessed by any other template syntax.
* The Markdown in MDX files is parsed and transformed using [Remark](https://remark.js.org/), which is different from Eleventy's default Markdown parser, [markdown-it](https://github.com/markdown-it/markdown-it). Changes to Markdown options won't affect MDX, and output can be different from the same Markdown input.

{% callout "info", "md" %}MDX requires ESM. This means your project `package.json` must contain `"type": "module"` or your configuration file must use the `.mjs` file extension, e.g. `eleventy.config.mjs`.{% endcallout %}

## Configuration

The following configuration will read `*.mdx` files with full compatibility for [front matter](../data-frontmatter.md) (in `.mdx` files!). _[GitHub #3760](https://github.com/11ty/eleventy/issues/3760)._

<div class="codetitle">buildawesome.config.js</div>
{%- set codeBlock %}
import {pathToFileURL} from "node:url";
import {evaluate} from "@mdx-js/mdx";
import {renderToStaticMarkup} from "react-dom/server";
import * as runtime from "react/jsx-runtime";

export default function($config) {
	$config.addExtension("mdx", {
		compile: async (str, inputPath) => {
			const { default: mdxContent } = await evaluate(str, {
				...runtime,
				baseUrl: pathToFileURL(inputPath)
			});

			return async function(data) {
				let res = await mdxContent(data);
				return renderToStaticMarkup(res);
			}
		}
	});
};
{%- endset %}
{{ codeBlock | highlight("js") | safe }}

Now run Eleventy and tell it to process `mdx` files:

{%- set codeBlock %}
npx @awesome.me/buildawesome --formats=mdx
{%- endset %}
{{ codeBlock | highlight("bash") | safe }}

Alternatively, you can add `$config.addTemplateFormats("mdx")` to your configuration file.

### Example

<div class="codetitle">sample.mdx</div>

{%- set codeBlock %}
---
key: World
---
export function Exclaim(props) {
  return <>{props.target}!!!</>
}

# Hello from <Exclaim target={props.key} />
{%- endset %}
{{ codeBlock | highlight("jsx") | safe }}

The above is rendered as `<h1>Hello, World!!!</h1>`.

Read more on the [What is MDX? docs](https://mdxjs.com/docs/what-is-mdx/).

## Alternate Configuration: use MDX Loader

{% addedin "3.0.0-alpha.11" %}MDX also provides a Node.js loader ([`@mdx-js/node-loader`](https://mdxjs.com/packages/node-loader/) on npm). This approach may be marginally faster but will **not** include support for Front Matter in `.mdx` files.

<div class="codetitle">buildawesome.config.js</div>
{%- set codeBlock %}
import {register} from 'node:module';
import {renderToStaticMarkup} from 'react-dom/server'

register('@mdx-js/node-loader', import.meta.url);

export default function($config) {
	$config.addExtension("mdx", {
		key: "11ty.js",
		compile: () => {
			return async function(data) {
				let content = await this.defaultRenderer(data);
				return renderToStaticMarkup(content);
			};
		}
	});
};
{%- endset %}
{{ codeBlock | highlight("js") | safe }}

## Community Contributions

* [`eleventy-plugin-mdx`](https://github.com/jamshop/eleventy-plugin-mdx)