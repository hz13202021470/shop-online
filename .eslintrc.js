module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/essential',
    '@vue/standard' //注释这行可以关闭eslint 语法检测
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-extra-semi':2,
    "indent": 2,
    "no-tabs": 'off'
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}
