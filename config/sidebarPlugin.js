import { navigation } from "@11ty/eleventy-navigation";
import memoize, { memoizeClear } from "memoize";

function filterNavSidebar(collection = [], propName) {
	if(!propName) {
		return collection;
	}
	// filter out excludeFromSidebar items
	return collection.filter(item => {
		if(Array.isArray(item.children)) {
			item.children = filterNavSidebar(item.children, propName);
		}

		return Boolean(item.data?.eleventyNavigation) && item.data?.[propName] !== true;
	});
}
const navFn = memoize(function(key) {
	return filterNavSidebar(navigation.find(this.ctx.collections.all, key), "removedFeature");
});
const navFilteredFn = memoize(function(key) {
	return filterNavSidebar(navigation.find(this.ctx.collections.all, key), "excludeFromSidebar");
});
const navBreadcrumbsFn = memoize(function(key) {
	return navigation.findBreadcrumbs(this.ctx.collections.all, key, {includeSelf: true})
});

export default function($config) {

	$config.on("eleventy.after", () => {
		memoizeClear(navFn);
		memoizeClear(navFilteredFn);
		memoizeClear(navBreadcrumbsFn);
	})
	$config.addFilter("nav", navFn);
	$config.addFilter("navFiltered", navFilteredFn);
	$config.addFilter("navBreadcrumbs", navBreadcrumbsFn);
};
