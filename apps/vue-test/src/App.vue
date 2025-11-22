<script setup lang="ts">
import Layout from './components/Layout.vue';
import RouteMenu from './components/RouteMenu.vue';
</script>

<template>
  <Layout>
    <template #aside>
      <RouteMenu />
    </template>
    <template #default>
      <RouterView />
    </template>
  </Layout>
</template>
