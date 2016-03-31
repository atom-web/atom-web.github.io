/*
	ICONIFY XHTML/CSS Template by Nuruzzaman Sheikh (palpaldal).
	Web link:: http://www.themeforest.net/user/palpaldal

	Table of Contents
	------------------
	1.	jQuery.easing plugin
	2.	jQuery.scrollTo plugin
	3.	jQuery.supersubs dropdown menu plugin
	4.	jQuery.superfish dropdown menu plugin
	5.	jQuery twitter plugin
	6.	jQuery.scrollToTop plugin
	7.	custom jQuery.tinyValidator validates form fields
	8.	Theme Script initialization function/codes
*/

/*
 * jQuery Easing v1.3 - http://gsgd.co.uk/sandbox/jquery/easing/
 *
 * Uses the built in easing capabilities added In jQuery 1.1
 * to offer multiple easing options
 *
 * TERMS OF USE - jQuery Easing
 * 
 * Open source under the BSD License. 
 * 
 * Copyright © 2008 George McGinley Smith
 * All rights reserved.
 * 
 * Redistribution and use in source and binary forms, with or without modification, 
 * are permitted provided that the following conditions are met:
 * 
 * Redistributions of source code must retain the above copyright notice, this list of 
 * conditions and the following disclaimer.
 * Redistributions in binary form must reproduce the above copyright notice, this list 
 * of conditions and the following disclaimer in the documentation and/or other materials 
 * provided with the distribution.
 * 
 * Neither the name of the author nor the names of contributors may be used to endorse 
 * or promote products derived from this software without specific prior written permission.
 * 
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY 
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
 *  COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
 *  EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE
 *  GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED 
 * AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 *  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED 
 * OF THE POSSIBILITY OF SUCH DAMAGE. 
 *
*/

// t: current time, b: begInnIng value, c: change In value, d: duration
jQuery.easing['jswing'] = jQuery.easing['swing'];

