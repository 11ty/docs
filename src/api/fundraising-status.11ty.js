
function data() {
	return {
		permalink: "/api/fundraising-status.json",
	};
}
async function render(data) {
	return JSON.stringify({
		monthly: {
			value: parseFloat(data.opencollectiveMonthly?.recurringAmount.toFixed(2) || 0),
			currency: "USD",
		}
	}, null, 2);
}

export { data, render };
