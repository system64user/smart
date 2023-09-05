var maxTime = 180; // second
const defaultMaxTime = 180;
var timer;
$(document).ready(function () {

    $('#loginid, #password').bind("enterKey", function (e) {
        onSubmit();
    });
    $('#loginid, #password').keyup(function (e) {
        if (e.keyCode == 13) {
            $(this).trigger("enterKey");
        }
    });
    $('#activate_email_account_password').keyup(function (e) {
        if (e.keyCode == 13) {
            e.preventDefault();
        }
    });

    $("#loginid").blur(function () {
        $("#loginid_error").html("&nbsp;").hide();
    });
    $("#loginid").on("input", function () {
        if ($(this).val()) {
            $("#loginid_error").html("&nbsp;");
            $("#loginid_error").hide();
        }
    });
    $("#password").on("input", function () {
        if ($(this).val()) {
            $("#pw_error").html("&nbsp;");
            $("#pw_error").hide();
        }
    });
    $("#password").blur(function () {
        $("#pw_error").html("&nbsp;").hide();
    });
    $("#activate_email_account_password").blur(function () {
        $("#password_error").html("&nbsp;").hide();
    });
    $("#activate_email_account_password").on("input", function () {
        $("#password_error").html("&nbsp;").hide();
    
    });
    $("#loginBtn").click(function () {
        onSubmit();
    });

    $("#mobile_no").on("input", function () {
        $("#step1 .error_code").css("visibility", "hidden");
        if (!$(this).val()) {
            $("#chk_donnoask").prop("checked",false);
            $("#chk_donnoask").prop("disabled",false);
            $("#next_btn_step1").addClass("disabled").prop('disabled', true).prop("disabled", "disabled");
        } else {
            $("#chk_donnoask").prop("checked",false);
            $("#chk_donnoask").prop("disabled",true);
            var pattern =/^[0|1|2|3]/g;
            if(pattern.test($(this).val())){
                $("#step1 .error_code").css("visibility", "visible");
                $("#next_btn_step1").addClass("disabled").prop('disabled', true).prop("disabled", "disabled");
            }else{
                $("#next_btn_step1").removeClass("disabled").prop('disabled', false).prop("disabled", "");
            }
        };
    });

    $("#backup_email").focusout(function() {
        $("#step3a .error_code").css("visibility", "hidden");
        $("#step3a .same_email_error_code").hide();
        var lang = $("input[name='lang']").val();
        var error_msg='';
        if(!checkEmail($(this).val())){
            if(lang == 'chi'){
                error_msg='無效電郵地址';
            }else{
                error_msg='Invalid email address';
            }
            $("#step3a .error_code").text(error_msg);
            $("#step3a .error_code").css("visibility", "visible");
            $("#next_btn_step3a").addClass("disabled").prop('disabled', true);
            return;
        }
        var loginid = $("#loginid").val();
        var domain = $("#domain option:selected").val();
        var email=loginid+"@"+domain;
        if($.trim($(this).val()) == email){
            if(lang == 'chi'){
                error_msg='後備電郵地址不能和你的登入帳戶相同';
            }else{
                error_msg='Backup email address cannot be the same as your login account';
            }
            $("#step3a .error_code").text(error_msg);
            $("#step3a .error_code").css("visibility", "visible");
            $("#next_btn_step3a").addClass("disabled").prop('disabled', true);
            return;
        }
    });

    $("#phone_verification_code").on("input", function () {
        $("#step2 .error_code").css("visibility", "hidden");
        if (!$(this).val()) {
            $("#next_btn_step2").addClass("disabled").prop('disabled', true);
        } else {
            $("#next_btn_step2").removeClass("disabled").prop('disabled', false);
        };
    });

    $("#backup_email").on("input", function () {
        $("#step3a .error_code").css("visibility", "hidden");
        if (!$(this).val()) {
            $("#next_btn_step3a").addClass("disabled").prop('disabled', true);
        } else {
            $("#next_btn_step3a").removeClass("disabled").prop('disabled', false);
        };
    });

    $("#email_verification_code").on("input", function () {
        $("#step3b .error_code").css("visibility", "hidden");
        if (!$(this).val()) {
            $("#next_btn_step3b").addClass("disabled").prop('disabled', true);
        } else {
            $("#next_btn_step3b").removeClass("disabled").prop('disabled', false);
        };
    });
    $("#form_step2 .resend_code").click(function () {
        var phone_number = $("#mobile_no").val();
        handleResendPhoneCode(phone_number, "form_step2");
    });
    $("#form_step3b .resend_code").click(function () {
        var backup_email = $("#backup_email").val();
        handleResendEmailCode(backup_email, "form_step3b");
    });

    $("#form_phone_code .resend_code").click(function () {
        handleResendOtp("2", "form_phone_code");
    });
    $("#form_email_code .resend_code").click(function () {
        handleResendOtp("1", "form_email_code");
    });
 
    $("#phone_code .continue").click(function(){
        var code = $("#phone_code .verification_code").val();
        var otp_type="2";
        $(this).addClass("disabled").prop('disabled', true);
        verify_otp(otp_type, code, function(){
            $('#phone_code .continue').removeClass("disabled").prop('disabled', false);
            $("#phone_code .error_code").css("visibility", "hidden");
            clearInterval(timer);
            close_verify_otp_popup();
            redirect();
        }, function() {
            $('#phone_code .continue').removeClass("disabled").prop('disabled', false);
            $(".verification_code").focus();
            $("#phone_code .error_code").css('display', 'inline-block');
            $("#phone_code .error_code").css("visibility", "visible");
        });
    })
    $("#email_code .continue").click(function(){
        var code = $("#email_code .verification_code").val();
        var otp_type="1";
         $(this).addClass("disabled").prop('disabled', true);
        verify_otp(otp_type, code, function() {
            $('#email_code .continue').removeClass("disabled").prop('disabled', false);
            $("#email_code .error_code").css("visibility", "hidden");
            clearInterval(timer);
            close_verify_otp_popup();
            redirect();
        }, function() {
            $('#email_code .continue').removeClass("disabled").prop('disabled', false);
            $(".verification_code").focus();
            $("#email_code .error_code").css('display', 'inline-block');
            $("#email_code .error_code").css("visibility", "visible");
        });
    })

    $(".verification_code").on("input", function () {
        $(this).parent().parent().find(".error_code").css("visibility", "hidden");
        if (!$(this).val()) {
            $(this).parentsUntil('.popup_content').parent().find('.continue').addClass("disabled").prop('disabled', true);
        } else {
            $(this).parentsUntil('.popup_content').parent().find('.continue').removeClass("disabled").prop('disabled', false);
        };
    });

    $("#activate_account_btn").click(function () {
        if (validate_activate_email()) {
            activate_account();
        }
    });
    $(".personal_info").click(function(){
        open_personal_info_popup();
    })
 
});

