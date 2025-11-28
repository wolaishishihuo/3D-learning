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

**项目自定义组件和 Composables 也会自动导入**，无需手动 import：

- **自定义组件**：`Summary`, `SummaryItem`, `CodeBlock`, `Code`, `SceneCard` 等可直接在模板中使用
- **Composables**：`useThreeScene` 等可直接在 script 中调用

### 4. 项目自定义组件 API

#### Summary - 知识总结容器

用于展示结构化的知识点总结。

```vue
<Summary
  title="知识点总结"           <!-- 可选，默认: "知识点总结" -->
  icon="i-carbon-notebook"     <!-- 可选，默认: "i-carbon-notebook" -->
  :columns="2"                 <!-- 可选，1 或 2，默认: 2 -->
>
  <SummaryItem title="知识点1">描述内容</SummaryItem>
  <SummaryItem title="知识点2">描述内容</SummaryItem>

  <!-- 可选：提示信息插槽 -->
  <template #tip>
    <strong>提示：</strong>补充说明或最佳实践
  </template>
</Summary>
```

**Props**:

- `title`: 标题文本
- `icon`: UnoCSS 图标类名
- `columns`: 网格列数（1 或 2）

**Slots**:

- `default`: 放置 `SummaryItem` 子组件
- `tip`: 底部提示信息区域

#### SummaryItem - 知识点条目

配合 `Summary` 使用，展示单个知识点。

```vue
<SummaryItem title="知识点标题">
  描述内容，可以使用 <Code>API</Code> 组件高亮关键词。
</SummaryItem>
```

**Props**:

- `title` (必填): 知识点标题

#### CodeBlock - 代码片段展示

用于展示多个带语法高亮的代码片段。

```vue
<script setup lang="ts">
import type { CodeSnippet } from '@/components/CodeBlock/index.vue';

const codeSnippets: CodeSnippet[] = [
  {
    title: '初始化场景',
    code: `const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, width / height);`,
    language: 'typescript' // 可选，默认: 'javascript'
  },
  {
    title: '添加网格',
    code: `const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });`,
    language: 'typescript'
  }
];
</script>

<template>
  <CodeBlock
    title="关键代码"              <!-- 可选，默认: "关键代码" -->
    icon="i-carbon-code"         <!-- 可选，默认: "i-carbon-code" -->
    :columns="2"                 <!-- 可选，1 或 2，默认: 2 -->
    :snippets="codeSnippets"
  />
</template>
```

**Props**:

- `title`: 标题文本
- `icon`: UnoCSS 图标类名
- `columns`: 网格列数（1 或 2）
- `snippets` (必填): 代码片段数组

**CodeSnippet 类型**:

```ts
interface CodeSnippet {
  title: string; // 片段标题
  code: string; // 代码内容
  language?: string; // 语言类型，默认 'javascript'
}
```

#### Code - 行内代码高亮

用于在文本中高亮显示代码片段或 API 名称。

```vue
<p>使用 <Code>THREE.Scene</Code> 创建场景，调用 <Code>scene.add()</Code> 添加对象。</p>
```

**样式**: 紫色背景 + 圆角 + 小字体

#### SceneCard - 场景卡片容器

提供带全屏功能的 Three.js 场景容器。

```vue
<script setup lang="ts">
const sceneCardRef = ref();

onMounted(() => {
  // 通过 ref 访问内部容器
  const container = sceneCardRef.value.container;

  // 初始化 Three.js 场景
  const scene = new THREE.Scene();
  // ...
});
</script>

<template>
  <SceneCard
    ref="sceneCardRef"
    title="场景标题"        <!-- 可选，默认无标题 -->
    height="500px"         <!-- 可选，默认: "400px" -->
  >
    <!-- 场景内容会被自动附加到容器中 -->
  </SceneCard>
</template>
```

**Props**:

- `title`: 可选标题，显示在顶部
- `height`: 容器高度（非全屏时）

**Expose**:

- `container`: 内部容器的 ref，用于挂载 Three.js 渲染器

**功能**:

- 鼠标悬浮显示全屏按钮
- 点击全屏按钮切换全屏模式
- 全屏时自动充满视口

### 5. Composables (Hooks)

#### useThreeScene - Three.js 场景初始化

自动化 Three.js 场景初始化，包含场景、相机、渲染器、控制器，并处理响应式尺寸调整。

