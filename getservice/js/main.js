// jQuery Mask Plugin v1.14.15
// github.com/igorescobar/jQuery-Mask-Plugin
var $jscomp={scope:{},findInternal:function(a,l,d){a instanceof String&&(a=String(a));for(var p=a.length,h=0;h<p;h++){var b=a[h];if(l.call(d,b,h,a))return{i:h,v:b}}return{i:-1,v:void 0}}};$jscomp.defineProperty="function"==typeof Object.defineProperties?Object.defineProperty:function(a,l,d){if(d.get||d.set)throw new TypeError("ES3 does not support getters and setters.");a!=Array.prototype&&a!=Object.prototype&&(a[l]=d.value)};$jscomp.getGlobal=function(a){return"undefined"!=typeof window&&window===a?a:"undefined"!=typeof global&&null!=global?global:a};$jscomp.global=$jscomp.getGlobal(this);$jscomp.polyfill=function(a,l,d,p){if(l){d=$jscomp.global;a=a.split(".");for(p=0;p<a.length-1;p++){var h=a[p];h in d||(d[h]={});d=d[h]}a=a[a.length-1];p=d[a];l=l(p);l!=p&&null!=l&&$jscomp.defineProperty(d,a,{configurable:!0,writable:!0,value:l})}};$jscomp.polyfill("Array.prototype.find",function(a){return a?a:function(a,d){return $jscomp.findInternal(this,a,d).v}},"es6-impl","es3");(function(a,l,d){"function"===typeof define&&define.amd?define(["jquery"],a):"object"===typeof exports?module.exports=a(require("jquery")):a(l||d)})(function(a){var l=function(b,e,f){var c={invalid:[],getCaret:function(){try{var a,r=0,g=b.get(0),e=document.selection,f=g.selectionStart;if(e&&-1===navigator.appVersion.indexOf("MSIE 10"))a=e.createRange(),a.moveStart("character",-c.val().length),r=a.text.length;else if(f||"0"===f)r=f;return r}catch(C){}},setCaret:function(a){try{if(b.is(":focus")){var c,g=b.get(0);g.setSelectionRange?g.setSelectionRange(a,a):(c=g.createTextRange(),c.collapse(!0),c.moveEnd("character",a),c.moveStart("character",a),c.select())}}catch(B){}},events:function(){b.on("keydown.mask",function(a){b.data("mask-keycode",a.keyCode||a.which);b.data("mask-previus-value",b.val());b.data("mask-previus-caret-pos",c.getCaret());c.maskDigitPosMapOld=c.maskDigitPosMap}).on(a.jMaskGlobals.useInput?"input.mask":"keyup.mask",c.behaviour).on("paste.mask drop.mask",function(){setTimeout(function(){b.keydown().keyup()},100)}).on("change.mask",function(){b.data("changed",!0)}).on("blur.mask",function(){d===c.val()||b.data("changed")||b.trigger("change");b.data("changed",!1)}).on("blur.mask",function(){d=c.val()}).on("focus.mask",function(b){!0===f.selectOnFocus&&a(b.target).select()}).on("focusout.mask",function(){f.clearIfNotMatch&&!h.test(c.val())&&c.val("")})},getRegexMask:function(){for(var a=[],b,c,f,n,d=0;d<e.length;d++)(b=m.translation[e.charAt(d)])?(c=b.pattern.toString().replace(/.{1}$|^.{1}/g,""),f=b.optional,(b=b.recursive)?(a.push(e.charAt(d)),n={digit:e.charAt(d),pattern:c}):a.push(f||b?c+"?":c)):a.push(e.charAt(d).replace(/[-\/\\^$*+?.()|[\]{}]/g,"\\$&"));a=a.join("");n&&(a=a.replace(new RegExp("("+n.digit+"(.*"+n.digit+")?)"),"($1)?").replace(new RegExp(n.digit,"g"),n.pattern));return new RegExp(a)},destroyEvents:function(){b.off("input keydown keyup paste drop blur focusout ".split(" ").join(".mask "))},val:function(a){var c=b.is("input")?"val":"text";if(0<arguments.length){if(b[c]()!==a)b[c](a);c=b}else c=b[c]();return c},calculateCaretPosition:function(){var a=b.data("mask-previus-value")||"",e=c.getMasked(),g=c.getCaret();if(a!==e){var f=b.data("mask-previus-caret-pos")||0,e=e.length,d=a.length,m=a=0,h=0,l=0,k;for(k=g;k<e&&c.maskDigitPosMap[k];k++)m++;for(k=g-1;0<=k&&c.maskDigitPosMap[k];k--)a++;for(k=g-1;0<=k;k--)c.maskDigitPosMap[k]&&h++;for(k=f-1;0<=k;k--)c.maskDigitPosMapOld[k]&&l++;g>d?g=10*e:f>=g&&f!==d?c.maskDigitPosMapOld[g]||(f=g,g=g-(l-h)-a,c.maskDigitPosMap[g]&&(g=f)):g>f&&(g=g+(h-l)+m)}return g},behaviour:function(f){f=f||window.event;c.invalid=[];var e=b.data("mask-keycode");if(-1===a.inArray(e,m.byPassKeys)){var e=c.getMasked(),g=c.getCaret();setTimeout(function(){c.setCaret(c.calculateCaretPosition())},a.jMaskGlobals.keyStrokeCompensation);c.val(e);c.setCaret(g);return c.callbacks(f)}},getMasked:function(a,b){var g=[],d=void 0===b?c.val():b+"",n=0,h=e.length,q=0,l=d.length,k=1,r="push",p=-1,t=0,y=[],v,z;f.reverse?(r="unshift",k=-1,v=0,n=h-1,q=l-1,z=function(){return-1<n&&-1<q}):(v=h-1,z=function(){return n<h&&q<l});for(var A;z();){var x=e.charAt(n),w=d.charAt(q),u=m.translation[x];if(u)w.match(u.pattern)?(g[r](w),u.recursive&&(-1===p?p=n:n===v&&n!==p&&(n=p-k),v===p&&(n-=k)),n+=k):w===A?(t--,A=void 0):u.optional?(n+=k,q-=k):u.fallback?(g[r](u.fallback),n+=k,q-=k):c.invalid.push({p:q,v:w,e:u.pattern}),q+=k;else{if(!a)g[r](x);w===x?(y.push(q),q+=k):(A=x,y.push(q+t),t++);n+=k}}d=e.charAt(v);h!==l+1||m.translation[d]||g.push(d);g=g.join("");c.mapMaskdigitPositions(g,y,l);return g},mapMaskdigitPositions:function(a,b,e){a=f.reverse?a.length-e:0;c.maskDigitPosMap={};for(e=0;e<b.length;e++)c.maskDigitPosMap[b[e]+a]=1},callbacks:function(a){var h=c.val(),g=h!==d,m=[h,a,b,f],q=function(a,b,c){"function"===typeof f[a]&&b&&f[a].apply(this,c)};q("onChange",!0===g,m);q("onKeyPress",!0===g,m);q("onComplete",h.length===e.length,m);q("onInvalid",0<c.invalid.length,[h,a,b,c.invalid,f])}};b=a(b);var m=this,d=c.val(),h;e="function"===typeof e?e(c.val(),void 0,b,f):e;m.mask=e;m.options=f;m.remove=function(){var a=c.getCaret();m.options.placeholder&&b.removeAttr("placeholder");b.data("mask-maxlength")&&b.removeAttr("maxlength");c.destroyEvents();c.val(m.getCleanVal());c.setCaret(a);return b};m.getCleanVal=function(){return c.getMasked(!0)};m.getMaskedVal=function(a){return c.getMasked(!1,a)};m.init=function(d){d=d||!1;f=f||{};m.clearIfNotMatch=a.jMaskGlobals.clearIfNotMatch;m.byPassKeys=a.jMaskGlobals.byPassKeys;m.translation=a.extend({},a.jMaskGlobals.translation,f.translation);m=a.extend(!0,{},m,f);h=c.getRegexMask();if(d)c.events(),c.val(c.getMasked());else{f.placeholder&&b.attr("placeholder",f.placeholder);b.data("mask")&&b.attr("autocomplete","off");d=0;for(var l=!0;d<e.length;d++){var g=m.translation[e.charAt(d)];if(g&&g.recursive){l=!1;break}}l&&b.attr("maxlength",e.length).data("mask-maxlength",!0);c.destroyEvents();c.events();d=c.getCaret();c.val(c.getMasked());c.setCaret(d)}};m.init(!b.is("input"))};a.maskWatchers={};var d=function(){var b=a(this),e={},f=b.attr("data-mask");b.attr("data-mask-reverse")&&(e.reverse=!0);b.attr("data-mask-clearifnotmatch")&&(e.clearIfNotMatch=!0);"true"===b.attr("data-mask-selectonfocus")&&(e.selectOnFocus=!0);if(p(b,f,e))return b.data("mask",new l(this,f,e))},p=function(b,e,f){f=f||{};var c=a(b).data("mask"),d=JSON.stringify;b=a(b).val()||a(b).text();try{return"function"===typeof e&&(e=e(b)),"object"!==typeof c||d(c.options)!==d(f)||c.mask!==e}catch(t){}},h=function(a){var b=document.createElement("div"),d;a="on"+a;d=a in b;d||(b.setAttribute(a,"return;"),d="function"===typeof b[a]);return d};a.fn.mask=function(b,d){d=d||{};var e=this.selector,c=a.jMaskGlobals,h=c.watchInterval,c=d.watchInputs||c.watchInputs,t=function(){if(p(this,b,d))return a(this).data("mask",new l(this,b,d))};a(this).each(t);e&&""!==e&&c&&(clearInterval(a.maskWatchers[e]),a.maskWatchers[e]=setInterval(function(){a(document).find(e).each(t)},h));return this};a.fn.masked=function(a){return this.data("mask").getMaskedVal(a)};a.fn.unmask=function(){clearInterval(a.maskWatchers[this.selector]);delete a.maskWatchers[this.selector];return this.each(function(){var b=a(this).data("mask");b&&b.remove().removeData("mask")})};a.fn.cleanVal=function(){return this.data("mask").getCleanVal()};a.applyDataMask=function(b){b=b||a.jMaskGlobals.maskElements;(b instanceof a?b:a(b)).filter(a.jMaskGlobals.dataMaskAttr).each(d)};h={maskElements:"input,td,span,div",dataMaskAttr:"*[data-mask]",dataMask:!0,watchInterval:300,watchInputs:!0,keyStrokeCompensation:10,useInput:!/Chrome\/[2-4][0-9]|SamsungBrowser/.test(window.navigator.userAgent)&&h("input"),watchDataMask:!1,byPassKeys:[9,16,17,18,36,37,38,39,40,91],translation:{0:{pattern:/\d/},9:{pattern:/\d/,optional:!0},"#":{pattern:/\d/,recursive:!0},A:{pattern:/[a-zA-Z0-9]/},S:{pattern:/[a-zA-Z]/}}};a.jMaskGlobals=a.jMaskGlobals||{};h=a.jMaskGlobals=a.extend(!0,{},h,a.jMaskGlobals);h.dataMask&&a.applyDataMask();setInterval(function(){a.jMaskGlobals.watchDataMask&&a.applyDataMask()},h.watchInterval)},window.jQuery,window.Zepto)

