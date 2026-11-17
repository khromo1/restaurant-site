
document.addEventListener("DOMContentLoaded",()=>{
 const form=document.getElementById("application-form");if(!form)return;
 form.addEventListener("submit",e=>{
  e.preventDefault();let firstInvalid=null;
  const fields=[...form.querySelectorAll("input,textarea,select")].filter(el=>el.type!=="submit"&&el.type!=="button");
  fields.forEach(field=>{
   let message="";const value=field.value.trim();
   if(!value)message="Заполните это поле.";
   else if(field.name.toLowerCase().includes("email")&&!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))message="Введите корректный email.";
   else if(field.type==="tel"&&!/^[+()\d\s-]{7,20}$/.test(value))message="Проверьте номер телефона.";
   let errorEl=field.parentElement.querySelector(".field-error");
   if(!errorEl){errorEl=document.createElement("small");errorEl.className="field-error";field.insertAdjacentElement("afterend",errorEl);}
   errorEl.textContent=message;field.classList.toggle("input-error",!!message);if(message&&!firstInvalid)firstInvalid=field;
  });
  if(firstInvalid){firstInvalid.focus();return;}
  const message=document.getElementById("application-success");
  if(message)message.textContent="Заявка проверена и сохранена в этом браузере.";
  localStorage.setItem("claudeMonetJobApplication",JSON.stringify(Object.fromEntries(new FormData(form))));
  form.reset();
 });
});
