(() => {
    const USERS_KEY = "claudeMonetUsers";
    const SESSION_KEY = "claudeMonetCurrentUser";

    const readUsers = () => JSON.parse(localStorage.getItem(USERS_KEY) || "[]");

    const emailOk = value => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value);

    const passwordOk = value =>
        value.length >= 8 &&
        /[A-Za-zА-Яа-я]/.test(value) &&
        /\d/.test(value);

    const error = (id, msg) => {
        const el = document.getElementById(id + "-error");
        if (el) el.textContent = msg;
    };

    const saveSession = user =>
        localStorage.setItem(
            SESSION_KEY,
            JSON.stringify({ name: user.name, email: user.email })
        );

    document.addEventListener("DOMContentLoaded", () => {
        // ---------- Регистрация ----------
        const signup = document.getElementById("signup-form");

        if (signup) {
            signup.addEventListener("submit", e => {
                e.preventDefault();

                ["signup-name", "signup-email", "signup-password", "signup-confirm"]
                    .forEach(id => error(id, ""));

                const name = document.getElementById("signup-name").value.trim();
                const email = document.getElementById("signup-email").value.trim().toLowerCase();
                const password = document.getElementById("signup-password").value;
                const confirm = document.getElementById("signup-confirm").value;

                let valid = true;

                if (name.length < 2) {
                    error("signup-name", "Введите имя (минимум 2 символа).");
                    valid = false;
                }

                if (!emailOk(email)) {
                    error("signup-email", "Введите корректный email.");
                    valid = false;
                }

                if (!passwordOk(password)) {
                    error("signup-password", "Пароль: минимум 8 символов, буквы и цифры.");
                    valid = false;
                }

                if (password !== confirm) {
                    error("signup-confirm", "Пароли не совпадают.");
                    valid = false;
                }

                const users = readUsers();

                if (users.some(u => u.email === email)) {
                    error("signup-email", "Аккаунт с таким email уже существует.");
                    valid = false;
                }

                const msg = document.getElementById("signup-message");

                if (!valid) {
                    msg.textContent = "Проверьте поля формы.";
                    return;
                }

                const user = { name, email, password };
                users.push(user);
                localStorage.setItem(USERS_KEY, JSON.stringify(users));
                saveSession(user);

                msg.textContent = "Регистрация успешна. Открываем профиль…";
                location.href = "profile.html";
            });
        }

        // ---------- Вход ----------
        const login = document.getElementById("login-form");

        if (login) {
            login.addEventListener("submit", e => {
                e.preventDefault();

                const email = document.getElementById("login-email").value.trim().toLowerCase();
                const password = document.getElementById("login-password").value;

                error("login-email", "");
                error("login-password", "");

                let valid = true;

                if (!emailOk(email)) {
                    error("login-email", "Введите корректный email.");
                    valid = false;
                }

                if (!password) {
                    error("login-password", "Введите пароль.");
                    valid = false;
                }

                if (!valid) return;

                const user = readUsers().find(
                    u => u.email === email && u.password === password
                );

                if (!user) {
                    document.getElementById("login-message").textContent =
                        "Неверный email или пароль.";
                    return;
                }

                saveSession(user);
                location.href = "profile.html";
            });
        }
    });
})();