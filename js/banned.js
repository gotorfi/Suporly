/* =========================================================
   SUPORLY — BANNED PAGE
========================================================= */


/* =========================================================
   TEMPORARY BAN DATA
========================================================= */

/*
 * Python/backend will eventually provide this.
 *
 * IMPORTANT:
 *
 * This data is ONLY fallback/demo data.
 * It must NOT be trusted for security.
 */

const banData = {

    username:
        "GotorFI",

    type:
        "temporary",

    months:
        2,

    days:
        4,

    reason:
        "Repeated violation of the Suporly community guidelines."

};


/* =========================================================
   FORMAT DURATION
========================================================= */

function formatDuration(data) {

    if (
        data.type ===
        "permanent"
    ) {

        return "PERMANENTLY";

    }


    const parts = [];


    if (
        data.months > 0
    ) {

        parts.push(
            `${data.months} ${
                data.months === 1
                    ? "Month"
                    : "Months"
            }`
        );

    }


    if (
        data.days > 0
    ) {

        parts.push(
            `${data.days} ${
                data.days === 1
                    ? "Day"
                    : "Days"
            }`
        );

    }


    if (!parts.length) {

        return "Less than 1 Day";

    }


    if (parts.length === 2) {

        return (
            parts[0] +
            " and " +
            parts[1]
        );

    }


    return parts[0];

}


/* =========================================================
   RENDER BAN
========================================================= */

function renderBan(data) {

    document
        .getElementById(
            "bannedUsername"
        )
        .textContent =
            "@" + data.username;


    document
        .getElementById(
            "bannedDuration"
        )
        .textContent =
            formatDuration(data);


    document
        .getElementById(
            "bannedReason"
        )
        .textContent =
            data.reason;

}


/* =========================================================
   BACKEND CHECK
========================================================= */

/*
 * Later:
 *
 * Python should provide the real account status.
 *
 * Example response:
 *
 * {
 *     "authenticated": true,
 *     "banned": true,
 *     "ban": {
 *         "type": "temporary",
 *         "months": 2,
 *         "days": 4,
 *         "reason": "..."
 *     }
 * }
 *
 * The frontend MUST NOT be responsible
 * for enforcing the ban.
 */

async function loadBanData() {

    /*
     * TEMPORARILY disabled.
     *
     * Uncomment once the Python API exists.
     */


    /*
    try {

        const response =
            await fetch(
                "/api/account/status",
                {
                    credentials: "include"
                }
            );


        if (!response.ok) {

            throw new Error(
                "Could not retrieve account status."
            );

        }


        const data =
            await response.json();


        if (!data.banned) {

            window.location.replace(
                "home.html"
            );

            return;

        }


        renderBan(
            data.ban
        );


    } catch (error) {

        console.error(
            "Could not load ban status:",
            error
        );

    }
    */


    renderBan(
        banData
    );

}


/* =========================================================
   PREVENT BACK NAVIGATION
========================================================= */

/*
 * This is NOT a security feature.
 *
 * It simply prevents the banned page
 * from being accidentally left using
 * the browser back button.
 */

history.pushState(
    null,
    "",
    location.href
);


window.addEventListener(
    "popstate",
    () => {

        history.pushState(
            null,
            "",
            location.href
        );

    }
);


/* =========================================================
   INITIALIZE
========================================================= */

loadBanData();