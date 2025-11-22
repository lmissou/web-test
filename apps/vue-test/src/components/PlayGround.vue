<script setup lang="ts">
import { nextTick, onMounted, ref } from 'vue';
import { NSplit, NSelect, NIcon, NDropdown } from 'naive-ui';
import { More, Sort, VideoPlay } from '@element-plus/icons-vue';
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
const emits = defineEmits<{
  // 运行代码事件
  (event: 'eval', code: string): void;
}>();
const editorRef = ref<InstanceType<typeof MonacoEditor>>();
const modelValue = defineModel<string>({ default: '' });
// 代码选择
const codeSelect = ref('');
if (props.codeOptions.length > 0) {
  codeSelect.value = props.codeOptions[0].value;
  modelValue.value = props.codeOptions[0].content;
}
function handleCodeChange(_value: string, option: any) {
  modelValue.value = option.content;
}
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
function handleRun() {
  refreshDefSlot();
  emits('eval', modelValue.value);
}
// 更多操作下拉操作
function handleMoreOp(_key: string, option: any) {
  if (option.click) {
    option.click();
  }
}
// 更多操作选项
const moreOptions = ref([
  {
    label: '格式化',
    key: 'format',
    click() {
      editorRef.value?.editor?.trigger('command', 'editor.action.formatDocument', {});
    },
  },
]);

onMounted(() => {
  emits('eval', modelValue.value);
});
</script>

<template>
  <NSplit class="overflow-auto" pane1-class="flex flex-col" pane2-class="flex flex-col" :direction="splitDirection" v-model:size="splitSize">
    <template #1>
      <div class="flex flex-col flex-1 overflow-auto">
        <div class="flex flex-row justify-between items-center mb-1 mx-2.5 text-base">
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
            <NIcon
              :component="Sort"
              @click="toggleDirection"
              class="transition-transform"
              :style="{
                transform: `rotate(${splitDirection === 'vertical' ? 0 : 90}deg)`,
              }"
            />
            <NIcon :component="VideoPlay" @click="handleRun" />
            <NDropdown size="small" trigger="click" placement="bottom-start" :options="moreOptions" @select="handleMoreOp">
              <NIcon :component="More" />
            </NDropdown>
          </div>
        </div>
        <MonacoEditor ref="editorRef" v-model="modelValue" :editorOptions="props.editorOptions" />
      </div>
    </template>
    <template #2>
      <div class="flex flex-col flex-1 min-w-0 min-h-0 overflow-auto">
        <slot name="default" v-if="showDefSlot" />
      </div>
    </template>
  </NSplit>
</template>