jQuery.extend( jQuery.easing,
{
	def: 'easeOutQuad',
	swing: function (x, t, b, c, d) {
		//alert(jQuery.easing.default);
		return jQuery.easing[jQuery.easing.def](x, t, b, c, d);
	},
	easeInQuad: function (x, t, b, c, d) {
		return c*(t/=d)*t + b;
	},
	easeOutQuad: function (x, t, b, c, d) {
		return -c *(t/=d)*(t-2) + b;
	},
	easeInOutQuad: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t + b;
		return -c/2 * ((--t)*(t-2) - 1) + b;
	},
	easeInCubic: function (x, t, b, c, d) {
		return c*(t/=d)*t*t + b;
	},
	easeOutCubic: function (x, t, b, c, d) {
		return c*((t=t/d-1)*t*t + 1) + b;
	},
	easeInOutCubic: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t*t + b;
		return c/2*((t-=2)*t*t + 2) + b;
	},
	easeInQuart: function (x, t, b, c, d) {
		return c*(t/=d)*t*t*t + b;
	},
	easeOutQuart: function (x, t, b, c, d) {
		return -c * ((t=t/d-1)*t*t*t - 1) + b;
	},
	easeInOutQuart: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t*t*t + b;
		return -c/2 * ((t-=2)*t*t*t - 2) + b;
	},
	easeInQuint: function (x, t, b, c, d) {
		return c*(t/=d)*t*t*t*t + b;
	},
	easeOutQuint: function (x, t, b, c, d) {
		return c*((t=t/d-1)*t*t*t*t + 1) + b;
	},
	easeInOutQuint: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t*t*t*t + b;
		return c/2*((t-=2)*t*t*t*t + 2) + b;
	},
	easeInSine: function (x, t, b, c, d) {
		return -c * Math.cos(t/d * (Math.PI/2)) + c + b;
	},
	easeOutSine: function (x, t, b, c, d) {
		return c * Math.sin(t/d * (Math.PI/2)) + b;
	},
	easeInOutSine: function (x, t, b, c, d) {
		return -c/2 * (Math.cos(Math.PI*t/d) - 1) + b;
	},
	easeInExpo: function (x, t, b, c, d) {
		return (t==0) ? b : c * Math.pow(2, 10 * (t/d - 1)) + b;
	},
	easeOutExpo: function (x, t, b, c, d) {
		return (t==d) ? b+c : c * (-Math.pow(2, -10 * t/d) + 1) + b;
	},
	easeInOutExpo: function (x, t, b, c, d) {
		if (t==0) return b;
		if (t==d) return b+c;
		if ((t/=d/2) < 1) return c/2 * Math.pow(2, 10 * (t - 1)) + b;
		return c/2 * (-Math.pow(2, -10 * --t) + 2) + b;
	},
	easeInCirc: function (x, t, b, c, d) {
		return -c * (Math.sqrt(1 - (t/=d)*t) - 1) + b;
	},
	easeOutCirc: function (x, t, b, c, d) {
		return c * Math.sqrt(1 - (t=t/d-1)*t) + b;
	},
	easeInOutCirc: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return -c/2 * (Math.sqrt(1 - t*t) - 1) + b;
		return c/2 * (Math.sqrt(1 - (t-=2)*t) + 1) + b;
	},
	easeInElastic: function (x, t, b, c, d) {
		var s=1.70158;var p=0;var a=c;
		if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
		if (a < Math.abs(c)) { a=c; var s=p/4; }
		else var s = p/(2*Math.PI) * Math.asin (c/a);
		return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
	},
	easeOutElastic: function (x, t, b, c, d) {
		var s=1.70158;var p=0;var a=c;
		if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
		if (a < Math.abs(c)) { a=c; var s=p/4; }
		else var s = p/(2*Math.PI) * Math.asin (c/a);
		return a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b;
	},
	easeInOutElastic: function (x, t, b, c, d) {
		var s=1.70158;var p=0;var a=c;
		if (t==0) return b;  if ((t/=d/2)==2) return b+c;  if (!p) p=d*(.3*1.5);
		if (a < Math.abs(c)) { a=c; var s=p/4; }
		else var s = p/(2*Math.PI) * Math.asin (c/a);
		if (t < 1) return -.5*(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
		return a*Math.pow(2,-10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )*.5 + c + b;
	},
	easeInBack: function (x, t, b, c, d, s) {
		if (s == undefined) s = 1.70158;
		return c*(t/=d)*t*((s+1)*t - s) + b;
	},
	easeOutBack: function (x, t, b, c, d, s) {
		if (s == undefined) s = 1.70158;
		return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
	},
	easeInOutBack: function (x, t, b, c, d, s) {
		if (s == undefined) s = 1.70158; 
		if ((t/=d/2) < 1) return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
		return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
	},
	easeInBounce: function (x, t, b, c, d) {
		return c - jQuery.easing.easeOutBounce (x, d-t, 0, c, d) + b;
	},
	easeOutBounce: function (x, t, b, c, d) {
		if ((t/=d) < (1/2.75)) {
			return c*(7.5625*t*t) + b;
		} else if (t < (2/2.75)) {
			return c*(7.5625*(t-=(1.5/2.75))*t + .75) + b;
		} else if (t < (2.5/2.75)) {
			return c*(7.5625*(t-=(2.25/2.75))*t + .9375) + b;
		} else {
			return c*(7.5625*(t-=(2.625/2.75))*t + .984375) + b;
		}
	},
	easeInOutBounce: function (x, t, b, c, d) {
		if (t < d/2) return jQuery.easing.easeInBounce (x, t*2, 0, c, d) * .5 + b;
		return jQuery.easing.easeOutBounce (x, t*2-d, 0, c, d) * .5 + c*.5 + b;
	}
});


/**
 * jQuery.ScrollTo - Easy element scrolling using jQuery.
 * Copyright (c) 2007-2009 Ariel Flesler - aflesler(at)gmail(dot)com | http://flesler.blogspot.com
 * Dual licensed under MIT and GPL.
 * Date: 3/9/2009
 * @author Ariel Flesler
 * @version 1.4.1
 *
 * http://flesler.blogspot.com/2007/10/jqueryscrollto.html
 */
