/* =========================================================
   SUPORLY PROFILE
========================================================= */


/* =========================================================
   PROFILE DATA
========================================================= */

/*
 * TEMPORARY DATA
 *
 * Later Python will provide this data.
 */

const profileData = {

    username: "GotorFI",

    badge: "Member",

    warning: {

        active: true,

        expiresAt:
            "2026-11-27T00:00:00Z"

    },

    bio:
        "Building things, playing games and occasionally getting lost in interesting ideas.",

    avatar:
        "assets/temp/default_pfp.png",

    joined:
        "August 2026",

    reputation:
        842,

    statistics: {

        posts: 24,

        comments: 87,

        appreciation: 421,

        saved: 16

    },

    posts: [

        {
            title:
                "What game have you been playing lately?",

            category:
                "Games",

            time:
                "2 hours ago",

            appreciation:
                24,

            responses:
                8
        },

        {
            title:
                "How do you structure a large project?",

            category:
                "Development",

            time:
                "Yesterday",

            appreciation:
                35,

            responses:
                18
        },

        {
            title:
                "What makes a good horror game?",

            category:
                "Games",

            time:
                "3 days ago",

            appreciation:
                52,

            responses:
                21
        }

    ],

    comments: [

        {
            text:
                "Definitely try Hollow Knight if you haven't.",

            conversation:
                "What game deserves more attention?",

            time:
                "Today"
        },

        {
            text:
                "I think clear module boundaries become especially important once the project grows.",

            conversation:
                "When does clean architecture become overengineering?",

            time:
                "Yesterday"
        }

    ],

    categories: [

        {
            name:
                "Games",

            icon:
                "🎮"
        },

        {
            name:
                "Development",

            icon:
                "💻"
        },

        {
            name:
                "Music",

            icon:
                "♫"
        }

    ],

    achievements: [

        {
            icon:
                "✦",

            title:
                "First Conversation",

            description:
                "Created your first post."
        },

        {
            icon:
                "♡",

            title:
                "Appreciated",

            description:
                "Received 100 appreciation."
        },

        {
            icon:
                "◈",

            title:
                "Regular",

            description:
                "Reached 20 conversations."
        }

    ]

};


/* =========================================================
   PROFILE
========================================================= */

function renderProfile() {

    document
        .getElementById("profileUsername")
        .textContent =
            "@" + profileData.username;


    document
        .getElementById("profileBadge")
        .textContent =
            profileData.badge;


    document
        .getElementById("profileBio")
        .textContent =
            profileData.bio;


    document
        .getElementById("profileJoinDate")
        .textContent =
            profileData.joined;


    document
        .getElementById("profileReputation")
        .textContent =
            profileData.reputation;


    document
        .getElementById("profileAvatar")
        .src =
            profileData.avatar;


    renderStatistics();

    renderPosts();

    renderComments();

    renderCategories();

    renderAchievements();

}


/* =========================================================
   STATISTICS
========================================================= */

function renderStatistics() {

    const stats =
        profileData.statistics;


    document
        .getElementById("statPosts")
        .textContent =
            stats.posts;


    document
        .getElementById("statComments")
        .textContent =
            stats.comments;


    document
        .getElementById("statAppreciation")
        .textContent =
            stats.appreciation;


    document
        .getElementById("statSaved")
        .textContent =
            stats.saved;


    document
        .getElementById("aboutReputation")
        .textContent =
            profileData.reputation;


    document
        .getElementById("aboutPosts")
        .textContent =
            stats.posts;


    document
        .getElementById("aboutComments")
        .textContent =
            stats.comments;


    document
        .getElementById("aboutAppreciation")
        .textContent =
            stats.appreciation;

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


    profileData.posts.forEach(
        post => {

            const element =
                document.createElement("article");


            element.className =
                "profile-post";


            element.innerHTML = `

                <div class="profile-post-main">

                    <span class="profile-post-category">
                        ${escapeHTML(post.category)}
                    </span>

                    <h3>
                        ${escapeHTML(post.title)}
                    </h3>

                    <span class="profile-post-time">
                        ${escapeHTML(post.time)}
                    </span>

                </div>


                <div class="profile-post-stats">

                    <span>
                        ♡ ${post.appreciation}
                    </span>

                    <span>
                        ○ ${post.responses}
                    </span>

                </div>

            `;


            container.appendChild(
                element
            );

        }
    );

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


    profileData.comments.forEach(
        comment => {

            const element =
                document.createElement("article");


            element.className =
                "profile-comment";


            element.innerHTML = `

                <div class="profile-comment-icon">
                    “
                </div>

                <div>

                    <p>
                        ${escapeHTML(comment.text)}
                    </p>

                    <span>
                        On
                        <strong>
                            ${escapeHTML(comment.conversation)}
                        </strong>
                        ·
                        ${escapeHTML(comment.time)}
                    </span>

                </div>

            `;


            container.appendChild(
                element
            );

        }
    );

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


    profileData.categories.forEach(
        category => {

            const element =
                document.createElement("span");


            element.className =
                "profile-category";


            element.innerHTML = `

                <span>
                    ${category.icon}
                </span>

                ${escapeHTML(category.name)}

            `;


            container.appendChild(
                element
            );

        }
    );

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


    profileData.achievements.forEach(
        achievement => {

            const element =
                document.createElement("div");


            element.className =
                "profile-achievement";


            element.innerHTML = `

                <div class="achievement-icon">
                    ${achievement.icon}
                </div>

                <div>

                    <strong>
                        ${escapeHTML(achievement.title)}
                    </strong>

                    <span>
                        ${escapeHTML(achievement.description)}
                    </span>

                </div>

            `;


            container.appendChild(
                element
            );

        }
    );

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

document
    .getElementById("editProfileButton")
    .addEventListener(
        "click",
        () => {

            /*
             * Later this can open
             * the Python-powered
             * profile editor.
             */

            console.log(
                "Edit profile"
            );

        }
    );

const editProfileButton =
    document.getElementById("editProfileButton");


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

