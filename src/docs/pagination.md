---
eleventyNavigation:
  parent: Create Pages From Data
  key: Pagination
  excerpt: Iterate over a data set and create multiple files from a single template.
  pinned: true
relatedKey: pagination
---

# Pagination

{% tableofcontents %}

Pagination allows you to iterate over a data set and create multiple files from a single template. The input data can be in the form of an array or object defined in your frontmatter or in [global data](/docs/data-global/), or you can paginate a collection to make an easily digestible list of your posts.

## Paging an Array

To iterate over a data set and create pages for individual chunks of data, use pagination. Enable in your template’s front matter by adding the `pagination` key.

Consider the following template, which will result in two pages being created, each of which will display two items from `testdata`:

<is-land on:visible import="/js/seven-minute-tabs.js">
<seven-minute-tabs persist sync class="tabs-flush" autoheight>
  {% renderFile "./src/_includes/syntax-chooser-tablist.11ty.js", {id: "paged-array"} %}
  <div id="paged-array-liquid" role="tabpanel">

{% set codeBlock %}
{%- include "snippets/pagination/paged-array.njk" %}
{% endset %}
{{ codeBlock | highlight("liquid") | safe }}

If the above file were named `paged.liquid`, it would create two pages in your output folder: `_site/paged/index.html` and `_site/paged/1/index.html`. These output paths are configurable with `permalink` (see below).

  </div>
  <div id="paged-array-njk" role="tabpanel">

{% set codeBlock %}
{%- include "snippets/pagination/paged-array.njk" %}
{% endset %}
{{ codeBlock | highlight("jinja2") | safe }}

If the above file were named `paged.njk`, it would create two pages in your output folder: `_site/paged/index.html` and `_site/paged/1/index.html`. These output paths are configurable with `permalink` (see below).

  </div>
  <div id="paged-array-js" role="tabpanel">

{% set codeBlock %}
{%- include "snippets/pagination/paged-array.js" %}
{% endset %}
{{ codeBlock | highlight("js") | safe }}

If the above file were named `paged.11ty.js`, it would create two pages in your output folder: `_site/paged/index.html` and `_site/paged/1/index.html`. These output paths are configurable with `permalink` (see below).

  </div>
  <div id="paged-array-cjs" role="tabpanel">

{% set codeBlock %}
{%- include "snippets/pagination/paged-array.cjs" %}
{% endset %}
{{ codeBlock | highlight("js") | safe }}

If the above file were named `paged.11ty.js`, it would create two pages in your output folder: `_site/paged/index.html` and `_site/paged/1/index.html`. These output paths are configurable with `permalink` (see below).

  </div>
</seven-minute-tabs>
</is-land>

We enable pagination and then give it a dataset with the `data` key. We control the number of items in each chunk with `size`. The pagination data variable will be populated with what you need to create each template. Here’s what’s in `pagination`:

{% codetitle "JavaScript Object", "Syntax" %}
{%- set codeBlock %}{% raw %}
{
  items: [], // Array of current page’s chunk of data
  pageNumber: 0, // current page number, 0 indexed

  // Cool URLs
  hrefs: [], // Array of all page hrefs (in order)
  href: {
    next: "…", // put inside <a href="{{ pagination.href.next }}">Next Page</a>
    previous: "…", // put inside <a href="{{ pagination.href.previous }}">Previous Page</a>
    first: "…",
    last: "…",
  },

  pages: [], // Array of all chunks of paginated data (in order)
  page: {
    next: {}, // Next page’s chunk of data
    previous: {}, // Previous page’s chunk of data
    first: {},
    last: {},
  }
}
{% endraw %}{%- endset %}
{{ codeBlock | highlight("js") | safe }}

<details>
  <summary>Expand to see all of the extra stuff in the <code>pagination</code> object that you probably don’t need any more but it’s still in there for backwards compatibility.</summary>

In addition to the `pagination` object entries documented above, it also has:

{% codetitle "JavaScript Object", "Syntax" %}
{%- set codeBlock %}{% raw %}
{
  data: "…", // the original string key to the dataset
  size: 1, // page chunk sizes

  // Cool URLs
  // Use pagination.href.next, pagination.href.previous, et al instead.
  nextPageHref: "…", // put inside <a href="{{ pagination.nextPageHref }}">Next Page</a>
  previousPageHref: "…", // put inside <a href="{{ pagination.previousPageHref }}">Previous Page</a>
  firstPageHref: "…",
  lastPageHref: "…",

  // Uncool URLs
  // These include index.html file names, use `hrefs` instead
  links: [], // Array of all page links (in order)

  // Deprecated things:
  // nextPageLink
  // previousPageLink
  // firstPageLink
  // lastPageLink
  // pageLinks (alias to `links`)
}
{% endraw %}{%- endset %}
{{ codeBlock | highlight("js") | safe }}
</details>

