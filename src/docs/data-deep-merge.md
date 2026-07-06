---
eleventyNavigation:
  parent: Data Cascade
  key: Data Deep Merge
excludeFromSidebar: true
removedFeature: true
---
# Data Deep Merge {% addedin "0.6.0" %}

{% tableofcontents %}

{% callout "error", "md-block", "Feature Removed" %}This feature was removed in Eleventy v4.0. Read more at [GitHub Issue #3937](https://github.com/11ty/eleventy/issues/3937) (originally inspired by [GitHub Issue #147](https://github.com/11ty/eleventy/issues/147)).{% endcallout %}

Feel free to [head over to the previous Eleventy version of the docs for this documentation](https://v2.11ty.dev/docs/data-deep-merge/). Historically, it may be important to remember that the default for this feature was changed to `true` in [Eleventy v1](https://github.com/11ty/eleventy/releases/tag/v1.0.0).

{% set codeContent %}
export default function ($config) {
	// throws an error in Eleventy v4
	$config.setDataDeepMerge(false);

	// is a no-op in Eleventy v4
	$config.setDataDeepMerge(true);
};
{% endset %}
{% include "snippets/configDefinition.njk" %}

## Using the `override:` prefix

The `override:` prefix in the Data Cascade is still available! Read more [about `override:` on the Data Cascade documentation](/docs/data-cascade/#using-the-override-prefix).