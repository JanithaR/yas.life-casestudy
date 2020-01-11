import { takeLatest } from 'redux-saga/effects';
import {
	FETCH_LATEST_RATES,
	convertCurrency
} from './actions/converter.actions';

function* mySaga() {
	yield takeLatest(FETCH_LATEST_RATES, convertCurrency);
}

export default mySaga;
