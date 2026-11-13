---
eleventyNavigation:
  key: Configuration Shapes
  parent: Configuration
excludeFromSidebar: true
---
# Configuration Shapes

You can learn more about the [default file names for configuration files](/docs/config.md#default-filenames).

## Callback Function

**Callback functions are the preferred method** for configuration files and allow you further customization options using Eleventy’s full Configuration API helper methods.

{% addedin "3.0.0-alpha.1" %}Support for ESM and Asynchronous callbacks was added in Eleventy v3.0.

{% include "snippets/config/config-shape-callback-export.njk" %}

### Optional: Return Object

Instead of exporting a `config` object with your static options, you _can_ return this same object in your configuration callback (though it is **not preferred** for order-of-operations reasons).

{% set codeContent %}
export default async function(eleventyConfig) {
	return {
    dir: {
      input: "views",
      output: "dist"
    }
  };
};
{% endset %}
{% include "snippets/configDefinition.njk" %}

## Export Default Object

You _can_ export your static options as the top level default export too, though configuration **[callback functions](#callback-function) are preferred** as they allow you to access the full Configuration API.

{% set codeContent %}
export default {
	dir: {
		input: "views"
	}
}
{% endset %}
{% include "snippets/configDefinition.njk" %}