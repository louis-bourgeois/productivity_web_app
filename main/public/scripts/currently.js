import {
  addClassTo,
  mainMenuIsOpen,
  removeClassTo,
  searchIsActive,
  toggleClassTo,
  toggleMainMenu,
  toggleSearch,
} from "./main.js";
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
function openViewsMenu() {
  toggleClassTo(viewsMenu, ["visHidden", "open"]);
  viewsMenuIsOpen = true;
}
function closeViewsMenu() {
  toggleClassTo(navbar, "ontop");
  toggleClassTo(viewsMenu, "open");
  setTimeout(() => {
    toggleClassTo(viewsMenu, "visHidden");
  }, 600);
  toggleClassTo(blurFullScreen, ["visHidden", "blur-background"]);
  toggleClassTo([addNewContainer, addNewsvg], ["top-right-corner", "ontop"]);
  viewsMenuIsOpen = false;
}
function closeAll() {
  if (viewsMenuIsOpen) {
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

const updateCursor = () => {
  // Récupère tous les éléments enfants de viewsMenu
  const childElements = viewsMenu.querySelectorAll("*");

  // Parcours chaque élément enfant
  childElements.forEach((child) => {
    // Si viewsMenu contient la classe 'open'
    if (viewsMenu.classList.contains("open")) {
      // Si l'élément enfant avait le curseur défini sur 'none', remets-le à 'pointer'
      if (child.style.cursor === "none") {
        child.style.cursor = "pointer";
      }
    } else {
      // Si l'élément enfant avait le curseur défini sur 'pointer', change-le en 'none'
      if (child.style.cursor === "pointer") {
        child.style.cursor = "none";
      }
    }
  });
};

// Appelle updateCursor une première fois pour initialiser
updateCursor();

// Écoute les changements de classe sur viewsMenu
const observer = new MutationObserver(updateCursor);

observer.observe(viewsMenu, {
  attributes: true, // écoute les changements d'attributs
  attributeFilter: ["class"], // écoute seulement les changements de l'attribut 'class'
});
function blurMenu() {
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

document.addEventListener("DOMContentLoaded", function () {
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
const warnIfNotFound = (element, msg) => {
  if (!element) {
    console.warn(msg);
    return true;
  }
  return false;
};

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

addNewContainer.addEventListener("click", function () {
  if (viewsMenuIsOpen) {
    closeViewsMenu();
  }
});

blurFullScreen.addEventListener("click", closeAll);

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
      submitDotsMenuChoices();
    } catch (error) {
      console.error("Error in option click event listener:", error);
    }
  });
});
