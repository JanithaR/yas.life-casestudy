import converter from './converter';
import { currencies } from '../config';
import { ReduxAction, FixerLatest, ReduxState } from '../interfaces';
import {
	CHANGE_DESIRED_CURRENCY,
	CHANGE_USER_INPUT,
	FETCH_LATEST_RATES,
	FETCH_LATEST_RATES_SUCCESS,
	FETCH_LATEST_RATES_ERROR
} from '../actions';
import { convertCurrency } from '../utils';

describe('Converter reducer', () => {
	const mockDefaulState: ReduxState = {
		userInput: '1000',
		desiredCurrency: currencies[2].code,
		isFetchingLatestRates: false,
		latestRatesFetchError: null,
		latestRatesFetchResponse: null,
		outputs: null
	};

	it('should be defined', () => {
		expect(converter).toBeDefined();
	});

	it('should return default state', () => {
		const mockReduxAction: ReduxAction = {
			type: 'UNRELATED_ACTION',
			payload: null
		};

		expect(converter(mockDefaulState, mockReduxAction)).toEqual(
			mockDefaulState
		);
	});

	it('should return new state with desired currency', () => {
		const mockReduxAction: ReduxAction = {
			type: CHANGE_DESIRED_CURRENCY,
			payload: currencies[0].code
		};

		expect(converter(mockDefaulState, mockReduxAction)).toEqual({
			...mockDefaulState,
			desiredCurrency: currencies[0].code
		});
	});

	it('should return new state with user input', () => {
		let mockReduxAction: ReduxAction = {
			type: CHANGE_USER_INPUT,
			payload: 5000
		};

		expect(converter(mockDefaulState, mockReduxAction)).toEqual({
			...mockDefaulState,
			userInput: 5000
		});
	});

	it('should return new state with rates fetch state reflected', () => {
		const mockdReduxAction: ReduxAction = {
			type: FETCH_LATEST_RATES
		};

		expect(converter(mockDefaulState, mockdReduxAction)).toEqual({
			...mockDefaulState,
			isFetchingLatestRates: true
		});
	});

	it('should return new state with new rates', () => {
		const mockPayload: FixerLatest = {
			success: true,
			timestamp: 1578808208,
			base: 'EUR',
			date: '2020-01-12',
			rates: {
				DKK: 7.47,
				INR: 78.93
			}
		};

		const mockReduxAction: ReduxAction = {
			type: FETCH_LATEST_RATES_SUCCESS,
			payload: mockPayload
		};

		const outputs: ReduxState = converter(mockDefaulState, mockReduxAction);

		expect(outputs.isFetchingLatestRates).toBeFalsy();
		expect(outputs.latestRatesFetchError).toBeNull();
		expect(outputs.latestRatesFetchResponse).toEqual(mockReduxAction.payload);
		expect(outputs.outputs).toEqual(
			convertCurrency(
				Number.parseFloat(mockDefaulState.userInput),
				mockReduxAction.payload.rates
			)
		);
	});

	it('should return new state with fetch error', () => {
		const mockPayload: string = 'Oh oh!, something unexpected happened';

		const reduxAction: ReduxAction = {
			type: FETCH_LATEST_RATES_ERROR,
			payload: mockPayload
		};

		expect(converter(mockDefaulState, reduxAction)).toEqual({
			...mockDefaulState,
			isFetchingLatestRates: false,
			latestRatesFetchResponse: null,
			latestRatesFetchError: reduxAction.payload
		});
	});
});
