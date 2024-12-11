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

let params = new URL (document.location).searchParams;

let id = params.get("id");

const url = `https://v2.api.noroff.dev/auction/listings/${id}`;

async function fetchListing() {
    try {
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "content-type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                "X-Noroff-API-Key": `178dd2f7-0bd8-4d9b-9ff9-78d8d5ac9bc9`
            }
        });

        const mediaAmount = document.getElementById("mediaAmount");
        const openMediaButton = document.getElementById("openMediaButton");
        const removeMediaButton = document.getElementById("removeMediaButton");

        const responseData = await response.json();
        console.log(responseData.data);
        listingTitle.value = responseData.data.title;
        listingDescription.value = responseData.data.description;
        listingTags.value = responseData.data.tags;
        listingDay.value = responseData.data.endsAt.slice(8, 10);
        listingMonth.value = responseData.data.endsAt.slice(5, 7);
        listingYear.value = responseData.data.endsAt.slice(0, 4);
        mediaAmountStatus.innerHTML = responseData.data.media.length + " media element(s) added";

        let mediaCollection = []; // Store DOM element references
        const initialMedia = myFunction(0);
        mediaCollection = responseData.data.media;
        mediaContainer.appendChild(initialMedia);

// Update the media amount after adding the initial element
mediaAmount.innerHTML = mediaCollection.length;

// Disable the remove button initially since there's only one element
removeMediaButton.setAttribute("disabled", true);
removeMediaButton.classList.add("bg-opacity-50");

// Event listeners
openMediaButton.addEventListener("click", addMediaToContainer);
removeMediaButton.addEventListener("click", removeMediaFromContainer);
confirmMedia.addEventListener("click", loopElements);

        let counter = responseData.data.media.length;
        console.log(counter);
        
        function myFunction(counter) {
            // Create a new <li> element
            let mediaDiv = document.createElement("li");
            mediaDiv.id = `mediaElement${counter}`;
            mediaDiv.className = "bg-brown50 p-3 mt-3 mx-6 text-center w-4/5";
        
            // Set its inner HTML
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

        function addMediaToContainer() {
            const counter = mediaCollection.length;
            const newMedia = myFunction(counter);
        
            mediaCollection.push(newMedia); // Store the actual DOM node in the array
            mediaContainer.appendChild(newMedia);
        
            mediaAmount.innerHTML = mediaCollection.length;
        
            // Enable/disable remove button based on collection size
            if (mediaCollection.length === 1) {
                removeMediaButton.setAttribute("disabled", true);
                removeMediaButton.classList.add("bg-opacity-50");
            } else {
                removeMediaButton.removeAttribute("disabled");
                removeMediaButton.classList.remove("bg-opacity-50");
            }
        }
        
        function removeMediaFromContainer() {
            const lastMedia = mediaCollection.pop(); // Remove the last DOM element from the array
            if (lastMedia) {
                mediaContainer.removeChild(lastMedia); // Remove from the DOM
            }
        
            mediaAmount.innerHTML = mediaCollection.length;
        
            if (mediaCollection.length === 1) {
                removeMediaButton.setAttribute("disabled", true);
                removeMediaButton.classList.add("bg-opacity-50");
            }
            if (mediaCollection.length > 1) {
                removeMediaButton.removeAttribute("disabled");
                removeMediaButton.classList.remove("bg-opacity-50");
            }
        }
        
        
        function loopElements() {
            let saveURLArray = [];
            let allFieldsValid = true;
        
            // Iterate over the DOM elements stored in mediaCollection
            mediaCollection.forEach((mediaElement, index) => {
                const URLInput = mediaElement.querySelector(`#mediaURL${index}`);
                const ALTInput = mediaElement.querySelector(`#mediaALT${index}`);
        
                const value1 = URLInput.value.trim();
                const value2 = ALTInput.value.trim();
        
                saveURLArray.push({ url: value1, alt: value2 });
        
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
        }
        
        
        



    } catch(error) {
        console.error(error);
    }
};

fetchListing();

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










