---
searchTitle: Install Build Awesome Globally
---

# Install Build Awesome Globally

{% callout "warn" %}It is <strong>not recommended</strong> to install Build Awesome globally (though it does work fine).{% endcallout %}

<strong>It is preferred to use <a href="/docs/#step-2-install-build-awesome"><code>package.json</code> installation</a></strong> instead. <code>package.json</code> installation will avoid versioning issues if you come back to this project later or decide to use Build Awesome on multiple projects that may need different versions.

{% callout "warn" %}If you’re planning on deploying your site using a <a href="/docs/deployment/">service like Netlify</a> (running a build a deployment server), you <strong>must</strong> use <code>package.json</code> installation and <strong>not</strong> global installation.{% endcallout %}

```bash
npm install -g @awesome.me/buildawesome
```

The above adds an `buildawesome` command that you can use in any directory. When you run Build Awesome globally, it might look like this:

```
$ buildawesome --version
{% latestVersion versions, config, "" %}
```
