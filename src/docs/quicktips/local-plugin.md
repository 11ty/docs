---
tiptitle: "Use local plugins to reduce config file size"
date: 2022-02-20
---

Is your `.eleventy.js` file getting too large? You can [create your own plugin](/docs/plugins/#creating-a-plugin) to move some code out.

First, create a plugin file. We recommend creating a `config` or `_config` folder in your project to store config files in. Make sure that folder isn’t getting copied out to your built site (via [ignores](/docs/ignores.md)). Then create a file in that folder. It doesn’t matter what you name it.

<div class="codetitle codetitle-right-md">config/local-plugin.js</div>
{% set codeContent %}
export default function($config) {
	// Move any code from `buildawesome.config.js` here.
	// Use $config as you would in your top-level config file
}
{% endset %}
{% include "snippets/esmCjsTabs.njk" %}

{% callout "info" %}Any variables defined in your <code>buildawesome.config.js</code> file will <em>not</em> be available to your plugin. Consider moving those variables into your plugin file, or <a href="/docs/plugins/#plugin-configuration-options">passing them in as options</a>.{% endcallout %}

Next, use the `addPlugin` method:

{% set codeContent %}
import localPlugin from "./config/local-plugin.js";

export default function($config) {
	$config.addPlugin(localPlugin);
}
{% endset %}
{% include "snippets/configDefinition.njk" %}