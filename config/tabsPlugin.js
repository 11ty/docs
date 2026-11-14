import { highlightCode } from "./syntaxHighlightPlugin.js";
import { renderTablist } from "../src/_includes/syntax-chooser-tablist.11ty.js";

let uidCounter = 0;

// ```<language> <tab key>
const PANEL_OPEN = /^```([a-z0-9-]*)[ \t]+([a-z0-9]+)[ \t]*$/i;

function parsePanels(content) {
	let panels = [];
	let open;

	for (let line of String(content).split("\n")) {
		if (open) {
			if (line.trimEnd() === "```") {
				panels.push({ ...open, code: open.code.join("\n") });
				open = undefined;
			} else {
				open.code.push(line);
			}
			continue;
		}

		let match = line.match(PANEL_OPEN);
		if (match) {
			open = { language: match[1], key: match[2], code: [] };
		}
	}

	if (open) {
		throw new Error(`Unclosed \`\`\`${open.language} ${open.key} block in a \`tabs\` shortcode.`);
	}

	return panels;
}

// Mirrors edit-on-github.njk, which stays the include used by hand-written templates
function editOnGithubHtml({ config, page } = {}) {
	if (!config?.githubEdit || !page?.inputPath) {
		return "";
	}

	return `<a href="${config.githubEdit}${page.inputPath}" class="elv-externalexempt"><i class="fa-regular fa-pen-to-square"></i>Edit this page${config.outdated ? " (in latest version)" : ""}</a>`;
}

export function codeTitleHtml(title, heading = "Filename") {
	return `<div class="codetitle codetitle-left"><b>${heading} </b>${title}</div>`;
}

export function renderTabs(content, id, options = {}) {
	let { title, titles, titleHeading, load, inputPath, missing, context } = options;
	id ??= `tab-id-${++uidCounter}`;
	let panels = parsePanels(content);

	// `missing` names tabs we haven’t written an example for yet
	for (let key of (missing || "").split(",").filter(Boolean)) {
		panels.push({ key, missing: true });
	}

	if (!panels.length) {
		throw new Error(`No fenced code blocks found in the \`tabs\` shortcode for "${id}".`);
	}

	let tablist = renderTablist({ id, syntaxes: panels.map((panel) => panel.key) });
	let tabpanels = panels.map((panel) => {
		if (panel.missing) {
			let link = context ? editOnGithubHtml(context) : "";
			return `  <div id="${id}-${panel.key}" role="tabpanel">
    <p><em>This example has not yet been added—you can swap to another template language above! Or maybe you want to contribute it? ${link}</em></p>
  </div>`;
		}

		let code = highlightCode(panel.code, panel.language, undefined, { inputPath });
		let panelTitle = titles?.[panel.key] ? codeTitleHtml(titles[panel.key], titleHeading) : "";
		return `  <div id="${id}-${panel.key}" role="tabpanel">${panelTitle}${code}  </div>`;
	});

	let attrs = [
		options.flush === false ? "" : ` class="tabs-flush"`,
		options.persist === false ? "" : " persist",
		options.sync === false ? "" : " sync",
		options.autoheight === false ? "" : " autoheight",
	].join("");

	// The filename rides inside the component, so the float it uses can’t push the component around
	let titleHtml = title ? `<div class="codetitle codetitle-right-md">${title}</div>\n` : "";

	let tabs = `<seven-minute-tabs${attrs}>
${titleHtml}  ${tablist}
${tabpanels.join("\n")}
</seven-minute-tabs>`;

	// How the tabs script loads: on scroll by default, sooner for tabs above the fold
	if (load === "none") {
		return tabs;
	}

	if (load === "eager") {
		return `<script type="module" src="/js/seven-minute-tabs.js"></script>
${tabs}`;
	}

	return `<is-land${load === "immediate" ? "" : " on:visible"} import="/js/seven-minute-tabs.js">
${tabs}
</is-land>`;
}

export default function ($config) {
	$config.on("eleventy.before", () => {
		uidCounter = 0;
	});

	$config.addShortcode("uid", () => `id-${++uidCounter}`);

	$config.addPairedShortcode("tabs", function (content, id, options = {}) {
		// `id` is optional: {% tabs { title: "…" } %} generates one
		if (id && typeof id === "object") {
			options = id;
			id = undefined;
		}

		return renderTabs(content, id, {
			...options,
			inputPath: this.page.inputPath,
			context: this,
		});
	});
}
