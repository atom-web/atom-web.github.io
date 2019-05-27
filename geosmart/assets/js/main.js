/**
 * Owl Carousel v2.2.1
 * Copyright 2013-2017 David Deutsch
 * Licensed under  ()
 */
!function(a,b,c,d){function e(b,c){this.settings=null,this.options=a.extend({},e.Defaults,c),this.$element=a(b),this._handlers={},this._plugins={},this._supress={},this._current=null,this._speed=null,this._coordinates=[],this._breakpoint=null,this._width=null,this._items=[],this._clones=[],this._mergers=[],this._widths=[],this._invalidated={},this._pipe=[],this._drag={time:null,target:null,pointer:null,stage:{start:null,current:null},direction:null},this._states={current:{},tags:{initializing:["busy"],animating:["busy"],dragging:["interacting"]}},a.each(["onResize","onThrottledResize"],a.proxy(function(b,c){this._handlers[c]=a.proxy(this[c],this)},this)),a.each(e.Plugins,a.proxy(function(a,b){this._plugins[a.charAt(0).toLowerCase()+a.slice(1)]=new b(this)},this)),a.each(e.Workers,a.proxy(function(b,c){this._pipe.push({filter:c.filter,run:a.proxy(c.run,this)})},this)),this.setup(),this.initialize()}e.Defaults={items:3,loop:!1,center:!1,rewind:!1,mouseDrag:!0,touchDrag:!0,pullDrag:!0,freeDrag:!1,margin:0,stagePadding:0,merge:!1,mergeFit:!0,autoWidth:!1,startPosition:0,rtl:!1,smartSpeed:250,fluidSpeed:!1,dragEndSpeed:!1,responsive:{},responsiveRefreshRate:200,responsiveBaseElement:b,fallbackEasing:"swing",info:!1,nestedItemSelector:!1,itemElement:"div",stageElement:"div",refreshClass:"owl-refresh",loadedClass:"owl-loaded",loadingClass:"owl-loading",rtlClass:"owl-rtl",responsiveClass:"owl-responsive",dragClass:"owl-drag",itemClass:"owl-item",stageClass:"owl-stage",stageOuterClass:"owl-stage-outer",grabClass:"owl-grab"},e.Width={Default:"default",Inner:"inner",Outer:"outer"},e.Type={Event:"event",State:"state"},e.Plugins={},e.Workers=[{filter:["width","settings"],run:function(){this._width=this.$element.width()}},{filter:["width","items","settings"],run:function(a){a.current=this._items&&this._items[this.relative(this._current)]}},{filter:["items","settings"],run:function(){this.$stage.children(".cloned").remove()}},{filter:["width","items","settings"],run:function(a){var b=this.settings.margin||"",c=!this.settings.autoWidth,d=this.settings.rtl,e={width:"auto","margin-left":d?b:"","margin-right":d?"":b};!c&&this.$stage.children().css(e),a.css=e}},{filter:["width","items","settings"],run:function(a){var b=(this.width()/this.settings.items).toFixed(3)-this.settings.margin,c=null,d=this._items.length,e=!this.settings.autoWidth,f=[];for(a.items={merge:!1,width:b};d--;)c=this._mergers[d],c=this.settings.mergeFit&&Math.min(c,this.settings.items)||c,a.items.merge=c>1||a.items.merge,f[d]=e?b*c:this._items[d].width();this._widths=f}},{filter:["items","settings"],run:function(){var b=[],c=this._items,d=this.settings,e=Math.max(2*d.items,4),f=2*Math.ceil(c.length/2),g=d.loop&&c.length?d.rewind?e:Math.max(e,f):0,h="",i="";for(g/=2;g--;)b.push(this.normalize(b.length/2,!0)),h+=c[b[b.length-1]][0].outerHTML,b.push(this.normalize(c.length-1-(b.length-1)/2,!0)),i=c[b[b.length-1]][0].outerHTML+i;this._clones=b,a(h).addClass("cloned").appendTo(this.$stage),a(i).addClass("cloned").prependTo(this.$stage)}},{filter:["width","items","settings"],run:function(){for(var a=this.settings.rtl?1:-1,b=this._clones.length+this._items.length,c=-1,d=0,e=0,f=[];++c<b;)d=f[c-1]||0,e=this._widths[this.relative(c)]+this.settings.margin,f.push(d+e*a);this._coordinates=f}},{filter:["width","items","settings"],run:function(){var a=this.settings.stagePadding,b=this._coordinates,c={width:Math.ceil(Math.abs(b[b.length-1]))+2*a,"padding-left":a||"","padding-right":a||""};this.$stage.css(c)}},{filter:["width","items","settings"],run:function(a){var b=this._coordinates.length,c=!this.settings.autoWidth,d=this.$stage.children();if(c&&a.items.merge)for(;b--;)a.css.width=this._widths[this.relative(b)],d.eq(b).css(a.css);else c&&(a.css.width=a.items.width,d.css(a.css))}},{filter:["items"],run:function(){this._coordinates.length<1&&this.$stage.removeAttr("style")}},{filter:["width","items","settings"],run:function(a){a.current=a.current?this.$stage.children().index(a.current):0,a.current=Math.max(this.minimum(),Math.min(this.maximum(),a.current)),this.reset(a.current)}},{filter:["position"],run:function(){this.animate(this.coordinates(this._current))}},{filter:["width","position","items","settings"],run:function(){var a,b,c,d,e=this.settings.rtl?1:-1,f=2*this.settings.stagePadding,g=this.coordinates(this.current())+f,h=g+this.width()*e,i=[];for(c=0,d=this._coordinates.length;c<d;c++)a=this._coordinates[c-1]||0,b=Math.abs(this._coordinates[c])+f*e,(this.op(a,"<=",g)&&this.op(a,">",h)||this.op(b,"<",g)&&this.op(b,">",h))&&i.push(c);this.$stage.children(".active").removeClass("active"),this.$stage.children(":eq("+i.join("), :eq(")+")").addClass("active"),this.settings.center&&(this.$stage.children(".center").removeClass("center"),this.$stage.children().eq(this.current()).addClass("center"))}}],e.prototype.initialize=function(){if(this.enter("initializing"),this.trigger("initialize"),this.$element.toggleClass(this.settings.rtlClass,this.settings.rtl),this.settings.autoWidth&&!this.is("pre-loading")){var b,c,e;b=this.$element.find("img"),c=this.settings.nestedItemSelector?"."+this.settings.nestedItemSelector:d,e=this.$element.children(c).width(),b.length&&e<=0&&this.preloadAutoWidthImages(b)}this.$element.addClass(this.options.loadingClass),this.$stage=a("<"+this.settings.stageElement+' class="'+this.settings.stageClass+'"/>').wrap('<div class="'+this.settings.stageOuterClass+'"/>'),this.$element.append(this.$stage.parent()),this.replace(this.$element.children().not(this.$stage.parent())),this.$element.is(":visible")?this.refresh():this.invalidate("width"),this.$element.removeClass(this.options.loadingClass).addClass(this.options.loadedClass),this.registerEventHandlers(),this.leave("initializing"),this.trigger("initialized")},e.prototype.setup=function(){var b=this.viewport(),c=this.options.responsive,d=-1,e=null;c?(a.each(c,function(a){a<=b&&a>d&&(d=Number(a))}),e=a.extend({},this.options,c[d]),"function"==typeof e.stagePadding&&(e.stagePadding=e.stagePadding()),delete e.responsive,e.responsiveClass&&this.$element.attr("class",this.$element.attr("class").replace(new RegExp("("+this.options.responsiveClass+"-)\\S+\\s","g"),"$1"+d))):e=a.extend({},this.options),this.trigger("change",{property:{name:"settings",value:e}}),this._breakpoint=d,this.settings=e,this.invalidate("settings"),this.trigger("changed",{property:{name:"settings",value:this.settings}})},e.prototype.optionsLogic=function(){this.settings.autoWidth&&(this.settings.stagePadding=!1,this.settings.merge=!1)},e.prototype.prepare=function(b){var c=this.trigger("prepare",{content:b});return c.data||(c.data=a("<"+this.settings.itemElement+"/>").addClass(this.options.itemClass).append(b)),this.trigger("prepared",{content:c.data}),c.data},e.prototype.update=function(){for(var b=0,c=this._pipe.length,d=a.proxy(function(a){return this[a]},this._invalidated),e={};b<c;)(this._invalidated.all||a.grep(this._pipe[b].filter,d).length>0)&&this._pipe[b].run(e),b++;this._invalidated={},!this.is("valid")&&this.enter("valid")},e.prototype.width=function(a){switch(a=a||e.Width.Default){case e.Width.Inner:case e.Width.Outer:return this._width;default:return this._width-2*this.settings.stagePadding+this.settings.margin}},e.prototype.refresh=function(){this.enter("refreshing"),this.trigger("refresh"),this.setup(),this.optionsLogic(),this.$element.addClass(this.options.refreshClass),this.update(),this.$element.removeClass(this.options.refreshClass),this.leave("refreshing"),this.trigger("refreshed")},e.prototype.onThrottledResize=function(){b.clearTimeout(this.resizeTimer),this.resizeTimer=b.setTimeout(this._handlers.onResize,this.settings.responsiveRefreshRate)},e.prototype.onResize=function(){return!!this._items.length&&(this._width!==this.$element.width()&&(!!this.$element.is(":visible")&&(this.enter("resizing"),this.trigger("resize").isDefaultPrevented()?(this.leave("resizing"),!1):(this.invalidate("width"),this.refresh(),this.leave("resizing"),void this.trigger("resized")))))},e.prototype.registerEventHandlers=function(){a.support.transition&&this.$stage.on(a.support.transition.end+".owl.core",a.proxy(this.onTransitionEnd,this)),this.settings.responsive!==!1&&this.on(b,"resize",this._handlers.onThrottledResize),this.settings.mouseDrag&&(this.$element.addClass(this.options.dragClass),this.$stage.on("mousedown.owl.core",a.proxy(this.onDragStart,this)),this.$stage.on("dragstart.owl.core selectstart.owl.core",function(){return!1})),this.settings.touchDrag&&(this.$stage.on("touchstart.owl.core",a.proxy(this.onDragStart,this)),this.$stage.on("touchcancel.owl.core",a.proxy(this.onDragEnd,this)))},e.prototype.onDragStart=function(b){var d=null;3!==b.which&&(a.support.transform?(d=this.$stage.css("transform").replace(/.*\(|\)| /g,"").split(","),d={x:d[16===d.length?12:4],y:d[16===d.length?13:5]}):(d=this.$stage.position(),d={x:this.settings.rtl?d.left+this.$stage.width()-this.width()+this.settings.margin:d.left,y:d.top}),this.is("animating")&&(a.support.transform?this.animate(d.x):this.$stage.stop(),this.invalidate("position")),this.$element.toggleClass(this.options.grabClass,"mousedown"===b.type),this.speed(0),this._drag.time=(new Date).getTime(),this._drag.target=a(b.target),this._drag.stage.start=d,this._drag.stage.current=d,this._drag.pointer=this.pointer(b),a(c).on("mouseup.owl.core touchend.owl.core",a.proxy(this.onDragEnd,this)),a(c).one("mousemove.owl.core touchmove.owl.core",a.proxy(function(b){var d=this.difference(this._drag.pointer,this.pointer(b));a(c).on("mousemove.owl.core touchmove.owl.core",a.proxy(this.onDragMove,this)),Math.abs(d.x)<Math.abs(d.y)&&this.is("valid")||(b.preventDefault(),this.enter("dragging"),this.trigger("drag"))},this)))},e.prototype.onDragMove=function(a){var b=null,c=null,d=null,e=this.difference(this._drag.pointer,this.pointer(a)),f=this.difference(this._drag.stage.start,e);this.is("dragging")&&(a.preventDefault(),this.settings.loop?(b=this.coordinates(this.minimum()),c=this.coordinates(this.maximum()+1)-b,f.x=((f.x-b)%c+c)%c+b):(b=this.settings.rtl?this.coordinates(this.maximum()):this.coordinates(this.minimum()),c=this.settings.rtl?this.coordinates(this.minimum()):this.coordinates(this.maximum()),d=this.settings.pullDrag?-1*e.x/5:0,f.x=Math.max(Math.min(f.x,b+d),c+d)),this._drag.stage.current=f,this.animate(f.x))},e.prototype.onDragEnd=function(b){var d=this.difference(this._drag.pointer,this.pointer(b)),e=this._drag.stage.current,f=d.x>0^this.settings.rtl?"left":"right";a(c).off(".owl.core"),this.$element.removeClass(this.options.grabClass),(0!==d.x&&this.is("dragging")||!this.is("valid"))&&(this.speed(this.settings.dragEndSpeed||this.settings.smartSpeed),this.current(this.closest(e.x,0!==d.x?f:this._drag.direction)),this.invalidate("position"),this.update(),this._drag.direction=f,(Math.abs(d.x)>3||(new Date).getTime()-this._drag.time>300)&&this._drag.target.one("click.owl.core",function(){return!1})),this.is("dragging")&&(this.leave("dragging"),this.trigger("dragged"))},e.prototype.closest=function(b,c){var d=-1,e=30,f=this.width(),g=this.coordinates();return this.settings.freeDrag||a.each(g,a.proxy(function(a,h){return"left"===c&&b>h-e&&b<h+e?d=a:"right"===c&&b>h-f-e&&b<h-f+e?d=a+1:this.op(b,"<",h)&&this.op(b,">",g[a+1]||h-f)&&(d="left"===c?a+1:a),d===-1},this)),this.settings.loop||(this.op(b,">",g[this.minimum()])?d=b=this.minimum():this.op(b,"<",g[this.maximum()])&&(d=b=this.maximum())),d},e.prototype.animate=function(b){var c=this.speed()>0;this.is("animating")&&this.onTransitionEnd(),c&&(this.enter("animating"),this.trigger("translate")),a.support.transform3d&&a.support.transition?this.$stage.css({transform:"translate3d("+b+"px,0px,0px)",transition:this.speed()/1e3+"s"}):c?this.$stage.animate({left:b+"px"},this.speed(),this.settings.fallbackEasing,a.proxy(this.onTransitionEnd,this)):this.$stage.css({left:b+"px"})},e.prototype.is=function(a){return this._states.current[a]&&this._states.current[a]>0},e.prototype.current=function(a){if(a===d)return this._current;if(0===this._items.length)return d;if(a=this.normalize(a),this._current!==a){var b=this.trigger("change",{property:{name:"position",value:a}});b.data!==d&&(a=this.normalize(b.data)),this._current=a,this.invalidate("position"),this.trigger("changed",{property:{name:"position",value:this._current}})}return this._current},e.prototype.invalidate=function(b){return"string"===a.type(b)&&(this._invalidated[b]=!0,this.is("valid")&&this.leave("valid")),a.map(this._invalidated,function(a,b){return b})},e.prototype.reset=function(a){a=this.normalize(a),a!==d&&(this._speed=0,this._current=a,this.suppress(["translate","translated"]),this.animate(this.coordinates(a)),this.release(["translate","translated"]))},e.prototype.normalize=function(a,b){var c=this._items.length,e=b?0:this._clones.length;return!this.isNumeric(a)||c<1?a=d:(a<0||a>=c+e)&&(a=((a-e/2)%c+c)%c+e/2),a},e.prototype.relative=function(a){return a-=this._clones.length/2,this.normalize(a,!0)},e.prototype.maximum=function(a){var b,c,d,e=this.settings,f=this._coordinates.length;if(e.loop)f=this._clones.length/2+this._items.length-1;else if(e.autoWidth||e.merge){for(b=this._items.length,c=this._items[--b].width(),d=this.$element.width();b--&&(c+=this._items[b].width()+this.settings.margin,!(c>d)););f=b+1}else f=e.center?this._items.length-1:this._items.length-e.items;return a&&(f-=this._clones.length/2),Math.max(f,0)},e.prototype.minimum=function(a){return a?0:this._clones.length/2},e.prototype.items=function(a){return a===d?this._items.slice():(a=this.normalize(a,!0),this._items[a])},e.prototype.mergers=function(a){return a===d?this._mergers.slice():(a=this.normalize(a,!0),this._mergers[a])},e.prototype.clones=function(b){var c=this._clones.length/2,e=c+this._items.length,f=function(a){return a%2===0?e+a/2:c-(a+1)/2};return b===d?a.map(this._clones,function(a,b){return f(b)}):a.map(this._clones,function(a,c){return a===b?f(c):null})},e.prototype.speed=function(a){return a!==d&&(this._speed=a),this._speed},e.prototype.coordinates=function(b){var c,e=1,f=b-1;return b===d?a.map(this._coordinates,a.proxy(function(a,b){return this.coordinates(b)},this)):(this.settings.center?(this.settings.rtl&&(e=-1,f=b+1),c=this._coordinates[b],c+=(this.width()-c+(this._coordinates[f]||0))/2*e):c=this._coordinates[f]||0,c=Math.ceil(c))},e.prototype.duration=function(a,b,c){return 0===c?0:Math.min(Math.max(Math.abs(b-a),1),6)*Math.abs(c||this.settings.smartSpeed)},e.prototype.to=function(a,b){var c=this.current(),d=null,e=a-this.relative(c),f=(e>0)-(e<0),g=this._items.length,h=this.minimum(),i=this.maximum();this.settings.loop?(!this.settings.rewind&&Math.abs(e)>g/2&&(e+=f*-1*g),a=c+e,d=((a-h)%g+g)%g+h,d!==a&&d-e<=i&&d-e>0&&(c=d-e,a=d,this.reset(c))):this.settings.rewind?(i+=1,a=(a%i+i)%i):a=Math.max(h,Math.min(i,a)),this.speed(this.duration(c,a,b)),this.current(a),this.$element.is(":visible")&&this.update()},e.prototype.next=function(a){a=a||!1,this.to(this.relative(this.current())+1,a)},e.prototype.prev=function(a){a=a||!1,this.to(this.relative(this.current())-1,a)},e.prototype.onTransitionEnd=function(a){if(a!==d&&(a.stopPropagation(),(a.target||a.srcElement||a.originalTarget)!==this.$stage.get(0)))return!1;this.leave("animating"),this.trigger("translated")},e.prototype.viewport=function(){var d;return this.options.responsiveBaseElement!==b?d=a(this.options.responsiveBaseElement).width():b.innerWidth?d=b.innerWidth:c.documentElement&&c.documentElement.clientWidth?d=c.documentElement.clientWidth:console.warn("Can not detect viewport width."),d},e.prototype.replace=function(b){this.$stage.empty(),this._items=[],b&&(b=b instanceof jQuery?b:a(b)),this.settings.nestedItemSelector&&(b=b.find("."+this.settings.nestedItemSelector)),b.filter(function(){return 1===this.nodeType}).each(a.proxy(function(a,b){b=this.prepare(b),this.$stage.append(b),this._items.push(b),this._mergers.push(1*b.find("[data-merge]").addBack("[data-merge]").attr("data-merge")||1)},this)),this.reset(this.isNumeric(this.settings.startPosition)?this.settings.startPosition:0),this.invalidate("items")},e.prototype.add=function(b,c){var e=this.relative(this._current);c=c===d?this._items.length:this.normalize(c,!0),b=b instanceof jQuery?b:a(b),this.trigger("add",{content:b,position:c}),b=this.prepare(b),0===this._items.length||c===this._items.length?(0===this._items.length&&this.$stage.append(b),0!==this._items.length&&this._items[c-1].after(b),this._items.push(b),this._mergers.push(1*b.find("[data-merge]").addBack("[data-merge]").attr("data-merge")||1)):(this._items[c].before(b),this._items.splice(c,0,b),this._mergers.splice(c,0,1*b.find("[data-merge]").addBack("[data-merge]").attr("data-merge")||1)),this._items[e]&&this.reset(this._items[e].index()),this.invalidate("items"),this.trigger("added",{content:b,position:c})},e.prototype.remove=function(a){a=this.normalize(a,!0),a!==d&&(this.trigger("remove",{content:this._items[a],position:a}),this._items[a].remove(),this._items.splice(a,1),this._mergers.splice(a,1),this.invalidate("items"),this.trigger("removed",{content:null,position:a}))},e.prototype.preloadAutoWidthImages=function(b){b.each(a.proxy(function(b,c){this.enter("pre-loading"),c=a(c),a(new Image).one("load",a.proxy(function(a){c.attr("src",a.target.src),c.css("opacity",1),this.leave("pre-loading"),!this.is("pre-loading")&&!this.is("initializing")&&this.refresh()},this)).attr("src",c.attr("src")||c.attr("data-src")||c.attr("data-src-retina"))},this))},e.prototype.destroy=function(){this.$element.off(".owl.core"),this.$stage.off(".owl.core"),a(c).off(".owl.core"),this.settings.responsive!==!1&&(b.clearTimeout(this.resizeTimer),this.off(b,"resize",this._handlers.onThrottledResize));for(var d in this._plugins)this._plugins[d].destroy();this.$stage.children(".cloned").remove(),this.$stage.unwrap(),this.$stage.children().contents().unwrap(),this.$stage.children().unwrap(),this.$element.removeClass(this.options.refreshClass).removeClass(this.options.loadingClass).removeClass(this.options.loadedClass).removeClass(this.options.rtlClass).removeClass(this.options.dragClass).removeClass(this.options.grabClass).attr("class",this.$element.attr("class").replace(new RegExp(this.options.responsiveClass+"-\\S+\\s","g"),"")).removeData("owl.carousel")},e.prototype.op=function(a,b,c){var d=this.settings.rtl;switch(b){case"<":return d?a>c:a<c;case">":return d?a<c:a>c;case">=":return d?a<=c:a>=c;case"<=":return d?a>=c:a<=c}},e.prototype.on=function(a,b,c,d){a.addEventListener?a.addEventListener(b,c,d):a.attachEvent&&a.attachEvent("on"+b,c)},e.prototype.off=function(a,b,c,d){a.removeEventListener?a.removeEventListener(b,c,d):a.detachEvent&&a.detachEvent("on"+b,c)},e.prototype.trigger=function(b,c,d,f,g){var h={item:{count:this._items.length,index:this.current()}},i=a.camelCase(a.grep(["on",b,d],function(a){return a}).join("-").toLowerCase()),j=a.Event([b,"owl",d||"carousel"].join(".").toLowerCase(),a.extend({relatedTarget:this},h,c));return this._supress[b]||(a.each(this._plugins,function(a,b){b.onTrigger&&b.onTrigger(j)}),this.register({type:e.Type.Event,name:b}),this.$element.trigger(j),this.settings&&"function"==typeof this.settings[i]&&this.settings[i].call(this,j)),j},e.prototype.enter=function(b){a.each([b].concat(this._states.tags[b]||[]),a.proxy(function(a,b){this._states.current[b]===d&&(this._states.current[b]=0),this._states.current[b]++},this))},e.prototype.leave=function(b){a.each([b].concat(this._states.tags[b]||[]),a.proxy(function(a,b){this._states.current[b]--},this))},e.prototype.register=function(b){if(b.type===e.Type.Event){if(a.event.special[b.name]||(a.event.special[b.name]={}),!a.event.special[b.name].owl){var c=a.event.special[b.name]._default;a.event.special[b.name]._default=function(a){return!c||!c.apply||a.namespace&&a.namespace.indexOf("owl")!==-1?a.namespace&&a.namespace.indexOf("owl")>-1:c.apply(this,arguments)},a.event.special[b.name].owl=!0}}else b.type===e.Type.State&&(this._states.tags[b.name]?this._states.tags[b.name]=this._states.tags[b.name].concat(b.tags):this._states.tags[b.name]=b.tags,this._states.tags[b.name]=a.grep(this._states.tags[b.name],a.proxy(function(c,d){return a.inArray(c,this._states.tags[b.name])===d},this)))},e.prototype.suppress=function(b){a.each(b,a.proxy(function(a,b){this._supress[b]=!0},this))},e.prototype.release=function(b){a.each(b,a.proxy(function(a,b){delete this._supress[b]},this))},e.prototype.pointer=function(a){var c={x:null,y:null};return a=a.originalEvent||a||b.event,a=a.touches&&a.touches.length?a.touches[0]:a.changedTouches&&a.changedTouches.length?a.changedTouches[0]:a,a.pageX?(c.x=a.pageX,c.y=a.pageY):(c.x=a.clientX,c.y=a.clientY),c},e.prototype.isNumeric=function(a){return!isNaN(parseFloat(a))},e.prototype.difference=function(a,b){return{x:a.x-b.x,y:a.y-b.y}},a.fn.owlCarousel=function(b){var c=Array.prototype.slice.call(arguments,1);return this.each(function(){var d=a(this),f=d.data("owl.carousel");f||(f=new e(this,"object"==typeof b&&b),d.data("owl.carousel",f),a.each(["next","prev","to","destroy","refresh","replace","add","remove"],function(b,c){f.register({type:e.Type.Event,name:c}),f.$element.on(c+".owl.carousel.core",a.proxy(function(a){a.namespace&&a.relatedTarget!==this&&(this.suppress([c]),f[c].apply(this,[].slice.call(arguments,1)),this.release([c]))},f))})),"string"==typeof b&&"_"!==b.charAt(0)&&f[b].apply(f,c)})},a.fn.owlCarousel.Constructor=e}(window.Zepto||window.jQuery,window,document),function(a,b,c,d){var e=function(b){this._core=b,this._interval=null,this._visible=null,this._handlers={"initialized.owl.carousel":a.proxy(function(a){a.namespace&&this._core.settings.autoRefresh&&this.watch()},this)},this._core.options=a.extend({},e.Defaults,this._core.options),this._core.$element.on(this._handlers)};e.Defaults={autoRefresh:!0,autoRefreshInterval:500},e.prototype.watch=function(){this._interval||(this._visible=this._core.$element.is(":visible"),this._interval=b.setInterval(a.proxy(this.refresh,this),this._core.settings.autoRefreshInterval))},e.prototype.refresh=function(){this._core.$element.is(":visible")!==this._visible&&(this._visible=!this._visible,this._core.$element.toggleClass("owl-hidden",!this._visible),this._visible&&this._core.invalidate("width")&&this._core.refresh())},e.prototype.destroy=function(){var a,c;b.clearInterval(this._interval);for(a in this._handlers)this._core.$element.off(a,this._handlers[a]);for(c in Object.getOwnPropertyNames(this))"function"!=typeof this[c]&&(this[c]=null)},a.fn.owlCarousel.Constructor.Plugins.AutoRefresh=e}(window.Zepto||window.jQuery,window,document),function(a,b,c,d){var e=function(b){this._core=b,this._loaded=[],this._handlers={"initialized.owl.carousel change.owl.carousel resized.owl.carousel":a.proxy(function(b){if(b.namespace&&this._core.settings&&this._core.settings.lazyLoad&&(b.property&&"position"==b.property.name||"initialized"==b.type))for(var c=this._core.settings,e=c.center&&Math.ceil(c.items/2)||c.items,f=c.center&&e*-1||0,g=(b.property&&b.property.value!==d?b.property.value:this._core.current())+f,h=this._core.clones().length,i=a.proxy(function(a,b){this.load(b)},this);f++<e;)this.load(h/2+this._core.relative(g)),h&&a.each(this._core.clones(this._core.relative(g)),i),g++},this)},this._core.options=a.extend({},e.Defaults,this._core.options),this._core.$element.on(this._handlers)};e.Defaults={lazyLoad:!1},e.prototype.load=function(c){var d=this._core.$stage.children().eq(c),e=d&&d.find(".owl-lazy");!e||a.inArray(d.get(0),this._loaded)>-1||(e.each(a.proxy(function(c,d){var e,f=a(d),g=b.devicePixelRatio>1&&f.attr("data-src-retina")||f.attr("data-src");this._core.trigger("load",{element:f,url:g},"lazy"),f.is("img")?f.one("load.owl.lazy",a.proxy(function(){f.css("opacity",1),this._core.trigger("loaded",{element:f,url:g},"lazy")},this)).attr("src",g):(e=new Image,e.onload=a.proxy(function(){f.css({"background-image":'url("'+g+'")',opacity:"1"}),this._core.trigger("loaded",{element:f,url:g},"lazy")},this),e.src=g)},this)),this._loaded.push(d.get(0)))},e.prototype.destroy=function(){var a,b;for(a in this.handlers)this._core.$element.off(a,this.handlers[a]);for(b in Object.getOwnPropertyNames(this))"function"!=typeof this[b]&&(this[b]=null)},a.fn.owlCarousel.Constructor.Plugins.Lazy=e}(window.Zepto||window.jQuery,window,document),function(a,b,c,d){var e=function(b){this._core=b,this._handlers={"initialized.owl.carousel refreshed.owl.carousel":a.proxy(function(a){a.namespace&&this._core.settings.autoHeight&&this.update()},this),"changed.owl.carousel":a.proxy(function(a){a.namespace&&this._core.settings.autoHeight&&"position"==a.property.name&&this.update()},this),"loaded.owl.lazy":a.proxy(function(a){a.namespace&&this._core.settings.autoHeight&&a.element.closest("."+this._core.settings.itemClass).index()===this._core.current()&&this.update()},this)},this._core.options=a.extend({},e.Defaults,this._core.options),this._core.$element.on(this._handlers)};e.Defaults={autoHeight:!1,autoHeightClass:"owl-height"},e.prototype.update=function(){var b=this._core._current,c=b+this._core.settings.items,d=this._core.$stage.children().toArray().slice(b,c),e=[],f=0;a.each(d,function(b,c){e.push(a(c).height())}),f=Math.max.apply(null,e),this._core.$stage.parent().height(f).addClass(this._core.settings.autoHeightClass)},e.prototype.destroy=function(){var a,b;for(a in this._handlers)this._core.$element.off(a,this._handlers[a]);for(b in Object.getOwnPropertyNames(this))"function"!=typeof this[b]&&(this[b]=null)},a.fn.owlCarousel.Constructor.Plugins.AutoHeight=e}(window.Zepto||window.jQuery,window,document),function(a,b,c,d){var e=function(b){this._core=b,this._videos={},this._playing=null,this._handlers={"initialized.owl.carousel":a.proxy(function(a){a.namespace&&this._core.register({type:"state",name:"playing",tags:["interacting"]})},this),"resize.owl.carousel":a.proxy(function(a){a.namespace&&this._core.settings.video&&this.isInFullScreen()&&a.preventDefault()},this),"refreshed.owl.carousel":a.proxy(function(a){a.namespace&&this._core.is("resizing")&&this._core.$stage.find(".cloned .owl-video-frame").remove()},this),"changed.owl.carousel":a.proxy(function(a){a.namespace&&"position"===a.property.name&&this._playing&&this.stop()},this),"prepared.owl.carousel":a.proxy(function(b){if(b.namespace){var c=a(b.content).find(".owl-video");c.length&&(c.css("display","none"),this.fetch(c,a(b.content)))}},this)},this._core.options=a.extend({},e.Defaults,this._core.options),this._core.$element.on(this._handlers),this._core.$element.on("click.owl.video",".owl-video-play-icon",a.proxy(function(a){this.play(a)},this))};e.Defaults={video:!1,videoHeight:!1,videoWidth:!1},e.prototype.fetch=function(a,b){var c=function(){return a.attr("data-vimeo-id")?"vimeo":a.attr("data-vzaar-id")?"vzaar":"youtube"}(),d=a.attr("data-vimeo-id")||a.attr("data-youtube-id")||a.attr("data-vzaar-id"),e=a.attr("data-width")||this._core.settings.videoWidth,f=a.attr("data-height")||this._core.settings.videoHeight,g=a.attr("href");if(!g)throw new Error("Missing video URL.");if(d=g.match(/(http:|https:|)\/\/(player.|www.|app.)?(vimeo\.com|youtu(be\.com|\.be|be\.googleapis\.com)|vzaar\.com)\/(video\/|videos\/|embed\/|channels\/.+\/|groups\/.+\/|watch\?v=|v\/)?([A-Za-z0-9._%-]*)(\&\S+)?/),d[3].indexOf("youtu")>-1)c="youtube";else if(d[3].indexOf("vimeo")>-1)c="vimeo";else{if(!(d[3].indexOf("vzaar")>-1))throw new Error("Video URL not supported.");c="vzaar"}d=d[6],this._videos[g]={type:c,id:d,width:e,height:f},b.attr("data-video",g),this.thumbnail(a,this._videos[g])},e.prototype.thumbnail=function(b,c){var d,e,f,g=c.width&&c.height?'style="width:'+c.width+"px;height:"+c.height+'px;"':"",h=b.find("img"),i="src",j="",k=this._core.settings,l=function(a){e='<div class="owl-video-play-icon"></div>',d=k.lazyLoad?'<div class="owl-video-tn '+j+'" '+i+'="'+a+'"></div>':'<div class="owl-video-tn" style="opacity:1;background-image:url('+a+')"></div>',b.after(d),b.after(e)};if(b.wrap('<div class="owl-video-wrapper"'+g+"></div>"),this._core.settings.lazyLoad&&(i="data-src",j="owl-lazy"),h.length)return l(h.attr(i)),h.remove(),!1;"youtube"===c.type?(f="//img.youtube.com/vi/"+c.id+"/hqdefault.jpg",l(f)):"vimeo"===c.type?a.ajax({type:"GET",url:"//vimeo.com/api/v2/video/"+c.id+".json",jsonp:"callback",dataType:"jsonp",success:function(a){f=a[0].thumbnail_large,l(f)}}):"vzaar"===c.type&&a.ajax({type:"GET",url:"//vzaar.com/api/videos/"+c.id+".json",jsonp:"callback",dataType:"jsonp",success:function(a){f=a.framegrab_url,l(f)}})},e.prototype.stop=function(){this._core.trigger("stop",null,"video"),this._playing.find(".owl-video-frame").remove(),this._playing.removeClass("owl-video-playing"),this._playing=null,this._core.leave("playing"),this._core.trigger("stopped",null,"video")},e.prototype.play=function(b){var c,d=a(b.target),e=d.closest("."+this._core.settings.itemClass),f=this._videos[e.attr("data-video")],g=f.width||"100%",h=f.height||this._core.$stage.height();this._playing||(this._core.enter("playing"),this._core.trigger("play",null,"video"),e=this._core.items(this._core.relative(e.index())),this._core.reset(e.index()),"youtube"===f.type?c='<iframe width="'+g+'" height="'+h+'" src="//www.youtube.com/embed/'+f.id+"?autoplay=1&rel=0&v="+f.id+'" frameborder="0" allowfullscreen></iframe>':"vimeo"===f.type?c='<iframe src="//player.vimeo.com/video/'+f.id+'?autoplay=1" width="'+g+'" height="'+h+'" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>':"vzaar"===f.type&&(c='<iframe frameborder="0"height="'+h+'"width="'+g+'" allowfullscreen mozallowfullscreen webkitAllowFullScreen src="//view.vzaar.com/'+f.id+'/player?autoplay=true"></iframe>'),a('<div class="owl-video-frame">'+c+"</div>").insertAfter(e.find(".owl-video")),this._playing=e.addClass("owl-video-playing"))},e.prototype.isInFullScreen=function(){var b=c.fullscreenElement||c.mozFullScreenElement||c.webkitFullscreenElement;return b&&a(b).parent().hasClass("owl-video-frame")},e.prototype.destroy=function(){var a,b;this._core.$element.off("click.owl.video");for(a in this._handlers)this._core.$element.off(a,this._handlers[a]);for(b in Object.getOwnPropertyNames(this))"function"!=typeof this[b]&&(this[b]=null)},a.fn.owlCarousel.Constructor.Plugins.Video=e}(window.Zepto||window.jQuery,window,document),function(a,b,c,d){var e=function(b){this.core=b,this.core.options=a.extend({},e.Defaults,this.core.options),this.swapping=!0,this.previous=d,this.next=d,this.handlers={"change.owl.carousel":a.proxy(function(a){a.namespace&&"position"==a.property.name&&(this.previous=this.core.current(),this.next=a.property.value)},this),"drag.owl.carousel dragged.owl.carousel translated.owl.carousel":a.proxy(function(a){a.namespace&&(this.swapping="translated"==a.type)},this),"translate.owl.carousel":a.proxy(function(a){a.namespace&&this.swapping&&(this.core.options.animateOut||this.core.options.animateIn)&&this.swap()},this)},this.core.$element.on(this.handlers)};e.Defaults={animateOut:!1,animateIn:!1},e.prototype.swap=function(){if(1===this.core.settings.items&&a.support.animation&&a.support.transition){this.core.speed(0);var b,c=a.proxy(this.clear,this),d=this.core.$stage.children().eq(this.previous),e=this.core.$stage.children().eq(this.next),f=this.core.settings.animateIn,g=this.core.settings.animateOut;this.core.current()!==this.previous&&(g&&(b=this.core.coordinates(this.previous)-this.core.coordinates(this.next),d.one(a.support.animation.end,c).css({left:b+"px"}).addClass("animated owl-animated-out").addClass(g)),f&&e.one(a.support.animation.end,c).addClass("animated owl-animated-in").addClass(f))}},e.prototype.clear=function(b){a(b.target).css({left:""}).removeClass("animated owl-animated-out owl-animated-in").removeClass(this.core.settings.animateIn).removeClass(this.core.settings.animateOut),this.core.onTransitionEnd()},e.prototype.destroy=function(){var a,b;for(a in this.handlers)this.core.$element.off(a,this.handlers[a]);for(b in Object.getOwnPropertyNames(this))"function"!=typeof this[b]&&(this[b]=null)},
a.fn.owlCarousel.Constructor.Plugins.Animate=e}(window.Zepto||window.jQuery,window,document),function(a,b,c,d){var e=function(b){this._core=b,this._timeout=null,this._paused=!1,this._handlers={"changed.owl.carousel":a.proxy(function(a){a.namespace&&"settings"===a.property.name?this._core.settings.autoplay?this.play():this.stop():a.namespace&&"position"===a.property.name&&this._core.settings.autoplay&&this._setAutoPlayInterval()},this),"initialized.owl.carousel":a.proxy(function(a){a.namespace&&this._core.settings.autoplay&&this.play()},this),"play.owl.autoplay":a.proxy(function(a,b,c){a.namespace&&this.play(b,c)},this),"stop.owl.autoplay":a.proxy(function(a){a.namespace&&this.stop()},this),"mouseover.owl.autoplay":a.proxy(function(){this._core.settings.autoplayHoverPause&&this._core.is("rotating")&&this.pause()},this),"mouseleave.owl.autoplay":a.proxy(function(){this._core.settings.autoplayHoverPause&&this._core.is("rotating")&&this.play()},this),"touchstart.owl.core":a.proxy(function(){this._core.settings.autoplayHoverPause&&this._core.is("rotating")&&this.pause()},this),"touchend.owl.core":a.proxy(function(){this._core.settings.autoplayHoverPause&&this.play()},this)},this._core.$element.on(this._handlers),this._core.options=a.extend({},e.Defaults,this._core.options)};e.Defaults={autoplay:!1,autoplayTimeout:5e3,autoplayHoverPause:!1,autoplaySpeed:!1},e.prototype.play=function(a,b){this._paused=!1,this._core.is("rotating")||(this._core.enter("rotating"),this._setAutoPlayInterval())},e.prototype._getNextTimeout=function(d,e){return this._timeout&&b.clearTimeout(this._timeout),b.setTimeout(a.proxy(function(){this._paused||this._core.is("busy")||this._core.is("interacting")||c.hidden||this._core.next(e||this._core.settings.autoplaySpeed)},this),d||this._core.settings.autoplayTimeout)},e.prototype._setAutoPlayInterval=function(){this._timeout=this._getNextTimeout()},e.prototype.stop=function(){this._core.is("rotating")&&(b.clearTimeout(this._timeout),this._core.leave("rotating"))},e.prototype.pause=function(){this._core.is("rotating")&&(this._paused=!0)},e.prototype.destroy=function(){var a,b;this.stop();for(a in this._handlers)this._core.$element.off(a,this._handlers[a]);for(b in Object.getOwnPropertyNames(this))"function"!=typeof this[b]&&(this[b]=null)},a.fn.owlCarousel.Constructor.Plugins.autoplay=e}(window.Zepto||window.jQuery,window,document),function(a,b,c,d){"use strict";var e=function(b){this._core=b,this._initialized=!1,this._pages=[],this._controls={},this._templates=[],this.$element=this._core.$element,this._overrides={next:this._core.next,prev:this._core.prev,to:this._core.to},this._handlers={"prepared.owl.carousel":a.proxy(function(b){b.namespace&&this._core.settings.dotsData&&this._templates.push('<div class="'+this._core.settings.dotClass+'">'+a(b.content).find("[data-dot]").addBack("[data-dot]").attr("data-dot")+"</div>")},this),"added.owl.carousel":a.proxy(function(a){a.namespace&&this._core.settings.dotsData&&this._templates.splice(a.position,0,this._templates.pop())},this),"remove.owl.carousel":a.proxy(function(a){a.namespace&&this._core.settings.dotsData&&this._templates.splice(a.position,1)},this),"changed.owl.carousel":a.proxy(function(a){a.namespace&&"position"==a.property.name&&this.draw()},this),"initialized.owl.carousel":a.proxy(function(a){a.namespace&&!this._initialized&&(this._core.trigger("initialize",null,"navigation"),this.initialize(),this.update(),this.draw(),this._initialized=!0,this._core.trigger("initialized",null,"navigation"))},this),"refreshed.owl.carousel":a.proxy(function(a){a.namespace&&this._initialized&&(this._core.trigger("refresh",null,"navigation"),this.update(),this.draw(),this._core.trigger("refreshed",null,"navigation"))},this)},this._core.options=a.extend({},e.Defaults,this._core.options),this.$element.on(this._handlers)};e.Defaults={nav:!1,navText:["prev","next"],navSpeed:!1,navElement:"div",navContainer:!1,navContainerClass:"owl-nav",navClass:["owl-prev","owl-next"],slideBy:1,dotClass:"owl-dot",dotsClass:"owl-dots",dots:!0,dotsEach:!1,dotsData:!1,dotsSpeed:!1,dotsContainer:!1},e.prototype.initialize=function(){var b,c=this._core.settings;this._controls.$relative=(c.navContainer?a(c.navContainer):a("<div>").addClass(c.navContainerClass).appendTo(this.$element)).addClass("disabled"),this._controls.$previous=a("<"+c.navElement+">").addClass(c.navClass[0]).html(c.navText[0]).prependTo(this._controls.$relative).on("click",a.proxy(function(a){this.prev(c.navSpeed)},this)),this._controls.$next=a("<"+c.navElement+">").addClass(c.navClass[1]).html(c.navText[1]).appendTo(this._controls.$relative).on("click",a.proxy(function(a){this.next(c.navSpeed)},this)),c.dotsData||(this._templates=[a("<div>").addClass(c.dotClass).append(a("<span>")).prop("outerHTML")]),this._controls.$absolute=(c.dotsContainer?a(c.dotsContainer):a("<div>").addClass(c.dotsClass).appendTo(this.$element)).addClass("disabled"),this._controls.$absolute.on("click","div",a.proxy(function(b){var d=a(b.target).parent().is(this._controls.$absolute)?a(b.target).index():a(b.target).parent().index();b.preventDefault(),this.to(d,c.dotsSpeed)},this));for(b in this._overrides)this._core[b]=a.proxy(this[b],this)},e.prototype.destroy=function(){var a,b,c,d;for(a in this._handlers)this.$element.off(a,this._handlers[a]);for(b in this._controls)this._controls[b].remove();for(d in this.overides)this._core[d]=this._overrides[d];for(c in Object.getOwnPropertyNames(this))"function"!=typeof this[c]&&(this[c]=null)},e.prototype.update=function(){var a,b,c,d=this._core.clones().length/2,e=d+this._core.items().length,f=this._core.maximum(!0),g=this._core.settings,h=g.center||g.autoWidth||g.dotsData?1:g.dotsEach||g.items;if("page"!==g.slideBy&&(g.slideBy=Math.min(g.slideBy,g.items)),g.dots||"page"==g.slideBy)for(this._pages=[],a=d,b=0,c=0;a<e;a++){if(b>=h||0===b){if(this._pages.push({start:Math.min(f,a-d),end:a-d+h-1}),Math.min(f,a-d)===f)break;b=0,++c}b+=this._core.mergers(this._core.relative(a))}},e.prototype.draw=function(){var b,c=this._core.settings,d=this._core.items().length<=c.items,e=this._core.relative(this._core.current()),f=c.loop||c.rewind;this._controls.$relative.toggleClass("disabled",!c.nav||d),c.nav&&(this._controls.$previous.toggleClass("disabled",!f&&e<=this._core.minimum(!0)),this._controls.$next.toggleClass("disabled",!f&&e>=this._core.maximum(!0))),this._controls.$absolute.toggleClass("disabled",!c.dots||d),c.dots&&(b=this._pages.length-this._controls.$absolute.children().length,c.dotsData&&0!==b?this._controls.$absolute.html(this._templates.join("")):b>0?this._controls.$absolute.append(new Array(b+1).join(this._templates[0])):b<0&&this._controls.$absolute.children().slice(b).remove(),this._controls.$absolute.find(".active").removeClass("active"),this._controls.$absolute.children().eq(a.inArray(this.current(),this._pages)).addClass("active"))},e.prototype.onTrigger=function(b){var c=this._core.settings;b.page={index:a.inArray(this.current(),this._pages),count:this._pages.length,size:c&&(c.center||c.autoWidth||c.dotsData?1:c.dotsEach||c.items)}},e.prototype.current=function(){var b=this._core.relative(this._core.current());return a.grep(this._pages,a.proxy(function(a,c){return a.start<=b&&a.end>=b},this)).pop()},e.prototype.getPosition=function(b){var c,d,e=this._core.settings;return"page"==e.slideBy?(c=a.inArray(this.current(),this._pages),d=this._pages.length,b?++c:--c,c=this._pages[(c%d+d)%d].start):(c=this._core.relative(this._core.current()),d=this._core.items().length,b?c+=e.slideBy:c-=e.slideBy),c},e.prototype.next=function(b){a.proxy(this._overrides.to,this._core)(this.getPosition(!0),b)},e.prototype.prev=function(b){a.proxy(this._overrides.to,this._core)(this.getPosition(!1),b)},e.prototype.to=function(b,c,d){var e;!d&&this._pages.length?(e=this._pages.length,a.proxy(this._overrides.to,this._core)(this._pages[(b%e+e)%e].start,c)):a.proxy(this._overrides.to,this._core)(b,c)},a.fn.owlCarousel.Constructor.Plugins.Navigation=e}(window.Zepto||window.jQuery,window,document),function(a,b,c,d){"use strict";var e=function(c){this._core=c,this._hashes={},this.$element=this._core.$element,this._handlers={"initialized.owl.carousel":a.proxy(function(c){c.namespace&&"URLHash"===this._core.settings.startPosition&&a(b).trigger("hashchange.owl.navigation")},this),"prepared.owl.carousel":a.proxy(function(b){if(b.namespace){var c=a(b.content).find("[data-hash]").addBack("[data-hash]").attr("data-hash");if(!c)return;this._hashes[c]=b.content}},this),"changed.owl.carousel":a.proxy(function(c){if(c.namespace&&"position"===c.property.name){var d=this._core.items(this._core.relative(this._core.current())),e=a.map(this._hashes,function(a,b){return a===d?b:null}).join();if(!e||b.location.hash.slice(1)===e)return;b.location.hash=e}},this)},this._core.options=a.extend({},e.Defaults,this._core.options),this.$element.on(this._handlers),a(b).on("hashchange.owl.navigation",a.proxy(function(a){var c=b.location.hash.substring(1),e=this._core.$stage.children(),f=this._hashes[c]&&e.index(this._hashes[c]);f!==d&&f!==this._core.current()&&this._core.to(this._core.relative(f),!1,!0)},this))};e.Defaults={URLhashListener:!1},e.prototype.destroy=function(){var c,d;a(b).off("hashchange.owl.navigation");for(c in this._handlers)this._core.$element.off(c,this._handlers[c]);for(d in Object.getOwnPropertyNames(this))"function"!=typeof this[d]&&(this[d]=null)},a.fn.owlCarousel.Constructor.Plugins.Hash=e}(window.Zepto||window.jQuery,window,document),function(a,b,c,d){function e(b,c){var e=!1,f=b.charAt(0).toUpperCase()+b.slice(1);return a.each((b+" "+h.join(f+" ")+f).split(" "),function(a,b){if(g[b]!==d)return e=!c||b,!1}),e}function f(a){return e(a,!0)}var g=a("<support>").get(0).style,h="Webkit Moz O ms".split(" "),i={transition:{end:{WebkitTransition:"webkitTransitionEnd",MozTransition:"transitionend",OTransition:"oTransitionEnd",transition:"transitionend"}},animation:{end:{WebkitAnimation:"webkitAnimationEnd",MozAnimation:"animationend",OAnimation:"oAnimationEnd",animation:"animationend"}}},j={csstransforms:function(){return!!e("transform")},csstransforms3d:function(){return!!e("perspective")},csstransitions:function(){return!!e("transition")},cssanimations:function(){return!!e("animation")}};j.csstransitions()&&(a.support.transition=new String(f("transition")),a.support.transition.end=i.transition.end[a.support.transition]),j.cssanimations()&&(a.support.animation=new String(f("animation")),a.support.animation.end=i.animation.end[a.support.animation]),j.csstransforms()&&(a.support.transform=new String(f("transform")),a.support.transform3d=j.csstransforms3d())}(window.Zepto||window.jQuery,window,document);


