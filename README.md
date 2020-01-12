# yas.life-casestudy

To get started,
1. Clone this repo
2. `cd YasLifeCaseStudy`
3. `npm install`
4. `npm run android` or `npm run ios`

To run unit tests,
`npm run test`

To test UI elements with Storybook,
1. In `App.js` comment `return (
		<Provider store={store}>
			<CurrencyConverter />
		</Provider>
	);` and uncomment `return <Storybook />;`
2. `npm run storybook`
3. `npm run start`

Note: *There are issue with storybook which I have not figured out how to fix so it won't work as expected
