---
eleventyNavigation:
  key: Bundle
  title: '<i class="fa-solid fa-file-zipper"></i>Bundle'
  order: 3.15
  excerpt: A plugin create small plain-text bundles of code (CSS, JS, HTML, SVG, etc)
---

# Bundle {% addedin "3.0.0-alpha.10" %}

{% tableofcontents %}

The Bundle plugin is a plain-text bundler unlocking minimal per-page or app-level bundles of CSS, JavaScript, or HTML to be included in your Eleventy project.

Makes it easy to implement Critical CSS, in-use-only CSS/JS bundles, SVG icon libraries, or secondary HTML content to load via XHR.

* [GitHub `11ty/eleventy-plugin-bundle`](https://github.com/11ty/eleventy-plugin-bundle)

## Why?

This project is a _minimum-viable_ bundler and asset pipeline in Eleventy. It does not perform any transpilation or code manipulation. The code you put in is the code you get out (with configurable transforms if you’d like to modify the code).

For more larger, more complex use cases you may want to use a more full featured bundler like Vite, Parcel, Webpack, rollup, esbuild, or others. But do note that a full-featured bundler has a significant build performance cost, so take care to weigh the cost of using that style of bundler against whether or not this plugin has sufficient functionality for your use case—especially as the platform matures and we see diminishing returns on code transpilation (ES modules everywhere).

## Usage

This plugin is included with Eleventy core and requires no additional installation. However, the plugin is opt-in and does not include any bundles by default: you must add these yourself via the `addBundle` configuration method.

{% set codeContent %}
export default function($config) {
	$config.addBundle("css");
};
{% endset %}
{% include "snippets/configDefinition.njk" %}

`addBundle` does two things:

1. Creates a new `css` universal shortcode for adding arbitrary code to this bundle.
1. Adds `"css"` as an eligible bundle in the `getBundle` and `getBundleFileUrl` shortcodes.

<details>
<summary><strong>Full <code>addBundle</code> options list</strong></summary>

{% set codeContent %}
export default function($config) {
	$config.addBundle("css", {
		// File extension used for bundle file output, defaults to bundle name
		outputFileExtension: "css",

		// Name of shortcode for use in templates, defaults to bundle name
		shortcodeName: "css",
		// shortcodeName: false, // disable this feature.

		// Optional subfolder (relative to output directory) files will write to
		toFileDirectory: "",

		// Modify bundle content
		transforms: [],

		// If two identical code blocks exist in non-default buckets, they’ll be hoisted to the first bucket in common.
		hoist: true,

		// Bundle content from nodes selected by an arbitrary selector
		// e.g. "script" would bundle `<script>` content
		// Use an eleventy:ignore attribute on a node to opt-out.
		// Supported selectors: https://www.npmjs.com/package/posthtml-match-helper
		bundleHtmlContentFromSelector: "",

		// In 11ty.js templates, having a named export of `bundle` will populate your bundles.
		bundleExportKey: "bundle",
		// bundleExportKey: false, // disable this feature.
	});
};
{% endset %}
{% include "snippets/configDefinition.njk" %}

You can read more about:
* [`transforms` in Postprocessing the Bundle Output](#postprocess-the-bundle-output)
* [hoist and duplicate bundle hoisting](https://github.com/11ty/eleventy-plugin-bundle/issues/5).

</details>

## Examples

### Add to a bundle

Consider this markdown (via liquid) template file:

{% raw %}
```liquid
# My Blog Post

This is some content, I am writing markup.

{% css %}
em { font-style: italic; }
{% endcss %}

## More Markdown

{% css %}
strong { font-weight: bold; }
{% endcss %}
```
{% endraw %}

Results in a removal of the bundle additions from the rendered output, like so:

```html
<h1>My Blog Post</h1>

<p>This is some content, I am writing markup.</p>

<h2>More Markdown</h2>
```

#### Bundling HTML Node Content

{% addedin "Bundle v3.0.2" %} Using the `bundleHtmlContentFromSelector` option allows bundling content inside HTML nodes.

```html
# My Blog Post

This is some content, I am writing markup.

<style>
em { font-style: italic; }
</style>

## More Markdown

<style>
strong { font-weight: bold; }
</style>
```

When using `bundleHtmlContentFromSelector: "style"`, the `<style>` nodes in an HTML file will roll up into the bundle.

- `<style eleventy:ignore>` to opt-out per node
- `<style eleventy:bucket="async">` to change the bucket for a node {% addedin "Bundle v3.0.5" %}

### Rendering Bundles

You can fetch the bundle content and output it directly on your page using the `getBundle` shortcode.

{% raw %}
```html
<!-- Use this *anywhere*: a layout file, content template, etc -->
<style>{% getBundle "css" %}</style>

<!--
You can add more code to the bundle after calling
getBundle and it *will* be included.
-->
{% css %}
* { color: orange; }
{% endcss %}
```
{% endraw %}

### Write a Bundle to the File System

Writes the bundle content to a content-hashed file location in your output directory and returns the URL to the file for use like this:

{% raw %}
```html
<link rel="stylesheet" href="{% getBundleFileUrl "css" %}">
```
{% endraw %}

Note that writing bundles to files will likely be a slower user-experience for empty-cache first time visitors but better cached in the browser for repeat-views (and across multiple pages, too).

### Asset Bucketing

You can pass an additional string argument to your shortcode to add a sub-container (or bucket) for your code.

{% raw %}
```html
<!-- This goes into a `defer` bucket -->
{% css "defer" %}
em { font-style: italic; }
{% endcss %}
```

And to retrieve the code, you do the same with `getBundle` and `getBundleFileUrl`:

```html
<!-- Retrieve the `defer` bucket code -->
<style>{% getBundle "css", "defer" %}</style>

<!-- Or: -->
<link rel="stylesheet" href="{% getBundleFileUrl 'css', 'defer' %}">
```
{% endraw %}

### Critical CSS

{% set codeContent %}
export default function($config) {
	$config.addBundle("css");
};
{% endset %}
{% include "snippets/configDefinition.njk" %}

Now we’ll use asset bucketing to divide CSS between the default bucket and a defer bucket, loaded asynchronously.

{% raw %}
```html
<!-- … -->
<head>
	<!-- Inlined critical styles -->
	<style>{% getBundle "css" %}</style>

	<!-- Non-critical styles -->
	<link rel="stylesheet" href="{% getBundleFileUrl 'css', 'defer' %}" fetchpriority="low">
</head>
<body>
	<!-- This goes into a `default` bucket -->
	{% css %}/* Inline in the head, great with @font-face! */{% endcss %}
	<!-- This goes into a `defer` bucket (the bucket can be any string value) -->
	{% css "defer" %}/* Load me later */{% endcss %}
</body>
<!-- … -->
```
{% endraw %}

### SVG Icon Library

{% set codeContent %}
export default function($config) {
	$config.addBundle("svg");
};
{% endset %}
{% include "snippets/configDefinition.njk" %}

{% raw %}
```html
<svg width="0" height="0" aria-hidden="true" style="position: absolute;">
	<defs>{% getBundle "svg" %}</defs>
</svg>

<!-- Add icons to the set from anywhere on the page -->
{% svg %}
<g id="icon-close"><path d="…" /></g>
{% endsvg %}

And now you can use `icon-close` in as many SVG instances as you’d like (without repeating the heftier SVG content).

<svg><use xlink:href="#icon-close"></use></svg>
<svg><use xlink:href="#icon-close"></use></svg>
<svg><use xlink:href="#icon-close"></use></svg>
<svg><use xlink:href="#icon-close"></use></svg>
```
{% endraw %}

### React Helmet style `<head>` additions

{% set codeContent %}
export default function($config) {
	$config.addBundle("html");
};
{% endset %}
{% include "snippets/configDefinition.njk" %}

{% raw %}
```html
<!-- … -->
<head>
	{% getBundle "html", "head" %}
</head>
<body>
	<!-- Add things to `<head>` from anywhere on the page -->
	{% html "head" %}
	<link href="https://v1.opengraph.11ty.dev" rel="preconnect" crossorigin>
	{% endhtml %}
</body>
<!-- … -->
```
{% endraw %}

### Postprocess the Bundle Output

{% set codeContent %}
import postcss from "postcss";
import postcssNested from "postcss-nested";

export default function($config) {
	$config.addBundle("css", {
		transforms: [
			async function(content) {
				// type contains the bundle name.
				let { type, page } = this;
				let result = await postcss([postcssNested]).process(content, { from: page.inputPath, to: null });
				return result.css;
			}
		]
	});
};
{% endset %}
{% include "snippets/configDefinition.njk" %}

### Using with [WebC](/docs/languages/webc.md)

Starting with Eleventy WebC v0.9.0 (tracked at [#48](https://github.com/11ty/eleventy-plugin-webc/issues/48)) the WebC Bundler Mode now uses the Bundle plugin under the hood.

To add CSS to a bundle in WebC, you would use a `<style>` element in a WebC page or component:

```html
<style>/* This is bundled. */</style>
<style webc:keep>/* Do not bundle me—leave as is */</style>
```

To add JS to a page bundle in WebC, you would use a `<script>` element in a WebC page or component:

```html
<script>/* This is bundled. */</script>
<script webc:keep>/* Do not bundle me—leave as is */</script>
```

`<style @raw="getBundle('css')">` and `<script @raw="getBundle('js')">` both work as expected in WebC to fetch bundle content.
