import { takeLatest } from 'redux-saga/effects';
import {
	FETCH_LATEST_RATES,
	convertCurrencySaga
} from './actions/converter.actions';

function* yasLifeSagas() {
	yield takeLatest(FETCH_LATEST_RATES, convertCurrencySaga);
}

export default yasLifeSagas;
