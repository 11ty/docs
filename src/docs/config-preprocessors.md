---
eleventyNavigation:
  parent: Template Features
  key: Preprocessors
  title: Preprocess Content
  excerpt: Use preprocessors to intercept and modify content (in-memory) before Eleventy builds.
  order: 0.1
---

# Preprocessors {% addedin "3.0.0-alpha.17" %}

{% tableofcontents %}

The Preprocessor Configuration API allows you to intercept and modify the content in template files (_not_ [Layouts](/docs/layouts.md)) before they’re processed and rendered by Eleventy.

{% set codeContent %}
export default function ($config) {
  $config.addPreprocessor("drafts", "njk,md,liquid", (data, content) => {
		if(data.draft) {
			// Ignore this file.
			return false;
		}

		// You can also modify the raw input of the template here too, be careful!
		return `${content}<!-- Template file: {% raw %}{{ page.inputPath }}{% endraw %} -->`;

		// If you return nothing or `undefined`, no changes will be made to this template.
	});
};
{% endset %}
{% include "snippets/configDefinition.njk" %}

* The first argument is an arbitrary `name` (`String`) used for error messaging.
* The second argument can be:
	* a `String` of comma separated file extensions
	* an `Array<String>` of file extensions
* Returning `false` will ignores the template in the same way as using [`$config.ignores` or `.eleventyignore`](/docs/ignores.md)
* Returning nothing or `undefined` has no effect (unlike [Transforms](/docs/transforms.md))

_Originally [GitHub Issue #188](https://github.com/11ty/eleventy/issues/188#issuecomment-2224060755)._

## Example: Drafts

Here’s an example that uses the Preprocessor API to implement a Drafts workflow.

Set `draft: true` anywhere in a file’s [data cascade](/docs/data-cascade/) and that file will be _only_ be built when using Eleventy in `--serve` or `--watch` modes. It will be excluded from full Eleventy builds.

You might imagine how this could be extended to add a publishing date feature too: to exclude content from builds before a specific date set in a post’s front matter (or elsewhere in the data cascade).

{% set codeContent %}
export default function ($config) {
  $config.addPreprocessor("drafts", "*", (data, content) => {
		if(data.draft && process.env.ELEVENTY_RUN_MODE === "build") {
			return false;
		}
	});
};
{% endset %}
{% include "snippets/configDefinition.njk" %}