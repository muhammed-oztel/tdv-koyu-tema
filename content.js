(function () {
    // Yeni tema butonlarını ekle
    const navBar = document.querySelector(".bar-line-nav");
    if (navBar) {
        const darkDiv = document.createElement("div");
        darkDiv.className = "pure-u-1-2 bar-cell bleft";
        darkDiv.innerHTML = `<span id="pagecolorDark" 
            style="display:inline-block;width:20px;height:20px;
                   border:1px solid #333;background:#121212;"></span>`;

        const gruvboxDiv = document.createElement("div");
        gruvboxDiv.className = "pure-u-1-2 bar-cell bright";
        gruvboxDiv.innerHTML = `<span id="pagecolorGruvbox" 
            style="display:inline-block;width:20px;height:20px;
                   border:1px solid #333;background:#282828;"></span>`;

        navBar.appendChild(darkDiv);
        navBar.appendChild(gruvboxDiv);
    }

    /**
     * $('#pagecolorWhite').click(function(){
		$(".body_container").css("background" , "#fff");
		$("body").css("background", "#f1f4f4");
		$(".m-body, .m-title, .title_info").css("color", "#333");
		$(".encyp_ico_container, .encyp_text_container").css("background","#f4f1f1");
		$("#article_toolbar").css("border-color","#ededed");
		$("#artplan").removeClass("sepya");
		$(".article-plan-buttons").removeClass("sepya");
		$(".hdrprt1").removeClass("sepya");
		$(".hdrprt1arrows").removeClass("sepya");
		$(".partnumbers, .partdownarrow, .partprint, .partemail, .partatif, .article-country-container, body").removeClass("sepya");
		$(".partblt").attr("src", "https://cdn2.islamansiklopedisi.org.tr/assets/w/images/layouts/part-header-arrow-down.png");
		$(".article-left-bar").css("background","#fff");
	});
     */

    document.addEventListener("click", (e) => {
        if (e.target.id === "pagecolorDark") {
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

        if (e.target.id === "pagecolorGruvbox") {
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
    });
})();