/*!
 *	dotdotdot JS 4.0.5
 */
var Dotdotdot=function(){function t(e,i){var n=this;for(var o in this.container=e,this.options=i,this.watchTimeout=null,this.watchInterval=null,this.resizeEvent=null,t.options)t.options.hasOwnProperty(o)&&void 0===this.options[o]&&(this.options[o]=t.options[o]);var r=this.container.dotdotdot;r&&r.destroy(),this.API={},["truncate","restore","destroy","watch","unwatch"].forEach(function(t){n.API[t]=function(){return n[t].call(n)}}),this.container.dotdotdot=this.API,this.originalStyle=this.container.getAttribute("style")||"",this.originalContent=this._getOriginalContent(),this.ellipsis=document.createTextNode(this.options.ellipsis);var s=window.getComputedStyle(this.container);"break-word"!==s["word-wrap"]&&(this.container.style["word-wrap"]="break-word"),"nowrap"===s["white-space"]&&(this.container.style["white-space"]="normal"),null===this.options.height&&(this.options.height=this._getMaxHeight()),this.truncate(),this.options.watch&&this.watch()}return t.prototype.restore=function(){var t=this;this.unwatch(),this.container.setAttribute("style",this.originalStyle),this.container.classList.remove("ddd-truncated"),this.container.innerHTML="",this.originalContent.forEach(function(e){t.container.append(e)})},t.prototype.destroy=function(){this.restore(),this.container.dotdotdot=null},t.prototype.watch=function(){var t=this;this.unwatch();var e={width:null,height:null},i=function(i,n,o){if(t.container.offsetWidth||t.container.offsetHeight||t.container.getClientRects().length){var r={width:i[n],height:i[o]};return e.width==r.width&&e.height==r.height||t.truncate(),r}return e};"window"==this.options.watch?(this.resizeEvent=function(n){t.watchTimeout&&clearTimeout(t.watchTimeout),t.watchTimeout=setTimeout(function(){e=i(window,"innerWidth","innerHeight")},100)},window.addEventListener("resize",this.resizeEvent)):this.watchInterval=setInterval(function(){e=i(t.container,"clientWidth","clientHeight")},1e3)},t.prototype.unwatch=function(){this.resizeEvent&&(window.removeEventListener("resize",this.resizeEvent),this.resizeEvent=null),this.watchInterval&&clearInterval(this.watchInterval),this.watchTimeout&&clearTimeout(this.watchTimeout)},t.prototype.truncate=function(){var t=this,e=!1;return this.container.innerHTML="",this.originalContent.forEach(function(e){t.container.append(e.cloneNode(!0))}),this.maxHeight=this._getMaxHeight(),this._fits()||(e=!0,this._truncateToNode(this.container)),this.container.classList[e?"add":"remove"]("ddd-truncated"),this.options.callback.call(this.container,e),e},t.prototype._truncateToNode=function(e){var i=[],n=[];if(t.$.contents(e).forEach(function(t){if(1!=t.nodeType||!t.matches(".ddd-keep")){var e=document.createComment("");t.replaceWith(e),n.push(t),i.push(e)}}),n.length){for(var o=0;o<n.length;o++){i[o].replaceWith(n[o]);var r=this.ellipsis.cloneNode(!0);switch(n[o].nodeType){case 1:n[o].append(r);break;case 3:n[o].after(r)}var s=this._fits();if(r.parentElement.removeChild(r),!s){if("node"==this.options.truncate&&o>1)return void n[o-2].remove();break}}for(var a=o;a<i.length;a++)i[a].remove();var h=n[Math.max(0,Math.min(o,n.length-1))];if(1==h.nodeType){var c=document.createElement(h.nodeName);c.append(this.ellipsis),h.replaceWith(c),this._fits()?c.replaceWith(h):(c.remove(),h=n[Math.max(0,o-1)])}1==h.nodeType?this._truncateToNode(h):this._truncateToWord(h)}},t.prototype._truncateToWord=function(t){for(var e=t.textContent,i=-1!==e.indexOf(" ")?" ":"　",n=e.split(i),o=n.length;o>=0;o--)if(t.textContent=this._addEllipsis(n.slice(0,o).join(i)),this._fits()){"letter"==this.options.truncate&&(t.textContent=n.slice(0,o+1).join(i),this._truncateToLetter(t));break}},t.prototype._truncateToLetter=function(t){for(var e=t.textContent.split(""),i="",n=e.length;n>=0&&(!(i=e.slice(0,n).join("")).length||(t.textContent=this._addEllipsis(i),!this._fits()));n--);},t.prototype._fits=function(){return this.container.scrollHeight<=this.maxHeight+this.options.tolerance},t.prototype._addEllipsis=function(t){for(var e=[" ","　",",",";",".","!","?"];e.indexOf(t.slice(-1))>-1;)t=t.slice(0,-1);return t+=this.ellipsis.textContent},t.prototype._getOriginalContent=function(){var e="script, style";this.options.keep&&(e+=", "+this.options.keep),t.$.find(e,this.container).forEach(function(t){t.classList.add("ddd-keep")}),[this.container].concat(t.$.find("*",this.container)).forEach(function(e){e.normalize(),t.$.contents(e).forEach(function(t){var i=!1;if(3==t.nodeType){if(""==t.textContent.trim()){var n=t.previousSibling,o=t.nextSibling;(t.parentElement.matches("table, thead, tbody, tfoot, tr, dl, ul, ol, video")||!n||n.matches("div, p, table, td, td, dt, dd, li")||!o||o.matches("div, p, table, td, td, dt, dd, li"))&&(i=!0)}}else 8==t.nodeType&&(i=!0);i&&e.removeChild(t)})});var i=[];return t.$.contents(this.container).forEach(function(t){i.push(t.cloneNode(!0))}),i},t.prototype._getMaxHeight=function(){if("number"==typeof this.options.height)return this.options.height;for(var t=window.getComputedStyle(this.container),e=["maxHeight","height"],i=0,n=0;n<e.length;n++){if("px"==(o=t[e[n]]).slice(-2)){i=parseFloat(o);break}}switch(e=[],t.boxSizing){case"border-box":e.push("borderTopWidth"),e.push("borderBottomWidth");case"padding-box":e.push("paddingTop"),e.push("paddingBottom")}for(n=0;n<e.length;n++){var o;"px"==(o=t[e[n]]).slice(-2)&&(i-=parseFloat(o))}return Math.max(i,0)},t.version="4.0.5",t.options={ellipsis:"… ",callback:function(t){},truncate:"word",tolerance:0,keep:null,watch:"window",height:null},t.$={find:function(t,e){return e=e||document,Array.prototype.slice.call(e.querySelectorAll(t))},contents:function(t){return t=t||document,Array.prototype.slice.call(t.childNodes)}},t}();!function(t){void 0!==t&&(t.fn.dotdotdot=function(t){return this.each(function(e,i){var n=new Dotdotdot(i,t);i.dotdotdot=n.API})})}(window.Zepto||window.jQuery);

