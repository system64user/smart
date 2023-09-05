// ma.js

// download google analytics.js
function downloadGoogleAnalytics() {
    (function (i, s, o, g, r, a, m) {
        i['GoogleAnalyticsObject'] = r;
        i[r] = i[r] || function () {
            (i[r].q = i[r].q || []).push(arguments)
        }, i[r].l = 1 * new Date();
        a = s.createElement(o),
                m = s.getElementsByTagName(o)[0];
        a.async = 1;
        a.src = g;
        m.parentNode.insertBefore(a, m)
    })(window, document, 'script', '//www.google-analytics.com/analytics.js', 'ga');

}

function MA(trackId, configProperties) {
    downloadGoogleAnalytics();

    // set trackId
    this.trackId = trackId;

    if (configProperties != undefined) {
        this.config(configProperties);
    }

}

MA.prototype.config = function (configProperties) {
    jQuery.extend(this, configProperties);
    if (!this.createdTracker) {
        if (this.uid != undefined) {
            ga('create', this.trackId, {"userId" : this.uid});
        } else {
            ga('create', this.trackId, 'auto');
        }
        this.createdTracker = true;
    } else if (this.uid != undefined) {
        ga('set', '&uid', this.uid);
    }
    if (this.dimensions != undefined) {
        if (this.dimensionIndex != undefined) {
            var newDimensions = {};
            for (var dimensionName in this.dimensions) {
                newDimensions["dimension" + this.dimensionIndex[dimensionName]] = this.dimensions[dimensionName];
            }
            ga('set', newDimensions);
        } else {
            ga('set', this.dimensions);
        }
    }

}

MA.prototype.setDimension = function (dimensionName, dimensionValue) {
    if (this.dimensions == undefined) {
        this.dimensions = {};
    }
    if (this.dimensionIndex != undefined && this.dimensionIndex[dimensionName] != undefined) {

        this.dimensions["dimension" + this.dimensionIndex[dimensionName]] = dimensionValue;
        ga('set', this.dimensions);
    } else if (/dimension\d+/.test(dimensionName)) {
        this.dimensions[dimensionName] = dimensionValue;
        ga('set', this.dimensions);
    } else {
        if (console) {
            console.error("cannot convert dimensionName to standard google dimension : " + dimensionName);
        }
    }
}

MA.prototype.sendPageView = function (url) {
    // Set a single field.
    ga('set', 'page', url);
    // send pageview
    ga('send', 'pageview');

}

MA.prototype.sendEvent = function (resourceLable, category, action, eventValue, page) {
    if (!this.shouldSend())
        return;
    ga('send', {
        'hitType'       : 'event',          // Required in ga
        'eventCategory' : category,   // Required in ga
        'eventAction'   : action,      // Required in ga
        'eventLabel'    : resourceLable,
        'eventValue'    : eventValue,
        'page'          : page
    });
}

MA.prototype.sendTiming = function (category, timingVar, timingValue, timingLabel, page) {
    if (!this.shouldSend())
        return;
    ga('send', {
        'hitType'        : 'timing',
        'timingCategory' : category,
        'timingVar'      : timingVar,
        'timingValue'    : timingValue,
        'timingLabel'    : timingLabel,
        'page'           : page
    });
}

MA.prototype.shouldSend = function () {
    if (this.cosId != undefined) {
        // todo: judge whether to send
        return false;
    } else if (this.attend == false) {
        return false;
    } else {
        return true;
    }
}
