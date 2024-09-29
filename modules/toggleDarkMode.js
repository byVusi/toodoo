import { retrieveStoredData, updateStoredData } from "./storage.js";

const slider = document.querySelector(".toggle");
const myBody = document.body;

let theme = retrieveStoredData("TooDoo-theme");

// Setup theme
if (theme) {
	slider.classList.add("fa-toggle-off");
	slider.nextElementSibling.style.opacity = "0.3";
	myBody.className = "dark-mode";
} else {
	slider.classList.add("fa-toggle-on");
	slider.previousElementSibling.style.opacity = "0.3";
	myBody.classList.remove("dark-mode");
}

/**
 * Toggles between dark mode and light mode when the slider is clicked.
 * Updates the theme in local storage and modifies the UI accordingly.
 *
 * @returns {void}
 */
export function toggleDarkMode() {
	if (!slider) {
		console.warn("Toggle element not present");
		return;
	}
	slider.addEventListener("click", () => {
		if (slider.classList.contains("fa-toggle-off")) {
			slider.classList.remove("fa-toggle-off");
			slider.classList.add("fa-toggle-on");
			slider.previousElementSibling.style = "opacity: 0.3;";
			slider.nextElementSibling.style = "opacity:1;";
			myBody.classList.remove("dark-mode");
			theme = false;
			updateStoredData("TooDoo-theme", theme);
		} else {
			slider.classList.remove("fa-toggle-on");
			slider.classList.add("fa-toggle-off");
			slider.previousElementSibling.style = "revert";
			slider.nextElementSibling.style = "opacity:0.3;";
			myBody.className = "dark-mode";
			theme = true;
			updateStoredData("TooDoo-theme", theme);
		}
	});
}
