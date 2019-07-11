'use strict';

function calc_get_price() {
    if ($('.js-edit-box').val() !== 0) {

        var edit = parseInt($('.js-edit-box').val()),
            price_ticket = 0,
            price_user = 0;

        $('.age_class').each(function () {

            if ($(this).is(':checked')) {
                var params = $(this).attr('data-params'),
                    data = $(this);
                params = JSON.parse(params);
                $.each(params, function (index, value) {
                    var number = parseInt(value['number']),
                        ident = value['ident'];
                    if (number > edit && ident > edit) {
                        var data_price = parseInt(data.attr('data-price'));
                        price_user = data_price / edit;
                        $('.js-total-price').text(data_price);
                    } else if (number >= edit && ident <= edit) {
                        price_user = parseInt(value['price']);

                        var data_price = price_user * edit;
                        $('.js-total-price').text(data_price);
                        return false;
                    }
                });
            }
        });

        var price_ticket = 0;

        $('.number_class').each(function () {

            if ($(this).is(':checked')) {
                var data = $(this);

                price_ticket = parseInt(data.attr('data-price'));

                var data_price = price_ticket * edit;
                $('.js-price-ticket').text(data_price);
            }
        });

        var price_user_ticket = price_ticket + price_user;

        if (price_user_ticket !== Infinity) {
            $('.js-price-user-ticket').text(price_user_ticket);
        } else {
            $('.js-price-user-ticket').text(0);
        }
    } else {
        $('.js-total-price').text(0);
        $('.js-price-ticket').text(0);
        $('.js-price-user-ticket').text(0);
    }
}

// To keep our code clean and modular, all custom functionality will be contained inside a single object literal called "checkboxFilter".

var checkboxFilter = {

    // Declare any variables we will need as properties of the object

    $filters: null,
    $reset: null,
    groups: [],
    outputArray: [],
    outputString: '',

    // The "init" method will run on document ready and cache any jQuery objects we will need.

    init: function init() {
        var self = this; // As a best practice, in each method we will asign "this" to the variable "self" so that it remains scope-agnostic. We will use it to refer to the parent "checkboxFilter" object so that we can share methods and properties between all parts of the object.

        self.$filters = $('#mixed-filters');
        self.$reset = $('#reset-mixed-filter');
        self.$container = $('#filter-mix-сontainer');

        self.$filters.find('fieldset').each(function () {
            self.groups.push({
                $inputs: $(this).find('input'),
                active: [],
                tracker: false
            });
        });

        self.bindHandlers();
    },

    // The "bindHandlers" method will listen for whenever a form value changes.

    bindHandlers: function bindHandlers() {
        var self = this;

        self.$filters.on('change', function () {
            self.parseFilters();
        });

        self.$reset.on('click', function (e) {
            e.preventDefault();
            self.$filters[0].reset();
            self.parseFilters();
        });
    },

    // The parseFilters method checks which filters are active in each group:

    parseFilters: function parseFilters() {
        var self = this;

        // loop through each filter group and add active filters to arrays

        for (var i = 0, group; group = self.groups[i]; i++) {
            group.active = []; // reset arrays
            group.$inputs.each(function () {
                $(this).is(':checked') && group.active.push(this.value);
            });
            group.active.length && (group.tracker = 0);
        }

        self.concatenate();
    },

    // The "concatenate" method will crawl through each group, concatenating filters as desired:

    concatenate: function concatenate() {
        var self = this,
            cache = '',
            crawled = false,
            checkTrackers = function checkTrackers() {
            var done = 0;

            for (var i = 0, group; group = self.groups[i]; i++) {
                group.tracker === false && done++;
            }

            return done < self.groups.length;
        },
            crawl = function crawl() {
            for (var i = 0, group; group = self.groups[i]; i++) {
                group.active[group.tracker] && (cache += group.active[group.tracker]);

                if (i === self.groups.length - 1) {
                    self.outputArray.push(cache);
                    cache = '';
                    updateTrackers();
                }
            }
        },
            updateTrackers = function updateTrackers() {
            for (var i = self.groups.length - 1; i > -1; i--) {
                var group = self.groups[i];

                if (group.active[group.tracker + 1]) {
                    group.tracker++;
                    break;
                } else if (i > 0) {
                    group.tracker && (group.tracker = 0);
                } else {
                    crawled = true;
                }
            }
        };

        self.outputArray = []; // reset output array

        do {
            crawl();
        } while (!crawled && checkTrackers());

        self.outputString = self.outputArray.join();

        // If the output string is empty, show all rather than none:

        !self.outputString.length && (self.outputString = 'all');

        console.log(self.outputString);

        // ^ we can check the console here to take a look at the filter string that is produced

        // Send the output string to MixItUp via the 'filter' method:

        if (self.$container.mixItUp('isLoaded')) {
            self.$container.mixItUp('filter', self.outputString);
        }
    }
};

