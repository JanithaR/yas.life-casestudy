import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { withKnobs, text } from '@storybook/addon-knobs';
import StatusText from './StatusText';

storiesOf('StatusText', module)
	.addDecorator(withKnobs)
	.add('default', () => (
		<StatusText status={text('Status', 'Fetching latest rates...')} />
	));
