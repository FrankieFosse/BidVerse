import {listData} from "./utils.js";

let outElement = document.getElementById("output");
let out = document.getElementById("profileListings");
const closeOverlayButton1 = document.getElementById("closeOverlayButton1");
const closeOverlayButton2 = document.getElementById("closeOverlayButton2");
const avatarOverlay = document.getElementById("avatarOverlay");

let collection = [];

let params = new URL (document.location).searchParams;

let name = params.get("name");
const url = `https://v2.api.noroff.dev/auction/profiles/${name}`;
const url2 = `https://v2.api.noroff.dev/auction/profiles/${name}/listings`;

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
        document.title = responseData.data.name + " - Social Media App";
        listProfile(responseData, outElement);
    } catch(error) {
        console.error(error);
    }
}

getProfileByName();

function listProfile(profile, out) {
    let newDiv = `
    <section class="flex flex-col pb-5 bg-gray-700 bg-opacity-50 w-full md:w-3/5 items-center">
    <div class="text-gray-100 bg-gray-900 mx-5 my-5 py-10 flex flex-col h-2/4 w-11/12 text-center items-center">
    <h1 class="w-3/5 text-3xl">${profile.data.name}</h1>
    <p class="opacity-50 mb-5">${profile.data.email}</p>
    <div class="flex flex-row justify-center items-center">
    <img src=${profile.data.avatar.url} class="rounded-full h-64 w-64">
    <i id="editAvatarButton" class="fa-solid fa-pen-to-square relative left-5 text-lg hover:scale-110 duration-300 cursor-pointer"></i>
    </div>



    </div>

    <div class="flex flex-col text-center text-gray-100 justify-around items-center w-4/5">
        <p class="w-32 bg-blue-600 rounded-full saturate-50">Posts: ${profile.data._count.posts}</p>
        <button id="followersButton" class="my-5 w-32 bg-blue-600 hover:bg-blue-500 duration-300 rounded-full saturate-50">Followers: ${profile.data._count.followers}</button>
        <p class="w-32 bg-blue-600 rounded-full saturate-50">Following: ${profile.data._count.following}</p>
    </div>
    </section>
    `;
    out.innerHTML = newDiv;

    const editAvatarButton = document.getElementById("editAvatarButton");

    editAvatarButton.addEventListener("click", openAvatarOverlay);


}

closeOverlayButton1.addEventListener("click", closeAvatarOverlay);
closeOverlayButton2.addEventListener("click", closeAvatarOverlay);

function openAvatarOverlay() {
    avatarOverlay.style.display = "block";
}

function closeAvatarOverlay() {
    avatarOverlay.style.display = "none";
}



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
        console.log(responseData)

        for (let item of responseData.data) {
            collection.push(item);
        }
        listData(collection, out);

    } catch(error) {
        console.error(error);
    }
}

getPostsByProfile();




