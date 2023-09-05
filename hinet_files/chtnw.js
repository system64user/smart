(function () {
  'use strict';

  /*! js-cookie v3.0.1 | MIT */
  /* eslint-disable no-var */
  function assign (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        target[key] = source[key];
      }
    }
    return target
  }
  /* eslint-enable no-var */

  /* eslint-disable no-var */
  var defaultConverter = {
    read: function (value) {
      if (value[0] === '"') {
        value = value.slice(1, -1);
      }
      return value.replace(/(%[\dA-F]{2})+/gi, decodeURIComponent)
    },
    write: function (value) {
      return encodeURIComponent(value).replace(
        /%(2[346BF]|3[AC-F]|40|5[BDE]|60|7[BCD])/g,
        decodeURIComponent
      )
    }
  };
  /* eslint-enable no-var */

  /* eslint-disable no-var */

  function init (converter, defaultAttributes) {
    function set (key, value, attributes) {
      if (typeof document === 'undefined') {
        return
      }

      attributes = assign({}, defaultAttributes, attributes);

      if (typeof attributes.expires === 'number') {
        attributes.expires = new Date(Date.now() + attributes.expires * 864e5);
      }
      if (attributes.expires) {
        attributes.expires = attributes.expires.toUTCString();
      }

      key = encodeURIComponent(key)
        .replace(/%(2[346B]|5E|60|7C)/g, decodeURIComponent)
        .replace(/[()]/g, escape);

      var stringifiedAttributes = '';
      for (var attributeName in attributes) {
        if (!attributes[attributeName]) {
          continue
        }

        stringifiedAttributes += '; ' + attributeName;

        if (attributes[attributeName] === true) {
          continue
        }

        // Considers RFC 6265 section 5.2:
        // ...
        // 3.  If the remaining unparsed-attributes contains a %x3B (";")
        //     character:
        // Consume the characters of the unparsed-attributes up to,
        // not including, the first %x3B (";") character.
        // ...
        stringifiedAttributes += '=' + attributes[attributeName].split(';')[0];
      }

      return (document.cookie =
        key + '=' + converter.write(value, key) + stringifiedAttributes)
    }

    function get (key) {
      if (typeof document === 'undefined' || (arguments.length && !key)) {
        return
      }

      // To prevent the for loop in the first place assign an empty array
      // in case there are no cookies at all.
      var cookies = document.cookie ? document.cookie.split('; ') : [];
      var jar = {};
      for (var i = 0; i < cookies.length; i++) {
        var parts = cookies[i].split('=');
        var value = parts.slice(1).join('=');

        try {
          var foundKey = decodeURIComponent(parts[0]);
          jar[foundKey] = converter.read(value, foundKey);

          if (key === foundKey) {
            break
          }
        } catch (e) {}
      }

      return key ? jar[key] : jar
    }

    return Object.create(
      {
        set: set,
        get: get,
        remove: function (key, attributes) {
          set(
            key,
            '',
            assign({}, attributes, {
              expires: -1
            })
          );
        },
        withAttributes: function (attributes) {
          return init(this.converter, assign({}, this.attributes, attributes))
        },
        withConverter: function (converter) {
          return init(assign({}, this.converter, converter), this.attributes)
        }
      },
      {
        attributes: { value: Object.freeze(defaultAttributes) },
        converter: { value: Object.freeze(converter) }
      }
    )
  }

  var api = init(defaultConverter, { path: '/' });

  // Unique ID creation requires a high quality random # generator. In the browser we therefore
  // require the crypto API and do not support built-in fallback to lower quality random number
  // generators (like Math.random()).
  var getRandomValues;
  var rnds8 = new Uint8Array(16);
  function rng() {
    // lazy load so that environments that need to polyfill have a chance to do so
    if (!getRandomValues) {
      // getRandomValues needs to be invoked in a context where "this" is a Crypto implementation. Also,
      // find the complete implementation of crypto (msCrypto) on IE11.
      getRandomValues = typeof crypto !== 'undefined' && crypto.getRandomValues && crypto.getRandomValues.bind(crypto) || typeof msCrypto !== 'undefined' && typeof msCrypto.getRandomValues === 'function' && msCrypto.getRandomValues.bind(msCrypto);

      if (!getRandomValues) {
        throw new Error('crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported');
      }
    }

    return getRandomValues(rnds8);
  }

  var REGEX = /^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i;

  function validate(uuid) {
    return typeof uuid === 'string' && REGEX.test(uuid);
  }

  /**
   * Convert array of 16 byte values to UUID string format of the form:
   * XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
   */

  var byteToHex = [];

  for (var i = 0; i < 256; ++i) {
    byteToHex.push((i + 0x100).toString(16).substr(1));
  }

  function stringify(arr) {
    var offset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    // Note: Be careful editing this code!  It's been tuned for performance
    // and works in ways you may not expect. See https://github.com/uuidjs/uuid/pull/434
    var uuid = (byteToHex[arr[offset + 0]] + byteToHex[arr[offset + 1]] + byteToHex[arr[offset + 2]] + byteToHex[arr[offset + 3]] + '-' + byteToHex[arr[offset + 4]] + byteToHex[arr[offset + 5]] + '-' + byteToHex[arr[offset + 6]] + byteToHex[arr[offset + 7]] + '-' + byteToHex[arr[offset + 8]] + byteToHex[arr[offset + 9]] + '-' + byteToHex[arr[offset + 10]] + byteToHex[arr[offset + 11]] + byteToHex[arr[offset + 12]] + byteToHex[arr[offset + 13]] + byteToHex[arr[offset + 14]] + byteToHex[arr[offset + 15]]).toLowerCase(); // Consistency check for valid UUID.  If this throws, it's likely due to one
    // of the following:
    // - One or more input array values don't map to a hex octet (leading to
    // "undefined" in the uuid)
    // - Invalid input values for the RFC `version` or `variant` fields

    if (!validate(uuid)) {
      throw TypeError('Stringified UUID is invalid');
    }

    return uuid;
  }

  function v4(options, buf, offset) {
    options = options || {};
    var rnds = options.random || (options.rng || rng)(); // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`

    rnds[6] = rnds[6] & 0x0f | 0x40;
    rnds[8] = rnds[8] & 0x3f | 0x80; // Copy bytes to buffer, if provided

    if (buf) {
      offset = offset || 0;

      for (var i = 0; i < 16; ++i) {
        buf[offset + i] = rnds[i];
      }

      return buf;
    }

    return stringify(rnds);
  }

  var config = {
    adUrl: 'https://static.cht.hinet.net/api/v1',
  };

  const fetchAd = (params) => {
    const query = Object.entries(params).reduce((a,[k,v]) => (v == null ? a : (a[k]=v, a)), {});
    const url = new URL(`${config.adUrl}/request/ad`);
    url.search = new URLSearchParams(query).toString();
    return fetch(url).then((response) => response.json());
  };

  const sendEvent = (params) => {
    const query = Object.entries(params).reduce((a,[k,v]) => (v == null ? a : (a[k]=v, a)), {});
    if (query.token !== 'review') {
      const url = new URL(`${config.adUrl}/trace/event`);
      url.search = new URLSearchParams(query).toString();
      const img = new Image();
      img.src = url;
    }
  };

  const sendEventThird = (params) => {
    if (params.token !== 'review') {
      const url = new URL(`${config.adUrl}/trace/third`);
      url.search = new URLSearchParams(params).toString();
      const img = new Image();
      img.src = url;
    }
  };

  class Timer {
    constructor(callback, delay) {
      this.isStart = false;
      this.callback = callback;
      this.start, (this.remaining = delay);
    }

    pause() {
      this.isStart = false;
      clearTimeout(this.timerId);
      if (this.start !== undefined) {
        this.remaining -= new Date() - this.start;
      }
      this.start = undefined;
    }

    resume() {
      if (!this.isStart) {
        this.start = new Date();
        clearTimeout(this.timerId);
        this.timerId = setTimeout(this.callback, this.remaining);
        this.isStart = true;
      }
    }
  }

  class Ad {
    constructor(queue) {
      this.queue = queue;
      this.ads = [];
      const uuid = api.get('__htid') || v4();
      api.set('__htid', uuid);
      this.uuid = uuid;
    }
    init() {
      this.params = new Proxy(new URLSearchParams(window.location.search), {
        get: (searchParams, prop) => searchParams.get(prop),
      });
      this.queue.forEach((action) => action());
    }
    /* eslint-disable class-methods-use-this */
    push(action) {
      action();
    }
    /* eslint-enable class-methods-use-this */

    async display(targetId, key, callback) {
      const target = document.getElementById(targetId);
      target.key = key;
      target.callback = callback;
      await this.callAd(target);
    }

    async prebid(targetId, key, bidId) {
      const target = document.getElementById(targetId);
      target.key = key;
      target.bidId = bidId;
      await this.callAd(target);
    }

    async callAd(target) {
      const { bidId } = target;
      const { review } = this.params;
      const [source] = target.source || [null];
      const { data: ad } = await fetchAd(
        Object.assign(
          {
            key: target.key,
            uuid: this.uuid,
          },
          bidId === null ? null : { bidId },
          source === null ? null : { source },
          review === null ? null : { review },
        ),
      );
      if (!target.source && 'source' in ad) {
        target.source = ad['source'];
      }
      if (target.source) {
        target.source.shift();
      }
      if ('element' in ad) {
        target.style.position = 'relative';
        if (ad.width > 0) {
          target.style.width = `${ad.width}px`;
        }
        if (ad.height > 0) {
          target.style.height = `${ad.height}px`;
        }
        const overlay = document.createElement('div');
        overlay.style.width = '100%';
        overlay.style.height = '100%';
        overlay.style.position = 'absolute';
        overlay.style.top = 0;
        overlay.style.left = 0;
        overlay.style.zIndex = 99;
        overlay.style.cursor = 'pointer';
        const adFrame = document.createElement('iframe');
        adFrame.style.width = '100%';
        adFrame.style.height = '100%';
        adFrame.setAttribute('scrolling', 'no');
        adFrame.setAttribute('marginheight', 0);
        adFrame.setAttribute('marginwidth', 0);
        adFrame.setAttribute('frameborder', '0');
        target.appendChild(overlay);
        target.appendChild(adFrame);
        this.ads.push(overlay);
        const viewObserver = new IntersectionObserver(
          (changes) => {
            for (const change of changes) {
              if (change.intersectionRatio > ad.viewable.visible_area*0.01) {
                change.target.timer.resume();
              } else {
                change.target.timer.pause();
              }
            }
          },
          {
            threshold: [0, 0.45, 0.75, 1],
          },
        );
        overlay.timer = new Timer(() => {
          console.log('vaild');
          sendEvent({
            event: 'valid',
            token: ad.token,
            cpac: ad.cpac,
            bidId,
          });
          viewObserver.unobserve(overlay);
          overlay.timer = null;
        }, ad.viewable.seconds * 1000);
        sendEvent({
          event: 'impression',
          token: ad.token,
          cpac: ad.cpac,
          bidId,
        });
        if (ad.viewable.seconds === 0) {
          sendEvent({
            event: 'valid',
            token: ad.token,
            cpac: ad.cpac,
            bidId,
          });
        } else {
          viewObserver.observe(overlay);
        }
        overlay.addEventListener('click', () => {
          window.open(ad.target_url, '_blank').focus();
          sendEvent({
            event: 'click',
            token: ad.token,
            cpac: ad.cpac,
            bidId,
          });
        });
        const adWindow = adFrame.contentWindow;
        adWindow.document.open();
        adWindow.document.write(ad.html);
        adWindow.document.write(ad.tracking);
        adWindow.document.close();
      } else if ('html' in ad) {
        const adFrame = document.createElement('iframe');
        adFrame.style.width = '100%';
        adFrame.style.height = '100%';
        adFrame.setAttribute('scrolling', 'no');
        adFrame.setAttribute('marginheight', 0);
        adFrame.setAttribute('marginwidth', 0);
        adFrame.setAttribute('frameborder', '0');
        target.appendChild(adFrame);
        const adWindow = adFrame.contentWindow;
        adWindow.chtnw = {
          noAd: async () => {
            console.log('noAd');
            target.innerHTML = '';
            await this.callAd(target);
          },
          send: (event) => {
            console.log(event);
            sendEventThird({
              event,
              token: ad.token,
              source: ad.current,
            });
          },
        };
        adWindow.document.open();
        adWindow.document.write(ad.html);
        adWindow.document.close();
        sendEventThird({
          event: 'impression',
          token: ad.token,
          source: ad.current,
        });
      } else {
        if (typeof target.callback === 'function') {
          target.callback();
        }
        try {
          if (target.source?.length) {
            await this.callAd(target);
          }
        } catch (error) {}
      }
    }
  }

  if (window.chtnw.length) {
    const ad = new Ad(window.chtnw);
    window.chtnw = ad;
    ad.init();
  }

})();
