---
newstitle: "The very first Eleventy 1.0 Beta Release"
eleventyNavigation:
  parent: Blog
ignoreSupporters: true
---
It is my absolute honor to announce that the very first Eleventy 1.0 Beta release is now available on the beta channel. You can try it out now:

{% highlight "bash" %}
# Local project
npm install @11ty/eleventy@beta

# Global install
npm install @11ty/eleventy@beta -g
{% endhighlight %}

## The Big Features:

- Requires Node 12+
- [Eleventy Serverless](/docs/plugins/serverless/), a fantastic way to do dynamic server side rendering on request or lazily via Distributed Persistent Rendering.
- A plugin to help you upgrade from `0.x` to `1.x`: https://github.com/11ty/eleventy-upgrade-help
- Support for CLI arguments to do JSON and NDJSON output (instead of writing to the file system). Use `--to=json` and `--to=ndjson`.
- [Custom File Extension Handlers!](https://github.com/11ty/eleventy/issues/117) Plugins can now add their own template types and tie them to a file extension.
- Enables the [Data Deep Merge feature by default](/docs/data-deep-merge/).
- Upgrades to internal template language plugins for: `ejs`, `mustache`, `liquid`. Removes `jstl` (use `11ty.js` instead)
- And more! [Check out the full list of 135+ issues in the GitHub milestone.](https://github.com/11ty/eleventy/milestone/32?closed=1)

## A Big List of Thanks

- Our awesome Eleventy GitHub Support Team:
  - {% indieweblink "Pete DeHaan", "https://about.me/peterdehaan" %} and {% indieweblink "Binyamin Green", "https://binyam.in/" %}
  - …and any other folks participating in {% indieweblink "GitHub Discussions", "https://github.com/11ty/eleventy/discussions" %} or the {% indieweblink "Eleventy Discord", "/blog/discord/" %}!
- Folks that contributed code, {% indieweblink "starter projects", "/docs/starter/" %}, {% indieweblink "plugins", "/docs/plugins/" %}, {% indieweblink "wrote blog posts", "/docs/tutorials/" %} (share what you learned—on _your web site_), recorded podcasts or did streams, {% indieweblink "helped with documentation", "https://github.com/11ty/11ty-website/graphs/contributors" %}! Here are a few of our contributors:
  - {% indieweblink "Philipp Rudloff", "https://kleinfreund.de/" %}
  - {% indieweblink "Mike Riethmuller", "https://www.madebymike.com.au/" %}
  - {% indieweblink "Alex Russell", "https://infrequently.org/" %}
  - Samuel Path
  - gloryofrobots
  - {% indieweblink "André Jaenisch", "https://jaenis.ch/" %}
  - {% indieweblink "Chris D. Macrae", "https://chrisdmacrae.com/" %}
  - {% indieweblink "Benjamin Holmes", "https://bholmes.dev/" %}
  - {% indieweblink "Frank Taillandier", "https://frank.taillandier.me/" %} (Rest in peace, Frank ❤️)
  - {% indieweblink "Mat Marquis", "https://matmarquis.com/" %}
  - {% indieweblink "Mathias Bynens", "https://mathiasbynens.be/" %}
  - {% indieweblink "Aravind Voggu", "https://www.avoggu.com/" %}
- Our awesome community of over 444 documented {% indieweblink "Eleventy Authors", "/authors/" %}. The absolute best thing you can do is build something for yourself! Here are the top 11 authors (ordered by number of sites) listed on our showcase:
  - {% indieweblink "Andy Bell", "https://piccalil.li/" %}
  - {% indieweblink "Phil Hawksworth", "https://www.hawksworx.com/" %}
  - {% indieweblink "Sam Smith", "https://smth.uk/" %}
  - {% indieweblink "Ryan Gittings", "https://www.ryangittings.co.uk/" %}
  - {% indieweblink "Marc Filleul", "https://www.marcfilleul.fr/" %}
  - {% indieweblink "Sia Karamalegos", "https://sia.codes/" %}
  - {% indieweblink "Stephanie Eckles", "https://thinkdobecreate.com/" %}
  - {% indieweblink "Tanner Dolby", "https://tannerdolby.com/" %}
  - {% indieweblink "Lene Saile", "https://www.lenesaile.com/" %}
  - {% indieweblink "Nicolas Hoizey", "https://nicolas-hoizey.com/" %}
  - {% indieweblink "Alistair Shepherd", "https://alistairshepherd.uk/" %}
- {% indieweblink "Eleventy Leaderboards", "/speedlify/" %} (the people that built the sites currently holding the top 11 spots)
  - {% indieweblink "Josh Crain", "https://joshcrain.io/" %}
  - {% indieweblink "Chris Haynes", "https://lamplightdev.com/" %}
  - {% indieweblink "Raúl Piracés", "https://piraces.dev/" %}
  - {% indieweblink "Nic Raboy", "https://www.nraboy.com/" %}
  - {% indieweblink "Steve Stedman", "https://stedman.dev/" %}
  - {% indieweblink "Curtis Jurgensen", "https://curtisjurgensen.com/" %}
  - {% indieweblink "Malte Ubl", "https://www.industrialempathy.com/" %}
  - {% indieweblink "Carie Fisher", "https://cariefisher.com/" %}, {% indieweblink "Dennis Gaebel Jr.", "https://droidpinkman.io/" %}, {% indieweblink "Eric Bailey", "https://ericwbailey.design/" %}, {% indieweblink "Jen Downs", "https://jendowns.com/" %}, {% indieweblink "Jerry Jones", "https://jerryjones.dev/" %}, {% indieweblink "Saptak Sengupta", "https://saptaks.website/" %}, {% indieweblink "Scott Vinkle", "https://scottvinkle.me/" %}, {% indieweblink "Tatiana Mac", "https://www.tatianamac.com/" %}, Wayne Elgin
  - {% indieweblink "John Kemp-Cruz", "https://jkc.codes/" %}
  - {% indieweblink "Reuben Lillie", "https://reubenlillie.com/" %}
- {% indieweblink "Eleventy Meetup", "https://11tymeetup.dev/" %} organized by:
  - {% indieweblink "Sia Karamalegos", "https://sia.codes/" %}
  - {% indieweblink "Stephanie Eckles", "https://thinkdobecreate.com/" %}
  - {% indieweblink "Thomas M. Semmler", "https://helloyes.dev/" %}
- [The 11ties]({{ "https://twitter.com/JAMstackTORONTO/status/1341815501341790208" | canonicalTwitterUrl }}), organized last year by {% indieweblink "Henri Helvetica" %}
- Our Sponsors and {% indieweblink "Open Collective Supporters", "https://opencollective.com/11ty" %}:

{% include "supporters.njk" %}

Wow, such a big list! **[Do you want to help too?](../docs/community.md)**
