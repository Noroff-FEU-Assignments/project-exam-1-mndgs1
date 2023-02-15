import { validateInput, addEventListenersForm } from "./components/inputValidation.js";

const allInputs = document.querySelectorAll("#contact__form input, #contact__form textarea");
const submit = document.querySelector(".submit");
const contactForm = document.getElementById("contact__form");

// adds event listnerers to form inputs
allInputs.forEach((input) => {
    addEventListenersForm(input);
});

// adds event listner to submit button
submit.addEventListener("click", (e) => {
    e.preventDefault();

    // validates if all inputs have errors
    allInputs.forEach((input) => {
        validateInput(input);
    });

    const allErrors = document.querySelectorAll(".error");

    if (allErrors.length === 0) {
        allInputs.forEach((input) => {
            input.value = "";
        });
        renderMessage("Your message was sent!", "success", contactForm);
    } else {
        // allErrors.forEach((error) => {
        //     renderMessage(error.innerHTML, "success", contactForm);
        // });
    }
});
