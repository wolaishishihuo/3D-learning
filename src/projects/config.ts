export interface ProjectConfig {
  id: string; // 路由路径，如 'my-project' 对应 /projects/my-project
  name: string; // 项目名称
  description: string; // 项目描述
  icon: string; // 图标 emoji
}

// 实战项目配置列表（添加后需要在 router/index.ts 中配置对应路由）
export const projects: ProjectConfig[] = [
  {
    id: 'random-terrain',
    name: '随机山脉地形',
    description: '使用 BufferGeometry 生成随机山脉地形',
    icon: '🏔️'
  },
  // {
  //   id: 'urban-management',
  //   name: '城市管理',
  //   description: '城市管理',
  //   icon: '🏙️'
  // },
  {
    id: 'cloud-thunder-pattern',
    name: '实战: 云雷纹',
    description: '实战: 云雷纹',
    icon: '⚡'
  },
  {
    id: 'tunnel-shuttle',
    name: '实战: 隧道穿梭',
    description: '使用 Three.js 实现隧道穿梭效果',
    icon: '🚇'
  },
  {
    id: 'infinite-tunnel',
    name: 'UV 动画实战: 无限时空隧道',
    description: '使用纹理动画实现无限时空隧道效果',
    icon: '🌀'
  },
  {
    id: 'build-house',
    name: '实战: 盖房子',
    description: '使用几何体组合构建房屋模型',
    icon: '🏠'
  },
  {
    id: 'color-gradient-chart',
    name: '实战: 颜色渐变柱状图',
    description: '使用顶点颜色实现数据可视化的颜色渐变柱状图',
    icon: '📊'
  }
];
