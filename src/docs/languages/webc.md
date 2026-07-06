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

- Create streamlined component-driven, cache-friendly page-specific JavaScript and CSS bundles. Users will only load the code they need to render that page (or that [island](/docs/plugins/is-land/)).
  - Easily [configurable boundaries](#asset-bucketing) for critical component CSS and JavaScript.
  - Works great with [is-land](/docs/plugins/is-land/) for web component hydration.
- Get first-class **incremental builds** (for page templates, components, and Eleventy layouts) when [used with `--incremental`](/docs/usage/#incremental-for-partial-incremental-builds)
- Streaming friendly (stream on the Edge 👀)

### Compatible with Standards

- Uses [`parse5`](https://github.com/inikulin/parse5) to parse WebC HTML as modern browsers do (a nod to [@DasSurma’s](https://twitter.com/DasSurma/status/1559159122964127744) work with [Vite](https://twitter.com/patak_dev/status/1564265006627176449) here)
- Shadow DOM and Declarative Shadow DOM friendly (easily switch components between Light DOM and Shadow DOM)

### Authoring

- Encourages no-quirks mode HTML authoring (and a doctype is optional). WebC throws a helpful error if encounters quirks mode markup.
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

export default function($config) {
	$config.addPlugin(pluginWebc);
};
{% endset %}
{% include "snippets/configDefinition.njk" %}

<details>
<summary><strong>Full options list</strong> (defaults shown)</summary>

{% set codeContent %}
import pluginWebc from "@11ty/eleventy-plugin-webc";

export default function ($config) {
	$config.addPlugin(pluginWebc, {
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

Because WebC _is_ HTML you can configure your editor to treat `.webc` files as
HTML, this should correctly syntax highlight your WebC files. Your editor of
choice should have some documentation on how to get this working.

## Usage

There are a few different ways to use WebC in Eleventy:

### Add a new `.webc` file

Adding the plugin will enable support for `.webc` files in your Eleventy project. Just make a new `.webc` HTML file in your Eleventy input directory and Eleventy will process it for you! Notably, `.webc` files will operate [WebC in bundler mode](https://github.com/11ty/webc#aggregating-css-and-js), aggregating the CSS and JS in use on each individual page to create a bundle of the assets in use on the page.

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

This is a (last-resort?) catch-all option to let WebC process `.html` output files in your project (skipping any `.webc` input files to avoid double-processing templates). This feature makes use of [Eleventy transforms](/docs/config/#transforms) and is most useful when you want to get up and running with WebC on an existing project quickly.

A few drawbacks to the transform method:

1. This is the slowest build-performance method to implement WebC in a project, so try the other methods first!
2. The WebC Eleventy transform operates with [bundler mode disabled](<#css-and-js-bundler-mode>), which means that processes WebC but _does not_ aggregate component JS or CSS. ([Upvote this enhancement request](https://github.com/11ty/eleventy-plugin-webc/issues/55))

<details>
<summary>The transform is disabled by default, you will need to use the <code>useTransform</code> option to enable it.</summary>

{% set codeContent %}
import pluginWebc from "@11ty/eleventy-plugin-webc";

export default function ($config) {
	$config.addPlugin(pluginWebc, {
		useTransform: true,
	});
};
{% endset %}
{% include "snippets/configDefinition.njk" %}

</details>

## WebC Reference

**Note:** All `webc:` attributes are removed from the rendered output HTML.

### HTML-only components

- _Related: [Defining Components in WebC](#defining-components)_

When a component has only content HTML (no CSS or JavaScript) it will ignore the host component tag in the output HTML. This enables HTML-only components to have zero overhead HTML. _(You can opt-out of this behavior with `webc:keep`.)_

<details>
<summary>Expand for Example</summary>

{% callout "info", "md" %}WebC components are not limited to custom element name restrictions (e.g. `my-component`) here. You can use `p`, `blockquote`, `h1`, `img`, or any valid HTML tag name.{% endcallout %}

{% codetitle "page.webc" %}

```html
<!DOCTYPE html>
<title>WebC Example</title>
<my-component></my-component>
```

{% codetitle "components/my-component.webc" %}

```html
Components don’t need a root element, y’all.
```

Outputs:

{% codetitle "_site/page.html" %}

```html
<!DOCTYPE html>
<html>
	<head>
		<title>WebC Example</title>
	</head>
	<body>
		Components don’t need a root element, y’all.
	</body>
</html>
```

</details>

### Asset bundling

For components that are _not_ HTML-only (they _do_ have CSS or JS), WebC will include the component tag in the output markup (e.g. `<my-component>`) (for styling or client scripting). _(You can opt-out of this behavior with `webc:nokeep`.)_

<details>
<summary>Expand for Example</summary>

{% callout "info", "md" %}WebC components are not limited to custom element name restrictions (e.g. `my-component`) here. You can use `p`, `blockquote`, `h1`, `img`, or any valid HTML tag name.{% endcallout %}

{% codetitle "page.webc" %}

```html
<!DOCTYPE html>
<title>WebC Example</title>
<my-component></my-component>
```

{% codetitle "components/my-component.webc" %}

```html
Components don’t need a root element, y’all.
<style>
	/* Hi */
</style>
```

Outputs:

{% codetitle "_site/page.html" %}

```html
<!DOCTYPE html>
<html>
	<head>
		<title>WebC Example</title>
	</head>
	<body>
		<my-component>Components don’t need a root element, y’all.</my-component>
	</body>
</html>
```

</details>

Eleventy runs WebC in Bundler mode. That means that when it finds `<style>`, `<link rel="stylesheet">`, or `<script>` elements in component definitions, they are removed from the output markup and _their content_ is aggregated together for re-use in asset bundles on the page. Read more about [CSS and JS in WebC](<#css-and-js-bundler-mode>). _(You can opt-out of this behavior with `webc:keep`.)_

### `webc:keep`

With an [HTML-only component](#html-only-components), you can use `webc:keep` on the host component to keep the tag around:

```html
<html-only-component webc:keep></html-only-component>
```

You can also use `webc:keep` to opt-out of [asset bundling](#asset-bundling) for individual elements inside of a component definition:

```html
<style webc:keep></style>
<script webc:keep></script>
```

You can also use `webc:keep` to save a [`<slot>`](#slots) for use in a client-side custom element.

### `webc:nokeep`

With an CSS/JS component (not an [HTML-only component](#html-only-components)), you can use `webc:nokeep` on the host component to drop the tag:

```html
<css-js-component webc:nokeep></css-js-component>
```

### `webc:import`

WebC will expand any component it finds using known components. You can also use `webc:import` to inline import a component definition. This import path is relative to the component file path. WebC checks for circular component dependencies and throws an error if one is encountered.

- _Related: [Defining Components in WebC](#defining-components) (global or scoped)_

```html
<any-tag-name webc:import="./components/my-component.webc"></any-tag-name>
```

{% addedin "@11ty/webc@0.6.2" %}You can import directly from an installed npm package. Eleventy will begin to supply WebC components with existing plugins. The Syntax Highlighter (`4.2.0` or newer) supplies one that you can use today:

```html
<syntax-highlight
	language="js"
	webc:import="npm:@11ty/eleventy-plugin-syntaxhighlight"
>
	function myFunction() { return true; }
</syntax-highlight>
```

This uses the component tag name (`syntax-highlight`) to look for a WebC component at `node_modules/@11ty/eleventy-plugin-syntaxhighlight/syntax-highlight.webc` and imports it for use on this node. This works with a tag name override via `webc:is` too.

### `webc:if`

{% addedin "@11ty/webc@0.7.1" %}

Use `webc:if` to conditionally render elements. Accepts arbitrary JavaScript (and is async-friendly). Similar to dynamic attributes, this also has access to component attributes and properties.

```html
<div webc:if="true">This will render</div>
<div webc:if="false">This will not render</div>
<div webc:if="myAsyncHelper()">
	If the helper promise resolves to a truthy value, this will render
</div>
```

You can use `webc:type="js"` _(WebC v0.7.1+)_ to use JavaScript for more complex conditional logic (read more below).

### `webc:elseif` and `webc:else`

{% addedin "@11ty/webc@0.10.0" %}

Adjacent siblings of `webc:if` can use `webc:elseif=""` and `webc:else` for additional conditional logic.

```html
<div webc:if="false">This will not render</div>
<!-- interspersing comments works ok -->
<div webc:elseif="true">This will render</div>
<div webc:else>This will not render</div>
```

### `webc:for` Loops

{% addedin "@11ty/webc@0.10.0" %}

Use `webc:for` to loop over data with HTML. It works with Objects and any [Iterable](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Iterators_and_Generators#built-in_iterables) (String, Array, Map, Set, etc).

The syntax should feel similar to JavaScript’s `for` statement.

#### Arrays (or any other Iterable)

```html
<!-- renders three div elements -->
<div webc:for="item of [1, 2, 3]" @text="item"></div>

<!-- access the loop index (zero-indexed) -->
<div webc:for="(item, index) of [1, 2, 3]" @text="index"></div>

<!-- name these whatever you’d like -->
<div webc:for="myItem of [1, 2, 3]" @text="myItem"></div>
<div webc:for="(myItem, myIndex) of [1, 2, 3]" @text="myIndex"></div>

<!-- any iterable -->
<div webc:for="item of new Set([1, 2, 3])" @text="item"></div>
```

#### Objects

Note the use of `in` instead of `of`.

```html
<!-- renders two div elements -->
<div webc:for="key in { a: 1, b: 2 }" @text="key"></div>

<!-- access the value -->
<div webc:for="(key, value) in { a: 1, b: 2 }" @text="value"></div>

<!-- access the loop index (zero-indexed) -->
<div webc:for="(key, value, index) in { a: 1, b: 2 }" @text="index"></div>

<!-- name these whatever you’d like -->
<div
	webc:for="(myKey, myValue, myIndex) in { a: 1, b: 2 }"
	@text="myIndex"
></div>

<!-- use `Object.values` or `Object.keys`, sure -->
<div webc:for="value of Object.values({ a: 1, b: 2 })"></div>
<div webc:for="key of Object.keys({ a: 1, b: 2 })"></div>
```

#### Nesting `webc:for`

Loops can be nested but access to outer scope from the inner loop doesn't work currently. More at [issue #175](https://github.com/11ty/webc/issues/175).

### Slots

Child content optionally precompiles using `<slot>` and `[slot]` too. This example is using an [HTML-only component](#html-only-components).

{% codetitle "page.webc" %}

```html
<my-component></my-component>
<my-component>This is the default slot</my-component>
```

{% codetitle "components/my-component.webc" %}

```html
<p><slot>Fallback slot content</slot></p>
```

Compiles to:

```html
<p>Fallback slot content</p>
<p>This is the default slot</p>
```

If your WebC component wants to _output_ a `<slot>` tag in the compiled markup (for use in client JavaScript), use the [`webc:keep` attribute](#webckeep) (e.g. `<slot webc:keep>`).

{% callout "info", "md" %}Per web component standard conventions, if your component file contains _no content markup_ (e.g. empty or only `<style>`/`<script>`), `<slot></slot>` is implied and the default slot content will be included automatically. If the WebC component file does contain content markup, the content passed in as the default slot requires `<slot>` to be included.{% endcallout %}

#### Named slots

This works with named slots (e.g. `<span slot="named-slot">`) too.

<details>
<summary>Expand for Example</summary>

{% codetitle "page.webc" %}

```html
<my-component>
	This is the default slot.
	<strong slot="named-slot">This is a named slot</strong>
	This is also the default slot.
</my-component>
```

{% codetitle "components/my-component.webc" %}

```html
<p><slot name="named-slot"></slot></p>
```

Compiles to:

```html
<p><strong>This is a named slot.</strong></p>
```

</details>

### Attributes and `webc:root`

{% codetitle "page.webc" %}

```html
<my-component class="sr-only"></my-component>
```

Inside of your component definition, you can add attributes to the outer host component using `webc:root`:

{% codetitle "components/my-component.webc" %}

```html
<template webc:root class="another-class"> Some component content </template>
```

`class` and `style` attribute values are _merged_ as expected between the host component and the `webc:root` element.

{% include "webc-attribute-guide.njk" %}

#### Override the host component tag

You can use `webc:root="override"` to override the host component tag name! This isn’t very useful for HTML-only components (which leave out the host component tag), but is very useful when your component has style/scripts.

{% codetitle "components/my-component.webc" %}

```html
<button webc:root="override">Some component content</button>
<style>
	/* Hi */
</style>
```

- {% addedin "@11ty/webc@0.9.0" %}Previously, the above used to be accomplished by using `webc:root` and `webc:keep` together on an element.

#### Nesting

It’s worth noting also that `webc:root` can be nested inside of other content—it does not need to exist at the top level of the component definition. (Framework folks love things deeply nested in `div`s, right?)

{% codetitle "components/my-component.webc" %}

```html
<div>
	<div>
		<template webc:root="override" class="another-class">
			Some component content
		</template>
	</div>
</div>
```

### Props (Properties)

Make any attribute into a prop by prefixing it with `@`. Props are server-only “private” attributes that don’t end up in the output HTML (they are private to WebC). They are identical to attributes except that they are filtered from the output HTML.

{% codetitle "page.webc" %}

```html
<my-component @prop="Hello"></my-component>
```

{% codetitle "components/my-component.webc" %}

```html
<p @text="prop"></p>
<!-- outputs <p>Hello</p> -->
```

- In the HTML specification, attribute names are lower-case. {% addedin "@11ty/webc@0.8.0" %}Attribute or property names with dashes are converted to camelcase for JS (e.g. `<my-component @prop-name="test">` can be used like `@text="propName"`). More at [issue #71](https://github.com/11ty/webc/issues/71).

{% include "webc-attribute-guide.njk" %}

### Dynamic attributes and properties

Make any attribute or property dynamic (using JavaScript for the value instead of a string) by prefixing it with a colon (`:`). You have access to host component attributes, props, and page data here!

{% codetitle "page.webc" %}

```html
<avatar-image
	src="my-image.jpeg"
	alt="Zach is documenting this project"
	:@dynamic-prop="'hello'"
></avatar-image>
```

{% codetitle "components/avatar-image.webc" %}

```html
<img :src="src" :alt="alt" class="avatar-image" />
```

- {% addedin "@11ty/webc@0.9.0" %}The `:@` dynamic property prefix was added in WebC v0.9.0.
- In the HTML specification, attribute names are lower-case. {% addedin "@11ty/webc@0.8.0" %}Attribute or property names with dashes are converted to camelcase for JS (e.g. `<my-component @prop-name="test">` can be used like `@text="propName"`). More at [#71](https://github.com/11ty/webc/issues/71).
<!-- * {% addedin "@11ty/webc@0.5.0" %}`this.` is no longer required in dynamic attributes (e.g. `this.src`/`this.alt`) when referencing helpers/data/attributes/property values. -->
- The only currently supported `webc:*` configuration attribute that supports dynamic values is [`webc:bucket`](#asset-bucketing). More to come here: [#143](https://github.com/11ty/webc/issues/143) [#148](https://github.com/11ty/webc/issues/148)

{% include "webc-attribute-guide.njk" %}

### `@attributes`

{% addedin "@11ty/webc@0.9.0" %}You can use `@attributes` to render all of the attributes (including on host component) to the current node.

{% codetitle "components/avatar-image.webc" %}

```html
<!-- will render all attributes including `src` and `alt` from the host component -->
<img @attributes class="avatar-image" />
```

You can use this to render an arbitrary object as attributes too (note the parentheses to avoid JavaScript parsing as a [`block`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/block) + [`label`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/label)):

```html
<img @attributes="({ myattribute: 'myValue'})" />
```

### `@html`

We surface a special `@html` [prop](<#props-(properties)>) to override any tag content with custom JavaScript.

```html
<template @html="'Template HTML'"></template>
<template @html="dataProperty"></template>
```

```html
<!-- webc:nokeep will replace the outer element -->
<template @html="'Template HTML'" webc:nokeep></template>
```

- Content returned from the `@html` prop will be processed as WebC—return any WebC content here! {% addedin "@11ty/webc@0.5.0" %}
<!-- * {% addedin "@11ty/webc@0.5.0" %}`this.` is no longer required in `@html` or `@raw` (e.g. `this.dataProperty`) when referencing helpers/data/attributes/property values. -->
- Using `webc:raw` will prevent processing the result as WebC {% addedin "@11ty/webc@0.6.0" %}
- Use `@raw` as an alias for `webc:raw @html` {% addedin "@11ty/webc@0.7.1" %}

```html
<!-- No reprocessing as WebC (useful in Eleventy layouts) -->
<!-- Where `myHtmlContent` is a variable holding an arbitrary HTML string -->
<template @raw="myHtmlContent" webc:nokeep></template>
```

### `@raw`

{% addedin "@11ty/webc@0.7.1" %}

As noted in [`@html`](#@html), you can use `@raw` as an alias for `webc:raw @html`.

### `@text`

{% addedin "@11ty/webc@0.6.0" %}

We provide a special `@text` [prop](<#props-(properties)>) to override any tag content with custom JavaScript. The entire value returned here will be escaped!

```html
<p @text="dataProperty"></p>

<!-- When dataProperty contains `<p>This is text</p>`, this renders: -->
<p>&lt;p&gt;This is text&lt;/p&gt;</p>
```

```html
<!-- webc:nokeep will replace the outer element -->
<p @text="dataProperty" webc:nokeep></p>
```

- Content returned from the `@text` prop will **not** be processed as WebC.

### `webc:is`

Remap a component to another component name.

```html
<div webc:is="my-component"></div>

<!-- equivalent to -->
<my-component></my-component>
```

### `webc:scoped`

We include a lightweight mechanism (`webc:scoped`) to scope component CSS. Selectors are prefixed with a new component class name. The class name is based on a hash of the style content (for fancy de-duplication of identical component styles).

<details>
<summary>Expand for example</summary>

{% codetitle "page.webc" %}

```html
<my-component>Default slot</my-component>
```

If you use `:host` it will be replaced with that class selector.

{% codetitle "components/my-component.webc" %}

```html
<style webc:scoped>
	:host {
		color: blue;
	}
	:host:defined {
		color: rebeccapurple;
	}
</style>
```

This outputs:

```html
<my-component class="wcl2xedjk">Default slot</my-component>
```

and aggregates the following CSS to [the bundle](#asset-bundling):

```css
.wcl2xedjk {
	color: blue;
}
.wcl2xedjk:defined {
	color: rebeccapurple;
}
```

</details>

{% callout "info", "md" -%}
_**CSS bundling opinion alert**:_ Some folks recommend using Declarative Shadow DOM for component style encapsulation. This is a great method! It has 2 major drawbacks:

1. The progressive enhancement story requires [ubiquitous browser support](https://caniuse.com/declarative-shadow-dom) before using it for content in the critical rendering path.
2. It requires `<style>` duplication in each instance of the component.

Just be aware of these tradeoffs. And remember that you can use both methods in WebC!
{% endcallout %}

#### `webc:scoped="my-prefix"`

You can also specify an attribute value to `webc:scoped` to hard code your own component prefix (e.g. `<style webc:scoped="my-prefix">`). This allows the CSS to look a bit more friendly and readable. We will automatically check for duplicate values in your component tree and throw an error if collisions occur.

### Using JavaScript to Setup your Component

{% addedin "@11ty/webc@0.9.0" %}You can now also use `<script webc:setup>` to run arbitrary JavaScript and provide data and markup to your component. Any top level variables declared here are available in your component as local data.

This is similar to using [JavaScript as a custom Eleventy Front Matter type](/docs/data-frontmatter-customize/#example-use-javascript-in-your-front-matter), although data in `webc:setup` is scoped to the component and _does not_ flow back up in the Data Cascade.

{% callout "info", "md" %}
**Note:** This JavaScript is run _only once_ per build, even if the component is used in multiple instances. Therefore, there is no access inside the `<script webc:setup>` tag to instance-specific data such as attributes, props, or slots.
{% endcallout %}

{% codetitle "components/my-component.webc" %}

```html
<script webc:setup>
	const myHtml = "<my-webc-component></my-webc-component>";

	function alwaysBlue() {
		return "blue";
	}
</script>

<div @html="myHtml"></div>
<div @raw="myHtml"></div>
<!-- @raw does not reprocess as WebC -->
<div @html="alwaysBlue()"></div>
```

Works with `var`, `let`, `const`, `function`, `Array`, and `Object` [destructuring assignment](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment).

- Uses the [`node-retrieve-globals` package](https://github.com/zachleat/node-retrieve-globals/).

### Using Template Syntax to Generate Content

The [Custom Transforms feature](https://github.com/11ty/webc#custom-transforms) (e.g. `webc:type`) in the Eleventy WebC plugin has been wired up to the [Eleventy Render plugin](/docs/plugins/render/) to allow you to use existing Eleventy template syntax inside of WebC.

{% callout "info", "md" %}**Note:** The `webc:type="11ty"` feature is exclusive to the **Eleventy** WebC plugin and is not available in non-Eleventy independent WebC.{% endcallout %}

Use `webc:type="11ty"` with the `11ty:type` attribute to specify a [valid template syntax](/docs/plugins/render/#rendertemplate-paired-shortcode).

{% codetitle "my-page.webc" %}

{% raw %}

```liquid
---
frontmatterdata: "Hello from Front Matter"
---
<template webc:type="11ty" 11ty:type="liquid,md">
{% assign t = "Liquid in WebC" %}
## {{ t }}

_{{ frontmatterdata }}_
</template>
```

{% endraw %}

- You have full access to the data cascade here (note `frontmatterdata` is [set in front matter](#front-matter) above).
- {% addedin "@11ty/webc@0.5.0" %}Content returned from custom transforms on `<template>` (or `webc:is="template"`) nodes will be processed as WebC—return any WebC content here!

### Using JavaScript to Generate Content

You can also transform individual element content using `webc:type`. In addition to `webc:type="11ty"`, there are three more bundled types:

1. `webc:type="js"` {% addedin "@11ty/webc@0.7.1" %}
1. `webc:type="render"` (superseded by `webc:type="js"`)
1. `webc:type="css:scoped"` (internal for `webc:scoped`—but overridable!)

#### JavaScript Render Functions: `webc:type="js"` and `webc:type="render"`

{% addedin "@11ty/webc@0.7.1" %} Run any arbitrary server JavaScript in WebC. Outputs the result of the very last statement executed in the script. Async-friendly (return a promise and we’ll resolve it).

{% codetitle "page.webc" %}

```html
<img
	src="my-image.jpeg"
	alt="An excited Zach is trying to finish this documentation"
/>
```

{% codetitle "components/img.webc" %}

```html
<script webc:type="js" webc:root>
	if (!alt) {
		throw new Error("oh no you didn’t");
	}
	`<img src="${src}" alt="${alt}">`;
</script>
```

<details>
<summary>Expand to see this example with <code>webc:type="render"</code></summary>

```html
<script webc:type="render">
	export default function() {
		if(!this.alt) {
			throw new Error("oh no you didn’t");
		}
		// Free idea: use the Eleventy Image plugin to return optimized markup
		return `<img src="${this.src}" alt="${this.alt}">`;
	}
</script>
```

</details>

Or use a JavaScript render function to generate some CSS:

{% codetitle "page.webc" %}

```html
<style webc:is="add-banner-to-css" @license="MIT licensed">
	p {
		color: rebeccapurple;
	}
</style>
```

{% codetitle "components/add-banner-to-css.webc" %}

```html
<template webc:is="style" webc:root="override">
	<script webc:type="js">
		export default function({ license }) {
			return `/* ${license} */`;
		}
	</script>
	<slot></slot>
</template>
```

<details>
<summary>Expand to see this example with <code>webc:type="render"</code></summary>

```html
<template webc:is="style" webc:root="override">
	<script webc:type="render">
		export default function() {
			return `/* ${this.license} */`;
		}
	</script>
	<slot></slot>
</template>
```

</details>

<details>
<summary>Expand to see another example of a more complex conditional using <code>webc:type="js"</code></summary>

Note that you can also use `webc:if`!

```html
<script webc:type="js">
export default function({ src, alt }) {
	if (alt) {
		return `<img src="${src}" alt="${alt}">`;
	} else {
		return `<a href="${src}">Your image didn’t have an alt so you get this link instead.</a>`;
	}
}
</script>
```

</details>

Bonus tips:

- You can use `webc:scoped webc:is="style" webc:type="js"` (or `webc:type="render"`) to generate scoped CSS using JavaScript! Read more at [`webc:scoped`](#webcscoped).
- You have access to the component attributes and props in the render function (which is covered in another section!).
- {% addedin "@11ty/webc@0.9.0" %}Using `webc:type="js"` has an implied `webc:is="template"` to return content that will be reprocessed as WebC (HTML). You can override this with your own `webc:is` attribute to generate a different tag (e.g. `webc:is="script"` or `webc:is="style"`).
- {% addedin "@11ty/webc@0.9.0" %}Using `webc:type="js"` has an implied `webc:nokeep` to skip outputting the outer node. You can add `webc:keep` to override this behavior.

#### Extra data for JavaScript Render Functions

- `webc.attributes`: {% addedin "@11ty/webc@0.9.0" %} an object literal representing the current element’s attributes.
- `webc.renderAttributes`: {% addedin "@11ty/webc@0.9.0" %} a method to render _public_ attributes to a string.
- `webc.filterPublicAttributes`: {% addedin "@11ty/webc@0.10.1" %} a method to filter `webc.attributes`, returning an object with only _public_ attributes. Usage: `webc.filterPublicAttributes(webc.attributes)`
- `webc.escapeText`: {% addedin "@11ty/webc@0.10.1" %} encodes all characters that have to be escaped in HTML text (via the [`entities` package](https://github.com/fb55/entities/blob/b6cd547c8088b55a18b2ef449bc9dc8f9c294f0c/src/escape.ts#L126))
- `webc.escapeAttribute`: {% addedin "@11ty/webc@0.10.1" %} encodes all characters that have to be escaped in HTML attributes (via the [`entities` package](https://github.com/fb55/entities/blob/b6cd547c8088b55a18b2ef449bc9dc8f9c294f0c/src/escape.ts#L111))

Read more at [Issue #104](https://github.com/11ty/webc/issues/104).

<details>
<summary>Expand to see an <code>img</code> component example</summary>

One might imagine an `<img>` component definition that merges and re-uses all host component attributes correctly like this:

{% codetitle "components/img.webc" %}

{% raw %}

```html
<script webc:type="js" webc:root="override">
	`<img ${webc.renderAttributes(webc.attributes)}>`;
</script>
```

{% endraw %}

</details>

### `webc:raw`

Use `webc:raw` to opt-out of WebC template processing for all child content of the current node. Notably, attributes on the current node will be processed. This works well with `<template>`!

{% codetitle "components/my-component.webc" %}

```html
<template webc:raw>
	Leave me out of this.
	<style>
		p {
			color: rebeccapurple;
		}
	</style>
</template>
```

- Related: [`@raw` property](#@raw)

### `webc:ignore`

{% addedin "@11ty/webc@0.9.0" %}Use `webc:ignore` to completely ignore a node and not process or output anything to do with it. Useful for server-side comments or documentation on a component.

{% codetitle "components/my-component.webc" %}

```html
<template webc:ignore>
	Here’s how you might use this component:

	<my-component>Nothing in here will be processed</my-component>
</template>
```

### Server-only comments

{% addedin "@11ty/webc@0.10.0" %}

Instead of an HTML comment that will show up in rendered output, you can add one or more dashes to the beginning/end to tell WebC to strip this from the output. Great for server-side comments.

{% codetitle "components/my-component.webc" %}

```html
<!--- WebC will remove this --->
<!-- This will *not* be removed and is rendered to the output -->
<!------- WebC will remove this, too ------->
```

### Custom Transforms

This plugin provides a few transforms out of the box: `webc:type="js"`, `webc:type="render"`, `webc:type="css:scoped"`, and `webc:type="11ty"`.

However, adding your own [`webc:type` Custom Transform](https://github.com/11ty/webc#custom-transforms) **directly** to WebC is not yet available in the Eleventy WebC plugin! If this is something folks would like to see added, [please let us know](https://neighborhood.11ty.dev/@11ty)!

Do note that you **can** [add your own custom template engine](/docs/languages/custom/) which would be available via `webc:type="11ty"` (e.g. `<style webc:type="11ty" 11ty:type="sass">`).

### Helper Functions

WebC [Helpers](https://github.com/11ty/webc#helper-functions) are JavaScript functions available in dynamic attributes, `@html`, `@raw`, and render functions.

#### Eleventy-provided Helpers

{% addedin "@11ty/eleventy-plugin-webc@0.5.0" %}Included with Eleventy WebC, [JavaScript template functions](/docs/languages/javascript/#javascript-template-functions) and [Universal Filters](/docs/filters/) are provided automatically as WebC Helpers.

This includes [`url`, `slugify`, `log`, and others](/docs/filters/#eleventy-provided-filters)!

```html
<!-- Use the  Eleventy provided `url` universal filter -->
<a :href="url('/local-path/')">My Link</a>
```

#### Supply your own Helper

{% set codeContent %}
export default function ($config) {
	// via Universal Filter
	$config.addFilter("alwaysRed", () => "Red");

	// or via JavaScript Template Function directly
	$config.addJavaScriptFunction("alwaysBlue", () => "Blue");

	// Don’t forget to add the WebC plugin in your config file too!
};
{% endset %}
{% include "snippets/configDefinition.njk" %}

```html
<div @html="alwaysRed()"></div>
<div @html="alwaysBlue()"></div>

<!-- renders as: -->
<div>Red</div>
<div>Blue</div>
```

### Subtleties and Limitations

#### Void elements

Custom elements (per specification) are not supported as void elements: they require both a starting and ending tag.

Practically speaking, this means a WebC component cannot be self-closing. You can workaround this limitation using [`webc:is`](#webcis) (e.g. `<img webc:is="my-component">`).

#### `<head>` Components

There are a few wrinkles when using an HTML parser with custom elements. Notably, the parser tries to force custom element children in the `<head>` over to the `<body>`. To workaround this limitation, use [`webc:is`](#webcis).

<details>
<summary>Expand for a few example workarounds</summary>

```html
<head webc:is="my-custom-head">
	<!-- this is slot content, yes you can use named slots here too -->
</head>
```

```html
<head>
	<!-- <my-custom-head> is not allowed here but
			 <meta webc:is="my-custom-head> is -->
	<meta webc:is="my-custom-head" />
	<title webc:is="my-custom-title">Default Title</title>
</head>
```

</details>

#### `<table>` Components

Due to WebC's use of the parse5 library, all WebC files to be processed undergo parsing and tokenization in the same way a web browser would parse them. For this reason, putting a `<table>` tag in a custom WebC element and it's `<tr>` and `<td>` tags in a slot to be inserted into the table will cause the `<tr>` and `<td>` elements to be removed upon initial parsing and all internals of the table to be placed as a sibling to itself. This is caused by the parse5 library believing the `<tr>` and `<td>` tags are orphaned.

To workaround this limitation, use [`webc:is`](#webcis) for the `<table>`, `<tr>`, and `<td>` elements.

<details>
<summary>Expand for an example workaround</summary>

The above example assumes the existence of `_includes/my-layout.webc` (an [Eleventy layout](/docs/layouts/)).

{% codetitle "_includes/my-layout.webc" %}

```html
...
<my-table>
	<x webc:is="tr">
		<x webc:is="td">
			My Table Content
		</x>
	</x>
</my-table>
...
```


{% codetitle "components/my-table.webc" %}
```html
<x webc:is="table">
	<slot></slot>
</x>
```

</details>

#### Rendering Modes

There are two different rendering modes in Eleventy: `page` and `component`. We attempt to guess the rendering mode that you’d like based on the markup you supply. The `page` rendering mode is for rendering full HTML pages. The `component` rendering mode is for fragments of HTML. Most of the time you won’t need to worry about this distinction but it is included in the documentation for completeness.

- `page` is used when the markup starts with `<!doctype` (or `<!DOCTYPE`) or `<html` (WebC forces no-quirks parsing).
- `component` is used otherwise.

#### Differences from HTML parsing

{% addedin "@11ty/webc@0.9.0" %}WebC processes content inside of both `<template>` and `<noscript>` tags. The HTML parser treats these as plaintext.

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

- Read more about the WebC properties: [`@raw`](#@raw) {% addedin "@11ty/webc@0.7.1" %} and [`@html`](#@html).
<!-- * {% addedin "@11ty/webc@0.5.0" %}`this.` is no longer required in `@html` or `@raw` (e.g. `this.content`) when referencing helpers/data/attributes/property values. -->

</details>

_Notable note_: front matter (per standard Eleventy conventions) is supported in page-level templates only (`.webc` files in your input directory) and not in components (see below).

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

We accept:

- String (file path or glob)
- Array (of file paths or globs) [{% addedin "@11ty/eleventy-plugin-webc@0.9.2" %}](https://github.com/11ty/eleventy-plugin-webc/releases/tag/v0.9.2)
- [`npm:` prefix aliases](#webcimport) [{% addedin "@11ty/eleventy-plugin-webc@0.9.2" %}](https://github.com/11ty/eleventy-plugin-webc/releases/tag/v0.9.2)

{% set codeContent %}
import pluginWebc from "@11ty/eleventy-plugin-webc";

export default function ($config) {
	$config.addPlugin(pluginWebc, {
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

Notably, the path for `components` is relative to your project root (**not** your [project’s `input` directory](/docs/config/#input-directory)).

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

To access **global data** from the Data Cascade, you can use `$data` variable in your component's javascript. For example:

For example, if you have this in `_data/site.json`:

```json
{
  "title": "My Site Title"
}
```

In an internal webc component, that is in a sub-folder such as `src/_includes/components/*`, you can access that data via:

```html
<h1 @text="$data.site.title"></h1>
```

In a top-level webc component, such as a layout file or other \*.webc files in the Eleventy input folder, you can access global data variables directly without `$data`:

```html
<h1 @text="site.title"></h1>
```

### CSS and JS (Bundler mode)

Eleventy WebC will bundle any specific page’s assets (CSS and JS used by components on the page). These are automatically rolled up when a component uses `<script>`, `<script src>`, `<style>`, or `<link rel="stylesheet">`. You can use this to implement component-driven Critical CSS.

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

Say we have an `index.webc` page that uses a `header.webc` component.

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

The CSS bundle will look like:

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

There is an additional layer of bundling here that you can use that we call Bucketing. Components can use `webc:bucket` to output to any arbitrary bucket name.

In this component, we have component code that outputs to two separate buckets:

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

When `<my-webc-component>` is used on a page, it will roll the assets to the page-specific bucket bundles for CSS and JavaScript.

Then you can output those bucket bundles anywhere on your page like this (here we’re using an Eleventy layout file):

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

[{% addedin "@11ty/webc@0.9.1" %}](https://github.com/11ty/webc/releases/tag/v0.9.1) Additionally `webc:bucket` can be added to any tag and will cascade to all child content.

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

Setting `webc:bucket` now cascades to all of the children as if they had `webc:bucket="defer"` assigned to each of them individually. All assets used in those components will now be rolled up into the `defer` bucket.

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

When duplicates and conflicts occur, WebC will hoist the component code to find the nearest shared bucket for you. In the above example, the CSS and JS for `<my-component>` will be loaded in the `default` bucket and only in the `default` bucket.

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