;(function($){var m=$.scrollTo=function(b,h,f){$(window).scrollTo(b,h,f)};m.defaults={axis:'xy',duration:parseFloat($.fn.jquery)>=1.3?0:1};m.window=function(b){return $(window).scrollable()};$.fn.scrollable=function(){return this.map(function(){var b=this,h=!b.nodeName||$.inArray(b.nodeName.toLowerCase(),['iframe','#document','html','body'])!=-1;if(!h)return b;var f=(b.contentWindow||b).document||b.ownerDocument||b;return $.browser.safari||f.compatMode=='BackCompat'?f.body:f.documentElement})};$.fn.scrollTo=function(l,j,a){if(typeof j=='object'){a=j;j=0}if(typeof a=='function')a={onAfter:a};if(l=='max')l=9e9;a=$.extend({},m.defaults,a);j=j||a.speed||a.duration;a.queue=a.queue&&a.axis.length>1;if(a.queue)j/=2;a.offset=n(a.offset);a.over=n(a.over);return this.scrollable().each(function(){var k=this,o=$(k),d=l,p,g={},q=o.is('html,body');switch(typeof d){case'number':case'string':if(/^([+-]=)?\d+(\.\d+)?(px)?$/.test(d)){d=n(d);break}d=$(d,this);case'object':if(d.is||d.style)p=(d=$(d)).offset()}$.each(a.axis.split(''),function(b,h){var f=h=='x'?'Left':'Top',i=f.toLowerCase(),c='scroll'+f,r=k[c],s=h=='x'?'Width':'Height';if(p){g[c]=p[i]+(q?0:r-o.offset()[i]);if(a.margin){g[c]-=parseInt(d.css('margin'+f))||0;g[c]-=parseInt(d.css('border'+f+'Width'))||0}g[c]+=a.offset[i]||0;if(a.over[i])g[c]+=d[s.toLowerCase()]()*a.over[i]}else g[c]=d[i];if(/^\d+$/.test(g[c]))g[c]=g[c]<=0?0:Math.min(g[c],u(s));if(!b&&a.queue){if(r!=g[c])t(a.onAfterFirst);delete g[c]}});t(a.onAfter);function t(b){o.animate(g,j,a.easing,b&&function(){b.call(this,l,a)})};function u(b){var h='scroll'+b;if(!q)return k[h];var f='client'+b,i=k.ownerDocument.documentElement,c=k.ownerDocument.body;return Math.max(i[h],c[h])-Math.min(i[f],c[f])}}).end()};function n(b){return typeof b=='object'?b:{top:b,left:b}}})(jQuery);




/*
 * Supersubs v0.2b - jQuery plugin
 * Copyright (c) 2008 Joel Birch
 *
 * Dual licensed under the MIT and GPL licenses:
 * 	http://www.opensource.org/licenses/mit-license.php
 * 	http://www.gnu.org/licenses/gpl.html
 */
;(function($){
	$.fn.supersubs = function(options){
		var opts = $.extend(
							{},
							$.fn.supersubs.defaults,
							options
					);
		return this.each(function(){
									var $$ = $(this);
									var o = $.meta ? $.extend({}, opts, $$.data()) : opts;
									var fontsize = $('<li id="menu-fontsize">&#8212;</li>').css({'padding':0,'position':'absolute','top':'-999em','width':'auto'}).appendTo($$).width();
									$('#menu-fontsize').remove();
									$ULs=$$.find('ul');
									$ULs.each(function(i){var $ul=$ULs.eq(i);
									var $LIs = $ul.children();
									var $As = $LIs.children('a');
									var liFloat = $LIs.css('white-space','nowrap').css('float');
									var emWidth = $ul.add($LIs).add($As).css({'float':'none','width':'auto'}).end().end()[0].clientWidth/fontsize;
									emWidth += o.extraWidth;
									if(emWidth>o.maxWidth){
										emWidth=o.maxWidth
									}
									else if(emWidth<o.minWidth){
										emWidth=o.minWidth
									}
									emWidth += 'em';
									$ul.css('width',emWidth);
									$LIs.css({'float':liFloat,'width':'100%','white-space':'normal'}).each(function(){var $childUl=$('>ul',this);
									var offsetDirection=$childUl.css('left')!==undefined?'left':'right';
									$childUl.css(offsetDirection,emWidth)
									})
									})
									})
		};
		$.fn.supersubs.defaults = {
			minWidth:9,
			maxWidth:25,
			extraWidth:0
		}
})(jQuery);

