/* jshint bitwise: false */
/* globals dataLayer */
/* exported popupCenter, gaTrack */
String.prototype.uc = function() {
    'use strict';

    return this.toUpperCase();
};

String.prototype.lc = function() {
    'use strict';

    return this.toLowerCase();
};

String.prototype.ucfirst = function() {
    'use strict';

    return (this.charAt(0).toUpperCase()) + this.substr(1);
};

Number.prototype.parity = function() {
    'use strict';

    return (0 === this % 2) ? 'even' : 'odd';
};

Number.prototype.is_odd = function() {
    'use strict';

    return (0 === this % 2) ? false : true;
};

Number.prototype.is_even = function() {
    'use strict';

    return (0 === this % 2) ? true : false;
};

if (!Array.prototype.indexOf) {
    Array.prototype.indexOf = function(searchElement) {
        'use strict';

        if (null === this) {
            throw new TypeError();
        }

        var t = Object(this);
        var len = t.length >>> 0;

        if (0 === len) {
            return -1;
        }

        var n = 0;

        if (1 < arguments.length) {
            n = Number(arguments[1]);

            if (n !== n) {
                n = 0;
            }
            else if (0 !== n && Infinity !== n && -Infinity !== n) {
                n = (0 < n || -1) * Math.floor(Math.abs(n));
            }
        }

        if (n >= len) {
            return -1;
        }

        var k = 0 <= n ? n : Math.max(len - Math.abs(n), 0);

        for (; k < len; k++) {
            if (k in t && t[k] === searchElement) {
                return k;
            }
        }

        return -1;
    };
}

function getEpoch() {
    'use strict';

    return new Date().getTime();
}


function csprng_rand_int(min, max) {
    "use strict";

    if (min === undefined) { min = 0; }
    if (max === undefined) { throw("Maximum integer value required"); }

    min = parseInt(min, 10);
    max = parseInt(max, 10);

    if (max < min) {
        throw("Maximum integer value cannot be less than the minimum integer value");
    }

    var uintmax = Math.pow(2,32) - 1;
    if (max > uintmax) {
        throw("Max random integer size is " + uintmax);
    }

    var cryptoObj = window.crypto || window.msCrypto;
    var zeroToMax = max - min + 1;
    if (!cryptoObj) {
        return Math.floor(Math.random() * zeroToMax) + min;
    }

    var bias_free_limit  = Math.floor((uintmax / (zeroToMax)) * (zeroToMax));
    var csprn = cryptoObj.getRandomValues(new Uint32Array(1))[0];
    while (csprn >= bias_free_limit) {
        csprn = cryptoObj.getRandomValues(new Uint32Array(1))[0];
    }

    return (csprn % (zeroToMax)) + min;
}

// Underscore.js 1.8.3
// http://underscorejs.org
// (c) 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
// Underscore may be freely distributed under the MIT license.
function debounce(func, wait, immediate) {
    'use strict';

    var timeout;
    var args;
    var context;
    var timestamp;
    var result;

    var later = function() {
        var last = getEpoch() - timestamp;

        if (last < wait && last >= 0) {
            timeout = setTimeout(later, wait - last);
        }
        else {
            timeout = null;

            if (!immediate) {
                result = func.apply(context, args);
                if (!timeout) {
                    context = args = null;
                }
            }
        }
    };

    return function() {
        context = this;
        args = arguments;
        timestamp = getEpoch();
        var callNow = immediate && !timeout;

        if (!timeout) {
            timeout = setTimeout(later, wait);
        }

        if (callNow) {
            result = func.apply(context, args);
            context = args = null;
        }

        return result;
    };
}

