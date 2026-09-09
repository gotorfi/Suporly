/* =========================================================
   SUPORLY NEW CONVERSATION
========================================================= */


/* =========================================================
   CATEGORIES
========================================================= */

const categories = [

    {
        name: "Games",
        icon: "assets/icons/games.png",
        description:
            "Games, game development, mechanics and experiences. Keep general gaming and development discussions here."
    },

    {
        name: "Freetime",
        icon: "assets/icons/freetime.png",
        description:
            "Hobbies, everyday interests and things you enjoy doing in your free time."
    },

    {
        name: "Development",
        icon: "assets/icons/development.png",
        description:
            "Programming, software, technology and building things. Keep personal projects and technical discussion here."
    },

    {
        name: "Help",
        icon: "assets/icons/help.png",
        description:
            "Questions where you are looking for advice, troubleshooting or help from other people."
    },

    {
        name: "Discussion",
        icon: "assets/icons/discussion.png",
        description:
            "Open-ended topics meant primarily for conversation, opinions and different perspectives."
    },

    {
        name: "Animals",
        icon: "assets/icons/animals.png",
        description:
            "Animals, pets, wildlife and experiences involving them."
    },

    {
        name: "Music",
        icon: "assets/icons/music.png",
        description:
            "Music, artists, instruments, production and everything related to listening or making music."
    },

    {
        name: "Sport",
        icon: "assets/icons/sport.png",
        description:
            "Sports, training, competitions, teams and experiences around physical activity."
    },

    {
        name: "News",
        icon: "assets/icons/news.png",
        description:
            "Recent events and current topics worth discussing. Keep purely personal topics elsewhere."
    },

    {
        name: "Anime",
        icon: "assets/icons/anime.png",
        description:
            "Anime, manga and related Japanese animation and storytelling."
    },

    {
        name: "Art",
        icon: "assets/icons/art.png",
        description:
            "Drawing, painting, 3D art, photography and other forms of creative work."
    },

    {
        name: "Self-Development",
        icon: "assets/icons/self-development.png",
        description:
            "Learning, habits, goals, personal growth and experiences with improving yourself."
    }

];


/* =========================================================
   ELEMENTS
========================================================= */

const themeSelectButton =
    document.querySelector(
        ".theme-select-button"
    );


const themeSelectIcon =
    document.querySelector(
        ".theme-select-icon"
    );


const themeSelectName =
    document.querySelector(
        ".theme-select-content strong"
    );


const themeSelectDescription =
    document.querySelector(
        ".theme-select-content small"
    );


const themeDescription =
    document.querySelector(
        ".theme-description"
    );


const topicInput =
    document.querySelector(
        ".topic-input"
    );


const contextInput =
    document.querySelector(
        ".context-input"
    );


const previewTopic =
    document.querySelector(
        ".conversation-preview-card h2"
    );


const previewContext =
    document.querySelector(
        ".preview-context"
    );



const previewImage =
    document.querySelector(
        ".preview-image-placeholder"
    );


const previewButton =
    document.querySelector(
        ".conversation-preview-button"
    );


const warningOverlay =
    document.querySelector(
        ".conversation-warning-overlay"
    );


const warningCancel =
    document.querySelector(
        ".warning-cancel"
    );


const warningSubmit =
    document.querySelector(
        ".warning-submit"
    );


const imageContainer =
    document.querySelector(
        ".conversation-images"
    );


const characterCounts =
    document.querySelectorAll(
        ".conversation-panel .character-count"
    );


const previewThemeIcon = document.querySelector(".preview-theme-icon");
const previewThemeName = document.querySelector(".preview-theme-name");

/* =========================================================
   STATE
========================================================= */

let selectedCategory =
    categories[0];


let conversationImages = [];


/* =========================================================
   CATEGORY
========================================================= */

