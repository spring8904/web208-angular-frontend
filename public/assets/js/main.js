(function ($) {
  "use strict";

  /*-- Variables --*/
  var windows = $(window);
  var screenSize = windows.width();

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
	Product Slider
-----------------------------------*/
  $(".pro-thumb-img").slick({
    arrows: true,
    dots: false,
    autoplay: true,
    infinite: true,
    slidesToShow: 4,
    prevArrow:
      '<button type="button" class="slick-prev"><i class="fa fa-angle-left"></i></button>',
    nextArrow:
      '<button type="button" class="slick-next"><i class="fa fa-angle-right"></i></button>',
    responsive: [
      {
        breakpoint: 1199,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 479,
        settings: {
          slidesToShow: 3,
        },
      },
    ],
  });
  $(".product-slider, .related-product-slider-1").slick({
    arrows: true,
    dots: false,
    autoplay: true,
    infinite: true,
    slidesToShow: 4,
    prevArrow:
      '<button type="button" class="slick-prev"><i class="fa fa-angle-left"></i></button>',
    nextArrow:
      '<button type="button" class="slick-next"><i class="fa fa-angle-right"></i></button>',
    responsive: [
      {
        breakpoint: 1199,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 767,
        settings: {
          autoplay: true,
          slidesToShow: 1,
          arrows: false,
        },
      },
    ],
  });
  $(".related-product-slider-2").slick({
    arrows: true,
    dots: false,
    autoplay: true,
    infinite: true,
    slidesToShow: 3,
    prevArrow:
      '<button type="button" class="slick-prev"><i class="fa fa-angle-left"></i></button>',
    nextArrow:
      '<button type="button" class="slick-next"><i class="fa fa-angle-right"></i></button>',
    responsive: [
      {
        breakpoint: 1199,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 767,
        settings: {
          autoplay: true,
          slidesToShow: 1,
          arrows: false,
        },
      },
    ],
  });

  /*----- 
	Product Zoom
--------------------------------*/
  // Instantiate EasyZoom instances
  var $easyzoom = $(".easyzoom").easyZoom();

  // Setup thumbnails example
  var api1 = $easyzoom.filter(".easyzoom--with-thumbnails").data("easyZoom");

  $(".pro-thumb-img").on("click", "a", function (e) {
    var $this = $(this);

    e.preventDefault();

    // Use EasyZoom's `swap` method
    api1.swap($this.data("standard"), $this.attr("href"));
  });

  /*--
	Count Down Timer
------------------------*/
  $("[data-countdown]").each(function () {
    var $this = $(this),
      finalDate = $(this).data("countdown");
    $this.countdown(finalDate, function (event) {
      $this.html(
        event.strftime(
          '<span class="cdown day"><span class="time-count">%-D</span> <p>Days</p></span> <span class="cdown hour"><span class="time-count">%-H</span> <p>Hours</p></span> <span class="cdown minutes"><span class="time-count">%M</span> <p>Mint</p></span> <span class="cdown second"><span class="time-count">%S</span> <p>Secs</p></span>'
        )
      );
    });
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

  /*--
    Nice Select
------------------------*/
  $(".nice-select").niceSelect();

  /*--
	Price Range Slider
------------------------*/
  $("#price-range").slider({
    range: true,
    min: 0,
    max: 2000,
    values: [250, 1670],
    slide: function (event, ui) {
      $("#price-amount").val("$" + ui.values[0] + "  -  $" + ui.values[1]);
    },
  });
  $("#price-amount").val(
    "$" +
      $("#price-range").slider("values", 0) +
      "  -  $" +
      $("#price-range").slider("values", 1)
  );

  /*----- 
	Quantity
--------------------------------*/
  $(".pro-qty").prepend(
    '<span class="dec qtybtn"><i class="ti-minus"></i></span>'
  );
  $(".pro-qty").append(
    '<span class="inc qtybtn"><i class="ti-plus"></i></span>'
  );
  $(".qtybtn").on("click", function () {
    var $button = $(this);
    var oldValue = $button.parent().find("input").val();
    if ($button.hasClass("inc")) {
      var newVal = parseFloat(oldValue) + 1;
    } else {
      // Don't allow decrementing below zero
      if (oldValue > 0) {
        var newVal = parseFloat(oldValue) - 1;
      } else {
        newVal = 0;
      }
    }
    $button.parent().find("input").val(newVal);
  });

  /*----- 
	Shipping Form Toggle
--------------------------------*/
  //   $("[data-shipping]").on("click", function () {
  //     if ($("[data-shipping]:checked").length > 0) {
  //       $("#shipping-form").slideDown();
  //     } else {
  //       $("#shipping-form").slideUp();
  //     }
  //   });

  /*----- 
	Payment Method Select
--------------------------------*/
  //   $('[name="payment-method"]').on("click", function () {
  //     var $value = $(this).attr("value");

  //     $(".single-method p").slideUp();
  //     $('[data-method="' + $value + '"]').slideDown();
  //   });
})(jQuery);
