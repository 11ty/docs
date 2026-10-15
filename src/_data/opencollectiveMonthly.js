import getOpenCollectiveData from "./opencollective.js";

const opencollective = await getOpenCollectiveData();

export default async function () {
	let recurringAmount = 0;
	for (let supporter of opencollective.supporters) {
		if (supporter.status !== "ACTIVE") {
			continue;
		}
		if (supporter.frequency === "MONTHLY") {
			recurringAmount += supporter.amount.value;
		} else if (supporter.frequency === "YEARLY") {
			recurringAmount += supporter.amount.value / 12;
		}
	}

	return {
		recurringAmount,
	};
}
