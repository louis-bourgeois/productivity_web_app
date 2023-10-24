const mainMenu = document.getElementById("menu");
const prph = document.getElementById("prph");
const prphContainer = document.querySelector("#prph-container");
const searchIcon = document.getElementById("search");
const searchIconContainer = document.getElementById("search-bar-container");
const searchMenuContainer = document.getElementById("searchMenuContainer");
const bgMainMenu = document.getElementById("fs1");
const blurFullScreen = document.querySelector("#blur");
export const mainMenuIsOpen = { value: false };
export const searchIsActive = { value: false };
function manipulateClass(method, element, property = "hidden") {
  const elements = Array.isArray(element) ? element : [element];
  const properties = Array.isArray(property) ? property : [property];
  elements.forEach((el) =>
    properties.forEach((prop) =>
      el.classList[method](prop.length > 0 ? prop : "hidden")
    )
  );
}

export function toggleMainMenu() {
  // Assume mainMenuIsOpen, mainMenu, and prph are defined elsewhere
  if (!mainMenuIsOpen.value) {
    if (
      !blurFullScreen.classList.contains("blur-background") &&
      !searchIsActive
    ) {
      toggleClassTo(blurFullScreen, "visHidden");
    }
    toggleClassTo(mainMenu, ["visHidden"]);
    setTimeout(() => {
      toggleClassTo(mainMenu, ["", "open"]);
    }, 0); // Change "0" to 0

    toggleClassTo([prphContainer, prph], "scaleDown");
    mainMenuIsOpen.value ^= 1;
    return;
  }
  if (!searchIsActive) {
    addClassTo(blurFullScreen, "visHidden");
  }
  toggleClassTo([document.querySelector("#prph-container"), prph], "scaleDown");
  toggleClassTo(mainMenu, "open");
  toggleClassTo(mainMenu, [""]);
  setTimeout(() => {
    toggleClassTo(mainMenu, ["visHidden"]);
  }, 600);
  mainMenuIsOpen.value ^= 1;
}
export function toggleSearch() {
  if (!searchIsActive.value) {
    toggleClassTo(searchMenuContainer, ["visHidden", ""]);
    if (!blurFullScreen.classList.contains("blur-background")) {
      toggleClassTo(blurFullScreen, "visHidden");
    }
    searchIsActive.value ^= 1; // ici j'inverse la value de searchIsActive avec un opérateur XOR, ça équivaut à faire: !
    return;
  }
  if (!blurFullScreen.classList.contains("blur-background")) {
    addClassTo(blurFullScreen, "visHidden");
  }
  toggleClassTo(searchMenuContainer, "");
  setTimeout(() => {
    toggleClassTo(searchMenuContainer, "visHidden");
  }, 700);

  searchIsActive.value ^= 1;
}

export function toggleClassTo(element, property) {
  manipulateClass("toggle", element, property);
}

export function removeClassTo(element, property) {
  manipulateClass("remove", element, property);
}

export function addClassTo(element, property) {
  manipulateClass("add", element, property);
}

function defineArrowSize() {
  const vh = window.innerHeight * 0.01;
  const arrows = document.querySelectorAll(".arrow");
  arrows.forEach((arrow) => arrow.setAttribute("height", vh * 5 + "px"));
}
export function getBorderRadiusOf(element) {
  const elements = Array.isArray(element) ? element : [element];
  let output = [];

  elements.forEach((el) => {
    const result = window
      .getComputedStyle(el)
      .getPropertyValue("border-radius");
    output.push(result);
  });

  return output;
}
export function changeStyleOf(element, styleName, value) {
  const elements = Array.isArray(element) ? element : [element];
  const styleNames = Array.isArray(styleName) ? styleName : [styleName];
  const values = Array.isArray(value) ? value : [value];

  elements.forEach((el) => {
    styleNames.forEach((prop, styleIndex) => {
      el.style[prop] = values[styleIndex] || values[0];
    });
  });
}
export function toggleSearchBar() {}
const mMenuRows = document.querySelectorAll(".mMenuRow");
prph.addEventListener("click", function () {
  toggleMainMenu();
});
searchIcon.addEventListener("click", toggleSearchBar);

document.addEventListener("DOMContentLoaded", function () {});
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
searchIconContainer.addEventListener("click", toggleSearch);

document.addEventListener("keydown", function (e) {
  if ((e.ctrlKey && e.key === "k") | (e.key === "/")) {
    e.preventDefault();
    toggleSearch();
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
