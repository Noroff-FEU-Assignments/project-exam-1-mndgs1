// get posts from API
export async function getPosts(url, pageNum, category) {
    url.pathname = "/life-of-mi/wp-json/wp/v2/posts/";
    url.searchParams.set("per_page", 12);
    url.searchParams.set("page", pageNum);
    url.searchParams.set("categories", category);

    if (category === "1") {
        url.searchParams.delete("categories");
    }

    try {
        const response = await fetch(url);
        const json = response.json();
        return json;
    } catch (error) {
        console.error(error);
    }
}

// get category names from API
export async function getCategoriesFromAPI() {
    url.pathname = "/life-of-mi/wp-json/wp/v2/categories/";
    url.searchParams.delete("per_page");
    url.searchParams.delete("page");
    url.searchParams.delete("categories");

    try {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
    }
}

// get featured image from API
export async function getFeaturedImageAPI(post) {
    let imgUrl = `https://mindb.no/life-of-mi/wp-json/wp/v2/media/${post.featured_media}`;

    if (!post.featured_media) {
        imgUrl = `https://mindb.no/life-of-mi/wp-json/wp/v2/media/120`;
    }

    try {
        const response = await fetch(imgUrl);
        const data = await response.json();

        return data;
    } catch (error) {
        console.error(error);
    }
}

// post a comment to API
