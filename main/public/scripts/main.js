function manipulateClass(method, element, property = "hidden") {
  const elements = Array.isArray(element) ? element : [element];
  const properties = Array.isArray(property) ? property : [property];
  elements.forEach((el) =>
    properties.forEach((prop) => el.classList[method](prop))
  );
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

const vh = window.innerHeight * 0.01; // Move outside the function
setInterval(defineArrowSize, 1000);
