/* =========================================================
   SUPORLY PROFILE PREFERENCES
========================================================= */


/* =========================================================
   TEMPORARY PROFILE DATA
========================================================= */

const preferencesData = {

    username:
        "GotorFI",

    displayName:
        "GotorFI",

    avatar:
        "assets/temp/default_pfp.png",


    email:
        "user@example.com",

    language:
        "en",

    timezone:
        "Europe/Helsinki",

    twoFactor:
        false,

    privacy: {

        visibility:
            "public",

        onlineStatus:
            true,

        activity:
            true

    },

    notifications: {

        replies:
            true,

        appreciation:
            true

    },

    logins: [

        {
            country: "Finland",
            city: "Tampere",
            date: "August 26, 2026",
            time: "20:42",
            device: "Windows · Chrome",
            current: true
        },

        {
            country: "Finland",
            city: "Tampere",
            date: "August 25, 2026",
            time: "18:16",
            device: "Windows · Chrome",
            current: false
        },

        {
            country: "Finland",
            city: "Tampere",
            date: "August 23, 2026",
            time: "21:04",
            device: "Windows · Chrome",
            current: false
        }

    ]

};


/* =========================================================
   NAVIGATION
========================================================= */

const changeBannerButton =
    document.getElementById(
        "changeBannerButton"
    );

const bannerFileInput =
    document.getElementById(
        "bannerFileInput"
    );

const preferenceNavItems =
    document.querySelectorAll(
        ".preferences-nav-item"
    );


const preferenceSections =
    document.querySelectorAll(
        ".preference-section"
    );

changeBannerButton.addEventListener(
"click",
() => {

    bannerFileInput.click();

}
);

preferenceNavItems.forEach(
    item => {

        item.addEventListener(
            "click",
            async () => {

                const section =
                    item.dataset.section;

                if (section === "security") {

                    const session =
                        localStorage.getItem(
                            "suporly-session"
                        );

                    if (!session) {
                        return;
                    }

                    const response =
                        await fetch(
                            "https://suporly-backend.onrender.com/api/security-access",
                            {
                                method: "POST",

                                headers: {
                                    "Content-Type":
                                        "application/json"
                                },

                                body:
                                    JSON.stringify({
                                        session:
                                            session
                                    })
                            }
                        );

                    const result =
                        await response.json();

                    if (
                        result.status ===
                        "TwoFactorRequired"
                    ) {

                        openSecurityTwoFactorPrompt();

                        return;
                    }

                    if (!result.success) {
                        return;
                    }
                }

                preferenceNavItems.forEach(
                    navItem => {

                        navItem.classList.toggle(
                            "active",
                            navItem === item
                        );

                    }
                );

                preferenceSections.forEach(
                    sectionElement => {

                        sectionElement.classList.toggle(
                            "active",
                            sectionElement.id ===
                            `section-${section}`
                        );

                    }
                );

            }
        );

    }
);


/* =========================================================
   LOAD PROFILE
========================================================= */

async function loadPreferences() {
    const session =
        await loadSessionData();

    if (!session) {
        hidePageLoader();
        return;
    }

    document
        .getElementById("displayName")
        .value =
            preferencesData.displayName;


    document
        .getElementById("username")
        .value =
            preferencesData.username;


    document
        .getElementById("bio")
        .value =
            session.bio || "";


    const avatar =
        document.getElementById(
            "preferencesAvatar"
        );

    const avatarId =
        session.settings["profile-avatar"];


    if (avatarId) {

        await new Promise(
            resolve => {

                avatar.onload =
                    () => resolve();

                avatar.onerror =
                    () => resolve();

                avatar.src =
                    "https://suporly-backend.onrender.com/images/avatar/"
                    + avatarId;

            }
        );

    } else {

        avatar.src =
            "assets/temp/default_pfp.png";

    }

    const banner =
        document.getElementById(
            "bannerPreview"
        );

    const bannerId =
        session.settings["profile-banner"];

    if (bannerId) {

        banner.src =
            "https://suporly-backend.onrender.com/images/banner/"
            + bannerId;

    } else {

        banner.removeAttribute("src");

    }

    


    document
        .getElementById("securityEmail")
        .textContent =
            preferencesData.email;


    document
        .getElementById("language")
        .value =
            preferencesData.language;


    document
        .getElementById("timezone")
        .value =
            preferencesData.timezone;


    const twoFactorEnabled =
        session.settings["two-factor"] === true;

    document
        .getElementById("twoFactorToggle")
        .checked =
            session.settings["two-factor"] === true;


    document
        .getElementById("profileVisibility")
        .value =
            preferencesData.privacy.visibility;


    document
        .getElementById("onlineStatus")
        .checked =
            preferencesData.privacy.onlineStatus;


    document
        .getElementById("showActivity")
        .checked =
            preferencesData.privacy.activity;


    document
        .getElementById("notificationReplies")
        .checked =
            preferencesData.notifications.replies;


    document
        .getElementById("notificationAppreciation")
        .checked =
            preferencesData.notifications.appreciation;


    renderLogins();
    hidePageLoader();

}


