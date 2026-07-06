---
eleventyNavigation:
  key: Partial Hydration
  title: '<i class="fa-solid fa-sailboat"></i><code>&lt;is-land&gt;</code>'
  pinned: true
  order: 3
  excerpt: A plugin to smartly and efficiently load and initialize client-side components to your website.
overrideCommunityLinks: true
---

# `<is-land>` for Islands Architecture

{% tableofcontents %}

{% callout "info", "md-block" %}
_This documentation is for [`<is-land>` v5.0.0](https://github.com/11ty/is-land/releases/tag/v5.0.0) and newer._
{% endcallout %}

{{ eleventyNavigation.excerpt }}

Or, more technically: a framework independent partial hydration islands architecture implementation.

- Check out [`11ty/is-land` on GitHub](https://github.com/11ty/is-land)
- View the [demos](https://is-land.11ty.dev/)
- [Learn more about Islands Architecture](https://jasonformat.com/islands-architecture/)

<div class="youtube-related">
  {%- youtubeEmbed "YYJpFdEaAuc", "Partial Hydration and Islands Architecture (Weekly №12)", "188" -%}
  {%- youtubeEmbed "V9hWgVV_5mg", "Hydrating Components with `is-land` and Framework SSR (Weekly №13)", "399" -%}
</div>

Features:

- Easy to add to existing components
- Zero dependencies
- Small footprint (1.83 kB compressed)
- Not tightly coupled to a server framework or site generator tool.
- Server-rendered (SSR) component examples available for SSR-friendly frameworks (Lit, Svelte, Vue, Preact are provided)

## Installation

{%- set codeBlock %}
npm install @11ty/is-land
{%- endset %}
{{ codeBlock | highlight("bash") | safe }}

{% callout "info", "md" -%}
_You can skip the next steps if you [use `<is-land>` via WebC](/docs/languages/webc/#use-with-is-land)._
{% endcallout %}

Add `is-land.js` to your primary bundle. It can be deferred and/or loaded asynchronously.

When using with web components it _must_ be defined before any other custom elements are defined (via `customElements.define`) on the page.

{%- set codeBlock %}
<script type="module" src="/is-land.js"></script>
{%- endset %}
{{ codeBlock | highlight("html") | safe }}

Or you can use `import "/is-land.js";`.

## Usage

{%- set codeBlock %}
<is-land>This is an island.</is-land>
{%- endset %}
{{ codeBlock | highlight("html") | safe }}

Add any number of loading conditions to this tag to control how and when the island is initialized. You can mix and match. _All_ conditions must be satisfied to initialize.

- `on:visible`
- `on:load` (new in v5)
- `on:idle`
- `on:interaction` (defaults to `touchstart,click`)
  - Change events with `on:interaction="mouseenter,focusin"`
- `on:media`
  - When Viewport size matches: `on:media="(min-width: 64em)"`
  - Reduced motion:
    - When user prefers reduced motion `on:media="(prefers-reduced-motion)"`
    - When user has no preference on motion `on:media="(prefers-reduced-motion: no-preference)"`
- Save Data ([read about Save Data on MDN](https://developer.mozilla.org/en-US/docs/Web/API/NetworkInformation/saveData))
  - When Save Data is active `on:save-data`
  - When Save Data is inactive `on:save-data="false"`

{%- set codeBlock %}
<is-land on:visible on:idle>
	<!-- your HTML here -->

	<is-land on:media="(min-width: 64em)">
		<!-- Islands can be nested -->
		<!-- Islands inherit all of their parents’ loading conditions -->
	</is-land>
</is-land>
{%- endset %}
{{ codeBlock | highlight("html") | safe }}

### Controlling Fallback Content

#### Pre-JS

{%- set codeBlock %}
<is-land on:visible on:idle>
	<vanilla-web-component>
		Put your pre-JS fallback content in your web component.
	</vanilla-web-component>
</is-land>
{%- endset %}
{{ codeBlock | highlight("html") | safe }}

#### Post-JS with `<template>`

Place any post-JS content inside of one or more `<template data-island>` elements anywhere in the `<is-land>`. These will be swapped with their template content. You can nest an `<is-land>` in there if you want!

{%- set codeBlock %}
<is-land on:visible on:idle>
  <template data-island>
    <vanilla-web-component>
      This component is post-JS.
    </vanilla-web-component>
  </template>
</is-land>
{%- endset %}
{{ codeBlock | highlight("html") | safe }}

* Use `data-island="replace"` to replace the contents of the `<is-land>` with the template.
* Use `data-island="once"` to run a template’s contents once per page (keyed from template contents). _(New in v2.0.1)_

#### Run your own custom JavaScript, load your own CSS

Embed a script inside the template to run custom JS when the island’s loading conditions have been satisfied!

{%- set codeBlock %}
<is-land on:visible>
	<template data-island>
		<!-- CSS -->
		<style>
			/* My custom CSS */
		</style>
		<link rel="stylesheet" href="my-css-file.css" />

		<!-- JS -->
		<script type="module">
			console.log("Hydrating!");
		</script>
		<script type="module" src="my-js-file.js"></script>
	</template>
</is-land>
{%- endset %}
{{ codeBlock | highlight("html") | safe }}

You can also use the `ready` attribute for styling, added to the `<is-land>` when the island has been hydrated.

{%- set codeBlock %}
<style>
	is-land[ready] {
		background-color: lightgreen;
	}
</style>
{%- endset %}
{{ codeBlock | highlight("html") | safe }}

### Framework Component Support

- `type`: initialize a framework initialization type, registered by you. Examples included for: `alpine`, `petite-vue`, `vue`, `vue-ssr`, `preact`, `preact-ssr`, `svelte`, or `svelte-ssr`.

[Demos, examples, and source code](https://is-land.11ty.dev/) are available for each framework listed here.

#### Petite Vue

- [Examples](https://is-land.11ty.dev/demo-vue)
- Small library (~9K)
- Rendering modes: Client
- Progressive-enhancement friendly (full control of fallback content)

{%- set codeBlock %}
<script type="module">
	// Define once for any number of Petite Vue islands.
Island.addInitType("petite-vue", async (target) => {
	const { createApp } = await import("https://unpkg.com/petite-vue@0.4.1/dist/petite-vue.es.js");
	createApp().mount(target);
});
</script>
<is-land on:visible type="petite-vue" v-scope="{ name: 'Vue' }">
  Hello from <span v-html="name">HTML</span>
</is-land>
{%- endset %}
{{ codeBlock | highlight("html") | safe }}

#### Vue

- [Examples](https://is-land.11ty.dev/demo-vue)
- Larger library (~73 kB)
- Rendering modes: Client (shown), Server, Server + Client (Hydration)

{%- set codeBlock %}
<script type="module">
	// Define once for any number of Vue islands.
Island.addInitType("vue", async (target) => {
	const { createApp } = await import("https://unpkg.com/vue@3.5.13/dist/vue.esm-browser.js");
	createApp({
		data: () => (target.dataset), // use <is-land data-> attributes as component data
	}).mount(target);
});
</script>
<is-land on:visible type="vue" data-name="Vue">
	Hello from <span v-text="name"></span>
</is-land>
{%- endset %}
{{ codeBlock | highlight("html") | safe }}

#### Svelte

* [Examples](https://is-land.11ty.dev/demo-svelte) (using Import Maps)
* Medium-sized library
* Rendering modes: Client, Server, Server + Client (Hydration)
* Requires a compiler for client mode (uncommon)

{%- set codeBlock %}{% raw %}
<script type="module">
	// Define once for any number of Svelte islands.
Island.addInitType("svelte", async (target) => {
	// requires an Import map and svelte is lazy loaded when island is ready
	const { mount } = await import("svelte");
	const component = await import(target.getAttribute("import"));

	mount(component.default, {
		target: target,
		props: {},
	});
});
</script>
<!-- This example uses an Eleventy `svelte` Universal Filter (see SveltePlugin.cjs) -->
{% assign component = "./lib/svelte/my-component-js-only.svelte" | svelte %}
<is-land on:visible type="svelte" import="{{ component.clientJsUrl }}"></is-land>
{% endraw %}{%- endset %}
{{ codeBlock | highlight("html") | safe }}

<details>
  <summary>Show sample Import Map</summary>

{%- set codeBlock %}
<!-- importmap from https://generator.jspm.io/ -->
<script type="importmap">
	{
		"imports": {
			"svelte": "https://unpkg.com/svelte@5.19.10/src/index-client.js",
		"svelte/internal/client": "https://unpkg.com/svelte@5.19.10/src/internal/client/index.js",
		"svelte/internal/flags/legacy": "https://unpkg.com/svelte@5.19.10/src/internal/flags/legacy.js"
	},
	"scopes": {
		"https://unpkg.com/": {
			"clsx": "https://unpkg.com/clsx@2.1.1/dist/clsx.mjs",
			"esm-env": "https://unpkg.com/esm-env@1.2.2/index.js",
			"esm-env/browser": "https://unpkg.com/esm-env@1.2.2/true.js",
			"esm-env/development": "https://unpkg.com/esm-env@1.2.2/false.js",
			"esm-env/node": "https://unpkg.com/esm-env@1.2.2/false.js"
		}
	}
}
</script>
{%- endset %}
{{ codeBlock | highlight("html") | safe }}

</details>

#### Preact

* [Examples](https://is-land.11ty.dev/demo-preact)
* Small library (~9 kB)
* Rendering modes: Client (shown), Server, Server + Client (Hydration)
* No compiler needed when using [`htm`](https://github.com/developit/htm) rather than JSX.

{%- set codeBlock %}
<script type="module">
	// Define once for any number of Preact islands.
Island.addInitType("preact", async (target) => {
	const component = await import(target.getAttribute("import"));
	component.default(target);
});
</script>
<is-land on:visible type="preact" import="preact-component.js"></is-land>
{%- endset %}
{{ codeBlock | highlight("html") | safe }}

<details>
  <summary>Example component code for <code>preact-component.js</code>:</summary>

{%- set codeBlock %}
import { html, render } from 'https://unpkg.com/htm/preact/index.mjs?module'

function App (props) {
  return html`<p><strong>Hello ${props.name}!</strong></p>`;
}

export default function(el) {
  render(html`<${App} name="from Preact" />`, el);
}
{%- endset %}
{{ codeBlock | highlight("js") | safe }}

</details>

#### Lit

* [Examples](https://is-land.11ty.dev/demo-lit) (using Import Maps)
* Small library (~10 kB)
* Rendering modes: Client, Server, Server + Client (Hydration)

{%- set codeBlock %}
<is-land on:visible import="lit-component.js">
  <lit-component name="Post-JS">Pre-JS Content</lit-web-component>
</is-land>
{%- endset %}
{{ codeBlock | highlight("html") | safe }}

<details>
  <summary>Show sample Import Map</summary>

{%- set codeBlock %}
<!-- importmap from https://generator.jspm.io/ -->
<script type="importmap">
	{
		"imports": {
			"lit": "https://unpkg.com/lit@3.2.1/index.js"
	},
	"scopes": {
		"https://unpkg.com/": {
			"@lit/reactive-element": "https://unpkg.com/@lit/reactive-element@2.0.4/reactive-element.js",
			"lit-element/lit-element.js": "https://unpkg.com/lit-element@4.1.1/lit-element.js",
			"lit-html": "https://unpkg.com/lit-html@3.2.1/lit-html.js",
			"lit-html/is-server.js": "https://unpkg.com/lit-html@3.2.1/is-server.js"
		}
	}
}
</script>
{%- endset %}
{{ codeBlock | highlight("html") | safe }}
</details>

<details>
  <summary>Example component code <code>lit-component.js</code>:</summary>

{%- set codeBlock %}
import {html, css, LitElement} from "lit";

customElements.define('lit-component', class extends LitElement {
  static properties = {
    name: {type: String},
  };

  render() {
    return html`<p>Hello, ${this.name || "Stranger"}!</p>`;
  }
});
{%- endset %}
{{ codeBlock | highlight("js") | safe }}

</details>

#### Alpine.js

* [Examples](https://is-land.11ty.dev/demo-alpine)
* Smaller library (~20 kB)
* Rendering modes: Client
* Progressive-enhancement friendly (control fallback content)

{%- set codeBlock %}
<script type="module">
	// Define once for any number of Alpine islands.
Island.addInitType("alpine", async (target) => {
	await import("https://unpkg.com/alpinejs@3.14.8/dist/cdn.min.js");
});

// Workaround for Alpine global mount
Island.addFallback("[x-data]", (node) => {
	if(node.hasAttribute("x-ignore")) {
		return;
  }

  node.setAttribute("x-ignore", "");

  return () => {
		node.removeAttribute("x-ignore");

    if(Alpine) {
			Alpine.nextTick(() => Alpine.initTree(node));
    }
  };
});
</script>
<is-land on:visible type="alpine">
  <div x-data="{ name: 'Alpine.js' }">
    Hello from <span x-text="name">HTML</span>!
  </div>
</is-land>
{%- endset %}
{{ codeBlock | highlight("html") | safe }}

#### Solid.js

* [Examples](https://is-land.11ty.dev/demo-solid) (using Import Maps)
* Medium library (~40 kB)
* Rendering modes: Client
