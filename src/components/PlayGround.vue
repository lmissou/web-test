<script setup lang="ts">
import { nextTick, onMounted, ref } from 'vue';
import * as monaco from 'monaco-editor';
import EditorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker';
import TsWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker';
import HtmlWorker from 'monaco-editor/esm/vs/language/html/html.worker?worker';
import { NButton, NButtonGroup, NSplit } from 'naive-ui';

const props = defineProps<{
  editorOptions?: any;
  beforeEvalCode?: (code: string) => string;
}>();
const modelValue = defineModel<string>({ default: '' });

if (!window.MonacoEnvironment) {
  window.MonacoEnvironment = {
    getWorker(_workerId, label) {
      if (label === 'javascript' || label === 'typescript') {
        return new TsWorker();
      }
      if (label === 'html') {
        return new HtmlWorker();
      }
      return new EditorWorker();
    },
  };
}
const defaultOptions = {
  automaticLayout: true,
  tabSize: 2,
  language: 'javascript',
};

let editor: monaco.editor.IStandaloneCodeEditor;

const editorDom = ref<HTMLDivElement>();

function initEditor() {
  if (editor) {
    return;
  }
  editor = monaco.editor.create(
    editorDom.value!,
    Object.assign({ ...defaultOptions }, props.editorOptions)
  );
  editor.setValue(modelValue.value);
  editor.onDidChangeModelContent(() => {
    modelValue.value = editor.getValue();
  });
}
const showDefSlot = ref(true);
function refreshDefSlot() {
  showDefSlot.value = false;
  nextTick(() => {
    showDefSlot.value = true;
  })
}
function evalScript(codeStr: string) {
  refreshDefSlot();
  const scriptDom = document.createElement('script');
  scriptDom.type = 'module';
  if (props.beforeEvalCode) {
    scriptDom.innerHTML = props.beforeEvalCode(codeStr);
  } else {
    scriptDom.innerHTML = codeStr;
  }
  document.head.append(scriptDom);
  document.head.removeChild(scriptDom);
}

onMounted(() => {
  initEditor();
  evalScript(modelValue.value);
});
</script>

<template>
  <div class="flex flex-col grow">
    <NButtonGroup size="small">
      <NButton text @click="evalScript(modelValue)">运行</NButton>
    </NButtonGroup>
    <NSplit pane1-class="flex flex-col" pane2-class="flex flex-col">
      <template #1>
        <div ref="editorDom" class="grow"></div>
      </template>
      <template #2>
        <slot name="default" v-if="showDefSlot" />
      </template>
    </NSplit>
  </div>
</template>