document.addEventListener( "DOMContentLoaded", () => {
   let wrapper = document.querySelector( "#descript-sale1" );
   let options = {
      // Options go here
      height: 120,

   };
   new Dotdotdot( wrapper, options );
});
document.addEventListener( "DOMContentLoaded", () => {
   let wrapper = document.querySelector( "#descript-sale2" );
   let options = {
      // Options go here
      height: 120,
   };
   new Dotdotdot( wrapper, options );
});
document.addEventListener( "DOMContentLoaded", () => {
   let wrapper = document.querySelector( "#descript-sale3" );
   let options = {
      // Options go here
      height: 120,
   };
   new Dotdotdot( wrapper, options );
});
document.addEventListener( "DOMContentLoaded", () => {
   let wrapper = document.querySelector( "#descript-sale4" );
   let options = {
      // Options go here
      height: 120,
   };
   new Dotdotdot( wrapper, options );
});

//___________________________________________________________________________________________________________________________

$('.callback__inp[type="tel"]').mask('+7 (000) 000-00-00', {placeholder: "+7 (000) 000-00-00"});
$('.popup-callback__tel').mask('+7 (000) 000-00-00');


//Header Меню
if ($(window).width() < 991) {
  	$(".menu-open").click(function() {
		$(this).addClass("hamburger--open");
		$('.bottom-head nav').addClass('open');
		$('body, html').css('overflow', 'hidden');
	});
	$(".bottom-head nav").click(function() {
		$('.menu-open').removeClass("hamburger--open");
		$('.bottom-head nav').removeClass('open');
		$('body, html').css('overflow', '');
	});
}

//Попап окно обратного звонка
$('.btn-popup').click(function(){
	$('.popup-callback').addClass('popup-callback-active');
	$('.popup-callback').mouseup(function (e){
		var div = $(".popup-callback__wrap"); 
		if (!div.is(e.target)
		    && div.has(e.target).length === 0) { 
			$('.popup-callback').removeClass('popup-callback-active');
		}
	});
	$('.popup-callback__close').click(function(){
		$('.popup-callback').removeClass('popup-callback-active');
	});
});



function createObject() {
var request_type;
var browser = navigator.appName;
if(browser == "Microsoft Internet Explorer"){
request_type = new ActiveXObject("Microsoft.XMLHTTP");
}else{
request_type = new XMLHttpRequest();
}
return request_type;
}

var http = createObject();

function rad_trackname(){
    http.open('get', 'http://online.radiorecord.ru:8102/dub_128');
    http.onreadystatechange = ServerReply;
    http.send(null);
}

function ServerReply() {
    if(http.readyState == 4){ 
      console.log('1')
        var response = http.responseText;
        if(response == ''){
            document.getElementById('track_name').innerHTML = 'Datas not found';
             console.log('1')
        } else {
            document.getElementById('track_name').innerHTML = response;
            console.log(response)
        }
    }
}





