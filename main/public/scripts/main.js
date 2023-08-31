const mainMenu = document.getElementById("menu");
const prph = document.getElementById("prph");
const mMenufName = document.getElementById("mMenufName");

function manipulateClass(method, element, property = "hidden") {
  const elements = Array.isArray(element) ? element : [element];
  const properties = Array.isArray(property) ? property : [property];
  elements.forEach((el) =>
    properties.forEach((prop) =>
      el.classList[method](prop.length > 0 ? prop : "hidden")
    )
  );
}

prph.addEventListener("click", function () {
  toggleClassTo(mainMenu, ["", "open"]);
  toggleClassTo(mMenufName);
  toggleClassTo(prph, "scaleDown");
});

document.addEventListener("DOMContentLoaded", function () {});
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
