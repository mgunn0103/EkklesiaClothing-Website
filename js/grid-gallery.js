/*! Copyright (c) 2013 Brandon Aaron (http://brandonaaron.net)
* Licensed under the MIT License (LICENSE.txt).
*
* Thanks to: http://adomas.org/javascript-mouse-wheel/ for some pointers.
* Thanks to: Mathias Bank(http://www.mathias-bank.de) for a scope bug fix.
* Thanks to: Seamus Leahy for adding deltaX and deltaY
*
* Version: 3.1.3
*
* Requires: 1.2.2+
*/
(function(factory){if(typeof define==="function"&&define.amd){define(["jquery"],factory)}else{if(typeof exports==="object"){module.exports=factory}else{factory(jQuery)}}}(function($){var toFix=["wheel","mousewheel","DOMMouseScroll","MozMousePixelScroll"];var toBind="onwheel" in document||document.documentMode>=9?["wheel"]:["mousewheel","DomMouseScroll","MozMousePixelScroll"];var lowestDelta,lowestDeltaXY;if($.event.fixHooks){for(var i=toFix.length;i;){$.event.fixHooks[toFix[--i]]=$.event.mouseHooks}}$.event.special.mousewheel={setup:function(){if(this.addEventListener){for(var i=toBind.length;i;){this.addEventListener(toBind[--i],handler,false)}}else{this.onmousewheel=handler}},teardown:function(){if(this.removeEventListener){for(var i=toBind.length;i;){this.removeEventListener(toBind[--i],handler,false)}}else{this.onmousewheel=null}}};$.fn.extend({mousewheel:function(fn){return fn?this.bind("mousewheel",fn):this.trigger("mousewheel")},unmousewheel:function(fn){return this.unbind("mousewheel",fn)}});function handler(event){var orgEvent=event||window.event,args=[].slice.call(arguments,1),delta=0,deltaX=0,deltaY=0,absDelta=0,absDeltaXY=0,fn;event=$.event.fix(orgEvent);event.type="mousewheel";if(orgEvent.wheelDelta){delta=orgEvent.wheelDelta}if(orgEvent.detail){delta=orgEvent.detail*-1}if(orgEvent.deltaY){deltaY=orgEvent.deltaY*-1;delta=deltaY}if(orgEvent.deltaX){deltaX=orgEvent.deltaX;delta=deltaX*-1}if(orgEvent.wheelDeltaY!==undefined){deltaY=orgEvent.wheelDeltaY}if(orgEvent.wheelDeltaX!==undefined){deltaX=orgEvent.wheelDeltaX*-1}absDelta=Math.abs(delta);if(!lowestDelta||absDelta<lowestDelta){lowestDelta=absDelta}absDeltaXY=Math.max(Math.abs(deltaY),Math.abs(deltaX));if(!lowestDeltaXY||absDeltaXY<lowestDeltaXY){lowestDeltaXY=absDeltaXY}fn=delta>0?"floor":"ceil";delta=Math[fn](delta/lowestDelta);deltaX=Math[fn](deltaX/lowestDeltaXY);deltaY=Math[fn](deltaY/lowestDeltaXY);args.unshift(event,delta,deltaX,deltaY);return($.event.dispatch||$.event.handle).apply(this,args)}}));

/*!
 *  Sharrre.com - Make your sharing widget!
 *  Version: beta 1.3.5
 *  Author: Julien Hany
 *  License: MIT http://en.wikipedia.org/wiki/MIT_License or GPLv2 http://en.wikipedia.org/wiki/GNU_General_Public_License
 */
;(function(g,i,j,b){var h="sharrre",f={className:"sharrre",share:{googlePlus:false,facebook:false,twitter:false,digg:false,delicious:false,stumbleupon:false,linkedin:false,pinterest:false},shareTotal:0,template:"",title:"",url:j.location.href,text:j.title,urlCurl:"sharrre.php",count:{},total:0,shorterTotal:true,enableHover:true,enableCounter:true,enableTracking:false,hover:function(){},hide:function(){},click:function(){},render:function(){},buttons:{googlePlus:{url:"",urlCount:false,size:"medium",lang:"en-US",annotation:""},facebook:{url:"",urlCount:false,action:"like",layout:"button_count",width:"",send:"false",faces:"false",colorscheme:"",font:"",lang:"en_US"},twitter:{url:"",urlCount:false,count:"horizontal",hashtags:"",via:"",related:"",lang:"en"},digg:{url:"",urlCount:false,type:"DiggCompact"},delicious:{url:"",urlCount:false,size:"medium"},stumbleupon:{url:"",urlCount:false,layout:"1"},linkedin:{url:"",urlCount:false,counter:""},pinterest:{url:"",media:"",description:"",layout:"horizontal"}}},c={googlePlus:"",facebook:"https://graph.facebook.com/fql?q=SELECT%20url,%20normalized_url,%20share_count,%20like_count,%20comment_count,%20total_count,commentsbox_count,%20comments_fbid,%20click_count%20FROM%20link_stat%20WHERE%20url=%27{url}%27&callback=?",twitter:"http://cdn.api.twitter.com/1/urls/count.json?url={url}&callback=?",digg:"http://services.digg.com/2.0/story.getInfo?links={url}&type=javascript&callback=?",delicious:"http://feeds.delicious.com/v2/json/urlinfo/data?url={url}&callback=?",stumbleupon:"",linkedin:"http://www.linkedin.com/countserv/count/share?format=jsonp&url={url}&callback=?",pinterest:"http://api.pinterest.com/v1/urls/count.json?url={url}&callback=?"},l={googlePlus:function(m){var n=m.options.buttons.googlePlus;g(m.element).find(".buttons").append('<div class="button googleplus"><div class="g-plusone" data-size="'+n.size+'" data-href="'+(n.url!==""?n.url:m.options.url)+'" data-annotation="'+n.annotation+'"></div></div>');i.___gcfg={lang:m.options.buttons.googlePlus.lang};var o=0;if(typeof gapi==="undefined"&&o==0){o=1;(function(){var p=j.createElement("script");p.type="text/javascript";p.async=true;p.src="//apis.google.com/js/plusone.js";var q=j.getElementsByTagName("script")[0];q.parentNode.insertBefore(p,q)})()}else{gapi.plusone.go()}},facebook:function(m){var n=m.options.buttons.facebook;g(m.element).find(".buttons").append('<div class="button facebook"><div id="fb-root"></div><div class="fb-like" data-href="'+(n.url!==""?n.url:m.options.url)+'" data-send="'+n.send+'" data-layout="'+n.layout+'" data-width="'+n.width+'" data-show-faces="'+n.faces+'" data-action="'+n.action+'" data-colorscheme="'+n.colorscheme+'" data-font="'+n.font+'" data-via="'+n.via+'"></div></div>');var o=0;if(typeof FB==="undefined"&&o==0){o=1;(function(t,p,u){var r,q=t.getElementsByTagName(p)[0];if(t.getElementById(u)){return}r=t.createElement(p);r.id=u;r.src="//connect.facebook.net/"+n.lang+"/all.js#xfbml=1";q.parentNode.insertBefore(r,q)}(j,"script","facebook-jssdk"))}else{FB.XFBML.parse()}},twitter:function(m){var n=m.options.buttons.twitter;g(m.element).find(".buttons").append('<div class="button twitter"><a href="https://twitter.com/share" class="twitter-share-button" data-url="'+(n.url!==""?n.url:m.options.url)+'" data-count="'+n.count+'" data-text="'+m.options.text+'" data-via="'+n.via+'" data-hashtags="'+n.hashtags+'" data-related="'+n.related+'" data-lang="'+n.lang+'">Tweet</a></div>');var o=0;if(typeof twttr==="undefined"&&o==0){o=1;(function(){var q=j.createElement("script");q.type="text/javascript";q.async=true;q.src="//platform.twitter.com/widgets.js";var p=j.getElementsByTagName("script")[0];p.parentNode.insertBefore(q,p)})()}else{g.ajax({url:"//platform.twitter.com/widgets.js",dataType:"script",cache:true})}},digg:function(m){var n=m.options.buttons.digg;g(m.element).find(".buttons").append('<div class="button digg"><a class="DiggThisButton '+n.type+'" rel="nofollow external" href="http://digg.com/submit?url='+encodeURIComponent((n.url!==""?n.url:m.options.url))+'"></a></div>');var o=0;if(typeof __DBW==="undefined"&&o==0){o=1;(function(){var q=j.createElement("SCRIPT"),p=j.getElementsByTagName("SCRIPT")[0];q.type="text/javascript";q.async=true;q.src="//widgets.digg.com/buttons.js";p.parentNode.insertBefore(q,p)})()}},delicious:function(o){if(o.options.buttons.delicious.size=="tall"){var p="width:50px;",n="height:35px;width:50px;font-size:15px;line-height:35px;",m="height:18px;line-height:18px;margin-top:3px;"}else{var p="width:93px;",n="float:right;padding:0 3px;height:20px;width:26px;line-height:20px;",m="float:left;height:20px;line-height:20px;"}var q=o.shorterTotal(o.options.count.delicious);if(typeof q==="undefined"){q=0}g(o.element).find(".buttons").append('<div class="button delicious"><div style="'+p+'font:12px Arial,Helvetica,sans-serif;cursor:pointer;color:#666666;display:inline-block;float:none;height:20px;line-height:normal;margin:0;padding:0;text-indent:0;vertical-align:baseline;"><div style="'+n+'background-color:#fff;margin-bottom:5px;overflow:hidden;text-align:center;border:1px solid #ccc;border-radius:3px;">'+q+'</div><div style="'+m+'display:block;padding:0;text-align:center;text-decoration:none;width:50px;background-color:#7EACEE;border:1px solid #40679C;border-radius:3px;color:#fff;"><img src="http://www.delicious.com/static/img/delicious.small.gif" height="10" width="10" alt="Delicious" /> Add</div></div></div>');g(o.element).find(".delicious").on("click",function(){o.openPopup("delicious")})},stumbleupon:function(m){var n=m.options.buttons.stumbleupon;g(m.element).find(".buttons").append('<div class="button stumbleupon"><su:badge layout="'+n.layout+'" location="'+(n.url!==""?n.url:m.options.url)+'"></su:badge></div>');var o=0;if(typeof STMBLPN==="undefined"&&o==0){o=1;(function(){var p=j.createElement("script");p.type="text/javascript";p.async=true;p.src="//platform.stumbleupon.com/1/widgets.js";var q=j.getElementsByTagName("script")[0];q.parentNode.insertBefore(p,q)})();s=i.setTimeout(function(){if(typeof STMBLPN!=="undefined"){STMBLPN.processWidgets();clearInterval(s)}},500)}else{STMBLPN.processWidgets()}},linkedin:function(m){var n=m.options.buttons.linkedin;g(m.element).find(".buttons").append('<div class="button linkedin"><script type="in/share" data-url="'+(n.url!==""?n.url:m.options.url)+'" data-counter="'+n.counter+'"><\/script></div>');var o=0;if(typeof i.IN==="undefined"&&o==0){o=1;(function(){var p=j.createElement("script");p.type="text/javascript";p.async=true;p.src="//platform.linkedin.com/in.js";var q=j.getElementsByTagName("script")[0];q.parentNode.insertBefore(p,q)})()}else{i.IN.init()}},pinterest:function(m){var n=m.options.buttons.pinterest;g(m.element).find(".buttons").append('<div class="button pinterest"><a href="http://pinterest.com/pin/create/button/?url='+(n.url!==""?n.url:m.options.url)+"&media="+n.media+"&description="+n.description+'" class="pin-it-button" count-layout="'+n.layout+'">Pin It</a></div>');(function(){var o=j.createElement("script");o.type="text/javascript";o.async=true;o.src="//assets.pinterest.com/js/pinit.js";var p=j.getElementsByTagName("script")[0];p.parentNode.insertBefore(o,p)})()}},d={googlePlus:function(){},facebook:function(){fb=i.setInterval(function(){if(typeof FB!=="undefined"){FB.Event.subscribe("edge.create",function(m){_gaq.push(["_trackSocial","facebook","like",m])});FB.Event.subscribe("edge.remove",function(m){_gaq.push(["_trackSocial","facebook","unlike",m])});FB.Event.subscribe("message.send",function(m){_gaq.push(["_trackSocial","facebook","send",m])});clearInterval(fb)}},1000)},twitter:function(){tw=i.setInterval(function(){if(typeof twttr!=="undefined"){twttr.events.bind("tweet",function(m){if(m){_gaq.push(["_trackSocial","twitter","tweet"])}});clearInterval(tw)}},1000)},digg:function(){},delicious:function(){},stumbleupon:function(){},linkedin:function(){function m(){_gaq.push(["_trackSocial","linkedin","share"])}},pinterest:function(){}},a={googlePlus:function(m){i.open("https://plus.google.com/share?hl="+m.buttons.googlePlus.lang+"&url="+encodeURIComponent((m.buttons.googlePlus.url!==""?m.buttons.googlePlus.url:m.url)),"","toolbar=0, status=0, width=900, height=500")},facebook:function(m){i.open("http://www.facebook.com/sharer/sharer.php?u="+encodeURIComponent((m.buttons.facebook.url!==""?m.buttons.facebook.url:m.url))+"&t="+m.text+"","","toolbar=0, status=0, width=900, height=500")},twitter:function(m){i.open("https://twitter.com/intent/tweet?text="+encodeURIComponent(m.text)+"&url="+encodeURIComponent((m.buttons.twitter.url!==""?m.buttons.twitter.url:m.url))+(m.buttons.twitter.via!==""?"&via="+m.buttons.twitter.via:""),"","toolbar=0, status=0, width=650, height=360")},digg:function(m){i.open("http://digg.com/tools/diggthis/submit?url="+encodeURIComponent((m.buttons.digg.url!==""?m.buttons.digg.url:m.url))+"&title="+m.text+"&related=true&style=true","","toolbar=0, status=0, width=650, height=360")},delicious:function(m){i.open("http://www.delicious.com/save?v=5&noui&jump=close&url="+encodeURIComponent((m.buttons.delicious.url!==""?m.buttons.delicious.url:m.url))+"&title="+m.text,"delicious","toolbar=no,width=550,height=550")},stumbleupon:function(m){i.open("http://www.stumbleupon.com/badge/?url="+encodeURIComponent((m.buttons.delicious.url!==""?m.buttons.delicious.url:m.url)),"stumbleupon","toolbar=no,width=550,height=550")},linkedin:function(m){i.open("https://www.linkedin.com/cws/share?url="+encodeURIComponent((m.buttons.delicious.url!==""?m.buttons.delicious.url:m.url))+"&token=&isFramed=true","linkedin","toolbar=no,width=550,height=550")},pinterest:function(m){i.open("http://pinterest.com/pin/create/button/?url="+encodeURIComponent((m.buttons.pinterest.url!==""?m.buttons.pinterest.url:m.url))+"&media="+encodeURIComponent(m.buttons.pinterest.media)+"&description="+m.buttons.pinterest.description,"pinterest","toolbar=no,width=700,height=300")}};function k(n,m){this.element=n;this.options=g.extend(true,{},f,m);this.options.share=m.share;this._defaults=f;this._name=h;this.init()}k.prototype.init=function(){var m=this;if(this.options.urlCurl!==""){c.googlePlus=this.options.urlCurl+"?url={url}&type=googlePlus";c.stumbleupon=this.options.urlCurl+"?url={url}&type=stumbleupon"}g(this.element).addClass(this.options.className);if(typeof g(this.element).data("title")!=="undefined"){this.options.title=g(this.element).attr("data-title")}if(typeof g(this.element).data("url")!=="undefined"){this.options.url=g(this.element).data("url")}if(typeof g(this.element).data("text")!=="undefined"){this.options.text=g(this.element).data("text")}g.each(this.options.share,function(n,o){if(o===true){m.options.shareTotal++}});if(m.options.enableCounter===true){g.each(this.options.share,function(n,p){if(p===true){try{m.getSocialJson(n)}catch(o){}}})}else{if(m.options.template!==""){this.options.render(this,this.options)}else{this.loadButtons()}}g(this.element).hover(function(){if(g(this).find(".buttons").length===0&&m.options.enableHover===true){m.loadButtons()}m.options.hover(m,m.options)},function(){m.options.hide(m,m.options)});g(this.element).click(function(){m.options.click(m,m.options);return false})};k.prototype.loadButtons=function(){var m=this;g(this.element).append('<div class="buttons"></div>');g.each(m.options.share,function(n,o){if(o==true){l[n](m);if(m.options.enableTracking===true){d[n]()}}})};k.prototype.getSocialJson=function(o){var m=this,p=0,n=c[o].replace("{url}",encodeURIComponent(this.options.url));if(this.options.buttons[o].urlCount===true&&this.options.buttons[o].url!==""){n=c[o].replace("{url}",this.options.buttons[o].url)}if(n!=""&&m.options.urlCurl!==""){g.getJSON(n,function(r){if(typeof r.count!=="undefined"){var q=r.count+"";q=q.replace("\u00c2\u00a0","");p+=parseInt(q,10)}else{if(r.data&&r.data.length>0&&typeof r.data[0].total_count!=="undefined"){p+=parseInt(r.data[0].total_count,10)}else{if(typeof r[0]!=="undefined"){p+=parseInt(r[0].total_posts,10)}else{if(typeof r[0]!=="undefined"){}}}}m.options.count[o]=p;m.options.total+=p;m.renderer();m.rendererPerso()}).error(function(){m.options.count[o]=0;m.rendererPerso()})}else{m.renderer();m.options.count[o]=0;m.rendererPerso()}};k.prototype.rendererPerso=function(){var m=0;for(e in this.options.count){m++}if(m===this.options.shareTotal){this.options.render(this,this.options)}};k.prototype.renderer=function(){var n=this.options.total,m=this.options.template;if(this.options.shorterTotal===true){n=this.shorterTotal(n)}if(m!==""){m=m.replace("{total}",n);g(this.element).html(m)}else{g(this.element).html('<div class="box"><a class="count" href="#">'+n+"</a>"+(this.options.title!==""?'<a class="share" href="#">'+this.options.title+"</a>":"")+"</div>")}};k.prototype.shorterTotal=function(m){if(m>=1000000){m=(m/1000000).toFixed(2)+"M"}else{if(m>=1000){m=(m/1000).toFixed(1)+"k"}}return m};k.prototype.openPopup=function(m){a[m](this.options);if(this.options.enableTracking===true){var n={googlePlus:{site:"Google",action:"+1"},facebook:{site:"facebook",action:"like"},twitter:{site:"twitter",action:"tweet"},digg:{site:"digg",action:"add"},delicious:{site:"delicious",action:"add"},stumbleupon:{site:"stumbleupon",action:"add"},linkedin:{site:"linkedin",action:"share"},pinterest:{site:"pinterest",action:"pin"}};_gaq.push(["_trackSocial",n[m].site,n[m].action])}};k.prototype.simulateClick=function(){var m=g(this.element).html();g(this.element).html(m.replace(this.options.total,this.options.total+1))};k.prototype.update=function(m,n){if(m!==""){this.options.url=m}if(n!==""){this.options.text=n}};g.fn[h]=function(n){var m=arguments;if(n===b||typeof n==="object"){return this.each(function(){if(!g.data(this,"plugin_"+h)){g.data(this,"plugin_"+h,new k(this,n))}})}else{if(typeof n==="string"&&n[0]!=="_"&&n!=="init"){return this.each(function(){var o=g.data(this,"plugin_"+h);if(o instanceof k&&typeof o[n]==="function"){o[n].apply(o,Array.prototype.slice.call(m,1))}})}}}})(jQuery,window,document);


