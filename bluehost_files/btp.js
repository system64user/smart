//BlueHost file


if (getEU() === "false" || getEU() === false) {
    loadCyb();
}
function loadCyb() {
    try {
        waitForNewFlowCYB();
        //waitForConfirmCYB();
           
        if (document.querySelector(".form-actions__button.btn.btn_primary.btn-primary.pie.signup_submit") && document.querySelector(".form-actions__button.btn.btn_primary.btn-primary.pie.signup_submit").innerText === "submit" && !!~window.location.href.indexOf('luehost.com/web-hosting/signup')) {
            document.querySelector(".form-actions__button.btn.btn_primary.btn-primary.pie.signup_submit").addEventListener("click", function() {
                window._vteq.push({
                    'event': {
                        'event_name': 'emailstop'
                    }
                })
                window.cybOrderData = {
                    order_id: Date.now(),
                    value: "1",
                }
                window._vteq = window._vteq || [];
                window._vteq.push({
                    confirmation: {
                        items: [],
                        orderId: window.cybOrderData.order_id,
                        total: window.cybOrderData.value
                    }
                });
            })
        }
        var convck = null;
        if (!!~window.location.href.indexOf("bluehost.com/web-hosting/signup")) {
            var convck = setInterval(chkconv, 1500);
        } else if (!!~window.location.href.indexOf("bluehost.com/registration")) {
          //var convck = setInterval(chkconvDomains, 1500);
        }
        if (window.jQuery) {
            if (jQuery('.signup.page-success-upsell form h1').text().indexOf('congratulations') >= 0 ||
                jQuery('.signup.page-success-upsell form h1').text().indexOf('Congratulations') >= 0 ||
                jQuery('.green_head').text().indexOf('Congratulations!') >= 0 ||
                jQuery('.h1.receipt-header.congrats.au-receipt-header').text().indexOf('Congratulations') >= 0) {
                window.cybOrderData = {
                    order_id: document.cookie.replace(/(?:(?:^|.*;\s*)orderNumber\s*\=\s*([^;]*).*$)|^.*$/, "$1"),
                    value: document.cookie.replace(/(?:(?:^|.*;\s*)orderTotal\s*\=\s*([^;]*).*$)|^.*$/, "$1"),
                    custom_fields: {
                        currency: "USD",
                        email: document.cookie.replace(/(?:(?:^|.*;\s*)c_64ei\s*\=\s*([^;]*).*$)|^.*$/, "$1"),
                        sessionid: document.cookie.replace(/(?:(?:^|.*;\s*)cybSessionID\s*\=\s*([^;]*).*$)|^.*$/, "$1")
                    }
                };
                window._vteq = window._vteq || [];
                window._vteq.push({
                    confirmation: {
                        items: [],
                        orderId: window.cybOrderData.order_id,
                        total: window.cybOrderData.value
                    }
                });
            }
            if (!!~window.location.href.indexOf('bluehost.com/web-hosting/signup')) {
                jQuery(document).bind("DOMSubtreeModified", function() {
                    //console.log('DOM MODIFIED');
                    //console.log(document.querySelector("#emailAddress"));
                    if (document.querySelector("[name='domain']") !== null) {
                        if (document.querySelector("[name='domain']")) {
                            var d = new Date();
                            d.setTime(d.getTime() + (3600 * 1000));
                            var expires = "expires=" + d.toGMTString();
                            document.cookie = "orderNumber=" + document.querySelector("[name='domain']").value + ";expires=" + expires + ";path=/";
                        }

                    }
                    if (document.querySelector('#totalcost') !== null) {
                        if (document.querySelector('#totalcost')) {
                            var d = new Date();
                            d.setTime(d.getTime() + (3600 * 1000));
                            var expires = "expires=" + d.toGMTString();
                            document.cookie = "orderTotal=" + document.querySelector('#totalcost').innerText.replace(",", "").replace("$", '') + ";expires=" + expires + ";path=/";
                        }

                    }
                });
            }
        }
        /*!function(){var e=document.createElement("script");e.type="text/javascript",e.async=!0,e.src="//d2rp1k1dldbai6.cloudfront.net/cybba_latest.min.js";var t=document.getElementsByTagName("head")[0];t?t.appendChild(e,t):(t=document.getElementsByTagName("script")[0]).parentNode.insertBefore(e,t)}();*/


        if (!document.querySelector('script[src*="loader.min.js"]')) {
		


    (function() {
                var d = '800';
                //replace this with your live domain, if you need the script to run anywhere. Eg.: var d = "example.com";
                var fl = function(u) {
                    var l = document.createElement("script");
                    l.type = "text/javascript";
                    l.async = true;
                    l.src = u;
                    var s = document.getElementsByTagName("script")[0];
                    s.parentNode.insertBefore(l, s);
                };
                var rand = Math.floor(Math.random() * 50000);
                fl("https://files1.cybba.solutions/" + d + "/loader.min.js?v=" + rand);
                window._vteq = window._vteq || [];
                setTimeout(function() {
                    if (!window._vtsdk) {
                        fl("https://storage.googleapis.com/cybcdn/" + d + "/loader.js?v=" + rand);
                    }
                }, 1100);
                setTimeout(function() {
                    'nestedVarDefined' in window && !nestedVarDefined('_vtsdk.state.eventQueue') && '_vtsdk' in window && _vtsdk.init()
                }, 3000);
            })();
        }
    } catch (e) {
        console.log(e.message);
    }
}

