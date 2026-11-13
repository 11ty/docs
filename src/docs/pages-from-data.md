---
eleventyNavigation:
  parent: Configure Templates with Data
  key: Create Pages From Data
  order: 3
  excerpt: Iterate over a data set and create multiple output files.
---
# Create Pages From Data

The [Pagination feature](/docs/pagination/) is used for iterating over any data to create multiple output files.

Pagination can be used for traditional style pagination outputs like `/result/page-0/`, `/result/page-1/`. Pagination can also iterate over an object too and output any `permalink` value!

## An Example

Let's look at an example where we dynamically build pages based on data from a json file. First let's consider this simple data file stored in `_data/possums.json`:

{%- set codeBlock %}{% raw %}
[
	{
		name: "Fluffy",
		age: 2,
	},
	{
		name: "Snugglepants",
		age: 5,
	},
	{
		name: "Lord Featherbottom",
		age: 4,
	},
	{
		name: "Pennywise",
		age: 9,
	},
];
{% endraw %}{%- endset %}
{{ codeBlock | highlight("js") | safe }}

In order to create one page per possum, we can use the following template. The file name isn’t important, but the file extension is (e.g. `possum-pages.liquid` or `possum-pages.njk`).

{%- set codeBlock %}{% raw %}
---
pagination:
  data: possums
  size: 1
  alias: possum
permalink: "possums/{{ possum.name | slugify }}/"
---

{{ possum.name }} is {{ possum.age }} years old
{% endraw %}{%- endset %}
{{ codeBlock | highlight("markdown") | safe }}

This template will generate four files, one for each possum, where the filename is based on the possum's name passed through the [`slugify`](/docs/filters/slugify/) function. For example, fluffy's page will be at `/possums/fluffy`. As possums are added and edited the resultant possum details page will be updated automatically.

{% callout "info" %}Note that <code>page</code> is a reserved word so you cannot use <code>alias: page</code>. Read about Eleventy’s reserved data names in <a href="/docs/data-eleventy-supplied/">Eleventy Supplied Data</a>.{% endcallout %}

## Related

- [Pagination: Paging an Object](/docs/pagination/#paging-an-object)
- [Pagination: Remapping with Permalinks](/docs/pagination/#remapping-with-permalinks)