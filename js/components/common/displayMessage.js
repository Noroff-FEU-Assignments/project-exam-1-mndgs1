export default function displayMessage(message, container, messageType = "") {
	const element = document.querySelector(container);
	element.innerHTML = `<div class="${messageType}">${message}</div>`;
}
