<template>
  <div class="demos-page relative min-h-screen overflow-hidden bg-[#000]">
    <!-- Ambient Background -->
    <div class="absolute inset-0 z-0 opacity-60">
      <Beams />
    </div>

    <!-- Main Content -->
    <div class="relative z-10 container mx-auto px-4 py-12 ">
      <!-- Header Section -->
      <div class="flex flex-col items-center justify-center mb-16 text-center">
        <h1 class="text-6xl font-extrabold tracking-tight mb-4 text-white">
          3D Learning
        </h1>
        <p class="text-lg text-gray-400 max-w-2xl mx-auto font-light tracking-wide">
          Explore the world of WebGL and Three.js through interactive examples and tutorials.
        </p>
      </div>

      <!-- Controls Section -->
      <div class="flex flex-col md:flex-row gap-6 justify-between items-center mb-12 glass-panel p-4 rounded-2xl">
        <!-- Search -->
        <div class="relative w-full md:w-96 group">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search demos..."
            class="w-full bg-white/5 border border-white/10 rounded-xl px-12 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-white/30 focus:bg-white/10 transition-all duration-300"
          />
          <div class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-white transition-colors">
            <div class="i-carbon-search text-xl" />
          </div>
        </div>

        <!-- Category Filter -->
        <div class="flex flex-wrap justify-center gap-2">
          <button
            v-for="category in categories"
            :key="category.id"
            @click="activeCategory = category.id"
            class="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 flex items-center gap-2 border"
            :class="[
              activeCategory === category.id
                ? 'bg-white text-black shadow-lg shadow-white/10'
                : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10 hover:border-white/20 hover:text-white'
            ]"
          >
            <span>{{ category.icon }}</span>
            <span>{{ category.name }}</span>
          </button>
        </div>
      </div>

      <!-- Empty State -->
      <div v-if="filteredDemos.length === 0" class="flex flex-col items-center justify-center py-20 text-gray-500">
        <div class="text-6xl mb-4 opacity-20">🔍</div>
        <p class="text-xl">No demos found matching your criteria.</p>
        <button
          @click="clearFilters"
          class="mt-4 text-white hover:text-gray-300 underline underline-offset-4 transition-colors"
        >
          Clear filters
        </button>
      </div>

      <!-- Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <div
          v-for="demo in filteredDemos"
          :key="demo.id"
          class="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden hover:bg-white/10 hover:border-white/20 transition-all duration-500 cursor-pointer flex flex-col h-full"
          @click="goToDemo(demo)"
        >
          <!-- Preview Area -->
          <div class="aspect-[16/10] relative overflow-hidden bg-gradient-to-br from-gray-900 to-black">
            <!-- Decorative Background Blob -->
            <div class="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 bg-white"></div>

            <div class="absolute inset-0 flex items-center justify-center transform group-hover:scale-105 transition-transform duration-700">
              <span class="text-6xl text-white/80 group-hover:text-white transition-colors">{{ demo.icon }}</span>
            </div>

            <!-- Level Badge -->
            <div class="absolute top-3 right-3">
              <span
                class="px-2 py-1 rounded text-xs font-bold uppercase tracking-wider border backdrop-blur-md shadow-sm"
                :class="getLevelClass(demo.level)"
              >
                {{ demo.level }}
              </span>
            </div>
          </div>

          <!-- Content -->
          <div class="p-5 flex-1 flex flex-col">
            <div class="flex justify-between items-start mb-2">
              <h3 class="text-lg font-medium text-white group-hover:text-white transition-colors">
                {{ demo.name }}
              </h3>
            </div>
            <p class="text-sm text-gray-400 line-clamp-2 mb-4 flex-1">
              {{ demo.description }}
            </p>

            <div class="flex items-center justify-between text-xs text-gray-500 border-t border-white/5 pt-4 mt-auto">
              <span class="flex items-center gap-1">
                <span class="w-1.5 h-1.5 rounded-full bg-white/60 group-hover:bg-white transition-colors"></span>
                {{ getCategoryName(demo.category) }}
              </span>
              <span class="group-hover:translate-x-1 transition-transform duration-300 text-white/60 group-hover:text-white flex items-center gap-1 font-medium">
                View Demo <div class="i-carbon-arrow-right" />
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { categories, getDemosByCategory } from '@/demos/config'
import type { DemoConfig } from '@/demos/config'
import Beams from '@/blocks/Backgrounds/Beams/Beams.vue'

const router = useRouter()
const activeCategory = ref('all')
const searchQuery = ref('')

const allDemos = computed(() => getDemosByCategory('all'))

const filteredDemos = computed(() => {
  let demos = allDemos.value

  // Filter by category
  if (activeCategory.value !== 'all') {
    demos = demos.filter(d => d.category === activeCategory.value)
  }

  // Filter by search query
  if (searchQuery.value.trim()) {
    const query = searchQuery.value.toLowerCase()
    demos = demos.filter(d =>
      d.name.toLowerCase().includes(query) ||
      d.description.toLowerCase().includes(query)
    )
  }

  return demos
})

const getLevelClass = (level: string) => {
  switch (level) {
    case '入门':
      return 'bg-white/5 border-white/10 text-gray-400'
    case '进阶':
      return 'bg-white/10 border-white/20 text-gray-300'
    case '高级':
      return 'bg-white/20 border-white/30 text-white'
    default:
      return 'bg-white/5 border-white/10 text-gray-400'
  }
}

const getCategoryName = (id: string) => {
  return categories.find(c => c.id === id)?.name || id
}

const clearFilters = () => {
  activeCategory.value = 'all'
  searchQuery.value = ''
}

const goToDemo = (demo: DemoConfig) => {
  router.push(`/demos/${demo.category}/${demo.id}`)
}
</script>

<style scoped lang="scss">
@use './index.scss';
</style>
