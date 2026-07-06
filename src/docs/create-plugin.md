---
eleventyNavigation:
  parent: Plugins
  key: Create or use Plugins
  pinned: true
  order: 0
  excerpt: Plugins are just configuration. Learn how to create a plugin of your own to reuse functionality or to organize your configuration file.
communityLinksKey: plugins
---

# Create or use Plugins

{% tableofcontents %}

## Plugins are Configuration

At their simplest, Build Awesome plugins are a function passed to the `addPlugin` method. If you’re familiar with [Build Awesome configuration files](/docs/config/), this will look and feel very similar!

{% set codeContent %}
export default function ($config) {
	$config.addPlugin(function($config) {
		// I am a plugin!
	});
};
{% endset %}
{% include "snippets/configDefinition.njk" %}

The plugin can be defined elsewhere in the same file:

{% set codeContent %}
function myPlugin($config) {
	// I am a plugin!
}

export default function ($config) {
	$config.addPlugin(myPlugin);
};
{% endset %}
{% include "snippets/configDefinition.njk" %}

Or in a different file:

{% set codeContent %}
import myPlugin from "./_config/plugin.js";

export default function ($config) {
	$config.addPlugin(myPlugin);
};
{% endset %}
{% include "snippets/configDefinition.njk" %}

Or in an `npm` package:

{% set codeContent %}
import pluginRss from "@11ty/eleventy-plugin-rss";

export default function ($config) {
	$config.addPlugin(pluginRss);
};
{% endset %}
{% include "snippets/configDefinition.njk" %}

Plugins are async-friendly {% addedin "3.0.0-alpha.1" %} but you must `await` the `addPlugin` method.

{% set codeContent %}
export default async function ($config) {
	await $config.addPlugin(async function($config) {
		// I am an asynchronous plugin!
	});
};
{% endset %}
{% include "snippets/configDefinition.njk" %}

## Adding a Plugin

### Installation

