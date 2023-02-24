import createApiOptions from "../createApiOptions.js";
import callApi from "../callApi.js";
import { BASE_URL, GET, APPLICATION_JSON } from "../constants.js";

export async function getPosts(category = "") {
    const extension = "posts";
    const params = { per_page: 12 };

    if (category === "1") {
        category = "";
    }

    if (category) {
        params.categories = category;
    }
    const options = createApiOptions(GET, APPLICATION_JSON, {}, params, extension);

    const url = options.url;
    const response = await callApi(url, options);

    return response;
}

export async function getCategories() {
    const extension = "categories";
    const options = createApiOptions(GET, APPLICATION_JSON, {}, {}, extension);

    const url = options.url;
    const response = await callApi(url, options);

    return response;
}

export async function getPost(id) {
    const options = createApiOptions(GET, APPLICATION_JSON);
    const url = `${BASE_URL}posts/${id}`;
    const response = await callApi(url, options);

    return response;
}

export async function getPostImage(postImgID) {
    const extension = "media/";
    const options = createApiOptions(GET, APPLICATION_JSON, {}, {}, extension);
    const url = options.url + postImgID;
    const response = await callApi(url, options);

    return response;
}
