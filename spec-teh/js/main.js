// преобразование img.svg в svg объект
$('img[src$=".svg"]').each(function() { 
    var $img = jQuery(this); 
    var imgURL = $img.attr('src'); 
    var attributes = $img.prop("attributes"); 

    $.get(imgURL, function(data) { 
        var $svg = jQuery(data).find('svg');
        $svg = $svg.removeAttr('xmlns:a');
         $.each(attributes, function() {
            $svg.attr(this.name, this.value); 
         }); 

        $img.replaceWith($svg);
    }, 'xml'); 
});

//Карусель категорий
$('.cat-slider__init').slick({
    slidesToShow: 3,
    slidesToScroll: 3,
    arrows: false,
    autoplay: true,
    dots: true, 
    customPaging: (function(slider, i) {return '<div class="slider-slick-dot"></div>';}),
  });


//Карусель производителей
$('.technics__slider-init').slick({
    slidesToShow: 4,
    slidesToScroll: 4,
    arrows: false,
    autoplay: true,
    dots: true, 
    customPaging: (function(slider, i) {return '<div class="slider-slick-dot"></div>';}),
  });