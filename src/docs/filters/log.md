---
eleventyNavigation:
  parent: Filters
  key: log Filter
  title: "<code>log</code>"
  order: 3
  excerpt: "<code>console.log</code> inside templates."
---

# `log` Universal Filter

{% addedin "0.11.0" %} An easy way to <code>console.log</code> anything from inside of a template file.

<is-land on:visible import="/js/seven-minute-tabs.js">
<seven-minute-tabs persist sync class="tabs-flush" autoheight>
  {% renderFile "./src/_includes/syntax-chooser-tablist.11ty.js", {id: "log"} %}
  <div id="log-liquid" role="tabpanel">

{% raw %}

```liquid
{{ "My Title" | log }}
```

{% endraw %}

  </div>
  <div id="log-njk" role="tabpanel">

{% raw %}

```jinja2
{{ "My Title" | log }}
```

{% endraw %}

  </div>
  <div id="log-js" role="tabpanel">

{% raw %}

```js
export default function (data) {
	// Caveat: you have access to `console.log` here, so probably use that.
	return this.log("My Title");
};
```

{% endraw %}

  </div>
	<div id="log-cjs" role="tabpanel">

{% raw %}

```js
module.exports = function (data) {
	// Caveat: you have access to `console.log` here, so probably use that.
	return this.log("My Title");
};
```

{% endraw %}

  </div>
</seven-minute-tabs>
</is-land>

is functionally the same as running `console.log("My Title")` inside of your template.

### Using `log` in filter chains {% addedin "2.0.0-canary.13"%}

You can drop log in between any filter chain you already have and it will log the incoming data and pass it through to the next filter.

<is-land on:visible import="/js/seven-minute-tabs.js">
<seven-minute-tabs persist sync autoheight>
	{% renderFile "./src/_includes/syntax-chooser-tablist.11ty.js", {id: "log-chain-demo", subtractions: "js,cjs,hbs"} %}
  <div id="log-chain-demo-liquid" role="tabpanel">

{% codetitle "Liquid", "Syntax" %}

{% raw %}

```liquid
{{ "My Title" | log | upcase }}

This is the same as:
{% assign temp = "My Title" %}
{{ temp | log }}
{{ temp | upcase }}
```

{% endraw %}

  </div>
  <div id="log-chain-demo-njk" role="tabpanel">

{% codetitle "Nunjucks", "Syntax" %}

{% raw %}

```jinja2
{{ "My Title" | log | upper }}

This is the same as:
{% set temp = "My Title" %}
{{ temp | log }}
{{ temp | upper }}
```

{% endraw %}

  </div>
</seven-minute-tabs>
</is-land>

---

[← Back to Filters documentation.](/docs/filters/)
