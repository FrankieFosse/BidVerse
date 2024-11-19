const registerForm = document.querySelector("form#register");
const mailAddon = document.getElementById("mailAddon");
let out = document.getElementById("output");

registerForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const name = registerForm.name.value.trim();
    const email = registerForm.email.value.trim() + mailAddon.textContent;
    const emailValue = registerForm.email.value.trim();
    const password = registerForm.password.value.trim();

    if (password.length < 8) {
        out.style.opacity = "100";
        out.innerHTML = "Password must be at least 8 characters"
    }
    else if (name && email && emailValue && password) {
        registerUser(name, email, password);
    }
    if (!emailValue) {
        out.style.opacity = "100";
        out.innerHTML = "Please enter email"
    }
    if (!name) {

        out.innerHTML = "Please enter username"
    }



});

async function registerUser(name, email, password) {
    try {
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name, email, password }),
        };
        console.log(options);
        const response = await fetch(`https://v2.api.noroff.dev/auth/register`, options);
        console.log(response);
        if(!response.ok) {
            out.style.opacity = "100";
            out.innerHTML = "User already exists"
        } else {
            window.location = "success.html";
        }
    } catch (error) {
        console.error(error);
    }
}