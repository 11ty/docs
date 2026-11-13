---
eleventyNavigation:
  parent: Eleventy Projects
  key: Configure Templates with Data
  order: 1
---

# Configure your Templates

There are a few special data keys you can assign in your data to control how templates behave. These can live anywhere in the [Data Cascade](/docs/data-cascade/) except as computed data. The only special key you can [define in computed data is `permalink`](/docs/data-computed/#advanced-details).

- `permalink`: Change the output target of the current template. Normally, you cannot use template syntax to reference other variables in your data, but `permalink` is an exception. [Read more about Permalinks](/docs/permalinks/).
- `layout`: Wrap current template with a layout template found in the `_includes` folder. [Read more about Layouts](/docs/layouts/).
- `pagination`: Enable to iterate over data. Output multiple HTML files from a single template. [Read more about Pagination](/docs/pagination/).
- `tags`: A single string or array that identifies that a piece of content is part of a collection. Collections can be reused in any other template. [Read more about Collections](/docs/collections/).
- `date`: Override the default date (file creation) to customize how the file is sorted in a collection. [Read more at Content Dates](/docs/dates/).
- `templateEngineOverride`: Override the template engine on a per-file basis. [Read more about Changing a Template’s Rendering Engine](/docs/template-overrides/). [_This option only works in Front Matter ⚠️ (for now), read Issue #445_](https://github.com/11ty/eleventy/issues/445).
- `eleventyExcludeFromCollections`: {% addedin "0.8.0" %} Set to `true` to exclude this content from any and all [Collections](/docs/collections/) (those tagged in data or setup using the Configuration API).
- `eleventyComputed`: {% addedin "0.11.0" %} Programmatically set data values based on other values in your data cascade. Read more about [Computed Data](/docs/data-computed/).
- `eleventyDataSchema`: Used to [validate data](/docs/data-validate/) in the data cascade.
- `eleventyNavigation`: Used by the [Navigation plugin](/docs/plugins/navigation/#adding-templates-to-the-navigation).

## Advanced

- `eleventyImport`
  - `eleventyImport.collections`: {% addedin "2.0.0-canary.21" %} An Array of collection names used to inform template dependencies for incremental builds and to render templates in the correct order. Read more on the [collections documentation](/docs/collections/#declare-your-collections-for-incremental-builds).
- `dynamicPermalink`: Option to disable template syntax for the `permalink` key. Read more about [disabling dynamic permalinks](/docs/permalinks/#disable-templating-in-permalinks).
- `permalinkBypassOutputDir`: Write a file to somewhere other than the output directory. Read more about [bypassing the output directory](/docs/permalinks/#ignore-the-output-directory)