/*
 * Superfish v1.4.8 - jQuery menu widget
 * Copyright (c) 2008 Joel Birch
 *
 * Dual licensed under the MIT and GPL licenses:
 * 	http://www.opensource.org/licenses/mit-license.php
 * 	http://www.gnu.org/licenses/gpl.html
 */
;(function($){
	$.fn.superfish = function(op){
		var sf = $.fn.superfish,
		c = sf.c,
		$arrow = $(['<span class="', c.arrowClass, '">&#187;</span>'].join('')),
		over = function(){
			var $$ = $(this),
			menu = getMenu($$);
			clearTimeout(menu.sfTimer);
			$$.showSuperfishUl().siblings().hideSuperfishUl()
		},
		out = function(){
			var $$ = $(this),
			menu = getMenu($$),
			o = sf.op;
			clearTimeout(menu.sfTimer);
			menu.sfTimer = setTimeout(function(){
				o.retainPath = ($.inArray($$[0],o.$path)>-1);
				$$.hideSuperfishUl();
				if(o.$path.length && $$.parents(['li.',o.hoverClass].join('')).length<1){
					over.call(o.$path)
				}
			},
			o.delay
		)},
		getMenu = function($menu){
			var menu = $menu.parents(['ul.',c.menuClass,':first'].join(''))[0];
			sf.op = sf.o[menu.serial];
			return menu
		},
		addArrow = function($a){
			$a.addClass(c.anchorClass).append($arrow.clone())
		};
		return this.each(function(){
			var s = this.serial = sf.o.length;
			var o = $.extend({},sf.defaults,op);
			o.$path = $('li.'+o.pathClass,this).slice(0,o.pathLevels).each(function(){
				$(this).addClass([o.hoverClass,c.bcClass].join(' ')).filter('li:has(ul)').removeClass(o.pathClass)});
				sf.o[s] = sf.op = o;
				$('li:has(ul)', this)[($.fn.hoverIntent&&!o.disableHI) ? 'hoverIntent' : 'hover'](over,out).each(function(){
					if(o.autoArrows)addArrow($('>a:first-child',this))
				}).not('.'+c.bcClass).hideSuperfishUl();
				var $a = $('a',this);
				$a.each(function(i){
				var $li = $a.eq(i).parents('li');
				$a.eq(i).focus(function(){
					over.call($li)}).blur(function(){
						out.call($li)
					})
				});
				o.onInit.call(this)
			}).each(function(){
				var menuClasses = [c.menuClass];
				if(sf.op.dropShadows&&!($.browser.msie&&$.browser.version<7))menuClasses.push(c.shadowClass);
				$(this).addClass(menuClasses.join(' ')
			)}
		)};
		var sf = $.fn.superfish;
		sf.o = [];
		sf.op = {};
		sf.IE7fix = function(){
			var o = sf.op;
			if($.browser.msie&&$.browser.version>6&&o.dropShadows&&o.animation.opacity!=undefined)
				this.toggleClass(sf.c.shadowClass+'-off')
		};
		sf.c = {
			bcClass:'sf-breadcrumb',
			menuClass:'sf-js-enabled',
			anchorClass:'sf-with-ul',
			arrowClass:'sf-sub-indicator',
			shadowClass:'sf-shadow'};
			sf.defaults = {
				hoverClass:'sfHover',
				pathClass:'overideThisToUse',
				pathLevels:1,
				delay:800,
				animation:{
					opacity:'show'
				},
				speed:'normal',
				autoArrows:true,
				dropShadows:true,
				disableHI:false,
				onInit:function(){},
				onBeforeShow:function(){},
				onShow:function(){},
				onHide:function(){}
			};
			$.fn.extend({
				hideSuperfishUl : function(){
					var o=sf.op,
					not=(o.retainPath===true) ? o.$path : '';
					o.retainPath = false;
					var $ul = $(['li.',o.hoverClass].join(''),this).add(this).not(not).removeClass(o.hoverClass).find('>ul').hide().css('visibility','hidden');
					o.onHide.call($ul);
					return this
				},
				showSuperfishUl : function(){
					var o = sf.op,
					sh = sf.c.shadowClass+'-off',
					$ul = this.addClass(o.hoverClass).find('>ul:hidden').css('visibility','visible');
					sf.IE7fix.call($ul);
					o.onBeforeShow.call($ul);
					$ul.animate(
								o.animation,
								o.speed,
								function(){
									sf.IE7fix.call($ul);
									o.onShow.call($ul)
								}
					);
					return this
				}
			}
		)
	}
)(jQuery);

