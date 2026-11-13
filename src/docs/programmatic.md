---
eleventyNavigation:
  parent: Advanced
  key: Programmatic API
  order: 1
---

# Programmatic API {% addedin "1.0.0" %}<!-- Beta 10 or Canary 50 -->

You can run Eleventy in any arbitrary Node script.

## Write to the file system

Don’t forget to [install Eleventy into your local project first](/docs/#step-2-install-eleventy)!

Now create a file called `my-node-script.js` with the following contents:

{% include "snippets/programmatic/node-script.njk" %}

Then run your new script from the command line.

```
node my-node-script.js
```

## Don’t write to the file system

Using `.write()` will write your output to the file system. If, instead, you want to retrieve the content programmatically without writing, use `.toJSON()` or `.toNDJSON()`.

### JSON Output

{% include "snippets/programmatic/json-out.njk" %}

#### Adding data to JSON output

You can use the `eleventyConfig.dataFilterSelectors` configuration API `Set` to add or remove lodash-style selectors for Data Cascade entries to be included in individual entries from the `toJSON` method.

{% include "snippets/programmatic/json-out-data.njk" %}

### ndjson Output

{% include "snippets/programmatic/ndjson-out.njk" %}

## Changing the Input and Output Directories

The first argument is the input directory. The second argument is the output directory.

{% include "snippets/programmatic/chdirs.njk" %}

## Full Options List

The third argument to Eleventy is an options object.

_(This documentation section is a work in progress but [you’re welcome to dig into the `Eleventy` class source code in `{% latestVersion versions, config %}` to learn more](https://github.com/11ty/eleventy/blob/{% latestVersion versions, config %}/src/Eleventy.js))_

{% include "snippets/programmatic/fullopts.njk" %}
