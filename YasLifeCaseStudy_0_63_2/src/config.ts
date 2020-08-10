import { Currency } from 'src/interfaces';

export const baseApiUrl: string = 'http://data.fixer.io/api/';
export const latestEndpoint: string = 'latest';
export const currencies: Currency[] = [
    { label: 'Europe', code: 'EUR' },
    { label: 'Sri Lanka', code: 'LKR' },
    { label: 'US', code: 'USD' },
    { label: 'United Arab Emirates', code: 'AED' },
];
