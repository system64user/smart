var json_parse=function(){"use strict";var a,b,c,d,e={'"':'"',"\\":"\\","/":"/",b:"\b",f:"\f",n:"\n",r:"\r",t:"	"},f=function(b){throw{name:"SyntaxError",message:b,at:a,text:c}},g=function(d){return d&&d!==b&&f("Expected '"+d+"' instead of '"+b+"'"),b=c.charAt(a),a+=1,b},h=function(){var a,c="";for("-"===b&&(c="-",g("-"));b>="0"&&"9">=b;)c+=b,g();if("."===b)for(c+=".";g()&&b>="0"&&"9">=b;)c+=b;if("e"===b||"E"===b)for(c+=b,g(),("-"===b||"+"===b)&&(c+=b,g());b>="0"&&"9">=b;)c+=b,g();return a=+c,isFinite(a)?a:void f("Bad number")},i=function(){var a,c,d,h="";if('"'===b)for(;g();){if('"'===b)return g(),h;if("\\"===b)if(g(),"u"===b){for(d=0,c=0;4>c&&(a=parseInt(g(),16),isFinite(a));c+=1)d=16*d+a;h+=String.fromCharCode(d)}else{if("string"!=typeof e[b])break;h+=e[b]}else h+=b}f("Bad string")},j=function(){for(;b&&" ">=b;)g()},k=function(){switch(b){case"t":return g("t"),g("r"),g("u"),g("e"),!0;case"f":return g("f"),g("a"),g("l"),g("s"),g("e"),!1;case"n":return g("n"),g("u"),g("l"),g("l"),null}f("Unexpected '"+b+"'")},l=function(){var a=[];if("["===b){if(g("["),j(),"]"===b)return g("]"),a;for(;b;){if(a.push(d()),j(),"]"===b)return g("]"),a;g(","),j()}}f("Bad array")},m=function(){var a,c={};if("{"===b){if(g("{"),j(),"}"===b)return g("}"),c;for(;b;){if(a=i(),j(),g(":"),Object.hasOwnProperty.call(c,a)&&f('Duplicate key "'+a+'"'),c[a]=d(),j(),"}"===b)return g("}"),c;g(","),j()}}f("Bad object")};return d=function(){switch(j(),b){case"{":return m();case"[":return l();case'"':return i();case"-":return h();default:return b>="0"&&"9">=b?h():k()}},function(e,g){var h;return c=e,a=0,b=" ",h=d(),j(),b&&f("Syntax error"),"function"==typeof g?function i(a,b){var c,d,e=a[b];if(e&&"object"==typeof e)for(c in e)Object.prototype.hasOwnProperty.call(e,c)&&(d=i(e,c),void 0!==d?e[c]=d:delete e[c]);return g.call(a,b,e)}({"":h},""):h}}();!function(){window.MiniLoginEmbedder||(window.MiniLoginEmbedder=function(){return this.config={targetId:"alibaba-login-iframe",iframeUrl:"https://passport.alipay.com/littleLogin/littleLogin.htm",appName:"4",appEntrance:"default",lang:"zh_CN",cssLink:"",styleType:"vertical",beforeSubmitBtnHtml:"",afterSubmitBtnHtml:"",bizParams:"",queryStr:"",resizeIframeWidthFix:!1,resizeIframeHeightFix:!1,loginId:null,iframeWidth:250,iframeHeight:250,notLoadSsoView:!1,notKeepLogin:!1,isMobile:!1},this.temp={target:null,iframe:null},this._listeners={},this._hashCodeCounter=0,this._messageType=null,this._bakWindowName=window.name,this._windowNameHash=null,this._windowNameTimer=null,this},window.MiniLoginEmbedder.prototype={merge:function(){for(var a,b={},c=Array.prototype.slice.call(arguments),d=0;a=c[d++];)for(var e in a)b[e]=a[e];return b},json2str:function(a){switch(a.constructor){case Object:var b="{";for(var c in a)a[c]&&(b+='"'+c+'":'+arguments.callee(a[c])+",");return","==b.substr(b.length-1)&&(b=b.substr(0,b.length-1)),b+"}";case Array:var b="[";for(var c in a)b+=arguments.callee(a[c])+",";return","==b.substr(b.length-1)&&(b=b.substr(0,b.length-1)),b+"]";default:return'"'+a.toString()+'"'}},toQueryPair:function(a,b){return"undefined"==typeof b?a:a+"="+encodeURIComponent(null===b?"":String(b))},toQueryString:function(a){var b=this,c=[];for(var d in a){d=encodeURIComponent(d);var e=a[d];if(e&&e.constructor==Array){for(var f,g=[],h=0,i=e.length;i>h;h++)f=e[h],g.push(b.toQueryPair(d,f));c=c.concat(g)}else c.push(b.toQueryPair(d,e))}return c.join("&")},get:function(a){return"string"==typeof a?document.getElementById(a):a},hasClass:function(a,b){return a.className.match(new RegExp("(\\s|^)"+b+"(\\s|$)"))},addClass:function(a,b){return""===a.className?void(a.className=b):void(this.hasClass(a,b)||(a.className+=" "+b))},removeClass:function(a,b){if(this.hasClass(a,b)){var c=new RegExp("(\\s|^)"+b+"(\\s|$)");a.className=a.className.replace(c," ")}},on:function(a,b,c){var d=this.get(a);d.attachEvent?(d["e"+b+c]=c,d[b+c]=function(){d["e"+b+c](window.event)},d.attachEvent("on"+b,d[b+c])):d.addEventListener(b,c,!1)},addEvent:function(a,b){if("function"==typeof b){var c=this._listeners[a];c||(c=this._listeners[a]={}),c[this._toHashCode(b)]=b}},fireEvent:function(a,b){if(this._listeners[a])for(var c in this._listeners[a])this._listeners[a][c].call(this,b)},_toHashCode:function(a){return a._hashCode?a._hashCode:a._hashCode="_"+(this._hashCodeCounter++).toString(32)},_tempOnInit:function(){this.temp.target=this.get(this.config.targetId)},_parseWindowNameData:function(a){var b=a.split("[@]").pop().split("[login-iframe-message]");return{origin:b[0],data:b[1]}},init:function(a){this.config=this.merge(this.config,a||{});var b=this,c=(this.config,this.temp);b._tempOnInit(),b._renderIframe(),window.postMessage?(b._messageType="postMessage",b.on(window,"message",function(a){b.messageHanlder.call(b,a)})):(b._messageType="windowName",window.name="",b._windowNameHash="",b._windowNameTimer=setInterval(function(){""!==window.name&&-1!==window.name.indexOf("[login-iframe-message]")&&window.name!=b._windowNameHash&&(b._windowNameHash=window.name,b.messageHanlder(b._parseWindowNameData(window.name)))},50)),b.on(window,"beforeunload",function(a){c.iframe.style.visibility="hidden"}),this.fireEvent("onInit",{_self:this}),this.free()},messageHanlder:function(a){var b,c=this,d=this.config,e=this.temp;try{b=json_parse(decodeURIComponent(a.data))}catch(f){b=""}switch(b.showIframe&&("visible"!==e.iframe.style.visibility&&(e.iframe.style.visibility="visible"),this.fireEvent("onIframeShow",{_self:e.iframe}),c.addClass(e.target,"iframe-show")),b.hideIframe&&("hidden"!==e.iframe.style.visibility&&(e.iframe.style.visibility="hidden"),this.fireEvent("onIframeHide",{_self:e.iframe}),c.removeClass(e.target,"iframe-show")),b.action){case"resizeIframe":if(0==e.iframe.offsetHeight)return;d.resizeIframeWidthFix||(e.iframe.width=b.width),d.resizeIframeHeightFix||(e.iframe.height=b.height),c._bakOriginalIframeWidth||(d.resizeIframeWidthFix||(c._originalIframeWidth=b.width),d.resizeIframeHeightFix||(c._originalIframeHeight=b.height),c._bakOriginalIframeWidth=!0);break;case"otherAction":}this.fireEvent("onMessage",b)},restoreOriginalWidth:function(){this.iframe.width=this._originalIframeWidth},restoreOriginalHeight:function(){this.iframe.height=this._originalIframeHeight},_renderIframe:function(){var a,b=this,c=this.config,d=this.temp,e=d.target,f=this.temp.iframe=document.createElement("iframe");a={lang:c.lang,appName:c.appName,appEntrance:c.appEntrance,styleType:c.styleType,bizParams:c.bizParams,notLoadSsoView:c.notLoadSsoView,notKeepLogin:c.notKeepLogin,isMobile:c.isMobile},c.loginId&&(a.loginId=c.loginId),f.id="alibaba-login-box",f.src=c.iframeUrl+"?"+b.toQueryString(a)+b.config.queryStr+"&rnd="+Math.random(),f.width=c.iframeWidth,f.height=c.iframeHeight,f.frameBorder="none",f.scrolling="no",f.style.border="none",b.on(f,"load",function(){b.addClass(e,"iframe-loaded")}),e.appendChild(f),this.fireEvent("afterRenderIframe",{iframe:f})},free:function(){/msie/i.test(navigator.userAgent)&&CollectGarbage()},sleep:function(){"windowName"===_self._messageType&&(clearInterval(_self._windowNameTimer),window.name=this._bakWindowName),this.free()},destory:function(){"windowName"===_self._messageType&&(clearInterval(_self._windowNameTimer),window.name=this._bakWindowName),this.free()}})}();