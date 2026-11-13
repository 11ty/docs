export default function getAuthors(sites) {
	let names = new Set();
	for (let key in sites) {
		let site = sites[key];
		if (site.disabled) {
			continue;
		}

		if(Array.isArray(site.authors)) {
			site.authors = site.authors.filter(entry => !entry.startsWith("twitter:"));
		}

		if (site.opened_by) {
			if(Array.isArray(site.authors) && site.authors.length > 0 && !site.authors.includes(site.opened_by)) {
				// do nothing
			} else if(!site.opened_by.startsWith("twitter:")) {
				names.add(site.opened_by);
			}
		}

		if (Array.isArray(site.authors)) {
			for (let name of site.authors) {
				if (name) {
					names.add(name);
				}
			}
		}
	}

	return Array.from(names);
}