```vue
<script setup lang="ts">
import { useThreeScene } from '@/composables/useThreeScene';

const containerRef = ref<HTMLDivElement>();

onMounted(() => {
  const { scene, camera, renderer, controls, cleanup } = useThreeScene(containerRef.value!, {
    cameraPosition: [0, 20, 50], // 可选，默认: [0, 20, 50]
    cameraLookAt: [0, 0, 0], // 可选，默认: [0, 0, 0]
    showAxesHelper: true, // 可选，默认: true
    showGridHelper: true, // 可选，默认: true
    backgroundColor: 0x000000, // 可选，默认: 0x000000
    fov: 45 // 可选，默认: 45
  });

  // 添加自定义对象到场景
  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
  const cube = new THREE.Mesh(geometry, material);
  scene.add(cube);

  // 组件卸载时清理资源
  onUnmounted(() => {
    cleanup();
  });
});
</script>

<template>
  <div ref="containerRef" class="canvas-container"></div>
</template>
```

**参数**:

- `container` (必填): HTMLElement，用于挂载渲染器
- `options` (可选): 配置对象

**Options 配置**:

```ts
interface ThreeSceneOptions {
  cameraPosition?: [number, number, number]; // 相机位置
  cameraLookAt?: [number, number, number]; // 相机朝向
  showAxesHelper?: boolean; // 显示坐标轴
  showGridHelper?: boolean; // 显示网格
  backgroundColor?: number; // 背景颜色
  fov?: number; // 视场角
}
```

**返回值**:

```ts
{
  scene: THREE.Scene;              // 场景对象
  camera: THREE.PerspectiveCamera; // 相机对象
  renderer: THREE.WebGLRenderer;   // 渲染器对象
  controls: OrbitControls;         // 轨道控制器
  cleanup: () => void;             // 清理函数，必须在 onUnmounted 中调用
}
```

**特性**:

- ✅ 自动设置渲染循环
- ✅ 自动处理容器尺寸变化（响应式）
- ✅ 自动启用阻尼效果的轨道控制器
- ✅ 可选显示坐标轴和网格辅助线
- ⚠️ **必须调用 `cleanup()` 清理资源，避免内存泄漏**

### 6. UnoCSS 图标系统

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

### Demo 页面内容组织规范

每个 Demo 页��应包含以下结构化内容：

#### 1. 使用 Summary 和 SummaryItem 组件展示知识总结

```vue
<Summary title="知识点总结标题">
  <SummaryItem title="知识点1">
    知识点描述，可以使用 <Code>代码片段</Code> 组件高亮关键 API 或属性名。
  </SummaryItem>
  <SummaryItem title="知识点2">
    多行描述示例。可以在描述中穿插 <Code>API</Code> 或 <Code>属性</Code>。
  </SummaryItem>

  <!-- 可选：添加提示信息 -->
  <template #tip>
    <strong>重要提示：</strong>补充说明或常用技巧。
  </template>
</Summary>
```

#### 2. 使用 CodeBlock 组件展示代码片段

在 `<script setup>` 中定义代码片段数组：

```ts
const codeSnippets = [
  {
    title: '代码片段1标题',
    code: `// 完整的代码示例
const example = 'code here';
// 使用反引号支持多行代码`
  },
  {
    title: '代码片段2标题',
    code: `// 另一个代码示例
// 建议按照功能模块划分代码片段`
  }
];
```

在模板中使用：

```vue
<CodeBlock title="关键代码" :snippets="codeSnippets" />
```

#### 3. 完整页面结构示例

```vue
<template>
  <div class="demo-scene flex flex-col gap-6">
    <!-- Three.js 场景容器 -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <div ref="containerRef" class="canvas-container"></div>
    </div>

    <!-- 知识总结 -->
    <Summary title="知识点总结">
      <SummaryItem title="概念1">描述内容</SummaryItem>
      <SummaryItem title="概念2">描述内容</SummaryItem>
      <template #tip> <strong>提示：</strong>补充说明 </template>
    </Summary>

    <!-- 代码片段 -->
    <CodeBlock title="关键代码" :snippets="codeSnippets" />
  </div>
</template>

<script setup lang="ts">
const codeSnippets = [{ title: '标题', code: `代码内容` }];
</script>
```

**注意事项**：

- 使用 `<Code>` 组件包裹 API 名称、属性名、类名等关键代码标识
- 代码片段应按照逻辑功能分组，每个片段聚焦一个特定知识点
- `Summary` 的 `#tip` 插槽用于补充重要提示或最佳实践

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

## 学习资源

- [Three.js 文档](https://threejs.org/docs/)
- [Vue 3 文档](https://cn.vuejs.org/)
- [TypeScript 文档](https://www.typescriptlang.org/)

## License

MIT
