/* =========================================================
   SEARCH PAGE
========================================================= */

const conversationSearchList =
    document.getElementById("conversationSearchList");

const profileSearchList =
    document.getElementById("profileSearchList");

const conversationSort =
    document.getElementById("conversationSort");

const conversationLoadMore =
    document.getElementById("conversationLoadMore");

const searchQueryLabel =
    document.getElementById("searchQueryLabel");

const searchTabs =
    document.querySelectorAll(".search-tab");


/* =========================================================
   MOCK DATA
========================================================= */

const conversationResults = [

    {
        id: "conversation-001",

        title:
            "What game have you been playing lately?",

        author: {
            username: "GotorFI",
            displayname: "GotorFI",
            avatar: "assets/temp/default_pfp.png",

            badges: {
                verified: true,
                mod: false,
                warning: false
            }
        },

        createdAt: "September 8, 2026",

        timestamp:
            new Date("2026-09-08T14:00:00"),

        replies: 24,

        reputations: {
            love: 12,
            support: 8,
            smile: 5,
            superstar: 2,
            thumbsup: 9
        }

    },


    {
        id: "conversation-002",

        title:
            "Can someone help me with this Minecraft problem?",

        author: {
            username: "alexfi",
            displayname: "Alex",
            avatar: "assets/temp/default_pfp.png",

            badges: {
                verified: true,
                mod: false,
                warning: false
            }
        },

        createdAt: "September 7, 2026",

        timestamp:
            new Date("2026-09-07T18:30:00"),

        replies: 41,

        reputations: {
            love: 5,
            support: 14,
            smile: 4,
            superstar: 1,
            thumbsup: 18
        }

    },


    {
        id: "conversation-003",

        title:
            "Need help choosing a new keyboard",

        author: {
            username: "luna",
            displayname: "Luna",
            avatar: "assets/temp/default_pfp.png",

            badges: {
                verified: false,
                mod: true,
                warning: false
            }
        },

        createdAt: "September 6, 2026",

        timestamp:
            new Date("2026-09-06T11:20:00"),

        replies: 17,

        reputations: {
            love: 8,
            support: 7,
            smile: 3,
            superstar: 0,
            thumbsup: 6
        }

    },


    {
        id: "conversation-004",

        title:
            "What are you working on right now?",

        author: {
            username: "mika",
            displayname: "Mika",
            avatar: "assets/temp/default_pfp.png",

            badges: {
                verified: true,
                mod: true,
                warning: false
            }
        },

        createdAt: "September 5, 2026",

        timestamp:
            new Date("2026-09-05T20:10:00"),

        replies: 53,

        reputations: {
            love: 20,
            support: 13,
            smile: 9,
            superstar: 5,
            thumbsup: 15
        }

    },


    {
        id: "conversation-005",

        title:
            "Help with setting up a new PC",

        author: {
            username: "noah",
            displayname: "Noah",
            avatar: "assets/temp/default_pfp.png",

            badges: {
                verified: false,
                mod: false,
                warning: true
            }
        },

        createdAt: "September 4, 2026",

        timestamp:
            new Date("2026-09-04T16:45:00"),

        replies: 9,

        reputations: {
            love: 2,
            support: 4,
            smile: 1,
            superstar: 0,
            thumbsup: 3
        }

    }

];

const profileResults = [

    {
        username: "helpfulalex",
        displayname: "Alex",
        avatar: "assets/temp/default_pfp.png",
        lastActive: "Active 5 minutes ago",
        usernameMatch: true,

        badges: {
            verified: true,
            mod: false,
            warning: false
        }
    },

    {
        username: "helpme",
        displayname: "Mika",
        avatar: "assets/temp/default_pfp.png",
        lastActive: "Active 18 minutes ago",
        usernameMatch: true,

        badges: {
            verified: false,
            mod: true,
            warning: false
        }
    },

    {
        username: "alexfi",
        displayname: "Alex",
        avatar: "assets/temp/default_pfp.png",
        lastActive: "Active 1 hour ago",
        usernameMatch: false,

        badges: {
            verified: true,
            mod: true,
            warning: false
        }
    },

    {
        username: "luna",
        displayname: "Luna",
        avatar: "assets/temp/default_pfp.png",
        lastActive: "Active 2 hours ago",
        usernameMatch: false,

        badges: {
            verified: false,
            mod: false,
            warning: true
        }
    }

];

/* =========================================================
   PROFILE BADGES
========================================================= */

function createBadgeHTML(badges) {

    if (!badges) {
        return "";
    }


    let html = "";


    if (badges.verified) {

        html += `
            <img
                class="profile-inline-badge profile-inline-badge-verified"
                src="assets/logos/verified.png"
                alt="Verified"
                title="Verified account"
            >
        `;

    }


    if (badges.mod) {

        html += `
            <img
                class="profile-inline-badge profile-inline-badge-moderator"
                src="assets/logos/mod.png"
                alt="Moderator"
                title="Moderator"
            >
        `;

    }


    if (badges.warning) {

        html += `
            <img
                class="profile-inline-badge profile-inline-badge-warning"
                src="assets/logos/warned.png"
                alt="Warning"
                title="Warning"
            >
        `;

    }


    return html;

}

