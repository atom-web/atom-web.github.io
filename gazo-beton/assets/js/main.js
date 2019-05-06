var touchHover = function() {
    $('[data-hover]').click(function(e){
        e.preventDefault();
        var $this = $(this);
        var onHover = $this.attr('data-hover');
        var linkHref = $this.attr('href');
        if (linkHref && $this.hasClass(onHover)) {
            location.href = linkHref;
            return false;
        }
        $this.toggleClass(onHover);
        $this.siblings('.second_level_menu').toggleClass('second_level_menu-show');
    });
};

// var touchSecondItem = function() {
//     $('.second_level_link').click(function() {
//         location.href = $(this).attr('href');
//     })
// }

var touchToggle = function() {
    $('.first_level_item-link:after').click(function(e) {
        e.preventDefault();
        $('.first_level_item-link').parent().find($('.second_level_menu')).removeClass('second_level_menu-active');
        $(this).parent().find($('.second_level_menu')).addClass('second_level_menu-active');
    });

    // $(".kitchen__filter-item").removeClass('kitchen__filter-item_active');
    //     $(this).addClass('kitchen__filter-item_active');

    // $(document).mouseup(function (e){ // СЃРѕР±С‹С‚РёРµ РєР»РёРєР° РїРѕ РІРµР±-РґРѕРєСѓРјРµРЅС‚Сѓ
    //     var secondMenu = $('.second_level_menu'); // С‚СѓС‚ СѓРєР°Р·С‹РІР°РµРј ID СЌР»РµРјРµРЅС‚Р°
    //     if (!secondMenu.is(e.target) // РµСЃР»Рё РєР»РёРє Р±С‹Р» РЅРµ РїРѕ РЅР°С€РµРјСѓ Р±Р»РѕРєСѓ
    //         && secondMenu.has(e.target).length === 0) { // Рё РЅРµ РїРѕ РµРіРѕ РґРѕС‡РµСЂРЅРёРј СЌР»РµРјРµРЅС‚Р°Рј
    //         secondMenu.hide(); // СЃРєСЂС‹РІР°РµРј РµРіРѕ
    //     }
    // });
}

var touchToggleTest = function() {
    $('.first_level_link').click(function() {
        // $(this).next().next().slideToggle();

        if ( $(this).find($('.second_level_menu')).hasClass('second_level_menu-active') ) {
            $('.second_level_menu').removeClass('second_level_menu-active');
        } else {
            $(this).find($('.second_level_menu')).addClass('second_level_menu-active');
        };

    });
}

