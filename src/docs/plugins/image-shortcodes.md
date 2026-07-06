---
pageTitle: Image (Shortcodes)
eleventyNavigation:
  key: Image Shortcodes
  parent: Image
  excerpt: Use universal shortcodes in Nunjucks, Liquid, or 11ty.js templates.
excludeFromSidebar: true
---

{% tableofcontents %}

{% include "image-usage.njk" %}

We can use the [Image JavaScript API](./image-js.md) and wire it up to a [Universal Shortcode](../shortcodes.md).

## Asynchronous Shortcode

{% renderTemplate "webc" %}
<div class="build-cost-inline">
<div><a href="./image.md#optimize-images-on-request"><build-cost @cost="3" @icon="🍦" @rating-icon="🍨" label="Serve Cost"></build-cost></a></div>
<div><a href="./image.md#build-cost"><build-cost @cost="3"></build-cost></a></div>
</div>
{% endrenderTemplate %}

The examples below require an [async-friendly shortcodes](/docs/shortcodes/#asynchronous-shortcodes) (works in Nunjucks, Liquid, JavaScript, and [WebC](/docs/languages/webc/)).

<br><br>

### Configuration

{% set codeContent %}
import Image from "@11ty/eleventy-img";

export default function ($config) {
	$config.addShortcode("image", async function (src, alt, widths = [300, 600], sizes = "") {
		return Image(src, {
			widths,
			formats: ["avif", "jpeg"],
			returnType: "html",    // new in v6.0
			htmlOptions: {         // new in v6.0
				imgAttributes: {
					alt,               // required, though "" works fine
					sizes,             // required with more than one width, optional if single width output
					loading: "lazy",   // optional
					decoding: "async", // optional
				}
			}
		});
	});
};
{% endset %}
{% include "snippets/configDefinition.njk" %}

- Read the [**full options list**](./image.md#options).
- _HTML Tip:_ Read more about the special (and very useful) [`loading`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#attr-loading) and [`decoding`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#attr-decoding) HTML attributes.


#### More about Shortcodes

- Read more about [`$config.addShortcode`](/docs/shortcodes/#asynchronous-shortcodes) and universal shortcodes. Use `addAsyncShortcode` in versions of Eleventy older than v2.0. You can also [add these shortcodes to individual template engines](/docs/shortcodes/#async-friendly-per-engine-shortcodes), if you’d like!
- **Warning** [Nunjucks macros are not async-friendly](/docs/languages/nunjucks/#warning-macros-are-not-async-friendly). If you make use of Nunjucks macros in your project, do **not** use asynchronous shortcodes for Image optimization. Instead use the [transform](./image.md#html-transform) or [synchronous shortcode](#synchronous-shortcode) methods.

### Template Usage

Now you can use the `image` shortcode in your templates and the appropriate HTML will be generated for you (based on your specified Image options).

{% include "snippets/image/templates.njk" %}

If you want to use Eleventy Image in WebC, take note that it is possible to wire up the method below in WebC. However it is **recommended to use the [provided `<eleventy-image>` WebC component](./image-webc.md) instead**.

## Advanced

### Boost Performance: Optimize Images on Request

{% renderTemplate "webc" %}
<div class="build-cost-inline">
<div><a href="./image.md#optimize-images-on-request"><build-cost @cost="1" @icon="🍦" @rating-icon="🍨" label="Serve Cost"></build-cost></a></div>
</div>
{% endrenderTemplate %}

{% addedin "v3.0.0-alpha.7" %}{% addedin "Image v5.0.0" %}The [`transformOnRequest` feature](./image.md#optimize-images-on-request) is available for free with the [Image HTML Transform](./image.md#html-transform) and the [Image WebC component](./image-webc.md).

#### Configuration

You _can_ use `transformOnRequest` with Eleventy Shortcodes too with a little bit more configuration:

{% set codeContent %}
import Image from "@11ty/eleventy-img";
import { eleventyImageOnRequestDuringServePlugin } from "@11ty/eleventy-img";

export default function ($config) {
	$config.addShortcode("image", async function (src, alt) {
		let html = await Image(src, {
			transformOnRequest: process.env.ELEVENTY_RUN_MODE === "serve",
			returnType: "html",
			htmlOptions: {
				imgAttributes: {
					alt, // required
				},
			}
		});

		return html;
	});

	// Add the dev server middleware manually
	$config.addPlugin(eleventyImageOnRequestDuringServePlugin);
};
{% endset %}
{% include "snippets/configDefinition.njk" %}

### Using Shortcodes Alongside the Image HTML Transform Method

If you’re using an Image Shortcode or the WebC component in a project and you’re also adding the Image HTML Transform make sure you add [`eleventy:ignore` to the `<img>` attributes](./image.md#attribute-overrides) so the images aren’t processed twice:

{% set codeContent %}
import Image from "@11ty/eleventy-img";

export default function ($config) {
	$config.addShortcode("image", async function (src, alt) {
		let html = await Image(src, {
			returnType: "html",
			htmlOptions: {
				imgAttributes: {
					alt, // required
					"eleventy:ignore": ""
				}
			}
		});

		return html;
	});
};
{% endset %}
{% include "snippets/configDefinition.njk" %}

### Using `Image.generateHTML` to create markup

{% set codeContent %}
import Image from "@11ty/eleventy-img";

export default function ($config) {
	$config.addShortcode("image", async function (src, alt) {
		let metadata = await Image(src, {
			widths: [600],
			formats: ["jpeg"],
		});

		return Image.generateHTML(metadata, {
			alt, // required
		});
	});
};
{% endset %}
{% include "snippets/configDefinition.njk" %}

### Make your own markup


If you have an advanced use case and don’t want to use `returnType: "html"` or `Image.generateHTML` to create image markup, you can do it yourself!

Uses the [`entities` npm package](https://www.npmjs.com/package/entities).

{% set codeContent %}
import { escapeAttribute } from "entities";
import Image from "@11ty/eleventy-img";

export default function ($config) {
	$config.addShortcode("image", async function (src, alt) {
		if (alt === undefined) {
			// You bet we throw an error on missing alt (alt="" works okay)
			throw new Error(`Missing \`alt\` on myImage from: ${src}`);
		}

		let metadata = await Image(src, {
			widths: [600],
			formats: ["jpeg"],
		});

		let data = metadata.jpeg[metadata.jpeg.length - 1];
		return `<img src="${data.url}" width="${data.width}" height="${data.height}" alt="${escapeAttribute(alt)}" loading="lazy" decoding="async">`;
	});
};
{% endset %}
{% include "snippets/configDefinition.njk" %}

### Synchronous Shortcode

_Deprecated in <a href="https://github.com/11ty/eleventy-img/issues/211">Eleventy Image v4.0.0</a>._

{% callout "info", "md" %}The new [Eleventy Transform](./image.md#html-transform) is now preferred for situations that are not asynchronous-friendly (Handlebars, macros in Nunjucks, et al). For asynchronous-friendly templates (e.g. Nunjucks, Liquid, JavaScript), the [Asynchronous Shortcode](#asynchronous-shortcode) is another option. If you’re using WebC, use the provided [WebC component](./image-webc.md).{% endcallout %}

#### Configuration

Use `Image.statsSync` to get the metadata of a source even if the image generation is not finished yet:

{% set codeContent %}
import Image from "@11ty/eleventy-img";

export default function ($config) {
	$config.addShortcode("myImage", function imageShortcode(src, cls, alt, widths = ["auto"], sizes = "100vh") {
		let options = {
			widths,
			formats: ["jpeg"],
		};

		// generate images: this is async but we don’t wait
		Image(src, options);

		let imageAttributes = {
			class: cls,
			alt,
			sizes,
			loading: "lazy",
			decoding: "async",
		};
		// get metadata even if the images are not fully generated yet
		let metadata = Image.statsSync(src, options);
		return Image.generateHTML(metadata, imageAttributes);
	});
};
{% endset %}
{% include "snippets/configDefinition.njk" %}
