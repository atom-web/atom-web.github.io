$(document).ready(function(){

  // Переменные для автоплея слайдеров - Значения (Auto - включить/выключить, Clock - время прокрутки в миллисекундах)
  // Слайдер в хедере__________________Главная
  var headerAuto = false;
  var headerClock = 3000;
  // Слайдер в направлениях
  var dirAuto = true;
  var dirClock = 3000;
  // Слайдер в акциях
  var saleAuto = true;
  var saleClock = 3000;
  // Слайдер в отзывах
  var revAuto = true;
  var revClock = 3000;
  // Слайдер в специалистах
  var ourAuto = false;
  var ourClock = 3000;
  // Слайдер в новостях
  var newsAuto = true;
  var newsClock = 3000;
  // Слайдер с серификатами
  var certAuto = true;
  var certClock = 3000;











  $('img[src$=".svg"]').each(function() { 
    var $img = jQuery(this); 
    var imgURL = $img.attr('src'); 
    var attributes = $img.prop("attributes"); 

    $.get(imgURL, function(data) { 
        var $svg = jQuery(data).find('svg'); // Get the SVG tag, ignore the rest 
        $svg = $svg.removeAttr('xmlns:a'); // Remove any invalid XML tags 
        $.each(attributes, function() { // Loop through IMG attributes and apply on SVG 
          $svg.attr(this.name, this.value); 
        }); 

        $img.replaceWith($svg); // Replace IMG with SVG 
      }, 'xml'); 

  });

// Открытие и закрытие Формы поиска_________________________________

    var hfs = $(".header__form-search"); // Выпадающее окно формы
    var hsb = $(".header__search-button"); // Кнпка вызвова выпадающей формы
    var fClose = $(".header__form-search, header"); // блок который не используются при закрытии формы
    var fsa = ('form-search-active'); // Класс вешается при активной форме
    var animAdd = ('search-animate-add'); // Класс анимации появления
    var animRemove = ('search-animate-remove'); // Класс анимации затухания
    var formBottom = ('-70px'); // Padding формы появления

    hsb.click(function(){
      hfs.toggleClass(fsa);
      hfs.css('bottom', formBottom);
      if (hfs.hasClass(fsa)) {
        hfs.addClass(animAdd);
        hfs.removeClass(animRemove);
      } else {
        hfs.removeClass(animAdd);
        hfs.addClass(animRemove);
      }
      $(document).mouseup(function (e){
        if (!fClose.is(e.target)
          && fClose.has(e.target).length === 0) {
          hfs.removeClass(fsa);
        hfs.removeClass(animAdd);
        hfs.addClass(animRemove);
      }
    });
    });

// Инициализация слайдера и дата атрибут для переключения___________________
    $('.features-slider').slick({
      arrows: false,
      accessibility: false,
      draggable: false,
      infinite: true,
      speed: 300,
      slidesToShow: 1,
      fade: true,
      cssEase: 'linear',
    });
      $('.slider-nav li[data-slide]').click(function(e) {
        e.preventDefault();
        $('.slider-nav li').removeClass('features__active');
        $(this).addClass('features__active');
        var slideno = $(this).data('slide');
        $('.features-slider').slick('slickGoTo', slideno - 1);

        if ($('.info-company li').hasClass('features__active')) {
          $('.frame-bg').removeClass('features__active');
          $(this).find('.frame-bg').addClass('features__active');
        } else {
        }

      });

      $('.main-slider').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        autoplay: headerAuto,
        autoplaySpeed: headerClock,
        fade: true,
        cssEase: 'linear',
        draggable: false,
      });

      $('.direction-slider').slick({
        slidesToShow: 4,
        slidesToScroll: 1,
        arrows: true,
        autoplay: dirAuto,
        autoplaySpeed: dirClock,
        nextArrow: '<div class="next-arrows"><img src="img/right-arrow.svg" alt=""></div>',
        prevArrow: '<div class="prev-arrows"><img src="img/right-arrow.svg" alt=""></div>',
        responsive: [{
          breakpoint: 477, settings: {
           slidesToShow: 3
          }
        }]
      });

      $('.sale-slide').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: saleAuto,
        autoplay: saleClock,
        autoplaySpeed: 3000,
        dots: true,
        nextArrow: '<div class="next-arrows"><img src="img/right-arrow.svg" alt=""></div>',
        prevArrow: '<div class="prev-arrows"><img src="img/right-arrow.svg" alt=""></div>',
        customPaging: (function(slider, i) {return '<div class="sale__slick-dot"></div>';}),
      });

      $('.reviews__vertical-slide').slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        arrows: false,
        autoplay: revAuto,
        autoplaySpeed: revClock,
        vertical:  true,
        verticalSwiping: true,
        centerMode: true,
        centerPadding: '0px',
        responsive: [{
          breakpoint: 767, settings: {
            vertical:  false,
            slidesToShow: 1,
            verticalSwiping: false,
            centerPadding: '60px',
          }
        }]
      });

      $('.news__slider-init').slick({
        slidesToShow: 2,
        slidesToScroll: 1,
        arrows: true,
        autoplay: newsAuto,
        autoplaySpeed: newsClock,
        nextArrow: '<div class="news__next-arrows"><i class="fas fa-angle-right"></i></div>',
        prevArrow: '<div class="news__prev-arrows"><i class="fas fa-angle-left"></i></div>',
        responsive: [{
          breakpoint: 767, settings: {
            slidesToShow: 1
          }
        }]
      });

      $('.ourspecialists-slider').slick({
        slidesToShow: 4,
        slidesToScroll: 1,
        arrows: true,
        autoplay: ourAuto,
        autoplaySpeed: ourClock,
        nextArrow: '<div class="ourspecialists__next-arrows"><i class="fas fa-angle-right"></i></div>',
        prevArrow: '<div class="ourspecialists__prev-arrows"><i class="fas fa-angle-left"></i></div>',
        responsive: [{
          breakpoint: 1199, settings: {
            slidesToShow: 3
          },
          breakpoint: 767, settings: {
            slidesToShow: 2
          }
        }]
      });

      $('.certificate-slider').slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        arrows: true,
        autoplay: certAuto,
        autoplaySpeed: certClock,
        nextArrow: '<div class="next-arrows"><img src="img/right-arrow.svg" alt=""></div>',
        prevArrow: '<div class="prev-arrows"><img src="img/right-arrow.svg" alt=""></div>',
        responsive: [{
          breakpoint: 477, settings: {
           slidesToShow: 3
          }
        }]
      });

      // Инициализация маски ввода телефона для формы_____________________
      $(".phone_mask").mask("+7(999)999-99-99", {autoclear: false});


      // Открытие и закрытие попап окна______________________________________
      $(".header__callback-lbutton, .callback-button").click(function(){
        $(".popup-callback").addClass('popup-callback-active');
        $(".popup-callback form").addClass('popup-form-active');
      });
      $(".popup-callback-mask, .form-close-button").click(function(){
        $(".popup-callback").removeClass('popup-callback-active');
        $(".popup-callback form").removeClass('popup-form-active');
      });

});

// Инициализация анимации при скроле_______________
  var wow = new WOW(
  {
    boxClass:     'ani',
    animateClass: 'animated',
    offset:       1,
    mobile:       true,
    live:         true,
    scrollContainer: null,
    resetAnimation: true,
  }
  );
  wow.init();


