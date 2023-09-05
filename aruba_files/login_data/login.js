var UX_LEGGERA = "0",
	UX_WEB2CS = "1",
	UX_HTML = "3",
	UX_PEC = "4",
	manage = false,
	classic = false,
	i18n_dirs = [
		"ext_aruba/js/nls/"
	],
	i18n_bundles = [
		{code : "en", name : "English"},
		{code : "es", name : "Espa&#241;ol"},
		{code : "it", name : "Italiano"}
	],
	i18n_default = "en",
	i18n_login = {
		global: {
		}
	},
	default_classic_ext = "ext_aruba",
	leggera_ext = "",
	leggera_customer = "default",
	enable_pec_authentication_warning = true;

dojo.addOnLoad(function() {
	checkXfm();
	if (isBrowserSupported()) {
		var regex = new RegExp('[\\?&]classic=([^&#]*)'),
			results = regex.exec(location.search),
			noautoload = true;

		if (results && results[1] === "1") {
			classic = true;
		} else {
			noautoload = auto_login();
		}

		if (noautoload) {
			dojo.query(".login-background").style({"display": "flex"});
			if (!dojo.byId("dImsNXvlfN")) {
				dojo.query(".left-block-image").style({"display": "block"});
				dojo.query(".left-block > iframe").style({"display": "none"});
			} else {
				dojo.query(".left-block-image").style({"display": "none"});
				dojo.query(".left-block > iframe").style({"display": "block"});
			}

			if (classic) {
				dojo.query(".hide-in-classic").style({"visibility": "hidden"});
			}

			dojo.forEach(["login_default", "password_default", "login_domain", "password_domain"], function(id) {
				var node = dojo.byId(id);
				dojo.connect(node, "keyup", function(e) {
					if (e.keyCode === 13) {
						if (id === "login_domain" || id === "password_domain") {
							launchAdmin();
						} else {
							launchUser();
						}
					}
				});

				dojo.connect(node, "onfocus", "onInputFocus");
				dojo.connect(node, "onblur", "onInputBlur");
				dojo.connect(node, "onchange", "onInputChange");

				setTimeout(function() {
					onInputChange({target: node});
				}, 100);
			});

			login_initLocalization();
			login_initAdvancedPage();
		}
	} else {
		login_initLocalization();
		dojo.query(".obsolete-page").style({"display": "block"});
		dojo.query(".login-background").style({"display": "none"});
	}
});

if (!window.document.addEventListener){
	window.document.attachEvent("DOMContentLoaded", DOMContentLoadedListener);
} else {
	window.document.addEventListener("DOMContentLoaded", DOMContentLoadedListener, false);
}

function isBrowserSupported() {
	if ((dojo.isIE && dojo.isIE < 11) ||
		(dojo.isFF && dojo.isFF < 22) ||
		(dojo.isChrome && dojo.isChrome < 29) ||
		(dojo.isOpera && dojo.isChrome < 48)) {
		return false;
	}
	return true;
}

var JsonFormatter = {
	stringify: function(cipherParams) {
		// create json object with ciphertext
		var jsonObj = {
			ct: cipherParams.ciphertext.toString(CryptoJS.enc.Base64)
		};

		// optionally add iv and salt
		if (cipherParams.iv) {
			jsonObj.iv = cipherParams.iv.toString();
		}
		if (cipherParams.salt) {
			jsonObj.s = cipherParams.salt.toString();
		}

		// stringify json object
		return JSON.stringify(jsonObj);
	},

	parse: function(jsonStr) {
		// parse json string
		var jsonObj = JSON.parse(jsonStr),
			// extract ciphertext from json object, and create cipher params object
			cipherParams = CryptoJS.lib.CipherParams.create({
				ciphertext: CryptoJS.enc.Base64.parse(jsonObj.ct)
			});

		// optionally extract iv and salt
		if (jsonObj.iv) {
			cipherParams.iv = CryptoJS.enc.Hex.parse(jsonObj.iv);
		}
		if (jsonObj.s) {
			cipherParams.salt = CryptoJS.enc.Hex.parse(jsonObj.s);
		}

		return cipherParams;
	}
};

