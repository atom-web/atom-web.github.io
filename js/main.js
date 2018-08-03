$('.multiple-items').slick({
  infinite: true,
  arrows: false,
  autoplay: true,
  slidesToShow: 1,
  slidesToScroll: 1,
  fade: true,
});

$( document ).ready(function() {
    $('.banner-price').hover(function(){
    $(this).find("img").toggleClass('img-ban-active');
  });
});
$( document ).ready(function() {
    $('.sale-box').hover(function(){
    $(this).find("img").toggleClass('img-ban-active');
    $('.sale-banner-top').toggleClass('sale-banner-active');
    
    
    if ($('.sale-banner-top').hasClass('sale-banner-active')) {
    	$('.sale-banner').removeClass('fadeInDown');
    	$('.sale-banner').addClass('fadeOutDown');
    	$('.sale-banner-top').removeClass('fadeOutLeft');
    	$('.sale-banner-top').addClass('fadeInRight');
    } 
    else {
    	$('.sale-banner').addClass('fadeInDown');
    	$('.sale-banner').removeClass('fadeOutDown');
    	$('.sale-banner-top').addClass('fadeOutLeft');
    	$('.sale-banner-top').removeClass('fadeInRight');
    };

  });
});


