import activity from "../config/activity.js";

const PERMALINK = "/firehose/firehose.rss";

export default class {
	data() {
		return {
			permalink: PERMALINK,
			layout: false,
			eleventyExcludeFromCollections: true,
		};
	}

	async render() {
		const feed = await activity();

		return feed.toRssFeed({
			title: "The Eleventy Firehose",
			subtitle: "One centralized feed of Eleventy activity across the web.",
			language: "en",
			url: `https://build.awesome.me${PERMALINK}`,
		});
	}
}
