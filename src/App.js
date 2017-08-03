import React, { PureComponent } from 'react'
import './App.css'
// action creators
import { Timer, Speech } from './actions'
export const defaultKey = ['presentation', 0]

if (!String.prototype.padStart) {
    String.prototype.padStart = function padStart(targetLength,padString) {
        targetLength = targetLength>>0; //floor if number or convert non-number to 0;
        padString = String(padString || ' ');
        if (this.length > targetLength) {
            return String(this);
        }
        else {
            targetLength = targetLength-this.length;
            if (targetLength > padString.length) {
                padString += padString.repeat(targetLength/padString.length); //append to original to ensure we are longer than needed
            }
            return padString.slice(0,targetLength) + String(this);
        }
    };
}
const humanDuration = duration => {
  return `${Math.floor(duration / 60)}:${String(Math.floor(duration % 60)).padStart(2, '0')}`
}

const addBeginEnd = blocks => {
  let elapsed = 0
  return blocks.map(b => {
    return b
      .set('begin', elapsed)
      .update('end', () => {
        elapsed += b.get('duration')
        return elapsed
      })
  })
}

// could use reselect here
export const makeAppProps = state => ({
  presentation: state.antares.getIn(defaultKey)
    .update('blocks', addBeginEnd),
  view: state.view,
  speechAware: ('webkitSpeechRecognition' in window),
  currentBlock() {
    return this.presentation.toJS().blocks.find(b => b.begin >= this.view.present)
  }
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
    const isActive = view.get('active')
    const speechActive = view.get('speechActive')

    const remaining = this.props.currentBlock() && (this.props.currentBlock().end - present)

    return (
      <div className="App">
        <h1>{name}
        <span onClick={e => process(Speech[speechActive ? 'stop' : 'start']())}>
          {speechAware ? '🎤' : '🚫🎤'}
          {speechAware && speechActive && '🎧' }
        </span>
        </h1>
        <h3>{humanDuration(present)}</h3>
        <div>
          <button onClick={e => process(Timer.start())}>Start</button>
          <button onClick={e => process(Timer.stop())}>Stop</button>
        </div>

        <ul className='modules'>
        {blocks.map(block => (
          <li
            className={ isActive && present > block.get('begin') && present <= block.get('end') && 'active-block' }
            key={block.get('key') || block.get('name')}>{humanDuration(block.get('duration'))}: {block.get('name')}</li>
          ))}
        </ul>
      </div>
    );
  }
}

export default App;
