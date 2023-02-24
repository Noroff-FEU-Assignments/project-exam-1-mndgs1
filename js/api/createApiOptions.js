import { GET, BASE_URL } from "./constants.js";

export default function createApiOptions(method = GET, contentType, headers = {}, body) {
    if (contentType) {
        headers["Content-Type"] = contentType;
    }

    const options = {
        method: method,
        headers: headers,
    };

    if (body) {
        options.body = body;
    }
    return options;
}

// need to get extension out of this function, add body for POST comments
// do url + extension in post/read.js functions
