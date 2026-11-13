---
eleventyNavigation:
  parent: Starter Projects
  key: Source Code Samples
  order: 1
excludeFromSidebar: true
---
# Source Code Samples

This list shows all of the sample sites that have provided a link to their source code in random order. A [comprehensive list of all sample sites is available](/speedlify/). {% addToSampleSites %}

<table>
  <thead>
    <tr>
      <th>Name</th>
      <th>Added by</th>
      <th style="min-width: 9em">Source Code</th>
    </tr>
  </thead>
  <tbody>
{% for key, site in builtwith | shuffle -%}
{% if site.disabled != true and site.source_url -%}
    <tr>
      <td>{% if site.url %}<a href="{{ site.url }}">{% endif %}{{ site.url | displayUrl }}{% if site.url %}</a>{% endif %}</td>
			<td>{% communityavatar site.opened_by %}</td>
      <td>{% if site.source_url %}<a href="{{ site.source_url }}" class="minilink">Source Code</a>{% endif %}</td>
    </tr>
{% endif -%}
{% endfor -%}
  </tbody>
</table>
