import { toggleClassTo } from "../../../main_functions.js";
import { warnIfNotFound } from "../../../main_variables.js";
import { addNewContainer, addNewsvg } from "../currently.js";
import {
  blurViewsMenuBG,
  displayMenuViewsSelection,
  openViewsMenu,
  toggleDropDownMenu,
} from "./viewsMenu_fonctions.js";
import {
  dotsContainer,
  dropDownArrows,
  option,
  optionsArray,
  viewsMenuIsOpen,
} from "./viewsMenu_variables.js";

dotsContainer.forEach((dotsContainerThis) => {
  dotsContainerThis.addEventListener("click", () => {
    try {
      if (
        warnIfNotFound(
          navbar,
          "Element with ID 'search-bar-container' not found."
        )
      )
        return;

      toggleClassTo(navbar, "ontop");
      openViewsMenu();

      if (
        warnIfNotFound(addNewContainer, "Element with ID 'add-new' not found.")
      )
        return;

      toggleClassTo(
        [addNewContainer, addNewsvg],
        ["top-right-corner", "ontop"]
      );
      blurViewsMenuBG();
    } catch (error) {
      console.error("Error in dotsContainer click event listener:", error);
    }
    console.log(viewsMenuIsOpen);
  });
});
dropDownArrows.forEach((dropdownSelf, index) => {
  dropdownSelf.addEventListener("click", () => {
    toggleDropDownMenu(optionsArray[index], dropdownSelf);
  });
});
let isClickable = true;
option.forEach((option_this) => {
  option_this.addEventListener("click", () => {
    if (!isClickable) return;

    isClickable = false; // Désactive le clic

    const arrow =
      option_this.parentElement.previousElementSibling.querySelector("svg");
    const optionsArray = option_this.parentElement;
    toggleDropDownMenu(optionsArray, arrow);
    console.log("eeeee" + option_this);
    displayMenuViewsSelection(option_this);

    setTimeout(() => {
      isClickable = true; // Réactive le clic après 1 seconde
    }, 1000);
  });
});
