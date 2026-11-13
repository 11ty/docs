export default function (obj, key, insensitive = true) {
	for (let objKey in obj) {
		if (insensitive) {
			if (typeof objKey === "string" && objKey.toLowerCase() === key.toLowerCase()) {
				return true;
			}
		} else if (objKey === key) {
			return true;
		}
	}
	return false;
}
