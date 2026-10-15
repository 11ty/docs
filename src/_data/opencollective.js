// https://opencollective.com/11ty/members/all.json
import EleventyFetch from "@11ty/eleventy-fetch";
import githubSponsors from "./githubSponsors.js";

function isHostnameMatchTo(websiteUrl, filteredList = []) {
	if(!websiteUrl || filteredList.length === 0) {
		return false;
	}

	try {
		let u = new URL(websiteUrl);
		if(filteredList.find(hostname => u.hostname.endsWith(hostname))) {
			return true;
		}
	} catch(e) {}

	return false;
}

const ACTIVE_MINIMUM = 1.00000001;

const CUMULATIVE_MINIMIUM = {
	INDIVIDUAL: 55, // minimum total amount to show inactive logo
	DEFAULT_AVATAR: 200, // minimum amount for default avatar (previously never shown)
	ORGANIZATION: 999999, // minimum total amount to show inactive logo
};

// see also filterSupportersActive filter in config file
const ALLOWED_EXCEPTIONS_OPENCOLLECTIVE_SLUGS = [];

// These hostnames are not *linked to* but profiles are still shown.
const BYPASSED_HOSTNAME_LINKS = [
	"example.com",
	"x.com",
	"twitter.com",
];

// Not shown at all
const FILTERED_HOSTNAMES = [
	"trustpilot.com",
];

const FILTERED_OPENCOLLECTIVE_SLUGS = [
	"zach-leatherman", // me
	"bca-account1", // website is buycheapaccounts.com
	"baocasino", // gambling
	"woorke", // sells social media accounts
	"suominettikasinot24", // gambling
	"masonslots", //gambling
	"trust-my-paper", // selling term papers
	"kiirlaenud", // some quick loans site
	"kajino-bitcoin", // crypto
	"seo25-com", // selling website traffic
	"relief-factor", // profile link was some weird PDF
	"targetedwebtraffic", // selling website traffic
	"forexbrokerz", // crypto
	"viewality-media", // broken site on wix?
	"aviator-game1", // gambling
	"igrovye-avtomaty", // gambling
	"sidesmedia", // selling social media
	"best-casinos-australia-bca", // gambling
	"buy-tiktok-likes", // selling social media
	"fameverge", // site does not exist
	"buy-instagram-auto-likes",
	"buy-active-youtube-subscribers",
	"socialfans", // site does not exist
	// archived
	"richard-herbert",
];

function isMonthlyOrYearlyOrder(order) {
	return (order.frequency === "MONTHLY" || order.frequency === "YEARLY") && order.status === "ACTIVE";
}

function getUniqueContributors(orders, githubSponsorsAmount) {
	let uniqueContributors = {};
	for (let order of orders) {
		if (!uniqueContributors[order.slug]) {
			uniqueContributors[order.slug] = order;
			continue;
		}

		// if order already exists, overwrite only if existing entry is not an active monthly contribution
		let isPreviousRecurring = isMonthlyOrYearlyOrder(uniqueContributors[order.slug]);
		let isNewRecurring = isMonthlyOrYearlyOrder(order);
		if (isPreviousRecurring) {
			if(isNewRecurring) {
				if(order.amount.value > uniqueContributors[order.slug].amount.value) {
					// replace old with new if new amount is larger
					uniqueContributors[order.slug] = order;
				}
			}
		// } else if(order.createdAt > uniqueContributors[order.slug].createdAt) {
		} else {
			// replace old with new
			uniqueContributors[order.slug] = order;
		}
	}

	// Better estimate here: https://github.com/sponsors/11ty/dashboard
	// Inject manually to workaround the retroactive non-recurring payments from GitHub Sponsors
	uniqueContributors["github-sponsors"] = {
		amount: { value: githubSponsorsAmount },
		frequency: 'MONTHLY',
		status: 'ACTIVE',
		name: 'GitHub Sponsors Aggregate (Estimate)',
		slug: 'github-sponsors',
		github: null,
		image: 'https://images.opencollective.com/github-sponsors/dc0ae97/logo.png',
		website: 'https://github.com/sponsors/',
		profile: 'https://opencollective.com/github-sponsors',
		totalAmountDonated: githubSponsorsAmount,
		isMonthly: true,
		hasDefaultAvatar: false,
		showOnFacepile: false,
	};

	return Object.values(uniqueContributors);
}

let logged = false;

