---
pageTitle: Screenshots
eleventyNavigation:
  key: Screenshots
  excerpt: Returns a screenshot image from a URL.
  order: 0
communityLinksKey: api-services-screenshot
---

Feed this runtime service a URL and it returns a fully rendered screenshot image from that page (using Puppeteer)

<div class="youtube-related">
  {% youtubeEmbed "BcZUSZcE8uQ" %}
</div>

## Source Code

- [`11ty/api-screenshot` on GitHub](https://github.com/11ty/api-screenshot)

## Usage

Image URLs have the format:

```
https://v1.screenshot.11ty.dev/:url/
https://v1.screenshot.11ty.dev/:url/:size/
https://v1.screenshot.11ty.dev/:url/:size/:aspectratio/
https://v1.screenshot.11ty.dev/:url/:size/:aspectratio/:zoom/
```

- `url` must be URI encoded.
- Valid `size` values:
  - `small`: 375×\_\_\_ (default)
  - `medium`: 650×\_\_\_
  - `large`: 1024×\_\_\_
    - `aspectratio` of `9:16` is not supported (throws an error)
  - `opengraph`: always 1200×630, works with `zoom`
    - `aspectratio` is ignored (no errors thrown)
- Valid `aspectratio` values:
  - `1:1` (default)
  - `9:16`
- Valid `zoom` values:
  - `bigger` (1.4 `devicePixelRatio`)
  - `smaller` (0.71 `devicePixelRatio`)

## Sample

Try it out on the [Eleventy API Explorer](https://api-explorer.11ty.dev/).

{% callout "demo" %}

<img src="https://v1.screenshot.11ty.dev/https%3A%2F%2Fwww.11ty.dev%2Fdocs%2F/small/9:16/bigger/" class="screenshot screenshot-first-example" width="375" height="667" loading="lazy" decoding="async" alt="Screenshot of 11ty.dev" eleventy:ignore>

{% endcallout %}

```html
<img
	src="https://v1.screenshot.11ty.dev/https%3A%2F%2Fwww.11ty.dev%2Fdocs%2F/small/9:16/bigger/"
	class="screenshot screenshot-first-example"
	width="375"
	height="667"
	loading="lazy"
	decoding="async"
	alt="Screenshot of 11ty.dev"
/>
```

## Advanced Options

### Custom Wait Conditions

You can customize the conditions with which the headless browser will wait to take the screenshot. At a low level, this controls the [`waitUntil` property in Puppeteer’s `goto` call](https://pptr.dev/#?product=Puppeteer&version=v13.3.1&show=api-pagegotourl-options). The options are:

- DOMContentLoaded `wait:0`
- Load event `wait:1` (default)
- Load event; there have been no network connections for 500ms: `wait:2`
- Load event; there are fewer than two network connections for 500ms: `wait:3`

```
/:url/_wait:0/
/:url/_wait:1/
/:url/_wait:2/
/:url/_wait:3/
```

### Custom Timeout

Number of seconds to wait before the request times out. We will attempt to simulate the stop button and return the screenshot that exists up to that point. Worst case, a default Eleventy logo is returned.

- Minimum: `3`
- Maximum: `9`

```
/:url/_timeout:3/
/:url/_timeout:9/
```

### Combine these options

You can use any of these advanced options together, like `/:url/_wait:0_timeout:2/`. Order only matters to the uniqueness of the URL caching on the CDN.
