/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, { ReactElement } from 'react';
import { Provider } from 'react-redux';
import store from './src/store';
import CurrencyConverter from './src/index';

const App = (): ReactElement => {
	return (
		<Provider store={store}>
			<CurrencyConverter />
		</Provider>
	);
};

export default App;
