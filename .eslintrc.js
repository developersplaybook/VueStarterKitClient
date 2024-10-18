module.exports = {
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: 'babel-eslint', // or '@babel/eslint-parser'
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  extends: [
    'plugin:vue/vue3-recommended', // or 'plugin:vue/essential' for less strict rules
  ],
  rules: {
    'no-unused-vars': 2, // 0=off, 1=warning, 2= error
    'vue/no-unused-components': 2,
  },

};
