// Fetching id
function fetchParams() {
    const queryString = document.location.search;
    const params = new URLSearchParams(queryString);
    const id = params.get("id");
    return id;
}

async function getPostByID(url) {
    url.pathname = "/life-of-mi/wp-json/wp/v2/posts/" + fetchParams();

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

    document.title = post.title.rendered + "| Life of Mi";

    container.innerHTML += post.content.rendered;

    const images = container.querySelectorAll("img");
    images.forEach((image) => {
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
    });
}

getPostByID(url);

function modalEventListeners(imgClass) {
    const image = document.querySelector(`".${imgClass}"`);
    console.log(image);
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
