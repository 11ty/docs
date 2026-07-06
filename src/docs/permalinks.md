---
eleventyNavigation:
  parent: Configure Templates with Data
  key: Permalinks
  pinned: true
  excerpt: Remap a template to a new output location (or prevent writing a file)
---

# Permalinks

{% tableofcontents %}

You can customize the default location of templates to the output directory (or disable writing a file to disk entirely) using Eleventy’s permalinks feature.

## Default Output

<div id="default-input/output-examples"></div>

We’ll start with a few simple examples of the default permalink behavior, showing where input files are written to the output directory (default: `_site`):

### `index.*` file names

<table>
    <tbody>
        <tr>
            <th>Filename</th>
            <td><code>index.njk</code></td>
        </tr>
        <tr>
            <th>Writes to</th>
            <td><code>_site/index.html</code></td>
        </tr>
        <tr>
            <th>With URL</th>
            <td><code>/</code></td>
        </tr>
    </tbody>
</table>

<is-land on:visible import="/js/eleventy-editor.js">
	<template data-island>
		<p>See it in action for <code>index.liquid</code>:</p>
		<eleventy-editor html toolbar-position="bottom" data-editor-filename="index.liquid" style="--width-text: 18em">
{% highlight "liquid" %}{% raw %}
File   {{ page.inputPath }}
Writes {{ page.outputPath }}
URL    {{ page.url }}
{% endraw %}{% endhighlight %}
		</eleventy-editor>
	</template>
</is-land>

### Not-`index.*` file names

<table>
    <tbody>
        <tr>
            <th>Filename</th>
            <td><code>template.njk</code></td>
        </tr>
        <tr>
            <th>Writes to</th>
            <td><code>_site/template/index.html</code></td>
        </tr>
        <tr>
            <th>With URL</th>
            <td><code>/template/</code></td>
        </tr>
    </tbody>
</table>

<is-land on:visible import="/js/eleventy-editor.js">
	<template data-island>
		<p>See it in action for <code>template.liquid</code>:</p>
		<eleventy-editor html toolbar-position="bottom" data-editor-filename="template.liquid" style="--width-text: 18em">
{% highlight "liquid" %}{% raw %}
File   {{ page.inputPath }}
Writes {{ page.outputPath }}
URL    {{ page.url }}
{% endraw %}{% endhighlight %}
		</eleventy-editor>
	</template>
</is-land>

### Deeper directories

<table>
    <tbody>
        <tr>
            <th>Filename</th>
            <td><code>subdir/template.liquid</code></td>
        </tr>
        <tr>
            <th>Writes to</th>
            <td><code>_site/subdir/template/index.html</code></td>
        </tr>
        <tr>
            <th>With URL</th>
            <td><code>/subdir/template/</code></td>
        </tr>
    </tbody>
</table>

<is-land on:visible import="/js/eleventy-editor.js">
	<template data-island>
		<p>See it in action for <code>subdir/template.liquid</code>:</p>
		<eleventy-editor html toolbar-position="bottom" data-editor-filename="subdir/template.liquid" style="--width-text: 18em">
{% highlight "liquid" %}{% raw %}
File   {{ page.inputPath }}
Writes {{ page.outputPath }}
URL    {{ page.url }}
{% endraw %}{% endhighlight %}
		</eleventy-editor>
	</template>
</is-land>

### When the File name is the same as the Directory name

<table>
    <tbody>
        <tr>
            <th>Filename</th>
            <td><code>subdir/template/template.liquid</code> or <code>subdir/template/index.liquid</code></td>
        </tr>
        <tr>
            <th>Writes to</th>
            <td><code>_site/subdir/template/index.html</code></td>
        </tr>
        <tr>
            <th>With URL</th>
            <td><code>/subdir/template/</code></td>
        </tr>
    </tbody>
</table>

