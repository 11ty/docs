import Fetch from "@11ty/eleventy-fetch";

const REPORT_URL = "https://zachleat.github.io/is-this-still-being-maintained/report.json";

export default async function () {
	try {
		let report = await Fetch(REPORT_URL, {
			type: "json",
			duration: "1d",
		});

		let packages = report.projects.filter(p => p.owner === "11ty");
		// Workspace packages share a repo, so count each repo once.
		let repos = [...new Map(packages.map(p => [p.nameWithOwner, p])).values()];
		let published = packages.filter(p => p.published);
		let generatedAt = Date.parse(report.generatedAt);
		const YEAR = 365 * 24 * 60 * 60 * 1000;

		return {
			downloads: packages.reduce((sum, p) => sum + (p.downloadsAllTimeKnown ? p.downloadsAllTime : 0), 0),
			// Last-year total sets the pace for the live estimate.
			downloadsLastYear: packages.reduce((sum, p) => sum + (p.downloadsKnown ? p.downloads : 0), 0),
			stars: repos.reduce((sum, p) => sum + (p.stars || 0), 0),
			// Lifetime average per repo (stars over repo age) sets the pace for the live estimate.
			starsPerYear: repos.reduce((sum, p) => {
				let age = (generatedAt - Date.parse(p.repoCreatedAt)) / YEAR;
				return sum + (p.stars && age > 0 ? p.stars / age : 0);
			}, 0),
			closedIssues: repos.reduce((sum, p) => sum + (p.closedIssues || 0), 0),
			// Report splits merged from closed-unmerged, GitHub's "closed" count includes both.
			closedPRs: repos.reduce((sum, p) => sum + (p.closedPRs || 0) + (p.mergedPRs || 0), 0),
			// Packages that made it to npm, and every version published across them.
			publishedPackages: published.length,
			publishCount: published.reduce((sum, p) => sum + (p.publishCount || 0), 0),
			generatedAt: report.generatedAt,
		};
	} catch (e) {
		if (process.env.NODE_ENV === "production") {
			return Promise.reject(e);
		}

		console.log("Failed getting project download totals, returning 0");
		return {
			downloads: 0,
			downloadsLastYear: 0,
			stars: 0,
			starsPerYear: 0,
			closedIssues: 0,
			closedPRs: 0,
			publishedPackages: 0,
			publishCount: 0,
		};
	}
}
