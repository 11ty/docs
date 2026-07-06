---
eleventyNavigation:
  key: Directory Output
  # title: '<i class="fa-solid fa-folder-open"></i>Directory Output'
  order: 3.2
  excerpt: A plugin to group and sort console output by directory, with file size and benchmarks.
excludeFromSidebar: true
---

# Directory Output

{% tableofcontents %}

Group and sort Eleventy’s verbose output by directory (and show file size with benchmarks). View the [source code on GitHub](https://github.com/11ty/eleventy-plugin-directory-output).

## Installation

- Compatible with Build Awesome/Eleventy 1.0.0 and newer.
- [`eleventy-plugin-directory-output` on npm](https://www.npmjs.com/package/@11ty/eleventy-plugin-directory-output)

```
npm install @11ty/eleventy-plugin-directory-output
```

Open up your Build Awesome config file (probably `buildawesome.config.js`) and use `addPlugin`:

{% set codeContent %}
import dirOutputPlugin from "@11ty/eleventy-plugin-directory-output";

export default function ($config) {
	$config.setQuietMode(true);
	$config.addPlugin(dirOutputPlugin);
};
{% endset %}
{% include "snippets/configDefinition.njk" %}

{% callout "info", "md" %}You’re only allowed one `module.exports` in your configuration file, so make sure you only copy the `require` and the `addPlugin` lines above!{% endcallout %}

Read more about [Eleventy plugins.](/docs/plugins/)

## Options

{% set codeContent %}
import dirOutputPlugin from "@11ty/eleventy-plugin-directory-output";

export default function ($config) {
	$config.setQuietMode(true);
	$config.addPlugin(dirOutputPlugin, {
		// Customize columns
		columns: {
			filesize: true, // Use `false` to disable
			benchmark: true, // Use `false` to disable
		},

		// Will show in yellow if greater than this number of bytes
		warningFileSize: 400 * 1000,
	});
};
{% endset %}
{% include "snippets/configDefinition.njk" %}

{% callout "info", "md" %}The `benchmark` column is only compatible with Eleventy 1.0.1 or newer.{% endcallout %}

## Sample Output

{% callout "demo" %}

```bash
> eleventy-base-blog@6.0.0 build
> eleventy

↘ _site/                               --                           --       --
  → about/index.html                   about/index.md            1.8kB    2.7ms
  ↘ feed/                              --                           --       --
    • .htaccess                        feed/htaccess.njk         0.1kB    0.2ms
    • feed.json                        feed/json.njk           106.8kB   17.3ms
    • feed.xml                         feed/feed.njk           109.8kB    9.8ms
  → page-list/index.html               page-list.njk             3.2kB    1.1ms
  ↘ posts/                             --                           --       --
    → firstpost/index.html             posts/firstpost.md        3.5kB    1.0ms
    → fourthpost/index.html            posts/fourthpost.md     101.0kB   27.2ms
    → secondpost/index.html            posts/secondpost.md       3.2kB    5.6ms
    → thirdpost/index.html             posts/thirdpost.md        4.5kB    7.5ms
    • index.html                       archive.njk               3.0kB   13.7ms
  ↘ tags/                              --                           --       --
    → another-tag/index.html           tags.njk                  2.1kB    0.9ms
    → number-2/index.html              tags.njk                  2.1kB    0.4ms
    → posts-with-two-tags/index.html   tags.njk                  2.3kB    0.2ms
    → second-tag/index.html            tags.njk                  2.5kB    0.5ms
    • index.html                       tags-list.njk             2.0kB    0.4ms
  • 404.html                           404.md                    1.9kB    0.4ms
  • index.html                         index.njk                 2.8kB    1.7ms
  • sitemap.xml                        sitemap.xml.njk           1.4kB    1.3ms
[11ty] Copied 3 files / Wrote 18 files in 0.16 seconds (8.9ms each, v1.0.1)
```

{% endcallout %}
