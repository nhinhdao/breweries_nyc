// import {createStore} from 'redux';
import thunk from 'redux-thunk';
import {createStore, applyMiddleware} from 'redux';
import {persistStore, persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import nycBreweriesReducer from '../reducers/nycBreweriesReducer';

//handle persist redux store data on refresh
const persistConfig = {
	key: 'root',
	storage: storage
}

const persistedReducer = persistReducer(persistConfig, nycBreweriesReducer)

export const store = createStore(persistedReducer, applyMiddleware(thunk));
export const persistor = persistStore(store);