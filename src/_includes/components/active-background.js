window.customElements.define(
	"active-background",
	class extends HTMLElement {
		activate(targetElement) {
			let color = targetElement.getAttribute("data-active-background");
			if(color === "") {
				// use current color if data attribute has no value
				color = window.getComputedStyle(targetElement).getPropertyValue("color");
				if(color.startsWith("rgb(")) {
					color = `rgba(${color.trim().slice(4, -1)}, .3)`;
				}
			}

			this.classList.add("active");
			this.style.display = "block";
			this.style.transition = "600ms background-color";
			this.style.backgroundColor = color;
		}

		deactivate() {
			this.classList.remove("active");
			this.style.backgroundColor = "transparent";
		}

		connectedCallback() {
			for(let el of this.querySelectorAll("[data-active-background]")) {
				el.addEventListener("mouseenter", () => this.activate(el));
				el.addEventListener("mouseleave", () => this.deactivate());

				el.addEventListener("focusin", () => this.activate(el));
				el.addEventListener("focusout", () => this.deactivate());
			}
		}
	}
);
