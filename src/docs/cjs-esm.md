---
eleventyNavigation:
  parent: Learn
  key: CommonJS, ESM, TypeScript
  excerpt: Different flavors of JavaScript
---

# CommonJS, ESM, and TypeScript

* Related: [JavaScript Modules on MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules)

Eleventy works with many different flavors of JavaScript:

- **CommonJS**: the original flavor of Node.js, for broadest compatibility with older versions of Node.js.
- **ECMAScript Modules (ESM)** _(recommended)_: the new JavaScript standard for future-friendly code. This is most compatible with alternative JavaScript environments and runtimes (browsers, even!).
- **[TypeScript](/docs/languages/typescript/)**: adds types to JavaScript. Typically requires transpilation but natively supported in Node.js (via type stripping in Node 22.6+) and Deno.

## Compatibility

Eleventy is **compatible with ESM, CommonJS, and TypeScript** (with some runtime limitations). Note the following:

<div class="table-scroller" tabindex="0" role="region" aria-label="Compatibility">
<table>
	<thead>
		<tr>
			<th>Feature</th>
			<th>CommonJS</th>
			<th>ESM</th>
			<th>TypeScript (CommonJS)</th>
			<th>TypeScript (ESM)</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td><code>@11ty/eleventy</code> Compatibility</td>
			<td><code>v0+</code></td>
			<td><code>v3+</code></td>
			<td><code>v3+</code> <small>(<a href="/docs/languages/typescript/#configuration">additional configuration</a> required)</small></td>
			<td><code>v3+</code> <small>(<a href="/docs/languages/typescript/#configuration">additional configuration</a> required)</small></td>
		</tr>
		<!-- <tr>
			<td>Exports</td>
			<td><code>module.exports</code></td>
			<td><code>export</code></td>
			<td><code>module.exports</code></td>
			<td><code>export</code></td>
		</tr>
		<tr>
			<td>Imports</td>
			<td><code>require</code></td>
			<td><code>import</code></td>
			<td><code>require</code></td>
			<td><code>import</code></td>
		</tr> -->
		<tr>
			<td><code>.js</code> files use (unless <code>package.json</code>→<code>type</code>)</td>
			<td>✅ <code>.js</code> in Node.js</td>
			<td>✅ <code>.js</code> in Deno</td>
			<td>-</td>
			<td>-</td>
		</tr>
		<tr>
			<td><code>.ts</code> files use (unless <code>package.json</code>→<code>type</code>)</td>
			<td>-</td>
			<td>-</td>
			<td>✅ <code>.ts</code> in Node.js</td>
			<td>✅ <code>.ts</code> in Deno</td>
		</tr>
		<!-- <tr>
			<td>Implicit File Extension via <code>package.json</code>→<code>type</code></td>
			<td><code>.js</code></td>
			<td><code>.js</code></td>
			<td><code>.ts</code></td>
			<td><code>.ts</code></td>
		</tr> -->
		<tr>
			<td>Explicit File Extension</td>
			<td><code>.cjs</code></td>
			<td><code>.mjs</code></td>
			<td><code>.cts</code></td>
			<td><code>.mts</code></td>
		</tr>
		<!-- <tr>
			<td>TypeScript File Extensions (Node 22.6+ or Deno)</td>
			<td><code>.ts</code> <code>.cts</code></td>
			<td><code>.ts</code> <code>.mts</code></td>
		</tr> -->
		<tr>
			<td>Node.js Compatibility</td>
			<td>Node.js <code>*</code></td>
			<td>Node.js <code>v12.20+</code></td>
			<td>Node.js <code>v22.6+</code></td>
			<td>Node.js <code>v22.6+</code></td>
		</tr>
		<tr>
			<td>Deno Compatibility</td>
			<td>Deno <code>v2+</code></td>
			<td>Deno <code>*</code></td>
			<td>Deno <code>v2+</code></td>
			<td>Deno <code>*</code></td>
		</tr>
	</tbody>
</table>
</div>

You can mix and match different flavors when using the following Eleventy project files and features:

