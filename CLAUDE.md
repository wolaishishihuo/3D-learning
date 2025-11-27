# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

这是一个基于 Vue 3 + TypeScript + Three.js 的 3D 可视化学习平台，采用黑暗主题设计风格。

## 常用命令

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
│   ├── demoDetail/     # Demo 详情页（动态加载组件）
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

### 1. Demo 配置驱动（学习示例）

**重要**: 所有 Demo 通过 `src/demos/config.ts` 统一管理，路由自动生成。

添加新 Demo 的步骤：

1. 在 `src/demos/{category}/` 下创建 `.vue` 文件
2. 在 `src/demos/config.ts` 的 `demos` 数组中添加配置：

```ts
{
  id: 'my-demo',              // 路由参数
  name: 'My Demo',            // 显示名称
  description: '描述',
  category: 'basics',         // 分类: basics/camera/geometry/material/light/animation
  level: '入门',              // 难度: 入门/进阶/高级
  icon: '🎯',
  component: () => import('./basics/my-demo.vue')
}
```

路由自动匹配：`/demos/:category/:id`

### 2. Project 配置驱动（实战项目）

**重要**: 实战项目需要同时在 `src/projects/config.ts` 和 `src/router/index.ts` 中配置。

添加新实战项目的步骤：

1. 在 `src/projects/` 下创建项目文件夹（如 `my-project/`）
2. 创建 `index.vue` 主组件
3. 在 `src/projects/config.ts` 中添加项目信息（用于列表展示）：

```ts
{
  id: 'my-project',
  name: 'My Project',
  description: '项目描述',
  icon: '🚀'
}
```

4. 在 `src/router/index.ts` 中手动添加路由：

```ts
{
  path: '/projects/my-project',
  name: 'MyProject',
  component: () => import('@/projects/my-project/index.vue')
}
```

### 3. 自动导入机制

通过 `unplugin-auto-import` 和 `unplugin-vue-components` 实现零导入开发：

- **Vue API**：`ref`, `computed`, `watch`, `onMounted`, `onUnmounted` 等直接使用
- **Vue Router**：`useRouter()`, `useRoute()` 直接使用
- **Pinia**：`defineStore()` 直接使用
- **Ant Design Vue**：组件自动注册（`<AButton>`, `<ACard>`, `<ATag>` 等）

类型定义自动生成在 `types/auto-imports.d.ts` 和 `types/components.d.ts`。

### 4. UnoCSS 图标系统

使用 `@iconify-json/carbon` 图标集，通过 class 直接使用：

```html
<div class="i-carbon-search" />
<div class="i-carbon-arrow-right" />
```

## 设计规范与样式约定

### 暗黑主题配色

- **背景色**：`#000`, `#0a0a0a`, `#0a0a0f`
- **主色调**：紫色系 `purple-500/600`
- **渐变色**：`from-blue-400 via-purple-500 to-pink-500`
- **玻璃态效果**：`bg-white/5 backdrop-blur border-white/10`
- **文字颜色**：`text-gray-400`（次要）, `text-white`（主要）

### 样式编写优先级

1. **优先使用 UnoCSS 原子类**
2. **复杂样式使用 SCSS**：`<style scoped lang="scss">`
3. **外部 SCSS 导入**：使用 `@use './index.scss'` 而非 `@import`

## Three.js 组件开发规范

- **初始化**: 在 `onMounted` 钩子中初始化场景、相机、渲染器
- **清理资源**: 在 `onUnmounted` 钩子中释放几何体、材质、纹理等资源
- **布局**: Demo 组件会被 `DemoLayout` 自动包裹，提供背景效果和导航

```vue
<script setup lang="ts">
import * as THREE from 'three';

onMounted(() => {
  // 初始化 Three.js 场景
  const scene = new THREE.Scene();
  // ...
});

onUnmounted(() => {
  // 清理资源
  geometry.dispose();
  material.dispose();
  renderer.dispose();
});
</script>
```

## 开发注意事项

- **修改 UnoCSS 配置后需重启开发服务器**
- **TypeScript 工具函数**: 编写新工具函数前，先检查 `@ieedan/std` 注册表是否已有实现
- **路由别名**: `@` 指向 `src/` 目录（配置在 `vite.config.ts`）

## 路由结构

| 路径                   | 页面         | 说明                                   |
| ---------------------- | ------------ | -------------------------------------- |
| `/`                    | Home         | 首页（学习示例 + 实战项目入口）        |
| `/demos`               | DemoList     | Demo 列表（支持搜索/筛选）             |
| `/demos/:category/:id` | DemoDetail   | Demo 详情（动态组件加载）              |
| `/projects`            | ProjectList  | 实战项目列表（支持搜索）               |
| `/projects/:id`        | Project 组件 | 具体实战项目（需在 router 中手动配置） |