/* =========================================================
   LOGIN HISTORY
========================================================= */

function renderLogins() {

    const container =
        document.getElementById(
            "loginList"
        );


    container.innerHTML = "";


    preferencesData.logins.forEach(
        login => {

            const element =
                document.createElement("div");


            element.className =
                "login-entry";


            element.innerHTML = `

                <div class="login-icon">
                    ${login.current ? "✓" : "↗"}
                </div>

                <div class="login-info">

                    <div class="login-location">

                        <strong>
                            ${escapeHTML(login.country)}
                        </strong>

                        <span>
                            ${escapeHTML(login.city)}
                        </span>

                    </div>

                    <span class="login-device">
                        ${escapeHTML(login.device)}
                    </span>

                </div>

                <div class="login-time">

                    <strong>
                        ${escapeHTML(login.date)}
                    </strong>

                    <span>
                        ${escapeHTML(login.time)}
                    </span>

                </div>

                ${
                    login.current
                        ? `
                            <span class="current-session">
                                Current session
                            </span>
                          `
                        : ""
                }

            `;


            container.appendChild(
                element
            );

        }
    );

}


/* =========================================================
   SECURITY BUTTONS
========================================================= */

/* =========================================================
   CHANGE EMAIL
========================================================= */

document
    .getElementById("changeEmailButton")
    .addEventListener(
        "click",
        () => {

            openChangeEmailModal();

        }
    );


function openChangeEmailModal() {

    const modal =
        document.createElement("div");

    modal.className =
        "account-change-modal";

    modal.innerHTML = `

        <div class="account-change-modal-content">

            <img
                src="assets/logos/icon.png"
                class="account-change-modal-logo"
                alt="Suporly"
            >

            <h2>
                Change email
            </h2>

            <p class="account-change-modal-subtitle">
                Enter your current email and choose
                a new email address.
            </p>


            <div class="account-change-field">

                <label for="changeEmailCurrent">
                    Current email
                </label>

                <input
                    type="email"
                    id="changeEmailCurrent"
                    autocomplete="email"
                    placeholder="Current email"
                >

            </div>


            <div class="account-change-field">

                <label for="changeEmailNew">
                    New email
                </label>

                <input
                    type="email"
                    id="changeEmailNew"
                    autocomplete="email"
                    placeholder="New email"
                >

            </div>


            <div class="account-change-field">

                <label for="changeEmailConfirm">
                    Retype new email
                </label>

                <input
                    type="email"
                    id="changeEmailConfirm"
                    autocomplete="email"
                    placeholder="Retype new email"
                >

            </div>


            <div
                class="account-change-error"
                id="changeEmailError"
                hidden
            ></div>


            <div class="account-change-actions">

                <button
                    type="button"
                    class="account-change-secondary"
                    id="cancelChangeEmailButton"
                >
                    Cancel
                </button>

                <button
                    type="button"
                    class="account-change-primary"
                    id="submitChangeEmailButton"
                >
                    Change email
                </button>

            </div>

        </div>

    `;

    document.body.appendChild(
        modal
    );


    const currentEmail =
        modal.querySelector(
            "#changeEmailCurrent"
        );

    const newEmail =
        modal.querySelector(
            "#changeEmailNew"
        );

    const confirmEmail =
        modal.querySelector(
            "#changeEmailConfirm"
        );

    const error =
        modal.querySelector(
            "#changeEmailError"
        );

    const changeButton =
        modal.querySelector(
            "#submitChangeEmailButton"
        );

    const cancelButton =
        modal.querySelector(
            "#cancelChangeEmailButton"
        );


    currentEmail.focus();


    changeButton.addEventListener(
        "click",
        async () => {

            const current =
                currentEmail.value.trim();

            const newAddress =
                newEmail.value.trim();

            const confirmation =
                confirmEmail.value.trim();


            error.hidden = true;


            if (!current) {

                error.textContent =
                    "Enter your current email.";

                error.hidden =
                    false;

                currentEmail.focus();

                return;

            }


            if (!newAddress) {

                error.textContent =
                    "Enter a new email address.";

                error.hidden =
                    false;

                newEmail.focus();

                return;

            }


            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newAddress)) {

                error.textContent =
                    "Enter a valid email address.";

                error.hidden =
                    false;

                newEmail.focus();

                return;

            }


            if (newAddress !== confirmation) {

                error.textContent =
                    "The new email addresses do not match.";

                error.hidden =
                    false;

                confirmEmail.focus();

                return;

            }


            if (current === newAddress) {

                error.textContent =
                    "Your new email must be different from your current email.";

                error.hidden =
                    false;

                newEmail.focus();

                return;

            }


            const session =
                localStorage.getItem(
                    "suporly-session"
                );


            if (!session) {

                return;

            }


            changeButton.disabled =
                true;


            try {

                const response =
                    await fetch(
                        "https://suporly-backend.onrender.com/api/change-email",
                        {
                            method: "POST",

                            headers: {
                                "Content-Type":
                                    "application/json"
                            },

                            body:
                                JSON.stringify({

                                    session:
                                        session,

                                    current_email:
                                        current,

                                    new_email:
                                        newAddress

                                })
                        }
                    );


                const result =
                    await response.json();


                if (!result.success) {

                    changeButton.disabled =
                        false;

                    error.textContent =
                        getAccountChangeError(
                            result
                        );

                    error.hidden =
                        false;

                    return;

                }


                openEmailVerificationModal(
                    modal,
                    newAddress
                );

            } catch (requestError) {

                console.error(
                    "Email change failed:",
                    requestError
                );

                changeButton.disabled =
                    false;

                error.textContent =
                    "Something went wrong. Please try again.";

                error.hidden =
                    false;

            }

        }
    );


    cancelButton.addEventListener(
        "click",
        () => {

            modal.remove();

        }
    );


    modal.addEventListener(
        "click",
        event => {

            if (
                event.target === modal
            ) {

                modal.remove();

            }

        }
    );

}


