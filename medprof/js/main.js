$(document).ready(function(){

    $('img[src$=".svg"]').each(function() { 
      var $img = jQuery(this); 
      var imgURL = $img.attr('src'); 
      var attributes = $img.prop("attributes"); 

      $.get(imgURL, function(data) { 
      // Get the SVG tag, ignore the rest 
      var $svg = jQuery(data).find('svg'); 

      // Remove any invalid XML tags 
      $svg = $svg.removeAttr('xmlns:a'); 

      // Loop through IMG attributes and apply on SVG 
      $.each(attributes, function() { 
        $svg.attr(this.name, this.value); 
      }); 

      // Replace IMG with SVG 
      $img.replaceWith($svg); 
      }, 'xml'); 
    });

// Открытие и закрытие Формы поиска_________________________________

    var hfs = $(".header__form-search"); // Выпадающее окно формы
    var hsb = $(".header__search-button"); // Кнпка вызвова выпадающей формы
    var fClose = $(".header__form-search, header"); // блок который не используются при закрытии формы
    var fsa = ('form-search-active'); // Класс вешается при активной форме
    var animAdd = ('search-animate-add'); // Класс анимации появления
    var animRemove = ('search-animate-remove'); // Класс анимации затухания
    var formBottom = ('-70px'); // Padding формы появления

    hsb.click(function(){
        hfs.toggleClass(fsa);
        hfs.css('bottom', formBottom);
        if (hfs.hasClass(fsa)) {
                hfs.addClass(animAdd);
                hfs.removeClass(animRemove);
        } else {
                hfs.removeClass(animAdd);
                hfs.addClass(animRemove);
        }
        $(document).mouseup(function (e){
            if (!fClose.is(e.target)
                && fClose.has(e.target).length === 0) {
                hfs.removeClass(fsa);
                hfs.removeClass(animAdd);
                hfs.addClass(animRemove);
            }
        });
    });

// Инициализация слайдера___________________________________

    $('.main-slider').slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false,
      autoplay: true,
      autoplaySpeed: 3000,
      fade: true,
      cssEase: 'linear',
      draggable: false,
    });




});
