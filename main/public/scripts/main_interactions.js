import {
  addClassTo,
  defineArrowSize,
  removeClassTo,
  sendToServer,
  toggleClassTo,
  toggleMainMenu,
  toggleSearch,
} from "./main_functions.js";
import {
  mMenuRows,
  mainMenuIsOpen,
  prph,
  searchIconContainer,
  searchIsActive,
} from "./main_variables.js";

prph.addEventListener("click", function () {
  toggleMainMenu();
});

document.addEventListener("DOMContentLoaded", function () {});
// Sélectionne tous les éléments dans le document
document.querySelectorAll("*").forEach((element) => {
  toggleClassTo(element, "dark-mode");
});

// Ajoute des écouteurs d'événements à chaque élément .mMenuRow
mMenuRows.forEach((mMenuRow) => {
  mMenuRow.addEventListener("mousedown", function () {
    const childElements = this.querySelectorAll(":scope > *:not(div)");
    childElements.forEach((child) => {
      addClassTo(child, "blue");
    });
  });

  mMenuRow.addEventListener("mouseup", function () {
    const childElements = this.querySelectorAll(":scope > *:not(div)");
    childElements.forEach((child) => {
      removeClassTo(child, "blue");
    });
  });

  // Pour gérer le cas où la souris sort de l'élément tout en étant enfoncée
  mMenuRow.addEventListener("mouseleave", function () {
    const childElements = this.querySelectorAll(":scope > *:not(div)");
    childElements.forEach((child) => {
      removeClassTo(child, "blue");
    });
  });
});
searchIconContainer.addEventListener("click", () => {
  toggleSearch();
  setTimeout(() => {
    document.querySelector(".inputLine > input").focus();
  }, 20);
});
let timeoutId;
document.getElementById("searchField").addEventListener("input", function (e) {
  clearTimeout(timeoutId); // Efface le timeout précédent

  timeoutId = setTimeout(() => {
    // Définit un nouveau timeout
    const data = e.target.value;
    sendToServer(JSON.stringify({ data }), "/currently/searchInput");
  }, 200);
});

document.addEventListener("keydown", function (e) {
  if ((e.ctrlKey && e.key === "k") | (e.key === "/")) {
    e.preventDefault();
    toggleSearch();
    setTimeout(() => {
      document.querySelector(".inputLine > input").focus();
    }, 20);
  }
  if (e.key === "Escape") {
    if (mainMenuIsOpen.value) {
      toggleMainMenu();
    }
    if (searchIsActive.value) {
      toggleSearch();
    }
  }
  if (e.altKey) {
    e.preventDefault();
  }
});

setInterval(defineArrowSize, 1000);
