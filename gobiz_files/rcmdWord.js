var RcmdServerGET="/user/search/autoComplete.do?wordCount=15&rcmdWord=";
var RcmdServerPOST="/user/search/autoComplete.do";

var _event;
var RepiaData = null;
RepiaData = new repiaData();

/************************************************
 Web Browser Function
************************************************/
var browserType = checkBrowser();
// 브라우져 유형 확인
function checkBrowser()
{
	// alert(navigator.userAgent);
	if (navigator.userAgent.toUpperCase().indexOf("MSIE") != -1) return "IE";
	else if (navigator.userAgent.toUpperCase().indexOf("MOZILLA") != -1) return "FF";
	else return null;
}

function repiaData()
{
	this.browser = getBrowser();
	// this.segments = null;
	// this.gnb = null;
	// this.rkwd = null;
	// this.weather = null;
	// this.stock = null;
}

function getBrowser()
{
	var browser = { agent: null, opera: false, msie: false, firefox: false, netscape: false, safari: false, version: false };
	var ua = window.navigator.userAgent.toLowerCase();
	// var agent="";
	// var version="";

	if (ua.match("opera"))
	{
		browser.agent = "opera";
		browser.opera = true;
		browser.version = trim(ua.split("opera")[1]);
	}
	else if (ua.match("msie"))
	{
		browser.agent = "msie";
		browser.msie = true;
		// alert("ua:"+ ua.split("msie")[1].split(";")[0] );
		browser.version = ua.split("msie")[1].split(";")[0];//trim(ua.split("msie")[1].split(";")[0]);
	}
	else if (ua.match("firefox"))
	{
		browser.agent = "firefox";
		browser.firefox = true;
		// alert("ua:"+ua);
		browser.version = ua.split("firefox")[1].split("/")[1];//trim(ua.split("firefox")[1].split("/")[1]);
		// alert("ua:"+ua);
	}
	else if (ua.match("netscape"))
	{
		browser.agent = "netscape";
		browser.netscape = true;
		browser.version = trim(ua.split("netscape")[1].split("/")[1]);
	}
	else if (ua.match("safari"))
	{
		browser.agent = "safari";
		browser.safari = true;
		browser.version = ua.split("safari")[1].split("/")[1];
		// browser.version = trim(ua.split("safari")[1].split("/")[1]);
	}
	// alert("agent:" + browser.agent);
	return browser;
}

/************************************************
  Event Function
************************************************/
//add Onclick 함수추가
function addOnclick(obj, str)
{
	obj.onclick = function()
	{
		eval(str);
		return false;
	};
}

// 이벤트 추가
function addEvent(obj, objFun)
{
	if(browserType == "IE")
	{
		obj.onclick = objFun;
	}
	else if (obj.addEventListener)
	{
		obj.addEventListener('click', objFun, false);
	}
	else if (obj.attachEvent)
	{
		obj.attachEvent('click', objFun);
	}
}

// 이벤트 제거
function removeEvent(obj, objFun)
{
	if(browserType == "IE")
	{
		obj.onclick = "";
	}
	else if (obj.addEventListener)
	{
		obj.removeEventListener('click', objFun, false);
	}
	else if (obj.attachEvent)
	{
		obj.removeEventListener('click', objFun);
	}
}

/************************************************
 Cookie Function
************************************************/
function argsTest(name, value)
{
	// arguments 내장 함수는 각 function 마다 고유하게 발생합니다.
	// 일종의 function 객체로 보시면 됩니다. 따라서 arguments를 호출 시엔
	// 반드시 함수명.arguments로 호출해야함. 또한 length 속성도 가지고 있음.

	var argsVal = argsTest.arguments;
	var argsLeng = argsTest.arguments.length;

	alert(argsVal[2] + "\n토탈 args의 개수: " + argsLeng);
}

// 쿠키를 저장하는 함수 정의
function saveCookie(name, value)
{
	var argsVal = saveCookie.arguments;
	var argsLeng = saveCookie.arguments.length;

	// 각 쿠키 옵션에 해당하는 파람(아규먼트)들이 있는지 검사합니다.
	var tempExp = (argsLeng>2)?argsVal[2]:null;
	var tempPath = (argsLeng>3)?argsVal[3]:null;
	var tempDomain = (argsLeng>4)?argsVal[4]:null;
	var fixExp = new Date();
	fixExp.setTime(fixExp.getTime() + 1000*24*60*60);

	var str = name + "=" + escape(value);

	// alert("saveCookie:[" + str + "]");

	str += ((tempExp == null)?(";expires=" + fixExp.toGMTString()):(";expires=" + tempExp.toGMTString()));
	str += ((tempPath == null)?"":(";path=" + tempPath));
	str += ((tempDomain == null)?"":(";domain=" + tempDomain));

	document.cookie = str;
	// location.reload();
}

function readCookie (name)
{
	str = document.cookie;
	start = str.indexOf(name);
	if(start == -1)
		return "";
	start = start + name.length + 1;
	end = str.indexOf(";", start);
	if(end == -1)
		end = str.length;
	str = str.substring(start, end);
	return unescape(str);
}

// 쿠키의 유효 기간을 만료 시키는 함수.
function deleteCookie(name)
{
	var expDate = new Date();
	expDate.setTime(expDate.getTime()-1);

	var cookieVal = readCookie(name);
	if(cookieVal != null)
	{
		saveCookie(name, cookieVal, expDate);
	}
	// location.reload();
}

/************************************************
  Encoding Function
************************************************/
/* 영어인지 체크 */
function isEngStr( englishChar )
{
	if ( englishChar == null ) return false ;
	for( var i=0; i < englishChar.length;i++)
	{
		var c=englishChar.charCodeAt(i);
		if( !( (  0x61 <= c && c <= 0x7A ) || ( 0x41 <= c && c <= 0x5A ) ) )
		{
			return false ;
		}
	}
	return true ;
}

/* 한글인지 체크 */
function isKorStr( str)
{
	if( str == null) return false;
	for(var i=0;i<str.length;i++)
	{
		var c=str.charCodeAt(i);
		if( !((0xAC00 <=c && c<=0xD7A3) || (0x3131 <=c && c<=0x318E) ))
		{
			return false;
		}
	}
	return true;
}

var en_h = "rRseEfaqQtTdwWczxvg";
var reg_h = "[" + en_h + "]";

var en_b =
{
	k:0,o:1,i:2,O:3,j:4,p:5,u:6,P:7,h:8,hk:9,ho:10,hl:11,y:12,n:13,nj:14,np:15,nl:16,b:17,m:18,ml:19,l:20
};

var reg_b = "hk|ho|hl|nj|np|nl|ml|k|o|i|O|j|p|u|P|h|y|n|b|m|l";

