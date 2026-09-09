/* =========================================================
   TEMPORARY CONVERSATION DATA
========================================================= */

const conversationData = {

    id: "conversation-001",

    title:
        "What game have you been playing lately?",

    category: {

        name: "Games",

        icon:
            "assets/icons/games.png"

    },

    createdAt: "September 8, 2026",

    context:
        "I've been trying a few different games recently and I'm curious what everyone else has been spending their time on.",


    images: [],


    author: {

        username:
            "GotorFI",

        displayname:
            "GotorFI",

        avatar:
            "assets/temp/default_pfp.png",

        joined:
            "August 2026",

        badges: {

            verified: true,

            mod: false,

            member: true

        }

    },


    reputations: {

        love: {

            name: "Love",

            icon:
                "assets/reputations/love.png",

            className:
                "reputation-love",

            users: [

                {
                    username: "alexfi",
                    displayname: "Alex",
                    avatar: "assets/temp/default_pfp.png",

                    badges: {
                        verified: true,
                        mod: false,
                        warning: false
                    }
                },

                {
                    username: "mika",
                    displayname: "Mika",
                    avatar: "assets/temp/default_pfp.png",

                    badges: {
                        verified: false,
                        mod: true,
                        warning: false
                    }
                },

                {
                    username: "luna",
                    displayname: "Luna",
                    avatar: "assets/temp/default_pfp.png",

                    badges: {
                        verified: true,
                        mod: true,
                        warning: false
                    }
                }

            ]

        },


        support: {

            name: "Support",

            icon:
                "assets/reputations/support.png",

            className:
                "reputation-support",

            users: [

                "Daniel",

                "Kira",

                "Noah",

                "Elias"

            ]

        },


        smile: {

            name: "Smile",

            icon:
                "assets/reputations/smile.png",

            className:
                "reputation-smile",

            users: [

                "Mia",

                "Oliver",

                "Aino"

            ]

        },


        superstar: {

            name: "Superstar",

            icon:
                "assets/reputations/superstar.png",

            className:
                "reputation-superstar",

            users: [

                "Leo",

                "Emma"

            ]

        },


        thumbsup: {

            name: "Thumbs Up",

            icon:
                "assets/reputations/thumbsup.png",

            className:
                "reputation-thumbsup",

            users: [

                "Sam",

                "Chris",

                "Finn"

            ]

        }

    },


    replies: [

        {
            id:
                "reply-1",

            username:
                "alexfi",

            displayname:
                "Alex",

            avatar:
                "assets/temp/default_pfp.png",

            badges: {

                verified:
                    true,

                mod:
                    false,

                warning:
                    false

            },

            time:
                "2 hours ago",

            text:
                "I've been playing Hollow Knight again. Somehow I keep coming back to it."
        },


        {
            id:
                "reply-2",

            username:
                "luna",

            displayname:
                "Luna",

            avatar:
                "assets/temp/default_pfp.png",

            badges: {

                verified:
                    false,

                mod:
                    true,

                warning:
                    false

            },

            time:
                "1 hour ago",

            text:
                "I've been playing a lot of indie games lately. There are so many interesting ones coming out."
        },


        {
            id:
                "reply-3",

            username:
                "mika",

            displayname:
                "Mika",

            avatar:
                "assets/temp/default_pfp.png",

            badges: {

                verified:
                    true,

                mod:
                    true,

                warning:
                    false

            },

            time:
                "48 minutes ago",

            text:
                "Minecraft. Still Minecraft. I don't think I'm ever escaping it."
        },


        {
            id:
                "reply-4",

            username:
                "noah",

            displayname:
                "Noah",

            avatar:
                "assets/temp/default_pfp.png",

            badges: {

                verified:
                    false,

                mod:
                    false,

                warning:
                    true

            },

            time:
                "12 minutes ago",

            text:
                "I finally started Elden Ring. I understand the hype now."
        }

    ]

};


/* =========================================================
   DOM
========================================================= */

const reputationList =
    document.getElementById(
        "reputationList"
    );

const reputationTotal =
    document.getElementById(
        "reputationTotal"
    );

const reputationModal =
    document.getElementById(
        "reputationModal"
    );

const reputationGivers =
    document.getElementById(
        "reputationGivers"
    );

const modalReputationIcon =
    document.getElementById(
        "modalReputationIcon"
    );

const modalReputationTitle =
    document.getElementById(
        "modalReputationTitle"
    );

const replyList =
    document.getElementById(
        "replyList"
    );

const replyCount =
    document.getElementById(
        "replyCount"
    );

const reportModal =
    document.getElementById(
        "reportModal"
    );

