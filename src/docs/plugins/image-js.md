---
pageTitle: Image (JavaScript API)
eleventyNavigation:
  key: Image JavaScript API
  parent: Image
  excerpt: Low-level JavaScript API works independent of Eleventy.
excludeFromSidebar: true
---

{% tableofcontents %}

{% include "image-usage.njk" %}

## Usage

{% renderTemplate "webc" %}
<div class="build-cost-inline">
<div><a href="./image.md#optimize-images-on-request"><build-cost @cost="3" @icon="🍦" @rating-icon="🍨" label="Serve Cost"></build-cost></a></div>
<div><a href="./image.md#build-cost"><build-cost @cost="3"></build-cost></a></div>
</div>
{% endrenderTemplate %}

The JavaScript API here is the lowest-level use of Eleventy Image and returns a promise that resolves to a JavaScript object or an HTML string. This usage works _independent of Eleventy_.

<br><br>

{% include "snippets/image/intro.njk" %}

Three things happen here:

1. (Optional) If the first argument is a full URL (not a local file path), we download [the remote image](https://unsplash.com/photos/uXchDIKs4qI) and cache it locally using the [Fetch plugin](/docs/plugins/fetch/). This cached original is then used for the cache duration to avoid a bunch of network requests.
2. Images are then created for each format and width from the input source. In this example, two files are created: `./img/6dfd7ac6-300.webp` and `./img/6dfd7ac6-300.jpeg`.
3. The promise resolves with a metadata object describing those newly created optimized images.

### Return object

The above JavaScript code will log a JavaScript object like this:

<div id="sample-return-object"></div>

```js
{
	webp: [
		{
			format: 'webp',
			width: 300,
			height: 300,
			filename: '6dfd7ac6-300.webp',
			outputPath: 'img/6dfd7ac6-300.webp',
			url: '/img/6dfd7ac6-300.webp',
			sourceType: 'image/webp',
			srcset: '/img/6dfd7ac6-300.webp 300w',
			size: 10184
		}
	],
	jpeg: [
		{
			format: 'jpeg',
			width: 300,
			height: 300,
			filename: '6dfd7ac6-300.jpeg',
			outputPath: 'img/6dfd7ac6-300.jpeg',
			url: '/img/6dfd7ac6-300.jpeg',
			sourceType: 'image/jpeg',
			srcset: '/img/6dfd7ac6-300.jpeg 300w',
			size: 15616
		}
	]
}
```

### Return HTML

Use the `returnType: "html"` option to return HTML. [Learn more about `returnType` and `htmlOptions`](./image.md#return-type-and-html-options).

{% include "snippets/image/intro-html.njk" %}

The above will log:

```html
<picture><source type="image/webp" srcset="/img/yL0QoCVMHj-300.webp 300w"><img alt="" src="/img/yL0QoCVMHj-300.jpeg" width="300" height="300"></picture>
```