/* =========================================================
   VERIFY NEW EMAIL
========================================================= */

function openEmailVerificationModal(
    previousModal,
    newEmail
) {

    previousModal.remove();


    const modal =
        document.createElement("div");

    modal.className =
        "account-change-modal";

    modal.innerHTML = `

        <div class="account-change-modal-content">

            <img
                src="assets/logos/icon.png"
                class="account-change-modal-logo"
                alt="Suporly"
            >

            <h2>
                Verify your new email
            </h2>

            <p class="account-change-modal-subtitle">

                We sent a verification code to

                <strong>
                    ${escapeHTML(newEmail)}
                </strong>

            </p>


            <div class="account-change-field">

                <label for="emailVerificationCode">
                    Verification code
                </label>

                <input
                    type="text"
                    id="emailVerificationCode"
                    inputmode="numeric"
                    maxlength="6"
                    autocomplete="one-time-code"
                    placeholder="000000"
                >

            </div>


            <div
                class="account-change-error"
                id="emailVerificationError"
                hidden
            ></div>


            <div class="account-change-actions">

                <button
                    type="button"
                    class="account-change-secondary"
                    id="cancelEmailVerificationButton"
                >
                    Cancel
                </button>

                <button
                    type="button"
                    class="account-change-primary"
                    id="verifyEmailChangeButton"
                >
                    Verify
                </button>

            </div>

        </div>

    `;

    document.body.appendChild(
        modal
    );


    const codeInput =
        modal.querySelector(
            "#emailVerificationCode"
        );

    const error =
        modal.querySelector(
            "#emailVerificationError"
        );

    const verifyButton =
        modal.querySelector(
            "#verifyEmailChangeButton"
        );

    const cancelButton =
        modal.querySelector(
            "#cancelEmailVerificationButton"
        );


    codeInput.focus();


    codeInput.addEventListener(
        "input",
        () => {

            codeInput.value =
                codeInput.value
                    .replace(/\D/g, "")
                    .slice(0, 6);

        }
    );


    verifyButton.addEventListener(
        "click",
        async () => {

            const code =
                codeInput.value.trim();


            error.hidden =
                true;


            if (!/^\d{6}$/.test(code)) {

                error.textContent =
                    "Enter the 6-digit verification code.";

                error.hidden =
                    false;

                codeInput.focus();

                return;

            }


            const session =
                localStorage.getItem(
                    "suporly-session"
                );


            if (!session) {

                return;

            }


            verifyButton.disabled =
                true;


            try {

                const response =
                    await fetch(
                        "https://suporly-backend.onrender.com/api/verify-email-change",
                        {
                            method: "POST",

                            headers: {
                                "Content-Type":
                                    "application/json"
                            },

                            body:
                                JSON.stringify({

                                    session:
                                        session,

                                    code:
                                        code

                                })
                        }
                    );


                const result =
                    await response.json();


                if (!result.success) {

                    verifyButton.disabled =
                        false;

                    error.textContent =
                        getAccountChangeError(
                            result
                        );

                    error.hidden =
                        false;

                    codeInput.focus();

                    return;

                }


                modal.remove();


                preferencesData.email =
                    newEmail;


                document
                    .getElementById(
                        "securityEmail"
                    )
                    .textContent =
                        newEmail;

            } catch (requestError) {

                console.error(
                    "Email verification failed:",
                    requestError
                );

                verifyButton.disabled =
                    false;

                error.textContent =
                    "Something went wrong. Please try again.";

                error.hidden =
                    false;

            }

        }
    );


    cancelButton.addEventListener(
        "click",
        () => {

            modal.remove();

        }
    );


    modal.addEventListener(
        "click",
        event => {

            if (
                event.target === modal
            ) {

                modal.remove();

            }

        }
    );

}


