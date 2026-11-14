const EXTRA_SYNTAXES = {
	html: "HTML",
	md: "Markdown",
	webc: "WebC",
	jsesm: "ESM",
	jscjs: "CommonJS",
	any: "Any",
	hbs: "Handlebars",
};

const SYNTAX_MAP = {
	liquid: "Liquid",
	njk: "Nunjucks",
	js: "11ty.js",
	cjs: "11ty.cjs",
};

function getSyntaxes({ additions, subtractions, only }) {
	let syntaxes = {};

	// Extras go first (unless hbs)
	let addHbs = false;
	for (let syn of (additions || "").split(",").filter(Boolean)) {
		if (EXTRA_SYNTAXES[syn]) {
			if (syn === "hbs") {
				addHbs = true;
			} else {
				syntaxes[syn] = EXTRA_SYNTAXES[syn];
			}
		}
	}

	if (only) {
		for (let syn of only.split(",")) {
			syntaxes[syn] = EXTRA_SYNTAXES[syn] || SYNTAX_MAP[syn];
		}
	} else {
		Object.assign(syntaxes, SYNTAX_MAP);
	}

	if (addHbs) {
		syntaxes.hbs = EXTRA_SYNTAXES.hbs;
	}

	for (let syn of (subtractions || "").split(",").filter(Boolean)) {
		delete syntaxes[syn];
	}

	return syntaxes;
}

export function syntaxTitle(syntax) {
	return EXTRA_SYNTAXES[syntax] || SYNTAX_MAP[syntax] || syntax;
}

export function renderTablist({ id, additions, subtractions, only, syntaxes }) {
	// `syntaxes` is an ordered list of keys; otherwise they are derived from the add/subtract options.
	let entries = syntaxes
		? syntaxes.map((syn) => [syn, syntaxTitle(syn)])
		: Object.entries(getSyntaxes({ additions, subtractions, only }));
	let tabs = entries.map(([syn, title]) => {
		return `<a href="#${id}-${syn}" role="tab" data-tabs-persist="templatelang:${syn}">${title}</a>`;
	});

	// The leading blank line keeps Markdown’s HTML block boundaries where they were.
	return `

<div role="tablist" aria-label="Template Language Chooser">
	${tabs.join("\n")}
</div>`;
}

function render(data) {
	return renderTablist(data);
}

export { render };
