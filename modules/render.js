import { handleEditButtonClick } from "./listItemControls.js";
import { retrieveStoredData } from "./storage.js";

export const listElement = document.getElementById("list");

/**
 * Renders the list items by fetching stored items from local storage and
 * appending them to the list element.
 *
 * This function clears the current list and repopulates it with items
 * from the stored data. If no list element is found, a warning is logged.
 *
 * @returns {void}
 */
export function renderListItem() {
	const myList = retrieveStoredData("TooDoo");

	if (!listElement) {
		console.warn("No list element found");
		return;
	}

	// Clear listElement
	listElement.innerHTML = "";

	if (myList.length !== 0) {
		// Sort list; start with uncomplete items
		myList.sort((a, b) => a.complete - b.complete);

		myList.forEach((item, index) => {
			listElement.appendChild(buildListItem(item, index + 1));
		});
	}
}

/**
 * Builds a list item element for the given item and index.
 *
 * This function creates and returns an HTML list item element (`<li>`)
 * containing the item's content and associated controls (edit and delete buttons).
 *
 * @param {Object} item - The item to be displayed in the list.
 * @param {number} index - The index of the item in the list (used for unique IDs).
 * @returns {HTMLElement} The constructed list item element.
 */
export function buildListItem(item, index) {
	const listItem = document.createElement("li");
	const firstDiv = document.createElement("div");
	const secondDiv = document.createElement("div");
	const checkbox = document.createElement("input");
	const label = document.createElement("label");
	const editBtn = document.createElement("button");
	const delBtn = document.createElement("button");
	const pencil = document.createElement("i");
	const trash = document.createElement("i");

	listItem.classList.add("list-item");
	listItem.dataset.itemId = item.uniqueId;

	firstDiv.classList.add("list-item-content");
	secondDiv.classList.add("list-item-control");

	checkbox.id = `item-${index}`;
	checkbox.setAttribute("type", "checkbox");

	label.setAttribute("for", `item-${index}`);
	label.textContent = item.content;

	editBtn.setAttribute("type", "button");
	delBtn.setAttribute("type", "button");

	editBtn.classList.add("edit-button");
	delBtn.classList.add("delete-button");

	pencil.classList.add("fa", "fa-pencil");
	trash.classList.add("fa", "fa-trash");

	delBtn.appendChild(trash);
	editBtn.appendChild(pencil);
	secondDiv.appendChild(editBtn);
	secondDiv.appendChild(delBtn);

	firstDiv.appendChild(checkbox);
	firstDiv.appendChild(label);

	listItem.appendChild(firstDiv);
	listItem.appendChild(secondDiv);

	// Style checked/unchecked item
	if (item.complete) {
		label.style.color = "var(--grey-600)";
		label.style.textDecoration = "line-through";
		label.parentNode.parentNode.style.opacity = "0.4";
		checkbox.checked = true;
		editBtn.style.visibility = "hidden";
	} else {
		label.style = "color: unset; text-decoration: unset";
		editBtn.style.visibility = "visible";

		handleEditButtonClick();
	}

	return listItem;
}
