import { decodeHTML } from "entities";
import { escapeText } from "entities/escape";
import activity from "../config/activity.js";

const html = String.raw;

const ICONS = {
	blog: "fa-solid fa-newspaper",
	"quick-tips": "fa-solid fa-lightbulb",
	youtube: "fa-brands fa-youtube",
	mastodon: "fa-brands fa-mastodon",
	bluesky: "fa-brands fa-bluesky",
	github: "fa-brands fa-github",
};

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

<p>This page shows activity from the <a href="https://www.11ty.dev/blog/">Eleventy Blog</a>, <a href="/docs/quicktips/">Quick Tips</a>, <a href="https://build.awesome.me/youtube">YouTube channel</a>, <a href="https://build.awesome.me/mastodon">Mastodon account</a>, and <em>all</em> GitHub releases (all of <a href="https://github.com/11ty/"><code>11ty</code> org</a> repositories).</p>

<ul>
	<li><strong><a href="/firehose/firehose.rss">Subscribe to the Firehose RSS feed.</a></strong></li>
	<li>Built using <a href="https://github.com/11ty/eleventy-activity-feed"><code>eleventy-activity-feed</code></a>.</li>
</ul>

<hr>

<style>
.activity-feed .filter-type--hide { display: none; }
.activity-feed form { margin: 1em 0; }
.activity-feed .link-card-hed { overflow-wrap: break-word; }
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
		<ul class="lo-grid link-cards">
${entries
	.map((entry) => {
		let type = getSlugFromTitle(`${entry.sourceLabel}: ${entry.title}`);
		return html`<li data-filter-type="${type}">
			<a href="${entry.url}" class="link-card elv-externalexempt">
				<i class="${ICONS[type] || "fa-solid fa-fire"}"></i>
				<span class="link-card-c">
					<span class="link-card-hed">${escapeText(decodeHTML(entry.title))}</span>
					<span class="link-card-sub">${escapeText(entry.sourceLabel)}</span>
					<span class="link-card-cadence"><i class="fa-regular fa-clock"></i><time datetime="${this.toISO(entry.date)}">${this.newsDate(entry.date)}</time></span>
				</span>
			</a>
		</li>`;
	})
	.join("\n")}
		</ul>
	</filter-container>
</div>`;
}
