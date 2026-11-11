import { glob } from "tinyglobby";
import { Importer } from "@11ty/import";

// Relative to the folder targeted below
let paths = (await glob("src/docs/**/*.md")).map((filePath) =>
	filePath.slice("src/".length)
);

let importer = new Importer();
// Targeting `src` keeps both the data files and the downloaded avatars inside it
importer.setOutputFolder("src");
importer.setAssetsFolder("img/docs-avatars");
importer.setAvatarReferenceType("absolute");
importer.addSource("git", {
	url: "src",
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
