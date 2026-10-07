import MarkdownIt from "markdown-it";

//@ts-check

// Vendored from https://github.com/cmaas/markdown-it-table-of-contents
// MIT License
// Copyright (c) 2015-2020 Oktavilla, 2021+ Chris Maas

/*
 * markdown-it-table-of-contents
 *
 * The algorithm works as follows:
 * Step 1: Gather all headline tokens from a Markdown document and put them in an array.
 * Step 2: Turn the flat array into a nested tree, respecting the correct headline level.
 * Step 3: Turn the nested tree into HTML code.
 */

// --- Default helpers and options ---

/**
 * Slugify a string to be used as anchor
 * @param {string} text Text to slugify
 * @param {string} rawToken Raw token to extract text from
 * @returns {string} Slugified anchor string
 */
function slugify(text, rawToken) {
	return encodeURIComponent(
		String(text).trim().toLowerCase().replace(/\s+/g, "-"),
	);
}

/**
 * Helper to extract text from tokens, same function as in markdown-it-anchor
 * @param {Array<any>} tokens Tokens
 * @param {string} rawToken Raw token to extract text from
 * @returns {string}
 */
function getTokensText(tokens, rawToken) {
	return tokens
		.filter((t) => ["text", "code_inline"].includes(t.type))
		.map((t) => t.content)
		.join("")
		.trim();
}

const defaultOptions = {
	includeLevel: [1, 2],
	containerClass: "table-of-contents",
	slugify,
	markerPattern: /^\[\[toc\]\]/im,
	omitTag: "<!-- omit from toc -->",
	listType: "ul",
	containerHeaderHtml: undefined,
	containerFooterHtml: undefined,
	transformLink: undefined,
	getTokensText,
};

// --- Types ---

/**
 * @typedef {Object} HeadlineItem
 * @property {number} level Headline level
 * @property {string | null} anchor Anchor target
 * @property {string} text Text of headline
 * @property {any | null} token Raw token of headline
 */

/**
 * @typedef {Object} TocItem
 * @property {number} level Item level
 * @property {string} text Text of link
 * @property {string | null} anchor Target of link
 * @property {Array<TocItem>} children Sub-items for this list item
 * @property {TocItem | null} parent Parent this item belongs to
 */

// --- TOC builder ---

/**
 * Finds all headline items for the defined levels in a Markdown document.
 * @param {Array<number>} levels includeLevels like `[1, 2, 3]`
 * @param {*} tokens Tokens gathered by the plugin
 * @param {*} options Plugin options
 * @returns {Array<HeadlineItem>}
 */
function findHeadlineElements(levels, tokens, options) {
	/** @type {HeadlineItem[]} */
	const headings = [];

	/** @type {HeadlineItem | null} */
	let currentHeading = null;

	tokens.forEach((/** @type {*} */ token, /** @type {number} */ index) => {
		if (token.type === "heading_open") {
			const prev = index > 0 ? tokens[index - 1] : null;
			if (
				prev &&
				prev.type === "html_block" &&
				prev.content.trim().toLowerCase().replace("\n", "") === options.omitTag
			) {
				return;
			}
			const id = findExistingIdAttr(token);
			const level = parseInt(token.tag.toLowerCase().replace("h", ""), 10);
			if (levels.indexOf(level) >= 0) {
				currentHeading = {
					level: level,
					text: "",
					anchor: id || null,
					token: null,
				};
			}
		} else if (currentHeading && token.type === "inline") {
			const textContent = options.getTokensText(token.children, token);
			currentHeading.text = textContent;
			currentHeading.token = token;
			if (!currentHeading.anchor) {
				currentHeading.anchor = options.slugify(textContent, token);
			}
		} else if (token.type === "heading_close") {
			if (currentHeading) {
				headings.push(currentHeading);
			}
			currentHeading = null;
		}
	});

	return headings;
}

/**
 * Helper to find an existing id attr on a token. Should be a heading_open token, but could be anything really
 * Provided by markdown-it-anchor or markdown-it-attrs
 * @param {any} token Token
 * @returns {string | null} Id attribute to use as anchor
 */
function findExistingIdAttr(token) {
	if (token && token.attrs && token.attrs.length > 0) {
		const idAttr = token.attrs.find((/** @type {string | any[]} */ attr) => {
			if (Array.isArray(attr) && attr.length >= 2) {
				return attr[0] === "id";
			}
			return false;
		});
		if (idAttr && Array.isArray(idAttr) && idAttr.length >= 2) {
			const [_, val] = idAttr;
			return val;
		}
	}
	return null;
}

/**
 * Helper to get minimum headline level so that the TOC is nested correctly
 * @param {Array<HeadlineItem>} headlineItems Search these
 * @returns {number} Minimum level
 */
function getMinLevel(headlineItems) {
	return Math.min(...headlineItems.map((item) => item.level));
}

/**
 * Helper that creates a TOCItem
 * @param {number} level
 * @param {string} text
 * @param {string | null} anchor
 * @param {TocItem} rootNode
 * @returns {TocItem}
 */
function addListItem(level, text, anchor, rootNode) {
	const listItem = { level, text, anchor, children: [], parent: rootNode };
	rootNode.children.push(listItem);
	return listItem;
}

/**
 * Turns a list of flat headline items into a nested tree object representing the TOC
 * @param {Array<HeadlineItem>} headlineItems
 * @returns {TocItem} Tree of TOC items
 */
function flatHeadlineItemsToNestedTree(headlineItems) {
	// create a root node with no text that holds the entire TOC. this won't be rendered, but only its children
	/** @type {TocItem} */
	const toc = {
		level: getMinLevel(headlineItems) - 1,
		anchor: null,
		text: "",
		children: [],
		parent: null,
	};
	// pointer that tracks the last root item of the current list
	let currentRootNode = toc;
	// pointer that tracks the last item (to turn it into a new root node if necessary)
	let prevListItem = currentRootNode;

	headlineItems.forEach((headlineItem) => {
		// if level is bigger, take the previous node, add a child list, set current list to this new child list
		if (headlineItem.level > prevListItem.level) {
			// eslint-disable-next-line no-unused-vars
			Array.from({ length: headlineItem.level - prevListItem.level }).forEach(
				(_) => {
					currentRootNode = prevListItem;
					prevListItem = addListItem(
						headlineItem.level,
						"",
						null,
						currentRootNode,
					);
				},
			);
			prevListItem.text = headlineItem.text;
			prevListItem.anchor = headlineItem.anchor;
		}
		// if level is same, add to the current list
		else if (headlineItem.level === prevListItem.level) {
			prevListItem = addListItem(
				headlineItem.level,
				headlineItem.text,
				headlineItem.anchor,
				currentRootNode,
			);
		}
		// if level is smaller, set current list to currentlist.parent
		else if (headlineItem.level < prevListItem.level) {
			for (let i = 0; i < prevListItem.level - headlineItem.level; i++) {
				if (currentRootNode.parent) {
					currentRootNode = currentRootNode.parent;
				}
			}
			prevListItem = addListItem(
				headlineItem.level,
				headlineItem.text,
				headlineItem.anchor,
				currentRootNode,
			);
		}
	});

	return toc;
}

const markdownIt = MarkdownIt({ html: true, breaks: true, linkify: true });

export const createToc = (/** @type {any} */ md, /** @type {any} */ opts) => {
	const options = Object.assign({}, defaultOptions, opts);
	const tokens = markdownIt.parse(md, {});
	const headlineItems = findHeadlineElements(
		options.includeLevel,
		tokens,
		options,
	);

	return flatHeadlineItemsToNestedTree(headlineItems);
};
