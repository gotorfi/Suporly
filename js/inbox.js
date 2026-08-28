/* =========================================================
   SUPORLY INBOX
========================================================= */


const notifications = [

    {
        id: "notification_001",
        category: "comment",
        message: "Someone commented on your post.",
        date: "2026-08-27T14:30:00",
        read: false
    },

    {
        id: "notification_002",
        category: "approval",
        message: "Your post has been approved and is now visible to the community.",
        date: "2026-08-27T12:15:00",
        read: false
    },

    {
        id: "notification_003",
        category: "system",
        message: "Welcome to Suporly. We're happy to have you here.",
        date: "2026-08-26T18:40:00",
        read: true
    },

    {
        id: "notification_004",
        category: "warning",
        message: "Your account received a community warning. Please review the community guidelines.",
        date: "2026-08-25T16:20:00",
        read: false
    },

    {
        id: "notification_005",
        category: "removed",
        message: "One of your posts was removed because it did not follow the community guidelines.",
        date: "2026-08-24T11:05:00",
        read: true
    }

];


/* =========================================================
   PAGINATION
========================================================= */

// Change this to 25 later!

const NOTIFICATIONS_PER_PAGE = 3;

let currentPage = 1;


/* =========================================================
   ELEMENTS
========================================================= */

const inboxList =
    document.getElementById("inboxList");

const inboxEmpty =
    document.getElementById("inboxEmpty");

const inboxBadge =
    document.getElementById("inboxBadge");

const markAllReadButton =
    document.getElementById("markAllRead");

const inboxPagination =
    document.getElementById("inboxPagination");


/* =========================================================
   CATEGORY CONFIG
========================================================= */

const categoryConfig = {

    comment: {
        label: "Comment",
        icon: "●"
    },

    approval: {
        label: "Approved",
        icon: "✓"
    },

    removed: {
        label: "Removed",
        icon: "−"
    },

    warning: {
        label: "Warning",
        icon: "!"
    },

    system: {
        label: "System",
        icon: "i"
    }

};


/* =========================================================
   DATE FORMAT
========================================================= */

function formatNotificationDate(dateString) {

    const date =
        new Date(dateString);

    if (Number.isNaN(date.getTime())) {

        return "";

    }

    return date.toLocaleDateString(
        undefined,
        {
            month: "short",
            day: "numeric",
            year: "numeric"
        }
    );

}


/* =========================================================
   GET CATEGORY
========================================================= */

function getCategory(category) {

    return (
        categoryConfig[category] ||
        categoryConfig.system
    );

}


/* =========================================================
   UPDATE BADGE
========================================================= */

function updateInboxBadge() {

    const unreadCount =
        notifications.filter(
            notification => !notification.read
        ).length;


    if (unreadCount <= 0) {

        inboxBadge.hidden = true;
        inboxBadge.textContent = "0";

        return;

    }


    inboxBadge.hidden = false;


    inboxBadge.textContent =
        unreadCount > 99
            ? "99+"
            : unreadCount;

}


/* =========================================================
   RENDER PAGINATION
========================================================= */

