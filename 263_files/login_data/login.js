$(document).ready(function(){
	//产品切换
	$(".tabs li").on("click",function(){
		$(".tabs li a").removeClass("current");
		$(this).children("a").addClass("current");
		$(".panes").children().hide().eq($(this).index()).show();
	})
	$("#type0").click();
	$("#user6").click();
	
	setTimeout(function(){
		$("#username , #adminname , #userTypePwd , #adminTypePwd , #adminSecturyPwd, #confusername, #confpass").val("");
		//读取cookie
		loginJs.Get_CookieUserName();
	},1000);
	var wmLoginTab = $(".personLogin");
	var maLoginTab = $(".adminLogin");
	
	var personLoginTab = $("#personLoginTab");
	
	//WM安全登录
	personLoginTab.find(".safelogin").click(function(){
		if($(this).hasClass("checked")){
			$(this).removeClass("checked");
//			$("#safelogin").removeAttr("checked");
			personLoginTab.find("#safelogin").removeAttr("checked");
		}else{
			$(this).addClass("checked");
//			$("#safelogin").attr("checked","checked");
			personLoginTab.find("#safelogin").attr("checked","checked");
		}
	});
	
	var NmaLoginTab = $("#NmaLoginTab");
	//MA安全登陆
	NmaLoginTab.find(".safelogin").click(function(){
		if($(this).hasClass("checked")){
			$(this).removeClass("checked");
//			$("input[name='safelogin']").removeAttr("checked");
			NmaLoginTab.find("#safelogin").removeAttr("checked");
		}else{
			$(this).addClass("checked");
//			$("input[name='safelogin']").attr("checked","checked");
			NmaLoginTab.find("#safelogin").attr("checked","checked");
		}
	});
	
	
	//用户管理员切换
	$('#type0').click(function(){
		$('#form_wm').show();
		$('#form_ma').hide();
		})
	$('#type1,#type2').click(function(){
		$('#form_wm').hide();
		$('#form_ma').show();
		})
	//CF点击用户名
	$('#cfusername').focus(function(event) {
			$(".cfUser .placeholder").hide();
	});
	$('input[name="cfusername"]').keydown(function(event) {
			$(".cfUser .placeholder").hide();
	});
	$('#cfusername').blur(function(event) {
		if ($(this).val()=="") {
			$(".cfUser .placeholder").show();
		}
	});
	//CF点击密码框
	$('#cfuserTypePwd').focus(function(event) {
			$(".cfPwd .placeholder").hide();
	});
	$('input[name="password"]').keydown(function(event) {
			$(".cfPwd .placeholder").hide();
	});
	$('#cfuserTypePwd').change(function(event) {
			$(".cfPwd .placeholder").hide();
	});
	$('#cfuserTypePwd').blur(function(event) {
		if ($(this).val()=="") {
			$(".cfPwd .placeholder").show();
		}
	});
	
	//WM点击用户名
	$('#username').focus(function(event) {
			$(".wmUser .placeholder").hide();
	});
	$('input[name="username"]').keydown(function(event) {
			$(".wmUser .placeholder").hide();
	});
	$('#username').blur(function(event) {
		if ($(this).val()=="") {
			$(".wmUser .placeholder").show();
		}
	});
	//WM点击密码框
	$('#userTypePwd').focus(function(event) {
			$(".wmPwd .placeholder").hide();
	});
	$('input[name="password"]').keydown(function(event) {
			$(".wmPwd .placeholder").hide();
	});
	$('#userTypePwd').change(function(event) {
			$(".wmPwd .placeholder").hide();
	});
	$('#userTypePwd').blur(function(event) {
		if ($(this).val()=="") {
			$(".wmPwd .placeholder").show();
		}
	});
	
	//安全登陆
	maLoginTab.find(".safelogin").click(function(){
		if($(this).hasClass("checked")){
			$(this).removeClass("checked");
			$("input[name='safelogin']").removeAttr("checked");
		}else{
			$(this).addClass("checked");
			$("input[name='safelogin']").attr("checked","checked");
		}
	});
	//MA超级管理员登录
	maLoginTab.find(".adminUser").click(function(){
		if(!$(this).find(".icon").hasClass("checked")){
			$(this).find(".icon").addClass("checked");
			$(".domainUser").find(".icon").removeClass("checked");
			$("#form_ma input[name=type]").val("2");
		}
	});
	//MA域管理员登录
	maLoginTab.find(".domainUser").click(function(){
		if(!$(this).find(".icon").hasClass("checked")){
			$(this).find(".icon").addClass("checked");
			$(".adminUser").find(".icon").removeClass("checked");
			$("#form_ma input[name=type]").val("3");
		}
	});
	//MA密保登录
	maLoginTab.find(".securityHas").click(function(){
		if($(this).hasClass("checked")){
			$(this).removeClass("checked");
			$("div .maSecurity").hide();
		}else{
			$(this).addClass("checked");
			$("div .maSecurity").show();
		}
	});
	//MA点击用户名
	$('#adminname').focus(function(event) {
			$(".maUser .placeholder").hide();
	});
	$('input[id="adminname"]').keydown(function(event) {
			$(".maUser .placeholder").hide();
	});
	$('#adminname').blur(function(event) {
		if ($(this).val()=="") {
			$(".maUser .placeholder").show();
		}
	});
	//MA点击密码框
	$('#adminTypePwd').focus(function(event) {
			$(".maPwd .placeholder").hide();
	});
	$('#adminTypePwd').change(function(event) {
		$(".maPwd .placeholder").hide();
	});
	$('input[name="pswd"]').keydown(function(event) {
			$(".maPwd .placeholder").hide();
	});
	$('#adminTypePwd').blur(function(event) {
		if ($(this).val()=="") {
			$(".maPwd .placeholder").show();
		}
	});
	//MA点击密保框
	$('#adminSecturyPwd').focus(function(event) {
			$(".maSecurity .placeholder").hide();
	});
	$('input[name="mibao_dpswd"]').keydown(function(event) {
			$(".maSecurity .placeholder").hide();
	});
	$('#adminSecturyPwd').blur(function(event) {
		if ($(this).val()=="") {
			$(".maSecurity .placeholder").show();
		}
	});
	
	
	
	//wm提交登录
	$("#wmSubBtn").bind("click",function(event){
		loginJs.loginWM(0);
	});
	//wm回车登录
	$('#userTypePwd').keypress(function(event) {
		if (event.keyCode == '13') {
			loginJs.loginWM(0);
			event.preventDefault();
		}
	});
	//ma提交登录
	$("#maSubBtn").bind("click",function(event){
		loginJs.logonMA();
	});
	//ma回车登录
	$('#adminTypePwd, #adminSecturyPwd').keypress(function(event) {
		if (event.keyCode == '13') {
			loginJs.logonMA();
			event.preventDefault();
		}
	});
	//清除痕迹
	$(".resetForm").bind("click",function(){
		$(".placeholder").show();
		$("#username,  #userTypePwd , #adminname, #adminTypePwd, #adminSecturyPwd, #confusername, #confpass,#panusername,#panpass").val("");
		//清除cookie
		loginJs.Delete_Cookie('username', '/', '');
	});
	//WM密码大写按键是否开启
	$("#userTypePwd").keydown(function(e) {
        var keyCode = e.keyCode;  // 按键的keyCode 
		if(keyCode==20){
		   $("#wmIsCaps").toggle(); 
		}
    });
	//MA密码大写按键是否开启
	$("#adminTypePwd").keydown(function(e) {
        var keyCode = e.keyCode;  // 按键的keyCode 
		if(keyCode==20){
		   $("#maIsCaps").toggle(); 
		}
    });
	//MA密保大写按键是否开启
	$("#adminSecturyPwd").keydown(function(e) {
        var keyCode = e.keyCode;  // 按键的keyCode 
		if(keyCode==20){
		   $("#maSecurityIsCaps").toggle(); 
		}
    });
	
	//显示多语言
	$(".language").click(function(event) {
		event.stopPropagation();
        $(this).parent().find(".lang").slideToggle("show");
 		$(this).addClass("languageUp");
    });
	//隐藏多语言
	$("html").click(function(){
		$("ul.lang").slideUp("slow");
		$(".language").removeClass("languageUp");
	});
	//多语言切换
	$("ul.lang a").click(function(event) {
        var lang = $(this).attr("name");
		loginJs.selLang(lang);
    });
	
// / <---网盘登陆路口部分 --->
//网盘点击用户名
	$('#panusername').focus(function(event) {
			$(".panUser .placeholder").hide();
	});
	$('input[name="account"]').keydown(function(event) {
			$(".panUser .placeholder").hide();
	});
	$('#panusername').blur(function(event) {
		if ($(this).val()=="") {
			$(".panUser .placeholder").show();
		}
	});
	//网盘点击密码框
	$('#panpass').focus(function(event) {
			$(".panPwd .placeholder").hide();
	});
	$('input[name="password"]').keydown(function(event) {
			$(".panPwd .placeholder").hide();
	});
	$('#panpass').change(function(event) {
			$(".panPwd .placeholder").hide();
	});
	$('#panpass').blur(function(event) {
		if ($(this).val()=="") {
			$(".panPwd .placeholder").show();
		}
	});
	
// / <---会议登陆路口部分 --->
	//会议点击用户名
	$('#confusername').focus(function(event) {
			$(".cfUser .placeholder").hide();
	});
	$('input[name="confusername"]').keydown(function(event) {
			$(".cfUser .placeholder").hide();
	});
	$('#confusername').blur(function(event) {
		if ($(this).val()=="") {
			$(".cfUser .placeholder").show();
		}
	});
	//会议点击密码框
	$('#confpass').focus(function(event) {
			$(".cfPwd .placeholder").hide();
	});
	$('input[name="confpass"]').keydown(function(event) {
			$(".cfPwd .placeholder").hide();
	});
	$('#confpass').change(function(event) {
			$(".cfPwd .placeholder").hide();
	});
	$('#confpass').blur(function(event) {
		if ($(this).val()=="") {
			$(".cfPwd .placeholder").show();
		}
	});
	
	   // 会议管理员没有忘记密码的功能
	     $("#user6").bind("click",function(event)
		{
		     	 $("#confa").text('忘记密码？');
		    	 
		});

	     $("#user7").bind("click",function(event)
		{
			
	              $("#confa").text('');
		});
	     
	   // 会议用户提交登陆
	 	$("#confSubBtn").bind("click",function(event){
	 		loginJs.logonConf();
	 	}); 
	    
	     // 会议回车登录
	 	$('#confpass,#confusername').keypress(function(event) {
	 		if (event.keyCode == '13') 
	 		{
	 			$('#confSubBtn').trigger("click");
	 			event.preventDefault();
	 		}
	 	});
           /// <---会议登陆路口部分 结束--->
	 	/// <---同步盘登陆路口部分 结束--->
	 	//同步盘提交登录
		$("#panSubBtn").bind("click",function(event){
			loginJs.logonPan(0);
		});
		//同步盘回车登录
		$('#panusername,#panpass').keypress(function(event) {
			if (event.keyCode == '13') {
				loginJs.logonPan(0);
				event.preventDefault();
			}
		});
	 	/// <---同步盘登陆路口部分 结束--->
	
	
	 	// / <---直播登录提示部分 --->
		//用户管理员切换
		$('#webcastUser').click(function(){
			$('#webcastUserForm').show();
			$('#webcastAdminForm').hide();
		})
		$('#webcastAdmin').click(function(){
			$('#webcastUserForm').hide();
			$('#webcastAdminForm').show();
		})
		//直播类型选择
		$('.webcastTab li').click(function(){
			$(this).addClass("cur").siblings().removeClass("cur")
			if($(this).index()==0){
				$('input[name="webcastType"]').val("webcast")
				$('#webcastUserForm .webcastTypeInput').removeClass("training")
				$('#webcastUserForm .webcastTypeInput .u_webcastURL label').html('直播地址');
				
			}
			if($(this).index()==1){
				$('input[name="webcastType"]').val("training")
				$('#webcastUserForm .webcastTypeInput').addClass("training")
				$('#webcastUserForm .webcastTypeInput .u_webcastURL label').html('站点链接')
				
			}
		})

	 	// 直播提交登陆
	 	$("#webcastSubBtn").bind("click",function(event){
	 		loginJs.loginWebcast();
	 	}); 
		$("#u_webcastSubBtn").bind("click",function(event){
	 		loginJs.loginWebcastUser();
	 	}); 
	    
	     // 直播回车登录
	 	$('#webcastURL,#webcastUser,#webcastPass').keypress(function(event) {
	 		if (event.keyCode == '13') 
	 		{
	 			$('#webcastSubBtn').trigger("click");
	 			event.preventDefault();
	 		}
	 	});
		
		$('#u_webcastURL,#u_webcastRoom,#u_webcastUser,#u_webcastPass').keypress(function(event) {
				if (event.keyCode == '13') 
				{
					$('#u_webcastSubBtn').trigger("click");
					event.preventDefault();
				}
			});
	
	//----用户----
	//站点链接
	$('#u_webcastURL').focus(function(event) {
			$(".u_webcastURL .placeholder").hide();
	});
	$('input[name="u_webcastURL"]').keydown(function(event) {
			$(".u_webcastURL .placeholder").hide();
	});
	$('#u_webcastURL').blur(function(event) {
		if ($(this).val()=="") {
			$(".u_webcastURL .placeholder").show();
		}
	});
	
	//房间编号
	$('#u_webcastRoom').focus(function(event) {
			$(".u_webcastRoom .placeholder").hide();
	});
	$('input[name="u_webcastRoom"]').keydown(function(event) {
			$(".u_webcastRoom .placeholder").hide();
	});
	$('#u_webcastRoom').blur(function(event) {
		if ($(this).val()=="") {
			$(".u_webcastRoom .placeholder").show();
		}
	});
	//名称
	$('#u_webcastUser').focus(function(event) {
			$(".u_webcastUser .placeholder").hide();
	});
	$('input[name="u_webcastUser"]').keydown(function(event) {
			$(".u_webcastUser .placeholder").hide();
	});
	$('#u_webcastUser').blur(function(event) {
		if ($(this).val()=="") {
			$(".u_webcastUser .placeholder").show();
		}
	});
	//直播口令
	$('#u_webcastPass').focus(function(event) {
			$(".u_webcastPass .placeholder").hide();
	});
	$('input[name="u_webcastPass"]').keydown(function(event) {
			$(".u_webcastPass .placeholder").hide();
	});
	$('#u_webcastPass').blur(function(event) {
		if ($(this).val()=="") {
			$(".u_webcastPass .placeholder").show();
		}
	});
	//----管理员----
	//站点链接
	$('#webcastURL').focus(function(event) {
			$(".webcastURL .placeholder").hide();
	});
	$('input[name="webcastURL"]').keydown(function(event) {
			$(".webcastURL .placeholder").hide();
	});
	$('#webcastURL').blur(function(event) {
		if ($(this).val()=="") {
			$(".webcastURL .placeholder").show();
		}
	});
	//用户名
	$('#webcastUsername').focus(function(event) {
			$(".webcastUsername .placeholder").hide();
	});
	$('input[name="webcastUsername"]').keydown(function(event) {
			$(".webcastUsername .placeholder").hide();
	});
	$('#webcastUsername').blur(function(event) {
		if ($(this).val()=="") {
			$(".webcastUsername .placeholder").show();
		}
	});
	//密码框
	$('#webcastPass').focus(function(event) {
			$(".webcastPass .placeholder").hide();
	});
	$('input[name="webcastPass"]').keydown(function(event) {
			$(".webcastPass .placeholder").hide();
	});
	$('#webcastPass').change(function(event) {
			$(".webcastPass .placeholder").hide();
	});
	$('#webcastPass').blur(function(event) {
		if ($(this).val()=="") {
			$(".webcastPass .placeholder").show();
		}
	});
	
	//二维码登录切换
	$("#wmloginTab").on("click",function(){
		if($(this).hasClass("icon-wmqr")){
			$('.wmloginForm').show()
			$('.wmloginWechat').hide()
			$(this).removeClass("icon-wmqr")
			clearInterval(pollingTimer);
		}else{
			$('.wmloginForm,.refresh,.bind').hide()
			$('.wmloginWechat').show()
			$(this).addClass("icon-wmqr")
			getQrCode();
			pollingTimer = setInterval(pollingScan, 2000);
		}
	})
	$(".refresh a,.bind a").on("click",function(){
		$(this).parent("div").hide();
		getQrCode();
		pollingTimer = setInterval(pollingScan, 2000);
	});
	
});

