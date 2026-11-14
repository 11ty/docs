import { pairedShortcode as syntaxHighlightFunction } from "@11ty/eleventy-plugin-syntaxhighlight";

const HIGHLIGHT_OPTIONS = {
	lineSeparator: "\n",
	preAttributes: {
		tabindex: "0",
	},
	init: function ({ Prism }) {
		Prism.languages.markdown = Prism.languages.extend("markup", {
			frontmatter: {
				pattern: /^---[\s\S]*?^---$/m,
				greedy: true,
				inside: Prism.languages.yaml,
			},
		});
	},
};

let highlightCounter = 0;

const TRIPLE_TICK = "```";
const QUADRUPLE_TICK = "````";

// Code samples are authored as fenced blocks so Prettier leaves their indentation alone.
const FENCED_BLOCK = /^\s*```([a-z0-9-]*)[ \t]*\r?\n([\s\S]*?)\r?\n```[ \t]*\s*$/i;

// Terminal output is for reading, not copying
const NO_COPY_LANGUAGES = new Set(["11ty-output"]);

// When more Web Awesome components are in place, remove this `import` and re-enable Web Awesome script/link in base.njk
function copyButtonHtml(id) {
	return `<is-land on:visible data-wa-copy-button-target="${id}" import="/static/web-awesome/components/copy-button/copy-button.js">
<wa-copy-button from="${id}" tooltip-placement="left"></wa-copy-button>
</is-land>`;
}

function unwrapFencedBlock(code, language) {
	let match = String(code).match(FENCED_BLOCK);
	// Nested ticks mean the sample is *about* fenced blocks, so leave it alone.
	if (!match || match[2].includes(TRIPLE_TICK)) {
		return [code, language];
	}
	return [match[2], match[1] || language];
}

export function highlightCode(code, language, attrs = {}, options = {}) {
	let { rawMarkdown, copyButtonEnabled, lineHighlights, inputPath } = Object.assign(
		{
			inputPath: undefined, // required
			rawMarkdown: false,
			copyButtonEnabled: true,
			lineHighlights: "",
		},
		options,
	);

	if (!rawMarkdown) {
		[code, language] = unwrapFencedBlock(code, language);
	}

	// Skip wrapper on WebC templates (already includes <syntax-highlight>)
	let [openTag, closeTag] = Boolean(attrs?.id)
		? ["", ""]
		: [`<div class="syntax-highlight">`, "</div>"];
	attrs.id ??= `highlighted-source-${++highlightCounter}`;

	let preamble =
		copyButtonEnabled && !NO_COPY_LANGUAGES.has(language) ? copyButtonHtml(attrs.id) : "";

	if (inputPath?.endsWith(".md")) {
		let ticks = rawMarkdown ? QUADRUPLE_TICK : TRIPLE_TICK;

		// Markdown requires special care so that new lines in code blocks aren’t converted to paragraphs, so hand this to the fence renderer below (which adds the wrapper and copy button).
		return `\n\n${ticks}${language}
${code.trim()}
${ticks}\n\n`;
	}

	let o = Object.assign({}, HIGHLIGHT_OPTIONS);
	// workaround for deep copy
	o.preAttributes = Object.assign({}, HIGHLIGHT_OPTIONS.preAttributes, attrs);

	return `${openTag}${preamble}${syntaxHighlightFunction(code, language, lineHighlights, o)}${closeTag}`;
}

export default function ($config) {
	$config.on("eleventy.before", () => {
		highlightCounter = 0;
	});

	$config.addPairedShortcode("highlight", function (code, language) {
		return highlightCode(code, language, undefined, { inputPath: this.page.inputPath });
	});

	// Code samples are authored as fenced blocks, so filters that parse the code need it unwrapped first
	$config.addFilter("unfence", (code) => unwrapFencedBlock(code, "")[0]);

	$config.addFilter("highlight", function (code, language, attrs = {}, options = {}) {
		let o = Object.assign({}, options);
		o.inputPath = this.page.inputPath;

		return highlightCode(code, language, attrs, o);
	});

	// This wires up Markdown’s triple-tick syntax, including the fences re-emitted by `highlight` above
	$config.amendLibrary("md", (mdLib) => {
		mdLib.renderer.rules.fence = function (tokens, idx) {
			let { info, content } = tokens[idx];
			// Matches markdown-it: the language is the first word of the info string
			let language = info.trim().split(/\s+/)[0] || "";
			let id = `highlighted-source-${++highlightCounter}`;

			let o = Object.assign({}, HIGHLIGHT_OPTIONS, { trim: false });
			o.preAttributes = Object.assign({}, HIGHLIGHT_OPTIONS.preAttributes, { id });

			let copyButton = NO_COPY_LANGUAGES.has(language) ? "" : copyButtonHtml(id);

			return `<div class="syntax-highlight">${copyButton}${syntaxHighlightFunction(content, language, "", o)}</div>`;
		};
	});
}