const editModal =
    document.getElementById(
        "editModal"
    );


let selectedReportReason =
    null;

let editingReplyId =
    null;


const saveButton =
    document.getElementById(
        "saveButton"
    );

const saveButtonIcon =
    document.getElementById(
        "saveButtonIcon"
    );

const saveButtonText =
    document.getElementById(
        "saveButtonText"
    );


let selectedReputationId =
    null;


let conversationSaved =
    false;



/* =========================================================
   BASIC CONTENT
========================================================= */

function renderConversation() {

    document
        .querySelector(".conversation-title")
        .textContent =
            `“${conversationData.title}”`;


    document
        .querySelector(".origin-category span")
        .textContent =
            conversationData.category.name;


    document
        .querySelector(".origin-category-icon")
        .src =
            conversationData.category.icon;


    document
        .getElementById("conversationDate")
        .textContent =
            conversationData.createdAt;


    document
        .getElementById("conversationContext")
        .textContent =
            conversationData.context;


    document
        .querySelector(".author-avatar")
        .src =
            conversationData.author.avatar;


    document
        .querySelector(".author-name-row strong")
        .textContent =
            conversationData.author.displayname;


    document
        .querySelector(".author-username")
        .textContent =
            `@${conversationData.author.username}`;


    renderBadges();

    renderReputations();

    renderReplies();

    renderGallery();

    renderSaveButton();

}


/* =========================================================
   BADGES
========================================================= */


function createBadgeElements(
    badges,
    container
) {

    container.innerHTML = "";

    if (!badges) {
        return;
    }


    if (badges.verified) {

        const badge =
            document.createElement("img");

        badge.className =
            "profile-inline-badge profile-inline-badge-verified";

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
            "profile-inline-badge profile-inline-badge-moderator";

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
            "profile-inline-badge profile-inline-badge-warning";

        badge.src =
            "assets/logos/warned.png";

        badge.alt =
            "Warning";

        badge.title =
            "Warning active";

        container.appendChild(
            badge
        );
    }

}


function renderBadges() {
    const container = document.querySelector(".author-inline-badges");

    if (!container) {
        return;
    }

    createBadgeElements(
        conversationData.author.badges,
        container
    );
}


/* =========================================================
   REPUTATION
========================================================= */

function getReputationTotal() {

    return Object.values(
        conversationData.reputations
    )
    .reduce(
        (total, reputation) =>
            total + reputation.users.length,
        0
    );

}

function toggleReputation(id) {

    const reputation =
        conversationData.reputations[id];


    if (!reputation) {
        return;
    }


    const existingIndex =
        reputation.users.findIndex(
            user =>
                user.username === "you"
        );


    if (
        selectedReputationId === id
    ) {

        if (
            existingIndex !== -1
        ) {

            reputation.users.splice(
                existingIndex,
                1
            );

        }


        selectedReputationId =
            null;


        renderReputations();

        return;
    }


    if (
        selectedReputationId
    ) {

        const previous =
            conversationData.reputations[
                selectedReputationId
            ];


        if (previous) {

            previous.users =
                previous.users.filter(
                    user =>
                        user.username !== "you"
                );

        }

    }


    reputation.users.push({

        username:
            "you",

        displayname:
            "You",

        avatar:
            "assets/temp/default_pfp.png",

        badges: {

            verified:
                false,

            mod:
                false,

            warning:
                false

        }

    });


    selectedReputationId =
        id;


    renderReputations();

    playReputationBurst(
        reputation.icon,
        reputation.className
    );

    showPrompt(
        "Thank you for giving a reputation!"
    );

}




function renderReputations() {

    reputationList.innerHTML = "";


    Object.entries(
        conversationData.reputations
    )
    .forEach(
        ([id, reputation]) => {

            const button =
                document.createElement(
                    "button"
                );


            button.type =
                "button";


            button.className =
                `reputation-button ${reputation.className}`;


            button.dataset.reputationId =
                id;


            button.innerHTML = `

                <img
                    src="${reputation.icon}"
                    alt="${escapeHTML(
                        reputation.name
                    )}"
                >

                <span
                    class="reputation-count"
                >
                    ${reputation.users.length}
                </span>

                <span
                    class="reputation-tooltip"
                >
                    See reactions
                </span>

            `;


            button.addEventListener(
                "click",
                event => {

                    if (
                        event.target.closest(
                            ".reputation-tooltip"
                        )
                    ) {

                        return;

                    }


                    toggleReputation(
                        id
                    );

                }
            );


            button
                .querySelector(
                    ".reputation-tooltip"
                )
                .addEventListener(
                    "click",
                    event => {

                        event.stopPropagation();

                        openReputation(
                            id
                        );

                    }
                );


            reputationList.appendChild(
                button
            );

        }
    );


    reputationTotal.textContent =
        getReputationTotal();

}


