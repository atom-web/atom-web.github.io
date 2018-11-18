$(document).ready(function(){
    $(".header__search-link").click(function(){

        $(".header__search-form").toggleClass('form-active');

        if ($('.header__search-form').hasClass('form-active')) {
                $(".header__search-form").removeClass('bounceOutRight');
                $(".header__search-form").addClass('bounceInRight');
                $(".header__search-form").css('opacity', '1');
        } else {
                $(".header__search-form").removeClass('bounceInRight');
                $(".header__search-form").addClass('bounceOutRight');

    }
    });
    $("body").click(function(){
        
    });
});