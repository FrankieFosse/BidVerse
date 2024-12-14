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
const mediaOverlayForm = document.getElementById("mediaOverlayForm");
const createListingButton = document.getElementById("createListingButton");



// Create new listing function
async function createListing() {
    try {
        if (listingDay.value.length == 1) {
            listingDay.value = "0" + listingDay.value;
        }
        if (listingMonth.value.length == 1) {
            listingMonth.value = "0" + listingMonth.value;
        }
        let tagsCollection = listingTags.value;
        const separatedTagsCollection = tagsCollection.split(" ");

        const response = await fetch(`https://v2.api.noroff.dev/auction/listings`, {
            method: "POST",
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
            createStatus.innerHTML = "Loading..."
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

createListingButton.addEventListener("click", createListing);



// Open and close media overlay
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
}

listingDescription.addEventListener("keyup", updateDescriptionLength);

function updateDescriptionLength() {
    descriptionLength.innerHTML = listingDescription.value.length;
    if (listingDescription.value.length > 280) {
        descriptionLength.classList.add("text-red30");
    }
    if (listingDescription.value.length <= 280) {
        descriptionLength.classList.remove("text-red30");
    }
}







// Add media data to listing
const mediaAmount = document.getElementById("mediaAmount");
const openMediaButton = document.getElementById("openMediaButton");
const removeMediaButton = document.getElementById("removeMediaButton");

let mediaCollection = [];

function myFunction(counter) {

    let mediaDiv = document.createElement("li");
    mediaDiv.id = `mediaElement${counter}`;
    mediaDiv.className = "bg-brown50 p-3 mt-3 text-center w-5/6 md:w-3/5 border-4 border-brown70";

    mediaDiv.innerHTML = `
        <div>
            <p class="flex flex-col justify-center items-center text-gray30 bg-brown30 w-8 h-8 rounded-full">${counter + 1}</p>
        </div>
        <label for="mediaURL${counter}" class="mt-6 text-gray30">Media-URL</label>
        <div class="myURLdiv">
            <textarea id="mediaURL${counter}" placeholder="Required" 
                class="px-2 mb-6 py-1 rounded h-12 w-full outline-none bg-gray30 bg-opacity-85 focus:bg-opacity-100 duration-300 border-2 border-transparent text-gray70 text-sm"></textarea>
        </div>
        <label for="mediaALT${counter}" class="mt-6 text-gray30">Media Alt-text / description</label>
        <input type="text" id="mediaALT${counter}" placeholder="Required" 
            class="px-2 py-1 mb-6 rounded w-full outline-none bg-gray30 bg-opacity-85 focus:bg-opacity-100 duration-300 border-2 border-transparent text-gray70 text-sm">
    `;

    return mediaDiv;
}



// Add media div elements to page
function addMediaToContainer() {
    const counter = mediaCollection.length;
    const newMedia = myFunction(counter);

    mediaCollection.push(newMedia);
    mediaContainer.appendChild(newMedia);

    mediaAmount.innerHTML = mediaCollection.length;

    if (mediaCollection.length === 2 && window.innerWidth > 925) {
        mediaContainer.classList.remove("grid-cols-1");
        mediaContainer.classList.remove("grid-cols-3");
        mediaContainer.classList.add("grid-cols-2");
    }

    if (mediaCollection.length > 2 && window.innerWidth > 1310) {
        mediaContainer.classList.remove("grid-cols-2");
        mediaContainer.classList.add("grid-cols-3");
    }

    if (window.innerWidth < 925) {
        mediaContainer.classList.remove("grid-cols-2");
        mediaContainer.classList.add("grid-cols-1");
    }

    if (window.innerWidth < 1310 && window.innerWidth > 925) {
        mediaContainer.classList.remove("grid-cols-3");
        mediaContainer.classList.add("grid-cols-2");
    }

    // Enable/disable remove button based on collection size
    if (mediaCollection.length === 1) {
        removeMediaButton.setAttribute("disabled", true);
        removeMediaButton.classList.add("bg-opacity-50");
        mediaContainer.classList.remove("grid-cols-2");
        mediaContainer.classList.add("grid-cols-1");
    } else {
        removeMediaButton.removeAttribute("disabled");
        removeMediaButton.classList.remove("bg-opacity-50");
    }
}



// Remove media div elements from page
function removeMediaFromContainer() {
    const lastMedia = mediaCollection.pop();
    if (lastMedia) {
        mediaContainer.removeChild(lastMedia);
    }

    mediaAmount.innerHTML = mediaCollection.length;

    if (mediaCollection.length === 2 && window.innerWidth > 925) {
        mediaContainer.classList.remove("grid-cols-1");
        mediaContainer.classList.remove("grid-cols-3");
        mediaContainer.classList.add("grid-cols-2");
    }

    if (mediaCollection.length > 2 && window.innerWidth > 1310) {
        mediaContainer.classList.remove("grid-cols-2");
        mediaContainer.classList.add("grid-cols-3");
    }

    if (window.innerWidth < 925) {
        mediaContainer.classList.remove("grid-cols-2");
        mediaContainer.classList.add("grid-cols-1");
    }

    if (window.innerWidth < 1310 && window.innerWidth > 925) {
        mediaContainer.classList.remove("grid-cols-3");
        mediaContainer.classList.add("grid-cols-2");
    }

    if (mediaCollection.length === 1) {
        removeMediaButton.setAttribute("disabled", true);
        removeMediaButton.classList.add("bg-opacity-50");
        mediaContainer.classList.remove("grid-cols-2");
        mediaContainer.classList.add("grid-cols-1");
    }
    if (mediaCollection.length > 1) {
        removeMediaButton.removeAttribute("disabled");
        removeMediaButton.classList.remove("bg-opacity-50");
    }
}



// Validate input fields for create listing
function loopElements() {
    let saveURLArray = [];
    let allFieldsValid = true;

    mediaCollection.forEach((mediaElement, index) => {
        const URLInput = mediaElement.querySelector(`#mediaURL${index}`);
        const ALTInput = mediaElement.querySelector(`#mediaALT${index}`);

        const value1 = URLInput.value.trim();
        const value2 = ALTInput.value.trim();

        saveURLArray.push({ url: value1, alt: value2 });

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

// Set up the initial pre-existing media element
const initialMedia = myFunction(0);
mediaCollection.push(initialMedia);
mediaContainer.appendChild(initialMedia);

// Update the media amount after adding the initial element
mediaAmount.innerHTML = mediaCollection.length;

// Disable the remove button initially since there is only one element
removeMediaButton.setAttribute("disabled", true);
removeMediaButton.classList.add("bg-opacity-50");

openMediaButton.addEventListener("click", addMediaToContainer);
removeMediaButton.addEventListener("click", removeMediaFromContainer);
confirmMedia.addEventListener("click", loopElements);