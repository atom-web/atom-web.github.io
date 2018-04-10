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
  slidesToShow: 1,
  arrows: true,
  dots: true,
  accessibility: false,
  autoplay: true,
  autoplaySpeed: 2000,
  draggable: false,

});

// $( ".comments-cooperation" ).click(function() {
//   $(".cont-call").css("display", "inherit");
//   $(".cont-call").css("position", "inherit");
//   $(".op-link").css("display", "none");
// });
// $( ".contacts-cooperation" ).click(function() {
//   $(".cont-call").css("opacity", "0");
//   $(".op-link").css("display", "inherit");
// });

$(document).ready(function(){
    $(".comments-cooperation").click(function(){
        $(".op-link").css("display", "none");
        $(".cont-call").addClass("cont-call-vis");
    });
    $(".contacts-cooperation").click(function(){
        $(".op-link").css("display", "inherit");
        $(".cont-call").removeClass("cont-call-vis");
    });
});