(function(common) {
    'use strict';

    common.Slider = function(config) {
        var self = this;
        var activeSlideIndex = 0;

        self.slides = config.slides || [];
        self.$slides = [];
        self.autoSlide = config.autoSlide || true;
        self.slideInterval = config.slideInterval || 5000;
        self.slideType = config.slideType || 'fade';
        self.slideDirection = config.slideDirection || 'left';
        self.slideDuration = config.slideDuration || 500;

        for (var i = 0; i < self.slides.length; i++) {
            self.$slides[i] = $(self.slides[i]);
            self.$slides[i].addClass('common-slider');
            if (0 === i) {
                self.$slides[i].addClass('slider-active');
            }
        }

        self.slideNext = function() {
            var newIndex = ((activeSlideIndex + 1) === self.slides.length) ? 0 :
                activeSlideIndex + 1;

            self.$slides[activeSlideIndex].removeClass('slider-active')
                .fadeOut(self.slideDuration / 2, function() {
                    self.$slides[newIndex].addClass('slider-active')
                        .fadeIn(self.slideDuration / 2);

                    activeSlideIndex = newIndex;
                });
        };

        self.slideTo = function(slideIndex) {
            self.$slides[activeSlideIndex].removeClass('slider-active')
                .fadeOut(self.slideDuration / 2, function() {
                    self.$slides[slideIndex].addClass('slider-active')
                        .fadeIn(self.slideDuration / 2);

                    activeSlideIndex = slideIndex;
                });
        };
    };
})(window.common = window.common || {});

// Create a hash of browser settings
var browser_settings = function() {
    'use strict';

    var hash = {};
    var css_properties = ['WebkitPerspective', 'MozPerspective', 'OPerspective', 'msPerspective'];
    var div = document.createElement('div');
    var is_ie;

    for (var property in css_properties) {
        if (div.style[css_properties[property]] !== undefined) {
            hash.css_prefix = css_properties[property].replace(/Perspective/, '').toLowerCase();
            hash.css_transform = '-' + hash.css_prefix + '-transform';
        }
    }

    // Figure out if we are IE and which version
    is_ie = (function() {
        return window.attachEvent && !window.addEventListener ? 1 : 0;
    })();

    // Are we IE?
    if (is_ie) {
        hash.is_ie = true;
        hash.ie = {};

        // We are IE and IE7
        if (window.XMLHttpRequest) {
            hash.ie.version = '7';
        }

        // We are IE and IE8+
        if (document.documentMode) {
            hash.ie.version = '' + document.documentMode;
        }
    }

    return hash;
};

var _browser = browser_settings();

// Pass Google Analytics Events
function gaTrack(gaCategory, gaAction, gaLabel, gaValue) {
    'use strict';

    dataLayer.push({
        event: 'GAEvent', // triggers the dataLayer update which also passes event to Google Analytics
        eventCategory: gaCategory,
        eventAction: gaAction,
        eventLabel: gaLabel,
        eventValue: (gaValue ? parseFloat(gaValue) : undefined) // Values must be a number
    });
}

function gaTrackHandler() {
    'use strict';

    // 'this' is defined as the element clicked on via our jQuery click handler
    var el = $(this); // jshint ignore:line
    var category = el.data('gaCategory');
    var ad_uid = el.data('gaAduid');
    var origin = el.data('gaOrigin');
    var source = el.data('gaSource');

    var gaLabel = ad_uid + '_' + origin + '_' + source;

    gaTrack(category, 'click', gaLabel);
}

function gaTrackPrep() {
    'use strict';

    if (!window.gaTrackThrottled) {
        window.gaTrackThrottled = debounce(gaTrackHandler, 1000, true);

        $(document).on('click.ga', '.ga-click', window.gaTrackThrottled);
    }
}

// Bind click handlers for gaTrack events
gaTrackPrep();

/**
 * Creates a popup window in the center of a users screen.
 *
 * [!] This function accounts for dual screen monitors vertical centering.
 * [!] This isn't perfect, it seems to work best in Firefox... sadly enough.
 *
 * @param string url
 * @param string title
 * @param integer width
 * @param integer height
 */
function popupCenter(url, title, width, height) {
    'use strict';

    // Fixes dual-screen position                                 Most browsers      Firefox
    var dualScreenTop = 'undefined' !== typeof window.screenTop ? window.screenTop : screen.top;
    var dualScreenLeft = 'undefined' !== typeof window.screenLeft ? window.screenLeft : screen.left;

    // Attempt to retrieve the center of the screen, minus sizing
    var top = ((screen.height / 2) - (height / 2)) + dualScreenTop;
    var left = ((screen.width / 2) - (width / 2)) + dualScreenLeft;

    // Create the window!
    var sizing = 'width=' + width + ', height=' + height + ', top=' + top + ', left=' + left;

    var extra = 'location=no, menubar=no, resizable=no, scrollbars=no, status=no, ' +
        'titlebar=no, toolbar=no, directories=no, copyhistory=no';

    var newWindow = window.open(url, title, sizing + ', ' + extra);

    // Puts focus on the newWindow
    if (window.focus) {
        newWindow.focus();
    }
}

