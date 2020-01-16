import React from 'react';
import { currencies } from './config';
import { Provider } from 'react-redux';
import { render, RenderAPI } from 'react-native-testing-library';
import CurrencyConverter from '.';
import { FROM_TEXT, TO_TEXT, VALUE_INPUT } from './testIDs';
import { createStore } from 'redux';
import combinedReducers from './reducers/index';

describe('Currency converter redux connected component', () => {
	let component: RenderAPI;

	beforeEach(() => {
		const mockState = {
			converter: {
				userInput: '1',
				desiredCurrency: currencies[1].code,
				isFetchingLatestRates: false,
				latestRatesFetchError: null,
				latestRatesFetchResponse: null,
				outputs: null
			}
		};

		const mockStore = createStore(combinedReducers, mockState);

		component = render(
			<Provider store={mockStore}>
				<CurrencyConverter />
			</Provider>
		);
	});

	it('should render with the default state from Redux store', () => {
		const { getByText, getByTestId } = component;

		let element = getByText('Click convert');
		expect(element).toBeDefined();

		element = getByTestId(VALUE_INPUT);
		expect(element).toBeDefined();

		expect(component.toJSON()).toMatchSnapshot();

		element = getByTestId(FROM_TEXT);
		expect(element.props.children).toEqual('€1.00 = ');

		element = getByTestId(TO_TEXT);
		expect(element.props.children).toEqual('DKK\xa00.00');
	});
});
