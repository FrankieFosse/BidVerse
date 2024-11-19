const loginForm = document.querySelector("form#login");
const out = document.querySelector("p#output");

loginForm.addEventListener("submit", (event) => {
    event.preventDefault();
    console.log("Trying to log in");
    const email = loginForm.email.value.trim();
    const password = loginForm.password.value.trim();
    if (email && password) {
        getToken(email, password);
    } else {
        out.style.opacity = "100";
    }
});

async function getToken(email, password) {
    try {
        const options = {
            method: "post",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
        };
        console.log(options);
        const response = await fetch(`https://v2.api.noroff.dev/auth/login?_holidaze=true`, options);
        console.log(response);
        if (response.ok) {
            const data = await response.json();
            console.log(data);
            localStorage.setItem("name", data.data.name);
            localStorage.setItem("email", email);
            localStorage.setItem("token", data.data.accessToken);
            window.location = "index.html";
        } else {
            throw new Error(response.statusText),
            out.innerHTML = "Wrong username or password";
        }
    } catch (error) {
        console.error(error.message);
    }
}

const isLoggedIn = () => {
    let token = localStorage.getItem("token");
    let email = localStorage.getItem("email");

    if (token && email) {
        console.log("Logged in");
    } else {
        console.log("Not logged in");
    }
}

window.addEventListener("load", isLoggedIn);

