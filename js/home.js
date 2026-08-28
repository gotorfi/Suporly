/* =========================================================
   SUPORLY HOME
========================================================= */


/* =========================================================
   CATEGORIES
========================================================= */

const categories = [

  {
    name: "Games",
    icon: "🎮"
  },

  {
    name: "Freetime",
    icon: "☕"
  },

  {
    name: "Development",
    icon: "💻"
  },

  {
    name: "Help",
    icon: "❓"
  },

  {
    name: "Discussion",
    icon: "💬"
  },

  {
    name: "Animals",
    icon: "🐾"
  },

  {
    name: "Music",
    icon: "♫"
  },

  {
    name: "Sport",
    icon: "⚽"
  },

  {
    name: "News",
    icon: "📰"
  },

  {
    name: "Anime",
    icon: "✦"
  },

  {
    name: "Art",
    icon: "🎨"
  },

  {
    name: "Self-Development",
    icon: "◈"
  }

];


const wheel =
  document.getElementById("categoryWheel");


const selectedCategory =
  document.getElementById("selectedCategory");


const categoryLabel =
  document.getElementById("categoryLabel");


const randomButton =
  document.getElementById("randomButton");


const wheelViewport =
  document.getElementById("wheelViewport");


let rotation = 0;

let selectedIndex = 0;

let isDragging = false;

let dragStartAngle = 0;

let rotationAtStart = 0;

let isAnimating = false;


/*
 * The selected item is positioned at
 * the bottom center of the circle.
 *
 * 90 degrees = bottom.
 */

const selectedAngle = 90;


/* =========================================================
   BUILD WHEEL
========================================================= */

function buildWheel() {

  wheel.innerHTML = "";


  categories.forEach(
    (category, index) => {

      const item =
        document.createElement("button");


      item.type = "button";

      item.draggable = false;

      item.className =
        "category-item";


      item.dataset.index =
        index;


      item.innerHTML = `

        <span class="category-icon">
          ${category.icon}
        </span>

        <span class="category-name">
          ${category.name}
        </span>

      `;


      /*
       * Categories are positioned directly
       * on the circumference of the wheel.
       *
       * 12 categories = 30 degrees apart.
       *
       * 90 degrees = bottom center.
       */

      const angle =
        selectedAngle +
        index *
        (360 / categories.length);


      const radians =
        angle *
        Math.PI /
        180;


      /*
       * Full wheel radius.
       *
       * The previous /3.25 made the icons
       * sit too close to the center.
       */

      const x =
        50 +
        Math.cos(radians) * 50;


      const y =
        50 +
        Math.sin(radians) * 50;


      item.style.left =
        `${x}%`;


      item.style.top =
        `${y}%`;


      /*
       * Keep the category cards upright
       * while the wheel rotates.
       *
       * The wheel rotates +rotation.
       * Therefore the item itself rotates
       * -rotation.
       */

      item.style.setProperty(
        "--item-angle",
        `${-rotation}deg`
      );


      item.addEventListener(
        "click",
        event => {

          if (
            Math.abs(
              rotation -
              rotationAtStart
            ) > 5
          ) {

            return;

          }


          selectCategory(index);

        }
      );


      wheel.appendChild(item);

    }
  );


  updateWheel();

}


/* =========================================================
   UPDATE WHEEL
========================================================= */

function updateWheel() {

  wheel.style.transform =
    `translateX(-50%) rotate(${rotation}deg)`;


  const items =
    wheel.querySelectorAll(
      ".category-item"
    );


  items.forEach(
    item => {

      const index =
        Number(item.dataset.index);


      const relative =
        normalizeAngle(
            selectedAngle +
            index *
            (360 / categories.length) +
            rotation
        );


      /*
       * The item closest to the
       * bottom center is selected.
       */

      const distance =
        angleDistance(
          relative,
          selectedAngle
        );


      item.classList.toggle(
        "selected",
        distance < 14
      );
      item.style.transform =
        `
            translate(-50%, -50%)
            rotate(${-rotation}deg)
        `;

    }
  );


  const current =
    getClosestCategory();


  selectedIndex =
    current;


  selectedCategory.textContent =
    categories[current].name;


  categoryLabel.textContent =
    categories[current].name
      .toUpperCase();

}


