// Animated Menu__________________________________
$(document).ready(function(){
  $(window).scroll(function() {
    if( $(this).scrollTop() > $('.header__contacts').height()) {
      $(".header__menu").addClass('header__menu-active');
      $(".logo").addClass('logo-menu-active');
    } else {
      $(".header__menu").removeClass('header__menu-active');
      $(".logo").removeClass('logo-menu-active');
    }
  });

  $(".form-buy__button-link").click(function(){
        $(".form-popap").addClass('form-popap-active animated fadeIn');
    });
  $(".form-popap").click(function(){
        $(".form-popap").removeClass('form-popap-active animated fadeIn');
    });


//paralax
  paralax = function(){

    $('.paralax-img').each(function(){
    
      var $this = $(this),
        scrollW = $(window).scrollTop();
    
      if($this.offset().top <= scrollW + window.innerHeight + 20 && $this.offset().top + $this.height() >= scrollW - 50) {
        $this.css({
          'background-position' : 'center '+(($this.position().top - scrollW)/5)+'px'
        });
      }
    
    });

  }
  paralax();

  $(window).on('scroll', function(){
    paralax();
  });

  var slideout = new Slideout({
    'panel': document.getElementById('panel'),
    'menu': document.getElementById('menu'),
    'padding': 256,
    'tolerance': 70
  });

  // Toggle button
  document.querySelector('.toggle-button').addEventListener('click', function() {
    slideout.toggle();
  });


// Инициализация анимации при скроле_______________
  var wow = new WOW(
    {
      boxClass:     'wow',
      animateClass: 'animated',
      offset:       1,
      mobile:       true,
      live:         true,
      scrollContainer: null,
      resetAnimation: true,
    }
  );
  wow.init();



});