<template>
  <div class="demos-container">
    <div class="demos-header">
      <h1 class="text-4xl font-bold tracking-tight">Demos</h1>
      <p class="text-gray-500 mt-2">Explore Three.js Examples</p>
    </div>

    <!-- Category Filter -->
    <div class="categories">
      <button
        v-for="category in categories"
        :key="category.id"
        :class="['category-btn', { active: activeCategory === category.id }]"
        @click="activeCategory = category.id"
      >
        <span class="category-icon">{{ category.icon }}</span>
        <span>{{ category.name }}</span>
      </button>
    </div>

    <!-- Demo Cards Grid -->
    <div class="demos-grid">
      <ACard
        v-for="demo in filteredDemos"
        :key="demo.id"
        class="demo-card cursor-pointer hover:shadow-md transition-shadow"
        @click="goToDemo(demo)"
      >
        <div class="demo-preview">
          <div class="preview-placeholder">
            <span class="text-4xl">{{ demo.icon }}</span>
          </div>
        </div>
        <div class="flex items-start justify-between mb-2 mt-4">
          <h3 class="text-lg font-semibold">{{ demo.name }}</h3>
          <ATag :color="getLevelColor(demo.level)">
            {{ demo.level }}
          </ATag>
        </div>
        <p class="text-gray-600">{{ demo.description }}</p>
      </ACard>
    </div>
  </div>
</template>

<script setup lang="ts">
import { demos, categories, getDemosByCategory } from '@/demos/config'
import type { DemoConfig } from '@/demos/config'

const router = useRouter()
const activeCategory = ref('all')

const filteredDemos = computed(() => getDemosByCategory(activeCategory.value))

const getLevelColor = (level: string) => {
  switch (level) {
    case '入门':
      return 'green'
    case '进阶':
      return 'blue'
    case '高级':
      return 'orange'
    default:
      return 'default'
  }
}

const goToDemo = (demo: DemoConfig) => {
  router.push(`/demos/${demo.category}/${demo.id}`)
}
</script>

<style scoped lang="scss">
@use './index.scss';
</style>
