class Search {
	get headerInput() {
		return document.querySelector("header input[type='search']");
	}

	setValue(val) {
		if(this.headerInput) {
			this.headerInput.value = val;
		}
	}

	clearResults() {
		this.searchResultsCount.innerHTML = "Results";
		this.searchResultsList.innerHTML = "";
	}

	addResult(result) {
		let listItem = document.createElement("li");

		listItem.innerHTML = `<a href="${result.url}" class="search-results-item">
	<span class="search-results-item-title">
		${result.meta.title ? `<strong>${result.meta.title}</strong>` : result.url}
	</span>
	<p class="search-results-item-matches truncate-overflow" style="--truncate-lh: 1.8em; --truncate-lines: 3">
	<code>${result.excerpt
		.replace(/</g, "&lt;")
		.replace(/&lt;mark>/g, "<mark>")
		.replace(/&lt;\/mark>/g, "</mark>")}</code>
	</p>
	<p class="search-result-doc-path">${result.url}</p>
</a>
`;

		this.searchResultsList.append(listItem);
	}

	async getLibrary() {
		if (!this.pagefind) {
			this.pagefind = await import("/pagefind/pagefind.js");
			this.pagefind.init();
		}
		return this.pagefind;
	}

	async onInput(value) {
		this.setValue(value);

		let pagefind = await this.getLibrary();
		window.clearTimeout(this.onInputTimeout);
		this.onInputTimeout = window.setTimeout(async () => {
			this.clearResults();

			if (value.length > 1) {
				this.searchResults.classList.remove("hide");

				let search = await pagefind.search(value);
				let results = await Promise.all(search.results.map((r) => r.data()));

				// Deprioritize blog search results
				results.sort((a, b) => {
					const aIsBlog = a.url.startsWith('/blog');
					const bIsBlog = b.url.startsWith('/blog');
					if (aIsBlog && !bIsBlog) return 1;
					if (!aIsBlog && bIsBlog) return -1;
					return 0; // keep Pagefind's order otherwise
				});

				for (let result of results) {
					this.addResult(result, value);
				}
				if (results.length) {
					this.searchResultsCount.innerHTML = `${results.length} Result${
						results.length != 1 ? "s" : ""
					}`;
				} else {
					this.searchResultsList.innerHTML = "<li>No Matches Found.</li>";
				}
				this.searchResultsList.classList[results.length > 0 ? "remove" : "add"](
					"search-results-notfound"
				);
			} else {
				this.searchResults.classList.add("hide");
			}
		}, 100);
	}

	getQueryString() {
		let url = new URL(document.location.href);
		let searchQueryParam = url.searchParams.get("q");
		return searchQueryParam ? decodeURIComponent(searchQueryParam) : "";
	}

	hydrate() {
		let form = document.getElementById("eleventy-search");
		if (form) {
			form.addEventListener(
				"submit",
				function (event) {
					event.preventDefault();
				},
				false
			);
		}
		// if(this.headerInput && location.pathname.startsWith("/docs/search/")) {
		// 	this.headerInput.setAttribute("readonly", true);
		// }

		let text = document.getElementById("search-term");
		if (text) {
			text.addEventListener(
				"input",
				async (event) => {
					let value = event.target.value;
					await this.onInput(value);
					window.history.replaceState(
						{},
						"",
						`/docs/search/${value ? `?q=${encodeURIComponent(value)}` : ""}`
					);
				},
				false
			);

			let queryString = this.getQueryString();
			if (queryString) {
				text.value = queryString;
				this.onInput(queryString);
			} else {
				text.value = "";
			}
		}

		let results = document.getElementById("search-results");
		if (results) {
			this.searchResults = results;
		}

		let resultsList = document.getElementById("search-results-list");
		if (resultsList) {
			this.searchResultsList = resultsList;
		}

		let resultsCount = document.getElementById("search-results-count");
		if (resultsCount) {
			this.searchResultsCount = resultsCount;
		}
	}
}

let search = new Search();
search.hydrate();
