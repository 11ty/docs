---
eleventyNavigation:
  parent: Template Features
  key: Filters
  order: 1
relatedKey: filters
relatedTitle: Template Filters
tags:
  - related-shortcodes
  - related-nunjucks
  - related-liquid
  - related-javascript
---

# Filters

{% tableofcontents %}

A <dfn>filter</dfn> is a function which can be used within templating syntax to transform data into a more presentable format. Filters are typically designed to be chained, so that the value returned from one filter is piped into the next filter.

Various template engines can be extended with custom filters to modify content. Here are a few examples:

<is-land on:visible import="/js/seven-minute-tabs.js">
<seven-minute-tabs persist sync class="tabs-flush" autoheight>
  {% renderFile "./src/_includes/syntax-chooser-tablist.11ty.js", {id: "filter"} %}
  <div id="filter-njk" role="tabpanel">
    {% codetitle "sample.njk" %}
{%- set codeBlock %}{% raw %}
<h1>{{ name | makeUppercase }}</h1>
{% endraw %}{%- endset %}
{{ codeBlock | highlight("html") | safe }}
  </div>
  <div id="filter-liquid" role="tabpanel">
    {% codetitle "sample.liquid" %}
{%- set codeBlock %}{% raw %}
<h1>{{ name | makeUppercase }}</h1>
{% endraw %}{%- endset %}
{{ codeBlock | highlight("html") | safe }}
  </div>
  <div id="filter-js" role="tabpanel">
    {% codetitle "sample.11ty.js" %}
{%- set codeBlock %}{% raw %}
export default function({name}) {
  return `<h1>${this.makeUppercase(name)}</h1>`;
};
{% endraw %}{%- endset %}
{{ codeBlock | highlight("js") | safe }}
  </div>
	<div id="filter-cjs" role="tabpanel">
    {% codetitle "sample.11ty.cjs" %}
{%- set codeBlock %}{% raw %}
module.exports = function({name}) {
  return `<h1>${this.makeUppercase(name)}</h1>`;
};
{% endraw %}{%- endset %}
{{ codeBlock | highlight("js") | safe }}
  </div>
</seven-minute-tabs>
</is-land>

Filters can be added using the [Configuration API](/docs/config/) and are available to multiple template engines, simultaneously. They are currently supported in JavaScript {% addedin "0.7.0" %}, Markdown, Nunjucks, Liquid, and WebC.

{% set codeContent %}
export default function ($config) {
	$config.addFilter("makeUppercase", function(value) { /* … */ });

  $config.addAsyncFilter("makeUppercase", async function(value) { /* … */ });
};
{% endset %}
{% include "snippets/configDefinition.njk" %}

{% callout "info" %}
Markdown files are pre-processed as Liquid templates by default—any filters available in Liquid templates are also available in Markdown files. Likewise, if you <a href="/docs/config/#default-template-engine-for-markdown-files">change the template engine for Markdown files</a>, the filters available for that templating language will also be available in Markdown files.
{% endcallout %}

Read more about filters on the individual Template Language documentation pages:

{% templatelangs templatetypes, page, ["njk", "liquid", "11ty.js"], "#filters" %}

## Eleventy Provided Filters

We also provide a few universal filters, built-in:

{{ "Filters" | nav | eleventyNavigationToHtml({ showExcerpt: true }) | safe }}

### Access existing filters in your Configuration File {% addedin "0.11.0" %}

If you’d like to reuse existing filters, you can use the Configuration API’s `getFilter` method. When called with a valid filter name, it will return that filter’s callback function. It can be helpful when aliasing a filter to a different name, using a filter inside of your own filter, or using a filter inside of a shortcode.

{% set codeContent %}
export default function ($config) {
	$config.addShortcode("myCustomImage", function (url, alt) {
		return `<img src="${$config.getFilter("url")(url)}" alt="${alt}">`;
	});
};
{% endset %}
{% include "snippets/configDefinition.njk" %}

## Asynchronous Filters {% addedin "2.0.0" %}

