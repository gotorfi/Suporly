/* =========================================================
   SUPORLY SAVED
========================================================= */


/* =========================================================
   STORAGE
========================================================= */

const SAVED_STORAGE_KEY =
    "suporly_saved_posts";


function getSavedPosts() {

    try {

        return JSON.parse(
            localStorage.getItem(
                SAVED_STORAGE_KEY
            )
        ) || [];

    } catch {

        return [];

    }

}


function saveSavedPosts(posts) {

    localStorage.setItem(
        SAVED_STORAGE_KEY,
        JSON.stringify(posts)
    );

}



/* =========================================================
   ELEMENTS
========================================================= */

const savedGrid =
    document.getElementById(
        "savedGrid"
    );


const savedEmpty =
    document.getElementById(
        "savedEmpty"
    );



/* =========================================================
   RENDER
========================================================= */

function renderSavedPosts() {

    const saved =
        getSavedPosts();


    savedGrid.innerHTML = "";


    if (!saved.length) {

        savedGrid.hidden = true;

        savedEmpty.hidden = false;

        return;

    }


    savedGrid.hidden = false;

    savedEmpty.hidden = true;


    saved.forEach(
        (post, index) => {

            const card =
                document.createElement(
                    "article"
                );


            card.className =
                "saved-card";


            card.innerHTML = `

                <div class="saved-card-top">

                    <span class="saved-category">
                        ${escapeHTML(
                            post.category ||
                            "Conversation"
                        )}
                    </span>

                    <span class="saved-time">
                        ${escapeHTML(
                            post.time ||
                            ""
                        )}
                    </span>

                </div>


                <div class="saved-author">

                    <div class="saved-avatar">
                        ${escapeHTML(
                            (
                                post.author ||
                                "?"
                            )
                            .charAt(0)
                            .toUpperCase()
                        )}
                    </div>

                    <span class="saved-author-name">
                        ${escapeHTML(
                            post.author ||
                            "Unknown"
                        )}
                    </span>

                </div>


                <h2>
                    ${escapeHTML(
                        post.title
                    )}
                </h2>


                <p class="saved-description">
                    ${escapeHTML(
                        post.text ||
                        post.description ||
                        ""
                    )}
                </p>


                <div class="saved-card-bottom">

                    <div class="saved-stats">

                        <span>
                            ♡ ${post.likes ?? post.appreciation ?? 0}
                        </span>

                        <span>
                            ${
                                post.responses ??
                                (
                                    post.comments
                                        ? post.comments.length
                                        : 0
                                )
                            }
                            responses
                        </span>

                    </div>


                    <button
                        class="saved-remove"
                        type="button"
                        data-index="${index}"
                    >
                        Remove
                    </button>

                </div>

            `;


            savedGrid.appendChild(
                card
            );

        }
    );

}



/* =========================================================
   REMOVE
========================================================= */

savedGrid.addEventListener(
    "click",
    event => {

        const button =
            event.target.closest(
                ".saved-remove"
            );


        if (!button)
            return;


        const index =
            Number(
                button.dataset.index
            );


        const saved =
            getSavedPosts();


        saved.splice(
            index,
            1
        );


        saveSavedPosts(
            saved
        );


        renderSavedPosts();

    }
);



/* =========================================================
   HTML ESCAPE
========================================================= */

function escapeHTML(value) {

    const div =
        document.createElement(
            "div"
        );


    div.textContent =
        String(value);


    return div.innerHTML;

}



/* =========================================================
   INITIALIZE
========================================================= */

renderSavedPosts();