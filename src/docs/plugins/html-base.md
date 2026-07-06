---
eleventyNavigation:
  key: HTML Base
  title: '<i class="fa-solid fa-chess-rook"></i>HTML <code>&lt;base&gt;</code>'
  order: 3.1
  excerpt: Emulate the <code>&lt;base&gt;</code> element by adding a prefix to all URLs in <code>.html</code> output files.
---

# HTML `<base>` {% addedin "2.0.0-canary.15" %}

{% tableofcontents %}

A build-time application of `<base>` to HTML (without relying on `<base>`) by modifying `a[href]`, `video[src]`, `audio[src]`, `source`, `img[src]`, `[srcset]`, and more.

- Read about [HTML’s `<base>` element on MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/base)

If you want to deploy your project in a different directory without changing the content, Build Awesome provides a [Path Prefix feature to specify the target directory](/docs/config/#deploy-to-a-subdirectory-with-a-path-prefix).

- via `--pathprefix` on the command line
- or via `pathPrefix` object key in your configuration file return object

Previously, we would then tell folks to use the provided [`url` filter](/docs/filters/url/) in your templates to transform any local URL with the path prefix. The downside of this method was that it required you to remember and opt-in every URL transformation in your content!

## The New Way: HTML `<base>` Plugin

With this new plugin, you no longer need to use the `url` filter in your HTML content. This plugin adds a [Build Awesome Transform](/docs/config/#transforms) that will modify your HTML output and inject your Path Prefix in your template content.

- Behind the scenes, this plugin transforms URLs found in `a[href]`, `video[src]`, `audio[src]`, `source`, `img[src]`, `[srcset]` and [a whole bunch more](https://github.com/11ty/eleventy-posthtml-urls/blob/6e064c8a03174835eb15afbb5b759fecd696f901/lib/defaultOptions.js#L12-L33) (via [posthtml-urls](https://github.com/11ty/posthtml-urls)).

<div class="youtube-related">
  {%- youtubeEmbed "hJAtWQ9nmKU", "New HTML Base Plugin (Changelog №17)", "512" -%}
</div>

### Why not use the `<base>` HTML element?

You can, if you’d like! Some folks have found it to be a bit [unreliable]({{ "https://twitter.com/Rich_Harris/status/1526937421505609728" | canonicalTwitterUrl }}) and edge-casey. This offers a build-time alternative.

### Installation

{% addedin "2.0.0-canary.15" %} This plugin is bundled with Build Awesome (Eleventy) 2.0 (no extra installation is required). It works with all template languages (via a Build Awesome Transform) and some of the advanced usage filters require async-friendly template syntax (Nunjucks, Liquid, and JavaScript).

Open up your configuration file (probably `buildawesome.config.js`) and use `addPlugin`:

{% include "snippets/plugins/base-install.njk" %}

_You’re only allowed one `module.exports` in your configuration file, so make sure you only copy the `require` and the `addPlugin` lines above!_

<details>
<summary>Expand for full options list</summary>

{% include "snippets/plugins/base-install-options.njk" %}

</details>

### Usage

For templates that output `*.html` files, you don’t need to do anything else. The HTML plugin will automatically apply the Path Prefix to URLs in any `html` file in your output directory.

### Advanced Usage

This plugin also provides new filters for you to use these transformations manually. This is useful when you want to use the same functionality but the URL you want to transform is not in one of the HTML elements that get automatically transformed (like an HTML comment {% raw %}`<!-- Current page: {{ page.url }} -->`{% endraw %}).

##### `htmlBaseUrl`

Transform a single URL string using the base.

{% include "snippets/plugins/htmlbaseurl.njk" %}

You can override the `baseHref` option by passing another argument to the filter with your one-off base value. Note that when you use a full URL as your base href, relative paths are no longer ignored—they are modified using the current page’s URL:

{% include "snippets/plugins/htmlbaseurl-override.njk" %}

##### `transformWithHtmlBase`

Transform a block of HTML with posthtml. Applies the above `htmlBaseUrl` filter to each applicable URL in an HTML block (so the URL transformation rules are the same). Requires an async-friendly template language.

We use this in the RSS plugin to change your content to be absolute URLs for broadest compatibility with various RSS feed readers.

{% include "snippets/plugins/base-transform.njk" %}

##### `addPathPrefixToFullUrl`

Note that passing a full external URL (e.g. `http://example.com/`) to `htmlBaseUrl` will return the URL unchanged. We don’t want to add `pathPrefix` to external links!

However, if you do want to force addition of pathPrefix to a URL, you can use the `addPathPrefixToFullUrl` filter.

{% include "snippets/plugins/base-add.njk" %}