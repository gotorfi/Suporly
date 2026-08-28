/* =========================================================
   SUPORLY RESET PASSWORD
========================================================= */


/* =========================================================
   THEME
========================================================= */

const themeButtons =
    document.querySelectorAll(".theme-btn");


function setTheme(theme) {

    document.body.dataset.theme =
        theme;


    themeButtons.forEach(button => {

        button.classList.toggle(
            "active",
            button.dataset.theme === theme
        );

    });


    localStorage.setItem(
        "suporly-theme",
        theme
    );

}


const savedTheme =
    localStorage.getItem(
        "suporly-theme"
    ) || "light";


setTheme(savedTheme);


themeButtons.forEach(button => {

    button.addEventListener(
        "click",
        () => {

            setTheme(
                button.dataset.theme
            );

        }
    );

});


/* =========================================================
   ELEMENTS
========================================================= */

const form =
    document.getElementById(
        "resetPasswordForm"
    );


const newPassword =
    document.getElementById(
        "newPassword"
    );


const retypePassword =
    document.getElementById(
        "retypePassword"
    );


const resetButton =
    document.getElementById(
        "resetButton"
    );


const resetError =
    document.getElementById(
        "resetError"
    );


const resetSuccess =
    document.getElementById(
        "resetSuccess"
    );


const resetBack =
    document.getElementById(
        "resetBack"
    );


const requirementLength =
    document.getElementById(
        "requirementLength"
    );


const requirementMatch =
    document.getElementById(
        "requirementMatch"
    );


/* =========================================================
   PASSWORD VISIBILITY
========================================================= */

document
    .querySelectorAll(
        ".password-toggle"
    )
    .forEach(
        button => {

            button.addEventListener(
                "click",
                () => {

                    const target =
                        document.getElementById(
                            button.dataset.target
                        );


                    if (!target) {

                        return;

                    }


                    const visible =
                        target.type === "text";


                    target.type =
                        visible
                            ? "password"
                            : "text";


                    button.textContent =
                        visible
                            ? "Show"
                            : "Hide";


                    button.setAttribute(
                        "aria-label",
                        visible
                            ? "Show password"
                            : "Hide password"
                    );

                }
            );

        }
    );


/* =========================================================
   VALIDATION
========================================================= */

function updateRequirements() {

    const password =
        newPassword.value;


    const confirmation =
        retypePassword.value;


    const validLength =
        password.length >= 8;


    const validMatch =
        password.length > 0 &&
        password === confirmation;


    requirementLength.classList.toggle(
        "valid",
        validLength
    );


    requirementMatch.classList.toggle(
        "valid",
        validMatch
    );


    resetButton.disabled =
        !validLength ||
        !validMatch;

}


/* =========================================================
   INPUT EVENTS
========================================================= */

newPassword.addEventListener(
    "input",
    updateRequirements
);


retypePassword.addEventListener(
    "input",
    updateRequirements
);


/* =========================================================
   ERROR
========================================================= */

function showError(message) {

    resetError.textContent =
        message;

    resetError.hidden =
        false;

}


function hideError() {

    resetError.textContent =
        "";

    resetError.hidden =
        true;

}


/* =========================================================
   FORM SUBMIT
========================================================= */

form.addEventListener(
    "submit",
    async event => {

        event.preventDefault();

        hideError();


        const password =
            newPassword.value;


        const confirmation =
            retypePassword.value;


        if (
            password.length < 8
        ) {

            showError(
                "Your password must be at least 8 characters long."
            );

            return;

        }


        if (
            password !== confirmation
        ) {

            showError(
                "The passwords do not match."
            );

            return;

        }


        resetButton.disabled =
            true;


        resetButton.innerHTML = `
            Resetting...
        `;


        /* =====================================================
           BACKEND
        ===================================================== */

        const params =
            new URLSearchParams(
                window.location.search
            );


        const token =
            params.get("token");


        if (!token) {

            showError(
                "This password reset link is invalid or has expired."
            );


            resetButton.disabled =
                false;


            resetButton.innerHTML = `
                Reset password
                <span>→</span>
            `;


            return;

        }


        try {

            const response =
                await fetch(
                    "/api/reset-password",
                    {
                        method: "POST",

                        headers: {
                            "Content-Type":
                                "application/json"
                        },

                        body:
                            JSON.stringify({

                                token,

                                password

                            })

                    }
                );


            const result =
                await response.json();


            if (
                !response.ok ||
                !result.success
            ) {

                throw new Error(
                    result.message ||
                    "Could not reset your password."
                );

            }


            /* =================================================
               PASSWORD SUCCESSFULLY CHANGED
            ================================================== */

            form.hidden =
                true;


            resetBack.hidden =
                true;


            resetSuccess.hidden =
                false;


        } catch (error) {

            console.error(
                "Password reset failed:",
                error
            );


            showError(
                error.message ||
                "Something went wrong. Please try again."
            );


            resetButton.disabled =
                false;


            resetButton.innerHTML = `
                Reset password
                <span>→</span>
            `;

        }

    }
);


/* =========================================================
   INITIALIZE
========================================================= */

updateRequirements();