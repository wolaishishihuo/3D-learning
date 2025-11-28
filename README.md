# 3D Learning

基于 Vue 3 + TypeScript + Three.js 的交互式 3D 可视化学习平台

![Vue](https://img.shields.io/badge/Vue-3.5-4FC08D?logo=vue.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?logo=typescript)
![Three.js](https://img.shields.io/badge/Three.js-0.178-000000?logo=three.js)
![Vite](https://img.shields.io/badge/Vite-6.4-646CFF?logo=vite)

## 特性

- **渐进式学习** - 从基础到高级的 Three.js 示例
- **交互式演示** - 可视化理解 3D 概念
- **现代技术栈** - Vue 3 Composition API + TypeScript
- **精美暗黑主题** - 沉浸式学习体验
- **零配置开发** - API 和组件自动导入

## 快速开始

```bash
pnpm dev         # 启动开发服务器 (localhost:3000)
pnpm build       # 构建生产版本 (TypeScript check + Vite build)
pnpm preview     # 预览生产构建
pnpm lint        # ESLint 检查与修复
pnpm format      # Prettier 格式化
```

**Vite 缓存问题**: 遇到 "504 Outdated Optimize Dep" 错误时：

```bash
rm -rf node_modules/.vite && pnpm dev
```

**Git 提交规范**: 使用 Husky + Commitlint，提交信息必须符合 conventional commits 格式：

```bash
git commit -m "✨ feat: 添加新功能"
git commit -m "🐛 fix: 修复问题"
git commit -m "📝 docs: 更新文档"
# 支持的类型: feat, fix, docs, style, refactor, perf, test, chore, cleanup
```

## 项目架构

```
src/
├── demos/              # Demo 示例组件（学习示例）
│   ├── config.ts       # Demo 配置中心（重要！）
│   ├── basics/         # 基础示例
│   ├── geometry/       # 几何体示例
│   ├── material/       # 材质示例
│   ├── light/          # 光照示例
│   └── animation/      # 动画示例
├── projects/           # 实战项目（独立架构）
│   └── config.ts       # 实战项目配置（列表展示用）
├── views/
│   ├── home/           # 首页
│   ├── demoList/       # Demo 列表页（带搜索和分类筛选）
│   ├── demoDetail/     # Demo 详情页（动态组件加载）
│   └── projectList/    # 实战项目列表页
├── layouts/
│   └── DemoLayout/     # Demo 展示布局（含背景动画、导航）
├── blocks/
│   └── Backgrounds/    # 背景效果组件（Beams, DotGrid）
├── router/             # 路由配置
├── stores/             # Pinia 状态管理
└── styles/             # 全局样式
```

## 核心架构模式

### Demo 配置驱动（学习示例）

所有 Demo 通过 `src/demos/config.ts` 统一管理，路由自动生成。添加新 Demo 只需：

1. 在对应分类目录下创建 `.vue` 文件
2. 在 `config.ts` 中添加配置项

路由自动匹配：`/demos/:category/:id`

### Project 配置驱动（实战项目）

实战项目需要同时在 `src/projects/config.ts` 和 `src/router/index.ts` 中配置。

### 自动导入机制

通过 `unplugin-auto-import` 和 `unplugin-vue-components` 实现零导入开发：

- **Vue API**：`ref`, `computed`, `watch`, `onMounted` 等直接使用
- **Vue Router**：`useRouter()`, `useRoute()` 直接使用
- **Pinia**：`defineStore()` 直接使用
- **Ant Design Vue**：组件自动注册
- **项目自定义组件和 Composables**：自动导入，无需手动 import

类型定义自动生成在 `types/auto-imports.d.ts` 和 `types/components.d.ts`。

## 技术栈

- **框架**: Vue 3 + TypeScript + Vite
- **3D 引擎**: Three.js
- **UI 组件**: Ant Design Vue
- **样式**: UnoCSS + SCSS
- **状态管理**: Pinia
- **路由**: Vue Router
- **代码规范**: ESLint + Prettier + Husky + Commitlint

## 路由结构

| 路径                   | 页面         | 说明                                   |
| ---------------------- | ------------ | -------------------------------------- |
| `/`                    | Home         | 首页（学习示例 + 实战项目入口）        |
| `/demos`               | DemoList     | Demo 列表（支持搜索/筛选）             |
| `/demos/:category/:id` | DemoDetail   | Demo 详情（动态组件加载）              |
| `/projects`            | ProjectList  | 实战项目列表（支持搜索）               |
| `/projects/:id`        | Project 组件 | 具体实战项目（需在 router 中手动配置） |

## 开发文档

详细的组件 API、Composables 使用说明、开发规范等内容请参考 [CLAUDE.md](./CLAUDE.md)。

## 学习资源

- [Three.js 文档](https://threejs.org/docs/)
- [Vue 3 文档](https://cn.vuejs.org/)
- [TypeScript 文档](https://www.typescriptlang.org/)

## License

MIT
