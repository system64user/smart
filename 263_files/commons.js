//强制https--
var targetProtocol = "https:";
if (window.location.protocol != targetProtocol)
window.location.href = targetProtocol +
window.location.href.substring(window.location.protocol.length);

$(document).ready(function(){
/*-------------------导航下拉滚动条效果--------------------*/	

	//标示动画是否执行
	var isAnimated = false;
	//on() 添加监听  "所要监听的事件" function(){}当监听到事件后执行的方法
    $(window).on("scroll",function(){
        //this代表window scrollTop()向上滑动的距离
        if($(this).scrollTop() > 0){
            $(".nav").addClass("nav-fixed");
            //如果动画执行过
            if(!isAnimated){
                $(".nav").css("top","-56px");//每次要执行动画之前都将top值设为-40px
                $(".nav").animate({"top":"0px"},1000);
                isAnimated = true;
            }
        }else{
            isAnimated = false;
            $(".nav").removeClass("nav-fixed");
        }
    })
    
    // 免费试用
	var tryBoxCon = $(".try_box_buy");
	if (tryBoxCon[0]) {
		var boxHtml = "﻿<a href=\"javascript:;\" class=\"btn-close\"></a><div class=\"whenInput\"><h1>请拨打销售热线 <font style=\"color:#ff3300\">400-650-9263</font>，或让我们联系您</h1><div class=\"tips\">（注册即可免费试用）</div></div><div class=\"whenSuccess disNone\"><h1><p style=\"color: #333;font-size: 32px;margin-bottom: 15px;padding-top: 40px;font-weight: normal;\">感谢您选择263！</p><p style=\"color: #666;font-size: 16px;font-weight: normal;}\">我们会在工作时间3小时内与您联系，为您及时服务，</p><p style=\"color: #666;font-size: 16px;font-weight: normal;\">您也可以拨打263热线：<span style=\"color: #f30;font-family: Arial;font-weight: normal;font-size: 32px;\">400-650-9263</span>，咨询您的订单进展情况。</p></h1></div><div class=\"try_cont try_forms disNone\" style=\"display:block;\"><div class=\"try_contBox zindex10\"><span class=\"try_contTitle\">联系人：</span><a class=\"try_inputIcon\"></a><!--<a class=\"try_inputIcon try_inputIcon_suc try_inputIcon_error\"></a>--><input name=\"productIds\" value=\"1\" type=\"hidden\"><input name=\"userNameSales\" maxlength=\"50\" id=\"userNameSales\" type=\"text\" class=\"try_contInput try_blur\" val=\"联系人姓名\" value=\"联系人姓名\" reMsg=\"不能为空\" errorMsg=\"\" /><span class=\"error_msg\"></span></div><div class=\"try_contBox\"><span class=\"try_contTitle\">电话：</span><a class=\"try_inputIcon\"></a><!--<a class=\"try_inputIcon try_inputIcon_error\"></a>--><input name=\"tel\" id=\"tel\" maxlength=\"50\" type=\"text\" class=\"try_contInput tel try_blur\" val=\"手机/座机\" value=\"手机/座机\" reMsg=\"不能为空\" errorMsgTel=\"座机号码输入有误\" errorMsgMobile=\"手机号码输入有误\" /><span class=\"error_msg\"></span></div><div class=\"try_contBox\"><span class=\"try_contTitle\">公司：</span><a class=\"try_inputIcon\"></a><!--<a class=\"try_inputIcon try_inputIcon_error\"></a>--><input name=\"company\" maxlength=\"50\" id=\"company\" type=\"text\" class=\"try_contInput try_blur\" val=\"公司名称\" value=\"公司名称\" reMsg=\"不能为空\" errorMsg=\"\" /><span class=\"error_msg\"></span></div><div class=\"try_contBox\"><span class=\"try_contTitle\">验证码：</span><a class=\"try_inputIcon\" style=\"left:340px\"></a><input name=\"verify_code\" maxlength=\"4\" id=\"verify_code\" type=\"text\" class=\"try_contInput try_blur\" val=\"验证码\" value=\"验证码\" reMsg=\"不能为空\" errorMsg=\"验证码格式不正确\" style=\"ime-mode:disabled;width:160px\" /><img id=\"imgCode\" title=\"看不清，点击换一张\" src=\"https://www.263.net/verifyCode.jspx\" onclick=\"this.src='https://www.263.net/verifyCode.jspx?a='+ Math.random()\" style=\"float:left;margin:5px 0 0 5px;\" /><span class=\"error_msg\"></span></div><br class=\"clear\"/><div class=\"topUp_boxCont topUp_boxDis topUp_boxHight topUp_boxHight_next try_inputDis\"><a class=\"try_sub\" href=\"javascript:;\">提    交</a><span class=\"server_error\" style=\"display:none;\">  <font color='red'>服务器异常，请稍后重试</font></span></div></div><!--提交成功--><div class=\"try_cont try_result disNone\" style=\"margin-top: 40px;height: 130px;\"><div class=\"try_success\"><p class=\"font28\" style=\"padding-top:25px\">提交成功</p></div></div><!--提交成功end--><div class=\"try_bottom\"></div>";
		tryBoxCon.html(boxHtml);
	}
	
	// 免费试用表单验证
					$(".try_blur").blur(function() {
										// var telReg = /^[0-9-()]+$/,
										var telReg = /^([0-9]{3,4}-)?[0-9]{7,8}$/, mobileReg = /^((\+?86)|(\(\+86\)))?(1[34578][0-9]{9})$/, mailReg = /^[A-Za-z0-9]+([-_.]\w+)*@[\w-]+(\.[\w-]+)+$/, lenReg = /^[a-zA-Z0-9-——.()（）\u4e00-\u9fa5]{2,50}$/;
										;
										var reMsg = $(this).attr("reMsg"), errorMsg = $(
												this).attr("errorMsg"), errorMsgTel = $(
												this).attr("errorMsgTel"), errorMsgMobile = $(
												this).attr("errorMsgMobile"), val = $(
												this).attr("val"),
										// try_code =
										// $.trim($(".try_code").val().replace($(".try_code").attr("val"),"")),
										thisVal = $(this).val();
										if (val == thisVal || $.trim(thisVal) == "") {
												if(($(this).attr("name") != "email")){											
													$(this).siblings(".error_msg").html(reMsg);
													$(this).siblings("a.try_inputIcon").removeClass("try_inputIcon_suc");
													$(this).siblings("a.try_inputIcon").addClass("try_inputIcon_error");
												}else{													
													$(this).siblings(".error_msg").html("");
													$(this).siblings("a.try_inputIcon").removeClass("try_inputIcon_suc");
													$(this).siblings("a.try_inputIcon").removeClass("try_inputIcon_error");
												}
										} else if (($(this).attr("name") == "userName")|| ($(this).attr("name") == "company")) {
											if (!lenReg.test(thisVal)) {
												($(this).attr("name") == "userName")&& ($(this).siblings(".error_msg").html("联系人输入不正确"));
												($(this).attr("name") == "company")&& ($(this).siblings(".error_msg").html("公司输入不正确"));
												$(this).siblings("a.try_inputIcon").removeClass("try_inputIcon_suc");
												$(this).siblings("a.try_inputIcon").addClass("try_inputIcon_error");
											} else {
												$(this).siblings(".error_msg").html("");
												$(this).siblings("a.try_inputIcon").removeClass("try_inputIcon_error");
												$(this).siblings("a.try_inputIcon").addClass("try_inputIcon_suc");
											}
										} else if ($(this).hasClass("tel")) {if (thisVal != "" && thisVal.indexOf('-') != -1) {
												if (!telReg.test(thisVal)) {
													$(this).siblings(".error_msg").html(errorMsgTel);
													$(this).siblings("a.try_inputIcon").removeClass("try_inputIcon_suc");
													$(this).siblings("a.try_inputIcon").addClass("try_inputIcon_error");
												} else {
													$(this).siblings(".error_msg").html("");
													$(this).siblings("a.try_inputIcon").removeClass("try_inputIcon_error");
													$(this).siblings("a.try_inputIcon").addClass("try_inputIcon_suc");
												}
											} else if (thisVal != "" && thisVal.indexOf('-') == -1) {
												if (!mobileReg.test(thisVal)) {
													$(this).siblings(".error_msg").html(errorMsgMobile);
													$(this).siblings("a.try_inputIcon").removeClass("try_inputIcon_suc");
													$(this).siblings("a.try_inputIcon").addClass("try_inputIcon_error");
												} else {
													$(this).siblings(".error_msg").html("");
													$(this).siblings("a.try_inputIcon").removeClass("try_inputIcon_error");
													$(this).siblings("a.try_inputIcon").addClass("try_inputIcon_suc");
												}
											}
										} else if ($(this).hasClass("email")) {
											if (!mailReg.test(thisVal) || !emailCheck("email")) {
												$(this).siblings(".error_msg").html(errorMsg);
												$(this).siblings("a.try_inputIcon").removeClass("try_inputIcon_suc");
												$(this).siblings("a.try_inputIcon").addClass("try_inputIcon_error");
											} else {
												$(this).siblings(".error_msg").html("");
												$(this).siblings("a.try_inputIcon").removeClass("try_inputIcon_error");
												$(this).siblings("a.try_inputIcon").addClass("try_inputIcon_suc");
											}
											// 校验验证码
										} else if (($(this).attr("name") == "verify_code")) {
											if (!(/^\d{4}$/.test(thisVal))) {
												$(this).siblings(".error_msg").html(errorMsg);
												$(this).siblings("a.try_inputIcon").removeClass("try_inputIcon_suc");
												$(this).siblings("a.try_inputIcon").addClass("try_inputIcon_error");
											} else {
												var verifyCode = thisVal, userNameSales = $("#userNameSales").val(),
												// code = $("#code").val(),
												tel = $("#tel").val().replace("-", ""), email = $("#email").val(), company = $("#company").val();
												// if(code=='座机区号'){code='';}
												$
														.ajax({
															dataType : "text",
															type : 'GET',
															async : false,
															cache : false,
															url : "/submitAct.jspx?a="+ Math.random(),
															data : {
																"inputCode" : verifyCode,
																"msg" : "linkMan="
																		+ userNameSales
																		+ "&linkMobile="
																		+ tel
																		+ "&linkEmail"
																		+ email
																		+ "&companyName="
																		+ company
															},
															target : $(this),
															success : function(r) {
																if (r == "false") {
																	this.target.siblings(".error_msg").html("验证码错误");
																	this.target.siblings("a.try_inputIcon").removeClass("try_inputIcon_suc");
																	this.target.siblings("a.try_inputIcon").addClass("try_inputIcon_error");
																} else {
																	this.target.siblings(".error_msg").html("");
																	this.target.siblings("a.try_inputIcon").removeClass("try_inputIcon_error");
																	this.target.siblings("a.try_inputIcon").addClass("try_inputIcon_suc");
																}
															}
														});
											}
										} else {
											$(this).siblings(".error_msg").html("");
											$(this).siblings("a.try_inputIcon").removeClass("try_inputIcon_error");
											$(this).siblings("a.try_inputIcon").addClass("try_inputIcon_suc");
										}
									});
					$(".try_inputDis .try_sub").bind("click",function() {
										$(".try_blur").blur();
										var errorLen = $(".try_cont a.try_inputIcon_error").length;
										if (errorLen == 0) {
											// 在这里提交数据到后台
											registToSale();
										}
									});
			
					///购买按钮点击操作
					$("input[name=productIds]").val(1);
					/*$('.btn-free').bind("click", function(){
						$(".try_box_buy,.overlay").show();
						var btnvalue = $(this).text();
						var btntext = $(this).text();
						var btnvalue1 = $(this).attr("title");
						if(btntext.indexOf('免费试用') > -1){
							if('电话会议'==btnvalue1){
								$("input[name=productIds]").val(2);
							}else if('云归档'==btnvalue1){
								$("input[name=productIds]").val(3);
							}else if('企业网盘'==btnvalue1){
								$("input[name=productIds]").val(4);
							}else if('企业直播'==btnvalue1){
								$("input[name=productIds]").val(8);
							}else if('演示预约'==btnvalue1){
								$("input[name=productIds]").val(9);
							}else {
								$("input[name=productIds]").val(1);
							}
						}else{
							if('电话会议'==btnvalue){
								$("input[name=productIds]").val(2);
							}else if('云归档'==btnvalue){
								$("input[name=productIds]").val(3);
							}else if('企业网盘'==btnvalue){
								$("input[name=productIds]").val(4);
							}else if('企业直播'==btnvalue1){
								$("input[name=productIds]").val(8);
							}else if('演示预约'==btnvalue1){
								$("input[name=productIds]").val(9);
							}else {
								$("input[name=productIds]").val(1);
							}
						}
						
						$("#imgCode").attr("src","https://www.263.net/verifyCode.jspx?a=" + Math.random());
						$(".whenInput,.try_forms").show();
						$(".whenSuccess,.try_result").hide();
						
						var tempwindow=window.open('_blank'); // 先打开页面
                                                tempwindow.location="https://www.263.net/263/register/"; // 后更改页面地址
					});*/
          $('.btn-free').attr('target', '_blank').attr("href","https://www.263.net/263/register/");
          $('.btn-speek').attr("href","https://p.qiao.baidu.com/cps/chat?siteId=9915149&userId=6257799&siteToken=d6329c2086ec87a286b0b26a49a301c9");
          $('.btn-chat').attr("href","https://p.qiao.baidu.com/cps/chat?siteId=9915149&userId=6257799&siteToken=d6329c2086ec87a286b0b26a49a301c9");	
	  $('.btn-second').attr("href","https://p.qiao.baidu.com/cps/chat?siteId=9915149&userId=6257799&siteToken=d6329c2086ec87a286b0b26a49a301c9");
				
	//初始化输入框
	$("input.try_contInput").focus(function(){				
				$(this).addClass("try_contInput_hover");
				$(this).css("color","#333");//
				var fVal = $(this).attr("val");
				var tVal =  $.trim($(this).val());
				if(tVal == fVal){
					$(this).val("");
				}
			}).blur(function(){
				$(this).removeClass("try_contInput_hover");
				var fVal = $(this).attr("val");
				var tVal =  $.trim($(this).val());
				if(tVal == ""){
					$(this).css("color","#B4B7BB");//
					$(this).val(fVal);
				}
			});
	/*视频播放*/
	$(".try_box_buy .btn-close").click(function(){
		$(".overlay,.try_box_buy").hide();
	})

	/*------根据来源修改销售热线------------*/
	function hotlineUpdate(hotline){
		var exp = new Date();
		exp.setTime(exp.getTime() +10080*60*1000);//过期时间 7天
		document.cookie ="hotline=" + escape(hotline) + ";expires=" + exp.toGMTString()+";path=/;domain=.263.net";
	}
	function getCookie(cookieName) {
	    var allcookies = document.cookie;
	    var cookiePos = allcookies.indexOf(cookieName); //索引的长度
	    if (cookiePos != -1) {
	        // 把cookie_pos放在值的开始，只要给值加1即可。
	        cookiePos += cookieName.length + 1;
	        var cookieEnd = allcookies.indexOf(";", cookiePos);
	        if (cookieEnd == -1) {
	            cookieEnd = allcookies.length;
	        }
	        var value = decodeURI(allcookies.substring(cookiePos, cookieEnd));
	    }
	    return value;
	}

		//来源及电话设置
		if(window.location.href.indexOf("baidu") != -1 ){
		 	hotlineUpdate('400-603-6263')//百度
	    }else if(window.location.href.indexOf("360") != -1 ){
	    		hotlineUpdate('400-602-9263')//360
	    }else if(window.location.href.indexOf("sogou") != -1 ){
	    		hotlineUpdate('400-650-8263')//搜狗
	    }
		var hotline=getCookie('hotline');
		if(typeof hotline != 'undefined' && hotline != null ){
			$(".hotline-number").html(hotline);//重置电话
			$(".warp a.btn-call").attr("href","tel:"+hotline);
		}

    //首页产品
    $(".index-products ul li").on("mouseenter",function(){
    	 	$(".index-products ul li").removeClass("on")
    		$(this).addClass("on")
    		$(".index-products-box .section").hide().eq($(this).index()).show()
    })
     //首页客户证言
    $(".logo-left li,.logo-right li").on("mouseenter",function(){
    		$(".logo-left li,.logo-right li").removeClass("on");
    		$(this).addClass("on");
	    var i=	$(this).index();
	    	if($(this).parent().hasClass("logo-right")){
	    		i=i+3;
	    	};
	    $(".index-customsay").find(".con").children("li").fadeOut(0).eq(i).fadeIn(500);
    })
    //表格收缩
    /*$(".btn-more").click(function(){
		if($("table").find("tr:last").is(':hidden')){
			$("tr").show()
			$(".btn-more").html("--- 收起 ---")
		}else{
			$("tr").slice(7).hide()
			$(".btn-more").html("--- 显示全部 ---")
		}
	})*/

	//售前咨询非工作时间
		setTimeout(function(){
		if($("#newBridge").length<=0){
			$("body").append('<div class="consult-offline-box"><img class="consult-offline" src="https://www.263.net/r/cms/www/web2018/img/consult-offline.png"/></div><div class="consult-offline-confirm" style="display: none;"><div class="confirm-box"><div class="list"><i class="btn-close" href="javascript:;"></i><br><b>在线客服</b><br><br><p>如您有购买产品需求，可以留言提交您的信息，我们将第一时间与您联系。</p><a target="_blank" href="https://www.sobot.com/chat/pc_new/index.html?sysNum=27528a014a374aaea723e066795bf0f3&groupId=7b2a0ead5dd74e4187c9560c1734e1e8">在线客服</a></div><div class="list list-online"><br><b>售后服务</b><br><br><p>如果您有产品使用上的问题，可以实时跟我们的售后支持在线沟通。<br></p><a target="_blank" href="https://www.sobot.com/chat/pc_new/index.html?sysNum=27528a014a374aaea723e066795bf0f3&groupId=7b2a0ead5dd74e4187c9560c1734e1e8">在线客服</a></div></div></div>')
		}
	},3000)
	$(".consult-offline-confirm .confirm-box .list .btn-close").live("click",function(){
		$(".consult-offline-confirm").fadeOut(200);
		})
	$(".consult-offline-box").live("click",function(){
		$(".consult-offline-confirm").fadeIn(200);
		})
    
}); 

