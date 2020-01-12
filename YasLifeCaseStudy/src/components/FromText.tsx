import React from 'react';
import { Text, StyleSheet } from 'react-native';
import colors from '../res/colors';

export interface Props {
	text: string;
}

const FromText: React.FC<Props> = props => {
	return <Text style={styles.text}>{`${props.text} = `}</Text>;
};

const styles = StyleSheet.create({
	text: { fontSize: 24, color: colors.secondaryColor }
});

export default FromText;
