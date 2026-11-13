import { transform } from 'lightningcss';
import { minify } from "terser";
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { parse } from "node:path";

export async function minifyJavaScriptFile(source, target) {
	let contents = readFileSync(source, "utf8");

	let { dir } = parse(target);
	mkdirSync(dir, {
		recursive: true
	});

	if (process.env.ELEVENTY_RUN_MODE === "build") {
		let minified = await minifyJavaScript(contents);
		writeFileSync(target, minified, "utf8")
	} else {
		writeFileSync(target, `/* [11ty/docs] minification skipped during dev mode */\n${contents}`, "utf8")
	}
}

export async function minifyJavaScript(code) {
	return minify(code).then(result => result.code);
}

export default function ($config) {
	$config.addFilter("jsmin", async function(code) {
		if (process.env.ELEVENTY_RUN_MODE === "build") {
			return minifyJavaScript(code);
		}

		return `/* [11ty/docs] minification skipped during dev mode */\n${code}`;
	});

	$config.addFilter("cssmin", function (inputCode) {
		if (process.env.ELEVENTY_RUN_MODE === "build") {
			let { code } = transform({
				// filename: undefined,
				code: Buffer.from(inputCode),
				minify: true,
				sourceMap: false
			});
			return code;
		}

		return `/* [11ty/docs] minification skipped during dev mode */\n${inputCode}`;
	});
}

