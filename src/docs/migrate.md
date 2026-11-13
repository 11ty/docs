---
eleventyNavigation:
  parent: Eleventy Projects
  key: Importing Content
  order: 0.2
---

# {{ eleventyNavigation.key }}

## Tools

- [`@11ty/import`](https://github.com/11ty/eleventy-import) is a command line tool to import from various data sources as static content files in your project.
	- You can [use `@11ty/import` to import your WordPress blog](/docs/migrate/wordpress/#use-11ty-import)

## Guides

<ul class="list-bare">
{%- for post in collections.migrations %}
	<li><a href="{{ post.url }}">{% if post.data.iconUrl %}{% indieavatar post.data.iconUrl %}{% endif %}{{ post.data.title }}</a></li>
{%- endfor %}
</ul>

## Related

<div class="youtube-related">
  {%- youtubeEmbed "WuH5QYCdh6w", "Start Your Escape from WordPress Using 11ty (in 3 minutes!)" -%}
</div>
