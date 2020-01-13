import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { withKnobs, text } from '@storybook/addon-knobs';
import ToText from './ToText';

storiesOf('ToText', module)
	.addDecorator(withKnobs)
	.add('default', () => <ToText text={text('Title', 'DKK 100,000')} />);
