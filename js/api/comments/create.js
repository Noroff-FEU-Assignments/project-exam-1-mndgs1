import createApiOptions from "../createApiOptions.js";
import callApi from "../callApi.js";
import { POST, APPLICATION_JSON, BASE_URL } from "../constants.js";

export async function sendComment(data) {
    const url = new URL(`${BASE_URL}comments`);

    const options = createApiOptions(POST, APPLICATION_JSON, {}, data);
    const response = await callApi(url, options);

    return response;
}