// Device.js
// (c) 2014 Matthew Hudson
// Device.js is freely distributable under the MIT license.
// For all details and documentation:
// http://matthewhudson.me/projects/device.js/

(function() {

  var device,
    previousDevice,
    addClass,
    documentElement,
    find,
    handleOrientation,
    hasClass,
    orientationEvent,
    removeClass,
    userAgent;

  // Save the previous value of the device variable.
  previousDevice = window.device;

  device = {};

  // Add device as a global object.
  window.device = device;

  // The <html> element.
  documentElement = window.document.documentElement;

  // The client user agent string.
  // Lowercase, so we can use the more efficient indexOf(), instead of Regex
  userAgent = window.navigator.userAgent.toLowerCase();

  // Main functions
  // --------------

  device.ios = function () {
    return device.iphone() || device.ipod() || device.ipad();
  };

  device.iphone = function () {
    return !device.windows() && find('iphone');
  };

  device.ipod = function () {
    return find('ipod');
  };

  device.ipad = function () {
    return find('ipad');
  };

  device.android = function () {
    return !device.windows() && find('android');
  };

  device.androidPhone = function () {
    return device.android() && find('mobile');
  };

  device.androidTablet = function () {
    return device.android() && !find('mobile');
  };

  device.blackberry = function () {
    return find('blackberry') || find('bb10') || find('rim');
  };

  device.blackberryPhone = function () {
    return device.blackberry() && !find('tablet');
  };

  device.blackberryTablet = function () {
    return device.blackberry() && find('tablet');
  };

  device.windows = function () {
    return find('windows');
  };

  device.windowsPhone = function () {
    return device.windows() && find('phone');
  };

  device.windowsTablet = function () {
    return device.windows() && (find('touch') && !device.windowsPhone());
  };

  device.fxos = function () {
    return (find('(mobile;') || find('(tablet;')) && find('; rv:');
  };

  device.fxosPhone = function () {
    return device.fxos() && find('mobile');
  };

  device.fxosTablet = function () {
    return device.fxos() && find('tablet');
  };

  device.meego = function () {
    return find('meego');
  };

  device.cordova = function () {
    return window.cordova && location.protocol === 'file:';
  };

  device.nodeWebkit = function () {
    return typeof window.process === 'object';
  };

  device.mobile = function () {
    return device.androidPhone() || device.iphone() || device.ipod() || device.windowsPhone() || device.blackberryPhone() || device.fxosPhone() || device.meego();
  };

  device.tablet = function () {
    return device.ipad() || device.androidTablet() || device.blackberryTablet() || device.windowsTablet() || device.fxosTablet();
  };

  device.desktop = function () {
    return !device.tablet() && !device.mobile();
  };

  device.television = function() {
    var i, tvString;

    television = [
      "googletv",
      "viera",
      "smarttv",
      "internet.tv",
      "netcast",
      "nettv",
      "appletv",
      "boxee",
      "kylo",
      "roku",
      "dlnadoc",
      "roku",
      "pov_tv",
      "hbbtv",
      "ce-html"
    ];

    i = 0;
    while (i < television.length) {
      if (find(television[i])) {
        return true;
      }
      i++;
    }
    return false;
  };

  device.portrait = function () {
    return (window.innerHeight / window.innerWidth) > 1;
  };

  device.landscape = function () {
    return (window.innerHeight / window.innerWidth) < 1;
  };

  // Public Utility Functions
  // ------------------------

  // Run device.js in noConflict mode,
  // returning the device variable to its previous owner.
  device.noConflict = function () {
    window.device = previousDevice;
    return this;
  };

  // Private Utility Functions
  // -------------------------

  // Simple UA string search
  find = function (needle) {
    return userAgent.indexOf(needle) !== -1;
  };

  // Check if documentElement already has a given class.
  hasClass = function (className) {
    var regex;
    regex = new RegExp(className, 'i');
    return documentElement.className.match(regex);
  };

  // Add one or more CSS classes to the <html> element.
  addClass = function (className) {
    var currentClassNames = null;
    if (!hasClass(className)) {
      currentClassNames = documentElement.className.replace(/^\s+|\s+$/g, '');
      documentElement.className = currentClassNames + " " + className;
    }
  };

  // Remove single CSS class from the <html> element.
  removeClass = function (className) {
    if (hasClass(className)) {
      documentElement.className = documentElement.className.replace(" " + className, "");
    }
  };

  // HTML Element Handling
  // ---------------------

  // Insert the appropriate CSS class based on the _user_agent.

  if (device.ios()) {
    if (device.ipad()) {
      addClass("ios ipad tablet");
    } else if (device.iphone()) {
      addClass("ios iphone mobile");
    } else if (device.ipod()) {
      addClass("ios ipod mobile");
    }
  } else if (device.android()) {
    if (device.androidTablet()) {
      addClass("android tablet");
    } else {
      addClass("android mobile");
    }
  } else if (device.blackberry()) {
    if (device.blackberryTablet()) {
      addClass("blackberry tablet");
    } else {
      addClass("blackberry mobile");
    }
  } else if (device.windows()) {
    if (device.windowsTablet()) {
      addClass("windows tablet");
    } else if (device.windowsPhone()) {
      addClass("windows mobile");
    } else {
      addClass("desktop");
    }
  } else if (device.fxos()) {
    if (device.fxosTablet()) {
      addClass("fxos tablet");
    } else {
      addClass("fxos mobile");
    }
  } else if (device.meego()) {
    addClass("meego mobile");
  } else if (device.nodeWebkit()) {
    addClass("node-webkit");
  } else if (device.television()) {
    addClass("television");
  } else if (device.desktop()) {
    addClass("desktop");
  }

  if (device.cordova()) {
    addClass("cordova");
  }

  // Orientation Handling
  // --------------------

  // Handle device orientation changes.
  handleOrientation = function () {
    if (device.landscape()) {
      removeClass("portrait");
      addClass("landscape");
    } else {
      removeClass("landscape");
      addClass("portrait");
    }
    return;
  };

  // Detect whether device supports orientationchange event,
  // otherwise fall back to the resize event.
  if (Object.prototype.hasOwnProperty.call(window, "onorientationchange")) {
    orientationEvent = "orientationchange";
  } else {
    orientationEvent = "resize";
  }

  // Listen for changes in orientation.
  if (window.addEventListener) {
    window.addEventListener(orientationEvent, handleOrientation, false);
  } else if (window.attachEvent) {
    window.attachEvent(orientationEvent, handleOrientation);
  } else {
    window[orientationEvent] = handleOrientation;
  }

  handleOrientation();

  if (typeof define === 'function' && typeof define.amd === 'object' && define.amd) {
    define(function() {
      return device;
    });
  } else if (typeof module !== 'undefined' && module.exports) {
    module.exports = device;
  } else {
    window.device = device;
  }

}).call(this);


