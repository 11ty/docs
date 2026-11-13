---
eleventyNavigation:
  parent: Using Data
  key: Data Cascade
  order: 3
communityLinksKey: "data-cascade"
overrideCommunityLinks: true
---

# Data Cascade

In Eleventy, data is merged from multiple different sources before the template is rendered. The data is merged in what Eleventy calls the Data Cascade.

## Sources of Data

{% include "datasources.md" %}

## Example

{% codetitle "my-template.md" %}

<!-- prettier-ignore-start -->
{%- set codeBlock %}{% raw %}
---
title: This is a Good Blog Post
tags:
  - CSS
  - HTML
layout: my-layout.njk
---
{% endraw %}{%- endset %}

<!-- prettier-ignore-end -->
{{ codeBlock | highlight("yaml") | safe }}

{% codetitle "_includes/my-layout.njk" %}

<!-- prettier-ignore-start -->
{%- set codeBlock %}{% raw %}
---
title: This is a Very Good Blog Post
author: Zach
tags:
  - JavaScript
---
{% endraw %}{%- endset %}

<!-- prettier-ignore-end -->
{{ codeBlock | highlight("yaml") | safe }}

Note that when `my-template.md` and `my-layout.njk` share data with the same object key (`title` and `tags`), the “leaf template” `my-template.md` takes precedence.

The data cascade results in the following data when `my-template.md` is rendered:

{% codetitle "JavaScript", "Syntax" %}

<!-- prettier-ignore-start -->
{%- set codeBlock %}{% raw %}
{
	"title": "This is a Good Blog Post",
	"author": "Zach",
	"tags": ["CSS", "HTML", "JavaScript"],
	"layout": "my-layout.njk"
}
{% endraw %}{%- endset %}

<!-- prettier-ignore-end -->
{{ codeBlock | highlight("json") | safe }}

Eleventy does a deep merge to combine Object literals and Arrays. (_Wait, where did the option to [opt-out of deep-merging](/docs/data-deep-merge/) go?)_ You can override this on a per-property basis with the `override:` prefix.

## Using the `override:` prefix

Use the `override:` prefix on any data key to opt-out of deep-merge behavior for specific values or nested values.

{% codetitle "posts/posts.json" %}

```json
{
	"tags": ["posts"]
}
```

{% codetitle "posts/firstpost.md" %}

```markdown
---
# Instead of merging the array, this creates an empty set
override:tags: []
---
```

Even though normally the `posts/firstpost.md` file would inherit the `posts` tag from the directory data file (per normal [data cascade rules](/docs/data/)), we can override the `tags` value to be an empty array to opt-out of Array merge behavior.

## From the Community

{% include "community-contributed.njk" %}

{% include "11tybundle.njk" %}
