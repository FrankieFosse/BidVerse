

// Crate new Listing function

const listingTitle = document.getElementById("title");
const listingDescription = document.getElementById("description");
const listingTags = document.getElementById("tags");
const listingMediaURL = document.getElementById("mediaURL");
const listingMediaURL2 = document.getElementById("mediaURL2");
const listingMediaURL3 = document.getElementById("mediaURL3");
const listingMediaALT = document.getElementById("mediaALT");
const listingMediaALT2 = document.getElementById("mediaALT2");
const listingMediaALT3 = document.getElementById("mediaALT3");
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
const anotherMediaButton2 = document.getElementById("anotherMediaButton2");
const confirmMedia = document.getElementById("confirmMedia");
const filledMediaURL1 = document.getElementById("filledMediaURL1");
const filledMediaURL2 = document.getElementById("filledMediaURL2");
const filledMediaURL3 = document.getElementById("filledMediaURL3");
const filledMediaALT1 = document.getElementById("filledMediaALT1");
const filledMediaALT2 = document.getElementById("filledMediaALT2");
const filledMediaALT3 = document.getElementById("filledMediaALT3");
const mediaElement2 = document.getElementById("mediaElement2");
const mediaElement3 = document.getElementById("mediaElement3");
const closeMediaElement2 = document.getElementById("closeMediaElement2");
const closeMediaElement3 = document.getElementById("closeMediaElement3");

const mediaURLInput = [filledMediaURL1, filledMediaURL2, filledMediaURL3];
const mediaALTInput = [filledMediaALT1, filledMediaALT2, filledMediaALT3];

async function createListing() {
    try {
        const response = await fetch(`https://v2.api.noroff.dev/auction/listings`, {
            method: "POST",
            body: JSON.stringify({
                title: listingTitle.value,
                description: listingDescription.value,
                tags: [listingTags.value],
                media: [{
                    url: filledMediaURL1.value,
                    alt: filledMediaALT1.value
                },
                  {  url: filledMediaURL2.value,
                    alt: filledMediaALT2.value
                },
                        {  url: filledMediaURL3.value,
                            alt: filledMediaALT3.value }
            ],
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




addMediaButton.addEventListener("click", openMediaOverlay);
cancelMedia.addEventListener("click", closeMediaOverlay);
cancelMedia2.addEventListener("click", closeMediaOverlay);

function openMediaOverlay() {
    mediaOverlay.style.display = "flex";
}

function closeMediaOverlay() {
    mediaOverlay.style.display = "none";
}

anotherMediaButton.addEventListener("click", newMediaElement);

function newMediaElement() {
    mediaElement2.style.display = "block";
    anotherMediaButton.style.display = "none";
    anotherMediaButton2.style.display = "flex";
}

anotherMediaButton2.addEventListener("click", newMediaElement2);

function newMediaElement2() {
    mediaElement3.style.display = "block";
    anotherMediaButton2.style.display = "none";
    closeMediaElement2.style.display = "none";
}

closeMediaElement2.addEventListener("click", removeMediaElement2);
closeMediaElement3.addEventListener("click", removeMediaElement3);

function removeMediaElement2() {
    mediaElement2.style.display = "none";
    anotherMediaButton2.style.display = "none";
    anotherMediaButton.style.display = "flex";
}

function removeMediaElement3() {
    mediaElement3.style.display = "none";
    anotherMediaButton2.style.display = "flex";
    closeMediaElement2.style.display = "flex";
}



confirmMedia.addEventListener("click", changeValue)

function changeValue() {
    if (listingMediaURL.value) {
    filledMediaURL1.value = listingMediaURL.value;
    filledMediaURL1.style.display = "flex";
    mediaOverlay.style.display = "none";
    addMediaButton.innerHTML = `
    <i class="fa-solid fa-pen-to-square mr-2"></i>
    <p>Edit media</p>
    `
    }
    if (listingMediaURL2.value) {
    filledMediaURL2.value = listingMediaURL2.value;
    filledMediaURL2.style.display = "flex";
    }
    if (listingMediaURL2.value) {
        filledMediaURL3.value = listingMediaURL3.value;
        filledMediaURL3.style.display = "flex";
    }
    if (listingMediaALT.value) {
        filledMediaALT1.value = listingMediaALT.value;
        filledMediaALT1.style.display = "flex";
    }
    if (listingMediaALT2.value) {
        filledMediaALT2.value = listingMediaALT2.value;
        filledMediaALT2.style.display = "flex";
    }
    if (listingMediaALT3.value) {
        filledMediaALT3.value = listingMediaALT3.value;
        filledMediaALT3.style.display = "flex";
    }
}