function renderPagination() {

    inboxPagination.innerHTML = "";


    const totalPages =
        Math.ceil(
            notifications.length /
            NOTIFICATIONS_PER_PAGE
        );


    if (totalPages <= 1) {

        inboxPagination.hidden = true;

        return;

    }


    inboxPagination.hidden = false;


    /*
        Previous
    */

    const previousButton =
        document.createElement("button");

    previousButton.type = "button";

    previousButton.className =
        "inbox-page-button";

    previousButton.textContent =
        "Previous";

    previousButton.disabled =
        currentPage === 1;


    previousButton.addEventListener(
        "click",
        () => {

            if (currentPage > 1) {

                currentPage--;

                renderInbox();

                window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                });

            }

        }
    );


    inboxPagination.appendChild(
        previousButton
    );


    /*
        Page numbers
    */

    for (
        let page = 1;
        page <= totalPages;
        page++
    ) {

        const pageButton =
            document.createElement("button");


        pageButton.type =
            "button";


        pageButton.className =
            "inbox-page-button";


        if (page === currentPage) {

            pageButton.classList.add(
                "active"
            );

            pageButton.setAttribute(
                "aria-current",
                "page"
            );

        }


        pageButton.textContent =
            page;


        pageButton.addEventListener(
            "click",
            () => {

                if (currentPage !== page) {

                    currentPage = page;

                    renderInbox();

                    window.scrollTo({
                        top: 0,
                        behavior: "smooth"
                    });

                }

            }
        );


        inboxPagination.appendChild(
            pageButton
        );

    }


    /*
        Next
    */

    const nextButton =
        document.createElement("button");

    nextButton.type = "button";

    nextButton.className =
        "inbox-page-button";

    nextButton.textContent =
        "Next";

    nextButton.disabled =
        currentPage === totalPages;


    nextButton.addEventListener(
        "click",
        () => {

            if (currentPage < totalPages) {

                currentPage++;

                renderInbox();

                window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                });

            }

        }
    );


    inboxPagination.appendChild(
        nextButton
    );

}


/* =========================================================
   RENDER INBOX
========================================================= */

function renderInbox() {

    inboxList.innerHTML = "";


    if (!notifications.length) {

        inboxList.hidden = true;

        inboxEmpty.hidden = false;

        inboxPagination.hidden = true;

        updateInboxBadge();

        return;

    }


    inboxList.hidden = false;

    inboxEmpty.hidden = true;


    /*
        Calculate current page
    */

    const startIndex =
        (
            currentPage - 1
        ) *
        NOTIFICATIONS_PER_PAGE;


    const endIndex =
        startIndex +
        NOTIFICATIONS_PER_PAGE;


    const pageNotifications =
        notifications.slice(
            startIndex,
            endIndex
        );


    /*
        Render notifications
    */

    pageNotifications.forEach(
        notification => {

            const item =
                document.createElement("article");


            item.className =
                "inbox-item " +
                notification.category +
                (
                    notification.read
                        ? ""
                        : " unread"
                );


            const category =
                getCategory(
                    notification.category
                );


            const icon =
                document.createElement("div");

            icon.className =
                "inbox-item-icon";

            icon.textContent =
                category.icon;


            const content =
                document.createElement("div");

            content.className =
                "inbox-item-content";


            const top =
                document.createElement("div");

            top.className =
                "inbox-item-top";


            const categoryElement =
                document.createElement("span");

            categoryElement.className =
                "inbox-item-category";

            categoryElement.textContent =
                category.label;


            const dateElement =
                document.createElement("span");

            dateElement.className =
                "inbox-item-date";

            dateElement.textContent =
                formatNotificationDate(
                    notification.date
                );


            const message =
                document.createElement("p");

            message.className =
                "inbox-item-message";

            message.textContent =
                notification.message;


            top.appendChild(
                categoryElement
            );

            top.appendChild(
                dateElement
            );


            content.appendChild(top);

            content.appendChild(message);


            item.appendChild(icon);

            item.appendChild(content);


            /*
                Mark notification as read
            */

            item.addEventListener(
                "click",
                () => {

                    if (!notification.read) {

                        notification.read = true;

                        renderInbox();

                    }

                }
            );


            inboxList.appendChild(item);

        }
    );


    renderPagination();

    updateInboxBadge();

}


/* =========================================================
   MARK ALL AS READ
========================================================= */

function markAllAsRead() {

    notifications.forEach(
        notification => {

            notification.read = true;

        }
    );


    renderInbox();

}


/* =========================================================
   EVENT
========================================================= */

if (markAllReadButton) {

    markAllReadButton.addEventListener(
        "click",
        markAllAsRead
    );

}


/* =========================================================
   INITIALIZE
========================================================= */

renderInbox();