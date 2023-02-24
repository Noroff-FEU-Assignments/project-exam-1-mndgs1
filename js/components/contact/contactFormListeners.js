import { validateInput, addEventListenersForm } from "../../utilities/inputValidation.js";
import renderMessage from "../common/renderMessage.js";

export default function addContactListeners() {
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
            const data = {
                name: null,
                email: null,
                subject: null,
                message: null,
            };

            allInputs.forEach((input) => {
                if (input.id === "name") {
                    data.name = input.value;
                }
                if (input.id === "email") {
                    data.email = input.value;
                }
                if (input.id === "subject") {
                    data.subject = input.value;
                }
                if (input.id === "message") {
                    data.message = input.value;
                }
                input.value = "";
            });
            renderMessage("Your message was sent!", "success", contactForm);
        } else {
            // allErrors.forEach((error) => {
            //     renderMessage(error.innerHTML, "success", contactForm);
            // });
        }
    });
}
