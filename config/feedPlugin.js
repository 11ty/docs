import { feedPlugin } from "@11ty/eleventy-plugin-rss";

const FEED_BASE = "https://build.awesome.me/";

const METADATA_OPTIONS = {
	language: "en",
	base: FEED_BASE,
	author: {
		name: "Zach Leatherman"
	}
}

export default function(eleventyConfig) {
	eleventyConfig.addCollection("docsFeed", function (collection) {
		return collection.getFilteredByGlob("src/docs/**/*.md").filter(entry => {
			// remove permalink: false templates
			return !!entry.url;
		}).sort((a, b) => {
			return a.date - b.date; // sort by date - ascending (feed plugin reverses)
		});
	});

	// Documentation Feed
	eleventyConfig.addPlugin(feedPlugin, {
		type: "atom",
		outputPath: "/docs/feed.xml",
		collection: {
			name: "docsFeed",
			limit: 10,
		},
		metadata: {
			title: "Build Awesome Documentation",
			subtitle: "Updates to the Build Awesome Documentation, sorted by recent git commits.",
			...METADATA_OPTIONS,
		}
	});

	// Quick Tips Feed
	eleventyConfig.addPlugin(feedPlugin, {
		type: "atom",
		outputPath: "/docs/quicktips/feed.xml",
		collection: {
			name: "quicktips",
			limit: 0,
		},
		metadata: {
			title: "Build Awesome Quick Tips",
			subtitle: "All of the official Build Awesome Quick Tips, in feed form.",
			...METADATA_OPTIONS,
		}
	});

	// Blog Feed
	eleventyConfig.addPlugin(feedPlugin, {
		type: "atom",
		outputPath: "/blog/feed.xml",
		collection: {
			name: "blog",
			limit: 10,
		},
		metadata: {
			title: "Build Awesome Blog",
			subtitle: "News and updates about the Build Awesome site generator project.",
			...METADATA_OPTIONS,
		}
	});
}
