/**
 * @file BDSSpeechSynthesizer
 * @author junmer
 */

import Sound from './sound';
import {stringify as querystringify} from 'query-string';

/**
 * BDSSpeechSynthesizer
 *
 * @class
 */
class BDSSpeechSynthesizer {

    speakers = {};

    options = {
        lan: 'zh',
        cuid: 'baidu_speech_demo',
        spd: '5',
        pit: '5',
        vol: '5',
        per: '0',
        ctp: '1',
        pdt: '1'
    };

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
    constructor(options) {
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
    synthesize(text, options) {

        let query = Object.assign({}, this.options, {tex: text}, options);

        return BDSSpeechSynthesizer.SERVER_URL
            + querystringify(query);
    }

    /**
     * getSpeaker
     *
     * @param  {string} src     src
     * @param  {Object} options options
     * @return {Sound}         Sound instance
     */
    getSpeaker(src, options) {

        let speaker = this.speakers[src];

        if (speaker) {
            return speaker;
        }

        let playOpt = Object.assign({
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
    speak(text, options, playerOptions) {

        let url = this.synthesize(text, options);
        let speaker = this.getSpeaker(url, playerOptions);

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
    stop() {
        Sound.stop();
    }

    static SERVER_URL = 'http://tts.baidu.com/text2audio?';

}

export default BDSSpeechSynthesizer;


