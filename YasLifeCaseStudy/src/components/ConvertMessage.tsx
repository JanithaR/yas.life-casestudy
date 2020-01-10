import React from 'react';
import {Text, View, StyleSheet} from 'react-native';

export interface Props {
	fromValue: number;
	fromCurrency: string;
	toValue: number;
	toCurrency: string;
}

const ConvertMessage: React.FC<Props> = props => {
	return (
		<View style={styles.container}>
			<Text style={styles.text1}>
				{`${props.fromValue} ${props.fromCurrency} =`}
			</Text>
			<Text style={styles.text2}>{`${props.toValue} ${props.toCurrency}`}</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {alignItems: 'center'},
	text1: {fontSize: 24},
	text2: {fontSize: 36}
});

export default ConvertMessage;
