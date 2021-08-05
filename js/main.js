AOS.init({
    easing: "ease-out",
    duration: 800,
});

$(document).ready(function() {

    // Check for click events on the navbar burger icon
    $(".navbar-burger").click(function() {

        // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
        $(".navbar-burger").toggleClass("is-active");
        $(".navbar-menu").toggleClass("is-active");

    });
});

window.onscroll = function () {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        document.getElementById("toTop").style.display = "block";
    } else {
        document.getElementById("toTop").style.display = "none";
    }
};

// Smooth Anchor Scrolling
$("a[href^='#']").on("click", function (event) {
    event.preventDefault();
    //console.log($.attr(this, "href"));
    //$("nav.navbar").find(".is-active").removeClass("is-active");
    //$(this).parent().addClass("is-active");
    $("html, body").animate(
        {
            scrollTop: $($.attr(this, "href")).offset().top
        },
        500
    );
});