function handleResendEmailCode( backup_email,form_id) {
    sendEmailCode(backup_email, function() {
       clearInterval(timer);
        maxTime = defaultMaxTime;
        timer = setInterval("CountDown('" + form_id + "')", 1000);
        $("#" + form_id).find('.not_yet_received').hide();
        $("#" + form_id).find('.resend_code').hide();
        $("#" + form_id).find('.counter').show();
    });
}

function handleResendPhoneCode(phone_number,form_id) {
    sendPhoneCode(phone_number, function() {
        clearInterval(timer);
        maxTime = defaultMaxTime;
        timer = setInterval("CountDown('" + form_id + "')", 1000);
        $("#" + form_id).find('.not_yet_received').hide();
        $("#" + form_id).find('.resend_code').hide();
        $("#" + form_id).find('.counter').show();
    });
}
function handleResendOtp(otp_type,form_id) {
    sendOtp(otp_type, function() {
        clearInterval(timer);
        maxTime = defaultMaxTime;
        timer = setInterval("CountDown('" + form_id + "')", 1000);
        $("#" + form_id).find('.not_yet_received').hide();
        $("#" + form_id).find('.resend_code').hide();
        $("#" + form_id).find('.counter').show();
    });
}

function getParameterByName(name,url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return null;
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

function CountDown(formId) {
    if (maxTime > 0) {
        minutes = Math.floor(maxTime / 60);
        seconds = Math.floor(maxTime % 60);
        countDownTime = (minutes < 10 ? ("0" + minutes) : minutes) + ":" + (seconds < 10 ? ("0" + seconds) : seconds);
        $("#" + formId).find('.countDownTime').text(countDownTime);
        --maxTime;
    } else {
        $("#" + formId).find('.counter').hide();
        $("#" + formId).find('.not_yet_received').show();
        $("#" + formId).find('.resend_code').show();
        clearInterval(timer);
        maxTime = defaultMaxTime;
        minutes = Math.floor(maxTime / 60);
        seconds = Math.floor(maxTime % 60);
        countDownTime = (minutes < 10 ? ("0" + minutes) : minutes) + ":" + (seconds < 10 ? ("0" + seconds) : seconds);
        $("#" + formId).find('.countDownTime').text(countDownTime);
    }
}

function open_personal_info_popup() {
    $("#personal_info_popup").show();
    $("#personal_info_popup").css("visibility", "visible");
    $("#personal_info_popup .popup").addClass("show");

}

function close_personal_info_popup() {
    $("#personal_info_popup").hide();
    $("#personal_info_popup").css("visibility", "hidden");
    $("#personal_info_popup .popup").removeClass("show");
  
}

function open_register_otp_popup() {
    $("#register_otp_popup").show();
    $("#register_otp_popup").css("visibility", "visible");
    $("#register_otp_popup .popup").addClass("show");
    $("#step1").show();
}

function close_register_otp_popup() {
    $("#register_otp_popup").hide();
    $("#register_otp_popup").css("visibility", "hidden");
    $("#register_otp_popup .popup").removeClass("show");
    $("#form_step1 input").val('');
    $("#chk_donnoask").prop("checked", false);
    $("#next_btn_step1").addClass("disabled").prop('disabled', true);
}

function open_verify_otp_popup(otp_type) {
    $("#verify_otp_popup").show();
    $("#verify_otp_popup").css("visibility", "visible");
    $("#verify_otp_popup .popup").addClass("show");
    var domObj='';
    if(otp_type == 'otp_all'){
        domObj='phone_code';
        $("#phone_code").show();
        $("#phone_code .still_not_received").show();
        $("#email_code").hide();
        $("#email_code .still_not_received").show();
    }else if(otp_type == 'otp_mobile'){
        domObj='phone_code';
        $("#phone_code").show();
        $("#phone_code .still_not_received").hide();
        $("#email_code").hide();
        $("#email_code .still_not_received").hide();
    }else if(otp_type == 'otp_email'){
        domObj='email_code';
        $("#phone_code").hide();
        $("#phone_code .still_not_received").hide();
        $("#email_code").show();
        $("#email_code .still_not_received").hide();
    }
    $(".error_code").css("visibility", "hidden");
    $(".verification_code").val('');
    setTimeout(function(){
        $(".verification_code").focus();
    },500)
    $("#verify_otp_popup").find('.continue').addClass("disabled").prop('disabled', true);
    maxTime = defaultMaxTime;
    clearInterval(timer);
    timer = setInterval("CountDown('"+domObj+"')", 1000);
    $("#"+domObj).find('.not_yet_received').hide();
    $("#"+domObj).find('.resend_code').hide();
    $("#"+domObj).find('.counter').show();
}

function close_verify_otp_popup() {
    $("#verify_otp_popup").hide();
    $("#verify_otp_popup .popup").removeClass("show");
    $("#verify_otp_popup").css("visibility", "hidden");
    $("#phone_code").show();
    $("#email_code").hide();
}

function open_activate_account_popup() {
    $("#activate_account_popup").show();
    $("#activate_account_popup").css("visibility", "visible");
    $("#activate_account_popup .popup").addClass("show");
    $("#form_activate_account input[type='password']").val('');
    $("#password_error").html("&nbsp;").hide();
    $("#activate_account").show();
}

function close_activate_account_popup() {
    $("#activate_account_popup").hide();
    $("#form_activate_account input[type='password']").val('');
    $("#password_error").html("&nbsp;").hide();
    $("#activate_account_popup .popup").removeClass("show");
    $("#activate_account_popup").css("visibility", "hidden");
}

function back_to_phone() {
    var otp_type = "2";
    sendOtp(otp_type, function() {
        $("#phone_code").show();
        $("#email_code").hide();
        setTimeout(function(){
            $(".verification_code").focus();
        },500)
        clearInterval(timer);
        maxTime = defaultMaxTime;
        timer = setInterval("CountDown('form_phone_code')", 1000);
        $("#form_phone_code").find('.not_yet_received').hide();
        $("#form_phone_code").find('.resend_code').hide();
        $("#form_phone_code").find('.counter').show();
    });

}

function back_to_email() {
    var otp_type = "1";
    sendOtp(otp_type, function() {
        $("#phone_code").hide();
        $("#email_code").show();
        setTimeout(function(){
            $(".verification_code").focus();
        },500)
        clearInterval(timer);
        maxTime = defaultMaxTime;
        timer = setInterval("CountDown('form_email_code')", 1000);
        $("#form_email_code").find('.not_yet_received').hide();
        $("#form_email_code").find('.resend_code').hide();
        $("#form_email_code").find('.counter').show();
    });

}
function onSubmit2() {
    if (!validate()) return;
    login();
}
function onSubmit() {
    if (!validate()) return;
    var googleRecaptchaEnable=$('#googleRecaptchaEnable').val();
    if(googleRecaptchaEnable==1){
        doRecaptcha();
    }else{
        login();
    }
}

function doRecaptcha(){
    var domain = document.domain;
    var recaptcha_code ;
	if(domain!=undefined&&domain!=NaN&&domain!=null){
		domain=domain.toLowerCase();
	    if(domain.indexOf('hktstaging.com')>-1 || domain.indexOf('localhost')>-1){
			recaptcha_code = '6LdFcsgaAAAAAJ-bFojuNcir4be9wxJuoHiMUSOy';
		}
		else{
			recaptcha_code = '6LddOAUbAAAAAPuf_KZYbsCzMvDZ-m2OkxeC4Q3L';
		}
	}
	else{
		recaptcha_code = '6LddOAUbAAAAAPuf_KZYbsCzMvDZ-m2OkxeC4Q3L';
	}
    grecaptcha.ready(function () {
        grecaptcha.execute(recaptcha_code, {
            action: 'submit'
        }).then(function (token) {
            // Add your logic to submit to your backend server here.
            $('input[name="token"]').val(token);
            login();
        });
    });
}

function login() {
    $.ajax({
        url: "/login",
        data: $("#loginform").serialize(),
        type: "POST",
        dataType: 'json',
        success: function (data) {
            if (data.success) {
                $("#type").val(data.type);
                if (data.status == '1') {
                    $("#s_zimbra_housekeep_date").val(data.s_zimbra_housekeep_date);
                    $("#activate_email_account_display").text(data.email);
                    $("#activate_email_account").val(data.email);
                    open_activate_account_popup();
                } else if(data.status == '2') {
                    open_register_otp_popup();
                }else if(data.status == '3' || data.status == '4') {
                    tealiumLink(data.email);
                    var redirect_uri = getParameterByName("redirect_uri");
                    if (redirect_uri == null || redirect_uri == '') {
                        window.location.href = data.redirectURL;
                    } else {
                       window.location.href = redirect_uri;
                    }
                }else if(data.status == '5') {
                    if((data.mfa_mobiledn !=null && data.mfa_mobiledn !='')  && (data.mfa_email !=null && data.mfa_email !='')){
                        $("#phone_code .phone_number").text(data.mfa_mobiledn);
                        $("#email_code .email_address").text(data.mfa_email);              
                        open_verify_otp_popup('otp_all');
                    }else if((data.mfa_mobiledn !=null && data.mfa_mobiledn !='') && (data.mfa_email ==null || data.mfa_email =='')){
                        $("#phone_code .phone_number").text(data.mfa_mobiledn);
                        open_verify_otp_popup('otp_mobile');
                    }else if((data.mfa_mobiledn ==null || data.mfa_mobiledn =='') && (data.mfa_email !=null && data.mfa_email !='')){
                        $("#email_code .email_address").text(data.mfa_email);
                        open_verify_otp_popup('otp_email');
                    }
                }
                $('.alertarea').css('display', 'none');
            } else {
                var lang = $("input[name='lang']").val();
                var error_msg = '';
                if (data.errorcode == '204') {
                    if (lang == 'chi') {
                        error_msg = '未能成功登入帳戶，請稍後再試。';
                    } else {
                        error_msg = 'Login is not successful, please retry later.';
                    }
                } else {
                    if (lang == 'chi') {
                        error_msg = '! 使用者名稱或密碼不正確，請重新登入。';
                    } else {
                        error_msg = '! Invalid Login ID or Password, please re-enter.';
                    }
                }
               $('.alertarea').text(error_msg);
               $('.alertarea').css('display', 'table');
               $("#loginform")[0].reset();
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {
            $('.alertarea').css('display', 'table');
            $("#loginform")[0].reset();
        }
    });
}

function activate_account() {
    var email=$("#activate_email_account").val();
    $.ajax({
        url: "/activateAccount",
        data: $("#activateForm").serialize(),
        type: "POST",
        dataType: 'json',
        success: function (data) {
            if (data.success) {
                close_activate_account_popup();
                $("#type").val(data.type);
                if(data.status == '2') {
                    open_register_otp_popup();
                }else if(data.status == '3' || data.status == '4') {
                    tealiumLink(email)
                    var redirect_uri = getParameterByName("redirect_uri");
                    if (redirect_uri == null || redirect_uri == '') {
                        window.location.href = data.redirectURL;
                    } else {
                        window.location.href = redirect_uri;
                    }
                }else if(data.status == '5') {
                    if((data.mfa_mobiledn !=null && data.mfa_mobiledn !='')  && (data.mfa_email !=null && data.mfa_email !='')){
                       $("#phone_code .phone_number").text(data.mfa_mobiledn);
                       $("#email_code .email_address").text(data.mfa_email);
                       open_verify_otp_popup('otp_all');
                   }else if((data.mfa_mobiledn !=null && data.mfa_mobiledn !='') && (data.mfa_email ==null || data.mfa_email =='')){
                       $("#phone_code .phone_number").text(data.mfa_mobiledn);
                       open_verify_otp_popup('otp_mobile');
                   }else if((data.mfa_mobiledn ==null || data.mfa_mobiledn =='') && (data.mfa_email !=null && data.mfa_email !='')){
                       $("#email_code .email_address").text(data.mfa_email);
                       open_verify_otp_popup('otp_email');
                   }
                }
            } else {
                var lang = $("input[name='lang']").val();
                var error_msg = '';
                if (data.errorcode == '202') {
                    if (lang == 'chi') {
                        error_msg = '使用者名稱或密碼不正確，請重新登入。';
                    } else {
                        error_msg = 'Invalid Login ID or Password, please re-enter.';
                    }
                } else {
                    if (lang == 'chi') {
                        error_msg = '激活電郵帳戶錯誤。';
                    } else {
                        error_msg = 'Activation Email Account Error.';
                    }
                }
                $("#activate_email_account_password").val('');
                $("#password_error").html(error_msg).show();
                $("#password").focus();
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {
            var lang = $("input[name='lang']").val();
            var error_msg = '';
            if (lang == 'chi') {
                error_msg = '激活電郵帳戶錯誤。';
            } else {
                error_msg = 'Activation Email Account Error.';
            }
            $("#activate_email_account_password").val('');
            $("#password_error").html(error_msg).show();
            $("#password").focus();
        }
    });
}

function tealiumLink(email){
    utag.link({
        "tealium_event" : "email_success_login_view", //Required
        "brand_name" : "PCD", //Required
        "page_type" : "Email",  //Required
        "customer_email": email
    });
}
function sendOtp(otptype,  successCall, failCall) {
    var loginid = $("#loginid").val();
    var domain = $("#domain option:selected").val();
    $.ajax({
        url: "/send_otp",
        data: "loginid=" + loginid+"&domain="+domain+"&otptype=" + otptype,
        type: "POST",
        dataType: 'json',
        success: function (data) {
            if (data.success) {
                console.log(data);
                if (successCall != null) {
                    successCall();
                }
            } else {
                if (failCall != null) {
                    failCall();
                }
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {}
    });
}
function sendPhoneCode(phone_number,  successCall, failCall) {
    var loginid = $("#loginid").val();
    var domain = $("#domain option:selected").val();
     var lang=$("input[name='lang']").val();
    $.ajax({
        url: "/sendSMSCode",
        data:  "loginid=" + loginid+"&domain="+domain+"&phone_number=" + phone_number+"&lang="+lang,
        type: "POST",
        dataType: 'json',
        success: function (data) {
            if (data.success) {
                if (successCall != null) {
                    successCall();
                }
            } else {
                if (failCall != null) {
                    failCall();
                }
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {}
    });
}

function sendEmailCode(backup_email, successCall, failCall) {
    var loginid = $("#loginid").val();
    var domain = $("#domain option:selected").val();
    $.ajax({
        url: "/sendEmailCode",
        data: "loginid=" + loginid+"&domain="+domain+"&backup_email=" + backup_email,
        type: "POST",
        dataType: 'json',
        success: function (data) {
            if (data.success) {
                if (successCall != null) {
                    successCall();
                }
            } else {
                console.log('ajax submit failed');
                if (failCall != null) {
                    failCall();
                }
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {}
    });
}
function verify_otp(otptype, code, successCall, failCall) {
    var loginid = $("#loginid").val();
    var domain = $("#domain option:selected").val();
    $.ajax({
        url: "/verify_otp",
        data: "loginid=" + loginid + "&domain=" + domain + "&code=" + code+"&otptype="+otptype,
        type: "POST",
        dataType: 'json',
        success: function (data) {
            if (data.success) {
                if (successCall != null) {
                    successCall();
                }
            } else {
                console.log('ajax submit failed');
                if (failCall != null) {
                    failCall();
                }
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {
            if (failCall != null) {
                failCall();
            }
        }
    });
}


function verifyCode(verify_type,identifier, code, successCall, failCall) {
    var loginid = $("#loginid").val();
    var domain = $("#domain option:selected").val();
    var lang=$("input[name='lang']").val();
    $.ajax({
        url: "/verifyCode",
        data: "loginid=" + loginid + "&domain=" + domain + "&identifier=" + identifier + "&code=" + code+"&verify_type="+verify_type+"&lang="+lang,
        type: "POST",
        dataType: 'json',
        success: function (data) {
            if (data.success) {
                if (successCall != null) {
                    successCall();
                }
            } else {
                console.log('ajax submit failed');
                if (failCall != null) {
                    failCall();
                }
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {
            if (failCall != null) {
                failCall();
            }
        }
    });
}

function skipVerification(donnoask,skipType, successCall, failCall) {
    var loginid = $("#loginid").val();
    var domain = $("#domain option:selected").val();
    var type=$("#type").val();
    var email = loginid + "@" + domain;
    $.ajax({
        url: "/skipVerification",
        data: "loginid=" + loginid + "&domain=" + domain+"&skipType="+skipType+"&type="+type+"&donnoask="+donnoask,
        type: "POST",
        dataType: 'json',
        success: function (data) {
            if (data.success) {
                if (successCall != null) {
                    successCall();
                }else{
                    tealiumLink(email);
                    window.location.href = data.redirectURL;
                }
            } else {
                console.log('ajax submit failed');
                if (failCall != null) {
                    failCall();
                }
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {}
    });
}

function completed(successCall, failCall) {
    var loginid = $("#loginid").val();
    var domain = $("#domain option:selected").val();
    var type=$("#type").val();
    var email = loginid + "@" + domain;
    $.ajax({
        url: "/completed",
        data: "loginid=" + loginid + "&domain=" + domain+"&type="+type,
        type: "POST",
        dataType: 'json',
        success: function (data) {
            if (data.success) {
                tealiumLink(email);
                if (successCall != null) {
                    successCall();
                }else{
                    window.location.href = data.redirectURL;
                }
            } else {
                console.log('ajax submit failed');
                if (failCall != null) {
                    failCall();
                }
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {}
    });
}

function gotoStep1() {
    $("#step2").hide();
    $("#step1").show();
}

function gotoStep2() {
    var phone_number = $("#mobile_no").val();
    var isLegal = checkPhone(phone_number);
    if(!isLegal){
        $("#step1 .error_code").css('display', 'inline-block');
        $("#step1 .error_code").css("visibility", "visible");
        return;
    }else{
        $("#step1 .error_code").css("visibility", "hidden");
    }

    $("#next_btn_step1").addClass("disabled").prop('disabled', true);
    sendPhoneCode(phone_number, function() {
        $("#step2 .phone_number").text(phone_number);
        $("#step1").hide();
        $("#next_btn_step1").removeClass("disabled").prop('disabled', false);
        $("#step2").show();
        $("#phone_verification_code").focus();
        maxTime = defaultMaxTime;
        clearInterval(timer);
        timer = setInterval("CountDown('form_step2')", 1000);
        $("#form_step2").find('.not_yet_received').hide();
        $("#form_step2").find('.resend_code').hide();
        $("#form_step2").find('.counter').show();
    },function(){
        $("#next_btn_step1").removeClass("disabled").prop('disabled', false);
        $("#step1 .error_code").css('display', 'inline-block');
        $("#step1 .error_code").css("visibility", "visible");
    });
}

function gotoStep3() {
    var code = $("#phone_verification_code").val();
    var mobile_no = $("#mobile_no").val();
    $("#next_btn_step2").addClass("disabled").prop('disabled', true);
    verifyCode("1",mobile_no, code, function() {
        $("#step2 .error_code").css("visibility", "hidden");
        $("#step2").hide();
        $("#next_btn_step2").removeClass("disabled").prop('disabled', false);
        $("#step3a").show();
        clearInterval(timer);
    }, function() {
       $("#next_btn_step2").removeClass("disabled").prop('disabled', false);
        $("#phone_verification_code").focus();
        $("#step2 .error_code").css('display', 'inline-block');
        $("#step2 .error_code").css("visibility", "visible");
    });
}

function gotoStep3b() {
    var backup_email = $("#backup_email").val();
    var isLegal = checkEmail(backup_email);
    if(!isLegal){
        $("#step3a .error_code").css('display', 'inline-block');
        $("#step3a .error_code").css("visibility", "visible");
        return;
    }else{
        $("#step3a .error_code").css("visibility", "hidden");
    }
   $("#next_btn_step3a").addClass("disabled").prop('disabled', true);
    sendEmailCode(backup_email, function() {
        $('#step3b .email_address').text(backup_email);
        $("#step3a").hide();
          $("#next_btn_step3a").removeClass("disabled").prop('disabled', false);
        $("#step3b").show();
        $("#email_verification_code").focus();
        maxTime = defaultMaxTime;
        clearInterval(timer);
        timer = setInterval("CountDown('form_step3b')", 1000);
        $("#form_step3b").find('.not_yet_received').hide();
        $("#form_step3b").find('.resend_code').hide();
        $("#form_step3b").find('.counter').show();
    },function(){
        $("#next_btn_step3a").removeClass("disabled").prop('disabled', false);
        $("#step3a .error_code").css('display', 'inline-block');
        $("#step3a .error_code").css("visibility", "visible");
    });
}

function gotoStep4() {
    var code = $("#email_verification_code").val();
    var backup_email = $("#backup_email").val();
     $("#next_btn_step3b").addClass("disabled").prop('disabled', true);
    verifyCode("2", backup_email, code, function() {
        $("#step3b .error_code").css("visibility", "hidden");
        $("#step3b").hide();
        $("#next_btn_step3b").removeClass("disabled").prop('disabled', false);
        $("#step4").show();
        clearInterval(timer);
    }, function() {
        $("#next_btn_step3b").removeClass("disabled").prop('disabled', false);
        $("#email_verification_code").focus();
        $("#step3b .error_code").css('display', 'inline-block');
        $("#step3b .error_code").css("visibility", "visible");
    });
}

function back_to_step1() {
    $("#step2").hide();
    $("#step1").show();
    $("#form_step2 input").val('');
    $("#next_btn_step2").addClass("disabled").prop('disabled', true);
    $("#step2 .error_code").css("visibility", "hidden");
    clearInterval(timer);
}

function back_to_step3a() {
    $("#step3b").hide();
    $("#step3a").show();
    $("#form_step3b input").val('');
    $("#next_btn_step3b").addClass("disabled").prop('disabled', true);
}

function verification_completed() {
    $("#register_otp_popup").hide();
    $("#register_otp_popup .popup").removeClass("show");
    $("#register_otp_popup").css("visibility", "hidden");
    reset_all_forms_and_buttons_state();
    $("#step4").hide();
    redirect();
}

function reset_all_forms_and_buttons_state() {
    $(".error_code").css("visibility", "hidden");
    $("#form_step1 input").val('');
    $("#form_step1 input[type='checkbox']").attr('checked',false);
    $("#form_step2 input").val('');
    $("#form_step3a input").val('');
    $("#form_step3b input").val('');
    $("#next_btn_step1, #next_btn_step2, #next_btn_step3a, #next_btn_step3b").addClass("disabled").prop('disabled', true);
}

function skip_verification_popup(skipType) {
    var donnoask=$("#chk_donnoask").is(":checked");
    skipVerification(donnoask,skipType)
}
function skip_email_verification_popup(skipType) {
    skipVerification(false,skipType,function(){
        $("#step3a").hide();
        $("#step5").show();
    })
}
function close_popup(skipType) {
    skipVerification(false,skipType)
}

function close_popup2() {
    $("#register_otp_popup").hide();
    $("#register_otp_popup .popup").removeClass("show");
    $("#register_otp_popup").css("visibility", "hidden");
    reset_all_forms_and_buttons_state();
    $("#step2, #step3a, #step3b, #step4,#step5").hide();
}

function maskedEmailAddress(emailAddress) {
    if (emailAddress === undefined) return "";
    let f = emailAddress.split("@");
    let e1 = f[0];
    if(e1.length>=5){
        e1 = e1.substring(0,1)+"***"+e1.substring(e1.length-1);
    }else{
        e1 = e1.substring(0,1)+"***";
    }
    if(f.length>1){
        e1+= '@';
        e1+=f[1];
    }
    return e1;
}
function checkEmail(emailAddress){
    if (emailAddress === undefined) return false;
    var pattern = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,})$/;
    return pattern.test(emailAddress);
}
function maskedPhoneNumber(phone_number){
    if (phone_number === undefined) return "";
    return phone_number.replace(/(\d{2})\d{4}(\d{2})/, '$1****$2');
}

function checkPhone(phone_number){
    if (phone_number === undefined) return false;
    var pattern =/^[5,6,7,8,9]{1}[0-9]{7}$/
    return pattern.test(phone_number);
}

function redirect() {
    var redirect_uri = getParameterByName("redirect_uri");
    if (redirect_uri == null || redirect_uri == '') {
       completed();
    } else {
        window.location.href =redirect_uri;
    }
}