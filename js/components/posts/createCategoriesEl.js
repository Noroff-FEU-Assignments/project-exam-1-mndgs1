// Create categories HTML
export function createCategoriesHTML(categories, container) {
    categories.forEach((category) => {
        const categoryInput = document.createElement("input");
        categoryInput.classList.add("category__radio");
        categoryInput.setAttribute("type", "radio");
        categoryInput.setAttribute("id", category.id);
        categoryInput.setAttribute("value", category.name);
        categoryInput.setAttribute("name", "categories");

        const categoryLabel = document.createElement("label");
        categoryLabel.classList.add("category__label");
        categoryLabel.setAttribute("for", category.id);

        categoryLabel.innerHTML = category.name;

        const listItem = document.createElement("li");
        listItem.appendChild(categoryInput);
        listItem.appendChild(categoryLabel);

        if (category.name === "Uncategorized") {
            categoryInput.checked = "true";
            categoryLabel.innerHTML = "All";
            container.prepend(listItem);
        } else {
            container.appendChild(listItem);
        }
    });
}
