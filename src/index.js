import './polyfill'
import React from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import './index.css'
import { default as App, makeAppProps } from './App'
import registerServiceWorker from './registerServiceWorker'
import { metronomeInitialState } from './reducer'
import './speech'

import { Antares } from './antares'
// And get these fields back for calling and debugging
const { process } = Antares

// Let's tell Antares to store our initialState
process({
    type: 'Antares.store',
    payload: metronomeInitialState
})

// The State Shape of an Antares store has two top-level immutable objects:
//   antares - in which shared client/server data are stored under keys
//   view - in which any non-shared view parameters of those data under antares are stored
const ConnectedApp = connect(makeAppProps, () => ({ process }))(App)
ReactDOM.render(<ConnectedApp store={Antares.store} />, document.getElementById('root'));
registerServiceWorker();
