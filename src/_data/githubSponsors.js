import EleventyFetch from "@11ty/eleventy-fetch";

export default async function() {
	const query = `query {
		organization(login: "11ty") {
			monthlyEstimatedSponsorsIncomeInCents
		}
	}`

	if(!process.env.GITHUB_READ_TOKEN) {
		console.error( "Missing GITHUB_READ_TOKEN env variable." );
		return {};
	}

	let fetchOptions = {
		method: "POST",
		headers: {
			Authorization: `bearer ${process.env.GITHUB_READ_TOKEN}`,
		},
		body: JSON.stringify({ query }),
	};

	let result = await EleventyFetch("https://api.github.com/graphql", {
		duration: "30m",
		type: "json",
		fetchOptions,
	});

	return (result?.data?.organization?.monthlyEstimatedSponsorsIncomeInCents || 0) / 100;
}
