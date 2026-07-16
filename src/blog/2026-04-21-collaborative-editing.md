---
newstitle: "Collaborative Editing as Progressive Enhancement"
eleventyNavigation:
  parent: Blog
blogHighlight: true
screenshotCacheBust: 1
---
**TL;DR** After a [whoopsie-daisy false-start on our initial Kickstarter campaign](https://blog.fontawesome.com/pausing-kickstarter/), we’re ramping up again to launch [Kickstarter Final_FINAL_v2 on **April 28, 2026**](https://www.kickstarter.com/projects/fontawesome/build-awesome-pro?ref=43ttgb).

<a href="{{ config.kickstarterUrl }}" class="announcement-btn elv-externalexempt"><i class="fa-brands fa-build-awesome"></i>We’re improving how developers collaborate on the Open Web. Get notified on April 28th!</a>

We’ve noticed a few things:

1. **Static sites are still the most resilient, robust, long-lasting, and secure architecture when building for the web.** Using a static architecture to reduce your attack surface is an investment in your peace of mind. You shouldn’t have to maintain security hypervigilance to run a website.
1. Developers face _too much_ infrastructure lock-in when shipping dynamic features (_especially_ in the JavaScript tooling ecosystem). Perhaps you’ve been eyeing the [per-compute pricing on your serverless bill](https://www.zachleat.com/web/serverless-cost/) as bot traffic increases over time.
1. Adding collaborative editing and content management features to your static website requires more configuration work than it should to get up and running.

**Build Awesome Pro** is a new website builder that attempts to solve each of these problems. Fast by default, durable over time, with way less dependency drama. Build Awesome Pro will feature:

1. Static output. Versioned in git. Build and deploy wherever you’d like.
1. Bring your own project or choose from our curated list of starter templates. Have an Eleventy project? We’ll maintain full compatibility with existing Eleventy projects and the Eleventy ecosystem.
1. No lock-in. Edit and collaborate on our infrastructure. Host anywhere (optionally with us). Eject at any time with your site as-is.

Build Awesome Pro offers the option to add **collaborative editing to your project as an infrastructure-level Progressive Enhancement**.

<a href="{{ config.kickstarterUrl }}" class="announcement-btn elv-externalexempt"><i class="fa-brands fa-build-awesome"></i>Get notified (April 28th) on Kickstarter!</a>

## One Possible Editable API

Consider the following hypothetical Hello World example that opts-in a specific data property for editing in a Markdown file:

```md
{% raw %}
---
title: World
---
# Hello, {{ title | editable }}
{% endraw %}
```

<details>
<summary>Expand to see what the API might look like in a JavaScript content file.</summary>

```js
{% raw %}
import { editable } from "@awesome.me/build-pro";

export function render({ title }) {
	return `<h1>Hello, ${editable(title)}</h1>`;
}
{% endraw %}
```

</details>


When using Build Awesome Pro (and with the proper permissions for editing), the `title` data property will render as an editable value on the page. Edits can be made directly in-browser and are applied in the data cascade to apply _project-wide_.

{% callout "demo" %}
<h1>Hello, <code>World</code></h1>
{% endcallout %}

Build Awesome Pro will expose controls in your project to make your content editable inline (in this example, a String literal). And when folks edit the above template, their edits will persist directly via commits in version control in the original data cascade location:

{% highlight "diff-md" %}
{% raw %}
---
-title: World
+title: Moon
---
# Hello, {{ title | editable }}
{% endraw %}
{% endhighlight %}

This will render the template’s new `title` property in the data cascade (wherever used throughout your project), in this case something like:

{% callout "demo" %}
<h1>Hello, <code>Moon</code></h1>
{% endcallout %}

At some future time, if you decide that editing is no longer necessary for your project, your Build Awesome project will still build using the open source engine for hosting wherever you’d like, without any changes! **No lock-in, no shenanigans.**

_Check out this [lower-level (developer-specific) example of full template editing and build-in-a-browser on our home page.](/#try-build-awesome-in-your-browser)_

## Get notified — April 28!

Build Awesome Pro is a better way to build and collaborate on websites! Convenient for developers and easy-to-use for the whole team: fast, flexible, and built to last.

{% include "components/announcement.njk" %}

_**Stay tuned: Build Awesome (11ty) v4 is coming** with that same great 11ty flavor you’re used to: more features with fewer dependencies and an ever-improving focus on build performance!_

## Full Coverage

{% include "related-build-awesome.njk" %}

{# - [Blog Awesome: We’re Pressing Pause on our Kickstarter](https://blog.fontawesome.com/pausing-kickstarter/) #}