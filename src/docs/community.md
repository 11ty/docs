---
eleventyNavigation:
  parent: Community
  key: How can I contribute?
  pinned: true
  order: 0
---

# Community

{% tableofcontents %}

{% set count = 0 %}

{% set count = count + 1 %}

## <span class="numberflag"><span class="sr-only">Step</span> {{ count }}</span> Participate

- **Build something**—join the [{{ authors | length }} developers that have added sites to the Built Awesome showcase](/authors/).
  - Want to brave the [Eleventy Leaderboards](/speedlify/) and track the Lighthouse scores of your web site over time? [Add your site to the `11ty-community` repo](/docs/leaderboards-add/)!
  - It’s also helpful if you add [`<meta name="generator">` to your existing Eleventy project](/docs/data-eleventy-supplied/#use-with-meta-namegenerator).
- **Ask a question, answer a question**: We welcome questions from people of all experience levels on [Discord](/blog/discord/), [GitHub Discussions](https://github.com/11ty/eleventy/discussions), and the [issue tracker](https://github.com/11ty/eleventy/issues). We _really_ appreciate help answering those questions too!
- **Tell a friend!** Our project doesn’t have a big marketing budget so we rely on word of mouth!
- {% include "star-on-github.njk" %}
- Join us at the [**11ty Conference**](https://conf.11ty.dev/) or the [**Eleventy Meetup**](https://www.11tymeetup.dev/)!
- Looking to **Hire an Eleventy developer**? Browse the [Eleventy Super Professional Business Network 💼](/super-professional-business-network/)

{% set count = count + 1 %}

## <span class="numberflag"><span class="sr-only">Step</span> {{ count }}</span> Stay up-to-date

- [Follow @11ty@neighborhood.11ty.dev on **Mastodon**](https://neighborhood.11ty.dev/@11ty)
- Read the [Eleventy **Blog**](/blog/)
- Subscribe to the [Eleventy **YouTube Channel**](https://www.youtube.com/c/EleventyVideo)
- [Subscribe to the 11ty **Email Newsletter**](https://buttondown.email/11ty)
- We publish feeds for: [**Firehose**](/firehose/?type=youtube&type=github&type=blog&type=quick-tips) _(everything)_, [**Blog Posts**](/blog/feed.xml), or [**Documentation Updates**](/docs/feed.xml)
- View the full [Eleventy Release History](/docs/versions/) (with documentation for previous versions)

{% set count = count + 1 %}

## <span class="numberflag"><span class="sr-only">Step</span> {{ count }}</span> Go Pro

We’re going to Kickstarter to fund a suite of Pro tools for folks wanting a streamling building and content editing experience. Watch for updates to the [**Build Awesome Kickstarter**]({{ config.kickstarterUrl }}) to get notified when we launch!

<a href="{{ config.kickstarterUrl }}" class="announcement-btn">{% include "components/ba-balloon.svg" %}Build Awesome Pro Kickstarter</a>

{% set count = count + 1 %}

## <span class="numberflag"><span class="sr-only">Step</span> {{ count }}</span> Donate

Eleventy is supported by [folks <strong>like {% emoji "👋" %} you</strong>](/docs/supporters/) that want to invest in better, longer lasting tools to create on the web.

<a href="https://opencollective.com/11ty" class="announcement-btn">Contribute on Open Collective</a>

As a thank you to our Supporters, Eleventy will:

{% include "supporter-benefits.njk" %}
