// tabName =="0"  0: personal   1: business
tabName=0;

$(function(){
  // 預設顯示第一個 Tab
  var _showTab = 0;
  var $defaultLi = $('ul.tabs li').eq(_showTab).addClass('active');
  $($defaultLi.find('a').attr('href')).siblings().hide();

  // 當 li 頁籤被點擊時...
  // 若要改成滑鼠移到 li 頁籤就切換時, 把 click 改成 mouseover
  $('ul.tabs li').click(function() {
    // 找出 li 中的超連結 href(#id)
    var $this = $(this),
      _clickTab = $this.find('a').attr('href');
    // 把目前點擊到的 li 頁籤加上 .active
    // 並把兄弟元素中有 .active 的都移除 class
    $this.addClass('active').siblings('.active').removeClass('active');
    // 淡入相對應的內容並隱藏兄弟元素
    $(_clickTab).stop(false, true).fadeIn().siblings().hide();
                      // tab1 => 0   ; tab2 => 1
    tabName=eval(_clickTab.substring(_clickTab.length-1, _clickTab.length)-1);
    if (tabName =="0") {
      var isSavePW = checkCookie('personal');
	  if (!isSavePW) showEye('Puser');
	} else {
      var isSavePW = checkCookie('business');
	  if (!isSavePW) showEye('Puser');
    }
    return false;
  }).find('a').focus(function(){
    this.blur();
  });
  $defaultLi.click();
  showMessageAndGetCookie();
});

function CloseModelPopup(){
  document.getElementById('ModalPopupDiv').style.display = "none";
}

savePasswdFlag = false;     // 是否勾選記住密碼，需先勾選記住帳號方可勾選記住密碼
var onlyOne = false;        //確保submit只能做一次
var today = new Date();
var expiry = new Date(today.getTime() + 365 * 24 * 60 * 60 * 1000); // one year later

function myTrim(x){
  return x.replace(/^\s+|\s+$/gm,'');
}


/* Trim(string): Trim off the spaces between the target string */
function Trim(inStr){
  var re, r;

  re = /\s*(\S*)\s*/;
  r = inStr.replace(re, "$1");
  return r;
}

function checkCookieEnable()
{
  if (!navigator.cookieEnabled)
      alert("你的瀏覽器並未支援Cookie，煩請啟動Cookie功能!");
}

function validateEmail(str)
{
  var re;

  str = Trim(str);
  re = /^\w+([\.\-_]?[\w\.]+)*@\w+([\.\-]?\w+)*(\.\w{2,})+$/;
  if (str.match(re)){
      return true;
  } else {
      return false;
  }
}

function validateAccount(str)
{
  var re;

  str = Trim(str);
  re = /^\w+([\.\-_]?[\w\.]+)*$/;
  if (str.match(re)){
      return true;
  } else {
      return false;
  }
}

function resetTab(formObj, item)
{
  if (formObj.name == 'personal') {formObj.cm1.checked = false;}	// cm1work delete this line
  if (item && item != 'ID') formObj.mailid.value = '';
  if (item && item != 'Password') formObj.password.value = '';
  formObj.saveAccount.checked = false;
  formObj.savePasswd.checked = false;
}

function checkTheSame(formObj)
{
  nowID = formObj.mailid.value;
  nowPasswd = formObj.password.value;

  if (!savePasswdFlag) return;
  if ( (nowID=='' || (door.indexOf(nowID)<0)) && (key.indexOf(nowPasswd) >= 0))
      {resetTab(formObj, 'ID'); }
}

function checkMailID(mailid){		// cm1work delete this function
  var re;
  str = Trim(mailid);

  re = /\w+@cm1/;
  if (str.match(re)){
      return true;
  } else {
      return false;
  }
}

