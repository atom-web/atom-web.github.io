$(document).ready(function(){

// SELECTIZE INIT____________________

	$('#select-city').selectize({
        create: true,
    });

// POPUP WINDOW OPEN__________________

	  $(".header__callback-link, .popup-callback-mask, .form-close-button").click(function() {
	  	if ($('.popup-callback').hasClass('popup-callback-active')) {
	  		$(".popup-callback").removeClass("popup-callback-active");
	    	$(".popup-callback_wrap").removeClass("popup-form-active");
	  	}else{
	  		$(".popup-callback").addClass("popup-callback-active");
	    	$(".popup-callback_wrap").addClass("popup-form-active");
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
     });
	$('.ask__slide-items').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        vertical:  true,
        verticalSwiping: true,
        arrows: false,
        asNavFor: '.ask__slide-prev',
     });
	$('.ask__slide-prev').slick({
	   	slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        autoplay: true,
        autoplaySpeed: 3000,
        vertical:  true,
        verticalSwiping: true,
	  	asNavFor: '.ask__slide-items',
	  	focusOnSelect: true
	});
	
// INPUT FILE NAME_____________________
	
	$(".form-calculation__input input[type=file]").change(function(){
		var filename = $(this).val().replace(/.*\\/, "");
		$(".form-calculation__file-active").html(filename);
	});

	$('.phone_mask').mask('+7 (000) 000-00-00', {placeholder: "+7 (000) 000-00-00"});
	$('.form-calculation__phone_mask').mask('+7 (000) 000-00-00');

});


