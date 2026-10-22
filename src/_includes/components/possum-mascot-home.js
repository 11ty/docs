import "./possum-mascot.js";

// One-off home page flight: from off viewport at the hero’s bottom left up and out past the top right of the viewport
customElements.define(
	"possum-mascot-home",
	class extends customElements.get("possum-mascot") {
		connectedCallback() {
			super.connectedCallback();
			if(!this.onActivity) {
				return;
			}

			// The base element treats 0 as unset
			this.timeoutMs = (parseFloat(this.getAttribute("idle-timeout")) || 0) * 1000;
			this.resetTimer();
		}

		activity() {}

		land() {}

		float() {
			if(!this.img.complete) {
				this.img.addEventListener("load", () => this.float(), { once: true });
				return;
			}
			if(this.state || document.hidden || !this.liftOff()) {
				return;
			}

			this.state = "floating";
			let hero = (this.closest(".elv-nav-header") || document.body).getBoundingClientRect();
			let { left, top, width, height } = this.home;
			let x0 = -left - width;
			let y0 = hero.bottom - height - top;
			let x1 = innerWidth - left;
			let y1 = -top - height;
			let speed = 60; // px per second
			let duration = Math.hypot(x1 - x0, y1 - y0) / speed;

			this.animate((dt, t) => {
				let p = Math.min(t / duration, 1);
				this.x = x0 + (x1 - x0) * p;
				this.y = y0 + (y1 - y0) * p + Math.sin(t * 1.6) * 6;
				this.tilt = Math.sin(t * 0.9) * 6;
				this.render();

				if(p < 1) {
					return;
				}

				this.hidden = true;
				this.disconnectedCallback();
				return false;
			});
		}
	}
);
