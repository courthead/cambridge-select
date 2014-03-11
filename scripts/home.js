var Home = {};

Home.bindings = function() {
  $('#hero .button').on('click', function() {
    var $scrollTarget = $('#about'),
        scrollTop = $scrollTarget.offset().top - $('#header-bar').outerHeight(), 
        animation = { scrollTop: scrollTop };
    $('html, body').stop().animate(animation, 1000, 'easeInOutQuart');
  });
};