/* =========================================================
   CHANGE PASSWORD
========================================================= */

document
    .getElementById("changePasswordButton")
    .addEventListener(
        "click",
        () => {

            openChangePasswordModal();

        }
    );


function openChangePasswordModal() {

    const modal =
        document.createElement("div");

    modal.className =
        "account-change-modal";

    modal.innerHTML = `

        <div class="account-change-modal-content">

            <img
                src="assets/logos/icon.png"
                class="account-change-modal-logo"
                alt="Suporly"
            >

            <h2>
                Change password
            </h2>

            <p class="account-change-modal-subtitle">
                Enter your current password and choose
                a new password.
            </p>


            <div class="account-change-field">

                <label for="changePasswordCurrent">
                    Current password
                </label>

                <input
                    type="password"
                    id="changePasswordCurrent"
                    autocomplete="current-password"
                    placeholder="Current password"
                >

            </div>


            <div class="account-change-field">

                <label for="changePasswordNew">
                    New password
                </label>

                <input
                    type="password"
                    id="changePasswordNew"
                    autocomplete="new-password"
                    placeholder="New password"
                >

            </div>


            <div class="account-change-field">

                <label for="changePasswordConfirm">
                    Retype new password
                </label>

                <input
                    type="password"
                    id="changePasswordConfirm"
                    autocomplete="new-password"
                    placeholder="Retype new password"
                >

            </div>


            <div
                class="account-change-error"
                id="changePasswordError"
                hidden
            ></div>


            <div class="account-change-actions">

                <button
                    type="button"
                    class="account-change-secondary"
                    id="cancelChangePasswordButton"
                >
                    Cancel
                </button>

                <button
                    type="button"
                    class="account-change-primary"
                    id="submitChangePasswordButton"
                >
                    Change password
                </button>

            </div>

        </div>

    `;

    document.body.appendChild(
        modal
    );


    const currentPassword =
        modal.querySelector(
            "#changePasswordCurrent"
        );

    const newPassword =
        modal.querySelector(
            "#changePasswordNew"
        );

    const confirmPassword =
        modal.querySelector(
            "#changePasswordConfirm"
        );

    const error =
        modal.querySelector(
            "#changePasswordError"
        );

    const changeButton =
        modal.querySelector(
            "#submitChangePasswordButton"
        );

    const cancelButton =
        modal.querySelector(
            "#cancelChangePasswordButton"
        );


    currentPassword.focus();


    changeButton.addEventListener(
        "click",
        async () => {

            const current =
                currentPassword.value;

            const newPasswordValue =
                newPassword.value;

            const confirmation =
                confirmPassword.value;


            error.hidden =
                true;


            if (!current) {

                error.textContent =
                    "Enter your current password.";

                error.hidden =
                    false;

                currentPassword.focus();

                return;

            }


            if (!newPasswordValue) {

                error.textContent =
                    "Enter a new password.";

                error.hidden =
                    false;

                newPassword.focus();

                return;

            }


            if (newPasswordValue.length < 8) {

                error.textContent =
                    "Your new password must be at least 8 characters.";

                error.hidden =
                    false;

                newPassword.focus();

                return;

            }


            if (newPasswordValue !== confirmation) {

                error.textContent =
                    "The new passwords do not match.";

                error.hidden =
                    false;

                confirmPassword.focus();

                return;

            }


            if (current === newPasswordValue) {

                error.textContent =
                    "Your new password must be different from your current password.";

                error.hidden =
                    false;

                newPassword.focus();

                return;

            }


            const session =
                localStorage.getItem(
                    "suporly-session"
                );


            if (!session) {

                return;

            }


            changeButton.disabled =
                true;


            try {

                const response =
                    await fetch(
                        "https://suporly-backend.onrender.com/api/change-password",
                        {
                            method: "POST",

                            headers: {
                                "Content-Type":
                                    "application/json"
                            },

                            body:
                                JSON.stringify({

                                    session:
                                        session,

                                    current_password:
                                        current,

                                    new_password:
                                        newPasswordValue

                                })
                        }
                    );


                const result =
                    await response.json();


                if (!result.success) {

                    changeButton.disabled =
                        false;

                    error.textContent =
                        getAccountChangeError(
                            result
                        );

                    error.hidden =
                        false;

                    return;

                }


                modal.remove();

            } catch (requestError) {

                console.error(
                    "Password change failed:",
                    requestError
                );

                changeButton.disabled =
                    false;

                error.textContent =
                    "Something went wrong. Please try again.";

                error.hidden =
                    false;

            }

        }
    );


    cancelButton.addEventListener(
        "click",
        () => {

            modal.remove();

        }
    );


    modal.addEventListener(
        "click",
        event => {

            if (
                event.target === modal
            ) {

                modal.remove();

            }

        }
    );

}


