<template>
  <div class="tender-search">
    <input v-model="searchQuery" type="text" placeholder="Поиск по названию..." />
    <span>Найдено {{ foundCount }}</span>
  </div>
</template>

<script setup lang="ts">

const searchQuery = defineModel('query');
defineProps<{
  foundCount: number
}>()
</script>

<style scoped lang="scss">
.tender-search {
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
}
</style>