function encodeCredentials(loginParam) {
	try {
		var login_data = dojo.toJson(loginParam),
			encrypted = CryptoJS.AES.encrypt(login_data, loginParam.login, {format: JsonFormatter});
		return encrypted.toString();
	} catch(e) {
		console.debug("Error encodeCredentials:", e);
		return "";
	}
}

function login_setCredentials(value, expiry, domain) {
	var encrypted = typeof value === "object" ? encodeCredentials(value) : value;
	if (encrypted) {
		login_setCookie("XaM_Credentials", encrypted, expiry, domain);
	}
}

function login_getCookie(name) {
	var _cookies = " " + document.cookie;
	if (_cookies.indexOf(" " + name + "=") == -1) {
		return null;
	}

	var _start = _cookies.indexOf(" " + name + "=") + (name.length + 2),
		_finish = _cookies.substring(_start,_cookies.length);
	_finish = (_finish.indexOf(";") == -1) ? _cookies.length : _start + _finish.indexOf(";");

	return unescape(_cookies.substring(_start,_finish));
}

function login_setCookie(name, value, expiry, domain) {
	var now = new Date();
	now.setTime(now.getTime() + Math.round(86400000*expiry));
	var cookie = [
		name, "=", escape(value),
		domain ? "; domain=" + domain : "",
		"; path=/",
		"; expires=", now.toGMTString(),
		"; SameSite=Strict; Secure"
	].join("");
	document.cookie = cookie;
}

function login_initAdvancedPage() {
	login_initPage();

	var domain = login_getCookie("XaM_Domain");
	if (domain) {
		dojo.byId("login_domain").value = domain;
	}

	login_initRadios("XaM_Version", "webmail_version");
	login_initRadios("PoM_Version", "postmaster_version");
}

function checkXfm() {
	if (!window.parent.xfmFrame) {
		location.href = "index.php";
		return;
	}
}

function login_initPage() {
	var login = login_getCookie("XaM_Login");
	if (login) {
		dojo.byId("login_default").value = login;
	}
	focusFirstInput();
}

function login_initRadios(cookie, radio) {
	var theme = login_getCookie(cookie) || 0,
		radios = document.getElementsByName(radio),
		idx = theme >= 0 && theme < radios.length ? theme : 0;
	radios[idx].checked = true;
}

function displayTab(id) {
	dojo.query(".right-block").toggleClass("manage-tab", id === "2");
	focusFirstInput();
}

function getLanguage() {
	return dojo.byId("language-button").className;
}

function login_showPopup(msg) {
	dojo.query(".feedback-block").removeClass("error").addClass("waiting");
	dojo.byId("feedback-text").innerHTML = msg;
}

function login_errorPopup(msg){
	dojo.query(".feedback-block").removeClass("waiting").addClass("error");
	dojo.byId("feedback-text").innerHTML = msg;
}

function login_getSelectedUx(name) {
	var elements = document.getElementsByName(name),
		value;

	return dojo.some(elements, function(node) {
		if (node.checked) {
			value = node.value;
			return true;
		}
	}) ? value : UX_LEGGERA;
}

function launchUser() {
	var lang = getLanguage(),
		theme = login_getCookie("XaM_Theme") || default_classic_ext + "/classic",
		login = dojo.byId("login_default").value,
		passwd = dojo.byId("password_default").value,
		remember = dojo.byId("remember_me").checked,
		ux = (top.document.location.hash && !(top.history.state && top.history.state.handlerName)) ?
			UX_LEGGERA :
			login_getSelectedUx("webmail_version");

	if (validateForm(login, passwd, ux, lang)) {
		manage = false;
		if (classic || ux == UX_HTML) {
			login_html(login, passwd, lang, false);
		} else if (ux == UX_PEC || isPecDomain(login)) {
			login_pec();
		} else if (ux == UX_WEB2CS) {
			login_web2cs(login, passwd, lang, theme, remember);
		} else {
			login_leggera(login, passwd, lang, remember, theme);
		}
	}
}

