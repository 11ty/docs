---
tiptitle: "Super Simple CSS Concatenation"
date: 2018-06-27
---

In some situations you may want to concatenate content files together into a single top level template. Maybe you want to create a single CSS file with all of your component CSS inside.

Consider this sample `theme.njk` file:

{% raw %}
```markdown
---
permalink: theme.css
---

{% include "components/header.css" %}
{% include "components/footer.css" %}
```
{% endraw %}

That’s an easy way to concatenate files and control the include order.

You might imagine creating an `include-all` [Shortcode](/docs/shortcodes/) that uses [`tinyglobby`](https://www.npmjs.com/package/tinyglobby) to include a glob of files like `{% raw %}{% include-all "components/*.css" %}{% endraw %}`, but that’s an exercise left to the reader!

## Capture and Minify

In our [Inline CSS Quick Tip](/docs/quicktips/inline-css/), we discussed how to capture and minify a CSS file. This approach can be modified, of course, to capture multiple includes too!

{% raw %}

```html
<!-- capture the CSS content as a Nunjucks variable -->
{% set css %}
{% include "components/header.css" %}
{% include "components/footer.css" %}
{% endset %}
<!-- feed it through our cssmin filter to minify -->
<style>
	{{ css | cssmin | safe }}
</style>
```

{% endraw %}

## Warning about Content Security Policy

{% callout "warn" %}
If you are using a Content Security Policy on your website, make sure the <code>style-src</code> directive allows <code>'unsafe-inline'</code>. Otherwise, your inline CSS will not load.
{% endcallout %}

## Work with what you have

Of course, Eleventy has no desire to replace your existing build pipeline. This is just a super simple example if you want something up and running quickly.

That said, Eleventy wants to work with what you have. As an example, the [`EleventyOne` project scaffold](https://github.com/philhawksworth/eleventyone/) is a fine example of using Eleventy with Gulp and Sass. At time of writing, the [zachleat.com source code](https://github.com/zachleat/zachleat.com) is an older example that works with Grunt and Sass (not anymore though).

