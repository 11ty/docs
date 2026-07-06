---
eleventyNavigation:
  parent: Eleventy Projects
  key: Command Line Usage
  pinned: true
  order: -1
---

# Command Line Usage

{% callout "info", "md-block", "Prerequisites" %}
1. Build Awesome runs in a Terminal application. [_Well, wait—what is a Terminal?_](/docs/terminal-window/)
1. Have you already [installed Build Awesome](/docs/#step-2-install-build-awesome)?
{% endcallout %}

Here’s the first command you can enter in your Terminal application to run Build Awesome:

{% set usageCode %}
# Searches the current directory, outputs to ./_site
npx @awesome.me/buildawesome

# `npx @awesome.me/buildawesome` is the same as:
npx @awesome.me/buildawesome --input=. --output=_site
{% endset %}
<script type="module" src="/js/seven-minute-tabs.js"></script>
<seven-minute-tabs class="tabs-flush tabs-right" persist sync autoheight>
	<div role="tablist" aria-label="Choose your Package Manager">
		<a href="#usage-npm" role="tab" data-tabs-persist="pkgmgr:npm">npm</a>
		<a href="#usage-pnpm" role="tab" data-tabs-persist="pkgmgr:pnpm">pnpm</a>
		<a href="#usage-yarn" role="tab" data-tabs-persist="pkgmgr:yarn">yarn</a>
	</div>
	<div id="usage-npm" role="tabpanel">{{ usageCode | packageManagerCodeTransform("npm") | highlight("bash") | safe }}</div>
	<div id="usage-pnpm" role="tabpanel">{{ usageCode | packageManagerCodeTransform("pnpm") | highlight("bash") | safe }}</div>
	<div id="usage-yarn" role="tabpanel">{{ usageCode | packageManagerCodeTransform("yarn") | highlight("bash") | safe }}</div>
</seven-minute-tabs>

Read more about [`--input`](/docs/config/#input-directory) and [`--output`](/docs/config/#output-directory). Note that setting the input and output directories via [config](/docs/config/) file is preferred.

A hypothetical `template.md` in the current directory would be rendered to `_site/template/index.html`. Read more at [Permalinks](/docs/permalinks/).

{% set usageFormatsCode %}
# Use only a subset of template types
npx @awesome.me/buildawesome --formats=md,html,ejs

# Don’t process any formats
npx @awesome.me/buildawesome --formats=

# Find out the most up-to-date list of commands (there are more)
npx @awesome.me/buildawesome --help
{% endset %}
<seven-minute-tabs class="tabs-flush tabs-right" persist sync autoheight>
	<div role="tablist" aria-label="Choose your Package Manager">
		<a href="#usage-formats-npm" role="tab" data-tabs-persist="pkgmgr:npm">npm</a>
		<a href="#usage-formats-pnpm" role="tab" data-tabs-persist="pkgmgr:pnpm">pnpm</a>
		<a href="#usage-formats-yarn" role="tab" data-tabs-persist="pkgmgr:yarn">yarn</a>
	</div>
	<div id="usage-formats-npm" role="tabpanel">{{ usageFormatsCode | packageManagerCodeTransform("npm") | highlight("bash") | safe }}</div>
	<div id="usage-formats-pnpm" role="tabpanel">{{ usageFormatsCode | packageManagerCodeTransform("pnpm") | highlight("bash") | safe }}</div>
	<div id="usage-formats-yarn" role="tabpanel">{{ usageFormatsCode | packageManagerCodeTransform("yarn") | highlight("bash") | safe }}</div>
</seven-minute-tabs>

* The default for `--formats=` changed in {{ "3.0.0-alpha.7" | coerceVersion }} from an alias of `*` to an empty set.

### Build when you save

{% set usageServeCode %}
# Add a web server to apply changes and
# refresh automatically. We’ll also --watch for you.
npx @awesome.me/buildawesome --serve

# Change the web server’s port—use localhost:8081
npx @awesome.me/buildawesome --serve --port=8081

# Watch and re-run when files change, without the web server.
npx @awesome.me/buildawesome --watch
{% endset %}
<seven-minute-tabs class="tabs-flush tabs-right" persist sync autoheight>
	<div role="tablist" aria-label="Choose your Package Manager">
		<a href="#usage-serve-npm" role="tab" data-tabs-persist="pkgmgr:npm">npm</a>
		<a href="#usage-serve-pnpm" role="tab" data-tabs-persist="pkgmgr:pnpm">pnpm</a>
		<a href="#usage-serve-yarn" role="tab" data-tabs-persist="pkgmgr:yarn">yarn</a>
	</div>
	<div id="usage-serve-npm" role="tabpanel">{{ usageServeCode | packageManagerCodeTransform("npm") | highlight("bash") | safe }}</div>
	<div id="usage-serve-pnpm" role="tabpanel">{{ usageServeCode | packageManagerCodeTransform("pnpm") | highlight("bash") | safe }}</div>
	<div id="usage-serve-yarn" role="tabpanel">{{ usageServeCode | packageManagerCodeTransform("yarn") | highlight("bash") | safe }}</div>
</seven-minute-tabs>

### `--quiet` if the Output is Too Noisy

{% set usageQuietCode %}
# Shhhhh—Don’t log so much to the console
npx @awesome.me/buildawesome --quiet
{% endset %}
<seven-minute-tabs class="tabs-flush tabs-right" persist sync autoheight>
	<div role="tablist" aria-label="Choose your Package Manager">
		<a href="#usage-quiet-npm" role="tab" data-tabs-persist="pkgmgr:npm">npm</a>
		<a href="#usage-quiet-pnpm" role="tab" data-tabs-persist="pkgmgr:pnpm">pnpm</a>
		<a href="#usage-quiet-yarn" role="tab" data-tabs-persist="pkgmgr:yarn">yarn</a>
	</div>
	<div id="usage-quiet-npm" role="tabpanel">{{ usageQuietCode | packageManagerCodeTransform("npm") | highlight("bash") | safe }}</div>
	<div id="usage-quiet-pnpm" role="tabpanel">{{ usageQuietCode | packageManagerCodeTransform("pnpm") | highlight("bash") | safe }}</div>
	<div id="usage-quiet-yarn" role="tabpanel">{{ usageQuietCode | packageManagerCodeTransform("yarn") | highlight("bash") | safe }}</div>
</seven-minute-tabs>

### `--dryrun` to do a Little Testing

Runs without writing to the file system. Useful when [debugging](/docs/debugging/).

{% set usageDryCode %}
# Run but don’t write any files
npx @awesome.me/buildawesome --dryrun
{% endset %}
<seven-minute-tabs class="tabs-flush tabs-right" persist sync autoheight>
	<div role="tablist" aria-label="Choose your Package Manager">
		<a href="#usage-dry-npm" role="tab" data-tabs-persist="pkgmgr:npm">npm</a>
		<a href="#usage-dry-pnpm" role="tab" data-tabs-persist="pkgmgr:pnpm">pnpm</a>
		<a href="#usage-dry-yarn" role="tab" data-tabs-persist="pkgmgr:yarn">yarn</a>
	</div>
	<div id="usage-dry-npm" role="tabpanel">{{ usageDryCode | packageManagerCodeTransform("npm") | highlight("bash") | safe }}</div>
	<div id="usage-dry-pnpm" role="tabpanel">{{ usageDryCode | packageManagerCodeTransform("pnpm") | highlight("bash") | safe }}</div>
	<div id="usage-dry-yarn" role="tabpanel">{{ usageDryCode | packageManagerCodeTransform("yarn") | highlight("bash") | safe }}</div>
</seven-minute-tabs>

### `--config` to Change the Config file name

{% set usageCfgCode %}
# Override the default configuration filename (buildawesome.config.js)
npx @awesome.me/buildawesome --config=myconfig.js
{% endset %}
<seven-minute-tabs class="tabs-flush tabs-right" persist sync autoheight>
	<div role="tablist" aria-label="Choose your Package Manager">
		<a href="#usage-cfg-npm" role="tab" data-tabs-persist="pkgmgr:npm">npm</a>
		<a href="#usage-cfg-pnpm" role="tab" data-tabs-persist="pkgmgr:pnpm">pnpm</a>
		<a href="#usage-cfg-yarn" role="tab" data-tabs-persist="pkgmgr:yarn">yarn</a>
	</div>
	<div id="usage-cfg-npm" role="tabpanel">{{ usageCfgCode | packageManagerCodeTransform("npm") | highlight("bash") | safe }}</div>
	<div id="usage-cfg-pnpm" role="tabpanel">{{ usageCfgCode | packageManagerCodeTransform("pnpm") | highlight("bash") | safe }}</div>
	<div id="usage-cfg-yarn" role="tabpanel">{{ usageCfgCode | packageManagerCodeTransform("yarn") | highlight("bash") | safe }}</div>
</seven-minute-tabs>

Read more about [Configuration files](/docs/config.md).

{% addedin "v3.0.0-alpha.18" %}If your specified `--config` file does not exist, Build Awesome will throw an error.

### `--to` can output JSON {% addedin "1.0.0" %}

{% set usageJsonCode %}
# Output a JSON structure (does not write to the file system)
npx @awesome.me/buildawesome --to=json

# Default behavior (Output to file system)
npx @awesome.me/buildawesome --to=fs
{% endset %}
<seven-minute-tabs class="tabs-flush tabs-right" persist sync autoheight>
	<div role="tablist" aria-label="Choose your Package Manager">
		<a href="#usage-json-npm" role="tab" data-tabs-persist="pkgmgr:npm">npm</a>
		<a href="#usage-json-pnpm" role="tab" data-tabs-persist="pkgmgr:pnpm">pnpm</a>
		<a href="#usage-json-yarn" role="tab" data-tabs-persist="pkgmgr:yarn">yarn</a>
	</div>
	<div id="usage-json-npm" role="tabpanel">{{ usageJsonCode | packageManagerCodeTransform("npm") | highlight("bash") | safe }}</div>
	<div id="usage-json-pnpm" role="tabpanel">{{ usageJsonCode | packageManagerCodeTransform("pnpm") | highlight("bash") | safe }}</div>
	<div id="usage-json-yarn" role="tabpanel">{{ usageJsonCode | packageManagerCodeTransform("yarn") | highlight("bash") | safe }}</div>
</seven-minute-tabs>

### `--incremental` for Partial Incremental Builds

{% set usageIncrementalCode %}
# *Repeat* builds only operate on files that have changed
npx @awesome.me/buildawesome --watch --incremental
npx @awesome.me/buildawesome --serve --incremental

# Skip the initial full build with `--ignore-initial`
npx @awesome.me/buildawesome --serve --incremental --ignore-initial

# Pass in a template path, watch/serve not required
# Added in {{ "3.0.0-alpha.14" | coerceVersion }}
npx @awesome.me/buildawesome --incremental=myfile.md
{% endset %}
<seven-minute-tabs class="tabs-flush tabs-right" persist sync autoheight>
	<div role="tablist" aria-label="Choose your Package Manager">
		<a href="#usage-inc-npm" role="tab" data-tabs-persist="pkgmgr:npm">npm</a>
		<a href="#usage-inc-pnpm" role="tab" data-tabs-persist="pkgmgr:pnpm">pnpm</a>
		<a href="#usage-inc-yarn" role="tab" data-tabs-persist="pkgmgr:yarn">yarn</a>
	</div>
	<div id="usage-inc-npm" role="tabpanel">{{ usageIncrementalCode | packageManagerCodeTransform("npm") | highlight("bash") | safe }}</div>
	<div id="usage-inc-pnpm" role="tabpanel">{{ usageIncrementalCode | packageManagerCodeTransform("pnpm") | highlight("bash") | safe }}</div>
	<div id="usage-inc-yarn" role="tabpanel">{{ usageIncrementalCode | packageManagerCodeTransform("yarn") | highlight("bash") | safe }}</div>
</seven-minute-tabs>

Read more about [incremental builds](/docs/usage/incremental/). Related [GitHub #3324](https://github.com/11ty/eleventy/issues/3324)

### `--ignore-initial` to skip the Initial Build {% addedin "2.0.0-canary.25" %}

Be wary of any file changes that happened while Build Awesome wasn’t running!

{% set usageInitialCode %}
# Don’t build when Build Awesome starts, only listen for future file changes
npx @awesome.me/buildawesome --watch --ignore-initial
npx @awesome.me/buildawesome --serve --ignore-initial

# Works great with Incremental
npx @awesome.me/buildawesome --serve --incremental --ignore-initial
{% endset %}
<seven-minute-tabs class="tabs-flush tabs-right" persist sync autoheight>
	<div role="tablist" aria-label="Choose your Package Manager">
		<a href="#usage-initial-npm" role="tab" data-tabs-persist="pkgmgr:npm">npm</a>
		<a href="#usage-initial-pnpm" role="tab" data-tabs-persist="pkgmgr:pnpm">pnpm</a>
		<a href="#usage-initial-yarn" role="tab" data-tabs-persist="pkgmgr:yarn">yarn</a>
	</div>
	<div id="usage-initial-npm" role="tabpanel">{{ usageInitialCode | packageManagerCodeTransform("npm") | highlight("bash") | safe }}</div>
	<div id="usage-initial-pnpm" role="tabpanel">{{ usageInitialCode | packageManagerCodeTransform("pnpm") | highlight("bash") | safe }}</div>
	<div id="usage-initial-yarn" role="tabpanel">{{ usageInitialCode | packageManagerCodeTransform("yarn") | highlight("bash") | safe }}</div>
</seven-minute-tabs>

### Deeper insight into Internals

You can use the `DEBUG` [environment variable](./environment-vars.md) to enable the [special debug log output](./debugging.md), allowing deeper insight into Build Awesome’s internals. For simplicity this example is using the [`cross-env`](https://github.com/kentcdodds/cross-env) package.

<seven-minute-tabs class="tabs-flush tabs-right" persist sync autoheight>
	<div role="tablist" aria-label="Choose your Package Manager">
		<a href="#usage-debugging-npm" role="tab" data-tabs-persist="pkgmgr:npm">npm</a>
		<a href="#usage-debugging-pnpm" role="tab" data-tabs-persist="pkgmgr:pnpm">pnpm</a>
		<a href="#usage-debugging-yarn" role="tab" data-tabs-persist="pkgmgr:yarn">yarn</a>
	</div>
	<div id="usage-debugging-npm" role="tabpanel">{{ "npx cross-env DEBUG=BuildAwesome:\* npx @awesome.me/buildawesome --dryrun" | highlight("bash") | safe }}</div>
	<div id="usage-debugging-pnpm" role="tabpanel">{{ "pnpm exec cross-env DEBUG=BuildAwesome:\* pnpm exec @awesome.me/buildawesome --dryrun" | highlight("bash") | safe }}</div>
	<div id="usage-debugging-yarn" role="tabpanel">{{ "yarn exec cross-env DEBUG=BuildAwesome:\* yarn exec @awesome.me/buildawesome --dryrun" | highlight("bash") | safe }}</div>
</seven-minute-tabs>

Learn more about [Debug Mode log output](./debugging.md).

### Using the Same Input and Output

Yes, you can use the same `input` and `output` directories, like so:

{% set usageSameDirsCode %}
# Parse and write Markdown to HTML, respecting directory structure.
npx @awesome.me/buildawesome --input=. --output=. --formats=md
{% endset %}
<seven-minute-tabs class="tabs-flush tabs-right" persist sync autoheight>
	<div role="tablist" aria-label="Choose your Package Manager">
		<a href="#usage-same-npm" role="tab" data-tabs-persist="pkgmgr:npm">npm</a>
		<a href="#usage-same-pnpm" role="tab" data-tabs-persist="pkgmgr:pnpm">pnpm</a>
		<a href="#usage-same-yarn" role="tab" data-tabs-persist="pkgmgr:yarn">yarn</a>
	</div>
	<div id="usage-same-npm" role="tabpanel">{{ usageSameDirsCode | packageManagerCodeTransform("npm") | highlight("bash") | safe }}</div>
	<div id="usage-same-pnpm" role="tabpanel">{{ usageSameDirsCode | packageManagerCodeTransform("pnpm") | highlight("bash") | safe }}</div>
	<div id="usage-same-yarn" role="tabpanel">{{ usageSameDirsCode | packageManagerCodeTransform("yarn") | highlight("bash") | safe }}</div>
</seven-minute-tabs>

{% callout "warn" %}Careful with <code>--formats=html</code> here! If you run Build Awesome more than once, we will attempt to process your new output files as input files (which will throw errors). Read more at the <a href="/docs/languages/html/#using-the-same-input-and-output-directories">HTML template docs</a>.{% endcallout %}

<!--
### Example: Process a Single File

```bash
npx @awesome.me/buildawesome --input=README.md --output=.
```

Writes to `./README/index.html`.
-->
