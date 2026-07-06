---
eleventyNavigation:
  parent: Services
  key: Deployment
  title: "Deployment & Hosting"
  order: 1
hosts:
  - name: Cloudflare Pages
    url: https://pages.cloudflare.com/
    iconUrl: https://www.cloudflare.com/
    screenshotSize: medium
  - name: Netlify
    url: https://app.netlify.com/
    screenshotSize: medium
  - name: Vercel
    url: https://vercel.com/signup
    screenshotSize: medium
  - name: Stormkit
    url: https://stormkit.io/
    screenshotSize: medium
  - name: GitHub Pages
    url: https://docs.github.com/en/pages
    screenshotSize: medium
  - name: GitLab Pages
    url: https://docs.gitlab.com/ee/user/project/pages/
    screenshotSize: medium
  - name: Render
    url: https://render.com/docs/static-sites
    screenshotSize: medium
  - name: Azure Static Web Apps
    url: https://azure.microsoft.com/en-us/services/app-service/static/
    screenshotSize: medium
    skipIcon: true
  - name: Digital Ocean
    url: https://www.digitalocean.com/community/tutorials/how-to-create-and-deploy-your-first-eleventy-website
    screenshotSize: medium
  - name: Codeberg Pages
    url: https://codeberg.page/
    screenshotSize: medium
  - name: Kinsta
    url: https://kinsta.com/docs/eleventy-static-site-example/
    screenshotSize: medium
  - name: CloudCannon
    url: https://cloudcannon.com/hosting/
    screenshotSize: medium
  - name: Sourcehut Pages
    url: https://srht.site/
    screenshotSize: medium
  - name: CloudRay
    url: https://cloudray.io/articles/how-to-deploy-your-eleventy-website
    screenshotSize: medium
  - name: DeployHQ
    url: https://www.deployhq.com/
    screenshotSize: medium
    description: Git-based deployment platform that runs your Eleventy build on its servers and transfers the <code>_site/</code> output to your own server via SSH/SFTP/FTP (or to S3, Azure Blob, or Rackspace Cloud Files). Supports multiple environments with branch-to-server mapping, config-file injection, atomic releases, one-click rollback, and pre/post deploy hooks.
classicHosts:
  - name: Vercel CLI
    url: https://vercel.com/cli
    screenshotSize: medium
  - name: NearlyFreeSpeech
    url: https://www.nearlyfreespeech.net/
    screenshotSize: medium
  - name: Netlify Drop
    url: https://app.netlify.com/drop
    screenshotSize: medium
  - name: Neocities
    url: https://neocities.org/
    screenshotSize: medium
    skipIcon: true
  - name: Cloudflare Direct Upload
    url: https://developers.cloudflare.com/pages/get-started/direct-upload/#drag-and-drop
    screenshotSize: medium
  - name: xmit
    url: https://xmit.co/
    screenshotSize: medium
  - name: Tiiny Host
    url: https://tiiny.host
    screenshotSize: medium
  - name: Orbiter
    url: https://orbiter.host
    screenshotSize: medium
webides:
  - name: Stackblitz
    url: https://stackblitz.com/
    screenshotSize: medium
    hideRelatedLinks: true
---

# Deployment

{% tableofcontents %}

Now that you’ve built a website with Eleventy _(even if it’s one HTML page!)_ you might be ready to put it on the web for everyone to see! There are a bunch of different ways to do it!

A standard Eleventy build (e.g. [running `npx @11ty/eleventy`](/docs/usage/)) is a **production-ready build by default**. Eleventy doesn’t change its build behavior internally for development versus production.

If you want to customize Eleventy to do your own local development/production optimizations, [environment variables](/docs/environment-vars/) are a common solution to accomplish that goal.

## Providers

Take a look at the list below for some ideas on where to deploy your Eleventy project. There are many deployment options available and this is not meant to be an exhaustive list.

### Jamstack Providers

