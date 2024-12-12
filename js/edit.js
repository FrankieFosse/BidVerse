const listingTitle = document.getElementById("title");
const listingDescription = document.getElementById("description");
const listingTags = document.getElementById("tags");
let listingMediaURL = [];
let listingMediaALT = [];
const createStatus = document.getElementById("createStatus");
const listingDay = document.getElementById("day");
const listingMonth = document.getElementById("month");
const listingYear = document.getElementById("year");
const mediaOverlay = document.getElementById("mediaOverlay");
const addMediaButton = document.getElementById("addMediaButton");
const cancelMedia = document.getElementById("cancelMedia");
const cancelMedia2 = document.getElementById("cancelMedia2");
const mediaList = document.getElementById("mediaList");
const anotherMediaButton = document.getElementById("anotherMediaButton");
const confirmMedia = document.getElementById("confirmMedia");
const mediaContainer = document.getElementById("mediaContainer");
const confirmMediaStatus = document.getElementById("confirmMediaStatus");
const mediaAmountStatus = document.getElementById("mediaAmountStatus");
const overlayBlur = document.getElementById("overlayBlur");
const descriptionLength = document.getElementById("descriptionLength");
const removeAllMediaButton = document.getElementById("removeAllMediaButton");
let tagsCollection = "";

let params = new URL (document.location).searchParams;

let id = params.get("id");

const url = `https://v2.api.noroff.dev/auction/listings/${id}`;

let mediaCollection = [];
let saveURLArray = [];

async function fetchListings() {
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
        listingTitle.value = responseData.data.title;
        listingDescription.value = responseData.data.description;
        tagsCollection = responseData.data.tags.join(" ");
        let separatedTagsCollection = tagsCollection;
        console.log(separatedTagsCollection);
        listingTags.value = separatedTagsCollection;
        listingDay.value = responseData.data.endsAt.slice(8, 10);
        listingMonth.value = responseData.data.endsAt.slice(5, 7);
        listingYear.value = responseData.data.endsAt.slice(0, 4);
        listingMediaURL = responseData.data.media;
        mediaAmountStatus.innerHTML = responseData.data.media.length + " media element(s) added";
        saveURLArray = responseData.data.media;
    } catch(error) {
        console.error(error);
    }
}

fetchListings();

async function fetchMediaData() {
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
        return responseData.data.media;
    } catch(error) {
        console.error(error);
    }
}

fetchMediaData();

function myFunction(counter, defaultURL = "", defaultAlt = "") {
    // Create a new <li> element
    let mediaDiv = document.createElement("li");
    mediaDiv.id = `mediaElement${counter}`;
    mediaDiv.className = "bg-brown50 p-3 mt-3 mx-6 text-center w-4/5";

    // Set its inner HTML with default values
    mediaDiv.innerHTML = `
        <div>
            <p class="flex flex-col justify-center items-center text-gray30 bg-brown30 w-8 h-8 rounded-full">${counter + 1}</p>
        </div>
        <label for="mediaURL${counter}" class="mt-6 text-gray30">Media-URL</label>
        <div class="myURLdiv">
            <textarea id="mediaURL${counter}" placeholder="Required" 
                class="px-2 mb-6 py-1 rounded h-12 w-full outline-none bg-gray30 bg-opacity-85 focus:bg-opacity-100 duration-300 border-2 border-transparent text-gray70 text-sm">${defaultURL}</textarea>
        </div>
        <label for="mediaALT${counter}" class="mt-6 text-gray30">Media Alt-text / description</label>
        <input type="text" id="mediaALT${counter}" placeholder="Required" 
            class="px-2 py-1 mb-6 rounded w-full outline-none bg-gray30 bg-opacity-85 focus:bg-opacity-100 duration-300 border-2 border-transparent text-gray70 text-sm" value="${defaultAlt}">
    `;

    return mediaDiv;
}

async function initializeMedia() {
    const mediaData = await fetchMediaData();

    if (!Array.isArray(mediaData)) {
        throw new Error("API response is not an array");
    }

    saveURLArray = mediaData.map((item) => ({
        url: item.url,
        alt: item.alt,
    }));

    mediaData.forEach((data, index) => {
        const mediaElement = myFunction(index, data.url, data.alt);
        mediaCollection.push(mediaElement);
        mediaContainer.appendChild(mediaElement);
    });

    // Update the media amount after adding elements
    mediaAmount.innerHTML = mediaCollection.length;

    // Disable the remove button if there's only one element
    if (mediaCollection.length === 1) {
        removeMediaButton.setAttribute("disabled", true);
        removeMediaButton.classList.add("bg-opacity-50");
    } else {
        removeMediaButton.removeAttribute("disabled");
        removeMediaButton.classList.remove("bg-opacity-50");
    }
}

// Add new media element dynamically
function addMediaToContainer() {
    const counter = mediaCollection.length;
    const newMedia = myFunction(counter);

    mediaCollection.push(newMedia);
    mediaContainer.appendChild(newMedia);

    mediaAmount.innerHTML = mediaCollection.length;

    // Enable remove button if more than one media exists
    if (mediaCollection.length > 1) {
        removeMediaButton.removeAttribute("disabled");
        removeMediaButton.classList.remove("bg-opacity-50");
    }
}

function removeMediaFromContainer() {
    // Check if there are any media elements to remove
    if (mediaCollection.length > 0) {
        // Remove the last media element from the DOM
        const lastMedia = mediaCollection.pop();
        if (lastMedia) {
            mediaContainer.removeChild(lastMedia);
        }

        // Remove the last entry from saveURLArray
        saveURLArray.pop();

        // Update the media amount status
        mediaAmount.innerHTML = mediaCollection.length;

        // Disable the remove button if only one media remains
        if (mediaCollection.length === 1) {
            removeMediaButton.setAttribute("disabled", true);
            removeMediaButton.classList.add("bg-opacity-50");
        } else {
            removeMediaButton.removeAttribute("disabled");
            removeMediaButton.classList.remove("bg-opacity-50");
        }
    }
}


