import { ListItem } from "./ListItem.js";
import { listElement, buildListItem } from "./render.js";
import { updateStoredData, retrieveStoredData } from "./storage.js";

const formButton = document.querySelector("form button");
const formInput = document.querySelector("form input");

/**
 * The list of items, initialised from stored items in local storage.
 * @type {ListItem[]}
 */
const myList = retrieveStoredData("TooDoo");

/**
 * Handles the click event for the form button to add a new list item.
 *
 * This function adds an event listener to the form button. When clicked, it
 * prevents the default form submission, validates the input, creates a new
 * ListItem, updates the list, and saves it to local storage.
 *
 * @returns {void}
 */
export function handleFormButtonClick() {
	formButton.addEventListener("click", (e) => {
		e.preventDefault();
		let userInput = formInput.value.trim();

		if (userInput === "") {
			displayFeedback("Oops! Please enter a valid, non-empty string.");
			formInput.value = "";
			return;
		}

		const item = new ListItem(userInput);
		myList.push(item);

		listElement.appendChild(buildListItem(item, myList.length));

		// Send to localStorage
		updateStoredData("TooDoo", myList);

		// Clear input field
		formInput.value = "";
	});
}

/**
 * Displays a feedback message to the user.
 *
 * This function creates a new feedback message element, adds it to the
 * document, and triggers a CSS animation to fade it in and out. The message
 * is displayed for 3 seconds before fading out.
 *
 * @param {string} message - The feedback message to be displayed.
 * @returns {void} - This function does not return a value.
 */
function displayFeedback(message) {
	const feedbackElement = document.createElement("div");
	feedbackElement.className = "feedback-message";
	feedbackElement.textContent = message;

	document.body.insertBefore(feedbackElement, document.querySelector("nav"));

	// Trigger a reflow to apply the initial styles
	void feedbackElement.offsetWidth;

	// Add the 'show' class to trigger the animation
	feedbackElement.classList.add("show");

	setTimeout(() => {
		feedbackElement.classList.remove("show");
		// Remove the element from the DOM after the fade-out animation
		setTimeout(() => feedbackElement.remove(), 300);
	}, 3000);
}
