---
eleventyNavigation:
  parent: Eleventy Projects
  key: Passthrough File Copy
  title: Copy Files to Output
  order: 0
---

# Passthrough File Copy {% addedin "0.2.14" %}

{% tableofcontents %}

If we want to copy additional files that are not Eleventy templates, we use a feature called Passthrough File Copy to tell Eleventy to copy things to our output folder for us.

## Configuration API Method

<a id="{{ 'Manual Pass-through Copy (Faster)' | slugify }}"></a><a id="{{ 'Manual Passthrough Copy (Faster)' | slugify }}"></a>

Use a configuration API method to specify _files_ or _directories_ for Eleventy to copy to the output folder.

{% set codeContent %}
export default function (eleventyConfig) {
	// Output directory: _site

	// Copy `img/` to `_site/img/`
	eleventyConfig.addPassthroughCopy("img");

	// Copy `css/fonts/` to `_site/css/fonts/`
	// Keeps the same directory structure.
	eleventyConfig.addPassthroughCopy("css/fonts");

	// Copy any .jpg file to `_site`, via Glob pattern
	// Keeps the same directory structure.
	eleventyConfig.addPassthroughCopy("**/*.jpg");
};
{% endset %}
{% include "snippets/configDefinition.njk" %}

{% callout "info" %}Passthrough File Copy entries are relative to the root of your project and <em>not</em> your Eleventy input directory.{% endcallout %}