var en_f = {
  "":0,r:1,R:2,rt:3,s:4,sw:5,sg:6,e:7,f:8,fr:9,fa:10,fq:11,ft:12,fx:13,fv:14,fg:15,a:16,q:17,qt:18,t:19,T:20,d:21,w:22,c:23,z:24,x:25,v:26,g:27
};

var reg_f = "rt|sw|sg|fr|fa|fq|ft|fx|fv|fg|qt|r|R|s|e|f|a|q|t|T|d|w|c|z|x|v|g|";
var reg_exp = new RegExp("("+reg_h+")("+reg_b+")((?:"+reg_f+")(?=(?:"+reg_h+")(?:"+reg_b+"))|(?:"+reg_f+"))","g");

function toKorean(str)
{ /* 변환갑이 전부 한글이면 변환값 리턴 */
	var rtn="";
	rtn = str.replace(reg_exp,replace);
	// alert("rtn:"+rtn);
	if( isKorStr(rtn) == true) return rtn;
	return str;
}

function replace(str,h,b,f)
{
	return String.fromCharCode(en_h.indexOf(h)*21*28 + en_b[b]*28 + en_f[f] + 44032);
}

/************************************************
  검색어 자동완성 Function
************************************************/
function ac_check__()
{
	var acuse = readCookie("acuse");
	var acuse_=0;
	if(acuse == "" || acuse=="1")
	{
		acuse_=1;
	}
	else
	{
		acuse_=0;
	}

	return acuse_;
	// alert("acuse_=[" + Acuse_ + "], acuse=[" + acuse + "]")
}

var search_promotion = true;
var Td_;
var Ip_;
var TimeOut;
var bak_="",old_="" ;
var ke;

var t_=get_nav_();
var c_=chk_rt_(t_);
var m_on_=0,m_now_=0,s_now_=0,shl_=0,a_now_=0,a_on_=0,arr_on_=0,frm_on_=0 ;
var cn_use_="use_ac" ;

var B_="block",I_="inline",N_="none",UD_="undefined" ;

var qs_ac_list_="";
var qs_ac_ctg_list_="";
var qs_ac_carInfo_="";
var qs_ac_favorite_="";
var qs_ac_real_="";

var qs_ac_id_="";
var qs_q_="";
var qs_m_=0;
var qs_ac_len_=0;
var qs_ac_cnt_list_ = "";

var ke2="", eng="";
var cc_= new Object() ;

// alert("t_:"+t_+"c_:"+c_);
var Acuse_= ac_check__(); /* 검색어 자동 완성 사용 여부 */

function rcmd_default_set(textQt, time)
{
	Ip_ = textQt;
	TimeOut = time;
	// alert("qt:"+Ip_.value)
	bak_=old_= Ip_.value;
}

var g_ie5_=0;
function get_nav_()
{
	var ver=navigator.appVersion ;
	// alert("ver:"+ver);
	// alert("navigator.appName:"+navigator.appName);
	if (navigator.appName.indexOf("Microsoft")!=-1 && ver.indexOf("MSIE 4")==-1 && ver.indexOf("MSIE 3")==-1)
	{
		if (ver.indexOf("MSIE 5.0")!=-1) g_ie5_=1;
		return 1;
	}
	else if (navigator.appName.indexOf("Netscape")!=-1) return 2;
	else if (navigator.appName.indexOf("Safari")!=-1) return 2;
	else if (navigator.appName.indexOf("Chrome")!=-1) return 2;

	else return 0;
}

function chk_rt_(t_)
{
	//if (t_!=1) return 0;
	if (t_ == 0) return 0;
	try
	{
		Td_=document;
	}
	catch (e)
	{
		return 0;
	}
	return 1;
}

