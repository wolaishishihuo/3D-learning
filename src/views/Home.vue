<template>
  <div class="home">
    <div class="hero">
      <h1>欢迎来到 Three.js 学习项目</h1>
      <p>基于 Vue 3 + TypeScript + Three.js 的 3D 可视化学习平台</p>
      <div class="features">
        <div class="feature-card">
          <h3>🎨 Three.js</h3>
          <p>强大的 3D 渲染库</p>
        </div>
        <div class="feature-card">
          <h3>⚡ Vue 3</h3>
          <p>最新的 Vue 3 Composition API</p>
        </div>
        <div class="feature-card">
          <h3>🔷 TypeScript</h3>
          <p>类型安全的开发体验</p>
        </div>
        <div class="feature-card">
          <h3>🚀 Vite</h3>
          <p>极速的开发构建工具</p>
        </div>
      </div>
      <div class="cta">
        <router-link to="/basic-scene" class="btn-primary"> 开始学习 </router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.home {
  max-width: 1200px;
  margin: 0 auto;
}

.hero {
  text-align: center;
  padding: 3rem 1rem;

  h1 {
    font-size: 3rem;
    margin-bottom: 1rem;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  p {
    font-size: 1.25rem;
    color: #666;
    margin-bottom: 3rem;
  }
}

.features {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
}

.feature-card {
  padding: 2rem;
  border-radius: 12px;
  background: white;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition:
    transform 0.3s,
    box-shadow 0.3s;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 12px rgba(0, 0, 0, 0.15);
  }

  h3 {
    font-size: 1.5rem;
    margin-bottom: 0.5rem;
  }

  p {
    color: #666;
  }
}

.cta {
  margin-top: 2rem;
}

.btn-primary {
  display: inline-block;
  padding: 1rem 2rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  text-decoration: none;
  border-radius: 8px;
  font-size: 1.1rem;
  transition:
    transform 0.3s,
    box-shadow 0.3s;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
  }
}
</style>
