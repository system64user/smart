var Agreement = {
	popup_collect: function()
	{
		// ????????????,??? ???? ???
		AgreementWin = window.open("/agreement/getContents/9", "policy_collect", "menubar=no,toolbar=no,location=no,directories=no,resizable=no,status=no,width=877,height=470,left=50,top=50");
		AgreementWin.focus();
	},
	popup_personalinfo: function()
	{
		// ?????????????
		AgreementWin = window.open("/agreement/index?num=5", "policy_personalinfo", "menubar=no,toolbar=no,location=no,directories=no,resizable=no,status=no,width=877,height=470,left=50,top=50");
		AgreementWin.focus();
	},
	popup_service: function()
	{
		// ??????????
		AgreementWin = window.open("/agreement/index?num=2", "policy_service", "menubar=no,toolbar=no,location=no,directories=no,resizable=no,status=no,width=877,height=470,left=50,top=50");
		AgreementWin.focus();
	},
	popup_member: function()
	{
		// ??????
		AgreementWin = window.open("/agreement/index?num=1", "policy_service", "menubar=no,toolbar=no,location=no,directories=no,resizable=no,status=no,width=877,height=470,left=50,top=50");
		AgreementWin.focus();
	},
	popup_sms: function()
	{
		// SMS?????
		AgreementWin = window.open("/agreement/index?num=6", "policy_service", "menubar=no,toolbar=no,location=no,directories=no,resizable=no,status=no,width=877,height=470,left=50,top=50");
		AgreementWin.focus();
	},
	popup_bill: function()
	{
		// ????????????
		AgreementWin = window.open("/agreement/index?num=7", "policy_service", "menubar=no,toolbar=no,location=no,directories=no,resizable=no,status=no,width=877,height=470,left=50,top=50");
		AgreementWin.focus();
	},
	popup_chargeservice: function()
	{
		// ????????
		AgreementWin = window.open("/agreement/index?num=3", "policy_service", "menubar=no,toolbar=no,location=no,directories=no,resizable=no,status=no,width=877,height=470,left=50,top=50");
		AgreementWin.focus();
	},
	popup_partner: function()
	{
		// ?????????
		AgreementWin = window.open("/agreement/getContents/4", "policy_service", "menubar=no,toolbar=no,location=no,directories=no,resizable=no,status=no,width=877,height=470,left=50,top=50");
		AgreementWin.focus();
	},
	popup_use: function()
	{
		// ????????????
		AgreementWin = window.open("/agreement/index?num=8", "policy_service", "menubar=no,toolbar=no,location=no,directories=no,resizable=no,status=no,width=877,height=470,left=50,top=50");
		AgreementWin.focus();
	}

}