/* The page's accent color lives in the --accent CSS variable.
   `theme` is the colour picked in the terminal; hover temporarily overrides it
   and falls back to the theme (or the stylesheet default) afterwards. */

const root = document.documentElement;
let theme = "";

export const THEMES = {
  github: "#e6edf3",
  linkedin: "#4da3d9",
  instagram: "#e1306c",
  pink: "#ffb3ba",
  mint: "#baffc9",
};

export function setTheme(color) {
  theme = color || "";
  if (theme) root.style.setProperty("--accent", theme);
  else root.style.removeProperty("--accent");
}

export function hoverAccent(color) {
  root.style.setProperty("--accent", color);
}

export function unhoverAccent() {
  if (theme) root.style.setProperty("--accent", theme);
  else root.style.removeProperty("--accent");
}
