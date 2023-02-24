"use strict";

// create loader HTML
export function createLoaderHTML(container) {
    const loader = document.createElement("span");
    loader.classList.add("loader");
    container.appendChild(loader);
}
