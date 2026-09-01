const themeButtons =
document.querySelectorAll(".theme-btn");

themeButtons.forEach(button => {


    button.addEventListener("click", () => {

        const theme =
            button.dataset.theme;


        document.body.dataset.theme =
            theme;


        themeButtons.forEach(btn => {

            btn.classList.toggle(
                "active",
                btn === button
            );

        });


        localStorage.setItem(
            "suporly-theme",
            theme
        );

    });


});

const savedTheme =
localStorage.getItem("suporly-theme");

if (savedTheme) {


    document.body.dataset.theme =
        savedTheme;


    themeButtons.forEach(button => {

        button.classList.toggle(
            "active",
            button.dataset.theme === savedTheme
        );

    });


}
