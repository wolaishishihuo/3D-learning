<script setup lang="ts">
import { ConfigProvider, theme } from 'ant-design-vue';
</script>

<template>
  <ConfigProvider
    :theme="{
      algorithm: theme.darkAlgorithm
    }"
  >
    <div id="app">
      <router-view />
    </div>
  </ConfigProvider>
</template>
