<script setup lang="ts">
import { ConfigProvider, theme } from 'ant-design-vue'
</script>

<template>
  <ConfigProvider
    :theme="{
      algorithm: theme.darkAlgorithm
    }"
  >
    <router-view />
  </ConfigProvider>
</template>
