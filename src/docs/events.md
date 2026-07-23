---
eleventyNavigation:
  parent: Advanced
  key: Configuration Events
  order: 2
---

# Events

{% tableofcontents %}

You may want to run some custom JavaScript code in your configuration file at varying times during Eleventy’s build process. _Configuration events_ unlock this ability.

[[toc]]

All events are configured in your [configuration file](./config.md), with the code run every time the event triggers.

Asynchronous callback function support added in v1.0.

## `eleventy.before` {% addedin "1.0.0" %}

- Previously known as the now deprecated `beforeBuild` {% addedin "0.11.1" %} event.

The `eleventy.before` event runs every time Eleventy starts building, so it will run before the start of each stand-alone build, as well as each time building starts as either part of `--watch` or `--serve`. To use it, attach the event handler to your Eleventy config:

{% set codeContent %}
export default function($config) {
	// Async-friendly in 1.0+
	// Arguments added in 2.0+
	$config.on("eleventy.before", async ({ directories, runMode, outputMode }) => {
		// Run me before the build starts
	});
}
{% endset %}
{% include "snippets/configDefinition.njk" %}

## `eleventy.after` {% addedin "1.0.0" %}

- Previously known as the now deprecated `afterBuild` {% addedin "0.11.1" %} event.

The `eleventy.after` event runs every time Eleventy finishes building, so it will run after the end of each stand-alone build, as well as each time building ends as either part of `--watch` or `--serve`. To use it, attach the event handler to your Eleventy config:

{% set codeContent %}
export default function($config) {
	// Async-friendly in 1.0+
	// Arguments added in 2.0+
	$config.on(
		"eleventy.after",
		async ({ directories, results, runMode, outputMode }) => {
			// Run me after the build ends
		}
	);
};
{% endset %}
{% include "snippets/configDefinition.njk" %}

## Event arguments {% addedin "2.0.0" %}

Eleventy now provides an object with metadata on the build as an argument to the `eleventy.before` and `eleventy.after` event callbacks.

{% set codeContent %}
export default function($config) {
	$config.on("eleventy.before", async ({ directories, runMode, outputMode }) => {
		// Read more below
	});

	$config.on(
		"eleventy.after",
		async ({ directories, results, runMode, outputMode }) => {
			// Read more below
		}
	);
};
{% endset %}
{% include "snippets/configDefinition.njk" %}

- `directories`: an object with normalized project directory paths, set in your in [your configuration file](/docs/config/#input-directory) (or populated with Eleventy defaults).
	- Included properties: `input`, `inputFile`, `inputGlob`, `data`, `includes`, `layouts`, and `output`. Works best with a [named `config` export](./config-shapes.md#optional-export-config-object) in your configuration file.
- `dir` (deprecated, use `directories` instead):
	- Included properties: `input` (default `"."`), `output` (default `"_site"`), `includes` (default `"_includes"`), `data` (default `"_data"`), and `layouts` (no default value).
- `outputMode`: a string representing the value of [`--to` on the command line](/docs/usage/#to-can-output-json)
  - `fs` (default)
  - `json`
- `runMode`: a string representing [`--serve` or `--watch` usage on the command line](/docs/usage/#re-run-eleventy-when-you-save). One of:
  - `build` (default)
  - `watch`
  - `serve`
- `results`: _only available on `eleventy.after`_. An array with the processed Eleventy output (similar to `--to=json` output)
  - Individual entries will have: `{ inputPath, outputPath, url, content }`

<div class="youtube-related">
  {%- youtubeEmbed "f0LsgyPV7j0", "New Event Arguments (Weekly №5)", "491" -%}
</div>

## `eleventy.beforeConfig` {% addedin "3.0.0-alpha.3" %}

The `eleventy.beforeConfig` runs before your configuration is initialized and was added as an escape hatch for folks unable to update their top-level configuration callback to be `async` (usually due to some limitation in a third-party tool or a requirement to use CommonJS). You probably won’t need this.

{%- set codeBlock %}
const { HtmlBasePlugin } = require("@awesome.me/buildawesome");

// sync configuration callback
module.exports = function ($config) {
	// async-friendly event
  $config.on("eleventy.beforeConfig", async function ($config) {
		$config.addPlugin(HtmlBasePlugin);
  });
};
{%- endset %}
{{ codeBlock | highlight("js") | safe }}

## `eleventy.beforeWatch` {% addedin "1.0.0" %}

The `eleventy.beforeWatch` event runs before a build _only_ if it's a re-run during `--watch` or `--serve`. This means it will not run during the initial build nor during stand-alone builds.

{% set codeContent %}
export default function($config) {
	// Async-friendly
	$config.on("eleventy.beforeWatch", async (changedFiles) => {
		// Run me before --watch or --serve re-runs
		// changedFiles is an array of files that changed
		// to trigger the watch/serve build
	});
};
{% endset %}
{% include "snippets/configDefinition.njk" %}

## `eleventy.contentMap` {% addedin "2.0.0" %}

This event facilitates the [i18n plugin](/docs/plugins/i18n/) (but is available independent of it).

{% set codeContent %}
export default function($config) {
	// Async-friendly
	$config.on("eleventy.contentMap", async ({ inputPathToUrl, urlToInputPath }) => {
		// inputPathToUrl is an object mapping input file paths to output URLs
		// urlToInputPath is an object mapping output URLs to input file paths
	});
};
{% endset %}
{% include "snippets/configDefinition.njk" %}

## Emitter Modes

Currently Eleventy triggers event callbacks in parallel. If you need to run the event callbacks sequentially, you can do so with the `setEventEmitterMode` configuration API method. Related [GitHub #3415](https://github.com/11ty/eleventy/issues/3415).

{% set codeContent %}
export default function($config){
	$config.setEventEmitterMode("sequential");
}
{% endset %}
{% include "snippets/configDefinition.njk" %}
