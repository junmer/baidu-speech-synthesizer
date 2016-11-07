(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.BDSSpeechSynthesizer = factory());
}(this, (function () { 'use strict';

var asyncGenerator = function () {
  function AwaitValue(value) {
    this.value = value;
  }

  function AsyncGenerator(gen) {
    var front, back;

    function send(key, arg) {
      return new Promise(function (resolve, reject) {
        var request = {
          key: key,
          arg: arg,
          resolve: resolve,
          reject: reject,
          next: null
        };

        if (back) {
          back = back.next = request;
        } else {
          front = back = request;
          resume(key, arg);
        }
      });
    }

    function resume(key, arg) {
      try {
        var result = gen[key](arg);
        var value = result.value;

        if (value instanceof AwaitValue) {
          Promise.resolve(value.value).then(function (arg) {
            resume("next", arg);
          }, function (arg) {
            resume("throw", arg);
          });
        } else {
          settle(result.done ? "return" : "normal", result.value);
        }
      } catch (err) {
        settle("throw", err);
      }
    }

    function settle(type, value) {
      switch (type) {
        case "return":
          front.resolve({
            value: value,
            done: true
          });
          break;

        case "throw":
          front.reject(value);
          break;

        default:
          front.resolve({
            value: value,
            done: false
          });
          break;
      }

      front = front.next;

      if (front) {
        resume(front.key, front.arg);
      } else {
        back = null;
      }
    }

    this._invoke = send;

    if (typeof gen.return !== "function") {
      this.return = undefined;
    }
  }

  if (typeof Symbol === "function" && Symbol.asyncIterator) {
    AsyncGenerator.prototype[Symbol.asyncIterator] = function () {
      return this;
    };
  }

  AsyncGenerator.prototype.next = function (arg) {
    return this._invoke("next", arg);
  };

  AsyncGenerator.prototype.throw = function (arg) {
    return this._invoke("throw", arg);
  };

  AsyncGenerator.prototype.return = function (arg) {
    return this._invoke("return", arg);
  };

  return {
    wrap: function (fn) {
      return function () {
        return new AsyncGenerator(fn.apply(this, arguments));
      };
    },
    await: function (value) {
      return new AwaitValue(value);
    }
  };
}();





var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();







var get = function get(object, property, receiver) {
  if (object === null) object = Function.prototype;
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent === null) {
      return undefined;
    } else {
      return get(parent, property, receiver);
    }
  } else if ("value" in desc) {
    return desc.value;
  } else {
    var getter = desc.get;

    if (getter === undefined) {
      return undefined;
    }

    return getter.call(receiver);
  }
};

















var set = function set(object, property, value, receiver) {
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent !== null) {
      set(parent, property, value, receiver);
    }
  } else if ("value" in desc && desc.writable) {
    desc.value = value;
  } else {
    var setter = desc.set;

    if (setter !== undefined) {
      setter.call(receiver, value);
    }
  }

  return value;
};

/**
 * @file Sound Basic
 * @author junmer
 */

/**
 * 唯一id的起始值
 *
 * @inner
 * @type {number}
 */
var guidIndex = 1;

/**
 * 获取唯一id
 *
 * @inner
 * @return {string} 唯一id
 */
function guid() {
    return '_s_' + guidIndex++;
}

/**
 * 声音
 *
 * @class
 */

var Sound = function () {

    /**
     * Sound
     *
     * @constructor
     * @param {Object} options options
     * @param {string} options.src    地址
     * @param {string} options.autoplay    自动播放
     */
    function Sound(options) {
        classCallCheck(this, Sound);
        this.options = {
            src: '',
            autoplay: true
        };


        this.id = guid();

        Object.assign(this.options, options);

        Sound.getAudio(this.options.src);

        if (!options.autoplay) {
            return this;
        }

        this.play();
        return this;
    }

    createClass(Sound, [{
        key: 'on',
        value: function on(name, fn) {
            Sound.event.on(this.id, name, fn);
            return this;
        }
    }, {
        key: 'once',
        value: function once(name, fn) {
            Sound.event.once(this.id, name, fn);
            return this;
        }
    }, {
        key: 'off',
        value: function off(name, fn) {
            Sound.event.off(this.id, name, fn);
            return this;
        }

        /**
         * 播放
         */

    }, {
        key: 'play',
        value: function play() {
            var audio = Sound.getAudio(this.options.src);
            audio.id = this.id;
            audio.play();
            return this;
        }

        /**
         * 停止
         */

    }, {
        key: 'stop',
        value: function stop() {
            Sound.stop();
            return this;
        }

        /**
         * 获取 audio
         *
         * @param {string=} src    audio src
         * @return {Audio} audio
         */

    }], [{
        key: 'getAudio',
        value: function getAudio(src) {

            var audio;

            if (this.node) {
                audio = this.node;
            } else {
                audio = new Audio();
                audio.preload = 'auto';
                this.node = audio;
            }

            if (src) {
                audio.src = src;
            }

            return audio;
        }

        /**
         * 停止播放
         *
         * @return {Audio} audio
         */

    }, {
        key: 'stop',
        value: function stop() {
            var audio = Sound.getAudio();
            audio.pause();
            audio.currentTime = 0;
            return audio;
        }

        /**
         * 处理 ios 自动播放问题
         */

    }, {
        key: 'enableMobileAudio',
        value: function enableMobileAudio() {

            var ua = navigator.userAgent;

            var isMobile = /iPhone|iPad|iPod|Android|BlackBerry|BB10|Silk|Mobi/i.test(ua);
            var isTouch = !!('ontouchend' in window);

            if (!isMobile || !isTouch || this.mobileAudioEnabled) {
                return;
            }

            /**
             * 激活 audio 标签
             */
            function activeAudio() {
                var audio = Sound.getAudio();
                audio.play();
                audio.pause();
                Sound.mobileAudioEnabled = true;
                document.removeEventListener('touchstart', activeAudio, true);
            }

            document.addEventListener('touchstart', activeAudio, true);
        }
    }]);
    return Sound;
}();

