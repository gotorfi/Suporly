/* =========================================================
   SUPORLY SUPPORT
========================================================= */


/* =========================================================
   ELEMENTS
========================================================= */

const topicSelect =
    document.getElementById("supportTopic");

const formContainer =
    document.getElementById("supportFormContainer");

const form =
    document.getElementById("supportForm");

const formLabel =
    document.getElementById("formLabel");

const formTitle =
    document.getElementById("formTitle");

const formDescription =
    document.getElementById("formDescription");

const generalFields =
    document.getElementById("generalFields");

const applicationFields =
    document.getElementById("applicationFields");

const requirements =
    document.getElementById("applicationRequirements");

const verifiedSocial =
    document.getElementById("verifiedSocial");

const modAgreement =
    document.getElementById("modAgreement");

const modAgreementInput =
    document.getElementById("modAgreementInput");

const requirementsAgreement =
    document.getElementById("requirementsAgreement");

const positionAgreement =
    document.getElementById("positionAgreement");

const submitButton =
    document.getElementById("supportSubmit");



/* =========================================================
   ACCOUNT
========================================================= */

/*
 * These values should eventually come from your
 * logged-in account/backend.
 *
 * Example:
 *
 * accountUsername.textContent = currentUser.username;
 * accountEmail.textContent = currentUser.email;
 */

const accountUsername =
    document.getElementById("accountUsername");

const accountEmail =
    document.getElementById("accountEmail");


/*
 * Temporary account data.
 *
 * Replace these with your actual account system later.
 */

const currentUser = {

    username: "@Username",

    email: "email@example.com"

};


accountUsername.textContent =
    currentUser.username;

accountEmail.textContent =
    currentUser.email;



/* =========================================================
   TOPIC INFORMATION
========================================================= */

const topics = {

    account_hacked: {

        type: "general",

        label: "ACCOUNT",

        title: "My account got hacked",

        description:
            "Tell us what happened so we can help you recover your account."

    },


    account_access: {

        type: "general",

        label: "ACCOUNT",

        title: "I cannot access my account",

        description:
            "Tell us why you cannot access your account."

    },


    bug_report: {

        type: "general",

        label: "BUG REPORT",

        title: "Report a Bug",

        description:
            "Found something that is not working correctly? Tell us about it."

    },


    report_user: {

        type: "general",

        label: "REPORT",

        title: "Report a User",

        description:
            "Tell us about the user and explain what happened."

    },


    appeal_ban: {

        type: "general",

        label: "APPEAL",

        title: "Appeal a Ban",

        description:
            "Explain why you believe your ban should be reviewed."

    },


    report_moderator: {

        type: "general",

        label: "REPORT",

        title: "Report a Moderator",

        description:
            "Tell us about the moderator and explain what happened."

    },


    verified: {

        type: "application",

        label: "APPLICATION",

        title: "Apply for Verified Badge",

        description:
            "Apply for verification if you meet the requirements."

    },


    moderator: {

        type: "application",

        label: "APPLICATION",

        title: "Apply for MOD",

        description:
            "Apply to become a member of the Suporly moderation team."

    }

};



/* =========================================================
   REQUIREMENTS
========================================================= */

const verifiedRequirements = [

    "No previous rule violations during your Suporly account history.",

    "Your account must belong to a genuine human.",

    "You must have a legitimate and sufficiently strong reason for verification.",

    "Meeting the requirements does not automatically guarantee verification.",

    "Users with at least 100,000 followers or subscribers on Instagram, TikTok, YouTube or Twitch may also qualify for consideration."

];


const modRequirements = [

    "You must be a genuine human.",

    "You must have no previous rule violations.",

    "You must have a Discord account for moderator communication.",

    "The position is voluntary and unpaid.",

    "You should be able to contribute approximately 5 hours per week.",

    "You must be reliable and able to make fair moderation decisions."

];



/* =========================================================
   UPDATE REQUIREMENTS
========================================================= */

function showRequirements(list, title) {

    requirements.innerHTML = `

        <div class="requirements-title">
            ${title}
        </div>

        <ul class="requirements-list">

            ${list
                .map(
                    item => `<li>${item}</li>`
                )
                .join("")}

        </ul>

    `;

}