function updateCategory(category) {

    if (!category)
        return;


    selectedCategory =
        category;


    if (themeSelectIcon) {

        themeSelectIcon.src =
            category.icon;

        themeSelectIcon.alt =
            category.name;

    }


    if (themeSelectName) {

        themeSelectName.textContent =
            category.name;

    }


    if (themeSelectDescription) {

        themeSelectDescription.textContent =
            category.description;

    }


    if (themeDescription) {

        themeDescription.textContent =
            category.description;

    }


    if (previewThemeIcon) {

        previewThemeIcon.src =
            category.icon;

        previewThemeIcon.alt =
            category.name;

    }


    if (previewThemeName) {

        previewThemeName.textContent =
            category.name;

    }

}


/* =========================================================
   CATEGORY DROPDOWN
========================================================= */

let categoryMenu = null;


function createCategoryMenu() {

    if (!themeSelectButton)
        return;


    themeSelectButton.setAttribute(
        "aria-expanded",
        "false"
    );


    themeSelectButton.addEventListener(
        "click",
        event => {

            event.stopPropagation();

            toggleCategoryMenu();

        }
    );

}


function toggleCategoryMenu() {

    if (!themeSelectButton)
        return;


    if (categoryMenu) {

        closeCategoryMenu();

        return;

    }


    categoryMenu =
        document.createElement(
            "div"
        );


    categoryMenu.className =
        "conversation-theme-menu";


    categories.forEach(
        category => {

            const option =
                document.createElement(
                    "button"
                );


            option.type =
                "button";


            option.className =
                "conversation-theme-option";


            if (
                category.name ===
                selectedCategory.name
            ) {

                option.classList.add(
                    "active"
                );

            }


            const icon =
                document.createElement(
                    "img"
                );


            icon.className =
                "conversation-theme-option-icon";


            icon.src =
                category.icon;


            icon.alt =
                "";


            const content =
                document.createElement(
                    "span"
                );


            content.className =
                "conversation-theme-option-content";


            const name =
                document.createElement(
                    "strong"
                );


            name.textContent =
                category.name;


            const description =
                document.createElement(
                    "small"
                );


            description.textContent =
                category.description;


            content.appendChild(
                name
            );


            content.appendChild(
                description
            );


            option.appendChild(
                icon
            );


            option.appendChild(
                content
            );


            option.addEventListener(
                "click",
                event => {

                    event.stopPropagation();


                    updateCategory(
                        category
                    );


                    closeCategoryMenu();

                }
            );


            categoryMenu.appendChild(
                option
            );

        }
    );


    themeSelectButton.parentElement.appendChild(
        categoryMenu
    );


    themeSelectButton.setAttribute(
        "aria-expanded",
        "true"
    );

}


function closeCategoryMenu() {

    if (categoryMenu) {

        categoryMenu.remove();

        categoryMenu =
            null;

    }


    if (themeSelectButton) {

        themeSelectButton.setAttribute(
            "aria-expanded",
            "false"
        );

    }

}


document.addEventListener(
    "click",
    event => {

        if (
            categoryMenu &&
            !categoryMenu.contains(
                event.target
            ) &&
            event.target !==
            themeSelectButton
        ) {

            closeCategoryMenu();

        }

    }
);


/* =========================================================
   TOPIC
========================================================= */

function updateTopicPreview() {

    if (!topicInput)
        return;


    const topic =
        topicInput.value.trim();


    /*
     * First character counter belongs to Topic.
     */

    if (characterCounts[0]) {

        characterCounts[0].textContent =
            `${topicInput.value.length} / 100`;

    }


    if (!previewTopic)
        return;


    if (topic) {

        previewTopic.textContent =
            `"${topic}"`;

    } else {

        previewTopic.textContent =
            '"Your conversation topic will appear here."';

    }

}


if (topicInput) {

    topicInput.addEventListener(
        "input",
        updateTopicPreview
    );

}


/* =========================================================
   CONTEXT
========================================================= */

function updateContextPreview() {

    if (!contextInput)
        return;


    const context =
        contextInput.value.trim();


    if (!previewContext)
        return;


    if (context) {

        previewContext.textContent =
            context;

    } else {

        previewContext.textContent =
            "Add a little context to help people join the conversation.";

    }

}


if (contextInput) {

    contextInput.addEventListener(
        "input",
        updateContextPreview
    );

}


/* =========================================================
   IMAGE INPUT
========================================================= */

const imageInput =
    document.createElement(
        "input"
    );