function loopElements() {

    let allFieldsValid = true;



    // Iterate over the DOM elements stored in mediaCollection
    mediaCollection.forEach((mediaElement, index) => {
        const URLInput = mediaElement.querySelector(`#mediaURL${index}`);
        const ALTInput = mediaElement.querySelector(`#mediaALT${index}`);

        const value1 = URLInput.value.trim();
        const value2 = ALTInput.value.trim();

        const isDuplicate = saveURLArray.some(
            (item) => item.url === value1 && item.alt === value2
        );

        if (!isDuplicate) {
            saveURLArray.push({ url: value1, alt: value2 });
        }

        // Validate fields
        if (!value1 || !value2) {
            allFieldsValid = false;

            // Set error message and highlight invalid fields
            confirmMediaStatus.style.opacity = "100";
            confirmMediaStatus.innerHTML = !value1
                ? "Please provide a URL"
                : "Please provide Alt-text";

            URLInput.style.border = !value1 ? "2px solid red" : "";
            ALTInput.style.border = !value2 ? "2px solid red" : "";
        } else {
            // Reset styles for valid fields
            URLInput.style.border = "";
            ALTInput.style.border = "";
        }
    });

    // Update UI after validation
    addMediaButton.innerHTML = `<i class="fa-solid fa-pen-to-square mr-2"></i><p>Media</p>`;
    listingMediaURL = saveURLArray;

    // Hide confirmation message if all fields are valid
    if (allFieldsValid) {
        confirmMediaStatus.style.opacity = "0";
        confirmMediaStatus.innerHTML = "";
        mediaOverlay.style.display = "none";
        overlayBlur.style.display = "none";
        mediaAmountStatus.style.display = "flex";
        mediaAmountStatus.innerHTML = mediaCollection.length + " media element(s) added";
    }
}

// Initialize the media container with data from the API
initializeMedia();

// Event listeners
openMediaButton.addEventListener("click", addMediaToContainer);
removeMediaButton.addEventListener("click", removeMediaFromContainer);
confirmMedia.addEventListener("click", loopElements);

addMediaButton.addEventListener("click", openMediaOverlay);
cancelMedia.addEventListener("click", closeMediaOverlay);
cancelMedia2.addEventListener("click", closeMediaOverlay);

function openMediaOverlay() {
    mediaOverlay.style.display = "flex";
    overlayBlur.style.display = "flex";
}

function closeMediaOverlay() {
    mediaOverlay.style.display = "none";
    confirmMediaStatus.style.opacity = "0";
    overlayBlur.style.display = "none";
    location.reload();
}



async function updateListing() {
    try {
        if (listingDay.value.length == 1) {
            listingDay.value = "0" + listingDay.value;
        }
        if (listingMonth.value.length == 1) {
            listingMonth.value = "0" + listingMonth.value;
        }
        tagsCollection = listingTags.value;
        let separatedTagsCollection = tagsCollection.split(" ");
        const response = await fetch(url, {
            method: "PUT",
            body: JSON.stringify({
                title: listingTitle.value,
                description: listingDescription.value,
                tags: separatedTagsCollection,
                media: listingMediaURL, listingMediaALT
                ,
                endsAt: listingYear.value + "-" + listingMonth.value + "-" + listingDay.value + "T00:00:00.000Z"
            }),
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                "X-Noroff-API-Key": `178dd2f7-0bd8-4d9b-9ff9-78d8d5ac9bc9`
            }
        })
        const responseData = await response.json();

        if(response.ok) {
            createStatus.innerHTML = "Updating..."
            createStatus.style.opacity = "100";
            let id = responseData.data.id;
            setTimeout(() => {
                    window.location.href = `details.html?id=${id}`;
            }, 1000);

        }
        else {
            createStatus.innerHTML = responseData.errors[0].message;
            createStatus.style.opacity = "100";
        }
        if(responseData.errors[0].code == "too_small") {
            createStatus.style.opacity = "100";
            createStatus.innerHTML = responseData.errors[0].message;
        }
        if(responseData.errors[0].message == "endsAt cannot be past date or more than one year from now") {
            createStatus.style.opacity = "100";
            createStatus.innerHTML = "Ending date cannot be past date or more than one year from now"
        }
        if(responseData.errors[0].message == "Image URL must be valid URL") {
            createStatus.innerHTML = "Image " + (responseData.errors[0].path[1]+1) + " - " + responseData.errors[0].message;
            createStatus.style.opacity = "100";
        }
        


    } catch(error) {
        console.error(error);
    }
}

const updateListingButton = document.getElementById("updateListingButton");

updateListingButton.addEventListener("click", updateListing);



removeAllMediaButton.addEventListener("click", () => {
    // Clear mediaContainer (UI elements)
    mediaContainer.innerHTML = "";

    // Clear mediaCollection and saveURLArray
    mediaCollection = [];
    saveURLArray = [];

    // Update mediaAmountStatus to reflect the removal
    mediaAmountStatus.style.display = "none";
    mediaAmount.innerHTML = "0";
    removeMediaButton.setAttribute("disabled", true);
    removeMediaButton.classList.add("bg-opacity-50");

    // Optionally, reset listingMediaURL and listingMediaALT
    listingMediaURL = [];
    listingMediaALT = [];

    console.log("All media elements removed:", listingMediaURL, listingMediaALT);
});







