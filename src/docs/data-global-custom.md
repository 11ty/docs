---
eleventyNavigation:
  parent: Data Cascade
  key: Config Global Data
  order: 4
---

# Global Data from the Configuration API {% addedin "1.0.0" %}

In addition to [Global Data Files](/docs/data-global/) global data can be added to the Eleventy config object using the `addGlobalData` method. This is especially useful for plugins.

The first value of `addGlobalData` is the key that will be available to your templates and the second value is the value of the value returned to the template.

## Literals

<!-- prettier-ignore-start -->
{% set codeContent %}
export default function (eleventyConfig) {
	// Values can be static:
	eleventyConfig.addGlobalData("myString", "myValue");
};
{% endset %}

<!-- prettier-ignore-end -->
{% include "snippets/configDefinition.njk" %}

## More Complex Paths

The first argument can be any [lodash-set compatible path](https://lodash.com/docs/4.17.15#set):

<!-- prettier-ignore-start -->
{% set codeContent %}
export default function (eleventyConfig) {
	eleventyConfig.addGlobalData("myNestedObject.myString", "myValue");
};
{% endset %}

<!-- prettier-ignore-end -->
{% include "snippets/configDefinition.njk" %}

## Functions

Importantly, passing a `function` to `addGlobalData` will evaluate that function before setting the value to the data cascade (and is async-friendly).

<!-- prettier-ignore-start -->
{% set codeContent %}
export default function (eleventyConfig) {
	eleventyConfig.addGlobalData("myDate", () => new Date());

	// myDate’s value will be a Date instance
};
{% endset %}

<!-- prettier-ignore-end -->
{% include "snippets/configDefinition.njk" %}

If you want a `function` returned, make sure you nest it:

<!-- prettier-ignore-start -->
{% set codeContent %}
export default function (eleventyConfig) {
	eleventyConfig.addGlobalData("myFunction", () => {
		return () => new Date();
	});

	// myFunction’s value will be a function that returns a Date instance
};
{% endset %}

<!-- prettier-ignore-end -->
{% include "snippets/configDefinition.njk" %}

The above is important to know when using this API with [Computed Data](/docs/data-computed/#using-java-script):

<!-- prettier-ignore-start -->
{% set codeContent %}
export default function (eleventyConfig) {
	eleventyConfig.addGlobalData("eleventyComputed.myString", () => {
		return (data) => "This is a string!";
	});

	// myString’s value will be "This is a string!"
};
{% endset %}

<!-- prettier-ignore-end -->
{% include "snippets/configDefinition.njk" %}

### Async/Promises

<!-- prettier-ignore-start -->
{% set codeContent %}
export default function (eleventyConfig) {
	// or a promise:
	eleventyConfig.addGlobalData("myFunctionPromise", () => {
		return new Promise((resolve) => {
			setTimeout(resolve, 100, "foo");
		});
	});

	// or async:
	eleventyConfig.addGlobalData("myAsyncFunction", async () => {
		return Promise.resolve("hi");
	});
};
{% endset %}

<!-- prettier-ignore-end -->
{% include "snippets/configDefinition.njk" %}

## Sources of Data

{% include "datasources.md" %}
