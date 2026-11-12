---
eleventyNavigation:
  parent: Data Cascade
  key: Front Matter Data
  order: 1
---

# Front Matter Data

Add data in your template front matter, like this:

{% codetitle "YAML", "Syntax" %}
{%- set codeBlock %}{% raw %}
---
title: My page title
---

<!doctype html>
<html>
…
{% endraw %}{%- endset %}
{{ codeBlock | highlight("markdown") | safe }}

The above is using [YAML syntax](https://learnxinyminutes.com/docs/yaml/). You can [use other formats too](#front-matter-formats).

Locally assigned front matter values override things further up the layout chain. Note also that layouts can contain front matter variables that you can use in your local template. Leaf template front matter takes precedence over layout front matter. Read more about [Layouts](/docs/layouts/).

Note that only the [`permalink`](/docs/permalinks/) and [`eleventyComputed`](/docs/data-computed/) front matter values can contain variables and shortcodes like you would use in the body of your templates. If you need to use variables or shortcodes in other front matter values, use `eleventyComputed` to set them.

## Template Configuration

<span id="user-defined-front-matter-customizations"></span>

Eleventy allows many options to control how your template works. The most popular is [`permalink`](/docs/permalinks/), which allows you to change where the file goes on the file system. You can set these options in your front matter, or anywhere else in the [Data Cascade](/docs/data-cascade/). [Read more about Template Configuration](/docs/data-configuration/).

## Sources of Data

{% include "datasources.md" %}

## Front Matter Formats

Eleventy uses the [`gray-matter` package](https://github.com/jonschlinkert/gray-matter) for front matter processing. `gray-matter` (and thus, Eleventy) includes support out of the box for `yaml`, `json`, and `js` front matter (with some [aliases](https://github.com/jonschlinkert/gray-matter/blob/ce67a86dba419381db0dd01cc84e2d30a1d1e6a5/lib/engine.js) also included).

### Change the default format project-wide {% addedin "0.9.0" %}

By default, `yaml` is used when a front matter syntax is not explicitly specified. You can change this project-wide with:

{% include "snippets/frontmatter/default.njk" %}

### JSON Front Matter

{%- set codeBlock %}{% raw %}
---json
{
  "title": "My page title"
}
---

<!DOCTYPE html>
<html>
	…
</html>
{% endraw %}{%- endset %}
{{ codeBlock | highlight("html") | safe }}

### JavaScript Front Matter <span id="javascript-front-matter"></span>

{% addedin "3.0.0-alpha.18" %}You can use any arbitrary JavaScript here and we’ll export all of the top level variables and functions to your template. This uses the [`node-retrieve-globals` library](https://github.com/zachleat/node-retrieve-globals).

{% codetitle "Nunjucks", "Syntax" %}
{%- set codeBlock %}{% raw %}
---js
const title = "My page title";

function currentDate() {
	return (new Date()).toLocaleString();
}
---

<h1>{{ title }}</h1>
<p>Published on {{ currentDate() }}</p>
{% endraw %}{%- endset %}
{{ codeBlock | highlight("jinja2") | safe }}

_Warning: while Nunjucks and Liquid syntax are similar, the above example will **not** work in Liquid. Liquid does not allow function execution in output (e.g. `{% raw %}{{ currentDate() }}{% endraw %}`)._


<details>
<summary><strong>More Advanced Examples of JavaScript Front Matter</strong></summary>

{%- set codeBlock %}{% raw %}
---js
// async-friendly
const myAsyncString = await Promise.resolve("HELLO FROM THE OTHER SIDE");

// export via destructuring assignment
const { myKey } = { myKey: "myValue" };
const [ first, second ] = [ "first", "second" ];

// export via dynamic import
const { noop } = await import("@zachleat/noop");

// access Node.js globals like console.log
console.log({ noop });
---
<!-- The template content goes here -->
{% endraw %}{%- endset %}
{{ codeBlock | highlight("js") | safe }}

</details>

#### JavaScript Object Front Matter

`js` front matter also supports JavaScript object notation (though it isn’t as pretty).

{% codetitle "Nunjucks", "Syntax" %}
{%- set codeBlock %}{% raw %}
---js
{
  title: "My page title",
  currentDate: function() {
    // You can have a JavaScript function here!
    return (new Date()).toLocaleString();
  }
}
---

<h1>{{ title }}</h1>
<p>Published on {{ currentDate() }}</p>
{% endraw %}{%- endset %}
{{ codeBlock | highlight("html") | safe }}

_Warning: while Nunjucks and Liquid syntax are similar, the above example will **not** work in Liquid. Liquid does not allow function execution in output (e.g. `{% raw %}{{ currentDate() }}{% endraw %}`)._

### Add your own format {% addedin "0.9.0" %}

You can [customize Front Matter Parsing](/docs/data-frontmatter-customize/) in Eleventy to add your own custom format, and we provide examples for:

- [TOML in front matter](/docs/data-frontmatter-customize/#example-using-toml-for-front-matter-parsing).
- You can also configure [front matter for customized excerpts](/docs/data-frontmatter-customize/).

## From the Community

{% include "11tybundle.njk" %}
