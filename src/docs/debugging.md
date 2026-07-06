---
eleventyNavigation:
  parent: Command Line Usage
  key: Debug Mode
  pinned: true
excludeFromSidebar: true
---

# Debug Mode

{% tableofcontents %}

Having trouble? Want to see what Eleventy is doing behind the scenes? Use `DEBUG` mode. We’re taking advantage of the [excellent `debug` package](https://www.npmjs.com/package/debug) for this.

`debug` will tell you exactly what directories Eleventy is using for data, includes, input, and output. It’ll tell you what search globs it uses to find your templates and what templates it finds. If you’re having trouble, enable this.

You can enable this feature by using the `DEBUG` [environment variable](/docs/environment-vars/). To do this we add some text before the command we use to run Eleventy.

## Commands

_The commands below assume that Eleventy is installed locally (recommended) but you can learn more about the difference between Local and [Global installation](/docs/global-installation/)._

### macOS or Linux (et al)

```sh
DEBUG=Eleventy* npx @11ty/eleventy
```

### Cross Platform

Use the [`cross-env` package](https://github.com/kentcdodds/cross-env) to compatibly set your environment variables cross-platform.

```sh
npm install cross-env
```

Now add an npm script in your `package.json`, unlocking `npm run debug`:

```json
{
	"scripts": {
		"debug": "cross-env DEBUG=Eleventy* npx @awesome.me/buildawesome"
	}
}
```

### Windows

Read more about [Windows environment variables](https://www.npmjs.com/package/debug#windows-command-prompt-notes).

#### cmd.exe

```sh
set DEBUG=Eleventy* & npx @11ty/eleventy
```

#### Powershell (default in VS Code)

```sh
$env:DEBUG="Eleventy*"; npx @11ty/eleventy
```

## Learn More

Read more at the [`debug` package documentation](https://www.npmjs.com/package/debug).

### Try with `--dryrun`

{% addedin "0.3.0" %} Works great with `--dryrun` if you want to run Eleventy but not actually write any files.

### View all messages

The commands above limit the messages from `debug` to Eleventy specific things with `DEBUG=Eleventy*` but you can view all of the messages from any dependency with `DEBUG=*`.

### Analyze Performance

{% addedin "0.11.0" %} Read more about how to [use `debug` to analyze the performance of your Eleventy build](/docs/debug-performance/).

## Debug individual variables

{% addedin "0.11.0" %} In addition to using `debug`, you can use the global filter [`log`](/docs/filters/log/) to `console.log` anything from inside a template file.
