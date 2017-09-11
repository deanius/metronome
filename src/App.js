import React, { PureComponent } from 'react'
import './App.css'
// action creators
import { Timer, Speech } from './actions'
import { PieChart } from './pieChart'
import { defaultKey } from './antares'
import { ModalContainer, ModalDialog } from 'react-modal-dialog'

const humanDuration = duration => {
  return `${Math.floor(duration / 60)}:${String(
    Math.floor(duration % 60)
  ).padStart(2, '0')}`
}

const addBeginEnd = blocks => {
  let elapsed = 0
  return blocks.map(b => {
    return b.set('begin', elapsed).update('end', () => {
      elapsed += b.get('duration')
      return elapsed
    })
  })
}

// could use reselect here
export const makeAppProps = state => ({
  presentation: state.antares
    .getIn(defaultKey)
    .update('blocks', addBeginEnd)
    .toJS(),
  view: state.view.toJS(),
  speechAware: 'webkitSpeechRecognition' in window
})

class App extends PureComponent {
  state = {
    isShowingModal: false
  }
  handleClick = () => this.setState({ isShowingModal: true })
  handleClose = () => this.setState({ isShowingModal: false })

  render() {
    // data fields
    const { presentation, view, speechAware } = this.props
    // dispatching functions
    const { process } = this.props

    const { blocks, name } = presentation
    const { present, speechActive } = view
    const currentBlock = blocks.find(
      block => present > block.begin && present <= block.end
    )
    const percentComplete =
      100 *
      (currentBlock
        ? (present - currentBlock.begin) / currentBlock.duration
        : 0)

    return (
      <div className="App">
        <h1>
          {name}
          <span
            onClick={e => process(Speech[speechActive ? 'stop' : 'start']())}
          >
            {speechAware && '🎤'}
            {speechAware && speechActive && '🎧'}
          </span>
          <div style={{ float: 'right', marginRight: 50 }}>
            <PieChart percentComplete={percentComplete} />
          </div>
        </h1>
        <h3>{humanDuration(present)}</h3>
        <div>
          <button onClick={e => process(Timer.start())}>Start</button>
          <button onClick={e => process(Timer.stop())}>Stop</button>
        </div>
        <ul className="modules">
          {blocks.map(block => (
            <li
              className={
                present > block.begin && present <= block.end && 'active-block'
              }
              key={block.key || block.name}
            >
              {humanDuration(block.duration)}:
              {block.name}
              &nbsp;&nbsp;({humanDuration(block.end)})
            </li>
          ))}
        </ul>
        <div onClick={this.handleClick}>
          {this.state.isShowingModal && (
            <ModalContainer onClose={this.handleClose}>
              <ModalDialog onClose={this.handleClose}>
                <h1>Edit blocks</h1>
                <textarea
                  rows="20"
                  cols="50"
                  value={JSON.stringify(this.props.presentation, null, 2)}
                />
              </ModalDialog>
            </ModalContainer>
          )}
          Edit blocks
        </div>
      </div>
    )
  }
}

export default App
