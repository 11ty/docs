---
eleventyNavigation:
  parent: Front Matter Data
  key: Custom Front Matter
relatedLinks:
  /docs/data-custom/: Custom Data File Formats
---

# Custom Front Matter Options {% addedin "0.9.0" %}

Eleventy uses the [`gray-matter` npm package](https://www.npmjs.com/package/gray-matter) for parsing front matter. `gray-matter` allows additional options that aren’t available by default in Eleventy.

Check out the [full list of available `gray-matter` options](https://www.npmjs.com/package/gray-matter#options). By default, Eleventy uses `gray-matter`’s default options.

- [**Related**: Change the default Front Matter syntax project-wide](/docs/data-frontmatter/#change-the-default-format-project-wide)

{% include "snippets/frontmatter/options.njk" %}

### Example: using TOML for front matter parsing {% addedin "0.9.0" %}

While Eleventy does include support for [JSON, YAML, and JS front matter out of the box](./data-frontmatter.md#front-matter-formats), you may want to add additional formats too.

{% include "snippets/frontmatter/toml.njk" %}

For more information, read [this example on the `gray-matter` documentation](https://www.npmjs.com/package/gray-matter#optionsengines).

Now you can use TOML in your front matter like this:

{% codetitle "sample.md" %}
{%- set codeBlock %}{% raw %}
---toml
title = "My page title using TOML"
---

<!doctype html>
<html>
…
{% endraw %}{%- endset %}
{{ codeBlock | highlight("markdown") | safe }}

### Example: use JavaScript in your front matter {% addedin "0.9.0" %}

This section has moved to the [Frontmatter Documentation](/docs/data-frontmatter.md#javascript-front-matter).

### Example: Parse excerpts from content {% addedin "0.9.0" %}

{% include "snippets/frontmatter/excerpts.njk" %}

Now you can do things like this:

{% codetitle "sample.md" %}
{%- set codeBlock %}{% raw %}
---

title: My page title
---

This is the start of my content and this will be shown as the excerpt.

<!-- excerpt -->

This is a continuation of my content…
{% endraw %}{%- endset %}
{{ codeBlock | highlight("markdown") | safe }}

Your template’s content will include the excerpt but remove the separator:

```
This is the start of my content and this will be shown as the excerpt.
This is a continuation of my content…
```

`page.excerpt` now holds `This is the start of my content and this will be shown as the excerpt.`

{% callout "info" %}<strong>Don’t want your excerpt included with your content?</strong> The unique feature of this configuration is that you can keep your excerpt right at the beginning of your content. You can add a delimiter where you want the excerpt to end and the rest of the content to begin. If you want the excerpt to be separate from the content, make a new key for this and store it separately in your front matter or a data file.{% endcallout %}

#### Changing where your excerpt is stored

If you don’t want to use `page.excerpt` to store your excerpt value, then use your own `excerpt_alias` option ([any valid path to Lodash Set will work](https://lodash.com/docs/4.17.15#set)) like so:

{% include "snippets/frontmatter/excerptsloc.njk" %}

Using `excerpt_alias: 'my_custom_excerpt'` means that the excerpt will be available in your templates as the `my_custom_excerpt` variable instead of `page.excerpt`.
