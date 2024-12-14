
// Display listings created by this profile
export const listItemTemplate = (listing) => {
    let imagesOutput = listing.media.map(listing => {
        return `
        <img class="max-h-40 object-cover" src=${listing.url}>
        `
    }).slice(0, 1);
    if (imagesOutput.length == 0) {
        imagesOutput = `
        <img src="/images/image-placeholder-500x500.jpg">
        `
    }
return `<a href="/html/details.html?id=${listing.id}" class="bg-blue50 hover:scale-105 hover:bg-blue30 duration-300">
        <div id="postElement" class="flex flex-col items-center justify-center">
        <h2 class="flex flex-col justify-center text-gray30 h-16 text-center m-4 text-ellipsis whitespace-nowrap overflow-hidden w-4/5">${listing.title.slice(0, 400)}</h2>
        <div class="w-full flex flex-col items-center mb-1 px-1">${imagesOutput}</div>
        </div>
        </a>`;
}

export function listData(list, out) {
    out.innerHTML = "";
    let output = "";
    for (let item of list) {
        output += `${listItemTemplate(item)}`
    }
    if (output) {
        out.innerHTML = output;
    }
}