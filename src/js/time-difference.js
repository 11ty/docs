class TimeDifference extends HTMLElement {
	#interval;

	// Order of these keys in important
	static UNITS = {
		milliseconds: .001,
		seconds:  1,
		minutes:  60,
		hours:    60 * 60,
		days:     60 * 60 * 24,
		weeks:    60 * 60 * 24 * 7,
		months:   60 * 60 * 24 * (365/12),
		years:    60 * 60 * 24 * 365,
	};

	static MINIMUM_ROUND_UP = 0.8;

	get time() {
		return this.querySelectorAll("time");
	}

	get units() {
		return this.getAttribute("units");
	}

	get live() {
		return this.hasAttribute("live");
	}

	get mode() {
		// "countdown": stops at 0
		// "strip-prefix": removes the "in" from future dates
		return this.getAttribute("mode");
	}

	get suffix() {
		return this.getAttribute("suffix");
	}

	get prefix() {
		return this.getAttribute("prefix");
	}

	get intervalTimeout() {
		// numeric override (seconds)
		let attr = this.getAttribute("interval");
		if(attr) {
			return parseInt(attr, 10) * 1000;
		}

		// use units if specified
		if(this.units) {
			return TimeDifference.UNITS[this.units] * 1000;
		}

		// default: 1 minute
		return TimeDifference.UNITS.minutes * 1000;
	}

	static getUnits(date1, date2) {
		let diff = Math.abs(date1 - date2) / 1000;
		let prev;
		for(let unit in TimeDifference.UNITS) {
			if(diff < TimeDifference.UNITS[unit]) {
				return prev || unit;
			}
			prev = unit;
		}

		// default to largest
		return "years";
	}

	static getDivisor(units) {
		return (TimeDifference.UNITS[units] || 1) * 1000;
	}

	static getText(dateStr, options = {}) {
		let { units, locale, mode, suffix, prefix } = options;
		let modes = (mode || "").split(",");

		let date1;
		if(!isNaN(Date.parse(dateStr))) {
			date1 = Date.parse(dateStr);
		} else {
			// Timestamp
			date1 = new Date(parseInt(dateStr, 10));
		}
		let date2 = Date.now();
		if(!date1 || !date2) {
			return;
		}

		units = units || this.getUnits(date1, date2);
		let divisor = TimeDifference.getDivisor(units);
		let diff = (date1 - date2) / divisor;
		let amountDiff = diff/Math.round(diff);
		// stops at 0
		if(modes.includes("countdown")) {
			diff = Math.max(Math.floor(diff), 0); // minimum 0
		}
		let str = "";
		if(units === "milliseconds") {
			// milliseconds are not supported by RelativeTimeFormat
			let numFormat = new Intl.NumberFormat();
			str = `${diff > 0 ? "in " : ""}${numFormat.format(diff)} milliseconds`;
		} else {
			let rtf = new Intl.RelativeTimeFormat(locale, { numeric: "always" });
			// super close to next whole unit, round up
			if( amountDiff < 1 && amountDiff > this.MINIMUM_ROUND_UP ) {
				str = rtf.format(Math.round(diff), units);
			} else if(diff < 0) {
				str = rtf.format(Math.ceil(diff), units);
			} else {
				str = rtf.format(Math.floor(diff), units);
			}
		}

		if(modes.includes("strip-prefix") && str?.toLowerCase().startsWith("in ")) {
			str = str.slice(3);
		}
		if(modes.includes("strip-suffix") && str?.toLowerCase().endsWith(" ago")) {
			str = str.slice(0, -4);
		}

		return (prefix || "") + str + (suffix || "");
	}

	isPaused() {
		return this.paused || this.hasAttribute("paused");
	}

	update() {
		if(this.isPaused()) {
			return;
		}

		requestAnimationFrame(() => {
			this.time.forEach(timeEl => {
				let dateStr = timeEl.getAttribute("datetime");
				if(!dateStr) {
					// For Shadow DOM method, using a global <template>
					dateStr = this.getAttribute("date");
				}

				let locale = this.getAttribute("locale") || "en";
				timeEl.innerText = TimeDifference.getText(dateStr, {
					units: this.units,
					locale,
					mode: this.mode,
					prefix: this.prefix,
					suffix: this.suffix,
				});
			})
		});
	}

	async getInterval() {
		let min = 40;

		if("getBattery" in navigator) {
			let battery = await navigator.getBattery();
			if(battery.level <= .5) { // Bump the interval on lower-battery
				min = 1000;
			}
		}

		return Math.max(this.intervalTimeout, min);
	}

	async connectedCallback() {
		this.update();

		this.time.forEach(timeEl => {
			timeEl.style["font-variant-numeric"] = "tabular-nums";
		});

		if(this.live) {
			// Minimum 40 milliseconds
			let interval = await this.getInterval();
			if(this.#interval) {
				clearInterval(this.#interval);
			}
			this.#interval = setInterval(this.update.bind(this), interval);
		}
	}
}

if(("customElements" in window) && Date.parse && ("Intl" in window) && Intl.RelativeTimeFormat) {
	window.customElements.define("time-difference", TimeDifference);
}
