// Create post card HTML, in container
export function createPostHTML(post, container, categories) {
    const blogCard = document.createElement("div");
    blogCard.classList.add("blog-card");
    blogCard.id = `${post.id}`;
    container.appendChild(blogCard);
    const link = document.createElement("a");
    link.href = "/blog.html?id=" + post.id;
    blogCard.appendChild(link);

    const img = document.createElement("img");
    link.appendChild(img);

    if (post.featured_media) {
        const imageData = getPostImage(post.featured_media);
        console.log(imageData);
    } else {
        img.src = `/images/Placeholder.webp`;
        img.alt = `placeholder`;
    }

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

    const heading = document.createElement("h3");
    heading.innerHTML = post.title.rendered;
    link.appendChild(heading);

    link.innerHTML += post.excerpt.rendered;
}
