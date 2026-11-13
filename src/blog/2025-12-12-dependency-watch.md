---
newstitle: Eleventy Core Dependency Watch (2025 Edition)
---
In our quest for smoother long term maintenance and hardened [security footprint](/blog/npm-security/), we wanted to let folks know that we’ve made even more exciting dependency simplification improvements on the [v4 canary prereleases](https://github.com/11ty/eleventy/releases/tag/v4.0.0-alpha.6)!

Notably when comparing `v4.0.0-alpha.6` to `v3.1.2`, we’ve:

- Reduced our total dependency count from `134` to `105` (<code class="numeric-down numeric-good">21.6%</code>)
- Dropped third-party dependency count from `123` to `89` (<code class="numeric-down numeric-good">27.6%</code>)
- Decreased `node_modules` weight from `21 MiB` to `14 MiB`  (<code class="numeric-down numeric-good">33.3%</code>)

## Full History

Here’s how things have looked over the full length of the project:

<table>
	<thead>
		<tr>
			<th>Version</th>
			<th><abbr title="Dependencies">Deps</abbr> (3rd-party)</th>
			<th class="numeric">Change</th>
			<th><code>node_modules</code> Size</th>
			<th class="numeric">Change</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td><code>v0.2.0</code> (2018 January) <em>First npm release!</em></td>
			<td><code>×401</code> (<code>400</code>)</td>
			<td class="numeric">-</td>
			<td><code>51 MiB</code></td>
			<td class="numeric">-</td>
		</tr>
		<tr>
			<td><code>v0.12.1</code> (2021 March)</td>
			<td><code>×362</code> (<code>360</code>)</td>
			<td class="numeric numeric-down numeric-good">9.7%</td>
			<td><code>68 MiB</code></td>
			<td class="numeric numeric-up numeric-bad">33.3%</td>
		</tr>
		<tr>
			<td><code>v1.0.2</code> (2022 August)</td>
			<td><code>×360</code> (<code>357</code>)</td>
			<td class="numeric numeric-down numeric-good">0.5%</td>
			<td><code>71 MiB</code></td>
			<td class="numeric numeric-up numeric-bad">4.4%</td>
		</tr>
		<tr>
			<td><code>v2.0.1</code> (2023 March)</td>
			<td><code>×213</code> (<code>208</code>)</td>
			<td class="numeric numeric-down numeric-good">40.8%</td>
			<td><code>35 MiB</code></td>
			<td class="numeric numeric-down numeric-good">50.7%</td>
		</tr>
		<tr>
			<td><code>v3.0.0</code> (2024 October)</td>
			<td><code>×187</code> (<code>174</code>)</td>
			<td class="numeric numeric-down numeric-good">12.2%</td>
			<td><code>27 MiB</code></td>
			<td class="numeric numeric-down numeric-good">22.8%</td>
		</tr>
		<tr>
			<td><code>v3.1.2</code> (2025 June)</td>
			<td><code>×134</code> (<code>123</code>)</td>
			<td class="numeric numeric-down numeric-good">28.3%</td>
			<td><code>21 MiB</code></td>
			<td class="numeric numeric-down numeric-good">22.2%</td>
		</tr>
		<tr>
			<td><a href="https://github.com/11ty/eleventy/releases/tag/v4.0.0-alpha.5"><code>v4.0.0-alpha.1</code></a> (2025 July)</td>
			<td><code>×130</code> (<code>116</code>)</td>
			<td class="numeric numeric-down numeric-good">2.9%</td>
			<td><code>16 MiB</code></td>
			<td class="numeric numeric-down numeric-good">23.8%</td>
		</tr>
		<tr>
			<td><a href="https://github.com/11ty/eleventy/releases/tag/v4.0.0-alpha.6"><code>v4.0.0-alpha.6</code></a> (2025 December)</td>
			<td><code>×105</code> (<code>89</code>)</td>
			<td class="numeric numeric-down numeric-good">19.2%</td>
			<td><code>14 MiB</code></td>
			<td class="numeric numeric-down numeric-good">12.5%</td>
		</tr>
	</tbody>
</table>

- Numbers were compiled via fresh install of Eleventy core in a new directory (with `npm@11.7.0` and Node `v24.11.1`).
- `npm ls --omit=dev --all --parseable | wc -l` provided the dependency count (minus one for the root directory).
- `node_modules` folder sizes via `du -m node_modules`.