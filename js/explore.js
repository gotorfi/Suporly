/* =========================================================
   SUPORLY EXPLORE
========================================================= */




/* =========================================================
   CATEGORIES
========================================================= */

const categories = [

  { name: "Games", icon: "🎮" },
  { name: "Freetime", icon: "☕" },
  { name: "Development", icon: "💻" },
  { name: "Help", icon: "❓" },
  { name: "Discussion", icon: "💬" },
  { name: "Animals", icon: "🐾" },
  { name: "Music", icon: "♫" },
  { name: "Sport", icon: "⚽" },
  { name: "News", icon: "📰" },
  { name: "Anime", icon: "✦" },
  { name: "Art", icon: "🎨" },
  { name: "Self-Development", icon: "◈" }

];


const wheel =
  document.getElementById(
    "exploreWheel"
  );


const wheelViewport =
  document.getElementById(
    "exploreWheelViewport"
  );


const categoryLabel =
  document.getElementById(
    "exploreCategoryLabel"
  );


let rotation = 0;

let selectedIndex = 0;

let dragging = false;

let dragStartAngle = 0;

let rotationAtStart = 0;

let animating = false;


const selectedAngle = 90;


/* =========================================================
   BUILD WHEEL
========================================================= */

/* =========================================================
   BUILD WHEEL
========================================================= */

