---
pageTitle: Collections (Using Tags)
eleventyNavigation:
  parent: Configure Templates with Data
  key: Collections
  order: 2
  excerpt: Group, reuse, and sort content in interesting ways.
communityLinksKey: collections
overrideCommunityLinks: true
---

{% tableofcontents %}

While [pagination](/docs/pagination/) allows you to iterate over a data set to create multiple templates, a collection allows you to group content in interesting ways. A piece of content can be a part of multiple collections, if you assign the same string value to the `tags` key in the front matter.

Take care to note that `tags` have a singular purpose in Eleventy: to construct collections of content. Some blogging platforms use Tags to refer to a hierarchy of labels for the content (e.g. a [tag cloud](https://en.wikipedia.org/wiki/Tag_cloud)).

## A Blog Example

For a blog site, your individual post files may use a tag called `post`, but it can be whatever you want. In this example, `mypost.md` has a single tag `post`:

{% codetitle "Markdown", "Syntax" %}
{% set codeBlock %}
---
tags: post
title: Hot Take—Social Media is Considered Harmful
---
{% endset %}
{{ codeBlock | highlight("markdown") | safe }}

This will place this `mypost.md` into the `post` collection with all other pieces of content sharing the `post` tag. To reference this collection and make a list of all posts, use the `collections` object in any template:

{% include "snippets/collections/blog.njk" %}

### A note about using `-` in `tags`

If you use `-` in your collection names (e.g. `tags: "post-with-dash"`), remember that some template languages require square bracket notation to reference it in collections. Read more at [Issue #567](https://github.com/11ty/eleventy/issues/567).

{% include "snippets/collections/dashes.njk" %}

### Declare your collections for incremental builds

{% addedin "2.0.0-canary.21" %}Use the `eleventyImport` object to declare any collections you use (data cascade friendly) to inform the relationships for smarter incremental builds. This is an Array of collection names. Read more about [importing collections](https://github.com/11ty/eleventy/issues/975).

{% include "snippets/collections/eleventyimport.njk" %}

### Use an `aria-current` attribute on the current page

Compare the `post.url` and special Eleventy-provided `page.url` variable to find the current page. Building on the previous example:

{% include "snippets/collections/aria.njk" %}

Background: `aria-current="page"` tells assistive technology, such as screen readers, which page of a set of pages is the current active one. It also provides a hook for your CSS styling, using its attribute selector: `[aria-current="page"] {}`.

## The Special `all` Collection

By default Eleventy puts all of your content (independent of whether or not it has any assigned tags) into the `collections.all` Collection. This allows you to iterate over all of your content inside of a template.

### Link to all Eleventy generated content

{% include "snippets/collections/all.njk" %}

## How to Exclude content from Collections

In front matter (or further upstream in the data cascade), set the `eleventyExcludeFromCollections` option to true to opt out of specific pieces of content added to all collections (including `collections.all`, collections set using tags, or collections added from the Configuration API in your config file). Useful for your RSS feed, `sitemap.xml`, custom templated `.htaccess` files, et cetera.

{% codetitle "excluded.md" %}
{%- set codeBlock %}{% raw %}
---
eleventyExcludeFromCollections: true
tags: post
---

This will not be available in `collections.all` or `collections.post`.
{% endraw %}{%- endset %}
{{ codeBlock | highlight("markdown") | safe }}

{% addedin "3.0.0-alpha.1" %} `eleventyExcludeFromCollections` can now also accept an array of tag names:

{%- set codeBlock %}{% raw %}
---
eleventyExcludeFromCollections: ["post"]
---

This will be available in `collections.all` but not `collections.post`.
{% endraw %}{%- endset %}
{{ codeBlock | highlight("markdown") | safe }}

## Add to a Collection using Tags

You can use a single tag, as in the above example OR you can use any number of tags for the content, using YAML syntax for a list.

### A single tag: cat

{%- set codeBlock %}{% raw %}
---
tags: cat
---
{% endraw %}{%- endset %}
{{ codeBlock | highlight("markdown") | safe }}

This content would show up in the template data inside of `collections.cat`.

### Using multiple words in a single tag

{%- set codeBlock %}{% raw %}
---
tags: cat and dog
---
{% endraw %}{%- endset %}
{{ codeBlock | highlight("markdown") | safe }}

If you use multiple words for one tag you can access the content by the following syntax `collections['cat and dog']`.

### Multiple tags, single line

{%- set codeBlock %}{% raw %}
---
tags: ["cat", "dog"]
---
{% endraw %}{%- endset %}
{{ codeBlock | highlight("markdown") | safe }}

This content would show up in the template data inside of `collections.cat` and `collections.dog`.

### Multiple tags, multiple lines

{%- set codeBlock %}{% raw %}
---
tags:
  - cat
  - dog
---
{% endraw %}{%- endset %}
{{ codeBlock | highlight("markdown") | safe }}

This content would show up in the template data inside of `collections.cat` and `collections.dog`.

### Override tags

As of Eleventy 1.0, the [Data Cascade](/docs/data-cascade/) is combined using [deep data merge](/docs/data-deep-merge/) by default, which means tags are merged together with tags assigned higher in the data cascade (the Arrays are combined). To redefine `tags` in the front matter use [the `override:` prefix](/docs/data-deep-merge/#using-the-override-prefix):

{%- set codeBlock %}{% raw %}
---
override:tags: []
---
{% endraw %}{%- endset %}
{{ codeBlock | highlight("markdown") | safe }}

This content would not show up in any of the collections it was added to with `tags` higher up in the data cascade.

## Collection Item Data Structure

{% include "snippets/collections/items.njk" %}

Note in the above example that we output the `post.data.title` value? Similarly, each collection item will have the following data:

- `page`: everything in [Eleventy’s supplied page variable](/docs/data-eleventy-supplied/#page-variable) for this template (including `inputPath`, `url`, `date`, and others). {% addedin "2.0.0-canary.19" %}
- `data`: all data for this piece of content (includes any data inherited from layouts)
- `rawInput`: the raw input of the template (before any processing). This does _not_ include front matter. {% addedin "v3.0.0-alpha.1" %} _(Related: [#1206](https://github.com/11ty/eleventy/issues/1206))_
- `content`: the rendered content of this template. This does _not_ include layout wrappers. {% addedin "2.0.0-canary.19" %}

{%- set codeBlock %}
{
  page: {
    inputPath: './test1.md',
    url: '/test1/',
    date: new Date(),
    // … and everything else in Eleventy’s `page`
  },
  data: { title: 'Test Title', tags: ['tag1', 'tag2'], date: 'Last Modified', /* … */ },
  content: '<h1>Test Title</h1>\n\n<p>This is text content…',

  // Available in {{ "3.0.0-alpha.1" | coerceVersion }} and newer:
{% raw %}  rawInput: '<h1>{{ title }}</h1>\n\n<p>This is text content…',{% endraw %}
}
{%- endset %}
{{ codeBlock | highlight("json") | safe }}

_Backwards compatibility notes:_

- Top level properties for `inputPath`, `fileSlug`, `outputPath`, `url`, `date` are still available, though use of `page.*` {% addedin "2.0.0-canary.19" %} for these is encouraged moving forward.
- `content` {% addedin "2.0.0-canary.19" %} is aliased to the previous property `templateContent`.

You can [view the previous Collection Item Data Structure docs for 1.0](https://v1-0-2.11ty.dev/docs/collections/#collection-item-data-structure).

## Sorting

The default collection sorting algorithm sorts in ascending order using:

1. The input file’s Created Date (you can override using `date` in front matter, as shown below)
2. Files created at the exact same time are tie-broken using the input file’s full path including filename

For example, assume I only write blog posts on New Years Day:

{%- set codeBlock %}{% raw %}
posts/postA.md (created on 2008-01-01)
posts/postB.md (created on 2008-01-01)
posts/post3.md (created on 2007-01-01)
another-posts/post1.md (created on 2011-01-01)
{% endraw %}{%- endset %}
{{ codeBlock | highlight("text") | safe }}

This collection would be sorted like this:

1. `posts/post3.md`
2. `posts/postA.md`
3. `posts/postB.md`
4. `another-posts/post1.md`

### Sort descending

To sort descending in your template, you can use a filter to reverse the sort order. For example, it might look like this:

{% include "snippets/collections/sort.njk" %}

### Do not use Array `reverse()`

{% callout "pitfall" %}
<p id="array-reverse">You should <em><strong>not</strong></em> use Array <code>reverse()</code> on collection arrays in your templates, like so:</p>
<p><code>{%raw %}{%- for post in collections.post.reverse() -%}{% endraw %}</code></p>
<p>This will <a href="https://doesitmutate.xyz/reverse/">mutate the array</a> and re-order it <em>in-place</em> and will have side effects for any use of that collection in other templates.</p>
<p>This is a <a href="/docs/pitfalls/"><strong>Common Pitfall</strong></a>.</p>
{% endcallout %}

This applies any time you use <code>reverse</code>, for example in a custom shortcode:

{% set codeContent %}
export default function ($config) {
	$config.addShortcode("myShortcode", function (aCollection){
	  // WARNING
	  aCollection.reverse();
	})
};
{% endset %}
{% include "snippets/configDefinition.njk" %}

Instead of `reverse` use:

* <a href="https://doesitmutate.xyz/toreversed/">JavaScript’s <code>.toReversed()</code> method</a> (Node 20+)
* Create your own new array using <a href="https://doesitmutate.xyz/toreversed/">JavaScript <code>.filter(entry => entry).reverse()</code></a>
* <a href="https://liquidjs.com/filters/reverse.html">Liquid’s <code>reverse</code> filter</a>
* <a href="https://mozilla.github.io/nunjucks/templating.html#reverse">Nunjucks’ <code>reverse</code> filter</a>

### Overriding Content Dates

You can modify how a piece of content is sorted in a collection by changing its default `date`. [Read more at Content Dates](/docs/dates/).

{%- set codeBlock %}{% raw %}
---
date: 2016-01-01
---
{% endraw %}{%- endset %}
{{ codeBlock | highlight("markdown") | safe }}

## Advanced: Custom Filtering and Sorting

This part of the docs has moved to its own page: [Collections API](/docs/collections-api.md)

## From the Community

{% include "community-contributed.njk" %}

{% include "11tybundle.njk" %}
