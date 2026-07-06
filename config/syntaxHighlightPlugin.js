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

const TRIPLE_TICK = "```";
const QUADRUPLE_TICK = "````";

function highlightCode(code, language, attrs = {}, options = {}) {
	let { rawMarkdown, copyButtonEnabled, lineHighlights, inputPath } = Object.assign({
		inputPath: undefined, // required
		rawMarkdown: false,
		copyButtonEnabled: true,
		lineHighlights: "",
	}, options);

	// Skip wrapper on WebC templates (already includes <syntax-highlight>)
	let [openTag, closeTag] = Boolean(attrs?.id) ? ["", ""] : [`<div class="syntax-highlight">`, "</div>"]
	attrs.id ??=  `highlighted-source-${options.highlightCounter}`;

	// When more Web Awesome components are in place, remove this `import` and re-enable Web Awesome script/link in base.njk
	let preamble = `${copyButtonEnabled ? `<is-land on:visible data-wa-copy-button-target="${attrs.id}" import="/static/web-awesome/components/copy-button/copy-button.js"><wa-copy-button from="${attrs.id}" tooltip-placement="left"></wa-copy-button></is-land>` : ""}`;

	if(inputPath?.endsWith(".md")) {
		let ticks = rawMarkdown ? QUADRUPLE_TICK : TRIPLE_TICK;

		// Markdown requires special care so that new lines in code blocks aren’t converted to paragraphs (we’ll pass the buck to the markdown syntax highlighter)
		return `${openTag}${preamble}\n\n${ticks}${language}
${code.trim()}
${ticks}\n\n${closeTag}`;
	}

	let o = Object.assign({}, HIGHLIGHT_OPTIONS);
	// workaround for deep copy
	o.preAttributes = Object.assign({}, HIGHLIGHT_OPTIONS.preAttributes, attrs);

	return `${openTag}${preamble}${syntaxHighlightFunction(code, language, lineHighlights, o)}${closeTag}`;
}

export default function($config) {
	let highlightCounter = 0;
	$config.on("eleventy.before", () => {
		highlightCounter = 0;
	});

	$config.addPairedShortcode("highlight", function(code, language) {
		return highlightCode(code, language, undefined, {
			highlightCounter: ++highlightCounter,
			inputPath: this.page.inputPath,
		});
	});

	$config.addFilter("highlight", function(code, language, attrs = {}, options = {}) {
		let o = Object.assign({}, options);
		o.highlightCounter = ++highlightCounter;
		o.inputPath = this.page.inputPath;

		return highlightCode(code, language, attrs, o);
	});

	// This wires up Markdown’s triple-tick syntax
	$config.amendLibrary("md", (mdLib) => {
		let o = Object.assign({}, HIGHLIGHT_OPTIONS);
		o.trim = false;
		mdLib.set({
			highlight: function(code, language) {
				return syntaxHighlightFunction(code, language, "", o);
			}
		})
	});
};
