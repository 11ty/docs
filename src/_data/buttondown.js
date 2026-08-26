import fetch from "@11ty/eleventy-fetch";
import "dotenv/config";

const CACHE_DURATION = process.env.BUILDAWESOME_RUN_MODE === "serve" ? "14d" : "23h";

export default async function() {
	if(!process.env.BUTTONDOWN_API_KEY) {
		console.warn("Missing BUTTONDOWN_API_KEY in src/_data/buttondown.js, returning unknown newsletter count.");

		return {
			count: "(Unknown)"
		};
	}

	let API_URL = `https://api.buttondown.email/v1/subscribers`;

	let json = await fetch(API_URL, {
		duration: CACHE_DURATION,
    type: "json",
		fetchOptions: {
			headers: {
				"Authorization": `Token ${process.env.BUTTONDOWN_API_KEY}`
			}
		}
	});

	// TODO these are paginated or limited to 100 upstream
	// let count = 0;
	// for(let subscriber of json.results) {
	// 	// Conference attendees only
	// 	if(subscriber.tags.includes("conf2024")) {
	// 		count++;
	// 	}
	// }

	return {
		count: json.count,
	};
}
