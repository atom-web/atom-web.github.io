$(document).ready(function(){

	$('.slider-head__init').slick({
		autoplay: true,
	  	infinite: true,
	  	slidesToShow: 1,
	  	slidesToScroll: 1, 
	  	fade: true,
	  	arrows: false,
	  	pauseOnHover: false
	});

	$('.phone_mask').mask('+7 (000) 000-00-00', {placeholder: "+7 (000) 000-00-00"});

// Открытие формы поиска___________________________________
	$('.header__search-open').click(function(){
		$('header form').toggleClass('search-open');
	});

// Открытие Попап формы обратного звонка____________________
	$('.callback-link').click(function(){
		$('.popup-callback').addClass('popup-callback-active');
	});
	$('.popup-callback').mouseup(function (e){
		var div = $(".popup-callback_wrap"); 
		if (!div.is(e.target)
		    && div.has(e.target).length === 0) { 
			$('.popup-callback').removeClass('popup-callback-active');
		}
	});
// Открытие Меню продукции в хедере__________________________
	$('.product-menu').click(function(){
		$('.drop-menu-items').toggleClass('drop-menu-active');
	});

// Открытие прайс листа на главной___________________________
	$('.price__open').click(function(){
		$('.price__list').toggleClass('price__list-active');
	});

// Открытие мобильного меню__________________________________
	$('.burger-menu').click(function(){
		$('header nav').toggleClass('header-nav-active');
	});

});