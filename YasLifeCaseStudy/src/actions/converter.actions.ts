import { call, put } from 'redux-saga/effects';
import { makeRequest } from '../api';
import {
	baseApiUrl,
	latestEndpoint,
	fixerKey,
	currencySymbols
} from '../config';

export const changeUserInput = (input: number) => ({
	type: CHANGE_USER_INPUT,
	payload: input
});

export const changeDesiredCurrency = (desiredCurrency: string) => ({
	type: CHANGE_DESIRED_CURRENCY,
	payload: desiredCurrency
});

export const fetchLatestRates = () => ({
	type: FETCH_LATEST_RATES
});

export function* convertCurrencySaga() {
	try {
		const response = yield call(
			makeRequest,
			`${baseApiUrl}${latestEndpoint}?access_key=${fixerKey}&symbols=${currencySymbols}`
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

export const fetchLatestRateSuccess = () => ({
	type: FETCH_LATEST_RATES_SUCCESS
});

export const fetchLatestRateError = (errorMessage: string) => ({
	type: FETCH_LATEST_RATES_ERROR,
	payload: errorMessage
});

export const CHANGE_USER_INPUT: string = 'CHANGE_USER_INPUT';
export const CHANGE_DESIRED_CURRENCY: string = 'CHANGE_DESIRED_CURRENCY';
export const FETCH_LATEST_RATES: string = 'FETCH_LATEST_RATES';
export const FETCH_LATEST_RATES_SUCCESS: string = 'FETCH_LATEST_RATES_SUCCESS';
export const FETCH_LATEST_RATES_ERROR: string = 'FETCH_LATEST_RATES_ERROR';
