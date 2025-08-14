const expoConfig = require('eslint-config-expo/flat');
const eslintPluginPrettierRecommended = require('eslint-plugin-prettier/recommended');
const eslintPluginReactNative = require('eslint-plugin-react-native');

module.exports = [
  ...expoConfig,
  eslintPluginPrettierRecommended,
  {
    plugins: {
      'react-native': eslintPluginReactNative,
    },
    rules: {
      // Enforce single quotes also in JSX (Prettier + ESLint alignment)
      quotes: [
        'error',
        'single',
        { avoidEscape: true, allowTemplateLiterals: true },
      ],
      'react-native/no-unused-styles': 'error',
      'prettier/prettier': [
        'error',
        {
          singleQuote: true,
          jsxSingleQuote: true,
          endOfLine: 'lf',
        },
      ],
    },
    ignores: ['dist/*', 'node_modules/*', '.expo/*'],
  },
];
