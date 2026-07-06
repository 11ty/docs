---
eleventyNavigation:
  parent: Learn
  key: Glossary
  pinned: true
---

# Glossary

This page provides two lists of terms — one for [Eleventy-specific terminology](#eleventy-specific-terminology) that may be useful for when building out a project using Eleventy, and one for [industry jargon](#industry-terms-and-buzzwords) that may be useful for understanding context.

_Work in progress: {% include "edit-on-github.njk" %}_

## Eleventy-Specific Terminology

### Template

A content file written in a [format such as Markdown, HTML, Liquid, Nunjucks, and more](/docs/languages/), which Eleventy transforms into a page (or pages) in the built site. Templates can access [data](#data) exposed through the [data cascade](#data-cascade) with templating syntax.

### Layout

A template which wraps around another template, typically to provide the scaffolding markup for content to sit in.

[Read more about using layouts.](/docs/layouts/)

### Data

Exposed via variables that can be used inside [templates](#template) and [layouts](#layout) using templating syntax. The data for a given template is aggregated through a process called the [data cascade](#data-cascade).

### Data Cascade

Eleventy's order of operations for evaluating all [data](#data) for any given [template](#template), and for resolving conflicts that arise. The data cascade follows the principle of colocation, so data defined broadly to apply to many templates will be overruled by data that targets the given template more specifically.

[Read more about the data cascade.](/docs/data-cascade/)

### Filter

A function which can be used within templating syntax to transform [data](#data) into a more presentable format. Filters are typically designed to be chained, so that the value returned from one filter is piped into the next filter.

[Read more about filters.](/docs/filters/)

### Shortcode

A function which can be used within templating syntax to inject content into templates. Shortcodes can take many arguments, and can be thought of as a templating approach to reusable markup.

[Read more about shortcodes.](/docs/shortcodes/)

### Collection

An array of [templates](#template), used to group similar content. Collections can be created by using [tags](/docs/collections/#add-to-a-collection-using-tags) or by calling the [collections API in the Eleventy configuration](/docs/collections/#advanced-custom-filtering-and-sorting).

[Read more about collections.](/docs/collections/)

### Pagination

A way to create pages by iterating over data. The same template is applied to each chunk of the paginated data.

[Read more about pagination.](/docs/pagination/)

### Plugin

A portable, installable Eleventy configuration which can add [data](#data), [filters](#filter), [shortcodes](#shortcode), and more to a project's setup.

[Read more about plugins.](/docs/plugins/)

## Industry Terms and Buzzwords

Bask in the warm glow of this _“Nobody ever got fired for buying IBM”_-style feel-good industry jargon.

Our industry can be particularly bad about inventing words for things that already exist. Hopefully this page will help you navigate the labyrinth.

### Static Sites

A static site is a group of generated HTML files. Content is built into the HTML files rather than using a dynamic back end language to generate the content on-the-fly. A dynamic site can appear static when you add caching rules to make the content stickier. A static site can appear dynamic when you run your build quickly and often.

### Jamstack

> Modern web development architecture based on client-side JavaScript, reusable APIs, and prebuilt Markup.—[jamstack.org](https://jamstack.org/)

Eleventy facilitates Jamstack sites—but you maintain full control over the JavaScript.

### Progressive Enhancement

<!-- You’re safe here. But a static site generator that is Progressive Enhancement friendly is only the beginning. -->

The idea that _content_ should be the priority for a website's development. In other words, start with only essential content and functionality that works with as many users as possible, and then progressively enhance from there.

As stated in the [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Glossary/Progressive_Enhancement): "Special notice should be taken of accessibility. Acceptable alternatives should be provided where possible."

### Data-Driven

Make components and markup data-driven so that you don’t have a bunch of one-off copy-pasted HTML instances littered throughout your project.

### Serverless Friendly

> “You can take your front-end skills and do things that typically only a back-end can do. You can write a JavaScript function that you run and receive a response from by hitting a URL.”—[The Power of Serverless](https://serverless.css-tricks.com/) from [Chris Coyier](https://chriscoyier.net/)

Take care to make sure that <span class="buzzword">serverless</span> functions are <span class="buzzword">progressively enhanced</span>. If you call <span class="buzzword">serverless</span> functions in client-side JavaScript, they should be used for features that are outside the core functionality of the site.

### Lean Web

To be honest it’s kind of a stretch to relate Lean methodology to this project but the term just kinda feels right.

### Zero Config

Zero config means that Eleventy can run without any command line parameters or configuration files.

We’ve taken care to setup Eleventy so that that running the stock `eleventy` command uses sensible defaults. Lower the barrier to entry for that first project build to get up and running faster.

### Convention over Configuration Routing

Can you believe that some frameworks require a centralized piece of configuration for routing? `eleventy` routes map the file system, unless you override with a `permalink`.

### Pre-rendered Templates by Default

With the rise of client side rendering of templates in JavaScript came significant performance problems, especially with users of less-capable (but none-the-less still modern) hardware. Did you know they’re selling new mobile devices that are pretty hardware-limited?

Many frameworks switched to Server Side Rendering, which meant running an application server with middleware that would render the markup on demand for each request. Eleventy templates by default are generated (some call this pre-rendering) at build time for maximum performance. This way the web server only needs to fetch the static file and send it back to the user.

### Hydration-less

Well, uh, we don’t inject or use any client-side JavaScript in Eleventy, so there’s nothing that needs hydration.

### Apps not App Servers

Application servers can be slow. Instead of PHP, Java, or even Node.js dynamically generating page responses on the fly when the request comes in, have your pre-rendered templates ready to go for delivery! Maximum performance.

### Single Page Applications (SPA) versus Multi-Page Applications (MPA)

Single Page Applications (SPA) use JavaScript to enable navigations between pages on a website. Multi-Page Applications use the classic navigation model of the web and do a full page refresh to a new page.

Should you [build a Single Page Application with Eleventy](/docs/single-page-applications/)?

## Where did the Name Come From?

> Some might think that the name Eleventy is an homage to Spinal Tap (turn it up to eleven) or more directly, Lord of the Rings. I chose it because of a story my grandma Nonnie loved to tell about how I learned to count. Rather than move from ten to eleven like a normal child, I felt it appropriate to use the teen suffix for the numbers eleven and twelve, counting “ten, eleventy-teen, twelvety-teen, thirteen, …” I always liked that story and it seemed as appropriate a reason as any.—[via `zachleat.com`](https://www.zachleat.com/web/eleventy-birthday/#project-naming)

### What’s the difference between 11ty and Eleventy?

The `11ty` name refers to the over-arching organization and community. `Eleventy` refers to the static site generator specifically. —[via Issue #1283](https://github.com/11ty/eleventy/issues/1283#issuecomment-656708009)