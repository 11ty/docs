---
eleventyNavigation:
  parent: Advanced
  key: Programmatic API
  order: 1
---

# Programmatic API {% addedin "1.0.0" %}<!-- Beta 10 or Canary 50 -->

{% tableofcontents %}

Instead of running Build Awesome from the command line, you can import it and run it from any Node script — useful for custom build tooling, running Build Awesome as part of a larger process, or retrieving your rendered content as data without writing any files.

Don’t forget to [install Build Awesome into your local project first](/docs/#step-2-install-build-awesome)!

## Simplest

The constructor takes an options object and every property is optional.

{% include "snippets/programmatic/node-script.njk" %}

Then run your new script from the command line.

```
node my-node-script.js
```

`write()` is one of a few [build methods](#building-your-site) offered (`toJSON()` is also commonly used).

## Options

All configuration is passed through an `options` object and every property is optional.

| Option       | Type       | Default    | Description                                                                                                        |
| ------------ | ---------- | ---------- | ------------------------------------------------------------------------------------------------------------------ |
| `input`      | `string`   | `"."`      | The input directory (or a single input file). Mirrors the [`--input` CLI flag](/docs/usage/).                      |
| `output`     | `string`   | `"_site"`  | The output directory. Mirrors the [`--output` CLI flag](/docs/usage/).                                             |
| `configPath` | `string`   | _(none)_   | Path to a configuration file. Equivalent to the [`--config` CLI flag](/docs/usage/).                               |
| `config`     | `function` | _(none)_   | A [configuration callback](#the-config-callback) that receives the config API object. |
| `quietMode`  | `boolean`  | `false`    | When `true`, suppresses the build output logging. Equivalent to the [`--quiet` CLI flag](/docs/usage/).            |
| `dryRun`     | `boolean`  | `false`    | When `true`, runs a full build but does not write anything to the file system.                                     |
| `runMode`    | `string`   | `"build"`  | One of `"build"`, `"watch"`, or `"serve"`.                                                                          |
| `pathPrefix` | `string`   | `"/"`      | Prepends this value to all URLs. Equivalent to the [`--pathprefix` CLI option used with the HTML `<base>` plugin](/docs/plugins/html-base/).                         |
| `loader`     | `string`   | `"auto"`   | Force the module mode: `"esm"`, `"cjs"`, or `"auto"` (detected from your `package.json` `type`).                    |

{% include "snippets/programmatic/fullopts.njk" %}

{% callout "info", "md", "Backwards compatibility note" -%}
In previous versions, `input` and `output` were passed in as separate arguments (e.g. `new BuildAwesome(input, output, options)`). Starting with Build Awesome v4, the single `options` argument is now recommended. Feel free to browse the [v3 documentation for more information](https://v3.11ty.dev/docs/programmatic/).
{%- endcallout %}

### The `config` Callback

The `config` option is a function that receives the [Configuration API](/docs/config/) object, letting you configure Build Awesome inline without a separate config file:

Notably, the `config` callback does not replace your configuration file: both run. Importantly, they run in this order:

1. `config` callback function
1. `configPath` configuration file (can override things set in `config`)

{#
Missing from above:
- The default Build Awesome configuration file
- [`beforeConfig` event fires](/docs/events/#eleventy-before-config)
- Plugins
#}

## Building Your Project

Making a new instance of Build Awesome doesn’t process anything: you must call one of these methods to execute a build. Each returns a Promise, so use with `await` or `.then()`.

| Method          | Returns                              | Description                                                                    |
| --------------- | ------------------------------------ | ------------------------------------------------------------------------------ |
| `write()`       | `Promise<Array>`                     | Renders and writes output to the file system.     |
| `toJSON()`      | `Promise<Array>`                     | Renders and returns output as data (no files written). |
| `watch()`       | `Promise`                            | Runs an initial build, then rebuilds on file changes.                          |
| `serve(port)`   | `Promise`                            | Starts the [Dev Server](/docs/dev-server/) on the given port.                  |

### Write to the File System

Use `write()` to render your site and write the output files to the [output directory](#input-and-output-directories)—this is the same thing running Build Awesome [from the command line](/docs/usage/) does.

### Don’t Write to the File System

If you want to retrieve the rendered content programmatically _without_ writing anything to disk, use `toJSON()` (or the `dryRun` option documented above).

{% include "snippets/programmatic/json-out.njk" %}

`toJSON()` resolves to an array of entries, one per rendered output. Each entry includes:

| Property     | Description                                                                 |
| ------------ | --------------------------------------------------------------------------- |
| `inputPath`  | The template’s source path.                                                 |
| `outputPath` | Where the file _would_ be written on disk.                                  |
| `url`        | The output [URL](/docs/data-eleventy-supplied/#page-variable) for the page. |
| `content`    | The final rendered content.                                                 |
| `rawInput`   | The template’s raw (unrendered) input.                                      |
| `data`       | Selected [Data Cascade](/docs/data-cascade/) entries—only present when you add [data filter selectors](#adding-data-to-json-output). |

#### Adding data to JSON output

By default, the `data` property is not included in `toJSON` entries. Use the `$config.dataFilterSelectors` configuration API `Set` instance to add (or remove) lodash-style selectors for the Data Cascade entries you want included:

{% include "snippets/programmatic/json-out-data.njk" %}

## Advanced

### Setup Methods

In addition to the constructor `options`, you can configure an instance by calling these methods _before_ a build. Each corresponds to a command line flag.

| Method                        | Description                                                            |
| ----------------------------- | --------------------------------------------------------------------- |
| `setFormats(formats)`         | Comma-separated [template formats](/docs/usage/) (`--formats`) to process.          |
| `disableLogger()`             | Disable Build Awesome’s logging entirely.                             |

### Handling Errors

Wrap your build in a `try`/`catch` to handle errors yourself. When run programmatically (`source: "script"`, the default), Build Awesome throws on error rather than changing the process exit code, so it won’t exit your script for you.

### Full Options and Source

_(This documentation covers the most common options. For everything else, [dig into the `Core` class source code](https://github.com/11ty/buildawesome/blob/main/src/Core.js).)_