function buildWheel() {

  wheel.innerHTML = "";


  const step =
    360 /
    categories.length;


  categories.forEach(
    (category, index) => {

      const item =
        document.createElement("button");


      item.type = "button";

      item.draggable = false;

      item.className =
        "explore-category-item";


      item.dataset.index =
        index;


      item.innerHTML = `

        <span class="explore-category-icon">
          ${category.icon}
        </span>

        <span class="explore-category-name">
          ${category.name}
        </span>

      `;


      /*
       * Position the category directly
       * on the circumference of the wheel.
       *
       * 90 degrees = bottom center.
       */

      const angle =
        selectedAngle +
        index * step;


      const radians =
        angle *
        Math.PI /
        180;


      const x =
        50 +
        Math.cos(radians) *
        50;


      const y =
        50 +
        Math.sin(radians) *
        50;


      item.style.left =
        `${x}%`;


      item.style.top =
        `${y}%`;


      item.addEventListener(
        "click",
        () => {

          if (dragging) return;

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
      ".explore-category-item"
    );


  let closest = 0;

  let closestDistance =
    Infinity;


  items.forEach(item => {

    const index =
      Number(item.dataset.index);


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


    item.classList.toggle(
      "selected",
      distance < 14
    );


    /*
     * Counter-rotate the category item.
     *
     * The wheel rotates +rotation,
     * so the item rotates -rotation.
     *
     * This keeps the icon and text
     * upright while the wheel spins.
     */

    item.style.transform =
      `
        translate(-50%, -50%)
        rotate(${-rotation}deg)
      `;


    if (
      distance <
      closestDistance
    ) {

      closestDistance =
        distance;

      closest =
        index;

    }

  });


  selectedIndex =
    closest;


  categoryLabel.textContent =
    categories[closest].name;


  discoveryHeading.textContent =
    categories[closest].name;


  renderDiscovery();

}


/* =========================================================
   ANGLES
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
   SELECT CATEGORY
========================================================= */

function selectCategory(index) {

  if (animating) return;


  const step =
    360 /
    categories.length;


  const current =
    selectedAngle +
    index * step +
    rotation;


  let difference =
    selectedAngle -
    normalizeAngle(current);


  if (difference > 180)
    difference -= 360;


  if (difference < -180)
    difference += 360;


  animateWheel(
    rotation + difference
  );

}


/* =========================================================
   ANIMATION
========================================================= */

/* =========================================================
   ANIMATION
========================================================= */

function animateWheel(target) {

  animating = true;


  const start =
    rotation;


  const distance =
    target - start;


  const duration =
    500;


  const startTime =
    performance.now();


  function frame(now) {

    const progress =
      Math.min(
        (now - startTime) /
        duration,
        1
      );


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

      /*
       * IMPORTANT:
       *
       * Do NOT normalize rotation here.
       *
       * Keeping rotation continuous prevents
       * the wheel items from suddenly jumping
       * by 360 degrees.
       */

      rotation =
        target;


      updateWheel();


      animating = false;

    }

  }


  requestAnimationFrame(frame);

}


/* =========================================================
   POINTER ANGLE
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


  return Math.atan2(
    event.clientY - centerY,
    event.clientX - centerX
  ) * 180 / Math.PI;

}


/* =========================================================
   DRAG
========================================================= */

wheelViewport.addEventListener(
  "pointerdown",
  event => {

    if (animating) return;

    event.preventDefault();

    dragging = true;

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

    if (!dragging) return;

    event.preventDefault();

    const current =
      getPointerAngle(event);

    rotation =
      rotationAtStart +
      current -
      dragStartAngle;

    updateWheel();

  }
);


function finishDrag(event) {

  if (!dragging) return;


  dragging = false;


  wheelViewport.classList.remove(
    "dragging"
  );


  try {

    wheelViewport.releasePointerCapture(
      event.pointerId
    );

  } catch {}


  const step =
    360 /
    categories.length;


  let closest =
    Math.round(
      -rotation / step
    );


  closest =
    (
      closest %
      categories.length +
      categories.length
    ) %
    categories.length;


  selectCategory(closest);

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
   POSTS
========================================================= */

const posts = {

  Games: [

    {
      title: "What game deserves more attention?",
      description:
        "There are so many smaller games that barely get noticed. What is your hidden gem?",
      author: "Nova",
      reputation: 742,
      helpful: "94%",
      time: "2h ago",
      appreciation: 41,
      responses: 12,
      related: [
        "What have you been playing lately?",
        "Which game changed your perspective?",
        "Best indie games nobody talks about?"
      ]
    },

    {
      title: "What game have you been playing lately?",
      description:
        "I'm looking for something new to play. What games have been keeping you interested recently?",
      author: "GotorFI",
      reputation: 842,
      helpful: "97%",
      time: "4h ago",
      appreciation: 24,
      responses: 8,
      related: [
        "What game deserves more attention?",
        "Best games for a quiet evening?",
        "Which game would you replay forever?"
      ]
    }

  ],


  Development: [

    {
      title: "How do you structure a large project?",
      description:
        "Everything worked fine when the project was small. Now every system seems to depend on everything else.",
      author: "DevGuy",
      reputation: 931,
      helpful: "96%",
      time: "1h ago",
      appreciation: 35,
      responses: 18,
      related: [
        "When should a module become a service?",
        "How do you handle dependencies?",
        "How large should a manager be?"
      ]
    },

    {
      title: "When does clean architecture become overengineering?",
      description:
        "I love having clear boundaries, but sometimes I wonder if I'm creating abstractions that don't actually help.",
      author: "Mika",
      reputation: 615,
      helpful: "91%",
      time: "6h ago",
      appreciation: 28,
      responses: 14,
      related: [
        "How do you structure a large project?",
        "Do small projects need architecture?",
        "Where should business logic live?"
      ]
    }

  ],


  Animals: [

    {
      title: "Show us your pet!",
      description:
        "Let's make this thread unnecessarily wholesome. Cats, dogs, birds, reptiles — everyone is welcome.",
      author: "Lumi",
      reputation: 1204,
      helpful: "99%",
      time: "3h ago",
      appreciation: 67,
      responses: 24,
      related: [
        "What animal would you love to own?",
        "Funniest thing your pet has done?",
        "Pets that surprised you?"
      ]
    }

  ],


  Music: [

    {
      title: "What song is stuck in your head?",
      description:
        "Mine has been looping for three days. I need to know if I'm alone.",
      author: "Echo",
      reputation: 533,
      helpful: "93%",
      time: "5h ago",
      appreciation: 31,
      responses: 19,
      related: [
        "What song always makes you happy?",
        "Music you discovered recently?",
        "Albums you never get tired of?"
      ]
    }

  ],


  Freetime: [

    {
      title: "What do you do on a completely free evening?",
      description:
        "Sometimes having free time is surprisingly difficult. What do you actually enjoy doing when nothing needs to get done?",
      author: "Milo",
      reputation: 488,
      helpful: "92%",
      time: "7h ago",
      appreciation: 18,
      responses: 7,
      related: [
        "What helps you relax?",
        "Favorite quiet activities?",
        "How do you spend a rainy day?"
      ]
    }

  ],


  Help: [

    {
      title: "What programming problem are you stuck on?",
      description:
        "Maybe someone here has already fought the same battle and can help.",
      author: "Pixel",
      reputation: 390,
      helpful: "95%",
      time: "3h ago",
      appreciation: 12,
      responses: 9,
      related: [
        "How do you debug difficult problems?",
        "What's the hardest bug you've solved?",
        "How do you ask for technical help?"
      ]
    }

  ],


  Discussion: [

    {
      title: "What is something everyone seems to love?",
      description:
        "But you personally don't understand the hype around it.",
      author: "Nova",
      reputation: 742,
      helpful: "94%",
      time: "8h ago",
      appreciation: 29,
      responses: 15,
      related: [
        "What's a popular opinion you disagree with?",
        "Things you learned to appreciate later?",
        "What opinion changed your mind?"
      ]
    }

  ],


  Sport: [

    {
      title: "What sport do you actually enjoy watching?",
      description:
        "Not necessarily the sport you play yourself.",
      author: "Finn",
      reputation: 512,
      helpful: "90%",
      time: "4h ago",
      appreciation: 22,
      responses: 10,
      related: [
        "What sport would you try?",
        "Best sporting moment you've seen?",
        "Sports that deserve more attention?"
      ]
    }

  ],


  News: [

    {
      title: "What recent news caught your attention?",
      description:
        "There is always something happening. What story did you actually find interesting?",
      author: "Observer",
      reputation: 677,
      helpful: "93%",
      time: "1h ago",
      appreciation: 15,
      responses: 11,
      related: [
        "What story deserves more attention?",
        "News you found surprisingly interesting?",
        "How do you keep up with news?"
      ]
    }

  ],


  Anime: [

    {
      title: "What anime should everyone watch once?",
      description:
        "Looking for recommendations outside the obvious choices.",
      author: "Kira",
      reputation: 823,
      helpful: "96%",
      time: "9h ago",
      appreciation: 44,
      responses: 21,
      related: [
        "Anime that surprised you?",
        "Best anime world?",
        "What should I watch next?"
      ]
    }

  ],


  Art: [

    {
      title: "What kind of art do you enjoy making?",
      description:
        "Digital, traditional, 3D, photography — anything goes.",
      author: "Canvas",
      reputation: 704,
      helpful: "95%",
      time: "5h ago",
      appreciation: 26,
      responses: 13,
      related: [
        "How did you start making art?",
        "What inspires you?",
        "Art you're proud of?"
      ]
    }

  ],


  "Self-Development": [

    {
      title: "What is one habit that improved your life?",
      description:
        "It doesn't have to be something huge. Small changes count too.",
      author: "Growth",
      reputation: 1050,
      helpful: "98%",
      time: "2h ago",
      appreciation: 53,
      responses: 27,
      related: [
        "What habit are you trying to build?",
        "What changed your perspective?",
        "Small things that made a difference?"
      ]
    }

  ]

};


/* =========================================================
   STATE
========================================================= */

let mode = "new";

let postIndex = 0;

const discoveryHeading =
  document.getElementById(
    "discoveryHeading"
  );


/* =========================================================
   GET POSTS
========================================================= */

function getCurrentPosts() {

  const category =
    categories[selectedIndex].name;


  let result =
    posts[category] || [];


  if (mode === "top") {

    result =
      [...result].sort(
        (a, b) =>
          b.appreciation -
          a.appreciation
      );

  }


  if (mode === "rediscovered") {

    result =
      [...result].sort(
        (a, b) =>
          a.responses -
          b.responses
      );

  }


  return result;

}


/* =========================================================
   RENDER
========================================================= */

function renderDiscovery() {

  const current =
    getCurrentPosts();


  if (!current.length) {

    document.getElementById(
      "discoveryTrack"
    ).innerHTML = `
      <div class="discovery-card">
        <div class="discovery-card-top">
          <span class="discovery-mode-label">
            ${mode}
          </span>
        </div>

        <h3>
          Nothing here yet.
        </h3>

        <p class="discovery-description">
          This part of Suporly is still waiting
          for its first conversation.
        </p>
      </div>
    `;

    return;

  }


  if (postIndex >= current.length) {

    postIndex = 0;

  }


  const post =
    current[postIndex];


  document.getElementById(
    "discoveryTrack"
  ).innerHTML = `

    <article
      class="discovery-card"
      id="activeDiscoveryCard"
    >

      <div class="discovery-card-top">

        <span class="discovery-mode-label">
          ${mode === "rediscovered"
            ? "SECOND CHANCE"
            : mode}
        </span>

        <span class="discovery-time">
          ${post.time}
        </span>

      </div>


      <h3>
        ${escapeHTML(post.title)}
      </h3>


      <p class="discovery-description">
        ${escapeHTML(post.description)}
      </p>


      <div class="discovery-card-bottom">

        <div class="discovery-reactions">

            <span>
            ♡ ${post.appreciation}
            </span>

            <span>
            ${post.responses} responses
            </span>

        </div>


        <div class="discovery-card-actions">

            <button
                class="discovery-save-button"
                type="button"
                id="discoverySaveButton"
                aria-label="Save conversation"
            >

                <img
                    class="discovery-save-icon"
                    src="assets/icons/bookmark.png"
                    alt=""
                >

                <span class="discovery-save-text">
                    Save
                </span>

            </button>


            <div class="discovery-open">
                Explore conversation →
            </div>

        </div>

      </div>

    </article>

  `;


  document.getElementById(
    "contributorName"
  ).textContent =
    post.author;


  document.getElementById(
    "contributorReputation"
  ).textContent =
    post.reputation;


  document.getElementById(
    "contributorHelpful"
  ).textContent =
    post.helpful;


  document.querySelector(
    ".contributor-avatar"
  ).textContent =
    post.author
      .charAt(0)
      .toUpperCase();


  renderPosition(current.length);

  renderTrail(post);
  updateSaveButton();

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


    button.innerHTML = saved

        ? `
            <span class="post-save-icon">
                ★
            </span>

            <span>
                Saved
            </span>
          `

        : `
            <span class="post-save-icon">
                ☆
            </span>

            <span>
                Save
            </span>
          `;

}





/* =========================================================
   POSITION
========================================================= */

function renderPosition(total) {

  const container =
    document.getElementById(
      "discoveryPosition"
    );


  container.innerHTML = "";


  for (
    let i = 0;
    i < total;
    i++
  ) {

    const dot =
      document.createElement("span");


    dot.className =
      "discovery-dot";


    if (i === postIndex) {

      dot.classList.add("active");

    }


    container.appendChild(dot);

  }

}


/* =========================================================
   TRAIL
========================================================= */

function renderTrail(post) {

  const network =
    document.getElementById(
      "trailNetwork"
    );


  network.innerHTML = "";


  const current =
    document.createElement("div");


  current.className =
    "trail-node current";


  current.innerHTML = `

    <span>
      Current
    </span>

    <strong>
      ${escapeHTML(post.title)}
    </strong>

  `;


  network.appendChild(current);


  post.related.forEach(
    related => {

      const connector =
        document.createElement(
          "div"
        );


      connector.className =
        "trail-connector";


      network.appendChild(
        connector
      );


      const node =
        document.createElement(
          "div"
        );


      node.className =
        "trail-node";


      node.innerHTML = `

        <span>
          Related
        </span>

        <strong>
          ${escapeHTML(related)}
        </strong>

      `;


      network.appendChild(node);

    }
  );

}


/* =========================================================
   NEXT / PREVIOUS
========================================================= */

document
  .getElementById("nextPost")
  .addEventListener(
    "click",
    () => {

      const current =
        getCurrentPosts();


      if (!current.length)
        return;


      postIndex =
        (
          postIndex + 1
        ) %
        current.length;


      renderDiscovery();

    }
  );


document
  .getElementById("previousPost")
  .addEventListener(
    "click",
    () => {

      const current =
        getCurrentPosts();


      if (!current.length)
        return;


      postIndex =
        (
          postIndex - 1 +
          current.length
        ) %
        current.length;


      renderDiscovery();

    }
  );


/* =========================================================
   DISCOVERY TABS
========================================================= */

document
  .querySelectorAll(".discovery-tab")
  .forEach(button => {

    button.addEventListener(
      "click",
      () => {

        document
          .querySelectorAll(
            ".discovery-tab"
          )
          .forEach(
            item =>
              item.classList.remove(
                "active"
              )
          );


        button.classList.add(
          "active"
        );


        mode =
          button.dataset.mode;


        postIndex = 0;


        renderDiscovery();

      }
    );

  });


/* =========================================================
   OPEN CONVERSATION
========================================================= */

document
  .getElementById(
    "openConversation"
  )
  .addEventListener(
    "click",
    () => {

      const current =
        getCurrentPosts();


      if (!current.length)
        return;


      const post =
        current[postIndex];


      /*
       * Later:
       *
       * window.location.href =
       *   `conversation.html?id=${post.id}`;
       *
       */


      console.log(
        "Opening conversation:",
        post
      );

    }
  );


document.addEventListener(
  "click",
  event => {

    const card =
      event.target.closest(
        ".discovery-card"
      );


    if (!card) return;


    document
      .getElementById(
        "openConversation"
      )
      .click();

  }
);


/* =========================================================
   ESCAPE
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
   SAVED CONVERSATIONS
========================================================= */

const SAVED_STORAGE_KEY =
  "suporly_saved_conversations";


function getSavedPosts() {

  try {

    const saved =
      localStorage.getItem(
        SAVED_STORAGE_KEY
      );


    if (!saved) {

      return [];

    }


    const parsed =
      JSON.parse(saved);


    return Array.isArray(parsed)
      ? parsed
      : [];

  } catch (error) {

    console.error(
      "Could not load saved conversations:",
      error
    );


    return [];

  }

}


function saveSavedPosts(saved) {

  try {

    localStorage.setItem(
      SAVED_STORAGE_KEY,
      JSON.stringify(saved)
    );


    return true;

  } catch (error) {

    console.error(
      "Could not save conversations:",
      error
    );


    return false;

  }

}


/*
 * Every conversation needs a stable ID.
 *
 * The current demo posts don't have IDs yet,
 * so we generate one from the category + title.
 */

function getPostId(post) {

  if (post.id) {

    return String(post.id);

  }


  return (
    categories[selectedIndex].name +
    "::" +
    post.title
  );

}


function isPostSaved(post) {

  if (!post) {

    return false;

  }


  const id =
    getPostId(post);


  return getSavedPosts()
    .some(
      saved =>
        saved.id === id
    );

}


function savePost(post) {

  if (!post) {

    return false;

  }


  const saved =
    getSavedPosts();


  const id =
    getPostId(post);


  /*
   * Don't save the same conversation twice.
   */

  if (
    saved.some(
      item =>
        item.id === id
    )
  ) {

    return false;

  }


  saved.push({

    id,

    category:
      categories[selectedIndex].name,

    title:
      post.title,

    description:
      post.description,

    author:
      post.author,

    reputation:
      post.reputation,

    helpful:
      post.helpful,

    time:
      post.time,

    appreciation:
      post.appreciation,

    responses:
      post.responses,

    related:
      post.related || [],

    savedAt:
      Date.now()

  });


  return saveSavedPosts(
    saved
  );

}


function unsavePost(post) {

  if (!post) {

    return false;

  }


  const id =
    getPostId(post);


  const saved =
    getSavedPosts();


  const filtered =
    saved.filter(
      item =>
        item.id !== id
    );


  return saveSavedPosts(
    filtered
  );

}


/* =========================================================
   SAVE BUTTON
========================================================= */

function updateDiscoverySaveButton() {

  const button =
    document.getElementById(
      "discoverySaveButton"
    );


  if (
    !button
  ) {

    return;

  }


  const current =
    getCurrentPosts();


  if (
    !current.length ||
    !current[postIndex]
  ) {

    return;

  }


  const post =
    current[postIndex];


  const saved =
    isPostSaved(post);


  button.classList.toggle(
    "saved",
    saved
  );


  button.innerHTML = `

    <img
      class="discovery-save-icon"
      src="${
        saved
          ? "assets/icons/bookmarked.png"
          : "assets/icons/bookmark.png"
      }"
      alt=""
    >

    <span class="discovery-save-text">
      ${saved ? "Saved" : "Save"}
    </span>

  `;


  button.setAttribute(
    "aria-label",
    saved
      ? "Remove from saved"
      : "Save conversation"
  );

}


/* =========================================================
   HANDLE SAVE BUTTON
========================================================= */

function handleDiscoverySave() {

  const current =
    getCurrentPosts();


  if (
    !current.length ||
    !current[postIndex]
  ) {

    return;

  }


  const post =
    current[postIndex];


  if (
    isPostSaved(post)
  ) {

    unsavePost(post);

  } else {

    savePost(post);

  }


  updateDiscoverySaveButton();

}


/* =========================================================
   INITIALIZE
========================================================= */

buildWheel();

renderDiscovery();


window.addEventListener(
  "resize",
  () => {

    buildWheel();

  }
);