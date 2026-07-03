---
eleventyNavigation:
  parent: Create Pages From Data
  key: Pagination Navigation
  excerpt: Create a list of links to every paginated page on a pagination template.
tags: ["related-pagination"]
relatedTitle: Create a list of Navigation Links for your Pagination.
---

# Pagination Navigation

{% tableofcontents %}

How to create a list of links to every paginated page on a pagination template.

## Paginating over an Array

Consider the following example paginating our `testdata` array:

{% include "snippets/pagination/nav-array.njk" %}

The above example would make three different output files from the template.

- Page 1 would have `pagination.items` set to `['item1', 'item2']`.
- Page 2 would have `pagination.items` set to `['item3', 'item4']`.
- Page 3 would have `pagination.items` set to `['item5', 'item6']`.

But to create a series of links to each of these paginated output templates, we’ll want to use our `pagination.pages` entries {% addedin "0.10.0" %}, an array of the `pagination.items` for each page.

A good way to think about it:

- `pagination.items` is the chunk of data for the _current_ page.
- `pagination.pages` is the chunked page data for _all_ of the pages.

{% callout "info" %}While the above example pages over an array of data, the code provided here will operate the same for any paginated data (including objects)!{% endcallout %}

## Starter Example

To create an accessible navigation structure, we want to do our research first!

