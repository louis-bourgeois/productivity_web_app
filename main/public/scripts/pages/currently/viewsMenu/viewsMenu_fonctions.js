import {
  addClassTo,
  removeClassTo,
  sendToServer,
  toggleClassTo,
  toggleClassesOnElements,
} from "../../../main_functions.js";
import {
  blurFullScreen,
  mainMenuIsOpen,
  searchIsActive,
} from "../../../main_variables.js";
import { addNewContainer, addNewsvg, navbar } from "../currently.js"; // régler pb console  + séparer fichiers

import {
  optionsArray,
  viewsMenu,
  viewsMenuIsOpen,
} from "./viewsMenu_variables.js";

export function openViewsMenu() {
  toggleClassTo(viewsMenu, ["visHidden", "open"]);
  viewsMenuIsOpen.value = true;
}

export function closeViewsMenu() {
  toggleClassesOnElements([navbar, viewsMenu], ["ontop", "open"]);
  setTimeout(() => {
    toggleClassTo(viewsMenu, "visHidden");
  }, 600);

  if (!searchIsActive.value && !mainMenuIsOpen.value) {
    toggleClassTo(blurFullScreen, "visHidden");
  }

  optionsArray.forEach((options) => {
    let arrow = options.previousElementSibling;
    removeClassTo(arrow.querySelector("svg"), "returned");
    addClassTo(options, ["", "visHidden"]);
  });

  // Remet les éléments addNewContainer et addNewsvg dans leur état initial
  toggleClassTo(blurFullScreen, "blur-background");
  removeClassTo([addNewContainer, addNewsvg], ["top-right-corner", "ontop"]);
  viewsMenuIsOpen.value = false;
}

export function toggleDropDownMenu(options, arrow) {
  try {
    if (arrow.classList.contains("returned")) {
      toggleClassTo(arrow, "returned");
      toggleClassTo(options);
      setTimeout(() => toggleClassTo(options, "visHidden"), 500);
      return;
    }
    toggleClassTo(options, "visHidden");
    toggleClassTo(options);
    toggleClassTo(arrow, "returned");
  } catch (error) {
    console.error(`Error in function: toggleDropDownMenu : ${error}`);
  }
  return;
}

export function displayMenuViewsSelection(selected) {
  console.log("displayMenu start");

  const chosenOptionText = selected.innerText;
  console.log("chosen option good");

  // Always check if elements exist to avoid null errors

  const parentOptions = selected.parentElement;
  if (!parentOptions) return;
  console.log("parentOption good");

  const grandParent = parentOptions.parentElement;
  if (!grandParent) return;
  console.log("grandparentOption good " + grandParent.innerHTML);

  const targetSpan = grandParent.querySelector("span");
  if (!targetSpan) return;
  targetSpan.innerText = chosenOptionText;
  console.log("target Span good");

  const parent = selected.closest(".viewsRow.flex");
  const h4Element = parent.querySelector("h4");
  console.log(h4Element);
  if (!h4Element) return;
  console.log("h4 good " + h4Element.innerText);

  sendToServer(
    JSON.stringify({ [h4Element.innerText]: chosenOptionText }),
    "/currently/setViewsOptions"
  );
}

export function blurViewsMenuBG() {
  try {
    if (!viewsMenu || !blurFullScreen) {
      console.warn("ViewsMenu or blurFullScreen elements not found.");
      return;
    }
    toggleClassTo(blurFullScreen, "visHidden");
    viewsMenu.classList.contains("open")
      ? addClassTo(blurFullScreen, "blur-background")
      : removeClassTo(blurFullScreen, "blur-background");
  } catch (error) {
    console.error("Error in blurViewsMenuBG function:", error);
  }
}
