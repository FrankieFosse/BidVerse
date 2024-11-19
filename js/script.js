import {listItem, homeOutput} from "./utils.js";

let api = `https://v2.api.noroff.dev/auction/listings`
let collection = [];

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