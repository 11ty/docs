---
eleventyNavigation:
  key: Navigation
  title: '<i class="fa-solid fa-compass"></i>Navigation'
  order: 3
  excerpt: A plugin for creating hierarchical navigation in Eleventy projects. Supports breadcrumbs too!
---

# Navigation Plugin

{% tableofcontents %}

A plugin for creating infinite-depth hierarchical navigation in Eleventy projects. Supports breadcrumbs too! Used in production on this very website!

- This documentation is for `eleventy-navigation` `v0.3.x`.
- [GitHub](https://github.com/11ty/eleventy-navigation).

## Template Compatibility

- Any template language can add to navigation.
- Any template language compatible with [Universal Filters](/docs/filters/) can render the navigation menu.

## Installation

Available on [npm](https://www.npmjs.com/package/@11ty/eleventy-navigation).

{%- set codeBlock %}
npm install @11ty/eleventy-navigation
{%- endset %}
{{ codeBlock | highlight("bash") | safe }}

Open up your Eleventy config file (probably `buildawesome.config.js`) and use `addPlugin`:

{% set codeContent %}
import eleventyNavigationPlugin from "@11ty/eleventy-navigation";

export default function ($config) {
	$config.addPlugin(eleventyNavigationPlugin);
};
{% endset %}
{% include "snippets/configDefinition.njk" %}

Read more about [Eleventy plugins.](/docs/plugins/)

## Adding Templates to the Navigation

Add the `eleventyNavigation` object to your front matter data (or in a [data directory file](https://www.11ty.io/docs/data-template-dir/)). Assign a unique string to the `key` property inside of `eleventyNavigation`.

### Example

#### mammals.md

```yaml
---
eleventyNavigation:
  key: Mammals
---
```

This gives us:

{% callout "demo", "md-block" %}

- Mammals
  {% endcallout %}

#### humans.md

To nest a template inside of the Mammals template, use `parent: Mammals`:

```yaml
---
eleventyNavigation:
  key: Humans
  parent: Mammals
---
```

Any templates that do not have `parent` will be assumed to be at the top level.

Now our navigation structure looks like:

{% callout "demo", "md-block" %}

- Mammals - Humans
  {% endcallout %}

#### bats.md

```yaml
---
eleventyNavigation:
  key: Bats
  parent: Mammals
---
```

Now our navigation structure looks like:

{% callout "demo", "md-block" %}

- Mammals - Humans - Bats
  {% endcallout %}

You can nest these as deep as you want! Want to put something under Humans or Bats? Use `parent: Humans` or `parent: Bats`. If you want to add another root template, leave out `parent`.

### Use alternate text for the navigation link

If you want your key and your link text to be different, use the `title` property:

```yaml
---
eleventyNavigation:
  key: Mammals
  title: All of the Mammals
---
```

### Re-Ordering Items

To ensure that Humans comes first before Bats, use the `order` property. It can have an arbitrary number. If omitted, `order: 0` is the default.

```yaml
---
eleventyNavigation:
  key: Humans
  parent: Mammals
  order: 1
---
```

```yaml
---
eleventyNavigation:
  key: Bats
  parent: Mammals
  order: 2
---
```

### Overriding the URL

{% addedin "Navigation v0.1.4" %} If you’d like to add a link to an external URL that is not on your local page, create a new file for it and add a `url` key.

```yaml
---
eleventyNavigation:
  key: Zach’s site
  url: https://www.zachleat.com/
permalink: false
---
```

Use [`permalink: false`](/docs/permalinks/#permalink-false) to ensure that this meta-template doesn’t create a file in your Eleventy site output.

## Rendering the Navigation Menu (Easy Mode)

Template languages that support [universal filters](/docs/filters/) are supported. If you’re tired of reading, just use one of the following. These are using [the filters documented below](#render-with-a-filter). If you want more control or need additional customization, keep reading!

### Output HTML

<is-land on:visible import="/js/seven-minute-tabs.js">
<seven-minute-tabs persist sync autoheight>
  {% renderFile "./src/_includes/syntax-chooser-tablist.11ty.js", {id: "navtohtml", additions: "webc"} %}
  <div id="navtohtml-liquid" role="tabpanel">

{% codetitle "Liquid", "Syntax" %}

{% raw %}

```liquid
{{ collections.all | eleventyNavigation | eleventyNavigationToHtml }}
```

{% endraw %}

  </div>
  <div id="navtohtml-njk" role="tabpanel">

{% codetitle "Nunjucks", "Syntax" %}

{% raw %}

```jinja2
{{ collections.all | eleventyNavigation | eleventyNavigationToHtml | safe }}
```

{% endraw %}

  </div>
	<div id="navtohtml-webc" role="tabpanel">

{% codetitle "WebC", "Syntax" %}

{% raw %}

```html
<nav
	@html="eleventyNavigationToHtml(eleventyNavigation($data.collections.all))"
></nav>
```

{% endraw %}

  </div>
  <div id="navtohtml-js" role="tabpanel">
    <p><em>This example has not yet been added—you can swap to another template language above! Or maybe you want to contribute it? {% include "edit-on-github.njk" %}</em></p>
  </div>
	<div id="navtohtml-cjs" role="tabpanel">
    <p><em>This example has not yet been added—you can swap to another template language above! Or maybe you want to contribute it? {% include "edit-on-github.njk" %}</em></p>
  </div>
</seven-minute-tabs>
</is-land>

### To Markdown

{% addedin "Navigation 0.3.1" %} This is most useful in `.md` files (preprocessed as Liquid or Nunjucks). It’s highly unlikely you want to output Markdown in a WebC file (but maybe you do, I’m not your parent). You probably want the HTML example above.

<is-land on:visible import="/js/seven-minute-tabs.js">
<seven-minute-tabs persist sync autoheight>
  {% renderFile "./src/_includes/syntax-chooser-tablist.11ty.js", {id: "navtomd", additions: "webc"} %}
  <div id="navtomd-liquid" role="tabpanel">

{% codetitle "Liquid", "Syntax" %}

{% raw %}

```liquid
{{ collections.all | eleventyNavigation | eleventyNavigationToMarkdown }}
```

{% endraw %}

  </div>
  <div id="navtomd-njk" role="tabpanel">

{% codetitle "Nunjucks", "Syntax" %}

{% raw %}

```jinja2
{{ collections.all | eleventyNavigation | eleventyNavigationToMarkdown | safe }}
```

{% endraw %}

  </div>
	<div id="navtomd-webc" role="tabpanel">

{% codetitle "WebC", "Syntax" %}

{% raw %}

```html
<nav
	@html="eleventyNavigationToMarkdown(eleventyNavigation($data.collections.all))"
></nav>
```

{% endraw %}

  </div>
  <div id="navtomd-js" role="tabpanel">
    <p><em>This example has not yet been added—you can swap to another template language above! Or maybe you want to contribute it? {% include "edit-on-github.njk" %}</em></p>
  </div>
	<div id="navtomd-cjs" role="tabpanel">
    <p><em>This example has not yet been added—you can swap to another template language above! Or maybe you want to contribute it? {% include "edit-on-github.njk" %}</em></p>
  </div>
</seven-minute-tabs>
</is-land>

## Advanced: Rendering the Navigation Bar (Deep Dive)

### Fetch the menu items using the `eleventyNavigation` Filter

The `eleventyNavigation` filter returns a _sorted_ array of objects with `url` and `title` properties (sorted using `order`, as noted above). If an entry has nested children, it will also include a `children` property with an array of similar objects (and those may contain `children` too, and so on).

#### Example: Fetch all pages

For our documented templates above with the following template:

<is-land on:visible import="/js/seven-minute-tabs.js">
<seven-minute-tabs persist sync autoheight>
  {% renderFile "./src/_includes/syntax-chooser-tablist.11ty.js", {id: "navrender"} %}
  <div id="navrender-liquid" role="tabpanel">

{% codetitle "Liquid", "Syntax" %}

{% raw %}

```liquid
{% assign navPages = collections.all | eleventyNavigation %}
{{ navPages | json }}
```

{% endraw %}

  </div>
  <div id="navrender-njk" role="tabpanel">

{% codetitle "Nunjucks", "Syntax" %}

{% raw %}

```jinja2
{% set navPages = collections.all | eleventyNavigation %}
{{ navPages | dump | safe }}
```

{% endraw %}

  </div>
  <div id="navrender-js" role="tabpanel">
    <p><em>This example has not yet been added—you can swap to another template language above! Or maybe you want to contribute it? {% include "edit-on-github.njk" %}</em></p>
  </div>
	<div id="navrender-cjs" role="tabpanel">
    <p><em>This example has not yet been added—you can swap to another template language above! Or maybe you want to contribute it? {% include "edit-on-github.njk" %}</em></p>
  </div>
</seven-minute-tabs>
</is-land>

{% callout "info" %}Note that you can also pass any collection into <code>eleventyNavigation</code>. It doesn’t have to be <code>collections.all</code>!{% endcallout %}

Shows that `navPages` has the following structure:

```json
[
	{
		"key": "Mammals",
		"url": "/mammals/",
		"title": "Mammals",
		"children": [
			{
				"key": "Humans",
				"parentKey": "Mammals",
				"url": "/humans/",
				"title": "Humans"
			},
			{
				"key": "Bats",
				"parentKey": "Mammals",
				"url": "/bats/",
				"title": "Bats"
			}
		]
	}
]
```

#### Example: Get just one Branch

Just show the children of a specific key, pass a key to `eleventyNavigation`:

<is-land on:visible import="/js/seven-minute-tabs.js">
<seven-minute-tabs persist sync autoheight>
  {% renderFile "./src/_includes/syntax-chooser-tablist.11ty.js", {id: "navrenderbranch"} %}
  <div id="navrenderbranch-liquid" role="tabpanel">

{% codetitle "Liquid", "Syntax" %}

{% raw %}

```liquid
{% assign navPages = collections.all | eleventyNavigation: "Mammals" %}
{{ navPages | json }}
```

{% endraw %}

  </div>
  <div id="navrenderbranch-njk" role="tabpanel">

{% codetitle "Nunjucks", "Syntax" %}

{% raw %}

```jinja2
{% set navPages = collections.all | eleventyNavigation("Mammals") %}
{{ navPages | dump | safe }}
```

{% endraw %}

  </div>
  <div id="navrenderbranch-js" role="tabpanel">
    <p><em>This example has not yet been added—you can swap to another template language above! Or maybe you want to contribute it? {% include "edit-on-github.njk" %}</em></p>
  </div>
	<div id="navrenderbranch-cjs" role="tabpanel">
    <p><em>This example has not yet been added—you can swap to another template language above! Or maybe you want to contribute it? {% include "edit-on-github.njk" %}</em></p>
  </div>
</seven-minute-tabs>
</is-land>

```json
[
	{
		"key": "Humans",
		"parentKey": "Mammals",
		"url": "/humans/",
		"title": "Humans"
	},
	{
		"key": "Bats",
		"parentKey": "Mammals",
		"url": "/bats/",
		"title": "Bats"
	}
]
```

#### Example: Breadcrumbs

You can also render only the parents of a specific key too, to make breadcrumb navigation. Pass a key to `eleventyNavigationBreadcrumb` like this:

<is-land on:visible import="/js/seven-minute-tabs.js">
<seven-minute-tabs persist sync autoheight>
  {% renderFile "./src/_includes/syntax-chooser-tablist.11ty.js", {id: "navbread"} %}
  <div id="navbread-liquid" role="tabpanel">

{% codetitle "Liquid", "Syntax" %}

{% raw %}

```liquid
{% assign navPages = collections.all | eleventyNavigationBreadcrumb: "Bats" %}
{{ navPages | json }}
```

{% endraw %}

  </div>
  <div id="navbread-njk" role="tabpanel">

{% codetitle "Nunjucks", "Syntax" %}

{% raw %}

```jinja2
{% set navPages = collections.all | eleventyNavigationBreadcrumb("Bats") %}
{{ navPages | dump | safe }}
```

{% endraw %}

  </div>
  <div id="navbread-js" role="tabpanel">
    <p><em>This example has not yet been added—you can swap to another template language above! Or maybe you want to contribute it? {% include "edit-on-github.njk" %}</em></p>
  </div>
	<div id="navbread-cjs" role="tabpanel">
    <p><em>This example has not yet been added—you can swap to another template language above! Or maybe you want to contribute it? {% include "edit-on-github.njk" %}</em></p>
  </div>
</seven-minute-tabs>
</is-land>

And an array of all the parents of the Bats entry will be returned (top-most parent is first):

```json
[
	{
		"key": "Mammals",
		"url": "/mammals/",
		"title": "Mammals"
	}
]
```

##### Include the current page in breadcrumb results

<is-land on:visible import="/js/seven-minute-tabs.js">
<seven-minute-tabs persist sync autoheight>
  {% renderFile "./src/_includes/syntax-chooser-tablist.11ty.js", {id: "navbreadself"} %}
  <div id="navbreadself-liquid" role="tabpanel">

{% codetitle "Liquid", "Syntax" %}

{% raw %}

```liquid
---
navOptions:
  includeSelf: true
---
{% assign navPages = collections.all | eleventyNavigationBreadcrumb: "Mammals", navOptions %}
{{ navPages | json }}
```

{% endraw %}

  </div>
  <div id="navbreadself-njk" role="tabpanel">

{% codetitle "Nunjucks", "Syntax" %}

{% raw %}

```jinja2
{% set navPages = collections.all | eleventyNavigationBreadcrumb("Bats", { includeSelf: true }) %}
{{ navPages | dump | safe }}
```

{% endraw %}

  </div>
  <div id="navbreadself-js" role="tabpanel">
    <p><em>This example has not yet been added—you can swap to another template language above! Or maybe you want to contribute it? {% include "edit-on-github.njk" %}</em></p>
  </div>
	<div id="navbreadself-cjs" role="tabpanel">
    <p><em>This example has not yet been added—you can swap to another template language above! Or maybe you want to contribute it? {% include "edit-on-github.njk" %}</em></p>
  </div>
</seven-minute-tabs>
</is-land>

##### Allow missing pages (nodes) in breadcrumbs

{% addedin "Navigation 0.3.3" %}

<is-land on:visible import="/js/seven-minute-tabs.js">
<seven-minute-tabs persist sync autoheight>
	{% renderFile "./src/_includes/syntax-chooser-tablist.11ty.js", {id: "navbreadmissing", subtractions: "hbs"} %}
  <div id="navbreadmissing-liquid" role="tabpanel">

{% codetitle "Liquid", "Syntax" %}

{% raw %}

```liquid
---
navOptions:
  allowMissing: true
---
{% assign navPages = collections.all | eleventyNavigationBreadcrumb: "Does not exist", navOptions %}
{{ navPages | json }}
```

{% endraw %}

  </div>
  <div id="navbreadmissing-njk" role="tabpanel">

{% codetitle "Nunjucks", "Syntax" %}

{% raw %}

```jinja2
{% set navPages = collections.all | eleventyNavigationBreadcrumb("Does not exist", { allowMissing: true }) %}
{{ navPages | dump | safe }}
```

{% endraw %}

  </div>
  <div id="navbreadmissing-js" role="tabpanel">
    <p><em>This example has not yet been added—you can swap to another template language above! Or maybe you want to contribute it? {% include "edit-on-github.njk" %}</em></p>
  </div>
  <div id="navbreadmissing-cjs" role="tabpanel">
    <p><em>This example has not yet been added—you can swap to another template language above! Or maybe you want to contribute it? {% include "edit-on-github.njk" %}</em></p>
  </div>
</seven-minute-tabs>
</is-land>

### Render the menu items using the `eleventyNavigationToHtml` or `eleventyNavigationToMarkdown` Filters

There are a couple of methods for rendering. Using the `eleventyNavigationToHtml` and `eleventyNavigationToMarkdown` filters will render the full navigation tree. Use this if you want to easily scale to an unlimited number of tiers/levels in your navigation. If you want full control of the markup, [render the structure manually using the Copy and Paste templates example below](#bring-your-own-html-render-the-menu-items-manually). Use this if your navigation will have one level/tier of items.

<div id="render-with-a-filter"></div>

With the Navigation structure returned from `eleventyNavigation` or `eleventyNavigationBreadcrumb`, we can render the navigation. Pass the object to the `eleventyNavigationToHtml` or `eleventyNavigationToMarkdown` filter to automatically output the full menu (as HTML or Markdown):

The `eleventyNavigationToMarkdown` filter is {% addedin "Navigation 0.3.1" %}.

<is-land on:visible import="/js/seven-minute-tabs.js">
<seven-minute-tabs persist sync autoheight>
  {% renderFile "./src/_includes/syntax-chooser-tablist.11ty.js", {id: "navrenderfilter"} %}
  <div id="navrenderfilter-liquid" role="tabpanel">

{% codetitle "Liquid", "Syntax" %}

{% raw %}

```liquid
{{ collections.all | eleventyNavigation | eleventyNavigationToHtml }}
```

```liquid
{{ collections.all | eleventyNavigationBreadcrumb: "Bats" | eleventyNavigationToHtml }}
```

{% endraw %}

  </div>
  <div id="navrenderfilter-njk" role="tabpanel">

{% codetitle "Nunjucks", "Syntax" %}

{% raw %}

```jinja2
{{ collections.all | eleventyNavigation | eleventyNavigationToHtml | safe }}
```

```jinja2
{{ collections.all | eleventyNavigationBreadcrumb("Bats") | eleventyNavigationToHtml | safe }}
```

{% endraw %}

  </div>
  <div id="navrenderfilter-js" role="tabpanel">
    <p><em>This example has not yet been added—you can swap to another template language above! Or maybe you want to contribute it? {% include "edit-on-github.njk" %}</em></p>
  </div>
  <div id="navrenderfilter-cjs" role="tabpanel">
    <p><em>This example has not yet been added—you can swap to another template language above! Or maybe you want to contribute it? {% include "edit-on-github.njk" %}</em></p>
  </div>
</seven-minute-tabs>
</is-land>

#### Showing excerpts

You can also use this to display a longer list of navigation items with description text. This is useful for category/index pages. Add `excerpt` to the `eleventyNavigation` object.

```yaml
---
eleventyNavigation:
  key: Mammals
  excerpt: Vertebrate animals of the class Mammalia.
---
```

When you render a navigation list, pass `showExcerpt: true` to the `eleventyNavigationToHtml` filter, like so:

<is-land on:visible import="/js/seven-minute-tabs.js">
<seven-minute-tabs persist sync autoheight>
  {% renderFile "./src/_includes/syntax-chooser-tablist.11ty.js", {id: "navexcerpt"} %}
  <div id="navexcerpt-liquid" role="tabpanel">

{% codetitle "Liquid", "Syntax" %}

{% raw %}

```liquid
---
navToHtmlOptions:
  showExcerpt: true
---
{{ collections.all | eleventyNavigation: "Humans", navToHtmlOptions | json }}
```

{% endraw %}

  </div>
  <div id="navexcerpt-njk" role="tabpanel">

{% codetitle "Nunjucks", "Syntax" %}

{% raw %}

```jinja2
---
navToHtmlOptions:
  showExcerpt: true
---
{{ collections.all | eleventyNavigation("Humans") | eleventyNavigationToHtml(navToHtmlOptions) | safe }}
```

{% endraw %}

  </div>
  <div id="navexcerpt-js" role="tabpanel">
    <p><em>This example has not yet been added—you can swap to another template language above! Or maybe you want to contribute it? {% include "edit-on-github.njk" %}</em></p>
  </div>
  <div id="navexcerpt-cjs" role="tabpanel">
    <p><em>This example has not yet been added—you can swap to another template language above! Or maybe you want to contribute it? {% include "edit-on-github.njk" %}</em></p>
  </div>
</seven-minute-tabs>
</is-land>

#### Advanced: All Rendering Options for `eleventyNavigationToMarkdown`

{% addedin "Navigation 0.3.1" %}

<is-land on:visible import="/js/seven-minute-tabs.js">
<seven-minute-tabs persist sync autoheight>
  {% renderFile "./src/_includes/syntax-chooser-tablist.11ty.js", {id: "navmdoptions"} %}
  <div id="navmdoptions-liquid" role="tabpanel">

{% codetitle "Liquid", "Syntax" %}

{% raw %}

```liquid
---
navToMdOptions:
  # Show excerpts (if they exist in data, read more above)
  showExcerpt: false
---
{{ collections.all | eleventyNavigation | eleventyNavigationToMarkdown: navToMdOptions | json }}
```

{% endraw %}

  </div>
  <div id="navmdoptions-njk" role="tabpanel">

{% codetitle "Nunjucks", "Syntax" %}

{% raw %}

```jinja2
---js
{
  navToMdOptions: {
    // Show excerpts (if they exist in data, read more above)
    showExcerpt: false
  }
}
---
{{ collections.all | eleventyNavigation | eleventyNavigationToMarkdown(navToMdOptions) | safe }}
```

{% endraw %}

  </div>
  <div id="navmdoptions-js" role="tabpanel">
    <p><em>This example has not yet been added—you can swap to another template language above! Or maybe you want to contribute it? {% include "edit-on-github.njk" %}</em></p>
  </div>
  <div id="navmdoptions-cjs" role="tabpanel">
    <p><em>This example has not yet been added—you can swap to another template language above! Or maybe you want to contribute it? {% include "edit-on-github.njk" %}</em></p>
  </div>
</seven-minute-tabs>
</is-land>

#### Advanced: All Rendering Options for `eleventyNavigationToHtml`

You can change the HTML elements, classes on the list and list items, and add an additional class for the current page’s navigation entry.

You can also add an `aria-current="page"` [ARIA attribute](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-current) with the
`useAriaCurrentAttr` option.
{% addedin "Navigation 1.0.0" %}

<is-land on:visible import="/js/seven-minute-tabs.js">
<seven-minute-tabs persist sync autoheight>
  {% renderFile "./src/_includes/syntax-chooser-tablist.11ty.js", {id: "navhtmloptions"} %}
  <div id="navhtmloptions-liquid" role="tabpanel">

{% codetitle "Liquid", "Syntax" %}

{% raw %}

```liquid
---js
{
  navigationOptions: {
    listElement: "ul",            // Change the top level tag
    listItemElement: "li",        // Change the item tag

    listClass: "",                // Add a class to the top level
    listItemClass: "",            // Add a class to every item
    listItemHasChildrenClass: "", // Add a class if the item has children
    activeListItemClass: "",      // Add a class to the current page’s item

    anchorClass: "",              // Add a class to the anchor
    activeAnchorClass: "",        // Add a class to the current page’s anchor

    useAriaCurrentAttr: true,     // Add aria-current="page" to the current page’s anchor

    // If matched, `activeListItemClass`, `activeAnchorClass`, and `aria-current` will be added
    activeKey: "",
    // It’s likely you want to pass in `eleventyNavigation.key` here, e.g.:
    // activeKey: eleventyNavigation.key

    // Show excerpts (if they exist in data, read more above)
    showExcerpt: false
  }
}
---
{{ collections.all | eleventyNavigation | eleventyNavigationToHtml: navigationOptions | json }}
```

{% endraw %}

  </div>
  <div id="navhtmloptions-njk" role="tabpanel">

{% codetitle "Nunjucks", "Syntax" %}

{% raw %}

```jinja2
---js
{
  navigationOptions: {
    listElement: "ul",            // Change the top level tag
    listItemElement: "li",        // Change the item tag

    listClass: "",                // Add a class to the top level
    listItemClass: "",            // Add a class to every item
    listItemHasChildrenClass: "", // Add a class if the item has children
    activeListItemClass: "",      // Add a class to the current page’s item

    anchorClass: "",              // Add a class to the anchor
    activeAnchorClass: "",        // Add a class to the current page’s anchor

    useAriaCurrentAttr: true,     // Add aria-current="page" to the current page’s anchor

    // If matched, `activeListItemClass`, `activeAnchorClass`, and `aria-current` will be added
    activeKey: "",
    // It’s likely you want to pass in `eleventyNavigation.key` here, e.g.:
    // activeKey: eleventyNavigation.key

    // Show excerpts (if they exist in data, read more above)
    showExcerpt: false
  }
}
---
{{ collections.all | eleventyNavigation | eleventyNavigationToHtml(navigationOptions) | safe }}
```

{% endraw %}

  </div>
  <div id="navhtmloptions-js" role="tabpanel">
    <p><em>This example has not yet been added—you can swap to another template language above! Or maybe you want to contribute it? {% include "edit-on-github.njk" %}</em></p>
  </div>
  <div id="navhtmloptions-cjs" role="tabpanel">
    <p><em>This example has not yet been added—you can swap to another template language above! Or maybe you want to contribute it? {% include "edit-on-github.njk" %}</em></p>
  </div>
</seven-minute-tabs>
</is-land>

These work with `eleventyNavigationBreadcrumb | eleventyNavigationToHtml` too.

If you find yourself using a lot of these `class` options, maybe you should use the _Advanced: Unlimited Child Levels_ example below and have full control of your HTML!

### Bring your own HTML: Render the menu items manually

This template will render a single tier of items (no children) _without_ using the `eleventyNavigationToHtml` or `eleventyNavigationToMarkdown` filters. This method gives you full control of the markup but is more complex with deeply nested menu structures.

Note that `eleventyNavigationToMarkdown` is {% addedin "Navigation 0.3.1" %}.

<is-land on:visible import="/js/seven-minute-tabs.js">
<seven-minute-tabs persist sync autoheight>
  {% renderFile "./src/_includes/syntax-chooser-tablist.11ty.js", {id: "navbyoh"} %}
  <div id="navbyoh-liquid" role="tabpanel">

{% codetitle "Liquid", "Syntax" %}

{% raw %}

```liquid
{% assign navPages = collections.all | eleventyNavigation %}
<ul>
{%- for entry in navPages %}
  <li{% if entry.url == page.url %} class="my-active-class"{% endif %}>
    <a href="{{ entry.url }}">{{ entry.title }}</a>
  </li>
{%- endfor %}
</ul>
```

{% endraw %}

  </div>
  <div id="navbyoh-njk" role="tabpanel">

{% codetitle "Nunjucks", "Syntax" %}

{% raw %}

```jinja2
{% set navPages = collections.all | eleventyNavigation %}
<ul>
{%- for entry in navPages %}
  <li{% if entry.url == page.url %} class="my-active-class"{% endif %}>
    <a href="{{ entry.url }}">{{ entry.title }}</a>
  </li>
{%- endfor %}
</ul>
```

{% endraw %}

  </div>
  <div id="navbyoh-js" role="tabpanel">
    <p><em>This example has not yet been added—you can swap to another template language above! Or maybe you want to contribute it? {% include "edit-on-github.njk" %}</em></p>
  </div>
  <div id="navbyoh-cjs" role="tabpanel">
    <p><em>This example has not yet been added—you can swap to another template language above! Or maybe you want to contribute it? {% include "edit-on-github.njk" %}</em></p>
  </div>
</seven-minute-tabs>
</is-land>

You _can_ use a Nunjucks macro to recursively render list items of any depth but the code isn’t quite as clean:

<details>
  <summary><strong>Nunjucks Macro Code for Rendering Unlimited Child Levels:</strong></summary>

{% codetitle "Nunjucks", "Syntax" %}

{% raw %}

```html
{% set navPages = collections.all | eleventyNavigation %}
{% macro renderNavListItem(entry) -%}
<li{% if entry.url == page.url %} class="my-active-class"{% endif %}>
  <a href="{{ entry.url }}">{{ entry.title }}</a>
{%- if entry.children.length -%}
  <ul>
    {%- for child in entry.children %}{{ renderNavListItem(child) }}{% endfor -%}
  </ul>
{%- endif -%}
</li>
{%- endmacro %}

<ul>
{%- for entry in navPages %}{{ renderNavListItem(entry) }}{%- endfor -%}
</ul>
```

{% endraw %}

</details>
