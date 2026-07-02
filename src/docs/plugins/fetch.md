---
eleventyNavigation:
  key: Fetch
  title: '<i class="fa-solid fa-bone"></i>Fetch'
  pinned: true
  order: 2
  excerpt: A utility to fetch and cache network requests.
---

# Fetch

{% tableofcontents %}

_This documentation is written for Eleventy Fetch v5.0+, requiring **Node 18** or newer._

- [`11ty/eleventy-fetch`](https://github.com/11ty/eleventy-fetch) on GitHub

Fetch network resources and cache them locally to avoid bombarding your API (or other remote or rate-limited resources). Do this at configurable intervals (not with every build): once per minute, once per hour, once per day, or however often you like!

Successful API requests allow working offline too!

This plugin can save _any_ kind of asset—JSON, HTML, images, videos, etc.

- Fetch a remote URL and saves it to a local cache.
- If the remote server goes down or linkrots away—we keep and continue to use the local asset. _Save remote images!_
- If a network connection fails (or if you’re offline), Fetch will continue to use the cached request (even if the cache is expired) and make a new request when the network connectivity is restored.
- Concurrency limits to avoid making too many network requests simultaneously.
- Uses built-in `fetch`  {% addedin "Fetch 5.0" %} (previously [`node-fetch`](https://www.npmjs.com/package/node-fetch))
- Supports and caches HTTP verbs separately (think `POST` versus `GET`) {% addedin "Fetch 5.0" %}

## Installation

- [`@11ty/eleventy-fetch` on npm](https://www.npmjs.com/package/@11ty/eleventy-fetch)

{%- set codeBlock %}{% raw %}
npm install @11ty/eleventy-fetch
{% endraw %}{%- endset %}
{{ codeBlock | highlight("bash") | safe }}

This plugin was formerly known as [`@11ty/eleventy-cache-assets`](https://www.npmjs.com/package/@11ty/eleventy-cache-assets) and was renamed to `@11ty/eleventy-fetch` with v3: [Video Changelog](https://www.youtube.com/watch?v=JCQQgtOcjH4&t=246s).


{% callout "warn" %}<strong>Important Security and Privacy Notice</strong>

<p>
  This plugin caches complete network responses. Unless you’re willing to perform a full review of everything this plugin caches to disk for privacy and security exposure, it is <em>strongly</em> recommended that you add the <code>.cache</code> folder to your <code>.gitignore</code> file so that network responses aren’t checked in to your git repository.
</p>
<p>
  Are you 100% sure that private e-mail addresses aren’t being returned from a cached API? I’m guessing no—add <code>.cache</code> to your <code>.gitignore</code> file. Right now. Do it.
</p>
{% endcallout %}

## Usage

### Cache a JSON file from an API

Consider the following example, perhaps in an Eleventy [Global Data File](/docs/data-global/) like `_data/githubRepos.js`.

{% set codeContent %}
import Fetch from "@11ty/eleventy-fetch";

export default async function () {
	let url = "https://api.github.com/repos/11ty/buildawesome";

	let json = await Fetch(url, {
		duration: "1d", // save for 1 day
		type: "json", // we’ll parse JSON for you
	});

	return json;
};
{% endset %}
{% include "snippets/esmCjsTabs.njk" %}

The first argument to Eleventy Fetch can be:

- a string (pointing to a URL)
- a [`URL` instance](https://developer.mozilla.org/en-US/docs/Web/API/URL) {% addedin "Fetch 5.0" %}
- a custom `function` (`async`-friendly) {% addedin "Fetch 5.0" %}

### Options

#### Verbose Output

Option to log requested remote URLs to the console.

- `verbose: true` (default: `false`) {% addedin "Fetch 3.0" %}

#### Change the Cache Duration

After this amount of time has passed, we’ll make a new network request to the URL to fetch fresh data. The default duration is `1d` (1 day).

The `duration` option supports the following shorthand values:

- `s` is seconds (e.g. `duration: "43s"`)
- `m` is minutes (e.g. `duration: "2m"`)
- `h` is hours (e.g. `duration: "99h"`)
- `d` is days (The default is `duration: "1d"`)
- `w` is weeks, or shorthand for 7 days (e.g. `duration: 2w` is 14 days)
- `y` is years, or shorthand for 365 days (not _exactly_ one year) (e.g. `duration: 2y` is 730 days)

Special values:

- `duration: "*"` will _never_ fetch new data (after the first success).
- `duration: "0s"` will _always_ fetch new data (works with any unit, e.g. `"0m"`, `"0h"`).

#### Type

- `type: "buffer"` (default)
- `type: "json"`
- `type: "text"`
- `type: "xml"` (alias for `text`) {% addedin "Fetch 5.0" %}
- `type: "parsed-xml"` (uses [`parse-xml`](https://github.com/rgrove/parse-xml) to return a JavaScript representation of the XML) {% addedin "Fetch 5.0" %}

#### Return Type {% addedin "Fetch 5.0" %}

- `returnType: undefined` (default) returns the processed body of the request specific to the `type`
- `returnType: "response"` returns a cached object with `url`, `status`, `headers`, and `body` properties.

## What happens when a request fails?

1. If this is the first ever request to this URL (no entry exists in your cache folder), it will fail. Use a `try`/`catch` if you’d like to handle this gracefully.
2. If a failure happens and a cache entry already exists (_even if it’s expired_), it will use the cached entry.
3. If you prefer the build to _fail_ when your API requests fail, leave out the `try` `catch` and let the error throw without handling it!

Consider the following [global data file](/docs/data-global/) in Eleventy (e.g. `_data/github.js`):

{% set codeContent %}
import Fetch from "@11ty/eleventy-fetch";

export default async function () {
	try {
		let url = "https://api.github.com/repos/11ty/buildawesome";

		/* This returns a promise */
		return Fetch(url, {
			duration: "1d",
			type: "json",
		});
	} catch (e) {
		return {
			// my failure fallback data
		};
	}
};
{% endset %}
{% include "snippets/esmCjsTabs.njk" %}

## Running this on your Build Server

This [documentation has moved to the Deployment page](/docs/deployment/#persisting-cache).

## More Examples

### Cache a Remote Image

This is what [`eleventy-img`](/docs/plugins/image/) uses internally.

{% set codeContent %}
import Fetch from "@11ty/eleventy-fetch";

let url = "https://www.zachleat.com/img/avatar-2017-big.png";
let imageBuffer = await Fetch(url, {
	duration: "1d",
	type: "buffer",
});
// Use imageBuffer as an input to the `sharp` plugin, for example

// (Example truncated)
{% endset %}
{% include "snippets/esmCjsTabs.njk" %}

### Fetch Google Fonts CSS

Also a good example of using `fetchOptions` to pass in a custom user agent. Full option list is available on the [`fetch` documentation on MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window/fetch#options).

{% set codeContent %}
import Fetch from "@11ty/eleventy-fetch";

let url = "https://fonts.googleapis.com/css?family=Roboto+Mono:400&display=swap";
let fontCss = await Fetch(url, {
	duration: "1d",
	type: "text",
	fetchOptions: {
		headers: {
			// lol
			"user-agent":
				"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.169 Safari/537.36",
		},
	},
});
{% endset %}
{% include "snippets/esmCjsTabs.njk" %}

### Fetching GitHub Stars for a repo

- This specific example has been previously described in our quick tips section: head over to read [Quick Tip #009—Cache Data Requests](/docs/quicktips/cache-api-requests/).

## Advanced Usage

### Add a custom timeout

Use `AbortSignal` to supply a timeout for the request. Read more about [`AbortSignal` on MDN](https://developer.mozilla.org/en-US/docs/Web/API/AbortSignal#aborting_a_fetch_operation_with_a_timeout).

{% set codeContent %}
import Fetch from "@11ty/eleventy-fetch";

await Fetch("https://…", {
	fetchOptions: {
		signal: AbortSignal.timeout(5000)
	},
});
{% endset %}
{% include "snippets/esmCjsTabs.njk" %}

### Cache Directory

The `directory` option let’s you change where the cache is stored. It is **strongly recommended** that you add this folder to your `.gitignore` file.

{% callout "warn" %}Read the <a href="#installation">Important Security and Privacy Notice</a>.{% endcallout %}

{% set codeContent %}
import Fetch from "@11ty/eleventy-fetch";

await Fetch("https://…", {
	directory: ".cache",
});
{% endset %}
{% include "snippets/esmCjsTabs.njk" %}

If you want to use this utility inside of a Netlify Function (or AWS Lambda), use a writeable location (`/tmp/`) like <code>directory: "/tmp/.cache/"</code>. You can also use `dryRun: true` to skip writing to the file system.

### Remove URL query params from Cache Identifier

{% addedin "Fetch 2.0.3" %} If your fetched URL contains some query parameters that aren’t relevant to the identifier used in the cache, remove them using the `removeUrlQueryParams` option. This is useful if an API adds extra junk to your request URLs.

- `removeUrlQueryParams: true` (`false` is default)

{% set codeContent %}
import Fetch from "@11ty/eleventy-fetch";

await Fetch(
	"https://www.zachleat.com/img/avatar-2017-big.png?Get=rid&of=these",
	{
		removeUrlQueryParams: true,
	}
);
{% endset %}
{% include "snippets/esmCjsTabs.njk" %}

Note that query params are removed before—and **are relevant** to how—the cache key is calculated.

### Change the cache filename

This controls the name of the files inside your [cache directory](#cache-directory).

{% set codeContent %}
import Fetch from "@11ty/eleventy-fetch";

await Fetch("https://…", {
	filenameFormat: function(cacheKey, hash) {
		// do not include the file extension
		return `custom-name-${cacheKey}-${hash}`
	}
});
{% endset %}
{% include "snippets/esmCjsTabs.njk" %}

- [`11ty/eleventy-fetch#49`](https://github.com/11ty/eleventy-fetch/pull/49)

### Manually store your own data in the cache

{% addedin "Fetch 5.0" %} You can pass a function (async-friendly) in as your source to run your own logic and return any arbitrary data. You must supply a unique key for the request in the `requestId` property. Consider the following [Global Data File](/docs/data-global/):

{% set codeContent %}
import Fetch from "@11ty/eleventy-fetch";

export default function() {
	return Fetch(async function() {
		// do some expensive operation here, this is simplified for brevity
		let fakeTwitterApiContents = { followerCount: 1000 };

		return fakeTwitterApiContents;
	}, {
		// must supply a unique id for the callback
		requestId: "zachleat_twitter_followers"
	});
}
{% endset %}
{% include "snippets/esmCjsTabs.njk" %}

#### Even lower-level access to the cache

**You probably won’t need to do this.** It’s more straightforward to pass in a [function source](#manually-store-your-own-data-in-the-cache). Consider the following [Global Data File](/docs/data-global/):

{% set codeContent %}
import { AssetCache } from "@11ty/eleventy-fetch";

export default async function () {
	// Pass in your unique custom cache key
	// (normally this would be tied to your API URL)
	let asset = new AssetCache("zachleat_twitter_followers");

	// check if the cache is fresh within the last day
	if (asset.isCacheValid("1d")) {
		// return cached data.
		return asset.getCachedValue(); // a promise
	}

	// do some expensive operation here, this is simplified for brevity
	let fakeTwitterApiContents = { followerCount: 1000 };

	await asset.save(fakeTwitterApiContents, "json");

	return fakeTwitterApiContents;
};
{% endset %}
{% include "snippets/esmCjsTabs.njk" %}

### Change Global Concurrency

{%- set codeBlock %}{% raw %}
import Fetch from "@11ty/eleventy-fetch";
Fetch.concurrency = 4; // default is 10
{% endraw %}{%- endset %}
{{ codeBlock | highlight("js") | safe }}

### DEBUG mode

{%- set codeBlock %}{% raw %}
DEBUG=Eleventy:Fetch npx @11ty/eleventy
{% endraw %}{%- endset %}
{{ codeBlock | highlight("js") | safe }}
