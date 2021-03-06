import { createStore, applyMiddleware } from 'redux';
import combinedReducers from './reducers/index';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import yasLifeSagas from './sagas';

const sagaMiddleware = createSagaMiddleware();

export default createStore(
	combinedReducers,
	composeWithDevTools(applyMiddleware(sagaMiddleware))
);

sagaMiddleware.run(yasLifeSagas);