//生成uuid的方法（设置cookie值“wx_scene_str”需要生成uuid）
	var getUuid = function(){
        var len = 32;//32长度
        var radix = 16;//16进制
        var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
        var uuid = [], i;
        radix = radix || chars.length;
        if(len) {
            for(i = 0; i < len; i++)uuid[i] = chars[0 | Math.random() * radix];
        } else {
            var r;
            uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
            uuid[14] = '4';
            for(i = 0; i < 36; i++) {
                if(!uuid[i]) {
                    r = 0 | Math.random() * 16;
                    uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
                }
            }
        }
        return uuid.join('');
    };
//获取微信二维码方法
	var getQrCode = function(){
		document.cookie = "wx_scene_str=" + getUuid() + ";expires=Mon, 25 Jan 2030 00:00:00 GMT;path=/;";
		$.ajax({
            url: '/mailLoginWeixin/web/action/offiaccount/qrcode.do?a='+ Math.random(),
             data: {},
             success: function (res) {
                //console.log(res);
                //console.log($.cookie("wx_scene_str"));
                $(".code-img img").attr("src","https://mp.weixin.qq.com/cgi-bin/showqrcode?ticket="+res);
            }
        });
		
    };

	//定义轮询
    var pollingTimer = null; 
	//轮询探测方法
    var pollingScan = function(){
        $.ajax({
            type: 'post',
            url: '/mailLoginWeixin/web/action/offiaccount/getAuthsate.do?a='+ Math.random(),
            data: {},
            success: function (res) {
                switch (res.code) {
					case 0:
						clearInterval(pollingTimer);
						if(res.url){
							top.location.href = res.url;
						}
					break;
					case 1:
						clearInterval(pollingTimer);
						var currLang = $("#personLoginTab input[name=chr]").val(),
						resMsg = '';
						switch(currLang) {
							case 'cn':
							resMsg = res.msg;
							break;
							case 'hk':
							resMsg = res.hk_msg;
							break;
							case 'en':
							resMsg = res.en_msg;
							break;
							case 'jp':
							resMsg = res.jp_msg;
							break;
							case 'ko':
							resMsg = res.ko_msg;
							break;
							default:
							resMsg = res.msg;
							} 
						alert(resMsg);
						getQrCode();
						pollingTimer = setInterval(pollingScan, 2000);
					case 2:
						//
					break;
					case 3:
						clearInterval(pollingTimer);
						$(".refresh").show();
					break;
					default:
					//
				}
            }
        });
    }


