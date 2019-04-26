/*
 * jQuery Form Styler v2.0.0
 * https://github.com/Dimox/jQueryFormStyler
 *
 * Copyright 2012-2017 Dimox (http://dimox.name/)
 * Released under the MIT license.
 *
 * Date: 2017.05.08
 *
 */

;(function(factory) {
	if (typeof define === 'function' && define.amd) {
		// AMD
		define(['jquery'], factory);
	} else if (typeof exports === 'object') {
		// CommonJS
		module.exports = factory($ || require('jquery'));
	} else {
		factory(jQuery);
	}
}(function($) {

	'use strict';

	var pluginName = 'styler',
			defaults = {
				idSuffix: '-styler',
				filePlaceholder: 'Р¤Р°Р№Р» РЅРµ РІС‹Р±СЂР°РЅ',
				fileBrowse: 'РћР±Р·РѕСЂ...',
				fileNumber: 'Р’С‹Р±СЂР°РЅРѕ С„Р°Р№Р»РѕРІ: %s',
				selectPlaceholder: 'Р’С‹Р±РµСЂРёС‚Рµ...',
				selectSearch: false,
				selectSearchLimit: 10,
				selectSearchNotFound: 'РЎРѕРІРїР°РґРµРЅРёР№ РЅРµ РЅР°Р№РґРµРЅРѕ',
				selectSearchPlaceholder: 'РџРѕРёСЃРє...',
				selectVisibleOptions: 0,
				selectSmartPositioning: true,
				locale: 'ru',
				locales: {
					'en': {
						filePlaceholder: 'No file selected',
						fileBrowse: 'Browse...',
						fileNumber: 'Selected files: %s',
						selectPlaceholder: 'Select...',
						selectSearchNotFound: 'No matches found',
						selectSearchPlaceholder: 'Search...'
					}
				},
				onSelectOpened: function() {},
				onSelectClosed: function() {},
				onFormStyled: function() {}
			};

	function Plugin(element, options) {
		this.element = element;
		this.options = $.extend({}, defaults, options);
		var locale = this.options.locale;
		if (this.options.locales[locale] !== undefined) {
			$.extend(this.options, this.options.locales[locale]);
		}
		this.init();
	}

	Plugin.prototype = {

		// РёРЅРёС†РёР°Р»РёР·Р°С†РёСЏ
		init: function() {

			var el = $(this.element);
			var opt = this.options;

			var iOS = (navigator.userAgent.match(/(iPad|iPhone|iPod)/i) && !navigator.userAgent.match(/(Windows\sPhone)/i)) ? true : false;
			var Android = (navigator.userAgent.match(/Android/i) && !navigator.userAgent.match(/(Windows\sPhone)/i)) ? true : false;

			function Attributes() {
				if (el.attr('id') !== undefined && el.attr('id') !== '') {
					this.id = el.attr('id') + opt.idSuffix;
				}
				this.title = el.attr('title');
				this.classes = el.attr('class');
				this.data = el.data();
			}

			// checkbox
			if (el.is(':checkbox')) {

				var checkboxOutput = function() {

					var att = new Attributes();
					var checkbox = $('<div class="jq-checkbox"><div class="jq-checkbox__div"></div></div>')
						.attr({
							id: att.id,
							title: att.title
						})
						.addClass(att.classes)
						.data(att.data)
					;

					el.after(checkbox).prependTo(checkbox);
					if (el.is(':checked')) checkbox.addClass('checked');
					if (el.is(':disabled')) checkbox.addClass('disabled');

					// РєР»РёРє РЅР° РїСЃРµРІРґРѕС‡РµРєР±РѕРєСЃ
					checkbox.click(function(e) {
						e.preventDefault();
						el.triggerHandler('click');
						if (!checkbox.is('.disabled')) {
							if (el.is(':checked')) {
								el.prop('checked', false);
								checkbox.removeClass('checked');
							} else {
								el.prop('checked', true);
								checkbox.addClass('checked');
							}
							el.focus().change();
						}
					});
					// РєР»РёРє РЅР° label
					el.closest('label').add('label[for="' + el.attr('id') + '"]').on('click.styler', function(e) {
						if (!$(e.target).is('a') && !$(e.target).closest(checkbox).length) {
							checkbox.triggerHandler('click');
							e.preventDefault();
						}
					});
					// РїРµСЂРµРєР»СЋС‡РµРЅРёРµ РїРѕ Space РёР»Рё Enter
					el.on('change.styler', function() {
						if (el.is(':checked')) checkbox.addClass('checked');
						else checkbox.removeClass('checked');
					})
					// С‡С‚РѕР±С‹ РїРµСЂРµРєР»СЋС‡Р°Р»СЃСЏ С‡РµРєР±РѕРєСЃ, РєРѕС‚РѕСЂС‹Р№ РЅР°С…РѕРґРёС‚СЃСЏ РІ С‚РµРіРµ label
					.on('keydown.styler', function(e) {
						if (e.which == 32) checkbox.click();
					})
					.on('focus.styler', function() {
						if (!checkbox.is('.disabled')) checkbox.addClass('focused');
					})
					.on('blur.styler', function() {
						checkbox.removeClass('focused');
					});

				}; // end checkboxOutput()

				checkboxOutput();

				// РѕР±РЅРѕРІР»РµРЅРёРµ РїСЂРё РґРёРЅР°РјРёС‡РµСЃРєРѕРј РёР·РјРµРЅРµРЅРёРё
				el.on('refresh', function() {
					el.closest('label').add('label[for="' + el.attr('id') + '"]').off('.styler');
					el.off('.styler').parent().before(el).remove();
					checkboxOutput();
				});

			// end checkbox

			// radio
			} else if (el.is(':radio')) {

				var radioOutput = function() {

					var att = new Attributes();
					var radio = $('<div class="jq-radio"><div class="jq-radio__div"></div></div>')
						.attr({
							id: att.id,
							title: att.title
						})
						.addClass(att.classes)
						.data(att.data)
					;

					el.after(radio).prependTo(radio);
					if (el.is(':checked')) radio.addClass('checked');
					if (el.is(':disabled')) radio.addClass('disabled');

					// РѕРїСЂРµРґРµР»СЏРµРј РѕР±С‰РµРіРѕ СЂРѕРґРёС‚РµР»СЏ Сѓ СЂР°РґРёРѕРєРЅРѕРїРѕРє СЃ РѕРґРёРЅР°РєРѕРІС‹Рј name
					// http://stackoverflow.com/a/27733847
					$.fn.commonParents = function() {
						var cachedThis = this;
						return cachedThis.first().parents().filter(function() {
							return $(this).find(cachedThis).length === cachedThis.length;
						});
					};
					$.fn.commonParent = function() {
						return $(this).commonParents().first();
					};

					// РєР»РёРє РЅР° РїСЃРµРІРґРѕСЂР°РґРёРѕРєРЅРѕРїРєРµ
					radio.click(function(e) {
						e.preventDefault();
						el.triggerHandler('click');
						if (!radio.is('.disabled')) {
							var inputName = $('input[name="' + el.attr('name') + '"]');
							inputName.commonParent().find(inputName).prop('checked', false).parent().removeClass('checked');
							el.prop('checked', true).parent().addClass('checked');
							el.focus().change();
						}
					});
					// РєР»РёРє РЅР° label
					el.closest('label').add('label[for="' + el.attr('id') + '"]').on('click.styler', function(e) {
						if (!$(e.target).is('a') && !$(e.target).closest(radio).length) {
							radio.triggerHandler('click');
							e.preventDefault();
						}
					});
					// РїРµСЂРµРєР»СЋС‡РµРЅРёРµ СЃС‚СЂРµР»РєР°РјРё
					el.on('change.styler', function() {
						el.parent().addClass('checked');
					})
					.on('focus.styler', function() {
						if (!radio.is('.disabled')) radio.addClass('focused');
					})
					.on('blur.styler', function() {
						radio.removeClass('focused');
					});

				}; // end radioOutput()

				radioOutput();

				// РѕР±РЅРѕРІР»РµРЅРёРµ РїСЂРё РґРёРЅР°РјРёС‡РµСЃРєРѕРј РёР·РјРµРЅРµРЅРёРё
				el.on('refresh', function() {
					el.closest('label').add('label[for="' + el.attr('id') + '"]').off('.styler');
					el.off('.styler').parent().before(el).remove();
					radioOutput();
				});

			// end radio

			// file
			} else if (el.is(':file')) {

				var fileOutput = function() {

					var att = new Attributes();
					var placeholder = el.data('placeholder');
					if (placeholder === undefined) placeholder = opt.filePlaceholder;
					var browse = el.data('browse');
					if (browse === undefined || browse === '') browse = opt.fileBrowse;

					var file =
						$('<div class="jq-file">' +
								'<div class="jq-file__name">' + placeholder + '</div>' +
								'<div class="jq-file__browse">' + browse + '</div>' +
							'</div>')
						.attr({
							id: att.id,
							title: att.title
						})
						.addClass(att.classes)
						.data(att.data)
					;

					el.after(file).appendTo(file);
					if (el.is(':disabled')) file.addClass('disabled');

					var value = el.val();
					var name = $('div.jq-file__name', file);

					// С‡С‚РѕР±С‹ РїСЂРё РґРёРЅР°РјРёС‡РµСЃРєРѕРј РёР·РјРµРЅРµРЅРёРё РёРјСЏ С„Р°Р№Р»Р° РЅРµ СЃР±СЂР°СЃС‹РІР°Р»РѕСЃСЊ
					if (value) name.text(value.replace(/.+[\\\/]/, ''));

					el.on('change.styler', function() {
						var value = el.val();
						if (el.is('[multiple]')) {
							value = '';
							var files = el[0].files.length;
							if (files > 0) {
								var number = el.data('number');
								if (number === undefined) number = opt.fileNumber;
								number = number.replace('%s', files);
								value = number;
							}
						}
						name.text(value.replace(/.+[\\\/]/, ''));
						if (value === '') {
							name.text(placeholder);
							file.removeClass('changed');
						} else {
							file.addClass('changed');
						}
					})
					.on('focus.styler', function() {
						file.addClass('focused');
					})
					.on('blur.styler', function() {
						file.removeClass('focused');
					})
					.on('click.styler', function() {
						file.removeClass('focused');
					});

				}; // end fileOutput()

				fileOutput();

				// РѕР±РЅРѕРІР»РµРЅРёРµ РїСЂРё РґРёРЅР°РјРёС‡РµСЃРєРѕРј РёР·РјРµРЅРµРЅРёРё
				el.on('refresh', function() {
					el.off('.styler').parent().before(el).remove();
					fileOutput();
				});

			// end file

			} else if (el.is('input[type="number"]')) {

				var numberOutput = function() {

					var att = new Attributes();
					var number =
						$('<div class="jq-number">' +
								'<div class="jq-number__spin minus"></div>' +
								'<div class="jq-number__spin plus"></div>' +
							'</div>')
						.attr({
							id: att.id,
							title: att.title
						})
						.addClass(att.classes)
						.data(att.data)
					;

					el.after(number).prependTo(number).wrap('<div class="jq-number__field"></div>');
					if (el.is(':disabled')) number.addClass('disabled');

					var min,
							max,
							step,
							timeout = null,
							interval = null;
					if (el.attr('min') !== undefined) min = el.attr('min');
					if (el.attr('max') !== undefined) max = el.attr('max');
					if (el.attr('step') !== undefined && $.isNumeric(el.attr('step')))
						step = Number(el.attr('step'));
					else
						step = Number(1);

					var changeValue = function(spin) {
						var value = el.val(),
								newValue;

						if (!$.isNumeric(value)) {
							value = 0;
							el.val('0');
						}

						if (spin.is('.minus')) {
							newValue = Number(value) - step;
						} else if (spin.is('.plus')) {
							newValue = Number(value) + step;
						}

						// РѕРїСЂРµРґРµР»СЏРµРј РєРѕР»РёС‡РµСЃС‚РІРѕ РґРµСЃСЏС‚РёС‡РЅС‹С… Р·РЅР°РєРѕРІ РїРѕСЃР»Рµ Р·Р°РїСЏС‚РѕР№ РІ step
						var decimals = (step.toString().split('.')[1] || []).length;
						if (decimals > 0) {
							var multiplier = '1';
							while (multiplier.length <= decimals) multiplier = multiplier + '0';
							// РёР·Р±РµРіР°РµРј РїРѕСЏРІР»РµРЅРёСЏ Р»РёС€РЅРёС… Р·РЅР°РєРѕРІ РїРѕСЃР»Рµ Р·Р°РїСЏС‚РѕР№
							newValue = Math.round(newValue * multiplier) / multiplier;
						}

						if ($.isNumeric(min) && $.isNumeric(max)) {
							if (newValue >= min && newValue <= max) el.val(newValue);
						} else if ($.isNumeric(min) && !$.isNumeric(max)) {
							if (newValue >= min) el.val(newValue);
						} else if (!$.isNumeric(min) && $.isNumeric(max)) {
							if (newValue <= max) el.val(newValue);
						} else {
							el.val(newValue);
						}
					};

					if (!number.is('.disabled')) {
						number.on('mousedown', 'div.jq-number__spin', function() {
							var spin = $(this);
							changeValue(spin);
							timeout = setTimeout(function(){
								interval = setInterval(function(){ changeValue(spin); }, 40);
							}, 350);
						}).on('mouseup mouseout', 'div.jq-number__spin', function() {
							clearTimeout(timeout);
							clearInterval(interval);
						}).on('mouseup', 'div.jq-number__spin', function() {
							el.change();
						});
						el.on('focus.styler', function() {
							number.addClass('focused');
						})
						.on('blur.styler', function() {
							number.removeClass('focused');
						});
					}

				}; // end numberOutput()

				numberOutput();

				// РѕР±РЅРѕРІР»РµРЅРёРµ РїСЂРё РґРёРЅР°РјРёС‡РµСЃРєРѕРј РёР·РјРµРЅРµРЅРёРё
				el.on('refresh', function() {
					el.off('.styler').closest('.jq-number').before(el).remove();
					numberOutput();
				});

			// end number

			// select
			} else if (el.is('select')) {

				var selectboxOutput = function() {

					// Р·Р°РїСЂРµС‰Р°РµРј РїСЂРѕРєСЂСѓС‚РєСѓ СЃС‚СЂР°РЅРёС†С‹ РїСЂРё РїСЂРѕРєСЂСѓС‚РєРµ СЃРµР»РµРєС‚Р°
					function preventScrolling(selector) {

						var scrollDiff = selector.prop('scrollHeight') - selector.outerHeight(),
								wheelDelta = null,
								scrollTop = null;

						selector.off('mousewheel DOMMouseScroll').on('mousewheel DOMMouseScroll', function(e) {

							/**
							 * РЅРѕСЂРјР°Р»РёР·Р°С†РёСЏ РЅР°РїСЂР°РІР»РµРЅРёСЏ РїСЂРѕРєСЂСѓС‚РєРё
							 * (firefox < 0 || chrome etc... > 0)
							 * (e.originalEvent.detail < 0 || e.originalEvent.wheelDelta > 0)
							 */
							wheelDelta = (e.originalEvent.detail < 0 || e.originalEvent.wheelDelta > 0) ? 1 : -1; // РЅР°РїСЂР°РІР»РµРЅРёРµ РїСЂРѕРєСЂСѓС‚РєРё (-1 РІРЅРёР·, 1 РІРІРµСЂС…)
							scrollTop = selector.scrollTop(); // РїРѕР·РёС†РёСЏ СЃРєСЂРѕР»Р»Р°

							if ((scrollTop >= scrollDiff && wheelDelta < 0) || (scrollTop <= 0 && wheelDelta > 0)) {
								e.stopPropagation();
								e.preventDefault();
							}

						});
					}

					var option = $('option', el);
					var list = '';
					// С„РѕСЂРјРёСЂСѓРµРј СЃРїРёСЃРѕРє СЃРµР»РµРєС‚Р°
					function makeList() {
						for (var i = 0; i < option.length; i++) {
							var op = option.eq(i);
							var li = '',
									liClass = '',
									liClasses = '',
									id = '',
									title = '',
									dataList = '',
									optionClass = '',
									optgroupClass = '',
									dataJqfsClass = '';
							var disabled = 'disabled';
							var selDis = 'selected sel disabled';
							if (op.prop('selected')) liClass = 'selected sel';
							if (op.is(':disabled')) liClass = disabled;
							if (op.is(':selected:disabled')) liClass = selDis;
							if (op.attr('id') !== undefined && op.attr('id') !== '') id = ' id="' + op.attr('id') + opt.idSuffix + '"';
							if (op.attr('title') !== undefined && option.attr('title') !== '') title = ' title="' + op.attr('title') + '"';
							if (op.attr('class') !== undefined) {
								optionClass = ' ' + op.attr('class');
								dataJqfsClass = ' data-jqfs-class="' + op.attr('class') + '"';
							}

							var data = op.data();
							for (var k in data) {
								if (data[k] !== '') dataList += ' data-' + k + '="' + data[k] + '"';
							}

							if ( (liClass + optionClass) !== '' )   liClasses = ' class="' + liClass + optionClass + '"';
							li = '<li' + dataJqfsClass + dataList + liClasses + title + id + '>'+ op.html() +'</li>';

							// РµСЃР»Рё РµСЃС‚СЊ optgroup
							if (op.parent().is('optgroup')) {
								if (op.parent().attr('class') !== undefined) optgroupClass = ' ' + op.parent().attr('class');
								li = '<li' + dataJqfsClass + dataList + ' class="' + liClass + optionClass + ' option' + optgroupClass + '"' + title + id + '>'+ op.html() +'</li>';
								if (op.is(':first-child')) {
									li = '<li class="optgroup' + optgroupClass + '">' + op.parent().attr('label') + '</li>' + li;
								}
							}

							list += li;
						}
					} // end makeList()

					// РѕРґРёРЅРѕС‡РЅС‹Р№ СЃРµР»РµРєС‚
					function doSelect() {

						var att = new Attributes();
						var searchHTML = '';
						var selectPlaceholder = el.data('placeholder');
						var selectSearch = el.data('search');
						var selectSearchLimit = el.data('search-limit');
						var selectSearchNotFound = el.data('search-not-found');
						var selectSearchPlaceholder = el.data('search-placeholder');
						var selectSmartPositioning = el.data('smart-positioning');

						if (selectPlaceholder === undefined) selectPlaceholder = opt.selectPlaceholder;
						if (selectSearch === undefined || selectSearch === '') selectSearch = opt.selectSearch;
						if (selectSearchLimit === undefined || selectSearchLimit === '') selectSearchLimit = opt.selectSearchLimit;
						if (selectSearchNotFound === undefined || selectSearchNotFound === '') selectSearchNotFound = opt.selectSearchNotFound;
						if (selectSearchPlaceholder === undefined) selectSearchPlaceholder = opt.selectSearchPlaceholder;
						if (selectSmartPositioning === undefined || selectSmartPositioning === '') selectSmartPositioning = opt.selectSmartPositioning;

						var selectbox =
							$('<div class="jq-selectbox jqselect">' +
									'<div class="jq-selectbox__select">' +
										'<div class="jq-selectbox__select-text"></div>' +
										'<div class="jq-selectbox__trigger">' +
											'<div class="jq-selectbox__trigger-arrow"></div></div>' +
									'</div>' +
								'</div>')
							.attr({
								id: att.id,
								title: att.title
							})
							.addClass(att.classes)
							.data(att.data)
						;

						el.after(selectbox).prependTo(selectbox);

						var selectzIndex = selectbox.css('z-index');
						selectzIndex = (selectzIndex > 0 ) ? selectzIndex : 1;
						var divSelect = $('div.jq-selectbox__select', selectbox);
						var divText = $('div.jq-selectbox__select-text', selectbox);
						var optionSelected = option.filter(':selected');

						makeList();

						if (selectSearch) searchHTML =
							'<div class="jq-selectbox__search"><input type="search" autocomplete="off" placeholder="' + selectSearchPlaceholder + '"></div>' +
							'<div class="jq-selectbox__not-found">' + selectSearchNotFound + '</div>';
						var dropdown =
							$('<div class="jq-selectbox__dropdown">' +
									searchHTML + '<ul>' + list + '</ul>' +
								'</div>');
						selectbox.append(dropdown);
						var ul = $('ul', dropdown);
						var li = $('li', dropdown);
						var search = $('input', dropdown);
						var notFound = $('div.jq-selectbox__not-found', dropdown).hide();
						if (li.length < selectSearchLimit) search.parent().hide();

						// РїРѕРєР°Р·С‹РІР°РµРј РѕРїС†РёСЋ РїРѕ СѓРјРѕР»С‡Р°РЅРёСЋ
						// РµСЃР»Рё Сѓ 1-Р№ РѕРїС†РёРё РЅРµС‚ С‚РµРєСЃС‚Р°, РѕРЅР° РІС‹Р±СЂР°РЅР° РїРѕ СѓРјРѕР»С‡Р°РЅРёСЋ Рё РїР°СЂР°РјРµС‚СЂ selectPlaceholder РЅРµ false, С‚Рѕ РїРѕРєР°Р·С‹РІР°РµРј РїР»РµР№СЃС…РѕР»РґРµСЂ
						if (option.first().text() === '' && option.first().is(':selected') && selectPlaceholder !== false) {
							divText.text(selectPlaceholder).addClass('placeholder');
						} else {
							divText.text(optionSelected.text());
						}

						// РѕРїСЂРµРґРµР»СЏРµРј СЃР°РјС‹Р№ С€РёСЂРѕРєРёР№ РїСѓРЅРєС‚ СЃРµР»РµРєС‚Р°
						var liWidthInner = 0,
								liWidth = 0;
						li.css({'display': 'inline-block'});
						li.each(function() {
							var l = $(this);
							if (l.innerWidth() > liWidthInner) {
								liWidthInner = l.innerWidth();
								liWidth = l.width();
							}
						});
						li.css({'display': ''});

						// РїРѕРґСЃС‚СЂР°РёРІР°РµРј С€РёСЂРёРЅСѓ СЃРІРµСЂРЅСѓС‚РѕРіРѕ СЃРµР»РµРєС‚Р° РІ Р·Р°РІРёСЃРёРјРѕСЃС‚Рё
						// РѕС‚ С€РёСЂРёРЅС‹ РїР»РµР№СЃС…РѕР»РґРµСЂР° РёР»Рё СЃР°РјРѕРіРѕ С€РёСЂРѕРєРѕРіРѕ РїСѓРЅРєС‚Р°
						if (divText.is('.placeholder') && (divText.width() > liWidthInner)) {
							divText.width(divText.width());
						} else {
							var selClone = selectbox.clone().appendTo('body').width('auto');
							var selCloneWidth = selClone.outerWidth();
							selClone.remove();
							if (selCloneWidth == selectbox.outerWidth()) {
								divText.width(liWidth);
							}
						}

						// РїРѕРґСЃС‚СЂР°РёРІР°РµРј С€РёСЂРёРЅСѓ РІС‹РїР°РґР°СЋС‰РµРіРѕ СЃРїРёСЃРєР° РІ Р·Р°РІРёСЃРёРјРѕСЃС‚Рё РѕС‚ СЃР°РјРѕРіРѕ С€РёСЂРѕРєРѕРіРѕ РїСѓРЅРєС‚Р°
						if (liWidthInner > selectbox.width()) dropdown.width(liWidthInner);

						// РїСЂСЏС‡РµРј 1-СЋ РїСѓСЃС‚СѓСЋ РѕРїС†РёСЋ, РµСЃР»Рё РѕРЅР° РµСЃС‚СЊ Рё РµСЃР»Рё Р°С‚СЂРёР±СѓС‚ data-placeholder РЅРµ РїСѓСЃС‚РѕР№
						// РµСЃР»Рё РІСЃРµ Р¶Рµ РЅСѓР¶РЅРѕ, С‡С‚РѕР±С‹ РїРµСЂРІР°СЏ РїСѓСЃС‚Р°СЏ РѕРїС†РёСЏ РѕС‚РѕР±СЂР°Р¶Р°Р»Р°СЃСЊ, С‚Рѕ СѓРєР°Р·С‹РІР°РµРј Сѓ СЃРµР»РµРєС‚Р°: data-placeholder=""
						if (option.first().text() === '' && el.data('placeholder') !== '') {
							li.first().hide();
						}

						var selectHeight = selectbox.outerHeight(true);
						var searchHeight = search.parent().outerHeight(true) || 0;
						var isMaxHeight = ul.css('max-height');
						var liSelected = li.filter('.selected');
						if (liSelected.length < 1) li.first().addClass('selected sel');
						if (li.data('li-height') === undefined) {
							var liOuterHeight = li.outerHeight();
							if (selectPlaceholder !== false) liOuterHeight = li.eq(1).outerHeight();
							li.data('li-height', liOuterHeight);
						}
						var position = dropdown.css('top');
						if (dropdown.css('left') == 'auto') dropdown.css({left: 0});
						if (dropdown.css('top') == 'auto') {
							dropdown.css({top: selectHeight});
							position = selectHeight;
						}
						dropdown.hide();

						// РµСЃР»Рё РІС‹Р±СЂР°РЅ РЅРµ РґРµС„РѕР»С‚РЅС‹Р№ РїСѓРЅРєС‚
						if (liSelected.length) {
							// РґРѕР±Р°РІР»СЏРµРј РєР»Р°СЃСЃ, РїРѕРєР°Р·С‹РІР°СЋС‰РёР№ РёР·РјРµРЅРµРЅРёРµ СЃРµР»РµРєС‚Р°
							if (option.first().text() != optionSelected.text()) {
								selectbox.addClass('changed');
							}
							// РїРµСЂРµРґР°РµРј СЃРµР»РµРєС‚Сѓ РєР»Р°СЃСЃ РІС‹Р±СЂР°РЅРЅРѕРіРѕ РїСѓРЅРєС‚Р°
							selectbox.data('jqfs-class', liSelected.data('jqfs-class'));
							selectbox.addClass(liSelected.data('jqfs-class'));
						}

						// РµСЃР»Рё СЃРµР»РµРєС‚ РЅРµР°РєС‚РёРІРЅС‹Р№
						if (el.is(':disabled')) {
							selectbox.addClass('disabled');
							return false;
						}

						// РїСЂРё РєР»РёРєРµ РЅР° РїСЃРµРІРґРѕСЃРµР»РµРєС‚Рµ
						divSelect.click(function() {

							// РєРѕР»Р±РµРє РїСЂРё Р·Р°РєСЂС‹С‚РёРё СЃРµР»РµРєС‚Р°
							if ($('div.jq-selectbox').filter('.opened').length) {
								opt.onSelectClosed.call($('div.jq-selectbox').filter('.opened'));
							}

							el.focus();

							// РµСЃР»Рё iOS, С‚Рѕ РЅРµ РїРѕРєР°Р·С‹РІР°РµРј РІС‹РїР°РґР°СЋС‰РёР№ СЃРїРёСЃРѕРє,
							// С‚.Рє. РѕС‚РѕР±СЂР°Р¶Р°РµС‚СЃСЏ РЅР°С‚РёРІРЅС‹Р№ Рё РЅРµРёР·РІРµСЃС‚РЅРѕ, РєР°Рє РµРіРѕ СЃРїСЂСЏС‚Р°С‚СЊ
							if (iOS) return;

							// СѓРјРЅРѕРµ РїРѕР·РёС†РёРѕРЅРёСЂРѕРІР°РЅРёРµ
							var win = $(window);
							var liHeight = li.data('li-height');
							var topOffset = selectbox.offset().top;
							var bottomOffset = win.height() - selectHeight - (topOffset - win.scrollTop());
							var visible = el.data('visible-options');
							if (visible === undefined || visible === '') visible = opt.selectVisibleOptions;
							var minHeight = liHeight * 5;
							var newHeight = liHeight * visible;
							if (visible > 0 && visible < 6) minHeight = newHeight;
							if (visible === 0) newHeight = 'auto';

							var dropDown = function() {
								dropdown.height('auto').css({bottom: 'auto', top: position});
								var maxHeightBottom = function() {
									ul.css('max-height', Math.floor((bottomOffset - 20 - searchHeight) / liHeight) * liHeight);
								};
								maxHeightBottom();
								ul.css('max-height', newHeight);
								if (isMaxHeight != 'none') {
									ul.css('max-height', isMaxHeight);
								}
								if (bottomOffset < (dropdown.outerHeight() + 20)) {
									maxHeightBottom();
								}
							};

							var dropUp = function() {
								dropdown.height('auto').css({top: 'auto', bottom: position});
								var maxHeightTop = function() {
									ul.css('max-height', Math.floor((topOffset - win.scrollTop() - 20 - searchHeight) / liHeight) * liHeight);
								};
								maxHeightTop();
								ul.css('max-height', newHeight);
								if (isMaxHeight != 'none') {
									ul.css('max-height', isMaxHeight);
								}
								if ((topOffset - win.scrollTop() - 20) < (dropdown.outerHeight() + 20)) {
									maxHeightTop();
								}
							};

							if (selectSmartPositioning === true || selectSmartPositioning === 1) {
								// СЂР°СЃРєСЂС‹С‚РёРµ РІРЅРёР·
								if (bottomOffset > (minHeight + searchHeight + 20)) {
									dropDown();
									selectbox.removeClass('dropup').addClass('dropdown');
								// СЂР°СЃРєСЂС‹С‚РёРµ РІРІРµСЂС…
								} else {
									dropUp();
									selectbox.removeClass('dropdown').addClass('dropup');
								}
							} else if (selectSmartPositioning === false || selectSmartPositioning === 0) {
								// СЂР°СЃРєСЂС‹С‚РёРµ РІРЅРёР·
								if (bottomOffset > (minHeight + searchHeight + 20)) {
									dropDown();
									selectbox.removeClass('dropup').addClass('dropdown');
								}
							} else {
								// РµСЃР»Рё СѓРјРЅРѕРµ РїРѕР·РёС†РёРѕРЅРёСЂРѕРІР°РЅРёРµ РѕС‚РєР»СЋС‡РµРЅРѕ
								dropdown.height('auto').css({bottom: 'auto', top: position});
								ul.css('max-height', newHeight);
								if (isMaxHeight != 'none') {
									ul.css('max-height', isMaxHeight);
								}
							}

							// РµСЃР»Рё РІС‹РїР°РґР°СЋС‰РёР№ СЃРїРёСЃРѕРє РІС‹С…РѕРґРёС‚ Р·Р° РїСЂР°РІС‹Р№ РєСЂР°Р№ РѕРєРЅР° Р±СЂР°СѓР·РµСЂР°,
							// С‚Рѕ РјРµРЅСЏРµРј РїРѕР·РёС†РёРѕРЅРёСЂРѕРІР°РЅРёРµ СЃ Р»РµРІРѕРіРѕ РЅР° РїСЂР°РІРѕРµ
							if (selectbox.offset().left + dropdown.outerWidth() > win.width()) {
								dropdown.css({left: 'auto', right: 0});
							}
							// РєРѕРЅРµС† СѓРјРЅРѕРіРѕ РїРѕР·РёС†РёРѕРЅРёСЂРѕРІР°РЅРёСЏ

							$('div.jqselect').css({zIndex: (selectzIndex - 1)}).removeClass('opened');
							selectbox.css({zIndex: selectzIndex});
							if (dropdown.is(':hidden')) {
								$('div.jq-selectbox__dropdown:visible').hide();
								dropdown.show();
								selectbox.addClass('opened focused');
								// РєРѕР»Р±РµРє РїСЂРё РѕС‚РєСЂС‹С‚РёРё СЃРµР»РµРєС‚Р°
								opt.onSelectOpened.call(selectbox);
							} else {
								dropdown.hide();
								selectbox.removeClass('opened dropup dropdown');
								// РєРѕР»Р±РµРє РїСЂРё Р·Р°РєСЂС‹С‚РёРё СЃРµР»РµРєС‚Р°
								if ($('div.jq-selectbox').filter('.opened').length) {
									opt.onSelectClosed.call(selectbox);
								}
							}

							// РїРѕРёСЃРєРѕРІРѕРµ РїРѕР»Рµ
							if (search.length) {
								search.val('').keyup();
								notFound.hide();
								search.keyup(function() {
									var query = $(this).val();
									li.each(function() {
										if (!$(this).html().match(new RegExp('.*?' + query + '.*?', 'i'))) {
											$(this).hide();
										} else {
											$(this).show();
										}
									});
									// РїСЂСЏС‡РµРј 1-СЋ РїСѓСЃС‚СѓСЋ РѕРїС†РёСЋ
									if (option.first().text() === '' && el.data('placeholder') !== '') {
										li.first().hide();
									}
									if (li.filter(':visible').length < 1) {
										notFound.show();
									} else {
										notFound.hide();
									}
								});
							}

							// РїСЂРѕРєСЂСѓС‡РёРІР°РµРј РґРѕ РІС‹Р±СЂР°РЅРЅРѕРіРѕ РїСѓРЅРєС‚Р° РїСЂРё РѕС‚РєСЂС‹С‚РёРё СЃРїРёСЃРєР°
							if (li.filter('.selected').length) {
								if (el.val() === '') {
									ul.scrollTop(0);
								} else {
									// РµСЃР»Рё РЅРµС‡РµС‚РЅРѕРµ РєРѕР»РёС‡РµСЃС‚РІРѕ РІРёРґРёРјС‹С… РїСѓРЅРєС‚РѕРІ,
									// С‚Рѕ РІС‹СЃРѕС‚Сѓ РїСѓРЅРєС‚Р° РґРµР»РёРј РїРѕРїРѕР»Р°Рј РґР»СЏ РїРѕСЃР»РµРґСѓСЋС‰РµРіРѕ СЂР°СЃС‡РµС‚Р°
									if ( (ul.innerHeight() / liHeight) % 2 !== 0 ) liHeight = liHeight / 2;
									ul.scrollTop(ul.scrollTop() + li.filter('.selected').position().top - ul.innerHeight() / 2 + liHeight);
								}
							}

							preventScrolling(ul);

						}); // end divSelect.click()

						// РїСЂРё РЅР°РІРµРґРµРЅРёРё РєСѓСЂСЃРѕСЂР° РЅР° РїСѓРЅРєС‚ СЃРїРёСЃРєР°
						li.hover(function() {
							$(this).siblings().removeClass('selected');
						});
						var selectedText = li.filter('.selected').text();

						// РїСЂРё РєР»РёРєРµ РЅР° РїСѓРЅРєС‚ СЃРїРёСЃРєР°
						li.filter(':not(.disabled):not(.optgroup)').click(function() {
							el.focus();
							var t = $(this);
							var liText = t.text();
							if (!t.is('.selected')) {
								var index = t.index();
								index -= t.prevAll('.optgroup').length;
								t.addClass('selected sel').siblings().removeClass('selected sel');
								option.prop('selected', false).eq(index).prop('selected', true);
								selectedText = liText;
								divText.text(liText);

								// РїРµСЂРµРґР°РµРј СЃРµР»РµРєС‚Сѓ РєР»Р°СЃСЃ РІС‹Р±СЂР°РЅРЅРѕРіРѕ РїСѓРЅРєС‚Р°
								if (selectbox.data('jqfs-class')) selectbox.removeClass(selectbox.data('jqfs-class'));
								selectbox.data('jqfs-class', t.data('jqfs-class'));
								selectbox.addClass(t.data('jqfs-class'));

								el.change();
							}
							dropdown.hide();
							selectbox.removeClass('opened dropup dropdown');
							// РєРѕР»Р±РµРє РїСЂРё Р·Р°РєСЂС‹С‚РёРё СЃРµР»РµРєС‚Р°
							opt.onSelectClosed.call(selectbox);

						});
						dropdown.mouseout(function() {
							$('li.sel', dropdown).addClass('selected');
						});

						// РёР·РјРµРЅРµРЅРёРµ СЃРµР»РµРєС‚Р°
						el.on('change.styler', function() {
							divText.text(option.filter(':selected').text()).removeClass('placeholder');
							li.removeClass('selected sel').not('.optgroup').eq(el[0].selectedIndex).addClass('selected sel');
							// РґРѕР±Р°РІР»СЏРµРј РєР»Р°СЃСЃ, РїРѕРєР°Р·С‹РІР°СЋС‰РёР№ РёР·РјРµРЅРµРЅРёРµ СЃРµР»РµРєС‚Р°
							if (option.first().text() != li.filter('.selected').text()) {
								selectbox.addClass('changed');
							} else {
								selectbox.removeClass('changed');
							}
						})
						.on('focus.styler', function() {
							selectbox.addClass('focused');
							$('div.jqselect').not('.focused').removeClass('opened dropup dropdown').find('div.jq-selectbox__dropdown').hide();
						})
						.on('blur.styler', function() {
							selectbox.removeClass('focused');
						})
						// РёР·РјРµРЅРµРЅРёРµ СЃРµР»РµРєС‚Р° СЃ РєР»Р°РІРёР°С‚СѓСЂС‹
						.on('keydown.styler keyup.styler', function(e) {
							var liHeight = li.data('li-height');
							if (el.val() === '') {
								divText.text(selectPlaceholder).addClass('placeholder');
							} else {
								divText.text(option.filter(':selected').text());
							}
							li.removeClass('selected sel').not('.optgroup').eq(el[0].selectedIndex).addClass('selected sel');
							// РІРІРµСЂС…, РІР»РµРІРѕ, Page Up, Home
							if (e.which == 38 || e.which == 37 || e.which == 33 || e.which == 36) {
								if (el.val() === '') {
									ul.scrollTop(0);
								} else {
									ul.scrollTop(ul.scrollTop() + li.filter('.selected').position().top);
								}
							}
							// РІРЅРёР·, РІРїСЂР°РІРѕ, Page Down, End
							if (e.which == 40 || e.which == 39 || e.which == 34 || e.which == 35) {
								ul.scrollTop(ul.scrollTop() + li.filter('.selected').position().top - ul.innerHeight() + liHeight);
							}
							// Р·Р°РєСЂС‹РІР°РµРј РІС‹РїР°РґР°СЋС‰РёР№ СЃРїРёСЃРѕРє РїСЂРё РЅР°Р¶Р°С‚РёРё Enter
							if (e.which == 13) {
								e.preventDefault();
								dropdown.hide();
								selectbox.removeClass('opened dropup dropdown');
								// РєРѕР»Р±РµРє РїСЂРё Р·Р°РєСЂС‹С‚РёРё СЃРµР»РµРєС‚Р°
								opt.onSelectClosed.call(selectbox);
							}
						}).on('keydown.styler', function(e) {
							// РѕС‚РєСЂС‹РІР°РµРј РІС‹РїР°РґР°СЋС‰РёР№ СЃРїРёСЃРѕРє РїСЂРё РЅР°Р¶Р°С‚РёРё Space
							if (e.which == 32) {
								e.preventDefault();
								divSelect.click();
							}
						});

						// РїСЂСЏС‡РµРј РІС‹РїР°РґР°СЋС‰РёР№ СЃРїРёСЃРѕРє РїСЂРё РєР»РёРєРµ Р·Р° РїСЂРµРґРµР»Р°РјРё СЃРµР»РµРєС‚Р°
						if (!onDocumentClick.registered) {
							$(document).on('click', onDocumentClick);
							onDocumentClick.registered = true;
						}

					} // end doSelect()

					// РјСѓР»СЊС‚РёСЃРµР»РµРєС‚
					function doMultipleSelect() {

						var att = new Attributes();
						var selectbox =
							$('<div class="jq-select-multiple jqselect"></div>')
							.attr({
								id: att.id,
								title: att.title
							})
							.addClass(att.classes)
							.data(att.data)
						;

						el.after(selectbox);

						makeList();
						selectbox.append('<ul>' + list + '</ul>');
						var ul = $('ul', selectbox);
						var li = $('li', selectbox);
						var size = el.attr('size');
						var ulHeight = ul.outerHeight();
						var liHeight = li.outerHeight();
						if (size !== undefined && size > 0) {
							ul.css({'height': liHeight * size});
						} else {
							ul.css({'height': liHeight * 4});
						}
						if (ulHeight > selectbox.height()) {
							ul.css('overflowY', 'scroll');
							preventScrolling(ul);
							// РїСЂРѕРєСЂСѓС‡РёРІР°РµРј РґРѕ РІС‹Р±СЂР°РЅРЅРѕРіРѕ РїСѓРЅРєС‚Р°
							if (li.filter('.selected').length) {
								ul.scrollTop(ul.scrollTop() + li.filter('.selected').position().top);
							}
						}

						// РїСЂСЏС‡РµРј РѕСЂРёРіРёРЅР°Р»СЊРЅС‹Р№ СЃРµР»РµРєС‚
						el.prependTo(selectbox);

						// РµСЃР»Рё СЃРµР»РµРєС‚ РЅРµР°РєС‚РёРІРЅС‹Р№
						if (el.is(':disabled')) {
							selectbox.addClass('disabled');
							option.each(function() {
								if ($(this).is(':selected')) li.eq($(this).index()).addClass('selected');
							});

						// РµСЃР»Рё СЃРµР»РµРєС‚ Р°РєС‚РёРІРЅС‹Р№
						} else {

							// РїСЂРё РєР»РёРєРµ РЅР° РїСѓРЅРєС‚ СЃРїРёСЃРєР°
							li.filter(':not(.disabled):not(.optgroup)').click(function(e) {
								el.focus();
								var clkd = $(this);
								if(!e.ctrlKey && !e.metaKey) clkd.addClass('selected');
								if(!e.shiftKey) clkd.addClass('first');
								if(!e.ctrlKey && !e.metaKey && !e.shiftKey) clkd.siblings().removeClass('selected first');

								// РІС‹РґРµР»РµРЅРёРµ РїСѓРЅРєС‚РѕРІ РїСЂРё Р·Р°Р¶Р°С‚РѕРј Ctrl
								if(e.ctrlKey || e.metaKey) {
									if (clkd.is('.selected')) clkd.removeClass('selected first');
										else clkd.addClass('selected first');
									clkd.siblings().removeClass('first');
								}

								// РІС‹РґРµР»РµРЅРёРµ РїСѓРЅРєС‚РѕРІ РїСЂРё Р·Р°Р¶Р°С‚РѕРј Shift
								if(e.shiftKey) {
									var prev = false,
											next = false;
									clkd.siblings().removeClass('selected').siblings('.first').addClass('selected');
									clkd.prevAll().each(function() {
										if ($(this).is('.first')) prev = true;
									});
									clkd.nextAll().each(function() {
										if ($(this).is('.first')) next = true;
									});
									if (prev) {
										clkd.prevAll().each(function() {
											if ($(this).is('.selected')) return false;
												else $(this).not('.disabled, .optgroup').addClass('selected');
										});
									}
									if (next) {
										clkd.nextAll().each(function() {
											if ($(this).is('.selected')) return false;
												else $(this).not('.disabled, .optgroup').addClass('selected');
										});
									}
									if (li.filter('.selected').length == 1) clkd.addClass('first');
								}

								// РѕС‚РјРµС‡Р°РµРј РІС‹Р±СЂР°РЅРЅС‹Рµ РјС‹С€СЊСЋ
								option.prop('selected', false);
								li.filter('.selected').each(function() {
									var t = $(this);
									var index = t.index();
									if (t.is('.option')) index -= t.prevAll('.optgroup').length;
									option.eq(index).prop('selected', true);
								});
								el.change();

							});

							// РѕС‚РјРµС‡Р°РµРј РІС‹Р±СЂР°РЅРЅС‹Рµ СЃ РєР»Р°РІРёР°С‚СѓСЂС‹
							option.each(function(i) {
								$(this).data('optionIndex', i);
							});
							el.on('change.styler', function() {
								li.removeClass('selected');
								var arrIndexes = [];
								option.filter(':selected').each(function() {
									arrIndexes.push($(this).data('optionIndex'));
								});
								li.not('.optgroup').filter(function(i) {
									return $.inArray(i, arrIndexes) > -1;
								}).addClass('selected');
							})
							.on('focus.styler', function() {
								selectbox.addClass('focused');
							})
							.on('blur.styler', function() {
								selectbox.removeClass('focused');
							});

							// РїСЂРѕРєСЂСѓС‡РёРІР°РµРј СЃ РєР»Р°РІРёР°С‚СѓСЂС‹
							if (ulHeight > selectbox.height()) {
								el.on('keydown.styler', function(e) {
									// РІРІРµСЂС…, РІР»РµРІРѕ, PageUp
									if (e.which == 38 || e.which == 37 || e.which == 33) {
										ul.scrollTop(ul.scrollTop() + li.filter('.selected').position().top - liHeight);
									}
									// РІРЅРёР·, РІРїСЂР°РІРѕ, PageDown
									if (e.which == 40 || e.which == 39 || e.which == 34) {
										ul.scrollTop(ul.scrollTop() + li.filter('.selected:last').position().top - ul.innerHeight() + liHeight * 2);
									}
								});
							}

						}
					} // end doMultipleSelect()

					if (el.is('[multiple]')) {

						// РµСЃР»Рё Android РёР»Рё iOS, С‚Рѕ РјСѓР»СЊС‚РёСЃРµР»РµРєС‚ РЅРµ СЃС‚РёР»РёР·СѓРµРј
						// РїСЂРёС‡РёРЅР° РґР»СЏ Android - РІ СЃС‚РёР»РёР·РѕРІР°РЅРЅРѕРј СЃРµР»РµРєС‚Рµ РЅРµС‚ РІРѕР·РјРѕР¶РЅРѕСЃС‚Рё РІС‹Р±СЂР°С‚СЊ РЅРµСЃРєРѕР»СЊРєРѕ РїСѓРЅРєС‚РѕРІ
						// РїСЂРёС‡РёРЅР° РґР»СЏ iOS - РІ СЃС‚РёР»РёР·РѕРІР°РЅРЅРѕРј СЃРµР»РµРєС‚Рµ РЅРµРїСЂР°РІРёР»СЊРЅРѕ РѕС‚РѕР±СЂР°Р¶Р°СЋС‚СЃСЏ РІС‹Р±СЂР°РЅРЅС‹Рµ РїСѓРЅРєС‚С‹
						if (Android || iOS) return;

						doMultipleSelect();
					} else {
						doSelect();
					}

				}; // end selectboxOutput()

				selectboxOutput();

				// РѕР±РЅРѕРІР»РµРЅРёРµ РїСЂРё РґРёРЅР°РјРёС‡РµСЃРєРѕРј РёР·РјРµРЅРµРЅРёРё
				el.on('refresh', function() {
					el.off('.styler').parent().before(el).remove();
					selectboxOutput();
				});

			// end select

			// reset
			} else if (el.is(':reset')) {
				el.on('click', function() {
					setTimeout(function() {
						el.closest('form').find('input, select').trigger('refresh');
					}, 1);
				});
			} // end reset

		}, // init: function()

		// РґРµСЃС‚СЂСѓРєС‚РѕСЂ
		destroy: function() {

			var el = $(this.element);

			if (el.is(':checkbox') || el.is(':radio')) {
				el.removeData('_' + pluginName).off('.styler refresh').removeAttr('style').parent().before(el).remove();
				el.closest('label').add('label[for="' + el.attr('id') + '"]').off('.styler');
			} else if (el.is('input[type="number"]')) {
				el.removeData('_' + pluginName).off('.styler refresh').closest('.jq-number').before(el).remove();
			} else if (el.is(':file') || el.is('select')) {
				el.removeData('_' + pluginName).off('.styler refresh').removeAttr('style').parent().before(el).remove();
			}

		} // destroy: function()

	}; // Plugin.prototype

	$.fn[pluginName] = function(options) {
		var args = arguments;
		if (options === undefined || typeof options === 'object') {
			this.each(function() {
				if (!$.data(this, '_' + pluginName)) {
					$.data(this, '_' + pluginName, new Plugin(this, options));
				}
			})
			// РєРѕР»Р±РµРє РїРѕСЃР»Рµ РІС‹РїРѕР»РЅРµРЅРёСЏ РїР»Р°РіРёРЅР°
			.promise()
			.done(function() {
				var opt = $(this[0]).data('_' + pluginName);
				if (opt) opt.options.onFormStyled.call();
			});
			return this;
		} else if (typeof options === 'string' && options[0] !== '_' && options !== 'init') {
			var returns;
			this.each(function() {
				var instance = $.data(this, '_' + pluginName);
				if (instance instanceof Plugin && typeof instance[options] === 'function') {
					returns = instance[options].apply(instance, Array.prototype.slice.call(args, 1));
				}
			});
			return returns !== undefined ? returns : this;
		}
	};

	// РїСЂСЏС‡РµРј РІС‹РїР°РґР°СЋС‰РёР№ СЃРїРёСЃРѕРє РїСЂРё РєР»РёРєРµ Р·Р° РїСЂРµРґРµР»Р°РјРё СЃРµР»РµРєС‚Р°
	function onDocumentClick(e) {
		// e.target.nodeName != 'OPTION' - РґРѕР±Р°РІР»РµРЅРѕ РґР»СЏ РѕР±С…РѕРґР° Р±Р°РіР° РІ Opera РЅР° РґРІРёР¶РєРµ Presto
		// (РїСЂРё РёР·РјРµРЅРµРЅРёРё СЃРµР»РµРєС‚Р° СЃ РєР»Р°РІРёР°С‚СѓСЂС‹ СЃСЂР°Р±Р°С‚С‹РІР°РµС‚ СЃРѕР±С‹С‚РёРµ onclick)
		if (!$(e.target).parents().hasClass('jq-selectbox') && e.target.nodeName != 'OPTION') {
			if ($('div.jq-selectbox.opened').length) {
				var selectbox = $('div.jq-selectbox.opened'),
						search = $('div.jq-selectbox__search input', selectbox),
						dropdown = $('div.jq-selectbox__dropdown', selectbox),
						opt = selectbox.find('select').data('_' + pluginName).options;

				// РєРѕР»Р±РµРє РїСЂРё Р·Р°РєСЂС‹С‚РёРё СЃРµР»РµРєС‚Р°
				opt.onSelectClosed.call(selectbox);

				if (search.length) search.val('').keyup();
				dropdown.hide().find('li.sel').addClass('selected');
				selectbox.removeClass('focused opened dropup dropdown');
			}
		}
	}
	onDocumentClick.registered = false;

}));