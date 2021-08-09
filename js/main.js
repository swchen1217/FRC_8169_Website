/*AOS.init({
    easing: "ease-out",
    duration: 800,
});*/

var hackmd_url = "https://api.allorigins.win/raw?url=https://hackmd.io/api/@FRC-8169/overview";

$(document).ready(function () {
    // Check for click events on the navbar burger icon
    $(".navbar-burger").click(function () {
        toggleNavbar();
    });

    fetch(`${hackmd_url}?nocache=${Date.now()}`)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            renderDaily(data)
        });
});

function toggleNavbar() {
    // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
    $(".navbar-burger").toggleClass("is-active");
    $(".navbar-menu").toggleClass("is-active");
}

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
    if($(".navbar-menu").hasClass('is-active'))
        toggleNavbar();
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

var member_tag_colors = {
    "機構組": "is-primary",
    "繪圖組": "is-success",
    "電機組": "is-danger",
    "程式組": "is-warning",
    "公關組": "is-link",
    "Driver Team": "is-orange",
}

function renderDaily(data) {
    let html = "";
    data['notes'].forEach((item) => {
        let isDaily = false;
        let tagsHtml = "";
        item['tags'].forEach((tag) => {
            if (tag == 'daily')
                isDaily = true;
            if (tag.startsWith('*')) {
                tagsHtml += `<span class="tag ${member_tag_colors[tag.substr(1)] ?? 'is-info'}">${escapeHtml(tag.substr(1))}</span>`;
            }
        })
        if (!isDaily)
            return;
        html += `<div class="column is-3">
              <div class="card has-shadow-black has-radius-15">
                <div class="card-content">
                  <div class="media has-text-centered mb-4">
                    <div class="media-content"><a class="title is-4" href="https://hackmd.io/@${data['team']['path']}/${item['shortId']}" target="_blank">${escapeHtml(item['title'])}</a><br>
                      <p class="subtitle is-6">Published At ${new Date(item['publishedAt']).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <div class="content">
                    <div class="tags are-medium is-centered">${tagsHtml}</div>
                  </div>
                </div>
              </div>
            </div>`;
    });
    document.getElementById('dailyCard').innerHTML = html;
}

function escapeHtml(string) {
    return String(string).replace(/[&<>"'\/]/g, function (s) {
        return entityMap[s];
    });
}