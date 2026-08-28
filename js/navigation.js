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

const DEFAULT_PROFILE_IMAGE =
    "assets/temp/default_pfp.png";


function loadProfileImage() {

    const profileIcon =
        document.getElementById(
            "profileIcon"
        );


    if (!profileIcon)
        return;


    /*
     * Later this can come from
     * the logged-in user's account.
     */

    const savedProfileImage =
        localStorage.getItem(
            "suporly-profile-image"
        );


    if (
        savedProfileImage &&
        savedProfileImage.trim()
    ) {

        profileIcon.src =
            savedProfileImage;

    } else {

        profileIcon.src =
            DEFAULT_PROFILE_IMAGE;

    }


    profileIcon.onerror =
        () => {

            profileIcon.src =
                DEFAULT_PROFILE_IMAGE;

        };

}


loadProfileImage();


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