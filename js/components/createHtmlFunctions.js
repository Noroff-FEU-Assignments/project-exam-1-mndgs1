// Create post card HTML, in container
"strict";
export function createPostHTML(post, body, categories) {
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

            if (category.name !== "Uncategorized") {
                link.appendChild(categoryEl);
            }
        }
    });

    const date = formatDate(post.date);
    const dateEl = document.createElement("p");
    dateEl.classList.add("date");
    dateEl.innerHTML = date;
    link.appendChild(dateEl);

    let imgUrl = `https://mindb.no/life-of-mi/wp-json/wp/v2/media/${post.featured_media}`;
    if (!post.featured_media) {
        imgUrl = `https://mindb.no/life-of-mi/wp-json/wp/v2/media/120`;
    }
    getFeaturedImage(imgUrl, post.id);

    const heading = document.createElement("h3");
    heading.innerHTML = post.title.rendered;
    link.appendChild(heading);

    link.innerHTML += post.excerpt.rendered;
}

// Create categories HTML
export function createCategoriesHTML(categories, container) {
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

        const listItem = document.createElement("li");
        listItem.appendChild(categoryInput);
        listItem.appendChild(categoryLabel);

        if (category.name === "Uncategorized") {
            categoryInput.checked = "true";
            categoryLabel.innerHTML = "All";
            container.prepend(listItem);
        } else {
            container.appendChild(listItem);
        }
    });
}

// create loader HTML
export function createLoaderHTML(container) {
    const loader = document.createElement("span");
    loader.classList.add("loader");
    container.appendChild(loader);
}
