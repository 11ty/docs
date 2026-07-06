---
pageTitle: Hosting Image
eleventyNavigation:
  key: Hosting Image
  excerpt: Returns the hosting provider’s logo that was used to host a site at given URL.
  order: 4
communityLinksKey: api-builtwith
---

{% tableofcontents %}

A runtime service to return the metadata (hosting provider) about any given website URL. Source code at [`11ty/api-built-with` on GitHub](https://github.com/11ty/api-built-with).

With support for:

- Cloudflare
- Vercel
- GitHub Pages
- Netlify
- Gatsby
- Fly.io
- Amazon (S3, Cloudfront)

## Usage

URLs must have the format:

```
https://v1.builtwith.11ty.dev/:url/image/host/
```

- `url` must be URI encoded.

Or json:

```
https://v1.builtwith.11ty.dev/:url/json/
```

## Samples

See the “Host” column on [Speedlify (Static Site Generators)](https://www.speedlify.dev/ssg/)

- Eleventy Base Blog is hosted on <img src="https://v1.builtwith.11ty.dev/https%3A%2F%2F11ty.github.io%2Feleventy-base-blog%2F/image/host/" width="30" height="30" alt="GitHub Pages" eleventy:ignore>
- vercel.com is hosted on <img src="https://v1.builtwith.11ty.dev/https%3A%2F%2Fvercel.com%2Fen-us%2F/image/host/" width="30" height="30" alt="Vercel" eleventy:ignore>
- netlify.com is hosted on <img src="https://v1.builtwith.11ty.dev/https%3A%2F%2Fwww.netlify.com/image/host/" width="30" height="30" alt="Netlify" eleventy:ignore>
