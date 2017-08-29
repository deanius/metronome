import { Antares } from './antares'
import { Speech, Timer } from './actions'

// And get these fields back for calling and debugging
const { process } = Antares

let recognition
if ('webkitSpeechRecognition' in window) {
  recognition = new window.webkitSpeechRecognition()
  let finalTranscript = ''
  recognition.onresult = function(event) {
    for (var i = event.resultIndex; i < event.results.length; ++i) {
      if (event.results[i].isFinal) {
        finalTranscript = event.results[i][0].transcript
      }
    }
  }
  recognition.onend = () => {
    process(Speech.stop({ lastResult: finalTranscript }))
  }

  document.addEventListener('keypress', e => {
    if (e.key === 'r') {
      process(Speech.start())
    }
  })

  // hook it up to antares
  Antares.subscribeRenderer(({ action: { type, payload } }) => {
    if (!type.startsWith('View.Speech.')) return

    if (type === 'View.Speech.start') {
      // turn it on
      recognition.start()
    }

    if (type === 'View.Speech.stop') {
      if (
        payload &&
        payload.lastResult &&
        payload.lastResult.startsWith('start')
      ) {
        process(Timer.start())
      }
      if (
        payload &&
        payload.lastResult &&
        payload.lastResult.startsWith('stop')
      ) {
        process(Timer.stop())
      }
    }
  })
}
