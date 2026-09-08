---
eleventyNavigation:
  parent: Introduction
  key: Starter Projects
  order: 2
---

# Starter Projects

## Official Starters

<div class="sites-vert sites-vert--lg">
  <ul class="lo-grid" style="--fl-gap-v: 5em;">
{%- for site in starters | sortObjectByOrder %}
{%- if site.official %}
	{% set showSpeedlifyScores = true %}
  <li>{% include "site-card.njk" %}</li>
{%- endif %}{%- endfor %}
  </ul>
</div>

## Community Starters

[Add your own starter project](https://github.com/11ty/docs/tree/main/src/_data/starters). Community contributions are shown in random order.

<div class="sites-vert sites-vert--lg">
  <ul class="lo-grid" style="--fl-gap-v: 5em;">
{%- for site in starters | sortObjectByOrder %}
{%- if site.disabled != true and site.featured %}
	{% set showSpeedlifyScores = true %}
  <li>{% include "site-card.njk" %}</li>
{%- endif %}{%- endfor %}
{%- for name, site in starters | shuffle %}
{%- if site.disabled != true and not site.official and not site.featured %}
	{% set showSpeedlifyScores = true %}
  <li>{% include "site-card.njk" %}</li>
{%- endif %}{%- endfor %}
  </ul>
</div>

## Lists

- [Jamstack Themes](https://jamstackthemes.dev/ssg/eleventy/) A list of starter themes filterable by supported static site generator and CMS.

## Source Code Samples

Be sure to check out a [full list of every Built With Eleventy site that has provided a link to their source code](/docs/samples/).
