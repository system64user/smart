var Member = {
	init: function()
	{
//		Event.observe("user_id", "keyup", Member.check_user_id);
//		Event.observe("user_name", "keyup", Member.check_user_name);
//		Event.observe("passwd", "keyup", Member.check_passwd);
//		Event.observe("re_passwd", "keyup", Member.check_re_passwd);
//		Event.observe("email", "keyup", Member.check_email);
//		Event.observe("direct_email", "keyup", Member.check_direct_email);

		if(document.loginform != undefined)	 Member.frm_login = document.loginform;
		if(document.joinform != undefined)	 Member.frm_join = document.joinform;
		if(document.searchform != undefined) Member.frm_search = document.searchform;

		this.isSubmitted = false;
		this.captcha = false;
		this.redirectUrl = '';
	},
	search_formchk: function()
	{
		var search_email = Member.frm_search.search_email.value;

		if(search_email.length < 4)
		{
			$('#p_id_fail').hide();
			$('#p_email_fail').hide();
			$('#p_captcha_fail').hide();

			window.alert('이메일 주소나 아이디를 입력해주세요.');
			Member.frm_search.search_email.focus();
			return false;
		}
		else if (Member.frm_search.gcaptcha_value.value==Member.frm_search.gcaptcha_value.defaultValue || Member.frm_search.gcaptcha_value.value.length < 4)
		{
			$('#p_id_fail').hide();
			$('#p_email_fail').hide();
			$('#p_captcha_fail').show();
			Member.frm_search.gcaptcha_value.focus();
			return false;
		}
		else
		{
			var url = '/member/check_info';
			var param = 'search_email=' + search_email + "&gcaptcha_vcid=" + Member.frm_search.gcaptcha_vcid.value + "&gcaptcha_value=" + Member.frm_search.gcaptcha_value.value;

			Ajax.call_ajax(url, param, Member.result_search);
		}
	},
	result_search: function(data)
	{
		if(data['CODE'] == 'OK')
		{
			Member.frm_search.submit();
		}
		else if(data['CODE'] == 'CAPTCHA')
		{
			$('#p_id_fail').hide();
			$('#p_email_fail').hide();
			$('#p_captcha_fail').show();
		}
		else if(data['CODE'] == 'EMAIL')
		{
			$('#p_id_fail').hide();
			$('#p_email_fail').show();
			$('#p_captcha_fail').hide();
		}
		else if(data['CODE'] == 'ID')
		{
			$('#p_id_fail').show();
			$('#p_email_fail').hide();
			$('#p_captcha_fail').hide();
		}

		gcaptchaapi.ReloadImage();
		this.blur();
		return false;
	},
	input_user_id: function()
	{
		var user_id		= Member.frm_login.userid.value;
		//var pattern	= /^[a-z0-9_\-]{6,16}$/;
		var pattern	= /^[a-z0-9_\-]{0,16}$/;
		var auth = /^[ㄱ-ㅎㅏ-ㅣ가-힝]/;

		if(user_id.length < 1)
		{
			$('#div_login_userid').addClass('err');
			$('#desc_login_userid_err1').show();
			$('#desc_login_userid_err2').hide();
			Member.frm_login.userid.focus();
		}
		//else if(false == pattern.test(user_id))
		else if(false)
		{
			$('#div_login_userid').addClass('err');
			$('#desc_login_userid_err1').hide();
			$('#desc_login_userid_err2').show();
			Member.frm_login.userid.focus();
		}
		else if(auth.test(user_id))
		{
			$('#div_login_userid').addClass('err');
			$('#desc_login_userid_err1').hide();
			$('#desc_login_userid_err2').show();
			Member.frm_login.userid.focus();
		}
		else
		{
			$('#div_login_userid').removeClass('err');
			$('#desc_login_userid_err1').hide();
			$('#desc_login_userid_err2').hide();
		}
	},
	input_user_pwd: function()
	{
		var user_pwd	= Member.frm_login.userpwd.value;

		if(user_pwd.length < 6)
		{
			$('#div_login_userpwd').addClass('err');
			$('#desc_login_userpwd').show();
			Member.frm_login.userpwd.focus();
		}
		else
		{
			$('#div_login_userpwd').removeClass('err');
			$('#desc_login_userpwd').hide();
		}
	},
	input_gcaptcha_value: function()
	{
		if (Member.frm_login.gcaptcha_value.value==Member.frm_login.gcaptcha_value.defaultValue || Member.frm_login.gcaptcha_value.value.length < 4)
		{
			$('#div_captcha').addClass('err');
			$('#desc_login_gcaptcha').show();
			Member.frm_login.gcaptcha_value.focus();
		}
		else
		{
			$('#div_captcha').removeClass('err');
			$('#desc_login_gcaptcha').hide();
		}
	},
	check_office_id: function()
	{
		var office_id = $.trim($('#office_id').val());

		if(office_id === ''){
			alert('도메인 또는 오피스 주소를 입력하세요');
			$('#office_id').focus();
			return;
		}
		var url = '/member/check_office_id';
		var param = 'office_id=' + office_id;

		Ajax.call_ajax(url, param, Member.result_check_office_id);
	},

	result_check_office_id: function(data)
	{
		if(data.result === 'ok'){
			if($('#office_save_flag').prop('checked')){
				console.log(data.input_office);
				setCookie('cook_save_office_id', data.input_office, 365);
			}
			document.location.href = data.url;
		}else{
			if(data.message){
				alert(data.message);
			}

			gtris.ui.modal.open({
				target: '#inaccurate-domain-modal'
			});
		}
	},

	login_formchk: function()
	{
		var user_id		= Member.frm_login.userid.value;
		var user_pwd	= Member.frm_login.userpwd.value;
		//var pattern	= /^[a-z0-9_\-]{6,16}$/;
		var pattern	= /^[a-z0-9_\-]{0,16}$/;
		var auth = /^[ㄱ-ㅎㅏ-ㅣ가-힝]/;
		var kid_pattern = /^[-A-Za-z0-9_]+[-A-Za-z0-9_.]*[@]{1}[-A-Za-z0-9_]+[-A-Za-z0-9_.]*[.]{1}[A-Za-z]{2,10}$/i; // i : 대소문자 구분없음.

		if(user_id.length < 1)
		{
			$('#div_login_userid').addClass('err');
			$('#desc_login_userid_err1').show();
			$('#desc_login_userid_err2').hide();
			Member.frm_login.userid.focus();
			return false;
		}
		else if(kid_pattern.test(user_id))
		{
			$('#office_id').val(user_id);

			gtris.ui.modal.open({
				target: '#kid-notice-modal'
			});

			return false;
		}
		else if(auth.test(user_id)){
			$('#div_login_userid').addClass('err');
			$('#desc_login_userid_err1').hide();
			$('#desc_login_userid_err2').show();
			Member.frm_login.userid.focus();
			return false;
		}
		else if(user_pwd.length < 6)
		{
			$('#div_login_userpwd').addClass('err');
			$('#desc_login_userpwd').show();
			Member.frm_login.userpwd.focus();
			return false;
		}
		else if(this.captcha)
		{ 
			if (Member.frm_login.gcaptcha_value.value==Member.frm_login.gcaptcha_value.defaultValue || Member.frm_login.gcaptcha_value.value.length < 4)
			{
			
				$('#div_captcha').addClass('err');
				$('#desc_login_gcaptcha').show();
				Member.frm_login.gcaptcha_value.focus();
				return false;
			}
		}
		else
		{
			if(typeof ip_security != 'undefined' && jQuery.inArray(ip_security, ['-1', '1', '2'] > 0)){
				setCookie('cook_save_ip_check', ip_security, 365);
				Member.frm_login.ip_security.value = ip_security;
			}
			if(this.isSubmitted === false){
				this.isSubmitted = true;
				//Member.frm_login.action = '/member/login_chk';
				//Member.frm_login.submit();
				var formData = $('#loginform').serialize();
				$.ajax({
					cache : false,
					url : "/member/login_chk",
					type : 'POST',
					data : formData,
					success : function(data) {
						Member.isSubmitted = false;
						var resultData = JSON.parse(data);
						console.log(resultData);
						if(resultData.resultCode === "SUCCESS"){
							Member.redirectUrl = resultData.result.redirect_url;
							if(resultData.result.office_id.length === 0){
								document.location.href = resultData.result.redirect_url;
								return;
							}
							if(Member.get_cookie('closeOfficeNoticeDisplay') === '1'){
								document.location.href = resultData.result.redirect_url;
								return;
							}else {
								$('.userid-text').html(resultData.result.user_id);
								$('.officeid-text').html(resultData.result.office_id);
								gtris.ui.modal.open({target: '#close-group-office'});
							}
						}else{
							if(resultData.message){
								alert(resultData.message);
								document.location.reload();
							}
						}
					}, // success

					error : function(xhr, status) {
						Member.isSubmitted = false;
						alert(xhr + " : " + status);
					}
				})
			}
		}
	},
	confirm_close_office: function()
	{
		if($('#closeOfficeNoticeDisplay').prop('checked')){
			Member.set_cookie('closeOfficeNoticeDisplay', '1', 1);
		}
		document.location.href = Member.redirectUrl;
	},
	set_cookie: function(c_name,value,expiredays){
		var exdate=new Date();exdate.setDate(exdate.getDate()+expiredays);
		document.cookie=c_name+ "=" +escape(value)+((expiredays==null) ? "" : ";expires="+exdate.toGMTString());
	},
	get_cookie: function(c_name)
	{
		if (document.cookie.length>0)
		{
			c_start=document.cookie.indexOf(c_name + "=");

			if (c_start!=-1)
			{
				c_start=c_start + c_name.length+1;
				c_end=document.cookie.indexOf(";",c_start);
				if (c_end==-1) c_end=document.cookie.length;
				return unescape(document.cookie.substring(c_start,c_end));
			}
		}

		return "";
	},
	domain_login_formchk: function()
	{
		var user_id		= Member.frm_login.kid_userid.value.trim();
		var user_pwd	= Member.frm_login.kid_userpwd.value;
		var pattern		= /^[-A-Za-z0-9_]+[-A-Za-z0-9_.]*[@]{1}[-A-Za-z0-9_]+[-A-Za-z0-9_.]*[.]{1}[A-Za-z]{2,10}$/i; // i : 대소문자 구분없음.
		var auth = /^[ㄱ-ㅎㅏ-ㅣ가-힝]/;

		if(user_id.length < 1)
		{
			window.alert('아이디를 입력해주세요.');
			Member.frm_login.kid_userid.focus();
			return false;
		}
		else if(false == pattern.test(user_id))
		{
			window.alert('아이디를 이메일형식으로 입력해주세요.');
			Member.frm_login.kid_userid.focus();
			return false;
		}
		else if(user_pwd.length < 1)
		{
			window.alert('비밀번호를 입력해주세요.');
			Member.frm_login.kid_userpwd.focus();
			return false;
		}
		else
		{
			if(ip_security && jQuery.inArray(ip_security, ['-1', '1', '2'] > 0)){
				setCookie('cook_save_domain_ip_check', ip_security, 365);
				Member.frm_login.ip_security.value = ip_security;
			}
			Member.frm_login.action = '/member/domain_login_chk';
			Member.frm_login.submit();
		}
	},
	check_user_id: function()
	{
		var user_id = Member.frm_join.join_userid.value;
		var pattern	= /^[a-z0-9]{6,16}$/;

		if(false == pattern.test(user_id))
		{
			$('#div_join_userid').addClass('err');
			$('#desc_join_userid').html('* 6~16자리 영문 소문자,숫자만 사용');
			$('#desc_join_userid').show();
			Member.frm_join.userid_chk_flag.value = 0;
		}
		else
		{
			var url = '/member/check_userid';
			var param = 'user_id=' + user_id;

			Ajax.call_ajax(url, param, Member.result_userid);
		}
	},
	result_userid: function(data)
	{
		if(data.check == "NOT")
		{
			// 사용가능한 아이디
			$('#div_join_userid').removeClass('err');
			$('#desc_join_userid').hide();
			Member.frm_join.userid_chk_flag.value = 1;
		}
		else
		{
			// 존재하는 아이디
			$('#div_join_userid').addClass('err');
			$('#desc_join_userid').html('사용할 수 없는 아이디입니다.');
			$('#desc_join_userid').show();
			Member.frm_join.userid_chk_flag.value = 0;
		}
	},
	check_user_name: function(obj)
	{
		var user_name = Member.frm_join.join_username.value;
		user_name = $.trim(user_name);

		var user_name_flag = true;

		if(user_name.length < 2)
		{
			user_name_flag = false;
		}
		else if (user_name.search(/(\")/) >= 0 || user_name.search(/(\')/) >= 0)
		{
			user_name_flag = false;
		}
		else if(user_name.length > 20)
		{
			user_name_flag = false;
		}

		if(user_name_flag)
		{
			// 사용가능한 이름
			$('#div_join_username').removeClass('err');
			Member.frm_join.username_chk_flag.value = 1;
		}
		else
		{
			// 사용불가능한 이름
			$('#div_join_username').addClass('err');
			Member.frm_join.username_chk_flag.value = 0;
		}
	},
	check_passwd: function()
	{
		var user_id		= Member.frm_join.join_userid.value;
		var passwd		= Member.frm_join.join_passwd.value;
		var re_passwd	= Member.frm_join.join_repasswd.value;

		if(user_id === passwd)
		{
			// 사용불가능한 비밀번호
			$('#div_join_passwd').addClass('err');
			$('#desc_join_passwd').show();
			Member.frm_join.passwd_chk_flag.value = 0;
		}
		else if(Member.valid_check_passwd(passwd) == 1)
		{
			// 사용가능한 비밀번호
			$('#div_join_passwd').removeClass('err');
			$('#desc_join_passwd').hide();
			Member.frm_join.passwd_chk_flag.value = 1;
		}
		else
		{
			passwd_chk = Member.valid_check_passwd(passwd);
			switch(passwd_chk){
				case -1 :
				case -2 : 
					$('#desc_join_passwd').html('* 영문 소문자,숫자,특수문자 중 2종을 조합해주세요. (8~16자)');
					break;
				case -3 :
					$('#desc_join_passwd').html('* 작은따옴표(\'), 큰따옴표(\"), 역슬래시(\\), 공백 사용 불가');
					break;
				case -4 :
					$('#desc_join_passwd').html('* 같은 문자 연속해서 4개 이상 사용 불가');
					break;
				default : 
					$('#desc_join_passwd').html('* 영문(소),숫자,특수문자 중 2종을 조합해주세요. (8~16자)');
			}


			// 사용불가능한 비밀번호
			$('#div_join_passwd').addClass('err');
			$('#desc_join_passwd').show();
			Member.frm_join.passwd_chk_flag.value = 0;
		}

		if(passwd === re_passwd && passwd.length > 5)
		{
			// 비밀번호 일치
			$('#div_join_repasswd').removeClass('err');
			$('#desc_join_repasswd').hide();
			Member.frm_join.re_passwd_chk_flag.value = 1;
		}
		else if(re_passwd !== "")
		{
			// 비밀번호 불일치
			$('#div_join_repasswd').addClass('err');
			$('#desc_join_repasswd').show();
			Member.frm_join.re_passwd_chk_flag.value = 0;
		}
	},
	check_repasswd: function()
	{
		var passwd		= Member.frm_join.join_passwd.value;
		var re_passwd	= Member.frm_join.join_repasswd.value;

		if(passwd == re_passwd)
		{
			// 비밀번호 일치
			$('#div_join_repasswd').removeClass('err');
			$('#desc_join_repasswd').hide();
			Member.frm_join.re_passwd_chk_flag.value = 1;
		}
		else
		{
			// 비밀번호 불일치
			$('#div_join_repasswd').addClass('err');
			$('#desc_join_repasswd').show();
			Member.frm_join.re_passwd_chk_flag.value = 0;
		}
	},
	check_email: function()
	{
		var email = Member.frm_join.join_useremail.value;
		var pattern	= /^[-A-Za-z0-9_]+[-A-Za-z0-9_.]*[@]{1}[-A-Za-z0-9_]+[-A-Za-z0-9_.]*[.]{1}[A-Za-z]{2,10}$/i; // i : 대소문자 구분없음.

		if(Member.frm_join.join_inputemail.value != Member.frm_join.join_useremail.value)
		{
			$('#sp_input_authkey').hide();
			$('#sp_complete_authkey').hide();

			$('#p_error_msg_1').hide();
			$('#p_error_msg_2').hide();
			$('#p_error_msg_3').show();
			$('#p_error_msg_4').hide();
		}

		if(pattern.test(email))
		{
			$('#div_join_email').removeClass('err');
		}
		else
		{
			$('#div_join_email').addClass('err');
		}
	},
	auth_email: function(type)
	{
		var email = Member.frm_join.join_useremail.value;
		var pattern	= /^[-A-Za-z0-9_]+[-A-Za-z0-9_.]*[@]{1}[-A-Za-z0-9_]+[-A-Za-z0-9_.]*[.]{1}[A-Za-z]{2,10}$/i; // i : 대소문자 구분없음.

		if(pattern.test(email))
		{
			$('#div_join_email').removeClass('err');

			var url = '/member/auth_email';
			var param = 'email=' + email + "&type=" + type;

			Ajax.call_ajax(url, param, Member.result_auth_email);
		}
		else
		{
			$('#div_join_email').addClass('err');
			window.alert('메일 계정은 영문 대소문자, 숫자, [.(마침표), -(하이픈), _(언더바)] 사용 가능');
		}
	},
	result_auth_email: function(data)
	{
		if(data['CODE'] == 'OK')
		{
			Member.frm_join.join_inputemail.value = Member.frm_join.join_useremail.value;

			$('#sp_input_authkey').show();
			$('#sp_complete_authkey').hide();

			$('#p_error_msg_1').show();
			$('#p_error_msg_2').hide();
			$('#p_error_msg_3').hide();
			$('#p_error_msg_4').hide();

			$('#join_authkey').addClass('errint');

			window.alert(data['MESSAGE']);
		}
		else if(data['CODE'] == 'USED')
		{
			Member.frm_join.join_inputemail.value = Member.frm_join.join_useremail.value;

			$('#sp_input_authkey').hide();
			$('#sp_complete_authkey').hide();

			$('#p_error_msg_1').hide();
			$('#p_error_msg_2').hide();
			$('#p_error_msg_3').hide();
			$('#p_error_msg_4').show();
		}
		else
		{
			window.alert(data['MESSAGE']);
		}
	},
	unique_auth_email: function()
	{
		Member.auth_email('except_unique');
	},
	check_authkey: function()
	{
		var auth_key = Member.frm_join.join_authkey.value;

		if(auth_key.length > 4 && auth_key.length <= 10)
		{
			$('#join_authkey').removeClass('errint');
		}
		else
		{
			$('#join_authkey').addClass('errint');
		}
	},
	chk_auth_key: function(type)
	{
		var email		= Member.frm_join.join_useremail.value;
		var auth_key	= Member.frm_join.join_authkey.value;

		if(auth_key.length < 4)
		{
			$('#join_authkey').addClass('errint');

			$('#p_error_msg_1').hide();
			$('#p_error_msg_2').show();
			$('#p_error_msg_3').hide();
			$('#p_error_msg_4').hide();
		}
		else
		{
			var url = '/member/auth_email_check';
			var param = 'email=' + email + "&type=" + type + "&auth_key=" + auth_key;

			Ajax.call_ajax(url, param, Member.result_chk_auth_key);
		}
	},
	result_chk_auth_key: function(data)
	{
		if(data['CODE'] == 'OK')
		{
			Member.frm_join.auth_email_flag.value	= 1;
			Member.frm_join.auth_email.value		= data['email'];
			Member.frm_join.auth_key_email.value	= data['auth_key'];

			$('#sp_input_email').hide();
			$('#sp_input_authkey').hide();
			$('#sp_complete_authkey').show();
			$('#sp_complete_email').html(data['email']);

			$('#p_error_msg_1').hide();
			$('#p_error_msg_2').hide();
			$('#p_error_msg_3').hide();
			$('#p_error_msg_4').hide();
		}
		else if(data['CODE'] == 'FAIL')
		{
			Member.frm_join.auth_email_flag.value	= 0;
			Member.frm_join.auth_email.value		= "";

			window.alert(data['MESSAGE']);
		}
		else {
			window.alert(data['MESSAGE']);
			$('#sp_input_authkey').hide();
			
			$('#p_error_msg_1').hide();
			$('#p_error_msg_2').hide();
			$('#p_error_msg_3').hide();
			$('#p_error_msg_4').hide();

			$('#join_authkey').val('');
		}
	},
	cancel_auth_email: function(pValue)
	{
		if(pValue == undefined) pValue = "";

		Member.frm_join.auth_email_flag.value	= 0;
		Member.frm_join.auth_email.value		= "";
		Member.frm_join.join_useremail.value	= "";

		$('#div_join_email').addClass('err');
		$('#sp_input_email').show();
		$('#sp_input_authkey').hide();
		$('#sp_complete_authkey').hide();
		$('#sp_complete_email').val('');

		$('#p_error_msg_1').hide();
		$('#p_error_msg_2').hide();
		$('#p_error_msg_3').show();
		$('#p_error_msg_4').hide();

		$('#join_useremail').val('');
	},
	join_formchk: function()
	{
		if(Member.frm_join.userid_chk_flag.value != 1)
		{
			Member.frm_join.join_userid.focus();
		}
		else if(Member.frm_join.username_chk_flag.value != 1)
		{
			Member.frm_join.join_username.focus();
		}
		else if(Member.frm_join.passwd_chk_flag.value != 1)
		{
			Member.frm_join.join_passwd.focus();
		}
		else if(Member.frm_join.re_passwd_chk_flag.value != 1)
		{
			Member.frm_join.join_repasswd.focus();
		}
		else if(Member.frm_join.auth_email_flag.value != 1)
		{
			Member.frm_join.join_useremail.focus();
		}
		else if(Member.frm_join.agree_1.checked == false || Member.frm_join.agree_2.checked == false)
		{
			window.alert('하이웍스 서비스를 이용하시려면 회원 약관 및 개인정보 수집/이용 동의가 필요합니다.');
		}
		else
		{
			var user_name = $.trim($('#join_username').val());
			$('#join_username').val(user_name);
			Member.frm_join.submit();
		}
	},
	send_email_auth: function()
	{
		var sel_email = "";

		if($("input[name='sel_email']").length == 1)
		{
			// 이메일이 하나인 경우
			sel_email = $('#sel_email').val();
		}
		else
		{
			// 이메일이 하나 이상인 경우
			sel_email = $("input:radio[name='sel_email']:checked").val();
		}

		if(sel_email.length < 1)
		{
			window.alert("이메일을 선택해주세요.");
			return false;
		}
		else
		{
			var url = '/member/send_auth_key';
			var param = "email=" + sel_email;

			Ajax.call_ajax(url, param, Member.result_send_email_auth);
		}
	},
	result_send_email_auth: function(data)
	{
		window.alert(data['MESSAGE']);

		if(data['CODE'] == 'OK')
		{
			$('#send_email').hide();
			$('#lb_send_email').show();
			$('#re_send_email').show();
		}
		else
		{
			$('#send_email').show();
			$('#lb_send_email').hide();
			$('#re_send_email').hide();
		}
	},
	chk_email_auth: function()
	{
		if($('#auth_key').val().length < 1)
		{
			window.alert('인증 번호를 입력해주세요.');
			$('#auth_key').focus();
		}
		else
		{
			var sel_email = "";

			if($("input[name='sel_email']").length == 1)
			{
				// 이메일이 하나인 경우
				sel_email = $('#sel_email').val();
			}
			else
			{
				// 이메일이 하나 이상인 경우
				sel_email = $("input:radio[name='sel_email']:checked").val();
			}

			var url = '/member/check_auth_key';
			var param = "email=" + sel_email + "&auth_key=" + $('#auth_key').val();

			Ajax.call_ajax(url, param, Member.result_chk_email_auth);
		}
	},
	result_chk_email_auth: function(data)
	{
		if(data['CODE'] == 'OK')
		{
			document.initform.submit();
		}
		else
		{
			window.alert(data['MESSAGE']);
			if (data['URL']) {
				window.location.href=data['URL'];
			}
		}
	},
	submit_passwd: function()
	{
		if(Member.frm_join.passwd_chk_flag.value != 1)
		{
			Member.frm_join.join_passwd.focus();
		}
		else if(Member.frm_join.re_passwd_chk_flag.value != 1)
		{
			Member.frm_join.join_repasswd.focus();
		}
		else
		{
			var url = "/member/password_chk";
			var param = {'user_id':Member.frm_join.user_id.value, 'email':Member.frm_join.email.value, 'auth_key':Member.frm_join.auth_key.value, 'password':Member.frm_join.join_passwd.value}
			Ajax.call_ajax(url, param, function(data){
				if(data.CODE === "SUCCESS"){
					
				}else if(data.CODE === "IS"){
					$('#div_join_passwd').addClass('err');
					$('#desc_join_passwd').show();
					$('#desc_join_passwd').html(data.MESSAGE);
					Member.frm_join.join_passwd.focus();
					Member.frm_join.passwd_chk_flag.value = 0;
				}else if(data.CODE === "NOT"){
					Member.frm_join.passwd_chk_flag.value = 0;
					alert(data.MESSAGE);
					document.location.href = '/member/search_info';
				}
			}, false);
		}

		if(Member.frm_join.passwd_chk_flag.value === "1"){
			Member.frm_join.submit();
		}
	},
	calByte: function(str){
		var tcount = 0;
		var tmpStr = new String(str);
		var onechar;

		for(var k = 0; k < tmpStr.length; k++){
			onechar = tmpStr.charAt(k);

			if(escape(onechar).length > 4){
				tcount += 2;
			}else{
				tcount += 1;
			}
		}

		return tcount;
	},
	valid_check_passwd: function(passwd)
	{
		var return_flag		= 1;
		//var char_alpha	= 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
		var char_alpha		= 'abcdefghijklmnopqrstuvwxyz';
		var char_numeric	= '1234567890';
		//var char_special	= '`~!@#$%^*()-_=+|\\{}[];:"\'<>,.?\/';
		var char_special	= '`~!@#$%^*()-_=+|{}[];:<>,.?\/';
		var char_all		= char_alpha + char_numeric + char_special;

		var invalid_char= false;
		var num_cnt		= passwd.search(/[0-9]/);
		var alpha_cnt	= passwd.search(/[a-zA-Z]/);
		var special_cnt	= -1;

		// 동일문자 4회 반복인지 체크
		var matches = passwd.match(/(\w)\1\1\1/);

		if(passwd.length < 8 || passwd.length > 16){
			return_flag = -1;
		}else if(matches != null && matches.length > 1){
			return_flag = -4;	
		}else{
			for (i=0; i<passwd.length; i++){
				if (char_special.indexOf(passwd.substring(i,i+1)) >= 0){
					special_cnt++;
					break;
				}
			}

			for (i=0; i<passwd.length; i++){
				if(char_all.indexOf(passwd.substring(i,i+1)) < 0) {
					invalid_char = true;
				}
			}

			if(num_cnt + alpha_cnt + special_cnt < -1){
				return_flag = -2;
			}else if(invalid_char){
				return_flag = -3;
			}
		}

		return return_flag;
	},
	get_notice_list: function(notice_url)
	{
		$.ajax(
		{
			url: notice_url,
			dataType: 'jsonp',
			jsonp : "jsoncallback",
			data:"",
			error: function ()
			{
					alert ('데이터를 가져오는 동안 오류가 발생하였습니다.');
			},
			success: function (response)
			{
				window.alert(response['resultCode']);
			}
		}
		);
	},
	change_passwd: function()
	{
		if($('#passwd').val().length < 1)
		{
			$('#div_change_passwd').addClass('err');

			$('#p_passwd_error').show();
		}
		else
		{
			$('#div_change_passwd').removeClass('err');

			$('#p_passwd_error').hide();

			return true;
		}
		return false;
	},
	change_new_passwd: function()
	{

		if($('#new_passwd').val().length < 1)
		{
			$('#div_change_new_passwd').addClass('err');
			$('#p_new_passwd_error').show();
			$('#p_new_passwd_error').html('영문 소문자,숫자,특수문자 중 2종을 조합해주세요. (8~16자)');
		}
		else
		{
			var check_result = Member.valid_check_passwd($('#new_passwd').val());

			if(check_result == 1)
			{
				$('#div_change_new_passwd').removeClass('err');
				$('#p_new_passwd_error').hide();

				if($('#new_passwd').val() === $('#passwd').val()){
					$('#div_change_new_passwd').addClass('err');
					$('#p_new_passwd_error').show();
					$('#p_new_passwd_error').html('현재 비밀번호와 같습니다. 새 비밀번호를 입력하세요.');

					return false;
				}

				return true;
			}
			else if(check_result === -1 || check_result === -2)
			{
				$('#div_change_new_passwd').addClass('err');
				$('#p_new_passwd_error').show();
				$('#p_new_passwd_error').html('영문 소문자,숫자,특수문자 중 2종을 조합해주세요. (8~16자)');
			}
			else if(check_result === -3)
			{
				$('#div_change_new_passwd').addClass('err');
				$('#p_new_passwd_error').show();
				$('#p_new_passwd_error').html('작은따옴표(\'), 큰따옴표(\"), 역슬래시(\\), 공백 사용 불가');
			}
			else if(check_result === -4)
			{
				$('#div_change_new_passwd').addClass('err');
				$('#p_new_passwd_error').show();
				$('#p_new_passwd_error').html('같은 문자 연속해서 4개 이상 사용 불가');
			}
			else
			{
				$('#div_change_new_passwd').addClass('err');
				$('#p_new_passwd_error').show();
				$('#p_new_passwd_error').html('영문 소문자,숫자,특수문자 중 2종을 조합해주세요. (8~16자)');
			}
		}

		if($('#new_passwd').val() !== $('#new_passwd_re').val())
		{
			$('#div_change_new_passwd_re').addClass('err');
			$('#p_re_passwd_error').show();
			$('#p_re_passwd_error').html('비밀번호와 비밀번호 확인이 다릅니다.');
		}

		return false;

	},
	change_new_passwd_re: function()
	{
		if($('#new_passwd_re').val().length < 1)
		{
			$('#div_change_new_passwd_re').addClass('err');
			$('#p_re_passwd_error').show();
			$('#p_re_passwd_error').html('새 비밀번호를 다시 한번 입력해주세요');
		}
		else if($('#new_passwd').val() !== $('#new_passwd_re').val())
		{
			$('#div_change_new_passwd_re').addClass('err');
			$('#p_re_passwd_error').show();
			$('#p_re_passwd_error').html('비밀번호와 비밀번호 확인이 다릅니다.');
		}
		else
		{
			$('#div_change_new_passwd_re').removeClass('err');
			$('#p_re_passwd_error').hide();

			return true;
		}

		return false;
	},
	change_password_confirm: function()
	{
		if(Member.change_passwd() && Member.change_new_passwd() && Member.change_new_passwd_re())
		{
			if(confirm("비밀번호 변경 시 계정보안을 위해 로그인된 모든 브라우저 및 기기에서 로그아웃됩니다.\n비밀번호를 변경하시겠습니까?")){
				var url = '/member/change_password_prc';
				var param = "passwd=" + $('#passwd').val() + "&new_passwd=" + $('#new_passwd').val();

				Ajax.call_ajax(url, param, Member.result_change_password);
			}
		}
	},
	result_change_password: function(data)
	{
		if(data.RESULT === "SUCCESS")
		{
			window.alert(data.MESSAGE);
			document.location.href = '/';
		}
		else if(data.RESULT === "NOW")
		{
			$('#passwd').focus();
			$('#div_change_passwd').addClass('err');
			$('#p_passwd_error').show();
			$('#p_passwd_error').html(data.MESSAGE);
		}
		else if(data.RESULT === "NEW")
		{
			$('#div_change_new_passwd').addClass('err');
			$('#p_new_passwd_error').show();
			$('#p_new_passwd_error').html(data.MESSAGE);
		}
		else
		{
			window.alert(data.MESSAGE);
		}
	},
	password_change_later: function()
	{
		var url = '/member/password_change_later';

		Ajax.call_ajax(url, '', Member.result_password_change_later);
	},
	result_password_change_later: function()
	{
		document.location.href = '/';
	},
	check_loginpwd: function()
	{
		Member.frm_join.userpwd_chk_flag.value = 0;

		var user_id	= $('#user_id').val();
		var user_pwd= $('#user_pwd').val();

		var url = '/member/ajax_password_chk';
		var param = 'user_id=' + user_id + '&user_pwd=' + user_pwd;

		Ajax.call_ajax(url, param, Member.result_check_loginpwd);
	},
	result_check_loginpwd: function(data)
	{
		if(data.CODE == 'S')
		{
			window.alert('비밀번호가 확인되었습니다.');
			Member.frm_join.userpwd_chk_flag.value = 1;
			$('#btn_user_pwd').hide();
			$('#user_pwd').attr("readonly", true);
		}
		else
		{
			window.alert(data.MESSAGE);
			$('#user_pwd').focus();
			Member.frm_join.userpwd_chk_flag.value = 0;
		}
	},
	check_changeid: function()
	{
		var new_userid = $('#new_userid').val();
		var pattern	= /^[a-z0-9]{6,16}$/;

		if(false == pattern.test(new_userid))
		{
			//$('#desc_new_userid').show();
			window.alert('6~16자리 영문 소문자,숫자만 사용 가능합니다.');
			Member.frm_join.userid_chk_flag.value = 0;
			$('#new_userid').focus()
		}
		else
		{
			var url = '/member/check_userid';
			var param = 'user_id=' + new_userid;

			Ajax.call_ajax(url, param, Member.result_check_changeid);
		}
	},
	result_check_changeid: function(data)
	{
		if(data.check == "NOT")
		{
			// 사용가능한 아이디
			window.alert('사용 가능한 아이디입니다.');
			Member.frm_join.userid_chk_flag.value = 1;
		}
		else
		{
			// 존재하는 아이디
			window.alert('사용할 수 없는 아이디입니다.');
			$('#new_userid').focus()
			Member.frm_join.userid_chk_flag.value = 0;
		}
	},
	change_userid: function()
	{
		var user_id		= $('#user_id').val();
		var user_pwd	= $('#user_pwd').val();
		var new_userid	= $('#new_userid').val();
		var user_info	= Member.frm_join.user_info.value;

		if(user_pwd.length < 2)
		{
			window.alert('비밀번호를 확인해주시기 바랍니다.');
			$('#user_pwd').focus();
		}
		else if(Member.frm_join.userid_chk_flag.value != 1)
		{
			window.alert('하이웍스 신규아이디 중복확인을 해주시기 바랍니다.');
			$('#new_userid').focus()
		}
		/*else if(!Member.frm_join.agree_chk.checked)
		{
			window.alert('하이웍스 서비스를 이용하시려면 회원 약관 및 개인정보 수집/이용 동의가 필요합니다.');
		}*/
		else
		{
			$('#div_btn_view').hide();
			$('#div_loading_view').show();

			var url = '/member/change_userid';
			var param = 'user_id=' + user_id + '&user_pwd=' + rawurlencode(user_pwd) + '&new_userid=' + new_userid + '&user_info=' + user_info;
			Ajax.call_ajax(url, param, Member.result_change_userid);
		}
	},
	result_change_userid: function(data)
	{
		$('#div_loading_view').hide();

		if(data.CODE == 'S')
		{
			$('#mbr-sprt-layerbox').modal();
		}
		else
		{
			window.alert(data.MESSAGE);
			$('#div_btn_view').show();
		}
	},
	complete_change_userid: function()
	{
		$('#mbr-sprt-layerbox').hide();
		document.location.href = '/member/login';
	},
	complete_change_userid_api: function()
	{
		$('#mbr-sprt-layerbox').hide();
		document.location.href = '/';
	},
	check_ip_security: function()
	{
		if(ip_security === "1"){
			jQuery('input:radio[name="hiworks_ip_security"][value="1"]').prop('checked', true);
		}else if(ip_security === "2"){
			jQuery('input:radio[name="hiworks_ip_security"][value="2"]').prop('checked', true);
		}else{
			jQuery('input:radio[name="hiworks_ip_security"][value="-1"]').prop('checked', true);
		}

		gtris.ui.modal.open({
			target: '#check-ip-security'
		});
	},
	save_ip_security: function()
	{
		var checked_value = $('input:radio[name="hiworks_ip_security"]:checked').val();

		if(checked_value === undefined){
			alert('IP 보안 설정을 해주시기 바랍니다.');
			return false;
		}else if(checked_value === "1" || checked_value === "2"){
			if(!jQuery('#ip_security_state').hasClass("on")){
				jQuery('#ip_security_state').addClass("on");
				jQuery('#ip_security_state').html("ON");
			}
		}else{
			if(jQuery('#ip_security_state').hasClass("on")){
				jQuery('#ip_security_state').removeClass("on");
				jQuery('#ip_security_state').html("OFF");
			}
		}
		ip_security = checked_value;

		gtris.ui.modal.CloseModal({
			target: '#check-ip-security'
		});
	}
}

function rawurlencode(str)
{
	str = (str + '').toString();

	return encodeURIComponent(str)

	.replace(/!/g, '%21')

	.replace(/'/g, '%27')

	.replace(/\(/g, '%28')

	.replace(/\)/g, '%29')

	.replace(/\*/g, '%2A');
}

function setCookie(c_name,value,expiredays){
	var exdate=new Date();exdate.setDate(exdate.getDate()+expiredays);
	document.cookie=c_name+ "=" +escape(value)+((expiredays==null) ? "" : ";expires="+exdate.toGMTString());
}