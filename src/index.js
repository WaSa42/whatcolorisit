import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import Clock, { reducer } from './Clock';

let store = createStore(reducer);

ReactDOM.render(
    <Provider store={store}>
        <Clock />
    </Provider>,
  document.getElementById('root')
);