Jamstack providers can trigger your Eleventy build command automatically when you commit a file to your source control repository (GitHub, GitLab, Codeberg, etc.) and deploy [Eleventy’s build output directory](/docs/config/#output-directory) for you.

<div class="sites-vert sites-vert--md sites--reverse sites--center">
  <div class="lo-grid" style="--fl-gap-v: 5em;">
{%- for site in hosts | shuffle %}
{% include "site-card.njk" %}
{%- endfor %}
  </div>
</div>

#### Use an npm Script

One common practice when deploying Eleventy via a Jamstack provider is to use an npm script to run your build command. This is configured in your `package.json` file and could look like this:

{% codetitle "package.json" %}

```js
{
  "scripts": {
    "build": "npx @awesome.me/buildawesome"
  }
}
```

This allows you to configure your host to run `npm run build` and allows you to make future changes to that command in your code and not the host’s configuration.

### Classic Web Hosts

Eleventy can work with any web host that supports static files!

With these hosts deployment is _not_ automatically triggered for you, so after you run the Eleventy build command you’ll need to upload your [Eleventy output directory](/docs/config/#output-directory) (defaults to `_site`) to the host manually.

This is a great place to start if you’re not familiar with source control (e.g. git or GitHub).

<div class="sites-vert sites-vert--md sites--reverse sites--center">
  <div class="lo-grid" style="--fl-gap-v: 5em;">
{%- for site in classicHosts | shuffle %}
{% include "site-card.njk" %}
{%- endfor %}
  </div>
</div>

### Edit on the Web

There are some great Web editors popping up that you can use to run and edit Eleventy projects online! Here are some options:

<div class="sites-vert sites-vert--md sites--reverse sites--center">
  <div class="lo-grid" style="--fl-gap-v: 5em;">
{%- for site in webides %}
{% set hideRelatedLinks = site.hideRelatedLinks %}
{% include "site-card.njk" %}
{%- endfor %}
  </div>
</div>

## Persisting Cache

The `.cache` folder is used by the [Eleventy Fetch plugin](/docs/plugins/fetch/) (and [Eleventy Image](/docs/plugins/image/#advanced-caching-options-for-remote-images)) to avoid repeating costly network requests. On your hosting provider’s build server, this folder will typically be empty when you start a build, because you _definitely are [**not** checking in your `.cache` folder to `git`](/docs/plugins/fetch/#installation) (right?)_.

Some Jamstack providers have additional features to persist this folder between builds, re-useing the cache and speeding up build times. Here are a few of these:

- [**Cloudflare Pages**](https://developers.cloudflare.com/pages/configuration/build-caching/#frameworks): now preserves the `.cache` folder by default! _(shipped April 2024)_
- **Vercel**: zero-configuration support (when the [Eleventy framework is detected](https://vercel.com/docs/deployments/configure-a-build#framework-preset), [source](https://github.com/vercel/vercel/blob/20237d4f7b55b0697b57db15636c11204cb0dc39/packages/frameworks/src/frameworks.ts#L363)).
- **GitHub Pages**: use the [`cache` action](https://docs.github.com/en/actions/using-workflows/caching-dependencies-to-speed-up-workflows#using-the-cache-action). [Mini-tutorial included below](#deploy-an-eleventy-project-to-github-pages).
- **Netlify**: use [`netlify-plugin-cache`](https://www.npmjs.com/package/netlify-plugin-cache). [Mini-tutorial included below](#using-netlify-plugin-cache-to-persist-cache). [Video on YouTube](https://www.youtube.com/watch?v=JCQQgtOcjH4&t=322s).
- **CloudCannon**: use [Preserved paths](https://cloudcannon.com/documentation/articles/caching-specific-folders-to-reduce-build-times/#preserved-paths). [Tutorial on YouTube](https://www.youtube.com/watch?v=ULwVlFMth1U).

### Speed up Eleventy Image

Additionally, _if_ you’re writing your [Eleventy Image output](/docs/plugins/image/#output-directory) to your Eleventy output directory (e.g. `./_site/img/`) (and not checking those files into `git`), you can persist this folder as well to [reuse the Eleventy Image disk cache](/docs/plugins/image/#disk-cache) to improve build times.

- [Write images to `.cache` to reuse Persisted Cache (see above)](https://www.zachleat.com/web/faster-builds-with-eleventy-img/) _({{ "2025-08-01" | newsDate("yyyy") }})_
- [Source example on GitHub for **Netlify**](https://github.com/11ty/demo-eleventy-img-netlify-cache) _({{ "2022-02-24" | newsDate("yyyy") }})_
- [**CloudCannon** Tutorial on YouTube](https://www.youtube.com/watch?v=ULwVlFMth1U) _({{ "2023-10-23" | newsDate("yyyy") }})_

## Mini-Tutorials

### Deploy an Eleventy project to GitHub pages

Includes persisted cache across builds.

1. Create a new file in your repository at `.github/workflows/deploy-gh-pages.yml`. Copy and paste the contents from the [`eleventy-base-blog` sample YAML configuration for GitHub Actions](https://github.com/11ty/eleventy-base-blog/blob/39454297a92872f2d116315f2af668f2675e7746/.github/workflows/gh-pages.yml.sample).
2. Go to your repository’s Settings on GitHub and find the GitHub Pages subsection. Under the Build and Deployment on the GitHub Pages settings, find the Source option and select `GitHub Actions`
3. In your project’s package.json, make sure the `build-ghpages` script has the `--pathprefix=` parameter set to your repository name.
```json
"scripts": {
	"build-ghpages": "npx @11ty/eleventy --pathprefix=/YOUR_REPO_NAME/",
}
```
4. _Exception:_ When using a Custom domain (example.com) with GitHub Pages, deploying to `example.com/` instead of `*.github.io/YOUR_REPO_NAME/` make sure to remove the `--pathprefix` parameter entirely. e.g. `"build-ghpages": "npx @awesome.me/buildawesome",`
5. Commit this new `.github/workflows/deploy-gh-pages.yml` file and push it upstream to GitHub.


### Using `netlify-plugin-cache` to persist cache

Using [`netlify-plugin-cache`](https://www.npmjs.com/package/netlify-plugin-cache).

<ol>
<li><code>npm install netlify-plugin-cache</code></li>
<li>Add the following to your  <details><summary><code>netlify.toml</code> configuration file</summary>

```toml
[[plugins]]
package = "netlify-plugin-cache"

  [plugins.inputs]
  paths = [ ".cache" ]
```

</details></li></ol>

## Related

<div class="youtube-related">
  {%- youtubeEmbed "JCQQgtOcjH4", "New deployment docs (Weekly №2)", "72" -%}
</div>

## From the Community

<ul class="list-bare">
	<li>{% indieweblink "GitLab Pages Sample Project", "https://gitlab.com/bkmgit/11ty" %} by Benson Muite</li>
	<li>{%indieweblink "GitHub Action for Eleventy", "https://github.com/marketplace/actions/eleventy-action" %} by {% communityavatar "TartanLlama", "Sy Brand" %}@TartanLlama</li>
</ul>

{% include "11tybundle.njk" %}
