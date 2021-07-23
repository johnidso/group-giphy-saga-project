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
const testCurrentSearch = 'https://im.rediff.com/news/2020/sep/15funny1.jpg';
// End of test search stuff


// Saga:

function* watcherSaga() {
    // yield takeEvery('GET_GIFS', fetchGifs);
    yield takeEvery('SEARCH_GIPHY', searchGiphy)
    yield takeEvery('ADD_FAVORITE', postGifs);
    yield takeEvery('ADD_CATEGORY', putCategory);
    yield takeEvery('GET_FAVORITES', getFavorites);
    yield takeEvery('GET_CATEGORIES', getCategories);
} 

// function* fetchGifs() {
//     try {
//         const searchResponse = yield axios.get('/api/favorite');
//         yield put({ type: 'GET_GIFS', payload: searchResponse.data});
//     } catch (error) {
//         console.log('Error fetching gifs.', error);
//     }
// }

function* searchGiphy(action) {
    console.log('in searchGiphy. Payload:', action.payload);
    try {
        const searchResponse = yield axios.post('/api/search', action.payload);
        console.log('This is searchResponse:', searchResponse); // test
        yield put({ type: 'SET_CURRENT_SEARCH', payload: searchResponse.data.data[0].images.original.url});
    } catch (error) {
        console.log('Error searching GIPHY. Error:', error);
    }
    
}

function* postGifs(action) {
    console.log('in postGifs. Payload:', action.payload);
    try {
        yield axios.post('/api/favorite', action.payload);
    } catch (error) {
        console.log('error adding to favorites');
    }
}

// this function gets the categories from db table, categories
function* getCategories() {
    try {
        const categoryResponse = yield axios.get('/api/category');
        console.log(categoryResponse);
        yield put({type: 'SET_CATEGORIES', payload: categoryResponse.data});
    } catch (error) {
        console.log('unable to retrieve categories,', error);
    }
}

// this function updates the category_id of the favorited images in table, favorites
function* putCategory(category) {
    try {
        yield call(axios.put, `/api/favorite`, category.payload)
        yield put({type: 'GET_GIFS'});
    } catch (error) {
        console.log('Unable to update put,', error);
    }
}

// this function gets all the favorites then sets favorites into a reducer
function* getFavorites() {
    try{
        const getResponse = yield axios.get('/api/favorite');
        console.log(getResponse);
        yield put({type:'SET_FAVORITES', payload: getResponse.data});
    } catch(error) {
        console.log('Error getting favorites', error);
    }
}

// Reducers:
// this will store all favorites, saved on db table, favorites from search side. 
const favoritesReducer = (state = [], action) => {
    switch(action.type) {
        case 'SET_FAVORITES':
            return action.payload;
        default:
            return state;
    }
}

// this will store all categories pulled from db table, category
const categoryReducer = (state = [], action) => {
    switch(action.type) {
        case 'SET_CATEGORIES':
            return action.payload;
        default:
            return state;
    }
}

// Reducer to store the GIF that was last searched
const currentSearch = (state = testCurrentSearch, action) => {
    if (action.type === 'SET_CURRENT_SEARCH') {
        return action.payload;
    }
    return state;
}

const sagaMiddleware = createSagaMiddleware();

// Store:

const storeInstance = createStore(
    combineReducers({
        currentSearch,
        favoritesReducer,
        categoryReducer
    }),
    applyMiddleware(sagaMiddleware, logger),
);

sagaMiddleware.run(watcherSaga);

// ReactDOM.render(<App />, document.getElementById('root'));
ReactDOM.render(<Provider store={storeInstance}><App/></Provider>, document.getElementById('root'));