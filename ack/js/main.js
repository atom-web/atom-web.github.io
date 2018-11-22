$(document).ready(function(){

// Слайдер комапний производителя____________________________
    $('.company-slide').slick({
      slidesToShow: 7,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 2000,
      arrows: true,
      nextArrow: '<div class="next-arrows"><i class="fas fa-chevron-right"></i></div>',
      prevArrow: '<div class="prev-arrows"><i class="fas fa-chevron-left"></i></div>',
      responsive: [
    {
      breakpoint: 1040,
      settings: {
        arrows: false,
      }
    }
  ]
  });


// Открытие меню_____________________________________________
    $('.burger-open').click( function() {
      $('.header__menu-box').addClass('menu-box-active')
    });
    $('.header__nav').click( function() {
      $('.header__menu-box').removeClass('menu-box-active')
    });



});