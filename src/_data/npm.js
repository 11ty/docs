// https://blog.npmjs.org/post/78719826768/download-counts-are-back
import EleventyFetch from "@11ty/eleventy-fetch";

const NPM_PKG_NAME = "@11ty/eleventy";
const START_YEAR = 2018;
const CACHE_DURATION = process.env.ELEVENTY_RUN_MODE === "serve" ? "1w" : "1d";

async function getDownloadsForYear(year) {
	let isCurrentYear = new Date().getFullYear() === year;
	let url = `https://api.npmjs.org/downloads/point/${year}-01-01:${year}-12-31/${NPM_PKG_NAME}`;
	let json = await EleventyFetch(url, {
		type: "json",
		duration: isCurrentYear ? CACHE_DURATION : "*",
		directory: ".cache/eleventy-fetch/",
		dryRun: false,
	});
	return json.downloads;
}

export default async function () {
	try {
		let count = 0;
		for (
			let year = START_YEAR, k = new Date().getFullYear();
			year <= k;
			year++
		) {
			count += await getDownloadsForYear(year);
		}
		return {
			downloads: count,
		};
	} catch (e) {
		if (process.env.NODE_ENV === "production") {
			// Fail the build in production.
			return Promise.reject(e);
		}

		console.log("Failed getting npm downloads count, returning 0");
		return {
			downloads: 0,
		};
	}
}
