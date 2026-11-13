import { feedPlugin } from "@11ty/eleventy-plugin-rss";

export default function($config) {
	$config.addCollection("docsFeed", function (collection) {
		return collection.getFilteredByGlob("src/docs/**/*.md").filter(entry => {
			// remove permalink: false templates
			return !!entry.url;
		}).sort((a, b) => {
			return a.date - b.date; // sort by date - ascending (feed plugin reverses)
		});
	});

	// Documentation Feed
	$config.addPlugin(feedPlugin, {
		type: "atom",
		outputPath: "/docs/feed.xml",
		collection: {
			name: "docsFeed",
			limit: 10,
		},
		metadata: {
			language: "en",
			title: "Eleventy Documentation",
			subtitle: "Updates to the Eleventy Documentation, sorted by recent git commits.",
			base: "https://www.11ty.dev/",
			author: {
				name: "Zach Leatherman"
			}
		}
	});

	// Quick Tips Feed
	$config.addPlugin(feedPlugin, {
		type: "atom",
		outputPath: "/docs/quicktips/feed.xml",
		collection: {
			name: "quicktips",
			limit: 0,
		},
		metadata: {
			language: "en",
			title: "Eleventy Quick Tips",
			subtitle: "All of the official Eleventy Quick Tips, in feed form.",
			base: "https://www.11ty.dev/",
			author: {
				name: "Zach Leatherman"
			}
		}
	});

	// Blog Feed
	$config.addPlugin(feedPlugin, {
		type: "atom",
		outputPath: "/blog/feed.xml",
		collection: {
			name: "blog",
			limit: 10,
		},
		metadata: {
			language: "en",
			title: "Eleventy Blog",
			subtitle: "News and updates about the Eleventy static site generator project.",
			base: "https://www.11ty.dev/",
			author: {
				name: "Zach Leatherman"
			}
		}
	});
}
