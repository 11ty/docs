---
pageTitle: Image
eleventyNavigation:
  key: Image
  title: '<i class="fa-solid fa-image"></i>Image'
  excerpt: A utility to resize and generate images.
  pinned: true
  order: 1
communityLinksKey: image
overrideCommunityLinks: true
---

{% tableofcontents %}

{% renderTemplate "webc" %}<div class="build-cost-inline"><a href="#build-cost"><build-cost cost="3"></build-cost></a></div>{% endrenderTemplate %}

Utility to perform build-time image transformations for both vector and raster images: output multiple image sizes, multiple formats, and cache remote images locally. Uses the [sharp](https://sharp.pixelplumbing.com/) image processor.

- Easily add `width` and `height` attributes for [proper aspect ratio](https://developer.mozilla.org/en-US/docs/Web/Media/images/aspect_ratio_mapping) to reduce layout shift.
- Accepts a wide variety of input image types: `jpeg`, `png`, `webp`, `gif`, `tiff`, `avif`, and `svg`. _Does not_ rely on file extensions (e.g. `.png` or `.jpg`), which may be missing or inaccurate.
- Output multiple sizes, maintaining the original aspect ratio. Does not upscale raster images larger than original size. Intelligently generates `srcset` attributes.
- Output multiple formats: `jpeg`, `png`, `webp`, `avif` <a href="#build-cost"><span class="minilink minilink-buildcost"><code>+1</code> Build Cost</span></a>, and `svg`. Intelligently generates the most efficient markup with zero server-dependencies, using `<img>` or `<picture>`.
- Fast: de-duplicates with both an in-memory and disk cache. During local development, images are [processed on request for even faster build performance](#optimize-images-on-request).
- Robust and works offline: save remote images to prevent broken image URLs later (via [`eleventy-fetch`](/docs/plugins/fetch/)).

## Installation

Published as [`@11ty/eleventy-img`](https://www.npmjs.com/package/@11ty/eleventy-img) on npm. [Source code on GitHub](https://github.com/11ty/eleventy-img).

_Image v6.0.0 requires Node 18+._

{%- set codeBlock %}
npm install @11ty/eleventy-img
{%- endset %}
{{ codeBlock | highlight("bash") | safe }}

## Usage

There are a few different ways to use Eleventy image:

{% include "image-usage.njk" %}

### HTML Transform <span id="eleventy-transform"></span>

{% renderTemplate "webc" %}
<div class="build-cost-inline">
<div><a href="#optimize-images-on-request"><build-cost @cost="1" @icon="🍦" @rating-icon="🍨" label="Serve Cost"></build-cost></a></div>
<div><a href="#build-cost"><build-cost @cost="3"></build-cost></a></div>
</div>
{% endrenderTemplate %}

{% addedin "v3.0.0-alpha.5" %} {% addedin "Image v4.0.1" %}This is the easiest method to configure. Eleventy will transform _any_ `<img>` or `<picture>` tags in HTML files as a post-processing step in your build.

<br><br>

{% set codeContent %}
import { eleventyImageTransformPlugin } from "@11ty/eleventy-img";

export default function ($config) {
	$config.addPlugin(eleventyImageTransformPlugin);
};
{% endset %}
{% include "snippets/configDefinition.njk" %}

That’s it! All `<img>` and `<picture>` elements will be processed for you by Eleventy Image.

<div class="youtube-related">
  {%- youtubeEmbed "e0OHgC677ec", "Optimize your Images with Eleventy Image" -%}
</div>

#### Resolving image sources <span id="relative-paths"></span>

1. Relative image sources (`<img src="./possum.png">`) will be co-located to your output directory with the template they are used in. If the same source image is used in multiple templates, it will be written to two different output locations!
2. Absolute image sources (`<img src="/possum.png">`) will be normalized relative to your input/content directory and written to your output directory with the default directory (e.g. `_site/img/`).

If you explicitly define the [`urlPath` option](#url-path), the `urlPath` is used to determine the output location instead.

#### Attribute Overrides

You can configure individual `<img>` elements with per-instance overrides:

- `<img width>` is aliased to `eleventy:widths` when it is valid HTML (a single `integer` value) {% addedin "Image v6.0.0" %} _Related [#234](https://github.com/11ty/eleventy-img/issues/234)_.
- `<img eleventy:widths="200,600">` comma separated string to override the default widths.
- `<img eleventy:formats="webp">` comma separated string to override the default formats.
- `<img eleventy:ignore>` skips this image.
- `<img eleventy:optional>` {% addedin "Image v6.0.0" %}controls what happens when processing this image throws an Error (good for remote images), see [`failOnError` option](#fail-on-error). Default behavior removes the `src` attribute from the `<img>` node.
	- `<img eleventy:optional="keep">`: leave as-is, which would likely result in an error when a user visits your page.
	- `<img eleventy:optional="placeholder">`: replace the `src` attribute with a transparent PNG Data URI.
- `<img eleventy:output>` overrides the output directory. Similar to [`urlPath`](#url-path), absolute paths (e.g. `<img eleventy:output="/mydirectory/">`) are relative to the Eleventy output directory and relative paths are relative to the template’s URL (e.g. `<img eleventy:output="./mydirectory/">`).
- `<img eleventy:pictureattr:NAME="VALUE">` {% addedin "Image v6.0.0" %} attributes are hoisted as `<picture NAME="VALUE">` (if `<picture>` is in use)

### More configuration options

Any of the [configuration options](#options) can be defined when you add the plugin:

{% set codeContent %}
import { eleventyImageTransformPlugin } from "@11ty/eleventy-img";

export default function ($config) {
	$config.addPlugin(eleventyImageTransformPlugin, {
		// output image formats
		formats: ["avif", "webp", "jpeg"],

		// output image widths
		widths: ["auto"],

		// optional, attributes assigned on <img> nodes override these values
		htmlOptions: {
			imgAttributes: {
				loading: "lazy",
				decoding: "async",
			},
			pictureAttributes: {}
		},
	});
};
{% endset %}
{% include "snippets/configDefinition.njk" %}

- {% addedin "v3.0.0-alpha.7" %}{% addedin "Image v5.0.0" %}During local development (when using `--serve`), images are optimized when requested in the browser. Read more about [`transformOnRequest`](#optimize-images-on-request).
- The `sizes` attribute must be present if `widths` has more than one entry ([MDN](https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement/sizes)). The `eleventyImageTransformPlugin` does not provide a default value for `sizes`, so it must be explicitly included in the HTML attribute or with `htmlOptions.imgAttributes`.
	- {% addedin "Image v6.0.0" %}When using `loading="lazy"` and `sizes` is not supplied in markup — we’ll use `sizes="auto"` automatically. _Related [#207](https://github.com/11ty/eleventy-img/issues/207)_.

## Build Performance <span id="build-cost"></span><span id="build-cost-🧰"></span>

Image optimization is likely one of the costlier pieces of your Eleventy build. The total build cost of this utility is dependent on a few things (in order of priority):

1. Number of unique images optimized (not page count)
1. Optimizing a lot of remote images (image content must be fetched from a remote server and is subsequently cached via [`eleventy-fetch`](/docs/plugins/fetch/)).
1. Number of `formats` you generate for each source image: `avif` is more costly than other image formats. <span class="minilink minilink-buildcost"><code>+1</code> Build Cost</span>
1. Number of `widths` you generate for each source image.
1. File size of images being optimized (larger source images are more expensive).

### Optimize Images on Request

{% addedin "v3.0.0-alpha.7" %}{% addedin "Image v5.0.0" %}When using the [Image HTML transform](#html-transform) during local development, image processing is removed from the build for extra performance. Instead, they are processed when requested by the browser using a special middleware built-in to the Eleventy Dev Server. This is enabled or disabled using the [`transformOnRequest` option](#transform-on-request).

<div id="caching"></div>

### In-Memory Cache

To prevent duplicate work and improve build performance, repeated calls to the same source image (remote or local) _with the same options_ will return a cached results object. If a request in-progress, the pending promise will be returned. This in-memory cache is maintained across builds in watch/serve mode. If you quit Eleventy, the in-memory cache will be discarded.

Images will be regenerated (and the cache bypassed) if:

- The source image file size changes (on local image files)
- The [cache asset](/docs/plugins/fetch/) duration expires (for remote images).

You can disable this behavior by using the [`useCache` option](#use-cache).

<details>
<summary>Example of in-memory cache reuse (returns the same promise)</summary>

{% codetitle ".eleventy.js" %}

```js
import Image from "@11ty/eleventy-img";

let stats1 = Image("./test/bio-2017.jpg");
let stats2 = Image("./test/bio-2017.jpg");

console.assert(stats1 === stats2, "The same promise");
```

</details>
<details>
<summary>Example of in-memory cache (returns a new promise with different options)</summary>

{% codetitle "buildawesome.config.js" %}

```js
import Image from "@11ty/eleventy-img";

let stats1 = Image("./test/bio-2017.jpg");
let stats2 = Image("./test/bio-2017.jpg", { widths: [300] });

console.assert(stats1 !== stats2, "A different promise");
```

</details>

### Disk Cache

{% addedin "Image v1.0.0" %} Eleventy will skip processing files that are unchanged and already exist in the output directory. This requires the built-in hashing algorithm and is not supported with custom filenames. More background at <a href="https://github.com/11ty/eleventy-img/issues/51">Issue #51</a>.

You can use this to [speed up builds on your build server](/docs/deployment/#persisting-cache).

## Options

### Output File Extensions

Comma separated list of file extensions used in the [Image HTML Transform](#html-transform) to determine which template output files to process.

- `extensions: "html"` (default)

### Output Widths

Controls how many output images will be created for each image format. Aspect ratio is preserved.

- `widths: ["auto"]` (default, keep original width)
- `widths: [200]` (output one 200px width)
- `widths: [200, "auto"]` (output 200px and original width)

### Output Formats

Use almost any combination of `webp`, `jpeg`, `png`, `svg`, `avif`, `gif`, and `auto`:

- `formats: ["webp", "jpeg"]` (default)
- `formats: ["png"]`
- `formats: ["auto"]` (keep original format)
- `formats: ["svg"]` (requires SVG input)
- `formats: ["avif"]` <a href="#build-cost"><span class="minilink minilink-buildcost"><code>+1</code> Build Cost</span></a>

### Skip raster formats for SVG

If using SVG output (the input format is SVG and `svg` is in your `formats` array option), we will skip all of the raster formats even if they’re in `formats`. This may be useful in a CMS-driven workflow when the input could be vector or raster.

- `svgShortCircuit: false` (default)
- `svgShortCircuit: true`
- `svgShortCircuit: "size"` {% addedin "Image v3.1.8" %}

Using `svgShortCircuit: "size"` means that raster image format entries will only be thrown out if the optimized raster size is larger than the SVG. This helps with large SVG images that compress to smaller raster sizes at smaller widths and will prefer the SVG over raster formats when the SVG file size is smaller.

To use Brotli compressed SVG sizes when making file size comparisons, use the `svgCompressionSize: "br"` option {% addedin "Image v3.1.8" %}.

#### Related:

<ul class="list-bare">
	<li>{% indieweblink "A New Technique for Image Optimization: SVG Short Circuiting", "https://www.zachleat.com/web/svg-short-circuit/" %} <em>({{ "2023-11-15" | newsDate("yyyy") }})</em></li>
	<li>{% indieweblink "Automatically optimize your images with Eleventy Image and CloudCannon", "https://cloudcannon.com/blog/automatically-optimize-your-images-with-eleventy-image-and-cloudcannon/" %} <em>({{ "2023-11-14" | newsDate("yyyy") }})</em></li>
</ul>

### Allow SVG to upscale

While we do prevent raster images from upscaling (and filter upscaling `widths` from the output), you can optionally enable SVG input to upscale to larger sizes when converting to raster format.

- `svgAllowUpscale: true` (default)
- `svgAllowUpscale: false`

### Transparent Images

Transparency friendly formats: `avif`, `png`, `webp`, `gif`, and `svg`.

{% addedin "Image v6.0.0" %}We will [filter out any non-transparency-friendly output formats](#format-filtering) from your `formats` list automatically (as long as at least _one_ of them is `png`, `gif`, or `svg`).

### Animated Images <span id="{{ 'Output Animated GIF or WebP' | slugify }}"></span>

{% addedin "Image v1.1.0" %} To process and output animated `gif` or `webp` images, [use `sharpOptions`](#advanced-control-of-sharp-image-processor) to pass in an `animated` option.

```js
import Image from "@11ty/eleventy-img";

await Image("./test/bio-2017.jpg", {
	formats: ["webp", "gif"],

	sharpOptions: {
		animated: true,
	},
});
```

{% addedin "Image v6.0.0" %}We will [filter out any non-animation-friendly output formats](#format-filtering) from your `formats` list automatically (as long as at least _one_ of them supports animation).

### Transform on Request

Development build performance improvement to [optimize images when they are requested in the browser](#optimize-images-on-request).

* `transformOnRequest: false` (default)
* `transformOnRequest: process.env.ELEVENTY_RUN_MODE === "serve"` (default for HTML Transform)

You can use [`transformOnRequest` with Shortcodes too](./image-shortcodes.md#boost-performance-optimize-images-on-request).

### `returnType` and `htmlOptions`

By default, Eleventy Image will return a metadata JavaScript object. To return HTML instead, use `returnType: "html"`. This is useful for the [Image JavaScript API](./image-js.md#return-html) and [Image Shortcode](./image-shortcodes.md) types.

- `returnType: "object"` (default) or `"html"` {% addedin "Image v6.0.0" %}

Further customize the markup with `htmlOptions` {% addedin "Image v6.0.0" %}:

```js
{
	// …
	returnType: "html",

	htmlOptions: {
		imgAttributes: {
			alt : "", // required
			loading: "lazy",
			decoding: "async",
		},

		// HTML attributes added to `<picture>` (omitted when <img> used)
		pictureAttributes: {},

		// Which source to use for `<img width height src>` attributes
		fallback: "largest", // or "smallest"
	}
}
```

### Fix Orientation

{% addedin "Image v4.0.0" %}Rotates the image to enforce the correct orientation set in EXIF metadata.

* `fixOrientation: false` (default)
* `fixOrientation: true`

### Custom Filenames

Don’t like the hashes used in output file names? Make your own!

```js
{
	// …
	filenameFormat: function (id, src, width, format, options) {
		// Define custom filenames for generated images
		// id: hash of the original image
		// src: original image path
		// width: current width in px
		// format: current file format
		// options: set of options passed to the Image call

		return `${id}-${width}.${format}`;
	}
}
```

<details>
<summary>Custom Filename Example: Use the original file slug</summary>

```js
import path from "node:path";
import Image from "@11ty/eleventy-img";

await Image("./test/bio-2017.jpg", {
	widths: [300],
	formats: ["auto"],
	filenameFormat: function (id, src, width, format, options) {
		const extension = path.extname(src);
		const name = path.basename(src, extension);

		return `${name}-${width}w.${format}`;
	},
});

// Writes: "test/img/bio-2017-300w.jpeg"
```

</details>

### Dry-Run

If you want to try the utility out and not write any files (useful for testing), use the `dryRun` option. Will include a `buffer` property in your return object.

- `dryRun: false` (default)
- `dryRun: true`

## Advanced Options

### Fail on Error

{% addedin "Image v6.0.0" %}What happens when processing an image encounters an error? Useful for remote images.

- `failOnError: true` (default)
- `failOnError: false` no error is thrown (warning output is logged)

See also the [`eleventy:optional` attribute](#attribute-overrides). _Related [#225](https://github.com/11ty/eleventy-img/issues/225)_

### Format Filtering

{% addedin "Image v6.0.0" %}When using [animated images](#animated-images) or images with transparency, we will automatically filter your [output `formats`](#output-formats) list to formats that support those features. If there are no valid `formats` left after filtering, the original `formats` list is used as-is. You can enable or disable this feature using the `formatFiltering` option.

- `formatFiltering: ["transparent", "animated"]`

_Related [#105](https://github.com/11ty/eleventy-img/issues/105) and [#260](https://github.com/11ty/eleventy-img/issues/260)_

### Output Directory

Where to write the new images to disk. Project-relative path to the output image directory. Maybe you want to write these to your output directory directly (e.g. `./_site/img/`)?

- `outputDir: "./img/"` (default)

If you’re using the Image HTML Transform, we recommended **_not_** to define `outputDir`.

### URL Path

A path-prefix-esque directory for the `<img src>` attribute. e.g. `/img/` for `<img src="/img/MY_IMAGE.jpeg">`:

- `urlPath: "/img/"` (default)

{% addedin "Image v6.0.0" %}Full URLs are now supported, e.g. `urlPath: "https://example.com/img/"`. _Related [#239](https://github.com/11ty/eleventy-img/issues/239)_.

If you’re using the Image HTML Transform, we recommended **_not_** to define `urlPath`.

### Use Cache

(Boolean) Controls whether to use the [disk cache](#disk-cache) and [memory cache](#in-memory-cache).

- `useCache: true` (default)
- `useCache: false` to bypass the cache and generate a new image every time.


### Advanced control of Sharp image processor

[Extra options to pass to the Sharp constructor](https://sharp.pixelplumbing.com/api-constructor#parameters) or the [Sharp image format converter for webp](https://sharp.pixelplumbing.com/api-output#webp), [png](https://sharp.pixelplumbing.com/api-output#png), [jpeg](https://sharp.pixelplumbing.com/api-output#jpeg), or [avif](https://sharp.pixelplumbing.com/api-output#avif).

- `sharpOptions: {}`
- `sharpWebpOptions: {}`
- `sharpPngOptions: {}`
- `sharpJpegOptions: {}`
- `sharpAvifOptions: {}`

{% addedin "Image v6.0.0" %}[ICC Profiles](https://sharp.pixelplumbing.com/api-output#keepiccprofile) are preserved by default (when available) for better colors when images have `srgb`, `p3`, or `cmyk` color profiles. _Related [#244](https://github.com/11ty/eleventy-img/issues/244)_.

#### Full Sharp API Access

Use the `transform` callback to access anything in the [Sharp API](https://sharp.pixelplumbing.com/api-constructor). _Related [#52](https://github.com/11ty/eleventy-img/issues/52)_. This runs before Eleventy Image processing (keep EXIF metadata, rotation, cropping, et al).

```js
{
	// …
	transform: (sharp) => {
		sharp.keepExif();
	}
}
```

### Change Global Plugin Concurrency

```js
import Image from "@11ty/eleventy-img";
Image.concurrency = 4; // default is between 8 and 16 based on os.availableParallelism()
```

### Change the default Hash length

{% addedin "1.0.0" %} You can customize the length of the default filename format hash by using the `hashLength` property.

```js
{
	// …
	hashLength: 8, // careful, don’t make it _too_ short!
}
```

### Advanced Caching Options for Remote Images

For any full URL first argument to this plugin, the full-size remote image will be downloaded and cached locally. See all [relevant `eleventy-fetch` options](/docs/plugins/fetch/#options).

```js
{
	// …
	cacheOptions: {
		// if a remote image URL, this is the amount of time before it fetches a fresh copy
		duration: "1d",

		// project-relative path to the cache directory
		directory: ".cache",

		removeUrlQueryParams: false,
	},
}
```

When caching remote images, you may want to check the processed image output into your `git` (et al) repository to avoid refetches in the future. If remote images are _not_ checked in, they may be refetched every time on your CI server unless you [preserve the `.cache` folder between builds](/docs/plugins/fetch/#running-this-on-your-build-server).

### Using a Hosted Image Service

#### Custom URLs

Want to use a hosted image service instead? You can override the entire URL. Takes precedence over `filenameFormat` option. Useful with `statsSync` or `statsByDimensionsSync`.

The metadata object returned will not include `filename` or `outputPath` properties.

```js
{
	// …
	urlFormat: function ({
		hash, // not included for `statsOnly` images
		src,
		width,
		format,
	}) {
		return `https://example.com/${encodeURIComponent(src)}/${width}/${format}/`;
	}
}
```

- [_Example on `11ty/docs`_](https://github.com/11ty/docs/blob/516faa397a98f8990f3d02eb41e1c99bedfab9cf/.eleventy.js#L105)

#### Stats Only

{% addedin "Image v1.1.0" %} Skips all image processing to return metadata. Doesn’t write files. Use this as an alternative to the separate `statsSync*` functions—this will use in-memory cache and de-duplicate requests.

- `statsOnly: false` (default)
- `statsOnly: true`

## From the Community

<div class="elv-community" id="community-resources">
  {%- include "community-contributed.njk" -%}
</div>

{% include "11tybundle.njk" %}
