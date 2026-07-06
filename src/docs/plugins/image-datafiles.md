---
pageTitle: Image (as Data Files)
eleventyNavigation:
  key: Image Data Files
  parent: Image
  excerpt: Use images to populate data in the Data Cascade.
excludeFromSidebar: true
---

{% tableofcontents %}

{% include "image-usage.njk" %}

{% callout "warn", "md" %}
**This is a _nontraditional use case_—you probably don’t want to use it, but you can!**

**Head back to the [Image HTML Transform](./image.md#html-transform) docs for the recommended way to optimize images.**
{% endcallout %}

{% addedin "2.0.0-canary.10" %} Eleventy’s [Custom Data File Formats](/docs/data-custom/) features an example of [processing Images as data files to feed EXIF data into the Data Cascade](/docs/data-custom/#feed-exif-image-data-into-the-data-cascade). You can use the same feature to add the metadata stats returned from the Image utility directly to the Data Cascade for use in your templates.

- Benefits:
  - Processing happens in the data cascade so this works in any template language.
  - Images stored in the [global data folder](/docs/data-global/) will be processed and available to all templates
- Drawbacks:
  - You can’t customize the Image options (e.g. `widths` or `formats`) from the template code. It is set globally in the config.
- Both a benefit and a drawback:
  - Beholden to Eleventy’s Data Cascade file name conventions when using with [template/directory data files](/docs/data-template-dir/).

## Configuration

{% set codeContent %}
import path from "node:path";
import Image from "@11ty/eleventy-img";

export default function ($config) {
	$config.addDataExtension("png,jpeg", {
		read: false, // Don’t read the input file, argument is now a file path
		parser: async (imagePath) => {
			let stats = await Image(imagePath, {
				widths: ["auto"],
				formats: ["avif", "webp", "jpeg"],
				outputDir: path.join($config.dir.output, "img", "built"),
			});

			return {
				image: {
					stats,
				},
			};
		},
	});

	// This works sync or async: images were processed ahead of time in the data cascade
	$config.addShortcode("dataCascadeImage", (stats, alt, sizes) => {
		let imageAttributes = {
			alt,
			sizes,
			loading: "lazy",
			decoding: "async",
		};
		return Image.generateHTML(stats, imageAttributes);
	});
};
{% endset %}
{% include "snippets/configDefinition.njk" %}

With a template `my-blog-post.md` and an image file `my-blog-post.jpeg`, you could use the above configuration code in your template like this:

{% codetitle "my-blog-post.md" %}

{% raw %}

```liquid
{% dataCascadeImage image.stats, "My alt text" %}
```

{% endraw %}

Note this also means that `folder/folder.jpeg` would be processed for all templates in `folder/*` and any images stored in your global `_data` would also be populated into the data cascade based on their folder structure.

<div class="youtube-related">
	{%- youtubeEmbed "oCTAZumAGNc", "Use images as data files (Weekly №11)", "244" -%}
</div>
