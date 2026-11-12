import "/js/line-numbers.js";

//! <eleventy-editor>
const css = String.raw;
const debugError = (...args) => console.warn("Eleventy Demo Runner:", ...args);

// TODO set input font to match original <pre> font
// TODO dynamic selection of engine
// TODO dynamic change input file name
// TODO add option to edit global data files

import { Eleventy } from "/js/eleventy.core.browser.js";
import { Markdown } from "/js/eleventy.engine-md.browser.js";
import { Liquid } from "/js/eleventy.engine-liquid.browser.js";
// import { Nunjucks } from "/js/eleventy.engine-njk.browser.js";

class Editor extends HTMLElement {
	#initialHeight;

	static classes = {
		plaintext: "output--text",
		focused: "focused",
	};

	static attrs = {
		config: "config",
		viewSourceMode: "html",
		groupName: "group",
		focusOnInit: "focus",
		filename: "data-editor-filename",
	};

	static tagName = "eleventy-editor";
	static preinitTagName = "is-land--eleventy-editor";

	static define(registry = window.customElements) {
		if(!registry.get(this.tagName)) {
			registry.define(this.tagName, this);
		}
	}

	static scrollbarSize;

	static style = css`
:host {
	--max-height: 45vh;
	--padding: .75rem;
	--border-radius: .3em;
	--outline-color: rgba(255, 216, 72, .9);
	--input-background: #272822;
	--input-color: #fff;
	--output-background: #f4f4f4;
	--output-color: #000;
	--error-background: rgba(206, 0, 0, 0.85);
	--error-color: #fff;
	--toolbar-background: #ddd;
	--toolbar-color: #222;
	--number-color: #777;
}
@media (prefers-color-scheme: dark) {
	:host {
		--input-background: #000;
		--output-background: #353535;
		--output-color: #fff;
		--toolbar-background: #111;
		--toolbar-color: #fff;
	}
}

:host {
	display: flex;
	flex-wrap: wrap;
	border-radius: var(--border-radius);
	overflow: clip;
}
:host(.focused) {
	outline: 4px solid var(--outline-color);
}
:host(.focused) .input {
	outline: none;
}
:host > * {
	flex-grow: 1;
	min-width: 18em;
}
:host > :first-child {
	flex-basis: var(--width-text, 50%);
}
:host > :last-child {
	flex-basis: var(--width-output, 50%);
}
* {
	box-sizing: border-box;
}
:any-link {
	color: inherit;
}
.input {
	scrollbar-color: #aaa transparent;
}
.input,
.output-c {
	width: 100%;
}
.input-c {
	--uln-lh: 1.5;
	--uln-padding-v: var(--padding);
	--uln-padding-h: .5rem .25rem;
	--uln-color: var(--number-color);
	display: flex;
	background-color: var(--input-background);
	color: var(--input-color);
	width: 100%;
}
.output-c {
	position: relative;
	display: flex;
	flex-direction: column;
	flex-basis: 25%;
	background-color: var(--output-background);
	color: var(--output-color);
}
.output-c.reverse {
	flex-direction: column-reverse;
}
.output {
	flex-grow: 999;
}
.input,
.${Editor.classes.plaintext} {
	display: flex;
	font-size: inherit;
	font-family: Roboto Mono, monospace;
	line-height: 1.5;
	border: none;
}
.${Editor.classes.plaintext} {
	white-space: pre;
	overflow: auto;
}
.input {
	background-color: var(--input-background);
	color: var(--input-color);
	resize: vertical;
	white-space: pre;
	padding: var(--padding);
}
.output {
	display: block;
	height: 100%;
	border: none;
	padding: .5em;
}

.error {
	position: absolute;
	left: 0;
	right: 0;
	top: 0;
	background-color: var(--error-background);
	color: var(--error-color);
	padding: .5em;
	max-height: 100%;
	overflow: auto;
}
.error:empty,
.filename:empty {
	display: none;
}
.output:empty:before {
	content: "(no content)";
	font-style: italic;
	font-size: .75em;
	display: flex;
	height: 100%;
	width: 100%;
	align-items: center;
	justify-content: center;
}
.toolbar,
.${Editor.classes.plaintext} {
	font-family: Roboto Mono, monospace;
	line-height: 1.428571428571; /* 20px /14 */
}
.toolbar {
	--toolbar-gap: .5em;
	flex-grow: 0;
	display: flex;
	font-size: 0.875rem; /* 14px /16 */
	justify-content: space-between;
	align-items: center;
	background-color: var(--toolbar-background);
	color: var(--toolbar-color);
}
.filename {
	padding: 0.21428571em 0;
	padding-inline-start: var(--toolbar-gap);
}
.filename--input:after {
	content: "→";
	padding-inline-start: var(--toolbar-gap);
}
.filename--output {
	overflow: hidden;
	text-overflow: ellipsis;
	max-width: calc(100% - 4rem);
	flex-grow: 999;
	padding-inline-end: var(--toolbar-gap);
}
.viewsource {
	display: flex;
	align-items: center;
	font-size: 0.75rem; /* 12px /16 */
	padding-inline: var(--toolbar-gap);
}
.viewsource--disabletoggle {
	display: none;
}
`;

