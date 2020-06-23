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

//Прилипание меню
var objToStick = $(".head__bottom"); //получаем нужный объект
var topOfObjToStick = $(objToStick).offset().top; //получаем начальное расположение нашего блока
var objHeight = $(objToStick).height();
    
$(window).scroll(function () {
    var windowScroll = $(window).scrollTop(); //получаем величину, показывающую на сколько прокручено окно
    if (windowScroll > topOfObjToStick) { // если прокрутили больше, чем расстояние до блока, то приклеиваем его
        $(objToStick).addClass("topWindow");
        $('header').attr('style', 'margin-bottom: ' + objHeight + 'px;'); //добавляем отступ хедеру
    } else {
        $(objToStick).removeClass("topWindow");
        $('header').removeAttr('style'); 
    };
});

function sizeDistance() {
    size = $('.range-size').val();
    $('.sidebar__distance-val span').html(size)
}
sizeDistance();



$('.sidebar__city select').styler();