// Renders the “On this page” list at build time so it exists without JS; `<table-of-contents>`
// adopts a child list as-is and only wires up scroll tracking.

const BUILD_ATTR = "data-toc-build";
const NON_TEXT_TAGS = new Set(["button", "script", "style", "template"]);

function walk(node, visit) {
	if (!Array.isArray(node.content)) {
		return;
	}
	for (let child of node.content) {
		if (typeof child === "string") {
			continue;
		}
		visit(child);
		walk(child, visit);
	}
}

function hasAttr(node, name) {
	return node.attrs ? name in node.attrs : false;
}

function textContent(node, skip) {
	if (!Array.isArray(node.content)) {
		return "";
	}
	let text = "";
	for (let child of node.content) {
		if (typeof child === "string") {
			text += child;
		} else if (!skip(child)) {
			text += textContent(child, skip);
		}
	}
	return text;
}

// Mirrors TableOfContents.getText so a server list reads the same as a generated one.
function headingText(heading) {
	let isExcluded = (node) => hasAttr(node, "data-toc-exclude");
	let fallback = textContent(heading, isExcluded).trim();

	let text = textContent(heading, (node) => {
		let attrs = node.attrs || {};
		return (
			isExcluded(node) ||
			NON_TEXT_TAGS.has(node.tag) ||
			hasAttr(node, "hidden") ||
			attrs["aria-hidden"] === "true" ||
			(node.tag === "a" && typeof attrs.href === "string" && attrs.href.startsWith("#"))
		);
	}).trim();

	return (text || fallback).replace(/\s+/g, " ");
}

// Ported from TableOfContents.generate so both paths nest identically.
export function generateList(headings) {
	let level = (heading) => parseInt(heading.tag.slice(1), 10);
	let root = { tag: "ol", content: [] };
	let stack = [{ level: level(headings[0]), list: root }];

	for (let heading of headings) {
		let headingLevel = level(heading);
		let top = stack.at(-1);
		let popped;

		while (stack.length > 1 && headingLevel < top.level) {
			popped = stack.pop();
			top = stack.at(-1);
		}

		if (stack.length === 1 && headingLevel < top.level) {
			top.level = headingLevel;
		} else if (headingLevel > top.level) {
			if (popped) {
				popped.level = headingLevel;
			} else {
				popped = { level: headingLevel, list: { tag: "ol", content: [] } };
				top.item.content.push(popped.list);
			}
			stack.push(popped);
			top = popped;
		}

		let text = headingText(heading);
		let id = heading.attrs?.id;
		top.item = {
			tag: "li",
			content: [id ? { tag: "a", attrs: { href: `#${id}` }, content: [text] } : text],
		};
		top.list.content.push(top.item);
	}

	return root;
}

export default function (eleventyConfig) {
	eleventyConfig.htmlTransformer.addPosthtmlPlugin(
		"html",
		function pageTocPosthtmlPlugin() {
			return function (tree) {
				let placeholders = [];
				let scope;

				walk({ content: tree }, (node) => {
					if (node.tag === "table-of-contents" && hasAttr(node, BUILD_ATTR)) {
						placeholders.push(node);
					} else if (node.attrs?.id === "skip-content") {
						scope = node;
					}
				});

				if (placeholders.length === 0) {
					return tree;
				}

				for (let placeholder of placeholders) {
					let tags = new Set(
						String(placeholder.attrs[BUILD_ATTR])
							.split(",")
							.map((tag) => tag.trim().toLowerCase())
							.filter(Boolean),
					);
					delete placeholder.attrs[BUILD_ATTR];

					let headings = [];
					if (scope) {
						walk(scope, (node) => {
							if (tags.has(node.tag) && !hasAttr(node, "data-ha-exclude")) {
								headings.push(node);
							}
						});
					}

					if (headings.length > 0) {
						placeholder.content = [generateList(headings)];
					}
				}

				return tree;
			};
		},
		{
			name: "11ty-website/page-toc",
			// Negative priority so this runs after IdAttributePlugin has assigned heading ids.
			priority: -1,
		},
	);
}
