---
eleventyNavigation:
  parent: Learn
  key: CommonJS, ESM, TypeScript
  excerpt: Different flavors of JavaScript
---

# CommonJS, ESM, and TypeScript

{% tableofcontents %}

* Related: [JavaScript Modules on MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules)

Build Awesome works with many different flavors of JavaScript:

- **CommonJS**: the original flavor supported in Node.js, use if you need the broadest compatibility with older versions of Node or Build Awesome (or Eleventy).
- **ECMAScript Modules (ESM)** _(recommended)_: the new JavaScript standard for future-friendly code. This is most compatible with alternative JavaScript environments and runtimes (even web browsers).
- **[TypeScript](/docs/languages/typescript/)**: adds types to JavaScript. Natively supported in Node.js (via type stripping in 22.6+) and Deno.

## Compatibility

Build Awesome is **compatible with ESM, CommonJS, and TypeScript** (with some runtime limitations). Note that Node defaults to CommonJS and Deno defaults to ESM:

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
			<td>Node.js defaults</td>
			<td><code>.js</code> <code>.cjs</code></td>
			<td><code>.mjs</code></td>
			<td><code>.ts</code> <code>.cts</code></td>
			<td><code>.mts</code></td>
		</tr>
		<tr>
			<td>Deno defaults</td>
			<td><code>.cjs</code></td>
			<td><code>.js</code> <code>.mjs</code></td>
			<td><code>.cts</code></td>
			<td><code>.ts</code> <code>.mts</code></td>
		</tr>
		<!-- <tr>
			<td>TypeScript File Extensions (Node 22.6+ or Deno)</td>
			<td><code>.ts</code> <code>.cts</code></td>
			<td><code>.ts</code> <code>.mts</code></td>
		</tr> -->
		<!-- <tr>
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
		</tr> -->
	</tbody>
</table>

You can override the default flavor for `.js` and `.ts` files using a `type` property in your `package.json` file.

You can mix and match different flavors when using the following project files and features:

- [Configuration files](/docs/config/)
- [JavaScript Data Files](/docs/data-js/)
- [JavaScript Templates](/docs/languages/javascript/) (e.g. `11ty.js`)
- [JavaScript Front Matter](/docs/data-frontmatter/#java-script-front-matter)

## JavaScript Runtimes

Build Awesome has goals to broadly support the same module formats as your chosen [JavaScript runtime](/docs/javascript-runtime/).

### Node.js and Deno

CommonJS, ESM, and TypeScript are supported in Node.js and Deno.

If you want to use ESM (in JavaScript or TypeScript) in your project, you can do this project-wide or incrementally on a per-file basis:

1. **Project-wide**: Adding `"type": "module"` in your `package.json`, which specifies that `.js` (and `.ts`) files use ESM (this is the default in Deno, swap back to CommonJS using `"type": "commonjs"`). When using ESM, use `.cjs` (or `.cts`) file extensions to mark individual files as CommonJS.
1. **Individual files** (incremental migration): by using the `.mjs` (and `.mts`) file extension instead of `.js` you can change a single file to use ESM.

**If your Build Awesome or Eleventy project already uses CommonJS, you can keep using CommonJS**: using _ESM is not required_. We will continue to support CommonJS moving forward. Our docs include code snippets for both CommonJS and ESM.

`.js`, `.cjs`, and `.mjs` file extensions are supported for [Configuration Files](/docs/config.md), [JavaScript Data Files](/docs/data-js.md) and [JavaScript (`.11ty.js`) templates](/docs/languages/javascript.md). With <a href="/docs/languages/typescript/#configuration">additional configuration</a>, you can use `.ts`, `.cts`, and `.mts` file extensions for TypeScript for these features as well.

- Related: read more about [Deno’s CommonJS compatibility](https://docs.deno.com/runtime/fundamentals/node/#commonjs-support).

## Configuration

Read more about [supported configuration file names](/docs/config.md#default-filenames).

### ESM Configuration

Your [configuration file](/docs/config.md) using ESM can use core bundled plugins (like [i18n](/docs/plugins/i18n/), [Render](/docs/plugins/render/), [InputPath to URL](/docs/plugins/inputpath-to-url/), [`id` Attribute](/docs/plugins/id-attribute/) or [HTML `<base>`](/docs/plugins/html-base/)) directly:

{%- set codeBlock %}{% raw %}
// Any combination of these
import { I18nPlugin, RenderPlugin, HtmlBasePlugin } from "@awesome.me/buildawesome";

export default function ($config) {
	// …
};
{% endraw %}{%- endset %}
{{ codeBlock | highlight("js") | safe }}

Note the use of `import` and `export default`.

### CommonJS Configuration

If you use core bundled plugins (like [i18n](/docs/plugins/i18n/), [Render](/docs/plugins/render/), [InputPath to URL](/docs/plugins/inputpath-to-url/), [`id` Attribute](/docs/plugins/id-attribute/) or [HTML `<base>`](/docs/plugins/html-base/)) (or any ESM package, really), you can simply require the package directly in your [configuration file](/docs/config.md) as [`require(ESM)` is now natively supported in Node 20.19 and newer](https://nodejs.org/docs/latest/api/modules.html#loading-ecmascript-modules-using-require).

{%- set codeBlock %}{% raw %}
const { I18nPlugin, RenderPlugin, HtmlBasePlugin } = require("@awesome.me/buildawesome");

module.exports = function ($config) {
	// …
};
{% endraw %}{%- endset %}
{{ codeBlock | highlight("js") | safe }}

If you attempt to `require("@awesome.me/buildawesome")` in a version of Node that does not support it, we’ll throw a [very helpful error message which will provide you exact instructions on how to fix the issue](https://www.zachleat.com/web/future-friendly-esm/).

### Plugins

You can write your [plugins](/docs/plugins.md) in CommonJS or ESM too. Which should you choose?

<table>
  <thead>
    <tr>
      <th>Feature</th>
      <th>ESM or CommonJS</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Okay with Build Awesome 4+, Eleventy 3+ and Node 20.19+ compatibility?</td>
      <td>Use ESM</td>
    </tr>
    <tr>
      <td>Need compatibility with older versions of Eleventy (<code>≤ 2</code>) or Node (<code>≤ 20.18</code>)?</td>
      <td>Use CommonJS</td>
    </tr>
  </tbody>
</table>

_It is not recommended to use TypeScript in plugin code as type stripping is not supported in Node.js’ `node_modules` folder._