imageInput.type =
    "file";


imageInput.accept =
    "image/png,image/jpeg,image/webp,image/gif";


imageInput.multiple =
    true;


imageInput.hidden =
    true;


document.body.appendChild(
    imageInput
);


/* =========================================================
   IMAGE SLOT
========================================================= */

function createImageSlot(
    index
) {

    const slot =
        document.createElement(
            "div"
        );


    slot.className =
        "image-slot conversation-image-slot";


    const image =
        document.createElement(
            "img"
        );


    image.className =
        "conversation-uploaded-image";


    image.src =
        conversationImages[index];


    image.alt =
        `Conversation image ${index + 1}`;


    const removeButton =
        document.createElement(
            "button"
        );


    removeButton.type =
        "button";


    removeButton.className =
        "conversation-image-remove";


    removeButton.textContent =
        "×";


    removeButton.setAttribute(
        "aria-label",
        "Remove image"
    );


    removeButton.addEventListener(
        "click",
        event => {

            event.stopPropagation();


            conversationImages.splice(
                index,
                1
            );


            renderImages();

        }
    );


    slot.appendChild(
        image
    );


    slot.appendChild(
        removeButton
    );


    return slot;

}


/* =========================================================
   IMAGE RENDERING
========================================================= */

function renderImages() {

    if (!imageContainer)
        return;


    imageContainer.innerHTML =
        "";


    conversationImages.forEach(
        (src, index) => {

            imageContainer.appendChild(
                createImageSlot(index)
            );

        }
    );


    /*
     * Add button.
     */

    if (
        conversationImages.length <
        3
    ) {

        const addButton =
            document.createElement(
                "button"
            );


        addButton.type =
            "button";


        addButton.className =
            "image-slot add-image";


        addButton.innerHTML = `
            <span>+</span>
            <small>Add image</small>
        `;


        addButton.addEventListener(
            "click",
            () => {

                imageInput.click();

            }
        );


        imageContainer.appendChild(
            addButton
        );

    }


    /*
     * Empty slots.
     */

    while (
        imageContainer.children.length <
        3
    ) {

        const empty =
            document.createElement(
                "div"
            );


        empty.className =
            "image-slot empty-image";


        empty.innerHTML =
            "<span>+</span>";


        imageContainer.appendChild(
            empty
        );

    }


    /*
     * Image counter.
     */

    if (characterCounts[1]) {

        characterCounts[1].textContent =
            `${conversationImages.length} / 3`;

    }


    updateImagePreview();

}


/* =========================================================
   IMAGE FILE SELECTION
========================================================= */

imageInput.addEventListener(
    "change",
    event => {

        const files =
            Array.from(
                event.target.files
            );


        const remaining =
            3 -
            conversationImages.length;


        const selectedFiles =
            files.slice(
                0,
                remaining
            );


        selectedFiles.forEach(
            file => {

                if (
                    !file.type.startsWith(
                        "image/"
                    )
                ) {

                    return;

                }


                const reader =
                    new FileReader();


                reader.onload =
                    () => {

                        conversationImages.push(
                            reader.result
                        );


                        renderImages();

                    };


                reader.readAsDataURL(
                    file
                );

            }
        );


        imageInput.value =
            "";

    }
);

function updateImagePreview() {

    if (!previewImage)
        return;


    if (
        conversationImages.length ===
        0
    ) {

        previewImage.style.display =
            "none";

        previewImage.innerHTML =
            "";

        return;

    }


    previewImage.style.display =
        "block";


    previewImage.innerHTML =
        "";


    conversationImages.forEach(
        src => {

            const item =
                document.createElement(
                    "div"
                );


            item.className =
                "preview-image-item";


            const background =
                document.createElement(
                    "div"
                );


            background.className =
                "preview-image-background";


            const image =
                document.createElement(
                    "img"
                );


            image.src =
                src;


            image.alt =
                "";


            image.className =
                "preview-conversation-image";


            image.onload =
                () => {

                    const colors =
                        getImageColors(
                            image
                        );


                    const r =
                        colors.r;

                    const g =
                        colors.g;

                    const b =
                        colors.b;


                    background.style.background =
                        `linear-gradient(
                            135deg,
                            rgb(${r}, ${g}, ${b}),
                            rgb(
                                ${Math.round(r * 0.45)},
                                ${Math.round(g * 0.45)},
                                ${Math.round(b * 0.45)}
                            )
                        )`;

                };


            item.appendChild(
                background
            );


            item.appendChild(
                image
            );


            previewImage.appendChild(
                item
            );

        }
    );

}

