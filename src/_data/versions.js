import semver from "semver";
import config from "./config.js";
import fetchGitHubReleases from "./githubReleases.js";

// Note: there are more hardcoded 11ty and github origins lower in this file
const STABLE_DOCS_URL = "https://www.11ty.dev/docs/";

const NODE_MINIMUMS = {
	"4": 22,
	"3": 18,
	"2": 14,
	"1": 12,
};

const HARDCODED_VERSIONS = [
	{
		tag: "v0.3.5",
		docs_link_to_github: true,
	},
	{
		tag: "v0.3.4",
		docs_link_to_github: true,
	},
	{
		tag: "v0.3.3",
		docs_link_to_github: true,
	},
	{
		tag: "v0.3.1",
		docs_link_to_github: true,
	},
	{
		tag: "v0.3.0",
		docs_link_to_github: true,
	},
	{
		tag: "v0.2.15",
		docs_link_to_github: true,
	},
	{
		tag: "v0.2.14",
		docs_link_to_github: true,
	},
	{
		tag: "v0.2.13",
		ignore_release_notes: true,
		docs_link_to_github: true,
	},
	{
		tag: "v0.2.12",
		ignore_release_notes: true,
		docs_link_to_github: true,
	},
	{
		tag: "v0.2.11",
		ignore_release_notes: true,
		docs_link_to_github: true,
	},
	{
		tag: "v0.2.10",
		docs_link_to_github: true,
	},
	{
		tag: "v0.2.9",
		ignore_release_notes: true,
		docs_link_to_github: true,
	},
	{
		tag: "v0.2.8",
		ignore_release_notes: true,
		docs_link_to_github: true,
	},
	{
		tag: "v0.2.7",
		docs_link_to_github: true,
	},
	{
		tag: "v0.2.6",
		docs_link_to_github: true,
	},
	{
		tag: "v0.2.5",
		ignore_release_notes: true,
		docs_link_to_github: true,
	},
	{
		tag: "v0.2.4",
		ignore_release_notes: true,
		docs_link_to_github: true,
	},
	{
		tag: "v0.2.3",
		ignore_release_notes: true,
		docs_link_to_github: true,
	},
	{
		tag: "v0.2.2",
		docs_link_to_github: true,
	},
	{
		tag: "v0.2.1",
		ignore_release_notes: true,
		docs_link_to_github: true,
	},
	{
		tag: "v0.2.0",
		ignore_release_notes: true,
		docs_link_to_github: true,
	},
	{
		tag: "v0.1.9",
		ignore_release_notes: true,
		docs_link_to_github: true,
	},
	{
		tag: "v0.1.8",
		ignore_release_notes: true,
		docs_link_to_github: true,
	},
	{
		tag: "v0.1.7",
		ignore_release_notes: true,
		docs_link_to_github: true,
	},
	{
		tag: "v0.1.6",
		ignore_release_notes: true,
		docs_link_to_github: true,
	},
	{
		tag: "v0.1.5",
		ignore_release_notes: true,
		docs_link_to_github: true,
	},
	{
		tag: "v0.1.4",
		ignore_release_notes: true,
		docs_link_to_github: true,
	},
	{
		tag: "v0.1.3",
		ignore_release_notes: true,
		docs_link_to_github: true,
	},
	{
		tag: "v0.1.2",
		ignore_release_notes: true,
		docs_link_to_github: true,
	},
	{
		tag: "v0.1.1",
		ignore_release_notes: true,
		docs_link_to_github: true,
	},
	{
		tag: "v0.1.0",
		ignore_release_notes: true,
		docs_link_to_github: true,
	},
];

let githubReleases = await fetchGitHubReleases();

for(let version of HARDCODED_VERSIONS) {
	let key = version.tag.slice(1);
	if(githubReleases[key]) {
		githubReleases[key] = {
			...githubReleases[key],
			...version,
		}
	} else {
		githubReleases[key] = {
			...version
		};
	}

	// Override tag only
	githubReleases[key].tagOnly = false;
}

let versions = Object.values(githubReleases);

// Add tag for latest stable
let latestStableMajor;

for(let version of versions) {
	if( version.channel && version.channel !== "latest" ) {
		continue;
	}
	if( !config.prerelease && version.prerelease ) {
		continue;
	}
	version.latestStableRelease = true;
	latestStableMajor = semver.major(version.tag);

	break;
}

// Add docs_url and minimumNodeVersion
for(let version of versions) {
	let versionMajor = semver.major(version.tag);
	if(versionMajor === latestStableMajor) {
		version.docs_url = STABLE_DOCS_URL;
	} else if(version.docs_link_to_github) {
		version.docs_url = `https://github.com/11ty/eleventy/blob/${version.tag}/README.md`;
	} else {
		version.docs_url = `https://v${versionMajor}.11ty.dev/docs/`;
	}

	let nodeMin = NODE_MINIMUMS[""+versionMajor];
	if(nodeMin) {
		version.minimumNodeVersion = nodeMin;
	}
}

versions.sort((a, b) => {
	if(semver.gt(a.tag, b.tag)) {
		return -1;
	}
	if(semver.lt(a.tag, b.tag)) {
		return 1;
	}
	return 0;
})

export default versions;
