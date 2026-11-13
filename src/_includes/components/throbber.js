window.customElements.define(
	"text-throbber",
	class extends HTMLElement {
		connectedCallback() {
			const animationSpeed = 100;

			// thank you https://www.npmjs.com/package/throbber
			const characters = ["|", "\\", "-", "/", "|", "\\", "-", "/"];
			const duration = parseInt(this.getAttribute("duration"), 10) || 1000;
			const perInterval = parseInt(this.getAttribute("interval")) || 1000;
			const finish = this.getAttribute("finish") || " 🏁";

			this.innerHTML = "&#160;";
			this.setAttribute("aria-hidden", "true");

			let bar = [];
			let index = 0;
			let startTime = new Date();
			let interval = setInterval(() => {
				requestAnimationFrame(() => {
					this.innerHTML = bar.join("") + characters[index];

					index++;
					index = index % characters.length;

					let timeDiff = Date.now() - startTime.getTime() - perInterval;

					if (timeDiff > perInterval * bar.length && bar.length < duration / 1000) {
						bar.push("=");
					}

					if (Date.now() - startTime.getTime() >= duration) {
						window.clearInterval(interval);
						this.innerHTML = bar.join("") + finish;
						this.setAttribute("ready", "");
					}
				});
			}, animationSpeed);
		}
	},
);
