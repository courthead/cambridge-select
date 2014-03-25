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
        windowHeight = $(this).height();
      runScrollFunctions(pixelsScrolled, windowHeight);
    });
  };

  function runScrollFunctions(pixelsScrolled, windowHeight) {
    popInAboutSection(pixelsScrolled, windowHeight);
    showMapElements(pixelsScrolled, windowHeight);
  };

  function popInAboutSection(pixelsScrolled, windowHeight) {
    var $blurbs = $('#about li');
    if ($blurbs.eq(0).hasClass('animate')) return;

    var blurbPixelsFromTop = $blurbs.eq(0).offset().top;
    if (windowHeight + pixelsScrolled > blurbPixelsFromTop) {
      $blurbs.addClass('animate');
    }
  };

  function showMapElements(pixelsScrolled, windowHeight) {
    var $map = $('#map'),
      mapPixelsFromTop = $map.offset().top + ($map.height() / 2);
    if (windowHeight + pixelsScrolled > mapPixelsFromTop) {
      $map.find('*').addClass('animate');
    }
  };
})(window);