---
eleventyNavigation:
  parent: Template Languages
  key: JavaScript
  pinned: true
  order: 3
  excerpt: Run JavaScript to generate content
addedInVersion: 0.7.0
relatedKey: javascript
relatedTitle: Template Language—JavaScript
tags:
  - related-filters
  - related-shortcodes
relatedLinks:
  /docs/config/#watch-javascript-dependencies: Watch JavaScript Dependencies
communityLinksKey: javascript
layout: layouts/langs.njk
---

{% tableofcontents "open" %}

| Eleventy Short Name | File Extension | Version Added |
| ------------------- | -------------- | ----------- |
| `11ty.js`           | `.11ty.js`     | `*` |
| `11ty.js`           | `.11ty.cjs`    | `0.11.0` |
| `11ty.js`           | `.11ty.mjs`    | `3.0.0` |

* Related languages: [JSX](/docs/languages/jsx/), [TypeScript](/docs/languages/typescript/), [MDX](/docs/languages/mdx/)
* _[Front matter](/docs/data-frontmatter/) is not supported in JavaScript files. Use a `data` export instead._

Eleventy supports many different types of JavaScript content that will be parsed as Eleventy templates. They are comprehensively described below.

## Raw Values

Raw values will not have access to Data or [JavaScript Template Functions](#javascript-template-functions). [Use a function](#function) that returns a value instead.

### String

{% set codeContent %}
export default "<p>Zach</p>";
{% endset %}
{% include "snippets/esmCjsTabs.njk" %}

Or [template literals](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals):

{% set codeContent %}
export default `<p>These can
span
multiple
lines!</p>`;
{% endset %}
{% include "snippets/esmCjsTabs.njk" %}

### Buffer

Some templating libraries return [Buffers](https://nodejs.org/api/buffer.html#buffer_class_method_buffer_from_string_encoding) (e.g. [viperHTML](https://github.com/WebReflection/viperHTML)).

{% set codeContent %}
export default Buffer.from("<p>Zách</p>");
{% endset %}
{% include "snippets/esmCjsTabs.njk" %}

### Promise

{% set codeContent %}
export default new Promise((resolve, reject) => {
	setTimeout(function () {
		resolve("<p>Zach</p>");
	}, 1000);
});
{% endset %}
{% include "snippets/esmCjsTabs.njk" %}

## Function

Can return any [raw value](#raw-values) (e.g. String, Buffer, Promise). Use [template literals](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals) to embed data values without having to concatenate strings!

{% set codeContent %}
export default function (data) {
	return `<p>${data.name}</p>`;
};
{% endset %}
{% include "snippets/esmCjsTabs.njk" %}

De-structuring syntax is a little bit easier to read:

{% set codeContent %}
export default function ({ name }) {
	return `<p>${name}</p>`;
};
{% endset %}
{% include "snippets/esmCjsTabs.njk" %}

Maybe you like arrow functions:

{% set codeContent %}
export default ({ name }) => `<p>${name}</p>`;
{% endset %}
{% include "snippets/esmCjsTabs.njk" %}

`async` functions work too:

{% set codeContent %}
const getAnAsyncThing = require("./lib/asyncThing");

export default async function (data) {
	return `<p>${await getAnAsyncThing()}</p>`;
};
{% endset %}
{% include "snippets/esmCjsTabs.njk" %}

## Classes

Eleventy looks for classes that have a `render` method and uses `render` to return the content of the template. `render` methods can be `async`.

`render` can return any [raw value](#raw-values) (e.g. String, Buffer, Promise).

{% set codeContent %}
class Test {
	// or `async render({name}) {`
	render({ name }) {
		return `<p>${name}</p>`;
	}
}

export default Test;
{% endset %}
{% include "snippets/esmCjsTabs.njk" %}

### Optional `data` Method

{% callout "info" %}<a href="/docs/data-frontmatter/">Front Matter</a> is not supported in JavaScript template types. Use <code>data</code> methods instead! Additionally, there are more alternative options in the <a href="/docs/data-cascade/">Data Cascade</a>.{% endcallout %}

This data acts as Front Matter for the template and similarly to Front Matter will take precedence over all other data in the data cascade. The `data` method can be asynchronous `async data()` or it can be a getter `get data()`.

{% set codeContent %}
class Test {
	// or `async data() {`
	// or `get data() {`
	data() {
		return {
			name: "Ted",
			layout: "teds-rad-layout",
			// … other front matter keys
		};
	}

	render({ name }) {
		// will always be "Ted"
		return `<p>${name}</p>`;
	}
}

export default Test;
{% endset %}
{% include "snippets/esmCjsTabs.njk" %}

### Permalinks

The `permalink` data key will work here. Permalinks can be a [raw value](#raw-values) (e.g. String, Buffer, Promise) or a Function that returns any raw value.

#### Permalink String

{% set codeContent %}
class Test {
	data() {
		return {
			// Writes to "/my-permalink/index.html"
			permalink: "/my-permalink/",
		};
	}

	render(data) {
		/* … */
	}
}

export default Test;
{% endset %}
{% include "snippets/esmCjsTabs.njk" %}

#### Permalink Function

Permalink Functions can return any [raw value](#raw-values) (e.g. String, Buffer, Promise).

{% set codeContent %}
class Test {
	data() {
		return {
			key: "hello",
			// Writes to "/my-permalink/hello/index.html"
			permalink: (data) => `/my-permalink/${data.key}/`,
		};
	}

	render(data) {
		/* … */
	}
}

export default Test;
{% endset %}
{% include "snippets/esmCjsTabs.njk" %}

#### Permalink Function using a Filter

Universal filters, shortcodes, and other JavaScript Template Functions work here and are exposed on `this`. Read more about [Eleventy provided Universal Filters](/docs/filters/#eleventy-provided-filters).

{% set codeContent %}
class Test {
	data() {
		return {
			title: "This is my blog post title",
			// Writes to "/this-is-my-blog-post-title/index.html"
			permalink: function (data) {
				return `/${this.slug(data.title)}/`;
			},
		};
	}

	render(data) {
		/* … */
	}
}

export default Test;
{% endset %}
{% include "snippets/esmCjsTabs.njk" %}

### Markdown and JavaScript

Yes, you can use JavaScript as your preprocessor language for Markdown. Read more about [`templateEngineOverride`](/docs/template-overrides/).

{% set codeContent %}
class Test {
	data() {
		return {
			myName: "Zach",
			templateEngineOverride: "11ty.js,md",
		};
	}

	render(data) {
		return `# This is ${data.myName}`;
	}
}

export default Test;
{% endset %}
{% include "snippets/esmCjsTabs.njk" %}

{% callout "info" %}While <code>templateEngineOverride: 11ty.js,md</code> works to add markdown support, the special behavior of JavaScript templates does not allow other template engines to be supported here (e.g. <code>templateEngineOverride: njk,md</code>). One workaround is to use the <a href="/docs/plugins/render/">Render Plugin</a>.{% endcallout %}

<span id="filters"></span><span id="shortcodes"></span>

## JavaScript Template Functions

A JavaScript Template Function allows you to extend your JavaScript templates with extra functionality. If you add any Universal Filters or Shortcodes, they will be exposed as JavaScript Template Functions.

{% set codeContent %}
export default function($config) {
  $config.addJavaScriptFunction("myFunction", function(a, b) { /* … */ });
};
{% endset %}
{% include "snippets/configDefinition.njk" %}

<div class="codetitle">js-fn-example.11ty.js</div>
{% set codeContent %}
export default function (data) {
	return `<h1>${this.myFunction(data.a, data.b)}</h1>`;
};
{% endset %}
{% include "snippets/esmCjsTabs.njk" %}

### Asynchronous JavaScript Template Functions

This works the same as any `async` JavaScript function or function that returns a `Promise`.

This is the same as the example above but adds `async` before the `function`.

{% set codeContent %}
export default function($config) {
  $config.addJavaScriptFunction("myAsyncFunction", async function(a, b) { /* … */ });
};
{% endset %}
{% include "snippets/configDefinition.njk" %}

This is the same as the example above but adds `await` before the function is called.


{% codetitle "js-async-fn-example.11ty.js" %}

{% set codeContent %}
export default async function (data) {
	return `<h1>${await this.myAsyncFunction(data.a, data.b)}</h1>`;
};
{% endset %}
{% include "snippets/esmCjsTabs.njk" %}

### Warning about Arrow Functions

{% callout "warn" %}
Note that by definition (<a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions#No_separate_this">read on MDN</a>) arrow functions do not have access to <code>this</code>, so any use of JavaScript Functions inside of an arrow function template will throw an error.
{% endcallout %}

{% codetitle "js-arrow-fn-example.11ty.js" %}

{% set codeContent %}
export default (data) => {
	// Using `this` in an arrow function will throw an error!
	return `<h1>${this.myFunction(data.a, data.b)}</h1>`;
};
{% endset %}
{% include "snippets/esmCjsTabs.njk" %}

### Relationship to Filters and Shortcodes

Any universal filters or shortcodes will also be available as JavaScript Template Functions.

{% set codeContent %}
export default function($config) {
  // Universal filters (Adds to Liquid, Nunjucks, 11ty.js)
  $config.addFilter("myFilter", function(myVariable) { /* … */ });

  // Universal Shortcodes (Adds to Liquid, Nunjucks, 11ty.js)
  $config.addShortcode("user", function(firstName, lastName) { /* … */ });

  // Universal Paired Shortcodes (Adds to Liquid, Nunjucks, 11ty.js)
  $config.addPairedShortcode("pairedUser", function(content, firstName, lastName) { /* … */ });
};
{% endset %}
{% include "snippets/configDefinition.njk" %}

{% codetitle "universal-examples.11ty.js" %}

{% set codeContent %}
export default function (data) {
	return `
<h1>${this.myFilter(data.myVar)}</h1>
<p>${this.user(data.firstName, data.lastName)}</p>
<p>${this.pairedUser(
		`Here is some more content`,
		data.firstName,
		data.lastName
	)}</p>
`;
};
{% endset %}
{% include "snippets/esmCjsTabs.njk" %}

### Access to `page` data values {% addedin "0.11.0" %}

If you aren’t using an arrow function, JavaScript Functions (and Nunjucks, Liquid Shortcodes) will have access to Eleventy [`page` data values](/docs/data-eleventy-supplied/#page-variable-contents) without needing to pass them in as arguments.

{% set codeContent %}
export default function ($config) {
	$config.addJavaScriptFunction("myFunction", function () {
		// Available in 0.11.0 and above
		console.log(this.page);

		// For example:
		console.log(this.page.url);
		console.log(this.page.inputPath);
		console.log(this.page.fileSlug);
	});
};
{% endset %}
{% include "snippets/configDefinition.njk" %}