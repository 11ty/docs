---
eleventyNavigation:
  parent: Using Data
  key: Eleventy Supplied Data
  order: 2
---

# Eleventy Supplied Data

{% tableofcontents %}

Here are a few data values we supply to your page that you can use in your templates:

- `pkg`: The local project’s `package.json` values.
- `pagination`: Using the `pagination` key in [front matter](/docs/data-frontmatter/), this divides data into chunks for multiple output pages. [Read more about Pagination](/docs/pagination/).
- `collections`: Lists of all of your content, grouped by tags. [Read more about Collections](/docs/collections/)
- `page`: Has information about the current page (see the code block below for `page` contents). For example, `page.url` is useful for [finding the current page in a collection](/docs/collections.md#use-an-aria-current-attribute-on-the-current-page).
- `eleventy`: {% addedin "1.0.0" %} contains Eleventy-specific data from [environment variables](/docs/environment-vars/).

<div id="page-variable-contents"></div>

## `page` Variable

```js
const page = {
	// URL can be used in <a href> to link to other templates
	// NOTE: This value will be `false` if `permalink` is set to `false`.
	url: "/current/page/myFile/",

	// For permalinks: inputPath filename minus template file extension
	fileSlug: "myFile",

	// For permalinks: inputPath minus template file extension
	filePathStem: "/current/page/myFile",

	// JS Date object for current page (used to sort collections)
	date: new Date(),

	// The path to the original source file for the template
	// NOTE: this includes your input directory path!
	inputPath: "./current/page/myFile.md",

	// Depends on your output directory (the default is _site)
	// You should probably use `url` instead.
	// NOTE: This value will be `false` if `permalink` is set to `false`.
	outputPath: "./_site/current/page/myFile/index.html",

	// Useful with `page.filePathStem` when using custom file extensions.
	outputFileExtension: "html",

	// Comma separated list of template syntaxes processing this template
	// Added in 2.0+
	templateSyntax: "liquid,md",

	// The raw unparsed/unrendered plaintext content for the current template
	// Added in 3.0+
	rawInput: "<!doctype html>…"

	// Available in 2.0 with the i18n plugin
	// The default is the value of `defaultLanguage` passed to the i18n plugin
	lang: "",
};
```

- Note that `page.lang` is _only_ available when the [i18n plugin has been added to your configuration file](/docs/plugins/i18n/#add-to-your-configuration-file).

### Feature Availability

The data in `page` is also available as:

- `this.page` on [Shortcodes](/docs/shortcodes/#scoped-data-in-shortcodes) {% addedin "0.11.0" %}
- `this.page` on [Filters](/docs/filters/#scoped-data-in-filters), [Transforms](/docs/config/#transforms), and [Linters](/docs/config/#linters) {% addedin "2.0.0-canary.19" %}
- `page` on [Collection entries](/docs/collections/#collection-item-data-structure) {% addedin "2.0.0-canary.19" %}

### `date`

The date associated with the page. Defaults to the content’s file created date, but can be overridden. [Read more at Content Dates](/docs/dates/).

### `fileSlug` {% addedin "0.3.4" %}

The `fileSlug` variable is mapped from `inputPath`, and is useful for creating your own clean [permalinks](/docs/permalinks/).

| `inputPath`              | `page.fileSlug` Result |
| ------------------------ | ---------------------- |
| `"2018-01-01.md"`        | `"2018-01-01"`         |
| `"2018-01-01-myFile.md"` | `"myFile"`             |
| `"myDir/myFile.md"`      | `"myFile"`             |

`fileSlug` returns information on the parent directory if the file is an `index` template:

| `inputPath`                   | `page.fileSlug` Result                    |
| ----------------------------- | ----------------------------------------- |
| `"index.md"`                  | `""` _(empty)_                            |
| `"myDir/index.md"`            | `"myDir"`                                 |
| `"myDir/2018-01-01-index.md"` | `"myDir"`                                 |
| `"2018-01-01-myDir/index.md"` | `"myDir"` {% addedin "2.0.0-canary.10" %} |

### `filePathStem` {% addedin "0.9.0" %}

The `filePathStem` variable is mapped from `inputPath`, and is useful if you’ve inherited a project that doesn’t use clean [permalinks](/docs/permalinks/).

<div id="changing-your-project-default-permalinks"></div>

You can use this feature to [globally change your project’s default permalinks](/docs/permalinks.md#change-permalinks-globally-for-a-project) but make sure you also read the section about [Trailing Slashes](docs/permalinks.md#trailing-slashes).

{% callout "info" %}<strong>Careful with this one!</strong> Remember the recommendation to leave off the file extension from URLs in <a href="/docs/permalinks/#cool-uris-dont-change">Cool URIs don’t change</a>.{% endcallout %}

If you want a file extension in your URL, you might use it like this:

{% codetitle "YAML Front Matter", "Syntax" %}
{%- set codeBlock %}{% raw %}
---
permalink: "{{ page.filePathStem }}.html"
---
{% endraw %}{%- endset %}
{{ codeBlock | highlight("yaml") | safe }}

This example output uses the above permalink value.

| `inputPath`              | `page.filePathStem` Result | Example Output      |
| ------------------------ | -------------------------- | ------------------- |
| `"2018-01-01-myFile.md"` | `"myFile"`                 | `myFile.html`       |
| `"myDir/myFile.md"`      | `"myDir/myFile"`           | `myDir/myFile.html` |

## `eleventy` Variable {% addedin "1.0.0" %}

```js
const eleventy = {

	// Eleventy version
	version: "1.0.1",

	// For use with `<meta name="generator">`
	generator: "Eleventy v1.0.1",

	// Read more about their `process.env` counterparts below
	env: {
		// Absolute path to the directory in which
		// you’ve run the Eleventy command.
		root: "/Users/zachleat/myProject/",

		// Absolute path to the current config file
		config: "/Users/zachleat/myProject/.eleventy.js",

		// The method, either `cli` or `script`
		source: "cli",

		// One of `serve`, `watch`, or `build`
		runMode: "build", // New in {{ "2.0.0-beta.2" | coerceVersion }}
	},

	// Project root-relative normalized paths, new in {{ "3.0.0-alpha.6" | coerceVersion }}
	directories: {
		"input": "./",
		"includes": "./_includes/",
		"data": "./_data/",
		"output": "./_site/"
	},

};
```

* {% addedin "v3.0.0-alpha.6" %}`eleventy.directories` contains project-root relative normalized paths for the important Eleventy directories: [`input`](/docs/config.md#input-directory),  [`includes`](/docs/config.md#directory-for-includes),  [`layouts`](/docs/config.md##directory-for-layouts-(optional)) (if used),  [`data`](/docs/config.md##directory-for-global-data-files), and [`output`](/docs/config.md#output-directory).

### Feature Availability

The data in `eleventy` is also available as:

- `this.eleventy` on [Shortcodes](/docs/shortcodes/) {% addedin "2.0.0-canary.5" %}
- `this.eleventy` on [Filters](/docs/filters/) {% addedin "2.0.0-canary.19" %}

### Use with `meta name="generator"` {% addedin "1.0.1" %}

It’s helpful if you add `<meta name="generator">` to your existing Eleventy project as shown below. Learn more [from David Darnes’ blog post: _You should add a generator tag to your Eleventy site_](https://darn.es/you-should-add-a-generator-tag-to-your-eleventy-site/).

{% codetitle "Nunjucks, Liquid", "Syntax" %}

{%- set codeBlock %}{% raw %}
<meta name="generator" content="{{ eleventy.generator }}">
{% endraw %}{%- endset %}
{{ codeBlock | highlight("jinja2") | safe }}

These videos also provide some additional context as to why this is important:

<div class="youtube-related">
	{%- youtubeEmbed "b4frtsT4Cgo", "Full control over HTML, a look at requiring opt-in for the meta name=generator in Eleventy" -%}
	{%- youtubeEmbed "_YvwTHeqBZY", "eleventy.version and eleventy.generator Data (Weekly №7)", "235" -%}
</div>

### Learn more

- [Eleventy-supplied Environment Variables on `process.env`](/docs/environment-vars/#eleventy-supplied)

## Environment Variables on `process.env`

- Read more about [Eleventy-supplied environment variables](/docs/environment-vars/#eleventy-supplied).

## Frozen Data

Starting in Eleventy 3.0, the `pkg`, `eleventy`, `page`, `content`, and `collections` properties are now frozen from external modification to prevent accidental overrides interfering with Eleventy internals.

You can temporarily opt-out of the behavior using:

{% set codeContent %}
export default function($config) {
	$config.setFreezeReservedData(false);
};
{% endset %}
{% include "snippets/configDefinition.njk" %}