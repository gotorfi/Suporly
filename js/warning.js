/* =========================================================
   SUPORLY — WARNING SYSTEM
========================================================= */


/* =========================================================
   TEMPORARY DATA
========================================================= */

/*
 * Later this information comes from Python.
 */

const warningData = {

    active:
        true,

    username:
        "GotorFI",

    reason:
        "Repeatedly posting content in the wrong categories.",

    expiresAt:
        "2026-11-27T00:00:00Z"

};


/* =========================================================
   STORAGE
========================================================= */

const WARNING_SEEN_KEY =
    "suporly_warning_seen";


/* =========================================================
   ELEMENTS
========================================================= */

const warningOverlay =
    document.getElementById(
        "warningOverlay"
    );


const warningUsername =
    document.getElementById(
        "warningUsername"
    );


const warningReason =
    document.getElementById(
        "warningReason"
    );


const warningAcknowledge =
    document.getElementById(
        "warningAcknowledge"
    );


/* =========================================================
   SHOW
========================================================= */

function showWarning() {

    if (!warningOverlay) {

        return;

    }


    warningOverlay.classList.add(
        "visible"
    );


    warningOverlay.setAttribute(
        "aria-hidden",
        "false"
    );


    document.body.style.overflow =
        "hidden";


    /*
     * Prevent clicking through the modal.
     */

    setTimeout(
        () => {

            warningAcknowledge?.focus();

        },
        50
    );

}


/* =========================================================
   CLOSE
========================================================= */

function closeWarning() {

    if (!warningOverlay) {

        return;

    }


    warningOverlay.classList.remove(
        "visible"
    );


    warningOverlay.setAttribute(
        "aria-hidden",
        "true"
    );


    document.body.style.overflow =
        "";


    sessionStorage.setItem(
        WARNING_SEEN_KEY,
        "true"
    );

}


/* =========================================================
   RENDER
========================================================= */

function renderWarning(data) {

    if (!data) {

        return;

    }


    if (warningUsername) {

        warningUsername.textContent =
            "@" + data.username;

    }


    if (warningReason) {

        warningReason.textContent =
            data.reason;

    }

}


/* =========================================================
   INITIALIZE
========================================================= */

function initializeWarning() {

    if (!warningOverlay) {

        return;

    }


    if (!warningData.active) {

        return;

    }


    renderWarning(
        warningData
    );


    const alreadySeen =
        sessionStorage.getItem(
            WARNING_SEEN_KEY
        );


    if (alreadySeen === "true") {

        return;

    }


    showWarning();

}


/* =========================================================
   BUTTON
========================================================= */

warningAcknowledge?.addEventListener(
    "click",
    closeWarning
);


/* =========================================================
   PREVENT ESCAPE
========================================================= */

/*
 * The warning should be explicitly acknowledged.
 */

document.addEventListener(
    "keydown",
    event => {

        if (
            event.key !== "Escape"
        ) {

            return;

        }


        if (
            warningOverlay?.classList.contains(
                "visible"
            )
        ) {

            event.preventDefault();

        }

    }
);


/* =========================================================
   START
========================================================= */

initializeWarning();