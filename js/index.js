import { getPosts, getCategoriesFromAPI } from "./components/apiFunctions.js";
import { createPostHTML, createCategoriesHTML, createLoaderHTML } from "./components/createHtmlFunctions.js";

const carousel = document.querySelector(".carousel");
const loadMoreButton = document.querySelector(".load-more");
const categoriesContainer = document.querySelector(".categories");

const categories = await getCategoriesFromAPI();

function createCarouselHTML(container, posts, categories) {
    container.innerHTML = "";

    let slide, slidePosts;

    for (let i = 0; i < posts.length; i += 3) {
        slide = document.createElement("div");
        slide.classList.add("slide");
        container.appendChild(slide);

        slidePosts = posts.slice(i, i + 3);
        slidePosts.forEach((post) => {
            createPostHTML(post, slide, categories);
        });
    }
}

async function renderCarousel(url, page, category) {
    try {
        const posts = await getPosts(url, page, category);

        createCarouselHTML(carousel, posts, categories);
        createSlideButtons(carousel, "&#10094;", "prev", -1);
        createSlideButtons(carousel, "&#10095;", "next", 1);

        showSlides(slideIndex);
        loader.style.display = "none";
    } catch (error) {
        slideIndex = 1;
    }
}

createCategoriesHTML(categories, categoriesContainer);
createLoaderHTML(carousel);

renderCarousel(url, pageNum, "1");

function createSlideButtons(container, html, type, slideArg) {
    const slidePrev = document.createElement("a");
    slidePrev.classList.add("carousel__buttons");
    slidePrev.classList.add(type);
    slidePrev.innerHTML = html;
    slidePrev.onclick = function () {
        plusSlides(slideArg);
    };
    container.appendChild(slidePrev);
}

let slideIndex = 1;

function plusSlides(n) {
    showSlides((slideIndex += n));
}

function currentSlide(n) {
    showSlides((slideIndex = n));
}

function showSlides(n) {
    let i;
    const slides = document.getElementsByClassName("slide");

    if (n > slides.length) {
        slideIndex = 1;
    }

    if (n < 1) {
        slideIndex = slides.length;
    }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slides[slideIndex - 1].style.display = "grid";
}

const categoryInput = document.querySelectorAll(".category__radio");

categoryInput.forEach((input) => {
    input.addEventListener("change", (e) => {
        carousel.innerHTML = "";
        createLoaderHTML(carousel);
        pageNum = 1;
        renderCarousel(url, pageNum, input.id);
    });
});

// set banner by category
async function setBannerByCategory() {}