/* =========================================================
   ANGLE HELPERS
========================================================= */

function normalizeAngle(angle) {

  return (
    (angle % 360) +
    360
  ) % 360;

}


function angleDistance(a, b) {

  let difference =
    Math.abs(
      normalizeAngle(a) -
      normalizeAngle(b)
    );


  if (difference > 180) {

    difference =
      360 - difference;

  }


  return difference;

}


/* =========================================================
   CLOSEST CATEGORY
========================================================= */

function getClosestCategory() {

  let closest =
    0;

  let closestDistance =
    Infinity;


  categories.forEach(
    (category, index) => {

      const angle =
        selectedAngle +
        index *
        (360 / categories.length) +
        rotation;


      const distance =
        angleDistance(
          angle,
          selectedAngle
        );


      if (
        distance <
        closestDistance
      ) {

        closestDistance =
          distance;

        closest =
          index;

      }

    }
  );


  return closest;

}


/* =========================================================
   SELECT CATEGORY
========================================================= */

function selectCategory(index) {

  if (isAnimating) return;


  const step =
    360 /
    categories.length;


  /*
   * Rotate the chosen item
   * exactly to the bottom.
   */

  const currentAngle =
    selectedAngle +
    index * step +
    rotation;


  let difference =
    selectedAngle -
    normalizeAngle(currentAngle);


  if (difference > 180) {

    difference -= 360;

  }


  if (difference < -180) {

    difference += 360;

  }


  /*
   * Add a little movement so
   * clicking another category
   * still feels like the wheel.
   */

  animateRotation(
    rotation +
    difference
  );

}


/* =========================================================
   ANIMATE ROTATION
========================================================= */

function animateRotation(target) {

  isAnimating = true;


  const start =
    rotation;


  const distance =
    target - start;


  const duration =
    550;


  const startTime =
    performance.now();


  function frame(now) {

    const progress =
      Math.min(
        (now - startTime) /
        duration,
        1
      );


    /*
     * Smooth cubic easing.
     */

    const eased =
      1 -
      Math.pow(
        1 - progress,
        3
      );


    rotation =
      start +
      distance *
      eased;


    updateWheel();


    if (progress < 1) {

      requestAnimationFrame(frame);

    } else {

      rotation = target;

      updateWheel();

      isAnimating = false;

      loadRandomPost();

    }

  }


  requestAnimationFrame(frame);

}


/* =========================================================
   DRAGGING
========================================================= */

function getPointerAngle(event) {

  const rect =
    wheel.getBoundingClientRect();


  const centerX =
    rect.left +
    rect.width / 2;


  const centerY =
    rect.top +
    rect.height / 2;


  const x =
    event.clientX -
    centerX;


  const y =
    event.clientY -
    centerY;


  return Math.atan2(y, x)
    * 180 /
    Math.PI;

}


wheelViewport.addEventListener(
  "pointerdown",
  event => {

    if (isAnimating) return;

    event.preventDefault();

    isDragging = true;

    wheelViewport.classList.add(
      "dragging"
    );

    dragStartAngle =
      getPointerAngle(event);

    rotationAtStart =
      rotation;

    wheelViewport.setPointerCapture(
      event.pointerId
    );

  }
);


wheelViewport.addEventListener(
  "pointermove",
  event => {

    if (!isDragging) return;

    event.preventDefault();

    const currentAngle =
      getPointerAngle(event);

    const delta =
      currentAngle -
      dragStartAngle;

    rotation =
      rotationAtStart +
      delta;

    updateWheel();

  }
);


function finishDrag(event) {

  if (!isDragging) return;


  isDragging = false;

  wheelViewport.classList.remove(
    "dragging"
  );


  try {

    wheelViewport.releasePointerCapture(
      event.pointerId
    );

  } catch {}


  /*
   * Snap to the closest category.
   */

  const index =
    getClosestCategory();


  selectCategory(index);

}


wheelViewport.addEventListener(
  "pointerup",
  finishDrag
);


wheelViewport.addEventListener(
  "pointercancel",
  finishDrag
);


