---
eleventyNavigation:
  key: Id Attribute
  title: '<i class="fa-solid fa-id-badge"></i>Id Attribute'
  order: 3.15
  excerpt: A plugin to add `id` attributes to headings.
---

# Id Attribute {% addedin "3.0.0-beta.1" %}

The Id Attribute plugin adds `id` attributes to headings on your page (`<h1>` through `<h6>`). This was added to allow deep linking to different sections of blog posts and is compatible with all template languages in Eleventy that output HTML. Related [GitHub #3363](https://github.com/11ty/eleventy/issues/3363).

* Existing `id` attributes on your page will **not** be modified.
* If two headings on the page have the same text, we’ll de-duplicate the `id` attributes we assign automatically.
* If a heading’s text would result in a conflict with any existing `id` attribute on the page, we’ll de-duplicate the new `id` automatically.

This is best paired with a user interface piece to add anchor links to heading elements in an accessible way. A few options:

* [`<heading-anchors>` from David Darnes](https://github.com/daviddarnes/heading-anchors)
* [`<heading-anchors>` from Zach Leatherman](https://github.com/zachleat/heading-anchors) (only for anchor links as siblings)

## Examples

```html
<h1>Welcome to Eleventy</h1>
```

is transformed into:

```html
<h1 id="welcome-to-eleventy">Welcome to Eleventy</h1>
```

### Ignore a node {% addedin "3.0.0-beta.2" %}

Use the `eleventy:id-ignore` attribute on a child node to ignore it (only for the purposes of `id` attribute generation).

```html
<h1>Welcome to Eleventy<span eleventy:id-ignore> ignore this</span></h1>
```

is transformed into:

```html
<h1 id="welcome-to-eleventy">Welcome to Eleventy</h1>
```

## Usage

This plugin is bundled with Eleventy and requires no additional package installation (though you do need to opt-in via `addPlugin`).

{% include "snippets/plugins/idattr.njk" %}

### With options

{% include "snippets/plugins/idattr-opts.njk" %}

