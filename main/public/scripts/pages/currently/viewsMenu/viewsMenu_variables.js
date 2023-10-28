export const [optionsArray, option, dropDownArrows, dotsContainer] = [
  ".options",
  ".option",
  ".dropdown.arrow",
  ".dots-container",
].map((selector) => document.querySelectorAll(selector));

export const viewsMenu = document.getElementById("menu-views");
export const viewsMenuIsOpen = { value: false };

export let isClickable = true; // Variable globale pour le contrôle du click
