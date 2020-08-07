import React from 'react';
import { render, fireEvent, waitFor } from 'react-native-testing-library';
import {
    // eslint-disable-next-line no-unused-vars
    toBeEnabled,
    // eslint-disable-next-line no-unused-vars
    toHaveTextContent,
    // eslint-disable-next-line no-unused-vars
    toHaveProp,
} from '@testing-library/jest-native';
import AsyncStorage from '@react-native-community/async-storage';

import App from 'src/App';
import strings from 'src/strings';
import testIds from 'src/testIds';
import { convertCurrency, formatCurrency } from 'src/utils';
import { currencies } from 'src/config';
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
    it('should render as expected on launch', () => {
        const { toJSON } = setup();

        expect(toJSON()).toMatchSnapshot();
    });

    it('should render as expected when an input is converted', async () => {
        const { queryByA11yRole, toJSON } = setup();
        const button = queryByA11yRole('button');

        fireEvent(button, 'onPress');

        await waitFor(() => button);

        expect(toJSON()).toMatchSnapshot();
    });

    describe('Input', () => {
        beforeEach(() => {
            AsyncStorage.setItem.mockClear();
        });

        it('should be rendered', () => {
            const { queryByDisplayValue } = setup();
            const input = queryByDisplayValue('1');

            expect(input).toBeTruthy();
            expect(input).toBeEnabled();
        });

        it('should show 1 as default value', () => {
            const { queryByDisplayValue } = setup();

            expect(queryByDisplayValue('1')).toBeTruthy();
        });

        it('should be pre populated if a cached input exists', async () => {
            AsyncStorage.getItem.mockResolvedValueOnce('1234.56');

            const { queryByDisplayValue } = setup();

            await waitFor(() => queryByDisplayValue('1234.56'));

            expect(queryByDisplayValue('1234.56')).toBeTruthy();
        });

        it('should show default value 1 if an exception occurred when reading cached input', async () => {
            AsyncStorage.getItem.mockRejectedValueOnce({
                message: 'Async storage read exception',
            });

            const { queryByText } = setup();

            await waitFor(() => {
                queryByText('Async storage read exception');
            });

            expect(queryByText('Async storage read exception')).toBeTruthy();
        });

        it('should update the input field and cache the value when typed', () => {
            const { queryByDisplayValue } = setup();

            fireEvent(queryByDisplayValue('1'), 'onChangeText', '2');

            expect(queryByDisplayValue('2')).toBeTruthy();

            expect(AsyncStorage.setItem).toHaveBeenCalledTimes(1);
            expect(AsyncStorage.setItem).toBeCalledWith('input', '2');

            fireEvent(queryByDisplayValue('2'), 'onChangeText', '3.5');

            expect(queryByDisplayValue('3.5')).toBeTruthy();

            expect(AsyncStorage.setItem).toHaveBeenCalledTimes(2);
            expect(AsyncStorage.setItem).toBeCalledWith('input', '3.5');
        });

        it('should show an error if writing cache failed', async () => {
            AsyncStorage.setItem.mockRejectedValueOnce({
                message: 'Async storage write exception',
            });

            const { queryByDisplayValue, queryByText } = setup();

            fireEvent(queryByDisplayValue('1'), 'onChangeText', '2');

            await waitFor(() => {
                queryByText('Async storage write exception');
            });

            expect(queryByText('Async storage write exception')).toBeTruthy();
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
        beforeEach(() => {
            callApi.mockClear();
        });

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
                expect.stringMatching(
                    /^http:\/\/data.fixer.io\/api\/latest\?access_key=[a-z0-9]{32}&symbols=.+$/,
                ),
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
        beforeEach(() => {
            AsyncStorage.getItem.mockImplementationOnce((key: string) =>
                Promise.resolve(null),
            );
        });

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

        it('should show latest rates fetching status upon clicking Convert', async () => {
            const { getByA11yRole, queryByText } = setup();

            fireEvent(getByA11yRole('button'), 'onPress');

            await waitFor(() => getByA11yRole('button'));

            expect(queryByText(strings.fetchingLatestRates)).toBeFalsy();
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

        it('should show error description if API threw an error', async () => {
            callApi.mockResolvedValueOnce({
                success: false,
                error: {
                    code: 104,
                    info: 'Fixer API error description',
                },
            });

            const { queryByText, getByA11yRole } = setup();

            fireEvent(getByA11yRole('button'), 'onPress');

            await waitFor(() => getByA11yRole('button'));

            expect(queryByText('Fixer API error description')).toBeTruthy();
        });

        it('should show error description if an API exception occurred', async () => {
            callApi.mockRejectedValueOnce({
                message: 'API exception',
            });

            const { queryByText, getByA11yRole } = setup();

            fireEvent(getByA11yRole('button'), 'onPress');

            await waitFor(() => getByA11yRole('button'));

            expect(queryByText('API exception')).toBeTruthy();
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
                currencies[2].code,
            );

            expect(
                queryByText(
                    formatCurrency(
                        convertCurrency(1, apiResult.rates[currencies[2].code]),
                        currencies[2].code,
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
