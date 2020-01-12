import React, { useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import moment from 'moment';
import FromText from './FromText';
import ToText from './ToText';
import StatusText from './StatusText';

export interface Props {
	from: string;
	to: string;
	timestamp: number;
}

const renderStatus = (timestamp: number) => {
	if (timestamp) {
		const message: string = `Converted according to the rates as of ${moment(
			timestamp * 1000
		).fromNow()}`;

		return <StatusText status={message} />;
	}

	return <StatusText />;
};

const ConvertMessage: React.FC<Props> = props => {
	const { from, to, timestamp } = props;

	return (
		<View style={styles.container}>
			<FromText text={from} />
			<ToText text={to} />
			{renderStatus(timestamp)}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
		backgroundColor: 'white',
		borderRadius: 10,
		padding: 5
	}
});

export default ConvertMessage;
