
// Redirect to Home page if not logged in
let token = localStorage.getItem("token");
let email = localStorage.getItem("email");

const isLoggedIn = () => {

    if (token && email) {

    } else {
        window.location.href = "/html/index.html";
    }
}

window.addEventListener("load", isLoggedIn);