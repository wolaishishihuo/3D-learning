<template>
  <DemoLayout
    :title="demoConfig?.name"
    :description="demoConfig?.description"
    :level="demoConfig?.level"
  >
    <component :is="DemoComponent" v-if="DemoComponent" />
    <div v-else-if="loading" class="loading">Loading...</div>
    <div v-else class="error">Demo not found</div>
  </DemoLayout>
</template>

<script setup lang="ts">
import type { Component } from 'vue'
import DemoLayout from '@/layouts/DemoLayout/index.vue'
import { getDemoById } from '@/demos/config'

const route = useRoute()
const DemoComponent = shallowRef<Component>()
const demoConfig = ref()
const loading = ref(true)

const loadDemo = async () => {
  const demoId = route.params.id as string
  demoConfig.value = getDemoById(demoId)

  if (!demoConfig.value) {
    loading.value = false
    return
  }

  try {
    const module = await demoConfig.value.component()
    DemoComponent.value = module.default
  } catch (error) {
    console.error('Failed to load demo:', error)
  } finally {
    loading.value = false
  }
}

watch(() => route.params.id, loadDemo, { immediate: true })
</script>

<style scoped lang="scss">
.loading,
.error {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 400px;
  color: rgba(255, 255, 255, 0.6);
  font-size: 18px;
}

.error {
  color: #ff4d4f;
}
</style>
