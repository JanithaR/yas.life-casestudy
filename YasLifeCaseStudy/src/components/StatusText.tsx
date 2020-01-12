import React from 'react';
import { Text, StyleSheet } from 'react-native';

export interface Props {
	status?: string;
}

const StatusText: React.FC<Props> = props => {
	return <Text style={styles.status}>{props.status}</Text>;
};
const styles = StyleSheet.create({
	status: { fontSize: 12 }
});

StatusText.defaultProps = {
	status: 'Click convert'
};

export default StatusText;
