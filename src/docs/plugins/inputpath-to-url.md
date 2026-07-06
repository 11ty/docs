---
eleventyNavigation:
  key: InputPath to URL
  title: '<i class="fa-solid fa-file"></i>InputPath to URL'
  order: 3
  excerpt: Maps an Eleventy input file path to its output URL.
---

# InputPath to URL {% addedin "v3.0.0-alpha.5" %}

{% tableofcontents %}

This plugin allows you to use file system paths in your HTML and they will be automatically transformed to their output URLs. Very useful for robust hyperlinking allowing you to change your output URLs without breaking content links! Works out of the box with [`permalink` remapping](/docs/permalinks/), the [HTML `<base>` plugin](/docs/plugins/html-base/), etc.

{% callout "info", "md" -%}
This plugin is an implicit alternative to the [`inputPathToUrl` filter](/docs/filters/inputpath-to-url/). The filter is faster but a bit more verbose.
{%- endcallout %}

_Inspired by [GitHub issue #84](https://github.com/11ty/eleventy/issues/84)._

### Usage

You can link to `inputPath` in any `a[href]`, `video[src]`, `audio[src]`, `source`, `img[src]`, `[srcset]` and [a whole bunch more](https://github.com/11ty/eleventy-posthtml-urls/blob/6e064c8a03174835eb15afbb5b759fecd696f901/lib/defaultOptions.js#L12-L33) (via [posthtml-urls](https://github.com/11ty/posthtml-urls)) and this plugin will render the correct URL for the template in your output directory.

This uses an [Eleventy Transform](/docs/config/#transforms) to modify the output of all template syntaxes that output an `.html` file.

<is-land on:visible import="/js/seven-minute-tabs.js">
<seven-minute-tabs persist sync class="tabs-flush" autoheight>
  {% renderFile "./src/_includes/syntax-chooser-tablist.11ty.js", {id: "inputpathtourl", additions: "html,md"} %}
  <div id="inputpathtourl-html" role="tabpanel">
{%- set codeBlock %}
<a href="my-template.md">Home</a>
{%- endset %}
{{ codeBlock | highlight("html") | safe }}
  </div>
  <div id="inputpathtourl-md" role="tabpanel">
{%- set codeBlock %}
[Home](my-template.md)
{%- endset %}
{{ codeBlock | highlight("markdown") | safe }}
  </div>
  <div id="inputpathtourl-liquid" role="tabpanel">
{%- set codeBlock %}
<a href="my-template.md">Home</a>
{%- endset %}
{{ codeBlock | highlight("html") | safe }}
  </div>
  <div id="inputpathtourl-njk" role="tabpanel">
{%- set codeBlock %}
<a href="my-template.md">Home</a>
{%- endset %}
{{ codeBlock | highlight("html") | safe }}
  </div>
  <div id="inputpathtourl-js" role="tabpanel">
{%- set codeBlock %}
export default function (data) {
	return `<a href="my-template.md">Home</a>`;
};
{%- endset %}
{{ codeBlock | highlight("js") | safe }}
  </div>
  <div id="inputpathtourl-cjs" role="tabpanel">
{%- set codeBlock %}
module.exports = function (data) {
  return `<a href="my-template.md">Home</a>`;
};
{%- endset %}
{{ codeBlock | highlight("js") | safe }}
  </div>
</seven-minute-tabs>
</is-land>

The above all render as the following in your output:

```html
<a href="/my-template/">Home</a>
```

- The paths used here can be relative to:
  - [the input directory](/docs/config/#input-directory)
  - the current template path {% addedin "3.0.0-alpha.19" %}
  - to the project root (you’ll regret this if your input directory ever changes 😅)
- As this transform is implicit it _does not_ error when an inputPath match is not found—it only returns the original URL string.
- When pointing to a [**Pagination template**](/docs/pagination/), the first URL in the pagination set is returned.

### Installation

{% addedin "v3.0.0-alpha.5" %} This plugin is bundled with Eleventy 3.0 and does not require you to install anything from `npm`. However, the plugin is _opt-in_ (requires you to use `addPlugin`). It is compatible with _all_ template languages via an Eleventy Transform.

Note that the [`inputPathToUrl` filter](/docs/filters/inputpath-to-url/) is available by default and does not require use of `addPlugin`.

Open up your Eleventy config file (probably `buildawesome.config.js`) and use `addPlugin`:

{% include "snippets/plugins/inputpath.njk" %}

<details class="details-expand-bg">
<summary>Expand for full options list</summary>

{% include "snippets/plugins/inputpath-options.njk" %}

- Read more about [Transform outputPaths](/docs/transforms/).

</details>
