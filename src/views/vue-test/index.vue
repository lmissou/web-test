<script setup lang="ts">
import { ref } from 'vue';
import PlayGround from '@/components/PlayGround.vue';
import { compile, mount } from '@/common/compileVue';

const codeContent = ref('');
const codeOptions = ref<any[]>([]);

const codes = import.meta.glob<string>('./codes/**/*.vue', {
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
function handleCodeStr(codeStr: string) {
  const id = 'testComp';
  const result = compile(codeStr, id);
  styles.value = result.styles;
  return mount(result.jscode, '#v-root', id);
}
</script>

<template>
  <PlayGround
    v-model="codeContent"
    :code-options="codeOptions"
    :editor-options="{ language: 'html' }"
    :before-eval-code="handleCodeStr"
  >
    <div class="grow">
      <component is="style" v-for="styleRes in styles" v-text="styleRes.code" />
      <div id="v-root"></div>
    </div>
  </PlayGround>
</template>

<script lang="ts">
export const meta = { title: 'vue测试' };
</script>