/*
* @fileOverview TouchSwipe - jQuery Plugin
* @version 1.6.3
*
* @author Matt Bryson http://www.github.com/mattbryson
* @see https://github.com/mattbryson/TouchSwipe-Jquery-Plugin
* @see http://labs.skinkers.com/touchSwipe/
* @see http://plugins.jquery.com/project/touchSwipe
*
* Copyright (c) 2010 Matt Bryson
* Dual licensed under the MIT or GPL Version 2 licenses.
*/
(function(e){var o="left",n="right",d="up",v="down",c="in",w="out",l="none",r="auto",k="swipe",s="pinch",x="tap",i="doubletap",b="longtap",A="horizontal",t="vertical",h="all",q=10,f="start",j="move",g="end",p="cancel",a="ontouchstart" in window,y="TouchSwipe";var m={fingers:1,threshold:75,cancelThreshold:null,pinchThreshold:20,maxTimeThreshold:null,fingerReleaseThreshold:250,longTapThreshold:500,doubleTapThreshold:200,swipe:null,swipeLeft:null,swipeRight:null,swipeUp:null,swipeDown:null,swipeStatus:null,pinchIn:null,pinchOut:null,pinchStatus:null,click:null,tap:null,doubleTap:null,longTap:null,triggerOnTouchEnd:true,triggerOnTouchLeave:false,allowPageScroll:"auto",fallbackToMouseEvents:true,excludedElements:"button, input, select, textarea, a, .noSwipe"};e.fn.swipe=function(D){var C=e(this),B=C.data(y);if(B&&typeof D==="string"){if(B[D]){return B[D].apply(this,Array.prototype.slice.call(arguments,1))}else{e.error("Method "+D+" does not exist on jQuery.swipe")}}else{if(!B&&(typeof D==="object"||!D)){return u.apply(this,arguments)}}return C};e.fn.swipe.defaults=m;e.fn.swipe.phases={PHASE_START:f,PHASE_MOVE:j,PHASE_END:g,PHASE_CANCEL:p};e.fn.swipe.directions={LEFT:o,RIGHT:n,UP:d,DOWN:v,IN:c,OUT:w};e.fn.swipe.pageScroll={NONE:l,HORIZONTAL:A,VERTICAL:t,AUTO:r};e.fn.swipe.fingers={ONE:1,TWO:2,THREE:3,ALL:h};function u(B){if(B&&(B.allowPageScroll===undefined&&(B.swipe!==undefined||B.swipeStatus!==undefined))){B.allowPageScroll=l}if(B.click!==undefined&&B.tap===undefined){B.tap=B.click}if(!B){B={}}B=e.extend({},e.fn.swipe.defaults,B);return this.each(function(){var D=e(this);var C=D.data(y);if(!C){C=new z(this,B);D.data(y,C)}})}function z(a0,aq){var av=(a||!aq.fallbackToMouseEvents),G=av?"touchstart":"mousedown",au=av?"touchmove":"mousemove",R=av?"touchend":"mouseup",P=av?null:"mouseleave",az="touchcancel";var ac=0,aL=null,Y=0,aX=0,aV=0,D=1,am=0,aF=0,J=null;var aN=e(a0);var W="start";var T=0;var aM=null;var Q=0,aY=0,a1=0,aa=0,K=0;var aS=null;try{aN.bind(G,aJ);aN.bind(az,a5)}catch(ag){e.error("events not supported "+G+","+az+" on jQuery.swipe")}this.enable=function(){aN.bind(G,aJ);aN.bind(az,a5);return aN};this.disable=function(){aG();return aN};this.destroy=function(){aG();aN.data(y,null);return aN};this.option=function(a8,a7){if(aq[a8]!==undefined){if(a7===undefined){return aq[a8]}else{aq[a8]=a7}}else{e.error("Option "+a8+" does not exist on jQuery.swipe.options")}};function aJ(a9){if(ax()){return}if(e(a9.target).closest(aq.excludedElements,aN).length>0){return}var ba=a9.originalEvent?a9.originalEvent:a9;var a8,a7=a?ba.touches[0]:ba;W=f;if(a){T=ba.touches.length}else{a9.preventDefault()}ac=0;aL=null;aF=null;Y=0;aX=0;aV=0;D=1;am=0;aM=af();J=X();O();if(!a||(T===aq.fingers||aq.fingers===h)||aT()){ae(0,a7);Q=ao();if(T==2){ae(1,ba.touches[1]);aX=aV=ap(aM[0].start,aM[1].start)}if(aq.swipeStatus||aq.pinchStatus){a8=L(ba,W)}}else{a8=false}if(a8===false){W=p;L(ba,W);return a8}else{ak(true)}}function aZ(ba){var bd=ba.originalEvent?ba.originalEvent:ba;if(W===g||W===p||ai()){return}var a9,a8=a?bd.touches[0]:bd;var bb=aD(a8);aY=ao();if(a){T=bd.touches.length}W=j;if(T==2){if(aX==0){ae(1,bd.touches[1]);aX=aV=ap(aM[0].start,aM[1].start)}else{aD(bd.touches[1]);aV=ap(aM[0].end,aM[1].end);aF=an(aM[0].end,aM[1].end)}D=a3(aX,aV);am=Math.abs(aX-aV)}if((T===aq.fingers||aq.fingers===h)||!a||aT()){aL=aH(bb.start,bb.end);ah(ba,aL);ac=aO(bb.start,bb.end);Y=aI();aE(aL,ac);if(aq.swipeStatus||aq.pinchStatus){a9=L(bd,W)}if(!aq.triggerOnTouchEnd||aq.triggerOnTouchLeave){var a7=true;if(aq.triggerOnTouchLeave){var bc=aU(this);a7=B(bb.end,bc)}if(!aq.triggerOnTouchEnd&&a7){W=ay(j)}else{if(aq.triggerOnTouchLeave&&!a7){W=ay(g)}}if(W==p||W==g){L(bd,W)}}}else{W=p;L(bd,W)}if(a9===false){W=p;L(bd,W)}}function I(a7){var a8=a7.originalEvent;if(a){if(a8.touches.length>0){C();return true}}if(ai()){T=aa}a7.preventDefault();aY=ao();Y=aI();if(a6()){W=p;L(a8,W)}else{if(aq.triggerOnTouchEnd||(aq.triggerOnTouchEnd==false&&W===j)){W=g;L(a8,W)}else{if(!aq.triggerOnTouchEnd&&a2()){W=g;aB(a8,W,x)}else{if(W===j){W=p;L(a8,W)}}}}ak(false)}function a5(){T=0;aY=0;Q=0;aX=0;aV=0;D=1;O();ak(false)}function H(a7){var a8=a7.originalEvent;if(aq.triggerOnTouchLeave){W=ay(g);L(a8,W)}}function aG(){aN.unbind(G,aJ);aN.unbind(az,a5);aN.unbind(au,aZ);aN.unbind(R,I);if(P){aN.unbind(P,H)}ak(false)}function ay(bb){var ba=bb;var a9=aw();var a8=aj();var a7=a6();if(!a9||a7){ba=p}else{if(a8&&bb==j&&(!aq.triggerOnTouchEnd||aq.triggerOnTouchLeave)){ba=g}else{if(!a8&&bb==g&&aq.triggerOnTouchLeave){ba=p}}}return ba}function L(a9,a7){var a8=undefined;if(F()||S()){a8=aB(a9,a7,k)}else{if((M()||aT())&&a8!==false){a8=aB(a9,a7,s)}}if(aC()&&a8!==false){a8=aB(a9,a7,i)}else{if(al()&&a8!==false){a8=aB(a9,a7,b)}else{if(ad()&&a8!==false){a8=aB(a9,a7,x)}}}if(a7===p){a5(a9)}if(a7===g){if(a){if(a9.touches.length==0){a5(a9)}}else{a5(a9)}}return a8}function aB(ba,a7,a9){var a8=undefined;if(a9==k){aN.trigger("swipeStatus",[a7,aL||null,ac||0,Y||0,T]);if(aq.swipeStatus){a8=aq.swipeStatus.call(aN,ba,a7,aL||null,ac||0,Y||0,T);if(a8===false){return false}}if(a7==g&&aR()){aN.trigger("swipe",[aL,ac,Y,T]);if(aq.swipe){a8=aq.swipe.call(aN,ba,aL,ac,Y,T);if(a8===false){return false}}switch(aL){case o:aN.trigger("swipeLeft",[aL,ac,Y,T]);if(aq.swipeLeft){a8=aq.swipeLeft.call(aN,ba,aL,ac,Y,T)}break;case n:aN.trigger("swipeRight",[aL,ac,Y,T]);if(aq.swipeRight){a8=aq.swipeRight.call(aN,ba,aL,ac,Y,T)}break;case d:aN.trigger("swipeUp",[aL,ac,Y,T]);if(aq.swipeUp){a8=aq.swipeUp.call(aN,ba,aL,ac,Y,T)}break;case v:aN.trigger("swipeDown",[aL,ac,Y,T]);if(aq.swipeDown){a8=aq.swipeDown.call(aN,ba,aL,ac,Y,T)}break}}}if(a9==s){aN.trigger("pinchStatus",[a7,aF||null,am||0,Y||0,T,D]);if(aq.pinchStatus){a8=aq.pinchStatus.call(aN,ba,a7,aF||null,am||0,Y||0,T,D);if(a8===false){return false}}if(a7==g&&a4()){switch(aF){case c:aN.trigger("pinchIn",[aF||null,am||0,Y||0,T,D]);if(aq.pinchIn){a8=aq.pinchIn.call(aN,ba,aF||null,am||0,Y||0,T,D)}break;case w:aN.trigger("pinchOut",[aF||null,am||0,Y||0,T,D]);if(aq.pinchOut){a8=aq.pinchOut.call(aN,ba,aF||null,am||0,Y||0,T,D)}break}}}if(a9==x){if(a7===p||a7===g){clearTimeout(aS);if(V()&&!E()){K=ao();aS=setTimeout(e.proxy(function(){K=null;aN.trigger("tap",[ba.target]);if(aq.tap){a8=aq.tap.call(aN,ba,ba.target)}},this),aq.doubleTapThreshold)}else{K=null;aN.trigger("tap",[ba.target]);if(aq.tap){a8=aq.tap.call(aN,ba,ba.target)}}}}else{if(a9==i){if(a7===p||a7===g){clearTimeout(aS);K=null;aN.trigger("doubletap",[ba.target]);if(aq.doubleTap){a8=aq.doubleTap.call(aN,ba,ba.target)}}}else{if(a9==b){if(a7===p||a7===g){clearTimeout(aS);K=null;aN.trigger("longtap",[ba.target]);if(aq.longTap){a8=aq.longTap.call(aN,ba,ba.target)}}}}}return a8}function aj(){var a7=true;if(aq.threshold!==null){a7=ac>=aq.threshold}return a7}function a6(){var a7=false;if(aq.cancelThreshold!==null&&aL!==null){a7=(aP(aL)-ac)>=aq.cancelThreshold}return a7}function ab(){if(aq.pinchThreshold!==null){return am>=aq.pinchThreshold}return true}function aw(){var a7;if(aq.maxTimeThreshold){if(Y>=aq.maxTimeThreshold){a7=false}else{a7=true}}else{a7=true}return a7}function ah(a7,a8){if(aq.allowPageScroll===l||aT()){a7.preventDefault()}else{var a9=aq.allowPageScroll===r;switch(a8){case o:if((aq.swipeLeft&&a9)||(!a9&&aq.allowPageScroll!=A)){a7.preventDefault()}break;case n:if((aq.swipeRight&&a9)||(!a9&&aq.allowPageScroll!=A)){a7.preventDefault()}break;case d:if((aq.swipeUp&&a9)||(!a9&&aq.allowPageScroll!=t)){a7.preventDefault()}break;case v:if((aq.swipeDown&&a9)||(!a9&&aq.allowPageScroll!=t)){a7.preventDefault()}break}}}function a4(){var a8=aK();var a7=U();var a9=ab();return a8&&a7&&a9}function aT(){return !!(aq.pinchStatus||aq.pinchIn||aq.pinchOut)}function M(){return !!(a4()&&aT())}function aR(){var ba=aw();var bc=aj();var a9=aK();var a7=U();var a8=a6();var bb=!a8&&a7&&a9&&bc&&ba;return bb}function S(){return !!(aq.swipe||aq.swipeStatus||aq.swipeLeft||aq.swipeRight||aq.swipeUp||aq.swipeDown)}function F(){return !!(aR()&&S())}function aK(){return((T===aq.fingers||aq.fingers===h)||!a)}function U(){return aM[0].end.x!==0}function a2(){return !!(aq.tap)}function V(){return !!(aq.doubleTap)}function aQ(){return !!(aq.longTap)}function N(){if(K==null){return false}var a7=ao();return(V()&&((a7-K)<=aq.doubleTapThreshold))}function E(){return N()}function at(){return((T===1||!a)&&(isNaN(ac)||ac===0))}function aW(){return((Y>aq.longTapThreshold)&&(ac<q))}function ad(){return !!(at()&&a2())}function aC(){return !!(N()&&V())}function al(){return !!(aW()&&aQ())}function C(){a1=ao();aa=event.touches.length+1}function O(){a1=0;aa=0}function ai(){var a7=false;if(a1){var a8=ao()-a1;if(a8<=aq.fingerReleaseThreshold){a7=true}}return a7}function ax(){return !!(aN.data(y+"_intouch")===true)}function ak(a7){if(a7===true){aN.bind(au,aZ);aN.bind(R,I);if(P){aN.bind(P,H)}}else{aN.unbind(au,aZ,false);aN.unbind(R,I,false);if(P){aN.unbind(P,H,false)}}aN.data(y+"_intouch",a7===true)}function ae(a8,a7){var a9=a7.identifier!==undefined?a7.identifier:0;aM[a8].identifier=a9;aM[a8].start.x=aM[a8].end.x=a7.pageX||a7.clientX;aM[a8].start.y=aM[a8].end.y=a7.pageY||a7.clientY;return aM[a8]}function aD(a7){var a9=a7.identifier!==undefined?a7.identifier:0;var a8=Z(a9);a8.end.x=a7.pageX||a7.clientX;a8.end.y=a7.pageY||a7.clientY;return a8}function Z(a8){for(var a7=0;a7<aM.length;a7++){if(aM[a7].identifier==a8){return aM[a7]}}}function af(){var a7=[];for(var a8=0;a8<=5;a8++){a7.push({start:{x:0,y:0},end:{x:0,y:0},identifier:0})}return a7}function aE(a7,a8){a8=Math.max(a8,aP(a7));J[a7].distance=a8}function aP(a7){return J[a7].distance}function X(){var a7={};a7[o]=ar(o);a7[n]=ar(n);a7[d]=ar(d);a7[v]=ar(v);return a7}function ar(a7){return{direction:a7,distance:0}}function aI(){return aY-Q}function ap(ba,a9){var a8=Math.abs(ba.x-a9.x);var a7=Math.abs(ba.y-a9.y);return Math.round(Math.sqrt(a8*a8+a7*a7))}function a3(a7,a8){var a9=(a8/a7)*1;return a9.toFixed(2)}function an(){if(D<1){return w}else{return c}}function aO(a8,a7){return Math.round(Math.sqrt(Math.pow(a7.x-a8.x,2)+Math.pow(a7.y-a8.y,2)))}function aA(ba,a8){var a7=ba.x-a8.x;var bc=a8.y-ba.y;var a9=Math.atan2(bc,a7);var bb=Math.round(a9*180/Math.PI);if(bb<0){bb=360-Math.abs(bb)}return bb}function aH(a8,a7){var a9=aA(a8,a7);if((a9<=45)&&(a9>=0)){return o}else{if((a9<=360)&&(a9>=315)){return o}else{if((a9>=135)&&(a9<=225)){return n}else{if((a9>45)&&(a9<135)){return v}else{return d}}}}}function ao(){var a7=new Date();return a7.getTime()}function aU(a7){a7=e(a7);var a9=a7.offset();var a8={left:a9.left,right:a9.left+a7.outerWidth(),top:a9.top,bottom:a9.top+a7.outerHeight()};return a8}function B(a7,a8){return(a7.x>a8.left&&a7.x<a8.right&&a7.y>a8.top&&a7.y<a8.bottom)}}})(jQuery);


