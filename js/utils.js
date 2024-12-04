export const homeOutput = document.getElementById("homeOutput")




export const listItemTemplate = (listing) => {
        let imagesOutput = listing.media.map(listing => {
            return `
            <img src=${listing.url ? listing.url : "/images/image-placeholder-500x500.jpg"}>
            `
        }).slice(0, 1);
    return `<a href="details.html?id=${listing.id}" class="w-full bg-blue50 h-48 overflow-hidden">
            <div id="postElement" class="flex flex-col justify-center items-center">
            <h2 class="bg-blue50 h-16 w-full content-center text-gray30 overflow-hidden text-center">${listing.title}</h2>
            <div class="h-24 w-5/6 mb-2 bg-gray70 object-contain overflow-hidden content-center">${imagesOutput}</div>
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