## Creating Navigation Links to your Pages

Learn how to create a list of links to every paginated page on a pagination template with a full [Pagination Navigation](/docs/pagination/nav/) tutorial.

## Paging an Object

All of the examples thus far have paged Array data. Eleventy does allow paging objects too. Objects are resolved to pagination arrays using either the `Object.keys` or `Object.values` JavaScript functions. Consider the following templates:

{% include "snippets/pagination/paging-object.njk" %}

In this example, we would get 3 pages that each print a key/value pair from `testdata`. The paged items hold the object keys:

{% codetitle "JavaScript Object", "Syntax" %}
{%- set codeBlock %}{% raw %}
[
	["itemkey1"], // pagination.items[0] holds the object key
	["itemkey2"],
	["itemkey3"],
];
{% endraw %}{%- endset %}
{{ codeBlock | highlight("js") | safe }}

You can use these keys to get access to the original value: `testdata[ pagination.items[0] ]`.

If you’d like the pagination to iterate over the values instead of the keys (using `Object.values` instead of `Object.keys`), add `resolve: values` to your `pagination` front matter:

{% codetitle "YAML Front Matter", "Syntax" %}
{%- set codeBlock %}{% raw %}
---
pagination:
  data: testdata
  size: 1
  resolve: values
testdata:
  itemkey1: itemvalue1
  itemkey2: itemvalue2
  itemkey3: itemvalue3
---
{% endraw %}{%- endset %}
{{ codeBlock | highlight("markdown") | safe }}

This resolves to:

{% codetitle "JavaScript Object", "Syntax" %}

{%- set codeBlock %}{% raw %}
[
	["itemvalue1"], // pagination.items[0] holds the object value
	["itemvalue2"],
	["itemvalue3"],
];
{% endraw %}{%- endset %}
{{ codeBlock | highlight("js") | safe }}

## Paginate a global or local data file

[Read more about Template Data Files](/docs/data/). The only change here is that you point your `data` pagination key to the global or local data instead of data in the front matter. For example, consider the following `globalDataSet.json` file in your global data directory.

{% codetitle "JavaScript Object", "Syntax" %}
{%- set codeBlock %}{% raw %}
{
	"myData": ["item1", "item2", "item3", "item4"]
}
{% endraw %}{%- endset %}
{{ codeBlock | highlight("json") | safe }}

Your front matter would look like this:

{% include "snippets/pagination/paging-datafile.njk" %}

## Remapping with permalinks

Normally, front matter does not support template syntax, but `permalink` does, enabling parametric URLs via pagination variables. Here’s an example of a permalink using the pagination page number:

{% codetitle "YAML Front Matter using Liquid, Nunjucks", "Syntax" %}

{%- set codeBlock %}{% raw %}
---
permalink: "different/page-{{ pagination.pageNumber }}/index.html"
---
{% endraw %}{%- endset %}
{{ codeBlock | highlight("markdown") | safe }}

Writes to `_site/different/page-0/index.html`, `_site/different/page-1/index.html`, et cetera.

That means Nunjucks will also let you start your page numbers with 1 instead of 0, by just adding 1 here:

{% codetitle "YAML Front Matter using Nunjucks", "Syntax" %}

{%- set codeBlock %}{% raw %}
---
permalink: "different/page-{{ pagination.pageNumber + 1 }}/index.html"
---
{% endraw %}{%- endset %}
{{ codeBlock | highlight("markdown") | safe }}

Writes to `_site/different/page-1/index.html`, `_site/different/page-2/index.html`, et cetera.

You can even use template logic here too:

{%- set codeBlock %}{% raw %}
---
permalink: "different/{% if pagination.pageNumber > 0 %}page-{{ pagination.pageNumber + 1 }}/{% endif %}index.html"
---
{% endraw %}{%- endset %}
{{ codeBlock | highlight("markdown") | safe }}

Writes to `_site/different/index.html`, `_site/different/page-2/index.html`, et cetera.

{% callout "info" %}Note that the above example works in Nunjucks but {% raw %}<code>{{ pagination.pageNumber + 1 }}</code>{% endraw %} is not supported in Liquid. Use {% raw %}<code>{{ pagination.pageNumber | plus: 1 }}</code>{% endraw %} instead.{% endcallout %}

