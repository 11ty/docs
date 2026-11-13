---
eleventyNavigation:
  parent: Filters
  key: slug Filter
  title: "<code>slug</code>"
  order: 2.1
  excerpt: 'Similar to but deprecated in favor of <code>slugify</code>'
excludeFromSidebar: true
---
# `slug` Universal Filter

{% callout "warn", "md" %}Starting in Eleventy v1.0.0 it is recommended to use [the `slugify` Universal Filter](/docs/filters/slugify/) instead of `slug`. For backwards compatibility, `slug` is still included and supported but `slugify` has better default behavior for URLs with special characters. **If you want to swap `slug` to `slugify` wholesale in old projects, please [read this warning about breaking URLs](/docs/filters/slugify/#changing-slug-to-slugify). Be careful!**{% endcallout %}

Uses the [`slugify` npm package](https://www.npmjs.com/package/slugify) to convert a string into a URL slug. Can be used in pagination or permalinks.

{% codetitle "slug.md" %}
{% raw %}

```yaml
---
title: "My Title"
permalink: "/{{ title | slug }}/"
---
Outputs to `/my-title/`.
```

{% endraw %}

- [`slugify` Universal Filter](/docs/filters/slugify/)
- [← Back to Filters documentation.](/docs/filters/)