$(function(){

	
	
	var hash = window.location.hash;
	var isQuestion = hash.indexOf("question");
	if(isQuestion == 1) {
		var blockId = hash.replace(/\D/g,'');
		$('#answer-'+blockId+'').toggle();
		$("[data-id='"+blockId+"']").addClass('question-link-push');
	}

	// фиксация бокового меню услуг

	// if($('nav').is('#last-float')) {
	// 	var topPos = $('#last-float').offset().top;

	// 	var width = $(window).width();

	// 	if ($('#adminForm').hasClass('new-nc-form') && (width < 720)) {
	// 		$('footer').before($('.asideBlock'));
	// 		$('.asideBlock').find('nav').css({'position':'inherit', 'width':'100%'});
	// 	}

	// 	$(window).scroll(function() {
	// 		var width = $(window).width(); 
	// 		if(width > 720) {

	// 			var top = $(document).scrollTop(),
	// 			pip = $('footer').offset().top,
	// 			height = $('#last-float').outerHeight(true);
			
	// 			console.log(top);
			
	// 			if (top > 500 && top < pip - height) {
	// 				$('#last-float').addClass('fixed').removeAttr("style"); 
	// 			} 

	// 			// if (top > topPos && top < pip - height) {
	// 			// 	$('#last-float').addClass('fixed').removeAttr("style"); 
	// 			// } 
	// 			else if (top > pip - height) {
	// 				$('#last-float').removeClass('fixed').css({'position':'absolute','bottom':'75px', 'width':'240px'}); 
	// 			}
	// 			else {
	// 				$('#last-float').removeClass('fixed'); 
	// 			}

	// 		}
			
	// 	});
	// }

	if ($(window).width < 720) {

		if ($('.contentBlock .galleryBlock').length) {
			var gallery =  $('.contentBlock .galleryBlock');
			gallery.parent().find('form#adminForm').before(gallery);
		}

	};

	if($('#mapContact').length > 0) {

		var Placemark = {};
		// var addrTitle = $(this).find('.title').html(); //название города
		// var titleOffice = $('.titleOffice span'); // город в котором находится офис



		ymaps.ready(function() {
			var activeItem = $('.officeAdr_active').attr('data-coord');
			activeItem = JSON.parse(activeItem);
			var myMap = new ymaps.Map('mapContact', {

				center: activeItem,
				zoom: 17,
				controls: ['zoomControl']
			}, {
				autoFitToViewport: 'always'
			});
			// myMap.behaviors.disable('scrollZoom');

			$('.officeAdr').each(function() {
				var obj = $(this).attr("data-coord");
				obj = JSON.parse(obj);

				myMap.geoObjects
				.add(new ymaps.Placemark(obj, {
					iconContent: 'ГеоСмарт'
				}, {
					preset: "islands#blueStretchyIcon",
				}));

			}); //each

			$('.cityList__item').click(function() {
				var objj = $(this).attr("data-coord");
				objj = JSON.parse(objj);
				myMap.panTo(objj, {
					flying: 2,
					callback: function() {
						alert("accept!");
					}
				});

				var addTitle = $(this).find('.title').html();
				$('.titleOffice span').html(addTitle);
			});

			myMap.behaviors.disable('scrollZoom');
		});

		$('.cityList__item').click(function(e) {
			e.preventDefault();
			$('.cityList__item').removeClass('cityList__item_active');
			$(this).addClass('cityList__item_active');

		});

		$('.cityList__item').on('click', function(e) {
			if ($(this).attr('coord') == 'all') {
				$('.officeAdr').removeClass('officeAdr_active');
			} else {
				var elems = $('.officeAdr[data-coord="' + $(this).attr('data-coord') + '"]');
				elems.addClass('officeAdr_active');
			};
			$('.officeAdr').not(elems).removeClass('officeAdr_active');
		});

		$('.contactRec__title').click(function() {
			$('.contactRec__content').slideToggle();
			$('.contactRec__title-arrow').toggleClass('contactRec__title-arrow_active');
		});
	}

/* Main slider */
    $(".main-slider").owlCarousel({
    	autoplay:true,
        nav: true,
        navText: ['', ''],
        dots: true,
        items: 1,
        loop: true,
        singleItem: true,
        // autoplay: true,
        autoplaySpeed: 300,
        smartSpeed: 300,
        fluidSpeed: 300,
        navSpeed: 300,
        dragEndSpeed: 300,
        dotsSpeed: 300,
        autoplayTimeout: 5000,
        autoplayHoverPause: true,
        animateIn: "fadeInRight",
        animateOut: "fadeOut",
    });

// Переместить заголовок <h1>, вставив его перед 
// элементом с id='general'.

$('#general').before($('h1'));

	
	$('.question-link').click(function(e) {
		e.preventDefault();
		var blockId = $(this).data('id');
		if ($(this).hasClass('question-link-push')) {
			console.log('1');
			$('.QA div').slideUp();
			$('.QA a').removeClass('question-link-push');
		} else {
			$('.QA div').slideUp();
			$('.QA a').removeClass('question-link-push');
			$('#answer-'+blockId+'').slideDown();

			if ($(this).hasClass('question-link-push')) {
				$(this).parent().parent().find('div').slideUp();
				$(this).removeClass('question-link-push');
			} else {
				$(this).parent().find('div').slideDown();
				$('#answer-'+blockId+'').slideDown();
				$(this).addClass('question-link-push');
			}
		}
	});

	$('.feed-archive .archive .title, .archive .calendar-close').click(function() {


		if ($('.feed-archive .archive').hasClass('archive-active')) {
			$('.feed-archive .archive').removeClass('archive-active');
			$('.calendar-nav').removeClass('calendar-nav-active');
			$('.archive .calendar-close').removeClass('calendar-close-active')
			$('.calendars').removeClass('calendars-active');
			$('.calendars').slick('unslick');
		} else {
			$('.feed-archive .archive').addClass('archive-active');
			$('.calendar-nav').addClass('calendar-nav-active');
			$('.archive .calendar-close').addClass('calendar-close-active')
			$('.calendars').addClass('calendars-active');
			$('.calendars').slick({
				dots: false,
				prevArrow: $('.calendar-nav-prev'),
				nextArrow: $('.calendar-nav-next'),
			});
		}

	});

	$('.countryChoose__current').click(function() {
		$('.countryChoose__list').slideToggle();
	});

	$('.container-tags .right').click(function() {
		$('.feed-archive .archive').removeClass('archive-active');
		$('.calendar-nav').removeClass('calendar-nav-active');
		$('.calendars').removeClass('calendars-active');
		$('.archive .calendar-close').removeClass('calendar-close-active');
		$('.overlay').addClass('overlay-hidden');
	});

	$('.tags-slide-btn').click(function() {
		$('.container-tags').toggleClass('container-tags-active');
		$(this).toggleClass('tags-slide-btn-active');
	});

	$('.countryChoose__list li:not("current")').click(function(e) {
		e.preventDefault();
		$('.countryChoose__list li').removeClass('current');
		$(this).addClass('current');
		var cityName = $(this).find('a').html();
		$('.countryChoose__current').html(cityName);

		$('.cityList__item').addClass('cityList_show').removeClass('cityList_disable');
		if( $(this).attr('value') !== "country0" )
		{
			var elems = $('.cityList__item[data-type="' + $(this).attr('value') + '"]');
			//elems.addClass('cityList_show');
			//elems.fadeIn();
			$('.cityList__item').not(elems).addClass('cityList_disable').removeClass('cityList_show');
			//$('.cityList__item').not(elems).fadeOut();
		}


	    $('.countryChoose__list').hide();
	});

	// $('.trainers__nav a').on('click', function(e) {
	//     e.preventDefault();
	//     var elems = $('.trainers__item[data-type="' + $(this).attr('value') + '"]');
	//     elems.addClass('trainers__item_show');
	//     $('.trainers__item').not(elems).addClass('trainers__item_disable').removeClass('trainers__item_show');
	//     if ($(this).attr('value') == 'all') {
	//         $('.trainers__item').removeClass('trainers__item_disable');
	//     };
	// });

	$('.vcard').click(function(e){
        e.preventDefault();
        $('#ContactMap').remove();
        var coord = $(this).data('geo-coord');
        $(this).after('<div id="ContactMap"></div>');
        coordArray = coord.split(',');
        console.log(coordArray);

			if (typeof(ymaps)!=='undefined') {
				var myMap;
				ymaps.ready(function () {
					myMap = new ymaps.Map('ContactMap', {
							center: coordArray,
							zoom: 14,
							controls: ['zoomControl','fullscreenControl']
						}, {
							autoFitToViewport: 'always'
					});
					
					myMap.behaviors.disable(['scrollZoom', 'rightMouseButtonMagnifier']);
					
					myMap.geoObjects.add(new ymaps.Placemark(coordArray, {iconContent: 'ГеоСмарт'},{preset: "islands#blueStretchyIcon",}));
				});

			} //if
			
    });

// скролл меню

if ($('.asideBlock').length > 0) {
	var a = document.querySelector('.asideBlock'), b = null, K = null, Z = 0, P = 100, N = 50;  // если у P ноль заменить на число, то блок будет прилипать до того, как верхний край окна браузера дойдёт до верхнего края элемента, если у N — нижний край дойдёт до нижнего края элемента. Может быть отрицательным числом
	window.addEventListener('scroll', Ascroll, false);
	document.body.addEventListener('scroll', Ascroll, false);
	function Ascroll() {
	  var Ra = a.getBoundingClientRect(),
	      R1bottom = document.querySelector('.sectionBlock-asided').getBoundingClientRect().bottom;
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
	          if (Rb.bottom - W + N <= 0) {  // подцепиться
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
	}
};




// END скролл меню

if ($('.map-init').length == 0) {
	if (typeof(ymaps)!=='undefined'){
		$('footer').prepend($("<div id='map'></div>"));
		var lat = $('#coord_of_city').data('lat');
		var lng = $('#coord_of_city').data('lng');
		
		var myMap;

		ymaps.ready(function () {
			myMap = new ymaps.Map('map', {
					center: [lat,lng],
					zoom: 14,
					controls: ['zoomControl','fullscreenControl']
				}, {
					autoFitToViewport: 'always'
			});
			
			myMap.behaviors.disable(['scrollZoom', 'rightMouseButtonMagnifier']);
			
			myMap.geoObjects.add(new ymaps.Placemark([lat,lng], {iconContent: 'ГеоСмарт'},{preset: "islands#blueStretchyIcon",}));
		});


		/*
		$('.branchListBlock').each(function(){
			$(this).append($("<div id='branchMap'></div>"));
			var bMap;
			
			var owner = this;
			ymaps.ready(function () {
				bMap = new ymaps.Map('branchMap', {
						center: [lat,lng],
						zoom: 7,
						controls: ['zoomControl','fullscreenControl']
					}, {
						autoFitToViewport: 'always'
				});
				
				var bounds = [];
				
				$('.branch',owner).each(function(){
					var coord = $(this).data('geo-coord');
					if (!coord) {return false;}
					coord = coord.split(',');
					if (!coord[0] || !coord[1]) {return false;}
					
					if (!bounds[0] || coord[0]<=bounds[0]) {bounds[0] = coord[0]}
					if (!bounds[1] || coord[1]<=bounds[1]) {bounds[1] = coord[1]}
					if (!bounds[2] || coord[0]>=bounds[2]) {bounds[2] = coord[0]}
					if (!bounds[3] || coord[1]>=bounds[3]) {bounds[3] = coord[1]}
					
					bMap.geoObjects.add(new ymaps.Placemark([coord[0],coord[1]], {iconContent: ($('.title',this).html() || 'ГеоСмарт')},{preset: "islands#blueStretchyIcon",}));
				})
				
				bMap.setBounds([[bounds[0],bounds[1]],[bounds[2],bounds[3]]]);
			});
		})
		*/
	}
}
	
	
	
	$('body').append("<div id='phoneZoom'></div>");
	
	$('header').prepend("<span class='menuSwitch'><span></span></span>");
	$('header .menuSwitch').click(function(){
		$('body').toggleClass('menuSwitched');
	});

	$('header .menuItemList .submenuBlock').parent().addClass('item-dropable');
	
	$('header .contactBlock .phone, footer .contactBlock .phone, #phoneZoom').mouseenter(function(){
		$('#phoneZoom').html(this.innerHTML).css('margin-left',-$('#phoneZoom').outerWidth()/2).css('margin-top',-$('#phoneZoom').outerHeight()/2).addClass('isActive');
	}).mouseleave(function(){
		$('#phoneZoom').removeClass('isActive');
	})
	
	$('.affiliateListBlock').each(function(){
		var interval = $(this).data('interval') || 5;
		
		var owner = this;
		
		this.__scroll = function()
		{
			if ($('.affiliateList',owner).width() > $(this).width())
			{
				$('.affiliateList .item-moved',owner).remove();
				var $item = $('.affiliateList .item:eq(0)',owner);
				$item.clone().appendTo($item.parent());
				$item.css('margin-left',-$item.outerWidth()).addClass('item-moved');
			}
		}
		
		
		$(this).mouseleave(function(){
			owner.__timer = window.setInterval(owner.__scroll,interval*1000);
		}).mouseenter(function(){
			window.clearInterval(owner.__timer);
		}).mouseleave();
		
	});
	
	$('.promoBlock').each(function(){
		var interval = $(this).data('interval') || 5;
		var isSide = $(this).data('side');

		if(!isSide) {
			$(this).append($("<div class='navBlock'><a href='#' class='step step-prev'>&larr;</a><a href='#' class='step step-next'>&rarr;</a></div>"))
		}
		
		var owner = this;
		var $banners = $('.banner',this);
		
		this.__swap = function(dir)
		{
			dir = (dir==-1) ? -1 : 1;
			var idx = $('.banner-active',owner).index();
			idx = idx + dir;
			if (idx<0) {idx=$banners.length-1;}
			if (idx>=$banners.length) {idx=0;}
			$banners.removeClass('banner-active').eq(idx).addClass('banner-active');
		}
		
		this.__swap();
		
		$(this).on('click','.navBlock .step',function(){
			owner.__swap($(this).hasClass('step-prev')?-1:1);
			return false;
		})
		
		$(this).mouseleave(function(){
			owner.__timer = window.setInterval(owner.__swap,interval*1000);
		}).mouseover(function(){
			window.clearInterval(owner.__timer);
		}).mouseleave();
		
	});

	$('.promoBlockSide').each(function(){
		var interval = $(this).data('interval') || 5;
		
		//$(this).append($("<div class='navBlock'><a href='#' class='step step-prev'>&larr;</a><a href='#' class='step step-next'>&rarr;</a></div>"))
		
		var owner = this;
		var $banners = $('.banner',this);
		
		this.__swap = function(dir)
		{
			dir = (dir==-1) ? -1 : 1;
			var idx = $('.banner-active',owner).index();
			idx = idx + dir;
			if (idx<0) {idx=$banners.length-1;}
			if (idx>=$banners.length) {idx=0;}
			$banners.removeClass('banner-active').eq(idx).addClass('banner-active');
		}
		
		this.__swap();
		
		$(this).on('click','.navBlock .step',function(){
			owner.__swap($(this).hasClass('step-prev')?-1:1);
			return false;
		})
		
		$(this).mouseleave(function(){
			owner.__timer = window.setInterval(owner.__swap,interval*1000);
		}).mouseover(function(){
			window.clearInterval(owner.__timer);
		}).mouseleave();
		
	});
	
	if ($.fn.magnificPopup)
	{
		$('.galleryBlock').magnificPopup({
			delegate: '.item a',
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
				tError: '<a href="%url%">Изображение №%curr%</a> не может быть загружено.',
				verticalFit: true,
				titleSrc: function(item) {
					var val = {title:$('.title',item.el).html(),location:$('.location',item.el).html()};
					val = (val.title?"<strong class='title'>"+val.title+'</strong>' : '') + (val.location ? "<small class='location'>"+val.location+'</small>' : '');
					return item.el.attr('data-title') || (item.el.attr('title') || val);
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
					item.type = (item.src.match(/\.(jpeg|jpg|gif|png)$/i) != null) ? 'image' : 'iframe';
				},
				afterClose: function() {
					$('body').removeClass('lightboxed');
				},
			},
			tLoading: 'Загрузка...',
			tClose: 'Закрыть (Esc)', // Alt text on close button
		});

		$('.feedback-modal').magnificPopup({
			type: 'ajax',
			callbacks : {
				afterOpen: function() {

					//$.getScript('https://code.jquery.com/jquery-3.1.1.min.js', function() {
					//});

					console.log('333');
					$('.ajax-form').each(function() {
		
						console.log('111');
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
									$('.ajax-form').append(success);
								} // success
							});// ajax

						});

						
					}); // each
				},
				open:function() {
					
				}
			}
		});

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
	}



	
	$(window).resize(function(e){
		if (!window.__threshold) {window.__threshold = $('header .informationBlock').height()}
	}).resize();
	$(window).scroll(function(e){
		if (!window.__threshold) {window.__threshold = $('header .informationBlock').height()}
		$('body')[$(window).scrollTop()>window.__threshold ? 'addClass':'removeClass']('overscroll');
		
	}).scroll();
	
	$('html').removeClass('jsLoading').addClass('jsLoaded');
})

