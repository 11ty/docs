window.customElements.define(
	"disabled-form",
	class extends HTMLElement {
		connectedCallback() {
			for(let el of this.querySelectorAll("[disabled]")) {
				el.removeAttribute("disabled");
			}
		}
	}
);
