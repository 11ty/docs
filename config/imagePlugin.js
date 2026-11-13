import fs from "node:fs";
import path from "node:path";
import eleventyImage, { eleventyImageTransformPlugin } from "@11ty/eleventy-img";
import config from "../src/_data/config.js";

const ONE_DAY = 24*60*60*1000;
const IS_COPY_CACHE_FOLDER = process.env.ELEVENTY_RUN_MODE === "build";

// Warning: changing these options could impact cold-cache build-server build times
const imageOptions = {
	failOnError: false,

	// Swap to ["webp", "auto"] for much speedier cold-cache build-server builds
	formats: ["avif", "auto"],

	htmlOptions: {
		imgAttributes: {
			// <img loading decoding> assigned in HTML will override these values
			loading: "lazy",
			decoding: "async",
		}
	},

	avifOptions: {
		quality: 90,
	},

	cacheOptions: {
		duration: "14d",
	},
};

if(IS_COPY_CACHE_FOLDER) {
		// Performance optimization
	imageOptions.urlPath = "/img/built/";
	imageOptions.outputDir = ".cache/@11ty/img/";
}

export function optimizeImage(filePath, width, format) {
	let options = Object.assign({}, imageOptions, {
		widths: [width],
		formats: format || "auto",
		failOnError: true,
		transformOnRequest: !IS_COPY_CACHE_FOLDER,
	});

	return eleventyImage(filePath, options);
}

function productionUrl(imagePath) {
	let hostname = (process.env.VERCEL_TARGET_ENV === "production" ? "" : process.env.VERCEL_BRANCH_URL);
	let u = new URL(imagePath, hostname ? `https://${hostname}` : config.origin);
	return u.toString();
}

function getScreenshotUrl(urlPath, screenshotCacheBustParam = "") {
	if(!urlPath) {
		return config.origin + "/img/open-graph.jpg"; // Default!
	}
	let fullUrl = addCacheBusterQueryParam(config.origin + urlPath, screenshotCacheBustParam);

	return `https://screenshot.11ty.app/${encodeURIComponent(fullUrl)}/opengraph/x.jpg`;
}

function addCacheBusterQueryParam(fullUrl, queryParamValue) {
	if(!queryParamValue) {
		return fullUrl;
	}

	let u = new URL(fullUrl);
	u.searchParams.set("cachebust", queryParamValue);
	return u.toString();
}

function isRecentPost(date) {
	return (Date.now() - date.getTime()) < ONE_DAY*14;
}

export default function($config) {
	$config.addFilter("productionUrl", productionUrl);

	// Resize and transform an image format, return URL to that image
	// Supports Font Awesome icons via protocol handler (e.g. `fas:font-awesome-flag`)
	$config.addFilter("getOpengraphImageUrl", async function({ url, date }, screenshotCacheBustParam) {
		// skip optimization of recent posts that have a cache buster (we don’t want to screenshot pages that aren’t deployed yet)
		if(isRecentPost(date) && screenshotCacheBustParam) {
			return getScreenshotUrl(url, screenshotCacheBustParam);
		}

		let stats = await optimizeImage(getScreenshotUrl(url), 1200, "png");
		let outputFormat = Object.keys(stats).pop();
		let formatStats = stats[outputFormat][0];

		if(!IS_COPY_CACHE_FOLDER) {
			return formatStats.url;
		}

		// absolute URL required for opengraph images
		return productionUrl(formatStats.url);
	});

	$config.addPlugin(eleventyImageTransformPlugin, imageOptions);

	if(IS_COPY_CACHE_FOLDER) {
		// We aren’t using passthrough file copy here because it globs too early to catch files created during the build
		$config.on("eleventy.after", () => {
			fs.cpSync(".cache/@11ty/img/", path.join($config.directories.output, "img/built/"), { recursive: true });
		});
	}
};