function getEU() {
    var euCheck;
    if (document.cookie.replace(/(?:(?:^|.*;\s*)isEU\s*\=\s*([^;]*).*$)|^.*$/, "$1") === "" && localStorage.getItem("isEU") === null && sessionStorage.getItem("isEU") === null) {
        euCheck = checkEU();
    } else {
        euCheck = getEUStorage();
    }
    return euCheck;
}

function checkEU() {
    var isEUCheck;
    try {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                var response = JSON.parse(xhttp.responseText);
                isEUCheck = (response.continentCode && response.continentCode === 'EU') || !1;
                setCookieCYB('cybGeoIPData', response.country, 1)
                setEUStorage(isEUCheck);
                if (isEUCheck === false) {
                    loadCyb();
                }
            }
        };
        xhttp.open("GET", "//pro.ip-api.com/json/?fields=continentCode,country&key=X8nNh9l0HcVYntp", true);
        xhttp.send();
    } catch (e) {
        setEUStorage(true);
    }
    return isEUCheck;
}

function setEUStorage(isEU) {
    var d = new Date();
    d.setTime(d.getTime() + (31556952000));
    var expires = "expires=" + d.toGMTString();
    document.cookie = "isEU=" + isEU + "; expires=" + expires + "; path=/";
    localStorage.setItem("isEU", isEU);
    sessionStorage.setItem("isEU", isEU);
}

function getEUStorage() {
    var isEU = true;
    if (document.cookie.replace(/(?:(?:^|.*;\s*)isEU\s*\=\s*([^;]*).*$)|^.*$/, "$1") !== "") {
        isEU = document.cookie.replace(/(?:(?:^|.*;\s*)isEU\s*\=\s*([^;]*).*$)|^.*$/, "$1");
    } else if (localStorage.getItem("isEU") !== null) {
        isEU = localStorage.getItem("isEU");
    } else if (sessionStorage.getItem("isEU") !== null) {
        isEU = sessionStorage.getItem("isEU");
    }
    return isEU
}

function setCookieCYB(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";domain=" + (window.location.host.match(/\./g).length > 1 ? window.location.host.replace(/[a-zA-Z0-9]+\./i, '.') : "." + window.location.host) + ";path=/";
}

function chkconv() {
    if (typeof window.cybDone === 'undefined' && !!document.querySelector("[data-cy='signup_success']")) {
        window.cybOrderData = {
            order_id: document.cookie.replace(/(?:(?:^|.*;\s*)orderNumber\s*\=\s*([^;]*).*$)|^.*$/, "$1"),
            value: document.cookie.replace(/(?:(?:^|.*;\s*)orderTotal\s*\=\s*([^;]*).*$)|^.*$/, "$1"),
        }
        window._vteq = window._vteq || [];
        window._vteq.push({
            confirmation: {
                items: [],
                orderId: window.cybOrderData.order_id,
                total: window.cybOrderData.value
            }
        });
        window.cybDone = true;
        clearInterval(convck);
    }
}

