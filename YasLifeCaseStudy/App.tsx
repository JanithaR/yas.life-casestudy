/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {useState, useEffect} from 'react';
import {
	SafeAreaView,
	StyleSheet,
	StatusBar,
	TextInput,
	Picker,
	View
} from 'react-native';
import {Currency} from 'src/interfaces/index';
import ConvertMessage from './src/components/ConvertMessage';

const baseCurrency: Currency = {
	label: 'Euro',
	code: 'EUR',
	pickerValue: 'Euro'
};
const convertableCurrencies: Currency[] = [
	{label: 'Danmark', code: 'DKK', pickerValue: 'denmark'},
	{label: 'India', code: 'INR', pickerValue: 'india'},
	{label: 'US', code: 'USD', pickerValue: 'us'},
	{label: 'Thailand', code: 'THB', pickerValue: 'thailand'}
];

const renderPickerItems = (currencies: Currency[]) => {
	return currencies.map((currency: Currency) => (
		<Picker.Item
			label={currency.label}
			value={currency.pickerValue}
			key={currency.pickerValue}
		/>
	));
};

const getCurrencyCodeFromPickerValue = (pickerValue: string) => {
	for (let i = 0; i < convertableCurrencies.length; i++) {
		if (convertableCurrencies[i].pickerValue === pickerValue) {
			return convertableCurrencies[i].code;
		}
	}

	return '';
};

const App = () => {
	const [userInput, setUserInput] = useState('1');
	const [desiredCurrency, setDesiredCurrency] = useState(
		convertableCurrencies[0].pickerValue
	);

	useEffect(() => {
		console.log('hit the currency api');
	}, [desiredCurrency, userInput]);

	return (
		<>
			<StatusBar barStyle="dark-content" />
			<SafeAreaView style={styles.appContainer}>
				<View style={styles.appContainer}>
					<TextInput
						onChangeText={setUserInput}
						value={userInput}
						style={styles.valueInput}
						autoCompleteType="off"
						autoCorrect={false}
						keyboardType="numeric"
						selectTextOnFocus={true}
					/>
					<Picker
						selectedValue={desiredCurrency}
						onValueChange={value => {
							setDesiredCurrency(value);
						}}>
						{renderPickerItems(convertableCurrencies)}
					</Picker>
					<ConvertMessage
						fromCurrency={baseCurrency.code}
						fromValue={Number.parseInt(userInput, 10)}
						toCurrency={getCurrencyCodeFromPickerValue(desiredCurrency)}
						toValue={999}
					/>
				</View>
			</SafeAreaView>
		</>
	);
};

const styles = StyleSheet.create({
	appContainer: {flex: 1},
	valueInput: {height: 40, borderColor: 'gray', borderWidth: 1}
});

export default App;