// 返回顶部
(function($){
	var goToTopTime;
	$.fn.goToTop=function(options){
		var opts = $.extend({},$.fn.goToTop.def,options);
		var $window=$(window);
		$body = (window.opera) ? (document.compatMode == "CSS1Compat" ? $('html') : $('body')) : $('html,body'); // opera fix
		//$(this).hide();
		var $this=$(this);
		clearTimeout(goToTopTime);
		goToTopTime=setTimeout(function(){
			var cssfixedsupport=$.browser.msie && parseFloat($.browser.version) < 7;//判断是否ie6
			var controlTop=$window.height() - $this.height()-opts.pageHeightJg;
			controlTop=cssfixedsupport ? $window.scrollTop() + controlTop : controlTop;
			var shouldvisible=( $window.scrollTop() >= opts.startline )? true : false;
			
			if (shouldvisible){
				//$this.stop().show();
				$this.fadeIn(300);
			}else{
				//$this.stop().hide();
				$this.fadeOut(300);
			}
			
			$this.css({position: cssfixedsupport ? 'absolute' : 'fixed'});},30);
		
		$(this).click(function(event){
			$body.stop().animate( { scrollTop: $(opts.targetObg).offset().top}, opts.duration);
			$(this).blur();
			event.preventDefault();
			event.stopPropagation();
		});
	};
	
	$.fn.goToTop.def={
		pageWidth:910,//页面宽度
		pageWidthJg:2,//按钮和页面的间隔距离
		pageHeightJg:100,//按钮和页面底部的间隔距离
		startline:600,//出现回到顶部按钮的滚动条scrollTop距离
		duration:500,//回到顶部的速度时间
		targetObg:"body"//目标位置
	};
})(jQuery);
$(function(){
	$('<a href="javascript:;" class="backToTop" title="返回顶部"><span>回到顶部</span></a>').appendTo("body");
});


