---
eleventyNavigation:
  parent: Configure Templates with Data
  key: Content Dates
  order: 3
  excerpt: Assigning dates to content, using dates in front matter.
---

# Content Dates

{% tableofcontents %}

## Setting a Content Date in Front Matter

Add a `date` key to your front matter to override the default date (file creation) and customize how the file is sorted in a collection.

{% codetitle "YAML Front Matter", "Syntax" %}
{%- set codeBlock %}{% raw %}
---
date: 2016-01-01
---
{% endraw %}{%- endset %}
{{ codeBlock | highlight("markdown") | safe }}

{% codetitle "YAML Front Matter", "Syntax" %}
{%- set codeBlock %}{% raw %}
---
date: Last Modified
---
{% endraw %}{%- endset %}
{{ codeBlock | highlight("markdown") | safe }}

Valid `date` values:

- `"Last Modified"`: automatically resolves to the file’s last modified date
- `"Created"`: automatically resolves to the file’s created date (default, this is what is used when `date` is omitted).
- `"git Last Modified"`: {% addedin "1.0.1" %} automatically resolves to the file’s latest git commit. If a file is not yet checked in to git, it assigns `Date.now()` to `page.date` instead.
  - This one is a bit resource intensive, so you may want to limit this to your CI server environment only using JavaScript data files and [Environment Variables](/docs/environment-vars/). Check out [this real-world directory data file](https://github.com/11ty/docs/blob/5403f2b853e09165bec8bc6f7466a6a041487bcc/src/docs/docs.11tydata.js#L5-L7).
- `"git Created"`: {% addedin "2.0.0-canary.13" %} automatically resolves to the file’s first git commit. It uses git's `--follow` flag to make a "best effort" renaming tracking. If a file is not yet checked in to git, it assigns `Date.now()` to `page.date` instead.
  - This one is a bit resource intensive, so you may want to limit this to your CI server environment only using JavaScript data files and [Environment Variables](/docs/environment-vars/). Check out [this real-world directory data file](https://github.com/11ty/docs/blob/5403f2b853e09165bec8bc6f7466a6a041487bcc/src/docs/docs.11tydata.js#L5-L7).
- `2016-01-01` or any other valid [YAML date value](https://yaml.org/type/timestamp.html) (leaving off the time assumes midnight in UTC, or `00:00:00Z`)
- `"2016-01-01"` or any other valid ISO 8601 **string** that [Luxon’s `DateTime.fromISO`](https://moment.github.io/luxon/#/parsing?id=iso-8601) can parse (see also the [Luxon API docs](https://moment.github.io/luxon/api-docs/index.html#datetimefromiso)).

If a `date` key is omitted from the file, we then look for a `YYYY-MM-DD` format anywhere in the file path (even folders). If there are multiple dates found, the first is used. ℹ️ [Note that starting in 1.0 for consistency with front matter formats file name date formats are now assumed to be UTC.](https://github.com/11ty/eleventy/pull/1752)

As a last resort, the file creation date is used. [Careful when relying on file creation dates on a deployment server](#collections-out-of-order-when-you-run-eleventy-on-your-server).

{% callout "info" %}<strong>Trying to use <code>date</code> in your templates?</strong> The <code>date</code> value contains the raw Data Cascade value (not a resolved Date object). You probably want <code>page.date</code> instead. Check out <a href="/docs/data-eleventy-supplied/#page-variable-contents">the values available in the <code>page</code> variable</a>.{% endcallout %}

## Configuration API for Custom Date Parsing

Eleventy v3.0 <!-- v3.0.0-alpha.15 --> includes an `$config.addDateParsing` method for adding your own custom date parsing logic. This is a preprocessing step for existing Date logic. Any number of callbacks can be assigned using `$config.addDateParsing` and we’ll run them serially. Related [GitHub #867](https://github.com/11ty/eleventy/issues/867).

In the callback, you can return:

1. a [Luxon](https://moment.github.io/luxon/) DateTime instance to short-circuit `page.date` with this new value (we do the `.toJSDate()` conversion for you).
1. a JavaScript Date to short-circuit `page.date` with this new value.
1. any new valid value will be processed using existing Date parsing rules. As an example, you can return a new string that will be processed by [Luxon](https://moment.github.io/luxon/) (as already happens).
1. anything falsy (or no return) will ignore the callback.

### Custom Date Parsing Example

Here’s an example using IANA time zone codes:

{%- set codeBlock %}{% raw %}
---
date: 2019-08-31 23:59:56 America/New_York
---
{% endraw %}{%- endset %}
{{ codeBlock | highlight("yaml") | safe }}

{% set codeContent %}
import { DateTime } from "luxon";

export default function($config) {
	$config.addDateParsing(function(dateValue) {
		if (typeof dateValue === "string") {
			return DateTime.fromFormat(dateValue, "yyyy-MM-dd hh:mm:ss z");
		}
	});
};
{% endset %}
{% include "snippets/configDefinition.njk" %}

### Change a Project’s Default Time Zone

Relevant [GitHub Issue #3668](https://github.com/11ty/eleventy/issues/3668). Examples of [valid time zones](https://moment.github.io/luxon/#/zones?id=specifying-a-zone) are available on the Luxon documentation.

{% set codeContent %}
import { DateTime } from "luxon";

// See https://moment.github.io/luxon/#/zones?id=specifying-a-zone
const TIME_ZONE = "America/Chicago";

export default function($config) {
	$config.addDateParsing(function(dateValue) {
		let localDate;
		if(dateValue instanceof Date) { // and YAML
			localDate = DateTime.fromJSDate(dateValue, { zone: "utc" }).setZone(TIME_ZONE, { keepLocalTime: true });
		} else if(typeof dateValue === "string") {
			localDate = DateTime.fromISO(dateValue, { zone: TIME_ZONE });
		}
		if (localDate?.isValid === false) {
			throw new Error(`Invalid \`date\` value (${dateValue}) is invalid for ${this.page.inputPath}: ${localDate.invalidReason}`);
		}
		return localDate;
	});
};

{% endset %}
{% include "snippets/configDefinition.njk" %}

## Dates off by one day?

{% callout "pitfall" %}This is a <a href="/docs/pitfalls/"><strong>Common Pitfall</strong></a>.{% endcallout %}

You’re probably displaying UTC dates in a local time zone.

Many date formats in Eleventy (when set in your content‘s filename as `YYYY-MM-DD-myfile.md` or in your front matter as `date: YYYY-MM-DD`) assume midnight in UTC. When displaying your dates, make sure you’re using the UTC time and not your own local time zone, which may be the default.

### Example

{% codetitle "YAML Front Matter", "Syntax" %}

{%- set codeBlock %}{% raw %}
---
date: 2018-01-01
---
{% endraw %}{%- endset %}
{{ codeBlock | highlight("markdown") | safe }}

If you output the Date object in a template, it will convert it to a string for display:

{% codetitle "Liquid, Nunjucks", "Syntax" %}

```
Using {% raw %}{{ page.date }}{% endraw %} will display a date using a local time zone like:

Sun Dec 31 2017 18:00:00 GMT-0600 (Central Standard Time)
```

Note that this appears to be the wrong day!

Nunjucks allows you to call JavaScript methods in output `{% raw %}{{ page.date.toString() }}{% endraw %}`.

{% codetitle "Nunjucks", "Syntax" %}

```
But {% raw %}{{ page.date.toUTCString() }}{% endraw %} will correctly
display a date with a UTC time zone like:

Mon, 01 Jan 2018 00:00:00 GMT
```

On Liquid, you can't do this, though you can create your own `toUTCString` [filter in Liquid](/docs/filters/) to perform the same task, or pass a timezone parameter to your filter to point to the one you desire in your template.

The valid strings accepted are the [TZ identifiers](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones).

```
Given the date above this {% raw %}{{ page.date | date: '%b %d, %Y', 'UCT' }}{% endraw %} would render in UTC as:

Jan 01, 2018
```

### Also on YouTube

<div class="youtube-related">
  {%- youtubeEmbed "VddJxNKKlE8", "11ty Second 11ty: Setting a date string in eleventyComputed to fix 11ty's Off by 1" -%}
</div>

## Collections out of order when you run Eleventy on your Server?

{% callout "pitfall", "md" -%}
This is a [**Common Pitfall**](/docs/pitfalls/).
{%- endcallout %}

Be careful relying on the default `date` associated with a piece of content. By default Eleventy uses file creation dates, which works fine if you run Eleventy locally but may reset in some conditions if you run Eleventy on a Continuous Integration server. Work around this by using explicit date assignments, either in your front matter or your content’s file name. Read more at [_Setting a Content Date in Front Matter_](#setting-a-content-date-in-front-matter).

{% callout "info", "md" -%}
{% addedin "1.0.1" %} The new `date: "git Last Modified"` feature will resolve this issue! Source control dates are available and will be consistent on most Continuous Integration servers. Read more at [_Setting a Content Date in Front Matter_](#setting-a-content-date-in-front-matter).
{%- endcallout %}

## From the Community

{% include "11tybundle.njk" %}
