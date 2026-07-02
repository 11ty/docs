import semver from "semver";
export { rcompare } from "semver";

import versions from "../src/_data/versions.js";

const newestPublishedVersion = versions
	.filter((v) => v.tag !== "LATEST" && !v.prerelease)
	.shift();

// Warning: using 2.0.0 excludes 2.0.0-beta.x, 2.0.0-alpha.x releases
const MINIMUM_VERSION_SHOWN = "0.99999.0";

const COERCE = {
	// should have `v` prefix
	"v2.0.0-canary.": "v2.0.0", // 2.0.0-beta.1 => 2.0.0 is handled automatically (see Note 1 below)
};

function isCoreRelease(version) {
	// For version text that starts with a number (plugins don’t do this)
	return ("" + version).match(/^v?[0-9]/);
}

function isPreRelease(version) {
	return version.includes("-");
}

function isPreReleaseOf(version, releasedVersion) {
	if (!isPreRelease(version)) {
		return false;
	}

	let stableVersion = version.split("-")[0];
	// `version` needs a `v` prefix for this comparison
	return stableVersion === releasedVersion;
}

// coerce -canary to -beta or if stable version is released, strips -canary and -beta
export function coerceVersion(version) {
	if (!isCoreRelease(version)) {
		return version;
	}

	let versionText = version;

	if (!versionText.startsWith("v")) {
		versionText = `v${versionText}`;
	}

	// Change all -canary.X to .beta.1
	for (let coerceKey in COERCE) {
		if (versionText.startsWith(coerceKey)) {
			let newVersion = COERCE[coerceKey];
			versionText = newVersion;
		}
	}

	if (isPreReleaseOf(versionText, newestPublishedVersion.tag)) {
		// Note 1: Strip -canary.1 or -beta.1 suffixes after 2.0.0 is shipped
		versionText = versionText.split("-")[0];
	} else if (
		isPreRelease(versionText) &&
		semver.lt(versionText, newestPublishedVersion.tag)
	) {
		// v2.0.0-beta.1 and the newest version is v2.0.1
		versionText = versionText.split("-")[0];
	}

	return versionText;
}

export function addedIn(version, tag, extraClass) {
	let beforeText = "Added in ";
	if (isCoreRelease(version)) {
		// Skip super old version notes
		if (semver.lt(version, MINIMUM_VERSION_SHOWN)) {
			return "";
		}

		let newestPublishedVersionTag = newestPublishedVersion.tag;
		if(newestPublishedVersionTag.startsWith("v")) {
			newestPublishedVersionTag = newestPublishedVersionTag.slice(1);
		}

		if (isPreRelease(version)) {
			if(semver.gt(version, newestPublishedVersionTag)) {
				beforeText = "Pre-release only: ";
			}
		} else {
			let newestPublishedMajorVersion = parseInt(newestPublishedVersionTag.split(".")[0]);
			if(semver.gt(version, newestPublishedVersionTag) || semver.gte(version, `${newestPublishedMajorVersion + 1}.0.0`)) {
				beforeText = "Upcoming in: ";
			}
		}
	}
	tag = tag || "span";

	return `<${tag} data-pagefind-ignore eleventy:id-ignore class="minilink minilink-addedin${
		extraClass ? ` ${extraClass}` : ""
	}" data-uncoerced-version="${version}">${beforeText}${coerceVersion.call(
		this,
		version
	)}</${tag}>`;
}

export function greaterThan(first, second) {
	return semver.gt(first, second);
}
