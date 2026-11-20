import { decodeHTML } from "entities";
import { escapeText } from "entities/escape";

const html = String.raw;

const ICONS = {
	blog: "fa-solid fa-newspaper",
	"quick-tips": "fa-solid fa-lightbulb",
	youtube: "fa-brands fa-youtube",
	mastodon: "fa-brands fa-mastodon",
	bluesky: "fa-brands fa-bluesky",
	github: "fa-brands fa-github",
	"11ty-bundle": "fa-solid fa-box-open",
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

export function data() {
	return {
		headerTitle: "Eleventy Community",
		layout: "layouts/docs.njk",
		eleventyNavigation: {
			key: "Firehose",
			parent: "Community",
			order: 1.1,
		},
	};
}

const FILTERS = {
	youtube: "YouTube",
	github: "GitHub",
	blog: "Blog",
	"quick-tips": "Quick Tips",
	"11ty-bundle": "11ty Bundle",
};

export async function render({ firehose = [] }) {
	let counts = {};
	for (let entry of firehose) {
		let type = getSlugFromTitle(`${entry.sourceLabel}: ${entry.title}`);
		counts[type] = (counts[type] || 0) + 1;
	}

	return html` <h1>Build Awesome Firehose</h1>

		<p>
			This page shows activity from the <a href="https://www.11ty.dev/blog/">Eleventy Blog</a>,
			<a href="/docs/quicktips/">Quick Tips</a>,
			<a href="https://build.awesome.me/youtube">YouTube channel</a>, the
			<a href="https://11tybundle.dev/">11ty Bundle</a>, and <em>all</em> GitHub
			releases (all of <a href="https://github.com/11ty/"><code>11ty</code> org</a> repositories).
		</p>

		<ul>
			<li>
				<strong><a href="/firehose/firehose.rss">Subscribe to the Firehose RSS feed.</a></strong>
			</li>
			<li>
				Built using <a href="https://github.com/11ty/import"><code>@11ty/import</code></a
				>.
			</li>
		</ul>

		<hr />

		<style>
			.activity-feed .filter-type--hide {
				display: none;
			}
			.activity-feed form {
				display: flex;
				flex-wrap: wrap;
				align-items: center;
				gap: 0.5em;
				margin: 1em 0;
			}
			.activity-feed form label {
				display: inline-flex;
				align-items: center;
				gap: 0.35em;
				padding: 0.25em 0.75em;
				border: 1px solid var(--border-color);
				border-radius: 99em;
				cursor: pointer;
			}
			.activity-feed form label:has(:checked) {
				border-color: var(--brand-ba);
			}
			.activity-feed form label:not(:has(:checked)) {
				opacity: 0.6;
			}
			.activity-feed form input {
				margin: 0;
				accent-color: var(--brand-ba);
			}
			.activity-feed .filter-empty {
				display: inline-flex;
				align-items: center;
				gap: 0.35em;
				opacity: 0.6;
			}
			.activity-feed .filter-count {
				font-size: 0.8em;
				font-variant-numeric: tabular-nums;
				opacity: 0.7;
			}
			.activity-feed form .fa11ty-icon {
				margin: 0;
				width: 1.1em;
				height: 1.1em;
			}
			.activity-feed .link-card-hed {
				overflow-wrap: break-word;
			}
			/* Tints of the 11tybundle.dev primary, oklch(52% 0.1 60) */
			.activity-feed [data-filter-type="11ty-bundle"] .link-card {
				--border-color: oklch(80% 0.07 60);
				background-color: oklch(95% 0.03 60);
			}
			@media (prefers-color-scheme: dark) {
				.activity-feed [data-filter-type="11ty-bundle"] .link-card {
					--border-color: oklch(38% 0.07 60);
					background-color: oklch(25% 0.04 60);
				}
			}
		</style>

		<div class="activity-feed">
			<script type="module" src="/js/filter-container.js"></script>
			<filter-container oninit>
				<p data-filter-results="result/results" aria-live="polite"></p>

				<form>
					<strong>Filter:</strong>
					${Object.entries(FILTERS)
						.sort(([a], [b]) => (counts[b] || 0) - (counts[a] || 0))
						.map(([type, label]) => {
							let count = counts[type] || 0;
							let content = html`<i class="${ICONS[type]}"></i>
								${label}
								${count ? html`<span class="filter-count">${count}</span>` : ""}`;
							if (!count) {
								return html`<span class="filter-empty">${content}</span>`;
							}
							return html`<label>
								<input type="checkbox" value="${type}" data-filter-key="type" checked />
								${content}
							</label>`;
						})
						.join("\n")}
				</form>
				<ul class="lo-grid link-cards">
					${firehose
						.map((entry) => {
							let type = getSlugFromTitle(`${entry.sourceLabel}: ${entry.title}`);
							return html`<li data-filter-type="${type}">
								<a href="${entry.url}" class="link-card elv-externalexempt">
									<i class="${ICONS[type] || "fa-solid fa-fire"}"></i>
									<span class="link-card-c">
										<span class="link-card-hed">${escapeText(decodeHTML(entry.title))}</span>
										<span class="link-card-sub">${escapeText(entry.sourceLabel)}</span>
										<span class="link-card-cadence"
											><i class="fa-regular fa-clock"></i
											><time datetime="${this.toISO(entry.date)}"
												>${this.newsDate(entry.date)}</time
											></span
										>
									</span>
								</a>
							</li>`;
						})
						.join("\n")}
				</ul>
			</filter-container>
		</div>`;
}
