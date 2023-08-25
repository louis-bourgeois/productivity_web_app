import { addClassTo, removeClassTo, toggleClassTo } from "./main.js";

const [prph, menu, viewsMenu, addNewContainer, addNewsvg, navbar] = [
  "prph",
  "menu",
  "menu-views",
  "add-container",
  "add-new",
  "navbar",
].map((id) => document.getElementById(id));
const dotsContainer = document.querySelectorAll(".dots-container");
const clocks = [...document.querySelectorAll("p.clock")];
const prphRect = prph.getBoundingClientRect();
const optionsArray = document.querySelectorAll(".options");
const option = document.querySelectorAll(".option");
const dropDownArrows = document.querySelectorAll(".dropdown.arrow");
const blurFullScreen = document.querySelector("#blur");
let viewsMenuIsOpen = false;

// Check if essential elements are found
if (!prph || !menu || !viewsMenu || !dotsContainer || !blurFullScreen) {
  console.error(
    "Essential DOM elements not found. Please check their IDs or classes."
  );
}

Object.assign(menu.style, {
  top: `${prphRect.top}px`,
  left: `${prphRect.left}px`,
});

removeClassTo(menu, "open");

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

function blurMenu() {
  try {
    if (!viewsMenu || !blurFullScreen) {
      console.warn("ViewsMenu or blurFullScreen elements not found.");
      return;
    }
    viewsMenu.classList.contains("open")
      ? addClassTo(blurFullScreen, "blur-background")
      : removeClassTo(blurFullScreen, "blur-background");
  } catch (error) {
    console.error("Error in blurMenu function:", error);
  }
}
function add() {
  console.log("add appelée");
}
document.addEventListener("DOMContentLoaded", function () {
  removeClassTo(viewsMenu);
  updateClock();
  setInterval(updateClock, 1000);
  prph.addEventListener("click", () => toggleClassTo(menu.classList, "open"));
  new Swiper(".swiper-container", { slidesPerView: "auto", spaceBetween: 1 });
  toggleClassTo(document.body);
});

const cardsContainer = document.getElementById("cards-container");
if (cardsContainer) {
  cardsContainer.addEventListener("mousedown", (event) => {
    if (event.button === 1) {
      event.preventDefault();
    }
  });
} else {
  console.warn("Element with ID 'cards-container' not found.");
}
dotsContainer.forEach(function (dotsContainerThis) {
  dotsContainerThis.addEventListener("click", function () {
    try {
      if (!navbar) {
        console.warn("Element with ID 'search-bar-container' not found.");
        return;
      } else {
        toggleClassTo(navbar, "ontop");
      }
      toggleClassTo(viewsMenu, "open");
      viewsMenuIsOpen = true;
      if (!addNewContainer) {
        console.warn("Element with ID 'add-new' not found.");
        return;
      }
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

addNewContainer.addEventListener("click", function () {
  if (viewsMenuIsOpen) {
    toggleClassTo(navbar, "ontop");
    toggleClassTo(viewsMenu, "open");
    viewsMenuIsOpen = false;
    toggleClassTo(blurFullScreen, "blur-background");
    toggleClassTo([addNewContainer, addNewsvg], ["top-right-corner", "ontop"]);
  } else {
    add();
  }
});

dropDownArrows.forEach((dropdownSelf, index) => {
  dropdownSelf.addEventListener("click", () => {
    try {
      if (!optionsArray[index]) {
        console.warn(
          `No corresponding options element found for dropdown at index ${index}`
        );
        return;
      }
      toggleClassTo(optionsArray[index]);
      toggleClassTo(dropdownSelf, "returned");
    } catch (error) {
      console.error(
        `Error in dropdown click event listener at index ${index}:`,
        error
      );
    }
  });
});

option.forEach((option_this) => {
  option_this.addEventListener("click", () => {
    try {
      toggleClassTo(option_this.parentElement);
    } catch (error) {
      console.error("Error in option click event listener:", error);
    }
  });
});