function isScrolledIntoView(elem)
{
	var docViewTop = $(window).scrollTop();
	var docViewBottom = docViewTop + $(window).height();
	var elemTop = $(elem).offset().top;
	return ((elemTop <= docViewBottom) && (elemTop >= docViewTop));
}


if ($('.list-item-has-sub').length > 0) {
	$('.list-item-has-sub').parent().addClass('item-drop-arrow');

	$('.list-item-has-sub').parent().find('a:first').one("click", function(e){
		e.preventDefault();
		$('.list-item-has-sub').removeClass('list-item-sub-active');
		$('.list-item-has-sub').parent().find('a:first').removeClass('rotate-arrow');

		if ($('.list-item-has-sub').hasClass('list-item-sub-active')) {
			$(this).parent().find('.list-item-has-sub').removeClass('list-item-sub-active');
			$(this).removeClass('rotate-arrow');
		} else {
			$(this).parent().find('.list-item-has-sub').addClass('list-item-sub-active');
			$(this).addClass('rotate-arrow');
		}
	});

};

$(document).ready(function() {
  $('.review__item a').magnificPopup({
  	type:'image'
  });
});




























if ($('.contacts-map__city').length > 0) {
    $('.contacts-map__city').styler();
};



$('.cont-map-1').click(function(){
	$('.cont-map-1').addClass('cont-map-active');
	$('.cont-map-2').removeClass('cont-map-active');
	$('#map-contact').removeClass('map-active');
	$('.contacts-city').css('display', '');
});
$('.cont-map-2').click(function(){
	$('.cont-map-2').addClass('cont-map-active');
	$('.cont-map-1').removeClass('cont-map-active');
	$('#map-contact').addClass('map-active');
	$('.contacts-city').css('display', 'none');
});