function launchAdmin() {
	var lang = getLanguage(),
		theme = login_getCookie("XaM_Theme") || default_classic_ext + "/classic",
		domain = dojo.byId("login_domain").value,
		login = "postmaster@" + domain,
		passwd = dojo.byId("password_domain").value,
		ux = top.document.location.hash ? UX_LEGGERA : login_getSelectedUx("postmaster_version");

	if (validateForm(domain, passwd, ux, lang)) {
		manage = true;
		if (classic) {
			login_html(login, passwd, lang, false);
		} else if (ux == UX_WEB2CS) {
			login_web2cs(login, passwd, lang, theme, false);
		} else {
			login_leggera(login, passwd, lang, false, theme);
		}
	}
}

function urldecode(txt) {
	return txt.replace(/&amp;/g, "&");
}

function login_web2cs(login, passwd, lang, theme, remember) {
	var xfm = window.parent.xfmFrame.xfm,
		path, params, req;
	if (xfm) {
		if (theme) {
			path = theme.split(".")[0];
			xfm.loadDescriptor(path + "/descriptor.json");
		}
		params = {
			service: "web2cs",
			login: login,
			passwd: passwd,
			lang: lang,
			theme: theme,
			remember_me: remember,
			classicTheme: theme,
			customer: leggera_customer
		};

		req = xfm.ajax();
		req.params = params;
		req.method = "POST";
		req.callback = function(str) {
			var response = xfm._evalJson(str),
				status = response.status;

			if (!status || status.err_text || status.err_code) {
				login_processError(status, lang);
				return;
			}
			if (response.pec_redir) {
				pecShowDialog();
				return;
			}
			if (remember && (status.mx === 0 || status.mx === undefined)) {
				login_setCredentials(params, 365);
			}
			if (response.url) {
				display_redirect(response.url, {
					sso: manage ? 1 : 0,
					classicUrl: urldecode(response.classicUrl),
					classicTheme: theme,
					smartUrl: urldecode(response.smartUrl)
				});
			}
		};
		req.errorCallback = login_errorCallback;
		req.request(xfm.getRequest("ems", "authenticate", params));
	} else {
		setTimeout(function() {
			login_web2cs(login, passwd, lang, theme, remember);
		}, 200);
	}
}

function login_processError(status, lang) {
	var msg = status ? (status.err_text ? status.err_text : "Error: " + status.err_code) :
		"An error has occurred, please retry later";

	if (enable_pec_authentication_warning && status &&
		(status.err_code == 10000 || status.err_code == 1)) {
		msg += i18n_login[lang].pec_authentication_warning;
	}
	login_errorCallback(msg);
}

function login_errorCallback(msg) {
	login_setCredentials("", -1);
	login_errorPopup(msg);
}

function isSmartOptimizable() {
	return false;
}

function login_leggera(login, passwd, lang, remember, classicTheme) {
	var xfm = window.parent.xfmFrame.xfm,
		admin = manage ? 1 : 0,
		params;
	if (xfm) {
		xfm.loadDescriptor(default_classic_ext + "/origin/descriptor.json");

		params = {
			login: login,
			passwd: passwd,
			service: "leggera",
			lang: lang,
			remember_me: remember,
			classicTheme: classicTheme,
			login_way: isSmartOptimizable() ? "optimized" : ""
		};

		xfm.rpc ({
			serviceName: "ems",
			serviceMethod: "authenticate",
			serviceExtraArgs: params,
			method: "POST",
			load: function(response) {
				var status = response.status;

				if (!status || status.err_text || status.err_code) {
					login_processError(status, lang);
					return;
				}

				if (response.pec_redir) {
					pecShowDialog();
					return;
				}

				if (status.mx === 0 || status.mx === undefined) {
					if (remember) {
						login_setCredentials(params, 365);
					}

					if (params.login_way == "optimized") {
						response.application.ext = leggera_ext;
						response.application.ui = "layout/light";
						response.application.theme = "default";
						response.application.admin = admin;
						response.application.customer = leggera_customer;
						window.top.name = JSON.stringify(response);
						window.top.location = response.url + "/layout/light.html?_v_=" + response.version;
					} else {
						display_redirect(response.url + "/cgi-bin/ajaxmail", {
							Act_Msgs: 1,
							Tpl: "fizr",
							customer: leggera_customer,
							dynamicCustomization: response.dynamicCustomization,
							ext: leggera_ext,
							declination: "",
							ui: "layout/light",
							theme: "default",
							Release: 1,
							ID: response.sessionid,
							SG_Lang: lang,
							admin: admin,
							smartUrl: urldecode(response.smartUrl),
							classicUrl: urldecode(response.classicUrl),
							classicTheme: classicTheme,
							historyHash: top.document.location.hash
						});
					}
				} else {
					display_redirect(response.url, {admin: admin});
				}
			}
		});
	} else {
		setTimeout(function() {
			login_leggera(login, passwd, lang, remember, classicTheme);
		}, 200);
	}
}

