import fetchParams from "../../utilities/fetchParams.js";
import addModal from "../../utilities/addImgModal.js";
import { getPost } from "../../api/posts/read.js";

// fetches post data
export default async function postDetailed(id = fetchParams(), container = ".blog-container") {
    const { data, error } = await getPost(id);

    if (error) {
        return displayMessage(error, ".blog-container", "error");
    }

    displayPost(data, container);
}

// displays post elements
function displayPost(post, container) {
    const parent = document.querySelector(container);
    parent.innerHTML = "";

    document.title = post.title.rendered + "| Life of Mi";

    const postEl = createPostEl(post);
    parent.appendChild(postEl);
}

// creates post elements
function createPostEl(post) {
    const div = document.createElement("div");
    div.classList.add("blog-post");
    const headerContainer = document.createElement("h1");
    headerContainer.innerHTML = post.title.rendered;
    div.appendChild(headerContainer);

    div.innerHTML += post.content.rendered;

    const images = div.querySelectorAll("img");
    images.forEach((image) => {
        addModal(image);
    });
    return div;
}

// -------------------------------------------------------
// WORKS!
