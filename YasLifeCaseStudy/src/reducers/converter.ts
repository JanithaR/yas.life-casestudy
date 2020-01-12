import { ReduxAction, ReduxState } from '../interfaces';
import { currencies } from '../config';
import {
	CHANGE_DESIRED_CURRENCY,
	CHANGE_USER_INPUT,
	FETCH_LATEST_RATES,
	FETCH_LATEST_RATES_SUCCESS,
	FETCH_LATEST_RATES_ERROR
} from '../actions';
import { convertCurrency } from '../utils';

const defaulState: ReduxState = {
	userInput: '1',
	desiredCurrency: currencies[1].code,
	isFetchingLatestRates: false,
	latestRatesFetchError: null,
	latestRatesFetchResponse: null,
	outputs: null
};

const converter = (
	state: ReduxState = defaulState,
	action: ReduxAction
): ReduxState => {
	switch (action.type) {
		case CHANGE_DESIRED_CURRENCY:
			return {
				...state,
				desiredCurrency: action.payload
			};
		case CHANGE_USER_INPUT:
			return {
				...state,
				userInput: action.payload
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
				outputs: convertCurrency(
					Number.parseFloat(state.userInput),
					action.payload.rates
				)
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
