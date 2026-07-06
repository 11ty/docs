---
eleventyNavigation:
  key: Syntax Highlighting
  title: '<i class="fa-solid fa-file-code"></i>Syntax Highlighting'
  order: 2
  excerpt: Code syntax highlighting using PrismJS without client-side JavaScript.
---

# Syntax Highlighting Plugin

{% tableofcontents %}

A pack of Eleventy plugins for PrismJS syntax highlighting. No browser/client JavaScript here, these highlight transformations are all done at build-time. Supports individual line highlighting.

- This documentation applies to `eleventy-plugin-syntaxhighlight` `v3.2.0` and newer.
- [GitHub](https://github.com/11ty/eleventy-plugin-syntaxhighlight).

## Installation

Available on [npm](https://www.npmjs.com/package/@11ty/eleventy-plugin-syntaxhighlight).

{% set codeBlock %}{% raw %}
npm install @11ty/eleventy-plugin-syntaxhighlight
{% endraw %}{% endset %}
{{ codeBlock | highlight("bash") | safe }}

Open up your Eleventy config file (probably `buildawesome.config.js`) and use `addPlugin`:

{% set codeContent %}
import syntaxHighlight from "@11ty/eleventy-plugin-syntaxhighlight";

export default function ($config) {
	$config.addPlugin(syntaxHighlight);
};
{% endset %}
{% include "snippets/configDefinition.njk" %}

Optionally pass in an options object as the second argument to `addPlugin` to further customize this plugin pack.

<details>
  <summary>Expand to see Advanced Options</summary>

{% set codeContent %}
import syntaxHighlight from "@11ty/eleventy-plugin-syntaxhighlight";

export default function($config) {
  $config.addPlugin(syntaxHighlight, {

    // Line separator for line breaks
    lineSeparator: "\n",

    // Change which Eleventy template formats use syntax highlighters
    templateFormats: ["*"], // default

    // Use only a subset of template types (11ty.js added in v4.0.0)
    // templateFormats: ["liquid", "njk", "md", "11ty.js"],

    // init callback lets you customize Prism
    init: function({ Prism }) {
      Prism.languages.myCustomLanguage = { /* … */ };
    },

    // Added in 3.1.1, add HTML attributes to the <pre> or <code> tags
    preAttributes: {
      tabindex: 0,

      // Added in 4.1.0 you can use callback functions too
      "data-language": function({ language, content, options }) {
        return language;
      }
    },
    codeAttributes: {},

    // Added in 5.0.0, throw errors on invalid language names
    errorOnInvalidLanguage: false,
  });
};
{% endset %}
{% include "snippets/configDefinition.njk" %}

</details>

You are responsible for including your favorite PrismJS theme CSS and there are many ways to do that. The default themes are provided by [several CDNs](https://prismjs.com/#basic-usage-cdn) and could be easily included in a base layout, like in the example below:

```html
<html lang="en">
	<head>
		<!-- Some html boilerplate omitted -->
		<link
			href="https://unpkg.com/prismjs@1.20.0/themes/prism-okaidia.css"
			rel="stylesheet"
		/>
	</head>
</html>
```

You could also download the css file or paste its content inside a style tag. This approach allows the use of [other themes](https://github.com/PrismJS/prism-themes) from a Prism extension repository.

## Usage

This plugin provides the following syntax highlighters using PrismJS, all of which currently support individual line highlighting.

- Markdown Highlighter (triple backtick <code>```</code>)
- Liquid Custom Tag {% raw %}`{% highlight %}`{% endraw %}
- Nunjucks Paired Shortcode {% raw %}`{% highlight %}`{% endraw %}
- JavaScript Function {% raw %}`this.highlight()`{% endraw %} {% addedin "Syntax Highlighter v4.0.0" %}
- WebC component {% raw %}`<syntax-highlight>`{% endraw %} {% addedin "Syntax Highlighter v4.2.0" %}

### Syntax Highlight Source Code

- [Review the list of supported PrismJS languages](https://prismjs.com/#languages-list)

{% include "snippets/plugins/highlight.njk" %}

Will render like this in the browser:

{% callout "demo" %}

{% highlight "js" %}
function myFunction() {
	return true;
}
{% endhighlight %}

{% endcallout %}

### Show changes using `diff-` syntax

{% addedin "Syntax Highlighter v3.2.2" %}

Add the `diff-` prefix to the language name on the previous examples to show code changes. Use a `+` or `-` at the beginning of the line to denote the addition or removal of that line.

{% include "snippets/plugins/highlight-diff.njk" %}

Will render like this in the browser:

{% callout "demo" %}

{% highlight "diff-js" %}
+function myFunction() {
	// …
-	return true;
}
{% endhighlight %}

{% endcallout %}

Alternatively, you can use `diff` _without_ another language name to enable plaintext line highlighting.

<details>
  <summary>Don’t forget to add styles too! Here’s a sample <code>diff-</code> CSS</summary>

{% codetitle "CSS", "Syntax" %}

```css
.token.deleted {
	background-color: hsl(350deg 100% 88% / 47%);
}
.token.inserted {
	background-color: hsl(120deg 73% 75% / 35%);
}

/* Make the + and - characters unselectable for copy/paste */
.token.prefix.unchanged,
.token.prefix.inserted,
.token.prefix.deleted {
	-webkit-user-select: none;
	user-select: none;
}

/* Optional: full-width background color */
.token.inserted:not(.prefix),
.token.deleted:not(.prefix) {
	display: block;
}
```

</details>

{% callout "info", "md" %}Starting with `v3.2` of this plugin, this plugin now bundles the official [Prism `diff-highlight` plugin](https://prismjs.com/plugins/diff-highlight/). The previous line highlighting feature is considered deprecated but still available. Check out [the old documentation if you want to learn how to use the deprecated line-highlighting feature](https://v0-12-1.11ty.dev/docs/plugins/syntaxhighlight/).{% endcallout %}
