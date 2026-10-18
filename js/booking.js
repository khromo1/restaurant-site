const form = document.getElementById("booking-form");

function setError(id, message) {
    document.getElementById(id + "-error").textContent = message;

    const field = document.getElementById(id);
    if (field) {
        field.classList.toggle("input-error", message !== "");
    }
}

form.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.replace(/\D/g, "");
    const date = document.getElementById("date").value;
    const time = document.getElementById("time").value;
    const contact = document.querySelector('input[name="contact"]:checked');
    const table = document.getElementById("table").value;

    let isValid = true;

    // Name
    if (name === "") {
        setError("name", "Введите имя");
        isValid = false;
    } else {
        setError("name", "");
    }

    // Email
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email === "") {
        setError("email", "Введите email");
        isValid = false;
    } else if (!emailPattern.test(email)) {
        setError("email", "Неверный формат email");
        isValid = false;
    } else {
        setError("email", "");
    }

    // Phone
    if (phone === "") {
        setError("phone", "Введите номер телефона");
        isValid = false;
    } else if (phone.length !== 10) {
        setError("phone", "Номер должен содержать 10 цифр");
        isValid = false;
    } else {
        setError("phone", "");
    }

    // Date
    if (date === "") {
        setError("date", "Выберите дату");
        isValid = false;
    } else {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const chosen = new Date(date + "T00:00:00");

        if (chosen < today) {
            setError("date", "Нельзя выбрать прошедшую дату");
            isValid = false;
        } else {
            setError("date", "");
        }
    }

    // Time
    if (time === "") {
        setError("time", "Выберите время");
        isValid = false;
    } else {
        setError("time", "");
    }

    // Contact
    if (contact === null) {
        setError("contact", "Выберите способ связи");
        isValid = false;
    } else {
        setError("contact", "");
    }

    // Table
    if (table === "") {
        setError("table", "Выберите столик");
        isValid = false;
    } else {
        setError("table", "");
    }

    // Итог
    if (isValid) {
        form.reset();
        document.getElementById("form-success").textContent = "Столик успешно забронирован!";
    } else {
        document.getElementById("form-success").textContent = "";
    }
});

form.addEventListener("reset", function () {
    ["name", "email", "phone", "date", "time", "contact", "table"].forEach(function (id) {
        setError(id, "");
    });
    document.getElementById("form-success").textContent = "";
});