/* =========================================================
   ACCOUNT CHANGE ERRORS
========================================================= */

function getAccountChangeError(
    result
) {

    switch (result.status) {

        case "InvalidCurrentEmail":
            return "Your current email is incorrect.";

        case "InvalidCurrentPassword":
            return "Your current password is incorrect.";

        case "EmailAlreadyUsed":
            return "This email address is already in use.";

        case "InvalidCode":
            return "The verification code is invalid.";

        case "CodeExpired":
            return "The verification code has expired.";

        case "TooManyAttempts":
            return "Too many attempts. Please try again later.";

        default:
            return "The request could not be completed.";

    }

}

document
    .getElementById("logoutAllButton")
    .addEventListener(
        "click",
        () => {

            console.log(
                "Logout all sessions"
            );

        }
    );


/* =========================================================
   DELETE ACCOUNT
========================================================= */

const deleteModal =
    document.getElementById(
        "deleteModal"
    );


const deleteConfirmation =
    document.getElementById(
        "deleteConfirmation"
    );


const confirmDeleteButton =
    document.getElementById(
        "confirmDeleteButton"
    );


document
    .getElementById("deleteAccountButton")
    .addEventListener(
        "click",
        () => {

            deleteModal.hidden =
                false;

            deleteConfirmation.value =
                "";

            confirmDeleteButton.disabled =
                true;

            deleteConfirmation.focus();

        }
    );


document
    .getElementById("cancelDeleteButton")
    .addEventListener(
        "click",
        closeDeleteModal
    );


deleteModal.addEventListener(
    "click",
    event => {

        if (
            event.target ===
            deleteModal
        ) {

            closeDeleteModal();

        }

    }
);

const changeAvatarButton =
    document.getElementById(
        "changeAvatarButton"
    );

const avatarFileInput =
    document.getElementById(
        "avatarFileInput"
    );


changeAvatarButton.addEventListener(
    "click",
    () => {

        avatarFileInput.click();

    }
);

avatarFileInput.addEventListener(
    "change",
    async () => {

        const file =
            avatarFileInput.files[0];

        if (!file) {
            return;
        }

        const session =
            localStorage.getItem(
                "suporly-session"
            );

        if (!session) {
            return;
        }

        const formData =
            new FormData();

        formData.append(
            "session",
            session
        );

        formData.append(
            "image",
            file
        );


        const response =
            await fetch(
                "https://suporly-backend.onrender.com/api/change-avatar",
                {
                    method: "POST",

                    body: formData
                }
            );


        const data =
            await response.json();


        if (!data.success) {

            console.error(
                "Avatar upload failed."
            );

            return;
        }


        document
            .getElementById(
                "preferencesAvatar"
            )
            .src =
                data.success;

    }
);

