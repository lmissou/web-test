<script setup lang="ts">
import { useLayoutStore } from '@/store/layout';
import { NLayout, NLayoutContent, NLayoutHeader, NLayoutSider } from 'naive-ui';
import { storeToRefs } from 'pinia';

const { siderCollapsed } = storeToRefs(useLayoutStore());
</script>

<template>
  <NLayout content-class="flex flex-col">
    <NLayoutHeader class="flex flex-row items-center min-h-10 px-4" bordered> 代码测试 </NLayoutHeader>
    <NLayout class="bg-[#f3f3f3]" has-sider content-class="">
      <NLayoutSider show-trigger="arrow-circle" :collapsed-width="0" v-model:collapsed="siderCollapsed">
        <slot name="aside" />
      </NLayoutSider>
      <NLayoutContent content-class="flex flex-col p-[10px] bg-[#f3f3f3]">
        <div class="flex flex-col flex-1 p-2.5 overflow-auto rounded-md bg-white">
          <slot name="default" />
        </div>
      </NLayoutContent>
    </NLayout>
  </NLayout>
</template>
