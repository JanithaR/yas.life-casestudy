import { convertCurrency, formatCurrency, getCurrencySymbols } from './utils';
import { Rate, Currency } from './interfaces';

describe('Utils', () => {
	describe('convertCurrency()', () => {
		it('should be defined', () => {
			expect(convertCurrency).toBeDefined();
		});

		it('should return converted outputs', () => {
			const mockAmount: number = 15.55;
			const mockRates: Rate = {
				DKK: 7.472696,
				INR: 78.93981,
				USD: 1.112,
				THB: 33.635817,
				LKR: 201.174295,
				JKS: 0
			};

			const outputs: Rate = convertCurrency(mockAmount, mockRates);

			expect(outputs.DKK).toBeCloseTo(116.2, 2);
			expect(outputs.INR).toBeCloseTo(1227.51, 2);
			expect(outputs.USD).toBeCloseTo(17.29, 2);
			expect(outputs.THB).toBeCloseTo(523.04, 2);
			expect(outputs.LKR).toBeCloseTo(3128.26, 2);
			expect(outputs.JKS).toBe(0);
		});
	});

	describe('formatCurrency()', () => {
		it('should be defined', () => {
			expect(formatCurrency).toBeDefined();
		});

		it.each`
			amount  | currency | expectedOutput
			${5}    | ${'DKK'} | ${'DKK 5.00'}
			${5}    | ${'INR'} | ${'₹5.00'}
			${5}    | ${'USD'} | ${'$5.00'}
			${5}    | ${'THB'} | ${'THB 5.00'}
			${5}    | ${'LKR'} | ${'LKR 5.00'}
			${5000} | ${'DKK'} | ${'DKK 5,000.00'}
			${5000} | ${'INR'} | ${'₹5,000.00'}
			${5000} | ${'USD'} | ${'$5,000.00'}
			${5000} | ${'THB'} | ${'THB 5,000.00'}
			${5000} | ${'LKR'} | ${'LKR 5,000.00'}
		`(
			'should return formatted outputs',
			({ amount, currency, expectedOutput }) => {
				expect(formatCurrency(amount, currency)).toMatch(expectedOutput);
			}
		);
	});

	describe('getCurrencySymbols()', () => {
		it('snould be defined', () => {
			expect(getCurrencySymbols).toBeDefined();
		});

		it('should return an array of currency codes', () => {
			const mockCurrencies: Currency[] = [
				{ label: 'Euro', code: 'EUR' },
				{ label: 'Danmark', code: 'DKK' },
				{ label: 'India', code: 'INR' },
				{ label: 'US', code: 'USD' },
				{ label: 'Thailand', code: 'THB' },
				{ label: 'Sri Lanka', code: 'LKR' }
			];

			expect(getCurrencySymbols(mockCurrencies)).toMatch(
				'EUR,DKK,INR,USD,THB,LKR'
			);
		});
	});
});
