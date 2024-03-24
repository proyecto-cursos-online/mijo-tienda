jQuery(document).ready(function(){
  function initializeBackToTop() {
      var r = document.querySelector(".rbt-progress-parent path");
      if (r) {
          var n = r.getTotalLength();
          r.style.transition = r.style.WebkitTransition = "none";
          r.style.strokeDasharray = n + " " + n;
          r.style.strokeDashoffset = n;
          r.getBoundingClientRect();
          r.style.transition = r.style.WebkitTransition = "stroke-dashoffset 10ms linear";

          function t() {
              var t = jQuery(window).scrollTop(),
                  e = jQuery(document).height() - jQuery(window).height();
              r.style.strokeDashoffset = n - t * n / e;
          }
          t(), jQuery(window).scroll(t);
          jQuery(window).on("scroll", function () {
              if (50 < jQuery(this).scrollTop()) {
                  jQuery(".rbt-progress-parent").addClass("rbt-backto-top-active");
              } else {
                  jQuery(".rbt-progress-parent").removeClass("rbt-backto-top-active");
              }
          });
          jQuery(".rbt-progress-parent").on("click", function (t) {
              t.preventDefault();
              jQuery("html, body").animate({
                  scrollTop: 0
              }, 550);
              return false;
          });
      }
  }
  initializeBackToTop();
});