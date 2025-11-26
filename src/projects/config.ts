export interface ProjectConfig {
  id: string; // 路由路径，如 'my-project' 对应 /projects/my-project
  name: string; // 项目名称
  description: string; // 项目描述
  icon: string; // 图标 emoji
}

// 实战项目配置列表（添加后需要在 router/index.ts 中配置对应路由）
export const projects: ProjectConfig[] = [
  // 示例配置：
  {
    id: 'urban-management',
    name: '城市管理',
    description: '城市管理',
    icon: '🏙️'
  },
  {
    id: 'random-terrain',
    name: '随机山脉地形',
    description: '使用 BufferGeometry 生成随机山脉地形',
    icon: '🏔️'
  }
];
