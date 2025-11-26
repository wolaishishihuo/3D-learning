export default {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat', // ✨ 新功能
        'fix', // 🐛 修复bug
        'docs', // 📝 文档更新
        'style', // 💄 代码格式(不影响代码运行的变动)
        'refactor', // ♻️  重构
        'perf', // ⚡️ 性能优化
        'test', // ✅ 测试相关
        'chore', // 🔧 构建过程或辅助工具的变动
        'revert', // ⏪ 回退
        'build', // 📦 打包
        'ci' // 👷 CI/CD
      ]
    ],
    'subject-case': [0], // subject大小写不做校验
    'header-max-length': [2, 'always', 200], // 增加 header 最大长度到 200
    // 允许以 emoji 开头
    'subject-empty': [2, 'never'],
    'type-empty': [2, 'never']
  },
  // 自定义解析器，支持 emoji
  parserPreset: {
    parserOpts: {
      headerPattern:
        /^(?::([\w-]*):|\u00a9|\u00ae|[\u2000-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff])?\s*(\w*)(?:\(([\w\$\.\-\* ]*)\))?\: (.*)$/,
      headerCorrespondence: ['emoji', 'type', 'scope', 'subject']
    }
  }
};