If you do not want to maintain the same directory structure, [change the output directory.](#change-the-output-directory)

### How Input Directories are Handled

As stated above, passthrough file copy paths are relative to the project root and not the input directory. Because of this, if the passthrough file copy path is inside of your input directory, the input directory will be stripped from the output path.

For example:

- `input` directory is `src`
- `output` directory is `_site`.

If we copy `src/img` using passthrough file copy, it will copy to `_site/img`.

{% set codeContent %}
export default function (eleventyConfig) {
	// Input directory: src
	// Output directory: _site

	// The following copies to `_site/img`
	eleventyConfig.addPassthroughCopy("src/img");
};
{% endset %}
{% include "snippets/configDefinition.njk" %}

### Using Globs {% addedin "0.9.0" %}

In this example, we copy all `jpg` image files to the output folder, maintaining their directory structure. If you do not want to maintain the same directory structure, [change the output directory.](#using-globs-and-output-directories)

Note that this method is slower than non-glob methods, as it searches the entire directory structure and copies each file individually.

{% set codeContent %}
export default function (eleventyConfig) {
	// Find and copy any `jpg` files, maintaining directory structure.
	eleventyConfig.addPassthroughCopy("**/*.jpg");
};
{% endset %}
{% include "snippets/configDefinition.njk" %}

With an output directory of `_site`:

- `img/avatar.jpg` will copy to `_site/img/avatar.jpg`
- `subdir/img/avatar.jpg` will copy to `_site/subdir/img/avatar.jpg`

### Copy a file alongside a Template {% addedin "3.1.0-alpha.1" %}

Use the _HTML Relative Passthrough Copy Mode_ to copy files referenced in any template syntax that outputs to `.html`. [Issue #3573](https://github.com/11ty/eleventy/pull/3573)

{% set codeContent %}
export default function(eleventyConfig) {
	// Relative to the project root directory
	eleventyConfig.addPassthroughCopy("content/**/*.mp4", {
		mode: "html-relative"
	});
}
{% endset %}
{% include "snippets/configDefinition.njk" %}

<details>
<summary><strong>Full options list</strong></summary>

{% set codeContent %}
export default async function(eleventyConfig) {
	// glob or Array of globs to match for copy
	eleventyConfig.addPassthroughCopy("**/*.png", {
		mode: "html-relative",
		paths: [], // additional fallback directories to look for source files
		failOnError: true, // throw an error when a path matches (via `match`) but not found on file system
		copyOptions: { dot: false }, // `recursive-copy` copy options
	});
}
{% endset %}
{% include "snippets/configDefinition.njk" %}

</details>

Any references that match this glob in `a[href]`, `video[src]`, `audio[src]`, `source`, `img[src]`, `[srcset]` and a [whole bunch more (via posthtml-urls)](https://github.com/11ty/eleventy-posthtml-urls/blob/6e064c8a03174835eb15afbb5b759fecd696f901/lib/defaultOptions.js#L12-L33) will colocate the file alongside your template (reusing any [`permalink` values](/docs/permalinks/) correctly). If a passthrough copy file is not found to be referenced in an HTML output file, it will not be copied to the output directory.

As a few example paths, with an output directory of `_site`:

- `<video src="video.mp4">` on `template.njk` will copy to `_site/template/video.mp4` alongside `_site/template/index.html`.
- `<video src="assets/video.mp4">` on `dir/template.njk` will copy to `_site/dir/template/assets/video.mp4` alongside `_site/dir/template/index.html`

{% callout "info", "md", "HTML Relative Copy Mode restrictions" %}

- dot files are filtered out by default (override by changing the `copyOptions.dot: false` default, consult the _Full options list_ above)
- Referenced files must be inside the project’s root directory.
- Absolute paths are ignored.

{% endcallout %}

### Change the Output Directory {% addedin "0.9.0" %}

Instead of a string, pass in an object of the following structure: `{ "input": "target" }`.

{% set codeContent %}
export default function (eleventyConfig) {
	// Input directory: src
	// Output directory: _site

	// Copy `img/` to `_site/subfolder/img`
	eleventyConfig.addPassthroughCopy({ img: "subfolder/img" });

	// Copy `src/img/` to `_site/subfolder/img`
	eleventyConfig.addPassthroughCopy({ "src/img": "subfolder/img" });

	// Copy `random-folder/img/` to `_site/subfolder/img`
	eleventyConfig.addPassthroughCopy({ "random-folder/img": "subfolder/img" });
};
{% endset %}
{% include "snippets/configDefinition.njk" %}

#### Using Globs and Output Directories

Note that this method is slower than non-glob methods, as it is searching the entire directory structure and copies each file in Eleventy individually.

{% set codeContent %}
export default function (eleventyConfig) {
	// Output directory: _site

	// Find and copy any `jpg` files in any folder to _site/img
	// Does not keep the same directory structure.
	eleventyConfig.addPassthroughCopy({ "**/*.jpg": "img" });
};
{% endset %}
{% include "snippets/configDefinition.njk" %}

With an output directory of `_site`:

- `img/avatar.jpg` would copy to `_site/img/avatar.jpg`
- `subdir/img/avatar.jpg` would copy to `_site/img/avatar.jpg`


<span id="passthrough-during-serve"></span>

## Emulate Passthrough Copy During `--serve` {% addedin "2.0.0-canary.12" %}

The [Eleventy Dev Server](/docs/watch-serve/#eleventy-dev-server) includes a great build-performance feature that will _emulate_ passthrough file copy.

Practically speaking, this means that (during `--serve` only!) files are referenced directly and _**will not**_ be copied to your output folder. Changes to passthrough file copies will not trigger an Eleventy build but _will_ live reload appropriately in the dev server.

You can enable this behavior in your project using this configuration API method:

{% set codeContent %}
export default function (eleventyConfig) {
	// the default is "copy"
	eleventyConfig.setServerPassthroughCopyBehavior("passthrough");
};
{% endset %}
{% include "snippets/configDefinition.njk" %}

This behavior will revert to `"copy"` in your project automatically if:

1. If you are running Eleventy without `--serve` (a standard build or via `--watch`)
2. You change from the default development server: [Eleventy Dev Server](/docs/dev-server/) (e.g. [swap back to Browsersync](/docs/dev-server/#swap-back-to-browsersync))

{% callout "info", "md" %}_For 2.0 canary users, note that this behavior spent a fair bit of time as the default and required opt-out from `2.0.0-canary.12` through `2.0.0-canary.30`. It was changed to opt-in in `2.0.0-canary.31`._{% endcallout %}

<div class="youtube-related">
  {%- youtubeEmbed "EcId2RVdUFE", "Emulated Passthrough File Copy (Weekly №15)", "443" -%}
</div>

## Passthrough by File Extension {% addedin "0.2.7" %}

Eleventy, by default, searches for any file in the input directory with a file extension listed in your [`templateFormats` configuration](/docs/config/#template-formats). That means if you’ve listed `njk` in your `templateFormats`, we’ll look for any Nunjucks templates (files with the `.njk` file extension).

If a file format is not recognized by Eleventy as a template file extension, Eleventy will ignore the file. You can modify this behavior by adding supported template formats:

{% set codeContent %}
export default function (eleventyConfig) {
	eleventyConfig.setTemplateFormats([
		"md",
		"css", // `css` is not a registered template syntax file extension
	]);
};
{% endset %}
{% include "snippets/configDefinition.njk" %}

In the above code sample `css` is not currently a recognized Eleventy template, but Eleventy will search for any `*.css` files inside of the input directory and copy them to output (maintaining the same directory structure).

You might use this for images by adding `"jpg"`, `"png"`, or even `"webp"`.

{% callout "info", "md" %}Note that this method is typically slower than the `addPassthroughCopy` configuration API method above, especially if your project is large and has lots of files.{% endcallout %}

## Advanced Options {% addedin "2.0.0-canary.12" %}

Additionally, you can pass additional configuration options to the `recursive-copy` package. This unlocks the use passthrough file copy with symlinks, transforming or renaming copied files. Here are just a few examples:

{% set codeContent %}
export default function (eleventyConfig) {
	eleventyConfig.addPassthroughCopy("img", {
		expand: true, // expand symbolic links
	});

	eleventyConfig.addPassthroughCopy({ img: "subfolder/img" }, {
		debug: true, // log debug information
	});
};
{% endset %}
{% include "snippets/configDefinition.njk" %}

{% codetitle ".eleventy.js" %}

```js
const path = require('path')
const { minify: jsMinify } = require("terser")
const duplexify = require('duplexify')
const concatStream = require('concat-stream')
const from2String = require('from2-string')
module.exports = function (eleventyConfig) {
	async function minify(ext, raw) {
		switch (ext) {
			case ".js": {
				const minified = await jsMinify(raw, {});
				return minified.code;
			}
			default:
				return raw;
		}
	}
	let copyOptions = {
		// transform files: minify all .js files
		transform: function(src, dest, stats) {
			const ext = path.extname(src)
			switch (ext) {
				case '.js': {
					break
				}
				default: return null
			}
			const stream = duplexify()
			const writer = concatStream({ encoding: 'string' }, function (raw) {
				minify(ext, raw)
					.then(minified => {
						stream.setReadable(from2String(minified))
					})
					.catch(e => {
						stream.emit('error', e)
					})
			})
			stream.setWritable(writer)
			return stream
		}
	};
	eleventyConfig.addPassthroughCopy({ "./static/": "/" }, copyOptions);
};
```

Review the [full list of options on the `recursive-copy` GitHub repository](https://github.com/timkendrick/recursive-copy#usage).

<div class="youtube-related">
  {%- youtubeEmbed "EcId2RVdUFE", "Passthrough File Copy Advanced Options (Weekly №15)", "337" -%}
</div>