$(document).ready(function(){

    // touchHover();

    function windowSize(){
        if ($(window).width() <= '800'){
            // touchHover();
            // touchSecondItem();
            touchHover();
            touchToggle();
        }
    };
    // РёР»Рё "РґРІР°-РІ-РѕРґРЅРѕРј", РІРјРµСЃС‚Рѕ РґРІСѓС… РїРѕСЃР»РµРґРЅРёС… СЃС‚СЂРѕРє:
    $(window).on('load resize',windowSize);

    $('.fix_menu-pull').click(function () {
        // $('.cityBlock').removeClass('cityBlock-opened');
        $(this).css('z-index', '9999');
        if ($(this).hasClass('fix_menu-pull_active')) {
            $(this).removeClass('fix_menu-pull_active');
            $('menu .first_level_menu').slideToggle();

        } else {
            $(this).addClass('fix_menu-pull_active');
            $('menu .first_level_menu').slideToggle();
        };
    });

    var width = $(window).width();
    var height = $(window).height();
    var lTop = (height-547)/2;
    var lLeft = (width-838)/2;

    // $('.actionGo').on('click', function(e){
    //     e.preventDefault();
    //     var url = $(this).attr('href');
    //     var email =$(this).data('email');
    //     $('.overlay').show();
    //     $('.b-order').show();
    //     $.get(url, {isNaked:1,email:email}, function(a){
    //         $('.b-order__content').html(a);
    //         $('.b-order').css({left:lLeft, top:lTop})
    //     });
    // });

    $('.actionGo').click(function(e) {
        e.preventDefault();
        var modalBtn_id;
            modalBtn_id = $(this).attr('data-modal');
        var modal = $('.modal[id="'+modalBtn_id+'"]');
        modal.addClass('active');
    });

    $('.obj-link').click(function() {
        $('.overlay').fadeIn('fast');
    });

    $('.overlay').click(function() {
        $(this).fadeOut('fast');
        $('#nonebox').fadeOut('fast');
    });

    // $('.overlay, .b-order__close').on('click', function(){
    //     closeOverlay();
    // });

    $(document).mouseup(function (e){ 
        var callback = $(".modal.active .b-order__content"); 
        if (!callback.is(e.target) 
            && callback.has(e.target).length === 0) { 
            callback.parent().removeClass('active');
        }
    });

    $('.b-order__close').on('click', function(){
        $(this).closest('.modal').removeClass('active')
    });

    // $('input[name="f_Phone"]').inputmask({"mask": "+7(999) 999-9999"}); //specifying options
    $('input[name="f_Phone"], input[name="f_telefon"]').mask("+7(999) 999-99-99");

    $('.contact_map').on('click', function(){
        var lat = $(this).data('lat');
        var long = $(this).data('long');
        var name = $(this).data('name');
        var address = $(this).data('address');
        var icon = $(this).data('icon');

        var width = $(window).width();
        var height = $(window).height()

        var leftM = (width-969)/2;
        var topM = (height-480)/2;
        $('body').css({overflow:'hidden'});
        $('.wrapper_map').css({left:leftM, top: topM, display:'block'});


        var coords = new Array (lat, long);

        $('.map_name').html(name);
        $('.map_address').html(address);

        ymaps.ready(function () {
            var myMap = new ymaps.Map('map', {
                center: coords,
                zoom: 16
            }, {
                searchControlProvider: 'yandex#search'
            }),
            myPlacemark = new ymaps.Placemark(myMap.getCenter(), {
                hintContent: name,
                balloonContent: address
            }, {
                iconLayout: 'default#image',
                iconImageHref: icon,
                iconImageSize: [34, 50],
                iconImageOffset: [2, -50]
            });

            myMap.geoObjects.add(myPlacemark);
        });

    });

    $('.map_close').on('click', function(){
        $('.wrapper_map').hide(0);
        $('.map').html('');
        $('body').css({overflow:'auto'});
    });

    $("a.gallery-p").fancybox({
        openEffect: 'none',
        closeEffect: 'none',

        prevEffect: 'none',
        nextEffect: 'none',

        closeBtn: false,

        helpers: {
            title: {
                type: 'inside'
            },
            buttons: {}
        },

        afterLoad: function () {
            this.title = 'Р¤РѕС‚Рѕ ' + (this.index + 1) + ' РёР· ' + this.group.length + (this.title ? ' - ' + this.title : '');
        }
    });

    
    $('.current_city').on('click', function(){
        $('.green').show(500);
    });
    $('.close_city_list').on('click', function(){
        $('.green').hide(500);
    });
    $('.city').on('click', function(){
        $('.green').hide(500);
        var city_name = $(this).data('name');

        // РїРѕР»СѓС‡РёРј РЅРѕРјРµСЂ С‚РµР»РµС„РѕРЅР°
        var phone = $.ajax({
            type:"POST",
            url: "/netcat/modules/default/getPhoneByLocality.php",
            data: {locality:city_name},
            async: false,
            success: function(data){console.log(data);}
        }).responseText;
        
        hrefPhone = phone.replace(/\D+/g,"");

        $('#current_city_name').html(city_name);
        $('#city_sales').html(city_name);
        $('a.header_phone').html(phone);
        $('a.header_phone').attr('href',"tel:+"+hrefPhone);

        // РЅР°РІРµСЃРёС‚СЊ РѕР±СЂР°Р±РѕС‚С‡РёРє РґР»СЏ РІС‹Р±РѕСЂР° РіРѕСЂРѕРґР°
        var date = new Date(new Date().getTime() + 60 * 1000*60*1000);
        document.cookie = "issetCity="+city_name+"; path=/; expires=" + date.toUTCString();
        document.cookie = "issetPhone="+phone+"; path=/; expires=" + date.toUTCString();
    });

    $('#size').uniform();
    $('#width').uniform();
    $('#day').uniform();
    $('#month').uniform();
    $('#year').uniform();
    $('.wo_select').uniform();
    $('#region').uniform();

    // РїРµСЂРµРєР»СЋС‡РµРЅРёРµ РЅРѕРІРѕСЃС‚РµР№ Рё СЃС‚Р°С‚РµР№
    $('.lnk').on('click', function(){
        $('.lnk').removeClass('activeLnk');
        $(this).addClass('activeLnk');
        var id = $(this).data('id');

        if(id == 1) {
            $('#list_action').hide(0);
            $('#list_article').hide(0);
            $('#list_news').show(0);
            var linkText = 'Р’СЃРµ РЅРѕРІРѕСЃС‚Рё';
            var link = '/about/news/';
        }
        if(id == 2) {
            $('#list_article').show(0);
            $('#list_news').hide(0);
            $('#list_action').hide(0);
            var linkText = 'Р’СЃРµ СЃС‚Р°С‚СЊРё';
            var link = '/about/articles/';
        }   

        if(id == 3) {
            $('#list_action').show(0);
            $('#list_article').hide(0);
            $('#list_news').hide(0);
            var linkText = 'Р’СЃРµ Р°РєС†РёРё';
            var link = '/about/actions/';
        }

        $('.all_news > span').html(linkText);
        $('.all_news').attr('href',link);

    });

    // РїРµСЂРµРєР»СЋС‡РµРЅРёРµ РЅРѕРІРѕСЃС‚РµР№ Рё СЃС‚Р°С‚РµР№ РЅР° РІРЅСѓС‚СЂРµРЅРЅРµР№
    $('.lnk_inside').on('click', function(){
        $('.lnk_inside').removeClass('activeLnk_inside');
        $(this).addClass('activeLnk_inside');
        var id = $(this).data('id');

        if(id == 1) {
            $('#list_article').hide(0);
            $('#list_news').show(0);
        }
        if(id == 2) {
            $('#list_article').show(0);
            $('#list_news').hide(0);
        }

    });

    $('#reviews').anythingSlider({
        buildNavigation: true,
        buildStartStop: false,
        autoPlay: true,
        delay: 5000,
        expand: true,
        toggleArrows: false,
        hashTags: false
    });

});

    $('.galleryListBlock>.galleryList').each(function(){
        
        var owner = this;            
        
        $(this).on('click','.dropdownBlock .action-close',function(){
            var album = $('.album-open',owner);
            $('body').removeClass('opened-albumviewer').removeClass('isFullscreen');
            $(album).removeClass('album-open').removeClass('album-fullscreen');
            $(document).fullScreen(false);
            $('.galleryListBlock').css('z-index', '1');
        });
        
        $(this).on('click','.dropdownBlock .action-full',function(){
            $('.album-open .dropdownBlock .albumViewer',owner).toggleFullScreen();;         
        });
        
        $(document).bind("fullscreenchange", function() {
            $('.album-open',owner)[$(document).fullScreen()?'addClass':'removeClass']('album-fullscreen');
            $('body')[$(document).fullScreen()?'addClass':'removeClass']('isFullscreen');
        });

        $(document).bind("fullscreenerror", function() {
            $('.album-open',owner).removeClass('album-fullscreen');
            $('body').removeClass('isFullscreen');
        });
        //

        $(this).on('click','.dropdownBlock .albumBlock a',function (){
            $('.galleryListBlock').css('z-index', '99');
            var album = $('.album-open',owner);
            
            $('.dropdownBlock .albumBlock .item',album).removeClass('item-active');
            $(this.parentNode).addClass('item-active');
            $('.previewBlock .image',album).attr('src',this.href);
            
            var idx = $('.dropdownBlock .albumBlock .item-active',album).index();
            
            $('.dropdownBlock .albumNavBlock .step-prev',album)[idx==0?'addClass':'removeClass']('step-inactive');
            $('.dropdownBlock .albumNavBlock .step-next',album)[(idx>=$('.dropdownBlock .albumBlock .item',album).length-1)?'addClass':'removeClass']('step-inactive');
            
            var bW = $(this.parentNode.parentNode.parentNode).width();
            var lW = $(this.parentNode.parentNode).width();
            
            var offset = -(bW/2 - $(this.parentNode).position().left - $(this.parentNode).width()/2);
            
            if (offset<0) {offset = 0}
            if (offset+bW>lW)
            {
                offset = lW - bW;
            }
            
            $('.dropdownBlock .albumBlock',album).stop().animate({scrollLeft:offset});
            
            return false;
        });
        
        $(this).on('click','.dropdownBlock .albumNavBlock .step',function(){
            var album = $('.album-open',owner);
            
            if ($(this).hasClass('step-inactive')) {return false;}
            var idx = $('.dropdownBlock .albumBlock .item-active',album).index();
            
            idx += $(this).hasClass('step-prev')?-1:1;
            
            $('.dropdownBlock .albumBlock .item:eq('+idx+') a',album).click();
        })
        
        this.__openAlbum = function(album,idx)
        {

            
            if (!$(album).hasClass('album-open') )
            {
                if (!$('.dropdownBlock',album).length)
                {
                    $(album).append($("<div class='dropdownBlock'><div class='blockWrapper'><div class='albumViewer'><div class='previewBlock'><div class='blockWrapper'><span class='imageHolder'><span class='imageWrapper'><img src='' class='image' /></span></span></div><div class='albumNavBlock'><span class='step step-prev'></span><span class='step step-next'></span></div><span class='action action-full'>РќР° РІРµСЃСЊ СЌРєСЂР°РЅ</span><span class='action action-close'>Р—Р°РєСЂС‹С‚СЊ</span></div></div></div></div>"));
                    
                    $('>.blockWrapper>.descriptionBlock',album).clone().prependTo($('.dropdownBlock>.blockWrapper',album)).promise();
                    $('>.blockWrapper>.albumBlock',album).clone().prependTo($('.dropdownBlock .albumViewer',album)).promise();
                }
            }
            else
            {
                //$('.dropdownBlock',album).remove();
            }
            
            $(album).toggleClass('album-open');
            if ($(album).hasClass('album-open'))
            {
                $('.dropdownBlock .albumViewer .albumBlock',album).find('.item'+(idx===false?':first-child' : (':eq('+idx+')'))+' a').click();
            }
            $('body').toggleClass('opened-albumviewer');
            $('.album',owner).not(album).removeClass('album-open').removeClass('album-fullscreen');
        }
        
        if ($(this.parentNode).hasClass('galleryListBlock-standalone'))
        {
            $('>.album>.blockWrapper>.albumBlock .item',this).click(function(e){            
                owner.__openAlbum(this.parentNode.parentNode.parentNode.parentNode,$(this).index());
                return false;
            })
        }
        else
        {
            $('>.album>.blockWrapper',this).click(function(e){          
                owner.__openAlbum(this.parentNode,false);
                return false;
            })
        }
    });

    $('.galleryListBlock').each(function(){
        console.log('1111111111111');
        var owner = this;
        $list = $('.albumViewer .galleryList',this);
        // $('.listWrapper',$outer).append($list);

        // if ($('.listWrapper .item').length > 4) {
        //     $('.galleryBlock').append($("<div class='navBlock'><span class='step step-prev'></span><span class='step step-next'></span></div>"));
        // };


        var hash = window.location.hash.split('#');
        var open = false;
        hash = hash[1] || '';
        var idx = false;
        if (hash.length)
        {
            hash = hash.split(';');
            for (i in hash)
            {
                var str = hash[i].split(':');
                if(str[0]=='view' && parseInt(str[1]))
                {
                    idx = parseInt(str[1]);
                    if (idx<0) {idx=0;}
                    if (idx>=$('.item',$list).length) {
                        idx=$('.item',$list).length;
                    }
                    idx--;
                    break;
                }
            }
        }
        $('.item:eq('+(idx || 0)+')',$list).addClass('item-active');

    });
    // РЅРѕРІС‹Р№

    // $('.albumViewer .galleryList .item').click(function() {
    //     var idx = false;

    //     $('.item:eq('+(idx || 0)+')',$list);
    //     window.location.hash = '#view:'+($('.item-active',$list).index()+1);
    //     console.log('1');
    // });

    // СЃС‚Р°СЂС‹Р№

    // $('.galleryList .item', this).on('click', function(){

    //         window.location.hash = '#view:'+($('.item-active',$list).index()+1);
    //         $('.item:eq('+(idx || 0)+')',$list).addClass('item-active');
    //         console.log('1');
    // });

    $(document).mouseup(function (e) {
        var container = $(".dropdownBlock");
        var owner = this;
        var album = $('.album-open',owner);
        if (container.has(e.target).length === 0){
            $('body').removeClass('opened-albumviewer').removeClass('isFullscreen');
            $(album).removeClass('album-open').removeClass('album-fullscreen');
            $(document).fullScreen(false);
            $('.galleryListBlock').css('z-index', '1');
        }
    });
    
    var thisHash = window.location.hash;
    if(window.location.hash) {                      //РџСЂРѕРІРµСЂСЏРµРј РµСЃС‚СЊ Р»Рё # РІ Р°РґСЂРµСЃРµ Рё РѕС‚РєСЂС‹РІР°РµРј С„РѕС‚Рѕ РµСЃР»Рё true.
        $(thisHash).trigger('click');
        console.log('4')
    };

function closeOverlay() {
    $('.overlay').hide();
    $('.b-order').hide();
}

// С„РёРєСЃРёСЂРѕРІР°РЅРёРµ РјРµРЅСЋ РѕС‚ СЃРєСЂРѕР»Р»РёРЅРіР°
$(window).scroll(function(){
    var thisTop = $(this).scrollTop();

    var fixMenu = $('menu');

    if(thisTop>=110) {
        fixMenu.css({position:'fixed'});
        fixMenu.addClass('stat_gray');
    } else {
        fixMenu.css({position:'relative'});
        fixMenu.removeClass('stat_gray');
    }
});

if ($('.lazy').length) {
   $(".lazy").Lazy(); 
}