<is-land on:visible import="/js/eleventy-editor.js">
	<template data-island>
		<p>See it in action for <code>subdir/template/template.liquid</code>:</p>
		<eleventy-editor html toolbar-position="bottom" data-editor-filename="subdir/template/template.liquid" style="--width-text: 18em">
{% highlight "liquid" %}{% raw %}
File   {{ page.inputPath }}
Writes {{ page.outputPath }}
URL    {{ page.url }}
{% endraw %}{% endhighlight %}
		</eleventy-editor>
		<p>Note that <code>subdir/template/template.liquid</code> writes to the same location as <code>subdir/template/index.liquid</code>.</p>
		<eleventy-editor html toolbar-position="bottom" data-editor-filename="subdir/template/index.liquid" style="--width-text: 18em">
{% highlight "liquid" %}{% raw %}
File   {{ page.inputPath }}
Writes {{ page.outputPath }}
URL    {{ page.url }}
{% endraw %}{% endhighlight %}
		</eleventy-editor>
	</template>
</is-land>

### Cool URIs don’t change

Eleventy uses `index.html` files by default to help you make sure that your [Cool URIs don’t change](https://www.w3.org/Provider/Style/URI).

> What to leave out…
> File name extension. This is a very common one. "cgi", even ".html" is something which will change. You may not be using HTML for that page in 20 years time, but you might want today's links to it to still be valid. The canonical way of making links to the W3C site doesn't use the extension.

## Changing the output location

<div id="remapping-output-(permalink)"></div>

To remap your template’s output to a different path than the default, use the `permalink` key in the template’s front matter (or elsewhere in the [Data Cascade](/docs/data-cascade.md)). If a subdirectory does not exist, it will be created.

Consider the follwing `index.md` input file file:

{% codetitle "YAML Front Matter", "Syntax" %}

<div><is-land on:interaction="touchstart,click,focusin" import="/js/eleventy-editor.js"><eleventy-editor html data-editor-filename="index.md" style="--width-text: 100%">
{% highlight "html" %}{% raw %}
---
permalink: this-is-a-new-path/subdirectory/testing/
---
{% endraw %}{% endhighlight %}
</eleventy-editor></is-land></div>

When `permalink` points to a directory, we add `index.html` for you. So the above directory permalink is the same as writing this:

{% codetitle "YAML Front Matter", "Syntax" %}

<div><is-land on:interaction="touchstart,click,focusin" import="/js/eleventy-editor.js"><eleventy-editor html data-editor-filename="index.md" style="--width-text: 100%">
{% highlight "html" %}{% raw %}
---
permalink: this-is-a-new-path/subdirectory/testing/index.html
---
{% endraw %}{% endhighlight %}
</eleventy-editor></is-land></div>

Both of the above examples write to `_site/this-is-a-new-path/subdirectory/testing/index.html`.

Eleventy checks for collisions automatically. If multiple input files _attempt to write to the same output location_, Eleventy will throw an error!

### Skip writing to the file system

<div id="permalink-false"></div>

If you set the `permalink` value to be `false`, this will disable writing the file to disk in the output folder (typically `_site`).

The file will still be processed and rendered for use in [collections](/docs/collections.md) (with [`url` and `outputPath` properties](/docs/data-eleventy-supplied/) set to `false`) but will not be available in your output directory as a standalone file.

{% codetitle "YAML Front Matter", "Syntax" %}

<div><is-land on:interaction="touchstart,click,focusin" import="/js/eleventy-editor.js"><eleventy-editor html data-editor-filename="index.html">
{% highlight "markdown" %}{% raw %}
---
permalink: false
---
{% endraw %}{% endhighlight %}
</eleventy-editor></is-land></div>

### Use template syntax in Permalink

You may use data variables here (and template syntax, too). These will be parsed with the current template’s rendering engine (take special note that in [Markdown](/docs/config/#default-template-engine-for-markdown-files) and [HTML files this might be influenced by configuration](/docs/config/#default-template-engine-for-html-files)).

It’s recommended to use the provided [`slugify` filter](/docs/filters/slugify/) to create URL-safe strings from data (like a blog post title).

<div id="use-filters"></div>

For example:

{% codetitle "YAML Front Matter using Liquid or Nunjucks", "Syntax" %}

<div><is-land on:interaction="touchstart,click,focusin" import="/js/eleventy-editor.js"><eleventy-editor html data-editor-filename="index.liquid">
{% highlight "liquid" %}{% raw %}
---
title: This is a New Path
permalink: "subdir/{{ title | slugify }}/index.html"
---
{% endraw %}{% endhighlight %}
</eleventy-editor></is-land></div>

- Pagination variables also work here! [Read more about Pagination](/docs/pagination/)

Writes to `_site/subdir/this-is-a-new-path/index.html`.

{% callout "info", "md" %}Using the [data cascade](/docs/data-cascade.md) you have the power to change the default behavior for permalinks for all content in your project. Learn more about the special `page` variables useful for permalinks to see examples of this behavior: [`page.fileSlug`](/docs/data-eleventy-supplied/#fileslug) and [`page.filePathStem`](/docs/data-eleventy-supplied/#filepathstem).{% endcallout %}

Here’s another example using Liquid’s <code>date</code> filter:

{% codetitle "YAML Front Matter using Liquid", "Syntax" %}

<div><is-land on:interaction="touchstart,click,focusin" import="/js/eleventy-editor.js"><eleventy-editor html data-editor-filename="index.liquid">
{% highlight "liquid" %}{% raw %}
---
date: "2016-01-01T06:00-06:00"
permalink: "/{{ page.date | date: '%Y/%m/%d' }}/index.html"
---
{% endraw %}{% endhighlight %}
</eleventy-editor></is-land></div>

Writes to `_site/2016/01/01/index.html`. There are a variety of ways that the page.date variable can be set (using `date` in your front matter is just one of them). Read more about [Content dates](/docs/dates/).

#### Put quotes around template syntax in YAML

<div id="warning-about-yaml-objects"></div>

{% callout "pitfall", "md" %}**YAML Pitfall:** If your permalink uses template syntax, make sure that you use quotes! Without quotes YAML may try to parse this as an object if the first character is a `{`, for example `permalink: {% raw %}{{ page.filePathStem }}{% endraw %}.html`. This is a [**common pitfall**](/docs/pitfalls/).{% endcallout %}

{% codetitle "YAML Front Matter using Liquid", "Syntax" %}

<div><is-land on:interaction="touchstart,click,focusin" import="/js/eleventy-editor.js"><eleventy-editor html data-editor-filename="index.liquid">
{% highlight "liquid" %}{% raw %}
---
permalink: "{{ page.filePathStem }}.html"
---
{% endraw %}{% endhighlight %}
</eleventy-editor></is-land></div>

The error message might look like `can not read a block mapping entry; a multiline key may not be an implicit key` or `bad indentation of a mapping entry`.

If you run the following code you’ll see the error:

<div><is-land on:interaction="touchstart,click,focusin" import="/js/eleventy-editor.js"><eleventy-editor html data-editor-filename="index.liquid">
{% highlight "liquid" %}{% raw %}
---
permalink: {{ page.filePathStem }}.html
---
{% endraw %}{% endhighlight %}
</eleventy-editor></is-land></div>

### Custom File Formats

You can change the permalink to output to _any file extension_! For example:

<div><is-land on:interaction="touchstart,click,focusin" import="/js/eleventy-editor.js"><eleventy-editor html data-editor-filename="index.liquid">
{% highlight "liquid" %}{% raw %}
---
permalink: index.json
---
{{ page | json: 2 }}
{% endraw %}{% endhighlight %}
</eleventy-editor></is-land></div>

## Trailing Slashes

Eleventy projects use trailing slashes by default, as they have shown to be the most reliable approach for URL design and [hosting provider compatibility](https://www.zachleat.com/web/trailing-slash/#results-table). That’s why we write to `/resource/index.html` and use `/resource/`-style URLs.

We do offer the option to instead write `/resource.html` files and use `/resource`-style URLs **(but it is not recommended)**.

### Permalinks without File Extensions

{% callout "pitfall", "md-block" -%}
While `index.html` is optional on `permalink: /resource/index.html`, it is a [**Common Pitfall**](/docs/pitfalls/) to leave off the trailing slash.
{% endcallout %}

If you leave off the file name **and** forget the trailing slash on your permalink, this will write to a file without a file extension. Your web browser may attempt to download the file instead of displaying it (unless you’ve done some extra work to set up your `Content-Type` headers correctly).

This may also cause local development issues if you later attempt to write to a subdirectory of the same name (anything inside `/resource/`).

<div><is-land on:interaction="touchstart,click,focusin" import="/js/eleventy-editor.js"><eleventy-editor html data-editor-filename="index.html">
{% highlight "markdown" %}{% raw %}
---
# ✅ OK
permalink: /resource/
---
{% endraw %}{% endhighlight %}
</eleventy-editor></is-land></div>

<div><is-land on:interaction="touchstart,click,focusin" import="/js/eleventy-editor.js"><eleventy-editor html data-editor-filename="index.html">
{% highlight "markdown" %}{% raw %}
---
# ✅ OK (same as above)
permalink: /resource/index.html
---
{% endraw %}{% endhighlight %}
</eleventy-editor></is-land></div>

<div><is-land on:interaction="touchstart,click,focusin" import="/js/eleventy-editor.js"><eleventy-editor html data-editor-filename="index.html">
{% highlight "markdown" %}{% raw %}
---
# ⛔️ Throws an error.
permalink: /resource
---
{% endraw %}{% endhighlight %}
</eleventy-editor></is-land></div>

#### Allow missing file extensions using Data Cascade

{% addedin "3.0.0-beta.2" %}Eleventy will throw an error if you attempt to write to a file without a file extension. This is not always an error (think `_redirects` on Netlify), so you can opt out of this feature by setting `eleventyAllowMissingExtension: true` somewhere in your data cascade (front matter, directory data file, etc) or disable the error messaging globally.

<div><is-land on:interaction="touchstart,click,focusin" import="/js/eleventy-editor.js"><eleventy-editor html data-editor-filename="index.html">
{% highlight "markdown" %}{% raw %}
---
# ⚠️ Careful!
eleventyAllowMissingExtension: true
permalink: /resource
---
{% endraw %}{% endhighlight %}
</eleventy-editor></is-land></div>

#### Allow missing file extensions globally using Configuration

{% set codeContent %}
export default function($config) {
	// Disable this error for the project.
	$config.configureErrorReporting({ allowMissingExtensions: true })
};
{% endset %}
{% set tabIdOverride = "permalink-configure-error-reporting" %}
{% include "snippets/configDefinition.njk" %}
{% set tabIdOverride = "" %}

<div><is-land on:interaction="touchstart,click,focusin" import="/js/eleventy-editor.js"><eleventy-editor html data-editor-filename="index.html" config="#permalink-configure-error-reporting-jsesm">
{% highlight "markdown" %}{% raw %}
---
# ⚠️ Careful!
permalink: /resource
---
{% endraw %}{% endhighlight %}
</eleventy-editor></is-land></div>

<div id="change-permalinks-globally-for-a-project"></div>

### Remove trailing slashes

The following configuration (using [global data via the configuration API](/docs/data-global-custom.md) but you could set this using a [Global Data file](/docs/data-global.md) too) unlocks `/resource`-style URLs on your Eleventy project and works on GitHub Pages, Netlify, Cloudflare Pages, Render, and Azure Static Web Apps. This approach **does _not_ work on Vercel** (due to a [Vercel hosting limitation](https://www.zachleat.com/web/trailing-slash/#results-table)).

{% set codeContent %}
export default function($config) {
	// Set global permalinks to resource.html style
	$config.addGlobalData("permalink", () => {
		return (data) =>
			`${data.page.filePathStem}.${data.page.outputFileExtension}`;
	});

	// Remove .html from `page.url`
	$config.addUrlTransform((page) => {
		if (page.url.endsWith(".html")) {
			return page.url.slice(0, -1 * ".html".length);
		}
	});
};
{% endset %}
{% set tabIdOverride = "permalink-remove-trailing-slashes" %}
{% include "snippets/configDefinition.njk" %}
{% set tabIdOverride = "" %}

Try out the above configuration with the following template:

<div><is-land on:interaction="touchstart,click,focusin" import="/js/eleventy-editor.js"><eleventy-editor html toolbar-position="bottom" data-editor-filename="template.html" config="#permalink-remove-trailing-slashes-jsesm">
{% highlight "markdown" %}{% raw %}
{{ page.url }}
{% endraw %}{% endhighlight %}
</eleventy-editor></is-land></div>

Compared to the default behavior:

<div><is-land on:interaction="touchstart,click,focusin" import="/js/eleventy-editor.js"><eleventy-editor html toolbar-position="bottom" data-editor-filename="template.html">
{% highlight "markdown" %}{% raw %}
{{ page.url }}
{% endraw %}{% endhighlight %}
</eleventy-editor></is-land></div>

#### Remove trailing slashes on Vercel

The following works for `/resource`-style URLs on Vercel but additionally requires [`"trailingSlash": false` in your `vercel.json` file](https://vercel.com/docs/projects/project-configuration#trailingslash).

{% set codeContent %}
export default function($config) {
	$config.addUrlTransform((page) => {
		// remove trailing slash from `page.url`
		if (page.url !== "/" && page.url.endsWith("/")) {
			return page.url.slice(0, -1);
		}
	});
};
{% endset %}
{% include "snippets/configDefinition.njk" %}


## Advanced Usage

### Change permalinks for one directory

Let's say you have a directory of content templates like `recipes/cookies.md` and `recipes/soup.md` and 50 more. Each of these content templates has a title in their frontmatter. While you could manually set a permalink in the frontmatter of each recipe you can also dynamically generate the permalink inside a [Directory Data File](/docs/data-template-dir/) like `recipes.11tydata.js`.

Because of the order of the [data cascade](/docs/data-cascade/) the title of a content template is not immediately available in the directory data file. However, `permalink` is a special case of implied [Computed Data](./data-computed.md) and will have this data available. Inside of your directory data file `recipes.11tydata.js` you could write this:

<div class="codetitle codetitle-right-md">recipes.11tydata.js</div>
{% set codeContent %}
export default {
	permalink: function ({ title }) {
		return `/recipes/${this.slugify(title)}`;
	},
};
{% endset %}
{% include "snippets/esmCjsTabs.njk" %}

The title will be [slugified](/docs/filters/slugify/) to be URL-friendly.

### Mapping one URL to Multiple Files for Internationalization {% addedin "2.0.0-canary.13" %}

_Decouple a page’s primary URL from its permalink._

As an example, say you have two content files: `about.en.html` and `about.es.html`. You’ve already set up the [`addGlobalData` feature to remap their respective output](/docs/data-eleventy-supplied/#changing-your-project-default-permalinks) to `_site/about.en.html` and `_site/about.es.html`.

Use [server-side redirects](https://docs.netlify.com/routing/redirects/redirect-options/#redirect-by-country-or-language) to control which of these files is shown.

- [Netlify Redirects](https://docs.netlify.com/routing/redirects/redirect-options/#redirect-by-country-or-language)
- [Apache Content Negotiation](https://fantasai.inkedblade.net/web-design/l10n) related to [Issue #761](https://github.com/11ty/eleventy/issues/761)

These will work as expected out of the box, except for the [`page.url`](/docs/data-eleventy-supplied/#page-variable) variable and the URL reported in [collection objects](/docs/collections/#collection-item-data-structure) (et al).

Say we want two or more files on the file system (e.g. `about.en.html` and `about.es.html`) to map to a single page URL (`/about/`—not ~~`/about.en.html`~~ or ~~`/about.es.html`~~). This is now possible using a new URL Transforms feature. URL transforms let you modify the `page.url` for a content document based.

This example matches any `.xx.html` URL:

{% set codeContent %}
export default function ($config) {
	$config.addUrlTransform(({ url }) => {
		// `url` is guaranteed to be a string here even if you’re using `permalink: false`
		if (url.match(/\.[a-z]{2}\.html$/i)) {
			return url.slice(0, -1 * ".en.html".length) + "/";
		}

		// Returning undefined skips the url transform.
	});
};
{% endset %}
{% set tabIdOverride = "permalink-url-transform" %}
{% include "snippets/configDefinition.njk" %}
{% set tabIdOverride = "" %}

<div><is-land on:interaction="touchstart,click,focusin" import="/js/eleventy-editor.js"><eleventy-editor html toolbar-position="bottom" data-editor-filename="about.es.html" config="#permalink-url-transform-jsesm">
{% highlight "markdown" %}{% raw %}
---
permalink: about.es.html
---
{{ page.url }}
{% endraw %}{% endhighlight %}
</eleventy-editor></is-land></div>


### Disable templating in permalinks {% addedin "0.7.0" %}

Some template syntaxes are nicer than others and you may want to opt-out of the templating engine to render your permalink string. Use the `dynamicPermalink` option in your front matter to disable this on a per-template basis.

{% callout "pitfall" %}This is a <a href="/docs/pitfalls/"><strong>common pitfall</strong></a> for users of the Pug templating engine.{% endcallout %}

{% codetitle "YAML Front Matter", "Syntax" %}

<div><is-land on:interaction="touchstart,click,focusin" import="/js/eleventy-editor.js"><eleventy-editor html data-editor-filename="index.md">
{% highlight "yaml" %}{% raw %}
---
permalink: "/this-will-be-a-string-without-{{templating}}/"
dynamicPermalink: false
---
{% endraw %}{% endhighlight %}
</eleventy-editor></is-land></div>

#### Globally disable templating in permalinks {% addedin "0.3.4" %}

Eleventy includes a global configuration option to disable dynamic templating altogether. This will save a few template renders and is probably marginally faster, too.

{% set codeContent %}
export default function ($config) {
	// Dynamic permalinks are enabled by default
	$config.setDynamicPermalinks(false);
};
{% endset %}
{% set tabIdOverride = "permalink-dynamic-permalinks" %}
{% include "snippets/configDefinition.njk" %}
{% set tabIdOverride = "" %}

<div><is-land on:interaction="touchstart,click,focusin" import="/js/eleventy-editor.js"><eleventy-editor html data-editor-filename="index.md" config="#permalink-dynamic-permalinks-jsesm">
{% highlight "yaml" %}{% raw %}
---
permalink: "/this-will-be-a-string-without-{{templating}}/"
---
{% endraw %}{% endhighlight %}
</eleventy-editor></is-land></div>


### Ignore the output directory {% addedin "0.1.4" %}

To remap your template’s output to a directory independent of the output directory (`--output`), use `permalinkBypassOutputDir: true` in your front matter.

{% codetitle "YAML Front Matter", "Syntax" %}

<div><is-land on:interaction="touchstart,click,focusin" import="/js/eleventy-editor.js"><eleventy-editor html data-editor-filename="index.html">
{% highlight "yaml" %}{% raw %}
---
permalink: _includes/index.html
permalinkBypassOutputDir: true
---
{% endraw %}{% endhighlight %}
</eleventy-editor></is-land></div>

Writes to `_includes/index.html` even though the output directory is `_site`. This is useful for writing child templates to the `_includes` directory for re-use in your other templates.