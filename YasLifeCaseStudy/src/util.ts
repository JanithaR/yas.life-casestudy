import { Rate } from './interfaces/fixer.rate.interface';

export const convertCurrency = (amount: number, rates: Rate[]) => {
	let output: Object = {};

	const ratesArray: string[] = Object.keys(rates);

	for (let i = 0; i < ratesArray.length; i++) {
		const key: string = ratesArray[i];

		output = { ...output, [key]: amount * rates[key] };
	}

	return output;
};

export const formatCurrency = (value: number, currency: string) => {
	return new Intl.NumberFormat(undefined, {
		style: 'currency',
		currency,
		maximumFractionDigits: 2
	}).format(value);
};