function chkconvDomains() {
    if (typeof window.cybDone === 'undefined' && !!~window.location.href.indexOf('bluehost.com/registration') && document.querySelector('.totals .price.total.au-total-total') && document.querySelector('.h1.receipt-header.congrats.au-receipt-header')) {
        window.cybOrderData = {
            order_id: document.querySelector('.product-details .product-name').innerText,
            value: document.querySelector('.totals .price.total.au-total-total').innerText.replace(',', '').match(/[0-9.^]+/g)[0],
        }
        window._vteq = window._vteq || [];
        window._vteq.push({
            confirmation: {
                items: [],
                orderId: window.cybOrderData.order_id,
                total: window.cybOrderData.value
            }
        });
        window.cybDone = true;
        clearInterval(convck);
    }
}

function makeRequestCYB(e, t) {
    (function(e) {
        return new Promise(function(t, r) {
            var a = new XMLHttpRequest;
            a.open("GET", e, !0), a.onload = function() {
                4 == this.readyState && 200 == this.status ? t(a.response) : r("Couldn't reach page: " + a.statusText)
            }, a.send()
        })
    })(e).then(t).catch(displayLogDataCYB)
}

function geoDataCYB(e) {
    try {
        sessionStorage.cybGeo || (e = JSON.parse(e), cybData.geoData = {}, cybData.geoData.ip = e.query, cybData.geoData.city = e.city, cybData.geoData.country = e.country, cybData.geoData.country_code = e.countryCode, cybData.geoData.isEU = isEUCYB(cybData.geoData.country) || isEUCYB(cybData.geoData.country_code), cybData.geoData.state = e.regionName, sessionStorage.cybGeo = JSON.stringify(cybData.geoData))
    } catch (e) {}
}

function createScript(e) {
    var t = document.createElement("script");
    t.setAttribute("src", e), t.setAttribute("async", !0), t.setAttribute("type", "text/javascript"), document.body.appendChild(t)
}

function urlParamCYB(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var results = new RegExp('[\\?&]' + name + '=([^&#]*)').exec(location.search);
    return !!results ? decodeURIComponent(results[1].replace(/\+/g, ' ')) : '';
}

