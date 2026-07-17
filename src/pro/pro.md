---js
// <script>
let headerTitle = "Build Awesome Pro";
let searchTitle = "Build Awesome Pro is the easiest way to launch and maintain a web site";
let layout = "layouts/docs.njk";

let eleventyComputed = {
	social: {
		description: () => "Build Awesome Pro is a web site builder with visual editing and collaboration and zero lock-in."
	},
};
// </script>
---
# Build Awesome Pro

**Build Awesome Pro** is a new service we’re building to help anyone launch and maintain a web site—<strong>no installation required</strong>. It’s a web site builder boasting visual editing and collaboration, <em>zero lock-in</em> (ever), while ultimately helping to fund continued <a href="/docs/">Build Awesome (Eleventy)</a> maintenance for the entire community.</p>

{% callout "brand", "html", "" %}
<div class="util-flex util-center">
	<a class="announcement-btn announcement-btn--inline announcement-btn--disabled"><i class="fa-brands fa-build-awesome"></i>Build Awesome Pro <span class="announcement-tag">Coming Soon!</span></a>
	<a href="/docs/">Or install locally (free)<i class="fa-solid fa-arrow-right util-icon-sm"></i></a>
</div>
{% endcallout %}

Look, we even made a fun video and a [Kickstarter]({{ config.kickstarterUrl }}) to introduce the thing:

{# autoplay disabled #}
<iframe loading="lazy" class="video-player" src="https://player.vimeo.com/video/1168551192?h=6ba669b3ff&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479&amp;dnt=1" frameborder="0" allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share" referrerpolicy="strict-origin-when-cross-origin" title="Now on Kickstarter: Build Awesome — Collaborate on Websites That Last"></iframe>

_You can also watch it on [YouTube](https://www.youtube.com/watch?v=G4Xm4lLmRgg)_.

Our [Kickstarter]({{ config.kickstarterUrl }}) was funded successfully by **{{ kickstarterStats.backers }} lovely folks** ({{ kickstarterStats.percentFunded }}% funded). If one of those people is you: **thank you**!

## Features

<ul class="lo-grid m-8" style="--lo-grid-repeat: 2; --lo-c-minwidth: min(100%, 15rem); --fl-gap-h: 8vw; --fl-gap-v: 2em;">
	<li><strong>No installation required.</strong> Build Awesome Pro runs on our servers — Build Awesome (free) runs on yours. Skip the terminal and get straight to building.</li>
	<li><strong>Publish on the go.</strong> Return to the office? No thank you! Add new content from any device with a web browser.</li>
	<li><strong>Visual editing.</strong> Edit your site’s content and preview your changes live.</li>
	<li><strong>Collaboration.</strong> Work on your site together with your community and colleagues.</li>
	<li><strong>Zero lock-in, ever.</strong> Your site is built on open standards and the open-source Build Awesome (Eleventy) tool. Take your content and leave any time you like—it’s yours.</li>
	<li><strong>Funds the open-source project.</strong> Every Build Awesome Pro subscription helps fund continued Build Awesome (Eleventy) maintenance for the entire community.</li>
</ul>

{% callout "info", "html", "" %}
<div class="util-flex util-center">
	<a href="{{ config.kickstarterUrl }}" class="announcement-btn announcement-btn--inline">Late pricing is still available for the <i class="fa-brands fa-kickstarter"></i>Kickstarter <span class="announcement-tag">Funded!</span></a>
</div>
{% endcallout %}

## Build Awesome Timeline

{% include "related-build-awesome.njk" %}