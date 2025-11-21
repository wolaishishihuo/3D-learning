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
# 安装依赖
pnpm install

# 启动开发服务器
pnpm dev

# 构建生产版本
pnpm build
```

访问 http://localhost:3000

## 技术栈

| 核心 | UI/样式 | 工具链 |
|------|---------|--------|
| Vue 3 | Ant Design Vue | Vite |
| TypeScript | UnoCSS | ESLint + Prettier |
| Three.js | SCSS | Husky + Commitlint |
| Vue Router | GSAP | unplugin-auto-import |
| Pinia | | unplugin-vue-components |

## 项目结构

```
src/
├── demos/           # Three.js 示例（按分类组织）
│   ├── config.ts    # Demo 配置中心
│   ├── basics/      # 基础示例
│   ├── geometry/    # 几何体
│   ├── material/    # 材质
│   ├── light/       # 光照
│   └── animation/   # 动画
├── views/           # 页面
├── layouts/         # 布局组件
├── blocks/          # 可复用 UI 块
├── router/          # 路由配置
└── stores/          # 状态管理
```

## 添加新示例

1. 在 `src/demos/{category}/` 创建组件
2. 在 `src/demos/config.ts` 添加配置：

```ts
{
  id: 'my-demo',
  name: 'My Demo',
  description: '示例描述',
  category: 'basics',
  level: '入门',
  icon: '🎯',
  component: () => import('./basics/my-demo.vue')
}
```

## 开发规范

### 自动导入

Vue、Vue Router、Pinia API 无需手动导入：

```vue
<script setup lang="ts">
// 直接使用
const count = ref(0)
const router = useRouter()
</script>
```

### 提交规范

```bash
git commit -m "✨ feat: 添加新功能"
git commit -m "🐛 fix: 修复问题"
git commit -m "📝 docs: 更新文档"
```

支持的类型：`feat` `fix` `docs` `style` `refactor` `perf` `test` `chore`

## 学习资源

- [Three.js 文档](https://threejs.org/docs/)
- [Vue 3 文档](https://cn.vuejs.org/)
- [TypeScript 文档](https://www.typescriptlang.org/)

## License

MIT
