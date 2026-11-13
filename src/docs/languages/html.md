---
eleventyNavigation:
  parent: Template Languages
  key: HTML
  pinned: true
  order: 1
  excerpt: Pre-processed by default as Liquid templates
layout: layouts/langs.njk
relatedLinks:
  /docs/config/#default-template-engine-for-html-files: Default Template Engine for HTML Files
---

| Eleventy Short Name | File Extension | npm Package |
| ------------------- | -------------- | ----------- |
| `html`              | `.html`        | N/A         |

HTML files are pre-processed by default as [Liquid templates](/docs/languages/liquid/). This is an optional feature and can be changed to a different template engine of your choice or disabled entirely. Furthermore, it can be configured on a per-template basis or globally. Read more at [Changing a Template’s Rendering Engine](/docs/template-overrides/).

<div id="same-input-output"></div>

## Using the Same Input and Output Directories

{% callout "pitfall" %}This is a <a href="/docs/pitfalls/"><strong>Common Pitfall</strong></a>.{% endcallout %}

Take care with the HTML template type when using the same <code>--input</code> and <code>--output</code> directory (this is not the default).

If you run Eleventy more than once, it’ll try to process your output files too which may result in duplicate template errors.

{%- set codeBlock %}{% raw %}
$ npx @11ty/eleventy --input=. --output=. --formats=md,html
Writing ./README/index.html from ./README.md

$ npx @11ty/eleventy --input=. --output=. --formats=md,html
{% endraw %}{%- endset %}
{{ codeBlock | highlight("bash") | safe }}

The second run will attempt to write `./README/index.html` from both `./README.md` and `./README/index.html`, resulting in a Duplicate Permalink Error (two templates writing to the same location). You can workaround this issue using the [Ignores feature](/docs/ignores.md).

If you’re going to use `--formats=html`, it’s probably best not using the same input and output directories.