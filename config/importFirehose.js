import fs from "node:fs";
import Fetch from "@11ty/eleventy-fetch";
import { Importer } from "@11ty/import";

const OUTPUT_PATH = "src/_data/firehose.json";
// Newest entries kept, the page and the feed render all of them
const LIMIT = 50;

let importer = new Importer();
// Entries are saved to the data file, never written as posts
importer.setDryRun(true);
importer.setAssetReferenceType("disabled");
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

let entries = await importer.getEntries({ contentType: "html" });

let data = entries
	.filter((entry) => {
		// Skip entries that start with <del>
		return (
			!(entry.title || "").trim().startsWith("<del>") &&
			!(entry.content || "").trim().startsWith("<del>")
		);
	})
	// Entries arrive newest first
	.slice(0, LIMIT)
	// Only the fields the page and the feed render, `source` is a class instance
	.map(({ sourceLabel, title, url, content, date, authors }) => {
		return {
			sourceLabel,
			title,
			url,
			content: content || "",
			date,
			authors: (authors || []).map((author) => ({ name: author.name })),
		};
	});

fs.writeFileSync(OUTPUT_PATH, JSON.stringify(data, null, "\t"));

importer.logResults();
console.log(`Wrote ${data.length} entries to ${OUTPUT_PATH}`);
