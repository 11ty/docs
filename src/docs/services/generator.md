---
pageTitle: Generator Image
eleventyNavigation:
  key: Generator Image
  excerpt: Returns the site generator’s logo that was used to build a site at given URL.
  order: 3
communityLinksKey: api-generator
---

{% tableofcontents %}

A runtime service to return the image logo of the `<meta name="generator">` used on any given website. For example, if a website is built with Eleventy, this service will return the image logo for 11ty.

Supports: [11ty / Eleventy](/), [Hugo](https://gohugo.io/), [Gatsby](https://www.gatsbyjs.com/), [WordPress](https://wordpress.com/), [Silex](https://www.silex.me/), [Jekyll](https://jekyllrb.com/), [Docusaurus](https://docusaurus.io/), [Gridsome](https://gridsome.org/), [VuePress](https://vuepress.vuejs.org/), [Hexo](https://hexo.io/), [Astro](https://astro.build/).

- [`11ty/api-generator` on GitHub](https://github.com/11ty/api-generator)

## Usage

Image URLs have the format:

```
https://v1.generator.11ty.dev/image/:url/
```

- `url` must be URI encoded.

Or json:

```
https://v1.generator.11ty.dev/json/:url/
```

## Samples

- See the “Built With” column on [Speedlify (Website Generators)](https://www.speedlify.dev/ssg/)

{% callout "demo" %}

<img src="https://v1.generator.11ty.dev/image/https%3A%2F%2Fwww.11ty.dev%2F/" alt="Site Generator logo for 11ty.dev/" loading="lazy" decoding="async" width="40" height="40" eleventy:ignore>
<img src="https://v1.generator.11ty.dev/image/https%3A%2F%2Fwww.gatsbyjs.com%2F/" alt="Site Generator logo for gatsbyjs.com/" loading="lazy" decoding="async" width="40" height="40" eleventy:ignore>
<img src="https://v1.generator.11ty.dev/image/https%3A%2F%2Fastro.build%2F/" alt="Site Generator logo for astro.build/" loading="lazy" decoding="async" width="40" height="40" eleventy:ignore>

{% endcallout %}

```html
<img
	src="https://v1.generator.11ty.dev/image/https%3A%2F%2Fwww.11ty.dev%2F/"
	alt="Site Generator logo for 11ty.dev/"
	loading="lazy"
	decoding="async"
	width="40"
	height="40"
/>
<img
	src="https://v1.generator.11ty.dev/image/https%3A%2F%2Fwww.gatsbyjs.com%2F/"
	alt="Site Generator logo for gatsbyjs.com/"
	loading="lazy"
	decoding="async"
	width="40"
	height="40"
/>
<img
	src="https://v1.generator.11ty.dev/image/https%3A%2F%2Fastro.build%2F/"
	alt="Site Generator logo for astro.build/"
	loading="lazy"
	decoding="async"
	width="40"
	height="40"
/>
```
