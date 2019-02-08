$(document).ready(function(){

// SELECTIZE INIT____________________

	$('#select-city').selectize({
        create: true,
    });
    $('.select-cargo').selectize({
        create: true,
    });
    $('.select-length').selectize({
        create: true,
    });
    // if  ($('.selectize-input .item').length > 0){
    //     if () {}
    // }
// POPUP WINDOW OPEN__________________

  	$(".header__callback-init, .header__callback-link, .popup-callback-mask, .form-close-button").click(function() {
	  	if ($('.popup-callback').hasClass('popup-callback-active')) {
	  		$(".popup-callback").removeClass("popup-callback-active");
	    	$(".popup-callback_wrap").removeClass("popup-form-active");
	  	}else{
	  		$(".popup-callback").addClass("popup-callback-active");
	    	$(".popup-callback_wrap").addClass("popup-form-active");
	  	}
	});

	$(".ask__button-form, .popup-ask-mask, .form-close-ask").click(function() {
	  	if ($('.popup-ask').hasClass('popup-ask-active')) {
	  		$(".popup-ask").removeClass("popup-ask-active");
	  		$(".popup-ask_wrap").removeClass("popup-form-active");
	  	}else{
	  		$(".popup-ask").addClass("popup-ask-active");
	  		$(".popup-ask_wrap").addClass("popup-form-active");
	  	}
	});
	$(".cat-card__request-price, .popup-price-mask, .form-close-price").click(function() {
	  	if ($('.popup-price').hasClass('popup-price-active')) {
	  		$(".popup-price").removeClass("popup-price-active");
	  		$(".popup-price_wrap").removeClass("popup-price-active");
	  	}else{
	  		$(".popup-price").addClass("popup-price-active");
	  		$(".popup-price_wrap").addClass("popup-price-active");
	  	}
	});
	$(".jobs__sidebar-popup, .popup-jobs-mask, .form-close-jobs").click(function() {
	  	if ($('.popup-jobs').hasClass('popup-jobs-active')) {
	  		$(".popup-jobs").removeClass("popup-jobs-active");
	  		$(".popup-jobs_wrap").removeClass("popup-jobs-active");
	  	}else{
	  		$(".popup-jobs").addClass("popup-jobs-active");
	  		$(".popup-jobs_wrap").addClass("popup-jobs-active");
	  	}
	});

// HEAD SLICK INIT____________________

	$('.slider-head__items').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        dots: true,
        fade: true,
        nextArrow: '<div class="next-arrows"><i class="fas fa-long-arrow-alt-right"></i></div>',
        prevArrow: '<div class="prev-arrows"><i class="fas fa-long-arrow-alt-left"></i></div>',
        customPaging: (function(slider, i) {return '<div class="slide-head__slick-dot"></div>';}),
        responsive: [
		    {
		      breakpoint: 991,
		      settings: {
		        dots: false,
		        arrows: false,
		      }
		    }
		  ]
     });

	$('.cat-deploy__slide-init').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        arrows: true,
        asNavFor: '.cat-deploy__slider-nav',
        nextArrow: '<div class="next-arrows"><i class="fas fa-angle-right"></i></div>',
        prevArrow: '<div class="prev-arrows"><i class="fas fa-angle-left"></i></div>',
     });
	$('.cat-deploy__slider-nav').slick({
		slidesToShow: 4,
		slidesToScroll: 1,
		asNavFor: '.cat-deploy__slide-init',
		centerMode: true,
		arrows: false,
		focusOnSelect: true,
	});
	$('.similar__slider').slick({
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        arrows: true,
        nextArrow: '<div class="next-arrows"><i class="fas fa-angle-right"></i></div>',
        prevArrow: '<div class="prev-arrows"><i class="fas fa-angle-left"></i></div>',
        responsive: [
	    {
	      breakpoint: 991,
	      settings: {
	        slidesToShow: 2,
	        arrows: false,
	      }
	    },
	    {
	      breakpoint: 575,
	      settings: {
	        slidesToShow: 1,
	        arrows: false,
	      }
	    },
	  ]
     });
	$('.media-gallery__init').slick({
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        arrows: true,
        centerMode: true,
  		centerPadding: '100px',
        nextArrow: '<div class="next-arrows"><i class="fas fa-angle-right"></i></div>',
        prevArrow: '<div class="prev-arrows"><i class="fas fa-angle-left"></i></div>',
     });
	$('.quality-slider-init').slick({
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        arrows: true,
        centerMode: true,
		centerPadding: '60px',
        nextArrow: '<div class="next-arrows"><i class="fas fa-angle-right"></i></div>',
        prevArrow: '<div class="prev-arrows"><i class="fas fa-angle-left"></i></div>',
     });
	
