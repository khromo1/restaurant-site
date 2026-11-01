function progressBar() {
    function updateProgressBar() {
        var scrollTop = $(window).scrollTop();
        var docHeight = $(document).height() - $(window).height();
        var percent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

        $("#progress-bar").css("width", percent + "%");
    }

    $(window).on("scroll resize", updateProgressBar);
    updateProgressBar();
}

$(document).ready(function () {
    progressBar();
});