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

//Карусель в карточке товара
 $('.card-poduct__img').slick({
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: false,
  fade: true,
  asNavFor: '.card-poduct__img-nav',
  
});
$('.card-poduct__img-nav').slick({
  slidesToShow: 4,
  slidesToScroll: 1,
  asNavFor: '.card-poduct__img',
  dots: true,
  centerMode: true,
  focusOnSelect: true,
  dots: false,
  arrows: false,
  centerPadding: '5px',
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

//Аккордеон в сайдбаре
if ($('.accordion').length) {
    $('.accordion').click(function() {
        $('.accordion').find('.accordion-cont').removeClass('accordion-active');
        $(this).find('.accordion-cont').addClass('accordion-active');
    });
}

//Аккордеон В "Сортировка и фильтр"
$('.sidebar-accordion__filter-form-item').click(function(){
    if ($(this).hasClass('ac-active')) {
        $(this).removeClass('ac-active');
    } else {
        $(this).addClass('ac-active');
    }
    
});

// Прилипающий сайдбар
if ($('.lk-sidebar, .sidebar-accordion').length) {
    if ($(window).width() > 991) {
        var a = document.querySelector('.lk-sidebar, .sidebar-accordion'), 
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


// Form-styler _________________________________
if ($('.estimate__select').length) {
    $('.estimate__select').styler(); //Активация form-styler
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
if ($('.standart-form__tel').length) {
    $('.standart-form__tel').mask('+7 (000) 000-00-00', {placeholder: "+7 ( 000 ) 000-00-00"});
}
if ($('.check-content__num').length) {
    $('.check-content__num').mask('0000', {placeholder: "0000",});
}
if ($('.estimate__tel').length) {
    $('.estimate__tel').mask('+7 (000) 000-00-00', {placeholder: "+7 ( 000 ) 000-00-00"});
}




//Функция толкающая инфоблоки на мобильной версии    
if ($('.selection-question').length) {
    $('.selection-question').each(function() {
        var winWidth = $(document).width();
        var objPosLeft = Math.trunc($(this).offset().left);;
        var objWidth = $(this).width();
        var isEmpty = 100;

        if (objPosLeft + objWidth + isEmpty >= winWidth) {
           $(this).addClass('selection-question-left');
        } else {
            $(this).removeClass('selection-question-left');
        }
    });
};
    



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

//Добавление иконки обязательного заполнения формы
$('input[required]').each(function() {
    $(this).parent().addClass('input-required');
});
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


//Функция скрытия кнопки "Удалить регион"
 var removeAjax = function(){
    if ($('.add-region__item').length > 1) {
        $('.add-region__remove').addClass('remove-vis');
    } else {
        $('.add-region__remove').removeClass('remove-vis');
    }
 };


//Функция получения данных регионов с json
function getFileSity(fileName){
    let  request = new XMLHttpRequest();
    request.open('GET', fileName, false);
    request.send(null);
    return  JSON.parse(request.responseText);
}
let sityData = getFileSity('http://atom-web.github.io/wattson/style-components/sity.json');

 //Функция добавления регионов работы
var regionAjax = function(){
    if ($('.add-region').length) {
        if ($('.add-region__select option').text().length > 0) {
            //Загрузка после нажатия на "добавить регион"
            if ($('.add-region__item').find('.add-region__select-city').length) { //Если нет input-а города, то и при добавлении региона, город не будет показываться
                $('.add-region__items').append('<div class="add-region__item"><select class="add-region__select"></select><select class="add-region__select-city"></select></div>');
            } else {
                $('.add-region__items').append('<div class="add-region__item"><select class="add-region__select"></select></div>');
            }
            
            $('.add-region__item:last-child select.add-region__select, .add-region__item:last-child select.add-region__select-city').append('<option></option>'); //Добавление прейсхолдера в города при клике на "Добавить регион"
            
            $(sityData.locat).each(function(r, d){ //Добавление регионов при клике на "Добавить регион"
                $('.add-region__item:last-child').find('select.add-region__select').append('<option value="' + d.id + '">' + d.region + '</option>');
            });
        } else {
            //Первая загрузка страницы
            $('select.add-region__select, select.add-region__select-city').append('<option></option>'); // Добавление прейсхолдера в город при первой загрузке
            $(sityData.locat).each(function(r, d){ // Добавление регионов при первой загрузке
                $('select.add-region__select').append('<option value="' + d.id + '">' + d.region + '</option>');
            });
        }  
        $('.add-region__select').styler({selectPlaceholder: 'Выбрать регион',}); //Активация form-styler
        $('.add-region__select-city').styler({selectPlaceholder: 'Выбрать город',}); //Активация form-styler

        removeAjax();

        $('select.add-region__select').on('change', function() { //Событие при выборе селекта
            var cityVal = $(this).val(); //Переменная со значением селекта
            
            $('select.add-region__select').removeAttr('region-focus');
            $(this).attr('region-focus', '');
            $('select.add-region__select[region-focus]').closest('.add-region__item').find('select.add-region__select-city').html('');
            $(sityData.locat).each(function(i, e){
                if (cityVal == e.id) {
                    $(e.city).each(function(x, y){
                        $('select.add-region__select[region-focus]').closest('.add-region__item').find('select.add-region__select-city').append('<option>'+ y +'</option'); // Добавление списка городов при выборе селекта
                        $('input, select').trigger('refresh'); // Динамическая загрузка form-styler при выборе селекта
                    });
                }
            });
         });
    };    
};
regionAjax();
$(".add-region").on("click", ".add-region__btn", regionAjax); // Динамическая загрузка функции regionAjax(); при клике на "Добавить регион"
//Функция при клике на "Удалить регион"
$('.add-region__remove').click(function(){           
    $(this).closest('.add-region__items').find('.add-region__item:last-child').remove();
    removeAjax();
});


//Датадропер
if ($('.standart-form__item-data').length) {
    $('.standart-form__item-data').datepicker({
        language: 'ru'
    });
};


// Выпадающее окно с выбором печати
var drop = '.list__print-drop'; //Выпадающий блок
var dropActive = 'list__print-active'; //Класс активного элемента
var printBtn = '.list__print-btn'; // Кнопка вызова функции

$(printBtn).click(function() {
    if ($(this).find(drop).hasClass(dropActive)) { // если выпадающий блок уже имеет активный класс
        $(this).find(drop).removeClass(dropActive); // удалить этот класс
    } else {
        $(drop).removeClass(dropActive); // удалить этот класс со всех выпадающих блоков
        $(this).find(drop).addClass(dropActive); //добавить этот класс
        $(document).mouseup(function (e){ // событие клика по веб-документу
            var div = $(drop + ', ' + printBtn); // тут указываем класс элемента
            if (!div.is(e.target) // если клик был не по нашему блоку
                && div.has(e.target).length === 0 ) { // и не по его дочерним элементам
                $(this).find(drop).removeClass(dropActive); // удалить этот класс
            }
        });
    }
});

//Удаление чекбоксов
var checkboxes = '.list__box-item-checkbox input';
var checkInp = '#checkbox-all';

$(checkInp).change(function() {
    if (this.checked) {
        $(checkboxes).each(function(i, e) {
            $(checkboxes)[i].checked = true;
        });
    } else {
        $(checkboxes).each(function(i, e) {
            $(checkboxes)[i].checked = false;
        });
    }
});
$(checkboxes).change(function(){
    if ($(checkboxes + ':checkbox:checked').length == $(checkboxes).length) {
        $(checkInp).each(function(i, e) {
            $(checkInp)[i].checked = true;
        });
    } else {
        $(checkInp).each(function(i, e) {
            $(checkInp)[i].checked = false;
        });
    }
});


//Сброс фильтра в сайдбаре
$('.sidebar-accordion__filter-remove').click(function() {
    var sidebarInp = '.sidebar-accordion__form-check input';
    
    $(sidebarInp).each(function(i, e) {
        $(sidebarInp)[i].checked = false;
    });
});


//Смена блоков плитка/список
$('.list__box-control>div').click(function() {
    $('.list__box-control>div').removeClass('control-active');
    $(this).addClass('control-active');

    if ($(this).attr('control') == 'list') {
        $('.list').removeClass('block');
        $('.col1-check').addClass('col1-list');
        $('.col1-check').removeClass('col1-block');
    } else {
        $('.list').addClass('block');
        $('.col1-check').addClass('col1-block');
        $('.col1-check').removeClass('col1-list');
    }
});


if ($('.work-overlay__control').length) {
    $('.work-overlay__control-btn').click(function() {
        var lnkData = $(this).attr('work-control');

        $('.work-overlay__tab').each(function(i, e) {
            $(this).removeClass('tab-active');
            if ($(e).attr('work-tab') == lnkData) {
                $(this).addClass('tab-active');
            }
            
        });
    });
}


if ($('#related-stick').length) {
    $('.related-stick__control-btn').click(function() {
        var lnkData = $(this).attr('stick-control');

        $('.related-stick__control-btn').removeClass('control-btn-active');
        $(this).addClass('control-btn-active');

        $('.related-stick__item').each(function(i, e) {
            $(this).removeClass('tab-active');
            if ($(e).attr('stick-tab') == lnkData) {
                $(this).addClass('tab-active');
            }
            
        });
    });
}







//Проверка СМС подтверждения
$('.standart-form__check-btn').click(function(e) {
    var valTel= $('.standart-form__tel').val().replace(/\D+/g,""); //значение номера вписанный в поле
    var numPhone = parseInt(valTel); //получение цифр из строки

    function countDigits(n) {        //Определение количества цифр
       for(var i = 0; n > 1; i++) {
          n /= 10;
       }
       return i;
    }
    if (countDigits(numPhone) == 11) { // проверка количества введенных символов телефона
        e.preventDefault(); //отмена стандартного поведения кнопки ".standart-form__check-btn"
        $('.standart-form__error').html(''); //удаление текста при всех введенных цифрах

        $.ajax({
            url: 'http://atom-web.github.io/wattson/style-components/num-tel.json', //ввел тестовый урл
            // url: 'https://www.wattson.ru/PARTNER_MENU_ASYNC?ACTION=GET_CONFIRM_CODE&PHONE=' + valTel,
            // type: 'POST',
            // data: {},
            success: function(data){
                if (data.result == true) { //если код был отправлен пользователю
                    $.fancybox.open({src: '#check-content'}); //открытие окна с вводом кода
                } else {
                    $('.standart-form__error').html('<p>' + data.ErrorText + '</p>'); //текст ошибки берется из json
                }
            },
        });
    } else {
        $('.standart-form__error').html('<p>Введенный номер очень короткий</p>'); //добавление ошибки при написании неполного номера мобильного
    }
});
$('.check-content__wrap').submit(function(e) { //событие при отправке проверочного кода
    var valCode = $('.check-content__wrap input').val(); //значение введенного кода
    e.preventDefault();
    $.ajax({
        url: 'http://atom-web.github.io/wattson/style-components/num-tel.json', //ввел тестовый урл
        // type: 'POST',
        // data: {},
        success: function(data){
            $('.form-suc').addClass('form-suc-active'); //добавление информационного окна для пользователя при успешной отправке
        },
    });
});



//смена пароля
$('.res-pass').click(function(e) {
    $.ajax({
        url: 'http://atom-web.github.io/wattson/style-components/num-tel.json', //ввел тестовый урл
        success: function(data){
            $.fancybox.open({src: '#suc'}); //открытие окна с вводом кода
            setTimeout(function(){
                $.fancybox.close({src: '#suc'}); //закрытие окна с вводом кода
            }, 3000);
            
        },
    });
    return false;
});

//Отправка телефона в футере
$('.footer__pseudo-call button').click(function(e) {
    $.ajax({
        url: 'http://atom-web.github.io/wattson/style-components/num-tel.json', //ввел тестовый урл
        success: function(data){
            $.fancybox.open({src: '#call-suc'}); //открытие окна с вводом кода
            setTimeout(function(){
                $.fancybox.close({src: '#call-suc'}); //закрытие окна с вводом кода
            }, 3000);
            
        },
    });
    return false;
});