$('img[src$=".svg"]').each(function() {
    var $img = jQuery(this);
    var imgURL = $img.attr('src');
    var attributes = $img.prop("attributes");

    $.get(imgURL, function(data) {
        // Get the SVG tag, ignore the rest
        var $svg = jQuery(data).find('svg');

        // Remove any invalid XML tags
        $svg = $svg.removeAttr('xmlns:a');

        // Loop through IMG attributes and apply on SVG
        $.each(attributes, function() {
            $svg.attr(this.name, this.value);
        });

        // Replace IMG with SVG
        $img.replaceWith($svg);
    }, 'xml');
});

$(function() {

    // choose city

    $('header .city__current').click(function() {

        if ($(this).hasClass('city__current_active')) {
            $(this).removeClass('city__current_active');
            $('header .city__list').hide().removeClass('city__list_active');
        } else {
            $(this).addClass('city__current_active');
            $('header .city__list').show().addClass('city__list_active');
        }

        // $('header .city__list').show().toggleClass('city__list_active');
    });

    $('header .city__list li').click(function() {
        var valueCity = $(this).html();
        $('header .city__current').html(valueCity);
        $('header .city__current').removeClass('city__current_active');
        $('header .city__list').hide().removeClass('city__list_active');
    });

    // hover sub-menu show/hide

    $('.header-menu__nav li.nav__sub').hover(function() {
        $(this).addClass('nav__sub_active')
        $( this ).find('.sub-menu').show().addClass('sub-menu_active');

    }, function() {
        $(this).removeClass('nav__sub_active')
        $( this ).find('.sub-menu').removeClass('sub-menu_active').hide();
    }
    );

    // weather

    function updateWeather( city_id ) {
        if ( city_id ) {
            var url = '/netcat_files/owm/'+ city_id +'.json'; 
            $.getJSON(url, function( owm ) {
                var temp = ( owm.main.temp > 0 ? '+' : '' );
                temp += Math.round( owm.main.temp );
                $( '.weather_icon' ).html( '<span class="weather_icon_' + owm.weather[0].icon + '" title="' + owm.weather[0].description + '"></span>' );
                if ( isNaN( temp ) ) {
                    temp = 0;
                }
            });
        }
        return;
    }

    // mask input

    if ($('.form-news input').is("#phone")) {
        $("#phone").mask("+7 (999) 999-99-99");
    };

    // fixed top menu

    var HeaderTop = $('.header-menu').offset().top;

    $(window).scroll(function(){
        if( $(window).scrollTop() > HeaderTop ) {
            $('.header-menu').css({
                position: 'fixed', 
                top: '0px',
                'z-index': '20',
                '-webkit-box-shadow': '1px 0px 68px 0px rgba(87,87,87,1)',
                '-moz-box-shadow': '1px 0px 68px 0px rgba(87,87,87,1)',
                'box-shadow': '1px 0px 68px 0px rgba(87,87,87,1)',
            });
            if ($('.left-feed').length > 0) {
                $('.left-feed').addClass('fixed-menu').mCustomScrollbar();
                $('.main-content').css('padding-left', '230px');
            }
        } else {
            $('.header-menu').css({position: 'relative', 'z-index': '10', 'box-shadow': 'none'});
            $('.left-feed').removeClass('fixed-menu');
            $('.main-content').removeAttr('style');
        }
    });

    $(window).scroll(function(){
        var hT = $('.main-content').offset().top,
        hH = $('.main-content').outerHeight(),
        wH = $(window).height(),
        wS = $(this).scrollTop();
        // console.log((hT-wH) , wS);
        if (wS > (hT+hH-wH)){
            $('.left-feed').addClass('stop-fixed');
        } else {
            $('.left-feed').removeClass('stop-fixed');
        }
    });

    // up btn

    $('#up').click(function() {
        $('body,html').animate({scrollTop:0},100);
        $(this).fadeOut();
    });

    $(window).scroll(function() {
        if($(this).scrollTop() != 0) {
            $('#up').fadeIn();
        } else {
            $('#up').fadeOut();
        }
    });

    // show-hide top news left block

        // title anonce

        var leftTit_hgt = $('.top-news__left .text h2').height();
        var leftTit_padTop = parseInt('30');
        var leftTit_sum = leftTit_hgt + leftTit_padTop;

        // anonce text

        var leftTxt_hgt = $('.top-news__left .text p').height();
        var leftTxt_padTop = parseInt('10');
        var leftTxt_sum = leftTxt_hgt + leftTxt_padTop;

        // all sum

        var leftAll_sum = leftTit_sum + leftTxt_sum;

    $('.top-news__left .text').css({'top':'calc(100% - ' + leftTit_sum + 'px)'}); // изначально

    $('.top-news__left').hover(function() {

        $('.top-news__left .text').css({'top':'calc(100% - ' + leftAll_sum + 'px)'}); // наведение

    }, function() {

        $(this).find('.text').css({'top':'calc(100% - ' + leftTit_sum + 'px)'}); //mouseOver

    });

    // news tabs

    $('.main-news__tabs a', this).click(function(e) {
        e.preventDefault();
        $(this).parent().find('a').removeClass('active');
        $(this).addClass('active');
    });

    $('.main-news__tabs a', this).on('click', function(e) {
        var elems = $(this).parent().parent().parent().find('.main-news__items-group[data-type="' + $(this).attr('value') + '"]');
        elems.addClass('show');
        $(this).parent().parent().parent().find('.main-news__items-group').not(elems).removeClass('show');
    });

    // calendar
    ( function( factory ) {
        if ( typeof define === "function" && define.amd ) {

        // AMD. Register as an anonymous module.
        define( [ "../widgets/datepicker" ], factory );
    } else {

        // Browser globals
        factory( jQuery.datepicker );
    }
}( function( datepicker ) {

    datepicker.regional.ru = {
        closeText: "Закрыть",
        prevText: "&#x3C;Пред",
        nextText: "След&#x3E;",
        currentText: "Сегодня",
        monthNames: [ "Январь","Февраль","Март","Апрель","Май","Июнь",
        "Июль","Август","Сентябрь","Октябрь","Ноябрь","Декабрь" ],
        monthNamesShort: [ "Янв","Фев","Мар","Апр","Май","Июн",
        "Июл","Авг","Сен","Окт","Ноя","Дек" ],
        dayNames: [ "воскресенье","понедельник","вторник","среда","четверг","пятница","суббота" ],
        dayNamesShort: [ "вск","пнд","втр","срд","чтв","птн","сбт" ],
        dayNamesMin: [ "Вс","Пн","Вт","Ср","Чт","Пт","Сб" ],
        weekHeader: "Нед",
        dateFormat: "dd.mm.yy",
        firstDay: 1,
        isRTL: false,
        showMonthAfterYear: false,
        yearSuffix: "" };
        datepicker.setDefaults( datepicker.regional.ru );

        return datepicker.regional.ru;

    } ) );

    $("#date_range")
    .datepicker({
      dateFormat: "yy/mm/dd",
      onSelect: function(dateText) {
        $(this).change();
    }
})
    .change(function() {
      window.location.href = "/archive/" + this.value;
  });

    $('.size-content .plus').click(function() {

        if ($('.middle-content').hasClass('middle-content__large')) {
            return true;
        } else if ($('.middle-content').hasClass('middle-content__min')){
            $('.middle-content').removeClass('middle-content__min');
        } else {
            $('.middle-content').addClass('middle-content__large');
        }

    });

    $('.size-content .minus').click(function() {

        if ($('.middle-content').hasClass('middle-content__min')) {
            return true;
        } else if ($('.middle-content').hasClass('middle-content__large')){
            $('.middle-content').removeClass('middle-content__large');
        } else {
            $('.middle-content').addClass('middle-content__min');
        }

    });

    // modal share

    $('.main-news-bottom-share .subscr a').click(function(e) {
        e.preventDefault();
        $('body').css('overflow', 'hidden')
        $('.modal-subscr').fadeIn().css('display', 'flex');
    });

    $('.modal-subscr form .close, modal-news form .close').click(function() {
        $('body').removeAttr('style');
        $('.modal-subscr').fadeOut();
    });

    // modal news

    $('.open-modal-news').click(function(e) {
        e.preventDefault();
        $('body').css('overflow', 'hidden')
        $('.modal-news').fadeIn().css('display', 'flex');
    });

    $('.modal-news form .close').click(function() {
        $('body').removeAttr('style');
        $('.modal-news').fadeOut();
    });

    $(document).mouseup(function(e) {
        var modalSubscr = $('.modal-subscr form');
        var modalNews = $('.modal-news form')
        if (!modalSubscr.is(e.target) && modalSubscr.has(e.target).length === 0) {
            $('body').removeAttr('style');
            $('.modal-subscr').fadeOut();
        };

        if (!modalNews.is(e.target) && modalNews.has(e.target).length === 0) {
            $('body').removeAttr('style');
            $('.modal-news').fadeOut();
        };
    });

    // photo gallery

    $('.photo-gallery-container .slides').slick({
        dots: false,
        infinite: false,
        speed: 300,
        slidesToShow: 1,
        slidesToScroll: 1,
        prevArrow: $('.prev'),
        nextArrow: $('.next'),
        asNavFor: '.slick-custom-dots'
    });

    // если есть галлерея на страницы - создать кастомные dots для управления

    if ($('.photo-gallery-container').length > 0) {
        $('.slider-bottom').append("<ul class='slick-custom-dots'></ul>")
    };



    $('.photo-gallery-container .slick-slide').each(function(index) {
        var SlidesCol = $(this).length; // узнаем кол-во слайдов в основной галлереи   
        $('.slider-bottom .slick-custom-dots').append('<li>' + (index + 1) + '</li>'); // создаем dots
    });

    // custom dots

    $('.slick-custom-dots').slick({
        asNavFor: '.photo-gallery-container .slides',
        slidesToShow: 10,
        infinite: false,
        focusOnSelect: true,
        centerMode: false,
    });

    // подпись к фото (скрыть/показать)

    $('.gallery-item .arrow').click(function() {
        $('.gallery-item .arrow').toggleClass('arrow-active');
        $('.author').slideToggle();
    });

    // добавляем классы для фуллскрин попапа если это фотогаллерея

    $('.photo-gallery-container .slides a').click(function() {
        $('#lightbox').addClass('gallery-open');
        $('#lightboxOverlay').addClass('gallery-overlay');
        $('#lightbox .lb-close').addClass('gallery-close');
    });

    // location click login/nologin

    $('.main-news-bottom-share .subscr a').click(function(e) {
        if ($('.main-news-bottom-share .subscr').hasClass('login')) {
            window.location.href = '/user/modify/';
        } else {
            e.preventDefault();
            $('body').css('overflow', 'hidden')
            $('.modal-subscr').fadeIn().css('display', 'flex');
        };
    });

    $('footer form input').click(function(e) {
        if ($('footer form').hasClass('login')) {
            window.open('/user/modify/').val();
        } else {
            e.preventDefault();
            $('body').css('overflow', 'hidden')
            $('.modal-subscr').fadeIn().css('display', 'flex');
        };
    });

    // adaptive 

    if ($(window).width() <= '920') {
        $('header').append('<div class="menu-burg"><span></span></div>');
    };

    if ($(window).width() <= '1235') {
        if ($('.main-news-groups .news-group').is('.group-top__orange')) {
            $('.right__most-read').insertBefore('.group-top__orange');
        } else {}
        
    };

});