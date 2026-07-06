---
eleventyNavigation:
  parent: Template Languages
  key: Custom
  pinned: true
  order: 4
  excerpt: Use your own template language
relatedKey: customlang
relatedTitle: Template Language—Custom
layout: layouts/langs.njk
---

{% tableofcontents "open" %}

| Eleventy Short Name | File Extension | npm Package |
| ------------------- | -------------- | ----------- |
| _(Any)_             | `.*` _(Any)_   | _(Any)_     |

Eleventy now allows the addition of custom template extensions, meaning that you can use Eleventy to process any arbitrary file extension and compile it to your site’s output folder. This feature is {% addedin "1.0.0" %}<!-- Beta 10 or Canary 50 -->.

## Introductory Example: `*.clowd`

`clowd` is a pretend templating language that we’ve just created. It uses the `.clowd` file extension. The purpose of the language is to translate any occurrences of the word `cloud` to the word `butt` instead.

{% set codeContent %}
export default function ($config) {
	// Add as a valid extension to process
	// Alternatively, add this to the list of formats you pass to the `--formats` CLI argument
	$config.addTemplateFormats("clowd");

	// "clowd" here means that the extension will apply to any .clowd file
	$config.addExtension("clowd", {
		compile: async (inputContent) => {
			// Replace any instances of cloud with butt
			let output = inputContent.replace(/cloud/gi, "butt");

			return async () => {
				return output;
			};
		},
	});
};
{% endset %}
{% include "snippets/configDefinition.njk" %}

{% callout "info", "md-block" -%}
Situations where you might want to use `addExtension` but probably shouldn’t:

