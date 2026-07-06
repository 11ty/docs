---
eleventyNavigation:
  parent: Data Cascade
  key: Config Global Data
  order: 4
---

# Global Data from the Configuration API {% addedin "1.0.0" %}

{% tableofcontents %}

In addition to [Global Data Files](/docs/data-global/) global data can be added to the Eleventy config object using the `addGlobalData` method. This is especially useful for plugins.

The first value of `addGlobalData` is the key that will be available to your templates and the second value is the value of the value returned to the template.

## Literals

{% set codeContent %}
export default function ($config) {
	// Values can be static:
	$config.addGlobalData("myString", "myValue");
};
{% endset %}
{% include "snippets/configDefinition.njk" %}

## More Complex Paths

The first argument can be any [lodash-set compatible path](https://lodash.com/docs/4.17.15#set):

{% set codeContent %}
export default function ($config) {
	$config.addGlobalData("myNestedObject.myString", "myValue");
};
{% endset %}
{% include "snippets/configDefinition.njk" %}


## Functions

Importantly, passing a `function` to `addGlobalData` will evaluate that function before setting the value to the data cascade (and is async-friendly).

{% set codeContent %}
export default function ($config) {
	$config.addGlobalData("myDate", () => new Date());

	// myDate’s value will be a Date instance
};
{% endset %}
{% include "snippets/configDefinition.njk" %}

If you want a `function` returned, make sure you nest it:

{% set codeContent %}
export default function ($config) {
	$config.addGlobalData("myFunction", () => {
		return () => new Date();
	});

	// myFunction’s value will be a function that returns a Date instance
};
{% endset %}
{% include "snippets/configDefinition.njk" %}

The above is important to know when using this API with [Computed Data](/docs/data-computed/#using-javascript):

{% set codeContent %}
export default function ($config) {
	$config.addGlobalData("eleventyComputed.myString", () => {
		return (data) => "This is a string!";
	});

	// myString’s value will be "This is a string!"
};
{% endset %}
{% include "snippets/configDefinition.njk" %}

### Async/Promises

{% set codeContent %}
export default function ($config) {
	// or a promise:
	$config.addGlobalData("myFunctionPromise", () => {
		return new Promise((resolve) => {
			setTimeout(resolve, 100, "foo");
		});
	});

	// or async:
	$config.addGlobalData("myAsyncFunction", async () => {
		return Promise.resolve("hi");
	});
};
{% endset %}
{% include "snippets/configDefinition.njk" %}

## Sources of Data

{% include "datasources.md" %}