function checkInput(formObj)
{
    var errorMsg = "";
    var formName = formObj.name;
    var mailid = Trim(formObj.mailid.value);
    var password = myTrim(formObj.password.value);

    if (onlyOne) {//此時onlyOne值為true,表示已經做submit動作
        //alert("正在進行submit動作");
        return false;//不做submit
    } else {//第一次做submit動作
        //alert("第一次進行submit");
        onlyOne = true;//進入submit,將值設為true

        if (formName == "business") {
            if (mailid == "") {
                errorMsg += "Email欄位不能為空 \n"; alert(errorMsg);
                formObj.mailid.focus();
                onlyOne = false;//將布林值初始化
                return false;
            }  else if (!validateEmail(mailid))  {
                errorMsg += "輸入的email格式不正確"; alert(errorMsg);
                    formObj.mailid.focus();
                    onlyOne = false;//將布林值初始化
                    return false;
                }
        } else if (formName == "personal") {
                if (mailid == "") {
                  errorMsg += "帳號欄位不能為空 \n"; alert(errorMsg);
                    formObj.mailid.focus();
                    onlyOne = false;//將布林值初始化
                    return false;
              } else if (!validateEmail(mailid) && !validateAccount(mailid)) {
                  errorMsg += "輸入的郵件帳號格式錯誤 \n"; alert(errorMsg);
                        formObj.mailid.focus();
                        onlyOne = false;//將布林值初始化
                        return false;
                }

                if (validateEmail(mailid) && ((formObj.cm1.checked == true) && !checkMailID(mailid))) {		// cm1work delete this block
          errorMsg += "該郵件信箱並非cm1信箱";alert(errorMsg);
                    formObj.cm1.checked = false;
                    onlyOne = false;//將布林值初始化
                    document.getElementById('OKPuser').focus();
                    return false;
                }
        }

        if (password == "") {
            errorMsg += "密碼欄位不能為空 \n";alert(errorMsg);
            formObj.password.focus();
            onlyOne = false;//將布林值初始化
            return false;
        }

        register(formObj);
        return true;
    }
}

function compile(code)
{
  var c = String.fromCharCode(code.charCodeAt(0) + code.length);
  for(var i=1; i<code.length; i++){
    c += String.fromCharCode(code.charCodeAt(i) + code.charCodeAt(i-1));
  }
  return (escape(c));
}

function uncompile(code)
{
  code = unescape(code);
  var c = String.fromCharCode(code.charCodeAt(0)-code.length);
  for(var i=1; i<code.length; i++){
      c += String.fromCharCode(code.charCodeAt(i) - c.charCodeAt(i-1));
  }
  return c;
}

function setCookie(name, value, expire)
{
    document.cookie = name+ "=" + compile(value)  +
     "; path=/" + "; domain=webmail.hinet.net" +
    ((expire == null) ? "" : ("; expires=" + expire.toGMTString()))
    ;
//   document.cookie = name+ "=" + escape(value)  + ((expire == null) ? "" : ("; expires=" + expire.toGMTString()));
}

function getCookie(Name) {
  var search = Name + "="   ;
  if (document.cookie.length > 0) {
    // if there are any cookies
    offset = document.cookie.indexOf(search);
    if (offset != -1) { // if cookie exists
      offset += search.length;
      // set index of beginning of value
      end = document.cookie.indexOf(";", offset);
      // set index of end of cookie value
      if (end == -1)
          end = document.cookie.length  ;
      return uncompile(document.cookie.substring(offset, end));
      // return unescape(document.cookie.substring(offset, end));
    }
  }
  return;
}

function deleteCookie(name, path, domain){
  if (getCookie(name)) {
    document.cookie = name + "=" +
    ((path) ? "; path=" + path : "") +
    ((domain) ? "; domain=" + domain : "") +
    "; expires=Thu, 01-Jan-70 00:00:01 GMT";
  }
}

function register(formObj)
{
  var message ="";
  var usertype ="";
  var passwd = myTrim(formObj.password.value);
  var id = Trim(formObj.mailid.value);

  formObj.mailid.value=id;
  formObj.password.value=passwd;

  saveFlag = (formObj.saveAccount.checked == true)? true:false;
  savePasswdFlag = (formObj.savePasswd.checked==true)? true:false;
  var type=formObj.name;
  setCookie("Latest", type, expiry);

  if (saveFlag)  {// Save Account
    if (type =="business") {
      usertype="3";
      message = message + usertype + ";" + id;
      setCookie("BusinessAccount", message, expiry);

      if (savePasswdFlag)   setCookie("BusinessPasswd", passwd, expiry);
      else  deleteCookie("BusinessPasswd", "/", "webmail.hinet.net" );
    } else if (type =="personal"){
      usertype= (formObj.cm1.checked == true)? "2":"1";		// cm1work usertype is always "1"
      formObj.usertype.value = usertype;
      message = message + usertype + ";" + id;
      setCookie("PersonalAccount", message, expiry);

      if (savePasswdFlag) setCookie("PersonalPasswd", passwd, expiry);
      else  deleteCookie("PersonalPasswd", "/", "webmail.hinet.net");
    }
  } else { // Don't save account and passwd, reset associated cookie
    if (type=='business'){
      deleteCookie("BusinessAccount", "/", "webmail.hinet.net");
      deleteCookie("BusinessPasswd", "/", "webmail.hinet.net" );
    } else if (type=='personal') {
      usertype= (formObj.cm1.checked == true)? "2":"1";		// cm1work usertype is always "1"
      formObj.usertype.value = usertype;

      deleteCookie("PersonalAccount", "/", "webmail.hinet.net" );
      deleteCookie("PersonalPasswd", "/", "webmail.hinet.net");
    }
  }
}

