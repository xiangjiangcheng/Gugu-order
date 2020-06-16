module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/essential',
    '@vue/standard'
  ],
  rules: {
    'no-undef': 0,
    'no-obj-calls': 0,
    'no-control-regex': 0,
    'no-global-assign': 0,
    'no-useless-escape': 0,
    'no-implicit-globals': 0,
    'no-use-before-define': 0,
    'no-restricted-globals': 0,
    'indent': ['error', 2], // 缩进2格
    'no-eq-null': 2, // 不允许对null用==或者!=
    'no-var': 2,
    'no-dupe-keys': 2, // 对象中不允许出现重复的键
    'no-empty': 2, // 不允许出现空的代码块
    'no-irregular-whitespace': 2, // 不允许出现不规则的空格
    // 'no-unused-vars': [2, { 'vars': 'all', 'args': 'after-used' }], // 不允许有声明后未使用的变量或者参数
    'camelcase': [2, { 'properties': 'never' }], // 强制驼峰命名规则
    'key-spacing': [2, { 'beforeColon': false, 'afterColon': true }], // 对象字面量中冒号的前后空格
    'new-cap': [2, { 'newIsCap': true, 'capIsNew': false }], // 构造函数名字首字母要大写
    'newline-after-var': 2, // 变量声明后必须空一行
    'quotes': [2, 'single'], // 变量必须使用单引号
    'no-multiple-empty-lines': [2, { 'max': 2 }] // 空格最多不能超过两行
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  overrides: [
    {
      files: [
        '**/__tests__/*.{j,t}s?(x)'
      ],
      env: {
        mocha: true
      }
    }
  ]
}
