---
eleventyNavigation:
  parent: Eleventy Projects
  key: Common Pitfalls
  order: 10
  excerpt: Some common problems that people run into.
---

# Common Pitfalls

- [I want to use the same Input and Output directory.](/docs/languages/html/#same-input-output)
- [When I display a date, it’s off by one day.](/docs/dates/#dates-off-by-one-day)
- [The browser is trying to download my files instead of displaying them.](</docs/permalinks/#remapping-output-(permalink)>) (If your `permalinks` don’t have a file name, make sure they at least have a trailing slash!)
- [Having trouble with my `permalink`, getting the error: `can not read a block mapping entry; a multiline key may not be an implicit key`](/docs/permalinks/#warning-about-yaml-objects)

## Template Syntax

- [Why can’t I return markdown from paired shortcodes to use in a markdown file?](/docs/languages/markdown/#why-cant-i-return-markdown-from-paired-shortcodes-to-use-in-a-markdown-file)
- [I’m porting from Jekyll and I want to use Quoted Include Paths in my Liquid Templates.](/docs/languages/liquid/#quoted-include-paths)
- [`{% raw %}{% set %}{% endraw %}` in Nunjucks does not work with Async Content](/docs/languages/nunjucks/#warning-the-set-tag-does-not-work-with-async-content)
- [I’m having trouble with modifying a `permalink` in a Pug template](/docs/permalinks/#disable-templating-in-permalinks)

## Collections

- [My collections are out of order because I’m using Array reverse() on the collections global](/docs/collections/#array-reverse)
- [My collections are out of order when I deploy on a server.](/docs/dates/#collections-out-of-order-when-you-run-eleventy-on-your-server)
