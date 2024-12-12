

// Crate new Listing function

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
        console.log(responseData);

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

const createListingButton = document.getElementById("createListingButton");


createListingButton.addEventListener("click", createListing);




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





// Newest Function


const mediaAmount = document.getElementById("mediaAmount");
const openMediaButton = document.getElementById("openMediaButton");
const removeMediaButton = document.getElementById("removeMediaButton");

let mediaCollection = []; // Store DOM element references

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

// Disable the remove button initially since there's only one element
removeMediaButton.setAttribute("disabled", true);
removeMediaButton.classList.add("bg-opacity-50");

// Event listeners
openMediaButton.addEventListener("click", addMediaToContainer);
removeMediaButton.addEventListener("click", removeMediaFromContainer);
confirmMedia.addEventListener("click", loopElements);









/*

// Add media function

const mediaAmount = document.getElementById("mediaAmount");
const openMediaButton = document.getElementById("openMediaButton");
const removeMediaButton = document.getElementById("removeMediaButton");

let mediaCollection = [];

function myFunction() {
    const counter = mediaCollection.length;
    
    let mediaDiv = `
    <li id="mediaElement${counter}" class="bg-brown50 p-3 mt-3 mx-6 text-center w-4/5">
    <div>
    <p class="flex flex-col justify-center items-center text-gray30 bg-brown30 w-8 h-8 rounded-full">${counter+1}</p>
    </div>
        <label for="mediaURL" class="mt-6 text-gray30">Media-URL</label>
        <div class="myURLdiv"><textarea id="mediaURL${counter}" placeholder="Required" class="px-2 mb-6 py-1 rounded h-12 w-full outline-none bg-gray30 bg-opacity-85 focus:bg-opacity-100 duration-300"></textarea></div>
        <label for="mediaALT" class="mt-6 text-gray30">Media Alt-text / description</label>
        <input type="text" id="mediaALT${counter}" placeholder="Required" class="px-2 py-1 mb-6 rounded w-full outline-none bg-gray30 bg-opacity-85 focus:bg-opacity-100 duration-300">
    </li>
`
return mediaDiv;

}

mediaContainer.innerHTML = mediaCollection.join("");
mediaAmount.innerHTML = mediaCollection.length;

function addMediaToContainer() {
    const newMedia = myFunction();
    mediaCollection.push(newMedia);

    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = newMedia;
    const newElement = tempDiv.firstElementChild;
    mediaContainer.appendChild(newElement);
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

mediaCollection.push(myFunction());
mediaContainer.innerHTML = mediaCollection;
mediaAmount.innerHTML = mediaCollection.length;


openMediaButton.addEventListener("click", addMediaToContainer);
removeMediaButton.addEventListener("click", removeMediaFromContainer);




function removeMediaFromContainer() {

    mediaCollection.pop();

    const lastChild = mediaContainer.lastElementChild;
    if (lastChild) {
        mediaContainer.removeChild(lastChild);
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
    for(let i = 0; i<mediaCollection.length; i++) {
        let URLelementid = "mediaURL"+(i);
        let ALTelementid = "mediaALT"+(i);

        let URLInput = document.getElementById(URLelementid);
        let ALTInput = document.getElementById(ALTelementid);

        if(URLInput && ALTInput) {
            let value1 = URLInput.value.trim();
            let value2 = ALTInput.value.trim();

            saveURLArray.push({url: value1, alt: value2});

            if(!value1 || !value2) {
                allFieldsValid = false;
                confirmMediaStatus.style.opacity = "100";
                confirmMediaStatus.innerHTML = !value1 ? "Please provide a URL" : "Please provide Alt-text";
            }
            if(value1 == "" || value2 == "") {
                console.log("NOT OK");
            } else {
                console.log("OK");
            }


        }

    }
addMediaButton.innerHTML = `<i class="fa-solid fa-pen-to-square mr-2"></i><p>Media</p>`

listingMediaURL = saveURLArray;

}

confirmMedia.addEventListener("click", loopElements);









/*
function addMediaToContainer() {
    mediaCollection.push(myFunction());
    mediaContainer.innerHTML = mediaCollection;
    mediaAmount.innerHTML = mediaCollection.length;

    if (mediaCollection.length === 1) {
        removeMediaButton.setAttribute("disabled", true);
        removeMediaButton.classList.add("bg-opacity-50");
    }
    if (mediaCollection.length > 1) {
        removeMediaButton.removeAttribute("disabled");
        removeMediaButton.classList.remove("bg-opacity-50");
    }
} */

/*function addMediaToContainer() {
    mediaCollection.push(myFunction());
    mediaContainer.innerHTML = mediaCollection;
    mediaAmount.innerHTML = mediaCollection.length;

    if (mediaCollection.length === 1) {
        removeMediaButton.setAttribute("disabled", true);
        removeMediaButton.classList.add("bg-opacity-50");
    }
    if (mediaCollection.length > 1) {
        removeMediaButton.removeAttribute("disabled");
        removeMediaButton.classList.remove("bg-opacity-50");
    }
}*/






