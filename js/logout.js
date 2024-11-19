const ifLoggedIn = () => {
    const logOutButton = document.getElementById("logout");

    let token = localStorage.getItem("token");
    let email = localStorage.getItem("email");

    if (token && email) {
        console.log("Logged in");
        logOutButton.addEventListener("click", () => {
            localStorage.removeItem("token");
            localStorage.removeItem("email");
            localStorage.removeItem("name");
            window.location = "index.html";
        });
    } else {
        console.log("Not logged in");
    }
}

window.addEventListener("load", ifLoggedIn);