moreBlogsBtn.addEventListener("click", (e) => {
    pageNum += 1;
    url.searchParams.set("page", pageNum);
    getPosts(url);
});

getPosts(url);
