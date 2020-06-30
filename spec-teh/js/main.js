// преобразование img.svg в svg объект
$('img[src$=".svg"]').each(function() { 
    var $img = jQuery(this); 
    var imgURL = $img.attr('src'); 
    var attributes = $img.prop("attributes"); 

    $.get(imgURL, function(data) { 
        var $svg = jQuery(data).find('svg');
        $svg = $svg.removeAttr('xmlns:a');
         $.each(attributes, function() {
            $svg.attr(this.name, this.value); 
         }); 

        $img.replaceWith($svg);
    }, 'xml'); 
});

//Карусель категорий
$('.cat-slider__init').slick({
    slidesToShow: 3,
    slidesToScroll: 3,
    arrows: false,
    autoplay: true,
    dots: true, 
    customPaging: (function(slider, i) {return '<div class="slider-slick-dot"></div>';}),
    responsive: [
        {
            breakpoint: 767,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
                infinite: true,
                dots: false
            }
        },
        {
            breakpoint: 575,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                infinite: true,
                dots: false
            }
        },
    ]
});


//Карусель производителей
$('.technics__slider-init').slick({
    slidesToShow: 4,
    slidesToScroll: 4,
    arrows: false,
    autoplay: true,
    dots: true, 
    customPaging: (function(slider, i) {return '<div class="slider-slick-dot"></div>';}),
    responsive: [
        {
            breakpoint: 767,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
                infinite: true,
                dots: false
            }
        },
    ]
});


//Слайдер на странице записи
$('.note__slider').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    asNavFor: '.note__slider-dot'
});
$('.note__slider-dot').slick({
    slidesToShow: 4,
    slidesToScroll: 1,
    asNavFor: '.note__slider',
    dots: false,
    arrows: false,
    centerMode: false,
    focusOnSelect: true
});

//добавление наименования техники в форму заказа
$('.note-spec__btn').click(function() {
    var name = $('.prew-page').find('h1').html();
    $('.call-back-buy__tech').val(name);
});

//открытие мобильного меню
$('.header__burger').click(function() {
   $('.header__nav').toggleClass('nav-active');
});