/* =========================================================
   STATE
========================================================= */

const RESULTS_PER_PAGE = 20;

let visibleConversationCount =
    RESULTS_PER_PAGE;


/* =========================================================
   SEARCH QUERY
========================================================= */

function getSearchQuery() {

    const params =
        new URLSearchParams(
            window.location.search
        );

    return params.get("q") || "";

}


const searchQuery =
    getSearchQuery();


if (searchQueryLabel) {

    searchQueryLabel.textContent =
        searchQuery
            ? `Results for "${searchQuery}"`
            : "Search results";

}


/* =========================================================
   REPUTATION TOTAL
========================================================= */

function getTotalReputation(conversation) {

    const reputations =
        conversation.reputations;

    return (
        reputations.love +
        reputations.support +
        reputations.smile +
        reputations.superstar +
        reputations.thumbsup
    );

}


/* =========================================================
   REPUTATION HTML
========================================================= */

function createReputationHTML(conversation) {

    const reputations =
        conversation.reputations;


    const items = [

        {
            icon:
                "assets/reputations/love.png",

            count:
                reputations.love
        },

        {
            icon:
                "assets/reputations/support.png",

            count:
                reputations.support
        },

        {
            icon:
                "assets/reputations/smile.png",

            count:
                reputations.smile
        },

        {
            icon:
                "assets/reputations/superstar.png",

            count:
                reputations.superstar
        },

        {
            icon:
                "assets/reputations/thumbsup.png",

            count:
                reputations.thumbsup
        }

    ];


    return items

        .filter(
            item =>
                item.count > 0
        )

        .map(item => {

            return `
                <span class="conversation-reputation">

                    <img
                        src="${item.icon}"
                        alt=""
                    >

                    <span>
                        ${item.count}
                    </span>

                </span>
            `;

        })

        .join("");

}


/* =========================================================
   RENDER CONVERSATIONS
========================================================= */

function renderConversations() {

    if (!conversationSearchList) {
        return;
    }


    const sorted =
        [...conversationResults];


    switch (
        conversationSort?.value
    ) {

        case "oldest":

            sorted.sort(
                (a, b) =>
                    a.timestamp - b.timestamp
            );

            break;


        case "replies":

            sorted.sort(
                (a, b) =>
                    b.replies - a.replies
            );

            break;


        case "reputation":

            sorted.sort(
                (a, b) =>
                    getTotalReputation(b) -
                    getTotalReputation(a)
            );

            break;


        case "newest":

        default:

            sorted.sort(
                (a, b) =>
                    b.timestamp - a.timestamp
            );

            break;

    }


    const visible =
        sorted.slice(
            0,
            visibleConversationCount
        );


    if (visible.length === 0) {

        conversationSearchList.innerHTML = `
            <div class="search-empty">
                No conversations found.
            </div>
        `;

        return;

    }


    conversationSearchList.innerHTML =

        visible.map(conversation => {

            const totalReputation =
                getTotalReputation(
                    conversation
                );


            return `

                <a
                    class="conversation-result"
                    href="conversation.html?id=${encodeURIComponent(conversation.id)}"
                >

                    <div class="conversation-result-author">

                        <img
                            class="conversation-result-avatar"
                            src="${conversation.author.avatar}"
                            alt=""
                        >

                        <div class="conversation-result-author-info">

                            <div class="conversation-result-displayname-row">

                                <span class="conversation-result-displayname">
                                    ${escapeHTML(
                                        conversation.author.displayname
                                    )}
                                </span>

                                <div class="conversation-result-badges">

                                    ${createBadgeHTML(
                                        conversation.author.badges
                                    )}

                                </div>

                            </div>

                            <span class="conversation-result-date">
                                ${escapeHTML(
                                    conversation.createdAt
                                )}
                            </span>

                        </div>

                    </div>


                    <div class="conversation-result-content">

                        <span class="conversation-result-title">
                            ${escapeHTML(
                                conversation.title
                            )}
                        </span>

                    </div>


                    <div class="conversation-result-stats">

                        <span class="conversation-stat">

                            <span>
                                ${conversation.replies}
                            </span>

                            <span>
                                ${
                                    conversation.replies === 1
                                        ? "reply"
                                        : "replies"
                                }
                            </span>

                        </span>


                        <div class="conversation-reputations">

                            ${createReputationHTML(
                                conversation
                            )}

                        </div>


                        <span class="conversation-stat">

                            <span>
                                ${totalReputation}
                            </span>

                            <span>
                                reputation
                            </span>

                        </span>

                    </div>

                </a>

            `;

        }).join("");


    updateLoadMoreButton(
        sorted.length
    );

}


/* =========================================================
   LOAD MORE
========================================================= */

function updateLoadMoreButton(
    totalResults
) {

    if (!conversationLoadMore) {
        return;
    }


    if (
        visibleConversationCount >=
        totalResults
    ) {

        conversationLoadMore.hidden =
            true;

        return;

    }


    conversationLoadMore.hidden =
        false;

}


