module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es6: true,
  },
  extends: [
    "eslint:recommended",
    "airbnb",
    "plugin:angular/johnpapa",
  ],
  parserOptions: {
    sourceType: "module",
    ecmaVersion: 6,
    ecmaFeatures: {
      experimentalObjectRestSpread: true,
    },
  },
  rules: {
    strict: [2, "global"],
    indent: ["error"],
    "linebreak-style": ["error", "unix"],
    quotes: ["error", "double"],
    semi: ["error", "always"],
    "no-underscore-dangle": ["error", { allowAfterThis: true }],
    "no-param-reassign": ["error", { "props": false }],
  },
};
