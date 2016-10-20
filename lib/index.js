/**
 * @file BDSSpeechSynthesizer
 * @author junmer
 */

import { Howl, Howler } from 'howler/src/howler.core'
import { stringify as querystringify } from 'query-string'

const methods = ['mute', 'volume']

/**
 * BDSSpeechSynthesizer
 *
 * @class
 */
class BDSSpeechSynthesizer {

    /**
     * BDSSpeechSynthesizer 
     *
     * @constructor
     * @param {Object} options options
     * @param {string} options.lan    语言选择,填写zh
     * @param {number=} options.spd    语速，取值0-9，默认为5中语速
     * @param {number=} options.pit    音调，取值0-9，默认为5中语调
     * @param {number=} options.vol    音量，取值0-9，默认为5中音量
     * @param {number=} options.per    发音人选择，取值0-1, 0为女声，1为男声，默认为女声
     */
    constructor (options) {

        this.options = {
            lan: 'zh',
            pid: '101',
            ie: 'UTF-8'
        }

        this.speakers = {}

        Object.assign(this.options, options)

        // bind Howler public methods
        methods.map(function(method) {

            this[method] = Howler[method]

        }.bind(this))

    }



    /**
     * mute
     *
     * @describe Mutes all sounds.
     */
    
    
    /**
     * volume
     *
     * @describe Get/set the global volume for all sounds.
     *
     * @param {number=} volume Volume from 0.0 to 1.0.
     */

    /**
     * synthesize 
     * 
     * @param {string} text 要播放的文字
     * @param {Object} options options
     * @param {number=} options.spd    语速，取值0-9，默认为5中语速
     * @param {number=} options.pit    音调，取值0-9，默认为5中语调
     * @param {number=} options.vol    音量，取值0-9，默认为5中音量
     * @param {number=} options.per    发音人选择，取值0-1, 0为女声，1为男声，默认为女声
     * @param {number=} options.per    发音人选择，取值0-1, 0为女声，1为男声，默认为女声
     */
    synthesize (text, options) {

        let query = Object.assign({}, this.options, {text: text}, options)

        return BDSSpeechSynthesizer.SERVER_URL 
            + querystringify(query)
    }

    /**
     * getSpeaker
     * 
     * @param  {string} src     src
     * @param  {Object} options options
     * @return {speaker}         speaker
     */
    getSpeaker (src, options) {

        let speaker = this.speakers[src]

        if (speaker) {
            return speaker
        }

        let howlOpt = Object.assign({
            src: src,
            html5: true
        }, options)

        speaker = new Howl(howlOpt)

        this.speakers[src] = speaker
        
        return speaker
    }


    /**
     * speak 
     * 
     * @param {string} text 要播放的文字
     * @param {Object=} options options
     * @param {number=} options.spd    语速，取值0-9，默认为5中语速
     * @param {number=} options.pit    音调，取值0-9，默认为5中语调
     * @param {number=} options.vol    音量，取值0-9，默认为5中音量
     * @param {number=} options.per    发音人选择，取值0-1, 0为女声，1为男声，默认为女声
     * @param {Object=} playerOptions     播放器配置
     * @param {boolean} playerOptions.autoplay 自动播放
     */
    speak (text, options, playerOptions) {

        let url = this.synthesize(text, options)
        let speaker = this.getSpeaker(url, playerOptions)

        if (playerOptions && playerOptions.autoplay === false) {
            return speaker
        }

        speaker.play()

        return speaker

    }


    /**
     * playing
     * 
     */
    playing () {

        return Object.keys(this.speakers)
                .some((key) => this.speakers[key].playing())
    }

    /**
     * stop
     * 
     */
    stop () {

        for (let key of Object.keys(this.speakers)) {
            this.speakers[key].stop()
        }

    }

}

BDSSpeechSynthesizer.SERVER_URL = 'http://tts.baidu.com/text2audio?'

export default BDSSpeechSynthesizer
