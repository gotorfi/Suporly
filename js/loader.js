function hidePageLoader() {

    const loader =
        document.getElementById("pageLoader");

    if (!loader) {
        return;
    }

    loader.classList.add("hidden");
}