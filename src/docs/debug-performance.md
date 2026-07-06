---
eleventyNavigation:
  parent: Command Line Usage
  key: Analyzing Build Performance
  excerpt: How to analyze your Eleventy build to find bottlenecks.
excludeFromSidebar: true
---
# Analyzing Build Performance

{% tableofcontents "open" %}

{% callout "info", "md" %}Check out the [common recommendations for projects to improve their build performance](/docs/performance/#performance-tips).{% endcallout %}

## Warnings

Eleventy (by default) will warn you if certain pieces of your build take longer than 8% of your total build time. This list includes:

- [Filters/Helpers/11ty.js JavaScript Functions](/docs/filters/)
- [Shortcodes](/docs/shortcodes/)
- [Data Files](/docs/data/)
- Resolving `--watch` Dependencies (not subject to the 8% rule—these only show if longer than `500ms` as watch tasks are not counted as part of the traditional build time)

This list is not considered to be exhaustive. It’s just what has been implemented thus far!

## Show Debug Measurements

{% callout "info" %}You’ll probably want to read the <a href="/docs/debugging/">Debug mode documentation</a> before continuing here.{% endcallout %}

{% addedin "0.11.0" %} You can use the following `debug` command to show performance measurements for all of these entries (not just those that take longer than 8%).

Learn more about [environment variables for debug output](/docs/debugging/#commands).

### macOS or Linux (et al)

```bash
DEBUG=Eleventy:Benchmark* npx @11ty/eleventy
```

### Windows

```bash
set DEBUG=Eleventy:Benchmark* & npx @11ty/eleventy
```

### Aggregate Benchmarks

We also have a special category of aggregate benchmarks to do higher level analysis. Look for entries like:

```
Benchmark (Aggregate): Searching the file system took 40ms (0.5%, called 2×, 19.9ms each) +0ms
Benchmark (Aggregate): Data File took 134ms (1.8%, called 405×, 0.3ms each) +0ms
Benchmark (Aggregate): Template Read took 682ms (9.0%, called 600×, 1.1ms each) +0ms
Benchmark (Aggregate): Passthrough Copy File took 924ms (12.2%, called 669×, 1.4ms each) +0ms
Benchmark (Aggregate): Template Compile took 366ms (4.8%, called 1526×, 0.2ms each) +0ms
Benchmark (Aggregate): Template Render took 1215ms (16.1%, called 949×, 1.3ms each) +0ms
Benchmark (Aggregate): Template Write took 2088ms (27.6%, called 312×, 6.7ms each) +0ms
```

Note that while we do make every attempt to make these as accurate as possible, the percentages for these entries may be greater than 100% due to the asynchronous nature of these tasks (passthrough copy especially).

## Node.js CPU Profiling <span id="node-js-profiling"></span>

The most reliable mechanism for tracking down performance issues in any Node.js based code is to use Node’s built-in [CPU Profiling](https://nodejs.org/docs/latest/api/cli.html#--cpu-prof) feature (Node v12+). You can run Node with the `--cpu-prof` argument and point to the Eleventy bin like so (noting that `--quiet` is an Eleventy CLI argument and you can add any others there too):

```sh
# Instead of:
# npx @11ty/eleventy --quiet

# Use this:
npx --node-options="--cpu-prof" @11ty/eleventy --quiet

# Alternatively, you can try this:
# node --cpu-prof ./node_modules/.bin/eleventy --quiet
```

This will write a `CPU.***.cpuprofile` file to the same directory.

[SpeedScope](https://www.speedscope.app/) is a great website that will help you look at a visual representation of this data, with a special nod to the `Left Heavy` and `Sandwich` visuals!