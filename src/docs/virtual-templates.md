---
eleventyNavigation:
  parent: Template Languages
  key: Virtual Templates
  order: 10
  excerpt: Create a template or layout that only lives in your configuration file.
---
# Virtual Templates {% addedin "3.0.0-alpha.15" %}

In addition to template files in your input directory, Eleventy can also process virtual templates defined in your configuration file (or plugins). Related [GitHub #1612](https://github.com/11ty/eleventy/issues/1612).

The [RSS plugin offers a virtual template](/docs/plugins/rss.md#virtual-template) to add feeds to your project.

## API

```js
eleventyConfig.addTemplate(virtualPath, content, data = {});
```

* `virtualPath`: used to determine the template language and data cascade for this template. This path is relative to your project’s input directory.
* `content`: usually a string, but maybe JavaScript (if using an `11ty.js` template). Can include front matter if the template language supports it.
* `data`: a data object tied to the template. A little more ergonomic than front matter but functionally the same.

## Example

### Markdown, HTML (via Liquid) Layout

{% set codeContent %}
export default function(eleventyConfig) {
	// Create content templates Files
	eleventyConfig.addTemplate("virtual.md", `# Hello`, {
        	layout: "virtual.html"
	});

	// Works great with Layouts too
	eleventyConfig.addTemplate("_includes/virtual.html", `<!-- Layout -->{% raw %}{{ content }}{% endraw %}`);
};
{% endset %}
{% include "snippets/configDefinition.njk" %}

### JavaScript

Any of the JavaScript shapes on [`11ty.js` templates](/docs/languages/javascript.md) are also supported here.

{% set codeContent %}
export default function(eleventyConfig) {
	// Create content templates Files
	eleventyConfig.addTemplate("virtual.11ty.js", function(data) {
		return `<h1>Hello</h1>`;
	});
};
{% endset %}
{% include "snippets/configDefinition.njk" %}
