import { ReduxAction } from '../interfaces/index';
import { currencies } from '../config';
import {
	CHANGE_DESIRED_CURRENCY,
	CHANGE_USER_INPUT,
	FETCH_LATEST_RATES,
	FETCH_LATEST_RATES_SUCCESS,
	FETCH_LATEST_RATES_ERROR
} from '../actions/index';

const defaulState = {
	userInput: 1,
	desiredCurrency: currencies[1].pickerValue,
	isFetchingLatestRates: false,
	latestRatesFetchError: null,
	latestRatesFetchResponse: null
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
				latestRatesFetchResponse: action.payload
			};
		case FETCH_LATEST_RATES_ERROR:
			return {
				...state,
				latestRatesFetchError: action.payload
			};
		default:
			return state;
	}
};

export default converter;
