$('.multiple-items').slick({
  infinite: true,
  arrows: false,
  autoplay: false,
  slidesToShow: 1,
  slidesToScroll: 1
});

$( document ).ready(function() {
    $('.banner-price').hover(function(){
    $(this).find("img").toggleClass('img-ban-active');
  });
});