/**
 * @author trixta
 * @version 1.2
 */
(function(c){var b={pos:[-260,-260]},d=3,h=document,g=h.documentElement,e=h.body,a,i;function f(){if(this===b.elem){b.pos=[-260,-260];b.elem=false;d=3}}c.event.special.mwheelIntent={setup:function(){var j=c(this).bind("mousewheel",c.event.special.mwheelIntent.handler);if(this!==h&&this!==g&&this!==e){j.bind("mouseleave",f)}j=null;return true},teardown:function(){c(this).unbind("mousewheel",c.event.special.mwheelIntent.handler).unbind("mouseleave",f);return true},handler:function(j,k){var l=[j.clientX,j.clientY];if(this===b.elem||Math.abs(b.pos[0]-l[0])>d||Math.abs(b.pos[1]-l[1])>d){b.elem=this;b.pos=l;d=250;clearTimeout(i);i=setTimeout(function(){d=10},200);clearTimeout(a);a=setTimeout(function(){d=3},1500);j=c.extend({},j,{type:"mwheelIntent"});return c.event.handle.apply(this,arguments)}}};c.fn.extend({mwheelIntent:function(j){return j?this.bind("mwheelIntent",j):this.trigger("mwheelIntent")},unmwheelIntent:function(j){return this.unbind("mwheelIntent",j)}});c(function(){e=h.body;c(h).bind("mwheelIntent.mwheelIntentDefault",c.noop)})})(jQuery);

/*
 * jScrollPane - v2.0.0beta11 - 2011-07-04
 * http://jscrollpane.kelvinluck.com/
 *
 * Copyright (c) 2010 Kelvin Luck
 * Dual licensed under the MIT and GPL licenses.
 */
