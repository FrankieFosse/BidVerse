let params = new URL (document.location).searchParams;

const detailsOutput = document.getElementById("detailsOutput");
const closeBidOverlayButton = document.getElementById("closeBidOverlayButton");
const confirmBidButton = document.getElementById("confirmBidButton");
const cancelBidButton = document.getElementById("cancelBidButton");
const bidOverlay = document.getElementById("bidOverlay");
const bidAmount = document.getElementById("bidAmount");
const bidStatus = document.getElementById("bidStatus");
const bidStatusOverlay = document.getElementById("bidStatusOverlay");
const bidInputStatus = document.getElementById("bidInputStatus");
const highestBid = document.getElementById("highestBid");

let id = params.get("id");
const url = `https://v2.api.noroff.dev/auction/listings/${id}?_bids=true`
const url2 = `https://v2.api.noroff.dev/auction/listings/${id}`;


let bidsCollection = [];

async function getHighestBid() {
    try {
        const response = await fetch(url);
        const responseData = await response.json();
        for (let bid of responseData.data.bids) {
            bidsCollection.push(bid.amount);
        }
        if (bidsCollection.length == 0) {
            highestBid.innerHTML = "No current bids"
        }
        else {
            highestBid.innerHTML = "Highest bid: " + (Math.max(...bidsCollection));
        }
    } catch(error) {
        console.error(error);
    }
}

getHighestBid();


async function getListingById() {
    try {
        const response = await fetch(url);
        const responseData = await response.json();
        document.title = responseData.data.title + " - BidVerse";
        listDetailedItem(responseData, detailsOutput);
    } catch(error) {
        console.error(error);
    }
}

async function getImages() {
    try {
        const imagesOutput = document.getElementById("imagesOutput")
        const response = await fetch(url);
        const responseData = await response.json();
        console.log(responseData)

        imagesOutput.innerHTML = responseData.data.media.map(listing => {
            return `
            <div class="my-2 flex flex-col items-center">
            <img src=${listing.url}
            </div>
            `
        }).join(" ");

    } catch(error) {
        console.error(error);
    }
}

getImages();

getListingById();

function listDetailedItem(listing, out) {
    let newDiv = `
    <div class="text-gray30 bg-gray70 mt-12 p-2 flex flex-col items-center">
    <div class="flex flex-row justify-evenly w-full items-center mb-4">
        <h1 class="text-xl">${listing.data.title}</h1>
            <div class="flex flex-col items-center">
            <p class="text-sm">Number of bids</p>
            <p class="bg-primary50 rounded-full w-12 h-12 text-center flex flex-col justify-center">${listing.data._count.bids}</p>
            </div>
    </div>
    <p class="text-sm font-thin text-center">${listing.data.description? listing.data.description : ""}</p>
    <button id="bidOverlayButton" class="bg-primary50 w-max px-4 py-1 mt-4 hover:scale-110 hover:bg-primary30 duration-300">Add bid</button>
    <p class="text-center">Deadline: ${listing.data.endsAt.slice(0, 10)}</p>
    </div>
    `;
    out.innerHTML = newDiv;


    // Bid Overlay
    const bidOverlayButton = document.getElementById("bidOverlayButton");

    bidOverlayButton.addEventListener("click", openBidOverlay)

    function openBidOverlay() {
        bidOverlay.style.display = "flex";
    }
}

closeBidOverlayButton.addEventListener("click", closeBidOverlay);
cancelBidButton.addEventListener("click", closeBidOverlay);

function closeBidOverlay() {
    bidOverlay.style.display = "none";
    bidInputStatus.style.opacity = "0";
    bidAmount.value = "";
}



// Add Bid


async function addBid() {
    try {
        const response = await fetch(url2 + "/bids", {
            method: "POST",
            body: JSON.stringify({
                amount: Number(bidAmount.value)
            }),
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                "X-Noroff-API-Key": `178dd2f7-0bd8-4d9b-9ff9-78d8d5ac9bc9`
            }
        })
        const responseData = await response.json();

        if(response.ok) {
            bidStatus.innerHTML = "Bid has been added"
            bidStatusOverlay.style.display = "flex";
            bidOverlay.style.display = "none";
            setTimeout(() => {
                bidStatusOverlay.style.opacity = "0";
            }, 1000);
            setTimeout(() => {
                bidStatusOverlay.style.display = "none";
            }, 2100);
        }
        else {
            bidInputStatus.innerHTML = responseData.errors[0].message;
            bidInputStatus.style.opacity = "100";
        }

    } catch(error) {
        console.error(error);
    }
}

confirmBidButton.addEventListener("click", addBid);