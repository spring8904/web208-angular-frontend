(function ($) {
  "use strict";

  /*-- Variables --*/
  var windows = $(window);

  /*-- Product Hover Function --*/
  $(window).on("load", function () {
    function productHover() {
      var productInner = $(".product-inner");
      var proImageHeight = productInner.find("img").outerHeight();

      productInner.hover(
        function () {
          var porContentHeight = $(this).find(".content").innerHeight() - 55;
          $(this)
            .find(".image-overlay")
            .css({
              height: proImageHeight - porContentHeight,
            });
        },
        function () {
          $(this).find(".image-overlay").css({
            height: "100%",
          });
        }
      );
    }
    productHover();
    windows.resize(productHover);
  });

  /*--
    Scroll Up
-----------------------------------*/
  $.scrollUp({
    easingType: "linear",
    scrollSpeed: 900,
    animation: "fade",
    scrollText: '<i class="icofont icofont-swoosh-up"></i>',
  });
})(jQuery);
