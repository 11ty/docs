---
eleventyNavigation:
  key: RSS
  order: 1
  excerpt: Generate an Atom feed to allow others to subscribe to your content using a feed reader.
---
# RSS Plugin

{% tableofcontents %}

A pack of plugins for generating an RSS feed (actually an Atom feed, but who’s counting) using the Nunjucks templating engine.

* [GitHub](https://github.com/11ty/eleventy-plugin-rss).

## Template Compatibility

* Nunjucks

## Installation

Available on [npm](https://www.npmjs.com/package/@11ty/eleventy-plugin-rss).

```
npm install @11ty/eleventy-plugin-rss --save-dev
```

Open up your Eleventy config file (probably `.eleventy.js`) and use `addPlugin`:

{% codetitle ".eleventy.js" %}

```js
const pluginRss = require("@11ty/eleventy-plugin-rss");

module.exports = function(eleventyConfig) {
  eleventyConfig.addPlugin(pluginRss);
};
```

{% callout "info", "md" %}You’re only allowed one `module.exports` in your configuration file, so make sure you only copy the `require` and the `addPlugin` lines above!{% endcallout %}

### Options

{% addedin "RSS 1.1.0" %} Advanced control of [PostHTML rendering options](https://github.com/posthtml/posthtml-render#options) via `posthtmlRenderOptions`.

```js
const pluginRss = require("@11ty/eleventy-plugin-rss");

module.exports = function(eleventyConfig) {
  eleventyConfig.addPlugin(pluginRss, {
    posthtmlRenderOptions: {
      closingSingleTag: "default" // opt-out of <img/>-style XHTML single tags
    }
  });
};
```

## Supplies the following Nunjucks Filters

* `getNewestCollectionItemDate`: Gets the most recently updated content in the collection. Use with `dateToRfc3339` to properly format the Date for the top-level `<updated>` element. {% addedin "RSS 1.1.0" %}
* `dateToRfc3339`: format a Date for use in a `<entry><updated>` element. (Atom feeds) {% addedin "RSS 1.1.0" %}
* `dateToRfc822`: format a Date for use in a `<pubDate>` element. (RSS feeds) {% addedin "RSS 1.2.0" %}
* `absoluteUrl`: converts a single URL (relative or absolute path) to a full absolute URL including protocol, domain, full path.
* `htmlToAbsoluteUrls`: (async) transforms all of the URLs in a block of HTML with `absoluteUrl` above. Uses [posthtml-urls](https://github.com/posthtml/posthtml-urls) with `a[href]`, `video[src]`, `audio[src]`, `source`, `img[src]`, `[srcset]` and [a whole bunch more](https://github.com/posthtml/posthtml-urls/blob/307c91342a211b3f9fb22bc57264bbb31f235fbb/lib/defaultOptions.js).

### Use with other template languages

{% addedin "RSS 1.1.0" %} This plugin exports `dateToRfc3339`, `dateToRfc822` ({% addedin "RSS 1.2.0" %}), `getNewestCollectionItemDate`, `absoluteUrl`, and `convertHtmlToAbsoluteUrls` functions so you can use with your own filters. For example:

```js
const pluginRss = require("@11ty/eleventy-plugin-rss");

module.exports = function(eleventyConfig) {
  eleventyConfig.addLiquidFilter("dateToRfc3339", pluginRss.dateToRfc3339);

  // New in RSS 1.2.0
  eleventyConfig.addLiquidFilter("dateToRfc822", pluginRss.dateToRfc822);
};
```

{% callout "info", "md" %}Do keep in mind that _escaping_ HTML content is a feature provided as [part of Nunjucks](https://mozilla.github.io/nunjucks/templating.html#autoescaping). Moving to another template language may require a different option for escaping (for example, [`html-entities`](https://www.npmjs.com/package/html-entities)).{% endcallout %}

### Deprecated Filters

* `rssLastUpdatedDate`, poorly named (works with Atom and JSON feeds, not RSS). Use `getNewestCollectionItemDate | dateToRfc3339` instead.
* `rssDate`, poorly named (works with Atom and JSON feeds, not RSS). Use `dateToRfc3339` instead.

## Sample Feed templates

Copy and paste this template and modify the JSON metadata to match your feed’s needs. Make sure `collections.posts` matches the template collection you want to provide a feed for.

<is-land on:visible import="/js/seven-minute-tabs.js">
<seven-minute-tabs>
  <div role="tablist" aria-label="Choose a template language">
    View this example in:
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
    "subtitle": "I am writing about my experiences as a naval navel-gazer.",
    "language": "en",
    "url": "https://example.com/",
    "author": {
      "name": "Boaty McBoatFace",
      "email": "me@example.com"
    }
  }
}
---
<?xml version="1.0" encoding="utf-8"?>
<feed xmlns="http://www.w3.org/2005/Atom" xml:base="{{ metadata.url }}">
  <title>{{ metadata.title }}</title>
  <subtitle>{{ metadata.subtitle }}</subtitle>
  <link href="{{ permalink | absoluteUrl(metadata.url) }}" rel="self"/>
  <link href="{{ metadata.url }}"/>
  <updated>{{ collections.posts | getNewestCollectionItemDate | dateToRfc3339 }}</updated>
  <id>{{ metadata.url }}</id>
  <author>
    <name>{{ metadata.author.name }}</name>
    <email>{{ metadata.author.email }}</email>
  </author>
  {%- for post in collections.posts | reverse %}
  {%- set absolutePostUrl = post.url | absoluteUrl(metadata.url) %}
  <entry>
    <title>{{ post.data.title }}</title>
    <link href="{{ absolutePostUrl }}"/>
    <updated>{{ post.date | dateToRfc3339 }}</updated>
    <id>{{ absolutePostUrl }}</id>
    <content xml:lang="{{ metadata.language }}" type="html">{{ post.templateContent | htmlToAbsoluteUrls(absolutePostUrl) }}</content>
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
    "subtitle": "I am writing about my experiences as a naval navel-gazer.",
    "language": "en",
    "url": "https://example.com/",
    "author": {
      "name": "Boaty McBoatFace",
      "email": "me@example.com"
    }
  }
}
---
<?xml version="1.0" encoding="utf-8"?>
<rss version="2.0" xmlns:dc="http://purl.org/dc/elements/1.1/" xml:base="{{ metadata.url }}" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>{{ metadata.title }}</title>
    <link>{{ metadata.url }}</link>
    <atom:link href="{{ permalink | absoluteUrl(metadata.url) }}" rel="self" type="application/rss+xml" />
    <description>{{ metadata.subtitle }}</description>
    <language>{{ metadata.language }}</language>
    {%- for post in collections.posts | reverse %}
    {%- set absolutePostUrl = post.url | absoluteUrl(metadata.url) %}
    <item>
      <title>{{ post.data.title }}</title>
      <link>{{ absolutePostUrl }}</link>
      <description>{{ post.templateContent | htmlToAbsoluteUrls(absolutePostUrl) }}</description>
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
  "layout": false,
  "metadata": {
    "title": "My Blog about Boats",
    "subtitle": "I am writing about my experiences as a naval navel-gazer.",
    "language": "en",
    "url": "https://example.com/",
    "author": {
      "name": "Boaty McBoatFace",
      "url": "https://example.com/about-boaty/"
    }
  }
}
---
{
  "version": "https://jsonfeed.org/version/1.1",
  "title": "{{ metadata.title }}",
  "language": "{{ metadata.language }}",
  "home_page_url": "{{ metadata.url }}",
  "feed_url": "{{ permalink | absoluteUrl(metadata.url) }}",
  "description": "{{ metadata.subtitle }}",
  "author": {
    "name": "{{ metadata.author.name }}",
    "url": "{{ metadata.author.url }}"
  },
  "items": [
    {%- for post in collections.posts | reverse %}
    {%- set absolutePostUrl = post.url | absoluteUrl(metadata.url) %}
    {
      "id": "{{ absolutePostUrl }}",
      "url": "{{ absolutePostUrl }}",
      "title": "{{ post.data.title }}",
      "content_html": {% if post.templateContent %}{{ post.templateContent | htmlToAbsoluteUrls(absolutePostUrl) | dump | safe }}{% else %}""{% endif %},
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

Place the file anywhere in your project (give it a `.njk` extension) and it will be transformed into a `feed.xml` (or `feed.json` if you’re using the JSON variant) file at the root of your website when Eleventy builds it. It can then be useful to check the file against a feed validator, such as the [W3C Feed Validation Service](https://validator.w3.org/feed/) to make sure that the output was good.

Ultimately your feed will be available at `https://yourwebsite.com/feed.xml` (or `https://yourwebsite.com/feed.json`)

## Related Plugins:

* [`eleventy-xml-plugin`](https://www.npmjs.com/package/eleventy-xml-plugin) for Liquid.
