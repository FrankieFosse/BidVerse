// Remove page loader when page is loaded
function removePageLoader() {
    pageLoader.style.display = "none";
}

window.addEventListener("load", removePageLoader);