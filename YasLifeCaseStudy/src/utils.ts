import { Rate, Currency } from './interfaces';
import { currencies } from './config';

export const convertCurrency = (
	amount: number = 0,
	rates: Rate[] = []
): Rate => {
	let output: Rate = {};

	const ratesArray: string[] = Object.keys(rates);

	for (let i = 0; i < ratesArray.length; i++) {
		const key: string = ratesArray[i];

		output = { ...output, [key]: amount * rates[key] };
	}

	return output;
};

export const formatCurrency = (
	amount: number = 0,
	currency: string = currencies[0].code
): string => {
	// eslint-disable-next-line no-undef
	return new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency,
		maximumFractionDigits: 2
	})
		.format(amount)
		.toString();
};

export const getCurrencyCodes = (currncies: Currency[]): string => {
	let output = '';

	for (let i = 0; i < currncies.length; i++) {
		const currency: Currency = currncies[i];

		output = `${output}${currency.code},`;
	}

	return output;
};
