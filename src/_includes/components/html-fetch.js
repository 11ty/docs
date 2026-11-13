class HtmlFetch extends HTMLElement {
	static tagName = "html-fetch";

	constructor() {
		super();

		this.attrs = {
			src: "src",
			replace: "replace",
		};
	}

	async connectedCallback() {
		await this.fetch();
	}

	getTarget() {
		let targetAttr = this.getAttribute("target");
		if (targetAttr) {
			let target = this.closest(targetAttr);
			if (target) {
				return target;
			}
		}

		return this;
	}

	inject(target, html, shouldReplaceTarget) {
		if (shouldReplaceTarget) {
			let div = document.createElement("div");
			div.innerHTML = html;

			for (let child of Array.from(div.children)) {
				target.insertAdjacentElement("beforebegin", child);
			}
			target.remove();
		} else {
			target.innerHTML = html;
		}
	}

	async fetch() {
		if (!("fetch" in window)) {
			return;
		}

		try {
			let targetUrl = this.getAttribute(this.attrs.src);
			let response = await fetch(targetUrl);
			let text = await response.text();

			// remove attribute so we don’t reprocess it
			this.removeAttribute(this.attrs.src);
			this.inject(this.getTarget(), text, this.hasAttribute(this.attrs.replace));
		} catch (e) {
			console.log("html-fetch failed", e);
		}
	}
}

// Should this auto define? Folks can redefine later using { component } export
if ("customElements" in window) {
	customElements.define(HtmlFetch.tagName, HtmlFetch);
}
