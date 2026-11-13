---
eleventyNavigation:
  key: Community Plugins
  order: 99
  parent: Plugins
---

# Community Contributed Plugins

[**See all `eleventy-plugin` packages on `npm`**](https://www.npmjs.com/search?q=eleventy-plugin). The rest have been added to this site by our community (and are listed in random order). [Add your own](https://github.com/11ty/docs/tree/main/src/_data/plugins#readme)!

{%- for name, plugin in plugins | shuffle %}
{%- set url = plugin.url or "https://www.npmjs.com/package/" + plugin.npm %}
- [{% if plugin.deprecated %}~~{% endif %}{{ plugin.npm }}{% if plugin.deprecated %}~~{% endif %}]({{ url }}){% if plugin.description %} {% if plugin.deprecated %}~~{% endif %}{{ plugin.description }}{% if plugin.deprecated %}~~{% endif %}{% endif %} {{ plugin.deprecated }} {% authorLink builtwithAuthors, plugin.author %}
{%- endfor %}
- [Add your own](https://github.com/11ty/docs/tree/main/src/_data/plugins#readme)!
