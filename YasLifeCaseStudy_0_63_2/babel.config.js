module.exports = {
    presets: ['module:metro-react-native-babel-preset'],
    plugins: [
        [
            'dotenv-import',
            {
                moduleName: '@env',
                path: '.env',
                safe: true,
            },
        ],
    ],
};
