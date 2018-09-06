
// Медленная прокрутка по якарям____________
$(document).ready(function(){
    $("a[href*=#]").on("click", function(e){
        var anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $(anchor.attr('href')).offset().top
        }, 2000);
        e.preventDefault();
        return false;
    });
});




$(window).scroll(function() {
  var s = $(window).scrollTop();
  if (s > 0) {
    $('header').addClass("scroll-active");
    $('.logo').addClass("logo-active");
    $('header').animate({height: "60px"},{duration: 50, queue: false}); 

    } else if (s == 0) {
    	$('header').removeClass("scroll-active"); 
    	$('.logo').removeClass("logo-active");
    	$('header').animate({height: '100px'},{duration: 50, queue: false});
 }
});

