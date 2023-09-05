// init script and call login function
function fb_login()
{

    if (window.FB !== undefined) {
        FB.login(function(response) {
        	console.log(response);
            fb_ajax_request(window.location.search.replace("?", "").indexOf("fast=1") > -1 ? 1 : 0);
        }, {scope:'user_birthday,email'});
		return false;
    }


	if(BM_MAIN_DOMAIN == '.bigmir.net')
		api_id = 194342087279729;
	else if(BM_MAIN_DOMAIN == '.bigmir.ua')
		api_id = 161883740544870;
	else		
		api_id = 171509562908711;	
	
	window.fbAsyncInit = function() {
	    FB.init({
	      appId      : api_id,
	      status     : true, 
	      cookie     : true,
	      xfbml      : true,
	      oauth      : true,
	    });

		FB.login(function(response) {
			fb_ajax_request(window.location.search.replace("?", "").indexOf("fast=1") > -1 ? 1 : 0);
			}, {scope:'user_birthday,email'});	    
	  };
	  (function(d){
	     var js, id = 'facebook-jssdk'; if (d.getElementById(id)) {return;}
	     js = d.createElement('script'); js.id = id; js.async = true;
	     js.src = "//connect.facebook.net/en_US/all.js";
	     d.getElementsByTagName('head')[0].appendChild(js);
	   }(document));

	return false;
}

// call to our system to check is fb user is registred in our system
function fb_ajax_request(fast)
{
	var baseurl = document.location.host + document.location.pathname + document.location.hash;
	
	var oHead = document.getElementsByTagName('HEAD').item(0);
	var oScript= document.createElement("script");
	oScript.type = "text/javascript";
	
	oScript.src="//id" + BM_MAIN_DOMAIN + "/js/fb_auth?url=" + baseurl + (fast ? '&fast=1' : '');
	
	oHead.appendChild( oScript );
	
	return ;
}

function fb_ask_register()
{
	var baseurl = document.location.host + document.location.pathname + document.location.hash;

	if( window.BM_MAIN_DOMAIN != undefined )
		window.top.location = '//id'+BM_MAIN_DOMAIN+'/fb/?url='+baseurl;
	else
		window.top.location = '//'+document.location.host+'/fb';
		
}

function fb_failed_auth()
{
	alert('Не удалось залогинится на фейсбуке');
}

function fb_show_linking_form()
{
	alert('Вот тут нужна форма которая всплывет и юзер введет свой логин и пароль');
}

function fb_show_register_confirm()
{
	alert('тут нужна форма где пользователь согласится с правилами бигмира и нажмет кнопку ок, после чего мы его автоматически зарегистрируем.');
}

function FBcheckConfirm(form)
{
	if( !form.confirm.checked )
	{
		$(form.confirm).addClass('confirm_warning');
	}
	return form.confirm.checked;
}


/*/////////////////////////////////////////////////////////*/
/*////////////////// VK LOGIN /////////////////////////////*/
/*/////////////////////////////////////////////////////////*/


//call to our system to check is vk user is registred in our system
function vk_ajax_request(response)
{
	response = response.session.user;
	for ( keyVar in response ) {
		alert( keyVar+' :: '+ response[keyVar]);
	}
	
	
	var baseurl = document.location.host + document.location.pathname + document.location.hash;
	
	var oHead = document.getElementsByTagName('HEAD').item(0);
	var oScript= document.createElement("script");
	oScript.type = "text/javascript";
	
	oScript.src = "//id" + BM_MAIN_DOMAIN + "/js/vk_auth?url=" + baseurl;
	
	oHead.appendChild( oScript );
	
	return ;
}







