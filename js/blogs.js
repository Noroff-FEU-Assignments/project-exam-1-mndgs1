import { getPosts, getCategoriesFromAPI, getFeaturedImageAPI } from "./components/apiFunctions.js";
import { createPostHTML, createCategoriesHTML, createLoaderHTML } from "./components/createHtmlFunctions.js";

const moreBlogsBtn = document.querySelector(".load-more");
const blogsContainer = document.querySelector(".blogs__container");

const categories = await getCategoriesFromAPI();

moreBlogsBtn.addEventListener("click", (e) => {
    pageNum += 1;
    renderBlogsHtml(url, pageNum, "1");
});

// create blogs HTML
async function renderBlogsHtml(url, page, category) {
    try {
        const posts = await getPosts(url, page, category);

        const container = document.querySelector(".blogs__container");
        blogsContainer.style.display = "grid";
        moreBlogsBtn.style.display = "block";

        const loader = document.querySelector(".loader");
        if (loader) {
            loader.style.display = "none";
        }

        posts.forEach((post) => {
            createPostHTML(post, container, categories);
        });

        if (posts.length < 12) {
            moreBlogsBtn.style.display = "none";
        }
    } catch (error) {
        moreBlogsBtn.style.display = "none";
        console.error(error);
    }
}

createCategoriesHTML(categories, categoriesContainer);

createLoaderHTML(blogsContainer);
renderBlogsHtml(url, pageNum, "1");

const categoryInput = document.querySelectorAll(".category__radio");

categoryInput.forEach((input) => {
    input.addEventListener("change", (e) => {
        blogsContainer.innerHTML = "";
        createLoaderHTML(blogsContainer);
        pageNum = 1;
        renderBlogsHtml(url, pageNum, input.id);
    });
});
