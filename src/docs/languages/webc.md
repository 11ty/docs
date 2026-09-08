---
eleventyNavigation:
  parent: Template Languages
  key: WebC
  order: 1
  excerpt: Web components with server rendering
logoImage: "/img/logos/webc.png"
layout: layouts/langs.njk
relatedLinks:
---

{% tableofcontents "open" %}

| Type           | Value                                                                                                                                                 |
| -------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| Eleventy Name  | `webc`                                                                                                                                                |
| File Extension | `*.webc`                                                                                                                                              |
| npm            | [`@11ty/webc`](https://www.npmjs.com/package/@11ty/webc) and [`@11ty/eleventy-plugin-webc`](https://www.npmjs.com/package/@11ty/eleventy-plugin-webc) |
| GitHub         | [`11ty/webc`](https://github.com/11ty/webc) and [`11ty/eleventy-plugin-webc`](https://github.com/11ty/eleventy-plugin-webc)                           |

## Why use WebC?

- Brings first-class **components** to Eleventy.
  - Expand any HTML element (including custom elements) to HTML with defined conventions from web standards.
  - This means that Web Components created with WebC are compatible with server-side rendering (without duplicating author-written markup)
  - WebC components are [Progressive Enhancement friendly](https://www.youtube.com/watch?v=p0wDUK0Z5Nw).

### Performance

- Create streamlined component-driven, cache-friendly page-specific JavaScript and CSS bundles. Users load only the code they need to render that page (or that [island](/docs/plugins/is-land/)).
  - Easily [configurable boundaries](#asset-bucketing) for critical component CSS and JavaScript.
  - Works great with [is-land](/docs/plugins/is-land/) for web component hydration.
- Get first-class **incremental builds** (for page templates, components, and Eleventy layouts) when [used with `--incremental`](/docs/usage/#incremental-for-partial-incremental-builds)
- Streaming friendly (stream on the Edge 👀)

### Compatible with Standards

- Uses [`parse5`](https://github.com/inikulin/parse5) to parse WebC HTML as modern browsers do (a nod to [@DasSurma’s](https://twitter.com/DasSurma/status/1559159122964127744) work with [Vite](https://twitter.com/patak_dev/status/1564265006627176449) here)
- Shadow DOM and Declarative Shadow DOM friendly (easily switch components between Light DOM and Shadow DOM)

### Authoring

- Encourages no-quirks mode HTML authoring (and a doctype is optional). WebC throws a helpful error if it encounters quirks mode markup.
- Easily scope component CSS (or use your own scoping utility).
- Tired of importing components? Use global or per-page no-import components.
- Async-friendly: All configuration extensions/hooks into WebC are async-friendly out of the box.
- For more complex templating needs, render any existing Eleventy template syntax (Liquid, markdown, Nunjucks, etc.) inside of WebC.

## Resources

- {% indieavatar "https://11ty.rocks/" %}[Introduction to WebC (11ty.rocks)](https://11ty.rocks/posts/introduction-webc/) by {% indieavatar "https://darthmall.net/" %}W. Evan Sheehan
- {% indieavatar "https://11ty.rocks/" %}[Understanding WebC Features and Concepts (11ty.rocks)](https://11ty.rocks/posts/understanding-webc-features-and-concepts/) by {% indieavatar "https://thinkdobecreate.com/" %}Stephanie Eckles
- [WebC Number Counter Example Source Code and Demo](https://github.com/11ty/demo-webc-counter)
- [Seven Demos of Progressive Enhancement using Image Comparison Components](https://demo-webc-image-compare.netlify.app/) and [Source Code](https://github.com/11ty/demo-webc-image-compare)
- [First Experience Building with Eleventy's WebC Plugin](https://www.raymondcamden.com/2022/10/16/first-experience-building-with-eleventys-webc-plugin)

<div class="youtube-related">
	{%- youtubeEmbed "X-Bpjrkz-V8", "Crash Course in Eleventy’s new WebC Plugin" -%}
	{%- youtubeEmbed "p0wDUK0Z5Nw", "Interactive Progressively-enhanced Web Components with WebC" -%}
	{%- youtubeEmbed "iZvhQ484V8s", "Server-rendered Image Comparison Component", 1552 -%}
</div>

- {% indieavatar "https://zachleat.com/" %}[zachleat.com: Adding Components to Eleventy with WebC](https://www.zachleat.com/web/webc-in-eleventy/): a brief history of the motivation behind WebC including influences from the Svelte and Vue communities.
- {% indieavatar "https://darthmall.net/" %}[11ty.webc.fun](https://11tywebcfun.netlify.app/): a collection of WebC recipes!
- {% indieavatar "https://www.robincussol.com/" %}[Robin Cussol: Optimize your img tags with Eleventy Image and WebC](https://www.robincussol.com/optimize-your-img-tags-with-eleventy-image-and-webc/)

## Installation

{% callout "info", "md" %}Note that WebC support in Eleventy is **not bundled** with core! You must install the officially supported Eleventy plugin and the plugin **requires Eleventy {{ "2.0.0-canary.16" | coerceVersion }}** or newer.{% endcallout %}

It’s on [npm at `@11ty/eleventy-plugin-webc`](https://www.npmjs.com/package/@11ty/eleventy-plugin-webc)!

{%- set codeBlock %}
npm install @11ty/eleventy-plugin-webc
{%- endset %}
{{ codeBlock | highlight("bash") | safe }}

To add support for `.webc` files in Eleventy, add the plugin in your Eleventy configuration file:

{% set codeContent %}
import pluginWebc from "@11ty/eleventy-plugin-webc";

export default function(eleventyConfig) {
	eleventyConfig.addPlugin(pluginWebc);
};
{% endset %}
{% include "snippets/configDefinition.njk" %}

<details>
<summary><strong>Full options list</strong> (defaults shown)</summary>

{% set codeContent %}
import pluginWebc from "@11ty/eleventy-plugin-webc";

export default function (eleventyConfig) {
	eleventyConfig.addPlugin(pluginWebc, {
		// Glob to find no-import global components
		// (The default changed from `false` in Eleventy WebC v0.7.0)
		components: "_components/**/*.webc",

		// Adds an Eleventy WebC transform to process all HTML output
		useTransform: false,

		// Additional global data used in the Eleventy WebC transform
		transformData: {},

		// Options passed to @11ty/eleventy-plugin-bundle
		bundlePluginOptions: {},
	});
};
{% endset %}
{% include "snippets/configDefinition.njk" %}

View the [full options list for the Bundle plugin](/docs/plugins/bundle.md). As an example, you can use the [`transforms` array to modify bundle content with postcss](/docs/plugins/bundle.md#postprocess-the-bundle-output).

</details>

### Syntax highlighting

Because WebC _is_ HTML, you can configure your editor to treat `.webc` files as HTML for syntax highlighting. Your editor of choice should have some documentation on how to get this working.

## Usage

There are a few different ways to use WebC in Eleventy:

### Add a new `.webc` file

[Adding the plugin](#installation) enables support for `.webc` files in your Eleventy project. Create a new `.webc` HTML file in your Eleventy input directory and Eleventy processes it for you. `.webc` files operate in [WebC bundler mode](https://github.com/11ty/webc#aggregating-css-and-js), aggregating the CSS and JS in use on each individual page into a bundle of the assets in use on the page.

WebC uses an HTML parser to process input files: use any HTML here!

{% codetitle "my-page.webc" %}

```html
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="utf-8" />
		<title>WebC Example</title>
	</head>
	<body>
		WebC *is* HTML.
	</body>
</html>
```

### Non-traditional WebC usage

#### Use the Render plugin

Using Eleventy’s built-in [Render plugin](/docs/plugins/render/) allows you to render WebC inside of an existing Liquid, Nunjucks, or 11ty.js template.

{% include "snippets/webc/render.njk" %}

#### Pre-process HTML input as WebC

You can use the configuration option to change the default HTML preprocessor (from `liquid`) to `webc`. This might look like `htmlTemplateEngine: "webc"`. Read more on the [Eleventy documentation: Default Template Engine for HTML Files](/docs/config/#default-template-engine-for-html-files).

#### Post-process HTML output as WebC

This is a catch-all option that lets WebC process `.html` output files in your project (skipping any `.webc` input files to avoid double-processing templates). It uses [Eleventy transforms](/docs/config/#transforms) and is most useful when you want to get up and running with WebC on an existing project quickly.

A few drawbacks to the transform method:

1. This is the slowest build-performance method to implement WebC in a project, so try the other methods first!
2. The WebC Eleventy transform operates with [bundler mode disabled](#css-and-js-bundler-mode), which means it processes WebC but _does not_ aggregate component JS or CSS. ([Upvote this enhancement request](https://github.com/11ty/eleventy-plugin-webc/issues/55))

<details>
<summary>The transform is disabled by default, you will need to use the <code>useTransform</code> option to enable it.</summary>

{% set codeContent %}
import pluginWebc from "@11ty/eleventy-plugin-webc";

export default function (eleventyConfig) {
	eleventyConfig.addPlugin(pluginWebc, {
		useTransform: true,
	});
};
{% endset %}
{% include "snippets/configDefinition.njk" %}

</details>

## Components and output

### HTML-only components

- _Related: [Defining Components in WebC](#defining-components)_

When WebC **does not** find `<style>`, `<link rel="stylesheet">`, or `<script>` elements a component file, WebC leaves the host component tag out of the output HTML by default. To keep the component tags in the output, add [`webc:keep`](#webckeep) to the host component.

{% callout "info", "md" %}WebC components are not limited to custom element name restrictions (e.g. `my-component`) here. You can use `p`, `blockquote`, `h1`, `img`, or any valid HTML tag name.{% endcallout %}

<is-land on:visible import="/js/seven-minute-tabs.js">
<seven-minute-tabs class="tabs-flush" autoheight>
	<div role="tablist" aria-label="Choose an example">
		<a href="#html-only-nokeep" role="tab">Default behavior</a>
		<a href="#html-only-keep" role="tab">With webc:keep</a>
	</div>
	<div id="html-only-nokeep" role="tabpanel">
{% codetitle "_components/my-component.webc" %}
{%- set codeBlock %}
Hello possum.
{%- endset %}
{{ codeBlock | highlight("html") | safe }}
{% codetitle "index.webc" %}
{%- set codeBlock %}
<!DOCTYPE html>
<title>WebC Example</title>
<my-component></my-component>
{%- endset %}
{{ codeBlock | highlight("html") | safe }}
{% codetitle "_site/index.html", "Output example" %}
{%- set codeBlock %}
<!DOCTYPE html>
<html>
	<head>
		<title>WebC Example</title>
	</head>
	<body>
		Hello possum.
	</body>
</html>
{%- endset %}
{{ codeBlock | highlight("html") | safe }}
	</div>
	<div id="html-only-keep" role="tabpanel">
{% codetitle "_components/my-component.webc" %}
{%- set codeBlock %}
Hello possum.
{%- endset %}
{{ codeBlock | highlight("html") | safe }}
{% codetitle "index.webc" %}
{%- set codeBlock %}
<!DOCTYPE html>
<title>WebC Example</title>
<my-component webc:keep></my-component>
{%- endset %}
{{ codeBlock | highlight("html") | safe }}
{% codetitle "_site/index.html", "Output example" %}
{%- set codeBlock %}
<!DOCTYPE html>
<html>
	<head>
		<title>WebC Example</title>
	</head>
	<body>
		<my-component>Hello possum.</my-component>
	</body>
</html>
{%- endset %}
{{ codeBlock | highlight("html") | safe }}
	</div>
</seven-minute-tabs>
</is-land>

### Asset bundling

When WebC finds `<style>`, `<link rel="stylesheet">`, or `<script>` elements a component file, WebC includes the host component tag in the output HTML by default, so you can style it or reach it from client scripts. To drop the component tag from the output, add [`webc:nokeep`](#webcnokeep) to the host component.

This example also shows how Eleventy automatically bundles `scripts` and `styles`, learn more about [CSS and JS in WebC](#css-and-js-bundler-mode).

<is-land on:visible import="/js/seven-minute-tabs.js">
<seven-minute-tabs class="tabs-flush" autoheight>
	<div role="tablist" aria-label="Choose an example">
		<a href="#asset-bundling-keep" role="tab">Default behavior</a>
		<a href="#asset-bundling-nokeep" role="tab">With webc:nokeep</a>
	</div>
	<div id="asset-bundling-keep" role="tabpanel">
{% codetitle "_components/my-component.webc" %}
{%- set codeBlock %}
<p class="possum">Hello possum.</p>
<style>
	.possum { color: rebeccapurple }
</style>
{%- endset %}
{{ codeBlock | highlight("html") | safe }}
{% codetitle "index.webc" %}
{%- set codeBlock %}
<!DOCTYPE html>
<title>WebC Example</title>
<style @raw="getBundle('css')" webc:keep></style>
<my-component></my-component>
{%- endset %}
{{ codeBlock | highlight("html") | safe }}
{% codetitle "_site/index.html", "Output example" %}
{%- set codeBlock %}
<!DOCTYPE html>
<html>
	<head>
		<title>WebC Example</title>
		<style>.possum { color: rebeccapurple }</style>
	</head>
	<body>
		<my-component><p class="possum">Hello possum.</p></my-component>
	</body>
</html>
{%- endset %}
{{ codeBlock | highlight("html") | safe }}
	</div>
	<div id="asset-bundling-nokeep" role="tabpanel">
{% codetitle "_components/my-component.webc" %}
{%- set codeBlock %}
<p class="possum">Hello possum.</p>
<style>
	.possum { color: rebeccapurple }
</style>
{%- endset %}
{{ codeBlock | highlight("html") | safe }}
{% codetitle "index.webc" %}
{%- set codeBlock %}
<!DOCTYPE html>
<title>WebC Example</title>
<style @raw="getBundle('css')" webc:keep></style>
<my-component webc:nokeep></my-component>
{%- endset %}
{{ codeBlock | highlight("html") | safe }}
{% codetitle "_site/index.html", "Output example" %}
{%- set codeBlock %}
<!DOCTYPE html>
<html>
	<head>
		<title>WebC Example</title>
		<style>.possum { color: rebeccapurple }</style>
	</head>
	<body>
		<p class="possum">Hello possum.</p>
	</body>
</html>
{%- endset %}
{{ codeBlock | highlight("html") | safe }}
	</div>
</seven-minute-tabs>
</is-land>

### `webc:keep`

Keeps the host tag of an [HTML-only component](#html-only-components) in the output.

{% codetitle "index.webc" %}

```html
<my-html-only-component webc:keep></my-html-only-component>
```

Keeps a `<style>`, `<link rel="stylesheet">`, or `<script>` element as written in the output instead of adding it to the [bundle](#asset-bundling).

{% codetitle "_components/my-component.webc" %}

```html
<!-- without webc:keep, WebC removes these from the output
     and adds their content to the page’s CSS and JS bundles -->
<style webc:keep>
	.possum { color: rebeccapurple }
</style>
<script webc:keep>
	console.log("Hello possum.");
</script>
```

Keeps a `<slot>` element in the output for a client-side custom element to fill. Read more at [Slots](#slots).

### `webc:nokeep`

Drops the host tag of a [component with CSS or JavaScript](#asset-bundling) from the output.

{% codetitle "index.webc" %}

```html
<my-stylish-component webc:nokeep></my-stylish-component>
```

Inserts content into the output as-is, without adding an element around it.

{% codetitle "_includes/layout.webc" %}

```html
<template @raw="content" webc:nokeep></template>
```

### `webc:is`

Replaces the element’s tag name with a component name. Both examples are equivalent to `<my-component></my-component>`.

{% codetitle "index.webc" %}

```html
<div webc:is="my-component"></div>

<div
  webc:is="my-component"
	webc:import="./some-other-directory/my-component.webc"
></div>
```

### `webc:import`

Imports the component definition for the element from a path relative to the current file, or from an npm package with the `npm:` prefix.

**Note:** WebC expands any component it already knows about without an import, such as every file matching the default `_components/**/*.webc` glob.

- _Related: [Defining Components in WebC](#defining-components) (global or scoped)_

{% codetitle "index.webc" %}

```html
<my-component
  webc:import="./some-other-directory/my-component.webc"
></my-component>

<syntax-highlight
	language="js"
	webc:import="npm:@11ty/eleventy-plugin-syntaxhighlight"
>
	function myFunction() { return true; }
</syntax-highlight>
```

{% addedin "@11ty/webc@0.6.2" %}With the `npm:` prefix, WebC uses the tag name (`syntax-highlight`) to look for a component at `node_modules/@11ty/eleventy-plugin-syntaxhighlight/syntax-highlight.webc`. This also works with a tag name override via [`webc:is`](#webcis). Eleventy plugins can supply WebC components this way. See the [Syntax Highlighter plugin](/docs/plugins/syntaxhighlight/) (`4.2.0` or newer) for an example.

## Attributes, props and slots

{% include "webc-attribute-guide.njk" %}

### Attributes and `webc:root`

Attributes on a host component are available inside the component definition. `webc:root` merges the element’s attributes onto the host component tag, and keeps that tag in the output even for an [HTML-only component](#html-only-components). WebC _merges_ the `class` and `style` attribute values from both.

{% codetitle "_components/my-component.webc" %}

```html
<template webc:root class="possum">Hello possum.</template>
```

{% codetitle "index.webc" %}

```html
<my-component class="item"></my-component>
```

{% codetitle "_site/index.html", "Output example" %}

```html
<my-component class="item possum">Hello possum.</my-component>
```

**Note:** The `webc:root` element must be at the top level of the component definition. Nested inside another element, it has no effect.

#### Override the host component tag

`webc:root="override"` replaces the host component tag with the element itself, with the attributes merged.

{% codetitle "_components/my-component.webc" %}

```html
<button webc:root="override" class="possum">Hello possum.</button>
```

{% codetitle "index.webc" %}

```html
<my-component class="item"></my-component>
```

{% codetitle "_site/index.html", "Output example" %}

```html
<button class="possum item">Hello possum.</button>
```

- {% addedin "@11ty/webc@0.9.0" %}Previously, this required `webc:root` and `webc:keep` together on an element.

### Props (Properties)

Any attribute prefixed with `@` becomes a prop: a server-only attribute that the component reads by name and that WebC removes from the output HTML.

{% codetitle "_components/story-card.webc" %}

```html
<div class="story-card">
	<h1 @text="title"></h1>
	<p @text="publication"></p>
</div>
```

{% codetitle "index.webc" %}

```html
<story-card
	@title="Top 10 Fashionable Possums"
	@publication="Possum Times"
></story-card>
```

{% codetitle "_site/index.html", "Output example" %}

```html
<div class="story-card">
	<h1>Top 10 Fashionable Possums</h1>
	<p>Possum Times</p>
</div>
```

In the HTML specification, attribute names are lower-case. {% addedin "@11ty/webc@0.8.0" %}WebC converts attribute and prop names with dashes (i.e. `@author-name`) to camelCase for JavaScript (i.e. `authorName`), so `<story-card @author-name="Susan Possum"></story-card>` is accessed within the component as `<p @text="authorName"></p>`. More at [issue #71](https://github.com/11ty/webc/issues/71).

### Dynamic attributes and properties

A colon (`:`) prefix makes the value of an attribute or prop a JavaScript expression instead of a string. The expression has access to host component attributes, props, and page data.

This example extends the [props example](#props-properties): the `title` prop and the `href` attribute now read from page data.

{% codetitle "_components/story-card.webc" %}

```html
<div class="story-card">
	<h1 @text="title"></h1>
	<p @text="publication"></p>
	<a :href="href">Read more</a>
</div>
```

{% codetitle "top-ten.webc" %}

```html
---
title: Top 10 Fashionable Possums
---
<story-card
	:@title="title"
	@publication="Possum Times"
	:href="page.url"
></story-card>
```

{% codetitle "_site/top-ten.html", "Output example" %}

```html
<div class="story-card">
	<h1>Top 10 Fashionable Possums</h1>
	<p>Possum Times</p>
	<a href="/top-ten.html">Read more</a>
</div>
```

- {% addedin "@11ty/webc@0.9.0" %}The `:@` prefix for dynamic props.
- WebC converts names with dashes to camelCase, as with [props](#props-properties).
- [`webc:bucket`](#asset-bucketing) is currently the only `webc:*` attribute that accepts a dynamic value. Follow [#143](https://github.com/11ty/webc/issues/143) and [#148](https://github.com/11ty/webc/issues/148) for more.

### `@attributes`

{% addedin "@11ty/webc@0.9.0" %}Renders the host component’s attributes on the element. Props are not included, so `@attributes` is a way to pass through attributes like `id` or `data-*` without listing each one.

{% codetitle "_components/story-card.webc" %}

```html
<div class="story-card" @attributes>
	<h1 @text="title"></h1>
	<p @text="publication"></p>
</div>
```

{% codetitle "index.webc" %}

```html
<story-card
	@title="Top 10 Fashionable Possums"
	@publication="Possum Times"
	id="top-story"
	data-story-id="42"
></story-card>
```

{% codetitle "_site/index.html", "Output example" %}

```html
<div class="story-card" id="top-story" data-story-id="42">
	<h1>Top 10 Fashionable Possums</h1>
	<p>Possum Times</p>
</div>
```

A host attribute with the same name as one on the element replaces it: `class="featured"` on `<story-card>` would replace `class="story-card"` in the output. To merge `class` and `style` values instead, use [`webc:root`](#attributes-and-webcroot) on the element in the component file in place of `@attributes` (e.g. `<div class="story-card" webc:root>`).

Given a value, `@attributes` renders each entry of a JavaScript object as an attribute instead.

{% codetitle "_components/story-card.webc" %}

```html
<div @attributes="({ class: 'story-card', id: `story-${storyId}` })"></div>
```

{% codetitle "index.webc" %}

```html
<story-card @story-id="42"></story-card>
```

{% codetitle "_site/index.html", "Output example" %}

```html
<div class="story-card" id="story-42"></div>
```

Wrap the object in parentheses so JavaScript does not parse it as a [block](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/block) with a [label](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/label). Without a value, `@attributes` is shorthand for `@attributes="webc.attributes"`.

### Slots

WebC places the child content of a component using `<slot>` and `[slot]`, following web component conventions. This example uses an [HTML-only component](#html-only-components).

{% codetitle "_components/my-component.webc" %}

```html
<p><slot>This text is the default fallback.</slot></p>
```

{% codetitle "index.webc" %}

```html
<!-- example with content -->
<my-component>This text will replace slot.</my-component>

<!-- example with fallback -->
<my-component></my-component>
```

{% codetitle "_site/index.html", "Output example" %}

```html
<!-- example with content -->
<p>This text will replace slot.</p>

<!-- example with fallback -->
<p>This text is the default fallback.</p>
```

To output a `<slot>` element in the compiled markup (for use in client JavaScript), add the [`webc:keep` attribute](#webckeep) to it (e.g. `<slot webc:keep>`).

{% callout "info", "md" %}If your component file contains _no content markup_ (it is empty, or has only `<style>` or `<script>` elements), WebC implies `<slot></slot>` and includes the default slot content automatically, per web component conventions. If the component file does contain content markup, include `<slot>` to place the default slot content.{% endcallout %}

#### Named slots

Named slots (e.g. `<h1 slot="title">`) work too. Each `[slot]` element is placed at the `<slot>` with the matching name. This example passes the same content as the [props example](#props-properties) through slots instead.

{% codetitle "_components/story-card.webc" %}

```html
<div class="story-card">
	<slot name="title"></slot>
	<slot name="publication"></slot>
</div>
```

{% codetitle "index.webc" %}

```html
<story-card>
	<h1 slot="title">Top 10 Fashionable Possums</h1>
	<p slot="publication">Possum Times</p>
</story-card>
```

{% codetitle "_site/index.html", "Output example" %}

```html
<div class="story-card">
	<h1>Top 10 Fashionable Possums</h1>
	<p>Possum Times</p>
</div>
```

## Rendering content

### `@html`

Replaces the element’s content with the result of a JavaScript expression, processed as WebC. To skip that processing, use [`@raw`](#raw). Like other [props](#props-properties), WebC removes the prop key from the output. Add `webc:nokeep` to output the result without the element.

{% codetitle "index.webc" %}

```html
---
summary: "A <em>very</em> fashionable possum."
---
<p @html="summary"></p>
<template @html="summary" webc:nokeep></template>
```

{% codetitle "_site/index.html", "Output example" %}

```html
<p>A <em>very</em> fashionable possum.</p>
A <em>very</em> fashionable possum.
```

- {% addedin "@11ty/webc@0.5.0" %}WebC processes the returned content as WebC, so you can return any WebC content here.

### `@raw`

{% addedin "@11ty/webc@0.7.1" %}Replaces the element’s content with the result of a JavaScript expression without reprocessing it as WebC. This is a shorthand for `webc:raw @html`. A common use is placing the page `content` in an [Eleventy layout](/docs/layouts/).

- {% addedin "@11ty/webc@0.6.0" %}Before `@raw`, add `webc:raw` to an `@html` element to prevent processing the result as WebC. `webc:raw @html` still works.

{% codetitle "_includes/layout.webc" %}

```html
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="utf-8">
		<title>WebC Example</title>
	</head>
	<body>
		<template @raw="content" webc:nokeep></template>
	</body>
</html>
```

{% codetitle "index.webc" %}

```html
---
layout: layout.webc
---
<p>Hello possum.</p>
```

{% codetitle "_site/index.html", "Output example" %}

```html
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="utf-8">
		<title>WebC Example</title>
	</head>
	<body>
		<p>Hello possum.</p>
	</body>
</html>
```

{% callout "info", "md-block" %}
In a layout, `content` is the page’s finished output. Whether to place it with `@raw` or `@html` depends on the template language of the pages that use the layout:

- **`.webc` pages** are already processed by WebC, so use `@raw="content"` to place the output as-is.
- **Pages in another template language**, such as Markdown or Nunjucks, are not processed by WebC on their own, so any WebC components or props in their output reach the layout unrendered. Use `@html="content"` to give them their single WebC pass.
- **A mix of both** can share one layout by branching on the page’s input path:

```html
<template webc:if="page.inputPath.endsWith('.webc')" @raw="content" webc:nokeep></template>
<template webc:else @html="content" webc:nokeep></template>
```
{% endcallout %}

### `@text`

{% addedin "@11ty/webc@0.6.0" %}Replaces the element’s content with the HTML-escaped result of a JavaScript expression. Add `webc:nokeep` to output the text without the element.

{% codetitle "index.webc" %}

```html
---
title: Top 10 Fashionable Possums
summary: A <em>very</em> fashionable possum collection.
possum: Susan
---
<h1 @text="title"></h1>
<!-- given the content, summary should use @html,
     but let's use @text and check the result -->
<p @text="summary"></p>
<template @text="possum" webc:nokeep></template>
```

{% codetitle "_site/index.html", "Output example" %}

```html
<h1>Top 10 Fashionable Possums</h1>
<!-- given the content, summary should use @html,
     but let's use @text and check the result -->
<p>A &lt;em&gt;very&lt;/em&gt; fashionable possum collection.</p>
Susan
```

### `webc:if`

{% addedin "@11ty/webc@0.7.1" %}Renders the element only when the JavaScript expression in its value is truthy at build time. Like [dynamic attributes](#dynamic-attributes-and-properties), the expression has access to component attributes, props, and page data. If the expression returns a promise, WebC awaits it before the check.

{% codetitle "index.webc" %}

```html
---
title: Top 10 Fashionable Possums
draft: true
---
<h1 webc:if="title" @text="title"></h1>
<p webc:if="draft">This story is a draft.</p>
<p webc:if="!draft">This story is published.</p>
```

{% codetitle "_site/index.html", "Output example" %}

```html
<h1>Top 10 Fashionable Possums</h1>
<p>This story is a draft.</p>
```

For more complex conditional logic, use a [`webc:type="js"` render function](#webctypejs).

### `webc:elseif` and `webc:else`

{% addedin "@11ty/webc@0.10.0" %}`webc:elseif` renders the element when the preceding `webc:if` or `webc:elseif` sibling did not, and its own JavaScript expression is truthy. `webc:else` renders the element when no preceding sibling in the chain did. HTML comments between the siblings are allowed.

{% codetitle "index.webc" %}

```html
---
possumCount: 3
---
<p webc:if="possumCount > 10">There are many possums!</p>
<p webc:elseif="possumCount > 0">There are some possums.</p>
<p webc:else>There are no possums :(</p>
```

{% codetitle "_site/index.html", "Output example" %}

```html
<p>There are some possums.</p>
```

### `webc:for`

{% addedin "@11ty/webc@0.10.0" %}Repeats the element for each entry of an [iterable](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Iterators_and_Generators#built-in_iterables) (Array, String, Map, Set, and others) or an object, using JavaScript `for` syntax. Use `of` for iterables and `in` for objects. You can name the loop variables whatever you like. A second loop variable receives the zero-based index.

{% codetitle "index.webc" %}

```html
---
possums:
  - Susan
  - Finn
  - Jake
---
<ol>
	<li webc:for="name of possums" @text="name"></li>
</ol>
<ul>
	<li webc:for="(name, index) of possums" @text="`${index}: ${name}`"></li>
</ul>
```

{% codetitle "_site/index.html", "Output example" %}

```html
<ol>
	<li>Susan</li>
	<li>Finn</li>
	<li>Jake</li>
</ol>
<ul>
	<li>0: Susan</li>
	<li>1: Finn</li>
	<li>2: Jake</li>
</ul>
```

Each entry can be an object. This example renders a table row per possum.

{% codetitle "index.webc" %}

```html
---
possums:
  - { name: Susan, hobby: Being strong }
  - { name: Finn, hobby: Dungeon crawling }
---
<table>
	<thead>
		<tr>
			<th>Name</th>
			<th>Hobby</th>
		</tr>
	</thead>
	<tbody>
		<tr webc:for="possum of possums">
			<td @text="possum.name"></td>
			<td @text="possum.hobby"></td>
		</tr>
	</tbody>
</table>
```

{% codetitle "_site/index.html", "Output example" %}

```html
<table>
	<thead>
		<tr>
			<th>Name</th>
			<th>Hobby</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td>Susan</td>
			<td>Being strong</td>
		</tr>
		<tr>
			<td>Finn</td>
			<td>Dungeon crawling</td>
		</tr>
	</tbody>
</table>
```

Use `in` for a plain object, such as when you want to list its properties without knowing the keys ahead of time. The loop variables receive the key, the value, and the zero-based index (`(key, value, index) in possum`).

{% codetitle "index.webc" %}

```html
---
possum: { name: Susan, hobby: Being strong }
---
<table>
	<tbody>
		<tr webc:for="(key, value) in possum">
			<th @text="key"></th>
			<td @text="value"></td>
		</tr>
	</tbody>
</table>
```

{% codetitle "_site/index.html", "Output example" %}

```html
<table>
	<tbody>
		<tr>
			<th>name</th>
			<td>Susan</td>
		</tr>
		<tr>
			<th>hobby</th>
			<td>Being strong</td>
		</tr>
	</tbody>
</table>
```

To repeat several elements at once, loop on a `<template>` with `webc:nokeep`.

{% codetitle "index.webc" %}

```html
---
possums:
  - { name: Susan, hobby: Being strong }
  - { name: Finn, hobby: Dungeon crawling }
---
<dl>
	<template webc:for="possum of possums" webc:nokeep>
		<dt @text="possum.name"></dt>
		<dd @text="`Hobby: ${possum.hobby}`"></dd>
	</template>
</dl>
```

{% codetitle "_site/index.html", "Output example" %}

```html
<dl>
	<dt>Susan</dt>
	<dd>Hobby: Being strong</dd>
	<dt>Finn</dt>
	<dd>Hobby: Dungeon crawling</dd>
</dl>
```

Loops can be nested, but the inner loop cannot access the outer loop’s variables yet. Follow [issue #175](https://github.com/11ty/webc/issues/175) for progress.

## Scripts and styles

### `webc:setup`

{% addedin "@11ty/webc@0.9.0" %}Runs the `<script>` element once on the server and exposes its top-level declarations as data to the component. Use it to provide data and markup to the rest of the component.

This is similar to using [JavaScript as a custom Eleventy front matter type](/docs/data-frontmatter-customize/#example-use-javascript-in-your-front-matter), although data in `webc:setup` is scoped to the component and _does not_ flow back up into the Data Cascade.

{% callout "info", "md" %}
**Note:** Because this JavaScript runs _only once_ per build, even when the component is used many times, it has no access to instance-specific data such as attributes, props, or slots. A function declared here can still receive that data as arguments when the component calls it, see the second example.
{% endcallout %}

{% codetitle "_components/possum-list.webc" %}

```html
<script webc:setup>
	const possums = ["Susan", "Finn", "Jake"];
</script>

<h2 @text="`${possums.length} fashionable possums`"></h2>
<ul>
	<li webc:for="name of possums" @text="name"></li>
</ul>
```

{% codetitle "index.webc" %}

```html
<possum-list></possum-list>
```

{% codetitle "_site/index.html", "Output example" %}

```html
<h2>3 fashionable possums</h2>
<ul>
	<li>Susan</li>
	<li>Finn</li>
	<li>Jake</li>
</ul>
```

To use instance-specific data, declare a function in the setup script and pass the attributes or props in as arguments from the component markup.

{% codetitle "_components/possum-greeting.webc" %}

```html
<script webc:setup>
	function greeting(name, hobby) {
		return `Hello ${name}, do you enjoy ${hobby.toLowerCase()}?`;
	}
</script>

<p @text="greeting(name, hobby)"></p>
```

{% codetitle "index.webc" %}

```html
<possum-greeting @name="Susan" @hobby="Being strong"></possum-greeting>
<possum-greeting @name="Finn" @hobby="Dungeon crawling"></possum-greeting>
```

{% codetitle "_site/index.html", "Output example" %}

```html
<p>Hello Susan, do you enjoy being strong?</p>
<p>Hello Finn, do you enjoy dungeon crawling?</p>
```

Works with `var`, `let`, `const`, `function`, and Array and Object [destructuring assignment](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment). Uses the [`node-retrieve-globals` package](https://github.com/zachleat/node-retrieve-globals/).

### `webc:type`

Treats the element’s content as a JavaScript render function (`js`), or as another Eleventy template syntax (`11ty`, named in [`11ty:type`](#webctype11ty-and-11tytype)). The Eleventy WebC plugin bundles four types:

1. `webc:type="js"` {% addedin "@11ty/webc@0.7.1" %}
1. `webc:type="render"` (superseded by `webc:type="js"`)
1. `webc:type="11ty"` (Eleventy only)
1. `webc:type="css:scoped"` (internal, used by [`webc:scoped`](#webcscoped), but overridable)

Adding your own [`webc:type` custom transform](https://github.com/11ty/webc#custom-transforms) **directly** to WebC is not yet available in the Eleventy WebC plugin. If you would like to see this added, [please let us know](https://neighborhood.11ty.dev/@11ty).

#### `webc:type="js"`

{% addedin "@11ty/webc@0.7.1" %}Runs the content as server JavaScript. The value of the last statement replaces the element and is processed as WebC. If the value is a promise, WebC resolves it. The script has access to the component’s attributes and [props](#props-properties).

<is-land on:visible import="/js/seven-minute-tabs.js">
<seven-minute-tabs class="tabs-flush" autoheight>
	<div role="tablist" aria-label="Choose an example">
		<a href="#webc-type-js-alt" role="tab">With alt</a>
		<a href="#webc-type-js-noalt" role="tab">Missing alt</a>
	</div>
	<div id="webc-type-js-alt" role="tabpanel">
{% codetitle "_components/img.webc" %}
{%- set codeBlock %}
<script webc:type="js">
	if (!alt) {
		throw new Error(`Missing alt attribute on <img src="${src}">`);
	}
	`<img src="${src}" alt="${alt}">`;
</script>
{%- endset %}
{{ codeBlock | highlight("html") | safe }}
{% codetitle "index.webc" %}
{%- set codeBlock %}
<img src="susan.jpeg" alt="Susan Possum in a purple jacket">
{%- endset %}
{{ codeBlock | highlight("html") | safe }}
{% codetitle "_site/index.html", "Output example" %}
{%- set codeBlock %}
<img src="susan.jpeg" alt="Susan Possum in a purple jacket">
{%- endset %}
{{ codeBlock | highlight("html") | safe }}
	</div>
	<div id="webc-type-js-noalt" role="tabpanel">
{% codetitle "_components/img.webc" %}
{%- set codeBlock %}
<script webc:type="js">
	if (!alt) {
		throw new Error(`Missing alt attribute on <img src="${src}">`);
	}
	`<img src="${src}" alt="${alt}">`;
</script>
{%- endset %}
{{ codeBlock | highlight("html") | safe }}
{% codetitle "index.webc" %}
{%- set codeBlock %}
<img src="finn.jpeg">
{%- endset %}
{{ codeBlock | highlight("html") | safe }}
{% codetitle "npx @11ty/eleventy", "Build error" %}
{%- set codeBlock %}
[11ty] Original error message: Missing alt attribute on <img src="finn.jpeg">
{%- endset %}
{{ codeBlock | highlight("bash") | safe }}
	</div>
</seven-minute-tabs>
</is-land>

The same component with the superseded `webc:type="render"`, which exports a function and reads attributes from `this`. Unlike `js`, `render` does not imply `webc:is="template"`, so add it to drop the void `<img>` host tag:

{% codetitle "_components/img.webc" %}

```html
<script webc:type="render" webc:is="template">
	export default function () {
		if (!this.alt) {
			throw new Error(`Missing alt attribute on <img src="${this.src}">`);
		}
		return `<img src="${this.src}" alt="${this.alt}">`;
	}
</script>
```

A render function can generate CSS too. Add `webc:is="style"` and WebC adds the result to the [CSS bundle](#asset-bundling) like any other component style.

{% codetitle "_components/possum-theme.webc" %}

```html
<script webc:type="js" webc:is="style">
	`.possum { color: ${color}; }`;
</script>
```

{% codetitle "index.webc" %}

```html
<!DOCTYPE html>
<title>WebC Example</title>
<style @raw="getBundle('css')" webc:keep></style>
<possum-theme @color="rebeccapurple"></possum-theme>
<p class="possum">Hello possum.</p>
```

{% codetitle "_site/index.html", "Output example" %}

```html
<!DOCTYPE html>
<html>
	<head>
		<title>WebC Example</title>
		<style>.possum { color: rebeccapurple; }</style>
	</head>
	<body>
		<possum-theme></possum-theme>
		<p class="possum">Hello possum.</p>
	</body>
</html>
```

The same component with the superseded `webc:type="render"`:

{% codetitle "_components/possum-theme.webc" %}

```html
<script webc:type="render" webc:is="style">
	export default function () {
		return `.possum { color: ${this.color}; }`;
	}
</script>
```

Notes:

- To generate scoped CSS with JavaScript, add [`webc:scoped`](#webcscoped) to the element as well (`<script webc:type="js" webc:is="style" webc:scoped>`).
- For simple conditions, [`webc:if`](#webcif) may be all you need.
- {% addedin "@11ty/webc@0.9.0" %}`webc:type="js"` implies `webc:is="template"`, so WebC reprocesses the returned content as WebC (HTML). Set your own `webc:is` attribute to generate a different tag (e.g. `webc:is="script"` or `webc:is="style"`).
- {% addedin "@11ty/webc@0.9.0" %}`webc:type="js"` implies `webc:nokeep`, so the outer element is left out of the output. Add `webc:keep` to keep it.

#### Extra data for JavaScript render functions

- `webc.attributes`: {% addedin "@11ty/webc@0.9.0" %} an object literal representing the current element’s attributes.
- `webc.renderAttributes`: {% addedin "@11ty/webc@0.9.0" %} a method to render _public_ attributes to a string.
- `webc.filterPublicAttributes`: {% addedin "@11ty/webc@0.10.1" %} a method to filter `webc.attributes`, returning an object with only _public_ attributes. Usage: `webc.filterPublicAttributes(webc.attributes)`
- `webc.escapeText`: {% addedin "@11ty/webc@0.10.1" %} encodes all characters that have to be escaped in HTML text (via the [`entities` package](https://github.com/fb55/entities/blob/b6cd547c8088b55a18b2ef449bc9dc8f9c294f0c/src/escape.ts#L126))
- `webc.escapeAttribute`: {% addedin "@11ty/webc@0.10.1" %} encodes all characters that have to be escaped in HTML attributes (via the [`entities` package](https://github.com/fb55/entities/blob/b6cd547c8088b55a18b2ef449bc9dc8f9c294f0c/src/escape.ts#L111))

Read more at [Issue #104](https://github.com/11ty/webc/issues/104).

This `<img>` component re-uses every attribute from the host component. The same expression is useful in an error message, e.g. `` `Missing alt attribute on <img${webc.renderAttributes(webc.attributes)}>` `` (the rendered string starts with a space, so leave none before `${`).

{% codetitle "_components/img.webc" %}

```html
<script webc:type="js">
	`<img ${webc.renderAttributes(webc.attributes)}>`;
</script>
```

{% codetitle "index.webc" %}

```html
<img
  src="possum.jpeg"
	alt="Susan Possum in a purple jacket"
	loading="lazy"
	class="portrait"
>
```

{% codetitle "_site/index.html", "Output example" %}

```html
<img
  src="possum.jpeg"
	alt="Susan Possum in a purple jacket"
	loading="lazy"
	class="portrait"
>
```

#### `webc:type="11ty"` and `11ty:type`

Renders the content with the Eleventy template syntax, or comma-separated chain of syntaxes, named in `11ty:type`. The Eleventy WebC plugin wires the WebC [custom transforms feature](https://github.com/11ty/webc#custom-transforms) to the [Eleventy Render plugin](/docs/plugins/render/) to make this possible.

{% callout "info", "md" %}**Note:** The `webc:type="11ty"` feature is exclusive to the **Eleventy** WebC plugin and is not available in standalone WebC.{% endcallout %}

`11ty:type` accepts any [valid template syntax](/docs/plugins/render/#rendertemplate-paired-shortcode).

{% codetitle "index.webc" %}

{% raw %}

```liquid
---
title: Top 10 Fashionable Possums
---
<template webc:type="11ty" 11ty:type="liquid,md">
{% assign publication = "Possum Times" %}
## {{ title }}

_{{ publication }}_
</template>
```

{% endraw %}

{% codetitle "_site/index.html", "Output example" %}

```html
<h2>Top 10 Fashionable Possums</h2>
<p><em>Possum Times</em></p>
```

- The template has full access to the data cascade, including `title` [set in front matter](#front-matter).
- {% addedin "@11ty/webc@0.5.0" %}WebC processes content returned on `<template>` (or `webc:is="template"`) elements as WebC, so you can return any WebC content here.
- You can [add your own custom template engine](/docs/languages/custom/), which is then available here too (e.g. `<style webc:type="11ty" 11ty:type="sass">`).

### Helper functions

WebC [helpers](https://github.com/11ty/webc#helper-functions) are JavaScript functions available in dynamic attributes, `@html`, `@raw`, and render functions.

#### Eleventy-provided helpers

{% addedin "@11ty/eleventy-plugin-webc@0.5.0" %}Eleventy WebC provides [JavaScript template functions](/docs/languages/javascript/#javascript-template-functions) and [universal filters](/docs/filters/) automatically as WebC helpers.

This includes [`url`, `slugify`, `log`, and others](/docs/filters/#eleventy-provided-filters).

{% codetitle "index.webc" %}

```html
<a :href="url('/possums/')">All possums</a>
```

{% codetitle "_site/index.html", "Output example" %}

```html
<a href="/possums/">All possums</a>
```

#### Supply your own helper

{% set codeContent %}
export default function (eleventyConfig) {
	// via a universal filter
	eleventyConfig.addFilter("shout", (text) => text.toUpperCase());

	// or via a JavaScript template function directly
	eleventyConfig.addJavaScriptFunction("siteName", () => "Possum Times");
};
{% endset %}
{% include "snippets/configDefinition.njk" %}

{% codetitle "index.webc" %}

```html
---
title: Top 10 Fashionable Possums
---
<h1 @text="shout(title)"></h1>
<p @text="siteName()"></p>
```

{% codetitle "_site/index.html", "Output example" %}

```html
<h1>TOP 10 FASHIONABLE POSSUMS</h1>
<p>Possum Times</p>
```

### `webc:scoped`

Scopes the `<style>` element to the component by prefixing every selector with a generated class, or with the class name given as the value. The generated class name is a hash of the style content, so WebC de-duplicates identical component styles. WebC replaces `:host` with the generated class selector.

To choose your own prefix, give `webc:scoped` a value. Prefer a named prefix when anything outside the component refers to the class, such as other stylesheets, scripts, or tests: the generated name changes whenever you edit the style content, while a named prefix stays the same and keeps the output CSS readable. WebC checks for duplicate prefixes in your component tree and throws an error when it finds a collision.

<is-land on:visible import="/js/seven-minute-tabs.js">
<seven-minute-tabs class="tabs-flush" autoheight>
	<div role="tablist" aria-label="Choose an example">
		<a href="#webc-scoped-generated" role="tab">Default behavior</a>
		<a href="#webc-scoped-named" role="tab">Named prefix</a>
	</div>
	<div id="webc-scoped-generated" role="tabpanel">
{% codetitle "_components/my-component.webc" %}
{%- set codeBlock %}
<style webc:scoped>
	:host {
		color: blue;
	}
	h1 {
		color: rebeccapurple;
	}
</style>
<h1>Top 10 Fashionable Possums</h1>
<p>Hello possum.</p>
{%- endset %}
{{ codeBlock | highlight("html") | safe }}
{% codetitle "index.webc" %}
{%- set codeBlock %}
<!DOCTYPE html>
<title>WebC Example</title>
<style @raw="getBundle('css')" webc:keep></style>
<my-component></my-component>
{%- endset %}
{{ codeBlock | highlight("html") | safe }}
{% codetitle "_site/index.html", "Output example" %}
{%- set codeBlock %}
<!DOCTYPE html>
<html>
	<head>
		<title>WebC Example</title>
		<style>.wt-d_fkgu{color:blue}.wt-d_fkgu h1{color:rebeccapurple}</style>
	</head>
	<body>
		<my-component class="wt-d_fkgu">
			<h1>Top 10 Fashionable Possums</h1>
			<p>Hello possum.</p>
		</my-component>
	</body>
</html>
{%- endset %}
{{ codeBlock | highlight("html") | safe }}
	</div>
	<div id="webc-scoped-named" role="tabpanel">
{% codetitle "_components/my-component.webc" %}
{%- set codeBlock %}
<style webc:scoped="possum">
	:host {
		color: blue;
	}
	h1 {
		color: rebeccapurple;
	}
</style>
<h1>Top 10 Fashionable Possums</h1>
<p>Hello possum.</p>
{%- endset %}
{{ codeBlock | highlight("html") | safe }}
{% codetitle "index.webc" %}
{%- set codeBlock %}
<!DOCTYPE html>
<title>WebC Example</title>
<style @raw="getBundle('css')" webc:keep></style>
<my-component></my-component>
{%- endset %}
{{ codeBlock | highlight("html") | safe }}
{% codetitle "_site/index.html", "Output example" %}
{%- set codeBlock %}
<!DOCTYPE html>
<html>
	<head>
		<title>WebC Example</title>
		<style>.possum{color:blue}.possum h1{color:rebeccapurple}</style>
	</head>
	<body>
		<my-component class="possum">
			<h1>Top 10 Fashionable Possums</h1>
			<p>Hello possum.</p>
		</my-component>
	</body>
</html>
{%- endset %}
{{ codeBlock | highlight("html") | safe }}
	</div>
</seven-minute-tabs>
</is-land>

{% callout "info", "md" -%}
Declarative Shadow DOM is another way to encapsulate component styles, and you can use both methods in WebC. It has two tradeoffs:

1. Progressive enhancement requires [ubiquitous browser support](https://caniuse.com/declarative-shadow-dom) before you use it for content in the critical rendering path.
2. It duplicates the `<style>` element in each instance of the component.
{% endcallout %}

<details>
<summary>Expand for a Declarative Shadow DOM example</summary>

WebC leaves the `<style>` inside a shadow root template as is, so it is not bundled and repeats in every instance. WebC also fills the `<slot>` at build time.

{% codetitle "_components/my-component.webc" %}

```html
<template shadowrootmode="open">
	<style>
		h1 {
			color: rebeccapurple;
		}
	</style>
	<slot></slot>
</template>
```

{% codetitle "index.webc" %}

```html
<!DOCTYPE html>
<title>WebC Example</title>
<style @raw="getBundle('css')" webc:keep></style>
<my-component>
	<h1>Top 10 Fashionable Possums</h1>
</my-component>
<my-component>
	<h1>Hello possum.</h1>
</my-component>
```

{% codetitle "_site/index.html", "Output example" %}

```html
<!DOCTYPE html>
<html>
	<head>
		<title>WebC Example</title>
		<style></style>
	</head>
	<body>
		<my-component>
			<template shadowrootmode="open">
				<style>
					h1 {
						color: rebeccapurple;
					}
				</style>
				<h1>Top 10 Fashionable Possums</h1>
			</template>
		</my-component>
		<my-component>
			<template shadowrootmode="open">
				<style>
					h1 {
						color: rebeccapurple;
					}
				</style>
				<h1>Hello possum.</h1>
			</template>
		</my-component>
	</body>
</html>
```

</details>

### `webc:bucket`

Sends the element’s bundled CSS or JavaScript to a named asset bucket instead of the default one, so you can output it somewhere else on the page, for example at the end of `<body>` instead of in `<head>`. Output a bucket with `getBundle(type, name)`. Read more at [Asset bucketing](#asset-bucketing).

<is-land on:visible import="/js/seven-minute-tabs.js">
<seven-minute-tabs class="tabs-flush" autoheight>
	<div role="tablist" aria-label="Choose an example">
		<a href="#webc-bucket-element" role="tab">On the element</a>
		<a href="#webc-bucket-cascade" role="tab">Cascading from a parent</a>
	</div>
	<div id="webc-bucket-element" role="tabpanel">
{% codetitle "_components/my-footer.webc" %}
{%- set codeBlock %}
<style>
	footer { color: rebeccapurple }
</style>
<script webc:bucket="defer">
	console.log("Hello possum.");
</script>
<footer>Hello possum.</footer>
{%- endset %}
{{ codeBlock | highlight("html") | safe }}
{% codetitle "index.webc" %}
{%- set codeBlock %}
<!DOCTYPE html>
<title>WebC Example</title>
<style @raw="getBundle('css')" webc:keep></style>
<div>
	<my-footer></my-footer>
</div>
<style @raw="getBundle('css', 'defer')" webc:keep></style>
<script @raw="getBundle('js', 'defer')" webc:keep></script>
{%- endset %}
{{ codeBlock | highlight("html") | safe }}
{% codetitle "_site/index.html", "Output example" %}
{%- set codeBlock %}
<!DOCTYPE html>
<html>
	<head>
		<title>WebC Example</title>
		<style>footer { color: rebeccapurple }</style>
	</head>
	<body>
		<div>
			<my-footer>
				<footer>Hello possum.</footer>
			</my-footer>
		</div>
		<style></style>
		<script>console.log("Hello possum.");</script>
	</body>
</html>
{%- endset %}
{{ codeBlock | highlight("html") | safe }}
	</div>
	<div id="webc-bucket-cascade" role="tabpanel">
{% codetitle "_components/my-footer.webc" %}
{%- set codeBlock %}
<style>
	footer { color: rebeccapurple }
</style>
<script>
	console.log("Hello possum.");
</script>
<footer>Hello possum.</footer>
{%- endset %}
{{ codeBlock | highlight("html") | safe }}
{% codetitle "index.webc" %}
{%- set codeBlock %}
<!DOCTYPE html>
<title>WebC Example</title>
<style @raw="getBundle('css')" webc:keep></style>
<div webc:bucket="defer">
	<my-footer></my-footer>
</div>
<style @raw="getBundle('css', 'defer')" webc:keep></style>
<script @raw="getBundle('js', 'defer')" webc:keep></script>
{%- endset %}
{{ codeBlock | highlight("html") | safe }}
{% codetitle "_site/index.html", "Output example" %}
{%- set codeBlock %}
<!DOCTYPE html>
<html>
	<head>
		<title>WebC Example</title>
		<style></style>
	</head>
	<body>
		<div>
			<my-footer>
				<footer>Hello possum.</footer>
			</my-footer>
		</div>
		<style>footer { color: rebeccapurple }</style>
		<script>console.log("Hello possum.");</script>
	</body>
</html>
{%- endset %}
{{ codeBlock | highlight("html") | safe }}
	</div>
</seven-minute-tabs>
</is-land>

- Added to any other element, `webc:bucket` cascades to every element and component inside it, as in the second example.
- The value can be a JavaScript expression with the `:` prefix, e.g. `:webc:bucket="bucketName"`.

## Opting out of WebC processing

### `webc:raw`

Skips WebC processing for everything inside the element, so components, `@` and `:` attributes are output as written. Attributes on the element itself are still processed. This works well with the `<template>` element, which WebC leaves in the output.

{% codetitle "_components/my-component.webc" %}

```html
<template webc:raw>
	<story-card @title="Top 10 Fashionable Possums"></story-card>
	<style>
		p { color: rebeccapurple }
	</style>
</template>
```

{% codetitle "index.webc" %}

```html
<my-component></my-component>
```

{% codetitle "_site/index.html", "Output example" %}

```html
<template>
	<story-card @title="Top 10 Fashionable Possums"></story-card>
	<style>
		p { color: rebeccapurple }
	</style>
</template>
```

- Related: [`@raw` property](#raw)

### `webc:ignore`

{% addedin "@11ty/webc@0.9.0" %}Removes the element and its content from processing and output entirely. This is useful for server-side comments or usage documentation in a component.

{% codetitle "_components/story-card.webc" %}

```html
<template webc:ignore>
	Usage:
	<story-card @title="Top 10 Fashionable Possums"></story-card>
</template>
<div class="story-card">
	<h1 @text="title"></h1>
</div>
```

{% codetitle "index.webc" %}

```html
<story-card @title="Top 10 Fashionable Possums"></story-card>
```

{% codetitle "_site/index.html", "Output example" %}

```html
<div class="story-card">
	<h1>Top 10 Fashionable Possums</h1>
</div>
```

### Server-only comments

{% addedin "@11ty/webc@0.10.0" %}

Add one or more dashes to the start and end of an HTML comment and WebC removes it from the output. A standard HTML comment is rendered to the output as usual.

{% codetitle "_components/my-component.webc" %}

```html
<!------- WebC removes this comment ------->
<!--- WebC removes this comment --->
<!-- WebC does NOT remove this comment -->
<p>Hello possum.</p>
```

{% codetitle "index.webc" %}

```html
<my-component></my-component>
```

{% codetitle "_site/index.html", "Output example" %}

```html
<!-- WebC does NOT remove this comment -->
<p>Hello possum.</p>
```

## Subtleties and limitations

### Void elements

Custom elements are not supported as void elements, they require both a starting and ending tag (as per the [HTML specification](https://html.spec.whatwg.org/multipage/syntax.html#elements-2)). This means a WebC component cannot be self-closing. To work around this limitation, use [`webc:is`](#webcis) on a void element (e.g. `<img webc:is="my-image" src="possum.jpeg">`), or name the component file after the void element itself (e.g. `_components/img.webc`).

### Head components

The HTML parser moves custom element children of `<head>` into the `<body>`. To work around this limitation, use [`webc:is`](#webcis) on an element that is allowed in `<head>`, such as `<template>`.

{% codetitle "_components/site-meta.webc" %}

```html
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
```

{% codetitle "index.webc" %}

```html
<!DOCTYPE html>
<html lang="en">
	<head>
		<template webc:is="site-meta"></template>
		<title>WebC Example</title>
	</head>
	<body>
		<p>Hello possum.</p>
	</body>
</html>
```

{% codetitle "_site/index.html", "Output example" %}

```html
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="utf-8">
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<title>WebC Example</title>
	</head>
	<body>
		<p>Hello possum.</p>
	</body>
</html>
```

### Table components

WebC uses the parse5 library, so it parses and tokenizes every WebC file the same way a web browser does. If you put a `<table>` element in a custom WebC element and pass its `<tr>` and `<td>` elements through a slot, the parser sees the `<tr>` and `<td>` elements as orphans. It removes them during the initial parse and places the table internals as siblings of the table.

To work around this limitation, use [`webc:is`](#webcis) for the `<table>`, `<tr>`, and `<td>` elements.

{% codetitle "_components/possum-table.webc" %}

```html
<template webc:is="table">
	<slot></slot>
</template>
```

{% codetitle "index.webc" %}

```html
<possum-table>
	<template webc:is="tr">
		<template webc:is="td">Susan</template>
		<template webc:is="td">Is strong</template>
	</template>
</possum-table>
```

{% codetitle "_site/index.html", "Output example" %}

```html
<table>
	<tr>
		<td>Susan</td>
		<td>Is strong</td>
	</tr>
</table>
```

### Rendering modes

Eleventy has two rendering modes: `page` and `component`. WebC chooses the mode from the markup you supply. The `page` mode renders full HTML pages. The `component` mode renders fragments of HTML. Most of the time you do not need to think about this distinction, but it is documented here for completeness.

- `page` is used when the markup starts with `<!doctype` (or `<!DOCTYPE`) or `<html` (WebC forces no-quirks parsing).
- `component` is used otherwise.

### Differences from HTML parsing

{% addedin "@11ty/webc@0.9.0" %}WebC processes content inside of both `<template>` and `<noscript>` elements. The HTML parser treats these as plaintext.

## Eleventy + WebC Features

### Front Matter

WebC in Eleventy works automatically with standard Eleventy conventions for [front matter](/docs/data-frontmatter/) (though front matter in Eleventy is _optional_).

{% codetitle "with-front-matter.webc" %}

```yaml
---
layout: "my-layout.webc"
---
WebC *is* HTML.
```

<details>
<summary>Expand to see an example <code>my-layout.webc</code></summary>

The above example assumes the existence of `_includes/my-layout.webc` (an [Eleventy layout](/docs/layouts/)).

{% codetitle "_includes/my-layout.webc" %}

```html
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="utf-8" />
		<title>WebC Example</title>
	</head>
	<body @raw="content"></body>
</html>
```

- Read more about the WebC properties: [`@raw`](#raw) {% addedin "@11ty/webc@0.7.1" %} and [`@html`](#html).
<!-- * {% addedin "@11ty/webc@0.5.0" %}`this.` is no longer required in `@html` or `@raw` (e.g. `this.content`) when referencing helpers/data/attributes/property values. -->

</details>

Front matter (per standard Eleventy conventions) is supported in page-level templates only (`.webc` files in your input directory), not in [components](#defining-components).

### Defining Components

Components are the {% emoji "✨" %}magic{% emoji "✨" %} of WebC and there are a few ways to define components in WebC:

1. Use global no-import components specified in your config file.
1. Specify a glob of no-import components at a directory or template level in the data cascade.
1. You can use [`webc:import`](#webcimport) inside of your components to import another component directly.

{% callout "info" %}
Notably, WebC components can have any valid HTML tag name! They are not restricted to the same naming limitations as custom elements (which require a dash in the name).
{% endcallout %}

#### Global no-import Components

Use the `components` property in the options passed to `addPlugin` in your Eleventy configuration file to specify project-wide WebC component files available for use in any page.

The `components` option accepts:

- String (file path or glob)
- Array (of file paths or globs) [{% addedin "@11ty/eleventy-plugin-webc@0.9.2" %}](https://github.com/11ty/eleventy-plugin-webc/releases/tag/v0.9.2)
- [`npm:` prefix aliases](#webcimport) [{% addedin "@11ty/eleventy-plugin-webc@0.9.2" %}](https://github.com/11ty/eleventy-plugin-webc/releases/tag/v0.9.2)

{% set codeContent %}
import pluginWebc from "@11ty/eleventy-plugin-webc";

export default function (eleventyConfig) {
	eleventyConfig.addPlugin(pluginWebc, {
		// Glob to find no-import global components
		// This path is relative to the project-root!
		// The default value is shown:
		components: "_components/**/*.webc",

		// or an Array (Eleventy WebC v0.9.2+)
		components: [
			"_components/**/*.webc",
			"npm:@11ty/is-land/*.webc",
			"npm:@11ty/eleventy-plugin-syntaxhighlight/*.webc",
		],
	});
};
{% endset %}
{% include "snippets/configDefinition.njk" %}

The path for `components` is relative to your project root (**not** your [project’s `input` directory](/docs/config/#input-directory)).

The file names of components found in the glob determine the global tag name used in your project (e.g. `_components/my-component.webc` will give you access to `<my-component>`).

#### Declaring Components in Front Matter

You can also use and configure specific components in front matter (or, via any part of the data cascade—scoped to a folder or a template) by assigning a glob (or array of globs) to the property at `webc.components`:

{% codetitle "my-directory/my-page.webc" %}

```html
---
layout: "my-layout.webc"
webc:
  components: "./webc/*.webc"
---

<my-webc-component>WebC *is* HTML.</my-webc-component>
```

{% callout "warn", "md-block" %}By default these paths are relative to the template file. If you’re setting this in the data cascade in a directory data file that will apply multiple child folders deep, it might be better to:

1. Use the global no-import components option.
1. Use `~/` as a prefix (e.g. `~/my-directory/webc/*.webc`) to alias to the project’s root directory.
   {% endcallout %}

### Official WebC Components

The following plugins offer official WebC components for use in your projects:

- `@11ty/is-land` supplies `<is-land>`
  - Example: `<is-land webc:import="npm:@11ty/is-land">`
  - Read more at [Use with `is-land`](#use-with-is-land)
- `@11ty/eleventy-plugin-syntaxhighlight` supplies `<syntax-highlight>`
  - Example: `<syntax-highlight language="js" webc:import="npm:@11ty/eleventy-plugin-syntaxhighlight">`
  - Read more at [Syntax Highlighting Plugin](/docs/plugins/syntaxhighlight/#syntax-highlight-source-code)
- `@11ty/eleventy-img` supplies `<eleventy-image>`
  - {% addedin "Image v3.1.0" %}
  - Example: `<img webc:is="eleventy-image" webc:import="npm:@11ty/eleventy-img">`
  - Read more at [the Image WebC component](../plugins/image-webc.md).

### Eleventy Data Cascade

To access **global data** from the Data Cascade, use the `$data` variable in your component’s JavaScript. For example, if you have this in `_data/site.json`:

```json
{
  "title": "My Site Title"
}
```

In an internal WebC component, such as one in `src/_includes/components/*`, you can access that data via:

```html
<h1 @text="$data.site.title"></h1>
```

In a top-level WebC template, such as a layout file or other `*.webc` files in the Eleventy input folder, you can access global data variables directly without `$data`:

```html
<h1 @text="site.title"></h1>
```

### CSS and JS (Bundler mode)

Eleventy WebC bundles each page’s assets (the CSS and JS used by components on the page). WebC rolls these up automatically when a component uses `<script>`, `<script src>`, `<style>`, or `<link rel="stylesheet">`. You can use this to implement component-driven Critical CSS.

{% callout "info", "md" %}Note on **Declarative Shadow DOM**: elements inside of [declarative shadow root](https://web.dev/declarative-shadow-dom/) template (`<template shadowrootmode>` or the deprecated `<template shadowroot>`) are left as is and **not bundled**.{% endcallout %}

{% codetitle "_components/my-webc-component.webc" %}

```html
<style>
	/* This is component CSS */
</style>
<script>
	/* This is component JS */
</script>

<!-- Local file references work too -->
<link rel="stylesheet" href="my-file.css" />
<script src="my-file.js"></script>
```

As shown above this also includes `<link rel="stylesheet">` and `<script src>` when the URLs point to files on the file system ([remote URL sources are not yet supported](https://github.com/11ty/webc/issues/15)).

You can opt-out of bundling on a per-element basis [using `webc:keep`](#webckeep).

{% codetitle "_includes/layout.webc" %}

```html
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="utf-8" />
		<title>WebC Example</title>

		<!-- inline bundles -->
		<style @raw="getBundle('css')" webc:keep></style>
		<script @raw="getBundle('js')" webc:keep></script>

		<!-- or write your bundle to a file -->
		<link rel="stylesheet" :href="getBundleFileUrl('css')" webc:keep />
		<script :src="getBundleFileUrl('js')" webc:keep></script>
	</head>
	<body @raw="content"></body>
</html>
```

- {% addedin "@11ty/eleventy-plugin-webc@0.9.0" %}Eleventy WebC uses the [Bundle Plugin](/docs/plugins/bundle.md#using-with-webc) behind the scenes to implement bundling. `getBundle('css')` and `getBundle('js')` can now be used instead of `getCss(page.url)` and `getJs(page.url)` respectively.
- {% addedin "@11ty/webc@0.8.0" %}`webc:keep` is required on `<style>` and `<script>` in your layout files to prevent re-bundling the bundles.
- {% addedin "@11ty/webc@0.8.0" %}The `getCss` and `getJs` helpers are now available to all WebC templates without restriction. Previous versions required them to be used in an _Eleventy Layout_ file.
- `@raw` was {% addedin "@11ty/webc@0.7.1" %}. Previous versions can use `webc:raw @html`.
<!-- * {% addedin "@11ty/webc@0.5.0" %}`this.` is no longer required in `@html` or `@raw` (e.g. `this.getCss`/`this.page.url`) when referencing helpers/data/attributes/property values. -->

#### Bundle Code Ordering

The order of the code in these bundles is determined by the dependency order of the components, from most specific to least specific!

<details>
<summary>Expand to see an example</summary>

This example has an `index.webc` page that uses a `header.webc` component.

{% codetitle "index.webc" %}

```html
<style>
	/* index.webc */
</style>
<header></header>
```

{% codetitle "_components/header.webc" %}

```html
<style>
	/* header.webc */
</style>
```

The CSS bundle looks like:

```css
/* header.webc */
/* index.webc */
```

</details>

#### Access Bundles in other Template Engines

You can access these bundles in other templates types too (`.njk`, `.liquid`, etc.).

{% addedin "@11ty/eleventy-plugin-webc@0.9.0" %}Eleventy WebC uses the [Bundle Plugin](/docs/plugins/bundle.md#using-with-webc) behind the scenes to implement bundling. This plugin provides `getBundle` and `getBundleFileUrl` universal shortcodes for use in any template type (including WebC as shown above).

<details>
<summary><em>WebC v0.8.0 and older:</em> Check out the deprecated (but still in place for backwards compatibility) <code>webcGetCss</code> and <code>webcGetJs</code> universal filters for bundle output.</summary>

{% codetitle "_includes/layout.njk" %}
{% raw %}

```njk
<style>{{ page.url | webcGetCss | safe }}</style>
<script>{{ page.url | webcGetJs | safe }}</script>
<!-- write to a file -->
<link rel="stylesheet" href="{% getBundleFileUrl "css" %}">
```

{% endraw %}
{% codetitle "_includes/layout.liquid" %}
{% raw %}

```njk
<style>{{ page.url | webcGetCss }}</style>
<script>{{ page.url | webcGetJs }}</script>
```

{% endraw %}

</details>

### Asset bucketing

Bucketing is an additional layer of bundling. `webc:bucket` sends a component’s CSS or JavaScript to a named bucket instead of the default one.

This component outputs code to two separate buckets:

{% codetitle "_components/my-webc-component.webc" %}

```html
<style>
	/* This CSS is put into the default bucket */
</style>
<script>
	/* This JS is put into the default bucket */
</script>
<style webc:bucket="defer">
	/* This CSS is put into the `defer` bucket */
</style>
<script webc:bucket="defer">
	/* This JS is put into the `defer` bucket */
</script>
```

When `<my-webc-component>` is used on a page, WebC rolls its assets into the page-specific bucket bundles for CSS and JavaScript.

You can then output those bucket bundles anywhere on your page, as in this Eleventy layout file:

{% codetitle "_includes/layout.webc" %}

```html
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="utf-8" />
		<title>WebC Example</title>
		<!-- Default bucket -->
		<style @raw="getBundle('css')" webc:keep></style>
		<script @raw="getBundle('js')" webc:keep></script>
	</head>
	<body>
		<template @raw="content" webc:nokeep></template>

		<!-- `defer` bucket -->
		<style @raw="getBundle('css', 'defer')" webc:keep></style>
		<script @raw="getBundle('js', 'defer')" webc:keep></script>
	</body>
</html>
```

- {% addedin "@11ty/webc@0.8.0" %}`webc:keep` is required on `<style>` and `<script>` in your layout files to prevent re-bundling the bundles.
- {% addedin "@11ty/webc@0.9.1" %}`:webc:bucket` (dynamic attribute) is supported to set this value via JavaScript. [#120](https://github.com/11ty/webc/issues/120)
<!-- * {% addedin "@11ty/webc@0.5.0" %}`this.` is no longer required in `@html` or `@raw` (e.g. `this.getCss`/`this.page.url`) when referencing helpers/data/attributes/property values. -->

#### Cascading Asset Buckets

[{% addedin "@11ty/webc@0.9.1" %}](https://github.com/11ty/webc/releases/tag/v0.9.1) Additionally, `webc:bucket` can be added to any tag and cascades to all child content.

Consider this WebC page:

{% codetitle "index.webc" %}

```html
<!-- has an implied webc:bucket="default" -->
<my-component></my-component>

<div webc:bucket="defer">
	<!-- each of these have webc:bucket="defer" -->
	<!-- (including any nested components inside, too) -->
	<footnote-references></footnote-references>

	<my-footer></my-footer>
</div>
```

Setting `webc:bucket` cascades to all of the children as if each had `webc:bucket="defer"` assigned individually. All assets used in those components are rolled up into the `defer` bucket.

<div class="youtube-related">
	{%- youtubeEmbed "fzo_S9UiYYk", "Learn how we used webc:bucket to create Critical CSS and JS bundles for 11ty.dev" -%}
</div>

##### Conflicts and hoisting

What happens when a component is used in multiple distinct buckets?

{% codetitle "index.webc" %}

```html
<!-- has an implied webc:bucket="default" -->
<my-component></my-component>

<div webc:bucket="defer">
	<my-component></my-component>
</div>
```

When duplicates and conflicts occur, WebC hoists the component code to the nearest shared bucket for you. In this example, the CSS and JS for `<my-component>` are loaded in the `default` bucket and only in the `default` bucket.

### Use with `is-land`

You can also use this out of the box with Eleventy’s [`is-land` component for web component hydration](/docs/plugins/is-land/).

At the component level, components can declare their own is-land loading conditions.

{% codetitle "index.webc" %}

```html
<is-land on:visible webc:import="npm:@11ty/is-land">
	<template data-island>
		<!-- CSS -->
		<style webc:keep>
			/* This CSS applies on:visible */
		</style>
		<link rel="stylesheet" href="arbitrary.css" webc:keep />

		<!-- JS -->
		<script type="module" webc:keep>
			console.log("This JavaScript runs on:visible");
		</script>
		<script type="module" src="arbitrary.js" webc:keep></script>
	</template>
</is-land>
```

## From the Community

{% include "11tybundle.njk" %}