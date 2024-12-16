import { listItem, listNothing } from "./utils.js";

let homeOutput = document.getElementById("homeOutput");
const search = document.getElementById("search");
let api = `https://v2.api.noroff.dev/auction/listings?_active=true&_seller=true`;
let collection = [];
const searchButton = document.getElementById("searchButton");
const sortBy = document.getElementById("sortBy");
const cancelSearchButton = document.getElementById("cancelSearchButton");

// Fetch and display elements from API
async function fetchListings() {
    try {
        const response = await fetch(api);
        if (!response.ok) {
            throw new Error("Could not fetch data");
        }
        const responseData = await response.json();

        // Sort data by title
        const sortedDataByTitle = [...responseData.data].sort((a, b) => {
            if (a.title.toLowerCase() < b.title.toLowerCase()) return -1;
            if (a.title.toLowerCase() > b.title.toLowerCase()) return 1;
            return 0;
        });

        // Sort data by creation date
        const sortedDataByDate = [...responseData.data].sort((a, b) => {
            return new Date(b.created) - new Date(a.created);
        });

        // Sort data by deadline date
        const sortedDataByDeadline = [...responseData.data].sort((a, b) => {
            return new Date(a.endsAt) - new Date(b.endsAt);
        });

        const sortedDataBySeller = [...responseData.data].sort((a, b) => {
            const sellerA = a.seller.name.toLowerCase();
            const sellerB = b.seller.name.toLowerCase();
            if (sellerA < sellerB) return -1;
            if (sellerA > sellerB) return 1;
            return 0;
        });

        collection = [...sortedDataByTitle];
        listItem(collection, homeOutput);

        // Sorting functionality
        sortBy.addEventListener("change", () => {
            if (sortBy.value === "latest") {
                collection = [...sortedDataByDate];
            } else if (sortBy.value === "title") {
                collection = [...sortedDataByTitle];
            } else if (sortBy.value === "deadline") {
                collection = [...sortedDataByDeadline];
            } else if (sortBy.value === "seller") {
                collection = [...sortedDataBySeller];
            }
            listItem(collection, homeOutput);
        });
    } catch (error) {
        console.error(error);
    }
}

fetchListings();

search.addEventListener("keyup", function (event) {
    cancelSearchButton.style.display = "flex";
    if (event.key === "Enter") {
        fetchSearchListings();
    }
});

// Search functionality
async function fetchSearchListings() {
    try {
        let query = search.value;
        if (query == "") {
            resetView();
            fetchListings();
        } else {
            let searchApi = `https://v2.api.noroff.dev/auction/listings/search?q=${query}&_seller=true`;
            const response = await fetch(searchApi);
            if (!response.ok) {
                throw new Error("Could not fetch search data");
            }
            const responseData = await response.json();

            if (responseData.data.length == 0) {
                applyNoResultsStyles();
                collection = [1];
                listNothing(collection, homeOutput);
            } else {
                applyGridStyles();

                // Sorting search results
                const sortedSearchByTitle = [...responseData.data].sort((a, b) => {
                    if (a.title.toLowerCase() < b.title.toLowerCase()) return -1;
                    if (a.title.toLowerCase() > b.title.toLowerCase()) return 1;
                    return 0;
                });

                const sortedSearchByDate = [...responseData.data].sort((a, b) => {
                    return new Date(b.created) - new Date(a.created);
                });

                const sortedSearchByDeadline = [...responseData.data].sort((a, b) => {
                    return new Date(a.endsAt) - new Date(b.endsAt);
                });

                const sortedSearchBySeller = [...responseData.data].sort((a, b) => {
                    const sellerA = a.seller.name.toLowerCase();
                    const sellerB = b.seller.name.toLowerCase();
                    if (sellerA < sellerB) return -1;
                    if (sellerA > sellerB) return 1;
                    return 0;
                });

                // Default sort for search results
                collection = [...sortedSearchByTitle];
                listItem(collection, homeOutput);

                // Sorting functionality for search results
                sortBy.addEventListener("change", () => {
                    if (sortBy.value === "latest") {
                        collection = [...sortedSearchByDate];
                    } else if (sortBy.value === "title") {
                        collection = [...sortedSearchByTitle];
                    } else if (sortBy.value === "deadline") {
                        collection = [...sortedSearchByDeadline];
                    } else if (sortBy.value === "seller") {
                        collection = [...sortedSearchBySeller];
                    }
                    listItem(collection, homeOutput);
                });
            }
        }
    } catch (error) {
        console.error(error);
    }
}

searchButton.addEventListener("click", fetchSearchListings);

// Modify search button for mobile view
if (window.innerWidth < 500) {
    searchButton.innerHTML = `<i class="fa-solid fa-magnifying-glass"></i>`;
}

// Cancel search functionality
cancelSearchButton.addEventListener("click", removeSearchInput);

function removeSearchInput() {
    search.value = "";
    cancelSearchButton.style.display = "none";

    resetView();
    fetchListings();
}

// Function to reset the view to grid
function resetView() {
    homeOutput.classList.add("grid");
    homeOutput.classList.remove("flex");
    homeOutput.classList.remove("flex-col");
    homeOutput.classList.remove("items-center");
}

// Function to apply "no results" styles
function applyNoResultsStyles() {
    homeOutput.classList.remove("grid");
    homeOutput.classList.add("flex");
    homeOutput.classList.add("flex-col");
    homeOutput.classList.add("items-center");
}

// Function to apply grid styles
function applyGridStyles() {
    homeOutput.classList.add("grid");
    homeOutput.classList.remove("flex");
    homeOutput.classList.remove("flex-col");
    homeOutput.classList.remove("items-center");
}



// Remove page loader when page is loaded
function removePageLoader() {
    pageLoader.style.display = "none";
}

window.addEventListener("load", removePageLoader);