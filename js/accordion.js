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

/* assignment 5 task 3*/

// objects and methods
const restaurant = {
    name: "Клод Моне",
    message: "Вы выбрали предложение ресторана!",

    showMessage: function (offerName) {
        alert(`${this.message}\n${offerName}`);
    }
};

// arrays and loops

const cards = Array.from(document.querySelectorAll(".card"));

const offers = cards.map(function (card, index) {
    return {
        id: index + 1,
        name: card.querySelector("h3")?.textContent || "Предложение",
        element: card
    };
});

// higher order functions

offers
    .filter(function (offer) {
        return offer.element.querySelector("a");
    })
    .forEach(function (offer) {
        const button = document.createElement("button");

        button.textContent = "Выбрать предложение";
        button.type = "button";
        button.classList.add("offer-button");

        offer.element.appendChild(button);

        button.addEventListener("click", function () {
            restaurant.showMessage(offer.name);

            // play sounds

            try {
                const audioContext = new (
                    window.AudioContext || window.webkitAudioContext
                )();

                const oscillator = audioContext.createOscillator();
                const gain = audioContext.createGain();

                oscillator.connect(gain);
                gain.connect(audioContext.destination);

                oscillator.frequency.value = 600;
                gain.gain.value = 0.08;

                oscillator.start();
                oscillator.stop(audioContext.currentTime + 0.15);
            } catch (error) {
                console.log("Звук недоступен в этом браузере.");
            }

            // animation
            offer.element.classList.remove("offer-selected");

            void offer.element.offsetWidth;

            offer.element.classList.add("offer-selected");
        });
    });
