module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'plugin:@typescript-eslint/recommended',
    'airbnb-base',
    // '@nuxtjs/eslint-config-typescript',
    // 'plugin:vue/essential',
    // 'plugin:nuxt/recommended',
    // 'plugin:react/recommended',
    'plugin:prettier/recommended',
    'prettier',
  ],
  parserOptions: {
    // ecmaFeatures: {
    //   jsx: true,
    // },
    ecmaVersion: 12,
    parser: '@typescript-eslint/parser',
    sourceType: 'module',
  },
  plugins: [
    // 'vue',
    // 'react',
    '@typescript-eslint',
  ],
  rules: {},
};
