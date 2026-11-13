export default {
	outdated: false,
	prerelease: false,
	githubEdit: "https://github.com/11ty/docs/tree/main/",
	now: new Date(),
	env: process.env.NODE_ENV,
	origin: "https://www.11ty.dev", // important: no trailing slash on URL
	kickstarterUrl: "https://www.kickstarter.com/projects/fontawesome/build-awesome-pro?ref=43ttgb",
	kickstarterLaunchDate: (new Date("2026-04-28T15:00:00Z")).toISOString(),
	kickstarterCloseDate: (new Date("2026-05-28T21:00:00Z")).toISOString(),
};
