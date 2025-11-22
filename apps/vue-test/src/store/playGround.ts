import { defineStore } from 'pinia';
import { ref } from 'vue';

export type SplitDirection = 'horizontal' | 'vertical';

export const usePlayGroundStore = defineStore(
  'playGround',
  () => {
    // 分割方向
    const splitDirection = ref<SplitDirection>('horizontal');
    // 分割尺寸
    const splitSize = ref<number>(0.4);

    function toggleDirection() {
      splitDirection.value = splitDirection.value === 'horizontal' ? 'vertical' : 'horizontal';
    }

    function setSplitSize(size: number) {
      splitSize.value = size;
    }

    return {
      splitDirection,
      splitSize,
      toggleDirection,
      setSplitSize,
    };
  },
  {
    persist: {
      key(id) {
        return `__pinia_${id}`;
      },
    },
  }
);
