const avatarURL = document.getElementById("avatarURL");
const avatarALT = document.getElementById("avatarALT");
const avatarStatus = document.getElementById("avatarStatus");
const confirmAvatarButton = document.getElementById("confirmAvatarButton");
const avatarFeedback = document.getElementById("avatarFeedback");
const avatarOverlay = document.getElementById("avatarOverlay")
const avatarFeedbackOverlay = document.getElementById("avatarFeedbackOverlay");

let params = new URL (document.location).searchParams;

let name = params.get("name");
const url = `https://v2.api.noroff.dev/auction/profiles/${name}`;

async function updateAvatar() {
    try {
        const response = await fetch(url, {
            method: "PUT",
            body: JSON.stringify({
                avatar: {
                    url: avatarURL.value.trim(),
                    alt: avatarALT.value
                }
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
            avatarOverlay.style.display = "none";
            avatarFeedbackOverlay.style.display = "block";
            avatarFeedback.innerHTML = "Updating avatar...";
            setTimeout(() => {
                avatarFeedback.style.opacity = "100";
            }, 300);
 ;
            setTimeout(() => {
                location.reload();
            }, 2000);
        }
        else {
            avatarStatus.style.opacity = "100";
            avatarStatus.innerHTML = responseData.errors[0].message;
        }

    } catch(error) {
        console.error(error);
    }
}

confirmAvatarButton.addEventListener("click", updateAvatar);