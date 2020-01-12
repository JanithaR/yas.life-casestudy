import React from 'react';
import { View, StyleSheet } from 'react-native';
import moment from 'moment';
import FromText from './FromText';
import ToText from './ToText';
import StatusText from './StatusText';

export interface Props {
	from: string;
	to: string;
	timestamp: number;
	error?: string;
}

const renderStatus = (timestamp: number, error: string) => {
	if (timestamp) {
		const message: string = `Converted according to the rates as of ${moment(
			timestamp * 1000
		).fromNow()}`;

		return <StatusText status={message} />;
	}

	if (error) {
		return <StatusText status={error} />;
	}

	return <StatusText />;
};

const ConvertOutput: React.FC<Props> = props => {
	const { from, to, timestamp, error } = props;

	return (
		<View style={styles.container}>
			<FromText text={from} />
			<ToText text={to} />
			{renderStatus(timestamp, error)}
		</View>
	);
};

ConvertOutput.defaultProps = {
	error: ''
};

const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
		backgroundColor: 'white',
		borderRadius: 10,
		padding: 5
	}
});

export default ConvertOutput;
