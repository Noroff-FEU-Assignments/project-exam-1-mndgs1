// Render message to input
export default function renderMessage(message, type, container) {
    const messageEl = document.createElement("p");
    messageEl.classList.add("message", type);
    messageEl.innerHTML = message;
    container.appendChild(messageEl);
}