- [Web Accessibility Tutorials from the w3c Web Accessibility Initiative: Menu Structure](https://www.w3.org/WAI/tutorials/menus/structure/)
- [MDN web docs: `<nav>`: The Navigation Section element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/nav)
- [Scott O’Hara with an Accessible Breadcrumb Navigation Pattern](https://scottaohara.github.io/a11y_breadcrumbs/)
- [Léonie Watson on _Using the aria-current attribute_.](https://tink.uk/using-the-aria-current-attribute/)

Alright, you definitely read all of those right? 😇 Here’s some accessible code you definitely would have written yourself after reading those wonderful resources:

<is-land on:visible import="/js/seven-minute-tabs.js">
<seven-minute-tabs autoheight>
  {% renderFile "./src/_includes/syntax-chooser-tablist.11ty.js", {id: "paged-nav-starter", valid: "liquid,njk,js" } %}
  <div id="paged-nav-starter-liquid" role="tabpanel">
    {%- codetitle "starter.liquid" %}
{%- set codeBlock %}
{%- include "snippets/pagination/nav/starter.liquid" %}
{%- endset %}
{{ codeBlock | highlight("html") | safe }}
  </div>
  <div id="paged-nav-starter-njk" role="tabpanel">
    {%- codetitle "starter.njk" %}
{%- set codeBlock %}
{%- include "snippets/pagination/nav/starter.njk" %}
{%- endset %}
{{ codeBlock | highlight("html") | safe }}
  </div>
  <div id="paged-nav-starter-js" role="tabpanel">
    {%- codetitle "starter.11ty.js" %}
{%- set codeBlock %}
{%- include "snippets/pagination/nav/starter.js" %}
{%- endset %}
{{ codeBlock | highlight("js") | safe }}
  </div>
	<div id="paged-nav-starter-cjs" role="tabpanel">
    {%- codetitle "starter.11ty.cjs" %}
{%- set codeBlock %}
{%- include "snippets/pagination/nav/starter.cjs" %}
{%- endset %}
{{ codeBlock | highlight("js") | safe }}
  </div>
</seven-minute-tabs>
</is-land>

For our example, this code will output the following markup for our example (on the first page):

{% codetitle "HTML", "Syntax" %}
{%- set codeBlock %}{% raw %}
<nav aria-labelledby="my-pagination">
	<h2 id="my-pagination">This is my Pagination</h2>
	<ol>
		<li><a href="/test/" aria-current="page">Page 1</a></li>
		<li><a href="/test/1/">Page 2</a></li>
		<li><a href="/test/2/">Page 3</a></li>
	</ol>
</nav>
{% endraw %}{%- endset %}
{{ codeBlock | highlight("html") | safe }}

{% callout "info" %}<strong>HTML tip</strong>: make sure the <code>id</code> attribute used on your heading (<code>id="my-pagination"</code>) is unique to your page!{% endcallout %}

### Accessing the Original Paginated Content

Say you want to output something from the paginated data instead of bland `Page 1, Page 2, etc.` links. For that we need to access the original data!

#### When Paginating Arrays

{% codetitle "YAML", "Syntax" %}
{%- set codeBlock %}{% raw %}
testdata:
  - item1
  - item2
  - item3
  - item4
  - item5
  - item6
{% endraw %}{%- endset %}
{{ codeBlock | highlight("yaml") | safe }}

{% include "snippets/pagination/original.njk" %}

- When `size` is set to 2, `pagination.pages` will look like: `[['item1', 'item2'], ['item3', 'item4'], ['item5', 'item6']]`
  - Use `pageEntry[0]` and `pageEntry[1]` to access the original content.
- When `size` is set to 1, `pagination.pages` will be the same as the original data: `['item1', 'item2', 'item3', 'item4', 'item5', 'item6']`
  - Use `pageEntry` to access the original content.

#### When Paginating Object Literals

{% codetitle "YAML", "Syntax" %}
{%- set codeBlock %}{% raw %}
testdata:
  key1: item1
  key2: item2
  key3: item3
  key4: item4
  key5: item5
  key6: item6
{% endraw %}{%- endset %}
{{ codeBlock | highlight("yaml") | safe }}

{% include "snippets/pagination/object-lit.njk" %}

- When `size` is set to 2, `pagination.pages` will look like: `[['key1', 'key2'], ['key3', 'key4'], ['key5', 'key6']]`
  - Use `testdata[ pageKey[0] ]` and `testdata[ pageKey[1] ]` to access the original content.
- When `size` is set to 1, `pagination.pages` will be the keys of the object: `['key1', 'key2', 'key3', 'key4', 'key5', 'key6']`
  - Use `testdata[ pageKey ]` to access the original content.

### Visually Style the Current Page Link

You’ll probably also want to add some kind of visual styling to indicate that the user is on the current page. For this let’s use a light `background-color`.

{% codetitle "CSS", "Syntax" %}
{%- set codeBlock %}{% raw %}
[aria-current] {
	background-color: #eee;
}
{% endraw %}{%- endset %}
{{ codeBlock | highlight("css") | safe }}

{% callout "info" %}<strong id="annoy-zach">A Tip to avoid something that annoys Zach™</strong>: If you use something like <code>font-weight</code> here make sure the change in text size for the current page doesn’t make your navigation shift around between pages! This is especially important if your navigation links are displayed side-by-side on the same line.{% endcallout %}

## Add Previous and Next Links

Note that if the current page (`page.url`) is the first or last in the set, we won’t output links.

<is-land on:visible import="/js/seven-minute-tabs.js">
<seven-minute-tabs autoheight>
  {% renderFile "./src/_includes/syntax-chooser-tablist.11ty.js", {id: "paged-nav-nextprev", valid: "njk,js"} %}
  <div id="paged-nav-nextprev-liquid" role="tabpanel">
    {%- codetitle "nextprev.liquid" %}
    {%- highlight "liquid" %}
    {%- include "examples/pagination/nav/nextprev.liquid" %}
    {%- endhighlight %}
  </div>
  <div id="paged-nav-nextprev-njk" role="tabpanel">
    {%- codetitle "nextprev.njk" %}
{%- set codeBlock %}
{%- include "snippets/pagination/nav/nextprev.njk" %}
{%- endset %}
{{ codeBlock | highlight("jinja2") | safe }}
  </div>
  <div id="paged-nav-nextprev-js" role="tabpanel">
    {%- codetitle "nextprev.11ty.js" %}
{%- set codeBlock %}
{%- include "snippets/pagination/nav/nextprev.js" %}
{%- endset %}
{{ codeBlock | highlight("js") | safe }}
  </div>
	<div id="paged-nav-nextprev-cjs" role="tabpanel">
    {%- codetitle "nextprev.11ty.cjs" %}
{%- set codeBlock %}
{%- include "snippets/pagination/nav/nextprev.cjs" %}
{%- endset %}
{{ codeBlock | highlight("js") | safe }}
  </div>
</seven-minute-tabs>
</is-land>

- `pagination.href.previous` and `pagination.href.next` are added in `0.10.0`. Use `pagination.previousPageHref` or `pagination.nextPageHref` in previous versions.

## Add First and Last Links

For clarity here, we’re omitting the previous and next links from the previous section. Note the code below to show the links only if `pagination.href.first` and `pagination.href.last` don’t match the current `page.url`.

<is-land on:visible import="/js/seven-minute-tabs.js">
<seven-minute-tabs autoheight>
  {% renderFile "./src/_includes/syntax-chooser-tablist.11ty.js", {id: "paged-nav-firstlast", valid: "njk,js"} %}
  <div id="paged-nav-firstlast-liquid" role="tabpanel">
    {%- codetitle "firstlast.liquid" %}
    {%- highlight "liquid" %}
    {%- include "examples/pagination/nav/firstlast.liquid" %}
    {%- endhighlight %}
  </div>
  <div id="paged-nav-firstlast-njk" role="tabpanel">
    {%- codetitle "firstlast.njk" %}
{%- set codeBlock %}
{%- include "snippets/pagination/nav/firstlast.njk" %}
{%- endset %}
{{ codeBlock | highlight("jinja2") | safe }}
  </div>
  <div id="paged-nav-firstlast-js" role="tabpanel">
    {%- codetitle "firstlast.11ty.js" %}
{%- set codeBlock %}
{%- include "snippets/pagination/nav/firstlast.js" %}
{%- endset %}
{{ codeBlock | highlight("js") | safe }}
  </div>
	<div id="paged-nav-firstlast-cjs" role="tabpanel">
    {%- codetitle "firstlast.11ty.cjs" %}
{%- set codeBlock %}
{%- include "snippets/pagination/nav/firstlast.cjs" %}
{%- endset %}
{{ codeBlock | highlight("js") | safe }}
  </div>
</seven-minute-tabs>
</is-land>

## Put It All Together

Here’s the final pagination navigation template code, pieced together:

<is-land on:visible import="/js/seven-minute-tabs.js">
<seven-minute-tabs persist sync autoheight>
  {% renderFile "./src/_includes/syntax-chooser-tablist.11ty.js", {id: "paged-nav-combined", valid: "njk,js"} %}
  <div id="paged-nav-combined-liquid" role="tabpanel">
    {%- codetitle "combined.liquid" %}
    {%- highlight "liquid" %}
    {%- include "examples/pagination/nav/combined.liquid" %}
    {%- endhighlight %}
  </div>
  <div id="paged-nav-combined-njk" role="tabpanel">
    {%- codetitle "combined.njk" %}
{%- set codeBlock %}
{%- include "snippets/pagination/nav/combined.njk" %}
{%- endset %}
{{ codeBlock | highlight("jinja2") | safe }}
  </div>
  <div id="paged-nav-combined-js" role="tabpanel">
    {%- codetitle "combined.11ty.js" %}
{%- set codeBlock %}
{%- include "snippets/pagination/nav/combined.js" %}
{%- endset %}
{{ codeBlock | highlight("js") | safe }}
  </div>
	<div id="paged-nav-combined-cjs" role="tabpanel">
    {%- codetitle "combined.11ty.cjs" %}
{%- set codeBlock %}
{%- include "snippets/pagination/nav/combined.cjs" %}
{%- endset %}
{{ codeBlock | highlight("js") | safe }}
  </div>
</seven-minute-tabs>
</is-land>

Alright, you’ve copied the above—but don’t leave yet—_your work is not done (sorry)!_ You still need to:

- Change `my-pagination` to a better `id` attribute for your use case and update it in `aria-labelledby` too.
- Update the `This is my Pagination` text to make more sense for your use case.
- Think about maybe changing the `<h2>` to better suit your document structure.
- Add some [CSS to highlight the current page in the navigation, visually](#visually-style-the-current-page-link).

{% callout "info" %}<strong>HTML tip</strong>: You might be tempted to use <code>role="navigation"</code> here, but it’s superfluous when using <code>&lt;nav&gt;</code>.{% endcallout %}

{% callout "info" %}<strong>Accessibility tip</strong>: if you style this list with <code>list-style-type: none</code>, read <a href="https://unfetteredthoughts.net/2017/09/26/voiceover-and-list-style-type-none/">this article about VoiceOver</a>{% endcallout %}

All of the above will output the following HTML for our example (on the first page of the set):

{% callout "demo" %}

{% codetitle "HTML", "Syntax" %}

```html
<nav aria-labelledby="my-pagination">
	<h2 id="my-pagination">This is my Pagination</h2>
	<ol>
		<li>First</li>
		<li>Previous</li>
		<li><a href="/test-array/" aria-current="page">Page 1</a></li>
		<li><a href="/test-array/1/">Page 2</a></li>
		<li><a href="/test-array/2/">Page 3</a></li>
		<li><a href="/test-array/1/">Next</a></li>
		<li><a href="/test-array/2/">Last</a></li>
	</ol>
</nav>
```

{% endcallout %}
