---
eleventyNavigation:
  parent: Template Features
  key: Transforms
  title: Postprocess Content
  excerpt: Use Transforms to post-process content after Eleventy builds.
  order: 0.2
---

# Transforms

Transforms can modify a template’s output. For example, use a transform to format/prettify an HTML file with proper whitespace.

{% callout "info", "md" %}The provided transform function **must** return the original or transformed content.{% endcallout %}

{% set codeContent %}
export default function($config) {
	// Can be sync or async
	$config.addTransform("transform-name", async function (content) {
		console.log(this.page.inputPath);

		// Caution: this could be `false` (from permalink)
		console.log(this.page.outputPath);

		// No changes made, return as-is
		return content;
	});
};
{% endset %}
{% include "snippets/configDefinition.njk" %}

Access to [Eleventy’s `page` variable](/docs/data-eleventy-supplied/#page-variable) (via `this.page`) was added in Eleventy v2.0. For previous versions, [consult the older versions of the docs](https://v1-0-2.11ty.dev/docs/config/#transforms).

## Running Transforms Manually

{% addedin "3.0.0-alpha.11" %} The [`renderTransforms` universal filter](/docs/filters/render-transforms/) allows projects to run transforms manually on blocks of arbitrary HTML content.

## Order of Execution

Transforms are executed in order of insertion in your configuration file.

```js
$config.addTransform("first", () => {});
$config.addTransform("second", () => {});
$config.addTransform("third", () => {});
```

### Plugins

Transforms added via plugins are inserted via the [second configuration stage for plugins](/docs/plugins/#creating-a-plugin).

```js
$config.addPlugin($config => {
	$config.addTransform("third", () => {});
});
$config.addTransform("first", () => {});
$config.addTransform("second", () => {});
```

## Examples

### Minify HTML Output

{% set codeContent %}
import htmlmin from "html-minifier-terser";

export default function ($config) {
	$config.addTransform("htmlmin", function (content) {
		// String conversion to handle `permalink: false`
		if ((this.page.outputPath || "").endsWith(".html")) {
			let minified = htmlmin.minify(content, {
				useShortDoctype: true,
				removeComments: true,
				collapseWhitespace: true,
			});

			return minified;
		}

		// If not an HTML output, return content as-is
		return content;
	});
};
{% endset %}
{% include "snippets/configDefinition.njk" %}

Note that `html-minifier-terser` has a [significant number of options](https://github.com/terser/html-minifier-terser?tab=readme-ov-file#options-quick-reference), most of which are disabled by default.
