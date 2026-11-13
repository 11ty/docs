import esbuild from "esbuild";
import { fileURLToPath } from "node:url";

export async function bundle(entryPoints, outfile, options = {}) {
	return esbuild.build(Object.assign({
		entryPoints,
		platform: "browser",
		format: "esm",
		bundle: true,
		minify: true,
		// package names to exclude
		// external: [],
		banner: {
			js: `/* via ${entryPoints} */`,
		},
		outfile,
	}, options));
}

export async function bundleModulePath(componentPath, outfile, options = {}) {
	let sourcefile = fileURLToPath(import.meta.resolve(componentPath));
	return bundle([ sourcefile ], outfile, options);
}
