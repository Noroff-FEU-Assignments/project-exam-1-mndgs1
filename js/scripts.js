"use strict";
let pageNum = 1;
let categories;

const categoriesContainer = document.querySelector(".categories");

const menuBars = document.querySelector(".bars");
const menu = document.querySelector(".menu");
const loader = document.querySelector(".loader");

const url = new URL("https://mindb.no");

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
    container.appendChild(messageEl);
}

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

async function getPosts(url, pageNum, category) {
    url.pathname = "/life-of-mi/wp-json/wp/v2/posts/";
    url.searchParams.set("per_page", 12);
    url.searchParams.set("page", pageNum);

    if (category) {
        url.searchParams.set("category", category);
    }

    try {
        const response = await fetch(url);
        const json = response.json();
        return json;
    } catch (error) {
        console.error(error);
    }
}

function renderPosts(posts, container, categories) {
    const body = document.querySelector(container);
    posts.forEach((post) => createPostHTML(post, body, categories));
}

function createPostHTML(post, body, categories) {
    const blogCard = document.createElement("div");
    blogCard.classList.add("blog-card");
    blogCard.id = `${post.id}`;
    body.appendChild(blogCard);

    const link = document.createElement("a");
    link.href = "/blog.html?id=" + post.id;
    blogCard.appendChild(link);

    const img = document.createElement("img");
    link.appendChild(img);

    categories.forEach((category) => {
        if (post.categories.includes(category.id)) {
            const categoryEl = document.createElement("p");
            categoryEl.classList.add("post__category");
            categoryEl.innerHTML = category.name;

            // console.log(`category: ${category.name}, name:${post.title.rendered}`);
            if (category.name !== "Uncategorized") {
                link.appendChild(categoryEl);
            }
        }
    });

    if (!post.featured_media) {
        img.src = "https://mindb.no/life-of-mi/wp-content/uploads/2023/01/Placeholder-2.webp";
        img.alt = "Placeholder";
    } else {
        const imgUrl = `https://mindb.no/life-of-mi/wp-json/wp/v2/media/${post.featured_media}`;
        // console.log(imgUrl);
        getFeaturedImage(imgUrl, post.id);
    }

    const heading = document.createElement("h3");
    heading.innerHTML = post.title.rendered;
    link.appendChild(heading);

    link.innerHTML += post.excerpt.rendered;
}

async function getCategoriesFromAPI() {
    url.pathname = "/life-of-mi/wp-json/wp/v2/categories/";
    url.searchParams.delete("per_page");
    url.searchParams.delete("page");
    url.searchParams.delete("categories");

    try {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
    }
}

function createCategoriesHTML(categories, container) {
    categories.forEach((category) => {
        const categoryInput = document.createElement("input");
        categoryInput.classList.add("category__radio");
        categoryInput.setAttribute("type", "radio");
        categoryInput.setAttribute("id", category.id);
        categoryInput.setAttribute("value", category.name);
        categoryInput.setAttribute("name", "categories");

        const categoryLabel = document.createElement("label");
        categoryLabel.classList.add("category__label");
        categoryLabel.setAttribute("for", category.id);

        categoryLabel.innerHTML = category.name;

        if (category.name === "Uncategorized") {
            categoryInput.checked = "true";
            container.prepend(categoryLabel);
            container.prepend(categoryInput);
            categoryInput.classList.add("checked");
            categoryLabel.innerHTML = "All";
        } else {
            container.appendChild(categoryInput);
            container.appendChild(categoryLabel);
        }

        addCategoryListeners(categoryInput);
    });
}

function addCategoryListeners(input) {
    input.addEventListener("change", async (e) => {});
}
