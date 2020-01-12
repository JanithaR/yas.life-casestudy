import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { withKnobs, text } from '@storybook/addon-knobs';
import FromText from './FromText';

storiesOf('FromText', module)
	.addDecorator(withKnobs)
	.add('default', () => <FromText text={text('Title', 'EUR 1,000')} />);
