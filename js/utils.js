// Check if logged in
export let token = localStorage.getItem("token");
export let email = localStorage.getItem("email");

const isLoggedIn = () => {
    const creditsLink = document.getElementById("creditsLink");
    const createListingLink = document.getElementById("createListingLink");
    const login2 = document.getElementById("login2");
    const profileLink2 = document.getElementById("profileLink2");

    if (token && email) {
        logout2.style.display = "flex";
        login2.style.display = "none";
    } else {
        logout2.style.display = "none";
        login2.style.display = "flex";
        creditsLink.style.display = "none";
        createListingLink.style.display = "none";
        profileLink2.style.display = "none";
    }
}

window.addEventListener("load", isLoggedIn);








export const listItemTemplate = (listing) => {
        let imagesOutput = listing.media.map(listing => {
            return `
            <img src=${listing.url ? listing.url : "/images/image-placeholder-500x500.jpg"}>
            `
        }).slice(0, 1);
    return `<a href="details.html?id=${listing.id}" class="w-full bg-blue50 h-48 overflow-hidden hover:scale-105 hover:bg-blue30 duration-300">
            <div id="postElement" class="flex flex-col justify-center items-center">
            <h2 class="h-16 w-full content-center text-gray30 overflow-hidden text-center w-4/5">${listing.title}</h2>
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
    }
}

export function listNothing(list, out) {
    out.innerHTML = "";
    let output = "";
    for (let item of list) {
        output += `${listNothingTemplate(item)}`
    }
    if (output) {
        out.innerHTML = output;
    }
}

const listNothingTemplate = () => {
return `
        <div class="flex flex-col justify-center items-center">
            <div class="w-full">
                No listings found
            </div>
        </div>
`;
}



// Show credits in NAV Menu

const name = localStorage.getItem("name");
const url = `https://v2.api.noroff.dev/auction/profiles/${name}`
const credits = document.getElementById("credits");


if (token && email) {
async function getCredits() {
    try {
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "content-type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                "X-Noroff-API-Key": `178dd2f7-0bd8-4d9b-9ff9-78d8d5ac9bc9`
            }
        });
        const responseData = await response.json();
        credits.innerHTML = responseData.data.credits;

    } catch(error) {
        console.error(error);
    }
}

getCredits();

}