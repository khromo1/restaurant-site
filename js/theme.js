
(() => {
  const root = document.documentElement;
  const saved = localStorage.getItem("claude-monet-theme");
  if (saved === "dark" || saved === "light") root.classList.toggle("dark", saved === "dark");
  function syncButton() {
    const button = document.getElementById("theme-toggle");
    if (!button) return;
    const dark = root.classList.contains("dark");
    button.setAttribute("aria-pressed", String(dark));
    button.setAttribute("aria-label", dark ? "Включить светлую тему" : "Включить тёмную тему");
    button.textContent = dark ? "☀" : "◐";
  }
  document.addEventListener("DOMContentLoaded", () => {
    syncButton();
    document.getElementById("theme-toggle")?.addEventListener("click", () => {
      root.classList.toggle("dark");
      localStorage.setItem("claude-monet-theme", root.classList.contains("dark") ? "dark" : "light");
      syncButton();
    });
  });
})();
