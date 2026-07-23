---
eleventyNavigation:
  parent: Introduction
  key: Starter Projects
  order: 2
---

# Starter Projects

<div class="sites-vert sites-vert--lg">
  <div class="lo-grid" style="--fl-gap-v: 5em; --fl-gap-h: 2vw;">
{%- for site in starters | sortObjectByOrder %}
{%- if site.official %}
{%- set siteData = speedlifyStarters.data[site.demo] or speedlifyStarters.data[site.url] %}
  {% include "site-card.njk" %}
{%- endif %}{%- endfor %}
  </div>
</div>

[Add your own starter project](https://github.com/11ty/docs/tree/main/src/_data/starters). Community contributions are shown in random order.

<div class="sites-vert sites-vert--lg">
  <div class="lo-grid" style="--fl-gap-v: 5em; --fl-gap-h: 2vw;">
{%- for site in starters | sortObjectByOrder %}
{%- if site.disabled != true and site.featured %}
{%- set siteData = speedlifyStarters.data[site.demo] or speedlifyStarters.data[site.url] %}
  {% include "site-card.njk" %}
{%- endif %}{%- endfor %}
{%- for name, site in starters | shuffle %}
{%- if site.disabled != true and not site.official and not site.featured %}
{%- set siteData = speedlifyStarters.data[site.demo] or speedlifyStarters.data[site.url] %}
  {% include "site-card.njk" %}
{%- endif %}{%- endfor %}
  </div>
</div>

## Lists

- [Jamstack Themes](https://jamstackthemes.dev/ssg/eleventy/) A list of starter themes filterable by supported static site generator and CMS.

## Source Code Samples

Be sure to check out a [full list of every Built With Eleventy site that has provided a link to their source code](/docs/samples/).
