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
});
$('.slider-info').slick({
  slidesToShow: 1,
});

$(document).ready(function(){
  $('.comments-cooperation').click(function (){
    $('.cont-call').load('page.html');
  });
  $('.contacts-cooperation').click(function (){
    $('.cont-call').load('index.html .cont-call');
  });
});



