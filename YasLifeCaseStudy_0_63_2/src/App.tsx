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
    ScrollView,
    StatusBar,
    TextInput,
    Button,
    View,
    Text,
    ActivityIndicator,
} from 'react-native';

import { Picker } from '@react-native-community/picker';

import strings from 'src/strings';
import colors from 'src/colors';
import testIds from 'src/testIds';
import {
    formatCurrency,
    convertCurrency,
    composeLatestEndpointUrl,
} from 'src/utils';
import { currencies } from 'src/config';
import { callApi } from 'src/api';
import {
    FixerLatest,
    Rate,
    instanceOfFixerLatest,
    FixerError,
    instanceOfFixerError,
} from 'src/interfaces';

declare const global: { HermesInternal: null | {} };

const App = () => {
    const [currency, setCurrency] = React.useState<string>(currencies[1].code);
    const [input, setInput] = React.useState<string>('1');
    const [rates, setRates] = React.useState<Rate>({});
    const [loading, setLoading] = React.useState<boolean>(false);
    const [error, setError] = React.useState<string | null>(null);

    function onCurrencyChange(value: string | number): void {
        let validatedCurrency: string;

        if (typeof value === 'number') {
            validatedCurrency = value.toString();
        } else {
            validatedCurrency = value;
        }

        setCurrency(validatedCurrency);
    }

    function onConvertPress(): void {
        setLoading(true);

        callApi(composeLatestEndpointUrl()).then(
            (data: FixerLatest | FixerError | Error) => {
                setLoading(false);

                if (instanceOfFixerLatest(data)) {
                    setRates(data.rates);
                } else if (instanceOfFixerError(data)) {
                    setError(data.error.info);
                } else {
                    setError(data.message);
                }
            },
        );
    }

    function onInputChange(value: string): void {
        setInput(value);
    }

    function getConversionRate(curr: string): Rate['key'] {
        return rates[curr];
    }

    function renderOutput(): ReactElement | null {
        if (!isNaN(Number.parseFloat(input)) && Object.keys(rates).length > 0) {
            return (
                <Text style={styles.outputText}>
                    {formatCurrency(
                        convertCurrency(
                            Number.parseFloat(input),
                            getConversionRate(currency),
                        ),
                        currency,
                    )}
                </Text>
            );
        }

        return null;
    }

    function renderPickerItems(): ReactElement[] {
        return currencies
            .filter((curr, index) => index !== 0)
            .map((curr) => (
                <Picker.Item
                    label={curr.label}
                    value={curr.code}
                    key={curr.code}
                />
            ));
    }

    function renderConvertButton(): ReactElement {
        return loading ? (
            <ActivityIndicator
                size="large"
                color={colors.primary}
                testID={testIds.activityIndicator}
            />
        ) : (
            <Button
                title={strings.convert}
                onPress={onConvertPress}
                color={colors.primary}
            />
        );
    }

    function renderInstructions(): ReactElement | null {
        if (isNaN(Number.parseFloat(input))) {
            return <Text>{strings.invalidInput}</Text>;
        }

        if (error) {
            return <Text style={styles.errorText}>{error}</Text>;
        }

        if (Object.keys(rates).length === 0) {
            return <Text>{strings.clickConvert}</Text>;
        }

        return null;
    }

    function renderInput(): ReactElement | null {
        if (!isNaN(Number.parseFloat(input))) {
            return (
                <Text style={styles.inputText}>
                    {formatCurrency(Number.parseFloat(input))} =
                </Text>
            );
        }

        return null;
    }

    return (
        <>
            <StatusBar barStyle="light-content" />
            <SafeAreaView style={styles.safeArea}>
                <ScrollView
                    contentInsetAdjustmentBehavior="automatic"
                    style={styles.scrollView}>
                    <View style={styles.sectionWrapper}>
                        <TextInput
                            value={
                                Number.parseFloat(input) > 0
                                    ? input.toString()
                                    : ''
                            }
                            onChangeText={onInputChange}
                            keyboardType="decimal-pad"
                            selectTextOnFocus
                            style={styles.input}
                            placeholder={strings.inputPlaceholder}
                        />
                        <Picker
                            testID={testIds.picker}
                            selectedValue={currency}
                            onValueChange={onCurrencyChange}
                            itemStyle={styles.picker}>
                            {renderPickerItems()}
                        </Picker>
                        <View style={styles.buttonWrapper}>
                            {renderConvertButton()}
                        </View>
                    </View>
                    <View
                        style={StyleSheet.flatten([
                            styles.sectionWrapper,
                            styles.outputWrapper,
                        ])}>
                        {renderInput()}

                        {renderOutput()}

                        {renderInstructions()}
                    </View>
                </ScrollView>
            </SafeAreaView>
        </>
    );
};

const styles = StyleSheet.create({
    scrollView: {
        backgroundColor: colors.background,
        padding: 20,
    },
    sectionWrapper: {
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 10,
    },
    input: {
        borderRadius: 10,
        borderColor: colors.background,
        borderWidth: 1,
        fontSize: 36,
    },
    safeArea: {
        flex: 1,
    },
    outputWrapper: {
        marginTop: 10,
        alignItems: 'center',
    },
    picker: {
        fontSize: 26,
    },
    inputText: {
        color: colors.primary,
        fontSize: 36,
    },
    buttonWrapper: {
        marginTop: 10,
    },
    outputText: {
        color: colors.primary,
        fontSize: 56,
    },
    errorText: {
        color: 'red',
    },
});

export default App;