function openReputation(id) {

    const reputation =
        conversationData.reputations[id];


    if (!reputation) {
        return;
    }


    modalReputationTitle.textContent =
        reputation.name;


    modalReputationIcon.innerHTML = `

        <img
            src="${reputation.icon}"
            alt=""
            class="${reputation.className}"
        >

    `;


    reputationGivers.innerHTML =
        "";


    reputation.users.forEach(
        user => {

            const element =
                document.createElement(
                    "div"
                );


            element.className =
                "reputation-giver";


            element.innerHTML = `

                <img
                    src="${user.avatar}"
                    alt=""
                >

                <div class="reputation-giver-info">

                    <div
                        class="reputation-giver-name"
                    >

                        <strong>
                            ${escapeHTML(
                                user.displayname
                            )}
                        </strong>

                        <div
                            class="reputation-giver-badges"
                        ></div>

                    </div>

                    <span>
                        @${escapeHTML(
                            user.username
                        )}
                    </span>

                </div>

            `;


            const badgeContainer =
                element.querySelector(
                    ".reputation-giver-badges"
                );


            createBadgeElements(
                user.badges,
                badgeContainer
            );


            reputationGivers.appendChild(
                element
            );

        }
    );


    reputationModal.hidden =
        false;

}


/* =========================================================
   REPLIES
========================================================= */

function renderReplies() {

    replyList.innerHTML = "";


    conversationData.replies.forEach(
        reply => {

            const element =
                document.createElement(
                    "article"
                );


            element.className =
                "reply-message";


            element.dataset.replyId =
                reply.id;


            element.innerHTML = `

                <img
                    class="reply-avatar"
                    src="${reply.avatar}"
                    alt=""
                >


                <div class="reply-content">

                    <div class="reply-header">

                        <div class="reply-user">

                            <div class="reply-identity">

                                <div class="reply-displayname">

                                    <strong>
                                        ${escapeHTML(
                                            reply.displayname
                                        )}
                                    </strong>

                                    <div
                                        class="reply-badges"
                                    ></div>

                                </div>


                                <span
                                    class="reply-username"
                                >
                                    @${escapeHTML(
                                        reply.username
                                    )}
                                </span>

                            </div>


                            <span class="reply-time">
                                ${escapeHTML(
                                    reply.time
                                )}
                            </span>

                        </div>

                    </div>


                    <p class="reply-body">
                        ${escapeHTML(
                            reply.text
                        )}
                    </p>


                    <div class="reply-footer">

                        <button
                            class="reply-action edit-reply"
                            type="button"
                        >
                            Edit
                        </button>


                        <button
                            class="reply-action remove-reply"
                            type="button"
                        >
                            Remove
                        </button>


                        <button
                            class="reply-action danger report-reply"
                            type="button"
                        >
                            Report
                        </button>

                    </div>

                </div>

            `;


            const badgeContainer =
                element.querySelector(
                    ".reply-badges"
                );


            createBadgeElements(
                reply.badges,
                badgeContainer
            );


            replyList.appendChild(
                element
            );

        }
    );


    replyCount.textContent =
        conversationData.replies.length;

}


/* =========================================================
   REPLY EVENTS
========================================================= */

replyList.addEventListener(
    "click",
    event => {

        const reply =
            event.target.closest(
                ".reply-message"
            );


        if (!reply) {
            return;
        }


        const replyId =
            reply.dataset.replyId;


        if (
            event.target.classList.contains(
                "edit-reply"
            )
        ) {

            openEdit(
                replyId
            );

        }


        if (
            event.target.classList.contains(
                "remove-reply"
            )
        ) {

            removeReply(
                replyId
            );

        }


        if (
            event.target.classList.contains(
                "report-reply"
            )
        ) {

            openReport(
                "reply",
                replyId
            );

        }

    }
);


/* =========================================================
   REMOVE REPLY
========================================================= */

function removeReply(id) {

    const confirmed =
        confirm(
            "Remove this reply?"
        );


    if (!confirmed) {
        return;
    }


    conversationData.replies =
        conversationData.replies.filter(
            reply =>
                reply.id !== id
        );


    renderReplies();

}


/* =========================================================
   EDIT REPLY
========================================================= */

function openEdit(id) {

    const reply =
        conversationData.replies.find(
            item =>
                item.id === id
        );


    if (!reply) {
        return;
    }


    editingReplyId =
        id;


    document
        .getElementById("editInput")
        .value =
            reply.text;


    editModal.hidden =
        false;

}


