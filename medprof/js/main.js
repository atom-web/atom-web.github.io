$(document).ready(function(){

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
      cssEase: 'linear'
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
// Инициализация слайдера___________________________________

    $('.main-slider').slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false,
      autoplay: true,
      autoplaySpeed: 3000,
      fade: true,
      cssEase: 'linear',
      draggable: false,
    });