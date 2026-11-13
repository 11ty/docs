---
eleventyNavigation:
  parent: Shortcodes
  key: Custom Tags
relatedKey: custom-tags
relatedTitle: Template Custom Tags
tags:
  - related-shortcodes
  - related-nunjucks
  - related-liquid
excludeFromSidebar: true
---

# Custom Tags

{% callout "info" %}It’s unlikely that you want this feature. You probably want <a href="/docs/shortcodes/">shortcodes</a> instead, Eleventy’s custom tags sugar (it’s easier to use).{% endcallout %}

Various template engines can be extended with custom tags.

Custom Tags are unrelated to Eleventy’s [Collections using Tags](/docs/collections/) feature. Unfortunately we’ve inherited this name from various upstream template languages.

But, after all that, you can still add a Custom Tag using the [Configuration API](/docs/config/).

## Liquid

- [LiquidJS: Tags](https://liquidjs.com/tutorials/register-filters-tags.html)

{% set codeContent %}
export default function (eleventyConfig) {
{% raw %}  // Usage: {% uppercase myVar %} where myVar has a value of "alice"
  // Usage: {% uppercase "alice" %}{% endraw %}
  eleventyConfig.addLiquidTag("uppercase", function (liquidEngine) {
    return {
      parse: function (tagToken, remainingTokens) {
        this.str = tagToken.args; // myVar or "alice"
      },
      render: async function (scope, hash) {
        // Resolve variables
        var str = await this.liquid.evalValue(this.str, scope); // "alice"

        // Do the uppercasing
        return str.toUpperCase(); // "ALICE"
      },
    };
  });
};
{% endset %}
{% include "snippets/configDefinition.njk" %}

See all of the [built-in tag implementations for LiquidJS](https://liquidjs.com/tags/overview.html).

## Nunjucks

- [Nunjucks: Custom Tags](https://mozilla.github.io/nunjucks/api.html#custom-tags)

{% set codeContent %}
export default function (eleventyConfig) {
{% raw %}  // Usage: {% uppercase myVar %} where myVar has a value of "alice"
  // Usage: {% uppercase "alice" %}{% endraw %}
  eleventyConfig.addNunjucksTag("uppercase", function (nunjucksEngine) {
    return new (function () {
      this.tags = ["uppercase"];

      this.parse = function (parser, nodes, lexer) {
        var tok = parser.nextToken();

        var args = parser.parseSignature(null, true);
        parser.advanceAfterBlockEnd(tok.value);

        return new nodes.CallExtensionAsync(this, "run", args);
      };

      this.run = function (context, myStringArg, callback) {
        let ret = new nunjucksEngine.runtime.SafeString(
          myStringArg.toUpperCase()
        );
        callback(null, ret);
      };
    })();
  });
};
{% endset %}
{% include "snippets/configDefinition.njk" %}
