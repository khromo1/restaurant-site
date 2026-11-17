document.addEventListener("DOMContentLoaded", () => {
    const session = JSON.parse(localStorage.getItem("claudeMonetCurrentUser") || "null");

    document.querySelectorAll('a[href="login.html"]').forEach(a => {
        if (session) {
            a.href = "profile.html";
            a.textContent = "Профиль";
        }
    });

    document.querySelectorAll('a[href="signup.html"]').forEach(a => {
        if (session) a.hidden = true;
    });
});