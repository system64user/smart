/*
 * Copyright (c) 2013 Mailtech.cn, Ltd. All Rights Reserved.
 */

(function () {

    var lookupAction = "lookup.jsp";

    var inputArray = ["uid", "domain", "password", "locale", "useSSL", "saveUsername"];

    window.jsInit = function init(focusInput) {
        for (var i = 0; i < inputArray.length; i++) {
            var input = getElement(inputArray[i]);
            if (input == null) {
                continue;
            }

            if (input.type == "text") {
                // input.onfocus =
                // input.onblur  =
            }

            if (input.name == "uid" || input.name == "password") {
                input.onkeyup = function () {
                    uidPasswordChanged();
                };
            }

            if ((input.type != "text") || (getValue(input) == "")) {
                var cookieValue = getCookie(input.name);
                if (cookieValue) {
                    setValue(input, cookieValue);
                }
            }

            if (input.name == focusInput) {
                input.focus();
            }
        }

        uidPasswordChanged();

        var hiddenFrameDiv = document.createElement("div");
        hiddenFrameDiv.innerHTML = '<iframe id="lookupFrame" src="javascript:\'\'" frameborder="0" class="hidden"/>';
        document.body.appendChild(hiddenFrameDiv);
    };

    window.changeLocale = function changeLocale(localeKey) {
        setCookie('locale', localeKey);
        if (window.location.href.toString().indexOf("cus=1") > -1) {
            window.location = location;
        } else {
            if (window.location.href.toString().indexOf("?") > -1) {
                window.location = location + "&cus=1"
            } else {
                window.location = location + "?cus=1";
            }
        }
    };

    function getValue(input) {
        if (input.type == "checkbox") {
            return input.checked ? "1" : "0";
        } else {
            return input.value;
        }
    }

    function setValue(input, value) {
        if (input.type == "checkbox") {
            input.checked = (value == "1");
        } else {
            input.value = value;
        }
    }

    function getCookie(name) {
        var reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)", "gi");
        var tmp = reg.exec(document.cookie);
        //noinspection JSDeprecatedSymbols
        return unescape((tmp || [])[2] || "");
    }

    function setCookie(name, value) {
        //noinspection JSDeprecatedSymbols
        document.cookie = name + '=' + escape(value)
                + ";expires=" + (new Date(1990, 1, 1)).toGMTString();  // 删除 path 级别 cookie
        //noinspection JSDeprecatedSymbols
        document.cookie = name + '=' + escape(value) + ";path=/"       // 只保留根级别的 cookie
                + ";expires=" + (new Date(2099, 12, 31)).toGMTString();
    }

    function getElementValue(name) {
        return getValue(getElement(name) || {}) || "";
    }

    function getElement(name) {
        return document.getElementsByName(name)[0];
    }

    function alertMsg(key) {
        if(location.pathname.indexOf("index.html") > -1){
            return jQ(".Error").text(window[key] || key);
        }
        return alert(window[key] || key);
    }

    window.jsLoginSubmit = function loginSubmit() {
        getElement("uid").value = changePoint(getElement("uid").value);
        setTimeout(doPostLookup, 0);
        return false;
    };

    function changePoint(address) { //将输入的中间圆点自动换成小点
        var point = unescape("\\u3002".replace(/\\u/gi, '%u'));  // 中间圆点
        var index = address.indexOf('@');
        if (index != -1) {
            var localpart = address.substring(0, index);
            var domain = address.substring(index + 1, address.length);
            if (domain.indexOf(".") == -1 && domain.indexOf(point) != -1) {
                var lastIndex = domain.lastIndexOf(point);
                var newDomain = domain.substring(0, lastIndex) + "." + domain.substring(lastIndex + 1, domain.length);
                var newAddress = localpart + "@" + newDomain;
                return newAddress;
            }
        }
        return address;
    }

    function doPostLookup() {
        var uid = getElement("uid").value;
        var uidHasDomain = (uid.indexOf('@') != -1);

        function validateNotEmpty(name) {
            var input = getElement(name);
            if (!(input || {}).value && !((name == "domain") && (uidHasDomain))) {
                if((input || {}).type != "hidden") {
                    (input || getElement("uid")).focus();
                }
                if (name == "uid" || name == "domain") {
                    alertMsg("msg_incomplete_email");
                } else {
                    alertMsg("msg_empty_" + name);
                }
                return false;
            }
            return true;
        }

        if (!(validateNotEmpty("uid") && validateNotEmpty("domain") && validateNotEmpty("password"))) {
            return;
        }

        for (var i = 0; i < inputArray.length; i++) {
            var input = getElement(inputArray[i]);
            if (input && input.name != "password" && (input.name != "uid" || document.getElementById("saveUsername").checked)) {
                setCookie(input.name, getValue(input));
            }
        }

        var fullUid = uidHasDomain ? uid : (uid + '@' + getElement("domain").value);
        var useSSL = false;
        var forAdmin = false;

        cacheKey = uid + ':' + (useSSL ? 1 : 0) + ':' + (forAdmin ? 1 : 0);

        var url = actionCache[cacheKey];
        if (url) {
            submitForm(url);
        } else {
            timestamp = new Date().getTime();
            var href = location.href;
            var lastSlash = href.lastIndexOf('/');
            document.getElementById("lookupFrame").src = lookupAction
                    + "?uid=" + encodeURIComponent(fullUid)
                    + "&useSSL=" + useSSL
                    + "&forAdmin=" + forAdmin
                    + "&postBack=" + href.substring(0, lastSlash) + "/lookup_back.html"
                    + "&ts=" + timestamp
                    + "";
        }
    }

    var timestamp;
    var cacheKey;
    var actionCache = {};

    function uidPasswordChanged() {
        // do nothing now
    }

    window.jsAppendUid = function appendUid(aElem) {
        var url = aElem.href;
        var uid = getElement("uid").value;
        if (uid && uid.indexOf('@') == -1) {
            var domain = (getElement("domain") || {}).value || "";
            if (domain) {
                uid = uid + '@' + domain;
            }
        }
        var i = url.indexOf("?");
        var mainURL = (i == -1) ? url : url.substring(0, i);
        aElem.href = uid ? (mainURL + "?uid=" + uid) : mainURL;
    };


    window.jsSwitchLocale = function switchLocale(locale) {
        setCookie("locale", locale);
    };


    window.jsLookupBack = function lookupBack(url, ts) {
        if (ts != timestamp) {
            return;
        }

        if (!url) {
            var input = getElement("uid");
            input.focus();
            alertMsg("msg_unknown_email");
            return;
        } else if (url == "LOAD_FAILED") {
            alertMsg("msg_lookup_load_failed");
            return;
        } else if (url.match(/^ERROR:/)) {
            alertMsg(url.substring("ERROR:".length));
            return;
        }

        actionCache[cacheKey] = url;
        submitForm(url);
    };

    function submitForm(actionURL) {
        var form = document.getElementById("loginForm");

        var element = document.getElementById("hiddenActionLogin");
        if (!element) {
            element = document.createElement("input");
            element.id = "hiddenActionLogin";
            element.type = "hidden";
            element.name = "action:login";
            element.value = "Submit";
            form.appendChild(element);
        }

        if (getElement("useSSL")) {
            if (getElement("useSSL").checked) { // useSSL
                actionURL = actionURL.replace("http://", "https://");
            } else {
                actionURL = actionURL.replace("https://", "http://");
            }
        }

        if ((document.getElementById("adminLoginTab") || {}).className == "active") { // for admin login
            actionURL = actionURL.replace("/coremail/index.jsp", "/webadmin/index.jsp?submit=true");
            actionURL = actionURL.replace("/coremail/login.jsp", "/webadmin/index.jsp?submit=true");

        } else if (getElementValue("service") == "PAD") { // for pad version
            actionURL = actionURL.replace("/coremail/index.jsp", "/coremail/ipad/index.jsp");
            actionURL = actionURL.replace("/coremail/login.jsp", "/coremail/ipad/index.jsp");

        } else if (getElementValue("service") == "PHONE") { // for phone version
            actionURL = actionURL.replace("/coremail/index.jsp", "/coremail/xphone/index.jsp");
            actionURL = actionURL.replace("/coremail/login.jsp", "/coremail/xphone/index.jsp");

        } else {
            // login.jsp 暂时还不支持输入图形验证码，所以回退到登录到 index.jsp 的状态
            // actionURL = actionURL.replace("/coremail/index.jsp", "/coremail/login.jsp");
        }

        form.action = actionURL;
        form.submit();
    }
})();