/**
 * 声音的事件总线
 * 
 * @type {Object}
 */


Sound.event = {

    _events: {},

    _proxy: {},

    dispach: function dispach(name, audio) {

        var events = this._events[name];

        Object.keys(events).forEach(function (id) {

            if (id !== audio.id) {
                return;
            }

            events[id].forEach(function (fn) {
                fn(Sound.node);
            });
        });
    },

    on: function on(id, name, fn) {

        if (!this._proxy[name]) {
            var audio = Sound.getAudio();
            audio.addEventListener(name, this.dispach.bind(this, name, audio));
            this._proxy[name] = 1;
        }

        this._events[name] = this._events[name] || {};
        this._events[name][id] = this._events[name][id] || [];
        this._events[name][id].push(fn);
    },

    once: function once(id, name, fn) {

        var me = this;

        function onceFn(args) {
            fn(args);
            me.off(id, name, fn);
        }

        // 挂到on上以方便删除
        onceFn.fn = fn;

        this.on(id, name, onceFn);
    },

    off: function off(id, name, fn) {

        // 移除所有事件
        if (0 === arguments.length) {
            this._events = {};

            var audio = Sound.getAudio();
            var proxys = this._proxy;
            Object.keys(proxys).forEach(function (name) {
                audio.removeEventListener(name);
            });
            this._proxy = {};

            return this;
        }

        if (!this._proxy[name]) {
            return this;
        }

        if (!this._events[name]) {
            return this;
        }

        var listeners = this._events[name][id];

        if (!listeners) {
            return this;
        }

        var cb;

        for (var i = 0; i < listeners.length; i++) {
            cb = listeners[i];

            if (cb === fn || cb.fn === fn) {
                listeners.splice(i, 1);
                break;
            }
        }
    }

};

var index$2 = function (str) {
	return encodeURIComponent(str).replace(/[!'()*]/g, function (c) {
		return '%' + c.charCodeAt(0).toString(16).toUpperCase();
	});
};

/* eslint-disable no-unused-vars */
var hasOwnProperty = Object.prototype.hasOwnProperty;
var propIsEnumerable = Object.prototype.propertyIsEnumerable;

function toObject(val) {
	if (val === null || val === undefined) {
		throw new TypeError('Object.assign cannot be called with null or undefined');
	}

	return Object(val);
}

function shouldUseNative() {
	try {
		if (!Object.assign) {
			return false;
		}

		// Detect buggy property enumeration order in older V8 versions.

		// https://bugs.chromium.org/p/v8/issues/detail?id=4118
		var test1 = new String('abc');  // eslint-disable-line
		test1[5] = 'de';
		if (Object.getOwnPropertyNames(test1)[0] === '5') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test2 = {};
		for (var i = 0; i < 10; i++) {
			test2['_' + String.fromCharCode(i)] = i;
		}
		var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
			return test2[n];
		});
		if (order2.join('') !== '0123456789') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test3 = {};
		'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
			test3[letter] = letter;
		});
		if (Object.keys(Object.assign({}, test3)).join('') !==
				'abcdefghijklmnopqrst') {
			return false;
		}

		return true;
	} catch (e) {
		// We don't expect any of the above to throw, but better to be safe.
		return false;
	}
}

var index$4 = shouldUseNative() ? Object.assign : function (target, source) {
	var from;
	var to = toObject(target);
	var symbols;

	for (var s = 1; s < arguments.length; s++) {
		from = Object(arguments[s]);

		for (var key in from) {
			if (hasOwnProperty.call(from, key)) {
				to[key] = from[key];
			}
		}

		if (Object.getOwnPropertySymbols) {
			symbols = Object.getOwnPropertySymbols(from);
			for (var i = 0; i < symbols.length; i++) {
				if (propIsEnumerable.call(from, symbols[i])) {
					to[symbols[i]] = from[symbols[i]];
				}
			}
		}
	}

	return to;
};

