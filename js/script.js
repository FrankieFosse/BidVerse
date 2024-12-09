import {listItem, homeOutput} from "./utils.js";

let api = `https://v2.api.noroff.dev/auction/listings`
let collection = [];
let out = document.getElementById("homeOutput")

async function fetchListings() {
    try {
        const response = await fetch(api);
        if (!response.ok) {
            throw new Error("Could not fetch data");
        };
        const responseData = await response.json();
        console.log(responseData.data);

        for (let item of responseData.data) {
            collection.push(item);
        }
        listItem(collection, homeOutput);

    }
    catch(error) {
        console.error(error);
    }
}

fetchListings();




// Search function
const search = document.getElementById("search");
search.addEventListener("keyup", filterListings);

function filterListings() {
    const filterQuery = search.value;

    const filtered = collection.filter((listing)=>{
        return listing.title.toUpperCase().indexOf(filterQuery.toUpperCase()) > -1;
    });

    listItem (filtered, out);
}