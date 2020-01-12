import { Rate, Currency } from './interfaces';

export const convertCurrency = (amount: number, rates: Rate): Rate => {
	let output: Rate = {};

	const ratesArray: string[] = Object.keys(rates);

	for (let i = 0; i < ratesArray.length; i++) {
		const key: string = ratesArray[i];

		output = { ...output, [key]: amount * rates[key] };
	}

	return output;
};

export const formatCurrency = (amount: number, currency: string): string => {
	return new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency,
		maximumFractionDigits: 2
	}).format(amount);
};

export const getCurrencySymbols = (currencies: Currency[]): string => {
	let output = '';

	for (let i = 0; i < currencies.length; i++) {
		const currency: Currency = currencies[i];

		output = `${output}${currency.code},`;
	}

	return output;
};
