const allInputs = document.querySelectorAll("#contact__form input, #contact__form textarea");
const submit = document.querySelector(".submit");
const contactForm = document.getElementById("contact__form");

allInputs.forEach((input) => {
    input.addEventListener("focusout", (e) => {
        validateInput(e.target);
    });

    input.addEventListener("keyup", (e) => {
        if (e.target.required && e.key !== "Tab") {
            if (!checkLength(e.target.value, 0)) {
                manipulateErrorDOM(e.target, "This field is mandatory");
            } else {
                e.target.nextElementSibling.innerHTML = "";
                e.target.style.borderColor = "#101334";
                input.classList.remove("error");
            }
        }
    });
});

submit.addEventListener("click", (e) => {
    e.preventDefault();

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

function checkLength(value, len) {
    if (value.trim().length > len) {
        return true;
    } else {
        return false;
    }
}

function validateEmail(email) {
    const regEx = /\S+@\S+\.\S+/;
    const patternMatches = regEx.test(email);
    return patternMatches;
}

// Add an error message
function manipulateErrorDOM(input, error) {
    input.classList.add("error");
    input.nextElementSibling.innerHTML = error;
    input.nextElementSibling.classList.add("error");
}

// Validate input
function validateInput(input) {
    if (input.required) {
        if (!checkLength(input.value, 0)) {
            manipulateErrorDOM(input, "This field is mandatory");
        } else if (input.id === "name" && input.value.replace(" ", "").length < 5) {
            manipulateErrorDOM(input, "Name has to consist of more than 5 characters");
        } else if (input.id === "email" && !validateEmail(input.value)) {
            manipulateErrorDOM(input, "Type in a valid E-mail address");
        } else if (input.id === "subject" && input.value.replace(" ", "").length < 15) {
            manipulateErrorDOM(input, "Subject has to be longer than 15 characters");
        } else if (input.id === "message" && input.value.replace(" ", "").length < 25) {
            manipulateErrorDOM(input, "Message has to be longer than 25 characters");
        } else {
            input.nextElementSibling.innerHTML = "";
            input.nextElementSibling.classList.remove("error");
            input.style.borderColor = "var(--lightgrey-color)";
        }
    }
}
