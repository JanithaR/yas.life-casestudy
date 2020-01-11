import {createStore, applyMiddleware} from 'redux';
import combinedReducers from './reducers/index';
import {composeWithDevTools} from 'redux-devtools-extension';

export default createStore(combinedReducers, composeWithDevTools());
