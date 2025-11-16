<script setup lang="ts">
import { ref } from 'vue';
import PlayGround from '@/components/PlayGround.vue';
import initValue from './code.js?raw';

const codeContent = ref(initValue);
</script>

<template>
  <PlayGround v-model="codeContent">
    <div id="echarts-container" class="grow"></div>
  </PlayGround>
</template>

<script lang="ts">
export const meta = { title: 'echarts测试' };
</script>
