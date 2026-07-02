---
eleventyNavigation:
  parent: Advanced
  key: Release History
  pinned: true
---
# Release History

You can also browse the latest releases on:
- [<i class="fa-brands fa-npm"></i>`npm`](https://www.npmjs.com/package/@11ty/eleventy?activeTab=versions)
- [GitHub](https://github.com/11ty/eleventy/releases).
- [`npmx`](https://npmx.dev/package/@11ty/eleventy)
- [`node-modules.dev`](https://node-modules.dev/grid/depth#install=@11ty/eleventy)
- [`socket.dev`](https://socket.dev/npm/package/@11ty/eleventy)

## Major Branches

<ul>
	<li><a href="https://build.awesome.me/docs/"><code>build.awesome.me</code> for <code>v4</code> (Currently in alpha)</li>
	<li><a href="https://www.11ty.dev/docs/"><code>www.11ty.dev</code></a> for <code>v3</code> (Latest Stable)</li>
	<li><a href="https://v2.11ty.dev/docs/"><code>v2.11ty.dev</code></a></li>
	<li><a href="https://v1.11ty.dev/docs/"><code>v1.11ty.dev</code></a></li>
	<li><a href="https://v0.11ty.dev/docs/"><code>v0.11ty.dev</code></a></li>
</ul>

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