function auto_login() {
	var encrypted = login_getCookie("XaM_Credentials"),
		login = login_getCookie("XaM_Login"),
		decrypted, json, params, service, passwd, lang, theme;

	if (encrypted && login && encrypted !== "" && login !== "") {
		decrypted = CryptoJS.AES.decrypt(encrypted, login, {format: JsonFormatter});
		json = decrypted.toString(CryptoJS.enc.Utf8);
		params = dojo.fromJson(json);
		service = params.service;
		login = params.login;
		passwd = params.passwd;
		lang = login_getCookie("XaM_Language") || params.lang || "en";
		theme = params.theme;
		if (service === "web2cs") {
			login_web2cs(login, passwd, lang, theme, false);
		} else if (service === "pec") {
			login_pec();
		} else {
			login_leggera(login, passwd, lang, false, theme);
		}
		return false;
	}
	return true;
}

function isPecDomain(login) {
	var parts = login.split("@"),
		domain = "@" + (parts.length > 1 ? parts[1] : "");

	return dojo.some([
		"@pec.aruba.it", "@pec.it", "@arubapec.it", "@mypec.eu", "@gigapec.it",
		"@pec.comunemartinafranca.gov.it", "pec\\.(.*)\\.it", "@jhhhhhhkl.it",
		"@casellapec.com","@pecditta.com", "@psypec.it", "@oappc-rc.it"
	], function(item) {
		var re = new RegExp(item);
		return domain.match(re);
	});
}

function login_pec() {
	pecShowDialog();
}

function login_html(login, password, language, remember_me) {
	var xfm = window.parent.xfmFrame.xfm,
		params, pid;
	if (xfm) {
		pid = document.getElementById('login_pid').value;
		xfm.loadDescriptor("ext_aruba/origin/descriptor.json");

		params = {
			login: login,
			passwd: password,
			lang: language,
			useHTMLTpl: 1,
			pid: pid,
			remember_me: remember_me
		};

		try {
			xfm.rpc ({
				serviceName: "ems",
				serviceMethod: "authenticate",
				serviceExtraArgs: params,
				method: "POST",
				load: function(response) {
					var status = response.status;

					if (!status || status.err_text || status.err_code) {
						login_processError(status, language);
						return;
					}

					if (response.pec_redir) {
						pecShowDialog();
						return;
					}

					if (status.mx === 0 || status.mx === undefined) {
						if (remember_me) {
							login_setCredentials(params, 365);
						}

						display_redirect(response.url + "/cgi-bin/webmail", {
							Act_Msgs: 1,
							Tpl: "login",
							PID: pid,
							ID: response.sessionid,
							SG_Lang: language
						});
					} else {
						display_redirect(response.url);
					}
				}
			});
		}
		catch(e) {
			console.debug("error : " + e);
		}
	} else {
		setTimeout(function() {
			login_html(login, password, language, remember_me);
		}, 200);
	}
}

function display_redirect(url, params) {
	var form = dojo.byId("redirect"),
		parts = url.split("?"),
		action = parts[0],
		i;
	if (form) {
		params = params || {};
		if (parts.length > 1) {
			dojo.forEach(parts[1].split("&"), function(pair) {
				var split = pair.split("=");
				params[decodeURIComponent(split[0])] = decodeURIComponent(split[1]);
			});
		}

		for (i in params) {
			dojo.create("input", {
				"type": "hidden",
				"name": i,
				"value": params[i]
			}, form);
		}
		form.action = action;
		form.submit();
	}
}

