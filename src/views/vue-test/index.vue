<script setup lang="ts">
import { ref } from 'vue';
import PlayGround from '@/components/PlayGround.vue';
import { compile, mount } from '@/common/compileVue';
import initValue from './code.vue?raw';

const codeContent = ref(initValue);

let lastDestroy: Function;
function handleCodeStr(codeStr: string) {
  const id = 'testComp';
  if (lastDestroy) {
    lastDestroy();
  }
  const { result, destroy } = compile(codeStr, id);
  lastDestroy = destroy;
  return mount(result, '#v-root', id);
}
</script>

<template>
  <PlayGround
    v-model="codeContent"
    :editor-options="{ language: 'html' }"
    :before-eval-code="handleCodeStr"
  >
    <div id="v-root"></div>
  </PlayGround>
</template>

<script lang="ts">
export const meta = { title: 'vue测试' };
</script>
