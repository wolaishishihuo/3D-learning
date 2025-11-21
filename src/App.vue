<template>
  <div id="app">
    <nav class="navbar">
      <div class="nav-brand">Three.js Learning</div>
      <div class="nav-links">
        <router-link to="/">首页</router-link>
        <router-link to="/basic-scene">基础场景</router-link>
      </div>
    </nav>
    <main class="main-content">
      <router-view />
    </main>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 2rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.nav-brand {
  font-size: 1.5rem;
  font-weight: bold;
}

.nav-links {
  display: flex;
  gap: 2rem;

  a {
    color: white;
    text-decoration: none;
    transition: opacity 0.3s;

    &:hover,
    &.router-link-active {
      opacity: 0.8;
      text-decoration: underline;
    }
  }
}

.main-content {
  padding: 2rem;
}
</style>
