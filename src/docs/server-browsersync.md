---
eleventyNavigation:
  key: Browsersync
  parent: Watch and Serve
excludeFromSidebar: true
---

# Browsersync

{% tableofcontents %}

{% callout "info", "md" -%}
Starting with Eleventy 2.0, the [Eleventy Dev Server](/docs/dev-server/) is now the default stock development server in Eleventy core. This section of documentation only applies to Eleventy 1.x and 0.x and will be removed when Eleventy 2.0 is stable. If you want to use Browsersync with Eleventy 2.0, learn how to swap [back to Browsersync](/docs/dev-server/#swap-back-to-browsersync).
{%- endcallout %}

### Override Browsersync Server Options {% addedin "0.7.0" %}

Useful if you want to change or override the default Browsersync configuration. Find the Eleventy defaults in [`EleventyServe.js`](https://github.com/11ty/eleventy/blob/master/src/EleventyServe.js). Take special note that Eleventy does not use Browsersync’s watch options and trigger reloads manually after our own internal watch methods are complete. See full options list on the [Browsersync documentation](https://browsersync.io/docs/options).

{% set codeContent %}
export default function($config) {
	$config.setBrowserSyncConfig({
		notify: true,
	});
};
{% endset %}
{% include "snippets/configDefinition.njk" %}

### Opt-out of the Browsersync JavaScript snippet {% addedin "1.0.0" %}

New in [`browser-sync@2.27.1`](https://github.com/BrowserSync/browser-sync/issues/1882#issuecomment-867767056) {% addedin "1.0.0" %}. Opt-out of the JavaScript snippet normally injected by Browsersync. This disables Browsersync live-reloading.

{% set codeContent %}
export default function($config) {
	$config.setBrowserSyncConfig({
		snippet: false,
	});
};
{% endset %}
{% include "snippets/configDefinition.njk" %}
