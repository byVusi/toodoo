import { handleFormButtonClick } from "./modules/formButtonClick.js";
import {
	handleCheckboxClick,
	handleDeleteButtonClick,
	handleEditButtonClick,
} from "./modules/listItemControls.js";
import { renderListItem } from "./modules/render.js";
import { toggleDarkMode } from "./modules/toggleDarkMode.js";

toggleDarkMode();
handleFormButtonClick();
renderListItem();
handleCheckboxClick();
handleDeleteButtonClick();
handleEditButtonClick();
