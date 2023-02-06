// Fetching id
function fetchParams() {
    const queryString = document.location.search;
    const params = new URLSearchParams(queryString);
    const id = params.get("id");
    return id;
}

async function getPostByID(url) {
    try {
        const response = await fetch(url);
        const post = await response.json();

        renderPost(post);
    } catch {}
}

function renderPost(post) {
    const container = document.querySelector(".blog-container");

    const headerContainer = document.createElement("h1");
    headerContainer.innerHTML = post.title.rendered;
    container.appendChild(headerContainer);

    container.innerHTML += post.content.rendered;
}

getPostByID(url + fetchParams());