if (conversationLoadMore) {

    conversationLoadMore.addEventListener(
        "click",
        () => {

            visibleConversationCount +=
                RESULTS_PER_PAGE;

            renderConversations();

        }
    );

}


/* =========================================================
   RENDER PROFILES
========================================================= */

function renderProfiles() {

    if (!profileSearchList) {
        return;
    }


    const usernameMatches =
        profileResults.filter(
            profile =>
                profile.usernameMatch
        );


    const displaynameMatches =
        profileResults.filter(
            profile =>
                !profile.usernameMatch
        );


    const results = [

        ...usernameMatches,
        ...displaynameMatches

    ].slice(0, 10);


    if (results.length === 0) {

        profileSearchList.innerHTML = `
            <div class="search-empty">
                No profiles found.
            </div>
        `;

        return;

    }


    profileSearchList.innerHTML =

        results.map(profile => {

            return `

                <a
                    class="profile-result"
                    href="profile.html?username=${encodeURIComponent(profile.username)}"
                >

                    <img
                        class="profile-result-avatar"
                        src="${profile.avatar}"
                        alt=""
                    >


                    <div class="profile-result-info">
                        <div class="profile-result-displayname-row">
                            <span class="profile-result-displayname">
                                ${escapeHTML(profile.displayname)}
                            </span>
                            <div class="profile-result-badges">
                                ${createBadgeHTML(profile.badges)}
                            </div>
                        </div>
                        <span class="profile-result-username">
                            @${escapeHTML(profile.username)}
                        </span>
                    </div>


                    <span class="profile-result-active">
                        ${escapeHTML(
                            profile.lastActive
                        )}
                    </span>

                </a>

            `;

        }).join("");

}


/* =========================================================
   TABS
========================================================= */

searchTabs.forEach(tab => {

    tab.addEventListener(
        "click",
        () => {

            const target =
                tab.dataset.searchTab;


            searchTabs.forEach(
                otherTab => {

                    otherTab.classList.toggle(
                        "active",
                        otherTab === tab
                    );

                }
            );


            const conversationPanel =
                document.getElementById(
                    "conversationResults"
                );

            const profilePanel =
                document.getElementById(
                    "profileResults"
                );


            if (target === "profiles") {

                conversationPanel.hidden =
                    true;

                profilePanel.hidden =
                    false;

            } else {

                conversationPanel.hidden =
                    false;

                profilePanel.hidden =
                    true;

            }

        }
    );

});


/* =========================================================
   SORT DROPDOWN
========================================================= */

const conversationSortMenu =
    document.querySelector(".search-sort");

const conversationSortButton =
    document.getElementById(
        "conversationSortButton"
    );

const conversationSortValue =
    document.getElementById(
        "conversationSortValue"
    );

const conversationSortOptions =
    document.querySelectorAll(
        ".search-sort-option"
    );


let conversationSortValueCurrent =
    "newest";


if (conversationSortButton) {

    conversationSortButton.addEventListener(
        "click",
        event => {

            event.stopPropagation();

            const isOpen =
                conversationSortMenu.classList.contains(
                    "open"
                );

            conversationSortMenu.classList.toggle(
                "open",
                !isOpen
            );

            conversationSortButton.setAttribute(
                "aria-expanded",
                String(!isOpen)
            );

        }
    );

}


conversationSortOptions.forEach(option => {

    option.addEventListener(
        "click",
        event => {

            event.stopPropagation();


            const sort =
                option.dataset.sort;


            if (!sort) {
                return;
            }


            conversationSortValueCurrent =
                sort;


            if (conversationSortValue) {

                conversationSortValue.textContent =
                    option
                        .querySelector("span:last-child")
                        .textContent
                        .trim();

            }


            conversationSortOptions.forEach(
                otherOption => {

                    otherOption.classList.toggle(
                        "active",
                        otherOption === option
                    );

                }
            );


            conversationSortMenu.classList.remove(
                "open"
            );


            conversationSortButton.setAttribute(
                "aria-expanded",
                "false"
            );


            visibleConversationCount =
                RESULTS_PER_PAGE;


            renderConversations();

        }
    );

});


document.addEventListener(
    "click",
    () => {

        if (!conversationSortMenu) {
            return;
        }


        conversationSortMenu.classList.remove(
            "open"
        );


        if (conversationSortButton) {

            conversationSortButton.setAttribute(
                "aria-expanded",
                "false"
            );

        }

    }
);

/* =========================================================
   HTML ESCAPING
========================================================= */

function escapeHTML(value) {

    return String(value)

        .replaceAll(
            "&",
            "&amp;"
        )

        .replaceAll(
            "<",
            "&lt;"
        )

        .replaceAll(
            ">",
            "&gt;"
        )

        .replaceAll(
            '"',
            "&quot;"
        )

        .replaceAll(
            "'",
            "&#039;"
        );

}


/* =========================================================
   INITIAL RENDER
========================================================= */

renderConversations();

renderProfiles();