function showPassword(id) {
	var node = dojo.byId(id),
		isVisible;
	if (node) {
		isVisible = node.type === "text" ? true : false;
		node.type = isVisible ? "password" : "text";
	}
}

function onInputFocus(e) {
	var node = e.target;
	dojo.addClass(node.parentNode, "focused");
	hideLanguage();
}

function onInputBlur(e) {
	var node = e.target;
	dojo.removeClass(node.parentNode, "focused");
}

function onInputChange(e) {
	var node = e.target;
	dojo.toggleClass(node.parentNode, "filled", node.value !== "");
}

function DOMContentLoadedListener() {
	window.setTimeout(function() {
		dojo.query("input[type=text], input[type=password]").forEach(function(node) {
			onInputChange({target: node});
		});
	}, 200);
}

function login_setLanguageCookie(lang) {
	var hostname = window.location.hostname,
		domain = hostname || "",
		parts = domain.split(".").reverse();

	if (parts.length > 1) {
		domain = parts[1] + "." + parts[0];
		if (parts.length > 2 && hostname.toLowerCase().indexOf(".co.uk") != -1) {
			domain = parts[2] + "." + domain;
		}
	}
	login_setCookie("XaM_Language", lang, -1);
	login_setCookie("XaM_Language", lang, 365, domain);
}

function loginGetLanguage(lang, callback) {
	if (i18n_login[lang]) {
		callback(i18n_login[lang], lang);
	} else {
		loginGetSingleLanguage(0, lang, callback);
	}
}

function loginGetSingleLanguage(idx, lang, callback) {
	var xobj = new XMLHttpRequest();
	xobj.open("GET", i18n_dirs[idx] + (lang === "en" ? "" : lang + "/") + "login.json?_v_=4.2.88.20230724_1029", true);
	xobj.onreadystatechange = function () {
		if (xobj.readyState == 4 && xobj.status == "200") {
			i18n_login[lang] = dojo.mixin(i18n_login[lang], JSON.parse(xobj.responseText));
			if (++idx < i18n_dirs.length) {
				loginGetSingleLanguage(idx, lang, callback);
			} else {
				callback(i18n_login[lang], lang);
			}
		}
	};
	xobj.send(null);
}

function login_initLocalization() {
	login_setCookie("XaM_Language", "", -1);

	var lang = login_getCookie("XaM_Language") ||
		(!navigator.browserLanguage ?
			navigator.language.split("-")[0] :
			navigator.browserLanguage.split("-")[0]),
		ul = dojo.create("ul");

	if (lang == "cs") {
		lang = "cz";
	}

	if (!dojo.some(i18n_bundles, function(language) {
		return lang == language.code;
	})) {
		lang = i18n_default;
	}

	dojo.forEach(i18n_bundles, function(language) {
		var li = dojo.create("li", {
				onclick: function(e) {
					changeLanguage(language.code, language.name);
					dojo.stopEvent(e);
				}
			});
		dojo.create("button", {
			type: "button",
			id: language.code,
			innerHTML: language.name
		}, li);
		ul.appendChild(li);
		if (lang == language.code) {
			dojo.byId("language_select").innerHTML = language.name;
			dojo.addClass("language-button", language.code);
			loginGetLanguage(lang, login_localize);
		}
	});

	dojo.byId("menu_language").appendChild(ul);

	dojo.connect(dojo.byId("language-button"), "onclick", "showLanguage");
	dojo.connect(dojo.body(), "onclick", "hideLanguage");
	dojo.connect(dojo.body(), "onkeypress", function(evt) {
		if (evt.keyCode == 27) {
			hideLanguage();
		}
	});
	dojo.connect(dojo.byId("feedback"), "onclick", "showFeedback");
}

function changeLanguage(param1, param2) {
	dojo.toggleClass("menu_language", "show");
	dojo.removeClass("language-button");
	dojo.addClass("language-button", param1);
	dojo.byId("language_select").innerHTML = param2;
	loginGetLanguage(param1, login_localize);
	focusFirstInput();
}