### Use page item data in the permalink

You can do more advanced things like this:

{% codetitle "YAML Front Matter using Liquid, Nunjucks", "Syntax" %}
{%- set codeBlock %}{% raw %}
---
pagination:
  data: testdata
  size: 1
testdata:
  - My Item
permalink: "different/{{ pagination.items[0] | slugify }}/index.html"
---
{% endraw %}{%- endset %}
{{ codeBlock | highlight("markdown") | safe }}

Using a universal `slug` filter (transforms `My Item` to `my-item`), this outputs: `_site/different/my-item/index.html`.

## Aliasing to a different variable

Ok, so `pagination.items[0]` is ugly. We provide an option to alias this to something different.

{% include "snippets/pagination/alias.njk" %}

This writes to `_site/different/item1/index.html` and `_site/different/item2/index.html`.

{% callout "info" %}Note that <code>page</code> is a reserved word so you cannot use <code>alias: page</code>. Read about Eleventy’s reserved data names in <a href="/docs/data-eleventy-supplied/">Eleventy Supplied Data</a>.{% endcallout %}

If your chunk `size` is greater than 1, the alias will be an array instead of a single value.

{% include "snippets/pagination/alias-size.njk" %}

This writes to `_site/different/item1/index.html` and `_site/different/item3/index.html`.

## Paging a Collection

If you’d like to make a paginated list of all of your blog posts (any content with the tag `post` on it), use something like the following template to iterate over a specific collection:

{% include "snippets/pagination/collection.njk" %}

