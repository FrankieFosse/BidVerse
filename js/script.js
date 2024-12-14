import {listItem, listNothing} from "./utils.js";

let homeOutput = document.getElementById("homeOutput");
let params = new URL (document.location).searchParams;
const search = document.getElementById("search");
let api = `https://v2.api.noroff.dev/auction/listings?_active=true`;
let collection = [];
const searchButton = document.getElementById("searchButton");



// Fetch and display elements from API
async function fetchListings() {
    try {
        const response = await fetch(api);
        if (!response.ok) {
            throw new Error("Could not fetch data");
        };
        const responseData = await response.json();

        for (let item of responseData.data) {
            collection.push(item);
        }
        const sortedCollection = collection.toSorted();
        console.log(collection);
        console.log(sortedCollection);
        listItem(sortedCollection, homeOutput);

    }
    catch(error) {
        console.error(error);
    }
}

fetchListings();

search.addEventListener("keyup", function(event) {
    if (event.key === "Enter") {
        fetchSearchListings();
    }
})



// Search functionality
async function fetchSearchListings() {
    try {
        let query = search.value;
        if (query == "") {
            homeOutput.classList.add("grid");
            homeOutput.classList.remove("flex");
            homeOutput.classList.remove("flex-col");
            homeOutput.classList.remove("items-center");
            collection = [];
            fetchListings();
        } else {
        let searchApi = `https://v2.api.noroff.dev/auction/listings/search?q=${query}`;
        const response = await fetch(searchApi);
        if (!response.ok) {
            throw new Error("Could not fetch search data");
        };
        const responseData = await response.json();

        if (responseData.data.length == 0) {
            homeOutput.classList.remove("grid");
            homeOutput.classList.add("flex");
            homeOutput.classList.add("flex-col");
            homeOutput.classList.add("items-center");
            collection = [1];
            listNothing(collection, homeOutput);
        } else {
            homeOutput.classList.add("grid");
            homeOutput.classList.remove("flex");
            homeOutput.classList.remove("flex-col");
            homeOutput.classList.remove("items-center");
            collection = [];

            for (let item of responseData.data) {
                collection.push(item);
            }
            listItem(collection, homeOutput);
            }
        }


    } catch(error) {
        console.error(error);
    }
}

searchButton.addEventListener("click", fetchSearchListings);