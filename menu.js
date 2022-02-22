const btn = document.querySelector("button");
const ul = document.querySelector("nav");
const forside = document.createElement("a");

function toggleMenu() {
  ul.classList.toggle("shown");

  const menu = ul.classList.contains("shown");

  if (menu) {
    ul.classList.remove("nav-bar");
    btn.classList.add("open");
    // nop.remove();
  } else {
    btn.classList.remove("open");
    ul.classList.add("nav-bar");
  }
}

btn.addEventListener("click", toggleMenu);
