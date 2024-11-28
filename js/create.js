

// Crate new Listing function

const listingTitle = document.getElementById("title");
const listingDescription = document.getElementById("description");
const listingTags = document.getElementById("tags");
const listingMediaURL = document.getElementById("mediaURL");
const listingMediaALT = document.getElementById("mediaALT");
const createStatus = document.getElementById("createStatus");
const listingDay = document.getElementById("day");
const listingMonth = document.getElementById("month");
const listingYear = document.getElementById("year");

listingDay.addEventListener("keyup", consoleLog);
listingMonth.addEventListener("keyup", consoleLog);
listingYear.addEventListener("keyup", consoleLog);

function consoleLog() {
console.log(listingYear.value + "-" + listingMonth.value + "-" + listingDay.value + "T00:00:00:000Z")
}

async function createListing() {
    try {
        const response = await fetch(`https://v2.api.noroff.dev/auction/listings`, {
            method: "POST",
            body: JSON.stringify({
                title: listingTitle.value,
                endsAt: listingYear.value + "-" + listingMonth.value + "-" + listingDay.value + "T00:00:00.000Z"
            }),
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                "X-Noroff-API-Key": `178dd2f7-0bd8-4d9b-9ff9-78d8d5ac9bc9`
            }
        })
        const responseData = await response.json();
        console.log(responseData);

        if(response.ok) {
            createStatus.innerHTML = "Listing created"
            createStatus.style.opacity = "100";
        }
        else {
            createStatus.innerHTML = "Something went wrong."
            createStatus.style.opacity = "100";
        }

    } catch(error) {
        console.error(error);
    }
}

const createListingButton = document.getElementById("createListingButton");

createListingButton.addEventListener("click", createListing);