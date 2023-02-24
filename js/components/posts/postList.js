import displayMessage from "../common/displayMessage.js";
import { getPosts } from "../../api/posts/index.js";
import createPostElement from "./postCard.js";

export default async function postList(category = "", container = ".blogs__container", page = 1) {
    const { data, error } = await getPosts(category, page);

    if (error) {
        return displayMessage(error, ".blogs__container", "error");
    }

    if (page === 1) {
        const parent = document.querySelector(container);
        parent.innerHTML = "";
    }

    displayPosts(data, container, page);
}

function displayPosts(posts, container, page) {
    if (!Array.isArray(posts) || posts.length === 0) {
        return displayMessage("There are no posts to display", ".blogs__container", "warning");
    }

    createPostList(posts, container);
    loadPostsButton(posts, page);
}

function createPostList(posts, container) {
    const parent = document.querySelector(container);
    const postElements = posts.map((post) => createPostElement(post));
    postElements.forEach((element) => parent.appendChild(element));
}

function loadPostsButton(posts, page) {
    const moreButton = document.querySelector(".load-more");

    const newPage = page + 1;
    if (posts.length === 12) {
        moreButton.style.display = "block";
        moreButton.onclick = (e) => {
            const categoryInputs = document.querySelectorAll(".category__radio");
            for (let i = 0; i < categoryInputs.length; i++) {
                if (categoryInputs[i].checked) {
                    postList(categoryInputs[i].id, ".blogs__container", newPage);
                    return;
                }
            }
        };
    }
    if (posts.length < 12) {
        moreButton.style.display = "none";
    }
}
