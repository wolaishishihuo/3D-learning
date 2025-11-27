<script setup lang="ts">
import { useFullscreen } from '@vueuse/core';

interface Props {
  title?: string;
  height?: string;
}

withDefaults(defineProps<Props>(), {
  height: '400px',
  title: ''
});

const cardRef = ref<HTMLDivElement | null>(null);
const containerRef = ref<HTMLDivElement | null>(null);
const { isFullscreen, toggle } = useFullscreen(cardRef);

// 暴露容器 ref 给父组件
defineExpose({
  container: containerRef
});
</script>

<template>
  <div
    ref="cardRef"
    class="group relative flex flex-col overflow-hidden rounded-xl border border-solid border-white/10 bg-[#1e1e1e] transition-colors duration-300 hover:border-white/30"
    :class="{ 'fixed inset-0 z-50 h-screen w-screen rounded-none': isFullscreen }"
  >
    <!-- 可选标题 -->
    <div v-if="title" class="border-b border-solid border-white/10 bg-white/5 p-4">
      <h3 class="m-0 text-base font-semibold text-white">{{ title }}</h3>
    </div>

    <!-- 全屏按钮 -->
    <button
      class="absolute right-3 top-3 z-10 flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg border-none bg-white/10 text-white opacity-0 backdrop-blur transition-all hover:bg-white/20 group-hover:opacity-100"
      :class="{ 'opacity-100': isFullscreen }"
      @click="toggle"
    >
      <div :class="isFullscreen ? 'i-carbon-minimize' : 'i-carbon-maximize'" />
    </button>

    <!-- 内容容器 -->
    <div
      ref="containerRef"
      class="relative w-full"
      :class="isFullscreen ? 'flex-1' : ''"
      :style="{ height: isFullscreen ? 'auto' : height }"
    >
      <slot></slot>
    </div>
  </div>
</template>
