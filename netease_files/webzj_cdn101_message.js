!function(e){var t=function(e,t){try{var i=document.createElement("img"),n,o;i.style.position="absolute";i.style.width="0px";i.style.height="0px";document.body.appendChild(i);if("nss"===t)i.src="https://pr.nss.netease.com/sentry/passive?clusterName=urs-webzj-static-passive&modelName=webzj_response_time2&one=1&uapi=msgerror&dataTime="+(new Date).getTime();else{n=JSON.stringify(e.stack);n=n.slice(0,300);o=location.href.slice(0,200);i.src="https://dl.reg.163.com/UA1435545636633/__utm.gif?log=msgerror&e="+n+"&bw="+navigator.userAgent+"&from="+o}setTimeout(function(){document.body.appendChild(i)},1e4)}catch(r){}};try{if("function"==typeof define&&window.define.amd)window.define([],e);else e()}catch(i){t(i,"nss");t(i)}}(function(){var e="2023-05-30";var t="";var i="IS_NOTNEW_MSG";var n="127.0.0.1";window.URSCFG={};window.URSCFG.sendLogNumber=1;window.URSCFG.sendLogDtNumber=1;window.URSOPENBGP="{URSOPENBGPVALUE}";var o={},r={},s={},a={},c=[],l=0,f,u=100*Math.random()<window.URSCFG.sendLogNumber,d=100*Math.random()<window.URSCFG.sendLogDtNumber;var h=function(){try{if(window.localStorage){f=window.localStorage.getItem("urswebzjdeviceid");if(!f){f=[(new Date).getTime(),Math.floor(1e6*Math.random())].join("-");window.localStorage.setItem("urswebzjdeviceid",f)}}}catch(e){}};h();var p=function(e){try{var t=location.href.slice(0,200),i,n,o;i="https://pr.nss.netease.com/sentry/passive?clusterName=urs-webzj-static-passive&modelName=webzj_response_time2&one=1&uapi=msgerror&dataTime="+(new Date).getTime();g(i);o=JSON.stringify(e.stack);o=o.slice(0,300);n="https://dl.reg.163.com/UA1435545636633/__utm.gif?log=msgerror&e="+o+"&bw="+navigator.userAgent+"&from="+t;g(n)}catch(r){}};if(!Function.prototype.bind)Function.prototype.bind=function(e){if("function"!=typeof this)throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");var t=Array.prototype.slice.call(arguments,1),i=this,n=function(){},o=function(){return i.apply(this instanceof n&&e?this:e,t.concat(Array.prototype.slice.call(arguments)))};if(this.prototype)n.prototype=this.prototype;o.prototype=new n;return o};var g=function(e){var t=document.createElement("img");t.style.position="absolute";t.style.width="0px";t.style.height="0px";document.body.appendChild(t);t.src=e;setTimeout(function(){document.body.appendChild(t)},1e4)};var m=function(e){var t=e.time||0;if(u)w.call(this,"renderOk",t)};var b=[1e3,1200,3e3,5e3,1e4,15e3,2e4,25e3,3e4];var v=function(e){var t=(new Date).getTime();if(e)t=parseInt(e,10);var i=t-this.webzjStartTime||0;var n=1;for(var o=b.length-1;o>=0;o--)if(i>b[o]){n=o+2;break}return n};var w=function(e,i){if("is_IPV6_Message"!==t)try{var n=v.call(this,i);var o=this._url_cache.split("//")[1].split("/")[0];var r="https://pr.nss.netease.com/sentry/passive?clusterName=urs-webzj-static-passive&modelName=webzj_response_time2&one=1&pd="+this._urs_options.product+"&pkid="+this._urs_options.promark+"&uapi="+e+"&dataTime="+(new Date).getTime()+"&domain="+o;for(var s=1;s<=10;s++)if(n===s)r=r+"&step"+s+"=1";else r=r+"&step"+s+"=0";g(r)}catch(a){}};var _=function(e){return e.replace(/\/\/([^\/]+:?)\//,function(e,t){var i=t;i=i.replace(/([^\.]+:?)\./,function(e,t){return t+"-v6."});return"//"+i+"/"})};var y=function(e){e=parseInt(e,10);return e>=3};var S=function(){var e=navigator.userAgent.toLowerCase();var t=/msie/.test(e)&&!/opera/.test(e);var i=(e.match(/.+(?:rv|it|ra|ie)[\/: ]([\d.]+)/)||[0,"0"])[1];var n={6:"2.0",7:"3.0",8:"4.0",9:"5.0",10:"6.0",11:"7.0"};var o=n[document.documentMode]||n[parseInt(i)];if(t&&parseInt(o,10)<4&&!window.postMessage)return 1;else return 0};var I=function(e,t,i){if(window.addEventListener)e.addEventListener(t,i,!1);else e.attachEvent("on"+t,i)};var C=function(e,t,i){if(window.removeEventListener)e.removeEventListener(t,i);else e.detachEvent("on"+t,i)};var k=function(e){e=e||"";if((e.indexOf("passport.")>=0||e.indexOf("dl.reg.163.com")>=0||e.indexOf("reg.icourse163.org")>=0)&&e.indexOf("/webzj")>=0)e=e.replace(/\:\/\/[^\/]+\/webzj\//,function(e){return e+"b/"});else e=e.replace(/\:\/\/([^\/]+)/,function(e){return e+"/b"});return e};var M=[];var U=function(e){var t="";var i=s[e];if(i.__coverBackground&&B("animation"))t=i.__coverBackground.indexOf("background:")!=-1?i.__coverBackground:"";return"position:fixed;_position:absolute;top:0;left:0;width:100%;height:100%;overflow:hidden;background:rgb(0,0,0); filter:progid:DXImageTransform.Microsoft.Alpha(opacity=60);-moz-opacity:0.6;-khtml-opacity:0.6;opacity:0.6;z-index:1000;"+t};var R=function(e,t){return"position:fixed;_position:absolute;z-index:10000;left:50%;top:50%;width:"+e+"px;margin-left:-"+e/2+"px;height:"+t+"px;margin-top:-"+t/2+"px;"};var D=function(e){var t=s[e];var i=null;if(t.__iframeShowAnimation)i="-webkit-animation:"+t.__iframeShowAnimation+";-moz-animation:"+t.__iframeShowAnimation+";-ms-animation:"+t.__iframeShowAnimation+";-o-animation:"+t.__iframeShowAnimation+";animation:"+t.__iframeShowAnimation+";";return"width:100%;height:100%;border:none;background:none;"+(i?i:"")};var L=function(){var e=setInterval(function(){for(var t=0;t<c.length;t++)if(c[t].readyDone){e=clearInterval(e);c.shift();T(1);break}},200)};var T=function(e){if(e||!l){l=1;var t=setInterval(function(){for(var e=0;e<c.length;e++)if(!c[e].readyDone){t=clearInterval(t);N.call(c[e]);L();break}},200)}};var O=function(e,t,i){var n=i.id;var o="x-URS-iframe"+n;var r=s[n];var a=document.getElementById(o),l=r._name||"";if(!a){try{a=document.createElement('<iframe  name="'+l+'" allowTransparency=true ></iframe>')}catch(f){a=document.createElement("iframe");a.allowTransparency=!0;a.name=l}a.frameBorder=0;a.id=o;a.scrolling="no";a.style.cssText=D(n)}if(t)e.appendChild(a);else{var u=420,d=408;if(r.frameSize){u=r.frameSize.width;d=r.frameSize.height}var h=document.getElementById("x-discover"+n);if(!h){h=document.createElement("div");h.id="x-discover"+n;h.style.cssText=U(n)}var p=document.getElementById("x-panel"+n);if(!p){p=document.createElement("div");p.id="x-panel"+n;r._panel=p;p.style.cssText=R(u,d)}p.appendChild(a);e.appendChild(h);e.appendChild(p);e.style.display="none"}if(!window.postMessage){c.push(this);T(0)}};var x=function(){var e=window.URSOPENBGP,t=this._url_cache.split("//")[1].split("/")[0],i=!1;if(e instanceof Array&&e.length>0){for(var n=0;n<e.length;n++)if(t===e[n])i=!0}else i=!0;return i};var E=function(e){var i=window.URSCFG[this.MGID];this._url_cache=this._url_cache.replace("webzj.reg.163.com","webzj2.reg.163.com");if(i._$passportNeedUrsBgp){if("force"===e){var n=x.call(this);if(!n)return}if("is_IPV6_Message"===t&&this._url_cache.indexOf("-v6")!==-1)this._url_cache=this._url_cache.replace("passport-v6.","passport2.").replace("reg-v6.icourse163.org","reg2.icourse163.org").replace("dl-v6.reg.163.com","dl2.reg.163.com").replace("/v6/","/v1.0.1/");else this._url_cache=this._url_cache.replace("passport.","passport2.").replace("reg.icourse163.org","reg2.icourse163.org").replace("dl.reg.163.com","dl2.reg.163.com")}if(this._urs_options.wdaId)this._url_cache=this._url_cache.replace(/wdaId=([^&]+)/,"wdaId=UA1482833332087")};var j=function(e){var i="x-URS-iframe"+this.MGID;var n=document.getElementById(i);if(this._urs_options&&this._urs_options.afterSetIframeSrc)this._urs_options.afterSetIframeSrc(n);if("{URSOPENBGPVALUE}"!=window.URSOPENBGP)E.call(this,"force");window.setTimeout(function(){this.__loadTime=(new Date).getTime();if(n){if("is_IPV6_Message"===t)if(e!=-1&&1!=e&&"{URSOPENBGPVALUE}"===window.URSOPENBGP)this._url_cache=_(this._url_cache);n.src=this._url_cache}}.bind(this),0);if(e!==-1){this.sto=clearTimeout(this.sto);var o=window.URSCFG[this.MGID];if(o._$needUrsBgp&&"{URSOPENBGPVALUE}"===window.URSOPENBGP)if(1!=e){this.sto=setTimeout(function(){this.sto=clearTimeout(this.sto);w.call(this,"bgp");this.webzjStartTime=(new Date).getTime();E.call(this);j.call(this,1)}.bind(this),this._urs_options.bgpTime);return}this.sto=setTimeout(function(){try{if(this._urs_options.loadTimeout)this._urs_options.loadTimeout()}catch(e){}w.call(this,"help");this.sto=clearTimeout(this.sto);var t=location.href||"";t=t.substring(0,200);var i=(new Date).getTime()+Math.random();var n;try{n=this._url_cache.split("//")[1].split("/")[0]}catch(e){}var o=z({pkid:this._urs_options.promark,pd:this._urs_options.product,time:i,from:t,domain:n},"&",!0);this._url_cache="//hc.reg.163.com/webcomponent/guide.html?"+o;j.call(this,-1)}.bind(this),2e4)}};var B=function(e){var t=["webkit","Moz","ms","o"],i,n=[],o=document.documentElement.style,r=function(e){return e.replace(/-(\w)/g,function(e,t){return t.toUpperCase()})};for(i in t)n.push(r(t[i]+"-"+e));n.push(r(e));for(i in n)if(n[i]in o)return!0;return!1};var G=function(e,i){var n=document.getElementById("x-URS-iframe"+e);var o=window.name||"_parent";var r={};r.data=i;r.data.from="URS|";r.data.topURL=location.href||"";r.origin="*";r.source=o;if("is_IPV6_Message"===t)r.data.mv="new_cdn_101_v6";else r.data.mv="new_cdn_101";r.data.loadTime=(new Date).getTime()-this.__loadTime;if(n)F(n.contentWindow,r)};var N=function(){G.call(this,this.MGID,this._urs_options)};var P=function(){var e=/^([\w]+?:\/\/.*?(?=\/|$))/i;return function(t){t=t||"";if(e.test(t))return RegExp.$1;else return"*"}}();var A=function(e,t){try{t=t.toLowerCase();if(null===e)return"null"==t;if(void 0===e)return"undefined"==t;else return Object.prototype.toString.call(e).toLowerCase()=="[object "+t+"]"}catch(i){return!1}};var z=function(e,t,i){if(!e)return"";var n=[];for(var o in e)if(e.hasOwnProperty(o)){var r=e[o];if(r)if(!A(r,"function")){if(A(r,"date"))r=r.getTime();else if(A(r,"array"))r=r.join(",");else if(A(r,"object"))r=JSON.stringify(r);if(i)r=encodeURIComponent(r);n.push(encodeURIComponent(o)+"="+r)}else;else;}else;return n.join(t||",")};var F=function(){var e="MSG|";var t=function(t){var i={};t=t||{};i.origin=t.origin||"";i.ref=location.href;i.self=t.source;i.data=JSON.stringify(t.data);return e+z(i,"|",!0)};return function(e,i){if(window.postMessage){i=i||{};e.postMessage(JSON.stringify(i.data),P(i.origin));
}else M.unshift({w:e,d:escape(t(i))})}}();var V=function(){var e=navigator.appName;if("Netscape"==e){var t=window.open("about:blank","_self");t.opener=null;t.close()}else if("Microsoft Internet Explorer"==e){window.opener=null;window.open("","_self");window.close()}};var J=function(){var e=document.createElement("div");e.id="x-URS"+this.MGID;document.body.appendChild(e);this.box=e};var $=function(e,i){var n;var o=0!=e.isHttps?"https://":"http://";if(e.cssDomain&&e.cssFiles)if(e.cssDomain.indexOf("http://")!=-1)o="http://";if(y(e.version)){n="index2.html";if(e.single){n="index_dl2.html";if("register"==e.page)n="index_reg2.html"}}else{n="index.html";if(e.single){n="index_dl.html";if("register"==e.page)n="index_reg.html"}}if("1"==e.newCDN)n=n.replace(".html","_new.html");var r;if("is_IPV6_Message"===t)r=e.crossDomainUrl||"webzj.reg.163.com/v6/pub/";else r=e.crossDomainUrl||"webzj.reg.163.com/v1.0.1/pub/";this._url_cache=o+r+n;if(e.isDevDemo)this._url_cache=o+"dl.reg.163.com/webapp/html/"+n;var s=parseInt(1e3*Math.random());e.pathB=0;var a=window.URSCFG[e.promark];if(a)if(s<=a)e.pathB=1;if(e.pathB)this._url_cache=k(this._url_cache);if(i.__cssStr)this._url_cache+="?"+i.__cssStr+"&MGID="+this.MGID+"&wdaId="+(e.wdaId||"");else this._url_cache+="?MGID="+this.MGID+"&wdaId="+(e.wdaId||"");this._urs_options=e||{};if(f)this._urs_options.ursDeviceId=f;this._urs_options.bgpTime=e.bgpTime||1e4;this._url_cache+="&pkid="+(this._urs_options.promark||"")+"&product="+(this._urs_options.product||"");if(e.cdnhostname)this._url_cache+="&cdnhostname="+e.cdnhostname;if("1"==this._urs_options.needfmp)this._url_cache+="&needfmp=1";return this._url_cache};window.URS=function(){var e=function(){var t=(new Date).getTime()+Math.random();if(!a[t]){a[t]=t;return t}else return e()};var n=function(e){var i=e.cookieDomain||"";var n=e.regCookieDomain||"";var o=e.crossDomainUrl||"";var r,s;if(!o){if(i){e.regCookieDomain=i;r=i}else if(n){e.cookieDomain=n;r=n}if("is_IPV6_Message"===t)s="v6";else s="v1.0.1";if(r&&"163.com"!==r)if(r.indexOf("icourse163")>-1)e.crossDomainUrl="reg."+r+"/webzj/"+s+"/pub/";else e.crossDomainUrl="passport."+r+"/webzj/"+s+"/pub/";else e.crossDomainUrl="dl.reg.163.com/webzj/"+s+"/pub/"}return e};var c=function(o){this.MGID=e();window.URSCFG[this.MGID]={};var r=window.URSCFG[this.MGID];o.from3Cdn=1;o.needSendLog=u;o.needSendLogDt=d;if("IS_NEW_MSG"===i){o.newCDN=1;if(!o.cdnhostname)o.cdnhostname="is_IPV6_Message"===t?"webzj-v6.netstatic.net":"webzj.netstatic.net"}if(o.from3Cdn&&y(o.version))o=n.call(this,o);if(S())o.needUrsBgp=0;if("0"==o.needUrsBgp){o.passportNeedUrsBgp=0;r._$needUrsBgp=0;r._$passportNeedUrsBgp=0}else{if(o.crossDomainUrl||o.cookieDomain){r._$passportNeedUrsBgp=1;o.passportNeedUrsBgp=1}r._$needUrsBgp=1;o.needUrsBgp=1}s[this.MGID]={};this._$COM_NUM=1==this._$COM_NUM?1:2;var a=s[this.MGID];a.promark=o.promark;a.frameSize=o.frameSize;a.__coverBackground=o.coverBackground;a.__iframeShowAnimation=o.iframeShowAnimation;if(o.cssDomain&&o.cssFiles)a.__cssStr="cd="+encodeURIComponent(o.cssDomain)+"&cf="+encodeURIComponent(o.cssFiles);this.isInclude=0;if(o.includeBox)if("string"==typeof o.includeBox)this.isInclude=document.getElementById(o.includeBox)||0;else this.isInclude=o.includeBox;a.needPrepare=o.needPrepare||0;if("string"==typeof o.eventType)this._type=o.eventType;if("string"==typeof o.bid)this._btn=document.getElementById(o.bid);else this._btn=o.bid;if(o.doPwdFocus)this.doPwdFocus=o.doPwdFocus;if(o.doPwdHide)this.doPwdHide=o.doPwdHide;if(o.logincb)this.logincb=o.logincb;if(o.mailLoginErrorCb)this.mailLoginErrorCb=o.mailLoginErrorCb;if(o.uniteLogin&&o.uniteLogin.loginBtnClkCb)this.uniteLoginBtnClkCb=o.uniteLogin.loginBtnClkCb;if(o.uniteLogin&&o.uniteLogin.smsBtnClkCb)this.uniteLoginSmsClkCb=o.uniteLogin.smsBtnClkCb;if(o.uniteLogin&&o.uniteLogin.mobIptCb)this.uniteLoginMobIptCb=o.uniteLogin.mobIptCb;if(o.uniteLogin&&o.uniteLogin.countrySelCb)this.uniteLoginCtryCb=o.uniteLogin.countrySelCb;if(o.closecb)this.closecb=o.closecb;if(o.regcb)this.regcb=o.regcb;if(o.loginCheckLock)this.loginCheckLock=o.loginCheckLock;if(o.regCheckLock)this.regCheckLock=o.regCheckLock;if(o.initReady)this.initReady=o.initReady;if(o.statecb)this.statecb=o.statecb;if(o.resize)this.resize=o.resize;if(o.changepage)this.changepage=o.changepage;if(o.moduleResize)this.moduleResize=o.moduleResize;if(o.loginstate)this.loginstate=o.loginstate;if(o.otherRegSuccess)this.otherRegSuccess=o.otherRegSuccess;if(o.lockMbLoginState)this.lockMbLoginState=o.lockMbLoginState;if(o.lockMbRegState)this.lockMbRegState=o.lockMbRegState;if(o.mbInitSuccess)this.mbInitSuccess=o.mbInitSuccess;if(o.mbChangeModule)this.mbChangeModule=o.mbChangeModule;if(o.loginInitSuccess)this.loginInitSuccess=o.loginInitSuccess;if(o.regInitSuccess)this.regInitSuccess=o.regInitSuccess;if(o.renderOk)this.renderOk=o.renderOk;if(o.webInitOk)this.webInitOk=o.webInitOk;if(o.WeiXinInputBlur)this.WeiXinInputBlur=o.WeiXinInputBlur;if(o.loginEmailValue)this.loginEmailValue=o.loginEmailValue;if(o.loginMbValue)this.loginMbValue=o.loginMbValue;if(o.InputBlur)this.InputBlur=o.InputBlur;if(o.sendSmsOk)this.sendSmsOk=o.sendSmsOk;if(!this.isInclude)J.call(this);this._url_cache=$.call(this,o,a);try{JSON.stringify(this._urs_options)}catch(c){return null}if(!this.isInclude){if(this._btn&&this._type)I(this._btn,this._type,this.showIframe.bind(this))}else this.includeBox=this.isInclude};var l=function(e){if(e)e.stopPropagation?e.stopPropagation():e.cancelBubble=!0};var f=function(e){l(e);var t=e.data||"{}";if("string"==typeof t)try{t=JSON.parse(t)}catch(i){t={}}if(o[t.MGID])try{o[t.MGID]({data:t,origin:P(e.origin)})}catch(i){p(i)}};var h=function(e){var t=e.data,i,n,o;if(t){if("string"==typeof t)try{t=JSON.parse(t)}catch(a){t={}}if(t.MGID){i=r[t.MGID];n=s[t.MGID];if(i.isInclude)o=i.includeBox;else o=n._panel;if(t["URS-READY-DONE"]){i.readyDone=1;i.sto=clearTimeout(i.sto);if(i.initReady)i.initReady()}if(t["URS-READY"]){i.sto=clearTimeout(i.sto);i.ursReady=1}if(!window.postMessage||!t["URS-READY"]||!i.isInclude&&n.needPrepare){if(t["URS-READY"]&&!n._initReady)n._initReady=!0;if(!t["URS-CM-STATE"])if(!t||!t.fromOutLogin||t.toOpener){if("webInitOk"==t.type){if(i.webInitOk)i.webInitOk(t)}else if("sendSmsOk"===t.type){if(i.sendSmsOk)i.sendSmsOk(t)}else if("InputBlur"===t.type){if(i.InputBlur)i.InputBlur()}else if("loginEmailValue"===t.type){if(i.loginEmailValue)i.loginEmailValue(t)}else if("loginMbValue"===t.type){if(i.loginMbValue)i.loginMbValue(t)}else if("WeiXinInputBlur"===t.type){if(i.WeiXinInputBlur)i.WeiXinInputBlur()}else if("renderOk"==t.type){if(i.renderOk)i.renderOk(t);m.call(this,t)}else if("moduleResize"==t.type){if(i.moduleResize)i.moduleResize(t)}else if("regInitSuccess"==t.type){if(i.regInitSuccess)i.regInitSuccess()}else if("loginInitSuccess"==t.type){if(i.loginInitSuccess)i.loginInitSuccess()}else if("mbChangeModule"==t.type){if(i.mbChangeModule)i.mbChangeModule()}else if("mbInitSuccess"==t.type){if(i.mbInitSuccess)i.mbInitSuccess()}else if("lockMbLoginState"==t.type){if(i.lockMbLoginState)i.lockMbLoginState(t)}else if("lockMbRegState"==t.type){if(i.lockMbRegState)i.lockMbRegState(t)}else if("otherRegSuccess"==t.type){if(i.otherRegSuccess)i.otherRegSuccess(t)}else if("success"==t.type){if(i.logincb)i.logincb(t["username"],t["isOther"],t);if(!this.isInclude){if(i._btn&&i._type)C(i._btn,i._type,i.showIframe.bind(i));i.closeIframe()}}else if("mailLoginError"==t.type){if(i.mailLoginErrorCb)i.mailLoginErrorCb(t)}else if("uniteLoginBtnClkCb"==t.type){if(i.uniteLoginBtnClkCb)i.uniteLoginBtnClkCb(t)}else if("uniteLoginSmsClkCb"==t.type){if(i.uniteLoginSmsClkCb)i.uniteLoginSmsClkCb(t)}else if("uniteLoginMobIptCb"==t.type){if(i.uniteLoginMobIptCb)i.uniteLoginMobIptCb(t)}else if("uniteLoginCtryCb"==t.type){if(i.uniteLoginCtryCb)i.uniteLoginCtryCb(t)}else if("close"==t.type){if(i.closecb)i.closecb();i.closeIframe()}else if("resize"==t.type||"init"==t.type){o.style.width=t.width+"px";o.style.height=t.height+"px";if(!i.isInclude)o.style.marginLeft=-1*t.width/2+"px";if(i.resize)i.resize(t)}else if("register-success"==t.type){if(i.regcb)i.regcb(t["username"],t["url"],t)}else if("lockLoginState"==t.type){if(i.loginCheckLock)i.loginCheckLock(t.value)}else if("lockRegState"==t.type){if(i.regCheckLock)i.regCheckLock(t.value)}else if("changepage"==t.type){if(i.changepage)i.changepage(t.page)}else if("loginstate"==t.type){if(i.loginstate)i.loginstate(t)}else if("doPwdFocus"==t.type){try{setTimeout(function(){var e=document.getElementById("x-URS-iframe"+i.MGID);if(e){var n=e.offsetTop;var o=e.offsetLeft}window.scrollTo(t.offset.x+o,t.offset.y+n)},200)}catch(a){}if(i.doPwdFocus)i.doPwdFocus(t)}else if("doPwdHide"==t.type)if(i.doPwdHide)i.doPwdHide(t)}else{try{window.opener.$outLogin(t)}catch(a){}setTimeout(function(){V()},200)}else if(i.statecb)i.statecb(t["URS-CM-STATENAME"],t["URS-CM-STATE"])}else N.call(i)}}};var g=function(){var e="MSG|";var t=function(e,t){var i=A(t,"function")?t:function(e){return e===t},n=null;for(var o=0,r=e.length-1,s;o<r;o++){s=e[o];if(i(s))n=o}return null!=n?n:-1};var i=function(){var e;var i=function(i,n,o){if(t(e,i.w)<0){e.push(i.w);o.splice(n,1);i.w.name=i.d}};return function(){e=[];if(M&&M.length)for(var t=M.length,n;t--;t>=0){n=M[t];i(n,t,M)}e=null}}();var n=function(){var t=unescape(window.name||"");if(t&&0==t.indexOf(e)){window.name="";var i=t.replace(e,""),n=i.split("|"),o=n.length,r={};for(var s=0;s<o;s++){var a=n[s].split("=");if(!a||!a.length)return;var c=a.shift();if(!c)return;r[decodeURIComponent(c)]=decodeURIComponent(a.join("="))}i=r;var l=(i.origin||"").toLowerCase();if(!l||"*"==l||0==location.href.toLowerCase().indexOf(l))try{h({data:i.data||"null",origin:P(i.ref||document.referrer)})}catch(f){p(f)}}};return function(){setInterval(i,100);setInterval(n,20)}}();var b=function(){if(!window.__hasRun){if(window.postMessage)I(window,"message",f);else g();window.__hasRun=1}};return function(e){this.webzjStartTime=(new Date).getTime();c.call(this,e);var t=s[this.MGID];if(t.needPrepare||this.isInclude)this.prepareIframe();
o[this.MGID]=h.bind(this);r[this.MGID]=this;return b()}}();window.URS.prototype.safekeyboardMsg=function(e){G.call(this,this.MGID,e)};window.URS.prototype.prepareIframe=function(){if(this.isInclude){O.call(this,this.includeBox,1,{id:this.MGID});j.call(this);this.showIframe()}else{O.call(this,this.box,0,{id:this.MGID});j.call(this)}};window.URS.prototype.showIframe=function(e){var t=s[this.MGID];if(!this.isInclude)if(!t.needPrepare){O.call(this,this.box,0,{id:this.MGID});j.call(this)}else if(!t._initReady)return;e=e||{};if(e.page){if(100*Math.random()<=1)try{var i="//dl.reg.163.com/UA1435545636633/__utm.gif?log=usepage&pd="+this._urs_options.product||"";var n=document.createElement("img");n.style.position="absolute";n.style.width="0px";n.style.height="0px";document.body.appendChild(n);n.src=i;setTimeout(function(){document.body.appendChild(n)},1e4)}catch(o){}if(e.page!=this._urs_options.page&&this._urs_options.single){this._urs_options.page=e.page;this._url_cache=$.call(this,this._urs_options,t)}j.call(this)}if(t.needPrepare&&!this.isInclude)N.call(this);if(this.box)this.box.style.display="block";if(this._urs_options.afterShow)this._urs_options.afterShow.call(this)};window.URS.prototype.closeIframe=function(){var e=s[this.MGID];if(!this.isInclude){this.box.style.display="none";if(this.sto)this.sto=clearTimeout(this.sto);if(!e.needPrepare){if(navigator.userAgent.indexOf("MSIE")>0){var t=document.getElementById("x-URS-iframe"+this.MGID),i=t.contentWindow;if(t){t.src="about:blank";try{i.document.write("");i.document.clear()}catch(n){}}var o=document.getElementById("x-panel"+this.MGID);o.removeChild(t);window.CollectGarbage()}this.box.innerHTML=""}}else;};window.URS.prototype.doMbUnLoginProxy=function(){var e={proxyModule:"mbunlogin",doLoginProxy:1};G.call(this,this.MGID,e)};window.URS.prototype.loginUnlock=function(){var e={fromLoginLock:1,lock:0};G.call(this,this.MGID,e)};window.URS.prototype.loginDolock=function(){var e={fromLoginLock:1,lock:1};G.call(this,this.MGID,e)};window.URS.prototype.regUnlock=function(){var e={fromRegLock:1,lock:0};G.call(this,this.MGID,e)};window.URS.prototype.regDolock=function(){var e={fromRegLock:1,lock:1};G.call(this,this.MGID,e)};window.URS.prototype.doLoginProxy=function(e){var t={username:e.username,pwd:e.pwd,defaultUnLogin:e.defaultUnLogin,doLoginProxy:1};G.call(this,this.MGID,t)};window.URS.prototype.loginUnlockMb=function(){var e={fromLoginLockMb:1,lock:0};G.call(this,this.MGID,e)};window.URS.prototype.loginDolockMb=function(){var e={fromLoginLockMb:1,lock:1};G.call(this,this.MGID,e)};window.URS.prototype.regUnlockMb=function(){var e={fromRegLockMb:1,lock:0};G.call(this,this.MGID,e)};window.URS.prototype.regDolockMb=function(){var e={fromRegLockMb:1,lock:1};G.call(this,this.MGID,e)};window.URS.prototype.getIframeSize=function(){var e={getIframeSize:1};G.call(this,this.MGID,e)};window.URS.prototype.setMbloginClause=function(e){var t={fromMbSetClause:1,mbloginClause:e};G.call(this,this.MGID,t)};window.URS.prototype.setMailloginClause=function(e){var t={fromMailSetClause:1,mailloginClause:e};G.call(this,this.MGID,t)};window.URS.prototype.setUniteMbAndSendSms=function(e,t){var i={fromUniteMbAndSendSms:1,mobile:e,auto:t};G.call(this,this.MGID,i)};window.URS.setPkidAndPd=function(){var e={};var i=function(t){var i,n;if(t&&t.lgs){i=t.lgs;n=t.pkid;window.URSCFG[n]=parseInt(i);e[n]&&e[n](n)}};var n=function(e){var n=e.pkid||"";var o=e.pd||"";var r;if(void 0===e.mode)r="3";else r=e.mode;if("3"!=r&&"0"!=r){var s="URSJSONP"+(new Date).getTime();window[s]=i;var a="//dl.reg.163.com/dl/getConf?callback="+s+"&pkid="+n+"&pd="+o+"&mode="+r;var c=document.createElement("script");c.type="text/javascript";c.id="urs-script-"+s;if("is_IPV6_Message"===t)a=_(a);c.src=a;document.getElementsByTagName("head")[0].appendChild(c);setTimeout(function(){document.getElementsByTagName("head")[0].removeChild(c)},5e3)}};return function(t){t=t||{};var i=t.pkid||"";if("function"==typeof t.pathbCallback)e[i]=t.pathbCallback;n(t)}}();return window.URS});(function(){function e(t,n){function r(e){if(r[e]!==b)return r[e];var t;if("bug-string-char-index"==e)t="a"!="a"[0];else if("json"==e)t=r("json-stringify")&&r("json-parse");else{var i;if("json-stringify"==e){t=n.stringify;var o="function"==typeof t&&v;if(o){(i=function(){return 1}).toJSON=i;try{o="0"===t(0)&&"0"===t(new s)&&'""'==t(new a)&&t(p)===b&&t(b)===b&&t()===b&&"1"===t(i)&&"[1]"==t([i])&&"[null]"==t([b])&&"null"==t(null)&&"[null,null,null]"==t([b,p,null])&&'{"a":[1,true,false,null,"\\u0000\\b\\n\\f\\r\\t"]}'==t({a:[i,!0,!1,null,"\0\b\n\f\r\t"]})&&"1"===t(null,i)&&"[\n 1,\n 2\n]"==t([1,2],null,1)&&'"-271821-04-20T00:00:00.000Z"'==t(new l((-864e13)))&&'"+275760-09-13T00:00:00.000Z"'==t(new l(864e13))&&'"-000001-01-01T00:00:00.000Z"'==t(new l((-621987552e5)))&&'"1969-12-31T23:59:59.999Z"'==t(new l((-1)))}catch(c){o=!1}}t=o}if("json-parse"==e){t=n.parse;if("function"==typeof t)try{if(0===t("0")&&!t(!1)){i=t('{"a":[1,true,false,null,"\\u0000\\b\\n\\f\\r\\t"]}');var f=5==i.a.length&&1===i.a[0];if(f){try{f=!t('"\t"')}catch(u){}if(f)try{f=1!==t("01")}catch(d){}if(f)try{f=1!==t("1.")}catch(h){}}}}catch(g){f=!1}t=f}}return r[e]=!!t}t||(t=o.Object());n||(n=o.Object());var s=t.Number||o.Number,a=t.String||o.String,c=t.Object||o.Object,l=t.Date||o.Date,f=t.SyntaxError||o.SyntaxError,u=t.TypeError||o.TypeError,d=t.Math||o.Math,h=t.JSON||o.JSON;"object"==typeof h&&h&&(n.stringify=h.stringify,n.parse=h.parse);var c=c.prototype,p=c.toString,g,m,b,v=new l((-0xc782b5b800cec));try{v=-109252==v.getUTCFullYear()&&0===v.getUTCMonth()&&1===v.getUTCDate()&&10==v.getUTCHours()&&37==v.getUTCMinutes()&&6==v.getUTCSeconds()&&708==v.getUTCMilliseconds()}catch(w){}if(!r("json")){var _=r("bug-string-char-index");if(!v)var y=d.floor,S=[0,31,59,90,120,151,181,212,243,273,304,334],I=function(e,t){return S[t]+365*(e-1970)+y((e-1969+(t=+(1<t)))/4)-y((e-1901+t)/100)+y((e-1601+t)/400)};(g=c.hasOwnProperty)||(g=function(e){var t={},i;(t.__proto__=null,t.__proto__={toString:1},t).toString!=p?g=function(e){var t=this.__proto__;e=e in(this.__proto__=null,this);this.__proto__=t;return e}:(i=t.constructor,g=function(e){var t=(this.constructor||i).prototype;return e in this&&!(e in t&&this[e]===t[e])});t=null;return g.call(this,e)});m=function(e,t){var n=0,o,r,s;(o=function(){this.valueOf=0}).prototype.valueOf=0;r=new o;for(s in r)g.call(r,s)&&n++;o=r=null;n?m=2==n?function(e,t){var i={},n="[object Function]"==p.call(e),o;for(o in e)n&&"prototype"==o||g.call(i,o)||!(i[o]=1)||!g.call(e,o)||t(o)}:function(e,t){var i="[object Function]"==p.call(e),n,o;for(n in e)i&&"prototype"==n||!g.call(e,n)||(o="constructor"===n)||t(n);(o||g.call(e,n="constructor"))&&t(n)}:(r="valueOf toString toLocaleString propertyIsEnumerable isPrototypeOf hasOwnProperty constructor".split(" "),m=function(e,t){var n="[object Function]"==p.call(e),o,s=!n&&"function"!=typeof e.constructor&&i[typeof e.hasOwnProperty]&&e.hasOwnProperty||g;for(o in e)n&&"prototype"==o||!s.call(e,o)||t(o);for(n=r.length;o=r[--n];s.call(e,o)&&t(o));});return m(e,t)};if(!r("json-stringify")){var C={92:"\\\\",34:'\\"',8:"\\b",12:"\\f",10:"\\n",13:"\\r",9:"\\t"},k=function(e,t){return("000000"+(t||0)).slice(-e)},M=function(e){for(var t='"',i=0,n=e.length,o=!_||10<n,r=o&&(_?e.split(""):e);i<n;i++){var s=e.charCodeAt(i);switch(s){case 8:case 9:case 10:case 12:case 13:case 34:case 92:t+=C[s];break;default:if(32>s){t+="\\u00"+k(2,s.toString(16));break}t+=o?r[i]:e.charAt(i)}}return t+'"'},U=function(e,t,i,n,o,r,s){var a,c,l,f,d,h,v,w,_;try{a=t[e]}catch(S){}if("object"==typeof a&&a)if(c=p.call(a),"[object Date]"!=c||g.call(a,"toJSON"))"function"==typeof a.toJSON&&("[object Number]"!=c&&"[object String]"!=c&&"[object Array]"!=c||g.call(a,"toJSON"))&&(a=a.toJSON(e));else if(a>-1/0&&a<1/0){if(I){f=y(a/864e5);for(c=y(f/365.2425)+1970-1;I(c+1,0)<=f;c++);for(l=y((f-I(c,0))/30.42);I(c,l+1)<=f;l++);f=1+f-I(c,l);d=(a%864e5+864e5)%864e5;h=y(d/36e5)%24;v=y(d/6e4)%60;w=y(d/1e3)%60;d%=1e3}else c=a.getUTCFullYear(),l=a.getUTCMonth(),f=a.getUTCDate(),h=a.getUTCHours(),v=a.getUTCMinutes(),w=a.getUTCSeconds(),d=a.getUTCMilliseconds();a=(0>=c||1e4<=c?(0>c?"-":"+")+k(6,0>c?-c:c):k(4,c))+"-"+k(2,l+1)+"-"+k(2,f)+"T"+k(2,h)+":"+k(2,v)+":"+k(2,w)+"."+k(3,d)+"Z"}else a=null;i&&(a=i.call(t,e,a));if(null===a)return"null";c=p.call(a);if("[object Boolean]"==c)return""+a;if("[object Number]"==c)return a>-1/0&&a<1/0?""+a:"null";if("[object String]"==c)return M(""+a);if("object"==typeof a){for(e=s.length;e--;)if(s[e]===a)throw u();s.push(a);_=[];t=r;r+=o;if("[object Array]"==c){l=0;for(e=a.length;l<e;l++)c=U(l,a,i,n,o,r,s),_.push(c===b?"null":c);e=_.length?o?"[\n"+r+_.join(",\n"+r)+"\n"+t+"]":"["+_.join(",")+"]":"[]"}else m(n||a,function(e){var t=U(e,a,i,n,o,r,s);t!==b&&_.push(M(e)+":"+(o?" ":"")+t)}),e=_.length?o?"{\n"+r+_.join(",\n"+r)+"\n"+t+"}":"{"+_.join(",")+"}":"{}";s.pop();return e}};n.stringify=function(e,t,n){var o,r,s,a;if(i[typeof t]&&t)if("[object Function]"==(a=p.call(t)))r=t;else if("[object Array]"==a){s={};for(var c=0,l=t.length,f;c<l;f=t[c++],(a=p.call(f),"[object String]"==a||"[object Number]"==a)&&(s[f]=1));}if(n)if("[object Number]"==(a=p.call(n))){if(0<(n-=n%1))for(o="",10<n&&(n=10);o.length<n;o+=" ");}else"[object String]"==a&&(o=10>=n.length?n:n.slice(0,10));return U("",(f={},f[""]=e,f),r,s,o,"",[])}}if(!r("json-parse")){var R=a.fromCharCode,D={92:"\\",34:'"',47:"/",98:"\b",116:"\t",110:"\n",102:"\f",114:"\r"},L,T,O=function(){L=T=null;throw f()},x=function(){for(var e=T,t=e.length,i,n,o,r,s;L<t;)switch(s=e.charCodeAt(L),s){case 9:case 10:case 13:case 32:L++;break;case 123:case 125:case 91:case 93:case 58:case 44:return i=_?e.charAt(L):e[L],L++,i;case 34:i="@";for(L++;L<t;)if(s=e.charCodeAt(L),32>s)O();else if(92==s)switch(s=e.charCodeAt(++L),s){case 92:case 34:case 47:case 98:case 116:case 110:case 102:case 114:i+=D[s];L++;break;case 117:n=++L;for(o=L+4;L<o;L++)s=e.charCodeAt(L),48<=s&&57>=s||97<=s&&102>=s||65<=s&&70>=s||O();i+=R("0x"+e.slice(n,L));break;default:O()}else{if(34==s)break;
s=e.charCodeAt(L);for(n=L;32<=s&&92!=s&&34!=s;)s=e.charCodeAt(++L);i+=e.slice(n,L)}if(34==e.charCodeAt(L))return L++,i;O();default:n=L;45==s&&(r=!0,s=e.charCodeAt(++L));if(48<=s&&57>=s){for(48==s&&(s=e.charCodeAt(L+1),48<=s&&57>=s)&&O();L<t&&(s=e.charCodeAt(L),48<=s&&57>=s);L++);if(46==e.charCodeAt(L)){for(o=++L;o<t&&(s=e.charCodeAt(o),48<=s&&57>=s);o++);o==L&&O();L=o}s=e.charCodeAt(L);if(101==s||69==s){s=e.charCodeAt(++L);43!=s&&45!=s||L++;for(o=L;o<t&&(s=e.charCodeAt(o),48<=s&&57>=s);o++);o==L&&O();L=o}return+e.slice(n,L)}r&&O();if("true"==e.slice(L,L+4))return L+=4,!0;if("false"==e.slice(L,L+5))return L+=5,!1;if("null"==e.slice(L,L+4))return L+=4,null;O()}return"$"},E=function(e){var t,i;"$"==e&&O();if("string"==typeof e){if("@"==(_?e.charAt(0):e[0]))return e.slice(1);if("["==e){for(t=[];;i||(i=!0)){e=x();if("]"==e)break;i&&(","==e?(e=x(),"]"==e&&O()):O());","==e&&O();t.push(E(e))}return t}if("{"==e){for(t={};;i||(i=!0)){e=x();if("}"==e)break;i&&(","==e?(e=x(),"}"==e&&O()):O());","!=e&&"string"==typeof e&&"@"==(_?e.charAt(0):e[0])&&":"==x()||O();t[e.slice(1)]=E(x())}return t}O()}return e},j=function(e,t,i){i=B(e,t,i);i===b?delete e[t]:e[t]=i},B=function(e,t,i){var n=e[t],o;if("object"==typeof n&&n)if("[object Array]"==p.call(n))for(o=n.length;o--;)j(n,o,i);else m(n,function(e){j(n,e,i)});return i.call(e,t,n)};n.parse=function(e,t){var i,n;L=0;T=""+e;i=E(x());"$"!=x()&&O();L=T=null;return t&&"[object Function]"==p.call(t)?B((n={},n[""]=i,n),"",t):i}}}n.runInContext=e;return n}var t="function"==typeof define&&define.amd,i={"function":!0,object:!0},n=i[typeof exports]&&exports&&!exports.nodeType&&exports,o=i[typeof window]&&window||this,r=n&&i[typeof module]&&module&&!module.nodeType&&"object"==typeof global&&global;!r||r.global!==r&&r.window!==r&&r.self!==r||(o=r);if(n&&!t)e(o,n);else{var s=o.JSON,a=o.JSON3,c=!1,l=e(o,o.JSON3={noConflict:function(){c||(c=!0,o.JSON=s,o.JSON3=a,s=a=null);return l}});o.JSON={parse:l.parse,stringify:l.stringify}}t&&define("URS-JSON3",function(){return l})}).call(this);