The above generates a list of links but you could do a lot more. See what’s available in the [Collection documentation](/docs/collections/#collection-item-data-structure) (specifically `templateContent`). If you’d like to use this to automatically generate Tag pages for your content, please read [Quick Tip #004—Create Tag Pages for your Blog](/docs/quicktips/tag-pages/).

## Generating an Empty Results Page

{% addedin "2.0.0-canary.10" %}

By default, if the specified data set is empty, Eleventy will not render any pages. Use `generatePageOnEmptyData: true` to generate one pagination output with an empty chunk `[]` of items.

{% codetitle "Liquid, Nunjucks", "Syntax" %}
{%- set codeBlock %}{% raw %}
---
title: Available Products
pagination:
  data: collections.available
  size: 6
  generatePageOnEmptyData: true
---
{% endraw %}{%- endset %}
{{ codeBlock | highlight("markdown") | safe }}

<div class="youtube-related">
  {%- youtubeEmbed "oCTAZumAGNc", "Empty-results Pagination (Weekly №11)", "207" -%}
</div>

## Modifying the Data Set prior to Pagination

### Reverse the Data {% addedin "0.7.0" %}

Use `reverse: true`.

{%- set codeBlock %}{% raw %}
---
pagination:
  data: testdata
  size: 2
  reverse: true
testdata:
  - item1
  - item2
  - item3
  - item4
---
{% endraw %}{%- endset %}
{{ codeBlock | highlight("markdown") | safe }}

Paginates to:

{%- set codeBlock %}{% raw %}
[
	["item4", "item3"],
	["item2", "item1"],
];
{% endraw %}{%- endset %}
{{ codeBlock | highlight("js") | safe }}

_(More discussion at [Issue #194](https://github.com/11ty/eleventy/issues/194))_

As an aside, this could also be achieved in a more verbose way using the [Collection API](/docs/collections/#advanced-custom-filtering-and-sorting). This could also be done using the new `before` callback {% addedin "0.10.0" %}.

### Filtering Values {% addedin "0.4.0" %}

Use the `filter` pagination property to remove values from paginated data.

{% codetitle "YAML Front Matter", "Syntax" %}
{%- set codeBlock %}{% raw %}
---
pagination:
  data: testdata
  size: 1
  filter:
    - item3
testdata:
  item1: itemvalue1
  item2: itemvalue2
  item3: itemvalue3
---
{% endraw %}{%- endset %}
{{ codeBlock | highlight("markdown") | safe }}

Paginates to:

{% codetitle "JavaScript Object", "Syntax" %}
{%- set codeBlock %}{% raw %}
[["item1"], ["item2"]];
{% endraw %}{%- endset %}
{{ codeBlock | highlight("js") | safe }}

This will work the same with paginated arrays or with `resolve: values` for paginated objects.

{% codetitle "YAML Front Matter", "Syntax" %}
{%- set codeBlock %}{% raw %}
---
pagination:
  data: testdata
  size: 1
  resolve: values
  filter:
    - itemvalue3
testdata:
  item1: itemvalue1
  item2: itemvalue2
  item3: itemvalue3
---
{% endraw %}{%- endset %}
{{ codeBlock | highlight("markdown") | safe }}

Paginates to:

{% codetitle "JavaScript Object", "Syntax" %}
{%- set codeBlock %}{% raw %}
[["itemvalue1"], ["itemvalue2"]];
{% endraw %}{%- endset %}
{{ codeBlock | highlight("js") | safe }}

### The `before` Callback {% addedin "0.10.0" %}

The most powerful tool to change the data. Use this callback to modify, filter, or otherwise change the pagination data however you see fit _before_ pagination occurs.

{%- set codeBlock %}{% raw %}
---js
{
  pagination: {
    data: "testdata",
    size: 2,
    before: function(paginationData, fullData) {
      // `fullData` is new in v1.0.1 and contains the full Data Cascade thus far

      return paginationData.map(entry => `${entry} with a suffix`);
    }
  },
  testdata: [
    "item1",
    "item2",
    "item3",
    "item4"
  ]
}
---
<!-- the rest of the template -->
{% endraw %}{%- endset %}
{{ codeBlock | highlight("js") | safe }}

The above will iterate over a data set containing: `["item1 with a suffix", "item2 with a suffix", "item3 with a suffix", "item4 with a suffix"]`.

You can do anything in this `before` callback. Maybe a custom `.sort()`, `.filter()`, `.map()` to remap the entries, `.slice()` to paginate only a subset of the data, etc!

#### Use JavaScript Template Functions here

{% addedin "2.0.0-canary.16" %}[JavaScript Template Functions](/docs/languages/javascript/#java-script-template-functions) (which are also populated by universal filters and shortcodes) are available in the `before` callback.

{%- set codeBlock %}{% raw %}
// …
before: function() {
  let slug = this.slugify("My title.");
  // use Universal filters or shortcodes too…
},
// …
{% endraw %}{%- endset %}
{{ codeBlock | highlight("js") | safe }}

### Order of Operations

If you use more than one of these data set modification features, here’s the order in which they operate:

- The `before` callback
- `reverse: true`
- `filter` entries

## Add All Pagination Pages to Collections {% addedin "0.8.0" %}

By default, any tags listed in a paginated template will only add the very first page to the appropriate collection.

Consider the following pagination template:

{% codetitle "my-page.md" %}
{%- set codeBlock %}{% raw %}
---
tags:
  - myCollection
pagination:
  data: testdata
  size: 2
testdata:
  - item1
  - item2
  - item3
  - item4
---
{% endraw %}{%- endset %}
{{ codeBlock | highlight("yaml") | safe }}

This means that `collections.myCollection` will have only the first page added to the collection array (`_site/my-page/index.html`). However, if you’d like to add all the pagination pages to the collections, use `addAllPagesToCollections: true` to the pagination front matter options like so:

{% codetitle "my-page.md" %}
{%- set codeBlock %}{% raw %}
---
tags:
  - myCollection
pagination:
  data: testdata
  size: 2
  addAllPagesToCollections: true
testdata:
  - item1
  - item2
  - item3
  - item4
---
{% endraw %}{%- endset %}
{{ codeBlock | highlight("yaml") | safe }}

Now `collections.myCollection` will have both output pages in the collection array (`_site/my-page/index.html` and `_site/my-page/1/index.html`).

## Full Pagination Option List

- `data` (String) [Lodash.get path](https://lodash.com/docs/4.17.15#get) to point to the target data set.
- `size` (Number, required)
- `alias` (String) [Lodash.set path](https://lodash.com/docs/4.17.15#set) to point to the property to set.
- `generatePageOnEmptyData` (Boolean) if target data set is empty, render first page with empty chunk `[]`.
- `resolve: values` {% addedin "0.4.0" %}
- `filter` (Array) {% addedin "0.4.0" %}
- `reverse: true` (Boolean) {% addedin "0.7.0" %}
- `addAllPagesToCollections: true` (Boolean) {% addedin "0.8.0" %}

## Related

<div class="youtube-related">
  {%- youtubeEmbed "kUC87Zr0dKg", "Eleventy Build went from 54s to 17s—Pagination Memory/Performance Wins 🏆 (Weekly №10)", "344" -%}
</div>

## From the Community

{% include "11tybundle.njk" %}
