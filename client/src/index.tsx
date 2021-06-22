import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import { store } from './utils';
import { App } from './App';
import reportWebVitals from './reportWebVitals';

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
);

reportWebVitals();
