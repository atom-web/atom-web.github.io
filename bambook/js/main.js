// jQuery Mask Plugin v1.14.15
// github.com/igorescobar/jQuery-Mask-Plugin
var $jscomp={scope:{},findInternal:function(a,l,d){a instanceof String&&(a=String(a));for(var p=a.length,h=0;h<p;h++){var b=a[h];if(l.call(d,b,h,a))return{i:h,v:b}}return{i:-1,v:void 0}}};$jscomp.defineProperty="function"==typeof Object.defineProperties?Object.defineProperty:function(a,l,d){if(d.get||d.set)throw new TypeError("ES3 does not support getters and setters.");a!=Array.prototype&&a!=Object.prototype&&(a[l]=d.value)};$jscomp.getGlobal=function(a){return"undefined"!=typeof window&&window===a?a:"undefined"!=typeof global&&null!=global?global:a};$jscomp.global=$jscomp.getGlobal(this);$jscomp.polyfill=function(a,l,d,p){if(l){d=$jscomp.global;a=a.split(".");for(p=0;p<a.length-1;p++){var h=a[p];h in d||(d[h]={});d=d[h]}a=a[a.length-1];p=d[a];l=l(p);l!=p&&null!=l&&$jscomp.defineProperty(d,a,{configurable:!0,writable:!0,value:l})}};$jscomp.polyfill("Array.prototype.find",function(a){return a?a:function(a,d){return $jscomp.findInternal(this,a,d).v}},"es6-impl","es3");(function(a,l,d){"function"===typeof define&&define.amd?define(["jquery"],a):"object"===typeof exports?module.exports=a(require("jquery")):a(l||d)})(function(a){var l=function(b,e,f){var c={invalid:[],getCaret:function(){try{var a,r=0,g=b.get(0),e=document.selection,f=g.selectionStart;if(e&&-1===navigator.appVersion.indexOf("MSIE 10"))a=e.createRange(),a.moveStart("character",-c.val().length),r=a.text.length;else if(f||"0"===f)r=f;return r}catch(C){}},setCaret:function(a){try{if(b.is(":focus")){var c,g=b.get(0);g.setSelectionRange?g.setSelectionRange(a,a):(c=g.createTextRange(),c.collapse(!0),c.moveEnd("character",a),c.moveStart("character",a),c.select())}}catch(B){}},events:function(){b.on("keydown.mask",function(a){b.data("mask-keycode",a.keyCode||a.which);b.data("mask-previus-value",b.val());b.data("mask-previus-caret-pos",c.getCaret());c.maskDigitPosMapOld=c.maskDigitPosMap}).on(a.jMaskGlobals.useInput?"input.mask":"keyup.mask",c.behaviour).on("paste.mask drop.mask",function(){setTimeout(function(){b.keydown().keyup()},100)}).on("change.mask",function(){b.data("changed",!0)}).on("blur.mask",function(){d===c.val()||b.data("changed")||b.trigger("change");b.data("changed",!1)}).on("blur.mask",function(){d=c.val()}).on("focus.mask",function(b){!0===f.selectOnFocus&&a(b.target).select()}).on("focusout.mask",function(){f.clearIfNotMatch&&!h.test(c.val())&&c.val("")})},getRegexMask:function(){for(var a=[],b,c,f,n,d=0;d<e.length;d++)(b=m.translation[e.charAt(d)])?(c=b.pattern.toString().replace(/.{1}$|^.{1}/g,""),f=b.optional,(b=b.recursive)?(a.push(e.charAt(d)),n={digit:e.charAt(d),pattern:c}):a.push(f||b?c+"?":c)):a.push(e.charAt(d).replace(/[-\/\\^$*+?.()|[\]{}]/g,"\\$&"));a=a.join("");n&&(a=a.replace(new RegExp("("+n.digit+"(.*"+n.digit+")?)"),"($1)?").replace(new RegExp(n.digit,"g"),n.pattern));return new RegExp(a)},destroyEvents:function(){b.off("input keydown keyup paste drop blur focusout ".split(" ").join(".mask "))},val:function(a){var c=b.is("input")?"val":"text";if(0<arguments.length){if(b[c]()!==a)b[c](a);c=b}else c=b[c]();return c},calculateCaretPosition:function(){var a=b.data("mask-previus-value")||"",e=c.getMasked(),g=c.getCaret();if(a!==e){var f=b.data("mask-previus-caret-pos")||0,e=e.length,d=a.length,m=a=0,h=0,l=0,k;for(k=g;k<e&&c.maskDigitPosMap[k];k++)m++;for(k=g-1;0<=k&&c.maskDigitPosMap[k];k--)a++;for(k=g-1;0<=k;k--)c.maskDigitPosMap[k]&&h++;for(k=f-1;0<=k;k--)c.maskDigitPosMapOld[k]&&l++;g>d?g=10*e:f>=g&&f!==d?c.maskDigitPosMapOld[g]||(f=g,g=g-(l-h)-a,c.maskDigitPosMap[g]&&(g=f)):g>f&&(g=g+(h-l)+m)}return g},behaviour:function(f){f=f||window.event;c.invalid=[];var e=b.data("mask-keycode");if(-1===a.inArray(e,m.byPassKeys)){var e=c.getMasked(),g=c.getCaret();setTimeout(function(){c.setCaret(c.calculateCaretPosition())},a.jMaskGlobals.keyStrokeCompensation);c.val(e);c.setCaret(g);return c.callbacks(f)}},getMasked:function(a,b){var g=[],d=void 0===b?c.val():b+"",n=0,h=e.length,q=0,l=d.length,k=1,r="push",p=-1,t=0,y=[],v,z;f.reverse?(r="unshift",k=-1,v=0,n=h-1,q=l-1,z=function(){return-1<n&&-1<q}):(v=h-1,z=function(){return n<h&&q<l});for(var A;z();){var x=e.charAt(n),w=d.charAt(q),u=m.translation[x];if(u)w.match(u.pattern)?(g[r](w),u.recursive&&(-1===p?p=n:n===v&&n!==p&&(n=p-k),v===p&&(n-=k)),n+=k):w===A?(t--,A=void 0):u.optional?(n+=k,q-=k):u.fallback?(g[r](u.fallback),n+=k,q-=k):c.invalid.push({p:q,v:w,e:u.pattern}),q+=k;else{if(!a)g[r](x);w===x?(y.push(q),q+=k):(A=x,y.push(q+t),t++);n+=k}}d=e.charAt(v);h!==l+1||m.translation[d]||g.push(d);g=g.join("");c.mapMaskdigitPositions(g,y,l);return g},mapMaskdigitPositions:function(a,b,e){a=f.reverse?a.length-e:0;c.maskDigitPosMap={};for(e=0;e<b.length;e++)c.maskDigitPosMap[b[e]+a]=1},callbacks:function(a){var h=c.val(),g=h!==d,m=[h,a,b,f],q=function(a,b,c){"function"===typeof f[a]&&b&&f[a].apply(this,c)};q("onChange",!0===g,m);q("onKeyPress",!0===g,m);q("onComplete",h.length===e.length,m);q("onInvalid",0<c.invalid.length,[h,a,b,c.invalid,f])}};b=a(b);var m=this,d=c.val(),h;e="function"===typeof e?e(c.val(),void 0,b,f):e;m.mask=e;m.options=f;m.remove=function(){var a=c.getCaret();m.options.placeholder&&b.removeAttr("placeholder");b.data("mask-maxlength")&&b.removeAttr("maxlength");c.destroyEvents();c.val(m.getCleanVal());c.setCaret(a);return b};m.getCleanVal=function(){return c.getMasked(!0)};m.getMaskedVal=function(a){return c.getMasked(!1,a)};m.init=function(d){d=d||!1;f=f||{};m.clearIfNotMatch=a.jMaskGlobals.clearIfNotMatch;m.byPassKeys=a.jMaskGlobals.byPassKeys;m.translation=a.extend({},a.jMaskGlobals.translation,f.translation);m=a.extend(!0,{},m,f);h=c.getRegexMask();if(d)c.events(),c.val(c.getMasked());else{f.placeholder&&b.attr("placeholder",f.placeholder);b.data("mask")&&b.attr("autocomplete","off");d=0;for(var l=!0;d<e.length;d++){var g=m.translation[e.charAt(d)];if(g&&g.recursive){l=!1;break}}l&&b.attr("maxlength",e.length).data("mask-maxlength",!0);c.destroyEvents();c.events();d=c.getCaret();c.val(c.getMasked());c.setCaret(d)}};m.init(!b.is("input"))};a.maskWatchers={};var d=function(){var b=a(this),e={},f=b.attr("data-mask");b.attr("data-mask-reverse")&&(e.reverse=!0);b.attr("data-mask-clearifnotmatch")&&(e.clearIfNotMatch=!0);"true"===b.attr("data-mask-selectonfocus")&&(e.selectOnFocus=!0);if(p(b,f,e))return b.data("mask",new l(this,f,e))},p=function(b,e,f){f=f||{};var c=a(b).data("mask"),d=JSON.stringify;b=a(b).val()||a(b).text();try{return"function"===typeof e&&(e=e(b)),"object"!==typeof c||d(c.options)!==d(f)||c.mask!==e}catch(t){}},h=function(a){var b=document.createElement("div"),d;a="on"+a;d=a in b;d||(b.setAttribute(a,"return;"),d="function"===typeof b[a]);return d};a.fn.mask=function(b,d){d=d||{};var e=this.selector,c=a.jMaskGlobals,h=c.watchInterval,c=d.watchInputs||c.watchInputs,t=function(){if(p(this,b,d))return a(this).data("mask",new l(this,b,d))};a(this).each(t);e&&""!==e&&c&&(clearInterval(a.maskWatchers[e]),a.maskWatchers[e]=setInterval(function(){a(document).find(e).each(t)},h));return this};a.fn.masked=function(a){return this.data("mask").getMaskedVal(a)};a.fn.unmask=function(){clearInterval(a.maskWatchers[this.selector]);delete a.maskWatchers[this.selector];return this.each(function(){var b=a(this).data("mask");b&&b.remove().removeData("mask")})};a.fn.cleanVal=function(){return this.data("mask").getCleanVal()};a.applyDataMask=function(b){b=b||a.jMaskGlobals.maskElements;(b instanceof a?b:a(b)).filter(a.jMaskGlobals.dataMaskAttr).each(d)};h={maskElements:"input,td,span,div",dataMaskAttr:"*[data-mask]",dataMask:!0,watchInterval:300,watchInputs:!0,keyStrokeCompensation:10,useInput:!/Chrome\/[2-4][0-9]|SamsungBrowser/.test(window.navigator.userAgent)&&h("input"),watchDataMask:!1,byPassKeys:[9,16,17,18,36,37,38,39,40,91],translation:{0:{pattern:/\d/},9:{pattern:/\d/,optional:!0},"#":{pattern:/\d/,recursive:!0},A:{pattern:/[a-zA-Z0-9]/},S:{pattern:/[a-zA-Z]/}}};a.jMaskGlobals=a.jMaskGlobals||{};h=a.jMaskGlobals=a.extend(!0,{},h,a.jMaskGlobals);h.dataMask&&a.applyDataMask();setInterval(function(){a.jMaskGlobals.watchDataMask&&a.applyDataMask()},h.watchInterval)},window.jQuery,window.Zepto)

