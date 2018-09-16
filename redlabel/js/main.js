var resbox = $('body');

$('.link-open-sound', resbox).click(function (e) {
    e.preventDefault();
    var link = $(this).prop('href'),
    	linkalt = $(this).prop('alt'),
        audio = $('.audioControl', resbox);

    var imgRad = $(this).find('img').attr('src');
    $('.radio-img').find('img').attr('src', imgRad);

    var namealt = $(this).find('img').attr('alt');
    $('.name-radio').text(namealt);

    $('.preview-audio').addClass('animated fadeIn');


    if ($(this).hasClass('is-play')) {
	    	$(this).removeClass('is-play');
	    	audio.find('audio')[0].pause();
	    	$('.preview-audio').removeClass('preview-audio-active');
	    	$('.preview-audio').addClass('out-audio-active');
    } else {
	    	$('.voiceLink a').removeClass('is-play');
	    	$('.preview-audio').removeClass('out-audio-active');
	    	$('.preview-audio').addClass('preview-audio-active');
	    	$(this).addClass('is-play');
	    	audio.find('source').prop('src', link);
		    // audio.parent().css('display', 'inline-block');
		    audio.find('audio').load();
		    audio.find('audio')[0].play();
    }

    
});

// Меню_______________
$(document).ready(function(){
    $("#sticker").sticky({
    	topSpacing:0,
    	center: true,
    });
});

$(document).ready(function(){
    $(".menu-categor").click(function(){
        $(".categor-box").toggleClass('categor-box-active');
        $(".city-box").removeClass('sity-box-active');
    });
    $(".menu-city").click(function(){
        $(".city-box").toggleClass('sity-box-active');
        $(".categor-box").removeClass('categor-box-active');
    });
    $(".popilar-categor").click(function(){
        $(".popular-box").toggleClass('popular-box-active');
        $(".top-popular-box").removeClass('top-popular-active');
    });
       $(".top-categor").click(function(){
        $(".top-popular-box").toggleClass('top-popular-active');
        $(".popular-box").removeClass('popular-box-active');
    });
});


// Блок контента_____________
$(document).ready(function(){
    $(".station-box").hover(function(){
        $(this).find(".img-station-box").toggleClass('station-img-active');
        $(this).find(".link-station").toggleClass('link-station-active animated bounceInUp');
        $(this).find(".icon-station-box").toggleClass('station-icon-active');
    });
});