//导航
(function($) {
  $.fn.menumaker = function(options) {
      var cssmenu = $(this), settings = $.extend({
        title: "导航",
        format: "dropdown",
        sticky: false
      }, options);

      return this.each(function() {
        cssmenu.prepend('<div id="menu-button">' + settings.title + '</div>');
        $(this).find("#menu-button").on('click', function(){
          $(this).toggleClass('menu-opened');
          var mainmenu = $(this).next('ul');
          if (mainmenu.hasClass('open')) { 
            mainmenu.hide().removeClass('open');
          }
          else {
            mainmenu.show().addClass('open');
            if (settings.format === "dropdown") {
              mainmenu.find('ul').show();
            }
          }
        });

        cssmenu.find('li ul').parent().addClass('has-sub');

        multiTg = function() {
          cssmenu.find(".has-sub").prepend('<span class="submenu-button"></span>');
          cssmenu.find('.submenu-button').on('click', function() {
            $(this).toggleClass('submenu-opened');
            if ($(this).siblings('ul').hasClass('open')) {
              $(this).siblings('ul').removeClass('open').hide();
            }
            else {
              $(this).siblings('ul').addClass('open').show();
            }
          });
        };

        if (settings.format === 'multitoggle') multiTg();
        else cssmenu.addClass('dropdown');

        if (settings.sticky === true) cssmenu.css('position', 'fixed');

        resizeFix = function() {
          if ($( window ).width() > 768) {
            cssmenu.find('ul').show();
          }

          if ($(window).width() <= 768) {
            cssmenu.find('ul').hide().removeClass('open');
          }
        };
        resizeFix();
        return $(window).on('resize', resizeFix);

      });
  };
})(jQuery);