function changeTab(name){
  if (name == "business" ) {
    $('a[href="#tab2"]').click(); 
  } else {
    $('a[href="#tab1"]').click(); 
  }
}

function checkCookie(name)
{
  var name, message, passwd;
  var formObj;

  if (name=="business") tabName=1;

  if (name == null) {
    name = getCookie("Latest");
    if (name != null ) {
      changeTab(name);
      if (name=="business") tabName=1;
    }
  }

   // check whether cookie "Latest" exists
  if (name == "business") {
    //formObj = document.business;
    formObj=$('form[name=business]')[0];
    //$('form[name=business] input[name=saveAccount]').attr("checked", true);
    message = getCookie("BusinessAccount");
    passwd = getCookie("BusinessPasswd");
  } else if (name == "personal") {
    //formObj = document.personal;
    formObj=$('form[name=personal]')[0];
    message = getCookie("PersonalAccount");
    passwd = getCookie("PersonalPasswd");
  } else {   // default personal tab
    //formObj = document.personal;
    formObj=$('form[name=personal]')[0];
  }

  if (passwd != null) {
	  savePasswdFlag = true;
  }

  if (message != null) {
    var messageArray = message.split(";");

    if (messageArray.length < 3) { // personal or business type account
      formObj.mailid.value= messageArray[1];
      //    $(":text").eq(tabName).value= messageArray[1];
      formObj.mailid.focus();
      //    $(":text").eq(tabName).focus();
      formObj.saveAccount.checked = true;

      if (passwd != null) {
        // $('form[name=business] input[name=saveAccount]').attr("checked", true);
        formObj.password.value=passwd;
        formObj.savePasswd.checked = true;
        formObj.password.focus();
        switch (messageArray[0]) {
          case '2':							// cm1work delete 2 line
            formObj.cm1.checked = true;
          case '1':
            document.getElementById('OKPuser').focus();
            break;
          case '3':
            document.getElementById('OKBizuser').focus();
            break;
          default :
            formObj.password.focus();
            break;
        }  // end of switch
      } else {
        formObj.password.focus();
//      $(":password").eq(tabName).focus();
      }
    }   // end if of personal of business type

    door = messageArray[1];
    key = passwd;
  } else {  // without cookie of mailid/password
    formObj.mailid.focus();
    //$(":text").eq(tabName).focus();
    door = '';
    key = '';
  }
  return savePasswdFlag;
}

function personalflashit(){
  document.getElementById("personalMessage").style.color = (document.getElementById("personalMessage").style.color == "red") ? "black" : "red";
}

function businessflashit(){
  document.getElementById("businessMessage").style.color = (document.getElementById("businessMessage").style.color == "red") ? "black" : "red";
}

