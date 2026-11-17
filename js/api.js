
document.addEventListener("DOMContentLoaded",()=>{
 const status=document.getElementById("api-status"),card=document.getElementById("api-dish");
 if(!status||!card)return;
 const load=async()=>{
  status.hidden=false;status.textContent="Загружаем блюдо…";card.hidden=true;
  try{
   const response=await fetch("https://www.themealdb.com/api/json/v1/1/random.php");
   if(!response.ok)throw new Error("HTTP "+response.status);
   const data=await response.json(),meal=data.meals?.[0];if(!meal)throw new Error("Пустой ответ API");
   document.getElementById("api-dish-name").textContent=meal.strMeal;
   document.getElementById("api-dish-category").textContent=[meal.strCategory,meal.strArea].filter(Boolean).join(" · ");
   const img=document.getElementById("api-dish-image");img.src=meal.strMealThumb;img.alt=meal.strMeal;
   const link=document.getElementById("api-dish-link");link.href=meal.strSource||meal.strYoutube||"https://www.themealdb.com/";
   card.hidden=false;status.hidden=true;
  }catch(err){status.textContent="Не удалось загрузить блюдо. Проверьте подключение к интернету и попробуйте ещё раз.";console.error(err);}
 };
 document.getElementById("api-refresh")?.addEventListener("click",load);load();
});
