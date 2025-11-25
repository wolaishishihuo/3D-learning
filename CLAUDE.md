# CLAUDE.md - 3D Learning 项目指南

这是一个基于 Vue 3 + TypeScript + Three.js 的 3D 可视化学习平台，采用黑暗主题设计风格。

## 常用命令

```bash
pnpm dev      # 启动开发服务器 (localhost:3000)
pnpm build    # 构建生产版本
pnpm lint     # 代码检查与修复
pnpm format   # 代码格式化
```

如遇到 Vite 缓存问题（504 Outdated Optimize Dep），运行：
```bash
rm -rf node_modules/.vite && pnpm dev
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

## 核心模式

### 1. Demo 配置驱动（学习示例）

所有 Demo 通过 `src/demos/config.ts` 统一管理：

```ts
// 添加新 Demo 示例
export const demos: DemoConfig[] = [
  {
    id: 'my-demo',           // 路由参数
    name: 'My Demo',         // 显示名称
    description: '描述',
    category: 'basics',      // 分类: basics/geometry/material/light/animation
    level: '入门',           // 难度: 入门/进阶/高级
    icon: '🎯',
    component: () => import('./basics/my-demo.vue')
  }
]
```

路由自动匹配：`/demos/:category/:id`

### 2. Project 配置驱动（实战项目）

实战项目配置在 `src/projects/config.ts` 中展示列表，路由需手动配置：

```ts
// 1. 在 config.ts 中添加项目信息（用于列表展示）
export const projects: ProjectConfig[] = [
  {
    id: 'my-project',        // 路由路径
    name: 'My Project',      // 显示名称
    description: '项目描述',
    icon: '🚀'
  }
]

// 2. 在 router/index.ts 中添加对应路由
{
  path: '/projects/my-project',
  name: 'MyProject',
  component: () => import('@/projects/my-project/index.vue')
}
```

### 3. 自动导入

- **Vue API**：`ref`, `computed`, `watch`, `onMounted` 等直接使用
- **Vue Router**：`useRouter()`, `useRoute()` 直接使用
- **Pinia**：`defineStore()` 直接使用
- **Ant Design Vue**：组件自动注册（`AButton`, `ACard`, `ATag` 等）

### 4. UnoCSS 图标

使用 `@iconify-json/carbon` 图标集：
```html
<div class="i-carbon-search" />
<div class="i-carbon-arrow-right" />
```

## 设计规范

### 主题色

- **背景色**：`#000`, `#0a0a0a`, `#0a0a0f`
- **主色调**：紫色系 `purple-500/600`
- **渐变**：`from-blue-400 via-purple-500 to-pink-500`
- **玻璃效果**：`bg-white/5`, `backdrop-blur`, `border-white/10`

### 样式约定

- 使用 UnoCSS 原子类优先
- 复杂样式使用 SCSS（`<style scoped lang="scss">`）
- 外部 SCSS 文件通过 `@use './index.scss'` 引入
- 文字颜色：`text-gray-400`（次要）, `text-white`（主要）

## 路由结构

| 路径 | 页面 | 说明 |
|------|------|------|
| `/` | Home | 首页（学习示例 + 实战项目入口） |
| `/demos` | DemoList | Demo 列表（支持搜索/筛选） |
| `/demos/:category/:id` | DemoDetail | Demo 详情（动态组件加载） |
| `/projects` | ProjectList | 实战项目列表（支持搜索） |
| `/projects/:id` | 项目组件 | 具体实战项目（直接路由到组件） |

## 添加新内容步骤

### 添加新 Demo（学习示例）

1. 在 `src/demos/{category}/` 下创建 `.vue` 文件
2. 在 `src/demos/config.ts` 的 `demos` 数组中添加配置
3. 完成！列表页自动显示，路由自动生效

### 添加新实战项目

1. 在 `src/projects/` 下创建项目文件夹（如 `my-project/`）
2. 在文件夹中创建 `index.vue` 主组件
3. 在 `src/projects/config.ts` 中添加项目信息（用于列表展示）
4. 在 `src/router/index.ts` 中添加对应路由
5. 完成！

## 技术栈速查

| 技术 | 用途 |
|------|------|
| Vue 3 + TypeScript | 框架 |
| Vite | 构建工具 |
| Three.js | 3D 渲染 |
| UnoCSS | 原子化 CSS + 图标 |
| Ant Design Vue | UI 组件库 |
| GSAP | 动画库 |
| Vue Router | 路由 |
| Pinia | 状态管理 |

## 注意事项

- Three.js 组件需要在 `onMounted` 中初始化，`onUnmounted` 中清理
- Demo 组件会被 `DemoLayout` 包裹，自带背景效果和导航
- 修改 UnoCSS 配置后需重启开发服务器
