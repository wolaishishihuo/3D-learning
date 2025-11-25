<template>
  <div class="projects-page relative min-h-screen overflow-hidden bg-[#000]">
    <!-- Ambient Background -->
    <div class="absolute inset-0 z-0 opacity-60">
      <Beams />
    </div>

    <!-- Main Content -->
    <div class="relative z-10 container mx-auto px-4 py-12">
      <!-- Header Section -->
      <div class="flex flex-col items-center justify-center mb-16 text-center">
        <div class="text-6xl mb-4">🚀</div>
        <h1 class="text-6xl font-extrabold tracking-tight mb-4 text-white">实战项目</h1>
        <p class="text-lg text-gray-400 max-w-2xl mx-auto font-light tracking-wide">
          综合性完整项目实战，从简单到复杂，提升你的 Three.js 实战能力
        </p>
      </div>

      <!-- Search -->
      <div class="flex justify-center mb-12">
        <div class="relative w-full md:w-96 group">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="搜索实战项目..."
            class="w-full bg-white/5 border border-white/10 rounded-xl px-12 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-white/30 focus:bg-white/10 transition-all duration-300"
          />
          <div
            class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-white transition-colors"
          >
            <div class="i-carbon-search text-xl" />
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div
        v-if="filteredProjects.length === 0"
        class="flex flex-col items-center justify-center py-20 text-gray-500"
      >
        <div class="text-6xl mb-4 opacity-20">📦</div>
        <p class="text-xl">{{ searchQuery ? '未找到匹配的项目' : '暂无实战项目' }}</p>
        <p class="text-sm mt-2">
          {{ searchQuery ? '尝试其他关键词' : '开始创建你的第一个实战项目吧！' }}
        </p>
      </div>

      <!-- Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="project in filteredProjects"
          :key="project.id"
          class="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden hover:bg-white/10 hover:border-white/20 transition-all duration-500 cursor-pointer"
          @click="goToProject(project)"
        >
          <!-- Preview Area -->
          <div
            class="aspect-[16/10] relative overflow-hidden bg-gradient-to-br from-gray-900 to-black"
          >
            <div
              class="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500"
            ></div>

            <div
              class="absolute inset-0 flex items-center justify-center transform group-hover:scale-110 transition-transform duration-700"
            >
              <span class="text-7xl text-white/80 group-hover:text-white transition-colors">
                {{ project.icon }}
              </span>
            </div>
          </div>

          <!-- Content -->
          <div class="p-5">
            <h3 class="text-xl font-bold text-white mb-2">{{ project.name }}</h3>
            <p class="text-sm text-gray-400 mb-4 line-clamp-2">{{ project.description }}</p>

            <div class="flex items-center justify-end text-xs border-t border-white/5 pt-4">
              <span
                class="group-hover:translate-x-1 transition-transform duration-300 text-white/60 group-hover:text-white flex items-center gap-1 font-medium"
              >
                查看项目
                <div class="i-carbon-arrow-right" />
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { projects } from '@/projects/config'
import type { ProjectConfig } from '@/projects/config'
import Beams from '@/blocks/Backgrounds/Beams/Beams.vue'

const router = useRouter()
const searchQuery = ref('')

const filteredProjects = computed(() => {
  if (!searchQuery.value.trim()) {
    return projects
  }

  const query = searchQuery.value.toLowerCase()
  return projects.filter(
    p => p.name.toLowerCase().includes(query) || p.description.toLowerCase().includes(query)
  )
})

const goToProject = (project: ProjectConfig) => {
  router.push(`/projects/${project.id}`)
}
</script>

<style scoped lang="scss">
@use './index.scss';
</style>