//JavaScript Cookie v2.2.0
//https://github.com/js-cookie/js-cookie
!function(e){var n;if("function"==typeof define&&define.amd&&(define(e),n=!0),"object"==typeof exports&&(module.exports=e(),n=!0),!n){var t=window.Cookies,o=window.Cookies=e();o.noConflict=function(){return window.Cookies=t,o}}}(function(){function f(){for(var e=0,n={};e<arguments.length;e++){var t=arguments[e];for(var o in t)n[o]=t[o]}return n}function a(e){return e.replace(/(%[0-9A-Z]{2})+/g,decodeURIComponent)}return function e(u){function c(){}function t(e,n,t){if("undefined"!=typeof document){"number"==typeof(t=f({path:"/"},c.defaults,t)).expires&&(t.expires=new Date(1*new Date+864e5*t.expires)),t.expires=t.expires?t.expires.toUTCString():"";try{var o=JSON.stringify(n);/^[\{\[]/.test(o)&&(n=o)}catch(e){}n=u.write?u.write(n,e):encodeURIComponent(String(n)).replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g,decodeURIComponent),e=encodeURIComponent(String(e)).replace(/%(23|24|26|2B|5E|60|7C)/g,decodeURIComponent).replace(/[\(\)]/g,escape);var r="";for(var i in t)t[i]&&(r+="; "+i,!0!==t[i]&&(r+="="+t[i].split(";")[0]));return document.cookie=e+"="+n+r}}function n(e,n){if("undefined"!=typeof document){for(var t={},o=document.cookie?document.cookie.split("; "):[],r=0;r<o.length;r++){var i=o[r].split("="),c=i.slice(1).join("=");n||'"'!==c.charAt(0)||(c=c.slice(1,-1));try{var f=a(i[0]);if(c=(u.read||u)(c,f)||a(c),n)try{c=JSON.parse(c)}catch(e){}if(t[f]=c,e===f)break}catch(e){}}return e?t[e]:t}}return c.set=t,c.get=function(e){return n(e,!1)},c.getJSON=function(e){return n(e,!0)},c.remove=function(e,n){t(e,"",f(n,{expires:-1}))},c.defaults={},c.withConverter=e,c}(function(){})});



//Маска номера телефона
$('.tel-mask').mask('+7 (000) 000-00-00', {placeholder: "+7 (999) 000-00-00"});

$( document ).ready(function() {

    // Преобразование img в svg
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

    //Слайдер прайс-листа
    if ($('.slide-box__init').length) {
        $('.slide-box__init').slick({
            autoplay: false,
            speed: 400,
            autoplaySpeed: 3000,
            infinite: false,
            arrows: true,
            slidesToShow: 2,
            slidesToScroll: 1,
            swipe: false, 
            vertical: true,
            cssEase: 'ease-in-out',
            nextArrow: '<div class="next-arrows"><div class="next-arrows-img"></div></div>',
            prevArrow: '<div class="prev-arrows"><div class="prev-arrows-img"></div></div>',
            customPaging: (function(slider, i) {return '<div class="slide-box__slick-dot"></div>';}),
            responsive: [
                {
                    breakpoint: 1200,
                        settings: {
                        arrows: false,
                        slidesToShow: 1,
                        swipe: true,
                        vertical: false,
                        dots: true,
                        autoplay: true,
                        autoplaySpeed: 2000,
                        infinite: true,
                    }
                }
            ]
        
        });
    }
    //Слайдер сотрудничество
    if ($('.partners__wrap').length) {
        $('.partners__wrap').slick({
            autoplay: true,
            speed: 900,
            autoplaySpeed: 1000,
            infinite: true,
            arrows: false,
            slidesToShow: 6,
            slidesToScroll: 1,
            adaptiveHeight: true,
            centerPadding: '0px',
            cssEase: 'ease-in-out',
        });
    }
    //Прилипающий хедер
    if ($(window).width() > 991){
        $(window).scroll(function(e) {
            var hPrev = $('.in-head').height();
            var hPrevPage = $('.info-pnl').height();
            var hWindow = $(window).scrollTop();
            var clMenu = 'header';

            if ($('.main-preview').length){
                if($(this).scrollTop() > hPrev) {
                    $(clMenu).addClass('stickytop');
                }
                else{
                    $(clMenu).removeClass('stickytop');
                }
            }
            if ($('.info-pnl').length){
                if($(this).scrollTop() > hPrevPage) {
                    $(clMenu).addClass('stickytop');
                }
                else{
                    $(clMenu).removeClass('stickytop');
                }
            }
        });
    }

    //Мобильное меню
    if ($(window).width() < 991){
        $('body').append('<div class="mob-nav"></div>');

        $('.nav-hamb').click(function() {
            var navCont = $("header nav").html();
            $('.nav-hamb').toggleClass('nav-hamb__active');
            if ($('.nav-hamb').hasClass('nav-hamb__active')) {
                $('header, .main, footer').addClass('main-active');
                $('.mob-nav').addClass('mob-nav-active');
                $('.mob-nav').html(navCont)
            } else {
                $('header, .main, footer').removeClass('main-active');
                $('.mob-nav').removeClass('mob-nav-active');
                $('.mob-nav').html('');
            }
        });
    }

    //Проверка на наличите блока
    if ($('.in-head').length == 0) {
        $('header').addClass('bg-grad');
        $('.main').addClass('unpage');
    }

    //Форма обратного звонка
    (function(){
        var mainBlock = '.popup-calback'; //Главный блок формы
        var mainMask = '.popup-calback__mask'; // Маска для закрытия формы
        var mainClose = '.popup-calback__close'; //Кнопка закрытия формы (в форме)
        var mainBtn = '.calback-btn'; //Кнопка открытия формы

        $(mainBtn + ", " + mainMask + ", " + mainClose).click(function(e) {
            $(mainBtn).toggleClass('btn-active');

            if ($(mainBtn).hasClass('btn-active')) {
                $(mainBlock).addClass('popup-active');
                $('body, html').addClass('pop-fix');
                if (Cookies.get('telby') != null) {
                    var cAdd = Cookies.get('telby');
                    $(mainBlock).find('input[type="tel"]').val(cAdd);
                }
            } else {
                $(mainBlock).removeClass('popup-active');
                $('body, html').removeClass('pop-fix');
            }
        });
    })();
    (function(){
        var mainBlock = '.popup-calc'; //Главный блок формы
        var mainMask = '.popup-calc__mask'; // Маска для закрытия формы
        var mainClose = '.popup-calc__close'; //Кнопка закрытия формы (в форме)
        var mainBtn = '.calculator__btn'; //Кнопка открытия формы

        $(mainBtn + ", " + mainMask + ", " + mainClose).click(function(e) {
            $(mainBtn).toggleClass('btn-active');

            if ($(mainBtn).hasClass('btn-active')) {
                $(mainBlock).addClass('popup-active');
                $('body, html').addClass('pop-fix');
                if (Cookies.get('telby') != null) {
                    var cAdd = Cookies.get('telby');
                    $(mainBlock).find('input[type="tel"]').val(cAdd);
                }
            } else {
                $(mainBlock).removeClass('popup-active');
                $('body, html').removeClass('pop-fix');
            }
        });
    })();
    //Конец формы обратного звонка

    //Калькулятор
    if ($('.price-box').length) {
        $(window).scroll(function() {
            var hm = $(document).height() - $('footer').height() - 10;
            var hn = $(window).scrollTop() + $(window).height();

            if(hm < hn) {
                $('.calculator').addClass('calc-sticky');
            }
            else {
                $('.calculator').removeClass('calc-sticky');
            }
        });
    }
    $('.price-item').click(function(){
        var titleProd = $(this).find('.price-item__title').html();
        var priceProd = $(this).find('.price-item__price span').html();
        var dataVal = $(this).attr('add-basket');


        if ($('.calculator__item[data-basket="'+ dataVal +'"]').length != 1) {
            $(this).addClass('add-basket');
            $('.calculator__items').append('<div data-basket="'+ dataVal +'" class="calculator__item"><p>'+ titleProd +' от <span>'+ priceProd +'</span> ₽</p><div class="calculator__item-remove"></div></div>')

        } else {
            $(this).removeClass('add-basket');
            $('.calculator__item[data-basket="'+ dataVal +'"]').remove();
        }

        if ($('.calculator__item').length > 0) {
            var zer = 0;
            $(".calculator__item p span").each(function(){
                var summ = zer += parseInt($(this).html(), 10)
                $('.calculator__sum span').html(summ);
            })
            $('.calculator').addClass('calculator-active');
        } else {
            $('.calculator__sum span').html('0');
            $('.calculator').removeClass('calculator-active');
        }
    });
    var remSumm = function(){
        var attrSumm = $(this).closest('.calculator__item').attr('data-basket');
        var summCalc = $('.calculator__sum span').html();
        var summNum = $(this).closest('.calculator__item').find('span').html();

        $('.calculator__sum span').html(summCalc - summNum);
        $(this).closest('.calculator__item').remove();
        $('.price-item[add-basket="'+ attrSumm +'"]').removeClass('add-basket');
        if ($('.calculator__item').length == 0){
            $('.calculator').removeClass('calculator-active');
        }
    };
    $(".calculator__items").on("click", ".calculator__item-remove", remSumm);

    $('.calculator__btn').click(function(){
        var popSumm = $('.calculator__sum span').html();

        $('.popup-calc__price span').html(popSumm);
        $('.popup-calc__template').html('');

        $('.calculator__item').each(function(index, value){
            var inputCalc = '<input type="text" value="'+ $(value).text() +'" readonly="readonly">';
            $('.popup-calc__template').append(inputCalc);
        })
    });
    //Конец скрипта калькулятора

    //Запись номера в куки при отправке формы
    $("form").submit(function(){
        if ($(this).find('input[type="tel"]').val().length > 0) {
            var telForm = $(this).find('input[type="tel"]').val();
            Cookies.set('telby', telForm, { expires: 30 });
        }
    });

    //Удаление блока tel-remove если не устаньвлены куки
    if (Cookies.get('telby') != null) {
        $('.tel-remove').css('display', 'flex');
    } else {
        $('.tel-remove').css('display', 'none');
    }

    //Удаление номера из кук
    $('.tel-remove').click(function(){
        if (Cookies.get('telby') != null) {
            Cookies.remove('telby');
            $('form').find('input[type="tel"]').val('+7 ');
            $('.tel-remove').css('display', 'none');
        }

    });

});
