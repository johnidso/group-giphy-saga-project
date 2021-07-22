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

// Saga:

function* watcherSaga() {
    yield takeEvery('GET_GIFS', fetchGifs);
    yield takeEvery('ADD_FAVORITE', postGifs);
    yield takeEvery('ADD_CATEGORY', putCategory);
    yield takeEvery('GET_FAVORITES', getFavorites);
} 

function* fetchGifs() {
    
}

function* postGifs() {

}

function* putCategory() {

}

function* getFavorites() {
    try{
        const getResponse = yield axios.get('/favorites');
        console.log(getResponse);
        yield put({type:'SET_FAVORITES', payload: getResponse.data});
    } catch(error) {
        console.log('Error getting favorites', error);
    }
}

// Reducers:

favoritesReducer = (state = [], action) => {
    switch(action.type) {
        case 'SET_FAVORITES':
            return action.payload;
        default:
            return state;
    }
}


const sagaMiddleware = createSagaMiddleware();

// Store:

const storeInstance = createStore(
    combineReducers({
        favoritesReducer,
    }),
    applyMiddleware(sagaMiddleware, logger),
);

sagaMiddleware.run(watcherSaga);

// ReactDOM.render(<App />, document.getElementById('root'));
ReactDOM.render(<Provider store={storeInstance}><App/></Provider>, document.getElementById('root'));



