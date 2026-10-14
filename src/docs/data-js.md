---
eleventyNavigation:
  parent: Using Data
  key: JavaScript Data Files
  order: 4
relatedLinks:
  /docs/config/#change-file-suffix-for-data-files: Change the file suffix `.11tydata` for Data Files
  /docs/watch-serve/#watch-java-script-dependencies: Watch JavaScript Dependencies
---

# JavaScript Data Files {% addedin "0.5.3" %}

{% tableofcontents %}

The following applies to both:

- [Global Data Files](/docs/data-global/) (`*.js` inside of your `_data` directory)
- [Template and Directory Data Files](/docs/data-template-dir/) (`*.11tydata.js` files that are paired with a template file or directory)

## Using JS Data Files

You can export data from a JavaScript file to add data, too. This allows you to execute arbitrary code to fetch data at build time.

{% set codeContent %}
export default ["user1", "user2"];
{% endset %}
{% include "snippets/esmCjsTabs.njk" %}

If you return a `function`, we’ll use the return value from that function.

{% set codeContent %}
export default function () {
	return ["user1", "user2"];
}
{% endset %}
{% include "snippets/esmCjsTabs.njk" %}

We use `await` on the return value, so you can return a promise and/or use an `async function`, too. Fetch your data asynchronously at build time!

{% set codeContent %}
async function fetchUserData(username) {
	// do some async things
	return username;
}

export default async function () {
	let user1 = await fetchUserData("user1");
	let user2 = await fetchUserData("user2");

	return [user1, user2];
};
{% endset %}
{% include "snippets/esmCjsTabs.njk" %}

### Fetching data from a remote API

You’ll want to use [Eleventy’s Fetch plugin](/docs/plugins/fetch/) to request and cache data from remote APIs. There is another example on [Quick Tip #009—Cache Data Requests](/docs/quicktips/cache-api-requests/).

### Arguments to Global Data Files

{% addedin "1.0.0" %} When using a callback function in your JavaScript Data Files, Eleventy will now supply any global data already processed [via the Configuration API (`eleventyConfig.addGlobalData`)](/docs/data-global-custom/) as well as the [`eleventy` global variable](/docs/data-eleventy-supplied/#eleventy-variable).

{% set codeContent %}
export default function (configData) {
	if (configData.eleventy.env.source === "cli") {
		return "I am on the command line";
	}

	return "I am running programmatically via a script";
}
{% endset %}
{% include "snippets/esmCjsTabs.njk" %}

## Examples

- [Example: Using GraphQL](#example-using-graph-ql)
- [Example: Exposing Environment Variables](#example-exposing-environment-variables)
- [Fetch GitHub star counts](/docs/quicktips/cache-api-requests/)
- [Caching remote images, Google Fonts CSS, and more on the Eleventy Fetch plugin docs](/docs/plugins/fetch/#more-examples)

### Example: Using GraphQL

This “Hello World” GraphQL example works out of the box with Eleventy:

{% set codeContent %}
import { graphql, buildSchema } from "graphql";

// this could also be `async function`
export default function () {
	// if you want to `await` for other things here, use `async function`
	var schema = buildSchema(`type Query {
    hello: String
  }`);

	var root = {
		hello: () => "Hello world async!",
	};

	return graphql(schema, "{ hello }", root);
};
{% endset %}
{% include "snippets/esmCjsTabs.njk" %}

### Example: Exposing Environment Variables

You can expose environment variables to your templates by utilizing [Node.js’ `process.env` property](https://nodejs.org/api/process.html#process_process_env). _(Related: Eleventy also supplies a few of its [own Environment Variables](/docs/environment-vars/#eleventy-supplied))_

- [**Learn how to set your own environment variables**](/docs/environment-vars/#setting-your-own)

Start by creating a [Global Data file](/docs/data-global/) (`*.js` inside of your `_data` directory) and export the environment variables for use in a template:

<div class="codetitle codetitle-right-md">_data/myProject.js</div>
{% set codeContent %}
export default function () {
	return {
		environment: process.env.MY_ENVIRONMENT || "development",
	};
}
{% endset %}
{% include "snippets/esmCjsTabs.njk" %}

Saving this as `myProject.js` in your global data directory (by default, this is `_data/`) gives you access to the `myProject.environment` variable in your templates.

- [Learn how to set a value for the `MY_ENVIRONMENT` environment variable](/docs/environment-vars/#setting-your-own)

When `MY_ENVIRONMENT` is set, the value from `myProject.environment` will be globally available to be used in your templates. If the variable hasn’t been set, the fallback `"development"` will be used.

#### Template Usage

Working from our [Inline CSS Quick Tip](/docs/quicktips/inline-css/), we can modify the output to only minify our CSS if we’re building for production:

{% set codeBlock %}{% raw %}
<style>
{% if myProject.environment == "production" %}
	{{ css | cssmin | safe }}
{% else %}
	{{ css | safe }}
{% endif %}
</style>
{% endraw %}{% endset %}
{{ codeBlock | highlight("html") | safe }}
