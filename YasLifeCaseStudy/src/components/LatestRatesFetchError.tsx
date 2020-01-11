import React from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';

export interface Props {
	message?: string;
	onPress: any;
}

const FetchingRates: React.FC<Props> = props => {
	const { message, onPress } = props;

	return (
		<View style={styles.container}>
			<Text style={styles.message}>{message}</Text>
			<Button title="Retry" onPress={onPress} />
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
	message: 'Failed to fetch latest rates!'
};

export default FetchingRates;
