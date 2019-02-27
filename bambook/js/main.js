$('img[src$=".svg"]').each(function() { 
    var $img = jQuery(this); 
    var imgURL = $img.attr('src'); 
    var attributes = $img.prop("attributes"); 

    $.get(imgURL, function(data) { 
        var $svg = jQuery(data).find('svg'); // Get the SVG tag, ignore the rest 
        $svg = $svg.removeAttr('xmlns:a'); // Remove any invalid XML tags 
        $.each(attributes, function() { // Loop through IMG attributes and apply on SVG 
          $svg.attr(this.name, this.value); 
        }); 

        $img.replaceWith($svg); // Replace IMG with SVG 
      }, 'xml'); 

  });

  
  $(document).mouseup(function (e) {
    var container = $('.header-search__input');
    var searchlab = $('.header-search__input label');
    
    if (container.has(e.target).length === 0){
        $(searchlab).removeClass('header-search__click');
    }else{
      $(searchlab).addClass('header-search__click');
    }
});

// $('.price-grid__box').hover(function(){
//     $('.price-grid__box').removeClass('grid-box__active');
// });
//   
$('.price-grid__box').hover(function(){
  if($(this).is(':hover'))
    $('.price-grid__box').removeClass('grid-box__active');
  else{
    $('.price-grid__box:first').addClass('grid-box__active');
  }
});
