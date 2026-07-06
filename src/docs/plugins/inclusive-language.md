---
eleventyNavigation:
  key: Inclusive Language
  # title: '<i class="fa-solid fa-handshake-angle"></i>Inclusive Language'
  order: 4
  excerpt: A plugin to check for inclusive language in markdown files.
excludeFromSidebar: true
---

# Inclusive Language Plugin

{% tableofcontents %}

An Eleventy linter plugin to check for inclusive language in markdown files. Inspired by [_CSS Tricks’ Words to Avoid in Educational Writing_](https://css-tricks.com/words-avoid-educational-writing/). No browser/client JavaScript here—everything is this plugin is done at build-time.

- [GitHub](https://github.com/11ty/eleventy-plugin-inclusive-language).

<style>
.demo-linter-first {
  color: yellow;
}
</style>

{% callout "demo" %}

<pre><code><span class="demo-linter-first">Inclusive Language Linter (./docs/quicktips/concatenate.md):</span>
    be modified, <u>of course</u>, to capture multiple
    <u>Of course</u>, Eleventy has no desire to re
    This is <u>just</u> a super simple example if you
    build pipeline. That’s an <u>easy</u> way to concatenate
</code></pre>

{% endcallout %}

## Installation

Available on [npm](https://www.npmjs.com/package/@11ty/eleventy-plugin-inclusive-language).

```
npm install @11ty/eleventy-plugin-inclusive-language
```

Open up your Eleventy config file (probably `buildawesome.config.js`) and use `addPlugin`:

{% set codeContent %}
import inclusiveLangPlugin from "@11ty/eleventy-plugin-inclusive-language";

export default function ($config) {
	$config.addPlugin(inclusiveLangPlugin);
};
{% endset %}
{% include "snippets/configDefinition.njk" %}

{% callout "info", "md" %}You’re only allowed one `module.exports` in your configuration file, so make sure you only copy the `require` and the `addPlugin` lines above!{% endcallout %}

### Options

Optionally pass in an options object as the second argument to `addPlugin` to further customize this plugin.

{% set codeContent %}
import inclusiveLangPlugin from "@11ty/eleventy-plugin-inclusive-language";

export default function ($config) {
	$config.addPlugin(inclusiveLangPlugin, {
		templateFormats: ["md"], // default, add more file extensions here

		// accepts an array or a comma-delimited string
		words:
			"simply,obviously,basically,of course,clearly,just,everyone knows,however,easy",
	});
};
{% endset %}
{% include "snippets/configDefinition.njk" %}
