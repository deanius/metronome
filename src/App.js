import React, { PureComponent } from 'react'
import './App.css'
// action creators
import { Timer, Speech } from './actions'

export const defaultKey = ['presentation', 0]

// could use reselect here
export const makeAppProps = state => ({
  presentation: state.antares.getIn(defaultKey),
  view: state.view,
  speechAware: ('webkitSpeechRecognition' in window)
})

class App extends PureComponent {
  render() {
    // data fields
    const { presentation, view, speechAware } = this.props
    // dispatching functions
    const { process } = this.props

    const blocks = presentation.get('blocks')
    const name = presentation.get('name')
    const present = view.get('present')
    const speechActive = view.get('speechActive')

    return (
      <div className="App">
        <h1>{name}
        <span onClick={e => process(Speech[speechActive ? 'stop' : 'start']())}>
          {speechAware ? '🎤' : '🚫🎤'}
          {speechAware && speechActive && '🎧' }
        </span>
        </h1>
        <h3>{present}</h3>
        <div>
          <button onClick={e => process(Timer.start())}>Start</button>
          <button onClick={e => process(Timer.stop())}>Stop</button>
        </div>

        {blocks.map(block => (
          <li key={block.get('key') || block.get('name')}>{block.get('duration') / 60} min: {block.get('name')}</li>
        ))}
      </div>
    );
  }
}

export default App;
