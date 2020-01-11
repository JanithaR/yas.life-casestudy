import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import moment from 'moment';

export interface Props {
	from: string;
	to: string;
	timestamp: number;
}

const renderTimestampMessage = (timestamp: number) => {
	if (timestamp) {
		return (
			<Text
				style={styles.text3}>{`Converted according to the rates as of ${moment(
				timestamp * 1000
			).fromNow()}`}</Text>
		);
	}

	return <Text style={styles.text3}>Click Convert</Text>;
};

const ConvertMessage: React.FC<Props> = props => {
	const { from: fromValue, to: toValue, timestamp } = props;

	return (
		<View style={styles.container}>
			<Text style={styles.text1}>{`${fromValue} =`}</Text>
			<Text style={styles.text2}>{`${toValue}`}</Text>
			{renderTimestampMessage(timestamp)}
		</View>
	);
};

const styles = StyleSheet.create({
	container: { alignItems: 'center' },
	text1: { fontSize: 24 },
	text2: { fontSize: 36 },
	text3: { fontSize: 12 }
});

export default ConvertMessage;