1. If you want to post-process the content of an existing template language (a file extension already processed by Eleventy), use a [Configuration API Transform](/docs/config/#transforms) instead.
2. If you want to pre-process `md` or `html` files using another template language, change the _Default Template Engine for [Markdown Files](/docs/config/#default-template-engine-for-markdown-files)_ or _[HTML Files](/docs/config/#default-template-engine-for-html-files)_, respectively. This can also be done on [a per-template basis](/docs/template-overrides/). We will likely add additional hooks for preprocessing in the future.
   {%- endcallout %}

## Example: Add Sass support to Eleventy

For a more realistic sample, here’s an example of Eleventy looking for all `.scss` files in a project’s input directory to process them to your output directory.

{% set codeContent %}
// Don’t forget to `npm install sass`!
import * as sass from "sass";

export default function ($config) {
	$config.addTemplateFormats("scss");

	// Creates the extension for use
	$config.addExtension("scss", {
		outputFileExtension: "css", // optional, default: "html"

		// `compile` is called once per .scss file in the input directory
		compile: async function (inputContent) {
			let result = sass.compileString(inputContent);

			// This is the render function, `data` is the full data cascade
			return async (data) => {
				return result.css;
			};
		},
	});
};
{% endset %}
{% include "snippets/configDefinition.njk" %}

We’re using `compileString` from the Sass library above for speed benefits over their asynchronous counterparts (reported by [the Sass documentation](https://sass-lang.com/documentation/js-api#usage)).

Note also that the `data` is not used in the above example. This is the full Eleventy data cascade and may be more useful in other templating languages.

The above extension would process a file located at `subdir/test.scss` to the output directory at `_site/subdir/test.css`.

## Using `inputPath`

You can pass in both the file’s `inputPath` and the Eleventy includes folder to provide a set of directories to look for when using Sass’ `@use`, `@forward`, and `@import` features. Read more about [`loadPaths` on the Sass documentation](https://sass-lang.com/documentation/js-api/interfaces/Options#loadPaths).

<!-- TODO -->
{% codetitle "buildawesome.config.js" %}

```diff-js
// some configuration omitted…
+compile: function (inputContent, inputPath) {
+	let { dir } = path.parse(inputPath);

let result = sass.compileString(inputContent, {
+		loadPaths: [
+			dir || ".",
+			this.config.dir.includes
+		]
	});

	return (data) => {
		return result.css;
	};
}
// …
```

Make special note of the `this.config.dir.includes` folder above. Declaring your includes folder means that you don’t need to prefix any file paths with the includes folder name (e.g. `_includes/_code.scss` can be consumed with `@use "code"`).

## Registering Dependencies {% addedin "2.0.0-canary.19" %}

Eleventy includes two features to improve the performance of custom template compilation:

1. A compilation cache, which you can optionally disable with [`compileOptions.cache`](#compileoptions.cache-for-advanced-control-of-caching)
2. Hooks for incremental builds (via the `--incremental` command line flag)

To facilitate these features, if a template syntax allows use of other templates (think `@use` in Sass or `webc:import` in WebC), Eleventy needs to know about the dependencies a template file relies on. This is heavily dependent on each template compiler.

In our Sass example, this is exposed by Sass via the [`loadedUrls` property from the `compileString` function](https://sass-lang.com/documentation/js-api/interfaces/CompileResult), and you can see an example of how we register our dependencies in the `compile` method below:

```diff-js
// some configuration omitted…
compile: function (inputContent, inputPath) {
	let result = sass.compileString(inputContent);

+	this.addDependencies(inputPath, result.loadedUrls);

	return async (data) => {
		return result.css;
	};
}
// …
```

`addDependencies`’s first parameter is the parent template file path. The second parameter is an Array of child file paths used by the template. The dependencies can be either relative or absolute paths and we will normalize them as needed.

## Skipping a template from inside of the `compile` function

To add support for Sass’ underscore convention (file names that start with an underscore aren’t written to the output directory), just return early in the `compile` function (don’t return a `render` function).

```diff-js
// some configuration omitted…
compile: async function (inputContent, inputPath) {
	let parsed = path.parse(inputPath);
+	if(parsed.name.startsWith("_")) {
+		return;
+	}

	let result = sass.compileString(inputContent);

	return async (data) => {
		return result.css;
	};
}
// …
```

Note that files inside of the `_includes` folder are left out of processing by default, so if you store your sass `@use`, `@forward`, and `@import` files in there you’ll get this for free (see the [Using `inputPath` example](#using-inputpath) above)!

This functionality is more-or-less identical to the [`compileOptions` `permalink: false` overrides](#compile-options-permalink-to-override-permalink-compilation), documented later on this page.

## Aliasing an Existing Template Language

{% addedin "2.0.0-canary.19" %} If `key` is the _only_ property in the options object, we treat the extension as an alias and use the existing upstream template syntax.

{% set codeContent %}
export default function ($config) {
	$config.addExtension("11ty.jsx", {
		key: "11ty.js",
	});

	// Or, you can pass an array of extensions in {{ "2.0.0-canary.19" | coerceVersion }} or newer.
	$config.addExtension(["11ty.jsx", "11ty.ts", "11ty.tsx"], {
		key: "11ty.js",
	});
};
{% endset %}
{% include "snippets/configDefinition.njk" %}

You can read about the above approach (and see more detailed examples of its usage) on the [TypeScript](/docs/languages/typescript/), [JSX](/docs/languages/jsx/), or [MDX](/docs/languages/mdx/) documentation pages.

{% addedin "3.0.0-alpha.11" %} `key` needn’t be the only property in the options object. If you want to add your own `compile` function, [keep reading](#overriding-or-extending-an-existing-template-language)!

{% addedin "3.0.0-alpha.11" %} **Breaking Change**: Starting in Eleventy 3.0 you must add the new alias to [your declared template formats](/docs/config.md#template-formats) for the new template type to be processed.

## Overriding or Extending an Existing Template Language

<span id="overriding-a-built-in-template-language"></span><span id="#overriding-an-existing-template-language"></span> You can override or extend existing template languages too! (Thank you to [Ben Holmes for this contribution](https://github.com/11ty/eleventy/pull/1871)).

In these example, we switch from the Eleventy default `markdown-it` to `marked` for markdown processing.

{% set codeContent %}
import { marked } from "marked";

export default function ($config) {
	$config.addExtension("md", {
		compile: function (inputContent, inputPath) {
			let html = marked.parse(inputContent);

			return function (data) {
				// Example: use `marked` only if useMarked is set in the Data Cascade
				if (data.useMarked) {
					return html;
				}

				// You can also access the default `markdown-it` renderer here:
				return this.defaultRenderer(data);
			};
		},
	});
};
{% endset %}
{% include "snippets/configDefinition.njk" %}

Note that overriding `md` opts-out of the default pre-processing by another template language [Markdown Files](/docs/config/#default-template-engine-for-markdown-files). As mentioned elsewhere, improvements to add additional hooks for preprocessing will likely come later.

You can override a template language once. Any attempts to override an more than once via `addExtension` will throw an error.

{% addedin "3.0.0-alpha.11" %} Adding `key` in the options object unlocks use of the target `defaultRenderer`. You can read about this approach (and see examples of its usage) on the [TypeScript](/docs/languages/typescript/), [JSX](/docs/languages/jsx/), or [MDX](/docs/languages/mdx/) documentation pages (all of which use `key: "11ty.js"` to extend [JavaScript](/docs/languages/javascript/) templates).

## Access to Existing Filters and Shortcodes

If you want to add support for universal filters and shortcodes in your custom template language, you can do so with the following configuration API methods. Related [GitHub #3310](https://github.com/11ty/eleventy/issues/3310).

* `$config.getFilter(name)` {% addedin "0.10.0" %}
* `$config.getFilters()` {% addedin "3.0.0-alpha.15" %}
* `$config.getShortcode(name)` {% addedin "3.0.0-alpha.15" %}
* `$config.getShortcodes()` {% addedin "3.0.0-alpha.15" %}
* `$config.getPairedShortcode(name)` {% addedin "3.0.0-alpha.15" %}
* `$config.getPairedShortcodes()` {% addedin "3.0.0-alpha.15" %}

## Full Options List

### `compile`

- _Required_ for new file extensions. _Optional_ for [aliases](#aliasing-an-existing-template-language).

`compile` is an async-friendly function that takes two parameters:

- `inputContent`: the full content of the file to parse (as a string).
- `inputPath`: the path to the file (as a string, useful for looking up relative imports)

`compile` can return:

- nothing (`undefined`) to indicate that the file should be ignored and not used as a page
- a render function (also async-friendly)

```js
	// some configuration truncated …
	compile: async (inputContent, inputPath) => {
		return async () => {
			return inputContent;
		};
	},
```

The render function is passed the merged data object (i.e. the full Data Cascade available inside templates). The render function returned from `compile` is called once per output file generated (one for basic templates and more for [paginated templates](/docs/pagination/)).

{% callout "info", "md" %}`inputContent` will **not include front matter**. This will have been parsed, removed, and inserted into the Data Cascade. Also note that if `read: false` (as documented below), `inputContent` will be `undefined`.{% endcallout %}

<details>
<summary><strong>Advanced: Adding Eleventy’s Scoped Data to your Compile Function</strong></summary>

Shortcodes and Filters both provide access to `page` and `eleventy` (via `this.page` and `this.eleventy` specifically). If you’d like to add the same for your custom template, you can do so via the `augmentFunctionContext` method.

```js
	compile: function(compileFn) {
		return function(data) {
			// Binds this.page and this.eleventy to your render context (and any future additions added later)
			let renderFn = $config.augmentFunctionContext(compileFn, {
				source: data,

				// Overwrite existing values?
				// overwrite: true,

				// Lazily fetch the key using `getter`
				// lazy: false,
				// getter: (key, context) => context?.[key];
			});

			return renderFn(data);
		};
	}
```

</details>

### `outputFileExtension`

- _Optional_: Defaults to `html`

When the output file is written to the file system, what file extension should be used?

### `init`

- _Optional_

An async-friendly function that runs _once_ (no matter how many files use the extension) for any additional setup at the beginning before any compilation or rendering.

Note that `init` will **not** re-run on watch/serve mode. If you’d like something that runs before _every_ build, use the [`eleventy.before` event](/docs/events/#eleventy.before).

```js
	// some configuration truncated …
  init: async function() {
    // has access to current configuration settings in `this.config`
  },
```

### `read`

- _Optional_: Defaults to `true`

Set to `false` to opt out of reading the contents of files from the file system. This is useful if you’re using an external bundler to read the files.

```js
	// some configuration truncated …
  read: false,
```

Use with `compileOptions.setCacheKey` to get more fine-grained control over how the template is cached.

<!-- ## `extension`

You probably won’t need this but it’s useful if your extension doesn’t match the template language key. -->

### `useLayouts` {% addedin "v3.0.0-alpha.14" %}

- _Optional_: Defaults to `true`

Whether or not [Layouts](/docs/layouts.md) will be applied to this template language. This will also exclude data from layout files to play a part in the data cascade of this template type as well. Related [GitHub #2830](https://github.com/11ty/eleventy/issues/2830).

### `useJavaScriptImport` {% addedin "v3.0.0-beta.2" %}

Use the JavaScript loader instead of reading from the file system. If enabled, this takes precedence over `read` option.

```js
	useJavaScriptImport: true,
	getInstanceFromInputPath: async function(inputPath) {
		let mod = await import(inputPath);
		return mod.default;
	},
	compile: (compileFn) => compileFn,
```

### `getData` and `getInstanceFromInputPath`

- _Optional_

Controls if and how additional data should be retrieved from a JavaScript object to populate the Data Cascade. If your templates aren’t compiling JavaScript objects, you probably won’t need this.

Notably, this is separate from (in addition to) front matter parsing (which requires `read: true`).

```js
	// some configuration truncated …
	// `false` is the default
	getData: false, // no additional data is used
```

```js
	// some configuration truncated …
  getData: async function(inputPath) {
    // DIY, this object will be merged into data cascade
    return {};
  },
```

```js
	// some configuration truncated …
  // get the `data` property from the instance.
  getData: ["data"],
  // * `getData: true` is aliased to ["data"]
  // * You can use more than one property name! ["data", "otherPropName"]

  getInstanceFromInputPath: function(inputPath) {
    // Return the JavaScript object from which the `data` property will be retrieved.
    let instance = doSomethingMyselfToFetchAJavaScriptObject(inputPath);
    return instance;
  }
```

<details>
  <summary><strong><em>Advanced Use Case:</em></strong> overriding <code>getData</code> keys for one instance</summary>

If the JavaScript object returned from `getInstanceFromInputPath` has an `eleventyDataKey` property, this is used to override the keys returned from the `getData` Array for this specific instance only. Anything you can pass into a [`new Set()` constructor](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/Set) works here (Array, Map, another Set).

```js
	// some configuration truncated …
  // if getData is `false`, `eleventyDataKey` will not be used.
  getData: true,

  getInstanceFromInputPath: function(inputPath) {
    return {
      // Overrides `getData` for this instance
      eleventyDataKey: ["myOverrideData"],

      // Will not be used
      data: {
        notAvailableOnGlobalData: 456
      },

      // Will be used.
      myOverrideData: {
        availableOnGlobalData: 123
      }
    }
  },
```

In the above example, the data cascade will include a top-level variable `availableOnGlobalData` with a value of `123`. Using `eleventyDataKey` overrides any keys set in `getData`, which means (for this instance) `data` will be ignored and `notAvailableOnGlobalData` will not be present.

</details>

### `compileOptions`

<div id="compileoptions.permalink-to-override-permalink-compilation"><!-- this id necessary for upgrade plugin https://github.com/11ty/eleventy-upgrade-help/issues/12 --></div>

#### `compileOptions.permalink` to Override Permalink Compilation

_Optional_. This has the same signature as the `compile` function and expects a reusable `render` function to be returned.

```js
  // some configuration truncated …
  compileOptions: {
    permalink: function(contents, inputPath) {
      return (data) => {
        // Return a string to override: you’ll want to use `data.page`
        // Or `return;` (return undefined) to fallback to default behavior
      }
    }
  },
```

- Don’t compile permalink strings in the parent template language
  - `permalink: "raw"` (new default in v3.0, related [GitHub #2780](https://github.com/11ty/eleventy/issues/2780))
- Don’t write _any_ files to the file system:
  - `permalink: false`
  - `permalink: (contents, inputPath) => false`
  - `permalink: (contents, inputPath) => ((data) => false)`
- Override the default permalink function (return a string to override)
  - `permalink: (contents, inputPath) => "…"`
  - `permalink: (contents, inputPath) => ((data) => "…")` (use the data cascade)
  - If you return nothing (or `undefined`), this will revert to the default permalink behavior.

This provides another way to implement Sass’ underscore convention to skip writing the file to the output directory:

{% codetitle "buildawesome.config.js" %}

```js
	// … some configuration truncated
  compileOptions: {
    permalink: function(contents, inputPath) {
      let parsed = path.parse(inputPath);
      if(parsed.name.startsWith("_")) {
        return false;
      }
    }
  },
```

#### `compileOptions.spiderJavaScriptDependencies`

- _Optional_: Defaults to `false`

Enable to use Eleventy to spider and watch files `require`’d in these templates. This allows you to control the [Watch JavaScript Dependencies](/docs/watch-serve/#watch-javascript-dependencies) feature on a per-template language basis. Most template languages will want the default here and keep this feature disabled.

#### `compileOptions.cache` for advanced control of caching

- _Optional_: Defaults to the value of `read`

This controls caching for the compilation step and saves the compiled template function for reuse. For more efficient cleanup (and long term memory use), these caches are now segmented by `inputPath` ({% addedin "2.0.0-canary.19" %}).

By default, whether or not this `cache` is enabled is tied to boolean value of `read`. If `read: true`, then `cache` will also be `true`. It’s unlikely you will need this, but you can override this to mismatch `read`.

You can also granularly control the caching key using a `getCacheKey` callback. It might be useful to change this when using `read: false` and `contents` are unavailable.

{% callout "info", "md" %}If you’re using {{ "2.0.0-canary.19" | coerceVersion }} or newer, you shouldn’t need a `getCacheKey` callback. It is preferred to use the [`addDependencies` method in the `compile` callback](#registering-dependencies) instead!{% endcallout %}

<details>
<summary><strong>Expand to see the default <code>getCacheKey</code> implementation</strong> (you can override this!)</summary>

```js
	// some configuration truncated …
  read: false,
  compileOptions: {
    cache: true,
    getCacheKey: function(contents, inputPath) {
      // return contents; // this is the default in 1.0

      // return inputPath + contents; // this is the new default in {{ "2.0.0-canary.16" | coerceVersion }}

      return inputPath; // override to cache by inputPath (this means the compile function will not get called when the file contents change)

      // Conditionally opt-out of cache with `return false`
      // if(someArbitraryCondition) {
      //   return false;
      // }
    }
  },
```

</details>

### `isIncrementalMatch`

{% callout "info", "md" %}If you’re using {{ "2.0.0-canary.19" | coerceVersion }} or newer, you shouldn’t need an `isIncrementalMatch` callback. It is preferred to use the [`addDependencies` method in the `compile` callback](#registering-dependencies) instead!{% endcallout %}

- _Optional_

A callback used for advanced control of template dependency matching. This determines if a modified file (from a watch/serve rebuild) is relevant to each known full template file. If the callback returns true, the template will be rendered. If the callback returns false, the template will be skipped.

<details>
<summary><strong>Expand to see the default `isIncrementalMatch` implementation</strong> (you can override this!)</summary>

```js
	// some configuration truncated …
  // Called once for each template (matching this custom template’s file extension) in your project.
  isIncrementalMatch: function(modifiedFile) {
    // is modifiedFile relevant to this.inputPath?
    if (this.isFileRelevantToInputPath) {
      // True if they are the same file
      // Or if they are related by any `addDependencies` relationships
      return true;
    }

    // If `modifiedFile` is not a full template (maybe an include or layout)
    // and we have no record of any dependencies for this file, we re-render everything
    if (!this.doesFileHaveDependencies && !this.isFullTemplate) {
      return true;
    }

    // Skip it
    return false;
  },
```

</details>

You can see more advanced override implementations in [`@11ty/eleventy-plugin-webc`](https://github.com/11ty/eleventy-plugin-webc/blob/a33dc641dfc7845d179f7bc60f9ab2d9a9177773/src/eleventyWebcTemplate.js) ~~and [`@11ty/eleventy-plugin-vue`](https://github.com/11ty/eleventy-plugin-vue/blob/f705297dea3442b918b0659b5770d7eb069bb886/.eleventy.js)~~.