var Slider = function(opts) {
    'use strict';

    var self = this;

    var $el = self.$el = (opts.el instanceof jQuery) ? opts.el : $(opts.el);
    var autoRotate = opts.timer || $el.data('timer') || 0;

    var slideBox = $el.find('.slides');
    var slides = slideBox.children('.slide');

    var forceSelected = slides.filter('.js-force-selected');

    var ledBox = $('<div class="leds">');
    var leds;

    /*
     * Disable the slider.
     */
    self.destroy = function() {
        ledBox.remove();
        $el.find('[data-slide=left],[data-slide=right]').off('.slider').detach();
        $el.off('.slider').removeClass('slider-enabled');
        if (timer) {
            window.clearTimeout(timer);
            timer = undefined;
        }
    };

    // Move self.destroy to the top so we can use it here...
    if (forceSelected.length) {
        forceSelected.addClass('active js-selected');

        self.destroy();

        return false;
    }

    // Add the LEDs to the slider
    ledBox.prependTo(slideBox);

    if (2 > slides.get().length) {
        return;
    }

    $el.addClass('slider-enabled');

    // create an "led" button for each slide found in the markup
    slides.each(function(i, el) {
        var led = $('<button class="led">');
        if ($(el).data('title')) {
            led.attr('title', $(el).data('title'));
        }

        if ($(el).hasClass('active')) {
            self.current = i;
            led.addClass('active');
        }
        led.click(function(e) {
            e.preventDefault();
            self.show(i, el);
        });

        ledBox.append(led);
    });
    leds = ledBox.children();

    // bind actions to the left/right rotate buttons, if they exist
    $el.find('[data-slide=left]').on('click.slider', function(e) {
        e.preventDefault();
        self.rotate(-1);
    });
    $el.find('[data-slide=right]').on('click.slider', function(e) {
        e.preventDefault();
        self.rotate(1);
    });

    var timer;
    function timedRotate() {
        self.rotate(1);
        timer = window.setTimeout(timedRotate, autoRotate);
    }
    if (autoRotate) {
        timer = window.setTimeout(timedRotate, autoRotate);
        $el.on('mouseleave.slider', function() {
            if (!timer) {
                timer = window.setTimeout(timedRotate, autoRotate);
            }
        });
        $el.on('mousemove.slider', function() {
            if (timer) {
                window.clearTimeout(timer);
                timer = undefined;
            }
        });
    }

    /*
     * Show a slide at a certain index.  The only argument is the index
     * number which can be any value since this method will wrap around.
     */
    self.show = function(i) {
        // wrap around
        i = ((i % slides.length) + slides.length) % slides.length;

        var slide = $(slides[i]).appendTo(slideBox);

        var current = slides.filter('.active');
        $el.removeClass('slide-' + current.attr('id'));
        if (slide.attr('id')) {
            $el.addClass('slide-' + slide.attr('id'));
        }

        if (i === self.current) {
            return;
        }

        slides.removeClass('active');

        setTimeout(function() {
            slide.addClass('active');
        }, 25);

        leds.removeClass('active');
        $(leds[i]).addClass('active');

        self.current = i;
    };

    /*
     * Rotate to a new slide relative to the current slide.  The argument
     * can be a positive or negative value.
     */
    self.rotate = function(n) {
        self.show(self.current + n);
    };

    self.show(self.current || 0);

};

