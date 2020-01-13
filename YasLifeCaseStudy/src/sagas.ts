import { takeLatest } from 'redux-saga/effects';
import {
	FETCH_LATEST_RATES,
	fetchLatestRatesGenerator
} from './actions/converter.actions';

function* yasLifeSagas() {
	yield takeLatest(FETCH_LATEST_RATES, fetchLatestRatesGenerator);
}

export default yasLifeSagas;
