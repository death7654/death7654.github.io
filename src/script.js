const [red, green, blue] = [255, 255, 255];

const home = document.getElementById("home");
const menu = document.getElementById("menu");
const projects = document.getElementById("projects");
const project_header = document.getElementById("project_header");
const project_link = document.getElementById("projects_scroll");
const animation = document.getElementById("typewriter_animation");
const link_section = document.getElementById("links");
const body = document.getElementById("body");
const link_title = document.getElementById("links_title");
const link_scroll = document.getElementById("link_scroll")

window.addEventListener("scroll", () => {
  const y = (window.scrollY || window.pageYOffset) / 400;
  //console.log(y)

  const y_current = y * 400;

  const [r, g, b] = [red * y, green * y, blue * y].map(Math.round);
  if (y_current < 2000) {
    home.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
    projects.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
    menu.style.backgroundColor = `rgb(${r + 20}, ${g + 20}, ${b + 20})`;
  }

  if (y_current > 330) {
    project_header.classList.remove("display_none");
    animation.classList.add("typewriter_animation");
  }
  console.log(y_current);
});

project_link.addEventListener("click", () => {
  window.scrollTo(0, 945);
});

link_scroll.addEventListener("click", () => {
  window.scrollTo(0,3050);
} )


function github() {
  link_section.classList.add("github");
  body.classList.add("github");
  projects.classList.add("github");
  link_title.classList.add("white_text");
}
function remove_github() {
  link_section.classList.remove("github");
  body.classList.remove("github");
  projects.classList.remove("github");
  link_title.classList.remove("white_text");
}
function instagram() {
  link_section.classList.add("instagram");
  body.classList.add("instagram");
  projects.classList.add("instagram");
}
function remove_instagram() {
  link_section.classList.remove("instagram");
  body.classList.remove("instagram");
  projects.classList.remove("instagram");
}
function facebook() {
  link_section.classList.add("facebook");
  body.classList.add("facebook");
  projects.classList.add("facebook");
}
function remove_facebook() {
  link_section.classList.remove("facebook");
  body.classList.remove("facebook");
  projects.classList.remove("facebook");
}
function linkedin() {
  link_section.classList.add("linkedin");
  body.classList.add("linkedin");
  projects.classList.add("linkedin");
}
function remove_linkedin() {
  link_section.classList.remove("linkedin");
  body.classList.remove("linkedin");
  projects.classList.remove("linkedin");
}
