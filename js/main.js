$('.grid').masonry({
  // options
  itemSelector: '.grid-item',
  columnWidth: 0,
});
$('.grid-maps').masonry({
  // options
  itemSelector: '.grid-item-maps',
  columnWidth: 0,
});



$('.slider').slick({
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 2000,
  accessibility: false,
});

$('.slider-contacts').slick({
  slidesToShow: 1,
  arrows: false,
  infinite: false,
  accessibility: false,
});
$('.slider-comments').slick({
  slidesToShow: 2,
  arrows: true,
  dots: true,
  accessibility: false,
  autoplay: true,
  autoplaySpeed: 2000,
});

$( ".comments-cooperation" ).click(function() {
  $(".cont-call").css("opacity", "1");
});
$( ".contacts-cooperation" ).click(function() {
  $(".cont-call").css("opacity", "0");
});






