---
eleventyNavigation:
  key: Render
  title: '<i class="fa-solid fa-film"></i>Render'
  order: 0
  excerpt: A plugin to add shortcodes to render an Eleventy template string (or file) inside of another template.
communityLinksKey: syntaxrender
---

# Render {% addedin "1.0.0" %}<!-- Beta 7 -->

{% tableofcontents %}

{{ eleventyNavigation.excerpt }}

## Template Compatibility

This plugin adds a `renderTemplate` and `renderFile` asynchronous universal shortcode and a `renderContent` universal filter to:

- Nunjucks
- Liquid
- JavaScript (11ty.js)

Everything you’ve added to project’s configuration file will also be available in these renders too: shortcodes, filters, etc. That means you can nest 😱 them!

## Installation

This plugin is bundled with Eleventy core so it doesn’t require additional installation. But you do have to add it to your configuration file (probably `buildawesome.config.js`) with `addPlugin`:

{% include "snippets/plugins/renderinstall.njk" %}

<details>
  <summary>Expand to view all of the Plugin Options</summary>

{% include "snippets/plugins/renderinstall-advanced.njk" %}

</details>

## Usage

### `renderTemplate` Paired Shortcode

Use the `renderTemplate` paired shortcode to render a template string.

{% include "snippets/plugins/render.njk" %}

The content inside of the shortcode will be rendered using Markdown (`"md"`). Front matter is not yet supported.

The first argument to `renderTemplate` can be any valid [`templateEngineOverride`](/docs/languages/#templateengineoverride-examples) value. You can even use `"liquid,md"` to preprocess markdown with liquid. You can use [custom template types](/docs/languages/custom/) here too.

{% callout "info", "md" %}The one exception here is that `{% raw %}{% renderTemplate "11ty.js" %}{% endraw %}` JavaScript string templates are not yet supported—use `renderFile` below instead.{% endcallout %}

#### Pass in data

Both the [`eleventy`](/docs/data-eleventy-supplied/#eleventy-variable) and [`page` variables](/docs/data-eleventy-supplied/#page-variable) are available inside of these templates by default. If you want to pass in additional data, you can do so like this:

{% include "snippets/plugins/renderdata.njk" %}

Outputs `myValue`.

### `renderFile` Shortcode

Use the `renderFile` shortcode to render an include file.

{% include "snippets/plugins/renderfile.njk" %}

The first argument to `renderFile` is a project root relative path to any template file. Front matter inside of the target files is not yet supported. The template syntax used is inferred by the file extension.

Note that you can use files supported by any [custom file extensions](/docs/languages/custom/) you’ve added too!

#### Pass in data

Both the [`eleventy`](/docs/data-eleventy-supplied/#eleventy-variable) and [`page` variables](/docs/data-eleventy-supplied/#page-variable) are available inside of these templates by default. If you want to pass in additional data, you can do so like this:

{% include "snippets/plugins/renderfiledata.njk" %}

#### Override the target file syntax

The syntax is normally inferred using the file extension, but it can be overridden using a third argument. It can be any valid [`templateEngineOverride`](/docs/languages/#templateengineoverride-examples) value. You can even use `"liquid,md"` to preprocess markdown with liquid.

{% include "snippets/plugins/renderfileoverride.njk" %}

Will render `blogpost.md` using Nunjucks instead of Markdown!

### `renderContent` Filter

Directly render a string of arbitrary template content.

Consider the following Nunjucks template:

{% raw %}
```yaml
---
myContent: "{{ 'Second' }}"
---
{% renderTemplate %}{{ myContent }}{% endrenderTemplate %} from renderTemplate
{{ myContent | renderContent("njk") }} from renderContent
```

Outputs:

```
{{ 'Second' }} from renderTemplate
Second from renderContent
```
{% endraw %}

#### Pass in data

Both the [`eleventy`](/docs/data-eleventy-supplied/#eleventy-variable) and [`page` variables](/docs/data-eleventy-supplied/#page-variable) are available inside of these templates by default. If you want to pass in additional data, you can do so like this:

{% raw %}
```yaml
---
myContent: "{{ 'Second' }}"
---
{{ myContent | renderContent("njk", myData) }}
```
{% endraw %}
