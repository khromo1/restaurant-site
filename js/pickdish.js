const dishes = [
    { id: 1, name: "Тартар из говядины с каперсами",
      description: "Рубленая говяжья вырезка с каперсами, горчицей и желтком.",
      filling: ["meat"],      taste: ["salty"],          hunger: ["none", "hungry"],
      mood: ["great", "good", "ok"] },
 
    { id: 2, name: "Улитки в чесночном соусе",
      description: "Классическая французская закуска с чесночным маслом и зеленью.",
      filling: ["snails"],    taste: ["salty", "soft"],  hunger: ["none", "hungry"],
      mood: ["great", "good"] },
 
    { id: 3, name: "Утиная грудка с апельсиновым соусом",
      description: "Утиная грудка с хрустящей кожей и кисло-сладким апельсиновым соусом.",
      filling: ["meat"],      taste: ["tangy", "sweet"], hunger: ["none", "hungry"],
      mood: ["great", "good", "ok"] },
 
    { id: 4, name: "Ризотто с белыми грибами",
      description: "Кремовое ризотто с белыми грибами и пармезаном.",
      filling: ["mushrooms"], taste: ["soft", "salty"],  hunger: ["none", "hungry"],
      mood: ["ok", "meh", "bad"] },
 
    { id: 5, name: "Крем-брюле с ванилью",
      description: "Нежный ванильный крем с карамельной корочкой.",
      filling: ["dessert"],   taste: ["sweet", "soft"],  hunger: ["none", "hungry"],
      mood: ["great", "good", "ok", "meh", "bad"] },
 
    { id: 6, name: "Сет «Импрессион»",
      description: "Тартар, утиная грудка и тарт Татен.",
      filling: ["meat", "dessert"],      taste: ["salty", "tangy", "sweet"], hunger: ["very"],
      mood: ["great", "good", "ok"] },
 
    { id: 7, name: "Сет «Живопись»",
      description: "Суп, ризотто и крем-брюле.",
      filling: ["mushrooms", "dessert"], taste: ["soft", "salty", "sweet"],  hunger: ["very"],
      mood: ["ok", "meh", "bad", "good", "great"] }
];

const ratingMessages = {
    1: "Жаль, что не попали. Попробуйте изменить ответы.",
    2: "Спасибо! Постараемся подбирать точнее.",
    3: "Неплохо, спасибо за оценку.",
    4: "Отлично! Рады, что вам понравилось.",
    5: "Супер! Ждём вас в ресторане!"
};

const form = document.querySelector("#quiz-form");
const resetBtn = document.querySelector("#reset-btn");
const resultMessage = document.querySelector("#result-message");
const cards = document.querySelectorAll("#dish-list .card");
const stars = document.querySelectorAll(".star");
const ratingMessage = document.querySelector("#rating-message");

const totalQuestions = form.querySelectorAll("fieldset").length;

function getAnswers() {
    return Object.fromEntries(new FormData(form));
}

function dishMatches(dish, answers) {
    return Object.keys(answers).every(function (question) {
        return dish[question].includes(answers[question]);
    });
}

function showDishes(matched) {
    const matchedIds = matched.map(function (dish) {
        return String(dish.id);
    });

    cards.forEach(function (card) {
        const isMatch = matchedIds.includes(card.dataset.id);
        card.classList.toggle("d-none", !isMatch);
    });
}

function updateResult() {
    const answers = getAnswers();
    const answeredCount = Object.keys(answers).length;

    const matched = dishes.filter(function (dish) {
        return dishMatches(dish, answers);
    });

    showDishes(matched);

    if (answeredCount === 0) {
        resultMessage.textContent = "Ответьте на вопросы, и мы оставим только подходящие блюда.";
    } else if (matched.length === 0) {
        resultMessage.textContent = "Под такое сочетание ничего не нашлось. Попробуйте изменить один из ответов.";
    } else if (answeredCount < totalQuestions) {
        resultMessage.textContent = "Подходит блюд: " + matched.length + " из " + dishes.length + ". Ответьте на остальные вопросы, чтобы сузить выбор.";
    } else if (matched.length === 1) {
        resultMessage.textContent = "Вот ваше блюдо!";
    } else {
        resultMessage.textContent = "Подходит блюд: " + matched.length + " из " + dishes.length + ".";
    }
}

function paintStars(value) {
    stars.forEach(function (star) {
        const filled = Number(star.dataset.value) <= value;
        star.classList.toggle("text-warning", filled);
        star.classList.toggle("text-secondary", !filled);
    });
}
 
stars.forEach(function (star) {
    star.addEventListener("click", function () {
        const value = Number(star.dataset.value);
        paintStars(value);
        ratingMessage.textContent = "Ваша оценка: " + value + " из 5. " + ratingMessages[value];
    });
});


form.addEventListener("change", updateResult);
 
resetBtn.addEventListener("click", function () {
    form.reset();
    updateResult();
});
 
updateResult();