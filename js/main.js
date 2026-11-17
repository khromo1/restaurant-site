
document.addEventListener("DOMContentLoaded", () => {
  // Accessible accordion
  document.querySelectorAll(".accordion-question").forEach(button => {
    button.setAttribute("aria-expanded", "false");
    button.addEventListener("click", () => {
      const item = button.closest(".accordion-item") || button.parentElement;
      const answer = button.nextElementSibling;
      const open = item.classList.toggle("open");
      button.setAttribute("aria-expanded", String(open));
      if (answer) answer.style.maxHeight = open ? `${answer.scrollHeight}px` : "";
    });
  });
  // Live date/time where the legacy page provides the target
  const clock = document.getElementById("datetime");
  if (clock) {
    const update = () => clock.textContent = new Intl.DateTimeFormat("ru-RU",{dateStyle:"full",timeStyle:"short"}).format(new Date());
    update(); setInterval(update, 60000);
  }
  // Reading progress, optional on pages with progress-bar
  const bar = document.getElementById("progress-bar");
  if (bar) {
    const update = () => {
      const max = document.documentElement.scrollHeight - innerHeight;
      bar.style.width = `${max > 0 ? scrollY / max * 100 : 0}%`;
    };
    addEventListener("scroll", update, {passive:true}); update();
  }
  // FAQ search from the original homepage
  const faq = document.getElementById("faq-search");
  if (faq) faq.addEventListener("input", () => {
    const q = faq.value.trim().toLocaleLowerCase("ru");
    document.querySelectorAll(".accordion-item").forEach(item => {
      item.hidden = q && !item.textContent.toLocaleLowerCase("ru").includes(q);
    });
  });
});
