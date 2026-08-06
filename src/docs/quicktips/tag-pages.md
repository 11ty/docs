---
tiptitle: "Zero Maintenance Tag Pages for your Blog"
date: 2018-06-08
tags: ["related-pagination"]
---

This quick tip will show you how to automatically generate Tag Pages (lists of content tagged into a collection).

We’ll use pagination to automatically generate a template for each tag we want to link to.

Here’s a sample pagination template using Nunjucks:

{% raw %}

```markdown
---
pagination:
  data: collections
  size: 1
  alias: tag
permalink: /tags/{{ tag }}/
---

<h1>Tagged “{{ tag }}”</h1>

<ol>
{% set taglist = collections[ tag ] %}
{% for post in taglist | reverse %}
  <li><a href="{{ post.url }}">{{ post.data.title }}</a></li>
{% endfor %}
</ol>
```

{% endraw %}

First up notice how we’re pointing our `pagination` to iterate over `collections`, which is an object keyed with tag names pointing to the collection of content containing that tag.

Consider these two sample markdown posts, one using a `tech` tag and one using a `personal` tag:

```markdown
---
title: My First Post
tags:
  - tech
---
```

```markdown
---
title: My Second Post
tags:
  - personal
---
```

Our pagination template above will now generate two pages: `/tags/personal/index.html` and `/tags/tech/index.html`.

The great thing here is that we don’t have to manage our tag list in a central place. These tags can be littered throughout our content and individual tag pages will be created automatically.

## Filtering / Excluding

Have a tag you’d like to exclude from this list? Use [pagination filtering](/docs/pagination/#filtering-values) like this:

{% raw %}

```markdown
---
pagination:
  data: collections
  size: 1
  alias: tag
  filter:
    - tech
permalink: /tags/{{ tag }}/
---
```

{% endraw %}

Now Eleventy will only generate a `/tags/personal/` template and `tech` will be ignored.

## Include all Tag Pages in the `all` Collection

By default, only the first page generated with pagination will be added to the `all` collection. Ordinarily, this is not a problem, but with how we are using pagination in this unconventional manner to generate Tag Pages, you will likely want each Tag Page to be added to the `all` collection (very helpful to later generate a sitemap.xml file). Pages must opt-in to change this behavior by setting `addAllPagesToCollections` to `true` like this:

{% raw %}
```markdown
---
pagination:
  addAllPagesToCollections: true
  data: collections
  size: 1
  alias: tag
  filter:
    - tech
permalink: /tags/{{ tag }}/
---
```
{% endraw %}

## In Practice

This is currently in use on the [`eleventy-base-blog` sample project](https://github.com/11ty/eleventy-base-blog). Check out source code in the [`tags.njk` template](https://github.com/11ty/eleventy-base-blog/blob/main/content/tags.njk) and [see a live demo](https://demo-base-blog.11ty.dev/tags/another-tag/).
