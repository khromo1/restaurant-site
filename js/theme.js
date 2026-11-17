(() => {
  const root = document.documentElement;
  const storageKey = "claude-monet-theme";

  // Apply saved preference before the page is fully rendered.
  try {
    root.classList.toggle("dark", localStorage.getItem(storageKey) === "dark");
  } catch (error) {
    console.warn("Не удалось прочитать сохранённую тему:", error);
  }

  document.addEventListener("DOMContentLoaded", () => {
    const button = document.getElementById("theme-toggle");
    if (!button) return;

    const updateButton = () => {
      const isDark = root.classList.contains("dark");
      button.setAttribute("aria-pressed", String(isDark));
      button.setAttribute("aria-label", isDark ? "Включить светлую тему" : "Включить тёмную тему");
      button.innerHTML = isDark ? "☀" : "◐";
    };

    updateButton();
    button.addEventListener("click", () => {
      const isDark = root.classList.toggle("dark");
      try { localStorage.setItem(storageKey, isDark ? "dark" : "light"); }
      catch (error) { console.warn("Не удалось сохранить тему:", error); }
      updateButton();
    });
  });
})();
