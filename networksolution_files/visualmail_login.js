<!--
// for use in login.xal and guestlogin.xsl

	var loginNumber = isNameDomain(document.domain);
	if (loginNumber != 0)
	{        	
		window.location.href = "login.exe?xsl=" + pageCaller + "_myname.xsl" + bind;
    }

  function loginFocus() {
	document.frm_main.email.focus();
  }
  
  function setGuest(cgidir, bind){
		var guestLink = cgidir + "login.exe?bind=&xsl=guestlogin.xsl&tpl=mg_netsol&nodetect=1";
		if (showDomain("") != "") {
			guestLink+= "&user_domain=mail."+showDomain("");
		}
		document.getElementById('aguest').href = guestLink;
	}
	
	function showDomain(message) {
		var user_domain = top.location.search.split('user_domain=')[1];
		if (user_domain) {
			if (user_domain.substring(0, 5).toLowerCase()  == "mail.")
				return message+user_domain.split('mail.')[1];
		}
		return "";
	}
	
	function showHint(){
		var hint = "../../interfaces/sso/emailtipleg.php";
		var user_domain = top.location.search.split('user_domain=')[1];
		if (user_domain) {
			if (user_domain.substring(0, 5).toLowerCase()  == "mail.")
			hint +=  "?user_domain="+user_domain.split('mail.')[1];
		}
		document.getElementById('email').title = hint;
	}
  		
  function isNameDomain(domain) {
        var domain_pieces;

        // Split domain according to .
        domain_pieces = domain.split(".");

        // Check if domain_pieces contains enough pieces to represent mail.firstname.lastname.name
        if (domain_pieces.length < 4)
                return false;

        // Check last piece
        if (domain_pieces[domain_pieces.length - 1].toLowerCase() != "name")
                return false;

        return true;
  }

	var errmsg = '';	

	function checkSubmit(myfield,e) {
		var keycode;

		if (window.event) keycode = window.event.keyCode;
		else if (e) keycode = e.which;
		else return true;

		if (keycode == 13) {
			return setupLogin();
		} else {
		   return true;
		}
	}

	// Returns current domain name
	function getDomain() {
		return document.domain;
	}

	// Returns current domain name (without the mail part, if present)
        function getNonMailDomain() {
                var domain = getDomain();

		if (!mailDomainCheck())
			return domain;
			
		return domain.substring(5);		
        }

	// Check if current URL is of the format mail.domain.com
	// Returns true if it is, otherwise returns false
	function mailDomainCheck() {
		var domain, domain_piece;
		
		domain = getDomain();
		domain_piece = domain.substring(0, 5).toLowerCase();
		if (domain_piece == "mail.") {
			return true;
		}
		
		return false;
	}

	// Check if SSL checkbox has been checked
	// Returns true if checked, otherwise returns false
	function sslCheck() {
		var ssl, form;
		
		form = document.frm_main;

		if (isNameDomain(document.domain)) {
			if (form.ssl[0].checked)
				return false;
			else
				return true;
		} else {
			ssl = form.ssl;
			
			if (ssl.checked)
				return true;
		}
			
		return false;
	}

	// Given a string (assuming an email address) returns the username
	function parseUsername(email) {
		var firstAt;
		firstAt = email.indexOf("@");
		if (firstAt > 0) {
			return email.substring(0, firstAt);
		}
		return email;
	}

	// Given a string (assuming an email address) returns the domain name	
	function parseDomain(email) {
		var firstAt;
		firstAt = email.indexOf("@");
		if (firstAt > 0) {
			return email.substring(firstAt + 1);
		}
		return "";
	}
		
        function setupLogin() {
		
                var form, email, username, domain;

                form = document.frm_main;
		
		if (!noBlanks())
			return false;

		if (isNameDomain(document.domain)) {
		} else {
			email = form.email.value;

			// Default values
			username = email;
			domain = "";
			action = form.action;
		}

		if (isNameDomain(document.domain)) {
			firstname = form.firstname.value;
			lastname = form.lastname.value;

			username = firstname;
			domain = firstname + "." + lastname + ".name";
		} else {
			// User is accessing webmail via networksolutionsemail.com URL
			username = parseUsername(email);
			domain = parseDomain(email);
			var user_domain = top.location.search.split('user_domain=')[1];
			
			if (user_domain) {
				domain = user_domain.substring(5);
			} else {
				if (domain == "") {
					alert("Please enter a valid email address");
					return false;
				}
			}
		}
		
		action = "https://"+document.domain+"/edgedesk/cgi-bin/login.exe";
		
		if (user_domain)
		
				action += "?user_domain="+user_domain.toLowerCase();
				
				form.tpl.value = "mg_netsol";
				form.nodetect.value = 1;
				form.onlogin.value = "index_secure.xsl";
				form.target = "_top";
				
				// Set new values prior to submitting information
				form.user.value = username.toLowerCase();
				form.domain.value = domain.toLowerCase();
				form.bind.value = "mail."+domain.toLowerCase();
				form.action = action;
				
				var user = '';
				if (username.indexOf('@') == -1){
					user = username.toLowerCase()+"@"+domain.toLowerCase();
				}else{
					user = username.toLowerCase();
				}
				var a = verifyWeak(user,form.pass.value);
				return window.weak_pass;
		}
        
        // Sends output depending on whether certain conditions exist
        // index and meanings:
        // 1: @ domain by the email input box
        // 2: username@yoursite.com underneath the email input box
        function doConditionalOutput(index) {
        	var str = '';
        	
        	
        	if (mailDomainCheck()) {
        		switch (index) {
			case 0:
				str = '<input type="text" name="email" maxlength="130" style="width: 10em;" onkeydown="return checkSubmit(this, event);" oldonkeydown="return checkSubmit(event);"/>';
				break;
        		case 1:
        			str = getNonMailDomain();
        			break;
        		default:
        			break;
        		}
        	} else {
        		switch (index) {
			case 0:
				str = '<input type="text" name="email" maxlength="130" style="width: 16em;" onkeydown="return checkSubmit(this, event);" oldonkeydown="return checkSubmit(event);"/>';
				break;
			case 2:
				str = global_m4;
 
				break;
        		default:
        			break;
        		}
        	}
        	
/*
        	if (str != '') {
        		document.write (str);
        	}
*/
		return str;
        }
        	