document
    .getElementById("submitEditButton")
    .addEventListener(
        "click",
        () => {

            const input =
                document.getElementById(
                    "editInput"
                );


            const text =
                input.value.trim();


            if (!text) {
                return;
            }


            const reply =
                conversationData.replies.find(
                    item =>
                        item.id ===
                        editingReplyId
                );


            if (!reply) {
                return;
            }


            reply.text =
                text;


            editModal.hidden =
                true;


            editingReplyId =
                null;


            renderReplies();

        }
    );


/* =========================================================
   NEW REPLY
========================================================= */

const replyInput =
    document.getElementById(
        "replyInput"
    );


const replyCharacterCount =
    document.getElementById(
        "replyCharacterCount"
    );


replyInput.addEventListener(
    "input",
    () => {

        replyCharacterCount.textContent =
            replyInput.value.length;

    }
);


document
    .getElementById("submitReplyButton")
    .addEventListener(
        "click",
        () => {

            const text =
                replyInput.value.trim();


            if (!text) {
                return;
            }


            conversationData.replies.push({

                id:
                    `reply-${Date.now()}`,

                username:
                    "You",

                avatar:
                    "assets/temp/default_pfp.png",

                time:
                    "Just now",

                text:
                    text

            });


            replyInput.value = "";

            replyCharacterCount.textContent =
                "0";


            renderReplies();

        }
    );


document
    .getElementById("cancelReplyButton")
    .addEventListener(
        "click",
        () => {

            replyInput.value = "";

            replyCharacterCount.textContent =
                "0";

        }
    );


document
    .getElementById("replyButton")
    .addEventListener(
        "click",
        () => {

            replyInput.focus();

            document
                .getElementById("replyComposer")
                .scrollIntoView({
                    behavior: "smooth",
                    block: "center"
                });

        }
    );


/* =========================================================
   REPORT
========================================================= */

function openReport(
    targetType,
    targetId
) {

    reportModal.dataset.targetType =
        targetType;


    reportModal.dataset.targetId =
        targetId;


    selectedReportReason =
        null;


    document
        .querySelectorAll(
            ".report-reasons button"
        )
        .forEach(
            button =>
                button.classList.remove(
                    "selected"
                )
        );


    document
        .getElementById("reportDetails")
        .value = "";


    reportModal.hidden =
        false;

}


document
    .getElementById(
        "reportOriginButton"
    )
    .addEventListener(
        "click",
        () => {

            openReport(
                "conversation",
                conversationData.id
            );

        }
    );


document
    .getElementById("reportReasons")
    .addEventListener(
        "click",
        event => {

            const button =
                event.target.closest(
                    "button"
                );


            if (!button) {
                return;
            }


            document
                .querySelectorAll(
                    ".report-reasons button"
                )
                .forEach(
                    item =>
                        item.classList.remove(
                            "selected"
                        )
                );


            button.classList.add(
                "selected"
            );


            selectedReportReason =
                button.dataset.reason;

        }
    );


document
    .getElementById(
        "submitReportButton"
    )
    .addEventListener(
        "click",
        () => {

            if (!selectedReportReason) {

                alert(
                    "Please select a reason."
                );

                return;

            }


            const details =
                document
                    .getElementById(
                        "reportDetails"
                    )
                    .value
                    .trim();


            console.log({

                type:
                    reportModal.dataset.targetType,

                target:
                    reportModal.dataset.targetId,

                reason:
                    selectedReportReason,

                details:
                    details

            });


            reportModal.hidden =
                true;

        }
    );




document
    .getElementById("repliesJump")
    .addEventListener(
        "click",
        () => {

            document
                .getElementById("replyComposer")
                .scrollIntoView({
                    behavior: "smooth",
                    block: "center"
                });


            setTimeout(
                () => {

                    replyInput.focus();

                },
                500
            );

        }
    );

/* =========================================================
   GALLERY
========================================================= */

let galleryIndex =
    0;


function renderGallery() {

    const gallery =
        document.getElementById(
            "conversationGallery"
        );


    if (
        !conversationData.images ||
        conversationData.images.length === 0
    ) {

        gallery.hidden =
            true;

        return;

    }


    gallery.hidden =
        false;


    updateGallery();

}


function updateGallery() {

    const image =
        document.getElementById(
            "galleryImage"
        );


    const background =
        document.querySelector(
            ".gallery-background"
        );


    const counter =
        document.getElementById(
            "galleryCounter"
        );


    const images =
        conversationData.images;


    const current =
        images[galleryIndex];


    image.src =
        current;


    background.style.backgroundImage =
        `url("${current}")`;


    counter.textContent =
        `${galleryIndex + 1} / ${images.length}`;


    const left =
        document.querySelector(
            ".gallery-arrow-left"
        );


    const right =
        document.querySelector(
            ".gallery-arrow-right"
        );


    left.hidden =
        images.length <= 1;


    right.hidden =
        images.length <= 1;

}


