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
    yield takeEvery('GET_GIFS', fetchGifs);
    yield takeEvery('ADD_FAVORITE', postGifs);
    yield takeEvery('ADD_CATEGORY', putCategory);
} 

function* fetchGifs() {
    try {
        const searchResponse = yield axios.get('/api/');
        yield put({ type: 'GET_GIFS', payload: searchResponse.data});
    } catch (error) {
        console.log('Error fetching gifs.', error);
    }
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



