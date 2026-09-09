/* =========================================================
   SUPORLY PROFILE
========================================================= */


/* =========================================================
   PROFILE
========================================================= */

async function renderProfile() {

    const session =
        await loadSessionData();

    if (!session) {
        window.location.replace("access-denied.html");
        return;
    }


    /*
     * Get the session ID.
     */

    const sessionId =
        localStorage.getItem("suporly-session");


    if (!sessionId) {
        hidePageLoader();
        return;
    }


    /*
     * Get the requested username from the URL.
     *
     * /profile.html
     * /profile.html?user=GotorFI
     */

    const params =
        new URLSearchParams(
            window.location.search
        );


    let username =
        params.get("user");


    /*
     * If no username was provided,
     * open the logged-in user's profile.
     */

    if (!username) {

        username =
            session.username.replace("@", "");

        window.location.replace(
            "profile.html?user="
            + encodeURIComponent(username)
        );

        return;
    }


    /*
     * Get the requested public profile.
     */

    try {

        const response =
            await fetch(
                "https://suporly-backend.onrender.com/api/profile/"
                + encodeURIComponent(username)
                + "?session="
                + encodeURIComponent(sessionId)
            );


        const data =
            await response.json();


        if (!data.success || !data.profile) {

            console.error(
                "Failed to load profile.",
                data
            );

            hidePageLoader();
            return;
        }


        const profile =
            data.profile;

        const viewer =
            data.viewer;


        /*
         * Store the currently loaded profile.
         */

        window.profileData =
            profile;


        /*
         * Username
         */

        document
            .getElementById("profileUsername")
            .textContent =
                profile.username;


        /*
         * Display name
         */

        document
            .getElementById("profileDisplayName")
            .textContent =
                profile.displayname;


        /*
         * Avatar
         */

        const avatar =
            document.getElementById(
                "profileAvatar"
            );


        if (profile.avatar) {

            await new Promise(
                resolve => {

                    avatar.onload =
                        () => resolve();

                    avatar.onerror =
                        () => resolve();

                    avatar.src =
                        "https://suporly-backend.onrender.com/images/avatar/"
                        + profile.avatar;

                }
            );

        } else {

            avatar.src =
                "assets/temp/default_pfp.png";

        }


        /*
         * Banner
         */

        const profileBackground =
            document.getElementById(
                "profileBackground"
            );


        if (profile.banner) {

            profileBackground.style.backgroundImage =
                "url('https://suporly-backend.onrender.com/images/banner/"
                + profile.banner
                + "')";

        } else {

            profileBackground.style.backgroundImage =
                "none";

        }


        /*
         * Verified badge
         */

        const verifiedBadge =
            document.getElementById(
                "profileVerifiedBadge"
            );


        verifiedBadge.hidden =
            !profile.verified;


        /*
         * Moderator badge
         */

        const modBadge =
            document.getElementById(
                "profileModBadge"
            );


        modBadge.hidden =
            !profile.mod;


        /*
         * Bio
         */

        document
            .getElementById("profileBio")
            .textContent =
                profile.bio || "";


        /*
         * Edit profile
         *
         * The backend decides whether
         * the viewer owns this profile.
         */

        const editProfileButton =
            document.getElementById(
                "editProfileButton"
            );


        if (editProfileButton) {

            editProfileButton.hidden =
                !viewer.is_owner;

        }


        /*
         * These values are not provided
         * by the public profile endpoint yet.
         */

        document
            .getElementById("profileJoinDate")
            .textContent =
                "—";


        document
            .getElementById("profileReputation")
            .textContent =
                "—";


        /*
         * These sections will be connected
         * to backend data later.
         */

        renderStatistics();

        renderPosts();

        renderComments();

        renderCategories();

        renderAchievements();


        hidePageLoader();

    } catch (error) {

        console.error(
            "Failed to load profile:",
            error
        );

        hidePageLoader();

    }

}


/* =========================================================
   STATISTICS
========================================================= */

function renderStatistics() {

    document
        .getElementById("statPosts")
        .textContent =
            "—";


    document
        .getElementById("statComments")
        .textContent =
            "—";


    document
        .getElementById("statAppreciation")
        .textContent =
            "—";


    document
        .getElementById("statSaved")
        .textContent =
            "—";


    document
        .getElementById("aboutReputation")
        .textContent =
            "—";


    document
        .getElementById("aboutPosts")
        .textContent =
            "—";


    document
        .getElementById("aboutComments")
        .textContent =
            "—";


    document
        .getElementById("aboutAppreciation")
        .textContent =
            "—";

}


/* =========================================================
   POSTS
========================================================= */

function renderPosts() {

    const container =
        document.getElementById(
            "profilePostList"
        );


    container.innerHTML = "";

}


/* =========================================================
   COMMENTS
========================================================= */

function renderComments() {

    const container =
        document.getElementById(
            "profileCommentList"
        );


    container.innerHTML = "";

}


/* =========================================================
   CATEGORIES
========================================================= */

function renderCategories() {

    const container =
        document.getElementById(
            "profileCategoryList"
        );


    container.innerHTML = "";

}


/* =========================================================
   ACHIEVEMENTS
========================================================= */

function renderAchievements() {

    const container =
        document.getElementById(
            "profileAchievements"
        );


    container.innerHTML = "";

}


/* =========================================================
   HTML ESCAPE
========================================================= */

function escapeHTML(value) {

    const div =
        document.createElement("div");


    div.textContent =
        value;


    return div.innerHTML;

}


/* =========================================================
   EDIT PROFILE
========================================================= */

const editProfileButton =
    document.getElementById(
        "editProfileButton"
    );


if (editProfileButton) {

    editProfileButton.addEventListener(
        "click",
        () => {

            window.location.href =
                "preferences.html";

        }
    );

}


/* =========================================================
   INITIALIZE
========================================================= */

renderProfile();