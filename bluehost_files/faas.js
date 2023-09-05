function initializeSift() {
  var _session_id_cookie = document.cookie.match('(^|;) ?faas_session_id=([^;]*)(;|$)');
  if (_session_id_cookie) {
    _session_id_cookie = _session_id_cookie[2];
  } else {
    return false;
  }
  var _admin_user = document.cookie.match('(^|;) ?admin_user=([^;]*)(;|$)');

  var _sift = window._sift = window._sift || [];
  _sift.push(['_setAccount', window.faasAccount]);
  _sift.push(['_setUserId', '']);  // Intentionally empty string because it's not set at this point
  _sift.push(['_setSessionId', _session_id_cookie]);
  if (!_admin_user) {
    _sift.push(['_trackPageview']);
  }

  (function() {
    function ls() {
      var e = document.createElement('script');
      e.src = 'https://cdn.sift.com/s.js';
      document.body.appendChild(e);
    }
    if (window.attachEvent) {
      window.attachEvent('onload', ls);
    } else {
      window.addEventListener('load', ls, false);
    }
  })();
}
initializeSift();
