import { validateInput, addEventListenersForm } from "./components/inputValidation.js";

const allInputs = document.querySelectorAll("#comment__form input, #comment__form textarea");
const submit = document.querySelector(".submit-comment");
const contactForm = document.getElementById("comment__form");
const id = fetchParams();
const moreComments = document.querySelector(".more-comments");

// Fetching id
function fetchParams() {
    const queryString = document.location.search;
    const params = new URLSearchParams(queryString);
    const id = params.get("id");
    return id;
}

// get data and render the page
async function getPostByID(url) {
    url.pathname = "/life-of-mi/wp-json/wp/v2/posts/" + id;

    try {
        const response = await fetch(url);
        const post = await response.json();

        renderPost(post);
    } catch {}
}

// render post HTML
function renderPost(post) {
    const container = document.querySelector(".blog-container");

    const headerContainer = document.createElement("h1");
    headerContainer.innerHTML = post.title.rendered;
    container.appendChild(headerContainer);

    document.title = post.title.rendered + "| Life of Mi";

    container.innerHTML += post.content.rendered;

    const images = container.querySelectorAll("img");
    images.forEach((image) => {
        addModal(image);
    });
}

//add modal HTML for an image
function addModal(image) {
    const modal = document.querySelector("#modal");
    const modalImage = document.querySelector("#modal-image");

    if (image) {
        image.addEventListener("click", function () {
            modal.style.display = "block";
            modalImage.src = image.src;
        });
    }

    if (modal) {
        modal.addEventListener("click", function (event) {
            if (event.target === modal) {
                modal.style.display = "none";
            }
        });
    }
}

getPostByID(url);

// adds event listnerers to form inputs
allInputs.forEach((input) => {
    addEventListenersForm(input);
});

// adds event listner to submit button
submit.addEventListener("click", (e) => {
    e.preventDefault();

    // validates if all inputs have errors
    allInputs.forEach((input) => {
        validateInput(input);
    });

    const allErrors = document.querySelectorAll(".error");

    if (allErrors.length === 0) {
        console.log(inputDataToJSON(allInputs));
        const data = inputDataToJSON(allInputs);
        sendComment(data);
        allInputs.forEach((input) => {
            input.value = "";
        });
        renderMessage("Thank you for your comment!", "success", contactForm);
    } else {
        // allErrors.forEach((error) => {
        //     renderMessage(error.innerHTML, "success", contactForm);
        // });
    }
});

// get all input data from Comments, structure it for API, return JSON
function inputDataToJSON(allInputs) {
    const data = {
        post: null,
        author_name: null,
        author_email: null,
        content: null,
    };

    data.post = parseInt(id);

    allInputs.forEach((input) => {
        if (input.id === "name") {
            data.author_name = input.value;
        }
        if (input.id === "email") {
            data.author_email = input.value;
        }
        if (input.id === "comment") {
            data.content = input.value;
        }
    });

    return JSON.stringify(data);
}

// send comment to API
async function sendComment(data) {
    const urlComment = "https://mindb.no/life-of-mi/wp-json/wp/v2/comments";

    try {
        const response = await fetch(urlComment, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: data,
        });
        if (response.ok) {
            console.log("Comment submitted successfully!");
        } else {
            console.error("Error submitting comment:", response.statusText);
        }
    } catch (error) {
        console.error("Error submitting comment:", error);
    }
}
// get comments from api
async function getComments(url, pageNum) {
    url.pathname = "/life-of-mi/wp-json/wp/v2/comments";
    url.searchParams.set("post", id);
    url.searchParams.set("page", pageNum);

    try {
        const response = await fetch(url);
        const comments = await response.json();
        return comments;
    } catch (error) {
        console.error(error);
    }
}

// create comments HTML
function createCommentsHTML(comments) {
    const commentsContainer = document.querySelector(".comment-list");

    if (comments.length < 1) {
        commentsContainer.innerHTML = `<p>Be the first to comment!</p>`;
    } else {
        comments.forEach((comment) => {
            const commentEl = document.createElement("li");
            commentEl.classList.add("comment");
            commentsContainer.appendChild(commentEl);

            const commentHeaderEl = document.createElement("div");
            commentHeaderEl.classList.add("comment-header");
            commentEl.appendChild(commentHeaderEl);

            const commentMeta = document.createElement("div");
            commentMeta.classList.add("comment-meta");
            commentMeta.innerHTML = `<span class="comment-author">${comment.author_name}</span>
            <span class="comment-date">${formatDate(comment.date)}</span>`;
            commentHeaderEl.appendChild(commentMeta);

            const commentBody = document.createElement("div");
            commentBody.classList.add("comment-body");
            commentBody.innerHTML = comment.content.rendered;
            commentEl.appendChild(commentBody);
        });
    }
}

async function getCommentsAndCreateHTML(url, pageNum) {
    const comments = await getComments(url, pageNum);
    createCommentsHTML(comments);

    const commentElements = document.querySelectorAll(".comment");

    for (let i = 0; i < commentElements.length; i++) {
        if (i > 2) {
            commentElements[i].style.display = "none";

            moreComments.style.visibility = "visible";
        }
    }
}

getCommentsAndCreateHTML(url, pageNum);

loadFirstComments();
// load first 12 comments
async function loadFirstComments() {
    moreComments.addEventListener("click", async (e) => {
        pageNum += 1;
        const comments = await getComments(url, pageNum);
        const commentsEl = document.querySelectorAll(".comment");

        commentsEl.forEach((comment) => {
            comment.style.display = "block";
        });
        if (comments.length > 0) {
            createCommentsHTML(comments);

            moreComments.innerHTML = "View All Comments";
        } else {
            moreComments.style.visibility = "hidden";
        }
    });
}
