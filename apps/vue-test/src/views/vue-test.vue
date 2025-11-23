<script setup lang="ts">
import { ref } from 'vue';
import { compileVue, execVue } from '@web-test/common';
import PlayGround from '@/components/PlayGround.vue';

const codeContent = ref('');
const codeOptions = ref<any[]>([]);

const codes = import.meta.glob<string>('#/codes/vue/**/*.vue', {
  eager: true,
  query: 'raw',
  import: 'default',
});
codeOptions.value = Object.keys(codes).map((key) => ({
  value: key,
  label: key,
  content: codes[key],
}));

const styles = ref<any>([]);
function handleEval(codeStr: string) {
  const id = 'test';
  const result = compileVue(codeStr, id);
  styles.value = result.styles;
  const { render, component } = result;
  execVue(id, '#v-root', { render, component });
}
</script>

<template>
  <PlayGround v-model="codeContent" :code-options="codeOptions" :editor-options="{ language: 'html' }" @eval="handleEval">
    <div class="flex-1">
      <component is="style" v-for="styleRes in styles" v-text="styleRes.code" />
      <div id="v-root"></div>
    </div>
  </PlayGround>
</template>

<script lang="ts">
export const meta = { title: 'vue测试' };
</script>
