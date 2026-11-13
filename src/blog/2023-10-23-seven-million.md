---
newstitle: Seven Million npm Downloads!
eleventyNavigation:
  parent: Blog
---

On October 18, 2023 **Eleventy passed [seven million lifetime downloads](https://npm-stat.com/charts.html?package=%4011ty%2Feleventy&from=2018-01-01&to=2023-10-18)**!

{%- if npm and npm.downloads %} _That download count is now {{ npm.downloads | humanReadableNum }} (as of {{ config.now | newsDate }})._
{%- endif %}

_(This number is limited to Eleventy core and doesn’t count our ecosystem of utilities and plugins.)_

<img src="/blog/sevenmilgraph.png" alt="A line chart showing Eleventy’s downloads per year" eleventy:widths="350, 700" sizes="100vw">

<img src="/blog/sevenmil.jpg" alt="Zach pointing to the new balloons in his office that say 7 Million" eleventy:widths="350, 700" sizes="100vw">

Thank you for the support!!

## Previous arbitrary milestones

- [Six Million npm Downloads!](/blog/six-million/)
- [Five Million npm Downloads!](/blog/five-million/)
- [Four Million npm Downloads!](/blog/four-million/)
- [Three Million npm Downloads!](/blog/three-million/)
- [Two Million npm Downloads!](/blog/2million/)
- [Twitter: One Million npm Downloads!]({{ "https://twitter.com/eleven_ty/status/1338210611797389312" | canonicalTwitterUrl }})
