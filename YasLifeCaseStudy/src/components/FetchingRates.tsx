import React from 'react';
import { Text, View, StyleSheet, ActivityIndicator } from 'react-native';

export interface Props {
	message?: string;
}

const FetchingRates: React.FC<Props> = props => {
	const { message } = props;

	return (
		<View style={styles.container}>
			<ActivityIndicator size="large" />
			<Text style={styles.message}>{message}</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
		flex: 1,
		justifyContent: 'center'
	},
	message: { fontSize: 16 }
});

FetchingRates.defaultProps = {
	message: 'Fetching latest rates...'
};

export default FetchingRates;
