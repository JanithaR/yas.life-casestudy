import React from 'react';
import { render, fireEvent, waitFor } from 'react-native-testing-library';
import {
    toBeEnabled,
    toHaveTextContent,
    toHaveProp,
} from '@testing-library/jest-native';

import App from 'src/App';
import strings from 'src/strings';
import testIds from 'src/testIds';
import {
    convertCurrency,
    formatCurrency,
    getCommaSeparatedCurrencyCodes,
} from 'src/utils';
import { currencies, baseApiUrl, latestEndpoint, fixerKey } from 'src/config';
import { callApi } from 'src/api';

jest.mock('src/api', () => ({
    callApi: jest.fn(() =>
        Promise.resolve({
            base: 'EUR',
            date: '2020-07-27',
            rates: {
                DKK: 7.443104,
                INR: 87.741498,
                LKR: 218.134047,
                THB: 37.007496,
                USD: 1.174102,
            },
            success: true,
            timestamp: 1595851446,
        }),
    ),
}));

function setup(): RenderAPI {
    return render(<App />);
}

describe('App screen', () => {
    it('should render as expected', () => {
        const { toJSON } = setup();

        expect(toJSON()).toMatchSnapshot();
    });

    describe('Value input', () => {
        it('should be rendered', () => {
            const { queryByDisplayValue } = setup();
            const input = queryByDisplayValue('1');

            expect(input).toBeTruthy();
            expect(input).toBeEnabled();
        });

        it('should update the input field when typed', () => {
            const { queryByDisplayValue } = setup();

            fireEvent(queryByDisplayValue('1'), 'onChangeText', '2');

            expect(queryByDisplayValue('2')).toBeTruthy();
        });

        it('should instruct the user to input a value if it is empty', () => {
            const { queryByDisplayValue, queryByPlaceholder } = setup();

            fireEvent(queryByDisplayValue('1'), 'onChangeText', '');

            expect(queryByPlaceholder(strings.inputPlaceholder)).toBeTruthy();
        });
    });

    describe('Currency picker', () => {
        it('should be renderd', () => {
            // no other way to test this?
            const { queryByTestId } = setup();
            const picker = queryByTestId(testIds.picker);

            expect(picker).toBeTruthy();
            expect(picker).toBeEnabled();
        });

        it('should change the selected index when changed', () => {
            const { getByTestId } = setup();
            const picker = getByTestId(testIds.picker);

            expect(picker).toHaveProp('selectedIndex', 0);

            fireEvent(picker, 'onValueChange', 'LKR');

            expect(picker).toHaveProp('selectedIndex', 3);
        });
    });

    describe('Convert button', () => {
        it('should be rendered', () => {
            const { queryByA11yRole } = setup();
            const button = queryByA11yRole('button');

            expect(button).toBeEnabled();
            expect(button).toHaveTextContent(strings.convert);
        });

        it('should call callApi() from api utils when pressed', () => {
            const { queryByA11yRole } = setup();

            fireEvent(queryByA11yRole('button'), 'onPress');

            expect(callApi).toHaveBeenCalledTimes(1);
            expect(callApi).toHaveBeenCalledWith(
                `${baseApiUrl}${latestEndpoint}?access_key=${fixerKey}&symbols=${getCommaSeparatedCurrencyCodes()}`,
            );
        });

        it('should not be rendered when fetching rates, instead an activity indicator should be rendered', async () => {
            const { queryByA11yRole, getByTestId } = setup();

            fireEvent(queryByA11yRole('button'), 'onPress');

            expect(queryByA11yRole('button')).toBeFalsy();
            expect(getByTestId(testIds.activityIndicator)).toBeTruthy();
        });
    });

    describe('Output', () => {
        it('should show the input value in base currency', () => {
            const { queryByText } = setup();

            expect(
                queryByText(`${formatCurrency(1, currencies[0].code)} =`),
            ).toBeTruthy();
        });

        it('should not show the output value on launch', () => {
            const { queryByText } = setup();
            const expectedOutput: string = formatCurrency(
                convertCurrency(1, 1),
                currencies[1].code,
            );

            expect(queryByText(expectedOutput)).toBeFalsy();
        });

        it('should update the base currency value when input value changes', () => {
            const { getByDisplayValue, queryByText } = setup();
            const input = getByDisplayValue('1');

            fireEvent(input, 'onChangeText', '2');

            expect(
                queryByText(`${formatCurrency(2, currencies[0].code)} =`),
            ).toBeTruthy();
        });

        it('should instruct the user to click Convert on launch', () => {
            const { queryByText } = setup();

            expect(queryByText(strings.clickConvert)).toBeTruthy();
        });

        it('should hide instructions upon clicking Convert', async () => {
            const { getByA11yRole, queryByText } = setup();

            fireEvent(getByA11yRole('button'), 'onPress');

            await waitFor(() => getByA11yRole('button'));

            expect(queryByText(strings.clickConvert)).toBeFalsy();
        });

        it('should show converted value in requested currency', async () => {
            const { getByA11yRole, queryByText } = setup();

            fireEvent(getByA11yRole('button'), 'onPress');

            await waitFor(() => getByA11yRole('button'));

            const apiResult: FixerLatest = await callApi();

            expect(
                queryByText(
                    formatCurrency(
                        convertCurrency(1, apiResult.rates[currencies[1].code]),
                        currencies[1].code,
                    ),
                ),
            ).toBeTruthy();
        });

        it('should update the converted value when currency changes', async () => {
            const { getByA11yRole, queryByText, getByTestId } = setup();

            fireEvent(getByA11yRole('button'), 'onPress');

            await waitFor(() => getByA11yRole('button'));

            fireEvent(
                getByTestId(testIds.picker),
                'onValueChange',
                currencies[2].code,
            );

            const apiResult: FixerLatest = await callApi();

            expect(
                queryByText(
                    formatCurrency(
                        convertCurrency(1, apiResult.rates[currencies[2].code]),
                        currencies[2].code,
                    ),
                ),
            ).toBeTruthy();

            fireEvent(
                getByTestId(testIds.picker),
                'onValueChange',
                currencies[3].code,
            );

            expect(
                queryByText(
                    formatCurrency(
                        convertCurrency(1, apiResult.rates[currencies[3].code]),
                        currencies[3].code,
                    ),
                ),
            ).toBeTruthy();
        });

        it('should update the converted value when input changes', async () => {
            const { getByA11yRole, queryByText, getByDisplayValue } = setup();

            fireEvent(getByA11yRole('button'), 'onPress');

            await waitFor(() => getByA11yRole('button'));

            fireEvent(getByDisplayValue('1'), 'onChangeText', '563');

            const apiResult: FixerLatest = await callApi();

            expect(
                queryByText(
                    formatCurrency(
                        convertCurrency(
                            563,
                            apiResult.rates[currencies[1].code],
                        ),
                        currencies[1].code,
                    ),
                ),
            ).toBeTruthy();

            fireEvent(getByDisplayValue('563'), 'onChangeText', '463');

            expect(
                queryByText(
                    formatCurrency(
                        convertCurrency(
                            463,
                            apiResult.rates[currencies[1].code],
                        ),
                        currencies[1].code,
                    ),
                ),
            ).toBeTruthy();
        });

        it('should instruct the user to enter a valid input in case it is invalid', () => {
            const { getByDisplayValue, queryByText } = setup();

            fireEvent(getByDisplayValue('1'), 'onChangeText', '');

            expect(queryByText(strings.invalidInput)).toBeTruthy();

            let currencySymbol = formatCurrency(
                Number.parseFloat(''),
                currencies[0].code,
            ).replace('NaN', '');

            let regex = new RegExp(currencySymbol);
            expect(queryByText(regex)).toBeFalsy();

            currencySymbol = formatCurrency(
                Number.parseFloat(''),
                currencies[1].code,
            ).replace('NaN', '');

            regex = new RegExp(currencySymbol);
            expect(queryByText(regex)).toBeFalsy();
        });
    });
});
