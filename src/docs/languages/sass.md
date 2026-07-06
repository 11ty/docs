---
eleventyNavigation:
  parent: Template Languages
  key: Sass
  order: 9
  excerpt: CSS extension language
description:
layout: layouts/langs.njk
logoImage: "/img/logos/sass.svg"
---

<!-- {% tableofcontents "open" %} -->

[Sass](https://sass-lang.com/) is a CSS extension language: it implements extra features not found in CSS directly. You can use Sass as a template language and 11ty will transform it into CSS for you.

You don't have to use Sass to style your site: [Eleventy supports normal CSS as well as other assets assets.](/docs/assets) Also, consider that CSS has added many of the features of Sass, like nested styles and variables, so it's no longer as necessary to use Sass.

| Eleventy Short Name | File Extension | npm Package |
| ------------------- | -------------- | ----------- |
| `scss`          | `.scss`         | [`sass`](https://www.npmjs.com/package/sass) |

- [_Related: Eleventy Custom Templates for JavaScript and CSS_](/docs/assets/#eleventy-custom-templates)

## Configuration

_If you’d like to read a more detailed explanation of the following code, there is more detail on the [Custom template syntax documentation](/docs/languages/custom/#example-add-sass-support-to-eleventy)._

The following configuration will read and render `*.scss` files as `.css` files in your output directory. _[GitHub #408](https://github.com/11ty/eleventy/issues/408)._

Install the `sass` plugin from npm:

{%- set codeBlock %}
npm install sass
{%- endset %}
{{ codeBlock | highlight("bash") | safe }}

Next add your configuration:

{% set codeContent %}
import path from "node:path";
import * as sass from "sass";

export default function ($config) {
	$config.addExtension("scss", {
		outputFileExtension: "css",

		// opt-out of Eleventy Layouts
		useLayouts: false,

		compile: async function (inputContent, inputPath) {
			let parsed = path.parse(inputPath);
			// Don’t compile file names that start with an underscore
			if(parsed.name.startsWith("_")) {
				return;
			}

			let result = sass.compileString(inputContent, {
				loadPaths: [
					parsed.dir || ".",
					this.config.dir.includes,
				]
			});

			// Map dependencies for incremental builds
			this.addDependencies(inputPath, result.loadedUrls);

			return async (data) => {
				return result.css;
			};
		},
	});
};
{% endset %}
{% include "snippets/configDefinition.njk" %}

Now run Eleventy and tell it to process `scss` files:

```sh
npx @11ty/eleventy --formats=scss
```

Alternatively, you can add `$config.addTemplateFormats("scss")` to your configuration file.

## Community Contributions

{% renderTemplate "webc" %}
<sites-list><site-card @url="https://11ty.rocks/posts/process-css-with-lightningcss/" @name="Process CSS or Sass with LightningCSS" @using="LightningCSS" @date="2023-02-25"></site-card></sites-list>
{% endrenderTemplate %}