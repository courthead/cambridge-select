$.fn.testimonialize = function(timeout) {
  var $container = this,
    timeout = parseInt(timeout, 10) || 4000;

  function cycle() {
    var $first = $container.find('li:first');
    $first.next().removeClass('highlighted');
    
    $first.animate({ marginLeft: '-33%' }, 750, 'swing', function() {
      $first.next().next().addClass('highlighted', 200);
      $first.remove().css({ marginLeft: '' });
      $container.append($first);
    });

    enqueueCycle();
  }
  
  function enqueueCycle() {
    setTimeout(function() {
      cycle();
    }, timeout);
  }
  
  function initialize() {
    $container.addClass('testimonialize');
    cycle();
  }

  initialize();
};