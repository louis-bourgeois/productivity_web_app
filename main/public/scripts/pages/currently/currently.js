import {
  toggleClassTo,
  toggleMainMenu,
  toggleSearch,
} from "../../main_functions.js";
import { mainMenuIsOpen, searchIsActive, warnIfNotFound, blurFullScreen } from "../../main_variables.js";
import { closeViewsMenu } from "./viewsMenu/viewsMenu_fonctions.js";
import { viewsMenuIsOpen } from "./viewsMenu/viewsMenu_variables.js";

export const [
  prph,
  menu,
  addNewContainer,
  addNewsvg,
  navbar,
  cardsContainer,
] = [
  "prph",
  "menu",
  "add-container",
  "add-new",
  "navbar",
  "cards-container",
].map((id) => document.getElementById(id));

const clocks = [...document.querySelectorAll("p.clock")];



function closeAll() {
  if (viewsMenuIsOpen.value) {
    closeViewsMenu();
  }
  if (mainMenuIsOpen.value) {
    toggleMainMenu();
  }
  if (searchIsActive.value) {
    toggleSearch();
  }
}

function updateClock() {
  try {
    const time = new Date().toLocaleTimeString().slice(0, -6);
    if (!clocks.length) {
      console.warn("Clock elements not found.");
      return;
    }
    clocks.forEach((element) => (element.innerText = time));
  } catch (error) {
    console.error("Error updating clock:", error);
  }
}
document.addEventListener("DOMContentLoaded", function () {
  updateClock();
  setInterval(updateClock, 1000);
  new Swiper(".swiper-container", { slidesPerView: "auto", spaceBetween: 1 });
  toggleClassTo(document.body);
});
if (cardsContainer) {
  cardsContainer.addEventListener("mousedown", (event) => {
    if (event.button === 1) {
      event.preventDefault();
    }
  });
} else {
  warnIfNotFound(
    cardsContainer,
    "Element with ID 'cards-container' not found."
  );
}

addNewContainer.addEventListener("click", function () {
  if (viewsMenuIsOpen.value) {
    closeViewsMenu();
  }
});

blurFullScreen.addEventListener("click", closeAll);