(function(b,a,c){b.fn.jScrollPane=function(e){function d(D,O){var az,Q=this,Y,ak,v,am,T,Z,y,q,aA,aF,av,i,I,h,j,aa,U,aq,X,t,A,ar,af,an,G,l,au,ay,x,aw,aI,f,L,aj=true,P=true,aH=false,k=false,ap=D.clone(false,false).empty(),ac=b.fn.mwheelIntent?"mwheelIntent.jsp":"mousewheel.jsp";aI=D.css("paddingTop")+" "+D.css("paddingRight")+" "+D.css("paddingBottom")+" "+D.css("paddingLeft");f=(parseInt(D.css("paddingLeft"),10)||0)+(parseInt(D.css("paddingRight"),10)||0);function at(aR){var aM,aO,aN,aK,aJ,aQ,aP=false,aL=false;az=aR;if(Y===c){aJ=D.scrollTop();aQ=D.scrollLeft();D.css({overflow:"hidden",padding:0});ak=D.innerWidth()+f;v=D.innerHeight();D.width(ak);Y=b('<div class="jspPane" />').css("padding",aI).append(D.children());am=b('<div class="jspContainer" />').css({width:ak+"px",height:v+"px"}).append(Y).appendTo(D)}else{D.css("width","");aP=az.stickToBottom&&K();aL=az.stickToRight&&B();aK=D.innerWidth()+f!=ak||D.outerHeight()!=v;if(aK){ak=D.innerWidth()+f;v=D.innerHeight();am.css({width:ak+"px",height:v+"px"})}if(!aK&&L==T&&Y.outerHeight()==Z){D.width(ak);return}L=T;Y.css("width","");D.width(ak);am.find(">.jspVerticalBar,>.jspHorizontalBar").remove().end()}Y.css("overflow","auto");if(aR.contentWidth){T=aR.contentWidth}else{T=Y[0].scrollWidth}Z=Y[0].scrollHeight;Y.css("overflow","");y=T/ak;q=Z/v;aA=q>1;aF=y>1;if(!(aF||aA)){D.removeClass("jspScrollable");Y.css({top:0,width:am.width()-f});n();E();R();w();ai()}else{D.addClass("jspScrollable");aM=az.maintainPosition&&(I||aa);if(aM){aO=aD();aN=aB()}aG();z();F();if(aM){N(aL?(T-ak):aO,false);M(aP?(Z-v):aN,false)}J();ag();ao();if(az.enableKeyboardNavigation){S()}if(az.clickOnTrack){p()}C();if(az.hijackInternalLinks){m()}}if(az.autoReinitialise&&!aw){aw=setInterval(function(){at(az)},az.autoReinitialiseDelay)}else{if(!az.autoReinitialise&&aw){clearInterval(aw)}}aJ&&D.scrollTop(0)&&M(aJ,false);aQ&&D.scrollLeft(0)&&N(aQ,false);D.trigger("jsp-initialised",[aF||aA])}function aG(){if(aA){am.append(b('<div class="jspVerticalBar" />').append(b('<div class="jspCap jspCapTop" />'),b('<div class="jspTrack" />').append(b('<div class="jspDrag" />').append(b('<div class="jspDragTop" />'),b('<div class="jspDragBottom" />'))),b('<div class="jspCap jspCapBottom" />')));U=am.find(">.jspVerticalBar");aq=U.find(">.jspTrack");av=aq.find(">.jspDrag");if(az.showArrows){ar=b('<a class="jspArrow jspArrowUp" />').bind("mousedown.jsp",aE(0,-1)).bind("click.jsp",aC);af=b('<a class="jspArrow jspArrowDown" />').bind("mousedown.jsp",aE(0,1)).bind("click.jsp",aC);if(az.arrowScrollOnHover){ar.bind("mouseover.jsp",aE(0,-1,ar));af.bind("mouseover.jsp",aE(0,1,af))}al(aq,az.verticalArrowPositions,ar,af)}t=v;am.find(">.jspVerticalBar>.jspCap:visible,>.jspVerticalBar>.jspArrow").each(function(){t-=b(this).outerHeight()});av.hover(function(){av.addClass("jspHover")},function(){av.removeClass("jspHover")}).bind("mousedown.jsp",function(aJ){b("html").bind("dragstart.jsp selectstart.jsp",aC);av.addClass("jspActive");var s=aJ.pageY-av.position().top;b("html").bind("mousemove.jsp",function(aK){V(aK.pageY-s,false)}).bind("mouseup.jsp mouseleave.jsp",ax);return false});o()}}function o(){aq.height(t+"px");I=0;X=az.verticalGutter+aq.outerWidth();Y.width(ak-X-f);try{if(U.position().left===0){Y.css("margin-left",X+"px")}}catch(s){}}function z(){if(aF){am.append(b('<div class="jspHorizontalBar" />').append(b('<div class="jspCap jspCapLeft" />'),b('<div class="jspTrack" />').append(b('<div class="jspDrag" />').append(b('<div class="jspDragLeft" />'),b('<div class="jspDragRight" />'))),b('<div class="jspCap jspCapRight" />')));an=am.find(">.jspHorizontalBar");G=an.find(">.jspTrack");h=G.find(">.jspDrag");if(az.showArrows){ay=b('<a class="jspArrow jspArrowLeft" />').bind("mousedown.jsp",aE(-1,0)).bind("click.jsp",aC);x=b('<a class="jspArrow jspArrowRight" />').bind("mousedown.jsp",aE(1,0)).bind("click.jsp",aC);
if(az.arrowScrollOnHover){ay.bind("mouseover.jsp",aE(-1,0,ay));x.bind("mouseover.jsp",aE(1,0,x))}al(G,az.horizontalArrowPositions,ay,x)}h.hover(function(){h.addClass("jspHover")},function(){h.removeClass("jspHover")}).bind("mousedown.jsp",function(aJ){b("html").bind("dragstart.jsp selectstart.jsp",aC);h.addClass("jspActive");var s=aJ.pageX-h.position().left;b("html").bind("mousemove.jsp",function(aK){W(aK.pageX-s,false)}).bind("mouseup.jsp mouseleave.jsp",ax);return false});l=am.innerWidth();ah()}}function ah(){am.find(">.jspHorizontalBar>.jspCap:visible,>.jspHorizontalBar>.jspArrow").each(function(){l-=b(this).outerWidth()});G.width(l+"px");aa=0}function F(){if(aF&&aA){var aJ=G.outerHeight(),s=aq.outerWidth();t-=aJ;b(an).find(">.jspCap:visible,>.jspArrow").each(function(){l+=b(this).outerWidth()});l-=s;v-=s;ak-=aJ;G.parent().append(b('<div class="jspCorner" />').css("width",aJ+"px"));o();ah()}if(aF){Y.width((am.outerWidth()-f)+"px")}Z=Y.outerHeight();q=Z/v;if(aF){au=Math.ceil(1/y*l);if(au>az.horizontalDragMaxWidth){au=az.horizontalDragMaxWidth}else{if(au<az.horizontalDragMinWidth){au=az.horizontalDragMinWidth}}h.width(au+"px");j=l-au;ae(aa)}if(aA){A=Math.ceil(1/q*t);if(A>az.verticalDragMaxHeight){A=az.verticalDragMaxHeight}else{if(A<az.verticalDragMinHeight){A=az.verticalDragMinHeight}}av.height(A+"px");i=t-A;ad(I)}}function al(aK,aM,aJ,s){var aO="before",aL="after",aN;if(aM=="os"){aM=/Mac/.test(navigator.platform)?"after":"split"}if(aM==aO){aL=aM}else{if(aM==aL){aO=aM;aN=aJ;aJ=s;s=aN}}aK[aO](aJ)[aL](s)}function aE(aJ,s,aK){return function(){H(aJ,s,this,aK);this.blur();return false}}function H(aM,aL,aP,aO){aP=b(aP).addClass("jspActive");var aN,aK,aJ=true,s=function(){if(aM!==0){Q.scrollByX(aM*az.arrowButtonSpeed)}if(aL!==0){Q.scrollByY(aL*az.arrowButtonSpeed)}aK=setTimeout(s,aJ?az.initialDelay:az.arrowRepeatFreq);aJ=false};s();aN=aO?"mouseout.jsp":"mouseup.jsp";aO=aO||b("html");aO.bind(aN,function(){aP.removeClass("jspActive");aK&&clearTimeout(aK);aK=null;aO.unbind(aN)})}function p(){w();if(aA){aq.bind("mousedown.jsp",function(aO){if(aO.originalTarget===c||aO.originalTarget==aO.currentTarget){var aM=b(this),aP=aM.offset(),aN=aO.pageY-aP.top-I,aK,aJ=true,s=function(){var aS=aM.offset(),aT=aO.pageY-aS.top-A/2,aQ=v*az.scrollPagePercent,aR=i*aQ/(Z-v);if(aN<0){if(I-aR>aT){Q.scrollByY(-aQ)}else{V(aT)}}else{if(aN>0){if(I+aR<aT){Q.scrollByY(aQ)}else{V(aT)}}else{aL();return}}aK=setTimeout(s,aJ?az.initialDelay:az.trackClickRepeatFreq);aJ=false},aL=function(){aK&&clearTimeout(aK);aK=null;b(document).unbind("mouseup.jsp",aL)};s();b(document).bind("mouseup.jsp",aL);return false}})}if(aF){G.bind("mousedown.jsp",function(aO){if(aO.originalTarget===c||aO.originalTarget==aO.currentTarget){var aM=b(this),aP=aM.offset(),aN=aO.pageX-aP.left-aa,aK,aJ=true,s=function(){var aS=aM.offset(),aT=aO.pageX-aS.left-au/2,aQ=ak*az.scrollPagePercent,aR=j*aQ/(T-ak);if(aN<0){if(aa-aR>aT){Q.scrollByX(-aQ)}else{W(aT)}}else{if(aN>0){if(aa+aR<aT){Q.scrollByX(aQ)}else{W(aT)}}else{aL();return}}aK=setTimeout(s,aJ?az.initialDelay:az.trackClickRepeatFreq);aJ=false},aL=function(){aK&&clearTimeout(aK);aK=null;b(document).unbind("mouseup.jsp",aL)};s();b(document).bind("mouseup.jsp",aL);return false}})}}function w(){if(G){G.unbind("mousedown.jsp")}if(aq){aq.unbind("mousedown.jsp")}}function ax(){b("html").unbind("dragstart.jsp selectstart.jsp mousemove.jsp mouseup.jsp mouseleave.jsp");if(av){av.removeClass("jspActive")}if(h){h.removeClass("jspActive")}}function V(s,aJ){if(!aA){return}if(s<0){s=0}else{if(s>i){s=i}}if(aJ===c){aJ=az.animateScroll}if(aJ){Q.animate(av,"top",s,ad)}else{av.css("top",s);ad(s)}}function ad(aJ){if(aJ===c){aJ=av.position().top}am.scrollTop(0);I=aJ;var aM=I===0,aK=I==i,aL=aJ/i,s=-aL*(Z-v);if(aj!=aM||aH!=aK){aj=aM;aH=aK;D.trigger("jsp-arrow-change",[aj,aH,P,k])}u(aM,aK);Y.css("top",s);D.trigger("jsp-scroll-y",[-s,aM,aK]).trigger("scroll")}function W(aJ,s){if(!aF){return}if(aJ<0){aJ=0}else{if(aJ>j){aJ=j}}if(s===c){s=az.animateScroll}if(s){Q.animate(h,"left",aJ,ae)
}else{h.css("left",aJ);ae(aJ)}}function ae(aJ){if(aJ===c){aJ=h.position().left}am.scrollTop(0);aa=aJ;var aM=aa===0,aL=aa==j,aK=aJ/j,s=-aK*(T-ak);if(P!=aM||k!=aL){P=aM;k=aL;D.trigger("jsp-arrow-change",[aj,aH,P,k])}r(aM,aL);Y.css("left",s);D.trigger("jsp-scroll-x",[-s,aM,aL]).trigger("scroll")}function u(aJ,s){if(az.showArrows){ar[aJ?"addClass":"removeClass"]("jspDisabled");af[s?"addClass":"removeClass"]("jspDisabled")}}function r(aJ,s){if(az.showArrows){ay[aJ?"addClass":"removeClass"]("jspDisabled");x[s?"addClass":"removeClass"]("jspDisabled")}}function M(s,aJ){var aK=s/(Z-v);V(aK*i,aJ)}function N(aJ,s){var aK=aJ/(T-ak);W(aK*j,s)}function ab(aW,aR,aK){var aO,aL,aM,s=0,aV=0,aJ,aQ,aP,aT,aS,aU;try{aO=b(aW)}catch(aN){return}aL=aO.outerHeight();aM=aO.outerWidth();am.scrollTop(0);am.scrollLeft(0);while(!aO.is(".jspPane")){s+=aO.position().top;aV+=aO.position().left;aO=aO.offsetParent();if(/^body|html$/i.test(aO[0].nodeName)){return}}aJ=aB();aP=aJ+v;if(s<aJ||aR){aS=s-az.verticalGutter}else{if(s+aL>aP){aS=s-v+aL+az.verticalGutter}}if(aS){M(aS,aK)}aQ=aD();aT=aQ+ak;if(aV<aQ||aR){aU=aV-az.horizontalGutter}else{if(aV+aM>aT){aU=aV-ak+aM+az.horizontalGutter}}if(aU){N(aU,aK)}}function aD(){return -Y.position().left}function aB(){return -Y.position().top}function K(){var s=Z-v;return(s>20)&&(s-aB()<10)}function B(){var s=T-ak;return(s>20)&&(s-aD()<10)}function ag(){am.unbind(ac).bind(ac,function(aM,aN,aL,aJ){var aK=aa,s=I;Q.scrollBy(aL*az.mouseWheelSpeed,-aJ*az.mouseWheelSpeed,false);return aK==aa&&s==I})}function n(){am.unbind(ac)}function aC(){return false}function J(){Y.find(":input,a").unbind("focus.jsp").bind("focus.jsp",function(s){ab(s.target,false)})}function E(){Y.find(":input,a").unbind("focus.jsp")}function S(){var s,aJ,aL=[];aF&&aL.push(an[0]);aA&&aL.push(U[0]);Y.focus(function(){D.focus()});D.attr("tabindex",0).unbind("keydown.jsp keypress.jsp").bind("keydown.jsp",function(aO){if(aO.target!==this&&!(aL.length&&b(aO.target).closest(aL).length)){return}var aN=aa,aM=I;switch(aO.keyCode){case 40:case 38:case 34:case 32:case 33:case 39:case 37:s=aO.keyCode;aK();break;case 35:M(Z-v);s=null;break;case 36:M(0);s=null;break}aJ=aO.keyCode==s&&aN!=aa||aM!=I;return !aJ}).bind("keypress.jsp",function(aM){if(aM.keyCode==s){aK()}return !aJ});if(az.hideFocus){D.css("outline","none");if("hideFocus" in am[0]){D.attr("hideFocus",true)}}else{D.css("outline","");if("hideFocus" in am[0]){D.attr("hideFocus",false)}}function aK(){var aN=aa,aM=I;switch(s){case 40:Q.scrollByY(az.keyboardSpeed,false);break;case 38:Q.scrollByY(-az.keyboardSpeed,false);break;case 34:case 32:Q.scrollByY(v*az.scrollPagePercent,false);break;case 33:Q.scrollByY(-v*az.scrollPagePercent,false);break;case 39:Q.scrollByX(az.keyboardSpeed,false);break;case 37:Q.scrollByX(-az.keyboardSpeed,false);break}aJ=aN!=aa||aM!=I;return aJ}}function R(){D.attr("tabindex","-1").removeAttr("tabindex").unbind("keydown.jsp keypress.jsp")}function C(){if(location.hash&&location.hash.length>1){var aL,aJ,aK=escape(location.hash);try{aL=b(aK)}catch(s){return}if(aL.length&&Y.find(aK)){if(am.scrollTop()===0){aJ=setInterval(function(){if(am.scrollTop()>0){ab(aK,true);b(document).scrollTop(am.position().top);clearInterval(aJ)}},50)}else{ab(aK,true);b(document).scrollTop(am.position().top)}}}}function ai(){b("a.jspHijack").unbind("click.jsp-hijack").removeClass("jspHijack")}function m(){ai();b("a[href^=#]").addClass("jspHijack").bind("click.jsp-hijack",function(){var s=this.href.split("#"),aJ;if(s.length>1){aJ=s[1];if(aJ.length>0&&Y.find("#"+aJ).length>0){ab("#"+aJ,true);return false}}})}function ao(){var aK,aJ,aM,aL,aN,s=false;am.unbind("touchstart.jsp touchmove.jsp touchend.jsp click.jsp-touchclick").bind("touchstart.jsp",function(aO){var aP=aO.originalEvent.touches[0];aK=aD();aJ=aB();aM=aP.pageX;aL=aP.pageY;aN=false;s=true}).bind("touchmove.jsp",function(aR){if(!s){return}var aQ=aR.originalEvent.touches[0],aP=aa,aO=I;Q.scrollTo(aK+aM-aQ.pageX,aJ+aL-aQ.pageY);aN=aN||Math.abs(aM-aQ.pageX)>5||Math.abs(aL-aQ.pageY)>5;
return aP==aa&&aO==I}).bind("touchend.jsp",function(aO){s=false}).bind("click.jsp-touchclick",function(aO){if(aN){aN=false;return false}})}function g(){var s=aB(),aJ=aD();D.removeClass("jspScrollable").unbind(".jsp");D.replaceWith(ap.append(Y.children()));ap.scrollTop(s);ap.scrollLeft(aJ)}b.extend(Q,{reinitialise:function(aJ){aJ=b.extend({},az,aJ);at(aJ)},scrollToElement:function(aK,aJ,s){ab(aK,aJ,s)},scrollTo:function(aK,s,aJ){N(aK,aJ);M(s,aJ)},scrollToX:function(aJ,s){N(aJ,s)},scrollToY:function(s,aJ){M(s,aJ)},scrollToPercentX:function(aJ,s){N(aJ*(T-ak),s)},scrollToPercentY:function(aJ,s){M(aJ*(Z-v),s)},scrollBy:function(aJ,s,aK){Q.scrollByX(aJ,aK);Q.scrollByY(s,aK)},scrollByX:function(s,aK){var aJ=aD()+Math[s<0?"floor":"ceil"](s),aL=aJ/(T-ak);W(aL*j,aK)},scrollByY:function(s,aK){var aJ=aB()+Math[s<0?"floor":"ceil"](s),aL=aJ/(Z-v);V(aL*i,aK)},positionDragX:function(s,aJ){W(s,aJ)},positionDragY:function(aJ,s){V(aJ,s)},animate:function(aJ,aM,s,aL){var aK={};aK[aM]=s;aJ.animate(aK,{duration:az.animateDuration,easing:az.animateEase,queue:false,step:aL})},getContentPositionX:function(){return aD()},getContentPositionY:function(){return aB()},getContentWidth:function(){return T},getContentHeight:function(){return Z},getPercentScrolledX:function(){return aD()/(T-ak)},getPercentScrolledY:function(){return aB()/(Z-v)},getIsScrollableH:function(){return aF},getIsScrollableV:function(){return aA},getContentPane:function(){return Y},scrollToBottom:function(s){V(i,s)},hijackInternalLinks:function(){m()},destroy:function(){g()}});at(O)}e=b.extend({},b.fn.jScrollPane.defaults,e);b.each(["mouseWheelSpeed","arrowButtonSpeed","trackClickSpeed","keyboardSpeed"],function(){e[this]=e[this]||e.speed});return this.each(function(){var f=b(this),g=f.data("jsp");if(g){g.reinitialise(e)}else{g=new d(f,e);f.data("jsp",g)}})};b.fn.jScrollPane.defaults={showArrows:false,maintainPosition:true,stickToBottom:false,stickToRight:false,clickOnTrack:true,autoReinitialise:false,autoReinitialiseDelay:500,verticalDragMinHeight:0,verticalDragMaxHeight:99999,horizontalDragMinWidth:0,horizontalDragMaxWidth:99999,contentWidth:c,animateScroll:false,animateDuration:300,animateEase:"linear",hijackInternalLinks:false,verticalGutter:4,horizontalGutter:4,mouseWheelSpeed:0,arrowButtonSpeed:0,arrowRepeatFreq:50,arrowScrollOnHover:false,trackClickSpeed:0,trackClickRepeatFreq:70,verticalArrowPositions:"split",horizontalArrowPositions:"split",enableKeyboardNavigation:true,hideFocus:false,keyboardSpeed:0,initialDelay:300,speed:30,scrollPagePercent:0.8}})(jQuery,this);


