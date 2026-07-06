---
eleventyNavigation:
  parent: Template Languages
  key: Mustache
  order: 5
  excerpt: Fast, minimal template language
layout: layouts/langs.njk
---

{% tableofcontents "open" %}

| Eleventy Short Name | File Extension | npm Package                                           |
| ------------------- | -------------- | ----------------------------------------------------- |
| `mustache`          | `.mustache`    | [`mustache`](https://github.com/janl/mustache.js/) |

| Eleventy or Plugin version | `mustache` version |
| --- | --- |
| `@11ty/eleventy@0.x` | `mustache@2.x` |
| `@11ty/eleventy@1.x` | `mustache@4.x` |
| `@11ty/eleventy@2.x` | `mustache@4.x` |
| `@11ty/eleventy@3.x` and newer | N/A |
| `@11ty/eleventy-plugin-mustache@1.x` | `mustache@4.x` |

You can override a `.mustache` file’s template engine. Read more at [Changing a Template’s Rendering Engine](/docs/template-overrides/).

## Installation

The `.mustache` templating language was moved out of Eleventy core in v3 and now requires a plugin installation.

* [`11ty/eleventy-plugin-template-languages` on GitHub](https://github.com/11ty/eleventy-plugin-template-languages)


{%- set codeBlock %}
npm install @11ty/eleventy-plugin-mustache
{%- endset %}
{{ codeBlock | highlight("bash") | safe }}

Add to your configuration file:

{% set codeContent %}
import mustachePlugin from "@11ty/eleventy-plugin-mustache";

export default function ($config) {
	$config.addPlugin(mustachePlugin);
}
{% endset %}
{% include "snippets/configDefinition.njk" %}

Use more options:

{% set codeContent %}
import mustache from "mustache";
import mustachePlugin from "@11ty/eleventy-plugin-mustache";

export default function ($config) {
	$config.addPlugin(mustachePlugin, {
		// Override the `mustache` library instance
		eleventyLibraryOverride: mustache,
	});
}
{% endset %}
{% include "snippets/configDefinition.njk" %}

## Supported Features

| Feature                     | Syntax                                                                                                                    |
| --------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| ✅ Partials                 | `{% raw %}{{> user}}{% endraw %}` looks for `_includes/user.mustache`. Does not process front matter in the include file. |
| 🚫 Partials (Relative Path) | **Not yet supported**: `{% raw %}{{> ./user}}{% endraw %}` looks for `user.mustache` in the template’s current directory. |