// gtm feature
function changeLanguageGtm(lang) {
	if (top.dataLayer) top.dataLayer[0].lang = lang;
}

function showLanguage(evt) {
	dojo.toggleClass("menu_language", "show");
	evt.stopPropagation();
}

function hideLanguage() {
	dojo.removeClass("menu_language", "show");
}

function login_localize(i18n, lang) {
	dojo.query("[data-i18n]").forEach(function(node) {
		if (i18n[dojo.attr(node, "data-i18n")]) {
			node.innerHTML = fstring(i18n[dojo.attr(node, "data-i18n")]);
		}
	});

	dojo.query("[data-i18n-placeholder]").forEach(function(node) {
		if (i18n[dojo.attr(node, "data-i18n-placeholder")]) {
			node.placeholder = fstring(i18n[dojo.attr(node, "data-i18n-placeholder")]);
		}
	});
	changeLanguageGtm(lang);
}

function fstring(param) {
	param = param.replace(/\{year\}/g, function() {return new Date().getFullYear();});
	return dojo.replace(param, i18n_login.global);
}

function focusFirstInput() {
	var postfix = dojo.hasClass(dojo.query(".right-block"), "manage-tab") ? "domain" : "default";
	if (dojo.byId("login_" + postfix).value === "") {
		dojo.byId("login_" + postfix).focus();
	} else {
		dojo.byId("password_" + postfix).focus();
	}
}

function validateForm(login, passwd, ux, lang) {
	var result = false,
		check_login = typeof login === "string" && login.trim() !== "",
		check_password = typeof passwd === "string" && passwd.trim() !== "",
		i18n = i18n_login[lang];

	if (check_login && check_password) {
		login_showPopup(fstring(i18n.requesting_data));
		login_setCookie("XaM_Version", ux, 365);
		login_setCookie("XaM_Login", login, 365);
		login_setLanguageCookie(lang);
		result = true;
	} else {
		login_setCredentials("", -1);
		login_errorPopup(fstring(!check_login ? i18n.missing_login : i18n.missing_password));
	}
	return result;
}

function pecRedirect() {
	window.top.location = "https://webmail.pec.it";
}

function pecShowDialog() {
	dojo.query(".pec-dialog-overlay,.pec-dialog-block").style("display", "flex");
}

function pecHideDialog() {
	dojo.query(".pec-dialog-overlay,.pec-dialog-block").style("display", "none");
	dojo.query(".feedback-block").removeClass("waiting");
	dojo.byId("feedback-text").innerHTML = "";
}

function showFeedback(evt) {
	var language, vw;
	evt.stopPropagation();

	if (!window.usabilla_live) {
		vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
		if (vw > 1024) {
			// loads Desktop button
			window.usabilla_live = lightningjs.require("usabilla_live", "//w.usabilla.com/eb623b65e6ef.js");
		} else if (vw > 480) {
			// loads the Tablet button
			window.usabilla_live = lightningjs.require("usabilla_live", "//w.usabilla.com/a5d24c65ce4f.js");
		} else {
			// loads the Mobile button
			window.usabilla_live = lightningjs.require("usabilla_live", "//w.usabilla.com/4e7831d8dc60.js");
		}
	}

	if (window.usabilla_live) {
		switch (getLanguage()) {
			case "it":
				language = null;
				break;
			case "es":
				language = "Spagnolo";
				break;
			case "cz":
				language = "ceco";
				break;
			case "pl":
				language = "Polacco";
				break;
			default:
				language = "inglese";
				break;
		}
		window.usabilla_live("setForm", language);
		window.usabilla_live("click");
	}
}

function lostPassword() {
	var href = top.document.location.href,
		pos = href.lastIndexOf("/"),
		lang = getLanguage(),
		service = (top.document.location.hash && !(top.history.state && top.history.state.handlerName)) ||
			login_getSelectedUx("webmail_version") == UX_LEGGERA ?
				"leggera" : "web2cs";

	window.top.location = href.substring(0, pos) + "/reset_password.php?RECOVER=1&lang=" + lang + "&service=" + service;
}
