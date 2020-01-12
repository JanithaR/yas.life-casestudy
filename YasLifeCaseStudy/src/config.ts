import { Currency } from './interfaces/index';

export const fixerKey: string = '535e747f27804f52b1fe203fda66f299';
export const baseApiUrl: string = 'http://data.fixer.io/api/';
export const latestEndpoint: string = 'latest';
export const currencies: Currency[] = [
	{ label: 'Euro', code: 'EUR' },
	{ label: 'Danmark', code: 'DKK' },
	{ label: 'India', code: 'INR' },
	{ label: 'US', code: 'USD' },
	{ label: 'Thailand', code: 'THB' },
	{ label: 'Sri Lanka', code: 'LKR' }
];
