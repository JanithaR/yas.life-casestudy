import {Currency} from './interfaces/index';

export const fixerKey: string = '535e747f27804f52b1fe203fda66f299';
export const baseApiUrl: string = 'http://data.fixer.io/api/';

export const currencies: Currency[] = [
	{label: 'Euro', code: 'EUR', pickerValue: 'euro'},
	{label: 'Danmark', code: 'DKK', pickerValue: 'denmark'},
	{label: 'India', code: 'INR', pickerValue: 'india'},
	{label: 'US', code: 'USD', pickerValue: 'us'},
	{label: 'Thailand', code: 'THB', pickerValue: 'thailand'}
];
