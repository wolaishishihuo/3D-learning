# Three.js 3D 学习项目

基于 Vue 3 + TypeScript + Three.js 的 3D 可视化学习平台

## 技术栈

- **Vue 3** - 渐进式 JavaScript 框架
- **TypeScript** - JavaScript 的超集，提供类型安全
- **Vite** - 下一代前端构建工具
- **Three.js** - JavaScript 3D 库
- **Vue Router** - Vue 官方路由管理
- **Pinia** - Vue 官方状态管理
- **SCSS** - CSS 预处理器
- **ESLint** - 代码质量检查工具
- **Prettier** - 代码格式化工具
- **Commitlint** - Git 提交信息规范检查
- **Husky** - Git hooks 工具
- **unplugin-auto-import** - API 自动导入
- **unplugin-vue-components** - 组件自动导入

## 项目结构

```
3d-learning/
├── src/
│   ├── components/      # 组件目录
│   ├── composables/     # 组合式函数
│   ├── router/          # 路由配置
│   ├── stores/          # 状态管理
│   ├── styles/          # 全局样式
│   ├── views/           # 页面视图
│   ├── App.vue          # 根组件
│   └── main.ts          # 入口文件
├── types/               # 类型声明文件（自动生成）
├── public/              # 静态资源
├── .prettierrc          # Prettier 配置
├── eslint.config.js     # ESLint 配置
├── tsconfig.json        # TypeScript 配置
├── vite.config.ts       # Vite 配置
└── package.json         # 项目配置
```

## 开始使用

### 安装依赖

```bash
pnpm install
```

### 开发

```bash
pnpm dev
```

项目将在 http://localhost:3000 启动

### 构建

```bash
pnpm build
```

### 预览

```bash
pnpm preview
```

### 代码检查

```bash
# 运行 ESLint
pnpm lint

# 格式化代码
pnpm format
```

### 提交规范

项目集成了 Commitlint + Husky，自动验证 commit message 格式。支持带 emoji 的提交信息：

#### Commit Message 格式

```
[emoji] <type>(<scope>): <subject>
```

#### 支持的类型及对应 Emoji

| Type | Emoji | 说明 |
|------|-------|------|
| feat | ✨ | 新功能 |
| fix | 🐛 | 修复 bug |
| docs | 📝 | 文档更新 |
| style | 💄 | 代码格式（不影响代码运行） |
| refactor | ♻️ | 重构 |
| perf | ⚡️ | 性能优化 |
| test | ✅ | 测试相关 |
| chore | 🔧 | 构建/工具变动 |
| revert | ⏪ | 回退 |
| build | 📦 | 打包 |
| ci | 👷 | CI/CD |

#### 示例

```bash
# 带 emoji（推荐）
git commit -m "✨ feat: 添加用户登录功能"
git commit -m "🐛 fix: 修复页面样式错位问题"
git commit -m "📝 docs: 更新README文档"

# 不带 emoji（也可以）
git commit -m "feat: 添加用户登录功能"
git commit -m "fix: 修复页面样式错位问题"
```

提交时会自动进行格式验证，不符合规范的提交将被拒绝。

## 功能特性

- ✅ Vue 3 + TypeScript 开发
- ✅ 响应式 3D 场景渲染
- ✅ **API 自动导入** - Vue、Vue Router、Pinia API 无需手动导入
- ✅ **组件自动导入** - 组件无需手动注册即可使用
- ✅ 路径别名 (@/) 支持
- ✅ 完整的代码规范配置（ESLint + Prettier）
- ✅ TypeScript 类型检查
- ✅ 热模块替换 (HMR)
- ✅ SCSS 样式预处理

## 自动导入说明

项目配置了 API 和组件的自动导入，无需手动编写 import 语句：

### API 自动导入

以下 API 可以直接使用，无需 import：

```vue
<script setup lang="ts">
// ❌ 不再需要这样导入
// import { ref, computed, watch } from 'vue'
// import { useRouter } from 'vue-router'
// import { defineStore } from 'pinia'

// ✅ 直接使用
const count = ref(0)
const doubled = computed(() => count.value * 2)
const router = useRouter()
</script>
```

支持的自动导入包括：

- Vue 3 所有 API（ref、reactive、computed、watch 等）
- Vue Router API（useRouter、useRoute 等）
- Pinia API（defineStore、storeToRefs 等）

### 组件自动导入

放置在 `src/components/` 目录下的组件会自动注册：

```vue
<template>
  <!-- ❌ 不再需要手动导入和注册组件 -->
  <!-- ✅ 直接使用 -->
  <MyComponent />
</template>
```

## 学习资源

- [Three.js 官方文档](https://threejs.org/docs/)
- [Vue 3 官方文档](https://cn.vuejs.org/)
- [TypeScript 官方文档](https://www.typescriptlang.org/)