(function($){
$(document).ready(function() {
	  $("#cssmenu").menumaker({
	    title: "<a class='logo' href='https://www.263.net'><img src='https://www.263.net/r/cms/www/web2018/img/nav-logo.png'/></a><a href='tel:400-650-6263' class='hotline'><font class='hotline-number'>400-650-6263</font></a>",
	    format: "multitoggle"
	  });
	
	  //$("#cssmenu").prepend("<div id='menu-line'></div>");
	
	var foundActive = false, activeElement, linePosition = 0, menuLine = $("#cssmenu #menu-line"), lineWidth, defaultPosition, defaultWidth;
	
	$("#cssmenu > ul > li").each(function() {
	  if ($(this).hasClass('active')) {
	    activeElement = $(this);
	    foundActive = true;
	  }
	});
	
	if (foundActive === false) {
	  activeElement = $("#cssmenu > ul > li").first();
	}
	
	defaultWidth = lineWidth = activeElement.width();
	
	defaultPosition = linePosition = activeElement.position().left;
	
	menuLine.css("width", lineWidth);
	menuLine.css("left", linePosition);
	
	$("#cssmenu > ul > li").hover(function() {
	  activeElement = $(this);
	  lineWidth = activeElement.width();
	  linePosition = activeElement.position().left;
	  menuLine.css("width", lineWidth);
	  menuLine.css("left", linePosition);
	  event.stopPropagation();
	}, 
	function() {
	  menuLine.css("left", defaultPosition);
	  menuLine.css("width", defaultWidth);
	});
	/*右侧客服*/
	$(".right-service .btn").on("mouseover",function(){
		$(".right-service .service-detail .service-box").fadeIn(200)
	})
	$(".right-service .service-detail .service-box").on("mouseleave",function(){
		$(this).fadeOut(200)
	})
	$(".right-service .service-detail .service-box .box-close").on("click",function(){
		$(".right-service .service-detail .service-box").fadeOut(200)
	})
	
	/*登录窗体*/
	$(".login-icon").on("mouseenter",function(){
		$(this).children(".iframe-login").fadeIn(200)
	})
	$(".login-icon .iframe-login").on("mouseleave",function(e){
		var o = e.relatedTarget || e.toElement;//解决chrome内核点击触发该事件
          	if (!o) return;
		$(this).fadeOut(200)
	})
	
	/*视频播放*/
	$(".video-box .btn-close").click(function(){
		$(".video-box .videoCon").html("");
		$(".overlay,.video-box").hide();
	})
	// JavaScript Document
	
	/*解决方案二级导航*/
	$(function(){
		
		 var divTopArr = []; 
		 for(var i=0;i<$('.floor').length;i++){ 
		 	divTopArr.push($('.floor').eq(i).offset().top); 
		 }
		 $('.solution-nav-li li').on("click",function(){ 
		 	$('body,html').animate({scrollTop:divTopArr[$(this).index()]+'px'},1000); 
		 })
	
		//添加页面滚轮滚动事件， 
		$(window).scroll(function(){ 
			var scrollTop = $(window).scrollTop(); 
			for(i=0;i<$('.floor').length;i++){ 
				if(scrollTop < divTopArr[divTopArr.length-1]){
					if(scrollTop >= divTopArr[i] && scrollTop < divTopArr[i+1]){ 
						$(".solution-nav-li li a").removeClass("cur"); 
						$(".solution-nav-li li").eq(i).children("a").addClass("cur");
					} 
				}else{ 
					$(".solution-nav-li li a").removeClass("cur"); 
					$(".solution-nav-li li").eq(divTopArr.length-1).children("a").addClass("cur");
				} 
			} 
		}) 
	})

});
})(jQuery);


function videoplay(title,url,width,height){
		$(".overlay,.video-box").show();
		$(".video-box h4").html(title);
		$(".video-box .videoCon").html("<video src="+url+" controls autobuffer autoplay><div style='width:"+width+"px;height:"+height+"px;background:#f1f1f1;text-align:center;font-size:14px'><div style='font-size:20px'><br><br><br><br><font color='#ff3300'>抱歉，该浏览器不支持H5视频播放</font></div><br><br>建议使用Edge、Chrome、火狐或IE9及以上浏览器访问<br><br>也可以 <a href="+url+" style='font-size:18px'>点击下载</a> 观看. </div></video>");
	}

//返回顶部
$(function(){
	$(".backToTop").goToTop();
	$(window).bind('scroll resize',function(){
		$(".backToTop").goToTop();
	});
});