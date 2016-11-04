baidu-speech-synthesizer
==

[![NPM version][npm-image]][npm-url]
[![Build Status][travis-image]][travis-url]
[![Downloads][downloads-image]][npm-url]
[![License][license-image]][npm-url]

[npm-url]: https://npmjs.org/package/baidu-speech-synthesizer
[downloads-image]: http://img.shields.io/npm/dm/baidu-speech-synthesizer.svg
[npm-image]: http://img.shields.io/npm/v/baidu-speech-synthesizer.svg
[travis-url]: https://travis-ci.org/junmer/baidu-speech-synthesizer
[travis-image]: http://img.shields.io/travis/junmer/baidu-speech-synthesizer.svg
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
<script src="https://unpkg.com/baidu-speech-synthesizer@latest/dist/index.min.js"></script>

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

### .stop()

Stop the player of this instance.

