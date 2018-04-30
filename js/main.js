$('.single-item').slick({
	autoplay: true,
  	autoplaySpeed: 3000,
  	accessibility: false,
  	arrows: false,
});
$('.slick-img-page').slick({
	autoplay: true,
  	autoplaySpeed: 3000,
  	accessibility: false,
  	arrows: false,
  	slidesToShow: 3,
  	slidesToScroll: 1
});

$( document ).ready(function() {
    $('.link-registration').click(function(){
	  $( ".registration" ).toggleClass('active-reg');
	});
});

$('[data-fancybox="images"]').fancybox({
});

// $('.info-content').mouseenter(function(){
//  	$(this).css("opacity", "1");


// });
// $('.info-content').mouseleave(function(){
//    $(this).css("opacity", "0");

// });
// var winWidth = window.innerWidth;
// var winHeight = window.innerHeight;

$( document ).ready(function() {
    $('.box-cont').hover(function(){
	  $(this).find( ".description-box-cont" ).toggleClass('hover-dbc');
	  $(this).find( ".img-box-cont" ).toggleClass('hover-ibc');
	});
});
// $('description-box-cont').parent().get(0)
// $('.description-box-cont').parent().css('.content')

$('.burger, .overlay').click(function(){
  $('.burger').toggleClass('clicked');
  $('.overlay').toggleClass('show');
  $('nav').toggleClass('show');
  $('body').toggleClass('overflow');
});