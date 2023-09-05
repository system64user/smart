var Down = {

	// 모바일 앱
	down_mobile_android: function()
	{
		window.open('https://play.google.com/store/apps/details?id=kr.co.hiworks.mobile&hl=ko');
	},
	down_mobile_ios: function()
	{
		window.open('https://itunes.apple.com/kr/app/id466670466?mt=8&ls=1');
	},

	// 메신저
	down_messenger_app: function()
	{
		window.open('https://update.hiworks.com/messenger/HiworksMessengerSetup.exe');
	},
	down_messenger_android: function()
	{
		window.open('https://play.google.com/store/apps/details?id=kr.co.hiworks.messenger&hl=ko');
	},
	down_messenger_ios: function()
	{
		window.alert('준비중입니다');
	},

	// 웹하드 접속기 (Windows)
	down_webhard: function()
	{
		window.open('http://grouphard.hiworks.co.kr/hiworks_group_webhard.exe');
	},

	// 아웃룩 자동 설정 프로그램 (Windows)
	down_outlook: function()
	{
		window.open('http://www.hiworks.co.kr/assets/files/Hiworks_Outlook_Setting.exe');
	},

	// 서비스 소개서 다운로드 
	down_manual: function()
	{	
		var f = document.frm_layer_download;

		if(f.download_company_name.value.length < 2)
		{
			window.alert('업체명은 필수 입력 사항입니다.');
			f.download_company_name.focus();
		}
		else if(f.download_name.value.length < 2)
		{
			window.alert('이름은 필수 입력 사항입니다.');
			f.download_name.focus();
		}
		else if(f.download_hp_no2.value.length < 3 || f.download_hp_no3.value.length < 3)
		{
			window.alert('핸드폰 번호는 필수 입력 사항입니다.');
			f.download_hp_no2.focus();
		}
		else if(!is_numeric(f.download_hp_no2.value) || !is_numeric(f.download_hp_no3.value))
		{
			window.alert('핸드폰 번호에는 숫자를 입력해주시기 바랍니다.');
			f.download_hp_no2.focus();
		}
		else if(f.download_email.value.length < 2 || f.download_email_domain.value.length < 3)
		{
			window.alert('이메일은 필수 입력 사항입니다.');
			f.download_email.focus();
		}
		else if(!isValidEmailValue(f.download_email.value + '@' + f.download_email_domain.value))
		{
			window.alert('이메일 주소 형식이 아닙니다.');
			f.download_email.focus();
		}
		else if($('input:checkbox[id="chk_layer_download"]:checked').length < 1){
			window.alert('개인정보 수집, 이용에 동의해주시기 바랍니다.');
		}else{
			//form 전송
			f.submit();
			//layer 닫기
			manualLayer.hide();
		}
	}
}

function isValidEmailValue(email)
{
	var pattern = /^[_a-zA-Z0-9-\.]+@[\.a-zA-Z0-9-]+\.[a-zA-Z]+$/;
	return (pattern.test(email)) ? true : false;
}

function is_numeric(str)
{
	if((str-0)==str) return true;
	else return false;
}