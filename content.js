(function () {
    const navBar = document.querySelector(".bar-line-nav");
    if (navBar) {
        const gruvBox = document.createElement("div");
        gruvBox.className = "pure-u-1-2 bar-cell bleft";
        gruvBox.innerHTML = `<span id="pagecolorGruvbox" 
            style="display:inline-block;width:20px;height:20px;
                   border:1px solid #665c54;background: #665c54;"></span>`;

        const darkBox = document.createElement("div");
        darkBox.className = "pure-u-1-2 bar-cell bright";
        darkBox.innerHTML = `<span id="pagecolorDark" 
            style="display:inline-block;width:20px;height:20px;
                   border:1px solid #333;background: #121212;"></span>`;

        navBar.appendChild(gruvBox);
        navBar.appendChild(darkBox);
    }

    document.addEventListener("click", function (e) {
        const id = e.target?.id;
        if (!id) return;

        if (id === "pagecolorDark") {
            applyDarkTheme();
        } else if (id === "pagecolorGruvbox") {
            applyGruvboxTheme();
        }
    });
})();

function applyGruvboxTheme() {
    document.body.classList.remove("sepya");
    document.body.style.background = "#282828";
    document
        .querySelectorAll(".body_container")
        .forEach((el) => (el.style.background = "#3c3836"));
    document
        .querySelectorAll(".body")
        .forEach((el) => (el.style.background = "#3c3836"));
    document
        .querySelectorAll(".m-body, .m-title, .title_info")
        .forEach((el) => (el.style.color = "#ebdbb2"));
    document
        .querySelectorAll(".encyp_ico_container, .encyp_text_container")
        .forEach((el) => (el.style.background = "#3c3836"));
    document
        .querySelector("#article_toolbar")
        ?.style.setProperty("border-color", "#504945");
    document
        .querySelectorAll(".article-left-bar")
        .forEach((el) => (el.style.background = "#3c3836"));
    document
        .querySelectorAll(".hdrprt1arrows")
        .forEach((el) => (el.style.background = "#e4ddcc"));
}

function applyDarkTheme() {
    document.body.classList.remove("sepya");
    document.body.style.background = "#121212";
    document
        .querySelectorAll(".body_container")
        .forEach((el) => (el.style.background = "#1E1E1E"));
    document
        .querySelectorAll(".body")
        .forEach((el) => (el.style.background = "#1E1E1E"));
    document
        .querySelectorAll(".m-body, .m-title, .title_info")
        .forEach((el) => (el.style.color = "#E0E0E0"));
    document
        .querySelectorAll(".encyp_ico_container, .encyp_text_container")
        .forEach((el) => (el.style.background = "#1E1E1E"));
    document
        .querySelector("#article_toolbar")
        ?.style.setProperty("border-color", "#333");
    document
        .querySelectorAll(".article-left-bar")
        .forEach((el) => (el.style.background = "#1E1E1E"));
}
