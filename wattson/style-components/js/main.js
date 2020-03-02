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


// Присваивание города в попап окно "popup-locat__select-city"
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


//Открытие блока "Мой аккаунт"
if ($(window).width() < 991) {
    $('.lk-sidebar__title').click(function(){
        $('.lk-sidebar').toggleClass('account-slide');
    });
}


// Прилипающий сайдбар
if ($('.lk-sidebar').length) {
    if ($(window).width() > 991) {
        var a = document.querySelector('.lk-sidebar'), 
        b = null, 
        K = null, 
        Z = 0, 
        P = 20, // если у P ноль заменить на число, то блок будет прилипать до того, как верхний край окна браузера дойдёт до верхнего края элемента
        N = -50;  // если у N — нижний край дойдёт до нижнего края элемента. Может быть отрицательным числом

        window.addEventListener('load', Ascroll, false);
        window.addEventListener('scroll', Ascroll, false);
        document.body.addEventListener('scroll', Ascroll, false);
        function Ascroll() {
            var Ra = a.getBoundingClientRect(),
            R1bottom = document.querySelector('.sidebar').getBoundingClientRect().bottom;
            if (Ra.bottom < R1bottom) {
                if (b == null) {
                    var Sa = getComputedStyle(a, ''), s = '';
                    for (var i = 0; i < Sa.length; i++) {
                        if (Sa[i].indexOf('overflow') == 0 || Sa[i].indexOf('padding') == 0 || Sa[i].indexOf('border') == 0 || Sa[i].indexOf('outline') == 0 || Sa[i].indexOf('box-shadow') == 0 || Sa[i].indexOf('background') == 0) {
                            s += Sa[i] + ': ' +Sa.getPropertyValue(Sa[i]) + '; '
                        }
                    }
                    b = document.createElement('div');
                    b.className = "stop";
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
                var Rb = b.getBoundingClientRect(),
                    Rh = Ra.top + Rb.height,
                    W = document.documentElement.clientHeight,
                    R1 = Math.round(Rh - R1bottom),
                    R2 = Math.round(Rh - W);
                if (Rb.height > W) {
                    if (Ra.top < K) {  // скролл вниз
                        if (R2 + N > R1) {  // не дойти до низа
                            if (Rb.bottom - W + N <= 100) {  // подцепиться
                                b.className = 'sticky';
                                b.style.top = W - Rb.height - N + 'px';
                                Z = N + Ra.top + Rb.height - W;
                            } else {
                                b.className = 'stop';
                                b.style.top = - Z + 'px';
                            }
                        } else {
                            b.className = 'stop';
                            b.style.top = - R1 +'px';
                            Z = R1;
                        }
                    } else {  // скролл вверх
                        if (Ra.top - P < 0) {  // не дойти до верха
                            if (Rb.top - P >= 0) {  // подцепиться
                                b.className = 'sticky';
                                b.style.top = P + 'px';
                                Z = Ra.top - P;
                            } else {
                                b.className = 'stop';
                                b.style.top = - Z + 'px';
                            }
                        } else {
                            b.className = '';
                            b.style.top = '';
                            Z = 0;
                        }
                    }
                    K = Ra.top;
                } else {
                    if ((Ra.top - P) <= 0) {
                        if ((Ra.top - P) <= R1) {
                            b.className = 'stop';
                            b.style.top = - R1 +'px';
                        } else {
                            b.className = 'sticky';
                            b.style.top = P + 'px';
                        }
                    } else {
                        b.className = '';
                        b.style.top = '';
                    }
                }
                window.addEventListener('resize', function() {
                    a.children[0].style.width = getComputedStyle(a, '').width
                }, false);
            }
        };
    }
}


//Маска для форм
if ($('.footer__pseudo-call input').length) {
    $('.footer__pseudo-call input').mask('+7 (000) 000-00-00', {placeholder: "+7 ( 000 ) 000-00-00"});
}
if ($('.login-form__item-tel').length) {
    $('.login-form__item-tel').mask('+7 (000) 000-00-00', {placeholder: "+7 ( 000 ) 000-00-00"});
}
if ($('.login-form__item-card').length) {
    $('.login-form__item-card').mask('0000000000', {placeholder: "0000000000"});
}

//Открытие мобильного меню в хедере личного кабинета
if ($('.head-login').length) {
    if ($(window).width() < 991) {
        $('.burger, .close-nav').click(function(){
            $('.head-login__bottom').toggleClass('menu-active');
        });
    }
}

// Открытие мобильного меню в хедере промо страницы
if ($('.header-authorization').length) {
    if ($(window).width() < 991) {
        $('.burger, .close-nav').click(function(){
            $('.header-authorization__nav').toggleClass('menu-active');
        });
    }
}

//Добавление иконки вопроса в форму
$('.selection-question').each(function() { 
    $(this).parent().append('<img class="order-selection__icon" src="../style-components/img/svg/question-mark.svg" alt="">');
});
$('.order-selection__icon').hover(function(){
    $(this).parent().find('.selection-question').toggleClass('view');
});


//Автоотправка форм при смене чекбокса
$('.order-selection').on('change', function() {
    $(this).submit();
});


//Смена складок .lk-content__select______________
if ($('.lk-content__info-select').length) {
    $('.lk-content__select-btn').each(function(){
        if ($(this).hasClass('select-active')) {
            var downData = $(this).attr('data-select');
            $('.lk-content__info-item[data-info="' + downData + '"]').addClass('lk-content__info-active');
        }
    });
    $('.lk-content__select-btn').click(function(){
        $('.lk-content__select-btn').removeClass('select-active');
        $(this).addClass('select-active');

        var selectData = $(this).attr('data-select');
        $('.lk-content__info-item').removeClass('lk-content__info-active');
        $('.lk-content__info-item[data-info="' + selectData + '"]').addClass('lk-content__info-active');   
    });
}