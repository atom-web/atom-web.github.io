/*
	Masked Input plugin for jQuery
	Copyright (c) 2007-2013 Josh Bush (digitalbush.com)
	Licensed under the MIT license (http://digitalbush.com/projects/masked-input-plugin/#license)
	Version: 1.3.1
	*/
	(function(e){function t(){var e=document.createElement("input"),t="onpaste";return e.setAttribute(t,""),"function"==typeof e[t]?"paste":"input"}var n,a=t()+".mask",r=navigator.userAgent,i=/iphone/i.test(r),o=/android/i.test(r);e.mask={definitions:{9:"[0-9]",a:"[A-Za-z]","*":"[A-Za-z0-9]"},dataName:"rawMaskFn",placeholder:"_"},e.fn.extend({caret:function(e,t){var n;if(0!==this.length&&!this.is(":hidden"))return"number"==typeof e?(t="number"==typeof t?t:e,this.each(function(){this.setSelectionRange?this.setSelectionRange(e,t):this.createTextRange&&(n=this.createTextRange(),n.collapse(!0),n.moveEnd("character",t),n.moveStart("character",e),n.select())})):(this[0].setSelectionRange?(e=this[0].selectionStart,t=this[0].selectionEnd):document.selection&&document.selection.createRange&&(n=document.selection.createRange(),e=0-n.duplicate().moveStart("character",-1e5),t=e+n.text.length),{begin:e,end:t})},unmask:function(){return this.trigger("unmask")},mask:function(t,r){var c,l,s,u,f,h;return!t&&this.length>0?(c=e(this[0]),c.data(e.mask.dataName)()):(r=e.extend({placeholder:e.mask.placeholder,completed:null},r),l=e.mask.definitions,s=[],u=h=t.length,f=null,e.each(t.split(""),function(e,t){"?"==t?(h--,u=e):l[t]?(s.push(RegExp(l[t])),null===f&&(f=s.length-1)):s.push(null)}),this.trigger("unmask").each(function(){function c(e){for(;h>++e&&!s[e];);return e}function d(e){for(;--e>=0&&!s[e];);return e}function m(e,t){var n,a;if(!(0>e)){for(n=e,a=c(t);h>n;n++)if(s[n]){if(!(h>a&&s[n].test(R[a])))break;R[n]=R[a],R[a]=r.placeholder,a=c(a)}b(),x.caret(Math.max(f,e))}}function p(e){var t,n,a,i;for(t=e,n=r.placeholder;h>t;t++)if(s[t]){if(a=c(t),i=R[t],R[t]=n,!(h>a&&s[a].test(i)))break;n=i}}function g(e){var t,n,a,r=e.which;8===r||46===r||i&&127===r?(t=x.caret(),n=t.begin,a=t.end,0===a-n&&(n=46!==r?d(n):a=c(n-1),a=46===r?c(a):a),k(n,a),m(n,a-1),e.preventDefault()):27==r&&(x.val(S),x.caret(0,y()),e.preventDefault())}function v(t){var n,a,i,l=t.which,u=x.caret();t.ctrlKey||t.altKey||t.metaKey||32>l||l&&(0!==u.end-u.begin&&(k(u.begin,u.end),m(u.begin,u.end-1)),n=c(u.begin-1),h>n&&(a=String.fromCharCode(l),s[n].test(a)&&(p(n),R[n]=a,b(),i=c(n),o?setTimeout(e.proxy(e.fn.caret,x,i),0):x.caret(i),r.completed&&i>=h&&r.completed.call(x))),t.preventDefault())}function k(e,t){var n;for(n=e;t>n&&h>n;n++)s[n]&&(R[n]=r.placeholder)}function b(){x.val(R.join(""))}function y(e){var t,n,a=x.val(),i=-1;for(t=0,pos=0;h>t;t++)if(s[t]){for(R[t]=r.placeholder;pos++<a.length;)if(n=a.charAt(pos-1),s[t].test(n)){R[t]=n,i=t;break}if(pos>a.length)break}else R[t]===a.charAt(pos)&&t!==u&&(pos++,i=t);return e?b():u>i+1?(x.val(""),k(0,h)):(b(),x.val(x.val().substring(0,i+1))),u?t:f}var x=e(this),R=e.map(t.split(""),function(e){return"?"!=e?l[e]?r.placeholder:e:void 0}),S=x.val();x.data(e.mask.dataName,function(){return e.map(R,function(e,t){return s[t]&&e!=r.placeholder?e:null}).join("")}),x.attr("readonly")||x.one("unmask",function(){x.unbind(".mask").removeData(e.mask.dataName)}).bind("focus.mask",function(){clearTimeout(n);var e;S=x.val(),e=y(),n=setTimeout(function(){b(),e==t.length?x.caret(0,e):x.caret(e)},10)}).bind("blur.mask",function(){y(),x.val()!=S&&x.change()}).bind("keydown.mask",g).bind("keypress.mask",v).bind(a,function(){setTimeout(function(){var e=y(!0);x.caret(e),r.completed&&e==x.val().length&&r.completed.call(x)},0)}),y()}))}})})(jQuery);

	var s_params = { isNaked:1 };

	function objectSearch() {
		
		console.log(s_params);
		$.get('/projects/',s_params, function(data){
				$('#projects').html(data);
				console.log(data);
		});
	}



	$(function(){
		$('html').removeClass('jsLoading');

		$('select.tags').selectize({
			plugins: ['remove_button'],
        	onChange: function(data) {

            	s_params['tags'] = data;
            	objectSearch();
        	}
		});


		$('select.city').selectize({
        	allowEmptyOption:true
		});

		$('.price__btn').click(function() {
			$('.product-modal').addClass('product-modal__active');
			$('#product-modal-form select').styler();
			$('body').css('overflow', 'hidden');
		});

		$('.tile-filter input').styler();

		
		if ($(window).width() >= '720') {
			$('.item-sub').hover(function() {
				$(this).find('.subMenuBlock').addClass('submenu-active');
			}, 
			function() {
				$(this).find('.subMenuBlock').removeClass('submenu-active');
			});
		}

		$('.action__btn').click(function() {
			$('.product-modal__common').addClass('product-modal__active');
			$('body').css('overflow', 'hidden');
		});

		$('#close-modal, .modal-close__text, .product-modal-bg').click(function() {
			$('.product-modal').removeClass('product-modal__active');
			$('body').css('overflow', 'auto');
		});

		$('#close-modal__common, .modal-close__text, .product-modal-bg').click(function() {
			$('.product-modal__common').removeClass('product-modal__active');
			$('body').css('overflow', 'auto');
		});

		$('#test').hide('slide', {direction: 'left'}, 1000);

		$('.form-filter-icon').click(function() {
			$(this).hide();
			$('.frame').find('.tile-filter-wrap').css('z-index', '101');
			$('.frame').find('form.tile-filter').addClass('tile-filter__active');
			$('body').append('<div class="filter-bg"></div>').css('overflow-y', 'hidden');
		});

		if ($(window).width() <= '630') {
			$('.close-filter, .filter-submit').click(function() {
				$('.frame').find('form.tile-filter').removeClass('tile-filter__active');
				$('.frame').find('.form-filter-icon').show();
				$('.frame').find('.tile-filter-wrap').css('z-index', '0');
				$('body').css('overflow-y', 'auto');
				$("div.filter-bg").remove();
			});
		}

		var touchHover = function() {
		    if ($(window).width() <= '720'){
		        $('[data-hover]').click(function(e){
		            e.preventDefault();
		            var $this = $(this);
		            var onHover = $this.attr('data-hover');
		            var linkHref = $this.attr('href');
		            $('.item-sub ul').slideDown();
		            $this.siblings('ul').slideUp();
		            if (linkHref && $this.hasClass(onHover)) {
		                location.href = linkHref;
		                return false;
		            }
		            $this.toggleClass(onHover);
		        });
		    };
		};

		touchHover();

	$('.ajax-form').each(function() {
		

		$(this).submit(function(e) {
			e.preventDefault();
			var fields = $(this).serialize();
			var message = $(this).data('message');

			$.ajax({
				url: this.action+'?isNaked=1',
				type: this.method,
				data: fields,
				success: function(data) {
					var success = "<div class='ajaxForm-result'>"+message+"</div>";
					$('.ajax-form .left').append(success);
				} // success
			});// ajax

		});

		

		
	});

		if ($('.prod-slider').length > 0) {
			if ($('.slider-prod-item-top a').length > 1) {
				$('.slider-prod-item-top').slick({
					slidesToShow: 1,
					slidesToScroll: 1,
					arrows: false,
					dots: false,
					asNavFor: '.slider-prod-item-bottom'
				});
				$('.slider-prod-item-bottom').slick({
					slidesToShow: 4,
					slidesToScroll: 1,
					asNavFor: '.slider-prod-item-top',
					arrows: true,
					focusOnSelect: true,
					margin: '4px',
					prevArrow: $('.prev'),
					nextArrow: $('.next'),
				});
			} else {
				$('.slider-prod-item-bottom').hide();
			}
			$('.slider-prod-item-top').magnificPopup({
				delegate: 'a:not(.slick-cloned)', // the selector for gallery item
		        type: 'image',
		        tLoading: 'Загрузка...',
		        gallery: {
		          enabled:true,
		          navigateByImgClick: true
		        }
		    });
		}

		$('.tabs div').click(function() {
			var tab_id = $(this).attr('data-tab');

			$('.tabs div').removeClass('active');
			$('.tab-item').removeClass('show');

			$(this).addClass('active');
			$("#"+tab_id).addClass('show');
		});

		var price = parseFloat($('.modal-price__is').text());
		var quantity = parseInt($('.calc-col').find('input').val());

		$('.calc-col input').keyup( function(calc) {
			var quantity = parseInt($(this).val());
			var newPrice = price*quantity;
			newPrice = newPrice.toFixed(3);
			var result = $('.sum .sum__sum').text(newPrice);
		});

		$(function() {
			var valueInput = $('.calc-col input').val();

			$('.calc-col .minus').click(function() {
				if (valueInput == 1) return;
				valueInput--;
				$('.calc-col input').val(valueInput);
				
				var quantity = parseInt($('.calc-col input').val());
				var newPrice = price*quantity;
				newPrice = newPrice.toFixed(3);
				var result = $('.sum .sum__sum').text(newPrice);
			});

			$('.calc-col .plus').click(function() {
				valueInput++;
				$('.calc-col input').val(valueInput);
				
				var quantity = parseInt($('.calc-col input').val());
				var newPrice = price*quantity;
				newPrice = newPrice.toFixed(3);
				var result = $('.sum .sum__sum').text(newPrice);
			});
		});

	// calc product

	$('.product-modal-content .right .link').click(function() {
		$('.product-modal-content .right .comment').show();
	});

	var $size = $('#product-size'),
	$input = $('.filter-item__radio input'),
	$summ = $('.product__price .bold'),
	prices = {
		1: { 1: 23600, 2: 26000, 3: 29600, 4: 32000 },
		2: { 1: 23400, 2: 25700, 3: 29400, 4: 31700 }
	}
	;

	function update() {
		var size = $size.val(); // option СЂР°Р·РјРµСЂР°
		var input = $input.val();
		console.log(input);
		$summ.text( prices[size]  &&  prices[size][input]);
		$input.click(function() {
			$summ.text( prices[size][input] );
		});
	};

	$size.on('change', update);
	$input.on('change', update);


	// end

	$('.feed-gallery').magnificPopup({
		delegate: 'a', // the selector for gallery item
        type: 'image',
        gallery: {
          enabled:true
        }
    });

	$('header .menuBlock').prepend("<span class='switch'></span>");
	$('header .menuBlock .switch').click(function(){
		$(this.parentNode).toggleClass('menuBlock-active');
	});

	$('.main-feedback input, .main-feedback textarea').click(function() {
		$('.main-feedback_disabled').addClass('main-feedback_active');
		$('.main-feedback__slide_disable').addClass('main-feedback__slide_active');
		$('.main-feedback textarea').addClass('main-feedback__textarea_active')
	});

	$('.main-feedback__slide').click(function() {
		$('.main-feedback_disabled').toggleClass('main-feedback_active');
		$('.main-feedback__slide_disable').toggleClass('main-feedback__slide_active');
		$('.main-feedback textarea').toggleClass('main-feedback__textarea_active')
	});

	$('#form-phone').mask("(999) 999-99-99");
	
	$('section.frame-promo .bannerBlock, section.frame-banner .bannerBlock').each(function(){
		var owner = this;
		var timer = $(this).attr('data-auto-interval') || 0;
		this.__count = $('.banner',this).length;
		if (this.__count<2)
		{
			$('.banner',this).addClass('banner-active');
			return false;
		}
		this.__current = $('.banner:visible').index()+1 || 1;
		var html = [];
		var title=''
		for(var i=1; i<=this.__count; i++)
		{
			title = $('.banner',this).eq(i-1).find('.body .title').html();
			html.push(title || i);
		}
		$(this).append("<div class='sliderNav'><span class='step step-prev'></span><span class='step step-next'></span> <ul class='slideList'><li class='slide'>"+html.join("</li><li class='slide'>")+"</li></ul></div>");

		this.__slideTo = function(idx){
			idx = typeof(idx)=='undefined'?this.__current:idx;
			
			if (idx>this.__count)
			{
				idx = 1;
			}
			
			if (idx<1)
			{
				idx = this.__count;
			}
			
			this.__current = idx;
			
			$('.banner',this).removeClass('banner-active');
			$('.sliderNav .slideList .slide',this).removeClass('slide-active');
			$('.banner:eq('+(idx-1)+')',this).addClass('banner-active');
			$('.sliderNav .slideList .slide:eq('+(idx-1)+')',this).addClass('slide-active');
			$(".sliderNav .slide .meter",this).width(0);
			
			if (this.__timer) {clearInterval(this.__timer);}
			this.__ticker = 0;
			
			if (timer)
			{
				this.__timer=setInterval(function(){
					owner.__ticker+=25/timer;
					if (owner.__ticker>100)
					{
						owner.__slideTo(owner.__current+1);
					}
					$(".sliderNav .slide-active .meter",owner).width(owner.__ticker+'%');
				},250);
			}
		}
		this.__slideTo();
		$('.sliderNav',this).on('click','.step',function(){
			var direction = $(this).hasClass('step-prev')?-1:1;
			owner.__slideTo(owner.__current+direction);
			
			return false;	
		})
		$('.sliderNav',this).on('click','.slide',function(){
			var idx = $(this).index();
			owner.__slideTo(idx+1);
			
			return false;	
		})
		$('.sliderNav .slide:eq(0)',this).click();
	})
	
	$('section.frame-promo .bannerBlock .sliderNav').each(function(){
		var count = $('.slide',this).length;
		$('.slide',this).css('width',(100/count)+'%').append($("<i class='meter'></i>"));		
	});
	
	$('section.frame-news .newsListBlock').each(function(){
		$('.blockWrapper', this).prepend("<div class='sliderNav'><span class='step step-prev'></span><span class='step step-next'></span></div>");
		
		var owner = $('.blockWrapper', this);
		var list = $('.newsList',this);
		
		$('.sliderNav',this).on('click','.step',function(){
			var direction = $(this).hasClass('step-prev') ? -1 : 1;
			
			var offset = list.position();
			direction = -offset.left + direction * list.parent().width();
			
			if (direction<0)
			{
				direction = 0;
			}
			if (direction+list.parent().width()>list.width())
			{
				direction = list.width() - list.parent().width();
			}
			
			list.css('left',-direction);
			return false;	
		})
	})
	
	if ($.fn.magnificPopup)
	{
		$('.galleryBlock').magnificPopup({
			delegate: '.galleryItem a',
			closeBtnInside: false,
			type:'image',
			gallery: {
				enabled: true,
				navigateByImgClick: true,
				preload: [0,1], // Will preload 0 - before current, and 1 after the current image
				tPrev: 'Предыдущая (&larr;)', // Alt text on left arrow
				tNext: 'Следующая (&rarr;)', // Alt text on right arrow
				tCounter: '%curr% из %total%' // Markup for "1 of 7" counter
			},
			image: {
				tError: '<a href="%url%">Изображение #%curr%</a> не может быть загружено.',
				verticalFit: true,
				titleSrc: function(item) {
					return item.el.attr('data-title') || item.el.attr('title');
				}
			},
			removalDelay: 300,
			mainClass: 'mfp-slide-bottom',
			callbacks: {
				beforeOpen: function() {
					$('body').addClass('lightboxed');
					this.st.image.markup = this.st.image.markup.replace('mfp-figure', 'mfp-figure mfp-with-anim');
				},
				elementParse: function(item) {
					item.type = (item.src.match(/\.(jpeg|jpg|gif|png)$/) != null) ? 'image' : 'iframe';
				},
				afterClose: function() {
					$('body').removeClass('lightboxed');
				},
			},
			tLoading: 'Загрузка изображения #%curr%...',
			tClose: 'Закрыть (Esc)', // Alt text on close button
		});

		
	};

	
})
if ($('.lazy').length) {
   $(".lazy").Lazy(); 
}