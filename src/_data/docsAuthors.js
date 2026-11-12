import fs from "node:fs";
import { glob } from "tinyglobby";

import hiddenAuthors from "../../config/hiddenAuthors.js";

// GitHub authors from the git history imported into each docs page’s data file
export default async function () {
	let files = await glob("src/docs/**/*.json");
	let authors = new Map();

	for (let file of files) {
		let { authors: pageAuthors } = JSON.parse(fs.readFileSync(file, "utf8"));
		if (!Array.isArray(pageAuthors)) {
			continue;
		}

		for (let author of pageAuthors) {
			// Only the api import route has a login (and therefore an avatar)
			if (
				!author?.url?.startsWith("https://github.com/") ||
				author.name.endsWith("[bot]") ||
				hiddenAuthors.has(author.name)
			) {
				continue;
			}

			let existing = authors.get(author.url);
			if (existing) {
				existing.pages++;
			} else {
				authors.set(author.url, {
					name: author.name,
					url: author.url,
					avatarUrl: author.avatarUrl,
					pages: 1,
				});
			}
		}
	}

	return Array.from(authors.values()).sort((a, b) => b.pages - a.pages);
}
