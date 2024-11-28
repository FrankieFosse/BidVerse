const hamburgerButton = document.getElementById("hamburgerButton");
const hamburgerMenu = document.getElementById("hamburgerMenu");
const closeButton = document.getElementById("closeButton");

hamburgerButton.addEventListener("click", showMenu)

function showMenu() {
    hamburgerMenu.classList.remove("-right-full");
    hamburgerMenu.classList.add("right-0");
    hamburgerButton.style.display = "none";
    closeButton.style.display = "block";
}

closeButton.addEventListener("click", closeMenu)

function closeMenu() {
    hamburgerMenu.classList.add("-right-full");
    hamburgerMenu.classList.remove("right-0");
    hamburgerButton.style.display = "block";
    closeButton.style.display = "none";
}