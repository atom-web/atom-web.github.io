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

$(document).ready(function() {
    if ($(".main-feed__item .text__cont").length > 0) {
       $(".main-feed__item .text__cont").dotdotdot(); 
    };    

    $('.callback-btn, .callback__btn').click(function() {
        event.preventDefault();
        $('.modal-callback').addClass('modal-callback_active');
    });

    $('.modal-callback .close-modal').click(function() {
        $('.modal-callback').removeClass('modal-callback_active');
    });
    
    $(document).mouseup(function (e) {
        var container = $(".modal-callback_active");
        if (container.has(e.target).length === 0){
            container.removeClass('modal-callback_active');
        }
    });

    $('.contacts-anchor').click(function() {
        var id = $(this).attr('href'),
            top = $(id).offset().top;

        $('body,html').animate({
            scrollTop: top
        }, 700);
    });

    // add bg img for feed page in title

    if ($('.feed-page-title').length > 0) {
       $('.feed-page-title').append('<div class="bg-page-title"></div>');

       var imgSrc = $('.feed-page__content .left-img-block .img-container img').attr('src');
       $('.bg-page-title').attr('style', 'background-image: url('+imgSrc+')');
    }

    // tags

    if ($('.prod-inn__tags').length > 0) {
        $('.prod-inn__tags').slick({
            slidesToShow: 6,
            infinite: false,
            prevArrow: $('.prod-inn__tags-container span.prev'),
            nextArrow: $('.prod-inn__tags-container span.next'),
            responsive: [
            {
              breakpoint: 1275,
              settings: {
                slidesToShow: 3,
                centerMode: true,
                variableWidth: true,
                infinite: true,
              }
            }
            // {
            //   breakpoint: 600,
            //   settings: {
            //     slidesToShow: 2,
            //   }
            // },
            // {
            //   breakpoint: 480,
            //   settings: {
            //     slidesToShow: 1,
            //   }
            // }
          ]
        });
    };

    $(window).on('resize orientationchange', function() {
        if ($('.prod-inn__tags').length > 0) {
            $('.prod-inn__tags').slick('resize');
        };
    });

    $('.prod-inn__filter .type-more').click(function() {
        $(this).hide();
        $('.prod-inn__filter .type-group p').attr('style', 'display: block !important');
    });

    if ($('.prod-inn__filter select').length > 0) {
       $('.prod-inn__filter select').selectize({
            sortField: 'text'
        }); 
    };

    $('.filter__reset').click(function() {
        $(".prod-inn__filter")[0].reset();
    });

    // adaptive

    var headTel = $('header .callback');
        headMenu = $('header nav');
        headLogo = $('header .logo');

    $(window).on('load resize', function(){
      if ($(window).width() <= 1275) {
        headTel.appendTo($('header'));
        // headMenu.appendTo($('header'));
      } else {
        headTel.appendTo($('header > .container'));
        // headMenu.appendTo($('header > .container'));
      };

      if ($(window).width() <= 940) {
        headMenu.appendTo($('header'));
      } else {
        headMenu.insertAfter(headLogo);
      }
    });

    $('#nav-icon').click(function(){
        $(this).toggleClass('open');
        if ($(this).hasClass('open')) {
            headMenu.addClass('active');
        } else {
            headMenu.removeClass('active');
        }
    });

    $('.form-toggle__open').click(function() {
        $('.form-toggle').addClass('active');
        $('.prod-inn__filter').addClass('show');
    });

    $('.form-toggle__close').click(function() {
        $('.form-toggle').removeClass('active');
        $('.prod-inn__filter').removeClass('show');
    });


    // sticky filter for desktop

    // filter for screen < 940

    if ($('.prod-inn__filter').length > 0) {
        if ($(window).width() >= 940) {
           (function(){
                var a = document.querySelector('.prod-inn__filter'), b = null, P = 0;  // если ноль заменить на число, то блок будет прилипать до того, как верхний край окна браузера дойдёт до верхнего края элемента. Может быть отрицательным числом
                window.addEventListener('scroll', Ascroll, false);
                document.body.addEventListener('scroll', Ascroll, false);
                function Ascroll() {
                  if (b == null) {
                    var Sa = getComputedStyle(a, ''), s = '';
                    for (var i = 0; i < Sa.length; i++) {
                      if (Sa[i].indexOf('overflow') == 0 || Sa[i].indexOf('padding') == 0 || Sa[i].indexOf('border') == 0 || Sa[i].indexOf('outline') == 0 || Sa[i].indexOf('box-shadow') == 0 || Sa[i].indexOf('background') == 0) {
                        s += Sa[i] + ': ' +Sa.getPropertyValue(Sa[i]) + '; '
                      }
                    }
                    b = document.createElement('div');
                    b.style.cssText = s + ' box-sizing: border-box; width: ' + a.offsetWidth + 'px;';
                    a.insertBefore(b, a.firstChild);
                    var l = a.childNodes.length;
                    for (var i = 1; i < l; i++) {
                      b.appendChild(a.childNodes[1]);
                    }
                    a.style.height = b.getBoundingClientRect().height + 'px';
                    a.style.padding = '0';
                    a.style.border = '0';
                  }
                  var Ra = a.getBoundingClientRect(),
                      R = Math.round(Ra.top + b.getBoundingClientRect().height - document.querySelector('footer').getBoundingClientRect().top + 0);  // селектор блока, при достижении верхнего края которого нужно открепить прилипающий элемент;  Math.round() только для IE; если ноль заменить на число, то блок будет прилипать до того, как нижний край элемента дойдёт до футера
                  if ((Ra.top - P) <= 0) {
                    if ((Ra.top - P) <= R) {
                      b.className = 'stop';
                      b.style.top = - R +'px';
                    } else {
                      b.className = 'sticky';
                      b.style.top = P + 'px';
                    }
                  } else {
                    b.className = '';
                    b.style.top = '';
                  }
                  window.addEventListener('resize', function() {
                    a.children[0].style.width = getComputedStyle(a, '').width
                  }, false);
                }
            })(); 
        };
       if ($(window).width() <= 940) {
            //получаем положение и размеры фильтра после загрузки страницы и положение футера
            var sTop = $('.form-toggle').offset().top;
            console.log(sTop);
            var sHeight = $('.form-toggle').height();
            var fTop = $('footer').offset().top;

            $(window).scroll(function () {
                //получаем текущие координаты
                var top = $(document).scrollTop();
                console.log(top);
                //Если проспролили дальше, чем верхний край фильтра был и нижний край фильтра не упирается в футер - меняем позиционирование
                if (top >= sTop && top <= fTop) {
                    $('.form-toggle').css({ 'position': 'fixed', 'top': '0px', 'right': 'calc(-100% + 50px)' });
                    $('.prod-inn__filter').css({ 'position': 'fixed', 'top': '46px' });
                } else {
                    if ($('.form-toggle').hasClass('active')) {
                        return true;
                    } else {
                        $('.form-toggle').removeAttr('style').removeClass('active');
                    }
                    
                    // $('.prod-inn__filter').removeClass('show').removeAttr('style');
                }
            });
        } 
    };

    
});