---
eleventyNavigation:
  parent: Eleventy Projects
  key: Watch and Serve
  title: Watch Files and Dev Servers
  order: 9
---

# Watch Files and use Development Servers

{% tableofcontents %}

<div id="browsersync"></div>
<div id="swap-back-to-browsersync"></div>

Running Eleventy with [`--serve`](./usage.md#re-run-eleventy-when-you-save) starts a hot reloading local development server for you.

{{ "Watch and Serve" | nav | eleventyNavigationToHtml({ showExcerpt: true }) | safe }}

A development server is optional! Using [`--watch`](./usage.md#re-run-eleventy-when-you-save) will run Eleventy (and re-run when you save your files) without a server.

## Eleventy Dev Server {% addedin "2.0.0" %}

Eleventy bundles its own [dedicated Development Server](/docs/dev-server/). In versions prior to v2, we used [Browsersync, which you can still use with Eleventy if you’d like](/docs/server-browsersync/).

For most use cases, the default behavior of this server should handle most things automatically. Changing files in your local environment will re-run an Eleventy build and refresh any active web browser sessions on the local site.

## Add Your Own Watch Targets {% addedin "0.10.0" %}

The `addWatchTarget` config method allows you to manually add a file or directory for Eleventy to watch. When the file or the files in this directory change Eleventy will trigger a build. This is useful if Eleventy is not aware of your project-specific external dependencies.

{% set codeContent %}
export default function($config) {
	$config.addWatchTarget("./src/scss/");
};
{% endset %}
{% include "snippets/configDefinition.njk" %}

**Advanced usage note:** This works with [`chokidar` under the hood](https://github.com/paulmillr/chokidar#api) and chokidar uses [`picomatch` for globbing](https://github.com/micromatch/picomatch):

- Both `**/*.(png|jpeg)` and `**/*.{png,jpeg}` are valid globs to matches any `png` or `jpeg` file in your project.

### Reset configuration {% addedin "3.0.0" %}

We do automatically look for dependencies in your configuration file based on JavaScript `require` or `import`—watch targets not included in that dependency graph will not reset or re-run your configuration automatically.

To reset your configuration for a specific watch target, use the `resetConfig` option.

{% set codeContent %}
export default function($config) {
	// You probably don’t need this
	$config.addWatchTarget("./_config/**", {
		resetConfig: true
	});
};
{% endset %}
{% include "snippets/configDefinition.njk" %}

### Reload without running a build

Use the [`watch` option configurable with Eleventy Dev Server](/docs/dev-server/#options) to refresh your local browser when local files change _without_ triggering an Eleventy build. This is useful to decouple build processes outside of Eleventy.

## Ignore Watching Files

### `.gitignore`

Eleventy will ignore changes to files or folders listed in your `.gitignore` file by default, [unless `setUseGitIgnore` is turned off](/docs/ignores/#opt-out-of-using-gitignore).

### Configuration API {% addedin "2.0.0-canary.18" %}

Previously, [the configuration API ignores for template processing](/docs/ignores/#configuration-api) were also used as ignores for watching (e.g. `$config.ignores.add("README.md")`).

New in {{ "2.0.0-canary.18" | coerceVersion }}, watch target ignores now have their own dedicated API:

{% set codeContent %}
export default function($config) {
	// Do not rebuild when README.md changes (You can use a glob here too)
	$config.watchIgnores.add("README.md");

	// Or delete entries too
	$config.watchIgnores.delete("README.md");
};
{% endset %}
{% include "snippets/configDefinition.njk" %}

The `watchIgnores` Set starts with a default `**/node_modules/**` entry.

## Watch JavaScript Dependencies {% addedin "0.7.0" %}

When in `--watch` mode, Build Awesome will spider the dependencies of your [JavaScript Templates](/docs/languages/javascript/) (`.11ty.js`), [JavaScript Data Files](/docs/data-js/) (`.11tydata.js` or `_data/**/*.js`), or Configuration File (usually `buildawesome.config.js`) to watch those files too. Files in `node_modules` directories are ignored. This feature is _enabled by default_.

{% set codeContent %}
export default function($config) {
	// Enabled by default
	$config.setWatchJavaScriptDependencies(false);
};
{% endset %}
{% include "snippets/configDefinition.njk" %}

## Add delay before re-running {% addedin "0.11.0" %}

A hardcoded amount of time Build Awesome will wait before triggering a new build when files have changes during `--watch` or `--serve` modes. You probably won’t need this, but is useful in some edge cases with other task runners (Gulp, Grunt, etc).

{% set codeContent %}
export default function($config) {
	// default is 0
	$config.setWatchThrottleWaitTime(100); // in milliseconds
};
{% endset %}
{% include "snippets/configDefinition.njk" %}

## Advanced `chokidar` Configuration

Advanced [`chokidar` options](https://github.com/paulmillr/chokidar) can be defined using the `setChokidarConfig` configuration API method:

{% set codeContent %}
export default function($config) {
	$config.setChokidarConfig({
		usePolling: true,
		interval: 500,
	});
};
{% endset %}
{% include "snippets/configDefinition.njk" %}

{% callout "warn", "md" %}If you’re using [Windows Subsystem for Linux (WSL)](https://learn.microsoft.com/en-us/windows/wsl/) and your project exists _outside_ of your home directory (`~`), you will likely want to use the `usePolling` feature to ensure watching works correctly. This is a WSL limitation.{% endcallout %}