/* =========================================================
   RANDOM
========================================================= */

randomButton.addEventListener(
  "click",
  () => {

    if (isAnimating) return;


    let randomIndex =
      Math.floor(
        Math.random() *
        categories.length
      );


    /*
     * Don't immediately pick
     * the currently selected category.
     */

    if (
      randomIndex ===
      selectedIndex
    ) {

      randomIndex =
        (randomIndex + 1) %
        categories.length;

    }


    const step =
      360 /
      categories.length;


    /*
     * Add several full rotations.
     *
     * This makes Random actually
     * look like a spinning wheel.
     */

    const currentAngle =
      randomIndex *
      step +
      rotation;


    let difference =
      selectedAngle -
      normalizeAngle(
        currentAngle
      );


    if (difference > 180) {

      difference -= 360;

    }


    if (difference < -180) {

      difference += 360;

    }


    const spins =
      3 + Math.floor(
        Math.random() * 3
      );


    const direction =
      Math.random() > .5
        ? 1
        : -1;


    const target =
      rotation +
      direction *
      spins *
      360 +
      difference;


    animateRotation(target);

  }
);


/* =========================================================
   DEMO POSTS
========================================================= */

const posts = {

  Games: [

    {
      author: "GotorFI",
      title: "What game have you been playing lately?",
      text: "I've been looking for something new to play. What games have you been enjoying recently?",
      likes: 24,
      comments: [
        {
          author: "Alex",
          text: "I've been playing a lot of indie games recently."
        },
        {
          author: "Mika",
          text: "Definitely try Hollow Knight if you haven't."
        }
      ]
    },

    {
      author: "Nova",
      title: "What game deserves more attention?",
      text: "There are so many smaller games that barely get noticed. What is your hidden gem?",
      likes: 41,
      comments: [
        {
          author: "Lumi",
          text: "Outer Wilds is incredible."
        }
      ]
    }

  ],

  Freetime: [

    {
      author: "Milo",
      title: "What do you usually do on a free evening?",
      text: "Sometimes I feel like I have free time but don't know what to actually do with it.",
      likes: 18,
      comments: [
        {
          author: "Sara",
          text: "Usually music, games or just going outside."
        }
      ]
    }

  ],

  Development: [

    {
      author: "DevGuy",
      title: "What are you currently developing?",
      text: "Always curious to see what other developers are building.",
      likes: 35,
      comments: [
        {
          author: "Lumi",
          text: "Working on a small game engine."
        },
        {
          author: "Alex",
          text: "I'm building a web app."
        }
      ]
    }

  ],

  Help: [

    {
      author: "Pixel",
      title: "What programming problem are you stuck on?",
      text: "Maybe someone here can help solve it.",
      likes: 12,
      comments: [
        {
          author: "Mika",
          text: "Post the code and someone will probably notice it."
        }
      ]
    }

  ],

  Discussion: [

    {
      author: "Nova",
      title: "What is something everyone seems to love?",
      text: "But you personally don't understand the hype around.",
      likes: 29,
      comments: [
        {
          author: "Sam",
          text: "Definitely some popular TV shows."
        }
      ]
    }

  ],

  Animals: [

    {
      author: "Lumi",
      title: "Show us your pet!",
      text: "Let's make this thread unnecessarily wholesome.",
      likes: 67,
      comments: [
        {
          author: "Alex",
          text: "My cat would probably take over the entire post."
        }
      ]
    }

  ],

  Music: [

    {
      author: "Echo",
      title: "What song is stuck in your head?",
      text: "Mine has been looping for three days.",
      likes: 31,
      comments: [
        {
          author: "Milo",
          text: "Same here. I can't escape it."
        }
      ]
    }

  ],

  Sport: [

    {
      author: "Finn",
      title: "What sport do you actually enjoy watching?",
      text: "Not necessarily the one you play yourself.",
      likes: 22,
      comments: [
        {
          author: "Alex",
          text: "Football for me."
        }
      ]
    }

  ],

  News: [

    {
      author: "Observer",
      title: "What recent news caught your attention?",
      text: "There has been a lot happening lately. What did you find interesting?",
      likes: 15,
      comments: [
        {
          author: "Sam",
          text: "There have been quite a few interesting developments."
        }
      ]
    }

  ],

  Anime: [

    {
      author: "Kira",
      title: "What anime should everyone watch once?",
      text: "Looking for recommendations outside the obvious ones.",
      likes: 44,
      comments: [
        {
          author: "Mika",
          text: "Definitely give Frieren a chance."
        }
      ]
    }

  ],

  Art: [

    {
      author: "Canvas",
      title: "What kind of art do you enjoy making?",
      text: "Digital, traditional, 3D, photography — anything goes.",
      likes: 26,
      comments: [
        {
          author: "Lumi",
          text: "Mostly digital paintings and 3D models."
        }
      ]
    }

  ],

  "Self-Development": [

    {
      author: "Growth",
      title: "What is one habit that improved your life?",
      text: "It doesn't have to be something huge. Small changes count too.",
      likes: 53,
      comments: [
        {
          author: "Alex",
          text: "Planning my next day before going to sleep."
        }
      ]
    }

  ]

};


