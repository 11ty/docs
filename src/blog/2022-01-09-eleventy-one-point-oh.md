---
newstitle: Eleventy v1.0.0, the stable release.
eleventyNavigation:
  parent: Blog
  key: Eleventy v1.0.0
---

- [Full docs for v1.0.0 on our website](https://v1.11ty.dev/docs/)

This project would not be possible without our lovely community. Thank you to everyone that built something with Eleventy ([×476 authors on our website!](https://v1.11ty.dev/authors/)), wrote a blog post about Eleventy, [contributed code to core](https://github.com/11ty/eleventy/graphs/contributors) or plugins, [documentation](https://github.com/11ty/11ty-website/graphs/contributors), asked questions, answered questions, braved [The Leaderboards](https://www.11ty.dev/speedlify/), participated on Discord, filed issues, attended (or organized!) a meetup, said a kind word on Twitter ❤️.

I really wish I had time to list everyone, but I do want to mention a few folks that have made tremendous contributions:

- 🏆 A super special thanks to [Peter DeHaan](https://github.com/pdehaan) and [Binyamin Green](https://github.com/binyamin) for their tireless contributions on the Eleventy Issue tracker.
- All of our [supporters on Open Collective](https://opencollective.com/11ty) ❤️
  - Gold Sponsors: [**Sanity.io**](https://www.sanity.io), [**Nordhealth**](https://nordhealth.com), [**Screen recorder for Mac**](https://www.movavi.com/screen-recorder-mac/)
  - Silver Sponsors: [**Piccalilli**](https://swop.link/open-collective), [**ESLint**](https://eslint.org/), [**Unabridged Software**](https://www.unabridgedsoftware.com/), [**PQINA**](https://pqina.nl/), [**The Coders Guild**](https://thecodersguild.org.uk/), [**Bejamas**](https://bejamas.io)
  - A full list of Backers can be found below!
- [Contribute on Open Collective](https://opencollective.com/11ty)
- [How else can you contribute to Eleventy?](https://11ty.dev/docs/community/)

## Install or Upgrade

- Install to your local project: `npm install @11ty/eleventy`
- Already installed in your local project? Upgrade your version: `npm update @11ty/eleventy`
- _Read more about [local project versus global installation](https://v1.11ty.dev/docs/global-installation/)_

**Upgrading from 0.x? Try out the `eleventy-upgrade-help` plugin.**

This will log breaking changes that apply to your project. https://github.com/11ty/eleventy-upgrade-help

## Breaking Changes

- Changes Node requirement to 12+ (previously: 10+)
- Data Deep Merge is now enabled by default
  - [Docs: Data Deep Merge](https://v1.11ty.dev/docs/data-deep-merge/) and _Issue #1753_
- The ordering in the Data Cascade changed slightly: _Front Matter in Layout_ files moved to be lower precedence, below Template and Data Directory Files (but higher than Global Data).
  - [Docs: Data Cascade](https://v1.11ty.dev/docs/data-cascade/) and _Issue #915_
- `liquidjs` v9 major version upgrade changes:
  - `setLiquidOptions`: Eleventy default for `dynamicPartials` changed to `true`. _Issue #240_ **Unquoted include paths will need to be updated or revert using `dynamicPartials: false`**
  - `setLiquidOptions`: Liquid option `strict_filters` renamed to `strictFilters`. _Issue #1390_
  - `setLiquidOptions`: Eleventy default for `strict_filters`/`strictFilters` changed to `true`. _Issue #222_
  - Relative path includes (e.g. `{% raw %}{% include "./include.liquid" %}{% endraw %}`) now look relative to the file first, and the includes directory second. _[Issue #2090](https://github.com/11ty/eleventy/issues/2090#issuecomment-970440427)_
- `ejs` v3 major version upgrade changes: _Issue #1392_
  - Removes `<% include /included %>` style include, use `<%- include('/included') -%>` instead. **Don’t forget the dash `<%-` and `-%>`!**
- `.gitignore` files outside of your project root are no longer supported when calculating ignored paths in Eleventy. _Issue #364_
  - ✅ {ROOT}/.gitignore (supported)
  - 🚫 {INPUT\*DIR}/.gitignore (\*not\* supported)
  - ✅ {ROOT}/.eleventyignore (supported)
  - ✅ {INPUT_DIR}/.eleventyignore (supported)
- If you rely on the `YYYY-MM-DD` format in your file names for content dates, these are now assumed to be UTC instead of local dates. Take care if you use `liquid`’s built-in `date` format with `page.date`!
  - [Docs: Content Dates](https://v1.11ty.dev/docs/dates/), _Issue #1752_, and https://github.com/harttle/liquidjs/issues/375
- `browser-sync`:
  - Default to `ui: false` _Issue #843_
  - Default to `ghostMode: false` _Issue #841_
  - [Re-enable these features using `eleventyConfig.setBrowserSyncConfig`](https://v1.11ty.dev/docs/watch-serve/#override-browsersync-server-options)
- Removes the `jstl` template language. Use `11ty.js` instead. _Issue #1084_
- Change to `dataTemplateEngine: false` by default. _Issue #174_

Please use [`eleventy-upgrade-help`](https://github.com/11ty/eleventy-upgrade-help) to log breaking changes that apply to your project.

## Features

### Major

- Custom File Extension Handlers: applications and plugins can now add their own template types and tie them to a file extension.
  - [Docs: Custom Template Languages](https://v1.11ty.dev/docs/languages/custom/) and _Issue #117_
- Render Plugin, shortcodes to render other template languages.
  - [Docs: Render Plugin](https://v1.11ty.dev/docs/plugins/render/)
- Serverless Plugin, allow Eleventy templates to run in a serverless function for server side rendering.
  - Use with [Netlify Functions](https://www.netlify.com/products/functions/) and [On-demand Builders](https://www.netlify.com/blog/2021/10/25/faster-more-reliable-page-loads-with-update-to-on-demand-builders/)
  - [Docs: Serverless Plugin](https://v1.11ty.dev/docs/plugins/serverless/)
- Adds support for `--to=json` and `--to=ndjson`
  - [Docs: Command Line Usage](https://v1.11ty.dev/docs/usage/#to-can-output-json)
  - Use Data Filter Selectors to opt-in data from the Data Cascade. [Docs: Configuration: Data Filter Selectors](https://v1.11ty.dev/docs/config/#data-filter-selectors)
- Adds support for programmatic Eleventy (e.g. `new Eleventy()` in your Node.js script)
  - [Docs: Programmatic API](https://v1.11ty.dev/docs/programmatic/)
- Configuration: `addGlobalData` method.
  - [Docs: Global Data from the Configuration API](https://v1.11ty.dev/docs/data-global-custom/) and _Issue #1280_
  - Note also that JavaScript Global Data Files now receive data. [Docs: JavaScript Data Files](https://v1.11ty.dev/docs/data-js/#arguments-to-global-data-files)

### Minor

- Passthrough Copy now throws an error if two or more files attempt to copy to the same output location. _Issue #1677_
- For better URL-safe slugs by default, we now suggest using the new `slugify` global filter instead of the previous `slug`. `slug` is still included for backwards compatibility. [`slugify` Docs](https://v1.11ty.dev/docs/filters/slugify/). [`eleventy-upgrade-help`](https://github.com/11ty/eleventy-upgrade-help) includes a permalink checker to compare `slug` and `slugify` output. _Issue #278_
- Added support for protocol relative URLs in the `url` global filter (though technically accurate, using this method is discouraged). _Issue #1276_
- New Eleventy supplied data:
  - `eleventy` Global Data
    - [Docs: Eleventy Supplied Data: `eleventy` Variable](https://v1.11ty.dev/docs/data-eleventy-supplied/#eleventy-variable)
  - Environment Variables:
    - [Docs: Eleventy Supplied Data: Environment Variables](https://v1.11ty.dev/docs/data-eleventy-supplied/#environment-variables)
    - `ELEVENTY_ROOT`
    - `ELEVENTY_SOURCE`
    - `ELEVENTY_SERVERLESS`
- `tags` are now de-duped. _Issue #1876_
- JavaScript functions in `eleventyComputed` now have access to global filters.
  - [Docs: Computed Data](https://v1.11ty.dev/docs/data-computed/#using-javascript) and _Issue #1862_
- Ignores
  - `node_modules` are now ignored by default. [Docs: Ignores](https://v1.11ty.dev/docs/ignores/#node_modules) and _Issue #383_
  - Control ignores programmatically. [Docs: Ignores](https://v1.11ty.dev/docs/ignores/#configuration-api) and _Issue #894_ _#1405_
- Configuration: Access to `eleventyConfig.dir` in plugins. _Issue #922_
- Configuration: Events are now Async-friendly
  - [Docs: Events](https://v1.11ty.dev/docs/events/) and _Issue #1363_
- Replace `chalk` dependency with `kleur` _Issue #2113_
- Adds template language-agnostic compilation caching for speeeeed _Issue #1529_
- Fixes bug `--input=file.njk --output=.` would process 0 files. _Issue #1129_
- Fixes bug where Eleventy would stop processing templates in watch/serve mode after a compilation error. _Issue #1658_
- Front matter parsing errors will now report the filename of the offending file in the error message. _Issue #1152_
- [Option to opt-out of the `browser-sync` JavaScript snippet](https://v1.11ty.dev/docs/watch-serve/#opt-out-of-the-browsersync-javascript-snippet)
- Warning when Transforms that return empty content. _Issue #1487_
- Transforms now have access to `inputPath` _Issue #789_
- Shows the preprocessed template engine name on the console for `html` or `md` files _Issue #1478_

### Nunjucks

- Adds `eleventyConfig.setNunjucksEnvironmentOptions` method. _Issue #895_
  - [Docs: Nunjucks](https://v1.11ty.dev/docs/languages/nunjucks/#optional-use-your-nunjucks-environment-options)
- Adds `eleventyConfig.addNunjucksGlobal` method. _Issue #1060_

### Liquid

- Adds support for asynchronous filters. _Issue #831_

## Milestone

All bug fix issues can be perused at the GitHub milestone:
https://github.com/11ty/eleventy/milestone/32?closed=1

Some internals highlights:

- Improvements to stability with Nunjucks and shortcodes in `{% raw %}{% for %}{% endraw %}` loops
- Fix for `EMFILE: too many open files` errors
- Use a named `browser-sync` instance. _Issue #1125_
- Switch from `fs-extra` to `graceful-fs`

## Major Version Dependency Upgrades

These are convenience links provided. Major things of note are summarized in the Breaking Changes section above.

- `liquidjs` from 6 to 9, release notes: [v7](https://github.com/harttle/liquidjs/blob/master/CHANGELOG.md#700-2019-02-14) [v8](https://github.com/harttle/liquidjs/blob/master/CHANGELOG.md#800-2019-03-10) [v9](https://github.com/harttle/liquidjs/blob/master/CHANGELOG.md#900-2019-08-26)
- `luxon` from 1 to 2: (Node 12+ minimum) [Upgrade Guide](https://moment.github.io/luxon/#/upgrading)
- `markdown-it` from 10 to 12, release notes: [v11](https://github.com/markdown-it/markdown-it/blob/master/CHANGELOG.md#1100---2020-05-20) [v12](https://github.com/markdown-it/markdown-it/blob/master/CHANGELOG.md#1200---2020-10-14)
- `ejs` from 2 to 3. Release notes: [v3](https://github.com/mde/ejs/blob/main/CHANGELOG.md#v301-2019-11-23)
- `mustache` from 2 to 4. Release notes: [v3](https://github.com/janl/mustache.js/blob/master/CHANGELOG.md#300--16-september-2018) [v4](https://github.com/janl/mustache.js/blob/master/CHANGELOG.md#400--16-january-2020)

## THANK YOU NOTES

**First-time GitHub contributions** from [@d2s](https://github.com/d2s), [@Snugug](https://github.com/Snugug), [@slightlyoff](https://github.com/slightlyoff), [@max](https://github.com/max), [@valtlai](https://github.com/valtlai), [@harttle](https://github.com/harttle), [@binyamin](https://github.com/binyamin), [@bnb](https://github.com/bnb), [@NotWoods](https://github.com/NotWoods), [@gobeli](https://github.com/gobeli), [@lxg](https://github.com/lxg), [@GerHobbelt](https://github.com/GerHobbelt), [@hirusi](https://github.com/hirusi), [@stuartpb](https://github.com/stuartpb), [@milahu](https://github.com/milahu), [@oscarotero](https://github.com/oscarotero), [@jakemulley](https://github.com/jakemulley), [@tannerdolby](https://github.com/tannerdolby), [@Snapstromegon](https://github.com/Snapstromegon), [@knokmki612](https://github.com/knokmki612), [@mariusschulz](https://github.com/mariusschulz), [@Holben888](https://github.com/Holben888), [@zidingz](https://github.com/zidingz), [@magua-io](https://github.com/magua-io), [@masguit42](https://github.com/masguit42), [@JKC-Codes](https://github.com/JKC-Codes), [@ThewBear](https://github.com/ThewBear), [@CodeFoodPixels](https://github.com/CodeFoodPixels), [@dgrammatiko](https://github.com/dgrammatiko), [@oscard0m](https://github.com/oscard0m), [@monochromer](https://github.com/monochromer)

**Gold Sponsors**: [**Sanity.io**](https://www.sanity.io), [**Nordhealth**](https://nordhealth.com), [**Screen recorder for Mac**](https://www.movavi.com/screen-recorder-mac/)

**Silver Sponsors**: [**Piccalilli**](https://swop.link/open-collective), [**ESLint**](https://eslint.org/), [**Unabridged Software**](https://www.unabridgedsoftware.com/), [**PQINA**](https://pqina.nl/), [**The Coders Guild**](https://thecodersguild.org.uk/), [**Bejamas**](https://bejamas.io)

**OpenCollective Monthly Backers**: [Viljami Salminen](https://viljamis.com), Tyler Gaw, [Peter deHaan](https://about.me/peterdehaan), Melanie Sumner, Alejandro Rodríguez, [Mat Marquis](https://hire.wil.to), [Philip Borenstein](https://pborenstein.com), [Jérôme Coupé](https://www.webstoemp.com), [Max Böck](https://mxb.dev), [Bryce Wray](https://www.brycewray.com), Kristof Michiels, [Yuhei Yasuda](https://yuheiy.com/), [Ed Spencer](https://edspencer.me.uk), [Nicolas Hoizey](https://nicolas-hoizey.com), [Mike Aparicio](https://mikeaparicio.com), Todd Libby, [Luke Bonaccorsi](https://lukeb.co.uk), [Ben Myers](https://benmyers.dev), Katie Sylor-Miller, [Mark Buskbjerg](https://markbuskbjerg.dk), [mortendk](https://morten.dk), Aaron Hans, [Lauris Consulting](https://lauris-webdev.com), John Meyerhofer, Ben Hyrman, [Keenan Payne](https://keenanpayne.com), [Dimitrios Grammatikogiannis](https://dgrammatiko.online), Devin Clark, [Eric Bailey](https://ericwbailey.design/), [Dave Rupert](https://daverupert.com), Manuel Matuzovic, Phil Hawksworth, Brian Koser, Tianyu Ge, Vadim Makeev, Kyosuke Nakamura, [Hans Gerwitz](https://hans.gerwitz.com/), [Makoto Kawasaki](https://makotokw.com), [Horacio Gonzalez]({{ "https://twitter.com/LostInBrittany" | canonicalTwitterUrl }}), Matthew Tole, [Wellness Researched](https://wellnessresearched.com), [Ned Zimmerman](https://bight.dev), Mark Boulton, [Søren Birkemeyer](https://annualbeta.com), Richard Hemmer, [Nick Nisi](https://nicknisi.com), Andrew Harvard, shawn j sandy, Takuya Fukuju, [John SJ Anderson](https://genehack.org), Ryan Swaney, [Alistair Shepherd](https://alistairshepherd.uk), [Reach Digital](https://www.reachdigital.nl/), [Ivo Herrmann](https://ivoherrmann.com/), [Flaki](https://flak.is), Kyle Mitofsky, [Jenn Schiffer](https://jennmoney.biz), John Hall, [Scott McCracken](https://scottmccracken.net), [James Steinbach](https://jamessteinbach.com), [Miriam Suzanne](https://oddbird.net/), [Bentley Davis](https://BentleyDavis.com), [Evan Harrison](https://www.evan-harrison.com), [Rob Sterlini](https://robsterlini.co.uk), [vince falconi](https://tattooed.dev), [Martin Schneider](https://martinschneider.me), [Stephanie Eckles](https://thinkdobecreate.com), [Frontend Weekly Tokyo](https://frontendweekly.tokyo/), [Higby](https://www.higby.io), [Matt DeCamp](https://decamp.dev), [Chris Burnell](https://chrisburnell.com), [Ximenav Vf.](https://ximenavf.com/), [Juan Miguel](https://www.apirocket.io), [Angelique Weger](https://angeliqueweger.com), Kasper Storgaard, [Kevin Healy](https://kevhealy.com), Greg Gibson, [hiddedevries.nl](https://hiddedevries.nl/en/blog), [Jeremy Caldwell](https://www.jeremycaldwell.me), Michelle Barker, [Alesandro Ortiz](https://AlesandroOrtiz.com), [David A. Herron](https://www.david-herron.com/), [Paul Robert Lloyd](https://paulrobertlloyd.com), [Andrea Vaghi](https://www.andreavaghi.dev), Bryan Robinson, Ashur Cabrera, [Raymond Camden](https://www.raymondcamden.com), John Meguerian, [Joe Lamyman](https://joelamyman.co.uk), Stuart Robson, [Jeffrey A Morgan](https://jam1401.dev), [Joshua Ray](https://ollomedia.com), Tim Giles, [Brett Nelson](https://wipdeveloper.com/), [Paul Welsh](https://www.nonbreakingspace.co.uk), [Ingo Steinke](https://www.ingo-steinke.com/), [Melanie Richards](http://melanie-richards.com), Rich Holman, Ross Kinney, Lewis Nyman, Dorin Vancea, Marco Zehe, Wes Ruvalcaba, [Luc Poupard](https://www.kloh.ch), [Johan Bové](https://johanbove.info), [Josh Crain](https://joshcrain.io), [Entle Web Solutions](https://www.entle.co), [Ken Hawkins](https://AllAboutKen.com), [Sami Singh](https://httpster.io), Fershad Irani, [Nikita Dubko](https://mefody.dev/), [Aaron Gustafson](https://www.aaron-gustafson.com), [Chris](https://www.chrisswithinbank.net/), [Ferpection](https://ferpection.com), [Benjamin Geese](https://benjamingeese.de), Maël Brunet, [Marcus Relacion](https://www.marcusrelacion.com), [Netin nopeustesti](https://netinnopeustesti.com/), Bobby Ray, [Sia Karamalegos](https://sia.codes/), [Christian Miles](https://cjlm.ca), [Raphael Höser](https://hoeser.dev), [Cthos](https://alextheward.com), [Saneef Ansari](https://saneef.com), [Flemming Meyer](https://fokus.design/), Colin Fahrion, [Dan Burzo](https://danburzo.ro), Gaston Rampersad, [Jon Kuperman](https://jonkuperman.com/), [Dan Ott](https://dtott.com), [Mobilemall.pk](https://mobilemall.pk/), [Cheap VPS](https://vpsdime.com/), [David Darnes](https://darn.es), [Jon Roobottom](https://roobottom.com), [Dana Byerly](https://danabyerly.com), [Renkaatsopivasti](https://renkaatsopivasti.fi), [Windesol Sähkön Kilpailutus](https://windesol.fi), [Luke Mitchell](https://www.interroban.gg), SignpostMarv, [THE PADDING](https://paddn.com/web-design-hong-kong/), Bob Monsour, Patrick Byrne, [Ara Abcarians](https://itsmeara.com), [Oisín Quinn](https://oisin.io), [Central Va Insulation](https://www.centralvainsulation.com), [Septic Richmond Va](https://www.kneedeepseptic.com)
