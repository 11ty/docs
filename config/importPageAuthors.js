import { glob } from "tinyglobby";
import { Importer } from "@11ty/import";

let paths = await glob("src/docs/**/*.md");

let importer = new Importer();
importer.setOutputFolder(".");
// Avatars are rendered from the GitHub login at build, not downloaded here
importer.setAvatarReferenceType("disabled");
importer.addSource("git", {
	url: ".",
	// Only the api route has GitHub logins (and avatars), `git log` has commit names
	route: "api",
	path: paths,
	// The facepile uses `authors` (deduped from the full history), so keep one commit
	commits: 1,
});

let entries = await importer.getEntries({ target: "fs" });
await importer.toFiles(entries);
importer.logResults();

if (importer.isIncomplete()) {
	process.exitCode = 1;
}
