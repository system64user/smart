function setFocus() {
    if (!$("#hetzner_webmail_username").val()) {
        $("#hetzner_webmail_username").focus()
    } else {
        $("#hetzner_webmail_password").focus()
    }
}

function submit_login() {
    
    if (!$("#hetzner_webmail_username").val()) {
        alert('Please provide your username');
        $("#hetzner_webmail_username").focus();
        return false
    } else {
        if (!$("#hetzner_webmail_password").val()) {
            alert('Please provide your password');
            $("#hetzner_webmail_password").focus();
            return false
        } else { 
            $("#imp_login").submit();
            return true
        }
    }
}

$(document).keypress(function(e) {
  if(e.which == 13) {
    submit_login();
  }
});
