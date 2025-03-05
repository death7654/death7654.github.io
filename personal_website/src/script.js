const [red, green, blue] = [255, 179, 186];

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
  const y = (window.scrollY || window.pageYOffset);
  //console.log(y)
  if (y > 2250) {
    project_header.classList.remove("display_none");
    animation.classList.add("typewriter_animation");
  }
});

project_link.addEventListener("click", () => {
  window.scrollTo(0, 2720);
});

link_scroll.addEventListener("click", () => {
  window.scrollTo(0,4800);
} )


function github() {
  link_section.classList.add("github");
  body.classList.add("github");
  projects.classList.remove("project_background");
  projects.classList.add("github");
  link_title.classList.add("white_text");
}
function remove_github() {
  link_section.classList.remove("github");
  body.classList.remove("github");
  projects.classList.remove("github");
  link_title.classList.remove("white_text");
  projects.classList.add("project_background");
}
function instagram() {
  link_section.classList.add("instagram");
  body.classList.add("instagram");
  projects.classList.remove("project_background");
  projects.classList.add("instagram");
}
function remove_instagram() {
  link_section.classList.remove("instagram");
  body.classList.remove("instagram");
  projects.classList.remove("instagram");
  projects.classList.add("project_background");
}
function facebook() {
  link_section.classList.add("facebook");
  body.classList.add("facebook");  
  projects.classList.remove("project_background");
  projects.classList.add("facebook");
}
function remove_facebook() {
  link_section.classList.remove("facebook");
  body.classList.remove("facebook");
  projects.classList.remove("facebook");
  projects.classList.add("project_background");
}
function linkedin() {
  link_section.classList.add("linkedin");
  body.classList.add("linkedin");
  projects.classList.remove("project_background");
  projects.classList.add("linkedin");
}
function remove_linkedin() {
  link_section.classList.remove("linkedin");
  body.classList.remove("linkedin");
  projects.classList.remove("linkedin");
  projects.classList.add("project_background");
}
