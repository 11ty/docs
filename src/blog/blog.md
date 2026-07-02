---
headerTitle: Eleventy Community
eleventyNavigation:
  key: Blog
  parent: Community
  order: 1
excludeFromSidebar: false
layout: "layouts/docs.njk"
permalink: "/blog/"
override:tags:
eleventyImport:
  collections: ["blog"]
---

# Blog

{% if buildawesome.env.runMode == "serve" %}
{% callout "warn" %}All <code>/blog/</code> pages redirect to 11ty.dev in production.{% endcallout %}
{% endif %}

📢 [Subscribe to the **Eleventy News Feed**](/blog/feed.xml)

_For extended Eleventy coverage, follow [`zachleat.com/web/eleventy`](https://www.zachleat.com/web/eleventy/)._

---
<style>
.blog-lrg {
	font-size: 1.25em;
	line-height: 1.1;
}
</style>

{% for news in collections.blog | reverse %}
- <small><code>{{ news.date | newsDate("LLL yyyy") }}</code></small> [{% if news.data.blogHighlight %}<strong class="blog-lrg">{% endif %}{{ news.data.newstitle }}{% if news.data.blogHighlight %}</strong>{% endif %}]({{ news.url }})
{%- endfor %}
- <small><code>Apr<!-- 26 --> 2019</code></small> [Eleventy wins second Google Open Source Award](https://opensource.googleblog.com/2019/04/google-open-source-peer-bonus-winners.html)
- <small><code>Apr<!-- 26 --> 2019</code></small> [CERN 2019 WorldWideWeb Rebuild]({{ "https://twitter.com/eleven_ty/status/1106589569238085637" | canonicalTwitterUrl }}) site rebuilt using Eleventy! <small><em> on 2019 March</em></small>
- <small><code>Dec<!-- 11 --> 2018</code></small> [Turn Jekyll up to Eleventy—a lovely tutorial by {% communityavatar "paulrobertlloyd" %}Paul Robert Lloyd](https://24ways.org/2018/turn-jekyll-up-to-eleventy/)
- <small><code>Nov<!-- 26 --> 2018</code></small> [Happy First Birthday, Eleventy! 🎉](https://www.zachleat.com/web/eleventy-birthday/) <small><em> on 2018 November 26</em></small>
- <small><code>Sep<!-- --> 2018</code></small> [Google’s {% indieavatar "https://v8.dev/" %}V8 web site launches using Eleventy]({{ "https://twitter.com/v8js/status/1044202940494475265" | canonicalTwitterUrl }})
- <small><code>May<!-- 23 --> 2018</code></small> James Williamson delivers [Eleventy’s mascot](https://web.archive.org/web/20200307013845/https://twitter.com/jameswillweb/status/999052022497316865), named Edison the Static-Generating Possum. <small><em>on 2018 May 23</em></small>
- <small><code>Mar<!-- 26 --> 2018</code></small> [Eleventy wins Google Open Source Award](https://www.zachleat.com/web/google-award/)
- <small><code>Feb<!-- 12 --> 2018</code></small> [Introducing Eleventy, a new Static Site Generator](https://www.zachleat.com/web/introducing-eleventy/)
- <small><code>Dec<!-- 20 --> 2017</code></small> [Eleventy’s very first (and second and third) release](https://github.com/11ty/eleventy/releases?after=v0.1.3)
- <small><code>Nov<!-- 26 --> 2017</code></small> Eleventy’s [first commit](https://github.com/11ty/eleventy/commit/00ad9192605d5d501de6aae193701c5a2297ef2c) makes the auspicious claim: “It’s doing what it’s supposed to do”
