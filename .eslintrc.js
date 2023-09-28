module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    "plugin:vue/vue3-recommended",
    "eslint:recommended",
    "@vue/prettier",
    "@vue/typescript/recommended",
  ],
  parserOptions: {
    ecmaVersion: 2021,
  },
  rules: {
    "vue/multi-word-component-names": "off",
    "@typescript-eslint/no-empty-function": "off",
    "vue/require-v-for-key": "off",
    "vue/valid-v-for": "off",
    "@typescript-eslint/no-explicit-any": "off",
  },
}