var loginJs = loginJs || {};
//截取域名
loginJs.getDomainFromMail = function(email){
	var pos = email.indexOf("@");
	if(pos < 0){
		return "";
	}else{
		return email.slice(pos + 1);
	}
}
//截取名字
loginJs.getNameFromMail = function(email){
	var pos = email.indexOf("@");
	if( pos < 0)	{
		return email;
	}else{
		if(pos == 0){
			return "";
		}else{
			return email.substring(0,pos);
		}
	}	
}
//判断是否是个邮
loginJs.isPeisonWM = function (domain){
	var flag = false;
	var personDoamins = new Array("263.net","263.net.cn","x263.net");
	for(var i = 0;i < personDoamins.length; i++){
		if(personDoamins[i]==domain){
				flag = true;
				break;
		}
	}
	return flag;
}
//判断个邮账号的登陆地址
loginJs.loginExam = function(user,domain){	
			  var head=document.getElementsByTagName('head').item(0);	      
				script=document.createElement('script');
				script.src='http://wmnew.263.net/mail/login/opt/loginAction_examUser.do?usr=' + user  +"&domain=" + domain  + "&tempTime=" + (new Date().getTime());
				script.type='text/javascript';
				script.defer=false;
				void(head.appendChild(script));
}
//个邮登陆
loginJs.loginPWM = function(){			
		if(isChange=='new'){//直接提交
				document.form_wm.action = g_server;
				var pwdUnFn1 = loginJs.ucode(document.form_wm.pass.value);
				document.form_wm.pass.value = pwdUnFn1;				
				document.form_wm.submit();
		}else if(isChange=='wait'){
				setTimeout("loginJs.loginPWM()",1000);
		}else if (isChange=='old'){
			  document.form_wm.action = "http://mailbeta.263.net/xmweb";
			  document.form_wm.submit();
		}
}

