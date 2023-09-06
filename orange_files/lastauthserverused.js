// Remember the last selected auth realm for 30 days
function SetLastRealm(sValue) {
    var dtExpire = new Date();
    dtExpire.setDate(dtExpire.getDate() + 30);
    var ivsHex= GetCookieValue("DSIVS");
    document.cookie = "lastRealm" + ivsHex + "=" +
                      escape(sValue) + "; expires=" + dtExpire.toGMTString() + "; secure";
    }

function SetLastWsamInfo(sValue1, sValue2) {
var dtExpire = new Date();
dtExpire.setDate(dtExpire.getDate() + 30);
    var ivsHex= GetCookieValue("DSIVS");
    document.cookie = "lastusername" + ivsHex + "=" +
                      escape(sValue1) + "; expires=" + dtExpire.toGMTString();
    document.cookie = "lastsigninurl=" +
                      escape(sValue2) + "; expires=" + dtExpire.toGMTString();
}

function LoginImpl() {
    if (document.frmLogin.realm != null && 
        document.frmLogin.realm.type == "select-one") {
            SetLastRealm(document.frmLogin.realm.options[document.frmLogin.realm.selectedIndex].text);
    }
    if (document.frmLogin.realm != null) {
            SetLastRealm(document.frmLogin.realm.value);
    }
}

function Login(setCookies) {
    // Remember currently selected auth realm
    if (typeof(setCookies) == "number" && setCookies == 0) {
    }
    else {
        LoginImpl();
    }
    if (document.frmLogin.tz_offset != null) {
      var wdate = new Date (95, 12, 1);
      var sdate = new Date (95, 6, 1);
      var winter = (-1) * wdate.getTimezoneOffset();
      var summer = (-1) * sdate.getTimezoneOffset();
      document.frmLogin.tz_offset.value = winter < summer ? winter : summer;
    }
    return true;
}

function LoginPPC(setCookies) {
    LoginImpl();
    if (document.frmLogin.username != null) {
        var URL = GetCookieValue('DSSignInURL');
        SetLastWsamInfo(document.frmLogin.username.value, URL);
    }
    return true;
}

// Get the value associated with sName in the document's cookies
function GetCookieValue(sName) {
	var s = document.cookie;
	sName += "=";

	// where nv pair starts
	var nStart = s.indexOf(sName);
	if (nStart == -1) 
		return "";
	else
		nStart += sName.length;
	
	// if more values, clip, otherwise just get rest of string
	var nEnd = document.cookie.indexOf(";", nStart);
	if (nEnd == -1)
		s = unescape(s.substring(nStart));
	else
		s = unescape(s.substring(nStart, nEnd));
	
	return s;
}

function recallLastRealmUsed() {
    if (document.frmLogin.realm != null && 
        document.frmLogin.realm.type == "select-one") {
        // try to remember which auth realm was last used
	var ivsHex = GetCookieValue("DSIVS");
        var sLastRealm = GetCookieValue("lastRealm"+ivsHex);
        if (sLastRealm.length > 0) {
            var cmb = document.frmLogin.realm;
            var nNumRealms = cmb.options.length;
            for (var n=0; n < nNumRealms; n++) {
                if (cmb.options[n].text == sLastRealm) {
                    cmb.selectedIndex = n;
                }
            }
        }
    }
}

function removeLastRealmCookie() {
    var ivsHex = GetCookieValue("DSIVS");
    var sLastRealm = GetCookieValue("lastRealm"+ivsHex);
    if (sLastRealm.length > 0) {
        document.cookie = "lastRealm" + ivsHex + "=; max-age=0";
    }
}

function removeLastSignInCookie() {
    var ivsHex = GetCookieValue("DSIVS");
    var sLastInfo = GetCookieValue("lastusername"+ivsHex);
    if (sLastInfo.length > 0) {
        document.cookie = "lastusername" + ivsHex + "=; max-age=0";
    }
    sLastInfo = GetCookieValue("lastsigninurl"+ivsHex);
    if (sLastInfo.length > 0) {
        document.cookie = "lastsigninurl" + ivsHex + "=; max-age=0";
    }
}


function FinishLoad(setSignInCookies) {
    if (typeof(setSignInCookies) == "number" && setSignInCookies == 0) {
        removeLastRealmCookie();
    }
    else {
        recallLastRealmUsed();
    }
    if (document.frmLogin.username != null) {
       document.frmLogin.username.focus();
    }
}

function FinishLoadPPC() {
    removeLastRealmCookie();
    removeLastSignInCookie();
    if (document.frmLogin.username != null) {
       document.frmLogin.username.focus();
    }
}
