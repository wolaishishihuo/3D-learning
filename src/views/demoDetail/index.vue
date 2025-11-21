<template>
  <DemoLayout
    :title="demoConfig?.name"
    :description="demoConfig?.description"
    :level="demoConfig?.level"
  >
    <component :is="DemoComponent" v-if="DemoComponent" />
  </DemoLayout>
</template>

<script setup lang="ts">
import type { Component } from 'vue'
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
