import { dateToRfc822 } from "@11ty/eleventy-plugin-rss";

const PERMALINK = "/firehose/firehose.rss";
const URL = `https://www.11ty.dev${PERMALINK}`;

export default class {
	data() {
		return {
			permalink: PERMALINK,
			layout: false,
			eleventyExcludeFromCollections: true,
		};
	}

	render({ firehose = [] }) {
		return `<?xml version="1.0" encoding="utf-8"?>
<rss version="2.0" xmlns:dc="http://purl.org/dc/elements/1.1/" xml:base="${URL}" xmlns:atom="http://www.w3.org/2005/Atom">
	<channel>
		<title>The Eleventy Firehose</title>
		<link>${URL}</link>
		<atom:link href="${URL}" rel="self" type="application/rss+xml" />
		<description>One centralized feed of Eleventy activity across the web.</description>
		<language>en</language>
		${firehose
			.map((entry) => {
				return `
		<item>
			<title>${entry.sourceLabel}: ${entry.title}</title>
			<link>${entry.url}</link>
			<description><![CDATA[${entry.content || ""}]]></description>
			<pubDate>${dateToRfc822(new Date(entry.date))}</pubDate>
${entry.authors.map((author) => `			<dc:creator>${author.name}</dc:creator>\n`).join("")}
			<guid>${entry.url}</guid>
		</item>`;
			})
			.join("\n")}
	</channel>
</rss>`;
	}
}
