export const [
  mainMenu,
  prph,
  prphContainer,
  searchIcon,
  searchIconContainer,
  searchMenuContainer,
  blurFullScreen,
] = [
  "menu",
  "prph",
  "prph-container",
  "search",
  "search-bar-container",
  "searchMenuContainer",
  "blur",
].map((id) => document.getElementById(id));
export const mainMenuIsOpen = { value: false };
export const searchIsActive = { value: false };
export const warnIfNotFound = (element, msg) => {
  if (!element) {
    console.warn(msg);
    return true;
  }
  return false;
};
export const mMenuRows = document.querySelectorAll(".mMenuRow");
