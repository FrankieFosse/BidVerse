export const homeOutput = document.getElementById("homeOutput")

export const listItemTemplate = (listing) => {
    return `<a href="details.html?id=${listing.id}" class="hover:scale-105 duration-150 text-center w-full">
            <div id="postElement" class="flex flex-col justify-center items-center">
            <h2 class="bg-blue50 h-16 w-full content-center text-gray30 rounded-t overflow-hidden">${listing.title}</h2>
            <img class="w-full" src=${listing.media?.url ? listing.media?.url : "../../images/image-placeholder-500x500.jpg"}>
            </div>
            </a>`;
}

export function listItem(list, out) {
    out.innerHTML = "";
    let output = "";
    for (let item of list) {
        output += `${listItemTemplate(item)}`
    }
    if (output) {
        out.innerHTML = output;
    } else {
    }
}

const isLoggedIn = () => {
    let token = localStorage.getItem("token");
    let email = localStorage.getItem("email");
    const login2 = document.getElementById("login2");

    if (token && email) {
        console.log("Logged in");
        logout2.style.display = "flex";
        login2.style.display = "none";
    } else {
        console.log("Not logged in");
        logout2.style.display = "none";
        login2.style.display = "flex";
    }
}

window.addEventListener("load", isLoggedIn);