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
     $('.catalog__slider-for').slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false,
      asNavFor: '.catalog__slider-nav'
    });
    $('.catalog__slider-nav').slick({
      slidesToShow: 5,
      slidesToScroll: 1,
      asNavFor: '.catalog__slider-for',
      centerMode: true,
      focusOnSelect: true,
      arrows: false,
      centerPadding: '30px',
      responsive: [
        {
          breakpoint: 500,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
            infinite: true,
          }
        }
      ]
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



    $('#select-beast').selectize({
        create: true,
        placeholder: 'По умолчанию',
    });
    $('#select-city').selectize({
        create: true,
        placeholder: 'Регион и город',
    });
    $('#select-object').selectize({
        create: true,
        placeholder: 'Оборудование и объекты',
    });
    $(".selectize-input input").attr('readonly','readonly');

    if  ($('.catalog__numeral').length > 0){
        if ($('.catalog__numeral').html() > 0 ) {
            $('.catalog__favorites-wrap').addClass('numeral__active');
        }
    } else{
        $('.catalog__favorites-wrap').removeClass('numeral__active');
    }

     if ($('.libra__numeral').length > 0) {
        if ($('.libra__numeral').html() > 0 ) {
            $('.catalog__libra').addClass('numeral__active');
        }
    } else{
        $('.catalog__libra').removeClass('numeral__active');
    }

//Объекты на ЯКарте
    if ($('.object-map-single #map-single').length > 0) {
        var mapSingle; // карта на странице объекта
        ymaps.ready(init);

        function init () {
            $('.object-map-single #map-single').each(function() {
                var obj = $(this).attr('data-coord');
                obj = JSON.parse(obj);

                var caption = $(this).attr('data-caption');

                mapSingle = new ymaps.Map('map-single', {
                    center: obj,
                    zoom: 18,
                    controls: ['zoomControl']
                }, {
                    searchControlProvider: 'yandex#search'
                }), 

                mapSingle.geoObjects
                .add(new ymaps.Placemark(obj, {
                    hintContent: caption
                    //hintContent: "Хинт метки"
                }, {
                    // Опции.
                    // тип макета.
                    iconLayout: 'default#imageWithContent',
                    // Своё изображение иконки метки.
                    iconImageHref: 'http://sch5.minsk.edu.by/be/sm.aspx?guid=6223',
                    // Размеры метки.
                    iconImageSize: [51, 58],
                    // Смещение левого верхнего угла иконки относительно
                    // её "ножки" (точки привязки).
                    iconImageOffset: [-29, -63],
                    // Смещение слоя с содержимым относительно слоя с картинкой.
                    iconContentOffset: [-20, -10],
                }));

            }); //each
            mapSingle.behaviors.disable('scrollZoom'); // отключение зума по скроллу
        }
    };

    if ($('#map').length > 0) {

        ymaps.ready(init);

        function init () {
            // Создаем собственный макет с информацией о выбранном геообъекте.
            var customBalloonContentLayout = ymaps.templateLayoutFactory.createClass([
                '<div class=balloon-items>',
                // Выводим в цикле список всех геообъектов.
                '{% for geoObject in properties.geoObjects %}',
                    '{{ geoObject.properties.balloonContentBody|raw }}',
                '{% endfor %}',
                '</div>'
            ].join(''));
            var myMap = new ymaps.Map('map', {
                    center: [55.15295441010063, 61.42443749040058],
                    zoom: 12,
                    controls: ['zoomControl']
                }, {
                    searchControlProvider: 'yandex#search'
                }),
                objectManager = new ymaps.ObjectManager({
                    // Чтобы метки начали кластеризоваться, выставляем опцию
                    clusterize: true,
                    // ObjectManager принимает те же опции, что и кластеризатор
                    gridSize: 32,
                    // false - приближение к меткам в баллуне
                    clusterDisableClickZoom: true, 
                    clusterOpenBalloonOnClick: true,
                    // Устанавливаем режим открытия балуна
                    // В данном примере балун никогда не будет открываться в режиме панели
                    clusterBalloonPanelMaxMapArea: 0,
                    // По умолчанию опции балуна balloonMaxWidth и balloonMaxHeight не установлены для кластеризатора,
                    // так как все стандартные макеты имеют определенные размеры.
                    clusterBalloonMaxHeight: 300,
                    clusterBalloonContentLayout: customBalloonContentLayout
                });

                // Чтобы задать опции одиночным объектам и кластерам,
                // обратимся к дочерним коллекциям ObjectManager.
                objectManager.objects.options.set({
                    // тип макета.
                    iconLayout: 'default#imageWithContent',
                    // Своё изображение иконки метки.
                    iconImageHref: 'http://pluspng.com/img-png/png-location-location-pin-png-366.png',
                    // Размеры метки.
                    iconImageSize: [30, 50],
                    // Смещение левого верхнего угла иконки относительно
                    // её "ножки" (точки привязки).
                    iconImageOffset: [-29, -63],
                    // Смещение слоя с содержимым относительно слоя с картинкой.
                    iconContentOffset: [-20, -10],
                });

                var clusterIcons = [
                   {
                    href: 'http://pluspng.com/img-png/png-location-location-pin-png-366.png',
                    size: [44, 70],
                    offset: [-25, -25]
                    },
                    {
                     // Созадаем активную область в круг
                     shape: {
                        type: 'Circle',
                        coordinates: [0, 0],
                      radius: 30
                    }
                 }];

                objectManager.clusters.options.set({
                    clusterDisableClickZoom: true,
                    clusterOpenBalloonOnClick: true,
                    // Устанавливаем режим открытия балуна. 
                    // В данном примере балун никогда не будет открываться в режиме панели.
                    clusterBalloonPanelMaxMapArea: 0,
                    // По умолчанию опции балуна balloonMaxWidth и balloonMaxHeight не установлены для кластеризатора,
                    // так как все стандартные макеты имеют определенные размеры.
                    clusterBalloonMaxHeight: 200,
                    clusterBalloonContentLayout: customBalloonContentLayout,
                    clusterIcons: clusterIcons
                });

                myMap.geoObjects.add(objectManager);

                $.ajax({
                    url: "js/data.json"
                }).done(function(data) {
                    objectManager.add(data);
                });
        }
    }

});