const carousel = document.querySelector(".carousel");
const loadMoreButton = document.querySelector(".load-more");

loadMoreButton.addEventListener("click", (e) => {
    const slides = document.querySelectorAll(".slide");
});

async function renderCarousel(pageNum) {
    try {
        const posts = await getPosts(url, pageNum);

        const categories = await getCategoriesFromAPI();

        const categoriesContainer = document.querySelector(".categories");
        createCategoriesHTML(categories, categoriesContainer);

        let slide, slidePosts;

        for (let i = 0; i < posts.length; i += 3) {
            slide = document.createElement("div");
            slide.classList.add("slide");
            carousel.appendChild(slide);

            slidePosts = posts.slice(i, i + 3);
            slidePosts.forEach((post) => {
                createPostHTML(post, slide, categories);
            });
        }
        showSlides(slideIndex);
        loader.style.display = "none";
    } catch (error) {
        slideIndex = 1;
    }
}

renderCarousel(pageNum);
createSlideButtons(carousel, "&#10094;", "prev", -1);
createSlideButtons(carousel, "&#10095;", "next", 1);

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
