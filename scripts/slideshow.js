$.fn.slideshow = function(options) {
  if (!options) options = {};

  var $container = this,
    defaultOptions = {
      indexOfFirstSlide: 0,
      showControls: true,
      msPerSlide: 5000
    },
    advanceInterval,
    key;

  for (key in defaultOptions) {
    if (!(key in options)) {
      options[key] = defaultOptions[key];
    }
  }

  function advanceToNextSlide(nextSlideIndex) {
    var $activeSlide,
      $nextSlide;

    // Hide the active slide.
    $activeSlide = $container.find('.slide.active');
    $activeSlide.removeClass('active').addClass('hidden');

    // Find the next slide.
    if (typeof nextSlideIndex === 'undefined') {
      $nextSlide = $container.find('.slide:eq(0)');
      if ($activeSlide.next('.slide').length) {
        $nextSlide = $activeSlide.next();
      }
    } else {
      $nextSlide = $container.find('.slide:eq(' + nextSlideIndex + ')');
    }

    // Animate the next slide.
    $nextSlide.removeClass('hidden').addClass('active');

    // Show the correct control button as active.
    updateControls($nextSlide.index());
  }

  function hideSlides() {
    $container.find('.slide').each(function(i) {
      if (i !== options.indexOfFirstSlide) {
        $(this).addClass('hidden');
      }
    });
  }

  function resetAdvanceInterval() {
    clearInterval(advanceInterval);
    advanceInterval = setInterval(function() {
      advanceToNextSlide();
    }, options.msPerSlide);
  }

  function drawControls() {
    var $controls = $container.find('.controls'),
      numSlides = $container.find('.slide').length,
      i;
    for (i = 0; i < numSlides; i++) {
      $controls.append('<div role="button"></div>');
    }
  }

  function bindControls() {
    $container.find('.controls [role="button"]').on('click', function() {
      advanceToNextSlide($(this).index());
      resetAdvanceInterval();
    });
  }

  function updateControls(index) {
    if (!options.showControls) return;

    $container.find('.controls [role="button"].active').removeClass('active');
    $container.find('.controls [role="button"]:eq(' + index + ')').addClass('active');
  }

  function initializeControls() {
    if (options.showControls) {
      drawControls();
      bindControls();
    } else {
      $container.find('.controls').remove();
    }
  }

  function initialize() {
    initializeControls();
    hideSlides();
    advanceToNextSlide();
    resetAdvanceInterval();
  }

  initialize();
};