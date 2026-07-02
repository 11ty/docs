import "dotenv/config";
import semver from "semver";
import EleventyFetch from "@11ty/eleventy-fetch";

const CACHE_DURATION = process.env.ELEVENTY_RUN_MODE === "serve" ? "7d" : "1h";

async function getPagedGitHubData(url, pageIndex = 1) {
	let PER_PAGE = 100;
	let json = [];
	while(pageIndex) {
		let page = await EleventyFetch(
			`${url}?per_page=${PER_PAGE}&page=${pageIndex}`,
			{
				type: "json",
				duration: CACHE_DURATION,
				directory: ".cache/eleventy-fetch/",
				dryRun: false,
				fetchOptions: {
					headers: {
						Authorization: `bearer ${process.env.GITHUB_READ_TOKEN}`,
					},
				},
			}
		);
		json.push(...page);
		if(page.length < PER_PAGE) {
			pageIndex = false;
		} else {
			pageIndex++;
		}
	}
	return json;
}

export default async function () {
	try {
		// https://developer.github.com/v3/repos/#get
		let releasesJson = await getPagedGitHubData("https://api.github.com/repos/11ty/buildawesome/releases");
		let tagsJson = await getPagedGitHubData("https://api.github.com/repos/11ty/buildawesome/tags");

		let releases = releasesJson.filter(entry => {
			// no drafts
			return entry.draft !== true;
		}).map(entry => {
			return {
				tag: entry.tag_name,
				date: entry.created_at,
				prerelease: entry.prerelease,
			}
		});

		let lookupObj = {};
		for(let release of releases) {
			let key = release.tag;
			if(key.startsWith("v")) {
				key = key.slice(1);
			}
			lookupObj[key] = release;
		}
		for(let tag of tagsJson) {
			let key = tag.name;
			if(key.startsWith("v")) {
				key = key.slice(1);
			}

			// leave as-is if release already exists
			if(!lookupObj[key]) {
				// Note: date for tags does not exist in the data source
				lookupObj[key] = {
					tag: tag.name,
					tagOnly: true,
					prerelease: semver.parse(tag.name).prerelease.length > 0,
				};
			}
		}

		return lookupObj;
	} catch (e) {
		console.log("Failed getting GitHub releases, returning []");
		return [];
	}
}
