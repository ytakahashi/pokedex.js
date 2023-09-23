module.exports = {
  env: {
    mocha: true
  },
  extends: 'standard-with-typescript',
  ignorePatterns: ['dist/*', 'logs/*'],
  parserOptions: {
    ecmaVersion: 2020,
    project: './tsconfig.test.json'
  },
  rules: {
    '@typescript-eslint/consistent-type-definitions': ['error', 'type']
  }
}