//转码
loginJs.ucode = function(s){ var len=s.length; var rs=""; for(var i=0;i<len;i++){ var k=s.substring(i,i+1); rs+="$"+(s.charCodeAt(i)+"1")+";"; } return rs; } 

//WM登录验证
loginJs.checkWM = function(){
	if( $("input[name=username]").val() == "" || $("input[name=username]").val() == loginJs.lang.js.sel.login_001 ){
		alert(loginJs.lang.js.sel.login_002);
		$("input[name=username]").focus();
		return false;
	}else if($("input[name=username]").val().indexOf("@")<0){
		alert(loginJs.lang.js.sel.login_003);
		$("input[name=username]").focus();
		return false
	}
	if( $("input[name=pass]").val() == "" ){
		alert(loginJs.lang.js.sel.login_004);
		$("input[name=pass]").focus();
		return false;
	}
	return  true;
}
//wm登录
loginJs.loginWM = function(ver){
	if(loginJs.checkWM()){
		var wm = document.form_wm;
		document.cookie = "username=" + $("input[name=username]").val() + ";expires=Mon, 25 Jan 2030 00:00:00 GMT;path=/;";
		wm.domain.value = loginJs.getDomainFromMail($("input[name=username]").val());
		wm.usr.value = loginJs.getNameFromMail($("input[name=username]").val());
		wm.buttonType.value=ver;
		/*if(loginJs.isPeisonWM(wm.domain.value)){
			if(ver==1){
				alert(loginJs.lang.js.sel.login_005);
				return false;
			}else{
				loginJs.loginExam(wm.usr.value,wm.domain.value);
				setTimeout("loginJs.loginPWM()",1000);
				return false;
			}
		}else{ */      
			wm.buttonType.value=1;
			//判断是否安全登录
			if ($("#safelogin").is(":checked")){
				wm.action = "https://mail.263.net/xmweb";
			}else{
				wm.action = "https://mail.263.net/xmweb";
			}
			
		//}
		var pwdUnFn1 = loginJs.ucode(wm.pass.value);
		wm.pass.value = pwdUnFn1;
		$("#form_wm").submit();
		$("#wmSubBtn").unbind("click");
	}else{
		return false;	
	}
}
//验证ma表格
loginJs.checkMA = function(){
	if( document.form_ma.user.value == "" || document.form_ma.user.value == loginJs.lang.js.sel.login_006 ){
        alert(loginJs.lang.js.sel.login_007);
        document.form_ma.user.focus();
        return false;
	}else if(document.form_ma.user.value.indexOf("@")<0){
		alert(loginJs.lang.js.sel.login_008);
        document.form_ma.user.focus();
        return false;
	}
	if( document.form_ma.pswd.value == "" ){
        alert(loginJs.lang.js.sel.login_009);
        document.form_ma.pswd.focus();
        return false;
	}
	var oMibao = document.getElementById("mibao_dpswd");
	/*
	if(oMibao.value == '没有联通密保则不需填写此项')
	{
		oMibao.value = '';
	}
	*/
	return true;
}
//禁止融资融券ma账号登陆
loginJs.checkMaDomain = function(){
	var flag = true;
	var dom = document.form_ma.user.value.split("@")[1];
	var rzrqDomainArr = new Array("hysec.263.net","swsc.263.net","gyzq.263.net","rzrq.qlzq.com.cn","csc.263.net","yinhe.263.net","rzrq.htsc.com.cn");
	for(var i = 0;i < rzrqDomainArr.length; i++){
		if(rzrqDomainArr[i]==dom){
				flag = false;
				var str = confirm("尊敬的融资融券用户，您好\n\n"
     			+"    您是我们的融资融券用户，您需要在融资融券专用邮件系统登陆。\n"
     			+"请点击确认进入 http://ma.rzrq.263.net/ ，重新输入用户名和密码登录。\n"
    			+"感谢您的使用。\n\n"
     			+"                                 263融资融券专用邮箱客服组");
     		if(str){
     				window.location.href='http://ma.rzrq.263.net/';
    		}
				break;
		}
	}
	return flag;
}
//ma登录
loginJs.logonMA = function(){
	 if(loginJs.checkMA() && loginJs.checkMaDomain()){
	   $("#maSubBtn").unbind("click");
	   document.form_ma.action="https://mail.263.net/ma-bin/ma_main.cgi";
	   document.form_ma.submit();
	}else{
		return false;
	}
}
//读取cookie赋值用户名
loginJs.Get_CookieUserName = function() {
	var c = document.cookie + ";";
	var re = /\s?(.*?)=(.*?);/g;
	while ((matches = re.exec(c)) != null) {
		 if(matches[1]=='username'){
			 try{
			  $("input[name=username]").val(matches[2]);
			  $(".wmUser .placeholder").hide();
			 }catch(e){}
		 }
	}
}
//读取cookie方法
loginJs.Get_Cookie = function( name ) {
	var start = document.cookie.indexOf( name + "=" );
	var len = start + name.length + 1;
	if ( ( !start ) &&
	( name != document.cookie.substring( 0, name.length ) ) )
	{
	return null;
	}
	if ( start == -1 ) return null;
	var end = document.cookie.indexOf( ";", len );
	if ( end == -1 ) end = document.cookie.length;
	return unescape( document.cookie.substring( len, end ) );
}
//删除cookie方法
loginJs.Delete_Cookie = function( name, path, domain ) {
	if ( loginJs.Get_Cookie( name ) ) document.cookie = name + "=" +
	( ( path ) ? ";path=" + path : "") +
	( ( domain ) ? ";domain=" + domain : "" ) +
	";expires=Thu, 01-Jan-1970 00:00:01 GMT";
}
//切换多语言方法
loginJs.selLang = function(lang) {
	var langType = "loginJs.lang."+lang;
	$(".isLang").each(function(index, element) {
        var num = $(this).attr("name");
		var txt = eval(langType+"."+num);
		$(this).html(txt);
    });
	if(lang=="enpan" || lang=="cnpan"){
			$(".btnLoginInPan").each(function(index, element) {
				var txt = eval(langType+".loginPan_006");
			$(".btnLoginInPan").val(txt);
			if(lang=="enpan"){
				$("#language").val("en_US");
			}else{
				$("#language").val("zh_CN");
			}
			});
	}else{
		$(".btnLoginIn").each(function(index, element) {
				var txt = eval(langType+".login_008");
			$(".btnLoginIn").val(txt);
		});
	}
	$("#form_wm input[name=chr]").val(lang);
        $("#form_ma input[name=chr]").val(lang);
	//JS内部多语言切换
	loginJs.lang.js.sel = eval("loginJs.lang.js."+lang);
}
//多语言信息
loginJs.lang = {
	cn : {
		login_001 : "邮箱",
		login_002 : "管理员登录",
		login_003 : "请输入您的邮箱地址",
		login_004 : "输入您的密码",
		login_005 : "大写状态已打开",
		login_006 : "安全登录",
		login_007 : "清除痕迹",
		login_008 : "登 录",
		login_009 : "无法成功登录",
		login_010 : "忘记用户密码？",
		login_011 : "语言",
		login_012 : "超级域管理员",
		login_013 : "域管理员",
		login_014 : "管理员账号",
		login_015 : "密码",
		login_016 : "密保",
		login_017 : "使用密保登录",
        login_018 : "忘记管理员密码？",
		login_019 : "用户",
		login_020 : "二维码已过期",
		login_021 : "刷新",
		login_022 : "确定",
		login_023 : "微信扫码登录"
	},
	hk : {
		login_001 : "郵箱",
		login_002 : "管理員登錄",
		login_003 : "請輸入您的郵箱地址",
		login_004 : "輸入您的密碼",
		login_005 : "大寫狀態已打開",
		login_006 : "安全登錄",
		login_007 : "清除痕跡",
		login_008 : "登 錄",
		login_009 : "無法成功登錄",
		login_010 : "忘記用戶密碼？",
		login_011 : "語言",
		login_012 : "超級域管理員",
		login_013 : "域管理員",
		login_014 : "管理員賬號",
		login_015 : "密碼",
		login_016 : "密保",
		login_017 : "使用密保登錄",
		login_018 : "忘記管理員密碼？",
		login_019 : "用戶",
		login_020 : "二維碼已過期",
		login_021 : "刷新",
		login_022 : "確定",
		login_023 : "微信掃碼登入"
	},
	en : {
		login_001 : "Mail",
		login_002 : "Administrator login",
		login_003 : "Email",
		login_004 : "Password",
		login_005 : "Capital is opened",
		login_006 : "Secured Login",
		login_007 : "Clear cookies",
		login_008 : "Sign in",
		login_009 : "Can't sign?",
		login_010 : "Forgot Password",
		login_011 : "Language",
		login_012 : "Admin",
		login_013 : "Sub-admin",
		login_014 : "Administrator account",
		login_015 : "Password",
		login_016 : "Security card",
		login_017 : "Use security card",
        login_018 : "Forgot admin password",
		login_019 : "user",
		login_020 : "QR code has expired",
		login_021 : "Refresh",
		login_022 : "Confirm",
		login_023 : "Wechat code scanning login"
	},
	jp : {
		login_001 : "メール",
		login_002 : "管理者ログイン",
		login_003 : "E-mail ID",
		login_004 : "パスワード",
		login_005 : "大文字の状態はオープンです",
		login_006 : "安全状態で登録",
		login_007 : "明確なクッキー",
		login_008 : "ログイン",
		login_009 : "ﾛｸﾞｲﾝできない",
		login_010 : "ﾊﾟｽﾜｰﾄﾞを忘れ",
		login_011 : "言語",
		login_012 : "管理者",
		login_013 : "副管理者",
		login_014 : "管理者のアカウント",
		login_015 : "パスワード",
		login_016 : "セキュリティカード",
		login_017 : "ｾｷｭﾘﾃｨｶｰﾄﾞ",
		login_018 : "管理者のパスワードを忘れて",
		login_019 : "ユーザー",
		login_020 : "QRコードの有効期限が切れています",
		login_021 : "リフレッシュ",
		login_022 : "確定",
		login_023 : "WeChatスキャンコードログイン"
	},
	ko : {
		login_001 : "메일",
		login_002 : "관리자 로그인",
		login_003 : "아이디（ID）",
		login_004 : "비밀번호",
		login_005 : "대문자 상태 열려",
		login_006 : "보안 로그인",
		login_007 : "쿠기삭제",
		login_008 : "로그인",
		login_009 : "로그인 할 수",
		login_010 : "비밀번호 찾기",
		login_011 : "언어",
		login_012 : "관리자",
		login_013 : "하위 관리자",
		login_014 : "관리인의 어카운트(account)",
		login_015 : "비밀번호",
		login_016 : "보안 비밀",
		login_017 : "비밀 보안 로그 ",
		login_018 : "잊고 관리자 암호를",
		login_019 : "사용자",
		login_020 : "QR 코드가 만료되었습니다",
		login_021 : "새롭게 하다",
		login_022 : "확인",
		login_023 : "위챗 스캔 코드 로그인"
	},
cnpan : {
		loginPan_001 : "网盘",
		loginPan_002 : "提示：请使用企业网盘账号登录",
		loginPan_003 : "输入您的账号",
		loginPan_004 : "输入您的密码",
		loginPan_005 : "清除痕迹",
		loginPan_006 : "登 录",
		loginPan_007 : "忘记密码?",
		loginPan_008 : "语言"
	},
enpan : {
		loginPan_001 : "Drive",
		loginPan_002 : "Tips:Please Use Enterprise Edition account",
		loginPan_003 : "Please enter your account",
		loginPan_004 : "Please enter your password",
		loginPan_005 : "Clear cookies",
		loginPan_006 : "Sign in",
		loginPan_007 : "Forgot Password?",
		loginPan_008 : "Language"
	}
	
}
loginJs.lang.js = {
	cn : {
		login_001 : "请输入您的邮箱地址",
		login_002 : "邮箱地址不能为空！\r\r请重新填写！",
		login_003 : "邮箱地址不合要求！\r\r请重新填写！" ,
		login_004 : "密码不能为空！\r\r请重新填写！",
		login_005 : "您是个邮用户，请点击“登录”按钮进入个人邮箱",
		login_006 : "管理员账号",
		login_007 : "管理员帐号不能为空！\r\r请重新填写！",
		login_008 : "管理员帐号不符合要求！\r\r请重新填写！",
		login_009 : "密码不能为空！\r\r请重新填写！"
	},
	hk : {
    	login_001 : "請輸入您的郵箱地址",
        login_002 : "郵箱地址不能為空！\r\r請重新填寫！",
        login_003 : "郵箱地址不合要求！\r\r請重新填寫！",
        login_004 : "密碼不能為空！\r\r請重新填寫！",
        login_005 : "您是個郵用戶，請點擊”登錄“按鈕進入個人郵箱",
        login_006 : "管理員賬號",
        login_007 : "管理員帳號不能為空！\r\r請重新填寫！",
        login_008 : "管理員帳號不符合要求！\r\r請重新填寫！",
        login_009 : "密碼不能為空！\r\r請重新填寫！"
    },
	en : {
    	login_001 : "Email",
		login_002 : "UserName can not be empty!\r\rPlease fill it again!",
		login_003 : "UserName is wrong！\r\rPlease fill it again!" ,
		login_004 : "Password can not be empty!\r\rPlease fill it again!",
		login_005 : "You're a Mail user, please click button to enter personal mailbox",
		login_006 : "Administrator login",
		login_007 : "Administrator account can not be empty!\r\rPlease fill it again!",
		login_008 : "Administrator account is wrong!\rPlease fill it again!",
		login_009 : "Password can not be empty!\r\rPlease fill it again!"
    },
	jp : {
    	login_001 : "E-mail ID",
		login_002 : "ユーザー名は空にすることはできません！\r\rもう一度やり直してください！",
		login_003 : "ユーザー名要求に合い！\r\rもう一度やり直してください。！" ,
		login_004 : "パスワードは空にできません！\r\rもう一度やり直してください。！",
		login_005 : "あなたは郵便のユーザーは、「登録」ボタンをクリックしてくださいに入る人ポスト",
		login_006 : "管理者ログイン",
		login_007 : "管理者アカウントは空にできません！\r\rもう一度やり直してください。！",
		login_008 : "管理者アカウント要求に合わない！\r\rもう一度やり直してください。！",
		login_009 : "パスワードは空にできません！\r\rもう一度やり直してください。！"
    },
	ko : {
		login_001 : "아이디（ID）",
		login_002 : "사용자 이름은 비워둘 수 없습니다！\r\r다시 시도해주십시오.！",
		login_003 : "사용자 이름은 비정규입니다！\r\r다시 시도해주십시오.！" ,
		login_004 : "비밀 번호는 비워둘 수 없습니다！\r\r다시 시도해주십시오.！",
		login_005 : "당신은 우편 사용자가있어, 개인 사서함을 입력하는“로그인”버튼을 클릭 해주세요",
		login_006 : "관리인의 어카운트(account)",
		login_007 : "사용자 이름은 비워둘 수 없습니다！\r\r다시 시도해주십시오.！",
		login_008 : "사용자 이름은 비정규입니다！\r\r다시 시도해주십시오.！",
		login_009 : "비밀 번호는 비워둘 수 없습니다！\r\r다시 시도해주십시오.！"
    },
	sel : {
    	login_001 : "请输入您的邮箱地址",
		login_002 : "邮箱地址不能为空！\r\r请重新填写！",
		login_003 : "邮箱地址不合要求！\r\r请重新填写！" ,
		login_004 : "密码不能为空！\r\r请重新填写！",
		login_005 : "您是个邮用户，请点击“登录”按钮进入个人邮箱",
		login_006 : "管理员账号",
		login_007 : "管理员帐号不能为空！\r\r请重新填写！",
		login_008 : "管理员帐号不符合要求！\r\r请重新填写！",
		login_009 : "密码不能为空！\r\r请重新填写！"
    }
}


