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

function initSubmitSpinner() {
  var $form = $("#application-form");
  var $btn = $("#submit-btn");
  var $text = $btn.find(".btn-text");

  if ($form.length === 0) return;

  $form.on("submit", function (e) {
    e.preventDefault();

    $btn.prop("disabled", true).addClass("loading");
    $text.text("Отправляем...");

    setTimeout(function () {
      $btn.prop("disabled", false).removeClass("loading");
      $text.text("Отправить форму");
      $form[0].reset();
    }, 2000);
  });
}

$(document).ready(function () {
    progressBar();
    initCounters();
    initSubmitSpinner();
});