export default async function () {
	try {
		// let url = `https://rest.opencollective.com/v2/11ty/orders/incoming?limit=1000&status=ACTIVE`;
		let jsonA = await EleventyFetch(`https://rest.opencollective.com/v2/11ty/orders/incoming?limit=1000&offset=0`, {
			type: "json",
			duration: "30m",
			directory: ".cache/eleventy-fetch/",
			dryRun: false,
		});
		let jsonB = await EleventyFetch(`https://rest.opencollective.com/v2/11ty/orders/incoming?limit=1000&offset=1000`, {
			type: "json",
			duration: "30m",
			directory: ".cache/eleventy-fetch/",
			dryRun: false,
		});

		let nodes = [...jsonA.nodes, ...jsonB.nodes]

		if(!logged && nodes.length > 1950) {
			console.log( nodes.length, "OpenCollective supporter results (careful when this hits the API max limit of 2000)" );
			logged = true;
		}

		let orders = nodes
			.map((order) => {
				order.name = order.fromAccount.name;
				order.accountType = order.fromAccount.type;
				order.slug = order.fromAccount.slug;
				order.image = order.fromAccount.imageUrl;

				if(!isHostnameMatchTo(order.fromAccount.website, BYPASSED_HOSTNAME_LINKS)) {
					order.website = order.fromAccount.website;
				}

				order.profile = `https://opencollective.com/${order.slug}`;
				order.totalAmountDonated = Number(order.totalDonations.value);
				order.isMonthly = isMonthlyOrYearlyOrder(order);
				order.isActive = order.status === "ACTIVE" ? true : false;

				order.hasDefaultAvatar =
					order.image ===
					`https://images.opencollective.com/${order.slug}/avatar.png`;

				order.showOnFacepile = ALLOWED_EXCEPTIONS_OPENCOLLECTIVE_SLUGS.includes(order.slug) ||
					order.isActive && order.amount.value >= ACTIVE_MINIMUM ||
					order.accountType === "INDIVIDUAL" && order.totalAmountDonated > CUMULATIVE_MINIMIUM.INDIVIDUAL ||
					order.accountType === "ORGANIZATION" && order.totalAmountDonated > CUMULATIVE_MINIMIUM.ORGANIZATION;

				// Active orders usually *must* have an avatar (or a website)
				if(order.showOnFacepile && order.accountType === "INDIVIDUAL" && order.hasDefaultAvatar && !order.website) {
					order.showOnFacepile = order.totalAmountDonated > CUMULATIVE_MINIMIUM.DEFAULT_AVATAR;
				}

				if(order.slug.startsWith("guest-")) {
					order.showOnFacepile = false;
				}

				if(isHostnameMatchTo(order.website, FILTERED_HOSTNAMES)) {
					order.showOnFacepile = false;
				}

				return order;
			});

		let backersCount = orders.filter(entry => {
			return entry.totalAmountDonated > 0;
		}).length;

		// lol hardcoded
		orders.push({
			name: "Zach Leatherman",
			slug: "zach-leatherman",
			accountType: "INDIVIDUAL",
			github: "zachleat",
			image:
				"https://images.opencollective.com/zachleat/70606f4/avatar/256.png",
			website: "https://www.zachleat.com/",
			profile: "https://opencollective.com/zachleat",
			totalAmountDonated: 0,
			isMonthly: true,
			hasDefaultAvatar: false,
			showOnFacepile: false,
		});

		let githubSponsorsAmount = await githubSponsors();
		orders = getUniqueContributors(orders, githubSponsorsAmount);

		orders.sort(function (a, b) {
			// Sort by total amount donated (desc)
			return b.totalAmountDonated - a.totalAmountDonated;
		});

		// Filter banned slugs (spam, donation terms violations)
		orders = orders.filter(order => {
			// filter out Incognito users (an Open Collective thing)
			if(order.name?.toLowerCase() === "incognito" || order.slug?.toLowerCase()?.startsWith("incognito-")) {
				return false;
			}
			if(FILTERED_OPENCOLLECTIVE_SLUGS.includes(order.slug)) {
				return false;
			}
			return true;
		});

		return {
			supporters: orders,
			backersCount,
		};
	} catch (e) {
		if (process.env.NODE_ENV === "production") {
			// Fail the build in production.
			return Promise.reject(e);
		}

		console.error("Failed, returning 0 opencollective backers.", e);

		return {
			supporters: [],
		};
	}
}
