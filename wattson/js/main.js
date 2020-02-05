//преобразование img.svg в svg объект
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


//Присваивание города в попап окно "popup-locat__select-city"
var locPopup = $('.popup-locat__select-city'); //место вставки города
var topCity = $('.head-login__top-city'); //город который нужно вставить
var titleLoc = $('.popup-locat__item-title'); //список городов в попап окне

if (locPopup.length) {
    var locCity = topCity.html();
    locPopup.html(locCity)
}
titleLoc.each(function(i, e){
    if ($(this).html() == topCity.html()) {
        $(this).parent().addClass('locat-active') //активный класс на город в попап окне
        $(this).parent().attr('onclick', 'return false'); //запрет стандартного поведения кнопки
    }
});