;(function($) {
	/*
		jquery.twitter.js v1.5
		Last updated: 08 July 2009

		Created by Damien du Toit
		http://coda.co.za/blog/2008/10/26/jquery-plugin-for-twitter

		Licensed under a Creative Commons Attribution-Non-Commercial 3.0 Unported License
		http://creativecommons.org/licenses/by-nc/3.0/
	*/

	$.fn.getTwitter = function(options) {

		$.fn.getTwitter.defaults = {
			userName: null,
			numTweets: 5,
			loaderText: "Loading tweets...",
			slideIn: true,
			slideDuration: 750,
			showHeading: true,
			headingText: "Latest Tweets",
			showProfileLink: true,
			showTimestamp: true
		};

		var o = $.extend({}, $.fn.getTwitter.defaults, options);

		return this.each(function() {
			var c = $(this);

			// hide container element, remove alternative content, and add class
			c.hide().empty().addClass("twitted");

			// add heading to container element
			if (o.showHeading) {
				c.append("<h2>"+o.headingText+"</h2>");
			}

			// add twitter list to container element
			var twitterListHTML = "<ul id=\"twitter_update_list\"><li></li></ul>";
			c.append(twitterListHTML);

			var tl = $("#twitter_update_list");

			// hide twitter list
			tl.hide();

			// add preLoader to container element
			var preLoaderHTML = $("<p class=\"preLoader\">"+o.loaderText+"</p>");
			c.append(preLoaderHTML);

			// add Twitter profile link to container element
			if (o.showProfileLink) {
				var profileLinkHTML = "<p class=\"profileLink\"><a href=\"http://twitter.com/"+o.userName+"\">http://twitter.com/"+o.userName+"</a></p>";
				c.append(profileLinkHTML);
			}

			// show container element
			c.show();

			$.getScript("http://twitter.com/javascripts/blogger.js");
			$.getScript("http://twitter.com/statuses/user_timeline/"+o.userName+".json?callback=twitterCallback2&count="+o.numTweets, function() {
				// remove preLoader from container element
				$(preLoaderHTML).remove();

				// remove timestamp and move to title of list item
				if (!o.showTimestamp) {
					tl.find("li").each(function() {
						var timestampHTML = $(this).children("a");
						var timestamp = timestampHTML.html();
						timestampHTML.remove();
						$(this).attr("title", timestamp);
					});
				}

				// show twitter list
				if (o.slideIn) {
					// a fix for the jQuery slide effect
					// Hat-tip: http://blog.pengoworks.com/index.cfm/2009/4/21/Fixing-jQuerys-slideDown-effect-ie-Jumpy-Animation
					var tlHeight = tl.data("originalHeight");

					// get the original height
					if (!tlHeight) {
						tlHeight = tl.show().height();
						tl.data("originalHeight", tlHeight);
						tl.hide().css({height: 0});
					}

					tl.show().animate({height: tlHeight}, o.slideDuration);
				}
				else {
					tl.show();
				}

				// add unique class to first list item
				tl.find("li:first").addClass("firstTweet");

				// add unique class to last list item
				tl.find("li:last").addClass("lastTweet");
			});
		});
	};
})(jQuery);

