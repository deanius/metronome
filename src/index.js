import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import { Rx, AntaresInit, createReducer } from 'antares-protocol';
const { Observable } = Rx

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