	static defaultIframeStyle = css`
html {
	font-family: system-ui, sans-serif;
}
`

	async getConfiguration() {
		let configSelector = this.getAttribute("config");
		if(!configSelector) {
			return;
		}
		let configEl = document.querySelector(configSelector);
		if(!configEl) {
			return;
		}
		let target = `data:text/javascript;charset=utf-8,${encodeURIComponent(configEl.innerText)}`;
		return import(target).then(mod => mod.default);
	}

	getInputsForGroup(groupName) {
		let inputs = [];
		let groupEditors = [this];
		if(groupName) {
			let sel = `:is(${Editor.tagName}, ${Editor.preinitTagName})${groupName ? `[group="${groupName}"]` : ""}`;
			groupEditors = document.documentElement.querySelectorAll(sel);
		}

		for(let editor of groupEditors) {
			let sourceElement = editor.querySelector("pre");
			inputs.push({
				editor,
				inputFilename: Editor.getInputFilename(sourceElement),
				// Works even before the element is initialized.
				content: typeof editor.getInputContent === "function" ? editor.getInputContent() : sourceElement.innerText,
			});
		}

		return inputs;
	}

	async getEleventyProjectResults(groupName) {
		let inputs = this.getInputsForGroup(groupName);
		let configFn = await this.getConfiguration();
		let elev = new Eleventy({
			async config(eleventyConfig) {
				if(configFn) {
					await configFn(eleventyConfig);
				}

				eleventyConfig.addEngine("liquid", Liquid);
				eleventyConfig.addEngine("md", Markdown);
				// eleventyConfig.addEngine("njk", Nunjucks);

				// eleventyConfig.setMarkdownTemplateEngine(false);
				// eleventyConfig.setHtmlTemplateEngine(false);

				for(let {inputFilename, content} of inputs) {
					eleventyConfig.addTemplate(inputFilename, content);
				}
			}
		});
		elev.disableLogger();

		// render all of the other initialized editors in the group (Eleventy build happens once per group)
		let results = await elev.toJSON();

		// Eleventy composes this line itself (counts, timing, version); it only logs it when it
		// writes to the file system, so a JSON build has to ask for it.
		let summary;
		try {
			summary = elev.logFinished();
		} catch(e) {
			debugError("Could not read the build summary:", e);
		}
		for(let {editor} of inputs) {
			if(editor !== this && typeof editor.render === "function") {
				editor.render(results);
			}
		}

		Editor.renderGroupOutputs(groupName, results, summary);

		return results;
	}

	get sourceEl() {
		return this.querySelector("pre");
	}

	get inputEl() {
		return this.shadowRoot.querySelector(".input");
	}

	get outputEl() {
		return this.shadowRoot.querySelector(".output");
	}

	get outputContainerEl() {
		return this.shadowRoot.querySelector(".output-c");
	}

	get errorEl() {
		return this.shadowRoot.querySelector(".error");
	}

	get inputFilenameEl() {
		return this.shadowRoot.querySelector(".filename--input");
	}

	get outputFilenameEl() {
		return this.shadowRoot.querySelector(".filename--output");
	}

	get viewSourceEl() {
		return this.shadowRoot.querySelector(".viewsource input[type='checkbox']")
	}

	isIframeOutput() {
		return this.getAttribute("output") === "iframe";
	}

	// The editor is input-only: <eleventy-output> elements in the group show the built files.
	isExternalOutput() {
		return this.getAttribute("output") === "external";
	}

	setOutput(content) {
		if(this.isIframeOutput()) {
			this.outputEl.setAttribute("srcdoc", `<style>${Editor.defaultIframeStyle}</style>${content}`);
			this.outputEl.classList.remove(Editor.classes.plaintext);
		} else if(this.viewSourceEl?.checked) {
			this.outputEl.textContent = content;

			this.outputEl.classList.add(Editor.classes.plaintext);
		} else {
			this.outputEl.innerHTML = content;
			this.outputEl.classList.remove(Editor.classes.plaintext);
		}

		this.sizeOutput();
	}