//网盘登录验证
loginJs.checkPan = function(){
	if( $.trim($("input[name=account]").val()) == "" ){
		alert("网盘帐号不能为空！");
                $("input[name=account]").focus();
		return false;
	}
        if( $.trim($("input[name=password]").val()) == "" )
	{
		alert("密码不能为空！");
		$("input[name=password]").focus();
		return false;
	}
	return  true;
}




// 会议登录验证
loginJs.checkConf = function()
{
	mobileReg = /^((\+?86)|(\(\+86\)))?(1[34578][0-9]{9})$/;
	
	if( $("input[name=confusername]").val() == ""  )
	{
		alert("邮箱地址或手机号码不能为空！");
		$("input[name=confusername]").focus();
		return false;
	}
	else if($("input[name=confusername]").val().indexOf("@")<0 && !mobileReg.test($("input[name=confusername]").val()))
	{
		alert("邮箱地址格式或手机号码不正确！");
		$("input[name=confusername]").focus();
		return false
	}
	if( $("input[name=confpass]").val() == "" )
	{
		alert("密码不能为空!");
		$("input[name=confpass]").focus();
		return false;
	}
	return  true;
}

// 会议登录
loginJs.logonConf = function()
{
	try
	{
	if(loginJs.checkConf())
	{
	
		var conf = document.form_1;
		document.cookie = "confusername=" + $("input[name=confusername]").val() + ";expires=Mon, 25 Jan 2030 00:00:00 GMT;path=/;";		
		// 密码需要md5加密一次
		var passAfterMd5 = md5($("input[name=confpass]").val());
		var cname = $("input[name=confusername]").val();
		
		var uType = $('input:radio[name="confradio"]:checked').val();
		
		if(uType==1)
		{
		   // conf.action =
			// "http://ccstest.263.net/login?USER_NAME="+cname+"&USER_PASSWD="+passAfterMd5;//会议测试机
		    conf.action = "http://ecs.263.net/login?USER_NAME="+cname+"&USER_PASSWD="+passAfterMd5;// 会议生产
		}
		else if(uType==2)
		{
			conf.action = "http://cms.263.net/login?USER_NAME="+cname+"&USER_PASSWD="+passAfterMd5;// 会议管理生产机
		}
		// conf.confpass.value = passAfterMd5;
		// alert(conf.action);
		
		$("#form_1").submit();
		$("#confSubBtn").unbind("click");
	}else{
		return false;	
	}
	}catch(e){
		alert(e.message); 
	}
}
//网盘登录
loginJs.logonPan = function()
{
	try
	{
		if(loginJs.checkPan()){
			var pan = document.form_pan;
//			var language = $("#panLang").val();
			//先删除cookie
//			delCookie("language");
//			document.cookie = "language=" + language + ";expires=Mon, 25 Jan 2030 00:00:00 GMT;path=/;domain=.263.net;";		
//			var pwd = $("input[id=panpass]").val();
//			var cname = $("input[id=panusername]").val();
//			var isCipher = $("input[name=isCipher]").val();
			
//			pan.action = "https://test.pan.263.net/263/login/";//同步盘测试环境
//			pan.action = "https://www.tongbupan.com/263/login/";//同步盘测试环境
			pan.action = "https://pan.263.net/263/login/";//同步盘测试环境
			$("#form_pan").submit();
			$("#panSubBtn").unbind("click");
		}else{
			return false;
		}
	}catch(e){
		alert(e.message); 
	}
}

