/**
 * Updates the stored data in local storage.
 *
 * @param {string} key - The key under which the data is stored in local storage.
 * @param {any} data - The data to be stored, which will be converted to a JSON string.
 * @returns {void}
 */
export function updateStoredData(key, data) {
	localStorage.setItem(key, JSON.stringify(data));
}

/**
 * Retrieves stored data from local storage.
 *
 * @returns {any[]} - The parsed data from local storage, or an empty array if no data is found.
 */
export function retrieveStoredData(key) {
	const storedData = localStorage.getItem(key);
	return storedData === null
		? key.includes("-theme")
			? true
			: []
		: JSON.parse(storedData);
}

export function retrieveStoredTheme() {
	const storedTheme = localStorage.getItem("TooDoo-theme");
	return storedTheme === null ? true : JSON.parse(storedTheme);
}
