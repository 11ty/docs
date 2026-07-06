---
pageTitle: Image (WebC)
eleventyNavigation:
  key: Image WebC
  parent: Image
  excerpt: ~~Use a WebC component for WebC templates.~~
excludeFromSidebar: true
---

{% tableofcontents %}

{% include "image-usage.njk" %}

{% callout "error", "md-block", "Feature Removed" %}Due to and maintenance cost and feature overlap with the [Image HTML Transform](/docs/plugins/image/#html-transform), the `<eleventy-image>` WebC component was retired in Eleventy Image v7. Read more at [GitHub Issue #305](https://github.com/11ty/eleventy-img/issues/305). The [HTML Transform method](/docs/plugins/image/#html-transform) is recommended moving forward. You _can_ also create your own Image component using an approach similar to [Asynchronous Shortcodes](/docs/plugins/image-shortcodes/) using `webc:type="js"`.{% endcallout %}

## Usage

{% addedin "Image v3.1.0" %} Eleventy Image now provides a built-in `<eleventy-image>` WebC component for use in your Eleventy project.

Using Eleventy Image in [WebC](/docs/languages/webc.md) offers all the same great benefits you’re used to from Eleventy Image with an intuitive declarative HTML-only developer experience. WebC components work in `*.webc` files. For similar functionality in other template formats, use the [Liquid/Nunjucks/JavaScript shortcodes](./image-shortcodes.md) above (or even `<eleventy-image>` with the [Render plugin](/docs/plugins/render.md)).

### Configuration

First, add the following to your project’s configuration file:

{% set codeContent %}
import eleventyWebcPlugin from "@11ty/eleventy-plugin-webc";
import { eleventyImagePlugin } from "@11ty/eleventy-img";

export default function ($config) {
	// WebC
	$config.addPlugin(eleventyWebcPlugin, {
		components: [
			// …
			// Add as a global WebC component
			"npm:@11ty/eleventy-img/*.webc",
		],
	});

	// Image plugin
	$config.addPlugin(eleventyImagePlugin, {
		// Set global default options
		formats: ["webp", "jpeg"],
		urlPath: "/img/",

		// Notably `outputDir` is resolved automatically
		// to the project output directory

		defaultAttributes: {
			loading: "lazy",
			decoding: "async",
		},
	});
};
{% endset %}
{% include "snippets/configDefinition.njk" %}

{% addedin "v3.0.0-alpha.7" %}{% addedin "Image v5.0.0" %}During local development (when using `--serve`), `<eleventy-image>` images are _not_ processed at build time and instead are optimized when requested in the browser. Read more about [`transformOnRequest`](./image.md#optimize-images-on-request).

- _HTML Tip:_ Read more about the special (and very useful) [`loading`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#attr-loading) and [`decoding`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#attr-decoding) HTML attributes.

Now you can use the `<eleventy-image>` WebC component in your templates.

### Template Usage

```html
<img webc:is="eleventy-image" src="cat.jpg" alt="photo of my tabby cat">
```

```html
<eleventy-image src="cat.jpg" alt="photo of my tabby cat"></eleventy-image>
```

```html
<!-- Specify widths: -->
<img webc:is="eleventy-image" width="100, 200" src="cat.jpg" alt="photo of my tabby cat">
<img webc:is="eleventy-image" :width="[100, 200]" src="cat.jpg" alt="photo of my tabby cat">
```

```html
<!-- Specify formats (overriding defaults set via the configuration) -->
<img webc:is="eleventy-image" formats="avif, png" src="cat.jpg" alt="photo of my tabby cat">
<img webc:is="eleventy-image" :formats="['avif', 'png']" src="cat.jpg" alt="photo of my tabby cat">
```

```html
<!-- Change the url path or output dir (overriding defaults set via the configuration above) -->
<img webc:is="eleventy-image" url-path="/some-dir/" output-dir="_site/some-dir/" src="cat.jpg" alt="photo of my tabby cat">
```