$('.contacts-map__form').on('change', function() { 
	var city = $(this).find('.contacts-map__city option:selected').attr('data-city'); 
	var val = $(this).find('.contacts-map__representation input:checked').attr('data-val'); 

	var elems = $('.contacts-city__items[data-type="' + city + '"][data-cat="' + val + '"]');
	var elemsss = $('.contacts-city__items[data-type="' + city + '"]');
	var elemss = $('.contacts-city__items[data-cat="' + val + '"]');

	if ( ($(this).find('.contacts-map__city option:selected').attr('data-city') == 'all') && ($(this).find('.filter-radio__number input:checked').attr('data-val') == 'all') ) { 
		
		$('.contacts-city__items').removeClass('disabled-tile');
		console.log('all');

	} else if ($(this).find('.contacts-map__city option:selected').attr('data-city') == 'all') {

		$('.contacts-city__items').not(elems).removeClass('disabled-tile'); 
		$('.contacts-city__items').not(elemss).addClass('disabled-tile');

	} else if ($(this).find('.filter-radio__number input:checked').attr('data-val') == 'all') {

		console.log('3');
		$('.contacts-city__items').not(elems).removeClass('disabled-tile'); 
		$('.contacts-city__items').not(elemsss).addClass('disabled-tile');

	} else {
		$('.contacts-city__items').removeClass('disabled-tile');
		$('.contacts-city__items').not(elems).addClass('disabled-tile');
		
	};
});




