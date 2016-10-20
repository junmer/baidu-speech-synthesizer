baidu-speech-synthesizer
==

> Play sound from text in browser using [Baidu TTS Service](http://yuyin.baidu.com/docs/tts/136)

## Usage

```
import BDSSpeechSynthesizer from 'baidu-speech-synthesizer'

let bss = new BDSSpeechSynthesizer()
let speaker = bss.speak('hello world')

speaker.on('end', () => {
	bss.speak('bye world')
})
```

## Quick Start

```
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
