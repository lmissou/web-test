<script setup lang="ts">
import { ref } from 'vue';
import PlayGround from '@/components/PlayGround.vue';
import initValue from './code.js?raw';

const codeContent = ref(initValue);
</script>

<template>
  <PlayGround v-model="codeContent">
    <div id="g6-container" class="grow"></div>
  </PlayGround>
</template>

<script lang="ts">
export const meta = { title: 'antv/g6测试' };
</script>
