---
eleventyNavigation:
  parent: Template Languages
  key: EJS
  order: 6
  excerpt: Embedded JavaScript
layout: layouts/langs.njk
---

[EJS](https://ejs.co/), short for _Embedded JavaScript_, is a template language that emphasizes the use of plain JavaScript instead of having its own template syntax. It can be really convenient if you're fluent in JavaScript. As opposed to languages like [Mustache](/docs/languages/mustache/) that bill themselves as 'logic-less', EJS lets you use as much logic as you'd like.

{% tableofcontents "open" %}

| Eleventy Short Name | File Extension | npm Package                                |
| ------------------- | -------------- | ------------------------------------------ |
| `ejs`               | `.ejs`         | [`ejs`](https://www.npmjs.com/package/ejs) |

| Eleventy or Plugin version | `ejs` version |
| --- | --- |
| `@11ty/eleventy@0.x` | `ejs@2.x` |
| `@11ty/eleventy@1.x` | `ejs@3.x` |
| `@11ty/eleventy@2.x` | `ejs@3.x` |
| `@11ty/eleventy@3.x` and newer | N/A |
| `@11ty/eleventy-plugin-ejs@1.x` | `ejs@3.x` |

You can override a `.ejs` file’s template engine. Read more at [Changing a Template’s Rendering Engine](/docs/template-overrides/).

## Installation

The `ejs` templating language was moved out of Eleventy core in v3 and now requires a plugin installation.

* [`11ty/eleventy-plugin-template-languages` on GitHub](https://github.com/11ty/eleventy-plugin-template-languages)

Install from npm:

{%- set codeBlock %}
npm install @11ty/eleventy-plugin-ejs
{%- endset %}
{{ codeBlock | highlight("bash") | safe }}

Add to your configuration file:

{% set codeContent %}
import ejsPlugin from "@11ty/eleventy-plugin-ejs";

export default function ($config) {
	$config.addPlugin(ejsPlugin);
}
{% endset %}
{% include "snippets/configDefinition.njk" %}


Use more `ejs` options ([full options list](https://github.com/mde/ejs#options)):

{% set codeContent %}
import ejs from "ejs";
import ejsPlugin from "@11ty/eleventy-plugin-ejs";

export default function ($config) {
	$config.addPlugin(ejsPlugin, {
		async: false, // default

		// use <? ?> instead of <% %>
		delimiter: "?",

		// Override the `ejs` library instance
		eleventyLibraryOverride: ejs,
	});
}
{% endset %}
{% include "snippets/configDefinition.njk" %}

## Supported Features

| Feature                                             | Syntax                                                                                                                                                                                                                                                                                                                                                                        |
| --------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ✅ Include (Preprocessor Directive)                 | `<% include /user/show %>` looks for `_includes/user/show.ejs` (the leading slash is important). Does not process front matter in the include file.                                                                                                                                                                                                                           |
| ✅ Includes (Relative Path, Preprocessor Directive) | Relative paths in `ejs` can leave off the leading slash `/` or use `./` to use the template’s directory or `../` for the template’s parent directory:<br>`<% include 'user/show' %>` or `<% include './user/show' %>` looks for `./user/show.ejs` from the template’s current directory. Does not process front matter in the include file.                                   |
| ✅ Include (pass in Data)                           | `<%- include('/user/show', {user: 'Ava'}) %>` looks for `_includes/user/show.ejs`. Does not process front matter in the include file.                                                                                                                                                                                                                                         |
| ✅ Include (Relative Path, pass in Data)            | Relative paths in `ejs` can leave off the leading slash `/` or use `./` to use the template’s directory or `../` for the template’s parent directory:<br>`<%- include('user/show', {user: 'Ava'}) %>` or `<%- include('./user/show', {user: 'Ava'}) %>` looks for `./user/show.ejs` from the template’s current directory. Does not process front matter in the include file. |