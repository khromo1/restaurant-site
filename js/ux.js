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

function initCounters() {
  var countersStarted = false;

  function startCounters() {
    $(".counter").each(function () {
      var $this = $(this);
      var target = parseInt($this.data("target"));

      $({ value: 0 }).animate({ value: target }, {
        duration: 750,
        easing: "swing",
        step: function () {
          $this.text(Math.floor(this.value));
        },
        complete: function () {
          $this.text(target);
        }
      });
    });
  }

  function checkCounters() {
    if (countersStarted) return;

    var $first = $(".counter").first();
    if ($first.length === 0) return;

    var scrollBottom = $(window).scrollTop() + $(window).height();
    var elementTop = $first.offset().top;

    if (scrollBottom > elementTop) {
      countersStarted = true;
      startCounters();
    }
  }

  $(window).on("scroll", checkCounters);
  checkCounters();
}

$(document).ready(function () {
    progressBar();
    initCounters();
});