/* =========================================================
   POST STATE
========================================================= */

const seenPosts = {};


categories.forEach(
  category => {

    seenPosts[category.name] =
      [];

  }
);


let currentPost = null;


/* =========================================================
   LOAD RANDOM POST
========================================================= */

function loadRandomPost() {

  const category =
    categories[selectedIndex].name;


  const available =
    posts[category] || [];


  const seen =
    seenPosts[category];


  const remaining =
    available.filter(
      (_, index) =>
        !seen.includes(index)
    );


  if (
    remaining.length === 0
  ) {

    showCleanState();

    return;

  }


  const random =
    remaining[
      Math.floor(
        Math.random() *
        remaining.length
      )
    ];


  const postIndex =
    available.indexOf(random);


  seen.push(postIndex);


  renderPost(random);

}


/* =========================================================
   RENDER POST
========================================================= */

function renderPost(post) {

  currentPost =
    post;


  document
    .getElementById("discoverPost")
    .hidden = false;


  document
    .getElementById("cleanState")
    .hidden = true;


  document
    .getElementById("postAuthor")
    .textContent =
      post.author;


  document
    .getElementById("postTitle")
    .textContent =
      post.title;


  document
    .getElementById("postText")
    .textContent =
      post.text;


  document
    .getElementById("postLikes")
    .textContent =
      `♡ ${post.likes}`;


  document
    .getElementById("postCategory")
    .textContent =
      categories[selectedIndex].name;


  renderComments(
    post.comments || []
  );
  updateSaveButton();

}


/* =========================================================
   COMMENTS
========================================================= */

function renderComments(comments) {

  const list =
    document.getElementById(
      "commentsList"
    );


  list.innerHTML = "";


  comments.forEach(
    comment => {

      const element =
        document.createElement("div");


      element.className =
        "comment";


      element.innerHTML = `

        <div class="comment-avatar">
          ${comment.author
            .charAt(0)
            .toUpperCase()}
        </div>

        <div class="comment-body">

          <div class="comment-author">
            ${escapeHTML(comment.author)}
          </div>

          <div class="comment-text">
            ${escapeHTML(comment.text)}
          </div>

        </div>

      `;


      list.appendChild(element);

    }
  );


  document
    .getElementById("commentCount")
    .textContent =
      comments.length;

}


/* =========================================================
   COMMENT FORM
========================================================= */

const commentForm =
  document.getElementById(
    "commentForm"
  );


const commentInput =
  document.getElementById(
    "commentInput"
  );


commentForm.addEventListener(
  "submit",
  event => {

    event.preventDefault();


    const text =
      commentInput.value.trim();


    if (
      !text ||
      !currentPost
    ) {

      return;

    }


    /*
     * Temporary frontend user.
     *
     * Later Python backend
     * will provide the real user.
     */

    currentPost.comments.push({

      author: "You",

      text: text

    });


    renderComments(
      currentPost.comments
    );


    commentInput.value = "";

  }
);


/* =========================================================
   NEXT
========================================================= */

document
  .getElementById("nextButton")
  .addEventListener(
    "click",
    () => {

      loadRandomPost();

    }
  );