	// render line-numbers parent component
	renderNumberLines() {
		// await customElements.whenDefined("line-numbers");
		let lineNumbersElement = this.inputEl?.closest("line-numbers:defined");
		if(lineNumbersElement) {
			lineNumbersElement.render();
		} else {
			throw new Error("Missing <line-numbers> component: did you load the JS?");
		}
	}

	sizeInputToContent() {
		let scrollHeight = this.inputEl.scrollHeight;
		if(!this.#initialHeight) {
			this.#initialHeight = scrollHeight;
		}
		// uln-scrollbar-height is only set when obtrusive (and horizontal overflow is active)
		this.inputEl.style.minHeight = `clamp(${this.#initialHeight}px, calc(${scrollHeight}px + var(--uln-scrollbar-height, 0px)), var(--max-height))`;
	}

	resetOutputSize() {
		if(this.outputContainerEl) {
			this.outputContainerEl.style.maxWidth = "";
		}
	}

	sizeOutput() {
		if(this.outputContainerEl) {
			this.outputContainerEl.style.maxWidth = `${this.outputContainerEl.offsetWidth}px`;
		}
	}

	getInputContent() {
		return this.inputEl?.value;
	}

	static getInputFilename(el) {
		let filename = el.closest(`[${Editor.attrs.filename}]`)?.getAttribute(Editor.attrs.filename);
		return (!filename.startsWith("./") ? "./" : "") + filename;
	}

	getInputFilename() {
		if(this.sourceEl) {
			return Editor.getInputFilename(this.sourceEl);
		}
	}

	async render(resultsOverride) {
		try {
			let filename = this.getInputFilename();
			let groupName = this.getAttribute(Editor.attrs.groupName);
			let json = resultsOverride ?? await this.getEleventyProjectResults(groupName);
			let [result] = json.filter(entry => entry.inputPath === filename);

			if(this.errorEl) {
				this.errorEl.textContent = "";
			}
			if(this.outputFilenameEl) {
				this.outputFilenameEl.innerHTML = typeof result?.outputPath === "string" ? this.cleanFilename(result?.outputPath) : "<em>(skipped)</em>";
			}

			requestAnimationFrame(() => {
				if(this.outputEl) {
					this.setOutput(result?.content);
				}
				this.renderNumberLines();
			});
		} catch(e) {
			// Development mode
			console.error( "Eleventy Demo Runner error:", e.originalError || e );
			if(this.errorEl) {
				this.errorEl.textContent = e.originalError?.message || e.message;
			}
		}
	}

	cleanFilename(str) {
		if(str && str.startsWith("./")) {
			return str.slice(2);
		}
		return str;
	}

	async connectedCallback() {
		if (!("replaceSync" in CSSStyleSheet.prototype) || this.shadowRoot) {
			return;
		}

		let viewSourceDefault = this.hasAttribute(Editor.attrs.viewSourceMode);
		let iframeOutput = this.isIframeOutput();

		// must come before shadowRoot attach
		this.originalSourceContent = this.sourceEl?.innerText;

		let shadowroot = this.attachShadow({ mode: "open" });
		let sheet = new CSSStyleSheet();
		sheet.replaceSync(Editor.style);
		shadowroot.adoptedStyleSheets = [sheet];

		let template = document.createElement("template");
		let toolbarPosition = this.getAttribute("toolbar-position");
		let isReversed = toolbarPosition === "bottom";
		let hasToolbar = toolbarPosition !== "skip";
		template.innerHTML = `<line-numbers manual-render class="input-c" obtrusive>
		<textarea class="input" spellcheck="false">${this.originalSourceContent}</textarea>
	</line-numbers>
	${this.isExternalOutput() ? "" : `<div class="output-c${isReversed ? " reverse" : ""}">
	${hasToolbar ? `<div class="toolbar">
		<div class="filename filename--input"></div>
		<div class="filename filename--output"></div>
		<label class="viewsource${viewSourceDefault || iframeOutput ? " viewsource--disabletoggle" : ""}"><input type="checkbox">HTML</label>
	</div>` : ""}
	${iframeOutput ? `<iframe class="output"></iframe>` : `<output class="output"></output>`}
	<output class="error"></output>
</div>`}`;
		shadowroot.appendChild(template.content.cloneNode(true));

		let inputFilename = this.getInputFilename();
		if(inputFilename && this.inputFilenameEl) {
			this.inputFilenameEl.textContent = this.cleanFilename(inputFilename);
		}

		this.sizeInputToContent();

		if(viewSourceDefault && this.viewSourceEl) {
			this.viewSourceEl.checked = true;
		}

		await this.render();

		this.inputEl.addEventListener("input", async () => {
			// this.resetOutputSize();
			this.sizeInputToContent();
			await this.render();
		})

		this.viewSourceEl?.addEventListener("input", async () => {
			await this.render();
		});

		// Remove max-width on resize
		let cachedWidth;
		(new ResizeObserver((entries) => {
			let [entry] = entries;
			if(entry?.contentRect?.width) {
				if(cachedWidth !== entry?.contentRect?.width) {
					this.resetOutputSize();
				}
				cachedWidth = entry?.contentRect?.width;
			}
		})).observe(this);

		// Firefox required this because our textarea is in Shadow DOM.
		// Could refactor to put the <textarea> in light dom for :has() compat, if this causes more issues later.
		this.inputEl.addEventListener("focus", () => {
			this.classList.add(Editor.classes.focused);
		});

		this.inputEl.addEventListener("blur", () => {
			this.classList.remove(Editor.classes.focused);
		});

		if(this.hasAttribute(Editor.attrs.focusOnInit)) {
			this.inputEl.focus({
				preventScroll: true,
			});
		}
	}
}

