const mainMenu = document.getElementById("menu");
const prph = document.getElementById("prph");
const prphContainer = document.querySelector("#prph-container");
const searchIcon = document.getElementById("search");
const bgMainMenu = document.getElementById("fs1");
export const mainMenuIsOpen = { value: false };
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
    toggleClassTo(bgMainMenu, "visHidden");
    toggleClassTo(mainMenu, ["visHidden"]);
    setTimeout(() => {
      toggleClassTo(mainMenu, ["", "open"]);
    }, 0); // Change "0" to 0

    toggleClassTo([prphContainer, prph], "scaleDown");
    mainMenuIsOpen.value = true;
    return;
  }
  toggleClassTo(bgMainMenu, "visHidden");
  toggleClassTo([document.querySelector("#prph-container"), prph], "scaleDown");
  toggleClassTo(mainMenu, "open");
  toggleClassTo(mainMenu, [""]);
  setTimeout(() => {
    toggleClassTo(mainMenu, ["visHidden"]);
  }, 600);

  mainMenuIsOpen.value = false;
}
bgMainMenu.addEventListener("click", toggleMainMenu);
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
const mMenuRows = document.querySelectorAll(".mMenuRow");
prph.addEventListener("click", function () {
  toggleMainMenu();
});

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

setInterval(defineArrowSize, 1000);
