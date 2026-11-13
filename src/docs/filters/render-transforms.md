---
eleventyNavigation:
  parent: Filters
  key: renderTransforms Filter
  title: "<code>renderTransforms</code>"
  excerpt: "Render project transforms on an arbitrary block of content."
excludeFromSidebar: true
---

# `renderTransforms` Universal Filter

{% addedin "v3.0.0-alpha.11" %}**It’s unlikely you’ll need to use this filter!**

[Transforms](/docs/transforms/) are applied for you automatically as part of Eleventy’s pipeline. However, (as an example) transforms limited to `html` files are not applied in other contexts (e.g. an RSS `.xml`, Atom `.xml`, or JSON feed `.json`).

The `renderTransforms` filter is used in [the RSS plugin (v2.0 or newer)](/docs/plugins/rss/#virtual-template). You can find **sample usage** of this filter on the [RSS plugin feed examples](/docs/plugins/rss/#sample-feed-templates).

_More background at [GitHub issue #3294](https://github.com/11ty/eleventy/issues/3294)._

---

[← Back to Filters documentation.](/docs/filters/)
