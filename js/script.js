import { listItem, listNothing } from "./utils.js";

let homeOutput = document.getElementById("homeOutput");
let params = new URL(document.location).searchParams;
const search = document.getElementById("search");
let api = `https://v2.api.noroff.dev/auction/listings?_active=true`;
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

        // Sort data by title (default)
        const sortedDataByTitle = [...responseData.data].sort((a, b) => {
            if (a.title.toLowerCase() < b.title.toLowerCase()) return -1;
            if (a.title.toLowerCase() > b.title.toLowerCase()) return 1;
            return 0;
        });

        // Sort data by creation date
        const sortedDataByDate = [...responseData.data].sort((a, b) => {
            return new Date(b.created) - new Date(a.created);
        });

        collection = [...sortedDataByTitle];
        listItem(collection, homeOutput);

        // Sorting functionality
        sortBy.addEventListener("change", () => {
            if (sortBy.value === "latest") {
                collection = [...sortedDataByDate];
            } else if (sortBy.value === "title") {
                collection = [...sortedDataByTitle];
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
            let searchApi = `https://v2.api.noroff.dev/auction/listings/search?q=${query}`;
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

                // Default sort for search results
                collection = [...sortedSearchByTitle];
                listItem(collection, homeOutput);

                // Sorting functionality for search results
                sortBy.addEventListener("change", () => {
                    if (sortBy.value === "latest") {
                        collection = [...sortedSearchByDate];
                    } else if (sortBy.value === "title") {
                        collection = [...sortedSearchByTitle];
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
    search.value = ""; // Clear search input
    cancelSearchButton.style.display = "none"; // Hide the cancel button

    resetView(); // Reset classList changes
    fetchListings(); // Reset and display the full collection
}

// Helper function to reset the view to grid
function resetView() {
    homeOutput.classList.add("grid");
    homeOutput.classList.remove("flex");
    homeOutput.classList.remove("flex-col");
    homeOutput.classList.remove("items-center");
}

// Helper function to apply "no results" styles
function applyNoResultsStyles() {
    homeOutput.classList.remove("grid");
    homeOutput.classList.add("flex");
    homeOutput.classList.add("flex-col");
    homeOutput.classList.add("items-center");
}

// Helper function to apply grid styles
function applyGridStyles() {
    homeOutput.classList.add("grid");
    homeOutput.classList.remove("flex");
    homeOutput.classList.remove("flex-col");
    homeOutput.classList.remove("items-center");
}
