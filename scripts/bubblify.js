$.fn.bubblify = function() {
  var $container = this;

  var Bubble = function() {
    var minExistMs = 8000,
      maxExistMs = 15000,
      colorAnimations = [
        'purpleToWhite',
        'maroonToWhite',
        'redToWhite',
        'orangeToWhite',
        'yellowToWhite'
      ],
      iconClasses = [
        'fa-bell',
        'fa-camera',
        'fa-cloud',
        'fa-comment',
        'fa-desktop',
        'fa-envelope',
        'fa-flag',
        'fa-gift',
        'fa-glass',
        'fa-heart',
        'fa-home',
        'fa-lock',
        'fa-leaf',
        'fa-music',
        'fa-pencil',
        'fa-phone',
        'fa-print',
        'fa-shopping-cart',
        'fa-star',
        'fa-truck',
        'fa-umbrella'
      ];

    this.draw = function() {
      var $el = this.$el = $('<div class="bubble"><i class="fa"></i></div>');

      $container.append(this.$el);

      setTimeout(function() { $el.remove(); }, maxExistMs);
    };

    this.randomizeIcon = function() {
      var iconIndex = Math.floor(Math.random() * iconClasses.length),
        iconClass = iconClasses[iconIndex];
      this.$el.find('.fa').addClass(iconClass);
    };

    this.randomizeAnimations = function() {
      var colorAnimation = this.randomColorAnimation(),
        floatAnimation = this.randomFloatTimeAnimation(),
        fadeAnimation = this.randomFadeTimeAnimation(),
        animation = [colorAnimation, floatAnimation, fadeAnimation].join(', ');
      this.$el.css({
        'animation': animation,
        '-webkit-animation': animation
      });
    };

    this.randomColorAnimation = function() {
      var index = Math.floor(Math.random() * colorAnimations.length),
        animation = colorAnimations[index];
      return animation + ' 2s';
    };

    this.randomFloatTimeAnimation = function() {
      var seconds = Math.floor(Math.random() * ((maxExistMs - minExistMs) / 1000)) +
        (minExistMs / 1000); // between `minExistMs` and `maxExistMs` ms
      return 'float ' + seconds + 's';
    };

    this.randomFadeTimeAnimation = function() {
      var seconds = Math.floor(Math.random() * 16) + 5; // between 5 and 20 seconds
      return 'fade ' + seconds + 's';
    };

    this.randomizePosition = function() {
      var randomPct = Math.floor(Math.random() * 10001) / 100;
      this.$el.css({ 'left': randomPct + '%' });
    };

    this.randomize = function() {
      this.randomizeIcon();
      this.randomizeAnimations();
      this.randomizePosition();
    };

    this.draw();
    this.randomize();
  };
  
  function initialize() {
    setInterval(function() {
      new Bubble;
    }, Math.round((1000 / $container.outerWidth()) * 200));
  }

  initialize();
};