// The pushpin’s point is at its bottom left
const possumCursor = `url("data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32"><text y="28" font-size="28">📌</text></svg>`)}") 3 29, pointer`;

const possumMascotStyles = `
:host {
	display: block;
}
:host([hidden]) {
	display: none;
}
::slotted(*) {
	cursor: ${possumCursor};
}
/* The header possum steps aside while its copy is out flying */
:host([state]) ::slotted(*) {
	visibility: hidden;
}
.possum {
	position: fixed;
	z-index: 1000;
	cursor: ${possumCursor};
}
/* Hide the balloon, keep the string */
.possum.is-popped {
	clip-path: inset(24% 0 0 0);
	cursor: auto;
}
.pop {
	position: fixed;
	z-index: 1001;
	width: 4rem;
	height: 4rem;
	margin: -2rem 0 0 -2rem;
	border-radius: 50%;
	border: 3px dashed var(--brand-ba, #00a776);
	pointer-events: none;
	animation: pop .35s ease-out forwards;
}
@keyframes pop {
	from { transform: scale(.3); opacity: 1; }
	to { transform: scale(1.6); opacity: 0; }
}
`;

customElements.define(
	"possum-mascot",
	class extends HTMLElement {
		static activityEvents = ["pointermove", "pointerdown", "keydown", "scroll", "wheel", "touchstart"];

		connectedCallback() {
			this.img = this.querySelector("img");
			if(!this.img || matchMedia("(prefers-reduced-motion: reduce)").matches) {
				return;
			}

			if(!this.shadowRoot) {
				let shadow = this.attachShadow({ mode: "open" });
				shadow.innerHTML = `<style>${possumMascotStyles}</style><slot></slot><img class="possum" alt="" hidden>`;
				this.flier = shadow.querySelector(".possum");
			}

			this.timeoutMs = (parseFloat(this.getAttribute("idle-timeout")) || 20) * 1000;
			this.onActivity = (e) => this.activity(e);
			this.onVisibility = () => document.hidden ? this.land() : this.wake();
			this.onClick = () => this.pop();

			for(let type of this.constructor.activityEvents) {
				window.addEventListener(type, this.onActivity, { passive: true });
			}
			document.addEventListener("visibilitychange", this.onVisibility);
			this.addEventListener("click", this.onClick);
			this.resetTimer();
		}

		disconnectedCallback() {
			for(let type of this.constructor.activityEvents) {
				window.removeEventListener(type, this.onActivity);
			}
			document.removeEventListener("visibilitychange", this.onVisibility);
			this.removeEventListener("click", this.onClick);
			clearTimeout(this.timer);
			cancelAnimationFrame(this.frame);
		}

		get state() {
			return this.getAttribute("state") || undefined;
		}

		set state(value) {
			if(value) {
				this.setAttribute("state", value);
			} else {
				this.removeAttribute("state");
			}
		}

		activity(e) {
			if(this.state === "falling") {
				return;
			}
			if(this.state === "floating") {
				// Let folks chase the possum with their pointer
				if(e.type === "pointermove" || this.contains(e.target)) {
					return;
				}
				this.land();
			}
			this.resetTimer();
		}

		resetTimer() {
			clearTimeout(this.timer);
			this.timer = setTimeout(() => this.float(), this.timeoutMs);
		}

		wake() {
			this.land();
			this.resetTimer();
		}

		animate(fn) {
			cancelAnimationFrame(this.frame);
			let start = performance.now();
			let last = start;
			let tick = (now) => {
				let dt = Math.min(now - last, 100) / 1000;
				last = now;
				if(fn(dt, (now - start) / 1000) !== false) {
					this.frame = requestAnimationFrame(tick);
				}
			};
			this.frame = requestAnimationFrame(tick);
		}

		render() {
			this.flier.style.transform = `translate(${this.x}px, ${this.y}px) rotate(${this.tilt}deg)`;
		}

		float() {
			if(this.state || document.hidden) {
				return;
			}

			if(!this.liftOff()) {
				return;
			}

			this.state = "floating";
			let driftY = 0;
			let angle = Math.random() * Math.PI * 2;
			let speed = 40; // px per second
			let vx = Math.cos(angle) * speed;
			let vy = -Math.abs(Math.sin(angle) * speed); // start by drifting up and away

			this.animate((dt, t) => {
				// Wander slowly so the path isn’t a perfect bounce
				let turn = Math.sin(t / 2.3) * 0.4 * dt;
				[vx, vy] = [vx * Math.cos(turn) - vy * Math.sin(turn), vx * Math.sin(turn) + vy * Math.cos(turn)];

				let x = this.x + vx * dt;
				driftY += vy * dt;

				let minX = -this.home.left;
				let maxX = innerWidth - this.home.right;
				let minY = -this.home.top;
				let maxY = innerHeight - this.home.bottom;
				if(x < minX || x > maxX) {
					vx *= -1;
					x = Math.max(minX, Math.min(maxX, x));
				}
				if(driftY < minY || driftY > maxY) {
					vy *= -1;
					driftY = Math.max(minY, Math.min(maxY, driftY));
				}

				this.x = x;
				this.y = driftY + Math.sin(t * 1.6) * 6;
				this.tilt = Math.sin(t * 0.9) * 6;
				this.render();
			});
		}

		// Swap the header possum for a copy that can move around the viewport
		liftOff() {
			let rect = this.img.getBoundingClientRect();
			if(rect.bottom < 0 || rect.width === 0) {
				return false;
			}

			this.home = rect;
			this.x = 0;
			this.y = 0;
			this.tilt = 0;
			this.flier.src = this.img.currentSrc || this.img.src;
			Object.assign(this.flier.style, {
				left: `${rect.left}px`,
				top: `${rect.top}px`,
				width: `${rect.width}px`,
				height: `${rect.height}px`,
				filter: getComputedStyle(this.img).filter,
			});
			this.flier.hidden = false;
			return true;
		}

		pop() {
			if(this.state === "falling") {
				return;
			}
			if(this.state !== "floating") {
				// Pop from the header (or mid-landing)
				cancelAnimationFrame(this.frame);
				this.reset();
				if(!this.liftOff()) {
					return;
				}
			}

			clearTimeout(this.timer);
			this.state = "falling";
			this.flier.classList.add("is-popped");

			// Burst where the balloon was
			let rect = this.flier.getBoundingClientRect();
			let burst = document.createElement("span");
			burst.className = "pop";
			burst.style.left = `${rect.left + rect.width / 2}px`;
			burst.style.top = `${rect.top + rect.height * .12}px`;
			this.shadowRoot.append(burst);
			burst.addEventListener("animationend", () => burst.remove(), { once: true });

			let vy = -60;
			let spin = (Math.random() - .5) * 240;
			let gravity = 1800;
			let duration = 1.2;

			this.animate((dt, t) => {
				vy += gravity * dt;
				this.y += vy * dt;
				this.tilt += spin * dt;
				this.render();
				this.flier.style.opacity = Math.max(0, 1 - t / duration);

				if(t < duration && this.home.top + this.y < innerHeight) {
					return;
				}

				this.hidden = true;
				this.disconnectedCallback();
				return false;
			});
		}

		land() {
			if(this.state !== "floating") {
				return;
			}

			cancelAnimationFrame(this.frame);
			this.state = "landing";

			let flier = this.flier;
			flier.style.transition = "transform .8s cubic-bezier(.3,.7,.3,1)";
			flier.style.transform = "translate(0, 0) rotate(0)";

			let done = () => {
				if(this.state === "landing") {
					this.reset();
				}
			};
			flier.addEventListener("transitionend", done, { once: true });
			setTimeout(done, 900);
		}

		reset() {
			this.state = undefined;
			this.flier.hidden = true;
			this.flier.removeAttribute("style");
			this.flier.classList.remove("is-popped");
		}
	}
);
