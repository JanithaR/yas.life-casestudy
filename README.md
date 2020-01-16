# yas.life-casestudy

To get started,
1. Clone this repo
2. `cd YasLifeCaseStudy`
3. `npm install`
4. `npm run android` or `npm run ios`

To run unit tests,
`npm run test`

To test UI elements with Storybook,
1. In `App.tsx` comment `export default App;` and uncomment `export default Storybook;`
2. `npm run storybook`
3. `npm run start`
4. Run or refresh the app

Design inspiration - https://dribbble.com/shots/6839064-Daily-UI-004-Currency-converter-app/attachments and https://www.xe.com/

![iOS screen](https://i.imgur.com/M0eWDDP.png)
![Android screen](https://imgur.com/3Mq8qVh.png)

To add new currencies,
Update `config.ts` with the desired Currency. For example, `{ label: 'Australia', code: 'AUD' }`

Convert endpoint could not be used because free account plan doesn't allow for it to be used
![convert](https://i.imgur.com/mUXoXmX.png)
