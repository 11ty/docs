---
newstitle: "The very first beta release of Eleventy v2.0"
eleventyNavigation:
  parent: Blog
---
{% callout %}<strong><em>Update:</em></strong> The <a href="/blog/eleventy-v2/">Eleventy v2.0.0 stable release</a> is now available!{% endcallout %}

The very first Eleventy 2.0 Beta release is now available on the `@beta` channel and we’re looking for Beta testers! You can try it out now:

```sh
# Local project
npm install @11ty/eleventy@beta

# Global install
npm install @11ty/eleventy@beta -g
```

Read more about [local versus global installation](/docs/global-installation/).

{% youtubeEmbed "TcTR0TLqM3I" %}

### Are you new to Eleventy?

**Eleventy is a flexible and production-ready site generator** known for its zero-client-JavaScript footprint, [speedy sites, speedy builds](/docs/performance/), and [full control over the output](https://www.youtube.com/watch?v=b4frtsT4Cgo). Watch [The State of Eleventy in Two Minutes](https://www.youtube.com/watch?v=EZfNr-YblBE) or [read more about Eleventy’s project goals.](/docs/)

## The Big Features

### Smaller, More Secure

- ✅ Dependencies decreased by **32.1%**: [211 modules](https://npmgraph.js.org/?q=@11ty/eleventy@2.0.0-beta.1) ([311 in v1.0.2](https://npmgraph.js.org/?q=@11ty/eleventy@1.0.2))
- ✅ `node_modules` file weight decreased by **77.8%**: 34.3 MB (155 MB in v1.0.2)
- ✅ [**30.5% faster** `npm install`](https://docs.google.com/spreadsheets/d/1lkeWOhEXTNh0yxWaNOl_UFOHQea2YnSHit4QLjqXUb8/edit?usp=sharing)

### Faster Builds

- Improved build performance (tested on [a sample 500 page site](https://docs.google.com/spreadsheets/d/1-H3wmT7q7m7G7d5M_dCLxQOiAAX3TP0byQdf0pP1fAQ/edit?usp=sharing) against v1.0.2) using:
  - Liquid: ✅ **18.18% faster**
  - Nunjucks: ✅ **17.74% faster**
  - Markdown (with Liquid): ✅ **17.95% faster**
  - JavaScript (11ty.js): ✅ **8.33% faster**
- [`--incremental` for incremental builds](/docs/usage/incremental/) [#108](https://github.com/11ty/eleventy/issues/108#issuecomment-1362030361)
  - Smarter incremental builds with support for layout dependencies, [registered dependencies on custom templates](/docs/languages/custom/#registering-dependencies), dependencies in `pagination` data or [`eleventyImport`](/docs/collections/#declare-your-collections-for-incremental-builds) [#975](https://github.com/11ty/eleventy/issues/975)
- [`--ignore-initial` command line option](/docs/usage/#ignore-initial-to-run-eleventy-without-an-initial-build) to skip the first build (best paired with `--incremental`)
- Use [emulated passthrough copy](/docs/copy/#emulate-passthrough-copy-during-serve) to serve passthrough files directly without triggering a build (will still work with live reload) [#2456](https://github.com/11ty/eleventy/issues/2456)

### Plugins

- Support for [WebC, the new single file format for web components](/docs/languages/webc/)
- [Eleventy Edge](/docs/plugins/edge/) will render Eleventy templates in an Edge Function for dynamic content _(bundled with Eleventy)_
- [Eleventy Dev Server](/docs/dev-server/) replaces Browsersync, adds support for DOM-diffing live reloads. [#1305](https://github.com/11ty/eleventy/issues/1305) _(bundled with Eleventy)_
- [Render Plugin](/docs/plugins/render/) will render any template syntax inside other files _(bundled with Eleventy)_
- [Internationalization (i18n) Plugin](/docs/plugins/i18n/) makes it easy to create localized sites _(bundled with Eleventy)_
- [HTML `<base>` Plugin](/docs/plugins/html-base/) makes it easy to deploy your site to any folder path without changing any content (works great with the path prefix feature) _(bundled with Eleventy)_
- Support for the [{% indieavatar "https://vite.dev/" %}Vite plugin](/docs/server-vite/)

### And more…

- Support for [aliasing to an existing template language](/docs/languages/custom/#aliasing-an-existing-template-language) [#2248](https://github.com/11ty/eleventy/issues/2248#issuecomment-1341732716)
  - This unlocks TypeScript or JSX in Eleventy when you use `esbuild-register` and alias `11ty.ts` or `11ty.tsx` to `11ty.js`.
- [Event arguments](/docs/events/#event-arguments) unlock new plugin abilities: `dir` (input/output/includes/data/layouts locations),
  `outputMode` (where the templates are going: `fs`, `json`, `ndjson`), `runMode` (`build`, `watch`, or `serve`), or `results` for the processed Eleventy output.
- Memory usage improvements to [Pagination](/docs/pagination/)

## Breaking Changes

{% callout "info", "md" %}Rather than review this list, it’d be faster to use the `eleventy-upgrade-helper` plugin, which runs a suite of tests to see whether or not you need to worry about these breaking changes in your project: https://github.com/11ty/eleventy-upgrade-help{% endcallout %}

- Bump minimum Node version to [Node 14+](https://github.com/nodejs/release#release-schedule) [#2336](https://github.com/11ty/eleventy/issues/2336)
- [Disable indented code blocks in Markdown](/docs/languages/markdown/#indented-code-blocks) by default [#2438](https://github.com/11ty/eleventy/issues/2438)
- [Both `.git` and nested `node_modules` folders are ignored by default](/docs/ignores/#configuration-api) (previously we ignored `node_modules/**`, now `**/node_modules/**`) [#2436](https://github.com/11ty/eleventy/issues/2436)
- [Dates will now be stripped from the parent directory for `page.fileSlug` when the file name is `index.*`](/docs/data-eleventy-supplied/#fileslug). e.g. `YYYY-MM-DD-myslug/index.md` has a `page.fileSlug` of `myslug` when previously it was `YYYY-MM-DD-myslug` [#1947](https://github.com/11ty/eleventy/issues/1947) [#2111](https://github.com/11ty/eleventy/pull/2111)
- Dots in global data file names should be preserved in key name for data cascade [#1242](https://github.com/11ty/eleventy/issues/1242) [#1912](https://github.com/11ty/eleventy/pull/1912)
- Removes deprecated in v1.0 (and undocumented) `renderData` feature (use Computed Data instead) [#2356](https://github.com/11ty/eleventy/issues/2356)
- Removes [pre-processing global JSON data files with a template language](/docs/data-preprocessing/) [#2728](https://github.com/11ty/eleventy/issues/2728)
- Removes [`--passthroughall` command line flag](https://v1.11ty.dev/docs/copy/#passthrough-all-content) [#2682](https://github.com/11ty/eleventy/issues/2682)
- Major dependency bumps:
  - `liquidjs` from v9 to v10 [Release notes](https://github.com/harttle/liquidjs/releases/tag/v10.0.0) [#2678](https://github.com/11ty/eleventy/issues/2678)
  - `luxon` from v2 to v3 [Release notes](https://github.com/moment/luxon/blob/master/CHANGELOG.md#300-2022-07-09)
  - `markdown-it` from v12 to v13 [Release notes](https://github.com/markdown-it/markdown-it/blob/master/CHANGELOG.md#1300---2022-04-22)

## The Small Features

- Adds support for configuration default file names `eleventy.config.js` and `eleventy.config.cjs` in addition to `.eleventy.js` [#1029](https://github.com/11ty/eleventy/issues/1029)
- [`addShortcode` is now async-friendly](/docs/shortcodes/#asynchronous-shortcodes) [#2726](https://github.com/11ty/eleventy/issues/2726)
- [`addFilter` is now async-friendly](/docs/filters/#asynchronous-filters) [#2536](https://github.com/11ty/eleventy/issues/2536) (also adds an `addAsyncFilter` API method)
- File watching:
  - Eleventy Dev Server includes a [`watch` option](/docs/dev-server/#options) to trigger live reloads on file changes outside of your Eleventy build. Works great when you’re using a bundler in parallel!
  - Decoupled ignore APIs for template processing (`eleventyConfig.ignores`) and [file watching (`eleventyConfig.watchIgnores`)](/docs/watch-serve/#configuration-api) [#893](https://github.com/11ty/eleventy/issues/893)
- Access [advanced `recursive-copy` options in passthrough file copy](/docs/copy/#advanced-options) [#1686](https://github.com/11ty/eleventy/pull/1686)
  - Unlocks passthrough copy with symlinks [#530](https://github.com/11ty/eleventy/issues/530)
- [`log` filter supports chaining](/docs/filters/log/#using-log-in-filter-chains) [#2467](https://github.com/11ty/eleventy/pull/2467)
- Adds [new `git Created` date option](/docs/dates/#setting-a-content-date-in-front-matter) [#2468](https://github.com/11ty/eleventy/pull/2468)
- Adds [options for `read` and `encoding` to custom data formats](/docs/data-custom/#usage-with-options)
  - This unlocks using [binary files (like images) to populate the Data Cascade](/docs/data-custom/#feed-exif-image-data-into-the-data-cascade)

### Even Smaller Features

- [`setDataFileSuffixes` API method to customize Template and Directory data file suffixes](/docs/config/#change-file-suffix-for-data-files) (or opt-out of the Template and Directory Data Files feature) [#2681](https://github.com/11ty/eleventy/issues/2681)
- [Serverless option `singleTemplateScope: false`](https://v2.11ty.dev/docs/plugins/serverless/#compile-the-data-cascade-for-the-project) simplifies using collections in serverless mode. [#2736](https://github.com/11ty/eleventy/issues/2736)
- A variety of bug fixes for `--serve` issues that required server restarts.
- Data Consistency:
  - `this.page` and `this.eleventy` are now available on [Shortcodes](/docs/shortcodes/#scoped-data-in-shortcodes), [🆕 Filters](/docs/filters/#scoped-data-in-filters), [🆕 Linters](/docs/config/#linters), and [🆕 Transforms](/docs/config/#transforms)
  - [`page` and `content` on Collection entries](/docs/collections/#collection-item-data-structure)
- Adds [`getCollectionItemIndex` universal filter](/docs/filters/collection-items/#getcollectionitemindex) [#2676](https://github.com/11ty/eleventy/issues/2676)
- Throw error on circular layout dependencies [#2076](https://github.com/11ty/eleventy/pull/2076)
- Plugins can now reference `eleventyConfig.pathPrefix` [#2526](https://github.com/11ty/eleventy/issues/2526)
- [`generatePageOnEmptyData` to generate an empty results page](/docs/pagination/#generating-an-empty-results-page) with an empty paginated data set [#1698](https://github.com/11ty/eleventy/pull/1698) [#756](https://github.com/11ty/eleventy/issues/756) [#731](https://github.com/11ty/eleventy/issues/731) [#2208](https://github.com/11ty/eleventy/pull/2208)
- Creating an empty JSON data file no longer throws an error [#2299](https://github.com/11ty/eleventy/issues/2299)

## Housekeeping

- Full issue list: https://github.com/11ty/eleventy/milestone/38?closed=1
- Full changelog: https://github.com/11ty/eleventy/compare/v1.0.2...v2.0.0-beta.1

## Thank You Notes

This project would not be possible without our lovely community. Thank you to everyone that built something with Eleventy ([×669 authors on our web site!](/authors/)), wrote a blog post about Eleventy, [contributed code](https://github.com/11ty/eleventy/graphs/contributors), wrote a plugins, [helped with documentation](https://github.com/11ty/11ty-website/graphs/contributors), asked questions, answered questions, braved [The Leaderboards](/speedlify/), participated on Discord, filed issues, attended (or organized!) a meetup, said a kind word on social media ❤️.

- A **huge thank you to [Netlify](https://www.netlify.com/)**, especially: Matt Biilmann, Chris Bach, Lauren Sell (alum), and Claire Knight, without whom this release would not have been possible.
- 🏆 A special thanks to [Peter DeHaan](https://github.com/pdehaan) for their tireless contributions on the Eleventy Issue tracker.
- Yet more thanks to the all star Discord Moderators and Meetup Coordinators [Ben Myers](https://benmyers.dev/), [Cassey Lottman](https://www.cassey.dev/), [Dan Leatherman](https://danleatherman.com/), [Evan Sheehan](https://darthmall.net/), [Thomas M. Semmler](https://helloyes.dev/), [Sia Karamalegos](https://sia.codes/) and [Stephanie Eckles](https://thinkdobecreate.com/).
- All of our [supporters on Open Collective](https://opencollective.com/11ty) ❤️
- [Contribute on Open Collective](https://opencollective.com/11ty)
- [How else can you contribute to Eleventy?](/docs/community/)

### Pull Requests From

[@AleksandrHovhannisyan](https://github.com/AleksandrHovhannisyan) 🆕, [@amareshsm](https://github.com/amareshsm) ×2 🆕, [@binyamin](https://github.com/binyamin), [@DamianOsipiuk](https://github.com/DamianOsipiuk) 🆕, [@epelc](https://github.com/epelc) ×2 🆕, [@j-f1](https://github.com/j-f1) 🆕, [@Jaza](https://github.com/Jaza) 🆕, [@kentaroi](https://github.com/kentaroi) 🆕, [@kev4ev](https://github.com/kev4ev) 🆕, [@LeoSchae](https://github.com/LeoSchae) 🆕, [@milahu](https://github.com/milahu) ×3, [@nasivuela](https://github.com/nasivuela) 🆕, [@NickColley](https://github.com/NickColley) 🆕, [@NotWoods](https://github.com/NotWoods), [@Obayanju](https://github.com/Obayanju) 🆕, [@Snapstromegon](https://github.com/Snapstromegon) ×16 (wow! 🤯), [@TheDocTrier](https://github.com/TheDocTrier) 🆕, [@thinkverse](https://github.com/thinkverse) 🆕, [@TigersWay](https://github.com/TigersWay) 🆕, [@wes-goulet](https://github.com/wes-goulet) 🆕

### Read more from the Community

- [New Features and Upgrade Considerations for Eleventy v2.0.0](https://11ty.rocks/posts/new-features-upgrade-considerations-eleventy-version-2/) by Stephanie Eckles

### Open Collective Supporters

- **Gold Sponsors**: [**Sanity.io**](https://www.sanity.io), [**Nordhealth**](https://nordhealth.com), [**CloudCannon**](https://cloudcannon.com/), [**Transloadit**](https://transloadit.com)
- **Silver Sponsors**: [**Unabridged Software**](https://www.unabridgedsoftware.com/), [**PQINA**](https://pqina.nl/), [**Bejamas**](https://bejamas.io), [**Nathan Smith**](https://sonspring.com), [**Monarch Air Group**](https://monarchairgroup.com), [**Getform.io**](https://getform.io), [**Mercury Jets**](https://www.mercuryjets.com), and [**OCEG**](https://www.oceg.org)
- **Backers**: Tyler Gaw, [Ariel Salminen](https://arie.ls), [Peter deHaan](https://about.me/peterdehaan), Melanie Sumner, [Ben Nash](https://www.bennash.com), Alejandro Rodríguez, [Mat Marquis](https://hire.wil.to), [Philip Borenstein](https://pborenstein.com), [Jérôme Coupé](https://www.webstoemp.com), [Nicolas Hoizey](https://nicolas-hoizey.com), [Mike Aparicio](https://mikeaparicio.com), [Ben Myers](https://benmyers.dev), Katie Sylor-Miller, [Mark Buskbjerg](https://markbuskbjerg.dk), [mortendk](https://morten.dk), Aaron Hans, [Lauris Consulting](https://lauris-webdev.com), John Meyerhofer, Todd Libby, [Luke Bonaccorsi](https://lukeb.co.uk), shawn j sandy, [Jenn Schiffer](https://jennmoney.biz), [Dimitrios Grammatikogiannis](https://dgrammatiko.online), Devin Clark, [Eric Bailey](https://ericwbailey.design/), Manuel Matuzovic, Kyosuke Nakamura, [Tim Giles](https://www.tgiles.dev/), [Hans Gerwitz](https://hans.gerwitz.com/), [Makoto Kawasaki](https://makotokw.com), [Horacio Gonzalez](https://twitter.com/LostInBrittany), [Rob Sterlini](https://robsterlini.co.uk), [Josh Crain](https://joshcrain.io), [Søren Birkemeyer](https://annualbeta.com), Richard Hemmer, [Nick Nisi](https://nicknisi.com), [John SJ Anderson](https://genehack.org), Ryan Swaney, [Alistair Shepherd](https://alistairshepherd.uk), [Ivo Herrmann](https://ivoherrmann.com/), [Flaki](https://flak.is), John Hall, [Scott McCracken](https://scottmccracken.net), [James Steinbach](https://jamessteinbach.com), [Miriam Suzanne](https://oddbird.net/), [Angelique Weger](https://angeliqueweger.com), [Bentley Davis](https://BentleyDavis.com), [vince falconi](https://tattooed.dev), [Martin Schneider](https://martinschneider.me), [Stephanie Eckles](https://thinkdobecreate.com), [Frontend Weekly Tokyo](https://frontendweekly.tokyo/), [Chris Burnell](https://chrisburnell.com), [Ximenav Vf.](https://ximenavf.com/), Rich Holman, Kasper Storgaard, [Kevin Healy](https://kevhealy.com), Greg Gibson, [Hidde](https://hidde.blog), Michelle Barker, [Alesandro Ortiz](https://AlesandroOrtiz.com), [David A. Herron](https://www.david-herron.com/), [Paul Robert Lloyd](https://paulrobertlloyd.com), [Andrea Vaghi](https://www.andreavaghi.dev), Bryan Robinson, [Ashur Cabrera](https://ashur.cab/rera), [Raymond Camden](https://www.raymondcamden.com), John Meguerian, [Joe Lamyman](https://joelamyman.co.uk), [Dorin Vancea](https://dorinvancea.com), [Ara Abcarians](https://itsmeara.com), [Paul Welsh](https://www.nonbreakingspace.co.uk), [Ingo Steinke](https://www.ingo-steinke.com/), [Dan Ryan](https://dryan.com/), Sam, [Brett Nelson](https://wipdeveloper.com/), [Melanie Richards](http://melanie-richards.com), Marco Zehe, Wes Ruvalcaba, [Luc Poupard](https://www.kloh.ch), [Noel Forte](https://forte.is/), [Entle Web Solutions](https://www.entle.co), [Ken Hawkins](https://AllAboutKen.com), [Fershad Irani](https://www.fershad.com), [Nikita Dubko](https://mefody.dev/), [Aaron Gustafson](https://www.aaron-gustafson.com), [Chris](https://www.chrisswithinbank.net/), [Christian Miles](https://cjlm.ca), [Benjamin Geese](https://benjamingeese.de), [Marcus Relacion](https://www.marcusrelacion.com), [Netin nopeustesti](https://netinnopeustesti.com/), [Cthos](https://alextheward.com), [Sia Karamalegos](https://sia.codes/), [Jon Kuperman](https://jonkuperman.com/), [Raphael Höser](https://hoeser.dev), [Saneef Ansari](https://saneef.com), [Flemming Meyer](https://fokus.design/), Colin Fahrion, [Dan Burzo](https://danburzo.ro), [Dan Ott](https://dtott.com), [Mobilemall.pk](https://mobilemall.pk/), [Cheap VPS](https://vpsdime.com/), [David Darnes](https://darn.es), [Michel van der Kroef](https://neckam.nl), [Jon Roobottom](https://roobottom.com), [Dana Byerly](https://danabyerly.com), [Oisín Quinn](https://oisin.io), [Renkaatsopivasti](https://renkaatsopivasti.fi), [Windesol Sähkön Kilpailutus](https://windesol.fi), [Luke Mitchell](https://www.interroban.gg), SignpostMarv, [THE PADDING](https://paddn.com/hk), [Bob Monsour](https://www.bobmonsour.com/), Patrick Byrne, zapscribbles, Frank Reding, quinnanya, [Richmond Insulation](https://www.centralvainsulation.com), [Cory Birdsong](https://birdsong.dev), Aram ZS, Andy Stevenson, [HelppoHinta.fi](https://helppohinta.fi/), Robin Rendle, [Tanner Dolby](https://tannerdolby.com), [jpoehnelt](https://justin.poehnelt.com), [Richmond Concrete](https://www.richmondconcretepros.com), [Andrew Weisbeck](https://geauxweisbeck4.dev), [Tom](https://tomquinonero.com), [CelineDesign](https://www.celinedesign.com), Nic Chan, Duc Lam, [Alex Zappa](https://alex.zappa.dev/), [Stephen Bell](https://steedgood.com), Brett DeWoody, alistairtweedie, [Meta Tier List](https://metatierlist.com), [xdesro](https://henry.codes), [Alexander Wunschik](https://www.wunschik.it), Robert Haselbacher, [Lene](https://www.lenesaile.com), [Iva Tech](https://ivatech.dev), kylepfeeley, Daniel Saunders, [Dan Urbanowicz](https://danurbanowicz.com), [dan leatherman](https://danleatherman.com/), [Viewality Media](https://www.viewalitymedia.com/), [Aviator Game](https://aviatorgame.guru), [Softermii](https://www.softermii.com), Eric Carlisle, Claus Conrad, [CBD Review](https://cbd.topreview.com), Eric Gallager
