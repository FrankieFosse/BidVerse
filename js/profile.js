const profileLink = document.getElementById("profileLink");

function viewProfile() {
    window.location = `/html/profile/profile.html?name=${localStorage.getItem("name")}`;
}

profileLink.addEventListener("click", viewProfile)