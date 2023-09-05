(function() {
    'use strict';

    $(function() {
        $('.slides').on('click', '.slide', function(e) {
            // Stop any and all events that may have been bound to the slider
            e.preventDefault();
            e.stopPropagation();

            // Enable gaTrack to still fire...
            window.gaTrackThrottled.call(this);

            var slide = $(e.currentTarget);
            var redirect = slide.find('.redirect');

            // Store the location we want to redirect once authed
            window.setCookie(
                '__l_redirect',
                redirect.data('redirect'),
                null,
                '/',
                '.' + window.provinfo.domain
            );

            // Bounce to cplogin to authenticate
            window.location.href = '/web-hosting/cplogin';
        });
    });

})();
