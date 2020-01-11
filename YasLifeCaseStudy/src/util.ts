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