$('.contacts-city__buy').click(function(){
	$('.popup-cnts').addClass('popup-cnts-active');
});
$('.popup-cnts__close').click(function(){
	$('.popup-cnts').removeClass('popup-cnts-active');
});

$('.contacts-city__map-open').click(function(){
	$('.map-init').html('');
	$(this).closest('.contacts-city__items').find('.map-init').html('<div id="map-contact"></div>');

 //Объекты на ЯКарте
	    

	    if ($('#map-contact').length > 0) {

	        ymaps.ready(init);

	        function init () {
	            // Создаем собственный макет с информацией о выбранном геообъекте.
	            var customBalloonContentLayout = ymaps.templateLayoutFactory.createClass([
	                '<div class=balloon-items>',
	                // Выводим в цикле список всех геообъектов.
	                '{% for geoObject in properties.geoObjects %}',
	                    '{{ geoObject.properties.balloonContentBody|raw }}',
	                '{% endfor %}',
	                '</div>'
	            ].join(''));
	            var myMap = new ymaps.Map('map-contact', {
	                    center: [55.15295441010063, 61.42443749040058],
	                    zoom: 12,
	                    controls: ['zoomControl']
	                }, {
	                    searchControlProvider: 'yandex#search'
	                }),
	                objectManager = new ymaps.ObjectManager({
	                    // Чтобы метки начали кластеризоваться, выставляем опцию
	                    clusterize: false,
	                    // ObjectManager принимает те же опции, что и кластеризатор
	                    gridSize: 32,
	                    // false - приближение к меткам в баллуне
	                    clusterDisableClickZoom: true, 
	                    clusterOpenBalloonOnClick: true,
	                    // Устанавливаем режим открытия балуна
	                    // В данном примере балун никогда не будет открываться в режиме панели
	                    clusterBalloonPanelMaxMapArea: 0,
	                    // По умолчанию опции балуна balloonMaxWidth и balloonMaxHeight не установлены для кластеризатора,
	                    // так как все стандартные макеты имеют определенные размеры.
	                    clusterBalloonMaxHeight: 300,
	                    clusterBalloonContentLayout: customBalloonContentLayout
	                });

	                // Чтобы задать опции одиночным объектам и кластерам,
	                // обратимся к дочерним коллекциям ObjectManager.
	                objectManager.objects.options.set({
	                    // тип макета.
	                    iconLayout: 'default#imageWithContent',
	                    // Своё изображение иконки метки.
	                    iconImageHref: 'vis/gps.png',
	                    // Размеры метки.
	                    iconImageSize: [30, 50],
	                    // Смещение левого верхнего угла иконки относительно
	                    // её "ножки" (точки привязки).
	                    iconImageOffset: [-29, -63],
	                    // Смещение слоя с содержимым относительно слоя с картинкой.
	                    iconContentOffset: [-20, -10],
	                });

	                var clusterIcons = [
	                   {
	                    href: 'vis/gps.png',
	                    size: [44, 70],
	                    offset: [-25, -25]
	                    },
	                    {
	                     // Созадаем активную область в круг
	                     shape: {
	                        type: 'Circle',
	                        coordinates: [0, 0],
	                      radius: 30
	                    }
	                 }];

	                objectManager.clusters.options.set({
	                    clusterDisableClickZoom: true,
	                    clusterOpenBalloonOnClick: true,
	                    // Устанавливаем режим открытия балуна. 
	                    // В данном примере балун никогда не будет открываться в режиме панели.
	                    clusterBalloonPanelMaxMapArea: 0,
	                    // По умолчанию опции балуна balloonMaxWidth и balloonMaxHeight не установлены для кластеризатора,
	                    // так как все стандартные макеты имеют определенные размеры.
	                    clusterBalloonMaxHeight: 200,
	                    clusterBalloonContentLayout: customBalloonContentLayout,
	                    clusterIcons: clusterIcons
	                });

	                myMap.geoObjects.add(objectManager);
	                    var by_cityVal = $('#map-contact').closest('.contacts-city__items').attr('data-type');
	                    by_categoryVal = $('#map-contact').closest('.contacts-city__items').attr('data-cat');

	                    
	                    var params = {isNaked:1, ajax:1, filter_city: by_cityVal, filter_country: by_categoryVal};

	                    console.log(params); 
	                    $.ajax({
	                    	method: 'GET',
	                        url: "//geosmart.pro/contacts/get.html",
	                        data: params
	                    }).done(function(data) {
	                    	console.log(data);
	                    	objectManager.removeAll();
	                    	
	                        if (data.features !== null) {
	                        	objectManager.add(data);
	                        	myMap.setBounds(objectManager.getBounds(), {checkZoomRange: true, zoomMargin: 50});
	                        } else {
	                        	return false;
	                        };
	                    }); 
        			}
        		}

	});