//! <eleventy-output>
// One built file, shown outside its editor so it can sit inside <browser-window>.
class EditorOutput extends HTMLElement {
	static tagName = "eleventy-output";
	static preinitTagName = "is-land--eleventy-output";

	static define(registry = window.customElements) {
		if(!registry.get(this.tagName)) {
			registry.define(this.tagName, this);
		}
	}

	get groupName() {
		return this.getAttribute(Editor.attrs.groupName);
	}

	getInputFilename() {
		let filename = this.getAttribute(Editor.attrs.filename);
		if(!filename) {
			return;
		}
		return (!filename.startsWith("./") ? "./" : "") + filename;
	}

	connectedCallback() {
		if(this.frameEl) {
			return;
		}

		let frame = document.createElement("iframe");
		frame.className = "eleventy-output-frame";
		frame.setAttribute("title", `Preview of ${this.getAttribute(Editor.attrs.filename) || "the build"}`);
		frame.setAttribute("loading", "lazy");
		this.appendChild(frame);
	}

	get frameEl() {
		return this.querySelector(".eleventy-output-frame");
	}

	render(results) {
		let filename = this.getInputFilename();
		let [result] = (results || []).filter(entry => entry.inputPath === filename);
		if(!this.frameEl) {
			return;
		}

		// A page with no output (permalink: false, say) still gets a frame, so the layout holds.
		this.frameEl.setAttribute("srcdoc", `<style>${Editor.defaultIframeStyle}</style>${result?.content ?? ""}`);
		this.setAttribute("data-output-path", result?.outputPath ? result.outputPath.replace(/^\.\//, "") : "");
	}
}

//! <eleventy-build-output>
// What the build wrote, listed from the same results the previews use.
class EditorBuildOutput extends HTMLElement {
	static tagName = "eleventy-build-output";
	static preinitTagName = "is-land--eleventy-build-output";

	static define(registry = window.customElements) {
		if(!registry.get(this.tagName)) {
			registry.define(this.tagName, this);
		}
	}

	get groupName() {
		return this.getAttribute(Editor.attrs.groupName);
	}

	render(results, summary) {
		let written = (results || []).filter(entry => typeof entry.outputPath === "string");
		let lines = [`$ ${this.getAttribute("command") || "npx @11ty/eleventy"}`];

		// A JSON build logs nothing per template, so these are read back off the results.
		for(let entry of written) {
			let from = entry.inputPath?.replace(/^\.\//, "") ?? "";
			lines.push(`[11ty] Writing ${entry.outputPath.replace(/^\.\//, "")} from ${from}`);
		}

		if(summary) {
			lines.push(`[11ty] ${summary}`);
		}

		let pre = this.pre;
		if(!pre) {
			pre = document.createElement("pre");
			pre.className = "eleventy-build-output-log";
			this.appendChild(pre);
		}

		// textContent, so a built file name can’t be read as markup
		pre.textContent = lines.join("\n");
	}

	get pre() {
		return this.querySelector(".eleventy-build-output-log");
	}
}

// Both tag names: inside an <is-land> these are renamed until the island hydrates.
Editor.renderGroupOutputs = function(groupName, results, summary) {
	let selectors = [EditorOutput, EditorBuildOutput].map(ctor => {
		let suffix = groupName ? `[${Editor.attrs.groupName}="${groupName}"]` : "";
		return `${ctor.tagName}${suffix}, ${ctor.preinitTagName}${suffix}`;
	});

	for(let el of document.documentElement.querySelectorAll(selectors.join(", "))) {
		if(typeof el.render === "function") {
			el.render(results, summary);
		}
	}
};

if(!(new URL(import.meta.url)).searchParams.has("nodefine")) {
	Editor.define();
	EditorOutput.define();
	EditorBuildOutput.define();
}
