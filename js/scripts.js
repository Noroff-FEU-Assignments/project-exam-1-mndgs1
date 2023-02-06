const menuBars = document.querySelector(".bars");
const menu = document.querySelector(".menu");

const url = new URL("https://mindb.no/life-of-mi/wp-json/wp/v2/posts/");

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
async function getFeaturedImage(imgUrl) {
    try {
        const response = await fetch(imgUrl);
        const data = await response.json();

        const imageContainer = document.getElementById(data.post);
        const img = imageContainer.querySelector("img");
        img.src = data.source_url;
        img.alt = data.alt_text;
    } catch {}
}

// function renderPosts(posts, container) {
//     const body = document.querySelector(container);
//     posts.forEach((post) => {
//         const blogCard = document.createElement("div");
//         blogCard.classList.add("blog-card");
//         blogCard.id = `${post.id}`;
//         body.appendChild(blogCard);

//         const link = document.createElement("a");
//         link.href = "/blog.html?id=" + post.id;
//         blogCard.appendChild(link);

//         const imgContainer = document.createElement("div");
//         imgContainer.classList.add("img-container");

//         const img = document.createElement("img");

//         if (!post.featured_media) {
//             img.src = "https://mindb.no/life-of-mi/wp-content/uploads/2023/01/Placeholder-2.webp";
//             img.alt = "Placeholder";
//         } else {
//             const imgUrl = "https://mindb.no/life-of-mi/wp-json/wp/v2/media/" + post.featured_media;
//             getFeaturedImage(imgUrl);
//         }

//         link.appendChild(img);

//         const heading = document.createElement("h2");
//         heading.innerHTML = post.title.rendered;
//         link.appendChild(heading);

//         const text = post.excerpt.rendered;
//         link.innerHTML += text;
//     });
// }

// async function getPosts(url) {
//     try {
//         const response = await fetch(url);
//         const posts = await response.json();

//         renderPosts(posts, ".blogs__container");

//         if (posts.length < 10) {
//             moreBlogsBtn.style.display = "none";
//             renderMessage("Begining of the blog", moreBlogsContainer, "information");
//         }
//     } catch {
//         moreBlogsBtn.style.display = "none";
//         renderMessage("Begining of the blog", moreBlogsContainer, "information");
//     }
// }

function renderMessage(message, el, type) {
    el.innerHTML = `<p class="message ${type}">${message}</p>`;
}

async function getPosts(url) {
    try {
        const response = await fetch(url);
        const posts = await response.json();

        return posts;
    } catch {}
}

function renderPosts(posts, container) {
    const body = document.querySelector(container);
    posts.forEach((post) => {
        const blogCard = document.createElement("div");
        blogCard.classList.add("blog-card");
        blogCard.id = `${post.id}`;
        body.appendChild(blogCard);

        const link = document.createElement("a");
        link.href = "/blog.html?id=" + post.id;
        blogCard.appendChild(link);

        const imgContainer = document.createElement("div");
        imgContainer.classList.add("img-container");

        const img = document.createElement("img");

        if (!post.featured_media) {
            img.src = "https://mindb.no/life-of-mi/wp-content/uploads/2023/01/Placeholder-2.webp";
            img.alt = "Placeholder";
        } else {
            const imgUrl = "https://mindb.no/life-of-mi/wp-json/wp/v2/media/" + post.featured_media;
            getFeaturedImage(imgUrl);
        }

        link.appendChild(img);

        const heading = document.createElement("h2");
        heading.innerHTML = post.title.rendered;
        link.appendChild(heading);

        const text = post.excerpt.rendered;
        link.innerHTML += text;
    });
}
