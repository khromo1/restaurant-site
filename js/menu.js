document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("menu-search");
  const categories = [...document.querySelectorAll(".menu-category")];
  const noResults = document.getElementById("no-results");
  const suggestions = document.getElementById("suggestions");

  // Search/filter menu items without hiding the gallery or unrelated content.
  if (input) {
    const items = [...document.querySelectorAll(".menu-item, .menu-category li")];
    const names = items.map(item => item.querySelector("span")?.textContent.trim() || item.textContent.trim());

    function filterMenu(query) {
      let visibleCount = 0;
      items.forEach(item => {
        const match = item.textContent.toLocaleLowerCase("ru").includes(query);
        item.classList.toggle("menu-hidden", !match);
        if (match) visibleCount++;
      });
      categories.forEach(category => {
        const hasVisibleItem = [...category.querySelectorAll(".menu-item, li")]
          .some(item => !item.classList.contains("menu-hidden"));
        category.classList.toggle("menu-hidden", !hasVisibleItem);
      });
      if (noResults) noResults.style.display = query && visibleCount === 0 ? "block" : "none";
      localStorage.setItem("claudeMonetMenuSearch", query);
    }

    input.addEventListener("input", () => {
      const query = input.value.trim().toLocaleLowerCase("ru");
      filterMenu(query);
      if (!suggestions) return;
      suggestions.replaceChildren();
      if (!query) {
        suggestions.style.display = "none";
        return;
      }
      const matches = [...new Set(names)]
        .filter(name => name.toLocaleLowerCase("ru").includes(query))
        .slice(0, 5);
      matches.forEach(name => {
        const option = document.createElement("li");
        option.textContent = name;
        option.tabIndex = 0;
        option.addEventListener("click", () => {
          input.value = name;
          filterMenu(name.toLocaleLowerCase("ru"));
          suggestions.style.display = "none";
        });
        option.addEventListener("keydown", event => {
          if (event.key === "Enter") option.click();
        });
        suggestions.append(option);
      });
      suggestions.style.display = matches.length ? "block" : "none";
    });

    document.addEventListener("click", event => {
      if (!event.target.closest(".search-wrap") && suggestions) {
        suggestions.style.display = "none";
      }
    });
  }

});