/**
 * jQuery Masonry v2.0.110927
 * A dynamic layout plugin for jQuery
 * The flip-side of CSS Floats
 * http://masonry.desandro.com
 *
 * Licensed under the MIT license.
 * Copyright 2011 David DeSandro
 */
(function(a,b,c){var d=b.event,e;d.special.smartresize={setup:function(){b(this).bind("resize",d.special.smartresize.handler)},teardown:function(){b(this).unbind("resize",d.special.smartresize.handler)},handler:function(a,b){var c=this,d=arguments;a.type="smartresize",e&&clearTimeout(e),e=setTimeout(function(){jQuery.event.handle.apply(c,d)},b==="execAsap"?0:100)}},b.fn.smartresize=function(a){return a?this.bind("smartresize",a):this.trigger("smartresize",["execAsap"])},b.Mason=function(a,c){this.element=b(c),this._create(a),this._init()};var f=["position","height"];b.Mason.settings={isResizable:!0,isAnimated:!1,animationOptions:{queue:!1,duration:500},gutterWidth:0,isRTL:!1,isFitWidth:!1},b.Mason.prototype={_filterFindBricks:function(a){var b=this.options.itemSelector;return b?a.filter(b).add(a.find(b)):a},_getBricks:function(a){var b=this._filterFindBricks(a).css({position:"absolute"}).addClass("masonry-brick");return b},_create:function(c){this.options=b.extend(!0,{},b.Mason.settings,c),this.styleQueue=[],this.reloadItems();var d=this.element[0].style;this.originalStyle={};for(var e=0,g=f.length;e<g;e++){var h=f[e];this.originalStyle[h]=d[h]||""}this.element.css({position:"relative"}),this.horizontalDirection=this.options.isRTL?"right":"left",this.offset={};var i=b(document.createElement("div"));this.element.prepend(i),this.offset.y=Math.round(i.position().top),this.options.isRTL?(i.css({"float":"right",display:"inline-block"}),this.offset.x=Math.round(this.element.outerWidth()-i.position().left)):this.offset.x=Math.round(i.position().left),i.remove();var j=this;setTimeout(function(){j.element.addClass("masonry")},0),this.options.isResizable&&b(a).bind("smartresize.masonry",function(){j.resize()})},_init:function(a){this._getColumns("masonry"),this._reLayout(a)},option:function(a,c){b.isPlainObject(a)&&(this.options=b.extend(!0,this.options,a))},layout:function(a,c){var d,e,f,g,h,i;for(var j=0,k=a.length;j<k;j++){d=b(a[j]),e=Math.ceil(d.outerWidth(!0)/this.columnWidth),e=Math.min(e,this.cols);if(e===1)this._placeBrick(d,this.colYs);else{f=this.cols+1-e,g=[];for(i=0;i<f;i++)h=this.colYs.slice(i,i+e),g[i]=Math.max.apply(Math,h);this._placeBrick(d,g)}}var l={};l.height=Math.max.apply(Math,this.colYs)-this.offset.y;if(this.options.isFitWidth){var m=0,j=this.cols;while(--j){if(this.colYs[j]!==this.offset.y)break;m++}l.width=(this.cols-m)*this.columnWidth-this.options.gutterWidth}this.styleQueue.push({$el:this.element,style:l});var n=this.isLaidOut?this.options.isAnimated?"animate":"css":"css",o=this.options.animationOptions,p;for(j=0,k=this.styleQueue.length;j<k;j++)p=this.styleQueue[j],p.$el[n](p.style,o);this.styleQueue=[],c&&c.call(a),this.isLaidOut=!0},_getColumns:function(){var a=this.options.isFitWidth?this.element.parent():this.element,b=a.width();this.columnWidth=this.options.columnWidth||this.$bricks.outerWidth(!0)||b,this.columnWidth+=this.options.gutterWidth,this.cols=Math.floor((b+this.options.gutterWidth)/this.columnWidth),this.cols=Math.max(this.cols,1)},_placeBrick:function(a,b){var c=Math.min.apply(Math,b),d=0;for(var e=0,f=b.length;e<f;e++)if(b[e]===c){d=e;break}var g={top:c};g[this.horizontalDirection]=this.columnWidth*d+this.offset.x,this.styleQueue.push({$el:a,style:g});var h=c+a.outerHeight(!0),i=this.cols+1-f;for(e=0;e<i;e++)this.colYs[d+e]=h},resize:function(){var a=this.cols;this._getColumns("masonry"),this.cols!==a&&this._reLayout()},_reLayout:function(a){var b=this.cols;this.colYs=[];while(b--)this.colYs.push(this.offset.y);this.layout(this.$bricks,a)},reloadItems:function(){this.$bricks=this._getBricks(this.element.children())},reload:function(a){this.reloadItems(),this._init(a)},appended:function(a,b,c){if(b){this._filterFindBricks(a).css({top:this.element.height()});var d=this;setTimeout(function(){d._appended(a,c)},1)}else this._appended(a,c)},_appended:function(a,b){var c=this._getBricks(a);this.$bricks=this.$bricks.add(c),this.layout(c,b)},remove:function(a){this.$bricks=this.$bricks.not(a),a.remove()},destroy:function(){this.$bricks.removeClass("masonry-brick").each(function(){this.style.position="",this.style.top="",this.style.left=""});var c=this.element[0].style;for(var d=0,e=f.length;d<e;d++){var g=f[d];c[g]=this.originalStyle[g]}this.element.unbind(".masonry").removeClass("masonry").removeData("masonry"),b(a).unbind(".masonry")}},b.fn.imagesLoaded=function(a){function h(){--e<=0&&this.src!==f&&(setTimeout(g),d.unbind("load error",h))}function g(){a.call(b,d)}var b=this,d=b.find("img").add(b.filter("img")),e=d.length,f="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";e||g(),d.bind("load error",h).each(function(){if(this.complete||this.complete===c){var a=this.src;this.src=f,this.src=a}});return b};var g=function(a){this.console&&console.error(a)};b.fn.masonry=function(a){if(typeof a=="string"){var c=Array.prototype.slice.call(arguments,1);this.each(function(){var d=b.data(this,"masonry");if(!d)g("cannot call methods on masonry prior to initialization; attempted to call method '"+a+"'");else{if(!b.isFunction(d[a])||a.charAt(0)==="_"){g("no such method '"+a+"' for masonry instance");return}d[a].apply(d,c)}})}else this.each(function(){var c=b.data(this,"masonry");c?(c.option(a||{}),c._init()):b.data(this,"masonry",new b.Mason(a,this))});return this}})(window,jQuery);



/*!
 * jQuery imagesLoaded plugin v1.0.4
 * http://github.com/desandro/imagesloaded
 *
 * MIT License. by Paul Irish et al.
 */

(function(a,b){a.fn.imagesLoaded=function(i){var g=this,e=g.find("img").add(g.filter("img")),c=e.length,h="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";function f(){i.call(g,e)}function d(j){if(--c<=0&&j.target.src!==h){setTimeout(f);e.unbind("load error",d)}}if(!c){f()}e.bind("load error",d).each(function(){if(this.complete||this.complete===b){var j=this.src;this.src=h;this.src=j}});return g}})(jQuery);

/*
 * Special event for image load events
 * Needed because some browsers does not trigger the event on cached images.

 * MIT License
 * Paul Irish     | @paul_irish | www.paulirish.com
 * Andree Hansson | @peolanha   | www.andreehansson.se
 * 2010.
 *
 * Usage:
 * $(images).bind('load', function (e) {
 *   // Do stuff on load
 * });
 * 
 * Note that you can bind the 'error' event on data uri images, this will trigger when
 * data uri images isn't supported.
 * 
 * Tested in:
 * FF 3+
 * IE 6-8
 * Chromium 5-6
 * Opera 9-10
 */

/**
 * Horizontal slider with scrollbar. Sets a horizontal sliding functionality to an element, with the following navigation options:
 * - sliding on mouse scroll
 * - adds a scrollbar
 * - adds navigation arrows on top 
 * 
 * Dependencies:
 * - mousewheel - Brandon Aaron (http://brandonaaron.net)
 * - jQuery UI Core http://jqueryui.com
 * - jQuery UI Draggable http://jqueryui.com
 * 
 * @author Pexeto
 * http://pexeto.com 
 */
