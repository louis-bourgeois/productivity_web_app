import {
  blurFullScreen,
  mainMenu,
  mainMenuIsOpen,
  prph,
  prphContainer,
  searchIsActive,
} from "./main_variables.js";
import { viewsMenuIsOpen } from "./pages/currently/viewsMenu/viewsMenu_variables.js";

function manipulateClass(method, element, property = "hidden") {
  const elements = Array.isArray(element) ? element : [element];
  const properties = Array.isArray(property) ? property : [property];
  console.log(elements, properties);
  elements.forEach((el) =>
    properties.forEach((prop) =>
      el.classList[method](prop.length > 0 ? prop : "hidden")
    )
  );
}
export function toggleMainMenu() {
  // Assume mainMenuIsOpen, mainMenu, and prph are defined elsewhere
  const shouldToggleBlur = !viewsMenuIsOpen.value && !searchIsActive.value;
  if (!mainMenuIsOpen.value) {
    if (shouldToggleBlur) {
      toggleClassTo(blurFullScreen, "visHidden");
    }
    toggleClassTo(mainMenu, ["visHidden"]);
    setTimeout(() => {
      toggleClassTo(mainMenu, ["", "open"]);
    }, 0); // Change "0" to 0
    toggleClassTo([prphContainer, prph], "scaleDown");
  } else {
    if (shouldToggleBlur) {
      addClassTo(blurFullScreen, "visHidden");
    }
    toggleClassTo(
      [document.querySelector("#prph-container"), prph],
      "scaleDown"
    );
    toggleClassTo(mainMenu, "open");
    toggleClassTo(mainMenu, [""]);
    setTimeout(() => {
      toggleClassTo(mainMenu, ["visHidden"]);
    }, 600);
  }
  mainMenuIsOpen.value ^= 1;
  return;
}

export async function sendToServer(data, url) {
  console.log("Sending data: ", data);
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: data, // Ici, on utilise directement la donnée stringifiée
    });

    if (response.ok) {
      const responseData = await response.text();
      console.log("Data sent successfully. Received data:", responseData);
    } else {
      console.log("Network response was not ok.");
    }
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
  }
}
/**
 * Toggles the search menu's visibility and also manages the blurring of other parts of the UI.
 * The blurring depends on whether other menus are open to avoid conflicts.
 */
export function toggleSearch() {
  // Determine whether to toggle blur based on the open status of the others menu that could be in conflict
  const shouldToggleBlur = !mainMenuIsOpen.value && !viewsMenuIsOpen.value;

  if (!searchIsActive.value) {
    // Show the search menu
    toggleClassTo(searchMenuContainer, ["visHidden", ""]);

    // Apply blur if no other conflicting menus are open
    if (shouldToggleBlur) {
      toggleClassTo(blurFullScreen, "visHidden");
    }
  } else {
    // Case when the search is already active

    // Reset the input
    // Remove blur if no other conflicting menus are open
    if (shouldToggleBlur) {
      addClassTo(blurFullScreen, "visHidden");
    }

    // Hide the search menu
    toggleClassTo(searchMenuContainer, "");

    // Delay search menu hiding with search menu transition time to avoid conflicts.
    setTimeout(() => {
      toggleClassTo(searchMenuContainer, "visHidden");
      document.getElementById("searchField").value = "";
    }, 700);
  }

  // Invert the current active state of the search
  // I use the 'XOR' operator because it's more efficient than the '!' operator
  searchIsActive.value ^= 1;
  return;
}

// Allows the use of the manipulateClass function I've created (here to toggle classes), to avoid repetition.
export function toggleClassTo(element, property) {
  manipulateClass("toggle", element, property);
}

// Allows the use of the manipulateClass function I've created (here to remove classes), to avoid repetition.
export function removeClassTo(element, property) {
  manipulateClass("remove", element, property);
}

// Allows the use of the manipulateClass function I've created (here to asdd classes), to avoid repetition.
export function addClassTo(element, property) {
  manipulateClass("add", element, property);
}

/**
 * Toggles classes on multiple elements, each with its own specific class.
 * This function acts similarly to toggleClassTo, but allows for associating each element
 * in the 'elements' array with a corresponding class from the 'classes' array.
 */
export function toggleClassesOnElements(elements, classes) {
  elements.forEach((el, i) => toggleClassTo(el, classes[i]));
}

export function defineArrowSize() {
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
