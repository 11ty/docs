---
eleventyNavigation:
  parent: Template Features
  key: Shortcodes
  order: 2
relatedKey: shortcodes
relatedTitle: Template Shortcodes
tags:
  - related-filters
  - related-custom-tags
  - related-nunjucks
  - related-liquid
  - related-javascript
---

# Shortcodes {% addedin "0.5.0" %}

{% tableofcontents %}

Various template engines can be extended with shortcodes for easy reusable content. This is sugar around Template Language [Custom Tags](/docs/custom-tags/). Shortcodes are supported in JavaScript, Liquid, Nunjucks templates.

Here are a few examples:

{% include "snippets/shortcodes/intro.njk" %}

{% set codeContent %}
export default function ($config) {
  // Shortcodes added in this way are available in:
  // * Markdown
  // * Liquid
  // * Nunjucks
  // * JavaScript
  // * Handlebars (not async)

  $config.addShortcode("user", function(firstName, lastName) { /* … */ });

  // Async-friendly in {{ "2.0.0-canary.24" | coerceVersion }}
  $config.addShortcode("user", async function(myName) { /* … */ });

  // Direct async method available
  $config.addAsyncShortcode("user", async function(myName) { /* … */ });
};
{% endset %}
{% include "snippets/configDefinition.njk" %}

A shortcode returns content (a JavaScript string or template literal) that is used in the template. You can use these however you’d like—you could even think of them as reusable components.

{% callout "info" %}
Markdown files are pre-processed as Liquid templates by default—any shortcodes available in Liquid templates are also available in Markdown files. Likewise, if you <a href="/docs/config/#default-template-engine-for-markdown-files">change the template engine for Markdown files</a>, the shortcodes available for that templating language will also be available in Markdown files.
{% endcallout %}

Read more about using shortcodes on the individual Template Language documentation pages:

