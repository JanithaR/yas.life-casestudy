import {
	changeUserInput,
	CHANGE_USER_INPUT,
	changeDesiredCurrency,
	CHANGE_DESIRED_CURRENCY,
	fetchLatestRates,
	FETCH_LATEST_RATES,
	FETCH_LATEST_RATES_SUCCESS,
	FETCH_LATEST_RATES_ERROR,
	fetchLatestRatesGenerator
} from './converter.actions';
import { makeRequest } from '../api';
import { baseApiUrl, latestEndpoint, fixerKey, currencies } from '../config';
import { getCurrencySymbols } from '../utils';

describe('Converter actions', () => {
	it('should define action types', () => {
		expect(CHANGE_USER_INPUT).toBeDefined();
		expect(CHANGE_DESIRED_CURRENCY).toBeDefined();
		expect(FETCH_LATEST_RATES).toBeDefined();
		expect(FETCH_LATEST_RATES_SUCCESS).toBeDefined();
		expect(FETCH_LATEST_RATES_ERROR).toBeDefined();
	});

	describe('changeUserInput()', () => {
		it('should be defined', () => {
			expect(changeUserInput).toBeDefined();
		});

		it('should return action as expected', () => {
			const input: string = '0';

			expect(changeUserInput(input)).toEqual({
				type: CHANGE_USER_INPUT,
				payload: input
			});
		});
	});

	describe('changeDesiredCurrency()', () => {
		it('should be defined', () => {
			expect(changeDesiredCurrency).toBeDefined();
		});

		it('should return action as expected', () => {
			const desiredCurrency: string = 'USD';

			expect(changeDesiredCurrency(desiredCurrency)).toEqual({
				type: CHANGE_DESIRED_CURRENCY,
				payload: desiredCurrency
			});
		});
	});

	describe('fetchLatestRates()', () => {
		it('should be defined', () => {
			expect(fetchLatestRates).toBeDefined();
		});

		it('should return action as expected', () => {
			expect(fetchLatestRates()).toEqual({
				type: FETCH_LATEST_RATES
			});
		});
	});

	describe('fetchLatestRatesGenerator()', () => {
		beforeAll(() => {
			jest.mock('../api.ts');
		});

		it('should be defined', () => {
			expect(fetchLatestRatesGenerator).toBeDefined();
		});

		it('should fetch latest rates and dispatch an action', () => {
			const generator = fetchLatestRatesGenerator();

			let next = generator.next();
			expect(next.value.type).toEqual('CALL');
			expect(next.value.payload.fn).toEqual(makeRequest);
			expect(next.value.payload.args[0]).toEqual(
				`${baseApiUrl}${latestEndpoint}?access_key=${fixerKey}&symbols=${getCurrencySymbols(
					currencies
				)}`
			);

			next = generator.next();
			expect(next.value.type).toEqual('PUT');
			expect(next.value.payload.action).toEqual({
				type: FETCH_LATEST_RATES_SUCCESS,
				payload: {
					success: true,
					timestamp: 1578884105,
					base: 'EUR',
					date: '2020-01-13',
					rates: {
						DKK: 7.472523,
						INR: 78.625903,
						USD: 1.11235,
						THB: 33.547923,
						LKR: 201.214097
					}
				}
			});
		});
	});
});
