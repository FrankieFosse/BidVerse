const loginForm = document.querySelector("form#login");
const out = document.querySelector("p#output");



// Validate input fields in Login
loginForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const email = loginForm.email.value.trim();
    const password = loginForm.password.value.trim();
    if (email && password) {
        getToken(email, password);
    } else {
        out.style.opacity = "100";
        setTimeout(() => {
            out.style.opacity = "0";
        }, 3000);
    }
});



// Log in user
async function getToken(email, password) {
    try {
        const options = {
            method: "post",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
        };
        const response = await fetch(`https://v2.api.noroff.dev/auth/login?_holidaze=true`, options);
        if (response.ok) {
            const data = await response.json();
            console.log(data);
            localStorage.setItem("name", data.data.name);
            localStorage.setItem("email", email);
            localStorage.setItem("token", data.data.accessToken);
            window.location = "index.html";
        } else {
            out.innerHTML = "Wrong username or password";
            out.style.opacity = "100";
            setTimeout(() => {
                out.style.opacity = "0";
            }, 3000);
        }
    } catch (error) {
        console.error(error.message);
    }
}

