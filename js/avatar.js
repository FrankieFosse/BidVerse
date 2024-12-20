import {token, email} from "./utils.js";

let avatar = document.getElementById("avatar");

let name = localStorage.getItem("name");
const url = `https://v2.api.noroff.dev/auction/profiles/${name}`;



// Display avatar in header if logged in
if (token && email) {
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
        listProfile(responseData, avatar);
    } catch(error) {
        console.error(error);
    }
}

getProfileByName();

}

function listProfile(profile, out) {
    let newDiv = `
    <img src=${profile.data.avatar.url} class="rounded-full h-8 w-8 border-gray30 border-solid border-2 object-cover">
    `;
    out.innerHTML = newDiv;
}