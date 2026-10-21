import EleventyFetch from "@11ty/eleventy-fetch";
import config from "./config.js";

const SISTERS = {
	"https://www.11ty.dev": "https://build.awesome.me",
	"https://build.awesome.me": "https://www.11ty.dev",
};

export default async function () {
	let origin = SISTERS[config.origin];
	try {
		let xml = await EleventyFetch(`${origin}/sitemap.xml`, {
			type: "text",
			duration: "1d",
			directory: ".cache/eleventy-fetch/",
		});
		let urls = Array.from(xml.matchAll(/<loc>\s*([^<\s]+)\s*<\/loc>/g), ([, loc]) => new URL(loc).pathname);
		return { origin, urls };
	} catch (e) {
		console.log(`Failed getting ${origin}/sitemap.xml, returning no matching urls`);
		return { origin, urls: [] };
	}
}