//直播登录---管理员
loginJs.loginWebcast= function()
{
	var webcastURL=$('input[name="webcastURL"]').val()
    	var webcastUsername=$('input[name="webcastUsername"]').val()
    	var webcastPass=$('input[name="webcastPass"]').val()
	var casttype=$('input[name="webcastType"]').val()
	if(webcastURL.length<=0){
		$('input[name="webcastURL"]').focus();
		alert("请输入站点链接");
	}
	else if(webcastUsername.length<=0){
		$('input[name="webcastUsername"]').focus();
		alert("请输入用户名");
	}	
	else if(webcastPass.length<=0){
		$('input[name="webcastPass"]').focus();
		alert("请输入直播口令");
    	}
	else{
		if(webcastURL.indexOf("http://")==-1 && webcastURL.indexOf("https://")==-1){
				var webcastURL="http://"+webcastURL
			}
		var surl=webcastURL+"/"+casttype+"/site/admin/index?user="+webcastUsername+"&pass="+$.md5(webcastPass)
		window.location.href=surl;
    	}
}

//直播登录----用户
loginJs.loginWebcastUser= function()
{
	var u_webcastURL=$('input[name="u_webcastURL"]').val()
	var u_webcastUser=$('input[name="u_webcastUser"]').val()
	var u_webcastPass=$('input[name="u_webcastPass"]').val()
	var u_webcastRoom=$('input[name="u_webcastRoom"]').val()
	var casttype=$('input[name="webcastType"]').val()
	if(u_webcastURL.length<=0){
		$('input[name="u_webcastURL"]').focus();
		alert("请输入站点链接");
	}
	else if(casttype=="training" & u_webcastRoom.length<=0){
	    		$('input[name="u_webcastRoom"]').focus();
				alert("请输入直播间编号");
			}
	else if(u_webcastUser.length<=0){
		$('input[name="u_webcastUser"]').focus();
		alert("请输入用户名");
	}	
	else if(u_webcastPass.length<=0){
		$('input[name="u_webcastPass"]').focus();
		alert("请输入密码");
    	}
	else{
		if(u_webcastURL.indexOf("http://")==-1 && u_webcastURL.indexOf("https://")==-1){
				var u_webcastURL="http://"+u_webcastURL
			}
		
		if(casttype=="webcast"){
					var u_surl=u_webcastURL+"?nickName="+encodeURIComponent(u_webcastUser)+"&token="+u_webcastPass
				}else{
					var u_surl=u_webcastURL+"/training/site/s/"+u_webcastRoom+"?nickname="+encodeURIComponent(u_webcastUser)+"&token="+u_webcastPass
				}
				window.location.href=u_surl;
    	}
}

//读取cookies 
function getCookie(name) 
{ 
    var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
 
    if(arr=document.cookie.match(reg))
 
        return unescape(arr[2]); 
    else 
        return null; 
}
//删除cookies 
function delCookie(name) 
{ 
    var exp = new Date(); 
    exp.setTime(exp.getTime() - 1); 
    var cval=getCookie(name); 
    if(cval!=null) 
        document.cookie= name + "="+cval+";expires="+exp.toGMTString(); 
} 