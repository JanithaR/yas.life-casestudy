/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, { useEffect } from 'react';
import {
	SafeAreaView,
	StyleSheet,
	StatusBar,
	TextInput,
	Picker,
	View
} from 'react-native';
import { Currency } from 'src/interfaces/index';
import ConvertMessage from './components/ConvertMessage';
import { currencies } from './config';
import { connect } from 'react-redux';
import { changeUserInput, changeDesiredCurrency } from './actions/index';

const renderPickerItems = (items: Currency[]) => {
	return items.map((item: Currency, index: number) => {
		if (index !== 0) {
			return (
				<Picker.Item
					label={item.label}
					value={item.pickerValue}
					key={item.pickerValue}
				/>
			);
		}

		return null;
	});
};

const getCurrencyCodeFromPickerValue = (pickerValue: string) => {
	for (let i = 0; i < currencies.length; i++) {
		if (currencies[i].pickerValue === pickerValue) {
			return currencies[i].code;
		}
	}

	return '';
};

const CurrencyConverter = (props: any) => {
	const {
		userInput,
		desiredCurrency,
		setDesiredCurrency,
		setUserInput
	} = props;

	const baseCurrency = currencies[0];

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
						value={userInput.toString()}
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
						{renderPickerItems(currencies)}
					</Picker>
					<ConvertMessage
						fromCurrency={baseCurrency.code}
						fromValue={Number.parseFloat(userInput)}
						toCurrency={getCurrencyCodeFromPickerValue(desiredCurrency)}
						toValue={999}
					/>
				</View>
			</SafeAreaView>
		</>
	);
};

const styles = StyleSheet.create({
	appContainer: { flex: 1 },
	valueInput: { height: 40, borderColor: 'gray', borderWidth: 1 }
});

const mapStateToProps = (state: any) => ({
	...state.converter
});

const mapDispatchToProps = (dispatch: any) => ({
	setUserInput: (value: string) =>
		dispatch(changeUserInput(Number.parseFloat(value))),
	setDesiredCurrency: (value: string) => dispatch(changeDesiredCurrency(value))
});

// eslint-disable-next-line prettier/prettier
export default connect(mapStateToProps, mapDispatchToProps)(CurrencyConverter);
