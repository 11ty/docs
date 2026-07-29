import Fetch from "@11ty/eleventy-fetch";

export default async function () {
  const url = "https://11ty.github.io/kickstarter-api/build-awesome-pro.json";
  return Fetch(url, {
		type: "json",
		duration: "5m",
	});
}
