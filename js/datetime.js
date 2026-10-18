const dateTimeBlock = document.getElementById("datetime");

function updateDateTime() {
    const now = new Date();

    const text = now.toLocaleString("ru-RU", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "2-digit"
    });

    dateTimeBlock.textContent = text;
}

updateDateTime();
setInterval(updateDateTime, 1000);