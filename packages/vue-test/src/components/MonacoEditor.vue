<script setup lang="ts">
import { onMounted, ref, shallowRef, watch } from 'vue';
import * as monaco from 'monaco-editor';
import '@/common/initMonaco';

const props = withDefaults(
  defineProps<{
    editorOptions?: any;
  }>(),
  {
    editorOptions: () => ({}),
  }
);
const modelValue = defineModel<string>({ default: '' });

const defaultOptions = {
  automaticLayout: true,
  tabSize: 2,
  language: 'javascript',
};

const editor = shallowRef<monaco.editor.IStandaloneCodeEditor>();

const editorDom = ref<HTMLDivElement>();

function initEditor() {
  if (editor.value) {
    return;
  }
  editor.value = monaco.editor.create(
    editorDom.value!,
    Object.assign({ ...defaultOptions }, props.editorOptions)
  );
  watch(
    () => modelValue.value,
    (val) => {
      const editorValue = editor.value?.getValue();
      if (editorValue === val) {
        return;
      }
      editor.value?.setValue(modelValue.value);
    },
    {
      immediate: true,
    }
  );
  editor.value?.onDidChangeModelContent(() => {
    modelValue.value = editor.value?.getValue() ?? '';
  });
}
onMounted(() => {
  initEditor();
});

defineExpose({
  editor,
});
</script>

<template>
  <div ref="editorDom" class="flex-1 min-w-0 min-h-0"></div>
</template>