We use the [`npm` command line tool](https://www.npmjs.com) (included with Node.js) to install plugins.

Looking for a plugin? Check out the [official plugins](/docs/plugins/official/) or [community-contributed plugins](/docs/plugins/community/).

```bash
npm install @11ty/eleventy-plugin-rss --save
```

### Add the plugin to Build Awesome in your config file

Your config file is probably named `buildawesome.config.js` or `eleventy.config.js`.

{% set codeContent %}
import pluginRss from "@11ty/eleventy-plugin-rss";

export default function ($config) {
	$config.addPlugin(pluginRss);
};
{% endset %}
{% include "snippets/configDefinition.njk" %}

### Plugin Configuration Options {% addedin "0.5.4" %}

Use an optional second argument to `addPlugin` to customize your plugin’s behavior. These options are specific to the plugin. Please consult the plugin’s documentation (e.g. the [`eleventy-plugin-syntaxhighlight` README](https://github.com/11ty/eleventy-plugin-syntaxhighlight/blob/master/README.md)) to learn what options are available to you.

{% set codeContent %}
import pluginSyntaxHighlight from "@11ty/eleventy-plugin-syntaxhighlight";

export default function ($config) {
	$config.addPlugin(pluginSyntaxHighlight, {
		// only install the markdown highlighter
		templateFormats: ["md"],

		init: function ({ Prism }) {
			// Add your own custom language to Prism!
		},
	});
};
{% endset %}
{% include "snippets/configDefinition.njk" %}

<details>
<summary><strong>Advanced Usage: Namespacing a plugin</strong></summary>

It’s unlikely you’ll need this feature _but_ you can namespace parts of your configuration using `$config.namespace`. This will add a string prefix to all filters, tags, helpers, shortcodes, collections, and transforms.

{% set codeContent %}
import pluginRss from "@11ty/eleventy-plugin-rss";

export default function ($config) {
	$config.namespace("myPrefix_", () => {
		// the rssLastUpdatedDate filter is now myPrefix_rssLastUpdatedDate
		$config.addPlugin(pluginRss);
	});
};
{% endset %}
{% include "snippets/configDefinition.njk" %}

{% callout "warn" %}
Plugin namespacing is an application feature and should not be used if you are creating your own plugin (in your plugin configuration code). Follow along at <a href="https://github.com/11ty/eleventy/issues/256">Issue #256</a>.
{% endcallout %}

</details>

### Advanced: Execute a plugin immediately {% addedin "3.0.0-alpha.5" %}

Plugins (by default) execute in a second stage of configuration after the user’s configuration file has finished, in order to have access to [the return object in the configuration callback](/docs/config/).

You are unlikely to need this, but you can execute a plugin’s code immediately using the `immediate` option.

{% set codeContent %}
export default function ($config, pluginOptions) {
	console.log( "first" );

	$config.addPlugin($config => {
		console.log("fourth");
	});

	$config.addPlugin($config => {
		console.log("second");
	}, {
		immediate: true
	});

	console.log("third");
};
{% endset %}
{% include "snippets/configDefinition.njk" %}

## Creating a Plugin

A plugin primarily provides a “configuration function.” This function is called when Build Awesome is first initialized, and operates similarly to a user’s configuration function (the same `$config` argument passed to the user’s `buildawesome.config.js` file is passed here), in addition to any config passed by the user:

<div class="codetitle">plugin.js</div>

{% set codeContent %}
export default function ($config, pluginOptions) {
	// Your plugin code goes here
};
{% endset %}
{% include "snippets/esmCjsTabs.njk" %}

Note that plugins run as a second stage after the user’s primary configuration file has executed (to have access to the return object values).

<details>
<summary><strong>Advanced Usage: Custom Plugin Arguments</strong></summary>

If you want to allow developers to use custom arguments provided by your plugin, you can export an object. Prefer using the above syntax unless you need this behavior. For an example of how this is used, see the [syntax highlighting plugin](https://github.com/11ty/eleventy-plugin-syntaxhighlight/blob/23761d7fd54de0312040520175959327b1a0ab9b/.eleventy.js#L10)

<div class="codetitle">plugin-with-args.js</div>

{% set codeContent %}
export default {
	initArguments: {},
	configFunction: function ($config, pluginOptions) {
		// Your plugin code goes here
	},
};
{% endset %}
{% include "snippets/esmCjsTabs.njk" %}

{% set codeContent %}
export default function ($config) {
	$config.addPlugin(require("./fancy-plugin.js"), {
		init: function (initArguments) {
			// `this` is the $config object
			// initArguments will be the `myInitArguments` object from above
		},
	});
};
{% endset %}
{% include "snippets/configDefinition.njk" %}

</details>

### Feature Testing

If your plugin requires a specific feature in Build Awesome (Eleventy) core, you should feature test it!

<div class="codetitle">plugin.js</div>

{% set codeContent %}
export default function ($config, pluginOptions) {
	if(!("addTemplate" in $config)) {
		console.log( `[my-test-plugin] WARN Build Awesome (Eleventy) plugin compatibility: Virtual Templates are required for this plugin, please use Build Awesome (Eleventy) v3.0 or newer.` );
	}
};
{% endset %}
{% include "snippets/esmCjsTabs.njk" %}

### Version Checking

If feature testing is not available for your specific use case, you can add this code to your plugin configuration to show a warning if the plugin consumer does not have a compatible version of Build Awesome or Eleventy:

<div class="codetitle">plugin.js</div>

{% set codeContent %}
export default function ($config, pluginOptions) {
	try {
		// Emit a warning message if the application is not using Build Awesome (Eleventy) 3.0 or newer (including prereleases).
		$config.versionCheck(">=3.0");
	} catch(e) {
		console.log( `[my-test-plugin] WARN Build Awesome plugin compatibility: ${e.message}` );
	}
};
{% endset %}
{% include "snippets/esmCjsTabs.njk" %}

* This uses the [`semver` package](https://www.npmjs.com/package/semver) and is compatible with advanced range syntax.
* **Upper bounding your version number is _not recommended_**. We work very hard to maintain backwards compatibility between major versions. Please ensure your plugin code does the same!
* The `versionCheck` method has been available in core since v0.3.2 (~2018).


### Distributing a Plugin

If you’re distributing your plugin as a package, consider following these conventions. These are not hard requirements.

- Add `"buildawesome-plugin"` and `"eleventy-plugin"` to your package.json’s `keywords` field.
- Prefix your package name with `"buildawesome-plugin-"` (previously: `eleventy-plugin-`)
- Open a PR to add your plugin to our [list of community plugins](https://github.com/11ty/docs/tree/main/src/_data/plugins) for publication on [our community plugins directory](/docs/plugins/community.md).
