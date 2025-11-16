<script setup lang="ts">
import { nextTick, onMounted, ref } from 'vue';
import { NSplit, NSelect, NIcon } from 'naive-ui';
import { Sort, VideoPlay } from '@element-plus/icons-vue';
import MonacoEditor from './MonacoEditor.vue';
import { usePlayGroundStore } from '@/store/playGround';
import { storeToRefs } from 'pinia';

const props = withDefaults(
  defineProps<{
    // 编辑器配置选项
    editorOptions?: any;
    // 代码执行前的处理函数
    beforeEvalCode?: (code: string) => string;
    // 代码选项列表
    codeOptions?: any[];
  }>(),
  {
    editorOptions: () => ({}),
    codeOptions: () => [],
  }
);
const modelValue = defineModel<string>({ default: '' });
// 分割方向
const { splitDirection, splitSize } = storeToRefs(usePlayGroundStore());
const { toggleDirection } = usePlayGroundStore();

// 刷新默认插槽（清空插槽dom，重新初始化）
const showDefSlot = ref(true);
function refreshDefSlot() {
  showDefSlot.value = false;
  nextTick(() => {
    showDefSlot.value = true;
  });
}
// 执行代码
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
// 代码选择
const codeSelect = ref('');
if (props.codeOptions.length > 0) {
  codeSelect.value = props.codeOptions[0].value;
  modelValue.value = props.codeOptions[0].content;
}
function handleCodeChange(_value: string, option: any) {
  modelValue.value = option.content;
}

onMounted(() => {
  evalScript(modelValue.value);
});
</script>

<template>
  <div class="flex flex-col flex-1 overflow-auto">
    <div class="flex flex-row justify-between items-center mb-1 text-base">
      <div class="flex flex-row justify-end items-center gap-1">
        <NSelect
          v-if="props.codeOptions.length > 0"
          v-model:value="codeSelect"
          size="small"
          style="width: 200px"
          :options="props.codeOptions"
          @update-value="handleCodeChange"
        />
      </div>
      <div class="flex flex-row justify-end items-center gap-1">
        <NIcon @click="toggleDirection">
          <Sort
            class="transition-transform"
            :style="{
              transform: `rotate(${splitDirection === 'vertical' ? 0 : 90}deg)`,
            }"
          />
        </NIcon>
        <NIcon @click="evalScript(modelValue)">
          <VideoPlay />
        </NIcon>
      </div>
    </div>
    <NSplit
      class="overflow-auto"
      pane1-class="flex flex-col"
      pane2-class="flex flex-col"
      :direction="splitDirection"
      v-model:size="splitSize"
    >
      <template #1>
        <MonacoEditor
          v-model="modelValue"
          :editorOptions="props.editorOptions"
        />
      </template>
      <template #2>
        <div class="flex flex-col flex-1 overflow-auto">
          <slot name="default" v-if="showDefSlot" />
        </div>
      </template>
    </NSplit>
  </div>
</template>
