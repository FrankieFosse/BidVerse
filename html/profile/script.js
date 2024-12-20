

let outElement = document.getElementById("output");
let out = document.getElementById("profileListings");
const closeOverlayButton1 = document.getElementById("closeOverlayButton1");
const closeOverlayButton2 = document.getElementById("closeOverlayButton2");
const avatarOverlay = document.getElementById("avatarOverlay");
const avatarURL = document.getElementById("avatarURL");
const avatarALT = document.getElementById("avatarALT");
const avatarStatus = document.getElementById("avatarStatus");

let collection = [];

let params = new URL (document.location).searchParams;

let name = params.get("name");
const url = `https://v2.api.noroff.dev/auction/profiles/${name}`;
const url2 = `https://v2.api.noroff.dev/auction/profiles/${name}/listings`;







export const listItemTemplate = (listing) => {
    let imagesOutput = listing.media.map(listing => {
        return `
        <img class="h-36 object-cover" src=${listing.url}>
        `
    }).slice(0, 1);
    if (imagesOutput.length == 0) {
        imagesOutput = `
        <img class="h-36 object-cover" src="/images/image-placeholder-500x500.jpg">
        `
    }
return `<a id="listingByProfile" href="/html/details.html?id=${listing.id}" class="bg-blue50 bg-opacity-50 hover:scale-105 hover:bg-blue30 duration-300 h-72 w-full">
        <div id="postElement" class="flex flex-col items-center justify-center">
        <h2 class="flex flex-col justify-center text-gray30 h-16 text-center m-4 text-ellipsis whitespace-nowrap overflow-hidden w-4/5">${listing.title}</h2>
        <div class="w-full flex flex-col items-center mb-1 px-1">${imagesOutput}</div>
        </div>
        </a>`;
}

export function listData(list, out) {
    out.innerHTML = "";
    let output = "";
    for (let item of list) {
        output += `${listItemTemplate(item)}`
    }
    if (output) {
        out.innerHTML = output;
    }
}







// Fetch and display data for this profile
async function getProfileByName() {
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
        document.title = responseData.data.name + " - BidVerse";
        listProfile(responseData, outElement);
    } catch(error) {
        console.error(error);
    }
}

getProfileByName();



// Template for displaying profile data
function listProfile(profile, out) {
    let newDiv = `
    <section class="flex flex-col pb-5 bg-gray50 bg-opacity-50 w-full items-center">
    <div class="bg-gray70 bg-opacity-75 mx-5 my-5 py-10 flex flex-col h-2/4 w-4/5 md:w-3/5 text-center items-center">
    <h1 class="w-3/5 text-3xl text-gray30">${profile.data.name}</h1>
    <p class="opacity-50 mb-5 text-gray30">${profile.data.email}</p>
    <div class="flex flex-col justify-center items-center content-center w-full">
    <img src=${profile.data.avatar.url? profile.data.avatar.url : "/images/avatar-placeholder.jpg"} class="rounded-full h-48 w-48 object-cover">
    <i id="editAvatarButton" class="fa-solid fa-pen-to-square text-gray30 mt-4 opacity-75 text-lg hover:scale-110 hover:opacity-100 duration-300 cursor-pointer bg-gray70 w-8 h-8 rounded items-center justify-center content-center self-center hidden"></i>
    </div>
    </div>

    <div class="flex flex-col text-center text-gray-100 justify-around items-center w-4/5">
        <p class="w-32 bg-primary50 rounded-full">Credits: ${profile.data.credits}</p>
        <p class="mt-4 bg-primary70 rounded-full w-32">Wins: ${profile.data._count.wins}</p>
        <p class="mt-4 bg-blue50 rounded-full w-32">Listings: ${profile.data._count.listings}</p>
    </div>

    </section>

    `;
    out.innerHTML = newDiv;

    const editAvatarButton = document.getElementById("editAvatarButton");

    editAvatarButton.addEventListener("click", openAvatarOverlay);



    // Ability to edit avatar if profile page is my own
    const loggedInProfile = `${localStorage.getItem("name")}`;
        if (loggedInProfile === `${profile.data.name}`) {
        editAvatarButton.style.display = "flex";
    } else {
        editAvatarButton.style.display = "none";
    }
}



// Open and close avatar overlay
closeOverlayButton1.addEventListener("click", closeAvatarOverlay);
closeOverlayButton2.addEventListener("click", closeAvatarOverlay);

function openAvatarOverlay() {
    avatarOverlay.style.display = "block";
}

function closeAvatarOverlay() {
    avatarOverlay.style.display = "none";
    avatarURL.value = "";
    avatarALT.value = "";
    avatarStatus.style.opacity = "0";
}



// Fetch listings created by this profile
async function getPostsByProfile() {
    try {
        const response = await fetch(url2, {
            method: "GET",
            headers: {
                "content-type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                "X-Noroff-API-Key": `178dd2f7-0bd8-4d9b-9ff9-78d8d5ac9bc9`
            }
        });
        const responseData = await response.json();

        for (let item of responseData.data) {
            collection.push(item);
        }
        listData(collection, out);
        if (collection.length == 1) {
            out.classList.remove("2xl:grid-cols-7");
            out.classList.remove("xl:grid-cols-6");
            out.classList.remove("lg:grid-cols-5");
            out.classList.remove("md:grid-cols-4");
            out.classList.remove("sm:grid-cols-3");
            out.classList.remove("grid-cols-2");
            out.classList.add("grid-cols-1");
        }
        if (collection.length == 2) {
            out.classList.remove("2xl:grid-cols-7");
            out.classList.remove("xl:grid-cols-6");
            out.classList.remove("lg:grid-cols-5");
            out.classList.remove("md:grid-cols-4");
            out.classList.remove("sm:grid-cols-3");
            if (window.innerWidth > 925) {
                out.classList.add("w-3/5");
            }

        }
        if (collection.length == 3) {
            out.classList.remove("2xl:grid-cols-7");
            out.classList.remove("xl:grid-cols-6");
            out.classList.remove("lg:grid-cols-5");
            out.classList.remove("md:grid-cols-4");
            if (window.innerWidth > 925) {
                out.classList.add("w-4/5");
            }

        }

    } catch(error) {
        console.error(error);
    }
}

getPostsByProfile();



// Remove page loader when page is loaded
function removePageLoader() {
    pageLoader.style.display = "none";
}

window.addEventListener("load", removePageLoader);