// INPUT FILE NAME_____________________
	
	$(".form-calculation__input input[type=file]").change(function(){
		var filename = $(this).val().replace(/.*\\/, "");
		$(".form-calculation__file-active").html(filename);
	});

	$('.phone_mask').mask('+7 (000) 000-00-00', {placeholder: "+7 (000) 000-00-00"});
	$('.form-calculation__phone_mask').mask('+7 (000) 000-00-00');

	$('.ask__slide-item').click(function(){
		// $('.ask__item-desc-wrap').removeClass('item-desc-wrap__active')
		// $('.ask__item-desc').removeClass('item-desc__active')
		// $('.ask__open-tabs i').removeClass('tabs-active')
		if ($(this).find('.ask__item-desc-wrap').hasClass('item-desc-wrap__active')) {
			$(this).find('.ask__item-desc-wrap').removeClass('item-desc-wrap__active')
			$(this).find('.ask__item-desc').removeClass('item-desc__active')
			$(this).find('.ask__open-tabs i').removeClass('tabs-active')
		}else{
			$(this).find('.ask__item-desc-wrap').addClass('item-desc-wrap__active')
			$(this).find('.ask__item-desc').addClass('item-desc__active')
			$(this).find('.ask__open-tabs i').addClass('tabs-active')
		}
	});


	if ($(window).width() > 991) {
		$('.header__menu-items nav>ul>li>a').hover(function(){
			$(this).parents('.header__menu-items nav>ul>li').find('.header__drop-menu').toggleClass('drop-menu__active');
		});
	}else{
		$('.header__menu-items nav>ul>li').click(function(e) {
			$('.header__drop-menu').removeClass('drop-menu-mob__active');
		    $(this).find('.header__drop-menu').addClass('drop-menu-mob__active');
		});
		$('.hamburger-open-menu').click(function(e) {
			$('.header__menu-items nav').toggleClass('nav-active');
		});
	}
	
	var stickySidebar = $('.sticky-sidebar');
	var hSticky = $(".sticky-sidebar").height();
	var hCont = $(".content-stiky").height();

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
	              stickyStop = $('.content-stiky').offset().top + $('.content-stiky').height();
	          if (stickyStop < sidebarBottom) {
	            var stopPosition = $('.content-stiky').height() - stickyHeight;
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

		if (hSticky > hCont) {
			$('.sticky-sidebar').css('position', 'static')
		}

		if ($('.popup-jobs__day-birthday').length > 0) {
	        $('.popup-jobs__day-birthday').styler({
		    	selectPlaceholder: 'День',
			});
	    };
	    if ($('.popup-jobs__month-birthday').length > 0) {
	        $('.popup-jobs__month-birthday').styler({
		    	selectPlaceholder: 'День',
			});
	    };
		if ($('.popup-jobs__year-birthday').length > 0) {
	        $('.popup-jobs__year-birthday').styler({
		    	selectPlaceholder: 'День',
			});
	    };
		if ($('.popup-jobs__experience').length > 0) {
	        $('.popup-jobs__experience').styler();
	    };
	    if ($('.popup-jobs__education').length > 0) {
	        $('.popup-jobs__education').styler();
	    };
		if ($('.information__report-wrap').length > 0) {
	        $('.information__report-wrap').styler();
	    };
	    if ($('.information__year-wrap').length > 0) {
	        $('.information__year-wrap').styler();
	    };
		if ($('.contacts-map__city').length > 0) {
	        $('.contacts-map__city').styler();
	    };


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
	                    clusterize: false,
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
	                    iconImageHref: 'img/gps.png',
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
	                    href: 'img/gps.png',
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

$(".cat-deploy__filter-items").change(function() {
	$(".cat-deploy__filter-items").submit();
});


