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
    return '_s_' + (guidIndex++);
}

/**
 * 声音
 *
 * @class
 */
class Sound {

    options = {
        src: '',
        autoplay: true
    };

    /**
     * Sound
     *
     * @constructor
     * @param {Object} options options
     * @param {string} options.src    地址
     * @param {string} options.autoplay    自动播放
     */
    constructor(options) {

        this.id = guid();

        Object.assign(this.options, options);

        Sound.getAudio(this.options.src);

        if (!options.autoplay) {
            return this;
        }

        this.play();
        return this;
    }

    on(name, fn) {
        Sound.event.on(this.id, name, fn);
        return this;
    }

    once(name, fn) {
        Sound.event.once(this.id, name, fn);
        return this;
    }

    off(name, fn) {
        Sound.event.off(this.id, name, fn);
        return this;
    }

    /**
     * 播放
     */
    play() {
        var audio = Sound.getAudio(this.options.src);
        audio.id = this.id;
        audio.play();
        return this;
    }

    /**
     * 停止
     */
    stop() {
        Sound.stop();
        return this;
    }

    /**
     * 获取 audio
     *
     * @param {string=} src    audio src
     * @return {Audio} audio
     */
    static getAudio(src) {

        var audio;

        if (this.node) {
            audio = this.node;
        }
        else {
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
    static stop() {
        var audio = Sound.getAudio();
        audio.pause();
        audio.currentTime = 0;
        return audio;
    }

    /**
     * 处理 ios 自动播放问题
     */
    static enableMobileAudio() {

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

}

/**
 * 声音的事件总线
 * 
 * @type {Object}
 */
Sound.event = {

    _events: {},

    _proxy: {},

    dispach: function (name, current) {

        var events = this._events[name];

        Object.keys(events).forEach(function (id) {
            
            if (id !== current){
                return;
            }

            events[id].forEach(function (fn) {
                fn();
            });

        });

    },

    on: function (id, name, fn) {

        if (!this._proxy[name]) {
            var audio = Sound.getAudio();
            this._proxy[name] = audio.addEventListener(name, this.dispach.bind(this, name, audio.id))
        }

        this._events[name] = this._events[name] || {};
        this._events[name][id] = this._events[name][id] || [];
        this._events[name][id].push(fn);

    },

    once: function (id, name, fn) {

        function onceFn() {
            fn();
            this.off(id, name, fn);
        }

        // 挂到on上以方便删除
        onceFn.fn = fn;

        this.on(id, name, onceFn.bind(this));

    },

    off: function (id, name, fn) {

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


export default Sound;
