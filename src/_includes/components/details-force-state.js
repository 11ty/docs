// Collapses the sidebar’s sections on small screens, where the nav sits above the page content, and
// restores the build-time open state when the window grows back.
class DetailsForceState extends HTMLElement {
	connectedCallback() {
		let query = this.getAttribute("data-force-closed");
		if (!query) {
			return;
		}

		let sections = Array.from(this.querySelectorAll(":scope details"), (details) => ({
			details,
			wasOpen: details.open,
		}));

		let forceClosed = window.matchMedia(query);
		let apply = (matches) => {
			for (let { details, wasOpen } of sections) {
				details.open = matches ? false : wasOpen;
			}
		};

		apply(forceClosed.matches);
		forceClosed.addEventListener("change", (event) => apply(event.matches));
	}
}

if ("customElements" in window) {
	customElements.define("details-force-state", DetailsForceState);
}
