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

Play the sound of text.

### .playing()

Check if playing

### .stop()

Stop the player of this instance