/* =========================================================
   SUPORLY NAVIGATION
========================================================= */

/* =========================================================
   THEME
========================================================= */

const themeMenu =
    document.querySelector(".theme-menu");

const themeMenuDropdown =
    document.getElementById("themeMenuDropdown");

const themeMenuButton =
    document.getElementById("themeMenuButton");

const themeOptions =
    document.querySelectorAll(".theme-option");


function setTheme(theme) {

    document.body.dataset.theme =
        theme;


    localStorage.setItem(
        "suporly-theme",
        theme
    );


    themeOptions.forEach(option => {

        option.classList.toggle(
            "active",
            option.dataset.theme === theme
        );

    });


    const themeMenuIcon =
        document.getElementById(
            "themeMenuIcon"
        );

    const themeMenuLabel =
        document.getElementById(
            "themeMenuLabel"
        );


    const themeData = {

        light: {
            icon: "☀",
            label: "Light"
        },

        dark: {
            icon: "◐",
            label: "Dark"
        },

        suporly: {
            icon: "✦",
            label: "Suporly"
        }

    };


    const currentTheme =
        themeData[theme];


    if (!currentTheme) {
        return;
    }


    if (themeMenuIcon) {

        themeMenuIcon.textContent =
            currentTheme.icon;

    }


    if (themeMenuLabel) {

        themeMenuLabel.textContent =
            currentTheme.label;

    }

}


const savedTheme =
    localStorage.getItem(
        "suporly-theme"
    ) || "light";


setTheme(savedTheme);


/* =========================================================
   THEME MENU
========================================================= */

if (
    themeMenuButton &&
    themeMenu
) {

    themeMenuButton.addEventListener(
        "click",
        event => {

            event.stopPropagation();


            const isOpen =
                themeMenu.classList.toggle(
                    "open"
                );


            themeMenuButton.setAttribute(
                "aria-expanded",
                isOpen
            );

        }
    );

}


themeOptions.forEach(option => {

    option.addEventListener(
        "click",
        event => {

            event.stopPropagation();


            setTheme(
                option.dataset.theme
            );


            if (themeMenu) {

                themeMenu.classList.remove(
                    "open"
                );

            }


            if (themeMenuButton) {

                themeMenuButton.setAttribute(
                    "aria-expanded",
                    "false"
                );

            }

        }
    );

});


document.addEventListener(
    "click",
    () => {

        if (!themeMenu)
            return;


        themeMenu.classList.remove(
            "open"
        );


        if (themeMenuButton) {

            themeMenuButton.setAttribute(
                "aria-expanded",
                "false"
            );

        }

    }
);


/* =========================================================
   PROFILE IMAGE
========================================================= */

/* =========================================================
   PROFILE IMAGE
========================================================= */


/* =========================================================
   PROFILE IMAGE
========================================================= */

const DEFAULT_PROFILE_IMAGE =
    "assets/temp/default_pfp.png";


async function loadProfileImage() {

    const profileIcon =
        document.getElementById(
            "profileIcon"
        );

    if (!profileIcon)
        return;


    const session =
        await loadSessionData();

    if (!session)
        return;


    const avatarId =
        session.settings["profile-avatar"];


    if (avatarId) {

        await new Promise(
            resolve => {

                profileIcon.onload =
                    () => resolve();

                profileIcon.onerror =
                    () => {

                        profileIcon.src =
                            DEFAULT_PROFILE_IMAGE;

                        resolve();

                    };

                profileIcon.src =
                    "https://suporly-backend.onrender.com/images/avatar/"
                    + avatarId;

            }
        );

    } else {

        profileIcon.src =
            DEFAULT_PROFILE_IMAGE;

    }

}

/* =========================================================
   ACCOUNT
========================================================= */

function createAccountBadges(badges) {

    const container =
        document.getElementById(
            "accountBadges"
        );

    if (!container) {
        return;
    }


    container.innerHTML = "";


    if (!badges) {
        return;
    }


    if (badges.verified) {

        const badge =
            document.createElement("img");

        badge.className =
            "account-badge";

        badge.src =
            "assets/logos/verified.png";

        badge.alt =
            "Verified";

        badge.title =
            "Verified account";

        container.appendChild(
            badge
        );

    }


    if (badges.mod) {

        const badge =
            document.createElement("img");

        badge.className =
            "account-badge";

        badge.src =
            "assets/logos/mod.png";

        badge.alt =
            "Moderator";

        badge.title =
            "Moderator";

        container.appendChild(
            badge
        );

    }


    if (badges.warning) {

        const badge =
            document.createElement("img");

        badge.className =
            "account-badge account-badge-warning";

        badge.src =
            "assets/logos/warned.png";

        badge.alt =
            "Warning";

        badge.title =
            "Warning";

        container.appendChild(
            badge
        );

    }

}


async function loadAccountInfo() {

    const displayname =
        document.getElementById(
            "accountDisplayname"
        );


    if (!displayname) {
        return;
    }


    const session =
        await loadSessionData();


    if (!session) {

        displayname.textContent =
            "Account";

        return;

    }


    displayname.textContent =
        session.displayname || "Account";


    createAccountBadges(
        session.settings
    );

}



async function initializeNavigation() {

    await loadProfileImage();

    await loadAccountInfo();

    hidePageLoader();

}


initializeNavigation();





/* =========================================================
   SEARCH
========================================================= */

const conversationSearch =
    document.getElementById(
        "conversationSearch"
    );


if (conversationSearch) {

    conversationSearch.addEventListener(
        "keydown",
        event => {

            if (
                event.key !==
                "Enter"
            ) {

                return;

            }


            const query =
                conversationSearch.value
                    .trim();


            if (!query)
                return;


            /*
             * Search page can later receive
             * the query through the URL.
             */

            window.location.href =
                `search.html?q=${encodeURIComponent(query)}`;

        }
    );

}