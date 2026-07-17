---
eleventyNavigation:
  parent: Advanced
  key: Release History
  pinned: true
---
# Release History

{% callout "info", "Eleventy and Build Awesome" %}
You may see **11ty** or **Eleventy** mentioned and you might be asking yourself: what is the [difference between **Build Awesome** and Eleventy](/blog/build-awesome/)?
{% endcallout %}

<table>
  <thead>
    <tr>
      <th>Name</th>
      <th>Version</th>
			<th>URL</th>
			<th>Status</th>
			<th>Year</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Build Awesome</td>
      <td><code>v4</code></td>
      <td><a href="https://build.awesome.me/docs/"><code>build.awesome.me</code></a></td>
      <td>Pre-release</td>
			<td>2025+</td>
    </tr>
    <tr>
      <td>Eleventy</td>
      <td><code>v3</code></td>
      <td><a href="https://www.11ty.dev/docs/"><code>www.11ty.dev</code></a></td>
      <td>Stable, Latest</td>
			<td>2023+</td>
    </tr>
    <tr>
      <td>Eleventy</td>
      <td><code>v2</code></td>
      <td><a href="https://v2.11ty.dev/docs/"><code>v2.11ty.dev</code></a></td>
      <td>Legacy</td>
			<td>2023</td>
    </tr>
    <tr>
      <td>Eleventy</td>
      <td><code>v1</code></td>
      <td><a href="https://v1.11ty.dev/docs/"><code>v1.11ty.dev</code></a></td>
      <td>Legacy</td>
			<td>2021–2022</td>
    </tr>
    <tr>
      <td>Eleventy</td>
      <td><code>v0</code></td>
      <td><a href="https://v0.11ty.dev/docs/"><code>v0.11ty.dev</code></a></td>
      <td>Legacy</td>
			<td>2017–2021</td>
    </tr>
  </tbody>
</table>

You can also browse the latest releases on:
- [<i class="fa-brands fa-npm"></i>`npm`](https://www.npmjs.com/package/@11ty/eleventy?activeTab=versions)
- [GitHub](https://github.com/11ty/eleventy/releases).
- [`npmx`](https://npmx.dev/package/@11ty/eleventy)
- [`node-modules.dev`](https://node-modules.dev/grid/depth#install=@11ty/eleventy)
- [`socket.dev`](https://socket.dev/npm/package/@11ty/eleventy)

## Full Release History

_×{{ versions.length }} releases total since [November 26, 2017](https://github.com/11ty/eleventy/commit/00ad9192605d5d501de6aae193701c5a2297ef2c)_

<table>
  <thead>
    <tr>
      <th>Version</th>
      <th>Docs</th>
			<th>Date</th>
      <th>More…</th>
    </tr>
  </thead>
  <tbody>
{%- for v in versions %}
{%- set releaseInfo = githubReleases[ v.tag | normalizeVersion ] %}
    <tr>
      <td><code>{{ v.tag }}</code>{% if v.prerelease %} <span class="minilink">Prerelease</span>{% endif %}</td>
			<td>{% if not v.prerelease and not v.tagOnly %}<a href="{{ v.docs_url }}"><strong>Docs</strong></a>{% endif %}</td>
			<td>{% if releaseInfo.date %}<em>{{ releaseInfo.date | newsDate("yyyy LLL dd") }}</em>{% endif %}</td>
			<td>{% if not v.ignore_release_notes %}<a href="https://github.com/11ty/eleventy/releases/tag/{{ v.tag }}">{% if v.tagOnly %}GitHub Tag{% else %}GitHub Release{% endif %}</a>{% endif %}</td>
    </tr>
{%- endfor -%}
  </tbody>
</table>