import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App/App';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';

// bringing in redux-saga into our project
import createSagaMiddleware from 'redux-saga';
import { put, takeEvery, call } from 'redux-saga/effects';

import logger from 'redux-logger';
import axios from 'axios';

// Reducers:

// Saga:

function* watcherSaga() {

} 

function* fetchGifs() {
    
}

function* postGifs() {

}

function* putCategory() {

}



const sagaMiddleware = createSagaMiddleware();

// Store:

const storeInstance = createStore(
    combineReducers({

    }),
    applyMiddleware(sagaMiddleware, logger),
);

sagaMiddleware.run(watcherSaga);

// ReactDOM.render(<App />, document.getElementById('root'));
ReactDOM.render(<Provider store={storeInstance}><App/></Provider>, document.getElementById('root'));



