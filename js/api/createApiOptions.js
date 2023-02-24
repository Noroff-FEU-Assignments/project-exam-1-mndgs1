import { GET, BASE_URL } from "./constants.js";

export default function createApiOptions(method = GET, contentType, headers = {}, params = {}, extension = "") {
    if (contentType) {
        headers["Content-Type"] = contentType;
    }

    // Create a new URL object with the base URL
    const url = new URL(BASE_URL + extension);

    // Append the URL parameters to the URL object
    Object.keys(params).forEach((key) => url.searchParams.append(key, params[key]));

    const options = {
        method: method,
        headers: headers,
        url: url.toString(),
    };
    return options;
}
