import React from 'react'
import { render } from 'react-dom'
import { Provider, } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import rootReducer from './reducers'
import App from './components/App'
import {fetchItems} from './actions'

const logger = store => next => action => {
  console.log('dispatching', action);
  let result = next(action);
  console.log('next state', store.getState());
  return result;
}

const store = createStore(
  rootReducer,
  applyMiddleware(
    thunkMiddleware,
    logger)
  );

store.dispatch(fetchItems());

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)