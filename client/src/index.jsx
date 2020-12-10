import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import { store } from './utils';
import { App } from './App';

// setup fake backend
// import { configureFakeBackend } from './_utils';
// configureFakeBackend();

render(
  <Provider store={store}>
      <App />
  </Provider>,
  document.getElementById('app')
);