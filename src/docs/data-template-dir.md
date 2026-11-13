---
eleventyNavigation:
  parent: Data Cascade
  key: Template and Directory Data Files
  title: Template & Directory Data Files
  order: 2
---

# Template and Directory Specific Data Files {% addedin "0.2.14" %}

While you can provide [global data files](/docs/data-global/) to supply data to all of your templates, you may want some of your data to be available locally only to one specific template or to a directory of templates. For that use, we also search for JSON and [JavaScript Data Files](/docs/data-js/) in specific places in your directory structure.

For example, consider a template located at `posts/subdir/my-first-blog-post.md`. Eleventy will look for data in the following places (starting with highest priority, local data keys override global data):

1. [Content Template Front Matter Data](/docs/data-frontmatter/)
   - merged with any [Layout Front Matter Data](/docs/layouts/#front-matter-data-in-layouts)
1. Template Data File (data is only applied to `posts/subdir/my-first-blog-post.md`)
   - `posts/subdir/my-first-blog-post.11tydata.js` {% minilink "/docs/data-js/" %}{% addedin "0.5.3" %}JavaScript Data Files{% endminilink %}
   - `posts/subdir/my-first-blog-post.11tydata.json` {% addedin "0.5.3" %}
   - `posts/subdir/my-first-blog-post.json`
1. Directory Data File (data applies to all templates in `posts/subdir/*`)
   - `posts/subdir/subdir.11tydata.js` {% minilink "/docs/data-js/" %}{% addedin "0.5.3" %}JavaScript Data Files{% endminilink %}
   - `posts/subdir/subdir.11tydata.json` {% addedin "0.5.3" %}
   - `posts/subdir/subdir.json`
1. Parent Directory Data File (data applies to all templates in `posts/**/*`, including subdirectories) {% addedin "0.2.15" %}
   - `posts/posts.11tydata.js` {% minilink "/docs/data-js/" %}{% addedin "0.5.3" %}JavaScript Data Files{% endminilink %}
   - `posts/posts.11tydata.json` {% addedin "0.5.3" %}
   - `posts/posts.json`
1. [Global Data Files](/docs/data-global/) in `_data/*` (`.js` or `.json` files) available to all templates.

## Examples

### Apply a default layout to multiple templates

{% codetitle "posts/posts.json" %}

<!-- prettier-ignore-start -->
{%- set codeBlock %}{% raw %}
{ "layout": "layouts/post.njk" }
{% endraw %}{%- endset %}

<!-- prettier-ignore-end -->
{{ codeBlock | highlight("json") | safe }}

Using the above in `posts/posts.json` will configure a layout for all of the templates inside of `posts/*`.

## Additional Customizations

- The name of the data file must match either the post or the directory it resides within. You can [change this behavior using the `setDataFileBaseName` method in the Configuration API](/docs/config/#change-base-file-name-for-data-files).
- You can use the [`setDataFileSuffixes` Configuration API method to **customize the default file suffixes or disable this feature altogether**](/docs/config/#change-file-suffix-for-data-files).
- Note that any [Custom Formats](/docs/data-custom/#ordering-in-the-data-cascade) {% addedin "0.10.0" %} specified in your configuration will also be taken into account at a lower priority than their JavaScript or JSON counterparts.

## Sources of Data

{% include "datasources.md" %}
