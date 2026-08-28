const body = document.body;

const themeButtons =
    document.querySelectorAll(".theme-btn");

const themeColor =
    document.getElementById("themeColor");


const themes = {

    light: {
        color: "#ffffff"
    },

    dark: {
        color: "#0b0d10"
    },

    suporly: {
        color: "#0c0b14"
    }

};


function applyTheme(theme) {

    if (!themes[theme]) {
        theme = "light";
    }


    body.dataset.theme = theme;


    themeButtons.forEach(button => {

        const isActive =
            button.dataset.theme === theme;

        button.classList.toggle(
            "active",
            isActive
        );

        button.setAttribute(
            "aria-pressed",
            isActive ? "true" : "false"
        );

    });


    if (themeColor) {

        themeColor.setAttribute(
            "content",
            themes[theme].color
        );

    }


    localStorage.setItem(
        "suporly-theme",
        theme
    );

}


const savedTheme =
    localStorage.getItem("suporly-theme") || "light";

applyTheme(savedTheme);


themeButtons.forEach(button => {

    button.addEventListener(
        "click",
        () => {

            applyTheme(
                button.dataset.theme
            );

        }
    );

});