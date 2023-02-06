let pageNum = 1;
const moreBlogsBtn = document.querySelector(".blogs__more button");
const moreBlogsContainer = document.querySelector(".blogs__more");

moreBlogsBtn.addEventListener("click", (e) => {
    pageNum += 1;
    url.searchParams.set("page", pageNum);
    renderBlogsHtml(url);
});

async function renderBlogsHtml() {
    try {
        const posts = await getPosts(url);
        renderPosts(posts, ".blogs__container");

        if (posts.length < 10) {
            moreBlogsBtn.style.display = "none";
            renderMessage("Begining of the blog", moreBlogsContainer, "information");
        }
    } catch {
        moreBlogsBtn.style.display = "none";
        renderMessage("Begining of the blog", moreBlogsContainer, "information");
    }
}

renderBlogsHtml();
