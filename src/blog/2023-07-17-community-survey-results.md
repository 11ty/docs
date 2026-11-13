---
newstitle: "The Eleventy Community Survey Results (2023)"
eleventyNavigation:
  parent: Blog
---
{% callout "info", "md", "New Survey Alert" %}Please help Eleventy out again by completing [~~Survey Awesome (2024)~~](/blog/survey-awesome/)!{% endcallout %}

_Prerequisite read: [The Next Phase of Eleventy: Return of the Side Project](https://www.zachleat.com/web/eleventy-side-project/)._

As part of this next phase of Eleventy and to best inform our decisions moving forward we asked folks to answer a few short questions as part of our [Eleventy Community Survey](https://forms.gle/zFA4Jno1cfT8nt9J8).

First of all—thank you to everyone that participated. The response to this call has been overwhelming! We received 489 responses to the survey and we’re happy to share a few aggregate results from some of the more interesting questions here:

## What services do you use to host projects?

<is-land on:visible>
<div id="result-host" class="result-chart" aria-hidden="true"></div>
<template data-island>
<link rel="stylesheet" href="/static/artificial-chart.css">
<script type="module">
import "https://d3js.org/d3.v7.min.js";
import { HorizontalBar } from "/static/artificial-chart.js";
new HorizontalBar("result-host", "result-host-table", {
	showLegend: false,
	showInlineBarValues: "outside",
	valueType: ["float"],
	margin: {
		left: 170
	}
});
</script>
</template>
</is-land>

_489 of 489 participants answered this question._

<details>
<summary>Expand to show table of results</summary>
<table id="result-host-table">
<thead>
	<tr>
		<th>Host</th>
		<th>Number of Responses</th>
	</tr>
</thead>
<tbody>
	<tr>
		<td>Netlify</td>
		<td>336</td>
	</tr>
	<tr>
		<td>GitHub</td>
		<td>201</td>
	</tr>
	<tr>
		<td>Cloudflare</td>
		<td>85</td>
	</tr>
	<tr>
		<td>Vercel</td>
		<td>37</td>
	</tr>
		<tr>
		<td>Digital Ocean</td>
		<td>32</td>
	</tr>
	<tr>
		<td>GitLab</td>
		<td>31</td>
	</tr>
	<tr>
		<td>Azure</td>
		<td>11</td>
	</tr>
	<tr>
		<td>AWS</td>
		<td>8</td>
	</tr>
	<tr>
		<td>Glitch</td>
		<td>6</td>
	</tr>
	<tr>
		<td>Render</td>
		<td>5</td>
	</tr>
	<tr>
		<td>Fastly</td>
		<td>4</td>
	</tr>
</tbody>
</table>
<p>The remaining entries had fewer than three aggregate responses.</p>
</details>

## What types of paid hosting do you currently use for your projects?

<is-land on:visible>
<div id="result-paid" class="result-chart" aria-hidden="true"></div>
<template data-island>
<link rel="stylesheet" href="/static/artificial-chart.css">
<script type="module">
import "https://d3js.org/d3.v7.min.js";
import { HorizontalBar } from "/static/artificial-chart.js";
new HorizontalBar("result-paid", "result-paid-table", {
	showLegend: false,
	showInlineBarValues: "outside",
	valueType: ["float"],
	margin: {
		left: 170
	}
});
</script>
</template>
</is-land>

_489 of 489 participants answered this question._

<details>
<summary>Expand to show table of results</summary>
<table id="result-paid-table">
<thead>
	<tr>
		<th>Hosting Type</th>
		<th>Number of Responses</th>
	</tr>
</thead>
<tbody>
	<tr>
		<td>Free Tier</td>
		<td>395</td>
	</tr>
	<tr>
		<td>Paid/Pro/Business Tier</td>
		<td>189</td>
	</tr>
	<tr>
		<td>Enterprise Tier</td>
		<td>23</td>
	</tr>
</tbody>
</table>
</details>

## Which official template syntaxes do you use in your projects?

<is-land on:visible>
<div id="result-syntax" class="result-chart" aria-hidden="true"></div>
<template data-island>
<link rel="stylesheet" href="/static/artificial-chart.css">
<script type="module">
import "https://d3js.org/d3.v7.min.js";
import { HorizontalBar } from "/static/artificial-chart.js";
new HorizontalBar("result-syntax", "result-syntax-table", {
	showLegend: false,
	showInlineBarValues: "outside",
	valueType: ["float"],
	margin: {
		left: 170
	}
});
</script>
</template>
</is-land>

_489 of 489 participants answered this question._

<details>
<summary>Expand to show table of results</summary>
<table id="result-syntax-table">
<thead>
	<tr>
		<th>Template Syntax</th>
		<th>Number of Responses</th>
	</tr>
</thead>
<tbody>
	<tr>
		<td>Nunjucks</td>
		<td>407</td>
	</tr>
	<tr>
		<td>Markdown</td>
		<td>381</td>
	</tr>
	<tr>
		<td>HTML</td>
		<td>306</td>
	</tr>
	<tr>
		<td>JavaScript (.11ty.js)</td>
		<td>204</td>
	</tr>
	<tr>
		<td>Liquid</td>
		<td>148</td>
	</tr>
	<tr>
		<td>WebC</td>
		<td>114</td>
	</tr>
	<tr>
		<td>Handlebars</td>
		<td>24</td>
	</tr>
	<tr>
		<td>Vue</td>
		<td>19</td>
	</tr>
	<tr>
		<td>Pug</td>
		<td>12</td>
	</tr>
	<tr>
		<td>Mustache</td>
		<td>9</td>
	</tr>
	<tr>
		<td>EJS</td>
		<td>9</td>
	</tr>
	<tr>
		<td>Haml</td>
		<td>1</td>
	</tr>
</tbody>
</table>
</details>

## Which official plugins do you use in your projects?

<is-land on:visible>
<div id="result-plugins" class="result-chart" aria-hidden="true"></div>
<template data-island>
<link rel="stylesheet" href="/static/artificial-chart.css">
<script type="module">
import "https://d3js.org/d3.v7.min.js";
import { HorizontalBar } from "/static/artificial-chart.js";
new HorizontalBar("result-plugins", "result-plugins-table", {
	showLegend: false,
	showInlineBarValues: "outside",
	valueType: ["float"],
	margin: {
		left: 170
	}
});
</script>
</template>
</is-land>

_455 of 489 participants answered this question._

<details>
<summary>Expand to show table of results</summary>
<table id="result-plugins-table">
<thead>
	<tr>
		<th>Plugin</th>
		<th>Number of Responses</th>
	</tr>
</thead>
<tbody>
	<tr>
		<td>RSS</td>
		<td>281</td>
	</tr>
	<tr>
		<td>Image</td>
		<td>280</td>
	</tr>
	<tr>
		<td>Syntax Highlighter</td>
		<td>223</td>
	</tr>
	<tr>
		<td>Navigation</td>
		<td>181</td>
	</tr>
	<tr>
		<td>Fetch</td>
		<td>160</td>
	</tr>
	<tr>
		<td>HTML &lt;base&gt;</td>
		<td>91</td>
	</tr>
	<tr>
		<td>Render</td>
		<td>80</td>
	</tr>
	<tr>
		<td><abbr title="Internationalization">i18n</abbr></td>
		<td>68</td>
	</tr>
	<tr>
		<td>&lt;is-land&gt;</td>
		<td>53</td>
	</tr>
	<tr>
		<td>Vite</td>
		<td>52</td>
	</tr>
	<tr>
		<td>Serverless</td>
		<td>47</td>
	</tr>
	<tr>
		<td>Edge</td>
		<td>28</td>
	</tr>
</tbody>
</table>
</details>

<style>
.result-chart {
	height: 450px;
}
.result-chart .artfc-color-0 {
	fill: #00bbd5;
}
</style>
