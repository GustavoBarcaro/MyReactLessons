import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import createSagaMiddleware from 'redux-saga'

import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import BurgerBuilderReducer from './store/reducers/burgerBuilder';
import orderReducer from './store/reducers/order';
import thunk from 'redux-thunk';
import authReducer from './store/reducers/auth';
import { watchAuth, watchBurger, watchOrder } from './store/sagas/index';


const reducers = combineReducers({
    burgerBuilder: BurgerBuilderReducer,
    order: orderReducer,
    auth: authReducer
})

const sagaMiddleware = createSagaMiddleware();

const composeEnhancers = process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null || compose;
const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk, sagaMiddleware)));


sagaMiddleware.run(watchAuth);
sagaMiddleware.run(watchBurger);
sagaMiddleware.run(watchOrder);

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
