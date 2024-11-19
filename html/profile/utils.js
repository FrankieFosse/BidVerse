export const listPostTemplate = (post) => {
    return `<a href="/dist/feed/details.html?id=${post.id}" class="bg-gray-700 bg-opacity-50 hover:bg-gray-500 hover:scale-105 duration-150 text-center w-full h-80 rounded">
            <div id="postElement" class="flex flex-col justify-center items-center">
            <h1 class="text-gray-100 w-4/5 overflow-hidden my-2">${post.title}</h1>
            <img class="h-48 w-4/5 object-contain" id="postImage" src=${post.media?.url ? post.media?.url : "../../images/image-placeholder-500x500.jpg"}>
            </div>
            </a>`;
}

export function listData(list, out) {
    out.innerHTML = "";
    let output = "";
    for (let item of list) {
        output += `${listPostTemplate(item)}`
    }
    if (output) {
        out.innerHTML = output;
    }
}

export const listFollowersTemplate = (follower) => {
    return `
    <ul class="flex flex-col justify-center items-center">
    <li class="text-gray-100 bg-blue-600 saturate-50 px-5 py-1 w-3/5 my-1 rounded-full">${follower}</li>
    </ul>
    `;
}

export function listFollower(list, followerList) {
    followerList.innerHTML = "";
    let output = "";
    for (let item of list) {
        output += `${listFollowersTemplate(item)}`
    }
    if (output) {
        followerList.innerHTML = output;
    }
}