function menuToggle() {
    $('.menu-toggle').click(function () {
        $('.js-search').removeClass('is-open');
        $('.top-menu ul').find('.is-open').removeClass('is-open');
        $('.top-menu ul').removeAttr('style');
        var menu = $(this).attr('data-toggle');
        $(this).toggleClass('active');
        $('[data-toggle="' + menu + '"]').not($(this)).stop().slideToggle();
        return false;
    });
}

function footerPlaceholder() {
    $('.footer_placeholder').height($('.footer').outerHeight());
}

function scrollDown() {
    $('.js-scrolldown a').click(function () {
        var scroll = $(this).attr('href'),
            body = $('html, body'),
            scrolltop = $('.js-scroll-section[data-scroll="' + scroll + '"]').offset().top;
        $('.js-scrolldown').removeClass('active');
        $(this).addClass('active');
        if (scrolltop) {
            body.stop().animate({ scrollTop: scrolltop }, 500, 'swing');
        }
        return false;
    });
}

$(document).ready(function () {
    footerPlaceholder();
    menuToggle();
    scrollDown();
    $('.js-search-trigger').click(function () {
        $('.js-search').toggleClass('is-open');
        return false;
    });

    $(document).click(function (e) {
        var container = $(".js-search");
        if (container.has(e.target).length === 0) {
            container.removeClass('is-open');
        }
    });

    /*https://github.com/souravm84/vidbacking*/
    if ($(window).width() > 991 && $('.video-back').length > 0) {
        var block = $('.video-back');
        var videomp4 = block.attr('data-src-mp4');
        var videowebm = block.attr('data-src-webm');
        var poster = block.attr('data-poster');
        var video = '<video poster="' + poster + '" autoplay muted loop class="vidbacking">\n                    <source src="' + videowebm + '" type="video/webm">\n                    <source src="' + videomp4 + '" type="video/mp4">\n                    </video>';
        block.append(video);
        block.vidbacking({
            //'masked': true
        });
    }

    $(document).on('click', '.mobile-open', function () {
        $(this).toggleClass('is-open');
        $(this).closest('li').toggleClass('is-open');
        $(this).closest('li').find('>ul').slideToggle();
    });

    $('.js-toggle-view').click(function () {
        if (!$(this).is('.active')) {
            var view = $(this).attr('data-view');
            $('.js-toggle-view').removeClass('active');
            $(this).addClass('active');
            $('.js-quests-filter').removeClass('quests-grid quests-list');
            $('.js-quests-filter').addClass(view);
        }
        return false;
    });

    $('.js-toggle-mobile-filter').click(function () {
        $('.mixed-filters').toggleClass('active');
    });

    if ($(".js-calc-slider").length > 0) {
        var col = $(".js-calc-slider").attr('data-col');
        $(".js-calc-slider").slider({
            min: 0,
            max: col,
            step: 1,
            orientation: 'horizontal',
            animate: true,
            range: 'min',
            value: 0
        }).each(function () {
            var opt = $(this).data().uiSlider.options;
            var vals = opt.max - opt.min;
            for (var i = 0; i <= vals; i = i + 10) {
                var el = i === 0 ? $('<div class="slider-label">' + ' | <div class="slider-label__first">' + i + '</div></div>').css({
                    'left': '1%',
                    'width': '10px'
                }) : $('<div class="slider-label">' + ' | <div class="slider-label__other"">' + i + '</div></div>').css('left', i / vals * 100 + '%');
                $(".js-calc-slider").append(el);
            }
        });

        var pole = $(".js-edit-box"),
            slid = $(".js-calc-slider");
        slid.slider({
            change: function change(slid, p) {
                pole.val(p.value);
            },
            slide: function slide(slid, p) {
                pole.val(p.value);
                calc_get_price();
            }
        });
        pole.val(0).focusout(function () {
            slid.slider("value", this.value);
        }).focusout();
    }

    $('.js-order-quest').on('click', function (e) {
        var email = $('.js-calc-email').val(),
            phone = $('.js-calc-phone').val(),
            col = parseInt($('.js-edit-box').val()),
            price = $('.js-price-user-ticket').text(),
            price_ticket = $('.js-price-ticket').text(),
            price_quest = $('.js-total-price').text(),
            str = window.location.pathname,
            age = '',
            ticket = '';
        $('.age_class').each(function () {
            if ($(this).is(':checked')) {
                age = $(this).closest('label').find('.label-text').text();
            }
        });
        $('.number_class').each(function () {
            if ($(this).is(':checked')) {
                ticket = $(this).closest('label').find('.label-text').text();
            }
        });
        if (email != '' || phone != '+7' && phone != '') {
            $.ajax({
                type: 'POST',
                url: '/lib/ajax/calc_ajax.php',
                data: {
                    action: 'get_mail',
                    email: email,
                    phone: phone,
                    age: age,
                    col: col,
                    str: str,
                    price: price,
                    price_ticket: price_ticket,
                    price_quest: price_quest,
                    ticket: ticket
                },
                success: function success(data) {
                    if (data === 1) {
                        $('.js-calc-alert').removeClass('error').addClass('success');
                        $('.js-calc-alert').text('Успешно');
                    }
                },
                error: function error(err) {
                    $('.js-calc-alert').addClass('error');
                    $('.js-calc-alert').text('Ошибка сервера, попробуйте позже');
                }
            });
        } else {
            $('.js-calc-alert').addClass('error');
            $('.js-calc-alert').text('Проверте правильность заполнения формы');
        }
    });

    $('.js-calc-phone').on('input', function () {
        if (this.value.match(/[^0-9]/g)) {
            this.value = this.value.replace(/[^0-9+]/g, '');
        }
    });

    $('.js-calc-email').bind("change keyup input", function () {
        $('.input-alert-nodel').hide();
        if (this.value.match(/[^a-z0-9_@.-]/g)) {
            this.value = this.value.replace(/[^a-z0-9_@.-]/g, '');
            this.focus();
        }
    });

    var mail = $('.js-calc-email');
    mail.blur(function () {
        var pattern = /^[a-z0-9_-]+@[a-z0-9-]+\.[a-z]{2,6}$/i;
        if (mail.val().search(pattern) != 0) {
            $('.input-alert-nodel').show();
        }
    });

    $('.js-radio-wrap input[type="radio"]').change(function () {
        calc_get_price();
    });

    if ($('.jarallax').length > 0 && $(window).width() > 992) {
        $('.jarallax').jarallax({
            disableParallax: function disableParallax() {
                return true;
            }
        });
    }
    if ($('.slick-gallery').length > 0) {
        $('.js-slider-for').slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: true,
            fade: true,
            asNavFor: '.js-slider-nav'
        });
        $('.js-slider-nav').slick({
            slidesToShow: 5,
            slidesToScroll: 1,
            asNavFor: '.js-slider-for',
            focusOnSelect: true,
            centerMode: true,
            arrows: false
        });
    }
    if ($('.js-slick-carousel').length > 0) {
        $('.js-slick-carousel').slick({
            slidesToShow: 6,
            slidesToScroll: 4,
            dots: false,
            centerMode: true,
            responsive: [{
                breakpoint: 1600,
                settings: {
                    slidesToShow: 5,
                    slidesToScroll: 3
                }
            }, {
                breakpoint: 1280,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 2
                }
            }, {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 2
                }
            }, {
                breakpoint: 992,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1
                }
            }, {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }]
        });
    }

    $('.top-menu ul li').each(function () {
        if ($(this).find('ul').length > 0) {
            $(this).addClass('has-submenu');
            $(this).append('<div class="mobile-open"></div>');
        }
    });

    // Instantiate MixItUp

    if ($('#filter-mix-сontainer').length > 0) {
        checkboxFilter.init();
        $('#filter-mix-сontainer').mixItUp({
            controls: {
                enable: false
            }
            // animation: {
            //     easing: 'cubic-bezier(0.86, 0, 0.07, 1)',
            //     duration: 600
            // }
        });
    }

    var loadFont = function loadFont(e) {
        var n = new XMLHttpRequest();
        n.open("GET", e, !0), n.onreadystatechange = function () {
            if (4 == n.readyState && 200 == n.status) {
                var e = n.responseText;
                e = e.replace(/}/g, "font-display: swap; }");
                var t = document.getElementsByTagName("head")[0],
                    a = document.createElement("style");
                a.appendChild(document.createTextNode(e)), t.appendChild(a);
            }
        }, n.send();
    };
    loadFont('https://fonts.googleapis.com/css?family=Open+Sans:300,300i,400,400i,600,600i,700,700i,800,800i&amp;subset=cyrillic');

    $('.sidebar').stick_in_parent();
});