(function() {
    'use strict';

    // Adds methods to $ - i.e. $.cacheScript
    $.extend({
        cacheScript: function(url, options) {
            options = $.extend(options || {}, {
                url: url,
                cache: true,
                dataType: 'script'
            });

            return this.ajax(options);
        }
    });

    // Adds methods to $() - i.e. $('body').filterFind
    $.fn.extend({
        filterFind: function(sel) {
            return this.filter(sel).add(this.find(sel));
        }
    });

    if ('object' === typeof provinfo) {
        if (provinfo.lte_ie9) {
            $.cacheScript(provinfo.cdn + '/media/shared/general/jquery/placeholder.min.js', {
                success: function() {
                    $('input,textarea').placeholder();
                }
            });
        }
        if (_browser.is_ie) {
            if (_browser.ie.version.match(/7|8/)) {
                $(document).on('mouseenter', '#header .tab', function() {
                    $('#header .subnav').hide();
                    $(this).find('.subnav').show();
                }).on('mouseleave', '#header .tab', function() {
                    $('#header .subnav').hide();
                });
            }
        }
    }

    $('a[href*="#"]:not([href="#"]):not(.tab):not(.js-noscroll)').click(function() {
        if (
            location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '') ||
            location.hostname === this.hostname
        ) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            if (target.length) {
                $('html,body').animate({scrollTop: target.offset().top}, 1000);
                if (window.history) {
                    var href = window.location.href.replace(/#[^#]*$/, '');
                    window.history.pushState({}, '', href + this.hash);
                }
                return false;
            }
        }
    });

    // header tabs
    $('#header .tab .subnav').on('focusin', function(e) {
        $(e.currentTarget).closest('.tab').addClass('active');
    });

    $('#header .tab')
        .on('keydown', function(e) {
            if (32 === e.which) {
                $(e.currentTarget).addClass('active');
                e.preventDefault();
            }
        })
        .on('focusout', function(e) {
            $(e.currentTarget).removeClass('active');
        });

    // svg icons
    $.fn.inlineSvgIcon = function() {
        $(this).each(function() {
            var $img = $(this);
            var src = $img.attr('src');
            var is_sprite = 0;

            if ($img.data('icon')) {
                is_sprite = 1;
                src = provinfo.cdn + '/media/shared/general/icons/' + $img.data('icon') + '.svg';
            }

            if (_browser.is_ie && _browser.ie.version.match(/7|8/) && !is_sprite) {
                var inverse = $img.hasClass('inverse');
                var width = $img.width() || $img.attr('width');
                var color = $img.data('color');
                var match = src.match(/(.*)\/media\/shared\/general\/icons\/([^.]+).svg/);

                if (!match) {
                    return;
                }

                src = '/cgi-bin/png_icon/' + match[2];
                src += '/' + width;

                if (color) {
                    src += '/' + color;
                }

                if (inverse) {
                    if (!color) {
                        src += '/0';
                    }
                    src += '/1';
                }

                $img.attr('src', src);
            }
            else {
                $.get(src, function(data) {
                    var $wrapper = $('<div><object width="100%" height="100%">');
                    var $svg = $(data).find('svg');
                    var widthAttr = $img.attr('width');

                    $wrapper.data($img.data())
                        .data('img-src', src);

                    $svg.removeAttr('xmlns:a x y')
                        .attr('preserveAspectRatio', 'xMidYMid meet')
                        .attr({width: '100%', height: '100%'});

                    $wrapper.width(widthAttr)
                        .height($img.attr('height') || widthAttr);

                    $.each($img[0].attributes, function(i, attr) {
                        if ('src' !== attr.name && 'alt' !== attr.name) {
                            $wrapper.attr(attr.name, attr.value);
                        }
                    });

                    $wrapper.find('object')
                        .append($svg);

                    $img.replaceWith($wrapper);

                    if (is_sprite) {
                        $wrapper.css('background-image', 'none');
                    }
                }, 'xml');
            }
        });
    };

    $(document).ready( function() {
        $('.svg_icon').inlineSvgIcon();
    });

    // overlay/lightbox
    var $overlay = $('<div>', {'class': 'lightbox_bg'});

    $overlay.css('display', 'block')
        .hide()
        .append(
            $('<span>', {'class': 'lightbox_loading'})
                .text('Loading...')
                .hide()
        )
        .appendTo('body');

    var $overlay_loading = $overlay.find('.lightbox_loading');

    $overlay.on('click', function(e) {
        e.preventDefault();

        closeLightbox();
    });

    var centerLightboxTimeout;

    function centerInViewportLightbox(el, width, height) {
        var viewportPadding = 100;
        var $el = $(el);
        var $padding = $el.find('>.lightbox_padding');
        var $header = $el.find('>.title');
        var titleHeight = $header.outerHeight(true);

        var $window = $(window);
        var windowWidth = $window.width();
        var windowHeight = $window.height();

        var w = Math.min(width || 500, windowWidth - viewportPadding);
        var h = Math.min(height, windowHeight - (viewportPadding + titleHeight));

        var elWidth = $el.outerWidth();
        var elHeight = $el.outerHeight();

        var paddingCss = {width: w};

        if (height) {
            paddingCss.height = h;
        }

        $padding.css(paddingCss);

        var lightboxCss = {};

        // Make sure we have at least a little gap between the window and the lightbox
        lightboxCss['margin-top'] = windowHeight <= (elHeight + 16) ? '0' : (h / -2) + 'px';
        lightboxCss['margin-left'] = windowWidth <= (elWidth + 16) ? '0' : (w / -2) + 'px';

        $el.css(lightboxCss);

        if (centerLightboxTimeout) {
            window.clearTimeout(centerLightboxTimeout);
            centerLightboxTimeout = undefined;
        }
        else {
            // Call this function one more time to make sure everything is centered properly
            centerLightboxTimeout = window.setTimeout(function() {
                centerInViewportLightbox(el, width, height);
            }, 100);
        }
    }

    var debouncedResize = debounce(function() {
        var lightbox = $('.lightbox_container');

        if (lightbox.length && lightbox.is(':visible')) {
            var width = lightbox.data('width');
            var height = lightbox.data('height');

            centerInViewportLightbox(lightbox, width, height);
        }
    }, 100);

    // Make our lightboxes responsive
    $(window).on('resize.lightbox', debouncedResize);

    function openLightbox(href, target, title, width, height, iframe, addon) {
        var $lightbox = $('<div>', {'class': 'lightbox_container'});
        var $heading = $('<h4>', {'class': 'title no_tt'}).html('&nbsp;');
        var $lightbox_padding = $('<div>', {'class': 'lightbox_padding', tabindex: 0});
        var $lightbox_content = $('<div>', {'class': 'lightbox_content'+ (addon ? ' ' + addon : '') }).html('&nbsp;');

        var $close = $('<button>', {type: 'button', 'class': 'close'});
        var $img = $('<img>', {
            'class': 'svg_icon',
            'data-color': 'white',
            src: provinfo.cdn + '/media/shared/general/icons/close.svg'
        });

        $lightbox_padding.append($lightbox_content)
            .appendTo($lightbox);

        $close.append($img)
            .appendTo($lightbox);

        $lightbox.prepend($heading);

        $img.inlineSvgIcon();

        if (iframe) {
            $lightbox_padding.replaceWith(
                $('<iframe>', {'class': 'lightbox_padding', src: href})
            );

            $heading.text(title);

            $lightbox.appendTo('body');

            centerInViewportLightbox($lightbox, width, height);
        }
        else {
            $.ajax({url: href, dataType: 'html', timeout: 5000})
                .done(function(d) {
                    var $el = $(d);
                    var $title = $el.filterFind('h1');

                    if (!title) {
                        title = $title.text();
                    }

                    if (target) {
                        var $filtered = $el.filterFind(target);
                        if (0 !== $filtered.get().length) {
                            $el = $filtered;
                        }
                    }

                    $heading.text(title);

                    $el.filterFind('img.svg_icon')
                        .inlineSvgIcon();

                    $lightbox_content.html($el.not($title));

                    $lightbox.appendTo('body');

                    // Store width/height as data attributes so we can access them on resize events
                    $lightbox.data({width: width, height: height});

                    centerInViewportLightbox($lightbox, width, height);

                    $overlay_loading.hide();

                    $lightbox_padding.focus();
                })
                .fail(function() {
                    closeLightbox($lightbox);

                    window.location.href = href.replace(/\/content$/, '');
                });

            $overlay_loading.show();
        }

        $close.on('click', function(e) {
            e.preventDefault();

            closeLightbox($lightbox);
        });

        $(document).on('keydown.lightbox', function(e) {
            if (27 === e.which) {
                e.preventDefault();

                closeLightbox($lightbox);
            }
        });

        $overlay.fadeIn();

        $('body').css('overflow', 'hidden');
    }

    function openLightboxFor(el, href, target, title, width, height, iframe, added_lightbox_class) {
        var $el = $(el);
        openLightbox(
            href || $el.data('src') || $el.attr('href'),
            target || $el.data('target'),
            title || $el.data('title') || $el.attr('title'),
            width || $el.data('lightboxWidth'),
            height || $el.data('lightboxHeight'),
            iframe || $el.data('iframe'),
            added_lightbox_class || $el.data('added_lightbox_class')
        );
    }

    function closeLightbox(el) {
        $overlay.fadeOut();
        $overlay_loading.hide();
        $(el || '.lightbox_container').remove();
        $('html, body').css({overflow: '', height: ''});
        $(document).off('keydown.lightbox');
    }

    $.lightbox = openLightbox;
    $.overlay = $overlay;

    $(document).on('click', '.lightbox, .js_lightbox, .js-lightbox', function(e) {
        e.preventDefault();

        openLightboxFor(e.currentTarget);
    });

    // selected
    $('.js-selected').removeClass('.js-selected');

    $('.js-product').on('click', function() {
        $(this).addClass('js-selected');
    });

    // FTC compliance
    function popup(elements, url, width, height, iframe) {
        if (!width) {
            width = 600;
        }

        if (!height) {
            height = 500;
        }

        var selectors = elements;
        var selectable = $(elements).closest('.js-product');

        $(document).on('click', selectors, function(e) {
            e.preventDefault();

            if ($(e.target).data('stop')) {
                e.stopImmediatePropagation();
            }

            openLightboxFor(e.currentTarget, url, null, null, width, height, iframe);

            selectable.removeClass('js-selected');
        });
    }

    var shouldIframe = !window.location.host.match(/^www/);

    popup(
        '.js_freedomain, .js-freedomain, .js-domains, .freedomain, .free-domain',
        '/free-domain.html/content',
        500, 255,
        shouldIframe
    );
    popup(
        '.js_unlimited, .js-unlimited, .js-unmetered, .unlimited',
        '/unlimited-hosting.html/content',
        null, null,
        shouldIframe
    );
    popup(
        '.js_moneyback, .js-moneyback, .moneyback',
        '/money-back-guarantee.html/content',
        null, null,
        shouldIframe
    );
    popup(
        '#h_currency_selector',
        '/currency-selection.html/content',
        null, null,
        shouldIframe
    );
    popup(
        '.js_trial, .js-trial',
        '/trial-disclaimer.html/content',
        null, null,
        shouldIframe
    );
    popup('.js_biography',false,800,400,shouldIframe);
    popup(
        '.phone-offline, .phone_offline_tab, .js-phone-offline',
        '/offline_phone_message?' + Math.random() + '/content',
        null, null,
        shouldIframe
    );

    // hero slider
    $('.slider, .js-slider').each(function(i, el) {
        var $el = $(el);

        if (767 < document.documentElement.clientWidth) {
            $el.data('slider', new Slider({el: $el}));
        }
    });

    // RADIOS AND CHECKBOXES
    function removeStuff() {
        var $inputs = $('.radio input, .checkbox input');

        $inputs.each(function() {
            var parent = $(this).parent();

            if ($(this).prop('checked')) {
                parent.addClass('active');
            }
            else {
                parent.removeClass('active');
            }
        });
    }

    removeStuff();

    $(document).on('click', '.radio, .checkbox', removeStuff);

    // slidestitial
    $(document).on('click', '.js-slidestitial-toggle', function() {
        var popup_id = $(this).data('popup');

        if (!$('.js-slidestitial').hasClass('active')) {
            $('body').prepend('<div class="js-slidestitial-fade slidestitial-fade"></div>');
            $('.js-slidestitial').prepend(
                $('<span class="js-slidestitial-close slidestitial-close">close</span>')
            );
        }

        $('.js-slidestitial[data-popup="' + popup_id + '"]').addClass('active');
    });

    $(document).on('click', '.js-slidestitial-fade,.js-slidestitial-close', function() {
        $('.js-slidestitial-fade,.js-slidestitial-close').remove();
        $('.js-slidestitial').removeClass('active');
    });

    window.open_chat_window = function(department, media, question) {
        // Attempt to use the new Genesys Chat first if it exists
        if (window.GenesysWidgets && window.openChat) {
            window.openChat();

        // Else if old window already opened, focus it
        } else if (window.chat_window && !(window.chat_window.closed)) {
            window.chat_window.focus();

        // Else make an old chat window
        } else {
            window.chat_window = window.open(
                '//helpchat.' + provinfo.domain,
                'helpchat',
                'width=600px,height=779px,location=no,menubar=no,scrollbars=no,status=no,titlebar=no,toolbar=no'
            );
        }
    };

    // hover styles
    var hoverItems = $('[data-hover]');

    hoverItems.on('mouseover', function() {
        var hoverThese = $(this).data('hover');

        hoverItems.filter('[data-hover="' + hoverThese + '"]').addClass('hover');
    })
        .on('mouseout', function() {
            hoverItems.removeClass('hover');
        });

})();
