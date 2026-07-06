---
eleventyNavigation:
  parent: Configure Templates with Data
  key: Layouts
  order: 1
  excerpt: Wrap content in other content.
---

# Layouts

{% tableofcontents %}

Eleventy Layouts are special templates that can be used to wrap other content.

To denote that a piece of content should be wrapped in a template, use the `layout` key in your front matter, like so:

{% include "snippets/layouts/intro.njk" %}

This will look for a `mylayout.njk` Nunjucks file in your _includes_ folder at `_includes/mylayout.njk`.

- You can use any template language in your layout file—it doesn’t need to match the template language of the content: an `ejs` template can use a `njk` layout.
- Layouts paths can use subdirectories: `layout: "layouts/base.njk"` maps to `_includes/layouts/base.njk`.
- You can have a [separate folder for Eleventy layouts](</docs/config/#directory-for-layouts-optional>) if you’d prefer to have them separate from your _includes_ folder.

Next, we need to create a `mylayout.njk` file. It may contain any arbitrary text, but here we’re using HTML:

{% codetitle "_includes/mylayout.njk" %}
{% set codeBlock %}
{% include "snippets/layouts/mylayout.njk" %}
{% endset %}
{{ codeBlock | highlight("html") | safe }}

Note that the layout template will populate the `content` data with the child template’s content. Also note that we don’t want to double-escape the output, so we’re using the provided Nunjucks `safe` filter here (see more language double-escaping syntax below).

Layouts can contain their own front matter data! It’ll be merged with the content’s data on render. Content data takes precedence, if conflicting keys arise. Read more about <a href="/docs/data-cascade/">how Eleventy merges data in what we call the Data Cascade</a>.

All of this will output the following HTML content to `_site/content-using-layout/index.html`:

{% callout "demo" %}
{% include "snippets/layouts/output.njk" %}
{% endcallout %}

## Front Matter Data in Layouts

In [Eleventy’s Data Cascade](/docs/data/), front matter data in your template is merged with Layout front matter data! All data is merged ahead of time so that you can mix and match variables in your content and layout templates interchangeably.

Front matter data set in a content template takes priority over layout front matter! [Chained layouts](/docs/layout-chaining/) have similar merge behavior. The closer to the content, the higher priority the data.

{% callout "info" %}The placement in the data cascade for frontmatter data in layouts changed in 1.0! Take note of the new order below.{% endcallout %}

### Sources of Data

{% include "datasources.md" %}

## Layout Aliasing {% addedin "0.2.8" %}

Configuration API: use `$config.addLayoutAlias(from, to)` to add layout aliases. Say you have a bunch of existing content using `layout: post`. If you don’t want to rewrite all of those values, map `post` to a new file like this:

{% set codeContent %}
export default function($config) {
	$config.addLayoutAlias("post", "layouts/post.njk");
};
{% endset %}
{% include "snippets/configDefinition.njk" %}

## Prevent double-escaping in layouts

{% raw %}
| Template Language | Unescaped Content (for layout content) | Comparison with an Escaped Output | Docs |
| ----------------- | ------------------------------------------------------ | --------------------------------- | ------------------------------------------------------------------------------------ |
| Nunjucks | `{{ content \| safe }}` | `{{ value }}` | [Docs](https://mozilla.github.io/nunjucks/templating.html#safe) |
| EJS | `<%- content %>` | `<%= value %>` | [Docs](https://www.npmjs.com/package/ejs#tags) |
| Handlebars | `{{{ content }}}` (triple stash) | `{{ value }}` (double stash) | [Docs](https://handlebarsjs.com/#html-escaping) |
| Mustache | `{{{ content }}}` (triple stash) | `{{ value }}` (double stash) | [Docs](https://github.com/janl/mustache.js#variables) |
| Liquid | is by default unescaped so you can use `{{ content }}` | `{{ value \| escape }}` | [Docs](https://liquidjs.com/filters/escape.html) |
| HAML | `! #{ content }` | `= #{ content }` | [Docs](https://haml.info/docs/yardoc/file.REFERENCE.html#unescaping_html) |
| Pug | `!{content}` | `#{value}` | [Docs](https://pugjs.org/language/interpolation.html#string-interpolation-unescaped) |
{% endraw %}

## Layout Chaining

Chaining multiple layouts together. [Read more about Layout Chaining](/docs/layout-chaining/).

## Omitting the Layout’s File Extension

Omitting the layout file extension (for example `layout: mylayout`) causes Eleventy to cycle through all of the supported template formats (`mylayout.*`) to look for a matching layout file. There are a few drawbacks to this approach:

1. It is slower! Including the file extension bypasses the file search.
2. It is ambiguous if you have multiple layout files with the same name and different extensions (e.g. `mylayout.njk` and `mylayout.liquid`).

You can disable extensionless layouts in your project with the `setLayoutResolution` Configuration API method {% addedin "2.0.0-canary.21" %} (we may swap this to be the default in a future major version of Eleventy):

{% set codeContent %}
export default function($config) {
	$config.setLayoutResolution(false);
};
{% endset %}
{% include "snippets/configDefinition.njk" %}