function getErrMessage(errNo, lang) {
  switch (errNo) {
    case "01021":
    case "01023":
    case "01026":
    case "01029":
    case "01030":
    case "01031":
    case "01032":
    case "01038":
    case "01100":
    case "01101":
    case "01102":
    case "01103":
    case "01104":
    case "01106":
    case "01200":
    case "01201":
    case "01202":
    case "01203":
    case "01204":
    case "01205":
    case "01206":
    case "01208":
      msg = "<blink>系統錯誤(" + errNo + ")，請稍後再試</blink>";
      en_msg = "<blink>System Error(" + errNo + "). Please try again later.</blink>";
      break;
    case "01022":
    case "01044":
      msg = "<blink>帳號或密碼錯誤</blink>";
      en_msg = "<blink>Account/Password Error</blink>";
      break;
    case "01024":
      msg = "<blink>此帳號因登入錯誤次數過多,系統已自動鎖住,請稍後再試</blink>";
      en_msg = "<blink>This account is locked dueue to too many times of login fail. Please try again later.</blink>";
      break;
    case "01025":
    case "01040":
      msg = "<blink>系統維護中(" + errNo + ")</blink>";
      en_msg = "<blink>System maintenance("+ errNo + ")</blink>";
      if (errNo == "01040") showComment();
      break;
    case "01027":
      msg = "<blink>登入錯誤次數過多,請稍後再試</blink>";
      en_msg = "<blink>Too many times of login fail. Please try again later.</blink>";
      break;
    case "01028":
      msg = "<blink>Email帳號不存在</blink>";
      en_msg = "<blink>Email Account does not exist.</blink>";
      break;
    case "01037":
      msg = "<blink>此信箱帳號已被停權</blink>";
      en_msg = "<blink>Email Account has been suspended.</blink>";
      break;
    case "01039":
      msg = "<blink>目前系統負載過重，請稍後再登入</blink>";
      en_msg = "<blink>System overload. Please try again later.</blink>";
      break;
    case "01045":
      msg = "<blink>非台灣IP禁止登入 HiNet網頁信箱</blink>";
      en_msg = "<blink>Foreign IP is forbidden logining HiNet WebMail.</blink>";
      break;
    case "01207":
    case "01209":
      msg = "<blink>輸入帳號格式錯誤</blink>";
      en_msg = "<blink>Account format error</blink>";
      break;
    case "01210":
      msg = "<blink>驗證碼錯誤次數過多,請重新登入</blink>";
      en_msg = "<blink>Too many times of verification fail. Please re-login later.</blink>";
      break;
    case "01211":
      msg = "<blink>重寄次數太多,請重新登入</blink>";
      en_msg = "<blink>Too many times of resending verifaication mail. Please re-login later.</blink>";
      break;
    default:
      msg = "<blink>系統錯誤，請稍後再試</blink>";
      en_msg = "<blink>System Error. Please try again later.</blink>";
  }//end switch
  if(lang == "en")	return	en_msg;
  return msg;
}

function showMessageAndGetCookie(){
  //參數初始化
  var messagecode="";
  var passParam="";
  var errCode="";
  var errForm="";
  var personalMessage = document.getElementById('personalMessage');
  var businessMessage = document.getElementById("businessMessage");

  if(window.location.search != "") {
    messagecode = window.location.search;
    passParam = messagecode.split('&');
    errForm = passParam[0].split('=');
    errCode = passParam[1].split('=');
    if(errForm[1] == "personal") {//個人用戶
      personalMessage.innerHTML = getErrMessage(errCode[1], $(" form[name=personal] > input[name=lang]").val());
      setInterval("personalflashit()", 500);
      changeTab("personal");
      var isSavePW = checkCookie('personal');
	  if (!isSavePW) showEye('Puser');
      eval(document.personal.mailid.select());
    }//end if
    else {//企業用戶或不可判斷的類型
      if(errForm[1] == "business") {
          if (errCode[1] !=0) {
              businessMessage.innerHTML = getErrMessage(errCode[1], $(" form[name=business] > input[name=lang]").val());
              setInterval("businessflashit()", 500);
          }
        changeTab("business");
        var isSavePW = checkCookie('business');
  	    if (!isSavePW) showEye('Bizuser');
        eval(document.business.mailid.select());
      }//end if
      else {//不可判斷的類型
        changeTab("personal");
        var isSavePW = checkCookie('personal');
  	    if (!isSavePW) showEye('Puser');
      }//end else
    }//end else
  }//end if(window.location.search != "")
  else {
    //personalMessage.innerHTML = "請輸入帳號和密碼";
    //businessMessage.innerHTML = "請輸入EMAIL和密碼";
    checkCookieEnable();checkCookie();
  }
}

function switchSavePasswd(formObj)
{
  if(!formObj.saveAccount.checked) {
      formObj.savePasswd.checked=false;
  }
}

function switchSaveAccount(formObj)
{
  if(formObj.savePasswd.checked) {
      formObj.saveAccount.checked=true;
  }
}

function showEye(myTarget) {
	$("#pwEye"+myTarget).show();
}

function toggleEye(myTarget) {
	var passInput = $("#pass"+myTarget);
  	if (passInput.attr("type") === "password") {
		passInput.attr("type", "text");
	} else {
	    passInput.attr("type", "password");
	}	
  	
  	var pwEye = $("#pwEye"+myTarget);
  	if (pwEye.hasClass("glyphicon-eye-close")) {
  		pwEye.removeClass("glyphicon-eye-close").addClass("glyphicon-eye-open");
  	} else {
  		pwEye.removeClass("glyphicon-eye-open").addClass("glyphicon-eye-close");
  	}
}

