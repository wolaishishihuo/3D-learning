<script setup lang="ts">
export interface CodeSnippet {
  title: string;
  code: string;
  language?: string;
}

interface Props {
  title?: string;
  icon?: string;
  snippets: CodeSnippet[];
  columns?: 1 | 2;
}

withDefaults(defineProps<Props>(), {
  title: '关键代码',
  icon: 'i-carbon-code',
  columns: 2
});
</script>

<template>
  <div class="bg-black/20 p-6 rounded-xl border border-white/10 backdrop-blur-sm">
    <h3 class="text-lg font-semibold text-white mb-4 flex items-center gap-2">
      <div :class="[icon, 'text-purple-400']"></div>
      {{ title }}
    </h3>

    <div class="gap-4" :class="columns === 2 ? 'grid grid-cols-1 lg:grid-cols-2' : 'flex flex-col'">
      <div
        v-for="(snippet, index) in snippets"
        :key="index"
        class="rounded-lg overflow-hidden border border-white/10 bg-[#282c34]"
      >
        <div class="bg-white/5 px-4 py-2 text-xs text-gray-400 border-b border-white/10">
          {{ snippet.title }}
        </div>
        <highlightjs :language="snippet.language || 'javascript'" :code="snippet.code" />
      </div>
    </div>
  </div>
</template>

