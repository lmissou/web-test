<script setup lang="ts">
import { ref } from 'vue';
import PlayGround from '@/components/PlayGround.vue';

const codeContent = ref('');
const codeOptions = ref<any[]>([]);

const codes = import.meta.glob<string>('./codes/**/*.js', {
  eager: true,
  query: 'raw',
  import: 'default',
});
codeOptions.value = Object.keys(codes).map((key) => ({
  value: key,
  label: key,
  content: codes[key],
}));
</script>

<template>
  <PlayGround v-model="codeContent" :code-options="codeOptions">
    <div id="echarts-container" class="grow"></div>
  </PlayGround>
</template>

<script lang="ts">
export const meta = { title: 'echarts测试' };
</script>
