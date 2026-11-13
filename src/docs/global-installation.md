---
searchTitle: Install Eleventy Globally
---

# Install Eleventy Globally

{% callout "warn" %}It is <strong>not recommended</strong> to install Eleventy globally (though it does work fine).{% endcallout %}

<strong>It is preferred to use <a href="/docs/#step-2-install-eleventy"><code>package.json</code> installation</a></strong> instead. <code>package.json</code> installation will avoid versioning issues if you come back to this project later or decide to use Eleventy on multiple projects that may need different versions.

{% callout "warn" %}If you’re planning on deploying your site using a <a href="/docs/deployment/">service like Netlify</a> (running a build a deployment server), you <strong>must</strong> use <code>package.json</code> installation and <strong>not</strong> global installation.{% endcallout %}

```bash
npm install -g @11ty/eleventy
```

The above adds an `eleventy` command that you can use in any directory. When you run Eleventy globally, it might look like this:

```
$ eleventy --version
{% latestVersion versions, config, "" %}
```