- [Configuration files](/docs/config/)
- [JavaScript Data Files](/docs/data-js/)
- [JavaScript Templates](/docs/languages/javascript/) (e.g. `11ty.js`)
- [JavaScript Front Matter](/docs/data-frontmatter/#java-script-front-matter)

## JavaScript Runtimes

Eleventy has goals to broadly support the same module formats as your chosen [JavaScript runtime](/docs/javascript-runtime/).

### Node.js and Deno

CommonJS, ESM, and TypeScript are supported in Node.js and Deno.

{% callout "info", "md" %}Deno’s runtime development is winding down: the Deno team [joined Cloudflare](https://deno.com/blog/cloudflare) in October 2026 and Deno will receive bug fixes and security updates for about a year before Deno-led development ends. The runtime remains open source.{% endcallout %}

If you want to use ESM (in JavaScript or TypeScript) in your Eleventy (v3+) project, you can do this project-wide or incrementally on a per-file basis:

1. **Project-wide**: Adding `"type": "module"` in your `package.json`, which specifies that `.js` (and `.ts`) files use ESM (this is the default in Deno, swap back to CommonJS using `"type": "commonjs"`). When using ESM, use `.cjs` (or `.cts`) file extensions to mark individual files as CommonJS.
1. **Individual files** (incremental migration): by using the `.mjs` (and `.mts`) file extension instead of `.js` you can change a single file to use ESM.

**If your Eleventy project already uses CommonJS, you can keep using CommonJS**: using _ESM is not required_. Eleventy will continue to support CommonJS moving forward. Our docs include code snippets for both CommonJS and ESM.

`.js`, `.cjs`, and `.mjs` file extensions are supported for [Configuration Files](/docs/config.md), [JavaScript Data Files](/docs/data-js.md) and [JavaScript (`.11ty.js`) templates](/docs/languages/javascript.md). With <a href="/docs/languages/typescript/#configuration">additional configuration</a>, you can use `.ts`, `.cts`, and `.mts` file extensions for TypeScript for these features as well.

- Related: read more about [Deno’s CommonJS compatibility](https://docs.deno.com/runtime/fundamentals/node/#commonjs-support).

## Configuration

Read more about [supported configuration file names](/docs/config.md#default-filenames).

### ESM Configuration

Your [configuration file](/docs/config.md) using ESM can use Eleventy bundled plugins (like [i18n](/docs/plugins/i18n/), [Render](/docs/plugins/render/), [InputPath to URL](/docs/plugins/inputpath-to-url/), [`id` Attribute](/docs/plugins/id-attribute/) or [HTML `<base>`](/docs/plugins/html-base/)) directly:

{%- set codeBlock %}{% raw %}
// Any combination of these
import { I18nPlugin, RenderPlugin, HtmlBasePlugin } from "@11ty/eleventy";

export default function (eleventyConfig) {
	// …
};
{% endraw %}{%- endset %}
{{ codeBlock | highlight("js") | safe }}

Note the use of `import` and `export default`.

### CommonJS Configuration

If you use Eleventy bundled plugins (like [i18n](/docs/plugins/i18n/), [Render](/docs/plugins/render/), [InputPath to URL](/docs/plugins/inputpath-to-url/), [`id` Attribute](/docs/plugins/id-attribute/) or [HTML `<base>`](/docs/plugins/html-base/)), you have a few options to use Eleventy v3 in your [configuration file](/docs/config.md).

Consider this CommonJS configuration file:

{%- set codeBlock %}{% raw %}
// This requires Node v20.19 or newer
const { I18nPlugin, RenderPlugin, HtmlBasePlugin } = require("@11ty/eleventy");

module.exports = function (eleventyConfig) {
	// …
};
{% endraw %}{%- endset %}
{{ codeBlock | highlight("js") | safe }}

- Read more about [`require(ESM)` in Node.js](https://nodejs.org/docs/latest/api/modules.html#loading-ecmascript-modules-using-require)

If you attempt to `require("@11ty/eleventy")` with Eleventy v3 in a version of Node that does not support it, we’ll throw a [very helpful error message which will provide you exact instructions on how to fix the issue](https://www.zachleat.com/web/future-friendly-esm/).

#### CommonJS Configuration in Node 18

For older versions of Node.js, you’ll need to use a dynamic `import()` instead of `require` (or change your configuration file to use ESM):

{%- set codeBlock %}{% raw %}
module.exports = async function (eleventyConfig) {
	const { I18nPlugin, RenderPlugin, HtmlBasePlugin } = await import("@11ty/eleventy");
	// …
};
{% endraw %}{%- endset %}
{{ codeBlock | highlight("js") | safe }}

Note the `async` configuration callback.

#### Using ESM plugins in CommonJS Configuration

_Remember, you can use `require` to import an ESM plugin in Node 20.19 and newer (and ignore this section)._

But if you’re on an older version of Node, you can use ESM plugins in a CommonJS configuration file with dynamic import. Keep in mind that using default export as the plugin callback, you will need to use the special `default` property supplied from dynamic `import()`.

{%- set codeBlock %}{% raw %}
module.exports = async function (eleventyConfig) {
	const { default: myPlugin } = await import("my-eleventy-plugin");
	// …
};
{% endraw %}{%- endset %}
{{ codeBlock | highlight("js") | safe }}

### Plugins

You can write your [Eleventy plugins](/docs/plugins.md) in CommonJS or ESM too. Which should you choose?

<table>
  <thead>
    <tr>
      <th>Feature</th>
      <th>ESM or CommonJS</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Okay with Eleventy 3+ and Node 20.19+ compatibility?</td>
      <td>Use ESM</td>
    </tr>
    <tr>
      <td>Need compatibility with older versions of Eleventy (<code>≤ 2</code>) or Node (<code>≤ 20.18</code>)?</td>
      <td>Use CommonJS</td>
    </tr>
  </tbody>
</table>

Notably, the same limitations documented above for Eleventy bundled plugins will apply to your plugin code as well!
