/**
 * Represents a list item with a unique identifier, creation date, and content.
 */
export class ListItem {
	/**
	 * Creates an instance of ListItem.
	 *
	 * @param {string} content - The content of the list item.
	 */
	constructor(content) {
		const timestampPart = Date.now().toString().slice(-5);
		const randomPart = Math.random().toString(36).slice(2, 7);
		let id = `${timestampPart}-${randomPart}`;
		this.uniqueId = id;
		this.date = new Date();
		this.complete = false;
		this.content = content;
	}
}
