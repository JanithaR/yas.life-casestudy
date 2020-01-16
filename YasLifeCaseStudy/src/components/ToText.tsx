import React from 'react';
import { Text, StyleSheet } from 'react-native';
import colors from '../res/colors';
import { TO_TEXT } from '../testIDs';

export interface Props {
	text: string;
}

const ToText: React.FC<Props> = props => {
	return (
		<Text testID={TO_TEXT} style={styles.text}>
			{props.text}
		</Text>
	);
};

const styles = StyleSheet.create({
	text: { fontSize: 36, color: colors.primaryColor }
});

export default ToText;
