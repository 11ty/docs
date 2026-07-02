import slugify from "@sindresorhus/slugify";
import markdownItToc from "markdown-it-table-of-contents";
import { IdAttributePlugin } from "@11ty/eleventy";
import memoize from "memoize";

const markdownItSlugify = memoize((s => {
	return slugify(removeExtraText(s));
}));

function removeExtraText(s) {
	let newStr = String(s);
	newStr = newStr.replace(/\-(alpha|beta|canary)\.\d+/, "");
	newStr = newStr.replace(/(New\ in|Added\ in|Pre-release\ only)\ v\d+\.\d+\.\d+/, "");
	newStr = newStr.replace(/[⚠️?!]/g, "");
	newStr = newStr.replace(/[\=\":’'`,]/g, "");
	newStr = newStr.replace(/<[^>]*>/g, "");
	return newStr;
}

export default function (eleventyConfig) {
	eleventyConfig.addPlugin(IdAttributePlugin, {
		// custom slugify function, otherwise we use Eleventy’s built-in `slugify` filter.
		slugify: markdownItSlugify,
		selector: "h1,h2,h3,h4,h5,h6", // default
	});

	let mdIt;
	eleventyConfig.amendLibrary("md", (mdLib) => {
		mdIt = mdLib;
		mdLib.use(markdownItToc, {
			includeLevel: [2, 3],
			slugify: markdownItSlugify,
			format: function (heading) {
				return removeExtraText(heading);
			},
			transformLink: function (link) {
				if (typeof link === "string") {
					// remove backticks from markdown code
					return link.replace(/\%60/g, "");
				}
				return link;
			},
		});

		// opt out of linkification for .io TLD, e.g. 11ty.io
		mdLib.linkify.tlds(".io", false);
	});

	const renderMarkdownInline = memoize(content => {
		return mdIt.renderInline(content);
	});

	eleventyConfig.addPairedShortcode("markdown", renderMarkdownInline);
	eleventyConfig.addFilter("markdown", renderMarkdownInline);

	// WebC migration: callout.webc
	eleventyConfig.addPairedShortcode(
		"callout",
		function (content, level = "", format = "html", customLabel = "") {
			if (format === "md") {
				content = mdIt.renderInline(content);
			} else if (format === "md-block") {
				content = mdIt.render(content);
			}
			let label = "";
			let classLevel = "";
			if (customLabel) {
				label = customLabel;
				classLevel = "elv-callout-info";
			}

			if (level === "error") {
				if(!customLabel) {
					label = level.toUpperCase();
				}
				classLevel = "elv-callout-error";
			} else if (level === "warn") {
				if(!customLabel) {
					label = "WARNING";
				}
				classLevel = "elv-callout-warn";
			} else if(level === "info") {
				// label is skipped
				classLevel = "elv-callout-info";
			} else if(level === "brand") {
				// label is skipped
				classLevel = "elv-callout-brand";
			} else if(level === "demo") {
				// label is skipped
				classLevel = "elv-callout-skew elv-callout-skew--demo";
			} else if(level === "pitfall") {
				// label is skipped
				classLevel = "elv-callout-skew elv-callout-skew--pitfall";
			}

			let labelHtml = label
				? `<div class="elv-callout-label">${customLabel || label}</div>`
				: "";
			let contentHtml =
				(content || "").trim().length > 0
					? `<div class="elv-callout-c">${content}</div>`
					: "";

			return `<div class="elv-callout${classLevel ? ` ${classLevel}` : ""}">${labelHtml}${contentHtml}</div>`;
		}
	);

	eleventyConfig.addShortcode("tableofcontents", function (isOpen) {
		// Markdown only.
		if (this.page.inputPath.endsWith("md")) {
			return `<details class="toc"${isOpen ? " open" : ""}>
<summary>On this page</summary>

[[toc]]

</details>`;
		}
	});
}
