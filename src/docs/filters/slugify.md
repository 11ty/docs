---
eleventyNavigation:
  parent: Filters
  key: slugify Filter
  title: "<code>slugify</code>"
  order: 2
  excerpt: '<code>"My string"</code> to <code>"my-string"</code> for permalinks.'
---

# `slugify` Universal Filter {% addedin "1.0.0" %}

Uses the [`@sindresorhus/slugify` npm package](https://www.npmjs.com/package/@sindresorhus/slugify) to convert a string into a URL slug. Typically used with permalinks. Eleventy 3.0 <!-- 3.0.0-alpha.15 --> [memoizes this filter](/docs/memoize).

{% codetitle "slugify.md" %}
{% raw %}

```yaml
---
title: "My Title"
permalink: "/{{ title | slugify }}/"
---
Outputs to `/my-title/`.
```

{% endraw %}

- [`slug` Universal Filter](/docs/filters/slug/)
- [← Back to Filters documentation](/docs/filters/)

{% callout "info", "md" %}In versions prior to 1.0.0, [the `slug` Universal Filter was used](/docs/filters/slug/). To maintain backwards compatibility moving forward, `slug` is still included and supported but `slugify` is now recommended as best practice—it has better default behavior for URLs with special characters.{% endcallout %}

{% callout "warn", "md" %}`slugify` currently [ignores characters for Japanese, Chinese, and others](https://github.com/sindresorhus/transliterate/issues/1). If you need to slugify these characters, [add your own universal filter](/docs/filters/) with an alternative library like [`limax`](https://github.com/lovell/limax) or [`transliteration`](https://github.com/dzcpy/transliteration). (More context at [Issue #2537](https://github.com/11ty/eleventy/issues/2537)){% endcallout %}

### Changing `slug` to `slugify`

If you’re trying to migrate the content in a pre-1.0 project from using the `slug` filter to the (new in v1.0) `slugify` filter (note: this is optional—you can leave them as-is!), you must take extra care to make sure that any existing URLs don’t change.

The [Upgrade Helper plugin](/docs/plugins/upgrade-help.md) will compare the `slug` and `slugify` versions of your URLs to see if there are any that require extra attention (thank you to Peter deHaan for the assist here!).