/*
* jQuery Scroll Plugin
*/
;(function($){$.fn.scrollToTop=function(options){if(options.speed){var speed=options.speed;}else{var speed="slow";}if(options.ease){var ease=options.ease;}else{var ease="jswing";}if(options.start){var start=options.start;}else{var start="0";}var scrollDiv=$(this);$(this).hide().removeAttr("href");if($(window).scrollTop()>start){$(this).fadeIn("slow");}$(window).scroll(function(){if($(window).scrollTop()>start){$(scrollDiv).fadeIn("slow");}else{$(scrollDiv).fadeOut("slow");}});$(this).click(function(event){$("html, body").animate({scrollTop:"0px"},speed,ease);});}})(jQuery);

/*
	<<<<<<< JavaScript Custom Form Validation Routines >>>>>>>>
	
* It's functionality is so simple. It doesn't show any validation message until user first attempts to submit forms with inappropriately filled field. When user's try to submit the form for first time this script checks if every field has been filled properly othwerwise it prevents submission to the server and notifies user about her mistake(s). This time it validates each field as user focuses in and blurs them(fields) off.

* You can also change error messages if you like.

*/

jQuery.fn.tinyValidator = function(options){
	var defaults = {
		emptyMsg: "This is a required field.",
		emailMsg: "Type a valid email address e.g. <code>john@domain.com</code>",
		urlMsg: "	Type proper url with \
						<code>http://</code> portion \
						or leave it blank<br /> \
						e.g. &nbsp; <code>http://yourdomain.com</code><br /> \
						<code>http://you.yourdomain.net</code>",
		sbtMsg: "Please, make sure you've properly filled all the above required fields.",

		genError: function(field, msg){
			var holder = field.parent();
			if(!holder.hasClass('warning')){
				holder.addClass('warning').append($('<p>' + msg + '</p>'));
			}
		},
		
		canError: function(field){
			var holder = field.parent();
			if(holder.hasClass('warning')){
				holder.removeClass('warning').children('p').remove();
			}
		}
	};
	
	var opts = jQuery.extend(defaults, options);
	
	return this.each(function(){
		var form = jQuery(this);
		
		form.one('submit', function(){
			jQuery(':input', form)
				.filter('.empty')
				.blur(function(){
					if(this.value == '' || /^\s+$/.test(this.value)){
						opts.genError(jQuery(this), opts.emptyMsg);
					}
					else{
						opts.canError(jQuery(this));
					}
				})
				.end()
				.filter('.email')
				.blur(function(){
					if(this.value == '' || !/.+@.+\.[a-zA-Z]{2,4}$/.test(this.value)){
						opts.genError(jQuery(this), opts.emailMsg);
					}
					else{
						opts.canError(jQuery(this));
					}
				})
				.end()
				.filter('.url')
				.blur(function(){
					if((this.value == '' || /^\s+$/.test(this.value)) && jQuery(this).hasClass('optional')){
						jQuery(this).val('');
						opts.canError(jQuery(this));
						return;
					}
					else if(this.value == '' || !/^(http|https):\/\/.+\.\w{2,4}$/.test(this.value)){
						opts.genError(jQuery(this), opts.urlMsg);
					}
					else{
						opts.canError(jQuery(this));
					}
				});
			}).submit(function(){
				jQuery(':input', form).trigger('blur');
				var warnings = jQuery('.warning', form).length;
				var parent = jQuery(':submit', form).parent('li');
				parent.find('p').remove();
				if(warnings > 0){
					parent.prepend(jQuery("<p><strong>" + opts.sbtMsg + "</strong></p>"));
					return false;
				}
				else{
					parent.find('p').remove();
					return true;
				}
		});
	});
};

