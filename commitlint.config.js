// https://github.com/conventional-changelog/commitlint/blob/master/docs/reference-rules.md
// <type>[scope]: <description> 默认格式
// type 改动类型
// scope 改动范围
// description 改动描述
/**
 * type枚举
 * feat：新功能
 * update：更新某功能
 * fix：修补某功能的bug
 * refactor：重构某个功能
 * optimize: 优化构建工具或运行时性能
 * style：仅样式改动
 * docs：仅文档新增/改动
 * chore：构建过程或辅助工具的变动
 */

// 规则配置格式
// "rule-name": [Level, Applicable, Value]
// Level可取值有0, 1, 2：0-禁用 1-警告 2-错误
// Applicable可取值有always、never：always - 应用    never - 应用其反面，类似"取反"
// Value：用于此规则的值，可以为number/string/array等类型

module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat',
        'update',
        'fixbug',
        'refactor',
        'optimize',
        'style',
        'docs',
        'chore',
      ],
    ], // type 取值枚举
    'type-case': [0], // type输入格式  小写
    'type-empty': [2, 'never'], // type 是否可为空  默认never
    'scope-enum': [1, 'always', ['javascript', 'plugin']], // scope枚举
    'scope-case': [0], // scope输入格式  小写
    'scope-empty': [0, 'never'], // scope 是否可为空  默认never
    'subject-full-stop': [0, 'never'], // 第一行信息的结尾符
  },
};
