---
eleventyNavigation:
  parent: Advanced
  key: Programmatic API
  order: 1
---

# Programmatic API {% addedin "1.0.0" %}<!-- Beta 10 or Canary 50 -->

{% tableofcontents %}

You can run Build Awesome in any arbitrary Node script.

## Write to the file system

Don’t forget to [install Build Awesome into your local project first](/docs/step-2-install-build-awesome)!

Now create a file called `my-node-script.js` with the following contents:

{% include "snippets/programmatic/node-script.njk" %}

Then run your new script from the command line.

```
node my-node-script.js
```

## Don’t write to the file system

Using `.write()` will write your output to the file system. If, instead, you want to retrieve the content programmatically without writing, use `.toJSON()`.

### JSON Output

{% include "snippets/programmatic/json-out.njk" %}

#### Adding data to JSON output

You can use the `$config.dataFilterSelectors` configuration API `Set` instance to add or remove lodash-style selectors for Data Cascade entries to be included in individual entries from the `toJSON` method.

{% include "snippets/programmatic/json-out-data.njk" %}

## Changing the Input and Output Directories

The first argument is the input directory. The second argument is the output directory.

{% include "snippets/programmatic/chdirs.njk" %}

## Full Options List

The third argument to Build Awesome is an options object.

_(This documentation section is a work in progress but [you’re welcome to dig into the `Core` class source code in `{% latestVersion versions, config %}` to learn more](https://github.com/11ty/buildawesome/blob/{% latestVersion versions, config %}/src/Core.js))_

{% include "snippets/programmatic/fullopts.njk" %}
