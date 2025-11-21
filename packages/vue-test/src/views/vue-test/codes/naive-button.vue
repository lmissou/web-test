<template>
  <div class="test-wrap">
    <div>{{ val }}</div>
    <NButton @click="handleSubClick">-</NButton>
    <NButton @click="handleAddClick">+</NButton>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { NButton } from 'naive-ui';

const val = ref(1);

function handleAddClick() {
  val.value++;
}
function handleSubClick() {
  val.value--;
}
</script>
<style scoped>
.test-wrap {
  height: 100%;
  width: 100%;
  color: red;
}
</style>
