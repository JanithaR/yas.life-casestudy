import { ReduxAction } from '../interfaces/index';
import { currencies } from '../config';
import {
	CHANGE_DESIRED_CURRENCY,
	CHANGE_USER_INPUT,
	FETCH_LATEST_RATES,
	FETCH_LATEST_RATES_SUCCESS,
	FETCH_LATEST_RATES_ERROR
} from '../actions/index';
import { convertCurrency } from '../util';

const defaulState = {
	userInput: 1,
	desiredCurrency: currencies[1].code,
	isFetchingLatestRates: false,
	latestRatesFetchError: null,
	latestRatesFetchResponse: null,
	outputs: null
};

const converter = (state = defaulState, action: ReduxAction) => {
	switch (action.type) {
		case CHANGE_DESIRED_CURRENCY:
			return {
				...state,
				desiredCurrency: action.payload
			};
		case CHANGE_USER_INPUT:
			if (action.payload) {
				return {
					...state,
					userInput: action.payload
				};
			}

			return {
				...state,
				userInput: 1
			};
		case FETCH_LATEST_RATES:
			return {
				...state,
				isFetchingLatestRates: true
			};
		case FETCH_LATEST_RATES_SUCCESS:
			return {
				...state,
				isFetchingLatestRates: false,
				latestRatesFetchError: null,
				latestRatesFetchResponse: action.payload,
				outputs: convertCurrency(state.userInput, action.payload.rates)
			};
		case FETCH_LATEST_RATES_ERROR:
			return {
				...state,
				isFetchingLatestRates: false,
				latestRatesFetchResponse: null,
				latestRatesFetchError: action.payload
			};
		default:
			return state;
	}
};

export default converter;