function waitForNewFlowCYB() {
    if ( !!~window.location.href.indexOf('bluehost.com/registration/?flow=') && document.querySelector('.savings-row .au-price.price-unit') && document.querySelector('#selectedPlan') && document.querySelector('.au-plan-name.plan-name')) {
        window._vteq = window._vteq || [];
        let pItems = [];
        var dynamicURLNewFlowUTMs =  window.location.href.split("/2")[0] + "/1"
		var dynamicURLNewFlowUTMs2 = document.querySelector('.domain-name') ? window.location.href.split('#')[0]+ "&search="+document.querySelector('.domain-name').innerText.split('.')[0] +"&tld="+document.querySelector('.domain-name').innerText.split('.')[1]+"#"+window.location.href.split('#')[1] : window.location.href.split("/2")[0] + "/1"
        var DiscountNewFlow = document.querySelector('.savings-row .au-price.price-unit').innerText.split("(")[1].replace(/[^0-9.%]+/g, '')
        var cybTermTypeNewFlow = document.querySelector('#selectedPlan').value.replace(/[^0-9.%]+/g, '')
        var ProductNameNewFlow = document.querySelector('.au-plan-name.plan-name').innerText

        pItems.push({
            'dynamicURLNewFlowUTMs': dynamicURLNewFlowUTMs,
			'dynamicURLNewFlowUTMs2': dynamicURLNewFlowUTMs2,
            'DiscountNewFlow': DiscountNewFlow,
            'cybTermTypeNewFlow': cybTermTypeNewFlow,
            'ProductNameNewFlow': ProductNameNewFlow
        });
        _vteq.push({
            'event': {
                'event_name': 'newhostingflow3',
                'items': pItems
            }
        });
    }else if ( !!~window.location.href.indexOf('bluehost.com/registration/?endpoint=jarvis&flow=') && document.querySelector('.savings-row .au-price.price-unit') && document.querySelector('#selectedPlan') && document.querySelector('.au-plan-name.plan-name')) {
        window._vteq = window._vteq || [];
        let pItems = [];
        var dynamicURLNewFlowUTMs =  window.location.href.split("/2")[0] + "/1"
		var dynamicURLNewFlowUTMs2 = document.querySelector('.domain-name') ? window.location.href.split('#')[0]+ "&search="+document.querySelector('.domain-name').innerText.split('.')[0] +"&tld="+document.querySelector('.domain-name').innerText.split('.')[1]+"#"+window.location.href.split('#')[1] : window.location.href.split("/2")[0] + "/1"
		var dynamicURLNewFlowUTMs3 = window.location.href.split("?")[0] +"?" +window.location.href.split("?")[1].split("jarvis&")[1].split("&jtype")[0] +"#"+window.location.href.split('#')[1].split('/2')[0]+"/1"
        var DiscountNewFlow = document.querySelector('.savings-row .au-price.price-unit').innerText.split("(")[1].replace(/[^0-9.%]+/g, '')
        var cybTermTypeNewFlow = document.querySelector('#selectedPlan').value.replace(/[^0-9.%]+/g, '')
        var ProductNameNewFlow = document.querySelector('.au-plan-name.plan-name').innerText

        pItems.push({
            'dynamicURLNewFlowUTMs': dynamicURLNewFlowUTMs,
			'dynamicURLNewFlowUTMs2': dynamicURLNewFlowUTMs2,
			'dynamicURLNewFlowUTMs3': dynamicURLNewFlowUTMs3,
            'DiscountNewFlow': DiscountNewFlow,
            'cybTermTypeNewFlow': cybTermTypeNewFlow,
            'ProductNameNewFlow': ProductNameNewFlow
        });
        _vteq.push({
            'event': {
                'event_name': 'newhostingflow4',
                'items': pItems
            }
        });
    } else {
        setTimeout(waitForNewFlowCYB, 250);
    }
}
function waitForConfirmCYB() {
    if (typeof google_tag_manager['GTM-WS625V'] !== 'undefined' &&
        typeof google_tag_manager['GTM-WS625V'].dataLayer !== 'undefined' &&
        typeof google_tag_manager['GTM-WS625V'].dataLayer.get('ecommerce') !== 'undefined' &&
        typeof google_tag_manager['GTM-WS625V'].dataLayer.get('ecommerce').purchase !== 'undefined' &&
        typeof google_tag_manager['GTM-WS625V'].dataLayer.get('ecommerce').purchase.actionField !== 'undefined' &&
        typeof google_tag_manager['GTM-WS625V'].dataLayer.get('ecommerce').purchase.actionField.id !== 'undefined' &&
        typeof google_tag_manager['GTM-WS625V'].dataLayer.get('ecommerce').purchase.actionField.revenue !== 'undefined' &&
        google_tag_manager['GTM-WS625V'].dataLayer.get('ecommerce').purchase.actionField.revenue != null &&
        google_tag_manager['GTM-WS625V'].dataLayer.get('ecommerce').purchase.actionField.id != null) {
        window.cybOrderData = {
            order_id: google_tag_manager['GTM-WS625V'].dataLayer.get('ecommerce').purchase.actionField.id + "|NewFlow",
            value: google_tag_manager['GTM-WS625V'].dataLayer.get('ecommerce').purchase.actionField.revenue
        };
        window._vteq = window._vteq || [];
        window._vteq.push({
            confirmation: {
                items: [],
                orderId: cybOrderData.order_id,
                total: cybOrderData.value
            }
        });
    } else {
        setTimeout(waitForConfirmCYB, 250);
    }
}
