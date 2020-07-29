import { Currency } from 'src/interfaces';
import { currencies, baseApiUrl, latestEndpoint, fixerKey } from 'src/config';

export function formatCurrency(
    value: number,
    currency: Currency['code'] = currencies[0].code,
): string {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency,
        maximumFractionDigits: 2,
    })
        .format(value)
        .toString();
}

export function convertCurrency(value: number, conversionRate: number): number {
    return value * conversionRate;
}

export const getCommaSeparatedCurrencyCodes = (): string => {
    let output = '';

    currencies
        .filter((currency, index) => index !== 0)
        .forEach((currency) => {
            output = `${output}${currency.code},`;
        });

    return output;
};

export function composeLatestEndpointUrl(): string {
    return `${baseApiUrl}${latestEndpoint}?access_key=${fixerKey}&symbols=${getCommaSeparatedCurrencyCodes()}`;
}
