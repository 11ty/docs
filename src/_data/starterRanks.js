import fs from "node:fs";
import fastglob from "fast-glob";
import EleventyFetch from "@11ty/eleventy-fetch";

const GROUP_URL = "https://www.speedlify.dev/api/group/11ty-starters.json";

// Ignores hash, hostname case, and trailing slash differences.
function normalize(url) {
	try {
		let u = new URL(url);
		return `${u.protocol}//${u.hostname.toLowerCase()}${u.pathname.replace(/\/$/, "")}${u.search}`;
	} catch {
		return String(url).trim();
	}
}

// Speedlify group rank (lower is better) keyed by starter demo URL.
export default async function () {
	let group;
	try {
		group = await EleventyFetch(GROUP_URL, {
			type: "json",
			duration: "1w",
			directory: ".cache/eleventy-fetch/",
		});
	} catch (e) {
		console.log("Failed getting Speedlify starter ranks, falling back to random order");
		return {};
	}

	let byUrl = {};
	for (let site of group.sites) {
		if (site.measured && site.rank != null) {
			byUrl[normalize(site.requestedUrl || site.url)] = site.rank;
		}
	}

	let ranks = {};
	for (let file of await fastglob("./src/_data/starters/*.json")) {
		let { demo, disabled } = JSON.parse(fs.readFileSync(file, "utf8"));
		let rank = demo && !disabled ? byUrl[normalize(demo)] : undefined;
		if (rank !== undefined) {
			ranks[demo] = rank;
		}
	}
	return ranks;
}
