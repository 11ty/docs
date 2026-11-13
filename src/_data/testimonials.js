import { transform } from "@tweetback/canonical";

function transformUrl(url) {
	try {
		let u = transform(url);
		return u;
	} catch (e) {
		// do nothing
		return url;
	}
}

export default function () {
	return [
		{
			text: `Read the replies to: <em><a href="${transformUrl(
				"https://twitter.com/jensimmons/status/1107377359546736641",
			)}">“Fans of Eleventy.... why do you like it better than other static site generators?”</a></em>`,
			name: "Jen Simmons",
			avatarUrl: "https://jensimmons.com/",
			source: "https://twitter.com/jensimmons/status/1107377359546736641",
			indirect: true,
			filteredFromRandomPick: true,
		},
		{
			text: "Seriously can't remember enjoying using a Static Site Generator this much. Yes Hugo is rapid, but this is all so logical. It feels like it was designed by someone who has been through lots of pain and success using other SSGs.",
			name: "Phil Hawksworth",
			avatarUrl: "https://www.hawksworx.com/",
			source: "https://www.hawksworx.com/",
		},
		{
			text: "Don’t tell Zach I said it but Eleventy is seeming fresh as hell so far",
			name: "Mat Marquis",
			avatarUrl: "https://wil.to/",
			source: "https://hire.wil.to/",
			featured: true,
		},
		{
			text: "Jekyll is dead to me",
			name: "Andy Bell",
			avatarUrl: "https://andy-bell.co.uk/",
			source: "https://andy-bell.co.uk/",
			featured: true,
		},
		{
			text: "Just got through moving a project to Eleventy. Never used nunjucks or a static site generator before, but it was so easy. This will make my life so much easier.",
			name: "Micah Mills",
			source: "https://twitter.com/micahmills/status/973660230453211136",
		},
		{
			text: "After a day or so tweaking my existing build, here is a preview of the site running on Eleventy. I'm sold! The main thing to me was the ability to run custom JavaScript logic to sort, filter, and augment data in collections.",
			name: "Eduardo Bouças",
			avatarUrl: "https://eduardoboucas.com/",
			source: "https://twitter.com/eduardoboucas/status/1001158411583721473",
		},
		{
			text: "Every time I make something with Eleventy it makes me smile. I think that might be to do with its focus on simplicity.",
			name: "Phil Hawksworth",
			avatarUrl: "https://www.hawksworx.com/",
			source: "https://twitter.com/philhawksworth/status/998891176550977537",
		},
		{
			text: "I really like the flexibility Eleventy offers in comparison to my previous Jekyll build.",
			name: "Alex Carpenter",
			avatarUrl: "https://alexcarpenter.me/",
			source: "https://alexcarpenter.me/posts/2018/05/back-to-static",
		},
		{
			text: "I've been digging into Eleventy, a new static site generator. Really like the way it handles pagination!",
			name: "James Williamson",
			source: "https://twitter.com/jameswillweb/status/951488360543121408",
		},
		{
			text: "I tried Eleventy last night on a personal project and today we implemented it on a (non-public facing) client project. It's really good.",
			name: "Cody Peterson",
			avatarUrl: "https://humanshapes.co/",
			source: "https://twitter.com/codypeterson/status/950568228559904768",
		},
		{
			text: "Just gave Eleventy a first run/try and I must say it's pretty dang awesome. Especially for someone like me, who is most familiar with HTML and CSS and some JS. ❤️",
			name: "Marco Hengstenberg",
			source: "https://twitter.com/nice2meatu/status/1004665956885520384",
		},
		{
			text: "It's clean, elegant, easy to use, and does just enough to be useful without getting in the way. Excellent work 😊",
			name: "Timothy Miller",
			source: "https://twitter.com/WebInspectInc/status/1017594017402572811",
		},
		{
			text: "Holy cow! Eleventy is so crazy simple to work with.",
			name: "Will Riley",
			// avatarUrl: "https://www.splitinfinities.com/",
			source: "https://twitter.com/splitinfinities/status/1018874121755746310",
		},
		{
			text: "Eleventy + Netlify have become my new workflow for static sites. I think I'm in love.",
			name: "Mina Markham",
			avatarUrl: "https://minamarkh.am/",
			source: "https://twitter.com/MinaMarkham/status/1037088841520168960",
			featured: true,
		},
		{
			text: "I looked into and actively tried using various static site generators for this project. Eleventy was the only one I could find that gave me the fine-grained control I needed at blazingly fast build times.",
			name: "Mathias Bynens",
			avatarUrl: "https://mathiasbynens.be/",
			source: "https://twitter.com/mathias/status/1044232502309789696",
			featured: true,
		},
		{
			text: "Just the kind of simple / common sense tool I love. The data/folder hierarchy mechanism is super obvious and elegant.",
			name: "Heydon Pickering",
			avatarUrl: "https://heydonworks.com/",
			source: "https://twitter.com/heydonworks/status/1075691449776267265",
		},
		{
			text: "Eleventy is almost fascinatingly simple.",
			name: "Chris Coyier",
			avatarUrl: "https://chriscoyier.net/",
			source:
				"https://css-tricks.com/a-site-for-front-end-development-conferences-built-with-11ty-on-netlify/",
			featured: true,
		},
		{
			text: "Eleventy… makes my life so much easier.",
			name: "HJ Chen",
			avatarUrl: "https://chenhuijing.com/",
			source: "https://twitter.com/hj_chen/status/1117501300483207168",
		},
		{
			text: "Eleventy is my fave.",
			name: "Tatiana Mac",
			// avatarUrl: "https://www.tatianamac.com/",
			source: "https://twitter.com/TatianaTMac/status/1117110784830525440",
		},
		{
			text: "I actually used Eleventy for the first time this week. Loved it.",
			name: "Paul Lewis",
			avatarUrl: "https://aerotwist.com/",
			source: "https://twitter.com/aerotwist/status/1106904383390924801",
		},
		{
			text: "Eleventy is absolutely wonderful. It’s by far the nicest static site generator I’ve used in what feels like forever.",
			name: "Addy Osmani",
			source: "https://addyosmani.com/",
			avatarUrl: "https://addyosmani.com/",
			featured: true,
		},
		{
			text: "I heard Eleventy was good",
			name: "Lach Zeatherman",
			avatarSource: "https://www.zachleat.com/img/lachzeat-glasses.png",
			source: "https://twitter.com/lachzeat/status/1196789524535431168",
			featured: true,
			filteredFromRandomPick: true,
		},
		{
			text: "Eleventy is a killer static site generator. That’s all.",
			name: "Sara Soueidan",
			avatarUrl: "https://www.sarasoueidan.com/",
			source: "https://twitter.com/SaraSoueidan/status/1144696081403523072",
			featured: true,
		},
		{
			text: "Eleventy and web components go really, really well together.",
			name: "Justin Fagnani",
			avatarUrl: "https://justinfagnani.com/",
			source: "https://twitter.com/justinfagnani/status/1212847104718061569",
		},
		{
			text: "Think the reason everyone is loving [Eleventy] so much (myself included) is that it doesn't come with a prescription about data sources or template rendering.",
			name: "Brian Leroux",
			// avatarUrl: "https://webdev.rip/",
			source: "https://twitter.com/brianleroux/status/1213129879245295619",
		},
		{
			text: "I think what's great about Eleventy is how it was able to simplify SSGs to just 2 concepts: data sources and templates.",
			name: "Matthew Phillips",
			avatarUrl: "https://matthewphillips.info/",
			source: "https://twitter.com/matthewcp/status/1213129379414446080",
		},
		{
			text: "Eleventy is as close as we’ve gotten to how the web was always meant to be built (ya’ know, once we realized the value of templates and JavaScript).",
			name: "Reuben L. Lillie",
			avatarUrl: "https://reubenlillie.com/",
			source: "https://zirk.us/@reubenlillie",
		},
		{
			text: "I challenged myself to build the site in a day. I started at noon on Saturday and had something launched by 1am Saturday night. Built on [Eleventy] served by GitHub Pages, using [TravisCi] to deploy.",
			name: "Snook",
			avatarUrl: "https://snook.ca/",
			// source: "https://twitter.com/snookca/status/1082278684214657024",
		},
		{
			text: "I like Eleventy. (I hope that was enough to get me on the testimonials page.)",
			name: "Steve Gardner",
			avatarUrl: "https://ste.vg/",
			source: "https://twitter.com/steeevg/status/1409965870647025664",
		},
		{
			text: "Easily one of my favorite open source projects ever!",
			name: "Tyler Sticka",
			avatarUrl: "https://tylersticka.com/",
			source: "https://twitter.com/tylersticka/status/1446138920480043008",
		},
		{
			text: "[Eleventy is] a platform that legitimately built things in the way that I thought and worked more than anything else out there, and with every new feature it's like my mind gets read.",
			name: "Bryan Robinson",
			avatarUrl: "https://bryanlrobinson.com/",
			source: "https://twitter.com/brob/status/1446128951647035393",
		},
		{
			text: `#1 Product of the Day (May 2022)`,
			name: "Product Hunt",
			avatarUrl: "https://producthunt.com/",
			source: "https://www.producthunt.com/products/eleventy",
			featured: true,
			filteredFromRandomPick: true,
		},
		{
			text: `2018 winner of the Google Open Source Peer Bonus Award`,
			name: "Google",
			avatarUrl: "https://google.com/",
			source:
				"https://opensource.googleblog.com/2018/03/congratulating-open-source-peer-bonus-winners.html",
		},
		{
			text: `2019 winner of the Google Open Source Peer Bonus Award`,
			name: "Google",
			avatarUrl: "https://google.com/",
			source:
				"https://opensource.googleblog.com/2019/04/google-open-source-peer-bonus-winners.html",
		},
		{
			text: `2022 winner of the Google Open Source Peer Bonus Award`,
			name: "Google",
			avatarUrl: "https://google.com/",
			source:
				"https://opensource.googleblog.com/2022/03/Announcing-First-Group-of-Google-Open-Source-Peer-Bonus-Winners-in-2022.html",
			featured: true,
		},
		{
			text: `I use Eleventy on almost every project at this point and I love it.`,
			avatarUrl: "https://lea.verou.me/",
			name: "Lea Verou",
			source: "https://twitter.com/LeaVerou/status/1629652201168576512",
			featured: true,
		},
		{
			text: "The Eleventy + Netlify combo continues to be 🤌",
			avatarUrl: "https://danmall.com/",
			name: "Dan Mall",
			source: "https://twitter.com/danmall/status/1585364687046123521",
		},
	].map((entry) => {
		// canonical urls via @tweetback/canonical
		if (entry.source) {
			entry.source = transformUrl(entry.source);
		}
		return entry;
	});
}
