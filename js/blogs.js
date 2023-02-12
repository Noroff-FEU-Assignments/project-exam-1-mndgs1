const moreBlogsBtn = document.querySelector(".load-more");
const blogsContainer = document.querySelector(".blogs__container");

moreBlogsBtn.addEventListener("click", (e) => {
    pageNum += 1;
    renderBlogsHtml(url, pageNum, 1);
});

async function renderBlogsHtml(url, page, categories) {
    try {
        const posts = await getPosts(url, page, 1);

        categories = await getCategoriesFromAPI();

        loader.style.display = "none";
        blogsContainer.style.display = "grid";
        moreBlogsBtn.style.display = "block";
        createCategoriesHTML(categories, categoriesContainer);

        renderPosts(posts, ".blogs__container", categories);

        if (posts.length < 12) {
            moreBlogsBtn.style.display = "none";
        }
    } catch {
        moreBlogsBtn.style.display = "none";
    }
}
renderBlogsHtml(url, pageNum, 1);
