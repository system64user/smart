!function(e){var n={};function o(t){if(n[t])return n[t].exports;var r=n[t]={i:t,l:!1,exports:{}};return e[t].call(r.exports,r,r.exports,o),r.l=!0,r.exports}o.m=e,o.c=n,o.d=function(e,n,t){o.o(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:t})},o.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},o.t=function(e,n){if(1&n&&(e=o(e)),8&n)return e;if(4&n&&"object"==typeof e&&e&&e.__esModule)return e;var t=Object.create(null);if(o.r(t),Object.defineProperty(t,"default",{enumerable:!0,value:e}),2&n&&"string"!=typeof e)for(var r in e)o.d(t,r,function(n){return e[n]}.bind(null,r));return t},o.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return o.d(n,"a",n),n},o.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},o.p="/",o(o.s=0)}([function(e,n){!function(e){if(!e)throw new Error("jQuery is not defined");e(function(){e(".open-close").on("click",".open-close__opener",function(n){e(this).closest(".open-close__row").find(".open-close__slide").slideToggle(),e(this).parent().toggleClass("is-active").closest(".open-close__row").find(".open-close__opener"),n.preventDefault()}),e(".is-active").find(".open-close__slide").slideDown(),function(){var n=e("#intro").height()+90;function o(){e(window).scrollTop()>n?e("#header").addClass("sticky"):e("#header").removeClass("sticky")}o(),e(window).scroll(function(){o()})}(),function(){var n=e(window),o=e("body");e(".smooth-btn").click(function(){var t=n.width();return t<980?(o.toggleClass("modal-show"),!1):(e("html, body").animate({scrollTop:e(e.attr(this,"href")).offset().top},500),!1)}),e(".modal-close").click(function(){return o.toggleClass("modal-show"),!1})}(),function(){var n=new ScrollMagic.Controller({globalSceneOptions:{triggerHook:"onEnter",duration:"80%"}}),o=new ScrollMagic.Controller({globalSceneOptions:{triggerHook:"onEnter",duration:"65%"}});function t(){e(window).width()<768?(n.enabled()||o.enabled())&&(n.enabled(!1),o.enabled(!1)):n.enabled()&&o.enabled()||(n.enabled(!0),o.enabled(!0)),n.update(!0),o.update(!0)}[{tween:(new TimelineMax).add([TweenMax.fromTo("#benefits .parallax",8,{opacity:.3,y:"350px"},{opacity:1,y:"0px",ease:Linear.easeNone}),TweenMax.fromTo("#benefits .parallax2",8,{opacity:.3},{opacity:1,ease:Linear.easeNone}),TweenMax.fromTo("#benefits .parallax3",8,{opacity:.3,y:"280px"},{opacity:1,y:"0px",ease:Linear.easeNone})]),selector:"#benefits"},{tween:TweenMax.fromTo("#parallax4",10,{opacity:.3,y:"420px"},{opacity:1,y:"0px",ease:Linear.easeNone}),selector:"#trigger-second-line"},{tween:TweenMax.fromTo("#parallax5",10,{opacity:.3,y:"80px"},{opacity:1,y:"0px",ease:Linear.easeNone}),selector:"#trigger-second-line2"},{tween:TweenMax.fromTo("#parallax6",10,{opacity:.3,y:"200px"},{opacity:1,y:"0px",ease:Linear.easeNone}),selector:"#trigger-second-line3"},{tween:TweenMax.fromTo("#parallax7",1,{opacity:.3,y:"420px"},{opacity:1,y:"0px",ease:Linear.easeNone}),selector:"#trigger-third-line"},{tween:TweenMax.fromTo("#parallax8",10,{opacity:.3,y:"80px"},{opacity:1,y:"0px",ease:Linear.easeNone}),selector:"#trigger-third-line2"}].forEach(function(e){new ScrollMagic.Scene({triggerElement:e.selector}).setTween(e.tween).addTo(n)}),[{tween:(new TimelineMax).add([TweenMax.fromTo("#step1 .steps__image",12,{y:"600px"},{y:"0px",ease:Linear.easeNone}),TweenMax.fromTo("#step1 .steps__num",7,{y:"180px"},{y:"0px",ease:Linear.easeNone})]),selector:"#steps"},{tween:(new TimelineMax).add([TweenMax.fromTo("#step2 .steps__image",12,{y:"600px"},{y:"0px",ease:Linear.easeNone}),TweenMax.fromTo("#step2 .steps__num",7,{y:"180px"},{y:"0px",ease:Linear.easeNone})]),selector:"#steps-trigger"},{tween:(new TimelineMax).add([TweenMax.fromTo("#step3 .steps__image",12,{y:"600px"},{y:"0px",ease:Linear.easeNone}),TweenMax.fromTo("#step3 .steps__num",7,{y:"180px"},{y:"0px",ease:Linear.easeNone})]),selector:"#steps-trigger2"}].forEach(function(e){new ScrollMagic.Scene({triggerElement:e.selector}).setTween(e.tween).addTo(o)}),e(window).on("resize",function(){t()}),t()}(),setTimeout(function(){e("#txtMailbox").focus()},10)})}(window.jQuery);const o=function(){const e="/appsuite/api/login";var n={promise:null,result:!1},o=!1;function t(n,o,t){var r=new XMLHttpRequest;r.open("POST",e,!0),r.setRequestHeader("Content-Type","application/x-www-form-urlencoded");var a=new Promise(function(e,n){r.onreadystatechange=function(){200!==r.status||4!==r.readyState?r.status>=300&&n(r.statusText):e(r.responseText)}});return r.send(function(e,n,o){return"action=login&staySignedIn="+o+"&name="+encodeURIComponent(e)+"&password="+encodeURIComponent(n)+"&client=open-xchange-appsuite&version=7.10.2-Rev20&timeout=10000&rampup=true&rampUpFor=open-xchange-appsuite"}(n,o,t)),a}return{login:function(e,r,a){return n.promise?n.result=!o:(n.promise=t(e,r,a),n.result=!1),n},resetPromise:function(){n.promise=null,o=!1},resetResult:function(){o=!0},uuid:function(){function e(e,n){void 0===n&&(n=Math.random());for(var o=new Array(e),t=0;t<e;t++){var r=15&(n*=16);o[t]=r+(r<10?48:87)}return String.fromCharCode.apply(String,o)}return[e(8),"-",e(4),"-4",e(3),"-",e(4,.5+Math.random()/4),"-",e(12)].join("")},tryAutoLogin:function(){$.getJSON("/appsuite/api/login?action=autologin&client=open-xchange-appsuite",function(e){e&&e.session&&(location.href="/appsuite/")})}}}();!function(e){e("#keepMeSignedIn").on("change",function(){e("#autoLogin").val(this.checked)});var n=document.location.hostname;"localhost"===n||"127.0.0.1"===n||o.tryAutoLogin();const t={css:{error:"is-error",confirm:"is-confirm"},messages:{credentialsRequired:"Please enter your credentials.",passwordRequired:"Please enter your password."}};function r(n,o){let r=e(n);return!(r&&!r.val())||(e(n+"_error_message").text(o),r.parent().addClass(t.css.error),!1)}function a(n){n?e("#form-login").addClass("is-loading"):e("#form-login").removeClass("is-loading")}function i(n){o.resetPromise(),e("#errorMsg")[0].innerText="",e("#errorMsg").hide(),e(n).parent().removeClass(t.css.error);let r=e(n).next();r&&r[0]&&"SPAN"==r[0].nodeName&&(r.innerText="")}e(function(){e("#form-login").attr("action","/ajax/login?action=formlogin&authId="+o.uuid()),e("#txtMailbox").keyup(function(){i(this)}),e("#txtPwd").keyup(function(){i(this)}),e("button.modal-close").click(function(){e("#errorMsg").hide(),e("#form-login .is-error").removeClass(t.css.error),e("#txtMailbox").val(""),e("#txtMailbox_error_message").text(""),e("#txtPwd").val(""),e("#txtPwd_error_message").text("")}),e("#btnLogin").click(function(){var n=(e("#txtMailbox").val()||"").toLowerCase();e("#txtMailbox").val(n);var i=e("#txtPwd").val(),s=e("#keepMeSignedIn").is(":checked");return function(n,i,s,l){if(!r("#txtMailbox",t.messages.credentialsRequired)||!r("#txtPwd",t.messages.passwordRequired))return!1;a(!0);var c=o.login(n,i,s);return c.promise.then(function(n){var t=JSON.parse(n);t&&(t.error||t.code)?(l(function(e){return"LGI-0006"===(e||"").toUpperCase()?"The user name or password is incorrect.":"An error occurred inside the server."}(t.code)),o.resetResult(),a(!1)):c.result||e("#btnLogin").click()}).catch(function(e){a(!1),l(e),o.resetPromise()}),c.result}(n,i,s,function(n){e("#errorMsg")[0].innerText=n,e("#errorMsg").show()})}),e("#show_pwd_toggle").click(function(){var n=s();e("#txtPwd").attr("type",n?"text":"password"),n?e(this).removeClass("icon-eye-hide").addClass("icon-eye-show"):e(this).removeClass("icon-eye-show").addClass("icon-eye-hide")})});var s=function(){var e=!1;return function(){return e=!e}}()}(window.jQuery)}]);