- [JavaScript `*.11ty.js`](/docs/languages/javascript/#javascript-template-functions) (async-friendly)
- [Liquid `*.liquid`](/docs/languages/liquid/#shortcodes) (async-friendly)
- [Nunjucks `*.njk`](/docs/languages/nunjucks/#shortcodes) (async-friendly)
- [Handlebars `*.hbs`](/docs/languages/handlebars/#shortcodes) (sync only)

## Paired Shortcodes

The shortcodes we saw above were nice, I suppose. But really, they are not all that different from a filter. The real ultimate power of Shortcodes comes when they are paired. Paired Shortcodes have a start and end tag—and allow you to nest other template content inside!

{% include "snippets/shortcodes/paired.njk" %}

When adding paired shortcodes using the Configuration API, the first argument to your shortcode callback is the nested content.

{% set codeContent %}
export default function ($config) {
  // Shortcodes added in this way are available in:
  // * Markdown
  // * Liquid
  // * Nunjucks
  // * JavaScript
  // * Handlebars (sync only)

  $config.addPairedShortcode("user", function(content, firstName, lastName) { /* … */ });

  // Async support for `addPairedShortcode` is new in Eleventy {{ "2.0.0-canary.24" | coerceVersion }}
  $config.addPairedShortcode("user", async function(content, myName) { /* … */ });

  // Async method available
  $config.addPairedAsyncShortcode("user", async function(content, myName) { /* … */ });
};
{% endset %}
{% include "snippets/configDefinition.njk" %}

{% callout "info" %}
Markdown files are pre-processed as Liquid templates by default—any shortcodes available in Liquid templates are also available in Markdown files. Likewise, if you <a href="/docs/config/#default-template-engine-for-markdown-files">change the template engine for Markdown files</a>, the shortcodes available for that templating language will also be available in Markdown files.
{% endcallout %}

Read more about using paired shortcodes on the individual Template Language documentation pages:

- [JavaScript `*.11ty.js`](/docs/languages/javascript/#javascript-template-functions) (async-friendly)
- [Liquid `*.liquid`](/docs/languages/liquid/#shortcodes) (async-friendly)
- [Nunjucks `*.njk`](/docs/languages/nunjucks/#shortcodes) (async-friendly)
- [Handlebars `*.hbs`](/docs/languages/handlebars/#shortcodes) (sync only)

## Asynchronous Shortcodes

`addShortcode`, `addPairedShortcode` both accept `async` function callbacks as of Eleventy `{{ "2.0.0-canary.24" | coerceVersion }}`. `addAsyncShortcode` and `addPairedAsyncShortcode` also accept `async` function callbacks and have been available since Eleventy `v0.10.0`.

## Scoped Data in Shortcodes

A few Eleventy-specific data properties are available to shortcode callbacks.

- `this.page` {% addedin "0.11.0" %} (Learn about [`page`](/docs/data-eleventy-supplied.md#page-variable))
- `this.eleventy` {% addedin "2.0.0-canary.5" %} (Learn about [`eleventy`](/docs/data-eleventy-supplied.md#eleventy-variable))
- `this.env` (Nunjucks-specific) {% addedin "3.0.0-canary.5" %}
- `this.ctx` (Nunjucks-specific) {% addedin "3.0.0-canary.5" %}

{% set codeContent %}
export default function ($config) {
  // Make sure you’re not using an arrow function here: () => {}
  $config.addShortcode("myShortcode", function () {
    // this.page
    // this.eleventy
  });
};
{% endset %}
{% include "snippets/configDefinition.njk" %}

## Memoize Shortcodes

> Memoize functions - An optimization used to speed up consecutive function calls by caching the result of calls with identical input

There are many popular libraries to cache or memoize functions (filters, shortcodes, etc): [`memoize`](https://www.npmjs.com/package/memoize) (ESM-only) is one such package. You can use `memoize` (or any [other memoization library](https://www.npmjs.com/search?q=memoize)) to cache things in your Eleventy Configuration file.

<div class="codetitle">buildawesome.config.js</div>

{%- set codeBlock %}{% raw %}
import memoize from "memoize";

export default function($config) {
	$config.addShortcode("htmlEntities", memoize(str => {
		return encode(str);
	}));
};
{% endraw %}{%- endset %}
{{ codeBlock | highlight("js") | safe }}

## Per-Engine Shortcodes

You can also specify different functionality for shortcodes in each engine, if you’d like. Using the `addShortcode` or `addPairedShortcode` function is equivalent to adding the shortcode to every supported template engine.

{% set codeContent %}
export default function ($config) {
  // Liquid
  $config.addLiquidShortcode("user", function(firstName, lastName) {});
  $config.addPairedLiquidShortcode("user", function(content, firstName, lastName) {});

  // Nunjucks
  $config.addNunjucksShortcode("user", function(firstName, lastName) {});
  $config.addPairedNunjucksShortcode("user", function(content, firstName, lastName) {});

  // JavaScript Template Function (New in 0.7.0)
  $config.addJavaScriptFunction("user", function(firstName, lastName) {});
  $config.addJavaScriptFunction("user", function(content, firstName, lastName) {}); // Faux-paired shortcode
};
{% endset %}
{% include "snippets/configDefinition.njk" %}

{% callout "info" %}
Markdown files are pre-processed as Liquid templates by default—any shortcodes available in Liquid templates are also available in Markdown files. Likewise, if you <a href="/docs/config/#default-template-engine-for-markdown-files">change the template engine for Markdown files</a>, the shortcodes available for that templating language will also be available in Markdown files.
{% endcallout %}

### Async Friendly Per-Engine Shortcodes

Learn more about these on the individual template engine pages for [Nunjucks](/docs/languages/nunjucks/#asynchronous-shortcodes), [Liquid](/docs/languages/liquid/#asynchronous-shortcodes), and [`11ty.js` JavaScript](/docs/languages/javascript/#asynchronous-javascript-template-functions).

{% set codeContent %}
export default function ($config) {
  // Async-friendly
  // Liquid is already async-friendly
  $config.addLiquidShortcode("user", async function() {});
  $config.addPairedLiquidShortcode("user", async function(content) {});

  // Nunjucks Async
  $config.addNunjucksAsyncShortcode("user", async function() {});
  $config.addPairedNunjucksAsyncShortcode("user", async function(content) {});

  // JavaScript Template function
  // (make sure you `await` these when using in templates!)
  $config.addJavaScriptFunction("user", async function() {});
  $config.addJavaScriptFunction("user", async function(content) {}); // Faux-paired shortcode
};
{% endset %}
{% include "snippets/configDefinition.njk" %}
