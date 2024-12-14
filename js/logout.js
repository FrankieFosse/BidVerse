
// Function to log out user if logged in
export const ifLoggedIn = () => {
    const logOutButton2 = document.getElementById("logout2");
    const avatarElement = document.getElementById("profileLink");

    let token = localStorage.getItem("token");
    let email = localStorage.getItem("email");

    if (token && email) {
        avatarElement.style.display = "block";
        logOutButton2.addEventListener("click", () => {
            localStorage.removeItem("token");
            localStorage.removeItem("email");
            localStorage.removeItem("name");
            window.location = "/html/index.html";
        });
    } else {
        creditsLink.style.display = "none";
        createListingLink.style.display = "none";
    }
}

window.addEventListener("load", ifLoggedIn);