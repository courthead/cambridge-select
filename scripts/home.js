(function(window) {
  var Home = window.Home = {};

  Home.bindings = function() {
    $('#hero .button').on('click', function() {
      var $scrollTarget = $('#about'),
          scrollTop = $scrollTarget.offset().top - $('#header-bar').outerHeight(),
          animation = { scrollTop: scrollTop };
      $('html, body').stop().animate(animation, 1000, 'easeInOutQuart');
    });

    $(window).on('scroll', function() {
      var pixelsScrolled = $(this).scrollTop(),
        windowHeight = $(this).height(),
        topOfWindow = pixelsScrolled,
        bottomOfWindow = pixelsScrolled + windowHeight;
      runScrollFunctions(topOfWindow, bottomOfWindow);
    });
  };

  function runScrollFunctions(topOfWindow, bottomOfWindow) {
    popInAboutSection(topOfWindow, bottomOfWindow);
    showMapElements(topOfWindow, bottomOfWindow);
  };

  function popInAboutSection(topOfWindow, bottomOfWindow) {
    var $blurbs = $('#about li'),
      $blurb = $blurbs.eq(0),
      blurbPixelsFromTop = $blurb.offset().top,
      blurbHeight = $blurb.height();

    if (topOfWindow < (blurbPixelsFromTop + blurbHeight) &&
        bottomOfWindow > (blurbPixelsFromTop + (blurbHeight / 2))) {
      $blurbs.addClass('animate');
    } else {
      $blurbs.removeClass('animate');
    }
  };

  function showMapElements(topOfWindow, bottomOfWindow) {
    var $map = $('#map'),
      mapPixelsFromTop = $map.offset().top;

    if (topOfWindow < mapPixelsFromTop &&
        bottomOfWindow > (mapPixelsFromTop + ($map.height() / 2))) {
      $map.find('*').addClass('animate');
    } else {
      $map.find('.animate').removeClass('animate');
    }
  };
})(window);