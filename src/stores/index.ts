import { defineStore } from 'pinia';

export const useAppStore = defineStore('app', () => {
  const isLoading = ref(false);

  function setLoading(value: boolean) {
    isLoading.value = value;
  }

  return {
    isLoading,
    setLoading
  };
});
