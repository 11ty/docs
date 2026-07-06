---
newstitle: Use Eleventy Edge to deliver dynamic websites on the Edge
eleventyNavigation:
  parent: Blog
  key: Eleventy Edge
---

I am very proud to introduce a brand new addition to Eleventy: Eleventy Edge.

Eleventy Edge is an exciting new way to add dynamic content to your Eleventy templates. With a simple Eleventy shortcode you can opt-in a part of your Eleventy template to run on an Edge server, allowing your site to use dynamic, user-specific content!

- **[Eleventy Edge Plugin documentation](/docs/plugins/edge/)**
- **[Eleventy Edge Demos](https://demo-eleventy-edge.netlify.app/)**
- **[`demo-eleventy-edge` Source Code on GitHub](https://github.com/11ty/demo-eleventy-edge)**

## A few ideas

Here are a few ideas of things you could do with the new Eleventy Edge plugin:

- Any user personalized content (User accounts, premium-only content, AB testing)
- Accessing/setting HTTP Headers (e.g. Cookies, Save-Data, Client Hints, etc)
- [Handling Forms](https://demo-eleventy-edge.netlify.app/forms/)
- Using Geolocation information to localize content
- A zero-clientside JavaScript [Dark mode/Light mode toggle](https://demo-eleventy-edge.netlify.app/appearance/)

## Supplement your build

You can use Eleventy Edge with your existing projects and templates—render just a portion of your build template on the Edge:

{% codetitle "Nunjucks, Liquid", "Syntax" %}

{% raw %}

```liquid
The content outside of the `edge` shortcode is generated with the Build.

{% edge %}
The content inside of the `edge` shortcode is generated on the Edge.

* Use a query param value here.
* Use a cookie value here.
* All without clientside JS.
{% endedge %}
```

{% endraw %}

This feature makes heavy use of [Netlify’s new Edge Functions feature](https://docs.netlify.com/netlify-labs/experimental-features/edge-functions/) to run Eleventy in Deno on Edge servers. It continues Eleventy’s architectural dedication to markup-first zero-clientside JavaScript solutions to deliver the fast and scalable dynamic websites. Check out our [introductory demos](https://demo-eleventy-edge.netlify.app/) and watch for more content to come discussing this exciting new feature.

## More around the web

- [Netlify Docs: Edge Functions overview](https://docs.netlify.com/netlify-labs/experimental-features/edge-functions/)
- {% indieweblink "Netlify Edge Functions on Deno Deploy", "https://deno.com/blog/netlify-edge-functions-on-deno-deploy" %}
- [Netlify Edge Functions: A new serverless runtime powered by Deno](https://www.netlify.com/blog/announcing-serverless-compute-with-edge-functions)