(function( $ ) {
	$.fn.pexetoHorizontalSlider = function( options ){
		
		var defaults={
			frameWidth        : 500,               //the width of the visible frame of the slider
			frameHeight       : 500,               //the height of the visible frame of the slider   
			easing            : 'easeOutSine',     //easing function for the sliding animation
			additionalWidth   : 310,               //the width that will be added to the slider
			showScrollbar     : true,
			scrollAppendTo    : null,              //the element to which to append the scrollbar, if left null the scrollbar will be appended to the root element
			partialLoading	  : true,
			imgNumBeforeLoad  : 3,
			hiddenImgWidth    : 500,               //the width a loading image would allocate before getting displayed

			//classes, ids and selectors
			leftArrowId       : 'preview-left-arrow',
			rightArrowId      : 'preview-right-arrow',
			arrowsClass       : 'preview-arrows',
			imgHolderClass    : 'preview-img-container'
		};
		
		//define some helper variables that will be used globally by the plugin
		var o = $.extend(defaults, options),
			$root = $(this),
			$wrapper=$root.parent(),
			$imgHolder = $root.find('.'+o.imgHolderClass),
			wrapperWidth=0,
			$scrollBar = null,
			$handle = null,
			sliderWidth = 0,
			slideStep = 0,
			scroll = false,
			handleRatio=0,
			$leftArrow=null,
			$rightArrow=null,
			leftArrowHidden=true,
			rightArrowHidden=false,
			imgLoaded = [],
			imgNum = $imgHolder.find('img').length,
			ie = pexetoSite.getBrowser().msie,
			isIdevice=(navigator.platform === 'iPad' || navigator.platform === 'iPhone' || navigator.platform === 'iPod')?true:false,
			additionalRootWidth=isIdevice?100:3000,
			isMobile = pexetoSite.checkIfMobile(),
			sliderSpeed = isMobile ? 1500 : 1000,
			stepDivide = isMobile ? 1.5 : 2,
			swipeStarted = 0;
		
		/**
		 * Inits the main functionality - calls the initialization functions.
		 */
		function init(){
			if(isIdevice){
				$wrapper.css({border:'3px solid transparent'});
			}
			if(o.partialLoading){
				//create an array of the loaded images - 0 in the relevant index means that the image is not loaded and 1 means that it is loaded
				for(var i=0; i<imgNum; i++){
					imgLoaded[i] = (i<=o.imgNumBeforeLoad-1)?1:0;
				}

			}
			calculateDimensions();
	
			//set the navigation functionality if the slider is larger than the visible frame width
			if(sliderWidth>o.frameWidth){
				scroll=true;
				if(o.showScrollbar){
					setScrollbar();
					addArrows();
				}
			}
	
			bindEventHandlers();

			var $share = $root.find('.social-share');
			if($share.length){
				pexetoSite.initShare($share);
			}
			
		}

		/**
		 * Calculates the main dimentions that will be used for the calculations of the sliding.
		 */
		function calculateDimensions(){
			var allImages = $imgHolder.find('img');

			//get the slider width
			sliderWidth=o.additionalWidth;
			wrapperWidth=o.scrollAppendTo?$(o.scrollAppendTo).width():$wrapper.width();

			allImages.each(function(i){
				var newImgWidth = 0,
					w = 0,
					h = 0;

				if( (o.partialLoading && imgLoaded[i]) || !o.partialLoading ){
					//image is loaded, add the real image size
					w = this.naturalWidth || $(this).width();
					h = this.naturalHeight || $(this).height();
					newImgWidth= getDisplayWidth(o.frameHeight, h , w);
				}else{
					//image is not loaded, set a hidden image size
					newImgWidth=o.hiddenImgWidth;
				}
				sliderWidth+=newImgWidth;
				
			});

			
			$root.width(sliderWidth+additionalRootWidth);
			slideStep=o.frameWidth/stepDivide;
		}
		
		/**
		 * Adds the navigation arrows.
		 */
		function addArrows(){
			$leftArrow=$("<div />", {"class":o.arrowsClass+" hover", "id":o.leftArrowId}).css({top:o.frameHeight/2}).appendTo($wrapper).on("click", movePrev).hide();
			$rightArrow=$("<div />", {"class":o.arrowsClass+" hover", "id":o.rightArrowId}).css({top:o.frameHeight/2}).appendTo($wrapper).on("click", moveNext);
		}
		
		/**
		 * Calculates the display width of an image depending on its display height when it is resized.
		 * @param displayHeight the resized height of the image
		 * @param originalHeight the original height of the image
		 * @param originalWidth the original width of the image
		 * @return the display width
		 */
		function getDisplayWidth(displayHeight, originalHeight, originalWidth){
			var ratio = originalHeight/displayHeight,
				res = Math.round(originalWidth/ratio) || 1000;
			return res;
		}
		
		/**
		 * Binds event handlers to the elements.
		 */
		function bindEventHandlers(){
			$root.on({
				"sizeChanged" : doOnWidthChanged,
				"reset" : doOnReset,
				"sliderDisplayed" : function(){
					if(scroll && $scrollBar){
						$scrollBar.show();
					}
				}
			});


			
			
			if(scroll){
				$imgHolder.on("mousewheel",doOnImageMouseWheel);

				$root.swipe({
				  swipe:doOnSwipe,
				  swipeStatus:function(event,status,direction,distance,duration){
				  	//move the navigation arrows when the swipe starts
				  	if(status==='start'){
				  		swipeStarted=true;
				  	}if(status==='move' && swipeStarted){
				  		if(direction==='left'){
				  			$rightArrow.stop().animate({marginRight:-20});
				  		}else if(direction==='right'){
				  			$leftArrow.stop().animate({marginLeft:-20});
				  		}
				  		swipeStarted=false;
				  	}else if(status==='end'){
				  		if(direction==='left'){
					  		$rightArrow.stop().animate({marginRight:0});
					  	}else if(direction==='right'){
				  			$leftArrow.stop().animate({marginLeft:0});
				  		}
				  	}
				  }
				});

			}

			if(o.partialLoading){
				setImgLoading();
			}
		}



		/**
		 * If partial loading is enabled, when each image is loaded displays the image, recalculates the new dimensions and
		 * refreshes the navigation.
		**/
		function setImgLoading(){
			var imagesToLoad = $imgHolder.find('img:gt('+(o.imgNumBeforeLoad-1)+')');
			imagesToLoad.each(function(i){
				if($(this).data("loaded")==="true"){
					displayImage($(this), i);
				}else{
					$(this).onPexetoImagesLoaded({callback:function(){
						displayImage($(this), i);
					}
				});
				}				
			});
		}

		/**
		 * When partial loading is enabled and an image has been loaded, displays the image in the slider
		 * and calls a function to refresh the navigation.
		 * @param $img the image to be displayed
		 * @param i the index of the image
		 */
		function displayImage($img, i){
			imgLoaded[i+o.imgNumBeforeLoad]=1;
			addImageSizeToSlider($img);
			
			$img.animate({opacity:1}, 500).parent().removeClass("to-load");
			 
			refreshScrollbar();
		}

		/**
		 * When partial loading is enabled and an image has been loaded, calculates the image size and updates the
		 * slider size accordingly.
		 * @param $img the image to be displayed
		 */
		function addImageSizeToSlider($img){
			var w = $img.get(0).naturalWidth || $img.width(),
				h = $img.get(0).naturalHeight || $img.height(),
				imgWidth = getDisplayWidth(o.frameHeight, h , w),
				difference = imgWidth - o.hiddenImgWidth;
			sliderWidth+=difference;
			$root.width(sliderWidth+additionalRootWidth);
		}
		
		/**
		 * Creates the scrollbar and appends it to the selected element.
		 */
		function setScrollbar(){
			var $appendEl=o.scrollAppendTo||$root;
			$scrollBar=$('<div />', {"class":"horizontal-slider"}).appendTo($appendEl);
			$handle=$('<div />', {"class":"horizontal-handle hover"}).appendTo($scrollBar);
			refreshScrollbar();
		}

		function refreshScrollbar(){
			if(scroll && o.showScrollbar){
				setHandleWidth();

				//initialize the draggable functionality
				$handle.draggable({ axis: "x", drag:doOnHandleDragged, containment:"parent" });
			}
			
		}
		
		/**
		 * Sets the scrollbar handle width according to the slider and display frame width.
		 */
		function setHandleWidth(){
			if($handle){
					var widthRatio = sliderWidth/o.frameWidth,
			handleWidth = wrapperWidth/widthRatio-2;
			$handle.stop().animate({width:handleWidth}, 200);
			handleRatio=sliderWidth/wrapperWidth;
			}
		}
		
		/**
		 * Handles the window width change event - recalculates all the dimensions and changes the scrollbar handle width.
		 * @param e the event object
		 * @param newWidth the new width of the display frame
		 * @param newHeight the new height of the display frame
		 */
		function doOnWidthChanged(e, newWidth, newHeight){
			var prevWidth=sliderWidth,
				currentPosition=0,
				handleLeft=0,
				ratio=0;
			
			o.frameWidth=newWidth;
			o.frameHeight=newHeight;
			calculateDimensions();
			
			if(scroll){
				ratio = prevWidth/sliderWidth;
				currentPosition=parseInt($root.css("left"), 10);
				$root.css({left:currentPosition/ratio});
				
				if(o.showScrollbar){
					handleLeft=parseInt($handle.css("left"), 10);
					setHandleWidth();
					$handle.css({left:handleLeft/ratio});
				}
				
				if($leftArrow && $rightArrow){
					$leftArrow.css({top:o.frameHeight/2});
					$rightArrow.css({top:o.frameHeight/2});
				}
			}
			
		}
		
		/**
		 * Handles the mouse wheel (scroll) event to an image - calls the relevant sliding function.
		 * @param e the event object
		 * @param delta an ineteger setting the orientation for the scroll (-1 for down and 1 for up)
		 */
		function doOnImageMouseWheel(e, delta){
			e.preventDefault();
			if(delta<0){
				moveNext();
			}else{
				movePrev();
			}
		}

		function doOnSwipe(event, direction, distance, duration, fingerCount){
			var newPosition = 0;
			if(direction==='left'){
				newPosition = getNewSliderPosition(true, distance);
				moveSlider(newPosition);
			}else if(direction==='right'){
				newPosition = getNewSliderPosition(false, distance);
				moveSlider(newPosition);
			}

			
		}
		
		/**
		 * Slides the slider back and moves the scrollbar handle accordingly.
		 */
		function movePrev(){
			var newPosition = getNewSliderPosition(false, slideStep);
			moveSlider(newPosition);
		}
		
		/**
		 * Slides the slider forward and moves the scrollbar handle accordingly.
		 */
		function moveNext(){
			var newPosition = getNewSliderPosition(true, slideStep);
			
			moveSlider(newPosition);
		}

		function getNewSliderPosition(next, length){
			var step=0,
			currentPosition=parseInt($root.css('left'),10),
			lengthLeft=0,
			newPosition=0;

			if(next){
				lengthLeft=sliderWidth+currentPosition;
				step=((lengthLeft-o.frameWidth)>length)?length:(lengthLeft-o.frameWidth);
				newPosition=currentPosition-step;
			}else{
				step=((-currentPosition)>length)?length:-currentPosition;
				newPosition=currentPosition+step;
			}

			return newPosition;

		}

		function moveSlider(newPosition){
			$root.stop().animate({left:[newPosition, o.easing]}, sliderSpeed); //move the slider
			$handle.stop().animate({left:-newPosition/handleRatio}); //move the scrollbar handle
			setArrowVisibility(newPosition);
		}
		

		/**
		 * Sets the arrows visibility. The left arrow should be hidden when there is no more space to move back and the
		 * right arrow should be hidden when there is no more space to move forward.
		 * @param newPosition the new margin of the slider
		 * @return
		 */
		function setArrowVisibility(newPosition){
			//right arrow
			if(-newPosition+2>=sliderWidth-o.frameWidth && !rightArrowHidden){
				//hide the arrow
				$rightArrow.hide();
				rightArrowHidden=true;
			}else if(-newPosition<sliderWidth-o.frameWidth){
				//show the arrow
				$rightArrow.show();
				rightArrowHidden=false;
			}
			
			//left arrow
			if(newPosition<0 && leftArrowHidden){
				//show the arrow
				$leftArrow.show();
				leftArrowHidden=false;	
			}else if(newPosition===0){
				//hide the arrow
				$leftArrow.hide();
				leftArrowHidden=true;	
			}
		}
		
		/**
		 * Handles the reset event - removes the scrollbar and navigation arrows.
		 */
		function doOnReset(){
			if($scrollBar){
				$scrollBar.remove();
				$leftArrow.remove();
				$rightArrow.remove();
			}
		}
		
		/**
		 * Handles the handle drag event - slides the slider according to the dragging event.
		 * @param event the event object
		 * @param ui an object that contains the drag data
		 */
		function doOnHandleDragged(event, ui){
			var left = ui.offset.left,
				newPosition=-left*handleRatio;
			$root.stop().css({left:newPosition});
			setArrowVisibility(newPosition);
		}
		
		init();
		
		return $(this);
	};
})( jQuery );



/**
 * Portfolio grid gallery - displays the portfolio items separated in a grid structure. Provides different options for the
 * gallery item clicking actions - open the image in lightbox, open a preview section with more images displayed in a slider,
 * open a custom link, etc.
 * Provides a category filter to display items by a selected category.
 * All the functionality is executed via AJAX requests, there are no page reloads.
 * 
 * Dependencies:
 * pexetoSite - for lightbox loading and templating function (by Pexeto)
 * pexetoHorizontalSlider - the horizontal slider functionality on image preview (by Pexeto)
 * jQuery imagesLoaded plugin v1.0.4 - http://github.com/desandro/imagesloaded
 * mousewheel - Brandon Aaron (http://brandonaaron.net)
 * jQuery UI Core http://jqueryui.com
 * jQuery UI Draggable http://jqueryui.com
 * mwheelintent - http://www.protofunc.com/scripts/jquery/mwheelIntent/
 * jScrollPane - http://jscrollpane.kelvinluck.com/
 * 
 * @author Pexeto
 * http://pexeto.com 
 */
