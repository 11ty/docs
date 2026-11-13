---
titleOverride: Migrating from WordPress to Eleventy
eleventyNavigation:
  parent: Importing Content
  key: Migrating from WordPress
iconUrl: https://wordpress.org
exportCommunityLinks:
  - url: https://tedium.co/2024/10/20/wordpress-cms-alternatives-content-strategy-advice/
    title: So, Your CMS Blew Up
    author: Ernie Smith
    date: 2024-10-20
  - url: https://evilgeniuschronicles.org/posts/2024/04/12/migrating-from-wordpress-to-eleventy/
    title: Migrating from WordPress to Eleventy
    author: Dave Slusher
    date: 2024-04-12
  - url: https://publishing-project.rivendellweb.net/migrating-from-wordpress-to-eleventy/
    title: Migrating from WordPress to Eleventy (Part 1 of 4)
    author: Carlos Araya
    date: 2023-11-06
  - url: https://publishing-project.rivendellweb.net/migrating-from-wordpress-to-eleventy-part-2/
    title: Migrating from WordPress to Eleventy (Part 2 of 4)
    author: Carlos Araya
    date: 2023-11-08
  - url: https://publishing-project.rivendellweb.net/migrating-from-wordpress-to-eleventy-part-3/
    title: Migrating from WordPress to Eleventy (Part 3 of 4)
    author: Carlos Araya
    date: 2023-11-20
  - url: https://publishing-project.rivendellweb.net/migrating-from-wordpress-to-eleventy-part-4/
    title: Migrating from WordPress to Eleventy (Part 4 of 4)
    author: Carlos Araya
    date: 2023-11-22
  - url: https://alex.zappa.dev/blog/migrating-from-wordpress-to-11ty-enhancing-website-performance-and-control/
    title: "Migrating from WordPress to 11ty: Enhancing Website Performance and Control"
    author: Alex Zappa
    date: 2023-08-13
  - url: https://lea.verou.me/blog/2023/preserve-disqus/
    title: Migrating Disqus from WP to 11ty
    author: Lea Verou
    date: 2023-07-18
  - url: https://chrissmith.xyz/blog/wordpress-to-eleventy-part-1-the-why/
    title: "WordPress to Eleventy - Part 1, The Why"
    author: Chris Smith
    date: 2023-06-18
  - url: https://chrissmith.xyz/blog/wordpress-to-eleventy-part-2-the-how/
    title: "WordPress to Eleventy - Part 2, The How"
    author: Chris Smith
    date: 2023-06-18
  - url: https://velvetcache.org/2023/04/05/moving-from-wordpress-to-11ty/
    title: "Moving from WordPress to 11ty"
    author: John Hobbs
    date: 2023-04-05
  - url: https://rknight.me/blog/note-on-migrating-wordpress-site-eleventy/
    title: "Notes on Migrating a WordPress Site to Eleventy"
    author: Robb Knight
    date: 2023-01-31
  - url: https://popularhistorybooks.com/https:/popularhistorybooks.com/posts/opinion/2022-03-29-post-migrating_from_wordp/
    title: "Migrating From WordPress to Eleventy - a non-developer's experience"
    author: Anthony Webb
    date: 2022-03-29

---
# Migrating from {% indieavatar iconUrl %}WordPress to Eleventy

## Use `@11ty/import`

Eleventy provides a command line tool to import various data sources to projects as static content files.

- [`11ty/eleventy-import` on GitHub](https://github.com/11ty/eleventy-import)

<div class="youtube-related">
  {%- youtubeEmbed "WuH5QYCdh6w", "Start Your Escape from WordPress Using 11ty (in 3 minutes!)" -%}
</div>

This importer accepts a number of different types of import sources—in this example we’ll use a WordPress blog home page URL. This will convert *all* of the posts (via the [WordPress REST API](https://developer.wordpress.org/rest-api/)) from that blog to static content files in your local project.

```sh
> npx @11ty/import wordpress https://example.com/
Wrote 141 documents and 810 assets (933 cleaned, unused) from WordPress (7 errors) in 2.14 seconds (v1.0.0)
```

The importer will:

1. Import the post content to the file system maintaining the same URL structure (change the root directory with `--output`)
1. Download all of the assets referenced in that content to your project (so that you can version them in `git`, for example) and change the reference URLs in the markup to point to those files.
1. Will _not_ overwriting existing content (unless using the `--overwrite` option) so that you can repeat the same import command to only fetch _new_ content.
1. All downloads are cached locally so that you can stop and resume a large import without losing your import progress (using the [Eleventy Fetch](/docs/plugins/fetch/) plugin).
1. Optionally convert the content to Markdown.

Try it out with `--dryrun` first to be safe!


## Alternatively, use a WordPress Export File <span id="using-a-wordpress-export-file"></span>

If you would like to permanently escape the WordPress ecosystem, you can do a [one-time export of your content](https://wordpress.com/support/export/) via the Admin panel of your WordPress site. At time of writing this feature exists in the WordPress sidebar in **Tools** → **Export** → **Export content** (section) → **Export all** (button).

This will create a compressed XML file with all of your posts (drafts included) for download. You can optionally also export your media library, but that is unnecessary for the purposes of this guide.

You can use [`lonekorean/wordpress-export-to-markdown`](https://github.com/lonekorean/wordpress-export-to-markdown) to convert your exported XML file to markdown files (or another similar tool). This tool will also download any media from your post and page content too.

Now you can place these markdown files in your Eleventy input directory and we’ll build them for you! If you use the [Image transform plugin, we’ll optimize your images automatically too](/docs/plugins/image/#eleventy-transform)!

### WordPress XML Export to Markdown Tools

* [`lonekorean/wordpress-export-to-markdown`](https://github.com/lonekorean/wordpress-export-to-markdown)
* [`jmhobbs/wp-to-11ty`](https://github.com/jmhobbs/wp-to-11ty)
* [`Swizec/wordpress-to-markdown`](https://github.com/Swizec/wordpress-to-markdown)

## Resources

_Resources via <strong><a href="https://11tybundle.dev/categories/migrating-to-eleventy/">11tybundle.dev (Migrating to Eleventy)</a></strong> curated by {% indieweblink "Bob Monsour", "https://www.bobmonsour.com/" %}._

<ul class="list-bare">
{%- for post in exportCommunityLinks %}
	<li><small><code>{{ post.date | newsDate("LLL yyyy") }}</code></small> <a href="{{ post.url }}">{% indieavatar post.url %}{{ post.title }}</a>{% if post.author %}—{{ post.author }}{% endif %}</li>
{%- endfor %}
</ul>