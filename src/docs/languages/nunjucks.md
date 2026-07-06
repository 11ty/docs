---
eleventyNavigation:
  parent: Template Languages
  key: Nunjucks
  order: 2
  excerpt: Popular language for generating HTML and more
relatedKey: nunjucks
relatedTitle: Template Language—Nunjucks
tags:
  - related-filters
  - related-shortcodes
  - related-custom-tags
layout: layouts/langs.njk
---

{% tableofcontents "open" %}

| Eleventy Short Name | File Extension | npm Package                                       |
| ------------------- | -------------- | ------------------------------------------------- |
| `njk`               | `.njk`         | [`nunjucks`](https://mozilla.github.io/nunjucks/) |

| Eleventy version | `nunjucks` version |
| --- | --- |
| `@11ty/eleventy@0.x` | `nunjucks@3.x` |
| `@11ty/eleventy@1.x` | `nunjucks@3.x` |
| `@11ty/eleventy@2.x` | `nunjucks@3.x` |
| `@11ty/eleventy@3.x` | `nunjucks@3.x` |

You can override a `.njk` file’s template engine. Read more at [Changing a Template’s Rendering Engine](/docs/template-overrides/).

## Nunjucks Environment Options

We use [Nunjucks defaults for all environment options](https://mozilla.github.io/nunjucks/api.html#configure) (shown in the `configure` section of the Nunjucks docs).

### Optional: Use your Nunjucks Environment Options {% addedin "1.0.0" %}

It’s recommended to use the Configuration API to override the default Nunjucks options.

{% set codeContent %}
export default function ($config) {
	$config.setNunjucksEnvironmentOptions({
		throwOnUndefined: true,
		autoescape: false, // warning: don’t do this!
	});
};
{% endset %}
{% include "snippets/configDefinition.njk" %}

### Advanced: Use your Nunjucks Environment {% addedin "0.3.0" %}

While it is preferred and simpler to use the Options-specific API method above (new in Eleventy 1.0!)—as an escape mechanism for advanced usage you may pass in your own instance of a [Nunjucks Environment](https://mozilla.github.io/nunjucks/api.html#environment) using the Configuration API.

{% callout "warn" %}Not compatible with <code>setNunjucksEnvironmentOptions</code> above—this method will <em>override</em> any configuration set there.{% endcallout %}

{% set codeContent %}
import Nunjucks from "nunjucks";

export default function ($config) {
	let nunjucksEnvironment = new Nunjucks.Environment(
		new Nunjucks.FileSystemLoader("_includes")
	);

	$config.setLibrary("njk", nunjucksEnvironment);
};
{% endset %}
{% include "snippets/configDefinition.njk" %}

## Supported Features

| Feature                                                           | Syntax                                                                                                                                                                                                                                                                        |
| ----------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ✅ Includes                                                       | `{% raw %}{% include 'included.njk' %}{% endraw %}` looks in `_includes/included.njk`. Filenames must be in quotes. Does not process front matter in the include file.                                                                                                        |
| ✅ Includes (Relative Path) {% addedin "0.9.0" %}                 | Relative paths use `./` (template’s directory) or `../` (template’s parent directory).<br><br>Example: `{% raw %}{% include './included.njk' %}{% endraw %}` looks for `included.njk` in the template’s current directory. Does not process front matter in the include file. |
| ✅ Extends                                                        | `{% raw %}{% extends 'base.njk' %}{% endraw %}` looks in `_includes/base.njk`. Does not process front matter in the include file.                                                                                                                                             |
| ✅ Extends (Relative Path) {% addedin "0.9.0" %}                  | Relative paths use `./` (template’s directory) or `../` (template’s parent directory)<br><br>Example: `{% raw %}{% extends './base.njk' %}{% endraw %}` looks for `base.njk` in the template’s current directory. Does not process front matter in the include file.          |
| ✅ Imports                                                        | `{% raw %}{% import 'macros.njk' %}{% endraw %}` looks in `_includes/macros.njk`. Does not process front matter in the include file.                                                                                                                                          |
| ✅ Imports (Relative Path) {% addedin "0.9.0" %}                  | Relative paths use `./` (template’s directory) or `../` (template’s parent directory):<br>`{% raw %}{% import './macros.njk' %}{% endraw %}` looks for `macros.njk` in the template’s current directory. Does not process front matter in the include file.                   |
| ✅ Filters                                                        | `{% raw %}{% name \| filterName %}{% endraw %}` Read more about [Filters](/docs/filters/).                                                                                                                                                                                    |
| ✅ [Universal Filters](/docs/filters/) | `{% raw %}{% name \| filterName %}{% endraw %}` Read more about [Filters](/docs/filters/).                                                                                                                                                                                    |
| ✅ [Custom Tags](/docs/custom-tags/)                              | `{% raw %}{% uppercase name %}{% endraw %}` Read more about [Custom Tags](/docs/custom-tags/). {% addedin "0.5.0" %}                                                                                                                                                          |
| ✅ [Shortcodes](/docs/shortcodes/)                                | `{% raw %}{% uppercase name %}{% endraw %}` Read more about [Shortcodes](/docs/shortcodes/). {% addedin "0.5.0" %}                                                                                                                                                            |

## Filters

Filters are used to transform or modify content. You can add Nunjucks specific filters, but you probably want to add a [Universal filter](/docs/filters/) instead.

Read more about [Nunjucks Filter syntax](https://mozilla.github.io/nunjucks/templating.html#filters).

{% set codeContent %}
export default function($config) {
  // Nunjucks Filter
  $config.addNunjucksFilter("myNjkFilter", function(value) { /* … */ });

  // Nunjucks Asynchronous Filter (read on below)
  $config.addNunjucksAsyncFilter("myAsyncNjkFilter", function(value, callback) { /* … */ });

  // Universal filters (Adds to Liquid, Nunjucks, and 11ty.js)
  $config.addFilter("myFilter", function(value) { /* … */ });
};
{% endset %}
{% include "snippets/configDefinition.njk" %}

### Usage

{% raw %}

```html
<h1>{{ myVariable | myFilter }}</h1>
```

{% endraw %}

### Multiple Filter Arguments

{% set codeContent %}
export default function ($config) {
	// Nunjucks Filter
	$config.addNunjucksFilter(
		"concatThreeStrings",
		function (arg1, arg2, arg3) {
			return arg1 + arg2 + arg3;
		}
	);
};
{% endset %}
{% include "snippets/configDefinition.njk" %}

{% raw %}

```html
<h1>{{ "first" | concatThreeThings("second", "third") }}</h1>
```

{% endraw %}

### Asynchronous Nunjucks Filters {% addedin "0.2.13" %}

By default, almost all templating engines are synchronous. Nunjucks supports some asynchronous behavior, like filters. Here’s how that works:

{% set codeContent %}
export default function ($config) {
	$config.addNunjucksAsyncFilter(
		"myAsyncFilter",
		function (value, callback) {
			setTimeout(function () {
				callback(null, "My Result");
			}, 100);
		}
	);
};
{% endset %}
{% include "snippets/configDefinition.njk" %}

The last argument here is the callback function, the first argument of which is the error object and the second is the result data. Use this filter like you would any other: `{% raw %}{{ myValue | myAsyncFilter }}{% endraw %}`.

Here’s a Nunjucks example with 2 arguments:

{% set codeContent %}
export default function ($config) {
	$config.addNunjucksAsyncFilter(
		"myAsyncFilter",
		function (value1, value2, callback) {
			setTimeout(function () {
				callback(null, "My Result");
			}, 100);
		}
	);
};
{% endset %}
{% include "snippets/configDefinition.njk" %}

Multi-argument filters in Nunjucks are called like this: `{% raw %}{{ myValue1 | myAsyncFilter(myValue2) }}{% endraw %}`.

## Shortcodes

Shortcodes are reusable bits of content. You can add Nunjucks specific shortcodes, but it’s probably easier to add a [Universal shortcode](/docs/shortcodes/) instead.

### Single Shortcode

{% set codeContent %}
export default function($config) {
  // Nunjucks Shortcode
  $config.addNunjucksShortcode("user", function(name, twitterUsername) { /* … */ });

  // Universal Shortcodes (Adds to Liquid, Nunjucks, 11ty.js)
  $config.addShortcode("user", function(name, twitterUsername) {
    return `<div class="user">
<div class="user_name">${name}</div>
<div class="user_twitter">@${twitterUsername}</div>
</div>`;
  });
};
{% endset %}
{% include "snippets/configDefinition.njk" %}

#### Nunjucks Template Usage

{% raw %}

```njk
{% user "Zach Leatherman", "zachleat" %}
```

{% endraw %}

#### Outputs

```html
<div class="user">
	<div class="user_name">Zach Leatherman</div>
	<div class="user_twitter">@zachleat</div>
</div>
```

### Paired Shortcode

{% set codeContent %}
export default function($config) {
  // Nunjucks Shortcode
  $config.addPairedNunjucksShortcode("user", function(bioContent, name, twitterUsername) { /* … */ });

  // Universal Shortcodes (Adds to Liquid, Nunjucks, 11ty.js)
  $config.addPairedShortcode("user", function(bioContent, name, twitterUsername) {
    return `<div class="user">
<div class="user_name">${name}</div>
<div class="user_twitter">@${twitterUsername}</div>
<div class="user_bio">${bioContent}</div>
</div>`;
  });
};
{% endset %}
{% include "snippets/configDefinition.njk" %}

#### Nunjucks Usage

Note that you can put any Nunjucks tags or content inside the `{% raw %}{% user %}{% endraw %}` shortcode! Yes, even other shortcodes!

{% raw %}

```njk
{% user "Zach Leatherman", "zachleat" %}
  Zach likes to take long walks on Nebraska beaches.
{% enduser %}
```

{% endraw %}

##### Outputs

```html
<div class="user">
	<div class="user_name">Zach Leatherman</div>
	<div class="user_twitter">@zachleat</div>
	<div class="user_bio">Zach likes to take long walks on Nebraska beaches.</div>
</div>
```

### Shortcode Named Argument Syntax (Nunjucks-only)

Creates a single argument object to pass to the shortcode.

{% set codeContent %}
export default function($config) {
	// Nunjucks Shortcode
	$config.addNunjucksShortcode("user", function (user) {
		return `<div class="user">
<div class="user_name">${user.name}</div>
${user.twitter ? `<div class="user_twitter">@${user.twitter}</div>` : ""}
</div>`;
	});
};
{% endset %}
{% include "snippets/configDefinition.njk" %}

#### Nunjucks Usage

The order of the arguments doesn’t matter.

{% raw %}

```njk
{% user name="Zach Leatherman", twitter="zachleat" %}
{% user twitter="zachleat", name="Zach Leatherman" %}
```

{% endraw %}

##### Outputs

```html
<div class="user">
	<div class="user_name">Zach Leatherman</div>
	<div class="user_twitter">@zachleat</div>
</div>
```

#### Nunjucks Usage

Importantly, this syntax means that any of the arguments can be optional (without having to pass in a bunch of `null, null, null` to maintain order).

{% raw %}

```html
{% user name="Zach Leatherman" %}
```

{% endraw %}

##### Outputs

```html
<div class="user">
	<div class="user_name">Zach Leatherman</div>
</div>
```

### Asynchronous Shortcodes {% addedin "0.10.0" %}

Note that the configuration methods here to add asynchronous shortcodes are different than their synchronous counterparts. This is just another gentle reminder here that these API methods are pretty verbose and it’s probably easier to add a [Universal shortcode](/docs/shortcodes/) instead.

{% set codeContent %}
export default function ($config) {
	$config.addNunjucksAsyncShortcode(
		"user",
		async function (name, twitterUsername) {
			return await fetchAThing();
		}
	);

	$config.addPairedNunjucksAsyncShortcode(
		"user2",
		async function (content, name, twitterUsername) {
			return await fetchAThing();
		}
	);
};
{% endset %}
{% include "snippets/configDefinition.njk" %}

#### Nunjucks Usage

This is identical to the synchronous Nunjucks usage.

{% raw %}

```njk
{% user "Zach Leatherman", "zachleat" %}

{% user2 "Zach Leatherman", "zachleat" %}
  Zach likes to take long walks on Nebraska beaches.
{% enduser2 %}
```

{% endraw %}

## Warning: Macros are not async-friendly

Per the Nunjucks documentation, [Nunjucks macros are not async-friendly](https://mozilla.github.io/nunjucks/templating.html#macro).

> If you are using the asynchronous API, please be aware that you cannot do anything asynchronous inside macros. This is because macros are called like normal functions. In the future we may have a way to call a function asynchronously. If you do this now, the behavior is undefined.

<div id="warning-the-set-tag-does-not-work-with-async-content"></div>

## Warning: `set` is not async-friendly

{% callout "pitfall" %}This is a <a href="/docs/pitfalls/"><strong>Common Pitfall</strong></a>.{% endcallout %}

[Nunjucks’ {% raw %}`{% set %}`{% endraw %} tag](https://mozilla.github.io/nunjucks/templating.html#set) does not work to capture asynchronous content (e.g. asynchronous shortcodes).

{% addedin "1.0.0" %}Starting in Eleventy v1.0.0, Eleventy provides a {% raw %}`{% setAsync %}`{% endraw %} tag to work around this limitation. Notably and contrary to `set`, `setAsync`’s first argument is a string.

{% raw %}

```njk
{% setAsync "myVariableName" %}
{% myAsyncShortcode %}
{% endsetAsync %}

<!-- Now use the variable -->
{{ myVariableName }}
```

{% endraw %}

<div id="access-to-page-data-values"></div>

## Access to Eleventy supplied data

You can access `page`, `eleventy`, `ctx`, and `env` in filters and shortcodes. Read more on the [Shortcodes](/docs/shortcodes/#scoped-data-in-shortcodes) and [Filters](/docs/filters/#scoped-data-in-filters) documentation.

## Generic Global {% addedin "1.0.0" %}

Nunjucks provides a custom way to [add globals](https://mozilla.github.io/nunjucks/api.html#addglobal) to templates. These can be any arbitrary JavaScript: functions, variables, etc. Note that this is not async-friendly (Nunjucks does not support `await` inside of templates).

{% set codeContent %}
export default function ($config) {
	$config.addNunjucksGlobal("fortythree", 43);
};
{% endset %}
{% include "snippets/configDefinition.njk" %}

{% raw %}

```
{{ fortythree }}
```

{% endraw %}

{% set codeContent %}
export default function ($config) {
	$config.addNunjucksGlobal("fortytwo", function () {
		return 42;
	});
};
{% endset %}
{% include "snippets/configDefinition.njk" %}

{% raw %}

```
{{ fortytwo() }}
```

{% endraw %}

Read more on the [Nunjucks documentation](https://mozilla.github.io/nunjucks/api.html#addglobal) or [relevant discussion on Eleventy Issue #1060](https://github.com/11ty/eleventy/pull/1060).