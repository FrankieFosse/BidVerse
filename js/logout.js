const ifLoggedIn = () => {
    const logOutButton = document.getElementById("logout");
    const logOutButton2 = document.getElementById("logout2");
    const logInButton = document.getElementById("login");
    const avatarElement = document.getElementById("profileLink");

    let token = localStorage.getItem("token");
    let email = localStorage.getItem("email");

    if (token && email) {
        avatarElement.style.display = "block";
        logInButton.style.display = "none";
        logOutButton.addEventListener("click", () => {
            localStorage.removeItem("token");
            localStorage.removeItem("email");
            localStorage.removeItem("name");
            window.location = "index.html";
        });
        logOutButton2.addEventListener("click", () => {
            localStorage.removeItem("token");
            localStorage.removeItem("email");
            localStorage.removeItem("name");
            window.location = "index.html";
        });
    }
}

window.addEventListener("load", ifLoggedIn);