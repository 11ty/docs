import EleventyFetch from "@11ty/eleventy-fetch";

const CACHE_DURATION = process.env.ELEVENTY_RUN_MODE === "serve" ? "1w" : "1d";

async function getData() {
	let url = `https://11tybundle.dev/api/getting-started.json`;
	let json = await EleventyFetch(url, {
		type: "json",
		duration: CACHE_DURATION,
		directory: ".cache/eleventy-fetch/",
		dryRun: false,
	});

	let urls = {};
	// remove duplicates
	json = json.filter((entry) => {
		if (!urls[entry.Link]) {
			urls[entry.Link] = true;
			return true;
		}
		return false;
	});

	return json;
}

export default async function () {
	try {
		return {
			bundle: await getData(),
		};
	} catch (e) {
		if (process.env.NODE_ENV === "production") {
			// Fail the build in production.
			return Promise.reject(e);
		}

		console.log(
			"Failed getting Getting Started resources from 11tybundle.dev."
		);
		return { bundle: [] };
	}
}
