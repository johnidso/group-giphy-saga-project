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

// TD test search object
const testCurrentSearch = {
    url: 'https://im.rediff.com/news/2020/sep/15funny1.jpg',
    name: 'Goofy Fish',
    id: 1
}
// End of test search stuff

// Reducers:

// Store the GIF that was last searched
const currentSearch = (state = testCurrentSearch, action) => {
    return state;
}

// Saga:

function* watcherSaga() {
    yield takeEvery('GET_GIFS', fetchGifs);
    yield takeEvery('SEARCH_GIPHY', searchGiphy)
    yield takeEvery('ADD_FAVORITE', postGifs);
    yield takeEvery('ADD_CATEGORY', putCategory);
    yield takeEvery('GET_FAVORITES', getFavorites);
} 

function* fetchGifs() {
    try {
        const searchResponse = yield axios.get('/api/');
        yield put({ type: 'GET_GIFS', payload: searchResponse.data});
    } catch (error) {
        console.log('Error fetching gifs.', error);
    }
}

function* searchGiphy() {
    
}

function* postGifs() {

}

function* putCategory() {

}

function* getFavorites() {
    try{
        const getResponse = yield axios.get('/api/favorites');
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
        currentSearch,
        favoritesReducer,
    }),
    applyMiddleware(sagaMiddleware, logger),
);

sagaMiddleware.run(watcherSaga);

// ReactDOM.render(<App />, document.getElementById('root'));
ReactDOM.render(<Provider store={storeInstance}><App/></Provider>, document.getElementById('root'));