/* =========================================================
   PREVIEW IMAGE COLORS
========================================================= */

function getImageColors(
    image
) {

    const canvas =
        document.createElement(
            "canvas"
        );


    const context =
        canvas.getContext(
            "2d",
            {
                willReadFrequently: true
            }
        );


    const size =
        32;


    canvas.width =
        size;

    canvas.height =
        size;


    /*
     * Draw a small version of the image.
     *
     * This is enough for calculating
     * the general colors.
     */

    context.drawImage(
        image,
        0,
        0,
        size,
        size
    );


    const imageData =
        context.getImageData(
            0,
            0,
            size,
            size
        );


    const pixels =
        imageData.data;


    let red = 0;
    let green = 0;
    let blue = 0;
    let count = 0;


    for (
        let i = 0;
        i < pixels.length;
        i += 4
    ) {

        const alpha =
            pixels[i + 3];


        if (alpha < 50)
            continue;


        red +=
            pixels[i];

        green +=
            pixels[i + 1];

        blue +=
            pixels[i + 2];


        count++;

    }


    if (!count) {

        return {
            r: 80,
            g: 80,
            b: 80
        };

    }


    return {

        r:
            Math.round(
                red / count
            ),

        g:
            Math.round(
                green / count
            ),

        b:
            Math.round(
                blue / count
            )

    };

}


/* =========================================================
   VALIDATION
========================================================= */

function validateConversation() {

    if (
        !selectedCategory
    ) {

        return false;

    }


    if (
        !topicInput ||
        !topicInput.value.trim()
    ) {

        if (topicInput) {

            topicInput.focus();

        }

        return false;

    }


    return true;

}


/* =========================================================
   WARNING
========================================================= */

function openWarning() {

    if (!warningOverlay)
        return;


    warningOverlay.hidden =
        false;


    document.body.style.overflow =
        "hidden";

}


function closeWarning() {

    if (!warningOverlay)
        return;


    warningOverlay.hidden =
        true;


    document.body.style.overflow =
        "";

}


/* =========================================================
   SUBMIT
========================================================= */

if (previewButton) {

    previewButton.addEventListener(
        "click",
        () => {

            if (
                !validateConversation()
            ) {

                return;

            }


            openWarning();

        }
    );

}


/* =========================================================
   WARNING CANCEL
========================================================= */

if (warningCancel) {

    warningCancel.addEventListener(
        "click",
        () => {

            closeWarning();

        }
    );

}


/* =========================================================
   WARNING BACKGROUND
========================================================= */

if (warningOverlay) {

    warningOverlay.addEventListener(
        "click",
        event => {

            if (
                event.target ===
                warningOverlay
            ) {

                closeWarning();

            }

        }
    );

}


/* =========================================================
   TEMPORARY POST
========================================================= */

if (warningSubmit) {

    warningSubmit.addEventListener(
        "click",
        () => {

            /*
             * Temporary frontend-only test.
             *
             * Backend will replace this later.
             */

            console.log(
                "Temporary conversation:",
                {
                    category:
                        selectedCategory.name,

                    topic:
                        topicInput.value.trim(),

                    context:
                        contextInput
                            ? contextInput.value.trim()
                            : "",

                    images:
                        conversationImages.length
                }
            );


            warningSubmit.textContent =
                "Posted!";


            warningSubmit.disabled =
                true;


            setTimeout(
                () => {

                    closeWarning();


                    warningSubmit.textContent =
                        "Agree and Post";


                    warningSubmit.disabled =
                        false;

                },
                1000
            );

        }
    );

}


/* =========================================================
   INITIALIZE
========================================================= */

updateCategory(
    categories[0]
);


updateTopicPreview();


updateContextPreview();


renderImages();


createCategoryMenu();