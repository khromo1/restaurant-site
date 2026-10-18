const popup = document.querySelector("#popup");
const openBtn = document.querySelector("#open-popup");
const closeBtn = document.querySelector("#close-popup");
const form = document.querySelector("#booking-form");

openBtn.addEventListener("click", function () {
  popup.classList.add("show");
});

closeBtn.addEventListener("click", function () {
  popup.classList.remove("show");
});

popup.addEventListener("click", function (event) {
  if (event.target === popup) {
    popup.classList.remove("show");
  }
});

form.addEventListener("submit", function (event) {
  event.preventDefault();
  alert("Спасибо! Мы свяжемся с вами для подтверждения.");
  popup.classList.remove("show");
  form.reset();
});