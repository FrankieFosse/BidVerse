let params = new URL (document.location).searchParams;

const detailsOutput = document.getElementById("detailsOutput");

let id = params.get("id");
const url = `https://v2.api.noroff.dev/auction/listings/${id}`;

async function getListingById() {
    try {
        const response = await fetch(url);
        const responseData = await response.json();
        document.title = responseData.data.title + " - BetVerse";
        listDetailedItem(responseData, detailsOutput);
    } catch(error) {
        console.error(error);
    }
}

getListingById();

function listDetailedItem(listing, out) {
    let newDiv = `
    <div class="text-gray-100 bg-gray-900 flex flex-col h-4/5 lg:w-2/5 xl:w-2/5 w-4/5 text-center items-center justify-center content-center mt-5 overflow-hidden">
    <h1 class="h-4/5 w-4/5 mb-3 mt-10 mx-10">${listing.data.title}</h1>
    <img src=${listing.data.media?.url ? listing.data.media?.url : "/../images/image-placeholder-500x500.jpg"} class="w-2/5">
    </div>
    `;
    out.innerHTML = newDiv;
}