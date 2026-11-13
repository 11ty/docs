---
newstitle: "Calling all courageous canary testers for Eleventy v3.0"
eleventyNavigation:
  parent: Blog
---

Are you feeling adventurous? A few short days ago we released the first alpha release of Eleventy v3.0 on the `canary` channel. If you’d like to try it out, use the following command to install it in your project:

```sh
npm install @11ty/eleventy@canary --save-exact
```

- [_Want to learn more about installation?_](/docs/)

We recommend using `--save-exact` with the `canary` channel so you always get the exact same version every time. This will add something like `"@11ty/eleventy": "3.0.0-alpha.2"` to your `package.json` instead of `"^3.0.0-alpha.2"` (the carat is _basically_ shorthand for: “give me the newest 3.0.x release”).

Rest assured, **these releases have now been well-tested in production**: both https://www.zachleat.com/ and https://www.11ty.dev/ are now using 3.0 alpha releases.

## Thank You

This release would not have been possible without the support of {% indieweblink "CloudCannon", "https://cloudcannon.com/eleventy-cms/?utm_campaign=11ty-partner&utm_source=official-sponsor" %}.

I’ve been working with the incredible folks at CloudCannon for a few months now and have grown to love their git-backed CMS product. It works great with your existing deployment workflow: you don’t need to change frameworks or hosts, just add [web-based editing](https://www.zachleat.com/web/live-editing-cloudcannon/)! The [site mounting feature](https://www.zachleat.com/web/site-mounting/) has been incredible for my development velocity.

<a href="https://cloudcannon.com/eleventy-cms/?utm_campaign=11ty-partner&utm_source=official-sponsor" style="display: block; max-width: 16em" class="elv-externalexempt">{% getScreenshotHtml "The Eleventy CMS for live visual editing", "https://cloudcannon.com/eleventy-cms/?utm_campaign=11ty-partner&utm_source=official-sponsor" %}</a>

## New features and a short upgrade guide

- _Eleventy v3.0 requires **Node 18** or newer._

The flagship feature for this release is our first-class bundler-free (read: it’s fast) [ESM support](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules). Practically speaking, this means you can add `"type": "module"` to your `package.json` and all of the Node `*.js` files in your project will now expect ESM syntax (e.g. `import` instead of `require`).

**ESM is _not_ required**. Your existing CommonJS (CJS) projects (known for use of `module.exports` and `require`) will still work great with Eleventy 3.0 and we will continue to support CommonJS in Eleventy moving forward.

You have two upgrade path options (pick which one suits your project best):

1. Leave your existing Eleventy project as CommonJS. This is the easiest migration path. [Use of `require` for I18nPlugin, RenderPlugin, or HTMLBasePlugin will need to be updated](<#how-to-require(@11ty/eleventy)-in-commonjs>).
2. Make your project ESM-first. This is highly recommended for new projects and is the best way to write JavaScript moving forward. [`11ty-website` went all in on ESM](https://github.com/11ty/11ty-website/pull/1636) but (as a reminder) **ESM is _not_ required** and a project-wide upgrade to ESM isn’t necessary either. You can add `"type": "module"` to your `package.json` and rename your Node `.js` files to `.cjs` and be done with it. Later on, you can slowly upgrade to ESM syntax one JavaScript file at a time by renaming back from `.cjs` to `.js`.

### Upgrade examples

You can check out these two pull requests showing how these large-ish web site codebases were converted to use Eleventy v3.0:

- `zachleat.com` kept using CommonJS (easy mode: 3 files changed ~6 lines of code): https://github.com/zachleat/zachleat.com/pull/50
- `11ty-website` CommonJS to ESM (a bit more work): https://github.com/11ty/11ty-website/pull/1636

### How to `require("@11ty/eleventy")` in CommonJS

_This step is only necessary if you use CommonJS for your Eleventy configuration file_ (e.g. `.eleventy.js` or `eleventy.config.js` or `eleventy.config.cjs`).

If you use the I18nPlugin, RenderPlugin, or HTMLBasePlugin, you will need to make the following change in your CommonJS config file:

```js
// Any combination of these
const { I18nPlugin, RenderPlugin, HtmlBasePlugin } = require("@11ty/eleventy");

module.exports = function (eleventyConfig) {
	// …
};
```

If _you’re continuing to use CommonJS_, these will need to be updated to dynamic imports instead (you can’t `require` an ESM package but you can use `await import()` in CommonJS to work around it):

```js
// Eleventy 3.0 supports async configuration callbacks:
module.exports = async function (eleventyConfig) {
	// Any combination of these
	const { I18nPlugin, RenderPlugin, HtmlBasePlugin } = await import(
		"@11ty/eleventy"
	);

	// …
};
```

## ‼️ Warning ‼️ Project Slipstream Changes

Per feedback from our [community survey](https://www.11ty.dev/blog/community-survey-results/) we’re making a few big changes in Eleventy v3.0 we’re referring to as [Project Slipstream](https://github.com/11ty/eleventy/pull/3074).

- Low interest in `pug`, `hbs`, `mustache`, `ejs`, or `haml` has prompted their removal (from core) as well. But if you use these, do not despair. We have a future plan to [move `pug` into plugin-land as an officially supported plugin for the v3.0 stable release](https://github.com/11ty/eleventy/issues/3081). If you are interested in the others, please [leave an upvote on the appropriate comment in Issue #3124](https://github.com/11ty/eleventy/issues/3124).
- Low-interest in our vendor-locked 😬 plugins (Netlify Serverless and Netlify Edge) prompted their removal as we rededicate to static site generation and the hosting portability of Jamstack. You will still be able to run Eleventy in serverless environments, but the Eleventy project will not manage this code directly.

_If you’re interested in the [unique benefits of the Jamstack](https://www.zachleat.com/web/jamstack-future/) and want to learn more, join us at [thefutureofjamstack.org](https://thefutureofjamstack.org/):_

<a href="https://thefutureofjamstack.org/" style="display: block; max-width: 16em" class="elv-externalexempt">{% getScreenshotHtml "The future of Jamstack", "https://thefutureofjamstack.org/" %}</a>

## What’s next?

Our little project had a few [set-backs](https://www.zachleat.com/web/eleventy-side-project/) this year but now we’re running on all cylinders now and it’s full steam ahead.

We’ll likely spend a few months doing active development on v3.0: taking feedback, bug fixing, and iterating on a few new surprises too. You can follow along with this progress on the [GitHub milestone](https://github.com/11ty/eleventy/milestone/40?closed=1).

We’ll be talking about it all on Mastodon—make sure to follow along:

- [`@eleventy@fosstodon.org`](https://fosstodon.org/@eleventy)
- [`@zachleat@zachleat.com`](https://zachleat.com/@zachleat)
