import { addClassTo, toggleClassTo } from "../../../main.js";
import {
  addNewContainer,
  addNewsvg,
  navbar,
  viewsMenu,
  warnIfNotFound,
} from "../currently.js";
export const viewsMenuIsOpen = { value: false };
export const blurFullScreen = document.querySelector("#blur");
export const dotsContainer = document.querySelectorAll(".dots-container");
export function blurMenu() {
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
    console.error("Error in blurMenu function:", error);
  }
}
export function openViewsMenu() {
  toggleClassTo(viewsMenu, ["visHidden", "open"]);
  viewsMenuIsOpen.value = true;
}
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
      blurMenu();
    } catch (error) {
      console.error("Error in dotsContainer click event listener:", error);
    }
    console.log(viewsMenuIsOpen);
  });
});
