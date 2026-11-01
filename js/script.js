/* task 1: real time search and live filter */
function initLiveFilter() {
  const $input = $("#menu-search");
  if ($input.length === 0) return;

  $input.on("keyup", function () {
    const query = $(this).val().toLowerCase().trim();
    let totalFound = 0;

    $(".menu-category").each(function () {
      const $category = $(this);
      const $rows = $category.find(".menu-item, li");

      $rows.hide();
      const $found = $rows.filter(function () {
        return $(this).text().toLowerCase().includes(query);
      });
      $found.show();

      $category.toggle($found.length > 0);
      totalFound += $found.length;
    });

    $("#no-results").toggle(totalFound === 0);
  });
}

/* task 2 autocomplete suggestions */
function initAutocomplete() {
  const $input = $("#menu-search");
  const $list = $("#suggestions");
  if ($input.length === 0) return;

  // collect dish names once
  const dishNames = [];
  $(".menu-item").each(function () {
    dishNames.push($(this).find("span").first().text().trim());
  });
  $(".menu-category li").each(function () {
    dishNames.push($(this).text().split("—")[0].trim());
  });

  $input.on("input", function () {
    const query = $(this).val().toLowerCase().trim();
    $list.empty();

    if (query === "") {
      $list.hide();
      return;
    }

    const matches = dishNames
      .filter(function (name) { return name.toLowerCase().includes(query); })
      .slice(0, 5);

    if (matches.length === 0) {
      $list.hide();
      return;
    }

    matches.forEach(function (name) {
      $("<li>").text(name).appendTo($list);
    });
    $list.show();
  });

  // click on a suggestion
  $list.on("click", "li", function () {
    $input.val($(this).text()).trigger("keyup");
    $list.hide();
  });

  // click outside closes the list
  $(document).on("click", function (event) {
    if ($(event.target).closest(".search-wrap").length === 0) {
      $list.hide();
    }
  });
}

/* task 3 search highlighting */
function escapeHtml(str) {
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function escapeRegex(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function initHighlight() {
  const $input = $("#faq-search");
  const $targets = $(".accordion-question, .accordion-answer p");
  if ($input.length === 0 || $targets.length === 0) return;

  // remember original text once
  $targets.each(function () {
    $(this).data("original", $(this).text());
  });

  $input.on("keyup", function () {
    const query = $(this).val().trim();
    const regex = query
      ? new RegExp("(" + escapeRegex(escapeHtml(query)) + ")", "gi")
      : null;

    $targets.each(function () {
      const original = escapeHtml($(this).data("original"));
      $(this).html(regex ? original.replace(regex, '<mark class="hl">$1</mark>') : original);
    });

    // open items with matches, close the rest
    $(".accordion-item").each(function () {
      const $item = $(this);
      const $answer = $item.find(".accordion-answer");
      const hasMatch = query !== "" && $item.find("mark.hl").length > 0;

      $item.toggleClass("open", hasMatch);
      $answer.css("max-height", hasMatch ? $answer[0].scrollHeight + "px" : "");
    });
  });
}

/* task 9 image lazy loading */
function initLazyLoading() {
  if ($("img.lazy").length === 0) return;

  function loadVisibleImages() {
    const viewTop = $(window).scrollTop();
    const viewBottom = viewTop + $(window).height();

    $("img.lazy:not(.requested)").each(function () {
      const $img = $(this);
      const imgTop = $img.offset().top;
      const imgBottom = imgTop + $img.height();

      // start loading 100px before the image appears
      if (imgTop < viewBottom + 100 && imgBottom > viewTop - 100) {
        $img.addClass("requested");
        $img.one("load", function () { $img.addClass("loaded"); });
        $img.attr("src", $img.attr("data-src"));
      }
    });
  }

  $(window).on("scroll resize", loadVisibleImages);
  loadVisibleImages(); // images already visible on page load
}

/* call */

$(document).ready(function () {
  console.log("jQuery is ready!"); // Task 0

  initLiveFilter();
  initAutocomplete();
  initHighlight();
  initLazyLoading();
});