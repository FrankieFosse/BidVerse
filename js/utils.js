export const homeOutput = document.getElementById("homeOutput")

export const listItemTemplate = (listing) => {
    return `<a href="details.html?id=${listing.id}" class="bg-blue50 bg-opacity-50 hover:bg-blue30 hover:scale-105 duration-150 text-center w-full sm:w-full h-72 md:h-80 rounded text-gray30">
            <div id="postElement" class="flex flex-col justify-center items-center">
            <h1>${listing.title}</h1>
            <img class="w-full" src=${listing.media?.url ? listing.media?.url : "../../images/image-placeholder-500x500.jpg"}>
            </div>
            </a>`;
}

export function listItem(list, out) {
    out.innerHTML = "";
    let output = "";
    for (let item of list) {
        output += `${listItemTemplate(item)}`
    }
    if (output) {
        out.innerHTML = output;
    } else {
    }
}