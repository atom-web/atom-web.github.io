$('.single-item').slick({
	autoplay: true,
  	autoplaySpeed: 3000,
  	accessibility: false,
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