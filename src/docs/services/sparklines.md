---
pageTitle: Sparklines
eleventyNavigation:
  key: Sparklines
  excerpt: Returns a Sparkline image given a set of numbers.
  order: 5
communityLinksKey: api-services-sparkline
---

{% callout "error", "md", "Deprecated" %}The runtime service for Sparkline SVG is deprecated and will likely go away at some future date. Please switch to use a build-time SVG package directly (e.g. [`sparkline-svg`](https://www.npmjs.com/package/sparkline-svg)). Sample code shown below. If you’re using [Web Awesome](https://webawesome.com/), they have a [Sparkline](https://webawesome.com/docs/components/sparkline) too!{% endcallout %}

{%- highlight "js" %}
// don’t forget to `npm install sparkline-svg`
import Sparkline from "sparkline-svg";

function sparklineDataUri(values = []) {
	let line = new Sparkline.default(values);
	line.setViewBoxWidth(120);
	line.setViewBoxHeight(30);
	line.setStrokeWidth(1);
	line.setStroke("#000000");

	return line.dataUri;
};

// Example JavaScript Usage:
// `<img src="${sparklineDataUri([1, 2, 3])}" alt="Sparkline …">`
{%- endhighlight %}

**Deprecated**: Feed this runtime service a comma separated list of numeric values and it will return an SVG sparkline image.

- [`11ty/api-sparkline` on GitHub](https://github.com/11ty/api-sparkline)

## Usage

Image URLs have the format:

```
https://v1.sparkline.11ty.dev/:dimensions/:values/
https://v1.sparkline.11ty.dev/:dimensions/:values/:color/
```

- `dimensions` must be two integers separated by an `x`. `[height]x[width]`, e.g. `120x30`
- `values` must be a comma separated list of numbers.
- `color` is an SVG friendly color (URI encoded).

## Samples

Using color `#123456`:

{% callout "demo" %}

<img src="https://v1.sparkline.11ty.dev/120x30/41,25,9,12,10,6,12,14,19,17,23,30,36,21,40/%23123456/" width="120" height="30" alt="Sparkline representing frequency of posts written from 2007 to 2021" loading="lazy" decoding="async" eleventy:ignore>

{% endcallout %}

```html
<img
	src="https://v1.sparkline.11ty.dev/120x30/41,25,9,12,10,6,12,14,19,17,23,30,36,21,40/%23123456/"
	width="120"
	height="30"
	alt="Sparkline representing frequency of posts written from 2007 to 2021"
	loading="lazy"
	decoding="async"
/>
```