document
    .getElementById("saveProfileButton")
    .addEventListener(
        "click",
        async () => {

            const session =
                localStorage.getItem(
                    "suporly-session"
                );

            if (!session) {
                return;
            }


            const data = {

                session:
                    session,

                bio:
                    document
                        .getElementById("bio")
                        .value
                        .trim()

            };


            const response =
                await fetch(
                    "https://suporly-backend.onrender.com/api/update-profile",
                    {
                        method: "POST",

                        headers: {
                            "Content-Type":
                                "application/json"
                        },

                        body:
                            JSON.stringify(data)
                    }
                );


            const result =
                await response.json();


            if (!result.success) {

                console.error(
                    "Profile update failed."
                );

                return;

            }


            console.log(
                "Profile updated."
            );

        }
    );


/* =========================================================
   DELETE CONFIRMATION
========================================================= */

deleteConfirmation.addEventListener(
    "input",
    () => {

        confirmDeleteButton.disabled =
            deleteConfirmation.value !==
            "CONFIRM";

    }
);


/* =========================================================
   CONFIRM DELETE
========================================================= */

confirmDeleteButton.addEventListener(
    "click",
    () => {

        if (
            deleteConfirmation.value !==
            "CONFIRM"
        ) {

            return;

        }


        /*
         * IMPORTANT
         *
         * Do NOT actually delete anything
         * from JavaScript.
         *
         * Python must perform the real
         * account deletion.
         */


        console.log(
            "ACCOUNT DELETE REQUEST"
        );


        /*
         * Later:
         *
         * fetch("/api/account/delete", {
         *
         *     method: "POST",
         *
         *     headers: {
         *         "Content-Type":
         *             "application/json"
         *     },
         *
         *     body: JSON.stringify({
         *
         *         confirmation:
         *             "CONFIRM"
         *
         *     })
         *
         * });
         */

    }
);


bannerFileInput.addEventListener(
    "change",
    async () => {

        const file =
            bannerFileInput.files[0];

        if (!file) {
            return;
        }

        const session =
            localStorage.getItem(
                "suporly-session"
            );

        if (!session) {
            return;
        }

        const formData =
            new FormData();

        formData.append(
            "session",
            session
        );

        formData.append(
            "image",
            file
        );

        const response =
            await fetch(
                "https://suporly-backend.onrender.com/api/change-banner",
                {
                    method: "POST",

                    body: formData
                }
            );

        const data =
            await response.json();

        if (!data.success) {

            console.error(
                "Banner upload failed."
            );

            return;
        }

        document
            .getElementById(
                "bannerPreview"
            )
            .src =
                "https://suporly-backend.onrender.com/images/banner/"
                + data.success;

    }
);


/* =========================================================
   CLOSE DELETE MODAL
========================================================= */

function closeDeleteModal() {

    deleteModal.hidden =
        true;

    deleteConfirmation.value =
        "";

    confirmDeleteButton.disabled =
        true;

}


/* =========================================================
   HTML ESCAPE
========================================================= */

function escapeHTML(value) {

    const div =
        document.createElement(
            "div"
        );


    div.textContent =
        value;


    return div.innerHTML;

}

/* =========================================================
   TWO-FACTOR AUTHENTICATION
========================================================= */

const twoFactorToggle =
    document.getElementById(
        "twoFactorToggle"
    );


twoFactorToggle.addEventListener(
    "change",
    async () => {

        if (twoFactorToggle.checked) {

            await enableTwoFactor();

        } else {

            await disableTwoFactor();

        }

    }
);

async function enableTwoFactor() {

    const session =
        localStorage.getItem(
            "suporly-session"
        );

    if (!session) {

        twoFactorToggle.checked =
            false;

        return;

    }


    try {

        const response =
            await fetch(
                "https://suporly-backend.onrender.com/api/setup-two-factor",
                {
                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body:
                        JSON.stringify({
                            session:
                                session
                        })
                }
            );


        const result =
            await response.json();


        if (!result.success) {

            twoFactorToggle.checked =
                false;

            console.error(
                "2FA setup failed."
            );

            return;

        }


        openTwoFactorSetup(
            result.qr
        );

    } catch (error) {

        twoFactorToggle.checked =
            false;

        console.error(
            "2FA setup failed.",
            error
        );

    }

}

