import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import moment from 'moment';
import colors from '../res/colors';

export interface Props {
	from: string;
	to: string;
	timestamp: number;
}

const renderTimestampMessage = (timestamp: number) => {
	if (timestamp) {
		return (
			<Text
				style={
					styles.message
				}>{`Converted according to the rates as of ${moment(
				timestamp * 1000
			).fromNow()}`}</Text>
		);
	}

	return <Text style={styles.message}>Click Convert</Text>;
};

const ConvertMessage: React.FC<Props> = props => {
	const { from, to, timestamp } = props;

	return (
		<View style={styles.container}>
			<Text style={styles.from}>{`${from} =`}</Text>
			<Text style={styles.to}>{`${to}`}</Text>
			{renderTimestampMessage(timestamp)}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
		backgroundColor: 'white',
		borderRadius: 10,
		padding: 5
	},
	from: { fontSize: 24, color: colors.secondaryColor },
	to: { fontSize: 36, color: colors.primaryColor },
	message: { fontSize: 12 }
});

export default ConvertMessage;
