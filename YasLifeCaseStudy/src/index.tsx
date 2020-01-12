/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, { ReactElement } from 'react';
import {
	SafeAreaView,
	StyleSheet,
	StatusBar,
	TextInput,
	Picker,
	View,
	Button,
	ActivityIndicator,
	KeyboardAvoidingView
} from 'react-native';
import { Currency } from 'src/interfaces/index';
import ConvertedOutput from './components/ConvertedOutput';
import { currencies } from './config';
import { connect } from 'react-redux';
import {
	changeUserInput,
	changeDesiredCurrency,
	fetchLatestRates
} from './actions/index';
import LatestRatesFetchError from './components/LatestRatesFetchError';
import { formatCurrency } from './utils';
import colors from './res/colors';
import { ThemeProvider } from 'styled-components/native';

const renderPickerItems = (items: Currency[]) => {
	return items.map((item: Currency, index: number) => {
		if (index !== 0) {
			return (
				<Picker.Item label={item.label} value={item.code} key={item.code} />
			);
		}

		return null;
	});
};

const renderConvertButton = (
	isLoading: boolean,
	onPress: any
): ReactElement => {
	if (isLoading) {
		return (
			<View style={styles.convertButtonWrapper}>
				<ActivityIndicator size="small" />
			</View>
		);
	}

	return (
		<View style={styles.convertButtonWrapper}>
			<Button title="Convert" onPress={onPress} />
		</View>
	);
};

const CurrencyConverter = (props: any) => {
	const {
		userInput,
		desiredCurrency,
		setDesiredCurrency,
		setUserInput,
		isFetchingLatestRates,
		latestRatesFetchError,
		outputs,
		onConvertPress,
		latestRatesFetchResponse
	} = props;

	if (latestRatesFetchError) {
		return (
			<ThemeProvider theme={{}}>
				<StatusBar barStyle="dark-content" />
				<SafeAreaView style={styles.appContainer}>
					<LatestRatesFetchError onPress={onConvertPress} />
				</SafeAreaView>
			</ThemeProvider>
		);
	}

	return (
		<ThemeProvider theme={{}}>
			<StatusBar barStyle="dark-content" />
			<SafeAreaView style={styles.safeArea}>
				<KeyboardAvoidingView
					style={styles.appContainer}
					behavior="padding"
					enabled>
					<View style={styles.inputWrapper}>
						<TextInput
							onChangeText={setUserInput}
							value={userInput.toString()}
							style={styles.valueInput}
							autoCompleteType="off"
							autoCorrect={false}
							keyboardType="decimal-pad"
						/>
						<Picker
							selectedValue={desiredCurrency}
							onValueChange={value => {
								setDesiredCurrency(value);
							}}
							prompt="Select currency">
							{renderPickerItems(currencies)}
						</Picker>
						{renderConvertButton(isFetchingLatestRates, () => {
							onConvertPress(desiredCurrency);
						})}
					</View>
					<ConvertedOutput
						from={formatCurrency(
							Number.parseFloat(userInput),
							currencies[0].code
						)}
						to={
							outputs
								? formatCurrency(outputs[desiredCurrency], desiredCurrency)
								: formatCurrency(0, desiredCurrency)
						}
						timestamp={
							latestRatesFetchResponse ? latestRatesFetchResponse.timestamp : 0
						}
					/>
				</KeyboardAvoidingView>
			</SafeAreaView>
		</ThemeProvider>
	);
};

const styles = StyleSheet.create({
	safeArea: {
		flex: 1,
		backgroundColor: colors.backgroundColor
	},
	appContainer: {
		paddingTop: 10,
		paddingLeft: 20,
		paddingBottom: 10,
		paddingRight: 20
	},
	inputWrapper: {
		backgroundColor: 'white',
		borderRadius: 10,
		marginBottom: 5
	},
	valueInput: {
		height: 40,
		borderColor: colors.backgroundColor,
		borderWidth: 1,
		borderRadius: 10,
		fontSize: 24,
		marginLeft: 5,
		marginTop: 5,
		marginRight: 5,
		padding: 5
	},
	convertButtonWrapper: { height: 50 }
});

const mapStateToProps = (state: any) => ({
	...state.converter
});

const mapDispatchToProps = (dispatch: any) => ({
	setUserInput: (value: string) => dispatch(changeUserInput(value)),
	setDesiredCurrency: (value: string) => dispatch(changeDesiredCurrency(value)),
	onConvertPress: () => dispatch(fetchLatestRates())
});

// eslint-disable-next-line prettier/prettier
export default connect(mapStateToProps, mapDispatchToProps)(CurrencyConverter);
