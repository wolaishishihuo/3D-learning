<script setup lang="ts">
interface Props {
  title?: string;
  icon?: string;
  columns?: 1 | 2;
}

withDefaults(defineProps<Props>(), {
  title: '知识点总结',
  icon: 'i-carbon-notebook',
  columns: 2
});
</script>

<template>
  <div class="bg-black/20 p-6 rounded-xl border border-white/10 backdrop-blur-sm">
    <h3 class="text-lg font-semibold text-white mb-4 flex items-center gap-2">
      <div :class="[icon, 'text-purple-400']"></div>
      {{ title }}
    </h3>

    <div class="gap-x-8 gap-y-4 text-sm text-gray-300 grid grid-cols-1 md:grid-cols-2">
      <slot></slot>
    </div>

    <!-- 提示框插槽 -->
    <div v-if="$slots.tip" class="bg-purple-500/10 p-3 rounded border border-purple-500/20 mt-4">
      <p class="text-xs text-purple-200">
        <span class="i-carbon-information-filled inline-block mr-1 align-middle"></span>
        <slot name="tip"></slot>
      </p>
    </div>
  </div>
</template>