document
    .querySelector(".gallery-arrow-left")
    .addEventListener(
        "click",
        () => {

            galleryIndex--;

            if (galleryIndex < 0) {

                galleryIndex =
                    conversationData.images.length - 1;

            }

            updateGallery();

        }
    );


document
    .querySelector(".gallery-arrow-right")
    .addEventListener(
        "click",
        () => {

            galleryIndex++;

            if (
                galleryIndex >=
                conversationData.images.length
            ) {

                galleryIndex = 0;

            }

            updateGallery();

        }
    );


function playReputationBurst(
    icon,
    reputationClass
) {

    const container =
        document.getElementById(
            "reputationBurst"
        );

    if (!container) {
        return;
    }


    const amount =
        Math.floor(
            Math.random() * 11
        ) + 18;


    for (let i = 0; i < amount; i++) {

        const image =
            document.createElement("img");


        image.src =
            icon;

        image.alt = "";

        image.className =
            `reputation-float ${reputationClass}`;


        const startX =
            Math.random() * 100;


        const drift =
            (Math.random() - 0.5) * 260;

        const duration =
            2.8 + Math.random() * 2.2;

        const delay =
            Math.random() * 0.7;

        const opacity =
            0.3 + Math.random() * 0.7;

        const size =
            18 + Math.random() * 22;


        image.style.left =
            `${startX}%`;

        image.style.width =
            `${size}px`;

        image.style.height =
            `${size}px`;

        image.style.opacity =
            opacity;

        image.style.setProperty(
            "--reputation-drift",
            `${drift}px`
        );

        image.style.animationDuration =
            `${duration}s`;

        image.style.animationDelay =
            `${delay}s`;
        container.appendChild(
            image
        );

    }


    setTimeout(() => {

        container.innerHTML = "";

    }, 5500);

}
function showPrompt(
    message
) {

    const prompt =
        document.getElementById(
            "conversationPrompt"
        );


    prompt.textContent =
        message;


    prompt.classList.add(
        "visible"
    );


    setTimeout(
        () => {

            prompt.classList.remove(
                "visible"
            );

        },
        2200
    );

}


saveButton.addEventListener(
    "click",
    () => {

        conversationSaved =
            !conversationSaved;


        renderSaveButton();


        if (conversationSaved) {

            showPrompt(
                "Conversation saved"
            );

        } else {

            showPrompt(
                "Conversation removed from saved"
            );

        }

    }
);


/* =========================================================
   MODAL CLOSE
========================================================= */

document.addEventListener(
    "click",
    event => {

        const close =
            event.target.closest(
                "[data-close-modal]"
            );


        if (!close) {
            return;
        }


        const modal =
            close.closest(
                ".conversation-modal-overlay"
            );


        if (modal) {
            modal.hidden = true;
        }

    }
);


document
    .querySelectorAll(
        ".conversation-modal-overlay"
    )
    .forEach(
        overlay => {

            overlay.addEventListener(
                "click",
                event => {

                    if (
                        event.target ===
                        overlay
                    ) {

                        overlay.hidden =
                            true;

                    }

                }
            );

        }
    );



const pageScrollControls =
    document.querySelector(
        ".page-scroll-controls"
    );

const moveToTop =
    document.getElementById(
        "moveToTop"
    );

const moveToBottom =
    document.getElementById(
        "moveToBottom"
    );


function updateScrollControls() {

    const scrollTop =
        window.scrollY;

    const maxScroll =
        document.documentElement.scrollHeight -
        window.innerHeight;


    const nearTop =
        scrollTop < 120;

    const nearBottom =
        scrollTop >
        maxScroll - 120;


    if (nearTop && nearBottom) {

        pageScrollControls.classList.remove(
            "visible"
        );

        return;
    }


    pageScrollControls.classList.add(
        "visible"
    );


    moveToTop.hidden =
        nearTop;

    moveToBottom.hidden =
        nearBottom;

}


window.addEventListener(
    "scroll",
    updateScrollControls,
    {
        passive: true
    }
);


moveToTop.addEventListener(
    "click",
    () => {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    }
);


moveToBottom.addEventListener(
    "click",
    () => {

        window.scrollTo({
            top:
                document.documentElement.scrollHeight,
            behavior: "smooth"
        });

    }
);


updateScrollControls();

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

renderConversation();