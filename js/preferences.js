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

    bio:
        "Building things, playing games and occasionally getting lost in interesting ideas.",

    avatar:
        "assets/temp/default_pfp.png",

    banner:
        "assets/temp/default_banner.png",

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

const preferenceNavItems =
    document.querySelectorAll(
        ".preferences-nav-item"
    );


const preferenceSections =
    document.querySelectorAll(
        ".preference-section"
    );


preferenceNavItems.forEach(
    item => {

        item.addEventListener(
            "click",
            () => {

                const section =
                    item.dataset.section;


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

function loadPreferences() {

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
            preferencesData.bio;


    document
        .getElementById("preferencesAvatar")
        .src =
            preferencesData.avatar;


    document
        .getElementById("bannerPreview")
        .src =
            preferencesData.banner;


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


    document
        .getElementById("twoFactorToggle")
        .checked =
            preferencesData.twoFactor;


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

}


/* =========================================================
   SAVE PROFILE
========================================================= */

document
    .getElementById("saveProfileButton")
    .addEventListener(
        "click",
        () => {

            const data = {

                displayName:
                    document
                        .getElementById("displayName")
                        .value
                        .trim(),

                username:
                    document
                        .getElementById("username")
                        .value
                        .trim(),

                bio:
                    document
                        .getElementById("bio")
                        .value
                        .trim(),

                language:
                    document
                        .getElementById("language")
                        .value,

                timezone:
                    document
                        .getElementById("timezone")
                        .value

            };


            /*
             * Later:
             *
             * Python API request here.
             *
             * Example:
             *
             * fetch("/api/profile", {
             *
             *     method: "POST",
             *
             *     headers: {
             *         "Content-Type":
             *             "application/json"
             *     },
             *
             *     body:
             *         JSON.stringify(data)
             *
             * });
             */


            console.log(
                "Profile update:",
                data
            );

        }
    );


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

document
    .getElementById("changeEmailButton")
    .addEventListener(
        "click",
        () => {

            console.log(
                "Change email"
            );

        }
    );


document
    .getElementById("changePasswordButton")
    .addEventListener(
        "click",
        () => {

            console.log(
                "Change password"
            );

        }
    );


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
   INITIALIZE
========================================================= */

loadPreferences();