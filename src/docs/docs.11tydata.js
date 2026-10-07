import slugify from "@sindresorhus/slugify";
import memoize from "memoize";
import { createToc } from "../../config/toc.js";

function removeExtraText(s) {
	let newStr = String(s);
	newStr = newStr.replace(/\-(alpha|beta|canary)\.\d+/, "");
	newStr = newStr.replace(
		/(New\ in|Added\ in|Pre-release\ only)\ v\d+\.\d+\.\d+/,
		"",
	);
	newStr = newStr.replace(/[!?!]/g, "");
	newStr = newStr.replace(/[\=\":''`,]/g, "");
	newStr = newStr.replace(/<[^>]*>/g, "");
	return newStr;
}

const markdownItSlugify = memoize((s) => {
	return slugify(removeExtraText(s));
});

let data = {
	layout: "layouts/docs.njk",
	headerTitle: "Eleventy Documentation",
	feedTitle: "Eleventy Documentation",
	feedUrl: "/docs/feed.xml",
	eleventyComputed: {
		tocData: (data) => {
			const cleaned = data.page.rawInput
				// Strip frontmatter
				.replace(/^---[\s\S]*?---\n*/m, "")
				// Strip raw blocks (code examples) entirely
				.replace(/\{%[-\s]*raw\s*%\}[\s\S]*?\{%[-\s]*endraw\s*%\}/g, "")
				// Strip remaining nunjucks tags
				.replace(/\{%.*?%\}/gs, "")
				.replace(/\{\{.*?\}\}/gs, "");
			const toc = createToc(cleaned, {
				includeLevel: [2, 3],
				slugify: markdownItSlugify,
				getTokensText(tokens) {
					return removeExtraText(
						tokens
							.filter((t) => ["text", "code_inline"].includes(t.type))
							.map((t) => t.content)
							.join("")
							.trim(),
					);
				},
			});

			/**
			 * Recursive webc is not supported, workaround is to flatten.
			 * https://github.com/11ty/webc/issues/184
			 */
			function flatten(items, result = []) {
				for (const item of items) {
					if (item.anchor) {
						result.push({
							text: item.text,
							anchor: item.anchor,
							level: item.level,
						});
					}
					if (item.children?.length) {
						flatten(item.children, result);
					}
				}
				return result;
			}

			return flatten(toc.children);
		},
	},
};

if (process.env.NODE_ENV === "production") {
	data.date = "git Last Modified";
}

export default data;
