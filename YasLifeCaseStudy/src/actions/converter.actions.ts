import { call, put } from 'redux-saga/effects';
import { makeRequest } from '../api';
import { baseApiUrl, latestEndpoint, fixerKey } from '../config';
import { FixerLatest, ReduxAction } from 'src/interfaces';
import { getCurrencySymbols } from '../utils';

export const changeUserInput = (input: number): ReduxAction => ({
	type: CHANGE_USER_INPUT,
	payload: input
});

export const changeDesiredCurrency = (
	desiredCurrency: string
): ReduxAction => ({
	type: CHANGE_DESIRED_CURRENCY,
	payload: desiredCurrency
});

export const fetchLatestRates = (): ReduxAction => ({
	type: FETCH_LATEST_RATES
});

export function* convertCurrencySaga() {
	const symbols: string = getCurrencySymbols();

	try {
		const response: FixerLatest = yield call(
			makeRequest,
			`${baseApiUrl}${latestEndpoint}?access_key=${fixerKey}&symbols=${symbols}`
		);

		yield put({
			type: FETCH_LATEST_RATES_SUCCESS,
			payload: response
		});
	} catch (error) {
		yield put({
			type: FETCH_LATEST_RATES_ERROR,
			payload: error.errorMessage
		});
	}
}

export const CHANGE_USER_INPUT: string = 'CHANGE_USER_INPUT';
export const CHANGE_DESIRED_CURRENCY: string = 'CHANGE_DESIRED_CURRENCY';
export const FETCH_LATEST_RATES: string = 'FETCH_LATEST_RATES';
export const FETCH_LATEST_RATES_SUCCESS: string = 'FETCH_LATEST_RATES_SUCCESS';
export const FETCH_LATEST_RATES_ERROR: string = 'FETCH_LATEST_RATES_ERROR';
