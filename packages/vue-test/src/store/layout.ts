import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useLayoutStore = defineStore(
  'layout',
  () => {
    const siderCollapsed = ref<boolean>(false);
    return { siderCollapsed };
  },
  {
    persist: {
      key(id) {
        return `__pinia_${id}`;
      },
    },
  }
);
