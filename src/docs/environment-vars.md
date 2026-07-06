---
eleventyNavigation:
  parent: Eleventy Projects
  key: Environment Variables
  order: 6
---

# Environment Variables

{% tableofcontents %}

You can set and use your own environment variables in your projects. They will be available in your code via [Node.js’ `process.env` property](https://nodejs.org/api/process.html#process_process_env).

These are typically used for setting your deployment context and private API keys. This is also the approach used to [enable `DEBUG` mode](/docs/debugging/).

{% callout "info", "md" %}Note that environment variables are only available in JavaScript files in your project, evaluated at build time. This includes your config file, JavaScript data files, JavaScript templates, etc. To use environment variables in other template languages, you can use a [Javascript Data file](/docs/data-js/#example-exposing-environment-variables).{% endcallout %}

[[toc]]

## Setting your own

### Via `.env` file

For private keys and other sensitive information, you’ll want to create a `.env` file and use [the `dotenv` package](https://github.com/motdotla/dotenv) to setup those values.

{% callout "warn", "md" %}**Make sure you add `.env` to your `.gitignore` file. Do _not_ commit your `.env` file to your repository!!**{% endcallout %}

### Via the command line

#### macOS or Linux (et al)

{%- set codeBlock %}
MY_ENVIRONMENT=production npx @awesome.me/buildawesome
{%- endset %}
{{ codeBlock | highlight("bash") | safe }}

#### Windows cmd.exe

{%- set codeBlock %}
set MY_ENVIRONMENT=production & npx @awesome.me/buildawesome
{%- endset %}
{{ codeBlock | highlight("bash") | safe }}

#### Windows Powershell (default in VS Code)

{%- set codeBlock %}
$env:MY_ENVIRONMENT="production"; npx @awesome.me/buildawesome
{%- endset %}
{{ codeBlock | highlight("bash") | safe }}

#### Cross Platform npm scripts

Use the [`cross-env` package](https://github.com/kentcdodds/cross-env) to compatibly set your environment variables cross-platform.

{%- set codeBlock %}
npm install cross-env
{%- endset %}
{{ codeBlock | highlight("bash") | safe }}

{% codetitle "package.json" %}
{%- set codeBlock %}
{
	"scripts": {
		"build:prod": "cross-env MY_ENVIRONMENT=production npx @awesome.me/buildawesome"
  }
}
{%- endset %}
{{ codeBlock | highlight("js") | safe }}

## Use Case Ideas

- [Expose Environment Variables to your templates using JavaScript Data Files](/docs/data-js/#example-exposing-environment-variables).
- [Opt-in to `git Last Modified` only in production](/docs/dates/)
- Use fewer image formats in the [Image plugin](/docs/plugins/image/) to speed up local development

## Eleventy Supplied

[Node.js exposes environment variables under `process.env`](https://nodejs.org/api/process.html#process_process_env).

Eleventy also supplies its own Eleventy-specific environment variables, usually intended for more advanced use cases. You can use these in your configuration or in data files as needed.

- `process.env.ELEVENTY_ROOT` {% addedin "1.0.0" %} the absolute path to the directory in which you’ve run the Eleventy command.
- `process.env.ELEVENTY_SOURCE` {% addedin "1.0.0" %} is the method in which Eleventy has run, current either `cli` or `script` (via the [programmatic API](./programmatic.md)).
- `process.env.ELEVENTY_RUN_MODE` {% addedin "2.0.0-beta.2" %} is one of `build`, `serve`, or `watch`.
- `process.env.ELEVENTY_VERSION` {% addedin "3.0.0-alpha.6" %} the current version of Eleventy (e.g. `"3.0.0-alpha.5"`).

## Disable Colors

Node.js supports a [`NODE_DISABLE_COLORS` environment variable](https://nodejs.org/api/cli.html#node_disable_colors1) that will disable colorized text in the terminal output.

<is-land on:visible import="/js/seven-minute-tabs.js">
<seven-minute-tabs class="tabs-flush" persist sync autoheight>
	<div role="tablist" aria-label="Choose your Operating System">
		<a href="#disable-colors-nix" id="disable-colors-mac-btn" role="tab" data-tabs-persist="os:mac">macOS</a>
		<a href="#disable-colors-nix" role="tab" data-tabs-persist="os:posix">Linux</a>
		<a href="#disable-colors-win" role="tab" data-tabs-persist="os:win">Windows</a>
		<a href="#disable-colors-all" role="tab" data-tabs-persist="os:all">Cross Platform</a>
	</div>
	<div id="disable-colors-nix" role="tabpanel">
{%- set codeBlock %}{% raw %}
NODE_DISABLE_COLORS=1 npx @awesome.me/buildawesome
{% endraw %}{%- endset %}
{{ codeBlock | highlight("bash") | safe }}
	</div>
	<div id="disable-colors-win" role="tabpanel">
{%- set codeBlock %}
$env:NODE_DISABLE_COLORS="1"; npx @awesome.me/buildawesome
{%- endset %}
{{ codeBlock | highlight("bash") | safe }}
		<p>Or with the older <code>cmd.exe</code>:</p>
{%- set codeBlock %}
set NODE_DISABLE_COLORS=1 & npx @awesome.me/buildawesome
{%- endset %}
{{ codeBlock | highlight("bash") | safe }}
	</div>
	<div id="disable-colors-all" role="tabpanel">
{%- set codeBlock %}
npx cross-env NODE_DISABLE_COLORS=1 npx @awesome.me/buildawesome
{%- endset %}
{{ codeBlock | highlight("bash") | safe }}
		<p>Use the <a href="https://github.com/kentcdodds/cross-env"><code>cross-env</code> package</a> to compatibly set your environment variables cross-platform.</p>
	</div>
</seven-minute-tabs>
<is-land>