$(window).resize(function () {
    footerPlaceholder();
    $('.top-menu ul li').find('is-open').removeClass('is-open');
    $('.top-menu ul').removeAttr('style');
});

// function toggleClassFixedCalc(block,fixedBlock,placeholder,finishBlock) {
//     var windowHeight = $(window).height();
//     var scrollTop = $(window).scrollTop();
//     var blockTop = typeof block !== "undefined" ?  block.offset().top : 0;
//     var blockHeight = typeof fixedBlock !== "undefined" ?  fixedBlock.height() : 0;
//     var windowBottom = scrollTop + windowHeight;
//     var finishBlockTop = typeof fixedBlock !== "undefined" ? finishBlock.offset().top : 0;
//     var bottomPos = finishBlockTop-windowBottom;
//
//
//     if(windowBottom>=blockTop+blockHeight+20) {
//         $('body').on('mousewheel', function(event) {
//             if(event.deltaY === 1) {
//                 console.log('крутим вверх');
//             } else {
//                 console.log('крутим вниз');
//             }
//         });
//         placeholder.height(blockHeight + fixedBlock.offset().top).removeClass('hidden');
//         fixedBlock.addClass('fixed');
//     } else {
//         placeholder.height(0).addClass('hidden');
//         fixedBlock.removeClass('fixed');
//     }
//
//     if(windowBottom>=finishBlockTop) {
//         fixedBlock.css({'bottom': Math.abs(bottomPos)+10});
//         placeholder.height(finishBlockTop-blockTop);
//     } else {
//         fixedBlock.removeAttr('style');
//     }
// }


$(window).scroll(function () {
    // if($(window).width()>=992 && $('.js-fixed-calc').length>0) {
    //     toggleClassFixedCalc($('.sidebar'),$('.js-fixed-calc'),$('.js-fixed-calc-placeholder'), $('[data-scroll="#reviews"]'));
    // }
});