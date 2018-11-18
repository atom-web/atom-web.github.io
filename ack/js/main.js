$(document).ready(function(){

    // // Обработчик Формы_________________________________
    // $(".header__search-link").click(function(){

    //     $(".header__search-form").toggleClass('form-active');

    //     if ($('.header__search-form').hasClass('form-active')) {
    //             $(".header__search-form").removeClass('bounceOutRight');
    //             $(".header__search-form").addClass('bounceInRight');
    //             $(".header__search-form").css('opacity', '1');
    //     } else {
    //             $(".header__search-form").removeClass('bounceInRight');
    //             $(".header__search-form").addClass('bounceOutRight');

    //     }
    // });
    // $(document).mouseup(function (e){
    //     var div = $(".header__search-form, .header__search-link"); // class или ID элемента которого обрабатываем
    //     if (!div.is(e.target) // если клик был не по нашему блоку
    //         && div.has(e.target).length === 0) { // и не по его дочерним элементам

    //         if ($('.header__search-form').hasClass('form-active')) {
    //              $(".header__search-form").addClass('bounceOutRight');
    //              $(".header__search-form").removeClass('bounceInRight form-active');
    //         }
    //     }
    // });
    $('.company-slide').slick({
      slidesToShow: 7,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 2000,
      arrows: true,
      nextArrow: '<div class="next-arrows"><i class="fas fa-chevron-right"></i></div>',
      prevArrow: '<div class="prev-arrows"><i class="fas fa-chevron-left"></i></div>',
  });
});