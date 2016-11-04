/**
 * @file Sound Basic
 * @author junmer
 */

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

        Object.assign(this.options, options);

        var audio = Sound.getAudio(this.options.src);

        if (!options.autoplay) {
            return audio;
        }

        audio.play();

        return audio;
    }

    /**
     * 播放
     */
    play() {
        Sound.getAudio(this.options.src).play();
    }

    /**
     * 停止
     */
    stop() {
        Sound.stop();
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


export default Sound;
