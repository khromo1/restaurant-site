const themeButton = document.getElementById("theme-toggle");
const root = document.documentElement;

if (localStorage.getItem("theme") === "dark") {
  root.classList.add("dark");
}

themeButton.addEventListener("click", function () {
  root.classList.toggle("dark");

  if (root.classList.contains("dark")) {
    localStorage.setItem("theme", "dark");
  } else {
    localStorage.setItem("theme", "light");
  }
});