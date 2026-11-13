addEventListener("DOMContentLoaded", () => {
	document.querySelectorAll("[data-wa-copy-button-target]").forEach(island => {
		let id = island.getAttribute("data-wa-copy-button-target");
		let pre = island.closest(".syntax-highlight")?.querySelector("pre");
		if(pre && !pre.hasAttribute("id")) {
			pre.setAttribute("id", id);
		}
	})
})