(function($){
	$.fn.pexetoGridGallery=function(options){
		var defaults={
			//default settings
			itemsPerPage           : 15,                   //the number of items per page
			showCategories         : true,                 // if set to false, the categories will be hidden
			easing                 : 'easeOutSine',        //the animation easing
			scrollEasing           : 'easeOutExpo',        //the easing of the scrolling animation in the preview slider section
			showInfo               : true,                 //whether to show item info (title and category) below the image
			imageWidth             : 290,				   //the default image width
			category               : -1,                   //category to load by default (-1 for all categories)
			categories             : [],                   //the categories that will be displayed in the filter
			heightToDecrease       : 182,                  //the height to reduce from the window height to calculate the preview images height
			descHeightToDecrease   : 70,                   //the height to decrease from the preview content section that will leave space for the "Back to gallery button"
			descPadding            : 20,                   //the padding of the description in the preview content section
			windowMargin           : 80,                   //the sum of the window marging from left and right
			scrollAppendTo         : $('#full-content-container'), //the element to which the scrollbar in the preview section will be appended
			orderBy                : 'date',               //the way the items should be ordered - available options: "date" and "custom"
			desaturate             : false,                //whether the black & white effect is enabled
			showBackBtnEnd         : false,                //whether to add a "Back to gallery" button in the end of the slider
			imgNumBeforeLoad       : 1,                    //the number of images to load before showing the horizontal slider
			partialLoading         : true,                 //whether to load the images one by one after opening the horizontal slider or to load them all at once before showing the slider
			
			//texts
			allText                : 'ALL',
			filterText             : 'Filter',
			loadMoreText           : 'Load More',
			backText               : 'Back to gallery',
			infoText               : 'Info',
		
			//selectors and class/id names
			itemClass              : 'content-box',        //the class of the div that wraps each portfolio item data
			plusClass              : 'portfolio-more',
			loadingClass           : 'loading',
			btnLoadingClass        : 'btn-loading',
			galleryId              : 'grid-gallery',
			categoryHolderId       : 'portfolio-categories',
			selectedClass          : 'selected',
			openedClass            : 'filter-opened',
			filterBtnId            : 'filter-btn',
			galleryContainerId     : 'gallery-container',
			previewContainerClass  : 'preview-container',
			slideContainerId       : 'gallery-slide-container',
			previewContentClass    : 'preview-content',
			previewDescClass       : 'preview-description',
			previewImgSliderClass  : 'preview-img-slider',
			previewImgContainerClass:'preview-img-container',
			previewWrapperClass    : 'preview-content-wrapper',
			backBtnClass           : 'back-btn',
			backBtnEndClass        : 'back-btn-end',
			itemLoadingClass       : 'portfolio-loading',
			previewShadowClass     : 'preview-shadow',
			videoClass             : 'portfolio-video',
			sliderInfoBtnClass	   : 'slider-info-btn',
			sliderInfoClass        : 'slider-info',
			sliderInfoCloseClass   : 'slider-info-close',
			
			//templates
			moreTmpl               : '<div class="more-container"><a id="loadMore" class="button"><span>{text}</span></a></div>',
			previewContentTmpl     : '<div class="preview-description"><div class="preview-text"><span class="post-info">{cat}</span><h2>{title}</h2>{content}</div></div>'
		};
		
		
		
		//define some helper variables that will be globally used within the plugin
		var o=$.extend(defaults, options),
			$wrapper=$(this),
			$galleryContainer=$wrapper.find('#'+o.galleryContainerId),
			$previewWrapper=null,
			$previewContainer=null,
			$previewContent=null,
			$imageContainer=null,
			$backButton=null,
			$root=$('<div/>', {'id':o.galleryId}).appendTo($galleryContainer),
			items = [],                   //will contain all the portfolio items
			$moreBtn=$(pexetoSite.template(o.moreTmpl, {text:o.loadMoreText})), //the "Load More" button element
			$catHolder=null,              //the category filter holder
			currentCat=o.category,                //the ID of the current selectec category
			filterDisplayed=false,        //the state of the category filter - true for displayed and false for hidden
			$filterBtn = null,
			filterInAnimation=false,      //a boolean setting whether the filter has been currently animated
			windowWidth = $(window).width(),  
			windowHeight = $(window).height(),
			fullImageHeight = 0,
			currentItem=null,
			previewMode=false,             //a boolean setting whether a preview content section is displayed
			currentXhr=null,
			isIdevice=(navigator.platform === 'iPad' || navigator.platform === 'iPhone' || navigator.platform === 'iPod')?true:false,
			heightToDecrease = 0,
			inLoading = false,
			galleryLoaded = false,
			browser = pexetoSite.getBrowser(),
			isIe = browser.msie,
			isIE8 = isIe && parseInt(browser.version, 10) == 8;

		
		/**
		 * Initializes the main functionality - calls the main functions.
		 */
		function init(){
			var hash = location.hash.replace('#',''),
				item = null;

			if(hash && $.isNumeric(hash)){
				item = {id:hash, link:'permalink'};
				currentItem=item;
				loadItemContent(item);
			}else{
				loadGallery();
			}

			$(window).on('resize orientationchange', doOnWindowResize);
		}

		function loadGallery(){
			if(o.showCategories){
				displayCategoryFilter();
			}
			loadImages({}, true);
			bindEventHandlers();
			
			//initialize the Masonry script to order the items one below another
			$root.masonry({
			    itemSelector : '.'+o.itemClass
			});
			galleryLoaded=true;

			//show the gallery when the browser back button is clicked in the slider view section
			window.onpopstate = function(event) {
				if(previewMode){
					doOnBackClicked();
				}
			};
		}
		
		/**
		 * Binds event handlers to the elements.
		 */
		function bindEventHandlers(){
			//the hover effect of the items
			$root.delegate('.'+o.itemClass+' a', 'mouseenter', doOnItemMouseEnter);
			$root.delegate('.'+o.itemClass+' a', 'mouseleave', doOnItemMouseLeave);
			
			$moreBtn.find('a').on('click', doOnMoreBtnClick);
			
			if(o.showCategories){
				$catHolder.delegate('li', 'click', doOnCategoryClick);
			}
		}
		
		/**
		 * Displays all the items in a smooth animation
		 * @param data the data received from the AJAX request, containing the new items to display and a boolean variable to set whether there are more items to load
		 * @param first boolean setting whether this is the first image set loading
		 */
		function printItems(data, first){
			var newItems = data.items;
			//render the items data
			for(var i=0, len=newItems.length; i<len; i++){
				var item = newItems[i],
				$el = renderItemElement(item);
				item.el = newItems.el = $el;
				items.push(item);
				if(item.link==='permalink' || item.lightbox){
					bindItemClickHandler(item);
				}
				$root.append($el);
				if(o.desaturate){
					$el.find('img').pexetoDesaturate({parent:$el, globalHover:false});
				}
			}

			setContainerWidth();
			
			//initialize the lightbox
			pexetoSite.setLightbox($root.find("a[rel^='lightbox']"));
			
			//load cufon
			if(!isIE8){
				pexetoSite.loadCufon();
			}
			
			//display the items when the images get loaded
			$root.imagesLoaded(function(){
				removeLoading();
				$root.masonry('reload');
				$root.trigger('itemsLoaded');
				
				var displayItem = function(i){
					newItems[i].el.css({opacity:0, visibility:'visible', marginTop:100}).animate({opacity:1, marginTop:0}, 300, o.easing);
				};
				
				//display the items in a smooth animation
				for(var i=0, len = newItems.length; i<len; i++){
					(function(i){
						window.setTimeout(function(){
							displayItem(i);
						}, i*100);
					})(i);
				}
				
				if(data.more && first){
					//display the "Load more" button
					$moreBtn.insertAfter($root);
				}else if(!data.more){
					//hide more click button
					$moreBtn.detach();
				}
			});
		}


		/**
		 * Sets the container width on mobile devices, so that the container
		 * can get centered on smaller screens.
		 */
		function setContainerWidth(){

			if(!pexetoSite.checkIfMobile()){
				return;
			}

			var windowWidth = $(window).width(),
				firstItem = items[0],
				itemWidth = 0,
				columns = 0,
				galleryMargin = parseInt($root.css('marginLeft')),
				galleryWidth = 0,
				rootWidth = 0;


			if(firstItem){
				itemWidth = o.imageWidth + parseInt(firstItem.el.css('marginRight'));
				galleryWidth = windowWidth - o.windowMargin/2;
				columns = Math.floor(galleryWidth/itemWidth) || 1;

				rootWidth = columns*itemWidth;
				if(rootWidth>windowWidth){
					rootWidth = windowWidth - 10;
				}


				$root.width(rootWidth);
			}
		}
		
		function loadLightbox(data){
			var titles=[],
				descs=[],
				srcs=[];
			for(var i=0, len = data.images.length; i<len; i++){
				titles.push("");
				descs.push(data.images[i].desc);
				srcs.push(data.images[i].img);
			}
			$.prettyPhoto.open(srcs, titles, descs);
		}
		
		/**
		 * Displays an item preview - the preview section consists of an item description section (if enabled) and a horizontal
		 * image slider section that would contain more images for the portfolio item
		 * @param data the item data
		 */
		function showItemPreview(data){
			renderPreviewContainer();
			renderItemPreview(data);
		
			//display the preview when all the slider images get loaded
			var $imgToLoad = o.partialLoading?$imageContainer.find('img:lt('+o.imgNumBeforeLoad+')'):$imageContainer;
			if(o.partialLoading){
				$imageContainer.find('img:gt('+(o.imgNumBeforeLoad-1)+')').css({opacity:0});
			}

			$imgToLoad.imagesLoaded(function(){

				if(currentItem.el){
					currentItem.el.find('.'+o.plusClass).removeClass(o.itemLoadingClass);
				}

				setFooterVisibility();
				heightToDecrease=getHeightToDecrease();
				fullImageHeight=windowHeight-heightToDecrease;
				

				$imageContainer.height(fullImageHeight);
				$previewContent.height(fullImageHeight-2*o.descPadding).find('.preview-description').height(fullImageHeight-o.descHeightToDecrease).jScrollPane({showArrows: false});
				
				//initialize the horizontal slider functionality
				var args={	easing:o.scrollEasing, 
							frameWidth:windowWidth-o.windowMargin, 
							frameHeight:fullImageHeight, 
							scrollAppendTo:o.scrollAppendTo,
							partialLoading:o.partialLoading,
							imgNumBeforeLoad:o.imgNumBeforeLoad};

				if(currentItem.hideContent){
					args.additionalWidth=0;
				}
				
		
				//initialize the scrolling functionality
				$previewContainer.pexetoHorizontalSlider(args);
				
				if(!isIE8){
					//load cufon
					pexetoSite.loadCufon();
				}
				
				$previewWrapper.css({marginLeft:windowWidth+300});

				removeLoading();
				
				//slide and hide the gallery to left
				$galleryContainer.animate({marginLeft:-windowWidth, opacity:0}, 800, function(){
					$(this).animate({height:'hide'});
					$wrapper.animate({height:fullImageHeight+o.windowMargin}, 100, function(){

						$imageContainer.find('img').height(fullImageHeight).width("auto");
						$previewContainer.trigger("sliderDisplayed");
						$previewWrapper.css({visibility:"visible", height:"auto"}).animate({marginLeft:o.windowMargin/2}, function(){$wrapper.css({height:'auto'});}); //slide and show the preview slider
					});
				
				});
			});

			if(o.partialLoading){
				var imagesToLoad = $imageContainer.find('img:gt('+(o.imgNumBeforeLoad-1)+')');
				imagesToLoad.each(function(i){
				$(this).imagesLoaded(function(){
					$(this).data("loaded", "true");
				});
			});
			}
		}
		
		/**
		 * Loads the items from a selected category.
		 * @param cat the category ID of the items to be displayed
		 */
		function filterItems(cat){
			inLoading=true;
			$root.animate({opacity:0}, function(){
				$root.html('').animate({opacity:1},0);
				$wrapper.addClass(o.loadingClass);
				items=[];
				loadImages({cat:cat}, true);
			});
		}
		
		/*****************************************************************************************
		 * AJAX FUNCTIONS
		 ****************************************************************************************/

		/**
		 * Loads the content and attached images to an item - executes an AJAX request.
		 * @param item the item object whose content has been requested
		 */
		function loadItemContent(item){

			var data = {number:o.itemsPerPage, itemid:item.id , action:'pexeto_get_portfolio_content', pageurl: o.pageUrl};

			if(!currentXhr){
				currentXhr = $.ajax({
					url:o.ajaxUrl,
					data:data,
					dataType:'json',
					type:'GET'})
					.done(function(data){
						if(data && !data.failed){
							if(item.link==='permalink'){
								showItemPreview(data);
								previewMode=true;
							}else{
								loadLightbox(data);
								currentItem.el.find('.'+o.plusClass).removeClass(o.itemLoadingClass);
							}
						}else{
							if(!galleryLoaded){
								currentXhr=null;
								loadGallery();
							}
						}
					})
					.always(doOnAjaxComplete);
			}
		}
		
		/**
		 * Loads the images via AJAX request.
		 * @param options an object literal, handled options:
		 * Example: {cat:1, offset:0, imgwidth:290, orderby:'date'}
		 * @param first boolean setting whether this is the first image set loading
		 */
		function loadImages(options, first){
			//default request values
			var data = {number:o.itemsPerPage, 
						cat:o.category, 
						orderby:o.orderBy, 
						offset:0, 
						imgwidth:o.imageWidth,
						action:'pexeto_get_portfolio_items'
				};
			
			data=$.extend(data, options);
			if(!currentXhr){
				currentXhr=$.ajax({
					url:o.ajaxUrl,
					data:data,
					dataType:'json',
					type:'GET'})
					.done(function(data){
						if(data.items.length){
							printItems(data, first);
						}else{
							removeLoading();
						}
						if(first && o.showCategories){
							$catHolder.show();
						}
					})
					.always(doOnAjaxComplete);
			}
		}
		
		/*****************************************************************************************
		 * ELEMENT RENDERING FUNCTIONS
		 ****************************************************************************************/
		
		/**
		 * Renders the HTML of each of the items depending on the settings.
		 * @return the item as jQuery object
		 */
		function renderItemElement(item){
			var html='<div class="'+o.itemClass+'" style="width:'+o.imageWidth+'px;">',
				openLink='',
				closeLink='',
				$el = null,
				videoClass='';
			
			//render the opening an closing link
			if(item.link){
				var rel=item.video?' rel="lightbox"':'',
					link=item.link=='permalink'?'#'+item.id:item.link;
					desc='';
				if(item.desc){
					desc='title="'+item.desc+'"';
				}else if(item.video){
					desc='title=""';
				}
				openLink='<a href="'+link+'"'+rel+desc+' >';
				closeLink='</a>';
			}
			if(item.video){
				videoClass=' '+o.videoClass;
			}
			html+=openLink+'<img src="'+item.image+'" width="'+o.imageWidth+'"/><div class="'+o.plusClass+videoClass+'"><div class="portfolio-icon"></div></div>'+closeLink;
			html+='<div class="content-box-content">';
			if(o.showInfo){
				if(item.cat){
					html+='<h3 class="post-info">'+item.cat+'</h3>';
				}
				html+='<h2>'+item.title+'</h2></div>';
			}
			html+='</div>';
			return $(html);
		}
		
		/**
		 * Renders the category filter element and appends it to the gallery container.
		 */
		function displayCategoryFilter(){
			$catHolder = $('<div />', {"id":o.categoryHolderId});
			$filterBtn=$('<div>', {"class":"alignright hover", "id":o.filterBtnId, "html":"<span>"+o.filterText+"</span>"}).click(doOnFilterClick);
			var catHtml='<ul>';
			catHtml+='<li class="hover '+o.selectedClass+'" data-cat="'+o.category+'">'+o.allText+'</li>';
			for(var i=0, len=o.categories.length; i<len; i++){
				catHtml+='<li class="hover" data-cat="'+o.categories[i].id+'">'+o.categories[i].name+'</li>';
			}
			catHtml+='</ul><div class="clear"></div>';
			
			$catHolder.append($filterBtn).append(catHtml).hide();
			$galleryContainer.prepend($catHolder);
		}
		
		/**
		 * Renders the item preview element.
		 * @param item a literal that contains the data to be displayed
		 */
		function renderItemPreview(item){
			var content='',
			imgHtml='';

			if(item.show_content){
				content = pexetoSite.template(o.previewContentTmpl, {cat:(item.cat||''), title:item.title, content:item.content});
				$previewContent.append(content);
			}else{
				$previewContent.remove();
				currentItem.hideContent=true;
			}
			
			for(var i=0, len = item.images.length; i<len; i++){
				var addClass = (o.partialLoading && i>=o.imgNumBeforeLoad) ? ' to-load' : '',
				$wrapDiv = $('<div/>', {"class":"horizontal-img-wrapper" + addClass}),
				img = new Image();
				img.setAttribute("src", item.images[i].img);
				
				$wrapDiv.append(img);
				$imageContainer.append($wrapDiv);
			}

			$previewWrapper.css({visibility:'hidden'}).show();
		}
		
		/**
		 * Renders the preview container element - with a section for displaying content and a section for image slider.
		 */
		function renderPreviewContainer(){
			$previewWrapper=$('<div />', {"class":o.previewWrapperClass}).hide().appendTo($wrapper);
			$previewContainer=$('<div />', {"class":o.previewContainerClass}).appendTo($previewWrapper);
			var $shadowDiv=$('<div />', {"class":o.previewShadowClass}).appendTo($previewContainer);
			$previewContent = $('<div />', {"class":o.previewContentClass}).appendTo($shadowDiv);
			$backButton = $('<div />', {"class":o.backBtnClass+" hover noSwipe", html:"<span>"+o.backText+"</span>"}).appendTo($previewContent).on("click", doOnBackClicked);
			var $sliderInfoBtn = $('<div />', {"class": o.sliderInfoBtnClass+" noSwipe", "html":o.infoText}).insertAfter($backButton).on('click', doOnMoreInfoClicked);
			$imageContainer= $('<div />', {"class":o.previewImgContainerClass}).appendTo($shadowDiv);
			if(o.showBackBtnEnd){
				//append a back button to the end of the slider
				$('<div />', {"class":o.backBtnEndClass+" hover noSwipe", html:"<span>"+o.backText+"</span>"}).appendTo($imageContainer).on("click", doOnBackClicked);
			}
			$('<div />', {"class":'clear'}).appendTo($shadowDiv);
		}
		
		function abortPendingRequests(){
			if(currentXhr){
				//there is a request pending, abort it and execute this one
				currentXhr.abort();
				if(currentItem){
					currentItem.el.find('.'+o.plusClass).removeClass(o.itemLoadingClass).trigger("mouseleave");
				}
			}
		}
		
		/*****************************************************************************************
		 * EVENT BINDING AND HANDLER FUNCTIONS
		 ****************************************************************************************/
		
		/**
		 * Handles the item mouse enter event - shows the hover circle and fades the image out.
		 */
		function doOnItemMouseEnter(){
			elemFadeIn($(this).find('.'+o.plusClass));
			if(!o.desaturate){
				elemFadeOut($(this).find('img'), 0.8);
			}
		}
		
		/**
		 * Handles the item mouse leave event - hides the hover circle and fades the image in.
		 */
		function doOnItemMouseLeave(){
			if(!$(this).find('.'+o.itemLoadingClass).length){
				elemFadeOut($(this).find('.'+o.plusClass), 0);
				if(!o.desaturate){
					elemFadeIn($(this).find('img'));
				}
			}
		}
		
		/**
		 * Handles the category filter click event - calls the filter function to display the items from the selected
		 * category.
		 */
		function doOnCategoryClick(){
			var that = $(this),
				cat = Number(that.data('cat')),
				ul = null;
			abortPendingRequests();
			
			if(currentCat!==cat){
				currentCat=cat;
				filterItems(cat);
				that.addClass(o.selectedClass).siblings('.'+o.selectedClass).removeClass(o.selectedClass);

				//hide the filter if it is a mobile device
				ul = $catHolder.find('ul');
				if( ul.css('position')==='absolute' && !filterInAnimation){
					filterInAnimation=true;
					ul.animate({height:'hide'}, 400, function(){
						filterInAnimation=false;
						filterDisplayed=false;
						$filterBtn.removeClass(o.openedClass);
					});
				}
			}
		}
		
		/**
		 * Handles the filter button click event - to close/open the category filter with a sliding animation.
		 */
		function doOnFilterClick(){
			var that = $(this),
				ul = that.siblings('ul:first'),
				filterDropdown = ul.css('position')==='absolute',
				animateProperty = filterDropdown ? 'height' : 'width',
				animationSettings = {};
			
			if(!filterInAnimation){
				filterInAnimation=true;
				if(!filterDropdown){
					ul.css({height:25});
				}

				if(filterDisplayed){
					//hide the category filter
					$catHolder.animate({marginTop:0, paddingBottom:0});
					animationSettings[animateProperty] = 'hide';
					ul.animate(animationSettings, 400, function(){
						filterInAnimation=false;
						filterDisplayed=false;
						if(!filterDropdown){
							ul.css({height:'auto'});
						}
						that.removeClass(o.openedClass);
					});
				}else{
					//display the category filter
					that.addClass(o.openedClass);
					$catHolder.animate({marginTop:6, paddingBottom:10});
					animationSettings[animateProperty] = 'show';
					ul.animate(animationSettings, 400, function(){
						filterInAnimation=false;
						filterDisplayed=true;
						if(!filterDropdown){
							ul.css({height:'auto'});
						}
					});
				}
			}
		}
		
		/**
		 * Handles the "Load More" button click event. Calls a function to load more images.
		 */
		function doOnMoreBtnClick(){
			abortPendingRequests();
			$moreBtn.addClass(o.btnLoadingClass);
			loadImages({offset:items.length, cat:currentCat}, false);
		}
		
		/**
		 * Binds a click handler to a single item - this is bound to item that display an image slider in a preview mode.
		 * When clicked, calls a function to load the additional data and images to be displayed.
		 * @param item the item to bind the click event handler
		 */
		function bindItemClickHandler(item){
			item.el.find('a').click(function(e){
				e.preventDefault();
				if(item.link=='permalink'){
					location.hash=item.id;
				}
				abortPendingRequests();
				if(!previewMode && !inLoading){
					item.el.find('.'+o.plusClass).addClass(o.itemLoadingClass);
					currentItem=item;
					loadItemContent(item);
				}
			});
		}
		
		/**
		 * Handles the window resize event - it is mainly used for the preview item section to make sure that the images
		 * will be displayed in full height of the window.
		 */
		function doOnWindowResize(){
			// alert("orientation");
			windowWidth=$(window).width();
			windowHeight=$(window).height();

			if(previewMode){
				setFooterVisibility();		
			}	

			heightToDecrease = getHeightToDecrease();
			fullImageHeight=windowHeight-heightToDecrease;

			if(previewMode){
				$previewContent.height(fullImageHeight-2*o.descPadding).find('.preview-description').height(fullImageHeight-o.descHeightToDecrease).jScrollPane({showArrows: false});
				$imageContainer.height(fullImageHeight).find('img').height(fullImageHeight);
				if(isIdevice){
					$previewWrapper.height(fullImageHeight);
				}
				$previewContainer.trigger("sizeChanged", [windowWidth-o.windowMargin, fullImageHeight]);
			}else{
				setContainerWidth();
				$root.masonry('reload');
			}
		}
		
		/**
		 * Handles the "Back to gallery" button click event in the preview item section.
		 */
		function doOnBackClicked(){
			$previewContainer.trigger("reset");
			location.hash='';
			if(currentItem.el){
				currentItem.el.find('img').trigger("mouseleave");
			}
			previewMode=false;
			$previewWrapper.animate({marginLeft:windowWidth+300}, function(){
				$galleryContainer.show().animate({marginLeft:0, opacity:1});
				$previewWrapper.remove();
				if(!$('#footer').is(':visible')){
					$('#footer').css({display:'block', height:'auto'});
				}
				if(galleryLoaded){
					$root.masonry('reload');
				}else{
					addLoading();
					loadGallery();
				}
				
			});
		}

		function doOnMoreInfoClicked(){
			var html = $previewContent.find('.preview-text:first').html(),
			$infoBox = $('<div/>', {'class':o.sliderInfoClass, html:html}).appendTo($('body')).fadeIn(),
			$closeBtn = $('<div />', {'class':o.sliderInfoCloseClass})
				.appendTo($infoBox)
				.on('click', function(){
					$infoBox.fadeOut(function(){
						$infoBox.remove();
					});
				});

		}
		
		function doOnAjaxComplete(){
			inLoading=false;
			currentXhr=null;
		}
		
		/*****************************************************************************************
		 * HELPER FUNCTIONS
		 ****************************************************************************************/
		
		/**
		 * Removes the loading from the wrapper and more button.
		 */
		function removeLoading(){
			$wrapper.removeClass(o.loadingClass);
			$moreBtn.removeClass(o.btnLoadingClass);
		}

		function addLoading(){
			$wrapper.addClass(o.loadingClass);
		}
		
		/**
		 * Fades an element in.
		 * @param $elem the element to be faded
		 */
		function elemFadeIn($elem){
			$elem.stop().animate({opacity:1}, function(){
				$elem.animate({opacity:1}, 0);	
			});
		}
		
		/**
		 * Fades an elemen out to a selected opacity.
		 * @param $elem the element to be faded
		 * @param opacity the opacity to be faded to
		 */
		function elemFadeOut($elem, opacity){
			$elem.stop().animate({opacity:opacity}, function(){
				$elem.animate({opacity:opacity}, 0);	
			});
		}

		function getHeightToDecrease(){
			var windowMargin = parseInt($('#header').css('marginBottom'))*2 || o.windowMargin,
				footerHeight = $('#footer').is(':visible') ? $('#footer').outerHeight():0;

			return ($('#header').outerHeight()+footerHeight + windowMargin ) || o.heightToDecrease;
		}

		function setFooterVisibility(){
			var windowHeight = $(window).height();

			if(windowHeight<400){
				$('#footer').css({display:'none', height:0});
			}else if(!$('#footer').is(':visible')){
				$('#footer').css({display:'block', height:'auto'});
			}
		}
		
		init();
	
	};
}(jQuery));
