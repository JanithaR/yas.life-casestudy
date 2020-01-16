import React from 'react';
import { Text, StyleSheet } from 'react-native';
import colors from '../res/colors';
import { FROM_TEXT } from '../testIDs';

export interface Props {
	text: string;
}

const FromText: React.FC<Props> = props => {
	return (
		<Text testID={FROM_TEXT} style={styles.text}>{`${props.text} = `}</Text>
	);
};

const styles = StyleSheet.create({
	text: { fontSize: 24, color: colors.secondaryColor }
});

export default FromText;
