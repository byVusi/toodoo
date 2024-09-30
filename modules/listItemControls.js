import { retrieveStoredData, updateStoredData } from "./storage.js";
const myList = document.getElementById("list");

/**
 * Handles the click event on checkboxes within the list.
 * Toggles the visual state of the checkbox and updates its completion status.
 */
export function handleCheckboxClick() {
	myList.addEventListener("click", (e) => {
		const checkboxId = e.target.id;

		if (checkboxId.startsWith("item-")) {
			const checkbox = document.getElementById(checkboxId);
			const label = checkbox.nextElementSibling;
			const currentItem = checkbox.parentElement.parentElement;

			const isChecked = checkbox.checked;

			label.style.color = isChecked ? "var(--grey-600)" : "unset";
			label.style.textDecoration = isChecked ? "line-through" : "unset";

			currentItem.children[1].children[0].style.visibility = isChecked
				? "hidden"
				: "visible";

			checkbox.closest(".list-item").style.opacity = isChecked ? "0.5" : "1";

			currentItem.remove();
			isChecked ? myList.appendChild(currentItem) : myList.prepend(currentItem);

			const storedItems = retrieveStoredData("TooDoo");

			isChecked
				? setCompletionStatus(storedItems, true, checkbox)
				: setCompletionStatus(storedItems, false, checkbox);

			updateStoredData("TooDoo", storedItems);
		}
	});
}

/**
 * Handles the click event on delete buttons within the list.
 * Removes the corresponding list item and updates stored data.
 */
export function handleDeleteButtonClick() {
	myList.addEventListener("click", (e) => {
		const clickedButton = e.target;

		if (
			clickedButton.classList.contains("delete-button") ||
			clickedButton.classList.contains("fa-trash")
		) {
			const listItem = clickedButton.closest(".list-item");
			const contentElement = listItem.children[0].children[1];
			const text = contentElement.textContent;

			listItem.remove();

			const storedItems = retrieveStoredData("TooDoo");
			const filteredStoredItems = storedItems.filter(
				(item) => item.uniqueId !== listItem.dataset.itemId
			);

			updateStoredData("TooDoo", filteredStoredItems);
		}
	});
}

/**
 * Handles the click event on edit buttons within the list.
 * Enables editing mode for the corresponding list item.
 *
 * @param {string} oldText - The original text before editing.
 */
export function handleEditButtonClick() {
	myList.addEventListener("click", (e) => {
		let clickedButton = e.target;
		let oldText;

		if (
			clickedButton.classList.contains("edit-button") ||
			clickedButton.classList.contains("fa-pencil")
		) {
			if (clickedButton.classList.contains("edit-button")) {
				clickedButton = clickedButton.children[0];
			}

			const listItem = clickedButton.closest(".list-item");
			const contentElement = listItem.children[0];
			const checkbox = contentElement.children[0];
			const text = contentElement.children[1];
			oldText = text.textContent;

			checkbox.disabled = true;
			text.contentEditable = true;

			contentElement.style = "width: 100%;";
			text.style =
				"width:100%; outline: none; border-bottom: 2px solid var(--brand-400);";
			text.focus();

			const theme = retrieveStoredData("TooDoo-theme");

			clickedButton.style.color = document.body.classList.contains("dark-mode")
				? "var(--success-600)"
				: "var(--success-500)";
			const button = clickedButton.parentNode;
			button.nextElementSibling.style.visibility = "hidden";

			clickedButton.classList.remove("fa-pencil");
			button.classList.remove("edit-button");

			clickedButton.classList.add("fa-check");
			button.classList.add("check-button");
		}
		handleCheckButtonClick(oldText);
	});
}

/**
 * Handles the click event on check buttons within the list.
 * Finalizes editing of the corresponding list item and updates stored data.
 *
 * @param {string} oldText - The original text before editing.
 */
export function handleCheckButtonClick(oldText) {
	myList.addEventListener("click", (e) => {
		let clickedButton = e.target;

		if (
			clickedButton.classList.contains("check-button") ||
			clickedButton.classList.contains("fa-check")
		) {
			if (clickedButton.classList.contains("check-button")) {
				clickedButton = clickedButton.children[0];
			}
			const listItem = clickedButton.closest(".list-item");
			const contentElement = listItem.children[0];
			const checkbox = contentElement.children[0];
			let text = contentElement.children[1];

			// Edit label
			let newText = text.textContent.trim();
			text.textContent = newText;

			checkbox.disabled = false;
			text.contentEditable = false;

			text.parentNode.style = "width: revert";
			text.style = "width:revert; outline: revert; border-bottom: revert";

			const button = clickedButton.parentNode;
			clickedButton.style.color = "var(--info-500)";

			button.nextElementSibling.style.visibility = "visible";

			clickedButton.classList.remove("fa-check");
			button.classList.remove("check-button");

			clickedButton.classList.add("fa-pencil");
			button.classList.add("edit-button");

			const listData = retrieveStoredData("TooDoo");

			listData.forEach((item) => {
				if (item.content === oldText) {
					item.content = newText;
				}
			});

			updateStoredData("TooDoo", listData);
		}
		handleEditButtonClick();
	});
}

/**
 * Updates the completion status of an item in the stored data.
 *
 * @param {Array} array - The array of stored items.
 * @param {boolean} boolean - The new completion status.
 * @param {HTMLElement} checkbox - The checkbox element associated with the item.
 */
function setCompletionStatus(array, boolean, checkbox) {
	array.forEach((entry) => {
		if (entry.uniqueId === checkbox.closest(".list-item").dataset.itemId) {
			entry.complete = boolean;
		}
	});
}
