---
eleventyNavigation:
  parent: Services
  key: Using a CMS
  order: 2
cmses:
  - name: CloudCannon
    url: https://cloudcannon.com/eleventy-cms/?utm_campaign=11ty-partner&utm_source=official-sponsor
    tags: [Git-based]
  - name: GitCMS
    url: https://gitcms.blog/
    tags: [Git-based]
  - name: WordPress REST API
    url: https://developer.wordpress.org/rest-api/
    screenshotSize: medium
    tags: [API]
  - name: Strapi
    url: https://strapi.io/
    screenshotSize: medium
    tags: [API]
  - name: Contentful
    url: https://www.contentful.com/
    screenshotSize: medium
    tags: [API]
  - name: Sanity
    url: https://www.sanity.io/
    screenshotSize: medium
    tags: [API]
  - name: DatoCMS
    url: https://datocms.com/
    screenshotSize: medium
    tags: [API]
  - name: Notion
    url: https://developers.notion.com/
    screenshotSize: medium
    tags: [API]
  - name: DecapCMS
    url: https://decapcms.org/
    screenshotSize: medium
    tags: [Git-based]
  - name: Spinal
    url: https://spinalcms.com/
    screenshotSize: medium
    tags: [Git-based]
  - name: Wix Headless
    url: https://www.wix.com/developers/headless/
    tags: [API]
  - name: Storyblok
    url: https://www.storyblok.com/
    screenshotSize: medium
    tags: [API]
  - name: Webflow CMS
    url: https://webflow.com/cms
    tags: [API]
  - name: Prismic
    url: https://prismic.io/
    screenshotSize: medium
    tags: [API]
  - name: Ghost
    url: https://ghost.org/
    tags: [API]
  - name: Agility CMS
    url: https://agilitycms.com/
    screenshotSize: medium
    tags: [API]
  - name: Builder.io
    url: https://www.builder.io/
    screenshotSize: medium
    tags: [API]
  - name: Directus
    url: https://directus.io/
    screenshotSize: medium
    tags: [API]
  - name: Mattrbld
    url: https://mattrbld.com/
    screenshotSize: medium
    tags: [Git-based]
  - name: CraftCMS
    url: https://craftcms.com/
    screenshotSize: medium
    tags: [API]
  - name: Pages CMS
    url: https://pagescms.org/
    screenshotSize: medium
    tags: [Git-based]
---
# Using a CMS

{% tableofcontents %}

_Content Management Systems_ (CMS) add a web-based interface to your site, allowing both technical and non-technical folks the ability to easily update the website on-the-go.

Eleventy (like most site generators) is not tightly coupled to any specific CMS and offers the flexibility to work with a wide variety of available industry and community options! Content Management Systems decoupled in this way are known as _Headless_.

Using a Headless CMS offers a variety of benefits that will be immediately recognizable to developers familiar with more tightly-coupled/monolithic options, where the front and back-end are co-dependent on each other.

Primarily, using Headless allows developers more control over the front-end. This alleviates pressure on front-end performance and accessibility issues common to monolithic options. It’s worth noting that traditionally tightly-coupled solutions like Drupal, Joomla, or WordPress are also starting to offer Headless options too.

## Types of Headless

Digging deeper, there are two main types of Headless CMS options:

1. **Source Control**: checks files directly into your code repository (`git` is a very popular one). You may hear these referred to as Git-based CMS solutions. A few benefits of this approach:
   - Your data and content are already versioned.
   - Works as-is with your existing deployment process, including branch/test/pre-production deploy previews.
   - No data migration is needed if you decide to swap providers—it’s [baked in (not fried)](http://www.aaronsw.com/weblog/000404).
1. **API Based**: provide an external API that can be queried in your build or serverless functions. This approach gives you access to a powerful query language that can unlock access to complex data structures.

## Headless CMS Providers

<div class="sites-vert sites-vert--md sites--reverse sites--center">
  <div class="lo-grid" style="--fl-gap-v: 5em;">
{%- for site in cmses | shuffle %}
{% include "site-card.njk" %}
{%- endfor %}
  </div>
</div>

_The list above is not meant to be exhaustive._

## Resources

- [Migrating from WordPress to Eleventy](/docs/migrate/wordpress/) — or, you can keep using WordPress as a headless CMS, too!

<div class="youtube-related">
  {%- youtubeEmbed "WuH5QYCdh6w", "Start Your Escape from WordPress Using 11ty (in 3 minutes!)" -%}
</div>

### From the Community

<ul class="list-bare">
	<li>{% indieweblink "Headless CMS List on Jamstack.org", "https://jamstack.org/headless-cms/" %}</li>
	<li>{% indieweblink "YouTube: From Zero to CMS in 2 Minutes with CloudCannon and Eleventy", "https://www.youtube.com/watch?v=yXcxvBJuULU" %}</li>
	<li>{% indieweblink "How to get started with the 11ty (Eleventy) Blog Starter", "https://www.sanity.io/guides/how-to-get-started-with-the-11ty-eleventy-blog-starter" %}</li>
</ul>

{% include "11tybundle.njk" %}
