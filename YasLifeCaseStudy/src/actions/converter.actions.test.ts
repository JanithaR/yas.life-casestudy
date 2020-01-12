import {
	changeUserInput,
	CHANGE_USER_INPUT,
	changeDesiredCurrency,
	CHANGE_DESIRED_CURRENCY,
	fetchLatestRates,
	FETCH_LATEST_RATES,
	FETCH_LATEST_RATES_SUCCESS,
	FETCH_LATEST_RATES_ERROR,
	convertCurrencySaga
} from './converter.actions';

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
			const input: number = 0;

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

	describe('convertCurrencySaga()', () => {
		it('should be defined', () => {
			expect(convertCurrencySaga).toBeDefined();
		});
	});
});
