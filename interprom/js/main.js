$(document).ready(function(){
	$('.video-feat__slider').slick({
		infinite: true,
		slidesToShow: 1,
		slidesToScroll: 1,
		fade: false,
		cssEase: 'linear',
		autoplay: false,
		autoplaySpeed: 2000,
		arrows: true,
		dots: true,
		nextArrow: '<div class="next-arrows"><i class="fas fa-angle-right"></i></div>',
		prevArrow: '<div class="prev-arrows"><i class="fas fa-angle-right"></i></div>',
		customPaging: (function(slider, i) {return '<div class="slider__slick-dots"></div>';}),
	});
    $('.slider__init').slick({
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        fade: true,
        cssEase: 'linear',
        autoplay: true,
        autoplaySpeed: 2000,
        arrows: true,
        dots: true,
        nextArrow: '<div class="next-arrows"><img src="img/right-arrow.svg" alt=""></div>',
        prevArrow: '<div class="prev-arrows"><img src="img/right-arrow.svg" alt=""></div>',
        customPaging: (function(slider, i) {return '<div class="slider__slick-dots"></div>';}),
    });
    $('.img-feat__slider').slick({
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        fade: false,
        cssEase: 'linear',
        autoplay: false,
        autoplaySpeed: 2000,
        arrows: true,
        dots: true,
        nextArrow: '<div class="next-arrows"><i class="fas fa-angle-right"></i></div>',
        prevArrow: '<div class="prev-arrows"><i class="fas fa-angle-right"></i></div>',
        customPaging: (function(slider, i) {return '<div class="slider__slick-dots"></div>';}),
    });


// Преобразование img в svg______________________________________
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

	// Открытие Popup - формы__________________________________________
  	$(".callback-number-link").click(function(){
        $(".popup-callback-wrap").addClass('popup-callback-wrap-active');
        $(".popup-callback").addClass('popup-callback-active');

    });
    $(".form-close-button, .popup-callback-mask").click(function(){
        $(".popup-callback-wrap").removeClass('popup-callback-wrap-active');
        $(".popup-callback").removeClass('popup-callback-active');
    });

    // Инициализация маски ввода телефона для формы_____________________
    $(".phone_mask").mask("+7(999)999-99-99", {autoclear: false});
    $(".popup-tel-mask").mask("+7(999)999-99-99", {autoclear: false});

    // Открытие меню____________________________________________________
    $(".link-open-menu").click(function(){
        $(".header-bottom-feat nav").addClass('header__menu-active');
         $(".header__menu-mask").addClass('header__menu-mask-active');
         $(".header-bottom-feat nav>ul").addClass('header-ul-active');
         $("body").addClass('popup-active');
    });
    $(".header__menu-mask").click(function(){
        $(".header__menu-mask").removeClass('header__menu-mask-active');
        $(".header-bottom-feat nav").removeClass('header__menu-active');
        $(".header-bottom-feat nav>ul").removeClass('header-ul-active');
        $("body").removeClass('popup-active');
    });

    //Смена стилей плитки
    if ($('.block-change__item, .list-change__item').length > 0) {
        $('.block-change__item, .list-change__item').click(function(e) {
            e.preventDefault();

            $('.block-change__item, .list-change__item').removeClass('block-change__active');
            $(this).addClass('block-change__active');

            if ($('.list-change__item').hasClass('block-change__active')) {
                $('.catalog__item').addClass('catalog__active-list');
            } else {
                $('.catalog__item').removeClass('catalog__active-list');
            }
        });
    };


    var stickySidebar = $('.sticky');

    if (stickySidebar.length > 0) { 
      var stickyHeight = stickySidebar.height(),
          sidebarTop = stickySidebar.offset().top;
    }

    // on scroll move the sidebar
    $(window).scroll(function () {
      if (stickySidebar.length > 0) {   
        var scrollTop = $(window).scrollTop();
                
        if (sidebarTop < scrollTop) {
          stickySidebar.css('top', scrollTop - sidebarTop);

          // stop the sticky sidebar at the footer to avoid overlapping
          var sidebarBottom = stickySidebar.offset().top + stickyHeight,
              stickyStop = $('.main-content').offset().top + $('.main-content').height();
          if (stickyStop < sidebarBottom) {
            var stopPosition = $('.main-content').height() - stickyHeight;
            stickySidebar.css('top', stopPosition);
          }
        }
        else {
          stickySidebar.css('top', '0');
        } 
      }
    });

    $(window).resize(function () {
      if (stickySidebar.length > 0) {   
        stickyHeight = stickySidebar.height();
      }
    });
}); 