const questions = document.querySelectorAll(".accordion-question");

questions.forEach(function (question) {
  question.addEventListener("click", function () {
    const item = question.parentElement;
    const answer = question.nextElementSibling;

    item.classList.toggle("open");

    if (item.classList.contains("open")) {
      answer.style.maxHeight = answer.scrollHeight + "px";
    } else {
      answer.style.maxHeight = null;
    }
  });
});