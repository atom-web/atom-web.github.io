$(document).ready(function(){
if (typeof(ymaps)!=='undefined')
{
	ymaps.ready(function()
	{
		window.__yMap = new ymaps.Map("map", {center: [55.743335,37.549983],zoom:16});
		//window.__yMap.behaviors.disable(['scrollZoom']);
		//, {autoFitToViewport: 'always'}
		// ,controls: ['zoomControl', 'fullscreenControl']

		
		$('.frame-contacts .contactBlock').each(function(){
			$('.cityListBlock',this).on('click','.city',function(){
				var bounds = $(this).data('bounds');
				if (bounds)
				{

					bounds=bounds.split(',');
					window.__yMap.setBounds([[parseFloat(bounds[0])-0.5, parseFloat(bounds[1])-0.5], [parseFloat(bounds[2])+0.5, parseFloat(bounds[3])+0.5]],{duration:1000,checkZoomRange:true}).then(function(){window.__yMap.setZoom(16); window.__yMap.setCenter([parseFloat(bounds[0]),parseFloat(bounds[1])]);});
				}
			});
			
			$('.cityListBlock .city#currentCity',this).click();
			
			$('.locationList .location',this).each(function(){
				var coords = $(this).data('coords');
				if (!coords) {return;}
				coords = coords.split(',');
				if(!coords[0]||!coords[1]) {return;}
				
				var placemark = new ymaps.Placemark(coords, {
					address:'РЎС‚СѓРґРµРЅС‡РµСЃРєР°СЏ СѓР»РёС†Р°, 20',
					phone:'+7 (499) 240-10-01',
					iconContent: $('.contact-address .value',this).text(),
					balloonContentBody: this.innerHTML,
				}, {
					preset: "islands#blackStretchyIcon",
						// Р—Р°РїСЂРµС‚РёРј Р·Р°РјРµРЅСѓ РѕР±С‹С‡РЅРѕРіРѕ Р±Р°Р»СѓРЅР° РЅР° Р±Р°Р»СѓРЅ-РїР°РЅРµР»СЊ.
						// Р•СЃР»Рё РЅРµ СѓРєР°Р·С‹РІР°С‚СЊ СЌС‚Сѓ РѕРїС†РёСЋ, РЅР° РєР°СЂС‚Р°С… РјР°Р»РµРЅСЊРєРѕРіРѕ СЂР°Р·РјРµСЂР° РѕС‚РєСЂРѕРµС‚СЃСЏ Р±Р°Р»СѓРЅ-РїР°РЅРµР»СЊ.
						balloonPanelMaxMapArea: 0
					});
				window.__yMap.geoObjects.add(placemark);
				window.__yMap.setZoom(16);
				
			})
			
			$(this).on('click','.locationList .location',function(){
				$('.location',this.parentNode).removeClass('location-active');
				$(this).addClass('location-active');
				var coords = $(this).data('coords');
				if (!coords) {return;}
				coords = coords.split(',');
				if(!coords[0]||!coords[1]) {return;}
				
				window.__yMap.setBounds([[parseFloat(coords[0])-0.01, parseFloat(coords[1])-0.01], [parseFloat(coords[0])+0.01, parseFloat(coords[1])+0.01]],{duration:1000,checkZoomRange:true});
			})
		})
	})
}

$(function(){
	setTimeout(function() {
     if ($('#share-form').length) {
       $.magnificPopup.open({
        items: {
            src: '#share-form' 
        },
        type: 'inline',
        callbacks: {
		    open: function() {
		      // Will fire when this exact popup is opened
		      // this - is Magnific Popup object
		    },
		    close: function() {
		      var date = new Date(new Date().getTime() + 60*60*24*2*1000);
			  document.cookie = "close_popup_action=1; path=/; expires=" + date.toUTCString();
		    }
		}
        });
       }
     }, 20000);

	$('#open-faq-form').click(function(e) {
		e.preventDefault();
		$('.faq-form-wrapper').toggle();
	});

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

	if ($('.tpl-value .value__item').length > 0) {
        $('.tpl-value .value__item').each(function(index) {
            var owner = 0;
            var size = $(this).find('label').html();
            $(this).find('input').attr('value', size);
            $(this).find('input').attr('id', 'body-item-' + index);
            $(this).find('label').attr('for', 'body-item-' + index)
        });
    };

    $('.galleryItemList').each(function() {
    	var show = $(this).data('show');    	
    	if ($(this).find('.item').length > 6 && show!='all') {
    		$(this).parent().after('<a class="big-btn" id="show-more"><span>РџРѕРєР°Р·Р°С‚СЊ РµС‰Рµ</span></a>');
    		$(this).find('.item').hide().slice( 0, 6 ).css('display', 'inline-block');
    	} else {
    		return true;
    	};
    });

    $('#show-more').click(function() {
    	$(this).hide();
    	$('.catalogListBlock .catalogItemList .item').css('display', 'inline-block');
    	$('.galleryBlock .galleryItemList .item').css('display', 'inline-block');
    });

	$('.ajax-form').each(function(){
		var owner = this;
		var successText = $(this).data('success');

		$(this).submit(function(e) {
			e.preventDefault();
			var fields = $(this).serialize();

			$.ajax({
				url:this.action+'?isNaked=1',
				type: this.method,
				data:fields,
				always: function(data) {

				},
				success: function(data) {
					var success = "<div class='ajaxForm-result'>"+successText+"</div>";
					$(owner).html(success);
				}
				}); // ajax

		});

	});

	$( "#slider" ).slider({
		value:15000,
		min: 15000,
		max: 105000,
		step: 5000,
		slide: function( event, ui ) {
			$( "#amount" ).val( ui.value + " СЂСѓР±" );
		}
	});

		// Р°СЂС…РёРІ/РєР°Р»РµРЅРґР°СЂСЊ

		$('.blog-nav .archive .title').click(function() {


			if ($('.blog-nav .archive').hasClass('archive-active')) {
				$('.container-tags').removeClass('container-tags-active');
				$('.blog-nav .archive').removeClass('archive-active');
				$('.calendar-nav').removeClass('calendar-nav-active');
				$('.calendars').removeClass('calendars-active');
				$('.calendars').slick('unslick');
			} else {
				$('.container-tags').removeClass('container-tags-active');
				$('.blog-nav .archive').addClass('archive-active');
				$('.calendar-nav').addClass('calendar-nav-active');
				$('.calendars').addClass('calendars-active');
				$('.calendars').slick({
					dots: false,
					prevArrow: $('.calendar-nav-prev'),
					nextArrow: $('.calendar-nav-next'),
				});
			}

		});

		$('.blog-nav .right').click(function() {
			$('.blog-nav .archive').removeClass('archive-active');
			$('.calendar-nav').removeClass('calendar-nav-active');
			$('.calendars').removeClass('calendars-active');
			$('.overlay').addClass('overlay-hidden');
		});

		$('.articleListBlock .articleList .new-article-big .text').dotdotdot();

		$( "#amount" ).val( $( "#slider" ).slider( "value" ) + " СЂСѓР±");


		var topPos = $('header').offset().top;
		
		
		$(window).scroll(function() {
			var top = $(document).scrollTop();


			if (top > topPos) {
				$('header').addClass('scroll');
			} 

			else {
				$('header').removeClass('scroll'); 
			}

			
			
		});
		
		function windowSize() {
			if ($('.frame-bottom').length > 0) {
				if ($(window).width() >= '940'){
		            $(function(){
						var topPos = $('.contentBodyBlock .contentAddonBlock').offset().top;
						$(window).scroll(function() { 
							var top = $(document).scrollTop(),
							pip = $('.frame-bottom').offset().top,
							height = $('.contentBodyBlock .contentAddonBlock').outerHeight();
							if (top > topPos && top < pip - height - 100) {$('.contentBodyBlock .contentAddonBlock').addClass('contentAddonBlock-fixed').removeAttr("style");} 
							else if (top > pip - height - 100) {$('.contentBodyBlock .contentAddonBlock').removeClass('contentAddonBlock-fixed').css({'position':'absolute','bottom':'0', 'margin-left':'0'});}
							else {$('.contentBodyBlock .contentAddonBlock').removeClass('contentAddonBlock-fixed');}
						});
					});
		        }
			}			
		};

		$(window).resize(windowSize);
    	$(window).on('load resize',windowSize);

		// 

		if ($('#sertificat-form').length > 0) {
	        $('.cert-open-form div').click(function() {
	            $(this).parent().hide();
	            $('#sertificat-form').css('display', 'block');
	        })
	    };

		$('body').click(function(e){
			if ($(e.target).closest('header .cityBlock').length == 0)
			{
				$('header .cityBlock').removeClass('cityBlock-opened');
			}
			if ($(e.target).closest('header .accountBlock').length == 0)
			{
				$('header .accountBlock').removeClass('accountBlock-opened');
			}
			if ($(e.target).closest('header .cartBlock').length == 0)
			{
				$('header .cartBlock').removeClass('cartBlock-opened');
			}
		})


		$('header').prepend("<span class='menuSwitch'><span></span></span>");
		$('header .menuSwitch').click(function(){
			$(this).parent().toggleClass('menuSwitched');
		});

		$('footer .action-gotop').click(function(){
			$('html,body').stop().animate({scrollTop:0},'slow');

			return false;
		})

		$('header .mainMenuBlock .dropdownBlock').before($("<span class='switch'></span>"));
		$('header .mainMenuBlock').on('click','.item>.switch',function(){
			$(this.parentNode).toggleClass('item-dropped');
		});

		$('.cabinetOrderBlock .orderList').on('click','.orderCharList',function(){
			$(this.parentNode).toggleClass('order-opened');
		})

		$('.extraInfo').on('click','.title',function(){
			$(this.parentNode).toggleClass('extraInfo-opened');
		})

		$('fieldset').on('click','legend',function(){
			$(this.parentNode).toggleClass('isOpened');
		})

		$('header .cityBlock').each(function(){
			$(this).prepend($("<span class='switch'></span>"));
			$('.switch',this).on('click','.title',function(){
				$(this.parentNode.parentNode).toggleClass('cityBlock-opened');
			});
			$(this).on('click','.city',function(){

				$('header .cityBlock .switch').html(this.innerHTML);
				$('header .cityBlock').removeClass('cityBlock-opened');
			})
			var $el = $('.city-active',this).length ? $('.city-active',this) : $('.city:first-child',this);
			$el.click();
		});

		$('header .accountBlock .switch').click(function(){
			$(this.parentNode).toggleClass('accountBlock-opened');
		})

		$('header .cartBlock .switch').click(function(){
			$(this.parentNode).toggleClass('cartBlock-opened');
		})

		$('.registrationSelectBlock').each(function(){
			var owner = this;
			$(this).on('click','.blockHeader .switch', function(){
				var hash = this.href.split('#');
				if (!hash[1]) {return false;}

				$('.registrationBlock',owner).hide();
				console.log('#'+hash[1],$('#'+hash[1],owner));
				$('#'+hash[1],owner).show();

				return false;
			})
			$('.registrationBlock',this).hide();
			$('.registrationBlock:eq(0)',this).show();

		})

		$('.catalogItemGalleryBlock').each(function(){
			$(this).prepend($("<div class='previewBlock'><img src='' class='image' /><strong class='title'></strong></div>"));
			var owner = this; 

			$('.galleryItemList', this).on('click', '.item a', function(){

				$('.galleryItemList .item',owner).removeClass('item-active');
				$(this.parentNode).addClass('item-active');

				var source=this;
				$('.previewBlock',owner).removeClass('previewBlock-withTitle');
				$('.previewBlock .title',owner).html('');
				$('.previewBlock img',owner).fadeOut('slow',function(){
					var img = new Image();
					var preview = this;
					img.onload = function(){
						$(preview).attr('src',this.src);
						$(preview).fadeIn('slow');
						if (source.getAttribute('title'))
						{
							$('.previewBlock',owner).addClass('previewBlock-withTitle');
							$('.previewBlock .title',owner).html(source.getAttribute('title'));
						}
					};
					img.src = source.href;
				});
				return false;
			})
			if ($('.galleryItemList .item-active',this).length)
			{
				$('.galleryItemList .item-active a',this).click();
			}
			else
			{
				$('.galleryItemList .item:first-child a',this).click();
			}

			if ($.fn.magnificPopup)
			{
				var galleryItems = [];
				$('.galleryItemList .item a', owner).each(function(){
					galleryItems.push({src:this.href,type:'image',title:this.getAttribute('title')});
				})

				$('.previewBlock',this).click(function(){
					$.magnificPopup.open({
						tClose: 'Р—Р°РєСЂС‹С‚СЊ (Esc)',
						tLoading: 'Р—Р°РіСЂСѓР·РєР°...',
						gallery: {
							enabled: true,
							tPrev: 'РџСЂРµРґС‹РґСѓС‰РµРµ (&larr;)',
							tNext: 'РЎР»РµРґСѓСЋС‰РµРµ (&rarr;)',
							tCounter: '%curr% РёР· %total%'
						},
						image: {
							tError: 'РџСЂРѕРёР·РѕС€Р»Р° РѕС€РёР±РєР° РїСЂРё Р·Р°РіСЂСѓР·РєРµ <a href="%url%">РёР·РѕР±СЂР°Р¶РµРЅРёСЏ</a>.'
						},
						type: 'image',
						fixedContentPos: true,
						fixedBgPos: true,

						verticalFit: true,

						closeBtnInside: false,
						preloader: false,

						removalDelay: 500,
						mainClass: 'mfp-slide-bottom',
						items: galleryItems
					},$('.galleryItemList .item-active',owner).index())
					return false;
				});


			}

			$(this).addClass('catalogItemGalleryBlock-enabled');
		})


		if ($.fn.magnificPopup)
		{
			$('.galleryBlock',this).magnificPopup({
				delegate:'a',
				tClose: 'Р—Р°РєСЂС‹С‚СЊ (Esc)',
				tLoading: 'Р—Р°РіСЂСѓР·РєР°...',
				gallery: {
					enabled: true,
					tPrev: 'РџСЂРµРґС‹РґСѓС‰РµРµ (&larr;)',
					tNext: 'РЎР»РµРґСѓСЋС‰РµРµ (&rarr;)',
					tCounter: '%curr% РёР· %total%'
				},
				image: {
					tError: 'РџСЂРѕРёР·РѕС€Р»Р° РѕС€РёР±РєР° РїСЂРё Р·Р°РіСЂСѓР·РєРµ <a href="%url%">РёР·РѕР±СЂР°Р¶РµРЅРёСЏ</a>.'
				},
				type: 'image',
				fixedContentPos: true,
				fixedBgPos: true,

				verticalFit: true,

				closeBtnInside: false,
				preloader: false,

				removalDelay: 500,
				mainClass: 'mfp-slide-bottom'
			});

			$('.popup-with-form').magnificPopup({
				type: 'inline',
				preloader: false,
				focus: '#name',

				// When elemened is focused, some mobile browsers in some cases zoom in
				// It looks not nice, so we disable it:
				callbacks: {
					beforeOpen: function() {
						if($(window).width() < 700) {
							this.st.focus = false;
						} else {
							this.st.focus = '#name';
						}

						
					},
					
					open : function(){
						var mp = $.magnificPopup.instance,
						t = $(mp.currItem.el[0]);
						$('#to').val(t.data('item'));
					}	
				}
				
			});
		}

		$('.itemCharList>.char-count .value input').each(function(){
			var owner = this.parentNode;
			$(owner).append("<span class='manipulator'><span class='step step-less'>&ndash;</span><span class='step step-more'>+</span></span>");
			$(owner).on('click','.step',function(){
				var delta = $(this).hasClass('step-less')?-1:1;
				var val = parseInt($('input',owner).val()) || 1;
				val += delta;
				if (val<1)
				{
					val = 1;
				}
				$('input',owner).val(val);
				$('#netshop_cart_contents').submit();
				return false;
			})
		})

		$('.frame-contacts .contactBlock').each(function(){
			var owner=this;

			var html = '';

			$('.cityLocationsBlock',this).each(function(){
				var bounds = [0,0,0,0];
				$('.locationList .location',this).each(function(){
					var coords = $(this).data('coords');
					if (!coords) {return;}
					coords = coords.split(',');
					if(!coords[0]||!coords[1]) {return;}

					if (!bounds[0]) {bounds[0]=coords[0];}
					if (!bounds[2]) {bounds[2]=coords[0];}
					if (!bounds[1]) {bounds[1]=coords[1];}
					if (!bounds[3]) {bounds[3]=coords[1];}

					if (bounds[0]>coords[0]) {bounds[0]=coords[0];}
					if (bounds[2]<coords[0]) {bounds[2]=coords[0];}

					if (bounds[1]>coords[1]) {bounds[1]=coords[1];}
					if (bounds[3]<coords[1]) {bounds[3]=coords[1];}
				})

				bounds = bounds.join(',');


				html += "<li class='city' "+($('h2',this).is('#current') ? 'id="currentCity"':'')+" data-bounds='"+bounds+"'><span class='title'>"+($('h2',this).text() || '???')+"</span></li>";

			})

			$(this).prepend($("<div class='cityListBlock'><ul class='cityList'>"+html+"</ul></div>"));

			$('.cityListBlock',this).on('click','.city',function(){
				$('.cityListBlock .city',owner).removeClass('city-active').eq($(this).index()).addClass('city-active');
				$('.cityLocationsBlock',owner).removeClass('cityLocationsBlock-active');
				$('.cityLocationsBlock:eq('+$(this).index()+')',owner).addClass('cityLocationsBlock-active');
			})

			$('.cityListBlock .city#currentCity',this).click();
		})



		$(window).scroll(function(e){

			$('footer .action-gotop')[$(window).scrollTop()>0 ? 'addClass':'removeClass']('isActive');

		}).scroll();

		if ($.fn.clockpicker)
		{
			$('.field-time input').clockpicker({autoclose:true});
		}
		if ($.fn.pickmeup)
		{
			$('.field-date input').pickmeup({hide_on_select:true,format:'d.m.Y',locale:{days:["Р’РѕСЃРєСЂРµСЃРµРЅСЊРµ","РџРѕРЅРµРґРµР»СЊРЅРёРє","Р’С‚РѕСЂРЅРёРє","РЎСЂРµРґР°","Р§РµС‚РІРµСЂРі","РџСЏС‚РЅРёС†Р°","РЎСѓР±Р±РѕС‚Р°","Р’РѕСЃРєСЂРµСЃРµРЅСЊРµ"],daysShort:["Р’РѕСЃ","РџРѕРЅ","Р’С‚Рѕ","РЎСЂРµ","Р§РµС‚","РџСЏС‚","РЎСѓР±","Р’РѕСЃ"],daysMin:["Р’РЎ","РџРќ","Р’Рў","РЎР ","Р§Рў","РџРў","РЎР‘","Р’РЎ"],months:["РЇРЅРІР°СЂСЊ","Р¤РµРІСЂР°Р»СЊ","РњР°СЂС‚","РђРїСЂРµР»СЊ","РњР°Р№","РСЋРЅСЊ","РСЋР»СЊ","РђРІРіСѓСЃС‚","РЎРµРЅС‚СЏР±СЂСЊ","РћРєС‚СЏР±СЂСЊ","РќРѕСЏР±СЂСЊ","Р”РµРєР°Р±СЂСЊ"],monthsShort:["РЇРЅРІ","Р¤РµРІ","РњР°СЂ","РђРїСЂ","РњР°Р№","РСЋРЅ","РСЋР»","РђРІРі","РЎРµРЅ","РћРєС‚","РќРѕСЏ","Р”РµРє"]}});
		}

		if ($.fn.selectize)
		{
			$('select').selectize({allowEmptyOption:true});
		}

		$('html').removeClass('jsLoading').addClass('jsLoaded');
	})

	function isScrolledIntoView(elem)
{
	var docViewTop = $(window).scrollTop();
	var docViewBottom = docViewTop + $(window).height();
	var elemTop = $(elem).offset().top;
	return ((elemTop <= docViewBottom) && (elemTop >= docViewTop));
}

});
$(document).ready(function(){
	$('.gallery-wrap').slick({
		infinite: true,
		slidesToShow: 3,
		slidesToScroll: 1,
		autoplay: true,
		autoplaySpeed: 2000,
		nextArrow: '<div class="next-arrows"><img src="https://cdn.discordapp.com/attachments/366846227372834817/525322552470405170/right-arrow.svg" alt=""></div>',
		prevArrow: '<div class="prev-arrows"><img src="https://cdn.discordapp.com/attachments/366846227372834817/525322552470405170/right-arrow.svg" alt=""></div>',
	});
});
if ($('.lazy').length) {
   $(".lazy").Lazy(); 
}