/* =========================================================
   CLEAN STATE
========================================================= */

function showCleanState() {

  document
    .getElementById("discoverPost")
    .hidden = true;


  document
    .getElementById("cleanState")
    .hidden = false;

}

/* =========================================================
   SAVED POSTS
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


function setSavedPosts(posts) {

    localStorage.setItem(
        SAVED_STORAGE_KEY,
        JSON.stringify(posts)
    );

}



/* =========================================================
   POST ID
========================================================= */

function getPostId(post) {

    /*
     * Later the backend can provide
     * a real database ID.
     *
     * For now we create a stable ID
     * from author + title.
     */

    if (post.id) {

        return String(post.id);

    }


    return [
        post.author,
        post.title
    ]
        .join("::")
        .toLowerCase();

}



/* =========================================================
   CHECK SAVED
========================================================= */

function isPostSaved(post) {

    const id =
        getPostId(post);


    return getSavedPosts()
        .some(
            saved =>
                saved.id === id
        );

}



/* =========================================================
   SAVE POST
========================================================= */

function savePost(post) {

    const saved =
        getSavedPosts();


    const id =
        getPostId(post);


    /*
     * Already saved.
     */

    if (
        saved.some(
            item =>
                item.id === id
        )
    ) {

        return false;

    }


    const category =
        categories[selectedIndex].name;


    saved.unshift({

        ...post,

        id,

        category

    });


    setSavedPosts(
        saved
    );


    return true;

}



/* =========================================================
   REMOVE POST
========================================================= */

function unsavePost(post) {

    const id =
        getPostId(post);


    const saved =
        getSavedPosts()
            .filter(
                item =>
                    item.id !== id
            );


    setSavedPosts(
        saved
    );

}



/* =========================================================
   SAVE PROMPT
========================================================= */

function showSavePrompt(
    message = "Post has been Saved."
) {

    const existing =
        document.querySelector(
            ".save-prompt"
        );


    if (existing) {

        existing.remove();

    }


    const prompt =
        document.createElement(
            "div"
        );


    prompt.className =
        "save-prompt";


    prompt.innerHTML = `

        <span class="save-prompt-icon">
            ✓
        </span>

        <span>
            ${escapeHTML(message)}
        </span>

    `;


    document.body.appendChild(
        prompt
    );


    requestAnimationFrame(
        () => {

            prompt.classList.add(
                "visible"
            );

        }
    );


    setTimeout(
        () => {

            prompt.classList.remove(
                "visible"
            );


            setTimeout(
                () => {

                    prompt.remove();

                },
                200
            );

        },
        1800
    );

}



/* =========================================================
   UPDATE SAVE BUTTON
========================================================= */

function updateSaveButton() {

    const button =
        document.getElementById(
            "postSaveButton"
        );


    if (
        !button ||
        !currentPost
    ) {

        return;

    }


    const saved =
        isPostSaved(
            currentPost
        );


    button.classList.toggle(
        "saved",
        saved
    );


    button.innerHTML = `

        <img
            class="post-save-icon"
            src="${
                saved
                    ? "assets/icons/bookmarked.png"
                    : "assets/icons/bookmark.png"
            }"
            alt=""
        >

        <span>
            ${saved ? "Saved" : "Save"}
        </span>

    `;


    button.setAttribute(
        "aria-label",
        saved
            ? "Remove from saved"
            : "Save post"
    );

}



/* =========================================================
   SAVE BUTTON
========================================================= */

document
    .getElementById(
        "postSaveButton"
    )
    .addEventListener(
        "click",
        () => {

            if (
                !currentPost
            ) {

                return;

            }


            if (
                isPostSaved(
                    currentPost
                )
            ) {

                unsavePost(
                    currentPost
                );


                updateSaveButton();

                return;

            }


            const saved =
                savePost(
                    currentPost
                );


            if (saved) {

                updateSaveButton();

                showSavePrompt(
                    "Post has been Saved."
                );

            }

        }
    );


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
   INITIALIZE
========================================================= */

buildWheel();

loadRandomPost();


window.addEventListener(
  "resize",
  () => {

    buildWheel();

  }
);