/* =========================================================
   RESET FORM
========================================================= */

function resetForm() {

    form.reset();

    generalFields.hidden = true;

    applicationFields.hidden = true;

    requirements.innerHTML = "";

    verifiedSocial.classList.remove("visible");

    modAgreement.hidden = true;

    modAgreementInput.required = false;

    requirementsAgreement.required = false;

    positionAgreement.required = false;

    submitButton.disabled = true;

}



/* =========================================================
   UPDATE FORM
========================================================= */

function updateForm() {

    const value =
        topicSelect.value;

    const topic =
        topics[value];


    resetForm();


    if (!topic) {

        formContainer.hidden = true;

        return;

    }


    formContainer.hidden = false;


    formLabel.textContent =
        topic.label;

    formTitle.textContent =
        topic.title;

    formDescription.textContent =
        topic.description;



    /* =====================================================
       GENERAL
    ===================================================== */

    if (topic.type === "general") {

        generalFields.hidden = false;

        document
            .getElementById("generalExplanation")
            .required = true;

        return;

    }



    /* -----------------------------------------------------
    APPLICATION
    ----------------------------------------------------- */

    generalFields.hidden = true;
    applicationFields.hidden = false;

    verifiedSocial.classList.remove("visible");
    modAgreement.hidden = true;


    /* -----------------------------------------------------
    VERIFIED
    ----------------------------------------------------- */

    if (value === "verified") {

        requirements.innerHTML = `
            <div class="requirements-title">
                Verified Badge requirements
            </div>

            <ul class="requirements-list">

                ${verifiedRequirements
                    .map(item => `<li>${item}</li>`)
                    .join("")}

            </ul>
        `;

        verifiedSocial.classList.add("visible");

        /*
        * MOD agreement must stay hidden.
        */

    }


    /* -----------------------------------------------------
    MODERATOR
    ----------------------------------------------------- */

    if (value === "moderator") {

        requirements.innerHTML = `
            <div class="requirements-title">
                MOD requirements
            </div>

            <ul class="requirements-list">

                ${modRequirements
                    .map(item => `<li>${item}</li>`)
                    .join("")}

            </ul>
        `;

        modAgreement.hidden = false;

    }

}



/* =========================================================
   VALIDATION
========================================================= */

function validateForm() {

    const value =
        topicSelect.value;

    const topic =
        topics[value];


    if (!topic) {

        submitButton.disabled = true;

        return;

    }



    /* =====================================================
       GENERAL
    ===================================================== */

    if (topic.type === "general") {

        const explanation =
            document
                .getElementById("generalExplanation")
                .value
                .trim();


        submitButton.disabled =
            explanation.length === 0;

        return;

    }



    /* =====================================================
       APPLICATION
    ===================================================== */

    const reason =
        document
            .getElementById("applicationReason")
            .value
            .trim();


    const about =
        document
            .getElementById("applicationAbout")
            .value
            .trim();


    const agreementsValid =
        requirementsAgreement.checked &&
        positionAgreement.checked;


    let valid =
        reason.length > 0 &&
        about.length > 0 &&
        agreementsValid;



    /* =====================================================
       MODERATOR AGREEMENT
    ===================================================== */

    if (value === "moderator") {

        valid =
            valid &&
            modAgreementInput.checked;

    }


    submitButton.disabled =
        !valid;

}



/* =========================================================
   LISTEN FOR CHANGES
========================================================= */

topicSelect.addEventListener(
    "change",
    updateForm
);


form.addEventListener(
    "input",
    validateForm
);


form.addEventListener(
    "change",
    validateForm
);



/* =========================================================
   SUBMIT
========================================================= */

form.addEventListener(
    "submit",
    function (event) {

        event.preventDefault();


        if (submitButton.disabled) {

            return;

        }


        const topic =
            topicSelect.value;


        const topicData =
            topics[topic];


        console.log(
            "Support request submitted:",
            {
                topic,
                type: topicData.type,
                username: currentUser.username,
                email: currentUser.email
            }
        );


        /*
         * Backend goes here.
         *
         * Example:
         *
         * fetch("/api/support", {
         *
         *     method: "POST",
         *
         *     body: new FormData(form)
         *
         * });
         */


    }
);