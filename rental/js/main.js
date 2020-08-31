
//Слайдер на главной
$('.main-slider').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    autoplay: false,
    dots: false,
    nextArrow: '<div class="next-arrows"><i class="fas fa-chevron-right"></i></div>',
    prevArrow: '<div class="prev-arrows"><i class="fas fa-chevron-left"></i></div>',
});


//запрет ввода цифр в поле имени
$('.callback__name').on('input', function() {
    $(this).val($(this).val().replace(/[^\.\,\-\_\'\"\@\?\!\:\$ a-zA-ZА-ЯА-Яа-я()]/, ''))
});


//открытие мобильного меню
$('.header__burger').click(function() {
   $('.header__bottom nav').toggleClass('menu-active');
});