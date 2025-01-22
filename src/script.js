const [red, green, blue] = [255, 255, 255];

const home = document.getElementById('home');
const menu = document.getElementById('menu');
const projects = document.getElementById("projects");
const project_header = document.getElementById("project_header");
const animation = document.getElementById("typewriter_animation");


window.addEventListener('scroll', () => {
  const y = (window.scrollY || window.pageYOffset) / 400
  //console.log(y)
  const [r, g, b] = [red*y, green*y, blue*y].map(Math.round)
  home.style.backgroundColor = `rgb(${r}, ${g}, ${b})`
  projects.style.backgroundColor = `rgb(${r}, ${g}, ${b})`
  menu.style.backgroundColor = `rgb(${r + 20}, ${g + 20}, ${b + 20})`

  const y_current = y * 400
  if(y_current > 330)
  {
    project_header.classList.remove("display_none");
    animation.classList.add("typewriter_animation");
  }
  console.log(y_current)
})

