---
eleventyNavigation:
  parent: Filters
  key: Next or Previous Collection Item Filters
  title: "<code>get*CollectionItem</code>"
  order: 4
  excerpt: "Get next or previous collection items for easy linking."
---

# Get Next or Previous Collection Item Universal Filters

## `getPreviousCollectionItem` and `getNextCollectionItem` {% addedin "0.11.0" %}

Fetch the previous and next items in a collection when you pass in the current `page` object.

{% tabs "nextprev", { missing: "js,cjs", load: "none" } %}
```liquid liquid
{% raw %}{% assign previousPost = collections.posts | getPreviousCollectionItem: page %}
{% assign nextPost = collections.posts | getNextCollectionItem: page %}{% endraw %}

<!-- in {{ "2.0.0-beta.1" | coerceVersion }} the page argument is optional -->
{% raw %}{% assign previousPost = collections.posts | getPreviousCollectionItem %}
{% assign nextPost = collections.posts | getNextCollectionItem %}{% endraw %}
```

```jinja2 njk
{% raw %}{% set previousPost = collections.posts | getPreviousCollectionItem(page) %}
{% set nextPost = collections.posts | getNextCollectionItem(page) %}{% endraw %}

<!-- in {{ "2.0.0-beta.1" | coerceVersion }} the page argument is optional -->
{% raw %}{% set previousPost = collections.posts | getPreviousCollectionItem %}
{% set nextPost = collections.posts | getNextCollectionItem %}{% endraw %}
```
{% endtabs %}

Useful when you’d like to link to the previous or next template in your collection:

{% tabs "nextprevlink", { missing: "js,cjs" } %}
{% raw %}
```liquid liquid
{% if previousPost %}Previous Blog Post: <a href="{{ previousPost.url }}">{{ previousPost.data.title }}</a>{% endif %}
{% if nextPost %}Next Blog Post: <a href="{{ nextPost.url }}">{{ nextPost.data.title }}</a>{% endif %}
```

```jinja2 njk
{% if previousPost %}Previous Blog Post: <a href="{{ previousPost.url }}">{{ previousPost.data.title }}</a>{% endif %}
{% if nextPost %}Next Blog Post: <a href="{{ nextPost.url }}">{{ nextPost.data.title }}</a>{% endif %}
```
{% endraw %}
{% endtabs %}

The [Collections documentation](/docs/collections/#sorting) outlines the default sorting algorithm and how to override it.

## `getCollectionItemIndex` {% addedin "2.0.0-canary.19" %}

The `getCollectionItemIndex` filter returns the 0-based numeric index of the current (or passed) page in the collection.

{% tabs "getitemindex", { missing: "js,cjs" } %}
{% raw %}
```liquid liquid
{% assign index = collections.posts | getCollectionItemIndex %}

Or pass it in:
{% assign index = collections.posts | getCollectionItemIndex: page %}
```

```jinja2 njk
{% set index = collections.posts | getCollectionItemIndex %}

Or pass it in:
{% set index = collections.posts | getCollectionItemIndex(page) %}
```
{% endraw %}
{% endtabs %}

## `getCollectionItem`

For completeness, a `getCollectionItem` filter is also included that fetches the current page from a collection.

{% tabs "getitem", { missing: "js,cjs" } %}
```liquid liquid
{% raw %}{% assign currentPost = collections.posts | getCollectionItem: page %}{% endraw %}

<!-- in {{ "2.0.0-beta.1" | coerceVersion }} the page argument is optional -->
{% raw %}{% assign currentPost = collections.posts | getCollectionItem %}{% endraw %}
```

```jinja2 njk
{% raw %}{% set currentPost = collections.posts | getCollectionItem(page) %}{% endraw %}

<!-- in {{ "2.0.0-beta.1" | coerceVersion }} the page argument is optional -->
{% raw %}{% set currentPost = collections.posts | getCollectionItem %}{% endraw %}
```
{% endtabs %}

- [← Back to Filters documentation.](/docs/filters/)
