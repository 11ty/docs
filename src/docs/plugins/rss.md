---
eleventyNavigation:
  key: RSS
  title: '<i class="fa-solid fa-square-rss"></i>RSS'
  order: 1
  excerpt: Generate an RSS or Atom feed to allow others to subscribe to your content using a feed reader.
---

# RSS Plugin

{% tableofcontents %}

A pack of plugins for generating an RSS (or Atom or JSON) feed using the _Nunjucks_ templating syntax.

- [GitHub](https://github.com/11ty/eleventy-plugin-rss).

## Feature highlights

* URLs are normalized to absolute URLs, pointing to your hosted domain for maximum feed reader compatibility. Read more about [the dangers of relative URLs in your feeds on CSS Tricks](https://css-tricks.com/working-with-web-feeds-its-more-than-rss/#aa-beware-of-relative-urls) (Related: [#36](https://github.com/11ty/eleventy-plugin-rss/issues/36)).
* Existing project [Transforms](/docs/transforms/) are applied to feed entries (e.g. [Image HTML Transform](/docs/plugins/image/#html-transform), [`<base>`](/docs/plugins/html-base/), [InputPath to URL](/docs/plugins/inputpath-to-url/), etc.) If you’re using a [`--pathprefix`](/docs/config/#deploy-to-a-subdirectory-with-a-path-prefix) in your project, the URLs in your feed content are normalized for you.

Since RSS Plugin v2.0, this plugin offers two options to create feeds in your project:

1. **Virtual templates** let you create a feed with a few lines of configuration.  _(This is easier, more abstracted.)_
1. **Manual templates** need more configuration and a template file. _(This requires more setup, but offers more control.)_

## Installation

Available on [npm](https://www.npmjs.com/package/@11ty/eleventy-plugin-rss).

{%- set codeBlock %}
npm install @11ty/eleventy-plugin-rss
{%- endset %}
{{ codeBlock | highlight("bash") | safe }}

* `v2` of this this plugin requires Eleventy v3.0 or newer.
* `v1` of this plugin is compatible with Eleventy 0.11 or newer.

## Virtual Template

{% addedin "v3.0.0-alpha.13" %}{% addedin "RSS 2.0.0" %} This method creates a feed template directly from your plugin configuration, without requiring additional files in your project. The default template uses Nunjucks, so make sure `njk` is included `templateFormats` in your [Eleventy config](/docs/config/#template-formats). Read more about [Virtual Templates](/docs/virtual-templates.md).

{% callout "info", "md" %}
{% addedin "RSS 3.0.0" %}[Version 3 of this plugin](https://github.com/11ty/eleventy-plugin-rss/releases/tag/v3.0.0) is now using ESM. This requires Eleventy v3 or newer. Additionally, if you’re using a CommonJS configuration file and an [older version of Node (&lt; 20.19), you’ll need to use dynamic `import()` instead of `require`](/docs/cjs-esm/#using-esm-plugins-in-common-js-configuration).
{% endcallout %}

{% set codeContent %}
import { feedPlugin } from "@11ty/eleventy-plugin-rss";

export default function (eleventyConfig) {
	eleventyConfig.addPlugin(feedPlugin, {
		type: "atom", // or "rss", "json"
		outputPath: "/feed.xml",
		collection: {
			name: "posts", // iterate over `collections.posts`
			limit: 10,     // 0 means no limit
		},
		metadata: {
			language: "en",
			title: "Blog Title",
			subtitle: "This is a longer description about your blog.",
			base: "https://example.com/",
			author: {
				name: "Your Name",
				email: "", // Optional
			}
		}
	});
};
{% endset %}
{% include "snippets/configDefinition.njk" %}

This configuration is the only step for the Virtual Template method. If you need additional control over the template output, you can use the [Manual Template](#manual-template) method.

<details>
<summary>Expand for full options list</summary>

* `type`: (required) One of `"atom"` (default), `"rss"`, or `"json"`
* `outputPath`: (required, default: `/feed.xml`) Where to write the template in the output directory.
* `inputPath`: (optional, default based on `metadata.title`) Change where the virtual template pretends to live on the file system (e.g. if you want project directory data files to apply via the [Data Cascade](/docs/data-cascade/))
* `collection.name`: Collection entries to iterate over to populate your feed (e.g. `name: "posts"` for `collections.posts`)
* `collection.limit`: Number of entries to include. (Use `0` for no limit.)
* `metadata`: Content used to populate the feed boilerplate.
* `stylesheet`: URL to an XSL stylesheet to change how the feed is rendered in the browser (only for Atom and RSS feeds).
* `templateData`, defaults to `{}`: Additional data to apply to the template (e.g. to add your feed to the [Navigation plugin](/docs/plugins/navigation/))

</details>

## Manual Template

### Configuration

Open up your Eleventy config file (probably `eleventy.config.js`) and use `addPlugin`:

{% set codeContent %}
import pluginRss from "@11ty/eleventy-plugin-rss";

export default function (eleventyConfig) {
	eleventyConfig.addPlugin(pluginRss);
};
{% endset %}
{% include "snippets/configDefinition.njk" %}

{% callout "info", "md" %}
{% addedin "RSS 3.0.0" %}[Version 3 of this plugin](https://github.com/11ty/eleventy-plugin-rss/releases/tag/v3.0.0) is now using ESM. This requires Eleventy v3 or newer. Additionally, if you’re using a CommonJS configuration file and an [older version of Node (&lt; 20.19), you’ll need to use dynamic `import()` instead of `require`](/docs/cjs-esm/#using-esm-plugins-in-common-js-configuration).
{% endcallout %}

<details>
<summary>Expand to see full options list</summary>

{% addedin "RSS 1.1.0" %} Advanced control of [PostHTML rendering options](https://github.com/posthtml/posthtml-render#options) via `posthtmlRenderOptions`.

{% set codeContent %}
import pluginRss from "@11ty/eleventy-plugin-rss";

export default function (eleventyConfig) {
	eleventyConfig.addPlugin(pluginRss, {
		posthtmlRenderOptions: {
			closingSingleTag: "default", // opt-out of <img/>-style XHTML single tags
		},
	});
};
{% endset %}
{% include "snippets/configDefinition.njk" %}

</details>

### Supplies the following Nunjucks Filters

- `getNewestCollectionItemDate`: Gets the most recently updated content in the collection. Use with `dateToRfc3339` to properly format the Date for the top-level `<updated>` element. {% addedin "RSS 1.1.0" %}
- `dateToRfc3339`: format a Date for use in a `<entry><updated>` element. (Atom feeds) {% addedin "RSS 1.1.0" %}
- `dateToRfc822`: format a Date for use in a `<pubDate>` element. (RSS feeds) {% addedin "RSS 1.2.0" %}

#### Less Important Filters

- **Deprecated** `absoluteUrl`: _For performance reasons, the [`renderTransforms` filter](/docs/filters/render-transforms/) is recommended instead, making use of the HTML `<base>` plugin._ Converts a single URL (relative or absolute path) to a full absolute URL including protocol, domain, full path.
- **Deprecated** `htmlToAbsoluteUrls`: _For performance reasons, the [`renderTransforms` filter](/docs/filters/render-transforms/) is recommended instead, making use of the HTML `<base>` plugin._ (async) Transforms all of the URLs in a block of HTML with `absoluteUrl` above. Uses [posthtml-urls](https://github.com/11ty/posthtml-urls) with `a[href]`, `video[src]`, `audio[src]`, `source`, `img[src]`, `[srcset]` and [a whole bunch more](https://github.com/11ty/eleventy-posthtml-urls/blob/6e064c8a03174835eb15afbb5b759fecd696f901/lib/defaultOptions.js#L12-L33).
- **⚠️ Removed in RSS v2.0.0** `rssLastUpdatedDate`, poorly named (works with Atom and JSON feeds, not RSS). Use `getNewestCollectionItemDate | dateToRfc3339` instead.
- **⚠️ Removed in RSS v2.0.0** `rssDate`, poorly named (works with Atom and JSON feeds, not RSS). Use `dateToRfc3339` instead.

#### Use with other template languages

{% addedin "RSS 1.1.0" %} This plugin exports `dateToRfc3339`, `dateToRfc822` ({% addedin "RSS 1.2.0" %}), `getNewestCollectionItemDate`, `absoluteUrl`, and `convertHtmlToAbsoluteUrls` functions so you can use with your own filters. For example:

{% set codeContent %}
import pluginRss from "@11ty/eleventy-plugin-rss";

export default function (eleventyConfig) {
	eleventyConfig.addLiquidFilter("dateToRfc3339", pluginRss.dateToRfc3339);

	// New in RSS 1.2.0
	eleventyConfig.addLiquidFilter("dateToRfc822", pluginRss.dateToRfc822);
};
{% endset %}
{% include "snippets/configDefinition.njk" %}

{% callout "info", "md" %}Do keep in mind that _escaping_ HTML content is a feature provided as [part of Nunjucks](https://mozilla.github.io/nunjucks/templating.html#autoescaping). Moving to another template language may require a different option for escaping (for example, [`html-entities`](https://www.npmjs.com/package/html-entities)).{% endcallout %}

### Sample Feed templates

Copy and paste this template and modify the JSON metadata to match your feed’s needs. Make sure `collections.posts` matches the template collection you want to provide a feed for.

{%- callout "info", "md" -%}
The following feed samples **require RSS Plugin v2.0** or newer. [Samples for RSS Plugin v1](https://v2-0-1.11ty.dev/docs/plugins/rss/#sample-feed-templates) are available on older versions of the docs.
{%- endcallout %}

<is-land on:visible import="/js/seven-minute-tabs.js">
<seven-minute-tabs class="tabs-flush" autoheight>
  <div role="tablist" aria-label="Choose a template language">
    <a href="#rss-atom" role="tab">Atom</a>
    <a href="#rss-rss" role="tab">RSS</a>
    <a href="#rss-json" role="tab">JSON</a>
  </div>
  <div id="rss-atom" role="tabpanel">

{% raw %}

```html
---json
{
  "permalink": "feed.xml",
  "eleventyExcludeFromCollections": true,
  "metadata": {
    "title": "My Blog about Boats",
    "description": "I am writing about my experiences as a naval navel-gazer.",
    "language": "en",
    "base": "https://example.com/",
    "author": {
      "name": "Boaty McBoatFace"
    }
  }
}
---
<?xml version="1.0" encoding="utf-8"?>
<feed xmlns="http://www.w3.org/2005/Atom" xml:lang="{{ metadata.language or page.lang }}">
  <title>{{ metadata.title }}</title>
  <subtitle>{{ metadata.description }}</subtitle>
  <link href="{{ permalink | htmlBaseUrl(metadata.base) }}" rel="self" />
  <link href="{{ metadata.base | addPathPrefixToFullUrl }}" />
  <updated>{{ collections.posts | getNewestCollectionItemDate | dateToRfc3339 }}</updated>
  <id>{{ metadata.base | addPathPrefixToFullUrl }}</id>
  <author>
    <name>{{ metadata.author.name }}</name>
  </author>
  {%- for post in collections.posts | reverse %}
  {%- set absolutePostUrl %}{{ post.url | htmlBaseUrl(metadata.base) }}{% endset %}
  <entry>
    <title>{{ post.data.title }}</title>
    <link href="{{ absolutePostUrl }}" />
    <updated>{{ post.date | dateToRfc3339 }}</updated>
    <id>{{ absolutePostUrl }}</id>
    <content type="html">{{ post.content | renderTransforms(post.data.page, metadata.base) }}</content>
  </entry>
  {%- endfor %}
</feed>
```

{% endraw %}

</div>
<div id="rss-rss" role="tabpanel">

{% raw %}

```html
---json
{
  "permalink": "feed.xml",
  "eleventyExcludeFromCollections": true,
  "metadata": {
    "title": "My Blog about Boats",
    "description": "I am writing about my experiences as a naval navel-gazer.",
    "language": "en",
    "base": "https://example.com/",
    "author": {
      "name": "Boaty McBoatFace"
    }
  }
}
---
<?xml version="1.0" encoding="utf-8"?>
<rss version="2.0" xmlns:dc="http://purl.org/dc/elements/1.1/" xml:base="{{ metadata.base | addPathPrefixToFullUrl }}" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>{{ metadata.title }}</title>
    <link>{{ metadata.base | addPathPrefixToFullUrl }}</link>
    <atom:link href="{{ permalink | htmlBaseUrl(metadata.base) }}" rel="self" type="application/rss+xml" />
    <description>{{ metadata.description }}</description>
    <language>{{ metadata.language or page.lang }}</language>
    {%- for post in collections.posts | reverse %}
    {%- set absolutePostUrl = post.url | htmlBaseUrl(metadata.base) %}
    <item>
      <title>{{ post.data.title }}</title>
      <link>{{ absolutePostUrl }}</link>
      <description>{{ post.content | renderTransforms(post.data.page, metadata.base) }}</description>
      <pubDate>{{ post.date | dateToRfc822 }}</pubDate>
      <dc:creator>{{ metadata.author.name }}</dc:creator>
      <guid>{{ absolutePostUrl }}</guid>
    </item>
    {%- endfor %}
  </channel>
</rss>
```

{% endraw %}

</div>
<div id="rss-json" role="tabpanel">

{% raw %}

```json
---json
{
  "permalink": "feed.json",
  "eleventyExcludeFromCollections": true,
  "layout": "",
  "metadata": {
    "title": "My Blog about Boats",
    "description": "I am writing about my experiences as a naval navel-gazer.",
    "language": "en",
    "base": "https://example.com/",
    "author": {
      "name": "Boaty McBoatFace"
    }
  }
}
---
{
  "version": "https://jsonfeed.org/version/1.1",
  "title": "{{ metadata.title }}",
  "language": "{{ metadata.language or page.lang }}",
  "home_page_url": "{{ metadata.base | addPathPrefixToFullUrl }}",
  "feed_url": "{{ permalink | htmlBaseUrl(metadata.base) }}",
  "description": "{{ metadata.description }}",
  "authors": [
    {
      "name": "{{ metadata.author.name }}"
    }
  ],
  "items": [
    {%- for post in collections.posts | reverse %}
    {%- set absolutePostUrl %}{{ post.url | htmlBaseUrl(metadata.base) }}{% endset %}
    {
      "id": "{{ absolutePostUrl }}",
      "url": "{{ absolutePostUrl }}",
      "title": "{{ post.data.title }}",
      "content_html": {% if post.content %}{{ post.content | renderTransforms(post.data.page, metadata.base) | dump | safe }}{% else %}""{% endif %},
      "date_published": "{{ post.date | dateToRfc3339 }}"
    }
    {% if not loop.last %},{% endif %}
    {%- endfor %}
  ]
}
```

{% endraw %}

</div>
</seven-minute-tabs>

Place the file in your input directory, and give it a `.njk` extension. (For example: `src/feed.njk` or `src/feed.json`.) If your input directory is `src`, the file will be transformed into a `feed.xml` (or `feed.json` if you’re using the JSON variant) file at the root of your website when Eleventy builds. It can then be useful to check the file against a feed validator, such as the [W3C Feed Validation Service](https://validator.w3.org/feed/) to make sure that the output was good.

Ultimately, your feed will be available at `https://yourwebsite.com/feed.xml` (or `https://yourwebsite.com/feed.json`).

## Community Plugins

- [`eleventy-xml-plugin`](https://www.npmjs.com/package/eleventy-xml-plugin) for Liquid.
