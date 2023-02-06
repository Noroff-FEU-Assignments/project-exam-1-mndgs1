// carousel

var slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
    showSlides((slideIndex += n));
}

function currentSlide(n) {
    showSlides((slideIndex = n));
}

function showSlides(n) {
    var i;
    var slides = document.getElementsByClassName("slide");
    if (n > slides.length) {
        slideIndex = 1;
    }
    if (n < 1) {
        slideIndex = slides.length;
    }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slides[slideIndex - 1].style.display = "block";
}

async function renderCarousel() {
    try {
        url.searchParams.set("per_page", 12);
        url.searchParams.set("page", 1);

        const posts = await getPosts(url);

        console.log(posts);
        for (i = 0; i < posts.length; i++) {
            console.log(i);
            if (i % 3 === 0) {
                const carousel = document.querySelector(".carousel");
                const newSlide = document.createElement("div");
                newSlide.classList.add("slide");

                carousel.appendChild(newSlide);
            }
        }

        const slides = document.querySelectorAll(".slide");
        console.log(slides);
        slides.forEach((slide) => {});
        // const slides = document.querySelectorAll(".slide");
        // console.log(slides);
    } catch {}
}

renderCarousel();
