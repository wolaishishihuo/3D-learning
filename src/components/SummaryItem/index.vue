<script setup lang="ts">
interface Props {
  title: string;
}

defineProps<Props>();
</script>

<template>
  <div>
    <h4 class="text-purple-300 font-medium mb-1">{{ title }}</h4>
    <p><slot></slot></p>
  </div>
</template>