var strictUriEncode = index$2;
var objectAssign = index$4;

function encode(value, opts) {
	if (opts.encode) {
		return opts.strict ? strictUriEncode(value) : encodeURIComponent(value);
	}

	return value;
}

var stringify = function (obj, opts) {
	var defaults = {
		encode: true,
		strict: true
	};

	opts = objectAssign(defaults, opts);

	return obj ? Object.keys(obj).sort().map(function (key) {
		var val = obj[key];

		if (val === undefined) {
			return '';
		}

		if (val === null) {
			return encode(key, opts);
		}

		if (Array.isArray(val)) {
			var result = [];

			val.slice().forEach(function (val2) {
				if (val2 === undefined) {
					return;
				}

				if (val2 === null) {
					result.push(encode(key, opts));
				} else {
					result.push(encode(key, opts) + '=' + encode(val2, opts));
				}
			});

			return result.join('&');
		}

		return encode(key, opts) + '=' + encode(val, opts);
	}).filter(function (x) {
		return x.length > 0;
	}).join('&') : '';
};

/**
 * @file BDSSpeechSynthesizer
 * @author junmer
 */

/**
 * BDSSpeechSynthesizer
 *
 * @class
 */

var BDSSpeechSynthesizer = function () {

    /**
     * BDSSpeechSynthesizer
     *
     * @constructor
     * @param {Object} options options
     * @param {string} options.lan    语言选择,填写zh
     * @param {string} options.cuid    用户唯一标识
     * @param {number=} options.spd    语速，取值0-9，默认为5中语速
     * @param {number=} options.pit    音调，取值0-9，默认为5中语调
     * @param {number=} options.vol    音量，取值0-9，默认为5中音量
     * @param {number=} options.per    发音人选择，取值0-1, 0为女声，1为男声，默认为女声
     */
    function BDSSpeechSynthesizer(options) {
        classCallCheck(this, BDSSpeechSynthesizer);
        this.speakers = {};
        this.options = {
            lan: 'zh',
            cuid: 'baidu_speech_demo',
            spd: '5',
            pit: '5',
            vol: '5',
            per: '0',
            ctp: '1',
            pdt: '1'
        };

        Object.assign(this.options, options);
        Sound.enableMobileAudio();
    }

    /**
     * synthesize
     *
     * @param {string} text 要播放的文字
     * @param {Object} options options
     * @param {string} options.lan    语言选择,填写zh
     * @param {string} options.cuid    用户唯一标识
     * @param {number=} options.spd    语速，取值0-9，默认为5中语速
     * @param {number=} options.pit    音调，取值0-9，默认为5中语调
     * @param {number=} options.vol    音量，取值0-9，默认为5中音量
     * @param {number=} options.per    发音人选择，取值0-1, 0为女声，1为男声，默认为女声
     * @return {string} 语音地址
     */


    createClass(BDSSpeechSynthesizer, [{
        key: 'synthesize',
        value: function synthesize(text, options) {

            var query = Object.assign({}, this.options, { tex: text }, options);

            return BDSSpeechSynthesizer.SERVER_URL + stringify(query);
        }

        /**
         * getSpeaker
         *
         * @param  {string} src     src
         * @param  {Object} options options
         * @return {Sound}         Sound instance
         */

    }, {
        key: 'getSpeaker',
        value: function getSpeaker(src, options) {

            var speaker = this.speakers[src];

            if (speaker) {
                return speaker;
            }

            var playOpt = Object.assign({
                src: src
            }, options);

            speaker = new Sound(playOpt);

            this.speakers[src] = speaker;

            return speaker;
        }

        /**
         * speak
         *
         * @param {string} text 要播放的文字
         * @param {Object=} options options
         * @param {string} options.lan    语言选择,填写zh
         * @param {string} options.cuid    用户唯一标识
         * @param {number=} options.spd    语速，取值0-9，默认为5中语速
         * @param {number=} options.pit    音调，取值0-9，默认为5中语调
         * @param {number=} options.vol    音量，取值0-9，默认为5中音量
         * @param {number=} options.per    发音人选择，取值0-1, 0为女声，1为男声，默认为女声
         * @param {Object=} playerOptions     播放器配置
         * @param {boolean} playerOptions.autoplay 自动播放
         * @return {Sound} Sound instance
         */

    }, {
        key: 'speak',
        value: function speak(text, options, playerOptions) {

            var url = this.synthesize(text, options);
            var speaker = this.getSpeaker(url, playerOptions);

            if (playerOptions && playerOptions.autoplay === false) {
                return speaker;
            }

            speaker.play();

            return speaker;
        }

        /**
         * stop
         *
         * @describe Stop the player of this instance
         */

    }, {
        key: 'stop',
        value: function stop() {
            Sound.stop();
        }
    }]);
    return BDSSpeechSynthesizer;
}();

BDSSpeechSynthesizer.SERVER_URL = 'http://tts.baidu.com/text2audio?';

return BDSSpeechSynthesizer;

})));