/*	<<<<<<<< Site Initialization JavaScript Codes >>>>>>>>	*/

;(function($){
	
	$(document).ready(function(){
		$('.border').parent('a').css('border', 'none');
	});
	/* jQuery ScrollToTop plugin */
	$(function() { $("#toTop").scrollToTop({speed:1000,ease:"easeInOutQuad",start:600}); });
	
	/* scrollTo function declarations using 'scrollTo.js' jquery plugin	*/
	$(document).ready(function(){
		var $window = $(window);
		$('.reply, #leaveACmnt').click(function(){
			$window.stop().scrollTo($('#commentForm'), 900);
		});
	});
	

	/* cycle plugin function declarations using 'cycle.js' jquery plugin */
	$(document).ready(function(){
		if ($('#cycle').length > 0){
			$('#cycle').cycle({
				fx: 'scrollLeft',
				speed: 500,
				timeout: 8000,
				randomizeEffects: false,
				easing: 'easeInOutQuad', //jquery.easing library/plugin is required for this functionality
				next:   '',
				prev:   '',
				pager:  '#cyclePager',
				cleartypeNoBg: true
			});
		}
	});
	
	/*
	*	prettyPhoto startup function declarations using 'prettyPhoto.js' jquery plugin
	*	These short codes'll add a little dark effect on hover and also an appropriate icon for that particular content.
	*	You don't need to do anything here, just leave it as it is.
	*/
	$(document).ready(function(){
		$("a[rel^='prettyPhoto']").each(function(index){
			var HTML = $('<span class="prettyItemHover"><img src="files/images/prettyPhoto/magnifier.png" height="43" width="52"  /></span>');
			var ele = $(this);
			var itemSrc = ele.attr('href');
			ele.css({'position': 'relative', 'display': 'block'});
			ele.append(HTML);
		})
		.hover(function(){
			$(this).children('.prettyItemHover').css('visibility', 'visible');
			return false;
		}, function(){
			$(this).children('.prettyItemHover').css('visibility', 'hidden');
			return false;
		})
		.prettyPhoto();
	});
	
	/* altering search form label and using it's label as field's value */
	
	$(document).ready(function(){
		
		var $searchTerm = $('#searchTerm');
		
		if($searchTerm.val() == ''){
			$('label', '#header').css('display', 'inline');
		}

		$searchTerm.focus(function(){
			$searchTerm.siblings('label').hide();
		})
		.blur(function(){
			if($searchTerm.val() == ''){
				$searchTerm.siblings('label').show();
			}
		});
	});
	
	
	/*
	* dropdown menu function declarations using 'superfish.js' and 'supersubs.js' jquery plugin
	*/
	$(document).ready(function(){
		if(jQuery.browser.msie && parseInt(jQuery.browser.version, 10) < 7){
			$('ul', '#nav').superfish({
				delay: 1000,
				animation: {opacity: 'show'},
				speed: 800,
				autoArrows: false
			})
		}
		else{
			$('ul', '#nav').supersubs({
				minWidth: 8,
				maxWidth: 10,
				extraWidth: 0
			}).superfish({
				delay: 1000,
				animation: {opacity: 'show'},
				speed: 800,
				autoArrows: false
			})
		}
	});
	
	/*
	* initializting twitter plugin
	* change 'userName' variable with yours and you are done.
	* you can also alter other settings as you need them.
	*/
	$(document).ready(function() {
		$("#twitter").getTwitter({
			userName: "jquery",
			numTweets: 1,
			loaderText: "Loading tweets...",
			slideIn: true,
			slideDuration: 750,
			showHeading: true,
			headingText: "",
			showProfileLink: true,
			showTimestamp: true
		});
	});
	
	/* Initializing jQuery.tinyValidator, for form validation before submitting to the server. */
	$(document).ready(function(){
		$('form', '#commentForm').tinyValidator();
		$('form', '#contactForm').tinyValidator();
	});
})(jQuery);