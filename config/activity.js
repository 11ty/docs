import Fetch from "@11ty/eleventy-fetch";
import { Importer } from "@11ty/import";
import { dateToRfc822 } from "@11ty/eleventy-plugin-rss";

export default async function () {
	let importer = new Importer();

	// Entries are read, never written to disk
	importer.setDryRun(true);
	importer.setAssetReferenceType("disabled");
	importer.setVerbose(false);
	importer.setCacheDuration("12h"); // note that cache is persisted on CI server

	// The Eleventy Activity Feed
	importer.addSource("youtubeUser", {
		label: "YouTube",
		url: "UCskGTioqrMBcw8pd14_334A",
	}); // Eleventy
	importer.addSource("atom", {
		label: "Blog",
		url: "https://www.11ty.dev/blog/feed.xml",
	});
	importer.addSource("atom", {
		label: "Quick Tips",
		url: "https://www.11ty.dev/docs/quicktips/feed.xml",
	});
	importer.addSource("fediverse", {
		label: "Mastodon",
		url: "@eleventy@fosstodon.org",
	});
	importer.addSource("fediverse", {
		label: "Mastodon",
		url: "@11ty@neighborhood.11ty.dev",
	});
	importer.addSource("bluesky", { label: "Bluesky", url: "@11ty.dev" });

	if (process.env.NODE_ENV === "production") {
		// Warning: at time of writing Eleventy has 51 repos, beware if this grows beyond the max of 100
		const PER_PAGE = 100; // max: 100
		let githubOrgRepos = await Fetch(
			`https://api.github.com/orgs/11ty/repos?per_page=${PER_PAGE}`,
			{
				type: "json",
				duration: "12h",
				directory: ".cache/eleventy-fetch/",
				fetchOptions: {
					headers: {
						Authorization: `bearer ${process.env.GITHUB_READ_TOKEN}`,
					},
				},
			}
		);

		for (let repository of githubOrgRepos) {
			if (repository.visibility === "public") {
				importer.addSource("atom", {
					label: `GitHub Releases [${repository.full_name}]`,
					url: `https://github.com/${repository.full_name}/releases.atom`,
				});
			}
		}
	} else {
		// only use core for local dev
		importer.addSource("atom", {
			label: `GitHub Releases [11ty/eleventy]`,
			url: `https://github.com/11ty/eleventy/releases.atom`,
		});
	}

	async function getEntries() {
		let entries = await importer.getEntries({ contentType: "html" });

		// Skip entries that start with <del>
		return entries.filter((entry) => {
			return (
				!(entry.title || "").trim().startsWith("<del>") &&
				!(entry.content || "").trim().startsWith("<del>")
			);
		});
	}

	return {
		importer,
		getEntries,
		async toRssFeed(metadata = {}) {
			let entries = await getEntries();
			let url = metadata.url?.home || metadata.url;
			let feedUrl = metadata.url?.feed || url;

			return `<?xml version="1.0" encoding="utf-8"?>
<rss version="2.0" xmlns:dc="http://purl.org/dc/elements/1.1/" xml:base="${url}" xmlns:atom="http://www.w3.org/2005/Atom">
	<channel>
		<title>${metadata.title}</title>
		<link>${url}</link>
		<atom:link href="${feedUrl}" rel="self" type="application/rss+xml" />
		<description>${metadata.subtitle}</description>
		<language>${metadata.language}</language>
		${entries
			.map((entry) => {
				return `
		<item>
			<title>${entry.sourceLabel}: ${entry.title}</title>
			<link>${entry.url}</link>
			<description><![CDATA[${entry.content || ""}]]></description>
			<pubDate>${dateToRfc822(entry.date)}</pubDate>
${(entry.authors || []).map((author) => `			<dc:creator>${author.name}</dc:creator>\n`).join("")}
			<guid>${entry.url}</guid>
		</item>`;
			})
			.join("\n")}
	</channel>
</rss>`;
		},
	};
}