Eleventy has added a new universal filter API for asynchronous filters and extended the currently available `addFilter` method to be async-friendly.

{% set codeContent %}
export default function ($config) {
	// Async universal filters add to:
	// * Liquid
	// * Nunjucks
	// * JavaScript

	$config.addFilter("myFilter", async function (value) {
		// do some Async work
		return value;
	});

	$config.addAsyncFilter("myFilter", async function (value) {
		// do some Async work
		return value;
	});
};
{% endset %}
{% include "snippets/configDefinition.njk" %}

<div class="youtube-related">
  {%- youtubeEmbed "hJAtWQ9nmKU", "Universal Asynchronous Filters (Nunjucks improvement) (Changelog №17)", "774" -%}
</div>

## Scoped Data in Filters

A few Eleventy-specific data properties are available to filter callbacks.

- `this.page` {% addedin "2.0.0-canary.19" %} (Learn about [`page`](/docs/data-eleventy-supplied.md#page-variable))
- `this.eleventy` {% addedin "2.0.0-canary.19" %} (Learn about [`eleventy`](/docs/data-eleventy-supplied.md##eleventy-variable))
- `this.env` (Nunjucks-specific) {% addedin "3.0.0-canary.5" %}
- `this.ctx` (Nunjucks-specific) {% addedin "3.0.0-canary.5" %}

{% set codeContent %}
export default function ($config) {
	// Make sure you’re not using an arrow function here: () => {}
	$config.addFilter("myFilter", function () {
		// this.page
		// this.eleventy
	});
};
{% endset %}
{% include "snippets/configDefinition.njk" %}

## Memoize Filters

> Memoize functions - An optimization used to speed up consecutive function calls by caching the result of calls with identical input

There are many popular libraries to cache or memoize functions (filters, shortcodes, etc): [`memoize`](https://www.npmjs.com/package/memoize) (ESM-only) is one such package. You can use `memoize` (or any [other memoization library](https://www.npmjs.com/search?q=memoize)) to cache things in your Eleventy Configuration file.

Note that Eleventy 3.0 <!-- 3.0.0-alpha.15 --> ships with a memoization layer around the built-in [`slug`](/docs/filters/slug/), [`slugify`](/docs/filters/slugify/), and [`inputPathToUrl`](/docs/filters/inputpath-to-url/) filters.

<div class="codetitle">buildawesome.config.js</div>

{%- set codeBlock %}{% raw %}
import memoize from "memoize";

export default function($config) {
	$config.addFilter("htmlEntities", memoize(str => {
		return encode(str);
	}));
};
{% endraw %}{%- endset %}
{{ codeBlock | highlight("js") | safe }}

## Per-Engine filters

Filters can also be specified individually for one or more template engines. (The `addFilter` function is actually an alias for calling all of these functions.)

{% set codeContent %}
export default function ($config) {
	// Liquid Filter (async-friendly)
  $config.addLiquidFilter("myFilter", async function(value) { /* … */ });

  // Nunjucks Filter
  $config.addNunjucksFilter("myFilter", function(value) { /* … */ });

  // Nunjucks Async Filter
  // Read the Nunjucks docs before using this (link below)
  $config.addNunjucksAsyncFilter("myFilter", function() { /* … */ });

  // JavaScript Template Function (async-friendly)
  $config.addJavaScriptFunction("myFilter", async function(value) { /* … */ });
};
{% endset %}
{% include "snippets/configDefinition.njk" %}

Note that [Nunjucks `addNunjucksAsyncFilter`](/docs/languages/nunjucks/#asynchronous-nunjucks-filters) requires the use of callbacks for async behavior. Make sure you read up on it!

{% callout "info" %}
Markdown files are pre-processed as Liquid templates by default—any filters available in Liquid templates are also available in Markdown files. Likewise, if you <a href="/docs/config/#default-template-engine-for-markdown-files">change the template engine for Markdown files</a>, the filters available for that templating language will also be available in Markdown files.
{% endcallout %}

## From the Community

{% include "11tybundle.njk" %}
