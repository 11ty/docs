---
eleventyNavigation:
  parent: Command Line Usage
  key: Incremental
  order: 1
permalink: /docs/usage/incremental/
excludeFromSidebar: true
---

# Incremental Builds

Incremental builds via the command line flag `--incremental` perform a partial build operating only on files that have changed to improve build times when doing local development.

Let’s check in on the current capabilities and the roadmap:

- **Templates** (Incremental template builds):
  - If you create/update a template file, Eleventy will run the build for that file and only that file.
  - **Layouts** {% addedin "2.0.0-canary.21" %}: When you change a layout file, any templates using that layout file are rebuilt.
  - **Template Dependencies** {% addedin "2.0.0-canary.19" %}Any templates using a dependency mapped via [the `addDependencies` method](/docs/languages/custom/#registering-dependencies) will be rebuilt when those dependencies change.
    - {% addedin "1.0.0" %}This feature was previously exposed as part of the API for [Custom template extensions](/docs/languages/custom/#is-incremental-match) via the `isIncrementalMatch` function.
    - _Exceptions for Includes_: If the created/updated file is in your [Includes](/docs/config/#directory-for-includes) or [Layouts](</docs/config/#directory-for-layouts-optional>) directories, a full build will run (unless a known Eleventy layout file {% addedin "2.0.0-canary.21" %}).
  - **Collections** {% addedin "2.0.0-canary.21" %}: When you add or delete a tag from a template, any templates using that collection tag (as declared by [`pagination.data`](/docs/pagination/) or [`eleventyImport.collections`](/docs/collections/#declare-your-collections-for-incremental-builds)) will be rebuilt.
- [**Passthrough Copy**](/docs/copy/) (Incremental passthrough copy) {% addedin "0.11.0" %}:
	- Only copy a passthrough copy file when it actively changed. Don’t run a template or full build if only a passthrough copy file has changed.
	- When running a template build, skip the passthrough copy step.
  - {% addedin "2.0.0-canary.12" %} [Passthrough copy can be emulated during `--serve`](/docs/copy/#passthrough-during-serve) to speed up both incremental and non-incremental builds. It was decided not to ship incremental passthrough copy as the default behavior ([#1109](https://github.com/11ty/eleventy/issues/1109)), instead deferring to this emulated copy feature.
- **Configuration File**
  - If you create/update your Eleventy configuration file, a full build will run.
- **Don’t build on startup**: {% addedin "2.0.0-canary.25" %} [`--ignore-initial`](/docs/usage/#ignore-initial-to-run-eleventy-without-an-initial-build) was added and works great with `--incremental`.
- **Explicit Incremental** {% addedin "3.0.0-alpha.14" %} Pass in a filename to only build an incremental for one file (and it’s dependencies) with `--incremental=filename` (more in [#3324](https://github.com/11ty/buildawesome/issues/3324))
	- {% addedin "4.0.0-alpha.8" %}Added support for multiple incremental files (also called **Batched Incremental**) with `--incremental=file1 --incremental=file2` or `--incremental=file1,file2` (more in [#4274](https://github.com/11ty/buildawesome/issues/4274))

## Additional Template Syntax Specific Features

The previously stated incremental features are implemented in Eleventy core and are available to all template languages. Some template types offer additional `--incremental` build support:

- [WebC](/docs/languages/webc/): deep knowledge of the full component dependency graph allows us to smartly build templates that use a component when that component is changed.

## 🗓 To Do

- **Cold Start Incremental**: `--incremental` does a full build to start out to provide a fresh starting point to work from. This feature would save the state of the build to the file system for faster cold starts. [#984](https://github.com/11ty/eleventy/issues/984)
- **Incremental on a Build Server**: Cache the output folder between builds on a CI server like Netlify and only process/write templates that have changed since the last build. [#2775](https://github.com/11ty/eleventy/issues/2775)
- Global/directory/template Data file usage mapped to templates [#2706](https://github.com/11ty/eleventy/issues/2706)
- Template types
  - `11ty.js`: Map JavaScript dependencies
  - `liquid`: Dependency mapping for Liquid templates (`{% raw %}{% include %}{% endraw %}`, etc)
  - `njk` Dependency mapping for Nunjucks templates (`{% raw %}{% include %}{% endraw %}`, etc): more at [Issue #3804](https://github.com/11ty/buildawesome/issues/3804)
- Collections dependencies improvements: while we have `eleventyImport.collections` to declaratively log collections dependencies, we may be able to dive deeper into template syntax APIs to find the symbols in use. [#1615](https://github.com/11ty/eleventy/issues/1615) Alternatively we may be able to change the collections API to use Proxies to get smarter about this in an easier way (though previous experiments with this for `eleventyComputed` failed in some languages).
- [Render plugin](/docs/plugins/render/): `{% raw %}{% renderFile %}{% endraw %}` dependencies
- _Stretch goal_: Pagination-level incremental that operates on a subset of data [#1087](https://github.com/11ty/eleventy/issues/1087)