async function verifyTwoFactorSetup(code) {

    const session =
        localStorage.getItem(
            "suporly-session"
        );

    if (!session) {
        console.error(
            "No Suporly session found."
        );

        return false;
    }

    try {

        const response =
            await fetch(
                "https://suporly-backend.onrender.com/api/verify-two-factor",
                {
                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body:
                        JSON.stringify({
                            session:
                                session,

                            code:
                                code
                        })
                }
            );


        const result =
            await response.json();


        console.log(
            "2FA verification response:",
            result
        );


        if (!result.success) {
            return false;
        }


        showRecoveryCodes(
            result.recovery
        );


        return true;

    } catch (error) {

        console.error(
            "2FA verification failed:",
            error
        );

        return false;

    }

}

function openTwoFactorSetup(qr) {

    const modal =
        document.createElement("div");

    modal.className =
        "two-factor-modal";

    modal.innerHTML = `

        <div class="two-factor-modal-content">


            <h2>
                Secure your account
            </h2>

            <p class="two-factor-modal-subtitle">
                Add an extra layer of security
                to your Suporly account.
            </p>


            <div class="two-factor-step">

                <span class="two-factor-step-number">
                    1
                </span>

                <span>
                    Scan the QR code
                </span>

            </div>


            <div class="two-factor-qr-container">

                <img
                    src="data:image/png;base64,${qr}"
                    class="two-factor-qr"
                    alt="Suporly two-factor authentication QR code"
                >

                <div class="two-factor-qr-logo">
                    <img
                        src="assets/logos/icon.png"
                        alt="Suporly"
                    >
                </div>

            </div>


            <div class="two-factor-step">

                <span class="two-factor-step-number">
                    2
                </span>

                <span>
                    Enter your verification code
                </span>

            </div>


            <input
                type="text"
                class="two-factor-code-input"
                id="twoFactorCode"
                inputmode="numeric"
                maxlength="6"
                autocomplete="one-time-code"
                placeholder="000000"
            >


            <div
                class="two-factor-error"
                id="twoFactorError"
                hidden
            ></div>


            <div class="two-factor-actions">

                <button
                    type="button"
                    class="two-factor-secondary"
                    id="cancelTwoFactorButton"
                >
                    Cancel
                </button>

                <button
                    type="button"
                    class="two-factor-primary"
                    id="verifyTwoFactorButton"
                >
                    Verify
                </button>

            </div>

        </div>

    `;

    document.body.appendChild(modal);


    const codeInput =
        modal.querySelector(
            "#twoFactorCode"
        );

    const verifyButton =
        modal.querySelector(
            "#verifyTwoFactorButton"
        );

    const cancelButton =
        modal.querySelector(
            "#cancelTwoFactorButton"
        );

    const error =
        modal.querySelector(
            "#twoFactorError"
        );


    codeInput.focus();


    codeInput.addEventListener(
        "input",
        () => {

            codeInput.value =
                codeInput.value
                    .replace(/\D/g, "")
                    .slice(0, 6);

        }
    );


    verifyButton.addEventListener(
        "click",
        async () => {

            const code =
                codeInput.value.trim();


            if (!/^\d{6}$/.test(code)) {

                error.textContent =
                    "Enter the 6-digit code from your authenticator.";

                error.hidden =
                    false;

                codeInput.focus();

                return;
            }


            verifyButton.disabled =
                true;

            error.hidden =
                true;


            const success =
                await verifyTwoFactorSetup(
                    code
                );


            if (!success) {

                verifyButton.disabled =
                    false;

                error.textContent =
                    "The code is invalid or has expired.";

                error.hidden =
                    false;

                codeInput.focus();

                return;
            }


            modal.remove();
        }
    );


    cancelButton.addEventListener(
        "click",
        () => {

            modal.remove();

            twoFactorToggle.checked =
                false;

        }
    );


    modal.addEventListener(
        "click",
        event => {

            if (
                event.target === modal
            ) {

                modal.remove();

                twoFactorToggle.checked =
                    false;

            }

        }
    );

}
function showRecoveryCodes(
    recoveryCodes
) {

    const modal =
        document.createElement("div");

    modal.className =
        "two-factor-modal";

    const codes =
        recoveryCodes
            .map(
                code =>
                    `
                    <div class="recovery-code">
                        ${escapeHTML(code)}
                    </div>
                    `
            )
            .join("");


    modal.innerHTML = `

        <div class="two-factor-modal-content">

            <img
                src="assets/logos/icon.png"
                class="two-factor-modal-logo"
                alt="Suporly"
            >

            <h2>
                2FA is enabled
            </h2>

            <p class="two-factor-modal-subtitle">
                Your account is now protected
                with two-factor authentication.
            </p>


            <div class="two-factor-step">

                <span class="two-factor-step-number">
                    !
                </span>

                <span>
                    Save your recovery codes
                </span>

            </div>


            <p class="two-factor-modal-subtitle">

                Each recovery code can only be
                used once. Store them somewhere
                safe in case you lose access to
                your authenticator.

            </p>


            <div class="recovery-codes">

                ${codes}

            </div>


            <button
                type="button"
                class="two-factor-primary"
                id="closeRecoveryCodesButton"
            >
                I've saved my codes
            </button>

        </div>

    `;


    document.body.appendChild(
        modal
    );


    modal
        .querySelector(
            "#closeRecoveryCodesButton"
        )
        .addEventListener(
            "click",
            () => {

                modal.remove();

            }
        );


    modal.addEventListener(
        "click",
        event => {

            if (
                event.target === modal
            ) {

                modal.remove();

            }

        }
    );

}

