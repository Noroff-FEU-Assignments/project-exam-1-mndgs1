("use strict");
let pageNum = 1;

const categoriesContainer = document.querySelector(".categories");

const menuBars = document.querySelector(".bars");
const menu = document.querySelector(".menu");
const loader = document.querySelector(".loader");

const url = new URL("https://mindb.no");

// get Featured image from API
async function getFeaturedImage(imgUrl, postId) {
    try {
        const response = await fetch(imgUrl);
        const data = await response.json();

        const img = document.getElementById(postId).querySelector("img");
        img.src = data.source_url;
        img.alt = data.alt_text;
    } catch (error) {
        console.error(error);
    }
}

function menuToggle(elementsArray) {
    elementsArray.forEach((el) => {
        if (el.classList.contains("not-active")) {
            el.classList.replace("not-active", "active");
        } else {
            el.classList.replace("active", "not-active");
        }
    });
}

menuBars.addEventListener("click", (e) => {
    const menu = document.querySelector(".menu");
    menuToggle([menuBars, menu]);
});

// functions
function renderMessage(message, type, container) {
    const messageEl = document.createElement("p");
    messageEl.classList.add("message", type);
    messageEl.innerHTML = message;
    container.prepend(messageEl);
}

// Format post date
function formatDate(dateArg) {
    const date = new Date(dateArg);
    const time = date.toTimeString();
    const timeAltered = time.substr(0, time.lastIndexOf(":"));
    const formattedDate = date.toLocaleDateString() + ", " + timeAltered;
    return formattedDate;
}

// add wrapper

const radioButtons = document.querySelectorAll(".radio__input");

radioButtons.forEach((input) => {
    input.addEventListener("change", (e) => {});
});
