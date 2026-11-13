---
eleventyNavigation:
  parent: Using Data
  key: Validate Data
  order: 6
---
# Validate Data {% addedin "v3.0.0-alpha.7" %}

Use the special `eleventyDataSchema` data property to validate data in your Data Cascade. You can set this anywhere in your Data Cascade (front matter, directory data file, global data, etc).

You can use any schema or validation library to achieve this. In this example, we’re using [`zod`](https://zod.dev/).

## Example: Checking that `draft` is boolean

In the following example, each content template with an `eleventyDataSchema` callback (in this example, any templates in the `blog` folder) is checked to make sure the value of any `draft` assignments must be `boolean` or `undefined`. If not, we throw an error.

<div class="codetitle">blog/blog.11tydata.js</div>

{%- set codeBlock %}{% raw %}
import { z } from "zod";

export default {
	eleventyDataSchema: function(data) {
		let result = z.object({
			draft: z.optional(z.boolean())
		}).safeParse(data);

		if(result.error) {
			throw new Error(z.prettifyError(result.error));
		}
	}
};
{% endraw %}{%- endset %}
{{ codeBlock | highlight("js") | safe }}