import {
  addClassTo,
  mainMenuIsOpen,
  removeClassTo,
  searchIsActive,
  sendToServer,
  toggleClassTo,
  toggleClassesOnElements,
  toggleMainMenu,
  toggleSearch,
} from "../../main.js";
import {
  blurFullScreen,
  dotsContainer,
  viewsMenuIsOpen,
} from "./viewsMenu/viewsMenu_fonctions.js";
export const [prph, menu, viewsMenu, addNewContainer, addNewsvg, navbar] = [
  "prph",
  "menu",
  "menu-views",
  "add-container",
  "add-new",
  "navbar",
].map((id) => document.getElementById(id));

const clocks = [...document.querySelectorAll("p.clock")];
const optionsArray = document.querySelectorAll(".options");
const option = document.querySelectorAll(".option");
const dropDownArrows = document.querySelectorAll(".dropdown.arrow");

export const warnIfNotFound = (element, msg) => {
  if (!element) {
    console.warn(msg);
    return true;
  }
  return false;
};

// Check if essential elements are found
if (!prph || !menu || !viewsMenu || !dotsContainer || !blurFullScreen) {
  console.error(
    "Essential DOM elements not found. Please check their IDs or classes."
  );
}

function closeViewsMenu() {
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

function toggleDropDownMenu(options, arrow) {
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
function displayMenuViewsSelection(selected) {
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

addNewContainer.addEventListener("click", function () {
  if (viewsMenuIsOpen.value) {
    closeViewsMenu();
  }
});

blurFullScreen.addEventListener("click", closeAll);

dropDownArrows.forEach((dropdownSelf, index) => {
  dropdownSelf.addEventListener("click", () => {
    toggleDropDownMenu(optionsArray[index], dropdownSelf);
  });
});

let isClickable = true; // Variable globale pour le contrôle du click

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
