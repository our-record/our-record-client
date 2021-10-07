import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './Routes';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './modules';

window.Kakao.init(process.env.REACT_APP_KAKAO_API);
window.Kakao.isInitialized();

const middleware = [thunk, logger];

export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(...middleware))
);

ReactDOM.render(
  <Provider store={store}>
    <Routes />
  </Provider>,
  document.getElementById('root')
);
