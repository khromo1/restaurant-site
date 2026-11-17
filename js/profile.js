document.addEventListener("DOMContentLoaded", () => {
    const target = document.getElementById("profile-content");
    if (!target) return;

    const session = JSON.parse(localStorage.getItem("claudeMonetCurrentUser") || "null");

    if (!session) {
        target.innerHTML =
            '<p>Вы не вошли в аккаунт. <a href="login.html">Войти</a> или <a href="signup.html">зарегистрироваться</a>.</p>';
        document.getElementById("logout-button").hidden = true;
        return;
    }

    const name = document.createElement("p");
    const email = document.createElement("p");

    name.textContent = "Имя: " + session.name;
    email.textContent = "Email: " + session.email;

    target.replaceChildren(name, email);

    document.getElementById("logout-button").addEventListener("click", () => {
        localStorage.removeItem("claudeMonetCurrentUser");
        location.href = "index.html";
    });
});