if (t_>0 && c_>0)
{
	function wd_()
	{
		// alert(Acuse_);
		if (Acuse_==1) Ip_.autocomplete = "off" ;
		else if (Acuse_==0) Ip_.autocomplete = "on" ;

		Ip_.onclick = req_ipc_ ;
		Ip_.onblur = dis_p_ ;
		Td_.body.onclick = dis_p_;
	}

	var dnc_=0;
	function req_ipc_()
	{
		dnc_=1;
		frm_on_=0;
		req_ac2_(1) ;
	}

	function dis_p_()
	{
		// console.log("dnc_: " + dnc_);
		if (dnc_)
		{
			dnc_=0;
			return ;
		}

		// console.log("arr_on_: " + arr_on_);
		if (arr_on_)
		{
			return ;
		}

		// console.log("frm_on_: " + frm_on_);
		if (frm_on_)
		{
			return ;
		}
		alw=0 ;

		ac_hide_() ;
	}

	function req_ac2_(me)
	{
		if (Ip_.value == "" || Acuse_==0 )
		{
			return ;
		}

		// alert(Acuse_);

		if (a_on_ && dnc_)
		{
			ac_hide_() ;
			return ;
		}

		var o = get_cc_(me) ;
		if (o && o[1][0] != "" ) ac_show_(o[0], o[1], o[2], me) ;
		else reqAC_(me) ;
	}

	var _req_ = null;
	function get_req_()
	{
		if(_req_ && _req_.readyState!=0)
		{
			_req_.abort() ;
		}
		try
		{
			_req_ = new ActiveXObject("Msxml2.XMLHTTP.3.0") ;
		}
		catch (e)
		{
			try
			{
				_req_ = new ActiveXObject("Microsoft.XMLHTTP") ;
			}
			catch (e)
			{
				_req_ = false ;
			}
		}
		if (!_req_ && typeof XMLHttpRequest!=UD_) _req_ = new XMLHttpRequest() ;
		return _req_ ;
	}

	function showAC_()
	{
		if (_req_.readyState==4 && _req_.responseText && _req_.status==200)
		{
			// alert(unescape(_req_.responseText));
			// alert("144411"+_req_.responseText);
			eval(unescape(_req_.responseText)) ;
			// eval(_req_.responseText) ;

			// alert("list: " + qs_ac_list_.length);
			// alert("brand: " + qs_ac_brand_.length);
			// alert("carInfo: " + qs_ac_carInfo_.length);
			// alert("favorite: " + qs_ac_favorite_.length);
			// alert("real: " + qs_ac_real_.length);

			// set_cc_(qs_q_, qs_ac_brand_, qs_ac_carInfo_, qs_ac_favorite_, qs_ac_real_, qs_m_);
			// ac_show_(qs_q_, qs_ac_brand_, qs_ac_carInfo_, qs_ac_favorite_, qs_ac_real_, qs_ac_id_, qs_m_);

			set_cc_(qs_q_, qs_ac_list_, qs_ac_ctg_list_, qs_m_);
			ac_show_(qs_q_, qs_ac_list_, qs_ac_ctg_list_, qs_ac_id_, qs_m_);
		}
	}

	function reqAC_(me)
	{
		var sv ;
		var stripped = "";
		ke=trim_space_(Ip_.value, me) ;
		ke = ke.replace(/ /g, " ") ;
		ke = ke.replace(/\\/g, "") ;
		ke = ke.replace(/\'/g, "") ;
		ke = ke.replace(/&/g, "") ;
		ke = ke.replace(/|/g, "") ;
		ke = ke.replace(/ or /g, "") ;
		ke = ke.replace(/ and /g, "") ;
		ke = ke.replace(/ OR /g, "") ;
		ke = ke.replace(/ AND /g, "") ;
		ke = ke.replace(/ not /g, "") ;
		ke = ke.replace(/@/g,"");
		ke = ke.replace(/</g,"");
		ke = ke.replace(/>/g,"");
		ke = ke.replace(/%/g,"");
		if ((ke == "")||(ke == "or")||(ke == "and")||(ke=="not"))
		{
			ac_hide_() ;
			return ;
		}

		var lastChar = ke.charAt (ke.length - 1);
		// ke2 = ke;//tewst..
		eng = ke;

		if(ke.length >3)
			ke2=toKorean(ke);
		else ke2 = ke;

		ke2=ke;

		// Ip_.value = ke2;//wjchae .. 이렇게 하면 무조건 한글로 변경해버린다..
		// 여기서 ke2가 영어한글이 썩여있으면 사용안한다.. 4바이트이상인것만 toKorean을 사용한다.
		// rcmd리스트에 영어를 많이 추가한다.. 영어로 찾아서 없으면 그때 바꾼걸 사용한다.
		// wjchae .... 여기서 하면되것다.. 길이를 체크하고... 리턴값이..한글만 있어야 하고...
		//sv = RcmdServerGET + ke2;//encodeURIComponent(ke2);
		sv = RcmdServerPOST;

		// alert("sv0->"+ke);
		// alert("sv1->"+ke2);
		// alert("sv2->"+escape(ke2));
		// alert("sv3->"+encodeURIComponent(ke2));

		// alert("qt-utf: "+ java.net.URLEncoder.encode(ke2));
		// var params="wordCount=15&rcmdWord=" + encodeURIComponent(encodeURIComponent(ke2));

		// alert(ke2);
		var params="wordCount=15&rcmdWord=" + encodeURIComponent(encodeURIComponent(ke2));
		// alert("params->"+params);
		_req_ = get_req_() ;
		if (_req_)
		{
			// _req_.open("GET", sv, true);
			_req_.open("POST", sv, true);
			_req_.onreadystatechange = showAC_;
			_req_.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
			// _req_.setRequestHeader("Content-length", params.length);
			// _req_.setRequestHeader("Connection", "close");
		}
		try
		{
			// _req_.send() ;
			_req_.send(params) ;
			// if(ke.length >3) Ip_.value=ke;
		}
		catch (e)
		{
			return 0 ;
		}
	}

/* CARISYOU
	function ac_show_(aq, abrand, acarInfo, afavorite, areal, ai, am)
	{
		var destWinOn=document.getElementById("result_sch");
		// var destWinOff=document.getElementById("autoCompleteToOn");

		var resultWin=document.getElementById("rcmdResult");

		// alert("aq:[" + aq + "]===>IP_.value:[" + Ip_.value + "], trim_space_:[" + trim_space_(Ip_.value, am) + "]");

		if (aq && aq!="" && trim_space_(Ip_.value, am) != eng) return ;//trim_space_(Ip_.value, am)) return ;

		qs_q_ = aq;
		qs_m_ = am;
		qs_ac_brand_ = abrand;
		qs_ac_carInfo_ = acarInfo;
		qs_ac_favorite_ = afavorite;
		qs_ac_real_ = areal;

		qs_ac_id_ = ai ;
		qs_ac_len_ = qs_ac_list_.length;

		var h = 120;

		// alert("favorite: " +afavorite.length);

		print_ac_(destWinOn, resultWin) ;

		if ( (qs_ac_brand_[0]=="" || qs_ac_carInfo_[0]=="") && (qs_m_==1 || qs_m_==2))
		{
			qs_ac_len_=1;
			h=20;
			if(qs_ac_brand_[0]=="" || qs_ac_carInfo_[0]=="") h = h+22;
		}
		// rcmdResult.style.height = h;

		if (qs_ac_len_)
		{
			h+=41;
			a_on_=1;
		}
		else
		{
			a_on_=0;
		}

		destWinOn.width = 290 ;
		destWinOn.height = h ;

		destWinOn.style.display = B_;
		// destWinOff.style.display = N_;

		if (a_on_)
		{
			set_acpos_(0);
			resultWin.scrollTop=0;
			Ip_.onkeydown = ackhl_;
		}
	}
*/

	function my_show_()
	{
		var myQueryWin=document.getElementById("myQuery");
		var resultWin=document.getElementById("rcmdResult");

		resultWin.style.display = N_;
		myQueryWin.style.display = B_;
	}

/* DEFAULT
	function ac_show_(aQuery, aKeywordList, ai, am)
	{
		var myQueryWin=document.getElementById("myQuery");
		myQueryWin.style.display = N_;

		var destWinOn=document.getElementById("result_sch");
		// var destWinOff=document.getElementById("autoCompleteToOn");

		var resultWin=document.getElementById("rcmdResult");

		// alert("aq:[" + aq + "]===>IP_.value:[" + Ip_.value + "], trim_space_:[" + trim_space_(Ip_.value, am) + "]");

		if (aQuery && aQuery!="" && trim_space_(Ip_.value, am) != eng) return ;//trim_space_(Ip_.value, am)) return ;

		qs_q_ = aQuery;
		qs_m_ = am;
		qs_ac_list_ = aKeywordList ;

		qs_ac_id_ = ai ;
		qs_ac_len_ = qs_ac_list_.length;

		var h = 120;

		// alert("favorite: " +afavorite.length);

		print_ac_(destWinOn, resultWin) ;

		if ( qs_ac_list_[0]=="" && (qs_m_==1 || qs_m_==2))
		{
			qs_ac_len_=1;
			h=20;
			if(qs_ac_list_[0]=="" || qs_ac_carInfo_[0]=="") h = h+22;
		}
		// rcmdResult.style.height = h;

		if (qs_ac_len_)
		{
			h+=41;
			a_on_=1;
		}
		else
		{
			a_on_=0;
		}

		destWinOn.width = 290 ;
		destWinOn.height = h ;

		destWinOn.style.display = B_;
		// destWinOff.style.display = N_;

		if (a_on_)
		{
			set_acpos_(0);
			resultWin.scrollTop=0;
			Ip_.onkeydown = ackhl_;
		}
	}
*/
	function ac_show_(aQuery, aKeywordList, aCtgList, ai, am)
	{
		var myQueryWin=document.getElementById("myQuery");
		myQueryWin.style.display = N_;

		var destWinOn=document.getElementById("result_sch");
		// var destWinOff=document.getElementById("autoCompleteToOn");

		var resultWin=document.getElementById("rcmdResult");

		// alert("aq:[" + aq + "]===>IP_.value:[" + Ip_.value + "], trim_space_:[" + trim_space_(Ip_.value, am) + "]");

		if (aQuery && aQuery!="" && trim_space_(Ip_.value, am) != eng) return ;//trim_space_(Ip_.value, am)) return ;

		qs_q_ = aQuery;
		qs_m_ = am;
		qs_ac_list_ = aKeywordList ;
		qs_ac_ctg_list_ = aCtgList;

		qs_ac_id_ = ai ;
		qs_ac_len_ = qs_ac_list_.length;

		var h = 120;

		// alert("favorite: " +afavorite.length);

		print_ac_(destWinOn, resultWin) ;

		if ( qs_ac_list_[0]=="" && (qs_m_==1 || qs_m_==2))
		{
			qs_ac_len_=1;
			h=20;
			if(qs_ac_list_[0]=="" || qs_ac_ctg_list_[0]=="") h = h+22;
		}
		// rcmdResult.style.height = h;

		if (qs_ac_len_)
		{
			h+=41;
			a_on_=1;
		}
		else
		{
			a_on_=0;
		}

		destWinOn.width = 290 ;
		destWinOn.height = h ;

		destWinOn.style.display = B_;
		// destWinOff.style.display = N_;

		if (a_on_)
		{
			set_acpos_(0);
			resultWin.scrollTop=0;
			Ip_.onkeydown = ackhl_;
		}
	}

	function set_acpos_(v)
	{
		a_now_ = v;
		setTimeout('set_ahl_();', 10);
	}

	function set_ahl_()
	{
		// return;
		if (!a_on_) return;
		var o1, o2;

		try
		{
			for(var i=0;  i<qs_ac_len_; i++)
			{
				// alert('ac' + (i+1) + '_' + qs_ac_len_);
				o1 = document.getElementById('ac' + (i+1) + '_');
				if ((i+1) == a_now_) o1.style.backgroundColor = '#D3D3D3';
				else o1.style.backgroundColor = '';
				// alert(o1.style.backgroundColor);
			}
		}
		catch(e)
		{

		}
	}

	var max_row_=4;

	function ackhl_(e)
	{
		var resultWin=document.getElementById("rcmdResult");
		var o1, o2 ;
		var key=_event.keyCode;

		if(!document.all)
		{
			key=e.which;
		}

		if (key==39) { /* 오른쪽 화살표  */
			req_ac2_(1) ;
		}

		/* 아래쪽 화살표, 탭키, shift key */
		// if ( key==40 || (key==9 && !e.shiftKey)) {
		// alert(key);
		if ( key==40 )
		{
			if (m_on_) return ;
			if (!a_on_)
			{
				req_ac2_(1) ;
				return ;
			}

			if (a_now_ < qs_ac_len_)
			{
				if (a_now_ == 0) bak_ = Ip_.value ;
				a_now_++ ;

				if (a_now_ > max_row_) resultWin.scrollTop = parseInt((a_now_-1)/max_row_)*max_row_*20 ;

				o1 = document.getElementById('ac' + a_now_ + '_') ;
				o2 = document.getElementById('acq' + a_now_ + '_') ;
				old_ = Ip_.value = o2.innerHTML;

				Ip_.focus() ;
				set_ahl_() ;
				_event.returnValue = false;
			}
		}

		// if (a_on_ && (key==38 || (key==9 && e.shiftKey))) {
		if (a_on_ && key==38 )
		{
			if (!a_on_) return ;
			if (a_now_ <= 1)
			{
				ac_hide_() ;
				old_ = Ip_.value = bak_ ;
			}
			else
			{
				a_now_-- ;
				if ((qs_ac_len_-a_now_)+1 > max_row_) resultWin.scrollTop = (qs_ac_len_-(parseInt((qs_ac_len_-a_now_)/max_row_)+1)*4)*20 ;

				o1 = document.getElementById('ac'+ a_now_ + '_') ;
				o2 = document.getElementById('acq' + a_now_ + '_') ;
				old_ = Ip_.value = o2.innerHTML;

				Ip_.focus() ;
				set_ahl_() ;
				_event.returnValue = false ;
			}
		}
	}

/* 검색어 자동완성 HTML 생성 */
/* CARISYOU
	function print_ac_(destWin, resultWin)
	{
		// alert("print_ac_()");
		// alert("brand: " + qs_ac_brand_.length);
		// alert("carInfo: " + qs_ac_carInfo_.length);

		if (qs_ac_brand_.length==0 || qs_ac_brand_[0] == "")
		{
			// alert("brand: " + qs_ac_brand_.length);
			// resultWin.innerHTML = get_ac0_() ;
			$('#mainSearchBrand').hide();
		}
		else
		{
			// alert("brand: " + qs_ac_brand_.length);
			// alert(resultWin.innerHTML);
			// alert("......c");
			// resultWin.innerHTML = get_aclist_carIsYou_brand();
			// alert(get_aclist_carIsYou_brand());
			document.getElementById('searchBrandList').innerHTML = get_aclist_carIsYou_brand();
			$('#mainSearchBrand').show();
			// alert('brand end');
		}

		if (qs_ac_carInfo_.length==0 || qs_ac_carInfo_[0] == "")
		{
			// alert("brand: " + qs_ac_brand_.length);
			// resultWin.innerHTML = get_ac0_() ;
			$('#mainSearchCar').hide();
		}
		else
		{
			// alert("carInfo: " + qs_ac_carInfo_.length);

			document.getElementById('searchCarList').innerHTML = get_aclist_carIsYou_carInfo();
			$('#mainSearchCar').show();

			// alert('car end');
		}

		// document.getElementById('searchFavoriteList').innerHTML = get_aclist_favorite();
		// alert(document.getElementById('searchFavoriteList').innerHTML);

		// document.getElementById('searchRealList').innerHTML = get_aclist_favoriteReal();
		// alert(document.getElementById('searchRealList').innerHTML);

		destWin.style.display = B_;
		setTimeout('set_ahl_();', 30) ;
	}
*/

/* DEFAULT
	function print_ac_(destWin, resultWin)
	{
		// alert("print_ac_()");
		// alert("brand: " + qs_ac_brand_.length);
		// alert("carInfo: " + qs_ac_carInfo_.length);

		// alert(qs_ac_list_.length);
		if (qs_ac_list_.length==0 || qs_ac_list_[0] == "")
		{
			// alert("brand: " + qs_ac_brand_.length);
			// resultWin.innerHTML = get_ac0_() ;
			document.getElementById('keyword_list').innerHTML = get_ac0_();
		}
		else
		{
			// alert("brand: " + qs_ac_brand_.length);
			// alert(resultWin.innerHTML);
			// alert("......c");
			// resultWin.innerHTML = get_aclist_carIsYou_brand();
			// alert(get_aclist_carIsYou_brand());
			document.getElementById('keyword_list').innerHTML = get_aclist_();

			$('#rcmdResult').show();
			// alert('brand end');
		}

		// document.getElementById('searchFavoriteList').innerHTML = get_aclist_favorite();
		// alert(document.getElementById('searchFavoriteList').innerHTML);

		// document.getElementById('searchRealList').innerHTML = get_aclist_favoriteReal();
		// alert(document.getElementById('searchRealList').innerHTML);

		destWin.style.display = B_;
		resultWin.style.display = B_;

		// alert(destWin.style.display);
		// alert(resultWin.style.display);

		setTimeout('set_ahl_();', 30) ;
	}
*/

	function print_ac_(destWin, resultWin)
	{
		// alert("print_ac_()");
		// alert("brand: " + qs_ac_brand_.length);
		// alert("carInfo: " + qs_ac_carInfo_.length);

		// alert(qs_ac_list_.length);
		if (qs_ac_list_.length==0 || qs_ac_list_[0] == "")
		{
			// alert("brand: " + qs_ac_brand_.length);
			// resultWin.innerHTML = get_ac0_() ;
			document.getElementById('keyword_list').innerHTML = get_ac0_();
		}
		else
		{
			// alert("brand: " + qs_ac_brand_.length);
			// alert(resultWin.innerHTML);
			// alert("......c");
			// resultWin.innerHTML = get_aclist_carIsYou_brand();
			// alert(get_aclist_carIsYou_brand());
			document.getElementById('keyword_list').innerHTML = get_aclist_();

			$('#rcmdResult').show();
			// alert('brand end');
		}

		if (qs_ac_ctg_list_.length==0 || qs_ac_ctg_list_[0] == "")
		{
			// alert(qs_ac_ctg_list_.length);
			// alert("brand: " + qs_ac_brand_.length);
			// resultWin.innerHTML = get_ac0_() ;
			$('#result_category').hide();
		}
		else
		{
			// alert("carInfo: " + qs_ac_carInfo_.length);

			$('#result_category ul').html(get_aclist_ctg());
			$('#result_category').show();

			// alert('car end');
		}

		// document.getElementById('searchFavoriteList').innerHTML = get_aclist_favorite();
		// alert(document.getElementById('searchFavoriteList').innerHTML);

		// document.getElementById('searchRealList').innerHTML = get_aclist_favoriteReal();
		// alert(document.getElementById('searchRealList').innerHTML);

		destWin.style.display = B_;
		resultWin.style.display = B_;

		// alert(destWin.style.display);
		// alert(resultWin.style.display);

		setTimeout('set_ahl_();', 30) ;
	}

	function get_aclist_()
	{
		var d="";
		var ds="";
		var s="";
		var l=0;
		var dscnt = 0;
		var linkUrl="";
		if (qs_ac_list_[0] != "")
		{
			for (var i=0, j=0; i<qs_ac_len_; i++, j++)
			{
				d = qs_ac_list_[i];
				ds = qs_ac_list_[i];
				l = js_strlen_(d);

				if (l > 40) ds = js_substring_(d, 0, 40) + "..." ;
				ds = js_highlight(ds, qs_q_, qs_q_, 0);

				linkUrl = "javascript:get_re_search2('" + d + "')";
				s += "\t\t\t\t\t\t\t\t\t\t\t<li id=\"ac" + (j+1) + "_\" onmouseover=\"set_acpos_('" + (j+1) + "');\" onmouseout=\"set_acpos_(0);\" onclick=\"set_acinput_('" + (j+1) + "')\"><a href=\"" + linkUrl + "\">" + ds + "</a></li>";
				s += "\t\t\t\t\t\t\t\t\t\t\t<li style=\"display:none\"><span id=\"acq" + (j+1) + "_\" >" + d + "</span></li>";
			}
		}

		return s ;
	}

	function get_aclist_ctg()
	{
		var d="";
		var ds="";

		var ctgCode="";
		var upperCtgCode="";
		var linkUrl="";

		var addComment="";
		var l=0;
		var s="" ;
		var dscnt = 0;

		// alert(qs_ac_ctg_list_.length);

		if (qs_ac_ctg_list_[0] != "")
		{
			for (i=0, j=qs_ac_list_.length; i<qs_ac_ctg_list_.length; i++, j++)
			{
				ds = d = qs_ac_ctg_list_[i++];
				l = js_strlen_(d);

				if (l > 100)
					ds = js_substring_(d, 0, 100) + "..." ;
				ds = js_highlight(ds, qs_q_, qs_q_, 0);
				ctgCode = qs_ac_ctg_list_[i++];
				upperCtgCode = qs_ac_ctg_list_[i++];
				addComment = qs_ac_ctg_list_[i];

				linkUrl = "/user/goods/frontGoodsList.do?ctgryCode=" + ctgCode + "&upperCode=" + upperCtgCode;
				s += "\t\t\t\t\t\t\t\t\t\t\t<li id=\"ac" + (j+1) + "_\" onmouseover=\"set_acpos_('" + (j+1) + "');\" onmouseout=\"set_acpos_(0);\" style=\"this.style.backgroundColor=''\"><ul class=\"category_list\"><li><a href=\"" + linkUrl + "\">" + ds + "</a></li></ul></li>";
				s += "\t\t\t\t\t\t\t\t\t\t\t<li style=\"display:none\"><span id=\"acq" + (j+1) + "_\" >" + d + "</span></li>";
			}
		}
		return s;
	}

	/* 브랜드 출력 */
	function get_aclist_carIsYou_brand()
	{
		var d="";
		var ds="";
		var imgUrl="";
		var linkUrl="";
		var addComment="";
		var l=0;
		var s="" ;
		var dscnt = 0;

		if (qs_ac_brand_[0] != "")
		{
			for (i=0, j=0; i<qs_ac_brand_.length; i++, j++)
			{
				ds = d = qs_ac_brand_[i++];
				l = js_strlen_(d);

				if (l > 40)
					ds = js_substring_(d, 0, 40) + "..." ;
				ds = js_highlight(ds, qs_q_, qs_q_, 0);

				imgUrl = qs_ac_brand_[i++];
				linkUrl = qs_ac_brand_[i++];
				addComment = qs_ac_brand_[i];

				if(addComment=='null')
				{
					if(imgUrl=='null')
					{
						s += "\t\t\t\t\t\t\t\t\t<li id=\"ac" + (j+1) + "_\" onmouseover=\"set_acpos_('" + (j+1) + "');\" onmouseout=\"set_acpos_(0);\" onclick=\"set_acinput_('" + (j+1) + "')\" style=\"this.style.backgroundColor=''\"><a href=\"" + linkUrl + "\" data-ajax=\"false\"><img src=\"\" alt=\"\"/>" + ds + "</a></li>";
						s += "\t\t\t\t\t\t\t\t\t<li style=\"display:none\"><span id=\"acq" + (j+1) + "_\" >" + d + "</span></li>";
					}
					else
					{
						s += "\t\t\t\t\t\t\t\t\t<li id=\"ac" + (j+1) + "_\" onmouseover=\"set_acpos_('" + (j+1) + "');\" onmouseout=\"set_acpos_(0);\" onclick=\"set_acinput_('" + (j+1) + "')\" style=\"this.style.backgroundColor=''\"><a href=\"" + linkUrl + "\" data-ajax=\"false\"><img src=\"" + imgUrl + "\" alt=\"\"/>" + ds + "</a></li>";
						s += "\t\t\t\t\t\t\t\t\t<li style=\"display:none\"><span id=\"acq" + (j+1) + "_\" >" + d + "</span></li>";
					}
				}
				else
				{
					if(imgUrl=='null')
					{
						s += "\t\t\t\t\t\t\t\t\t<li id=\"ac" + (j+1) + "_\" onmouseover=\"set_acpos_('" + (j+1) + "');\" onmouseout=\"set_acpos_(0);\" onclick=\"set_acinput_('" + (j+1) + "')\" style=\"this.style.backgroundColor=''\"><a href=\"" + linkUrl + "\" data-ajax=\"false\"><img src=\"\" alt=\"\"/>" + ds + " " + addComment + "</a></li>";
						s += "\t\t\t\t\t\t\t\t\t<li style=\"display:none\"><span id=\"acq" + (j+1) + "_\" >" + d + "</span></li>";
					}
					else
					{
						s += "\t\t\t\t\t\t\t\t\t<li id=\"ac" + (j+1) + "_\" onmouseover=\"set_acpos_('" + (j+1) + "');\" onmouseout=\"set_acpos_(0);\" onclick=\"set_acinput_('" + (j+1) + "')\" style=\"this.style.backgroundColor=''\"><a href=\"" + linkUrl + "\" data-ajax=\"false\"><img src=\"" + imgUrl + "\"/>" + ds + " " + addComment + "</a></li>";
						s += "\t\t\t\t\t\t\t\t\t<li style=\"display:none\"><span id=\"acq" + (j+1) + "_\" >" + d + "</span></li>";
					}
				}
			}
		}
		return s ;
	}

	/* 차종 출력 */
	function get_aclist_carIsYou_carInfo()
	{
		var d="";
		var ds="";
		var imgUrl="";
		var linkUrl="";
		var addComment="";
		var l=0;
		var s="" ;
		var dscnt = 0;

		if (qs_ac_carInfo_[0] != "")
		{
			for (i=0, j=0; i<qs_ac_carInfo_.length; i++, j++)
			{
				ds = d = qs_ac_carInfo_[i++];
				l = js_strlen_(d);

				if (l > 40)
					ds = js_substring_(d, 0, 40) + "..." ;
				ds = js_highlight(ds, qs_q_, qs_q_, 0);

				imgUrl = qs_ac_carInfo_[i++];
				linkUrl = qs_ac_carInfo_[i++];
				addComment = qs_ac_carInfo_[i];

				if(addComment=='null')
				{
					if(imgUrl=='null')
					{
						s += "\t\t\t\t\t\t\t\t\t<li id=\"ac" + (j+1) + "_\" onmouseover=\"set_acpos_('" + (j+1) + "');\" onmouseout=\"set_acpos_(0);\" onclick=\"set_acinput_('" + (j+1) + "')\" style=\"this.style.backgroundColor=''\"><a href=\"" + linkUrl + "\" data-ajax=\"false\"><div class=\"thumb\"><img src=\"\" alt=\"\"/></div><div class=\"title_con\"><h4>" + ds + "</h4></div></a></li>";
						s += "\t\t\t\t\t\t\t\t\t<li style=\"display:none\"><span id=\"acq" + (j+1) + "_\" >" + d + "</span></li>";
					}
					else
					{
						s += "\t\t\t\t\t\t\t\t\t<li id=\"ac" + (j+1) + "_\" onmouseover=\"set_acpos_('" + (j+1) + "');\" onmouseout=\"set_acpos_(0);\" onclick=\"set_acinput_('" + (j+1) + "')\" style=\"this.style.backgroundColor=''\"><a href=\"" + linkUrl + "\" data-ajax=\"false\"><div class=\"thumb\"><img src=\"" + imgUrl + "\" alt=\"\"/></div><div class=\"title_con\"><h4>" + ds + "</h4></div></a></li>";
						s += "\t\t\t\t\t\t\t\t\t<li style=\"display:none\"><span id=\"acq" + (j+1) + "_\" >" + d + "</span></li>";
					}
				}
				else
				{
					if(imgUrl=='null')
					{
						s += "\t\t\t\t\t\t\t\t\t<li id=\"ac" + (j+1) + "_\" onmouseover=\"set_acpos_('" + (j+1) + "');\" onmouseout=\"set_acpos_(0);\" onclick=\"set_acinput_('" + (j+1) + "')\" style=\"this.style.backgroundColor=''\"><a href=\"" + linkUrl + "\" data-ajax=\"false\"><div class=\"thumb\"><img src=\"\" alt=\"\"/></div><div class=\"title_con\"><h4>" + ds + "</h4><p>" + addComment + "</p></div></a></li>";
						s += "\t\t\t\t\t\t\t\t\t<li style=\"display:none\"><span id=\"acq" + (j+1) + "_\" >" + d + "</span></li>";
					}
					else
					{
						s += "\t\t\t\t\t\t\t\t\t<li id=\"ac" + (j+1) + "_\" onmouseover=\"set_acpos_('" + (j+1) + "');\" onmouseout=\"set_acpos_(0);\" onclick=\"set_acinput_('" + (j+1) + "')\" style=\"this.style.backgroundColor=''\"><a href=\"" + linkUrl + "\" data-ajax=\"false\"><div class=\"thumb\"><img src=\"" + imgUrl + "\" alt=\"\"/></div><div class=\"title_con\"><h4>" + ds + "</h4><p>" + addComment + "</p></div></a></li>";
						s += "\t\t\t\t\t\t\t\t\t<li style=\"display:none\"><span id=\"acq" + (j+1) + "_\" >" + d + "</span></li>";
					}
				}
			}
		}
		return s ;
	}

	function get_aclist_favorite()
	{
		var d="";
		var ds="";
		var imgUrl="";
		var linkUrl="";
		var addComment="";
		var l=0;
		var s="" ;
		var dscnt = 0;

		// alert("favorite: " + qs_ac_favorite_.length);
		if (qs_ac_favorite_[0] != "")
		{
			for (i=0, j=0; i<qs_ac_favorite_.length; i++, j++)
			{
				ds = d = qs_ac_favorite_[i];
				l = js_strlen_(d);

				if (l > 40)
					ds = js_substring_(d, 0, 40) + "..." ;
				ds = js_highlight(ds, qs_q_, qs_q_, 0);
				s += "<a href=\"javascript:;\" onclick=\"get_re_search('" + d + "')\">" + ds + "</a>  ";
				if(i<(qs_ac_favorite_.length-1))
					s += " | ";
			}
		}
		return s ;
	}

	function get_aclist_favoriteReal()
	{
		var d="";
		var ds="";
		var imgUrl="";
		var linkUrl="";
		var addComment="";
		var l=0;
		var s="" ;
		var dscnt = 0;

		if (qs_ac_real_[0] != "")
		{
			for (i=0, j=0; i<qs_ac_real_.length; i++, j++)
			{
				ds = d = qs_ac_real_[i];
				l = js_strlen_(d);

				if (l > 40)
					ds = js_substring_(d, 0, 40) + "..." ;
				ds = js_highlight(ds, qs_q_, qs_q_, 0);

				s += "<a href=\"javascript:;\" onclick=\"get_re_search('" + d + "')\">" + ds + "</a>  ";

				if(i<(qs_ac_real_.length-1))
					s += " | ";
			}
		}
		return s ;
	}

	function js_highlight(s, d, eq, is_suf)
	{
		var ret="";
		if (!is_suf)
		{
			ret=js_makehigh_pre(s, d);
			if (ret=="") ret=js_makehigh_pre(s, eq);
		}
		else
		{
			ret=js_makehigh_suf(s, d);
			if (ret=="") ret=js_makehigh_suf(s, eq);
		}
		if (ret=="") return s; else return ret;
	}

	function js_makehigh_pre(s, t)
	{
/*
		var d="";
		var s1=s.replace(/ /g, "");
		var t1=t.replace(/ /g, "");
		t1=t1.toLowerCase();
		if(t1==s1.substring(0, t1.length))
		{
			d="<strong>";
			for (var i=0,j=0; j<t1.length; i++)
			{
				if (s.substring(i, i+1)!=" ") j++;
				d+=s.substring(i, i+1);
			}
			d+="</strong>" +s.substring(i, s.length);
		} return d;
*/
		var result="";
		var s1 = s.toLowerCase();
		var startIndex = s1.indexOf(t.toLowerCase());
		if (startIndex != -1)
		{
			var endIndex = startIndex + t.length;
			result = s.substring(0, startIndex) + "<span class=\"highlight\">" + s.substring(startIndex, endIndex) + "</span>" + s.substring(endIndex);
			return result;
		}
		else return s;
	}

	function js_makehigh_suf(s, t)
	{
		var d="";
		var s1=s.replace(/ /g, "");
		var t1=t.replace(/ /g, "");
		t1=t1.toLowerCase();
		if (t1==s1.substring(s1.length-t1.length))
		{
			for (var i=0,j=0; j<s1.length-t1.length; i++)
			{
				if (s.substring(i, i+1)!=" ") j++;
				d+=s.substring(i, i+1); }

			d+="<span class=\"highlight\">";
			for (var k=i,l=0; l<t1.length; k++)
			{
				if (s.substring(k, k+1)!=" ") l++;
				d+=s.substring(k, k+1); } d+="</span>";
		}
		return d;
	}

   function set_acinput_(v) {
     if (!a_on_) return ;
     var o = document.getElementById('acq' + a_now_ + '_') ;
     old_ = Ip_.value = o.innerHTML;
     Ip_.focus() ;
     ac_hide_() ;
   }

   function get_ac00_() {
     var s="",ment="" ;
     //if (qs_m_==1) ment="Sorry, no matching results were found for the keyword(s).";
     //else if (qs_m_==2) ment="Sorry, no matching results were found for the keyword(s).";
     s += "<table width=95% border=0 cellspacing=0 cellpadding=0>" ;
     s += "<tr id=\"ac1_\" onmouseover=\"set_acpos_(1); \" onmouseout=\"set_acpos_(0); \" style=\"backgroundColor=''\">" ;
     s += "<td height=\"18\" align=left> &middot; <font style='font-size: 11px; letter-spacing: -1; color: #000000;'>" + ment + "</td></tr>" ;
     s += "</table>" ;
     s += "<span id=acq1_ style='display:none'>" + old_ + "</span>" ;
     return s ;
   }

	function get_ac0_()
	{
		var s="",ment="" ;
		if (qs_m_==1) ment="Sorry, no matching results were found for the keyword(s).";
		else if (qs_m_==2) ment="Sorry, no matching results were found for the keyword(s).";

		s += "\t\t\t\t\t\t\t\t\t\t\t<li id=\"ac1_\">";
		s += "\t\t\t\t\t\t\t\t\t\t\t\t<a href=\"#none;\">" + ment + "</a>";
		s += "\t\t\t\t\t\t\t\t\t\t\t\t<span id=\"acq1_\" style=\"display:none\">" + old_ + "</span>";
		s += "\t\t\t\t\t\t\t\t\t\t\t</li>";
		return s ;
	}

   function js_strlen_(s) {
     var i,l=0;
     for (i=0; i<s.length; i++)
       if (s.charCodeAt(i) > 127) l+=2;
       else l++;
     return l;
   }

   function js_substring_(s, start, len) {
     var i,l=0;d="" ;
     for (i=start; i<s.length && l<len; i++) {
       if (s.charCodeAt(i) > 127) l+=2 ;
       else l++ ;
       d+=s.substr(i, 1) ;
     }
     return d ;
   }

	function trim_space_(ke, me)
	{
		if (me!=2)
		{
			ke = ke.replace(/^ +/g, "") ;
			ke = ke.replace(/ +$/g, " ") ;
		}
		else
		{
			ke = ke.replace(/^ +/g, " ") ;
			ke = ke.replace(/ +$/g, "") ;
		}

		ke = ke.replace(/ +$/g, " ") ;
		return ke ;
	}

	function get_cc_(me)
	{
		var ke=trim_space_(Ip_.value, me) + me;
		return typeof(cc_[ke])==UD_ ? null : cc_[ke];
	}

/* DEFAULT
	function set_cc_(aQuery, aKeywordList, aId, me)
	{
		cc_[aQuery+me] = new Array(aQuery, aKeywordList, aId);
	}

/* CARISYOU
	function set_cc_(aq, abrand, acarInfo, afavorite, areal, ai, me)
	{
		cc_[aq+me] = new Array(aq, abrand, acarInfo, afavorite, areal, ai);
	}
*/

	function set_cc_(aQuery, aKeywordList, aCtgList, aId, me)
	{
		cc_[aQuery+me] = new Array(aQuery, aKeywordList, aCtgList, aId);
	}

	function wi_()
	{
		// alert("wi_(): Acuse_: " + Acuse_);
		if (Acuse_==0)
		{
			// alert("query:" + Ip_value);
			return ;
		}

		if (m_on_)
		{
			setTimeout("wi_()", TimeOut) ;
			return ;
		}
		var now = Ip_.value ;
		// alert("wi_(): Acuse_=[" + Acuse_ + "], m_on_=[" + m_on_ + "], now[" + now + "], old[" + old_ + "]");

		if (now == "" && now != old_)
		{
			// alert("keystatus:"+keystatus_+"now:"+now+"old:"+old_);
			ac_hide_();
			my_show_();
		}

		if(getNavigatorType_() == 2 && now != "" && now != old_)
		{
			// alert("3");
			var o=null, me=1 ;
			o = get_cc_(me) ;
			if (o && o[1][0] != "") ac_show_(o[0], o[1], o[2], me) ;
			else reqAC_(me) ;
		}
		else if ( getNavigatorType_() == 1 && now != "" && now != old_ && keystatus_!=1)
		{ //모질라는 키보드 입력이벤트를 체크하지 못한다.
			// alert("4");
			var o=null, me=1 ;
			o = get_cc_(me) ;
			if (o && o[1][0] != "") ac_show_(o[0], o[1], o[2], me) ;
			else reqAC_(me) ;
		}
		old_ = now ;

		// alert("2222timeout");
		setTimeout("wi_()", TimeOut) ;
	}

	function ac_show__()
	{
		var destWinOn=document.getElementById("rcmdResult");
		// var destWinOff=document.getElementById("autoComplete");

		destWinOn.style.display = N_ ;
		// destWinOff.style.display = B_ ;

		a_on_ = a_now_ = 1 ;
		saveCookie("acuse", "1");
		Acuse_=1;
		// alert("1");
		// setTextBox_(1);
		// alert("2");

		setTimeout("wi_()", TimeOut) ;
		reqAC_(1) ;
		// reqAC_
	}

	function ac_hide__()
	{
		var destWinOn=document.getElementById("rcmdResult");
		// var destWinOff=document.getElementById("autoCompleteToOn");

		// alert(destWin.name);
		// alert(N_);
		destWinOn.style.display = N_ ;
		// destWinOff.style.display = B_ ;

		a_on_ = a_now_ = 0 ;
		saveCookie("acuse", "0");
		// deleteCookie("acuse");
		Acuse_=0;
	}

	/* 검색창 숨기기 */
	function ac_hide_()
	{
		// alert("ac_hide_()");
		var destWinOn = document.getElementById("rcmdResult");
		// var destWinOff = document.getElementById("autoCompleteToOn");

		// alert(destWin.name);
		// alert(N_);
		// console.log("ac_hide_(): Acuse_: " + Acuse_);
		if (Acuse_==1 && destWinOn.style.display == N_)
			; // return ;
		else
		{
			destWinOn.style.display = N_ ;
			a_on_ = a_now_ = 0 ;
		}

		// console.log("ac_hide_(): Acuse_: " + Acuse_);
		// if (Acuse_==0 && destWinOff.style.display == N_)
		if (Acuse_==0)
			; // return ;
		else
		{
			; // destWinOff.style.display = N_ ;
		}
	}

	function set_mouseon_(f)
	{
		// console.log("set_mouseon_: " + f);
		if (f==1) arr_on_ = 1 ;
		else if (f==2) frm_on_ = 1 ;
	}

	function set_mouseoff_(f)
	{
		// console.log("set_mouseoff_: " + f);
		if (f==1) arr_on_ = 0 ;
		else if (f==2) frm_on_ = 0 ;
	}

	function req_pf_()
	{
		// console.log("req_pf_: ");
		frm_on_=1;
		req_ac2_(1);
		Ip_.focus();
		cursor_end_();
	}

	function req_sf_()
	{
		// console.log("req_sf_: ");
		frm_on_=1;
		req_ac2_(2);
		Ip_.focus();
		cursor_end_();
	}

	function cursor_end_()
	{
		if (t_==1 && c_==1)
		{
			var rng=Ip_.createTextRange();
			if (rng!=null)
			{
				rng.move("textedit");
				rng.select();
			}
		}
	}
}

var keystatus_ = 1;

function setTextBox_(e)
{
	// var textbox = Ip_;
	var key="";
	// var falg=1;
	// alert("ver:"+ RepiaData.browser.msie);

	// alert("keydown: " + Acuse_);
	if(Acuse_==0)
	{
		var destWinOn=document.getElementById("result_sch");
		// var destWinOff=document.getElementById("autoCompleteToOn");

		destWinOn.style.display = N_ ;
		// destWinOff.style.display = B_ ;
		a_on_ = a_now_ = 0 ;

		return 0;
	}

	switch ( getNavigatorType_() )
	{
		case 1 : // IE
			_event = window.event;
			key = _event.keyCode;
			nodeName = _event.srcElement.nodeName; // 구 버전의 IE 타겟
			break;

		case 2 : // Netscape
			// var cell = document.getElementById("qt");
			_event = e;
			key = _event.whick;
			break;

			nodeName = _event.target.nodeName; //W3C 표준 이벤트 타겟
			//alert("node:"+nodeName);
			break;
		default :
			nodeName = "None";
			break;
	}

	// alert('');
	// alert("key:" + nodeName);

	if( keystatus_ == 1 && _event && key != 13) keystatus_ = 2;
	//alert("keystatus:"+keystatus_);
}

function getNavigatorType_()
{
	if ( navigator.appName == "Microsoft Internet Explorer" ) return 1;
	else if ( navigator.appName == "Netscape" ) return 2;
	else return 0;
}

/* 검색창 프로모션 */
function search_promo_off()
{
	search_promotion = false;
}

function get_re_search(qt)
{
	document.searchForm.qt.value=qt;
	document.searchForm.submit();
}

function get_re_search2(qt)
{
	document.searchFrm.sqt.value=qt;
	document.searchFrm.submit();
}
