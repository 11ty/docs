---
eleventyNavigation:
  parent: Filters
  key: inputPathToUrl Filter
  title: "<code>inputPathToUrl</code>"
  order: 4
  excerpt: "Map a template’s input path to its output URL."
---

# `inputPathToUrl` Universal Filter

{% addedin "v3.0.0-alpha.5" %} Map a file’s location and to the template’s output URL. Very useful for robust hyperlinking allowing you to change your output URLs without breaking content links! Eleventy 3.0 <!-- 3.0.0-alpha.15 --> [memoizes this filter](/docs/memoize).

{% callout "info", "md" -%}
This filter is an alternative to the [InputPath To Url Plugin](/docs/plugins/inputpath-to-url/), which provides an Eleventy transform that is less verbose but a bit slower.
{%- endcallout %}

_Inspired by [GitHub issue #84](https://github.com/11ty/eleventy/issues/84)._

## Usage

{% tabs "inputpathtourl", { load: "immediate" } %}
{% raw %}
```liquid liquid
<a href="{{ "index.md" | inputPathToUrl }}">Home</a>
```

```jinja2 njk
<a href="{{ "index.md" | inputPathToUrl }}">Home</a>
```

```js js
export default function (data) {
	return `<a href="${this.inputPathToUrl("index.md")}">Home</a>`;
}
```

```js cjs
module.exports = function (data) {
	return `<a href="${this.inputPathToUrl("index.md")}">Home</a>`;
};
```
{% endraw %}
{% endtabs %}

Renders as `<a href="/">Home</a>`.

- The paths used here should be [relative to the input directory](/docs/config/#input-directory) though they _can_ be relative to the project root (the former is simpler and more robust).
- If an `inputPath` match can not be found, this filter will throw an error.
- When pointing to a [**Pagination template**](/docs/pagination/), the first URL in the pagination set is returned.

---

[← Back to Filters documentation.](/docs/filters/)
