$(function () {
    highlightCurrentPageInMenuBar();
    updateLoginButton();
});

function highlightCurrentPageInMenuBar() {
    $(".menu #" + getCurrentPage()).addClass("selectedItem");
}

function updateLoginButton() {
    if (user)
        $("#logout").show();
    else
        $("#login").show();
}

function getCurrentPage() {
    url = window.location.pathname;
    if (url == "/")
        return "index"
    else
        return url.substring(url.lastIndexOf("/") + 1);
}

