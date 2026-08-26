---
headerTitle: Eleventy Community
eleventyNavigation:
  parent: Community
  key: Follow Along
  pinned: true
  order: 0.5
permalink: /how-to-follow/
follow:
  updates:
    - title: Mastodon
      url: https://neighborhood.11ty.dev/@11ty
      icon: fa-brands fa-mastodon
      description: "`@11ty@neighborhood.11ty.dev`"
    - title: Bluesky
      url: https://bsky.app/profile/11ty.dev
      icon: fa-brands fa-bluesky
      description: "`@11ty.dev`"
    - title: LinkedIn
      url: https://www.linkedin.com/company/11ty/
      icon: fa-brands fa-linkedin
      description: "The very professional `11ty`"
    - title: YouTube
      url: https://www.youtube.com/c/EleventyVideo
      icon: fa-brands fa-youtube
      description: Screencasts, conference talks, and community resources.
    - title: Blog
      url: /blog/
      icon: fa-solid fa-newspaper
      description: Big announcements, project updates, and more.
    - title: Release History
      url: /docs/versions/
      icon: fa-brands fa-build-awesome
      description: Every release, with docs for previous versions.
    - title: Get Notifications from GitHub
      url: https://github.com/11ty/buildawesome
      icon: fa-brands fa-github
      description: Get notified about new releases as they’re published.
    - title: Build Awesome Discord
      url: https://discord.gg/5333BDYreC
      icon: fa-brands fa-discord
      description: A little Discord home on the Awesome Server (alongside Font Awesome and Web Awesome)
    - title: Eleventy Community Discord
      url: https://discord.gg/GBkBy9u
      icon: fa-brands fa-discord
      description: Questions from people of all experience levels are welcome.
    - title: GitHub Discussions
      url: https://github.com/11ty/buildawesome/discussions
      icon: fa-brands fa-github
      description: Longer-lived, searchable conversations about the project. Suggest new features here!
    - title: GitHub Issues
      url: https://github.com/11ty/buildawesome/issues
      icon: fa-brands fa-github
      description: When you find a bug!
    - title: 11ty Bundle
      url: https://11tybundle.dev/
      description: All of the 11ty resources, curated by Bob Monsour!
    # - title: Email Newsletter
    #   url: https://buttondown.email/11ty
    #   icon: fa-solid fa-inbox
    #   description: The lowest-volume option—a periodic digest of what shipped and what’s next.
    - title: Firehose
      url: /firehose/?type=youtube&type=github&type=blog&type=quick-tips
      icon: fa-solid fa-fire
      description: The blog, Quick Tips, YouTube, Mastodon, and every GitHub release—in one place.
    - title: Firehose RSS
      url: /firehose/firehose.rss
      icon: fa-solid fa-square-rss
      description: "`/firehose/firehose.rss`"
    - title: Blog Posts
      url: /blog/feed.xml
      icon: fa-solid fa-square-rss
      description: "`/blog/feed.xml`"
    - title: All Documentation Updates
      url: /docs/feed.xml
      icon: fa-solid fa-square-rss
      description: "`/docs/feed.xml`"
    # - title: Quick Tips
    #   url: /docs/quicktips/feed.xml
    #   icon: fa-solid fa-square-rss
    #   description: "`/docs/quicktips/feed.xml`"
  virtual:
    - title: 11ty Conference
      url: https://conf.11ty.dev/
      description: An International Symposium on Making Websites Real Good.
    - title: Eleventy Meetup
      url: https://www.11tymeetup.dev/
      description: A community meetup.
---

# Follow Along

Build Awesome development happens in the open. Here’s every place you can watch it happen — pick one (or all of them, whatever, you do you).

{% set cards = follow.updates %}{% include "link-cards.njk" %}

## Gatherings

{% set cards = follow.virtual %}{% include "link-cards.njk" %}
