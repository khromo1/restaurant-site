
document.addEventListener("DOMContentLoaded",()=>{
 const input=document.getElementById("menu-search");if(!input)return;
 const items=[...document.querySelectorAll(".menu-item, .menu-category li")];
 const status=document.getElementById("menu-search-status");
 input.addEventListener("input",()=>{
  const q=input.value.trim().toLocaleLowerCase("ru");let count=0;
  items.forEach(item=>{const match=item.textContent.toLocaleLowerCase("ru").includes(q);item.classList.toggle("menu-hidden",!match);if(match)count++;});
  document.querySelectorAll(".menu-category").forEach(category=>{
   const visible=[...category.querySelectorAll(".menu-item, li")].some(el=>!el.classList.contains("menu-hidden"));
   category.classList.toggle("menu-hidden",!visible);
  });
  if(status)status.textContent=q?`Найдено позиций: ${count}`:"";
  localStorage.setItem("claudeMonetMenuSearch",q);
 });
});