function openSecurityTwoFactorPrompt() {

    const modal =
        document.createElement("div");

    modal.className =
        "two-factor-modal";

    modal.innerHTML = `

        <div class="two-factor-modal-content">

            <img
                src="assets/logos/icon.png"
                class="two-factor-modal-logo"
                alt="Suporly"
            >

            <h2>
                Verify your identity
            </h2>

            <p class="two-factor-modal-subtitle">
                Enter your authenticator code
                to access Security.
            </p>


            <input
                type="text"
                class="two-factor-code-input"
                id="securityTwoFactorCode"
                inputmode="numeric"
                maxlength="6"
                autocomplete="one-time-code"
                placeholder="000000"
            >


            <div
                class="two-factor-error"
                id="securityTwoFactorError"
                hidden
            ></div>


            <div class="two-factor-actions">

                <button
                    type="button"
                    class="two-factor-secondary"
                    id="cancelSecurityTwoFactorButton"
                >
                    Cancel
                </button>

                <button
                    type="button"
                    class="two-factor-primary"
                    id="verifySecurityTwoFactorButton"
                >
                    Verify
                </button>

            </div>

        </div>

    `;

    document.body.appendChild(modal);


    const codeInput =
        modal.querySelector(
            "#securityTwoFactorCode"
        );

    const verifyButton =
        modal.querySelector(
            "#verifySecurityTwoFactorButton"
        );

    const cancelButton =
        modal.querySelector(
            "#cancelSecurityTwoFactorButton"
        );

    const error =
        modal.querySelector(
            "#securityTwoFactorError"
        );


    codeInput.focus();


    codeInput.addEventListener(
        "input",
        () => {

            codeInput.value =
                codeInput.value
                    .replace(/\D/g, "")
                    .slice(0, 6);

        }
    );


    verifyButton.addEventListener(
        "click",
        async () => {

            const code =
                codeInput.value.trim();


            if (!/^\d{6}$/.test(code)) {

                error.textContent =
                    "Enter the 6-digit code from your authenticator.";

                error.hidden =
                    false;

                codeInput.focus();

                return;
            }


            verifyButton.disabled =
                true;

            error.hidden =
                true;


            const success =
                await verifySecurityTwoFactor(
                    code
                );


            if (!success) {

                verifyButton.disabled =
                    false;

                error.textContent =
                    "The code is invalid.";

                error.hidden =
                    false;

                codeInput.focus();

                return;

            }


            modal.remove();


            openSecuritySection();

        }
    );


    cancelButton.addEventListener(
        "click",
        () => {

            modal.remove();

        }
    );


    modal.addEventListener(
        "click",
        event => {

            if (
                event.target === modal
            ) {

                modal.remove();

            }

        }
    );

}

async function verifySecurityTwoFactor(code) {

    const session =
        localStorage.getItem(
            "suporly-session"
        );

    if (!session) {

        return false;

    }


    try {

        const response =
            await fetch(
                "https://suporly-backend.onrender.com/api/verify-security-two-factor",
                {
                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body:
                        JSON.stringify({

                            session:
                                session,

                            code:
                                code

                        })
                }
            );


        const result =
            await response.json();


        console.log(
            "Security 2FA response:",
            result
        );


        return result.success === true;

    } catch (error) {

        console.error(
            "Security 2FA failed:",
            error
        );

        return false;

    }

}


/* =========================================================
   INITIALIZE
========================================================= */

loadPreferences();

