import { Currency } from 'src/interfaces';
import { currencies, baseApiUrl, latestEndpoint, fixerKey } from 'src/config';
import AsyncStorage from '@react-native-community/async-storage';

export function formatCurrency(
    value: number,
    currencyCode: Currency['code'] = currencies[0].code,
): string {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currencyCode,
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

export async function cacheInput(value: string): Promise<void> {
    try {
        await AsyncStorage.setItem('input', value);
    } catch (error) {
        throw error;
    }
}

export async function readCachedInput(): Promise<string | null> {
    try {
        const input: string | null = await AsyncStorage.getItem('input');

        return input;
    } catch (error) {
        throw error;
    }
}
