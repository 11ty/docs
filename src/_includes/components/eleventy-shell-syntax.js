const css = String.raw;

// Properly highlights Eleventy syntax in a terminal window
class EleventyShell {
	static selector = "code.language-11ty-output";
	static PREFIX = "[11ty] ";
	static cssAdded = false;

	static register(root) {
		if(typeof CSS === "undefined" || !("highlights" in CSS)) {
			return;
		}
		for(let el of (root || document).querySelectorAll(this.selector)) {
			(new EleventyShell(el)).highlight();
		}
	}

	constructor(node) {
		this.node = node;
	}

	static getLines(node) {
		let lines = [];
		let offset = 0;
		let text = node.textContent;
		let textNode;
		// A little leaky, only finds the first text node
		for(let child of node.childNodes) {
			if(child.nodeType === 3) {
				textNode = child;
				break;
			}
		}
		for(let line of text.split("\n")) {
			lines.push({
				textNode,
				content: line,
				start: offset,
				end: offset + line.length,
			});
			offset += line.length + "\n".length;
		}
		return lines;
	}

	static getRange(textNode, start, end) {
		let r = new Range();
		r.setStart(textNode, start);
		r.setEnd(textNode, end);
		return r;
	}

	static getRanges(node) {
		return this.getLines(node).map(location => {
			let { start, end, textNode, content } = location;
			let ranges = [];
			if(content.startsWith(this.PREFIX)) {
				ranges.push({
					type: "prefix",
					range: this.getRange(textNode, start, start + this.PREFIX.length),
				});
			}
			if(content.startsWith(this.PREFIX) && content.includes(" from ./")) {
				ranges.push({
					type: "frominput",
					range: this.getRange(textNode, start + content.indexOf(" from ./"), end),
				});
			}
			if(content.startsWith(this.PREFIX + "Wrote ")) {
				ranges.push({
					type: "wrote",
					range: this.getRange(textNode, start + this.PREFIX.length, end),
				});
			}
			if(content.startsWith(this.PREFIX + "Benchmark ")) {
				ranges.push({
					type: "benchmark",
					range: this.getRange(textNode, start + this.PREFIX.length, end),
				});
			}
			if(content.startsWith(this.PREFIX + "Server ")) {
				ranges.push({
					type: "server",
					range: this.getRange(textNode, start + this.PREFIX.length, end),
				});
			}
			return ranges;
		}).flat();
	}

	static addCss() {
		if(this.cssAdded) {
			return;
		}
		this.cssAdded = true;

		let style = css`:root {
	--shell-prefix: rgba(0,0,0,.6);
	--shell-wrote: #056800;
	--shell-benchmark: #685800;
	--shell-server: #2A52B8;

	@media (prefers-color-scheme: dark) {
		--shell-prefix: rgba(255,255,255,.75);
		--shell-wrote: #20C683;
		--shell-benchmark: #e5e510;
		--shell-server: #6AB2FF;
	}
}
::highlight(eleventy-shell-prefix),
::highlight(eleventy-shell-frominput) {
	color: var(--shell-prefix);
}
::highlight(eleventy-shell-wrote) {
	color: var(--shell-wrote);
}
::highlight(eleventy-shell-benchmark) {
	color: var(--shell-benchmark);
}
::highlight(eleventy-shell-server) {
	color: var(--shell-server);
}`;

		let sheet = new CSSStyleSheet();
		sheet.replaceSync(style);
		document.adoptedStyleSheets.push(sheet);
	}

	static getHighlightSet(type) {
		let name = `eleventy-shell-${type}`;
		if(!CSS.highlights.has(name)) {
			let h = new Highlight();
			CSS.highlights.set(name, h);
			return h;
		}
		return CSS.highlights.get(name);
	}

	highlight() {
		let ranges = EleventyShell.getRanges(this.node);
		if(ranges.length) {
			EleventyShell.addCss();

			for(let { type, range } of ranges) {
				let h = EleventyShell.getHighlightSet(type);
				h.add(range);
			}
		}
	}
}

EleventyShell.register();