function noBlanks()
{
        var form = document.frm_main;

	if (isNameDomain(document.domain)) {
		if (form.firstname.value.length == 0) {
			alert('Please enter your first name');
			return false;
		} else if (form.lastname.value.length == 0) {
			alert('Please enter your last name');
			return false;
		} else if (form.pass.value.length == 0) {
			alert('Please enter your password');
			return false;
		}
	} else {
		if (form.email.value.length == 0) {
			alert('Please enter your E-mailbox name');
			return false;
		} else if (pageCaller == "guestlogin" && form.guestuser.value.length == 0) {
			alert('Please enter your Guest login');
			return false;
		} else if (form.pass.value.length == 0) {
			alert('Please enter your password');
			return false;
		}
	}

        return true;
}
function verifyWeak(user,pass){

    if ((document.domain.indexOf('webmail') == -1) && (document.domain.indexOf('www') == -1)){
    	prot = "http://";
    }else{
        prot = "https://"
    }
    $.ajax({
        type: "POST",
        url: prot+document.domain+"/interfaces/sso/passwd_reset/verify_weak.php",
        async: false,
	data: "u="+user+"&p="+pass,
	dataType: 'json',
        success : function(data) {
	    if (data.weak){
	    	if (sslCheck()){
			document.frm_main.target="_self";		
		}
		window.weak_pass =  false;
		var prot = "";
		if ((document.domain.indexOf('webmail') == -1) && (document.domain.indexOf('www') == -1)){
			prot = "http://";
		}else{
			prot = "https://"
		}
		window.top.location.href = prot+document.domain+"/interfaces/sso/passwd_reset/enforce_reset.php?u="+data.u+"&h="+data.h;
	    }else{
	    	window.weak_pass =  true;
	    }
        }
    });
}

$(document).ready(function()
{
	showHint();
	$("#email").focus();
	$("#email").cluetip({ arrows: true,
		attribute:        'title',
		showTitle: false,
		positionBy: 'fixed',
		topOffset: 4, // 4 almost aligned to the top, 35 below
		leftOffset: 5,  // -450 places it to the left, 5 places to the right, -300 below
		width: 215,  // was 182, updated to accomodate long domains and IE 7 / 6 rendering.
		dropShadowSteps:  3
	}
	);
});
-->
