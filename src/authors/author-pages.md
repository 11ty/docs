---js
let pagination = {
	data: "authors",
	size: 1,
	alias: "author",
	resolve: "values",
	generatePageOnEmptyData: true,
};
let permalink = "/authors/{{ author.name | slugify }}/";
let excludeFromSearch = true;
let layout = "layouts/docs.njk";

let eleventyNavigation = {
	parent: "Authors",
};
let excludeFromSidebar = true;
let eleventyComputed = {
	social: {
		description: "{{ author.name }} is one of the lovely authors featured on 11ty.dev"
	}
};
---

<style>{% include "components/page-sites.css" %}</style>

{%- set githubUrl = "https://github.com/" + author.name %}
{%- set supporter = opencollective.supporters | isSupporter(author.name, author.opencollective) -%}
{%- set displayName = supporter.name or author.name %}

# {{ displayName }}

- <a href="{{ githubUrl }}">{% communityavatar author.name %}{{ author.name }}</a> on GitHub
{%- if supporter %}
- <a href="{{ supporter.profile }}" class="elv-externalexempt supporters-link"><strong>{% if supporter.tier and supporter.isActive %} {% emoji "📅" %} Monthly{% endif %} Eleventy Contributor</strong> on Open Collective</a> 🎈
{%- else %}
- <a href="https://opencollective.com/11ty">Not yet <strong>Supporting Eleventy</strong> on Open Collective.</a>
- <em>Already a supporter but it’s not showing here? Make sure your GitHub account is listed the <em>social links</em> section of your Open Collective Profile.</em>
{%- endif %}

{%- if author.business_url and supporter | isBusinessPerson %}

### Member of the [Eleventy Super Professional Business Network {% emoji "💼" %}](/super-professional-business-network/)

<a href="{{ author.business_url }}" class="btn-primary brand-typeface rainbow-active rainbow-active-noanim elv-externalexempt">Let’s Do Business</a>
{%- endif %}

{%- set authorStarters = starters | sortObjectByOrder | findBy("author", author.name) %}
{%- if authorStarters.length %}

### {{ displayName }}’s Starter Projects:

{%- for site in authorStarters %}
{%- if not site.disabled %}
- [{{ site.name }}]({{ site.url }}){% if site.description %} {{ site.description}}{% endif %}
{%- endif %}
{%- endfor %}
{%- endif %}

{%- set authorPlugins = plugins | sortObjectByOrder | findBy("author", author.name) %}
{%- if authorPlugins.length %}

### {{ displayName }}’s Plugins:

{%- for plugin in authorPlugins %}
- [{% if plugin.deprecated %}~~{% endif %}{{ plugin.npm }}{% if plugin.deprecated %}~~{% endif %}](https://www.npmjs.com/package/{{ plugin.npm }}){% if plugin.description %} {% if plugin.deprecated %}~~{% endif %}{{ plugin.description | safe }}{% if plugin.deprecated %}~~{% endif %}{% endif %} {{ plugin.deprecated }}
{%- endfor %}
{%- endif %}

### {{ displayName }}’s Sites:

{% css %}
.site-score speedlify-score {
flex-wrap: nowrap;
}
.site-score speedlify-score {
margin-top: .5em;
}
.site-score .speedlify-rank {
font-weight: 700;
}
.site-score .speedlify-rank:before {
font-weight: 400;
}
.site-score .speedlify-rank-change.down {
display: none;
}
{% endcss %}

<div class="fl sites-lo" style="--fl-gap-h: 2rem; --fl-gap-v: 1rem; --fl-stackpoint: 31.25em;">
{%- for site in author.sites %}
	{%- set showMetadata = true %}
	{% include "site.njk" %}
{%- endfor %}
</div>

### Demos, Examples, and Community Links

<div class="sites-vert">
	<div class="lo-grid">
{% for key, site in demos -%}{% if site.twitter.toLowerCase() == author.name.toLowerCase() or (site.authoredBy and site.authoredBy.includes(author.name)) -%}
	{% include "site-card.njk" %}
{%- endif %}{%- endfor %}
{%- for key, entry in community %}
{%- if entry.author == author.name.toLowerCase()  -%}
	{%- set site = entry | convertCommunityLinkToSiteCard -%}
	{% include "site-card.njk" %}
{%- endif %}
{%- endfor %}
	</div>
</div>
