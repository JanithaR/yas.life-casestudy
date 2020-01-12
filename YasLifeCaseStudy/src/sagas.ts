import { takeLatest } from 'redux-saga/effects';
import {
	FETCH_LATEST_RATES,
	convertCurrencySaga
} from './actions/converter.actions';

function* mySaga() {
	yield takeLatest(FETCH_LATEST_RATES, convertCurrencySaga);
}

export default mySaga;
