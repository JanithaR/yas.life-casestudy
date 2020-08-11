![YasLifeCaseStudy_0_63_2 Test and Build](https://github.com/JanithaR/yas.life-casestudy/workflows/YasLifeCaseStudy_0_63_2%20Test%20and%20Build/badge.svg)

# yas.life-casestudy

To get started,
1. Clone this repo
2. `cd YasLifeCaseStudy` or `cd YasLifeCaseStudy_0_63_2`
3. `npm install` or `yarn install`
4. `npm run android` or `npm run ios` or `yarn android` or `yarn ios`

To run unit tests,
`npm run test` or `yarn test`

To test UI elements with Storybook, (not applicable to YasLifeCaseStudy_0_63_2)
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

# What is YasLifeCaseStudy_0_63_2?
It is an upgrade to the now outdated/overkill solution in YasLifeCaseStudy. It was written completely using TDD so that can be used as a usecase for studying TDD.

# Environment variables
FIXER_KEY
