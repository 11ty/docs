customElements.define("download-counter", class extends HTMLElement {
	connectedCallback() {
		let output = this.querySelector("data");
		let target = Number(output?.value);
		if(!target || matchMedia("(prefers-reduced-motion: reduce)").matches) {
			return;
		}

		let format = new Intl.NumberFormat("en-US");
		let duration = 800;
		let pace = Number(this.getAttribute("per-year")) / (365 * 24 * 60 * 60 * 1000) || 0;
		let observer = new IntersectionObserver(entries => {
			if(!entries.some(entry => entry.isIntersecting)) {
				return;
			}
			observer.disconnect();

			// Estimate downloads since the report was generated.
			let sinceReport = Date.now() - Date.parse(this.getAttribute("generated-at"));
			let estimate = target + (sinceReport > 0 ? pace * sinceReport : 0);

			let start;
			let shown;
			let tick = now => {
				start ??= now;
				let elapsed = now - start;
				let value = elapsed < duration
					// Ease-out cubic from 95% so the count settles gently.
					? estimate * (.95 + .05 * (1 - (1 - elapsed / duration) ** 3))
					: estimate + pace * (elapsed - duration);
				value = Math.round(value);
				if(value !== shown) {
					shown = value;
					output.textContent = format.format(value);
				}
				requestAnimationFrame(tick);
			};
			requestAnimationFrame(tick);
		});
		observer.observe(this);
	}
});
