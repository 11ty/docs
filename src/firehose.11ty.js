// import { decodeHTML } from "entities";
import { escapeText } from "entities/escape";
import activity from "../config/activity.js";

const html = String.raw;

function getSlugFromTitle(str) {
	if (str.startsWith("GitHub Releases [")) {
		return "github";
	}

	if (str.includes(": ")) {
		return str.split(": ")[0].replace(/\s/g, "-").toLowerCase();
	}
	return "";
}

export async function data() {
	const feed = await activity();
	const entries = await feed.getEntries();

	return {
		headerTitle: "Eleventy Community",
		entries: entries,
		layout: "layouts/docs.njk",
		eleventyNavigation: {
			key: "Firehose",
			parent: "Community",
			order: 1.1,
		}
	};
}

export async function render({ entries }) {
	return html`
<h1>Build Awesome Firehose</h1>

<p>This page shows activity from the <a href="/blog/">Build Awesome Blog</a>, <a href="/docs/quicktips/">Quick Tips</a>, <a href="https://build.awesome.me/youtube">YouTube channel</a>, <a href="https://build.awesome.me/mastodon">Mastodon account</a>, and <em>all</em> GitHub releases (all of <a href="https://github.com/11ty/"><code>11ty</code> org</a> repositories).</p>

<ul>
	<li><strong><a href="/firehose/firehose.rss">Subscribe to the Firehose RSS feed.</a></strong></li>
	<li>Built using <a href="https://github.com/11ty/eleventy-activity-feed"><code>eleventy-activity-feed</code></a>.</li>
</ul>

<hr>

<style>
.activity-feed .elv-callout-box { max-width: 35em; }
.activity-feed .filter-type--hide { display: none; }
.activity-feed form { margin: 1em 0; }
.activity-feed a[href] {
	-ms-word-break: break-all;
	word-break: break-all;
	word-break: break-word;

	/* Disable hyphenation */
	-webkit-hyphens: manual;
	-ms-hyphens: manual;
	hyphens: manual;
}
</style>

<div class="activity-feed">
	<script type="module" src="/js/filter-container.js"></script>
	<filter-container oninit>
		<p data-filter-results="result/results" aria-live="polite"></p>

		<form>
			<strong>Filter:</strong>
			<label>
				<input type="checkbox" value="mastodon" data-filter-key="type">
				Mastodon
			</label>
			<label>
				<input type="checkbox" value="bluesky" data-filter-key="type">
				Bluesky
			</label>
			<label>
				<input type="checkbox" value="youtube" data-filter-key="type" checked>
				YouTube
			</label>
			<label>
				<input type="checkbox" value="github" data-filter-key="type" checked>
				GitHub
			</label>
			<label>
				<input type="checkbox" value="blog" data-filter-key="type" checked>
				Blog
			</label>
			<label>
				<input type="checkbox" value="quick-tips" data-filter-key="type" checked>
				Quick Tips
			</label>
		</form>
${entries
	.map((entry) => {
		// Only show content on Mastodon
		let content = entry.sourceLabel === "Mastodon" || entry.sourceLabel === "Bluesky"
			? entry.content || ""
			: "";

		if (
			entry.sourceLabel.startsWith("YouTube") &&
			entry.url.startsWith("https://www.youtube.com/watch?v=")
		) {
			// TODO support startTime in URL
			let slug = entry.url.slice("https://www.youtube.com/watch?v=".length);

			let startTime = 0;
			content = this.youtubeEmbed(slug, entry.title, startTime);
		}

		return `<div data-filter-type="${getSlugFromTitle(
			`${entry.sourceLabel}: ${entry.title}`
		)}">${this.callout(
			`<p><strong><a href="${entry.url}">${escapeText(entry.title)}</a></strong></p>`,
			"info",
			"html",
			entry.sourceLabel,
		)}</div>`;
	})
	.join("\n")}

	</filter-container>
</div>`;
}
