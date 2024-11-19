export const homeOutput = document.getElementById("homeOutput")

export const listItemTemplate = (listing) => {
    return `<a href="details.html?id=${listing.id}" class="bg-gray-700 bg-opacity-50 hover:bg-gray-500 hover:scale-105 duration-150 text-center w-4/5 sm:w-full h-72 md:h-80 rounded">
            <div id="postElement" class="flex flex-col justify-center items-center">
            <h1>${listing.title}</h1>
            <img src=${listing.media?.url ? listing.media?.url : "../../images/image-placeholder-500x500.jpg"}>
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