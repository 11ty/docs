---
eleventyNavigation:
  key: Eleventy Dev Server
  parent: Watch and Serve
  pinned: true
---

# Eleventy Dev Server {% addedin "2.0.0" %}

{% tableofcontents %}

Eleventy includes its own hot-reloading development server.

- [`11ty/eleventy-dev-server` on GitHub](https://github.com/11ty/eleventy-dev-server).
- 🏋🏻‍♀️ Minimal footprint: `1.4 MB` node_modules
	- Helped Eleventy `node_modules` drop from `155 MB` to `34.3 MB`
	- Faster Eleventy `npm install` times (`30.5%` faster)
	- Reduced Eleventy dependency count from `311` to `211`
- 📦 Bundler Decoupled
- 🚄 Fast ~2ms startup times
- ⚡️ WebSockets-based Live reload
- 🔬 DOM-diffing HTML updates
- ⚠️ No unresolved `npm audit` errors or warnings 👀
- 🚤 Supports [emulated passthrough file copy](/docs/copy/#emulate-passthrough-copy-during-serve) for faster builds!

_Read more detail on the [Eleventy Dev Server 1.0 release notes](https://github.com/11ty/eleventy-dev-server/releases/tag/v1.0.0)._

## Options

You can configure the server with the new `setServerOptions` Configuration API method.

{% set codeContent %}
export default function($config) {
	$config.setServerOptions({
		// Default values are shown:

		// Whether the live reload snippet is used
		liveReload: true,

		// Whether DOM diffing updates are applied where possible instead of page reloads
		domDiff: true,

		// The starting port number
		// Will increment up to (configurable) 10 times if a port is already in use.
		port: 8080,

		// Additional files to watch that will trigger server updates
		// Accepts an Array of file paths or globs (passed to `chokidar.watch`).
		// Works great with a separate bundler writing files to your output folder.
		// e.g. `watch: ["_site/**/*.css"]`
		watch: [],

		// Show local network IP addresses for device testing
		showAllHosts: false,

		// Use a local key/certificate to opt-in to local HTTP/2 with https
		https: {
			// key: "./localhost.key",
			// cert: "./localhost.cert",
		},

		// Change the default file encoding for reading/serving files
		encoding: "utf-8",

		// Show the dev server version number on the command line
		showVersion: false,

		// Added in Dev Server 2.0+
		// The default file name to show when a directory is requested.
		indexFileName: "index.html",

		// Added in Dev Server 2.0+
		// An object mapping a URLPattern pathname to a callback function
		// for on-request processing (read more below).
		onRequest: {},
	});
};
{% endset %}
{% include "snippets/configDefinition.njk" %}

<details>
<summary><strong>Expand to see the Full options list</strong></summary>

{% set codeContent %}
export default function($config) {
	$config.setServerOptions({
		// Change the name of the folder name used for injected scripts
		injectedScriptsFolder: ".11ty",

		// Number of times to increment a port is already in use
		portReassignmentRetryCount: 10,

		// Alias for backwards compatibility, renamed to `injectedScriptsFolder` in Dev Server 1.0+
		folder: ".11ty",

		// Alias for backwards compatibility, renamed to `liveReload` in Dev Server 1.0+
		enabled: true,

		// Alias for backwards compatibility, renamed to `domDiff` in Dev Server 1.0+
		domdiff: true,
	});
};
{% endset %}
{% include "snippets/configDefinition.njk" %}

</details>

- Read more about [`chokidar.watch` compatible paths](https://github.com/paulmillr/chokidar) for the `watch` option. Advanced [chokidar configuration is available](#advanced-chokidar-options).
- For a full list of `encoding` values supported by Node (also used in the `Content-Type` HTTP Header), check out [Node’s Buffer documentation](https://nodejs.org/api/buffer.html#buffers-and-character-encodings).
- Using a root `404.html` file (a popular convention supported by Netlify, GitHub Pages, Vercel, and others) supported! We use the content from a `404.html` in your output folder when serving the error page for missing content.

{% callout "info", "md" -%}
Try out the [`devcert-cli`](https://github.com/davewasmer/devcert-cli) package to generate a localhost key and certificate for `https` and HTTP/2.
{%- endcallout %}

<div class="youtube-related">
	{%- youtubeEmbed "wWs38M38vr8", "New Dev Server Preview (Weekly №3)" -%}
	{%- youtubeEmbed "7hER8HddlhQ", "Shipping the New Dev Server (Weekly №4)" -%}
	{%- youtubeEmbed "ZE5Np95-PeU", "Dev Server CLI (Weekly №14)", "463" -%}
</div>

### `onRequest` for request-time processing

{% addedin "3.0.0-alpha.7" %}{% addedin "Dev Server 2.0.0" %} Use the new `onRequest` object to configure some of your project to use on-request-time processing. The keys in this object represent strings from the [URL Pattern API](https://developer.mozilla.org/en-US/docs/Web/API/URL_Pattern_API).

{% set codeContent %}
export default function($config) {
	$config.setServerOptions({
		onRequest: {
			"/": function({ url }) {
				// will fallback to serve static files if we return any falsy value other than ""
			},
			"/empty": function({ url }) {
				// render an empty page
				return "";
			},
			"/foo/:name": function({ url, pattern, patternGroups }) {
				// patternGroups will include URLPattern matches e.g. /foo/zach => { name: "zach" }
				return {
					status: 200,
					headers: {
						"Content-Type": "text/html",
					},
					body: "Hello."
				};
			}
		}
	});
};
{% endset %}
{% include "snippets/configDefinition.njk" %}

Works great with the [`process.env.ELEVENTY_RUN_MODE` environment variable](/docs/environment-vars/#eleventy-supplied) to change how your server operates during`--serve` mode.

{% set codeContent %}
export default function($config) {
	// Intercept all requests during --serve mode.
	if(process.env.ELEVENTY_RUN_MODE === "serve") {
		$config.setServerOptions({
			onRequest: {
				"/*": function({ url }) {
					// Don’t return any static files, only show a help message
					return "Help I am trapped in the computer.";
				},
			}
		});
	}
};
{% endset %}
{% include "snippets/configDefinition.njk" %}

## Advanced `chokidar` options

Access to advanced `chokidar` configuration is available via the [`$config.setChokidarConfig` method (on the Watch and Serve documentation)](/docs/watch-serve/#advanced-chokidar-configuration).

## Swap back to Browsersync {% addedin "2.0.0" %}

You can swap back to Eleventy Dev Server using the `setServerOptions` configuration API and the [`@11ty/eleventy-server-browsersync` package](https://github.com/11ty/eleventy-server-browsersync).

First, install it:

{%- set codeBlock %}
npm install @11ty/eleventy-server-browsersync
{%- endset %}
{{ codeBlock | highlight("bash") | safe }}

Then, enable it in your configuration file:

{% set codeContent %}
export default function($config) {
	$config.setServerOptions({
		module: "@11ty/eleventy-server-browsersync",

		// Default Browsersync options shown:
		port: 8080,
		open: false,
		notify: false,
		ui: false,
		ghostMode: false,

		// Opt-out of the Browsersync snippet
		// snippet: false,
	});
};
{% endset %}
{% include "snippets/configDefinition.njk" %}

View the [full list of Browsersync options](https://browsersync.io/docs/options).

<div class="youtube-related">
	{%- youtubeEmbed "7hER8HddlhQ", "Fallback to browsersync (Weekly №4)", "235" -%}
</div>

### `setBrowserSyncConfig`

`$config.setBrowserSyncConfig` was the previous Configuration API method used in versions of Eleventy prior to v2. It was changed to be a no-op in Eleventy v2 (it has no functional purpose).

<!--Check out the previous version docs to learn how to:

* [Override Browsersync server options](https://v1-0-0.11ty.dev/docs/watch-serve/#override-browsersync-server-options)
* [Opt-out of the Browsersync JavaScript snippet](https://v1-0-0.11ty.dev/docs/watch-serve/#opt-out-of-the-browsersync-javascript-snippet)-->
