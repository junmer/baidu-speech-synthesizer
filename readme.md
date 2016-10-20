baidu-speech-synthesizer
==

[![NPM version][npm-image]][npm-url]
[![Downloads][downloads-image]][npm-url]
[![Dependencies][dep-image]][dep-url]
[![License][license-image]][npm-url]

[npm-url]: https://npmjs.org/package/baidu-speech-synthesizer
[downloads-image]: http://img.shields.io/npm/dm/baidu-speech-synthesizer.svg
[npm-image]: http://img.shields.io/npm/v/baidu-speech-synthesizer.svg
[dep-url]: https://david-dm.org/junmer/baidu-speech-synthesizer
[dep-image]: http://img.shields.io/david/junmer/baidu-speech-synthesizer.svg
[license-image]: https://img.shields.io/github/license/junmer/baidu-speech-synthesizer.svg

> Play sound from text in browser using [Baidu TTS Service](http://yuyin.baidu.com/docs/tts/136)

## Usage

```javascript
import BDSSpeechSynthesizer from 'baidu-speech-synthesizer'

let bss = new BDSSpeechSynthesizer()
let speaker = bss.speak('hello world')

speaker.on('end', () => bss.speak('bye world'))
```

## Quick Start

```html
<script src="//unpkg.com/baidu-speech-synthesizer/dist/index.min.js"></script>

<script>
var bss = new BDSSpeechSynthesizer();
bss.speak('hello world');
</script>

```


## API

### new BDSSpeechSynthesizer()

Creates a new `BDSSpeechSynthesizer` instance.

### .speak(text[, speechOptions[, playerOptions]])

Play the sound of text, return the speaker.

* **text**: `String` text to be speak.
* **speechOptions**: `Object` `optional` Speech synthesizer Config.
* **playerOptions**: `Object` `optional` Player Config.
    * **autoplay**: `boolean` Play the sound right now, Defaults `true`.

### .playing()

Check if someone speaking

### .stop()

Stop the player of this instance.

### .mute()

Mutes the sound, but doesn't pause the playback.

### .volume()

Get/set volume of this sound.
