import "/js/line-numbers.js";

//! <eleventy-editor>
const css = String.raw;

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
	font-family: Menlo,Monaco,Consolas,Courier New,monospace;
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
	font-family: Menlo,Monaco,Consolas,Courier New,monospace;
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
			async config($config) {
				if(configFn) {
					await configFn($config);
				}

				$config.addEngine("liquid", Liquid);
				$config.addEngine("md", Markdown);
				// $config.addEngine("njk", Nunjucks);

				// $config.setMarkdownTemplateEngine(false);
				// $config.setHtmlTemplateEngine(false);

				for(let {inputFilename, content} of inputs) {
					$config.addTemplate(inputFilename, content);
				}
			}
		});
		elev.disableLogger();

		// render all of the other initialized editors in the group (Eleventy build happens once per group)
		let results = await elev.toJSON();
		for(let {editor} of inputs) {
			if(editor !== this && typeof editor.render === "function") {
				editor.render(results);
			}
		}

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

	setOutput(content) {
		if(this.isIframeOutput()) {
			this.outputEl.setAttribute("srcdoc", `<style>${Editor.defaultIframeStyle}</style>${content}`);
			this.outputEl.classList.remove(Editor.classes.plaintext);
		} else if(this.viewSourceEl.checked) {
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
		this.outputContainerEl.style.maxWidth = "";
	}

	sizeOutput() {
		this.outputContainerEl.style.maxWidth = `${this.outputContainerEl.offsetWidth}px`;
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

			this.errorEl.textContent = "";
			this.outputFilenameEl.innerHTML = typeof result?.outputPath === "string" ? this.cleanFilename(result?.outputPath) : "<em>(skipped)</em>";

			requestAnimationFrame(() => {
				this.setOutput(result?.content);
				this.renderNumberLines();
			});
		} catch(e) {
			// Development mode
			console.error( "Eleventy Demo Runner error:", e.originalError || e );
			this.errorEl.textContent = e.originalError?.message || e.message;
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
	<div class="output-c${isReversed ? " reverse" : ""}">
	${hasToolbar ? `<div class="toolbar">
		<div class="filename filename--input"></div>
		<div class="filename filename--output"></div>
		<label class="viewsource${viewSourceDefault || iframeOutput ? " viewsource--disabletoggle" : ""}"><input type="checkbox">HTML</label>
	</div>` : ""}
	${iframeOutput ? `<iframe class="output"></iframe>` : `<output class="output"></output>`}
	<output class="error"></output>
</div>`;
		shadowroot.appendChild(template.content.cloneNode(true));

		let inputFilename = this.getInputFilename();
		if(inputFilename) {
			this.inputFilenameEl.textContent = this.cleanFilename(inputFilename);
		}

		this.sizeInputToContent();

		if(viewSourceDefault) {
			this.viewSourceEl.checked = true;
		}

		await this.render();

		this.inputEl.addEventListener("input", async () => {
			// this.resetOutputSize();
			this.sizeInputToContent();
			await this.render();
		})

		this.viewSourceEl.addEventListener("input", async () => {
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

if(!(new URL(import.meta.url)).searchParams.has("nodefine")) {
	Editor.define();
}
